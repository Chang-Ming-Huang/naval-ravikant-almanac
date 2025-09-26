/**
 * Creative Style Configuration
 * 組合: [明亮, 輕鬆, 緊湊, 平面] - 創意設計風格
 */

import { Light } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'creative',
  name: 'Creative 創意風格',
  description: '充滿創意能量的設計，多彩搭配，激發靈感創造力',
  icon: '🎨',
  category: 'creative',

  // 四個維度的組合
  dimensions: [Light, Casual, Compact, Flat],

  // 頁面 URL
  url: 'pages/creative.html',
  buttonText: '探索創意世界 →',

  // 創意多彩配色系統
  customColors: {
    primary: '#ec4899',        // 創意粉
    primaryLight: '#f472b6',   // 亮創意粉
    accent: '#8b5cf6',         // 創意紫
    secondary: '#06b6d4',      // 創意青
    tertiary: '#10b981',       // 創意綠
    warning: '#f59e0b',        // 創意橙
    gradientFrom: 'from-pink-50',
    gradientTo: 'to-purple-50'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-pink-50 to-purple-50',
    hover: 'hover:shadow-lg hover:-translate-y-2 hover:scale-105',
    transition: 'transition-all duration-300',
    border: 'border border-pink-200/50',
    iconBg: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },

  // 按鈕樣式配置 - 創意多彩
  buttonStyle: {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-medium transform hover:scale-105',
    secondary: 'bg-transparent border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-medium transform hover:scale-105'
  },

  // Google Fonts - 創意友善字體
  additionalFonts: ['Inter:wght@400;500;600;700', 'Nunito:wght@400;600;700'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',    // 明亮
    typography: 'casual',   // 輕鬆
    spacing: 'compact',     // 緊湊
    effects: 'flat'         // 平面
  }
};