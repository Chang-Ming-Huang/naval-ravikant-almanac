/**
 * Playful Style Configuration - 高級兒童友善設計
 * 維度組合: [Light, Casual, Loose, Flat] - 溫暖親和的家庭設計美學
 * 設計理念: 專業質感的兒童友善界面，溫暖而不幼稚
 */

import { Light } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'playful',
  name: 'Playful 溫暖親和',
  description: '溫暖色調、圓潤設計、親和字體，專業而友善的家庭體驗',
  icon: '🌞',
  category: 'friendly',
  
  // 四個維度的組合
  dimensions: [Light, Casual, Loose, Flat],
  
  // 頁面 URL
  url: 'pages/playful.html',
  buttonText: '體驗溫暖設計 →',
  
  // 高級色彩系統 - 限制至3種核心色彩
  colorSystem: {
    primary: '#f4a261',      // 溫暖橙 - 主要色彩
    secondary: '#e9c46a',    // 溫和黃 - 輔助色彩  
    accent: '#e76f51',       // 珊瑚紅 - 強調色彩
    neutral: '#fefae0',      // 米白色 - 背景基色
    text: '#2d3436',         // 深灰色 - 文字色彩
    textLight: '#636e72'     // 淺灰色 - 次要文字
  },
  
  // 卡片專用樣式配置 - 專業圓潤設計
  cardStyle: {
    // 避免 Tailwind 預設，使用自定義樣式
    background: 'playful-card-bg',
    hover: 'playful-card-hover',
    transition: 'playful-transition',
    border: 'playful-card-border',
    shadow: 'playful-card-shadow'
  },
  
  // 按鈕樣式配置 - 溫和而專業
  buttonStyle: {
    primary: 'playful-btn-primary',
    secondary: 'playful-btn-secondary'
  },

  // 專業字體系統
  fontSystem: {
    primary: 'Nunito',        // 溫和親和的無襯線字體
    secondary: 'Poppins',     // 現代圓潤字體
    weights: [300, 400, 500, 600, 700]
  },
  
  // Google Fonts
  additionalFonts: [
    'Nunito:wght@300;400;500;600;700',
    'Poppins:wght@300;400;500;600;700'
  ],
  
  // 專業動畫系統
  animations: {
    gentleHover: {
      duration: '0.4s',
      timing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    softEntry: {
      duration: '0.8s', 
      timing: 'ease-out'
    }
  },
  
  // 響應式設計系統
  responsive: {
    titleSize: 'clamp(2.5rem, 6vw, 4rem)',
    cardPadding: 'clamp(2rem, 4vw, 3rem)',
    sectionGap: 'clamp(4rem, 8vw, 8rem)'
  },
  
  // 高級設計元素
  designElements: {
    cornerRadius: '24px',
    gentleElevation: '0 8px 32px rgba(244, 162, 97, 0.15)',
    subtleGradient: 'linear-gradient(135deg, #fefae0 0%, #f4f3f0 100%)',
    warmAccent: 'linear-gradient(45deg, #f4a261 0%, #e9c46a 100%)'
  },
  
  // 維度特性描述
  characteristics: {
    brightness: 'light',   // 明亮溫暖
    typography: 'casual',  // 親和友善
    spacing: 'loose',      // 寬鬆舒適
    effects: 'flat'        // 平面簡潔
  }
};