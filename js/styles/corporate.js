/**
 * Fashion Style Configuration - 時尚品牌風格
 * 維度組合: [Light, Formal, Compact, Dimensional]
 * 高級時尚品牌的精品視覺體驗
 */

import { Light } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'corporate',
  name: 'Fashion 時尚',
  description: '高級時尚品牌風格，精品奢華的視覺體驗',
  icon: '💄',
  category: 'luxury',
  
  // 四維組合定義風格特性
  dimensions: [Light, Formal, Compact, Dimensional],
  
  url: 'pages/corporate.html',
  buttonText: '體驗時尚精品 →',
  
  // 系統會自動從維度推導這些特性
  characteristics: {
    brightness: 'light',       // 從 Light 維度
    typography: 'formal',      // 從 Formal 維度  
    spacing: 'compact',        // 從 Compact 維度
    effects: 'dimensional'     // 從 Dimensional 維度
  },
  
  // 時尚風格的客製化樣式配置
  cardStyle: {
    background: 'bg-white',
    hover: 'hover:shadow-2xl hover:-translate-y-3 hover:shadow-pink-100',
    transition: 'transition-all duration-300',
    border: 'border border-gray-100 shadow-lg'
  },
  
  buttonStyle: {
    primary: 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl font-medium',
    secondary: 'border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white shadow-md hover:shadow-lg'
  },
  
  // 時尚風格專用的色彩系統
  customColors: {
    primary: '#ec4899',        // 時尚粉
    secondary: '#374151',      // 深灰
    text: '#111827',           // 深黑文字
    background: '#ffffff',     // 純白背景
    accent: '#be185d',         // 深時尚粉
    gold: '#d4af37',           // 時尚金
    silver: '#c0c0c0'          // 時尚銀
  },
  
  // Tailwind 自定義配置（時尚風格）
  tailwindConfig: {
    colors: {
      'fashion-pink': '#ec4899',
      'fashion-gray': '#374151',
      'fashion-text': '#111827',
      'fashion-light': '#fef7ff',
      'fashion-gold': '#d4af37'
    },
    fontFamily: {
      'fashion': ['Didot', '思源黑體', 'serif']
    },
    boxShadow: {
      'fashion': '0 10px 25px -3px rgba(236, 72, 153, 0.1), 0 4px 6px -2px rgba(236, 72, 153, 0.05)',
      'fashion-lg': '0 20px 25px -5px rgba(236, 72, 153, 0.15), 0 10px 10px -5px rgba(236, 72, 153, 0.08)'
    }
  }
};