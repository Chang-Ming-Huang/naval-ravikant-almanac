/**
 * Editorial Style Configuration - v2.0 編輯藝術美學
 * 組合: [Dark, Casual, Loose, Flat] - 雜誌編輯風格設計
 * 基於高級印刷媒體和編輯設計傳統
 */

import { Dark } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'editorial',
  name: 'Editorial 編輯藝術',
  description: '膠片質感背景、優雅字體組合、雜誌式排版、沉浸式閱讀體驗',
  icon: '📖',
  category: 'editorial',
  
  // 四個維度的組合
  dimensions: [Dark, Casual, Loose, Flat],
  
  // 頁面 URL
  url: 'pages/editorial.html',
  buttonText: '探索 Editorial 📖',
  
  // 編輯色彩系統 - 經典印刷配色
  editorialColors: {
    primary: '#1a1a1a',      // 深黑主色
    secondary: '#e6e6e6',    // 暖白次色  
    accent: '#666666',       // 中性重點
    highlight: '#333333',    // 微妙高亮
    surface: '#0f0f0f',     // 表面色
    text: '#f0f0f0'         // 主文字色
  },
  
  // 質感系統配置
  textureSystem: {
    grain: {
      size: '50px 50px, 25px 25px',
      opacity: 0.05,
      pattern: 'radial-gradient(circle at 25% 25%, white 2px, transparent 0), radial-gradient(circle at 75% 75%, white 1px, transparent 0)'
    },
    paper: {
      background: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%)',
      size: '30px 30px'
    }
  },
  
  // 卡片專用樣式配置 - 雜誌編輯風格
  cardStyle: {
    background: 'bg-gray-900 bg-opacity-90 backdrop-blur-sm',
    hover: 'hover:bg-gray-800 hover:bg-opacity-95 hover:scale-102 hover:shadow-xl',
    transition: 'transition-all duration-500 ease-out',
    border: 'border border-gray-700',
    typography: 'font-serif',
    spacing: 'p-12'
  },
  
  // 按鈕樣式配置 - 編輯風格
  buttonStyle: {
    primary: 'bg-white text-black px-8 py-4 font-serif font-medium tracking-wide hover:bg-gray-200 transition-all duration-300 relative overflow-hidden',
    secondary: 'bg-transparent text-white border-2 border-white px-6 py-3 font-serif hover:bg-white hover:text-black transition-all duration-300'
  },

  // Google Fonts - 編輯字體組合
  additionalFonts: [
    'Crimson+Text:ital,wght@0,400;0,600;1,400',  // 優雅襯線 - 正文
    'JetBrains+Mono:wght@300;400;600',           // 等寬字體 - 標題/程式碼
    'Playfair+Display:wght@400;700;900',         // 古典襯線 - 裝飾標題
    'Source+Serif+Pro:wght@300;400;600'          // 專業襯線 - 副標題
  ],
  
  // 動畫效果配置 - 優雅過渡
  animations: {
    fadeIn: {
      duration: '0.8s',
      timing: 'ease-out forwards'
    },
    slideIn: {
      duration: '0.6s',
      timing: 'ease-out'
    },
    parallax: {
      duration: '0.1s',
      timing: 'linear'
    },
    hover: {
      duration: '0.5s',
      timing: 'ease-out'
    }
  },
  
  // 排版系統配置
  typographySystem: {
    headings: {
      main: 'font-mono text-6xl font-bold tracking-tight',
      section: 'font-serif text-4xl font-semibold',
      card: 'font-mono text-2xl font-medium'
    },
    body: {
      main: 'font-serif text-lg leading-relaxed',
      secondary: 'font-sans text-base leading-normal',
      caption: 'font-mono text-sm tracking-wide'
    },
    spacing: {
      paragraph: '1.8',
      heading: '1.2',
      tight: '1.4'
    }
  },
  
  // 裝飾元素配置
  decorativeElements: {
    lines: {
      width: ['60px', '120px', '180px'],
      height: '2px',
      colors: ['#666666', '#999999', '#cccccc'],
      positions: ['top', 'bottom', 'left', 'right']
    },
    quotes: {
      opening: '"',
      closing: '"',
      size: '4rem',
      color: '#666666',
      font: 'JetBrains Mono'
    },
    ornaments: ['◇', '◈', '◉', '◎', '■', '□', '▲', '△']
  },
  
  // 互動效果配置
  interactionEffects: {
    cursor: {
      size: '20px',
      color: 'rgba(230, 230, 230, 0.5)',
      hoverSize: '40px',
      blendMode: 'difference'
    },
    textHighlight: {
      background: 'rgba(230, 230, 230, 0.15)',
      padding: '0 4px',
      skew: '-12deg'
    },
    parallaxElements: ['.artistic-element', '.decorative-line'],
    scrollFactor: 0.5
  },
  
  // 響應式設計配置
  responsive: {
    titleSize: 'clamp(3.5rem, 7vw, 7rem)',
    cardPadding: 'clamp(48px, 6vw, 80px)',
    spacing: 'clamp(80px, 10vw, 160px)',
    containerPadding: 'clamp(30px, 5vw, 80px)'
  },
  
  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'dark',    // 深色編輯背景
    typography: 'casual',  // 編輯風格字體組合
    spacing: 'loose',      // 寬鬆雜誌式布局
    effects: 'flat'        // 平面但有質感
  },
  
  // 專業級 CSS 變數系統
  customProperties: {
    '--editorial-primary': '#1a1a1a',
    '--editorial-secondary': '#e6e6e6',
    '--editorial-accent': '#666666',
    '--editorial-highlight': '#333333',
    '--editorial-surface': '#0f0f0f',
    '--editorial-text': '#f0f0f0',
    '--editorial-transition': 'all 0.5s ease-out',
    '--editorial-shadow': '0 10px 30px rgba(0, 0, 0, 0.5)',
    '--editorial-blur': 'blur(10px)',
    '--editorial-border-radius': '0px', // 銳利邊緣更編輯化
    '--editorial-line-height': '1.8',
    '--editorial-letter-spacing': '0.02em'
  },
  
  // 印刷風格配置
  printStyle: {
    margins: {
      top: '80px',
      bottom: '80px',
      left: '60px',
      right: '60px'
    },
    columns: {
      single: 'max-width: 800px',
      double: 'columns: 2, column-gap: 40px',
      triple: 'columns: 3, column-gap: 30px'
    },
    baseline: '24px' // 基線網格
  }
};