# 🎨 CodePen Analyzer

專業級 CodePen 分析工具，使用 Playwright 自動提取代碼並進行智能設計分析。

## ✨ 功能特色

- 🌐 **自動提取**：從任何 CodePen URL 提取 HTML、CSS、JavaScript 代碼
- 🎭 **智能分析**：自動分析設計特徵、色彩搭配、動畫複雜度等
- 💡 **整合建議**：基於分析結果提供具體的項目整合建議
- 🆓 **完全免費**：純 JavaScript 規則引擎，不消耗任何 AI API token
- ⚡ **即時分析**：本地運行，無需網絡等待
- 🤖 **AI 友好**：任何 AI 助手都可以使用此工具

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 安裝 Playwright 瀏覽器
```bash
npm run install-playwright
```

### 分析 CodePen
```bash
node analyze-codepen.js https://codepen.io/[用戶名]/pen/[筆記ID]
```

## 📖 使用範例

### 基本分析
```bash
node analyze-codepen.js https://codepen.io/Ma5a/pen/yyYEoZo
```

### 輸出範例
```
🎯 開始分析 CodePen: https://codepen.io/Ma5a/pen/yyYEoZo

📋 基本資訊:
  📝 標題: window scroll birds
  👤 作者: Ma5a
  🌐 URL: https://codepen.io/Ma5a/pen/yyYEoZo

📊 代碼統計:
  🌐 HTML: 201 字符
  🎨 CSS: 13657 字符
  ⚡ JS: 9889 字符

🎭 詳細設計特徵:
  🎨 色彩搭配: 4 種顏色
  🎭 動畫複雜度: 高
  📐 佈局方式: Flexbox, 絕對定位
  📱 響應式特性: 視窗單位
  🔮 現代CSS特性: CSS變數
  ⚡ JS複雜度: 高
  🖱️ 互動特性: 事件監聽, 滾動互動, 時間控制

💡 整合建議:
  1. 🎨 CSS 代碼豐富，適合作為獨立的實驗性風格整合到 prototypes/
  2. ⚡ JavaScript 邏輯複雜，可以提取核心概念用於創意配置器
  3. 🎭 動畫效果豐富，可以提取關鍵動畫用於現有風格系統
```

## 🔧 配置選項

### 查看完整代碼
修改 `analyze-codepen.js` 中的設定：
```javascript
const showFullCode = true;  // 設為 true 顯示完整代碼
```

## 📁 檔案結構

```
tools/codepen-analyzer/
├── analyze-codepen.js      # 主要分析工具 (推薦使用)
├── codepen-extractor.js    # 核心提取引擎
├── test-codepen.js         # 基本測試工具
├── package.json           # 專案配置
└── README.md              # 說明文件
```

## 🎯 分析能力

### 自動檢測特徵
- **色彩分析**：自動統計 hex、rgba、hsla 顏色
- **動畫複雜度**：計算 @keyframes、animation、transform 使用量
- **佈局方式**：檢測 Grid、Flexbox、絕對定位等
- **響應式特性**：識別媒體查詢、clamp()、視窗單位
- **現代 CSS**：檢測 CSS 變數、backdrop-filter、clip-path 等
- **JavaScript 複雜度**：基於代碼長度和特徵判斷
- **互動性分析**：檢測事件監聽、滾動互動、時間控制等

### 整合建議生成
- 基於代碼複雜度自動建議整合方式
- 根據設計特徵推薦應用場景
- 提供具體的技術實現建議

## 🤖 AI 使用指南

任何 AI 助手都可以使用此工具：

1. **安裝環境**：確保有 Node.js 和 Playwright
2. **執行分析**：`node analyze-codepen.js [CodePen URL]`
3. **解析結果**：獲得結構化的分析報告
4. **應用建議**：根據分析結果進行學習或整合

## ⚙️ 技術實現

- **網頁自動化**：Playwright (Chromium)
- **代碼提取**：多策略 DOM 查詢 (CodeMirror、textarea等)
- **設計分析**：正則表達式 + 規則引擎
- **報告生成**：結構化 JSON + 格式化輸出
- **無 AI 依賴**：純 JavaScript，不消耗 API token

## 🔍 支援的 CodePen 特徵

- ✅ 標準 CodePen 編輯器
- ✅ CodeMirror 代碼編輯器  
- ✅ 預填充內容
- ✅ 隱藏代碼區塊
- ✅ 複雜動畫和互動
- ✅ 現代 CSS 特性
- ✅ ES6+ JavaScript

## 🛠️ 疑難排解

### 常見問題

**問題**：CodePen 載入超時
**解決**：某些 CodePen 可能需要更長載入時間，工具會自動重試

**問題**：代碼提取不完整  
**解決**：工具使用多種策略提取代碼，通常能處理各種 CodePen 結構

**問題**：分析結果不準確
**解決**：分析基於啟發式規則，可以修改 `performDetailedAnalysis` 函數調整判斷標準

### 環境需求
- Node.js 14.0.0+
- Playwright 1.55.0+
- 足夠的系統記憶體運行瀏覽器

## 📄 授權條款

MIT License - 可自由使用、修改和分發。

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進此工具：
- 新增更多分析規則
- 改進代碼提取策略  
- 優化報告格式
- 添加新的整合建議邏輯

---

**由 Multi-Style JSON Website 專案開發** | 完全開源 | AI 友好設計