/**
 * Professional Style Configuration
 * 組合: [深色, 正式, 緊湊, 平面] - 金融專業風格
 */

import { Dark } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'professional',
  name: 'Professional 專業風格',
  description: '金融級專業設計，深藍金色系，注重數據和權威感',
  icon: '📊',
  category: 'professional',

  // 四個維度的組合
  dimensions: [Dark, Formal, Compact, Flat],

  // 頁面 URL
  url: 'pages/professional.html',
  buttonText: '進入專業領域 →',

  // 金融專業配色系統
  customColors: {
    primary: '#1e3a8a',        // 深藍
    primaryLight: '#3b82f6',   // 亮藍
    accent: '#f59e0b',         // 金色
    secondary: '#6b7280',      // 專業灰
    success: '#10b981',        // 成功綠
    warning: '#f59e0b',        // 警告金
    gradientFrom: 'from-blue-900',
    gradientTo: 'to-gray-900'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-blue-900 to-gray-900',
    hover: 'hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1',
    transition: 'transition-all duration-300',
    border: 'border border-blue-700/50',
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
  },

  // 按鈕樣式配置 - 金融專業
  buttonStyle: {
    primary: 'bg-blue-700 text-white hover:bg-blue-600 font-semibold border border-blue-600 shadow-lg shadow-blue-500/30',
    secondary: 'bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold shadow-lg shadow-yellow-500/20'
  },

  // Google Fonts - 專業嚴謹字體
  additionalFonts: ['IBM Plex Sans:wght@400;500;600;700', 'IBM Plex Mono:wght@400;500'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'dark',     // 深色
    typography: 'formal',   // 正式
    spacing: 'compact',     // 緊湊
    effects: 'flat'         // 平面
  }
};