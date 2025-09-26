/**
 * Spacing Dimension - 管理間距相關的樣式
 * 分為緊湊 (Compact) 和寬鬆 (Loose) 兩種選項
 */

export const Compact = {
  id: 'compact',
  name: '緊湊',
  cssVars: {
    // 區塊間距
    '--spacing-section': '3rem',    // 48px
    '--spacing-container': '1.5rem', // 24px
    '--spacing-component': '1rem',   // 16px
    
    // 卡片間距
    '--spacing-card-padding': '1.5rem', // 24px
    '--spacing-card-gap': '1rem',       // 16px
    
    // 文字間距
    '--spacing-text-paragraph': '0.75rem', // 12px
    '--spacing-text-heading': '1rem',      // 16px
    '--spacing-text-section': '2rem',      // 32px
    
    // 按鈕間距
    '--spacing-button-x': '1.5rem',  // 24px
    '--spacing-button-y': '0.75rem', // 12px
    '--spacing-button-gap': '0.75rem', // 12px
    
    // Grid 間距
    '--spacing-grid-gap': '1rem',    // 16px
    '--spacing-grid-column': '1rem'  // 16px
  },
  tailwindClasses: {
    sectionPadding: 'py-12',     // py-12 = 3rem
    containerPadding: 'px-6',    // px-6 = 1.5rem
    componentMargin: 'mb-4',     // mb-4 = 1rem
    
    cardPadding: 'p-6',          // p-6 = 1.5rem
    cardGap: 'gap-4',            // gap-4 = 1rem
    
    textSpacing: 'space-y-3',    // space-y-3 = 0.75rem
    headingMargin: 'mb-4',       // mb-4 = 1rem
    sectionSpacing: 'space-y-8', // space-y-8 = 2rem
    
    buttonPadding: 'px-6 py-3',  // px-6 py-3 = 1.5rem 0.75rem
    buttonGap: 'gap-3',          // gap-3 = 0.75rem
    
    gridGap: 'gap-4',            // gap-4 = 1rem
    gridColumns: 'gap-x-4'       // gap-x-4 = 1rem
  }
};

export const Loose = {
  id: 'loose', 
  name: '寬鬆',
  cssVars: {
    // 區塊間距
    '--spacing-section': '5rem',    // 80px
    '--spacing-container': '2rem',  // 32px
    '--spacing-component': '1.5rem', // 24px
    
    // 卡片間距
    '--spacing-card-padding': '2rem', // 32px
    '--spacing-card-gap': '1.5rem',   // 24px
    
    // 文字間距
    '--spacing-text-paragraph': '1rem',   // 16px
    '--spacing-text-heading': '1.5rem',   // 24px
    '--spacing-text-section': '3rem',     // 48px
    
    // 按鈕間距
    '--spacing-button-x': '2rem',    // 32px
    '--spacing-button-y': '1rem',    // 16px
    '--spacing-button-gap': '1rem',  // 16px
    
    // Grid 間距
    '--spacing-grid-gap': '1.5rem',    // 24px
    '--spacing-grid-column': '1.5rem'  // 24px
  },
  tailwindClasses: {
    sectionPadding: 'py-20',     // py-20 = 5rem
    containerPadding: 'px-8',    // px-8 = 2rem
    componentMargin: 'mb-6',     // mb-6 = 1.5rem
    
    cardPadding: 'p-8',          // p-8 = 2rem
    cardGap: 'gap-6',            // gap-6 = 1.5rem
    
    textSpacing: 'space-y-4',    // space-y-4 = 1rem
    headingMargin: 'mb-6',       // mb-6 = 1.5rem
    sectionSpacing: 'space-y-12', // space-y-12 = 3rem
    
    buttonPadding: 'px-8 py-4',  // px-8 py-4 = 2rem 1rem
    buttonGap: 'gap-4',          // gap-4 = 1rem
    
    gridGap: 'gap-6',            // gap-6 = 1.5rem
    gridColumns: 'gap-x-6'       // gap-x-6 = 1.5rem
  }
};

export default {
  compact: Compact,
  loose: Loose
};