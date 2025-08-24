/**
 * Scholar Dark Style Configuration - 學者暗黑風格
 * 維度組合: [Dark, Formal, Loose, Flat]
 * 深夜研究室氛圍，溫暖護眼的學術閱讀體驗
 */

import { Dark } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'academic',
  name: 'Scholar Dark 學者',
  description: '深夜學者風格，溫暖護眼的學術閱讀氛圍',
  icon: '🌙',
  category: 'scholarly',
  
  // 四維組合定義風格特性
  dimensions: [Dark, Formal, Loose, Flat],
  
  url: 'pages/academic.html',
  buttonText: '進入學者夜讀 →',
  
  // 系統會自動從維度推導這些特性
  characteristics: {
    brightness: 'dark',      // 從 Dark 維度
    typography: 'formal',    // 從 Formal 維度  
    spacing: 'loose',        // 從 Loose 維度
    effects: 'flat'          // 從 Flat 維度
  },
  
  // 學者暗黑風格的客製化樣式配置
  cardStyle: {
    background: 'bg-gray-800',
    hover: 'hover:bg-gray-750',
    transition: 'transition-all duration-300',
    border: 'border border-gray-700'
  },
  
  buttonStyle: {
    primary: 'bg-amber-600 text-gray-900 hover:bg-amber-500 font-medium',
    secondary: 'border-2 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-gray-900'
  },
  
  // 學者暗黑風格專用的色彩系統
  customColors: {
    primary: '#d97706',        // 溫暖琥珀色
    secondary: '#6b7280',      // 中性灰
    text: '#e8e6e3',           // 暖白文字
    background: '#1a1a1a',     // 深色背景
    accent: '#f59e0b',         // 亮琥珀色
    card: '#2d2d2d'            // 卡片背景
  },
  
  // Tailwind 自定義配置（學者暗黑風格）
  tailwindConfig: {
    colors: {
      'scholar-dark': '#1a1a1a',
      'scholar-card': '#2d2d2d',
      'scholar-text': '#e8e6e3',
      'scholar-amber': '#d97706'
    },
    fontFamily: {
      'scholar': ['Times New Roman', '思源宋體', 'serif']
    }
  }
};