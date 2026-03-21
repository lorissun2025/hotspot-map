// 模拟热点数据
const mockHotspots = [
  // ========== 小红书 ==========
  {
    id: 'xhs_001',
    platform: 'xiaohongshu',
    title: '三里屯网红咖啡厅，必打卡！',
    type: 'food',
    influenceScore: 0.85,
    location: { lat: 39.9370, lng: 116.4477, city: '北京', district: '朝阳区' },
    metrics: { likes: 15000, collects: 8000 },
    metadata: { author: '美食小当家', publishTime: '2026-03-12T08:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'xhs_002',
    platform: 'xiaohongshu',
    title: '外滩夜景打卡点，绝美视角',
    type: 'tourism',
    influenceScore: 0.72,
    location: { lat: 31.2304, lng: 121.4737, city: '上海', district: '黄浦区' },
    metrics: { likes: 12000, collects: 6500 },
    metadata: { author: '旅行达人', publishTime: '2026-03-12T07:30:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'xhs_003',
    platform: 'xiaohongshu',
    title: '成都太古里火锅，排队也要吃',
    type: 'food',
    influenceScore: 0.68,
    location: { lat: 30.6586, lng: 104.0648, city: '成都', district: '锦江区' },
    metrics: { likes: 9800, collects: 5200 },
    metadata: { author: '火锅爱好者', publishTime: '2026-03-12T06:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'xhs_004',
    platform: 'xiaohongshu',
    title: '西湖断桥拍照攻略',
    type: 'tourism',
    influenceScore: 0.61,
    location: { lat: 30.2578, lng: 120.1536, city: '杭州', district: '西湖区' },
    metrics: { likes: 8500, collects: 4200 },
    metadata: { author: '西湖攻略', publishTime: '2026-03-12T05:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'xhs_005',
    platform: 'xiaohongshu',
    title: '深圳湾公园骑行路线',
    type: 'tourism',
    influenceScore: 0.55,
    location: { lat: 22.4917, lng: 113.9590, city: '深圳', district: '南山区' },
    metrics: { likes: 7200, collects: 3600 },
    metadata: { author: '深圳探索', publishTime: '2026-03-11T20:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },

  // ========== 微博 ==========
  {
    id: 'wb_001',
    platform: 'weibo',
    title: '#北京天气# 大范围降温预警',
    type: 'social_trend',
    influenceScore: 0.92,
    location: { lat: 39.9042, lng: 116.4074, city: '北京', district: '东城区' },
    metrics: { readCount: 5800000, discussCount: 320000 },
    metadata: { category: '天气', publishTime: '2026-03-12T09:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_002',
    platform: 'weibo',
    title: '#上海迪士尼# 5周年庆典活动',
    type: 'event',
    influenceScore: 0.78,
    location: { lat: 31.1444, lng: 121.6578, city: '上海', district: '浦东新区' },
    metrics: { readCount: 3200000, discussCount: 180000 },
    metadata: { category: '娱乐', publishTime: '2026-03-11T18:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_003',
    platform: 'weibo',
    title: '#广州地铁# 10号线正式开通',
    type: 'social_trend',
    influenceScore: 0.65,
    location: { lat: 23.1291, lng: 113.2644, city: '广州', district: '天河区' },
    metrics: { readCount: 2100000, discussCount: 98000 },
    metadata: { category: '交通', publishTime: '2026-03-11T16:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_004',
    platform: 'weibo',
    title: '#深圳地铁# 新线路规划公示',
    type: 'social_trend',
    influenceScore: 0.58,
    location: { lat: 22.5431, lng: 114.0579, city: '深圳', district: '福田区' },
    metrics: { readCount: 1800000, discussCount: 75000 },
    metadata: { category: '交通', publishTime: '2026-03-11T14:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_005',
    platform: 'weibo',
    title: '#成都美食# 火锅节即将开幕',
    type: 'food',
    influenceScore: 0.52,
    location: { lat: 30.6586, lng: 104.0648, city: '成都', district: '锦江区' },
    metrics: { readCount: 1500000, discussCount: 62000 },
    metadata: { category: '美食', publishTime: '2026-03-11T12:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },

  // ========== 抖音 ==========
  {
    id: 'dy_001',
    platform: 'douyin',
    title: '故宫打卡视频爆火，游客激增',
    type: 'tourism',
    influenceScore: 0.88,
    location: { lat: 39.9163, lng: 116.3972, city: '北京', district: '东城区' },
    metrics: { likes: 250000, shares: 85000, comments: 32000 },
    metadata: { author: '旅行博主', publishTime: '2026-03-12T08:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'dy_002',
    platform: 'douyin',
    title: '深圳湾网红餐厅探店',
    type: 'food',
    influenceScore: 0.74,
    location: { lat: 22.5431, lng: 113.9481, city: '深圳', district: '南山区' },
    metrics: { likes: 185000, shares: 52000, comments: 28000 },
    metadata: { author: '美食博主', publishTime: '2026-03-11T22:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'dy_003',
    platform: 'douyin',
    title: '杭州西湖音乐节现场直击',
    type: 'event',
    influenceScore: 0.71,
    location: { lat: 30.2473, lng: 120.1350, city: '杭州', district: '西湖区' },
    metrics: { likes: 168000, shares: 48000, comments: 24000 },
    metadata: { author: '音乐达人', publishTime: '2026-03-11T20:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'dy_004',
    platform: 'douyin',
    title: '外滩夜景延时摄影',
    type: 'tourism',
    influenceScore: 0.63,
    location: { lat: 31.2304, lng: 121.4737, city: '上海', district: '黄浦区' },
    metrics: { likes: 145000, shares: 42000, comments: 21000 },
    metadata: { author: '摄影达人', publishTime: '2026-03-11T18:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'dy_005',
    platform: 'douyin',
    title: '成都大熊猫基地探秘',
    type: 'tourism',
    influenceScore: 0.59,
    location: { lat: 30.7357, lng: 104.1474, city: '成都', district: '成华区' },
    metrics: { likes: 132000, shares: 38000, comments: 19000 },
    metadata: { author: '成都探索', publishTime: '2026-03-11T16:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },

  // ========== B站 ==========
  {
    id: 'bili_001',
    platform: 'bilibili',
    title: 'ChinaJoy 2024 上海漫展现场',
    type: 'acg',
    influenceScore: 0.86,
    location: { lat: 31.1946, lng: 121.5464, city: '上海', district: '浦东新区' },
    metrics: { views: 890000, likes: 58000, coins: 32000 },
    metadata: { author: 'ACG情报局', publishTime: '2026-03-11T20:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'bili_002',
    platform: 'bilibili',
    title: '北京动漫展 Cosplay 大赏',
    type: 'acg',
    influenceScore: 0.69,
    location: { lat: 39.8856, lng: 116.4110, city: '北京', district: '顺义区' },
    metrics: { views: 520000, likes: 38000, coins: 21000 },
    metadata: { author: '漫展前线', publishTime: '2026-03-11T18:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'bili_003',
    platform: 'bilibili',
    title: '广州游戏嘉年华开幕',
    type: 'acg',
    influenceScore: 0.64,
    location: { lat: 23.1065, lng: 113.3246, city: '广州', district: '海珠区' },
    metrics: { views: 480000, likes: 32000, coins: 18000 },
    metadata: { author: '游戏快报', publishTime: '2026-03-11T16:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'bili_004',
    platform: 'bilibili',
    title: '深圳动漫展 Cosplay 比赛',
    type: 'acg',
    influenceScore: 0.57,
    location: { lat: 22.5431, lng: 113.9481, city: '深圳', district: '南山区' },
    metrics: { views: 420000, likes: 28000, coins: 15000 },
    metadata: { author: '深圳漫展', publishTime: '2026-03-11T14:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'bili_005',
    platform: 'bilibili',
    title: '成都电玩展现场直击',
    type: 'acg',
    influenceScore: 0.51,
    location: { lat: 30.6586, lng: 104.0648, city: '成都', district: '锦江区' },
    metrics: { views: 380000, likes: 24000, coins: 12000 },
    metadata: { author: '成都电玩', publishTime: '2026-03-11T12:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },

  // ========== 补充热点 ==========
  {
    id: 'xhs_006',
    platform: 'xiaohongshu',
    title: '北京国贸网红下午茶',
    type: 'food',
    influenceScore: 0.48,
    location: { lat: 39.9085, lng: 116.4489, city: '北京', district: '朝阳区' },
    metrics: { likes: 6200, collects: 3100 },
    metadata: { author: '下午茶达人', publishTime: '2026-03-11T10:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'dy_006',
    platform: 'douyin',
    title: '上海陆家嘴夜景无人机拍摄',
    type: 'tourism',
    influenceScore: 0.67,
    location: { lat: 31.2355, lng: 121.5045, city: '上海', district: '浦东新区' },
    metrics: { likes: 158000, shares: 45000, comments: 22000 },
    metadata: { author: '航拍达人', publishTime: '2026-03-11T22:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_006',
    platform: 'weibo',
    title: '#深圳天气# 台风蓝色预警',
    type: 'social_trend',
    influenceScore: 0.54,
    location: { lat: 22.5431, lng: 114.0579, city: '深圳', district: '福田区' },
    metrics: { readCount: 1400000, discussCount: 58000 },
    metadata: { category: '天气', publishTime: '2026-03-12T08:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'bili_006',
    platform: 'bilibili',
    title: '北京二次元漫展完整记录',
    type: 'acg',
    influenceScore: 0.45,
    location: { lat: 39.9385, lng: 116.3974, city: '北京', district: '海淀区' },
    metrics: { views: 320000, likes: 21000, coins: 11000 },
    metadata: { author: '二次元观察', publishTime: '2026-03-11T18:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'xhs_007',
    platform: 'xiaohongshu',
    title: '杭州龙井茶园拍照攻略',
    type: 'tourism',
    influenceScore: 0.42,
    location: { lat: 30.2397, lng: 120.1307, city: '杭州', district: '西湖区' },
    metrics: { likes: 5800, collects: 2900 },
    metadata: { author: '杭州攻略', publishTime: '2026-03-11T08:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  },
  {
    id: 'wb_007',
    platform: 'weibo',
    title: '#杭州交通# 西湖景区限行',
    type: 'social_trend',
    influenceScore: 0.47,
    location: { lat: 30.2473, lng: 120.1350, city: '杭州', district: '西湖区' },
    metrics: { readCount: 1200000, discussCount: 52000 },
    metadata: { category: '交通', publishTime: '2026-03-12T07:00:00Z', fetchTime: '2026-03-12T09:00:00Z' }
  }
];

// 影响力等级枚举
const InfluenceLevel = {
  VERY_HIGH: 'very_high',  // 极高影响力 (>0.8)
  HIGH: 'high',            // 高影响力 (0.6-0.8)
  MEDIUM: 'medium',        // 中等影响力 (0.4-0.6)
  LOW: 'low',              // 低影响力 (0.2-0.4)
  EMERGING: 'emerging'     // 新兴热点 (<0.2)
};

// 导出到全局变量（供 api-fallback.js 使用）
window.mockHotspotsData = mockHotspots;
window.InfluenceLevel = InfluenceLevel;
