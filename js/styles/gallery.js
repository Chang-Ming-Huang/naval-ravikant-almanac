/**
 * Gallery Style Configuration
 * 組合: [明亮, 正式, 寬鬆, 立體] - 美術館風格
 */

import { Light } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'gallery',
  name: 'Gallery 美術館風格',
  description: '藝術展覽級設計，博物館白配優雅排版，典雅文化質感',
  icon: '🎭',
  category: 'cultural',

  // 四個維度的組合
  dimensions: [Light, Formal, Loose, Dimensional],

  // 頁面 URL
  url: 'pages/gallery.html',
  buttonText: '進入藝術殿堂 →',

  // 美術館配色系統
  customColors: {
    primary: '#374151',        // 深灰
    primaryLight: '#6b7280',   // 中灰
    accent: '#d4af37',         // 金色裝飾
    secondary: '#9ca3af',      // 淺灰
    success: '#10b981',        // 成功綠
    warning: '#f59e0b',        // 警告金
    gradientFrom: 'from-gray-50',
    gradientTo: 'to-white'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-gray-50 to-white',
    hover: 'hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-3 hover:scale-102',
    transition: 'transition-all duration-700',
    border: 'border border-gray-200',
    iconBg: 'bg-gradient-to-br from-gray-400 to-gray-600'
  },

  // 按鈕樣式配置 - 典雅藝術
  buttonStyle: {
    primary: 'bg-gray-800 text-white hover:bg-gray-700 font-medium shadow-lg shadow-gray-500/30 transform hover:scale-105',
    secondary: 'bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium shadow-lg shadow-gray-500/20 transform hover:scale-105'
  },

  // Google Fonts - 典雅藝術字體
  additionalFonts: ['Playfair Display:wght@400;500;600;700', 'Crimson Text:wght@400;500;600'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',       // 明亮
    typography: 'formal',      // 正式
    spacing: 'loose',          // 寬鬆
    effects: 'dimensional'     // 立體
  }
};