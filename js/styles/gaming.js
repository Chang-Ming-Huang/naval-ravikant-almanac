/**
 * Gaming Style Configuration
 * 組合: [深色, 輕鬆, 緊湊, 平面] - 遊戲電競風格
 */

import { Dark } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'gaming',
  name: 'Gaming 電競風格',
  description: '電競遊戲主題設計，暗色系配電競綠，科技感十足',
  icon: '🎮',
  category: 'gaming',

  // 四個維度的組合
  dimensions: [Dark, Casual, Compact, Flat],

  // 頁面 URL
  url: 'pages/gaming.html',
  buttonText: '進入遊戲世界 →',

  // 電競配色系統
  customColors: {
    primary: '#22c55e',        // 電競綠
    primaryLight: '#4ade80',   // 亮電競綠
    accent: '#22c55e',
    secondary: '#f97316',      // 警示橙
    danger: '#ef4444',         // 危險紅
    info: '#06b6d4',          // 信息藍
    gradientFrom: 'from-gray-900',
    gradientTo: 'to-black'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-gray-900 to-black',
    hover: 'hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1',
    transition: 'transition-all duration-300',
    border: 'border border-green-500/30',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-700'
  },

  // 按鈕樣式配置 - 電競風格
  buttonStyle: {
    primary: 'bg-green-500 text-black hover:bg-green-400 font-bold uppercase tracking-wider border-2 border-green-400 hover:border-green-300 shadow-lg shadow-green-500/30',
    secondary: 'bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold uppercase tracking-wider shadow-lg shadow-green-500/20'
  },

  // Google Fonts - 電競科技字體
  additionalFonts: ['Orbitron:wght@400;700;900', 'Rajdhani:wght@400;600;700'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'dark',     // 深色
    typography: 'casual',   // 輕鬆
    spacing: 'compact',     // 緊湊
    effects: 'flat'         // 平面
  }
};