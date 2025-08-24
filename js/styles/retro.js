/**
 * Retro Style Configuration
 * 組合: [明亮, 輕鬆, 寬鬆, 立體] - 復古溫暖的風格  
 */

import { Light } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'retro',
  name: 'Retro 復古風格',
  description: '80年代合成波美學，橘藍漸層與溫和發光效果',
  icon: '🌈',
  category: 'vintage',
  
  // 四個維度的組合
  dimensions: [Light, Casual, Loose, Dimensional],
  
  // 頁面 URL  
  url: 'pages/retro.html',
  buttonText: '體驗 Retro 風格 →',
  
  // 特殊的顏色配置 (覆蓋維度預設值)
  customColors: {
    primary: '#f97316',      // retro-orange
    primaryLight: '#fb923c', // retro-orange-light
    accent: '#06b6d4',       // retro-cyan
    gradientFrom: 'from-orange-900',
    gradientTo: 'via-yellow-800 to-cyan-900',
    synthOrange: '#ff6b35',  // synthwave orange
    synthCyan: '#00d4ff',    // synthwave cyan  
    synthPink: '#ff0080'     // synthwave pink
  },
  
  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-orange-900 via-yellow-800 to-cyan-900 text-white',
    hover: 'hover:shadow-orange-500/50 hover:-translate-y-2 hover:scale-105',
    transition: 'transition-all duration-500',
    border: 'border border-orange-500/30',
    iconBg: 'bg-gradient-to-br from-orange-400 to-cyan-400',
    glowEffect: 'shadow-lg',
    retroGrid: 'bg-gradient-to-br from-orange-500/10 to-cyan-500/10'
  },
  
  // 按鈕樣式配置
  buttonStyle: {
    primary: 'bg-gradient-to-r from-orange-500 to-cyan-500 text-white hover:from-orange-400 hover:to-cyan-400 shadow-lg hover:shadow-orange-500/50',
    secondary: 'bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white'
  },

  // 特殊效果配置
  specialEffects: {
    // 80年代合成波效果
    synthwaveGlow: 'drop-shadow-lg',
    retroGradient: 'bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400',
    // 網格背景效果
    gridPattern: 'linear-gradient(rgba(255,102,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,102,0,0.1) 1px, transparent 1px)',
    gridSize: '20px 20px',
    // 霓虹描邊效果
    neonOutline: 'text-shadow: 0 0 8px rgba(255, 102, 0, 0.8)',
    // VHS 故障效果
    vhsColors: ['#ff6b35', '#00d4ff', '#ff0080']
  },
  
  // 額外字體 - 80年代風格字體
  additionalFonts: [
    'Orbitron:wght@400;500;600;700;800',
    'Exo+2:wght@300;400;500;600;700'
  ],
  
  // 裝飾元素
  decorativeElements: {
    // 復古幾何圖形
    square: 'w-4 h-4 border border-orange-400/50 rotate-45',
    circle: 'w-6 h-6 border border-cyan-400/50 rounded-full',
    // 合成波風格的裝飾線條
    synthLine: 'h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent'
  },
  
  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',       // 明亮 (但有深色漸層覆蓋)
    typography: 'casual',      // 輕鬆 (科幻感的字體)  
    spacing: 'loose',          // 寬鬆
    effects: 'dimensional'     // 立體 (發光和 3D 效果)
  }
};