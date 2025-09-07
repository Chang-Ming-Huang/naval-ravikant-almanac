/**
 * Underground Style Configuration - 高級地下文化美學
 * 維度組合: [Dark, Casual, Loose, Flat] - 極簡暗黑藝術設計
 * 設計理念: 地下文化的精緻表達，反叛而不失品味
 */

import { Dark } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'underground',
  name: 'Underground 地下美學',
  description: '極簡暗黑設計、工業質感、前衛視覺語言，精緻的反叛美學',
  icon: '🏴',
  category: 'culture',
  
  // 四個維度的組合
  dimensions: [Dark, Casual, Loose, Flat],
  
  // 頁面 URL
  url: 'pages/underground.html',
  buttonText: '探索地下美學 →',
  
  // 高級色彩系統 - 極簡三色系統
  colorSystem: {
    primary: '#0d0d0d',      // 深黑 - 主背景
    secondary: '#1a1a1a',    // 中黑 - 卡片背景  
    accent: '#ff3333',       // 醒目紅 - 唯一彩色強調
    neutral: '#333333',      // 深灰 - 邊框/分割線
    text: '#e0e0e0',         // 淺灰 - 主要文字
    textDim: '#888888'       // 暗灰 - 次要文字
  },
  
  // 卡片專用樣式配置 - 工業極簡
  cardStyle: {
    background: 'underground-card-bg',
    hover: 'underground-card-hover', 
    transition: 'underground-transition',
    border: 'underground-card-border',
    shadow: 'underground-card-shadow'
  },
  
  // 按鈕樣式配置 - 極簡反叛
  buttonStyle: {
    primary: 'underground-btn-primary',
    secondary: 'underground-btn-secondary'
  },

  // 專業字體系統 - 工業感字體
  fontSystem: {
    primary: 'Inter',         // 現代極簡無襯線
    secondary: 'JetBrains Mono', // 等寬代碼字體
    accent: 'Space Mono',     // 空間感等寬字體
    weights: [300, 400, 500, 600, 700]
  },
  
  // Google Fonts  
  additionalFonts: [
    'Inter:wght@300;400;500;600;700',
    'JetBrains+Mono:wght@300;400;500;600;700',
    'Space+Mono:wght@400;700'
  ],
  
  // 專業動畫系統
  animations: {
    sharpTransition: {
      duration: '0.3s',
      timing: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)'
    },
    subtlePulse: {
      duration: '2s',
      timing: 'ease-in-out infinite'
    }
  },
  
  // 響應式設計系統
  responsive: {
    titleSize: 'clamp(3rem, 8vw, 8rem)',
    cardPadding: 'clamp(3rem, 6vw, 5rem)', 
    sectionGap: 'clamp(6rem, 12vw, 12rem)'
  },
  
  // 高級設計元素 - 工業美學
  designElements: {
    cornerRadius: '2px',      // 極小圓角保持工業感
    sharpElevation: '0 4px 20px rgba(0, 0, 0, 0.6)',
    textureGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
    accentGradient: 'linear-gradient(90deg, #ff3333 0%, #ff6666 100%)',
    gridPattern: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(51, 51, 51, 0.1) 1px, rgba(51, 51, 51, 0.1) 2px)'
  },
  
  // 地下文化設計元素
  cultureElements: {
    // 極簡裝飾符號
    symbols: ['■', '▪', '▫', '□'],
    // 工業分割線
    dividers: ['—', '━', '─', '│'],
    // 標記元素
    markers: ['▶', '◀', '▲', '▼']
  },
  
  // 高級排版系統
  typography: {
    // 使用極大字體創造視覺衝擊
    heroTitle: {
      size: 'clamp(4rem, 10vw, 12rem)',
      weight: '300',
      letterSpacing: '-0.03em',
      lineHeight: '0.85'
    },
    // 對比性的小字體
    metadata: {
      size: '0.75rem',
      weight: '500', 
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  },
  
  // 維度特性描述
  characteristics: {
    brightness: 'dark',    // 極暗工業背景
    typography: 'casual',  // 前衛現代字體
    spacing: 'loose',      // 大量留白創造張力
    effects: 'flat'        // 平面但有質感
  }
};