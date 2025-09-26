/**
 * Colors Dimension - 管理顏色相關的樣式
 * 分為明亮 (Light) 和深色 (Dark) 兩種選項
 */

export const Light = {
  id: 'light',
  name: '明亮',
  cssVars: {
    // 基礎背景色
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--bg-tertiary': '#f1f5f9',
    
    // 文字顏色
    '--text-primary': '#1e293b',
    '--text-secondary': '#64748b',
    '--text-muted': '#94a3b8',
    
    // 邊框顏色
    '--border-primary': '#e2e8f0',
    '--border-secondary': '#cbd5e1',
    
    // 卡片背景
    '--card-bg': '#ffffff',
    '--card-hover-bg': '#f8fafc'
  },
  tailwindClasses: {
    background: 'bg-white',
    backgroundSecondary: 'bg-gray-50', 
    backgroundTertiary: 'bg-gray-100',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    borderPrimary: 'border-gray-200',
    borderSecondary: 'border-gray-300',
    cardBg: 'bg-white',
    cardHoverBg: 'hover:bg-gray-50'
  }
};

export const Dark = {
  id: 'dark',
  name: '深色',
  cssVars: {
    // 基礎背景色
    '--bg-primary': '#0f172a',
    '--bg-secondary': '#1e293b',
    '--bg-tertiary': '#334155',
    
    // 文字顏色
    '--text-primary': '#f8fafc',
    '--text-secondary': '#cbd5e1',
    '--text-muted': '#94a3b8',
    
    // 邊框顏色
    '--border-primary': '#334155',
    '--border-secondary': '#475569',
    
    // 卡片背景
    '--card-bg': '#1e293b',
    '--card-hover-bg': '#334155'
  },
  tailwindClasses: {
    background: 'bg-slate-900',
    backgroundSecondary: 'bg-slate-800',
    backgroundTertiary: 'bg-slate-700', 
    textPrimary: 'text-slate-50',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    borderPrimary: 'border-slate-700',
    borderSecondary: 'border-slate-600',
    cardBg: 'bg-slate-800',
    cardHoverBg: 'hover:bg-slate-700'
  }
};

export default {
  light: Light,
  dark: Dark
};