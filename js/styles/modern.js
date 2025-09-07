/**
 * Modern Style Configuration - v2.0 現代科技美學
 * 組合: [Light, Casual, Compact, Dimensional] - 未來感極簡設計
 * 基於 2024 年高級網頁設計趨勢
 */

import { Light } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'modern',
  name: 'Modern 現代科技',
  description: '幾何美學背景、微妙漸層、現代字體、沉浸式未來科技體驗',
  icon: '⚡',
  category: 'futuristic',
  
  // 四個維度的組合
  dimensions: [Light, Casual, Compact, Dimensional],
  
  // 頁面 URL
  url: 'pages/modern.html',
  buttonText: '探索 Modern ⚡',
  
  // 現代科技色彩系統 - 專業級配色
  modernColors: {
    primary: '#ffffff',      // 純白主色
    secondary: '#e6e6e6',    // 暖白次色  
    accent: '#999999',       // 中性重點
    background: '#0a0a0a',   // 深黑背景
    surface: '#1a1a1a',     // 表面色
    subtle: '#333333'        // 微妙色彩
  },
  
  // 背景漸層系統配置
  backgroundSystem: {
    primary: 'radial-gradient(circle at 20% 30%, #0a0a0a 0%, #000000 100%)',
    secondary: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    accent: 'linear-gradient(45deg, #ffffff, #999999)',
    subtleOverlay: 'rgba(255, 255, 255, 0.03)'
  },
  
  // 卡片專用樣式配置 - 未來感幾何設計
  cardStyle: {
    background: 'bg-white bg-opacity-5 backdrop-blur-sm',
    hover: 'hover:bg-white hover:bg-opacity-10 hover:-translate-y-2 hover:shadow-2xl',
    transition: 'transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
    border: 'border border-white border-opacity-10',
    geometric: 'clip-path-geometric',
    shadows: 'shadow-lg hover:shadow-2xl'
  },
  
  // 按鈕樣式配置 - 現代極簡風格
  buttonStyle: {
    primary: 'bg-transparent border-2 border-white text-white font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] px-8 py-4 relative overflow-hidden',
    secondary: 'bg-white bg-opacity-5 backdrop-blur text-white border border-white border-opacity-20 hover:border-white hover:border-opacity-40 transition-all duration-400 px-6 py-3'
  },

  // Google Fonts - 現代科技字體組合
  additionalFonts: [
    'Space+Mono:wght@400;700',      // 等寬科技字體 - 標題
    'Inter:wght@100;300;400;600',   // 現代無襯線 - 正文
    'JetBrains+Mono:wght@300;400'   // 程式碼風格 - 裝飾
  ],
  
  // 動畫效果配置 - 專業級緩動
  animations: {
    fadeIn: {
      duration: '0.8s',
      timing: 'ease-[cubic-bezier(0.25,0.46,0.45,0.94)] forwards'
    },
    geometricFloat: {
      duration: '6s',
      timing: 'ease-in-out infinite'
    },
    hover: {
      duration: '0.4s',
      timing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    slideIn: {
      duration: '0.6s',
      timing: 'ease-out'
    }
  },
  
  // 幾何形狀系統配置
  geometricSystem: {
    shapes: ['square', 'circle', 'line'],
    sizes: ['200px', '120px', '300px'],
    positions: [
      { top: '10%', right: '15%', rotation: '45deg' },
      { bottom: '20%', left: '10%', rotation: '0deg' },
      { top: '50%', right: '0', rotation: '0deg' }
    ],
    animations: ['float', 'slide', 'rotate'],
    opacity: ['0.03', '0.05', '0.02']
  },
  
  // 互動效果配置
  interactionEffects: {
    cursor: {
      size: '20px',
      color: 'rgba(255, 255, 255, 0.5)',
      hoverSize: '40px',
      blendMode: 'difference'
    },
    parallax: {
      intensity: 0.5,
      elements: ['.geometric-shape', '.floating-element']
    },
    magneticEffect: {
      strength: 0.3,
      targets: ['.modern-card', '.modern-button']
    }
  },
  
  // 響應式設計配置
  responsive: {
    titleSize: 'clamp(3rem, 8vw, 8rem)',
    cardPadding: 'clamp(40px, 5vw, 60px)',
    spacing: 'clamp(60px, 8vw, 120px)',
    containerPadding: 'clamp(20px, 4vw, 60px)'
  },
  
  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',    // 深色背景但淺色文字
    typography: 'casual',   // 現代無襯線字體
    spacing: 'compact',     // 緊湊但有序布局
    effects: 'dimensional'  // 3D效果和幾何元素
  },
  
  // 專業級 CSS 變數系統
  customProperties: {
    '--modern-primary': '#ffffff',
    '--modern-secondary': '#e6e6e6',
    '--modern-accent': '#999999',
    '--modern-bg': '#0a0a0a',
    '--modern-surface': '#1a1a1a',
    '--modern-subtle': '#333333',
    '--modern-transition': 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '--modern-shadow': '0 20px 40px rgba(0, 0, 0, 0.3)',
    '--modern-blur': 'blur(10px)',
    '--modern-border-radius': '0px' // 銳利邊緣更現代
  }
};