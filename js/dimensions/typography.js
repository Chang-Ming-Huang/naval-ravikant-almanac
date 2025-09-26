/**
 * Typography Dimension - 管理字體相關的樣式
 * 分為正式 (Formal) 和輕鬆 (Casual) 兩種選項
 */

export const Formal = {
  id: 'formal',
  name: '正式',
  cssVars: {
    // 字體家族
    '--font-heading': '"Playfair Display", "Times New Roman", serif',
    '--font-body': '"Source Sans Pro", "Arial", sans-serif',
    '--font-accent': '"Crimson Pro", "Georgia", serif',
    
    // 字重
    '--font-weight-light': '300',
    '--font-weight-normal': '400',
    '--font-weight-medium': '500',
    '--font-weight-semibold': '600',
    '--font-weight-bold': '700',
    
    // 行高
    '--line-height-tight': '1.2',
    '--line-height-normal': '1.5',
    '--line-height-loose': '1.7',
    
    // 字間距
    '--letter-spacing-tight': '-0.025em',
    '--letter-spacing-normal': '0',
    '--letter-spacing-wide': '0.025em'
  },
  tailwindClasses: {
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    fontAccent: 'font-serif',
    weightLight: 'font-light',
    weightNormal: 'font-normal', 
    weightMedium: 'font-medium',
    weightSemibold: 'font-semibold',
    weightBold: 'font-bold',
    leadingTight: 'leading-tight',
    leadingNormal: 'leading-normal',
    leadingLoose: 'leading-relaxed',
    trackingTight: 'tracking-tight',
    trackingNormal: 'tracking-normal',
    trackingWide: 'tracking-wide'
  },
  googleFonts: [
    'Playfair+Display:wght@300;400;500;600;700',
    'Source+Sans+Pro:wght@300;400;500;600;700',
    'Crimson+Pro:wght@300;400;500;600;700'
  ]
};

export const Casual = {
  id: 'casual',
  name: '輕鬆',
  cssVars: {
    // 字體家族
    '--font-heading': '"Inter", "Helvetica Neue", sans-serif',
    '--font-body': '"Inter", "Helvetica Neue", sans-serif', 
    '--font-accent': '"JetBrains Mono", "Consolas", monospace',
    
    // 字重
    '--font-weight-light': '300',
    '--font-weight-normal': '400', 
    '--font-weight-medium': '500',
    '--font-weight-semibold': '600',
    '--font-weight-bold': '700',
    
    // 行高
    '--line-height-tight': '1.3',
    '--line-height-normal': '1.6', 
    '--line-height-loose': '1.8',
    
    // 字間距
    '--letter-spacing-tight': '-0.02em',
    '--letter-spacing-normal': '0',
    '--letter-spacing-wide': '0.05em'
  },
  tailwindClasses: {
    fontHeading: 'font-sans',
    fontBody: 'font-sans',
    fontAccent: 'font-mono',
    weightLight: 'font-light',
    weightNormal: 'font-normal',
    weightMedium: 'font-medium', 
    weightSemibold: 'font-semibold',
    weightBold: 'font-bold',
    leadingTight: 'leading-tight',
    leadingNormal: 'leading-relaxed',
    leadingLoose: 'leading-loose',
    trackingTight: 'tracking-tight',
    trackingNormal: 'tracking-normal',
    trackingWide: 'tracking-wider'
  },
  googleFonts: [
    'Inter:wght@300;400;500;600;700',
    'JetBrains+Mono:wght@300;400;500;600;700'
  ]
};

export default {
  formal: Formal,
  casual: Casual
};