// API 客户端 - 带降级支持

const API_BASE_URL = 'http://localhost:3000/api';

// 导入模拟数据
let mockHotspots = [];
let mockDataLoaded = false;

/**
 * 加载模拟数据
 */
async function loadMockData() {
  if (mockDataLoaded) return mockHotspots;

  try {
    // 尝试从 hotspots.js 加载模拟数据
    if (typeof mockHotspotsData !== 'undefined') {
      mockHotspots = mockHotspotsData;
      mockDataLoaded = true;
      Logger.info('✅ 使用模拟数据', { count: mockHotspots.length });
      return mockHotspots;
    } else {
      // 如果 hotspots.js 没有加载，返回空数组
      Logger.warn('⚠️ 模拟数据不可用');
      return [];
    }
  } catch (error) {
    Logger.error('加载模拟数据失败', error);
    return [];
  }
}

/**
 * 获取热点列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 热点列表
 */
window.fetchHotspots = async function(params = {}) {
  const startTime = Date.now();
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/hotspots${queryString ? '?' + queryString : ''}`;

    Logger.debug('请求热点列表', { url, params });

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (result.success) {
      const elapsed = Date.now() - startTime;
      Logger.info('获取热点成功', { total: result.data.total, elapsed: `${elapsed}ms` });
      return result.data.hotspots;
    } else {
      Logger.error('获取热点失败', new Error(result.error.message));
      throw new Error(result.error.message);
    }
  } catch (error) {
    Logger.warn('API 请求失败，降级到模拟数据', error.message);

    // 降级到模拟数据
    const mockData = await loadMockData();

    // 应用筛选（如果有）
    let filteredData = [...mockData];

    // 类型筛选
    if (params.type) {
      filteredData = filteredData.filter(h => h.type === params.type);
    }

    // 平台筛选
    if (params.platforms) {
      const platforms = Array.isArray(params.platforms) ? params.platforms : [params.platforms];
      filteredData = filteredData.filter(h => platforms.includes(h.platform));
    }

    const elapsed = Date.now() - startTime;
    Logger.info('使用模拟数据', { total: filteredData.length, elapsed: `${elapsed}ms` });

    return filteredData;
  }
}

/**
 * 获取热点详情
 * @param {string} id - 热点 ID
 * @returns {Promise} 热点详情
 */
window.fetchHotspotById = async function(id) {
  const startTime = Date.now();
  try {
    const url = `${API_BASE_URL}/hotspots/${id}`;

    Logger.debug('请求热点详情', { url, id });

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (result.success) {
      const elapsed = Date.now() - startTime;
      Logger.info('获取热点详情成功', { id, elapsed: `${elapsed}ms` });
      return result.data;
    } else {
      Logger.error('获取热点详情失败', new Error(result.error.message));
      throw new Error(result.error.message);
    }
  } catch (error) {
    Logger.warn('API 请求失败，从模拟数据中查找', error.message);

    // 从模拟数据中查找
    const mockData = await loadMockData();
    const hotspot = mockData.find(h => h.id === id);

    if (hotspot) {
      const elapsed = Date.now() - startTime;
      Logger.info('从模拟数据获取热点详情', { id, elapsed: `${elapsed}ms` });
      return hotspot;
    } else {
      Logger.error('热点不存在', { id });
      throw new Error(`热点 ${id} 不存在`);
    }
  }
}

/**
 * 搜索热点
 * @param {string} query - 搜索关键词
 * @param {Object} params - 查询参数
 * @returns {Promise} 搜索结果
 */
window.searchHotspots = async function(query, params = {}) {
  const startTime = Date.now();
  try {
    const queryString = new URLSearchParams({ q: query, ...params }).toString();
    const url = `${API_BASE_URL}/hotspots/search?${queryString}`;

    Logger.debug('搜索热点', { url, query });

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (result.success) {
      const elapsed = Date.now() - startTime;
      Logger.info('搜索成功', { total: result.data.total, elapsed: `${elapsed}ms` });
      return result.data.hotspots;
    } else {
      Logger.error('搜索失败', new Error(result.error.message));
      throw new Error(result.error.message);
    }
  } catch (error) {
    Logger.warn('API 搜索失败，使用模拟数据搜索', error.message);

    // 从模拟数据中搜索
    const mockData = await loadMockData();

    const queryLower = query.toLowerCase();
    const results = mockData.filter(h =>
      h.title.toLowerCase().includes(queryLower) ||
      (h.location && h.location.city && h.location.city.toLowerCase().includes(queryLower)) ||
      (h.metadata && h.metadata.author && h.metadata.author.toLowerCase().includes(queryLower))
    );

    // 应用筛选（如果有）
    let filteredResults = [...results];

    if (params.type) {
      filteredResults = filteredResults.filter(h => h.type === params.type);
    }

    if (params.platforms) {
      const platforms = Array.isArray(params.platforms) ? params.platforms : [params.platforms];
      filteredResults = filteredResults.filter(h => platforms.includes(h.platform));
    }

    const elapsed = Date.now() - startTime;
    Logger.info('模拟数据搜索完成', { total: filteredResults.length, elapsed: `${elapsed}ms` });

    return filteredResults;
  }
}

/**
 * 获取统计数据
 * @returns {Promise} 统计数据
 */
window.fetchStats = async function() {
  const startTime = Date.now();
  try {
    const url = `${API_BASE_URL}/stats`;

    Logger.debug('请求统计数据', { url });

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (result.success) {
      const elapsed = Date.now() - startTime;
      Logger.info('获取统计成功', { elapsed: `${elapsed}ms` });
      return result.data;
    } else {
      Logger.error('获取统计失败', new Error(result.error.message));
      throw new Error(result.error.message);
    }
  } catch (error) {
    Logger.warn('API 请求失败，使用模拟数据统计', error.message);

    // 从模拟数据中计算统计
    const mockData = await loadMockData();

    // 计算统计
    const stats = {
      total: mockData.length,
      byType: {},
      byPlatform: {},
      byCity: {}
    };

    mockData.forEach(h => {
      // 按类型统计
      stats.byType[h.type] = (stats.byType[h.type] || 0) + 1;

      // 按平台统计
      stats.byPlatform[h.platform] = (stats.byPlatform[h.platform] || 0) + 1;

      // 按城市统计
      if (h.location && h.location.city) {
        stats.byCity[h.location.city] = (stats.byCity[h.location.city] || 0) + 1;
      }
    });

    const elapsed = Date.now() - startTime;
    Logger.info('模拟数据统计完成', { total: stats.total, elapsed: `${elapsed}ms` });

    return stats;
  }
}

/**
 * 触发数据抓取（降级版本）
 * @returns {Promise} 任务信息
 */
window.triggerFetch = async function() {
  Logger.warn('⚠️ 数据抓取功能需要后端 API');
  Logger.info('当前使用模拟数据，无需抓取');

  return {
    success: false,
    message: '数据抓取功能需要后端 API，当前使用模拟数据'
  };
}

/**
 * 获取抓取任务状态（降级版本）
 * @param {string} taskId - 任务 ID
 * @returns {Promise} 任务状态
 */
window.fetchTaskStatus = async function(taskId) {
  Logger.warn('⚠️ 数据抓取功能需要后端 API');
  return {
    success: false,
    message: '数据抓取功能需要后端 API，当前使用模拟数据'
  };
}
