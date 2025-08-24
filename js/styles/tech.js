/**
 * Tech Style Configuration
 * 組合: [深色, 輕鬆, 緊湊, 立體] - 科技酷炫的風格
 */

import { Dark } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'tech',
  name: 'Tech 科技風格', 
  description: '黑底霓虹綠色，Matrix終端機風格介面',
  icon: '🤖',
  category: 'futuristic',
  
  // 四個維度的組合
  dimensions: [Dark, Casual, Compact, Dimensional],
  
  // 頁面 URL
  url: 'pages/tech.html',
  buttonText: '體驗 Tech 風格 →',
  
  // 特殊的顏色配置 (覆蓋維度預設值)  
  customColors: {
    primary: '#10b981',      // tech-green
    primaryLight: '#34d399', // tech-green-light
    accent: '#06d6a0',       // cyan accent
    gradientFrom: 'from-gray-900',
    gradientTo: 'via-black to-green-900',
    neonGreen: '#00ff41',    // matrix green
    neonCyan: '#00ffff'      // cyber cyan
  },
  
  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-gray-900 via-black to-green-900 text-green-400',
    hover: 'hover:shadow-green-500/50 hover:-translate-y-2 hover:scale-105',
    transition: 'transition-all duration-400',
    border: 'border border-green-500/20',
    iconBg: 'bg-gradient-to-br from-green-400 to-cyan-400',
    glowEffect: 'shadow-lg shadow-green-500/20'
  },
  
  // 按鈕樣式配置
  buttonStyle: {
    primary: 'bg-green-500 text-black hover:bg-green-400 shadow-lg hover:shadow-green-500/50',
    secondary: 'bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
  },

  // 特殊效果配置
  specialEffects: {
    // 霓虹發光效果
    neonGlow: 'drop-shadow-lg shadow-green-400/50',
    matrixEffect: 'font-mono tracking-wider',
    // Terminal 風格
    terminalCursor: 'animate-pulse',
    // 掃描線效果
    scanlineEffect: 'bg-gradient-to-b from-transparent via-green-400/10 to-transparent',
    // 數位故障效果
    glitchColors: ['#00ff41', '#ff0040', '#00ffff']
  },
  
  // 額外字體 - Matrix/Terminal 風格需要等寬字體
  additionalFonts: [
    'JetBrains+Mono:wght@300;400;500;600;700',
    'Source+Code+Pro:wght@300;400;500;600;700'
  ],
  
  // 這個風格的維度特性描述  
  characteristics: {
    brightness: 'dark',        // 深色
    typography: 'casual',      // 輕鬆 (科技感的無襯線字體)
    spacing: 'compact',        // 緊湊
    effects: 'dimensional'     // 立體 (霓虹發光效果)
  }
};