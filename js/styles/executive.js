/**
 * Executive Style Configuration
 * 組合: [深色, 正式, 緊湊, 立體] - 高端商務風格
 */

import { Dark } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'executive',
  name: 'Executive 高管風格',
  description: '高端商務設計，奢華深色配3D效果，頂級商務質感',
  icon: '👔',
  category: 'luxury',

  // 四個維度的組合
  dimensions: [Dark, Formal, Compact, Dimensional],

  // 頁面 URL
  url: 'pages/executive.html',
  buttonText: '體驗高端商務 →',

  // 高端商務配色系統
  customColors: {
    primary: '#1a1a1a',        // 深黑
    primaryLight: '#374151',   // 亮黑
    accent: '#d4af37',         // 奢華金
    secondary: '#6b7280',      // 商務灰
    success: '#10b981',        // 成功綠
    warning: '#f59e0b',        // 警告金
    gradientFrom: 'from-black',
    gradientTo: 'to-gray-900'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-black to-gray-900',
    hover: 'hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 hover:scale-105',
    transition: 'transition-all duration-500',
    border: 'border border-yellow-600/30',
    iconBg: 'bg-gradient-to-br from-yellow-600 to-yellow-800'
  },

  // 按鈕樣式配置 - 高端奢華
  buttonStyle: {
    primary: 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold shadow-2xl shadow-yellow-500/40 transform hover:scale-105',
    secondary: 'bg-transparent border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black font-bold shadow-xl shadow-yellow-500/20 transform hover:scale-105'
  },

  // Google Fonts - 高端商務字體
  additionalFonts: ['Playfair Display:wght@400;500;600;700', 'Source Sans Pro:wght@400;600;700'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'dark',        // 深色
    typography: 'formal',      // 正式
    spacing: 'compact',        // 緊湊
    effects: 'dimensional'     // 立體
  }
};