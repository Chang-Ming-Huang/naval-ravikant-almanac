/**
 * Luxury Style Configuration  
 * 組合: [深色, 正式, 緊湊, 立體] - 奢華高端的風格
 */

import { Dark } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Compact } from '../dimensions/spacing.js';
import { Dimensional } from '../dimensions/effects.js';

export default {
  id: 'luxury',
  name: 'Luxury 奢華風格',
  description: '深色奢華主題，金色漸層配3D光影特效',
  icon: '💎',
  category: 'premium',
  
  // 四個維度的組合
  dimensions: [Dark, Formal, Compact, Dimensional],
  
  // 頁面 URL
  url: 'pages/luxury.html',
  buttonText: '體驗 Luxury 風格 →',
  
  // 特殊的顏色配置 (覆蓋維度預設值)
  customColors: {
    primary: '#d97706',      // luxury-gold
    primaryLight: '#f59e0b', // luxury-gold-light
    accent: '#d97706',
    gradientFrom: 'from-gray-900',
    gradientTo: 'to-gray-700',
    goldGradient: 'from-yellow-400 to-yellow-600'
  },
  
  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-gray-900 to-gray-700 text-white',
    hover: 'hover:shadow-2xl hover:-translate-y-2 hover:scale-105',
    transition: 'transition-all duration-500',
    border: 'border border-yellow-500/20',
    iconBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  },
  
  // 按鈕樣式配置
  buttonStyle: {
    primary: 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white'
  },

  // 特殊效果配置
  specialEffects: {
    // 3D 光影效果
    glowEffect: 'drop-shadow-lg',
    shimmerEffect: 'animate-pulse',
    // 粒子效果可以在這裡配置
    particleColors: ['#f59e0b', '#d97706', '#92400e']
  },
  
  // Google Fonts (從 Typography 維度繼承並可擴展)
  additionalFonts: [],
  
  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'dark',        // 深色
    typography: 'formal',      // 正式
    spacing: 'compact',        // 緊湊  
    effects: 'dimensional'     // 立體
  }
};