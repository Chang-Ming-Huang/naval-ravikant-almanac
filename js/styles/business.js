/**
 * Business Style Configuration
 * 組合: [明亮, 正式, 緊湊, 平面] - 企業專業風格
 */

import { Light } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'business',
  name: 'Business 企業風格',
  description: '專業企業設計，清晰簡潔，注重信息傳達效率',
  icon: '🏢',
  category: 'professional',

  // 四個維度的組合
  dimensions: [Light, Formal, Compact, Flat],

  // 頁面 URL
  url: 'pages/business.html',
  buttonText: '體驗企業風格 →',

  // 企業級色彩配置
  customColors: {
    primary: '#1e40af',        // 企業藍
    primaryLight: '#3b82f6',   // 亮企業藍
    accent: '#1e40af',
    secondary: '#64748b',      // 專業灰
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-slate-50'
  },

  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-blue-50 to-slate-50',
    hover: 'hover:shadow-lg hover:-translate-y-1',
    transition: 'transition-all duration-300',
    border: 'border border-blue-200/50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },

  // 按鈕樣式配置
  buttonStyle: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 font-medium',
    secondary: 'bg-transparent border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-medium'
  },

  // Google Fonts
  additionalFonts: ['Inter:wght@400;500;600;700'],

  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',    // 明亮
    typography: 'formal',   // 正式
    spacing: 'compact',     // 緊湊
    effects: 'flat'         // 平面
  }
};