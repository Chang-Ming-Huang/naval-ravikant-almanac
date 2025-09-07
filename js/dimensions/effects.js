/**
 * Effects Dimension - 管理視覺效果相關的樣式
 * 分為平面 (Flat) 和立體 (Dimensional) 兩種選項
 */

export const Flat = {
  id: 'flat',
  name: '平面',
  cssVars: {
    // 陰影效果
    '--shadow-none': 'none',
    '--shadow-subtle': '0 1px 2px rgba(0, 0, 0, 0.05)',
    '--shadow-small': '0 1px 3px rgba(0, 0, 0, 0.1)',
    '--shadow-medium': '0 4px 6px rgba(0, 0, 0, 0.1)', 
    '--shadow-large': '0 10px 15px rgba(0, 0, 0, 0.1)',
    
    // 邊框圓角
    '--border-radius-none': '0',
    '--border-radius-small': '0.25rem', // 4px
    '--border-radius-medium': '0.5rem', // 8px
    '--border-radius-large': '0.75rem', // 12px
    '--border-radius-xl': '1rem',       // 16px
    
    // 動畫效果
    '--animation-duration-fast': '150ms',
    '--animation-duration-normal': '300ms',
    '--animation-duration-slow': '500ms',
    '--animation-easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // 變形效果
    '--transform-scale': '1',
    '--transform-translate-y': '0',
    '--transform-rotate': '0deg',
    
    // 漸層效果
    '--gradient-none': 'none',
    '--gradient-subtle': 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%)'
  },
  tailwindClasses: {
    shadowNone: 'shadow-none',
    shadowSubtle: 'shadow-sm',
    shadowSmall: 'shadow',
    shadowMedium: 'shadow-md',
    shadowLarge: 'shadow-lg',
    
    roundedNone: 'rounded-none',
    roundedSmall: 'rounded',
    roundedMedium: 'rounded-lg',
    roundedLarge: 'rounded-xl',
    roundedXl: 'rounded-2xl',
    
    transitionFast: 'transition-all duration-150',
    transitionNormal: 'transition-all duration-300',
    transitionSlow: 'transition-all duration-500',
    
    transformNone: 'transform-none',
    scaleNormal: 'scale-100',
    translateNone: 'translate-y-0',
    
    gradientNone: 'bg-none'
  }
};

export const Dimensional = {
  id: 'dimensional', 
  name: '立體',
  cssVars: {
    // 陰影效果
    '--shadow-none': 'none',
    '--shadow-subtle': '0 2px 4px rgba(0, 0, 0, 0.1)',
    '--shadow-small': '0 4px 8px rgba(0, 0, 0, 0.15)',
    '--shadow-medium': '0 8px 16px rgba(0, 0, 0, 0.15)',
    '--shadow-large': '0 16px 32px rgba(0, 0, 0, 0.15)',
    '--shadow-xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    
    // 邊框圓角
    '--border-radius-none': '0',
    '--border-radius-small': '0.5rem',  // 8px
    '--border-radius-medium': '1rem',   // 16px
    '--border-radius-large': '1.5rem',  // 24px
    '--border-radius-xl': '2rem',       // 32px
    
    // 動畫效果
    '--animation-duration-fast': '200ms',
    '--animation-duration-normal': '400ms',
    '--animation-duration-slow': '600ms',
    '--animation-easing': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    
    // 變形效果
    '--transform-scale': '1.05',
    '--transform-translate-y': '-8px',
    '--transform-rotate': '1deg',
    
    // 漸層效果
    '--gradient-subtle': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    '--gradient-medium': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
    '--gradient-strong': 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)'
  },
  tailwindClasses: {
    shadowNone: 'shadow-none',
    shadowSubtle: 'shadow-md',
    shadowSmall: 'shadow-lg',
    shadowMedium: 'shadow-xl',
    shadowLarge: 'shadow-2xl',
    shadowXl: 'drop-shadow-2xl',
    
    roundedNone: 'rounded-none',
    roundedSmall: 'rounded-lg',
    roundedMedium: 'rounded-xl',
    roundedLarge: 'rounded-2xl',
    roundedXl: 'rounded-3xl',
    
    transitionFast: 'transition-all duration-200 ease-out',
    transitionNormal: 'transition-all duration-400 ease-out',
    transitionSlow: 'transition-all duration-600 ease-out',
    
    transformHover: 'hover:scale-105 hover:-translate-y-2',
    scaleHover: 'hover:scale-105',
    translateHover: 'hover:-translate-y-2',
    
    gradientSubtle: 'bg-gradient-to-br',
    gradientMedium: 'bg-gradient-to-br',
    gradientStrong: 'bg-gradient-to-br'
  }
};

export default {
  flat: Flat,
  dimensional: Dimensional
};