# CLAUDE.md

這個檔案為 Claude Code (claude.ai/code) 提供在此專案中工作的指導方針。

## 專案概述

這是一個革命性的**維度驅動多風格 JSON 網站系統**，使用納瓦爾·拉維肯特的智慧內容作為範例。核心創新是透過 **4 個設計維度的系統性組合**來生成 2⁴ = 16 種不同的視覺風格，同時所有風格共用同一份 JSON 資料源。

**關鍵架構理念**：內容與設計完全分離，維度組合式設計，符合開放封閉原則 (OCP)。

## 開發指令

### 本地開發伺服器
```bash
# 啟動開發伺服器 (任一指令皆可)
npm run dev                     # Port 3000
npm start                      # Port 3000  
npm run serve                  # Port 3000

# 或直接使用
npx http-server . -p 3000 -c-1
```

### 建置與部署
```bash
# 建置產品版本
npm run build                  # 複製檔案至 build/ 目錄

# 預覽建置結果
npm run preview               # 服務 build 目錄

# 清理建置目錄
npm run clean                 # 移除 build/ 目錄
```

### 測試
```bash
# 執行視覺回歸測試
npx playwright test

# 產生新的基準截圖
npx playwright test --update-snapshots
```

## 核心架構

### 雙重載入系統
專案採用雙重架構以支援不同需求：

#### 現代統一系統 (`index.html`)
```
index.html → js/styles/index.js → js/core/*
```
- **`js/core/style-registry.js`**: 集中管理所有風格的註冊器
- **`js/core/unified-content-loader.js`**: 單一載入器支援所有風格
- **用途**: 風格展示頁面，動態生成風格卡片

#### 專業化載入系統 (`pages/*.html`) 
```
pages/*.html → js/loaders/*.js
```
- **`js/loaders/zen.js`**: Zen 風格專用載入器 (包含特殊動畫)
- **`js/loaders/luxury.js`**: Luxury 風格專用載入器 (3D 效果、粒子動畫)
- **`js/loaders/tech.js`**: Tech 風格專用載入器 (Matrix 效果、終端機美學)
- **`js/loaders/retro.js`**: Retro 風格專用載入器 (霓虹發光、合成波效果)
- **用途**: 完整風格體驗頁面，包含風格特有的視覺效果

### 維度驅動設計系統

#### 四個核心維度
- **`js/dimensions/colors.js`**: Light/Dark - 管理背景、文字、邊框顏色
- **`js/dimensions/typography.js`**: Formal/Casual - 管理字體族、粗細、行高
- **`js/dimensions/spacing.js`**: Compact/Loose - 管理 padding、margin、間距
- **`js/dimensions/effects.js`**: Flat/Dimensional - 管理陰影、漸層、動畫

#### 風格配置系統
```
js/styles/
├── index.js        # 風格系統初始化與註冊
├── zen.js          # [Light, Formal, Loose, Flat]
├── luxury.js       # [Dark, Formal, Compact, Dimensional]  
├── tech.js         # [Dark, Casual, Compact, Dimensional]
└── retro.js        # [Light, Casual, Loose, Dimensional]
```

每個風格檔案匯出一個包含維度組合、元資訊和樣式配置的物件。

### 資料架構
- **`data/content.json`**: 統一的內容資料源，包含 meta、navigation、hero、sections
- **路徑智慧偵測**: 載入器自動偵測是在根目錄 (`./data/content.json`) 或子目錄 (`../data/content.json`)

### 導航系統
所有頁面的「首頁」連結指向 `../index.html`，確保使用者可以從任何風格頁面返回主展示頁面。

## 新增風格的標準流程

### 1. 建立風格配置
```javascript
// js/styles/your-style.js
import { Dark } from '../dimensions/colors.js';
import { Casual } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'your-style',
  name: 'Your Style Name',
  description: '風格描述',
  icon: '✨',
  category: 'creative',
  dimensions: [Dark, Casual, Loose, Flat],
  url: 'pages/your-style.html',
  buttonText: '體驗風格 →',
  
  // 系統會自動從維度推導這些特性
  characteristics: {
    brightness: 'dark',    // 從 Dark 維度
    typography: 'casual',  // 從 Casual 維度  
    spacing: 'loose',      // 從 Loose 維度
    effects: 'flat'        // 從 Flat 維度
  },
  
  // 可選：客製化樣式覆蓋
  cardStyle: {
    background: 'bg-your-bg',
    hover: 'hover:shadow-xl',
    border: 'border-your-color'
  },
  
  buttonStyle: {
    primary: 'bg-your-primary hover:bg-your-primary-dark',
    secondary: 'border-your-primary text-your-primary'
  }
};
```

### 2. 註冊風格
```javascript
// js/styles/index.js - 加入新風格到陣列中
import yourNewStyle from './your-new-style.js';

const styles = [
  zenStyle,
  luxuryStyle, 
  techStyle,
  retroStyle,
  yourNewStyle  // 加入新風格
];
```

### 3. 建立專業化載入器 (可選)
如需特殊視覺效果，在 `js/loaders/your-style.js` 建立專用載入器。

### 4. 建立頁面檔案 (可選)
在 `pages/your-style.html` 建立對應的 HTML 頁面檔案。

## 風格系統 API

### Style Registry (`js/core/style-registry.js`)
```javascript
// 註冊風格
styleRegistry.register(styleConfig);
styleRegistry.registerMultiple([style1, style2]);

// 獲取風格
const style = styleRegistry.getStyle('zen');
const allStyles = styleRegistry.getAllStyles();
const modernStyles = styleRegistry.getStylesByCategory('modern');

// 生成 CSS
const cssVars = styleRegistry.generateCSSVars('zen');
const cssClasses = styleRegistry.generateCSSClasses('zen');

// 應用到 DOM
styleRegistry.applyCSSVars('zen'); // 應用到 document.documentElement
```

### Unified Content Loader (`js/core/unified-content-loader.js`)
```javascript
// 初始化與渲染
const loader = new UnifiedContentLoader();
await loader.init('zen'); // 指定風格 ID

// 個別渲染方法
await loader.loadContent();
loader.renderMeta();
loader.renderNavigation();
loader.renderHero();
loader.renderSection('wealth');
loader.renderFooter();
```

## JSON 資料結構規範

### 完整資料結構
```json
{
  "meta": {
    "title": "網站標題",
    "subtitle": "副標題", 
    "description": "網站描述",
    "tagline": "標語",
    "copyright": "版權資訊"
  },
  "navigation": {
    "logo": "Logo 文字",
    "menuItems": [
      { "id": "section-id", "label": "選單文字", "href": "#section-id" }
    ]
  },
  "hero": {
    "title": "主標題",
    "subtitle": "副標題",
    "description": "描述 (支援 HTML)",
    "buttons": [
      { "text": "按鈕文字", "href": "#target", "type": "primary|secondary" }
    ]
  },
  "sections": {
    "wealth": {
      "title": "區塊標題",
      "subtitle": "區塊副標題", 
      "quote": "引言 (可選)",
      "cards": [
        {
          "id": "card-id",
          "icon": "emoji",
          "title": "卡片標題",
          "description": "卡片描述"
        }
      ]
    }
  }
}
```

### 內容更新流程
1. 修改 `data/content.json` 
2. 所有風格頁面自動反映變更
3. 無需重新啟動開發伺服器

## 維度組合表

### 已實現組合 (6/16)
| 風格 | Colors | Typography | Spacing | Effects | 特色 |
|------|--------|------------|---------|---------|------|
| Zen | Light | Formal | Loose | Flat | 極簡、溫暖、優雅 |
| Luxury | Dark | Formal | Compact | Dimensional | 奢華、3D、高端 |
| Tech | Dark | Casual | Compact | Dimensional | 科技、Matrix、霓虹 |
| Retro | Light | Casual | Loose | Dimensional | 80年代、合成波、復古 |
| Scholar Dark | Dark | Formal | Loose | Flat | 深夜學者、燭光護眼 |
| Fashion | Light | Formal | Compact | Dimensional | 時尚精品、奢華質感 |

### 待實現組合 (10/16)

**實作注意事項 (每實作一個風格，就一定要先閱讀以下事項)**：
- 先去看既有的其他網頁的風格，我們要做出「風格差異大」的 16 個不同網頁
- 卡片文字與背景對比度要高，確保文字清楚易讀，整體文字大小適中，方便閱讀體驗
- 專案重點在呈現風格差異，而非炫技動畫，如果需要加入動畫，請保持簡潔，避免過度複雜影響維護性
- 盡量避免使用紫色，紫色很容易被說成是 ai 自動生成的網頁顏色

**Technical Implementation Guidelines (避免常見錯誤)**：

1. **顏色系統錯誤與解決**：
   - ❌ **錯誤**: 使用自定義 CSS 變數如 `academic-blue`, `text-academic-text` 等
   - ✅ **正確**: 使用標準 Tailwind 顏色如 `bg-blue-600`, `text-gray-800`, `text-white`
   - **原因**: Tailwind 無法在 JavaScript 字符串中解析自定義 CSS 變數，導致樣式不生效

2. **載入器腳本問題**：
   - ❌ **錯誤**: 使用 `<script src="../js/loaders/style.js"></script>`
   - ✅ **正確**: 使用 `<script type="module" src="../js/loaders/style.js"></script>`
   - **原因**: ES6 模組需要明確指定 `type="module"` 才能正確載入

3. **CSS 類名衝突問題**：
   - ❌ **錯誤**: 在 JavaScript 中混用自定義變數和 Tailwind 類名
   - ✅ **正確**: 統一使用 Tailwind 標準類名，或在 CSS 中預先定義完整樣式
   - **範例**: `'bg-blue-600 text-white'` 而不是 `'bg-academic-blue text-white'`

4. **調試與錯誤追蹤**：
   - ✅ **必須**: 在載入器中添加詳細的 console.log 來追蹤載入狀態
   - ✅ **必須**: 檢查 DOM 元素是否存在再操作 (`if (!element) return;`)
   - ✅ **必須**: 驗證內容資料是否正確載入 (`console.log('Content loaded:', this.content)`)

5. **響應式設計實作**：
   - ✅ **必須**: 在 CSS 中明確定義網格規則，不完全依賴 Tailwind
   - ✅ **必須**: 測試各種螢幕尺寸確保佈局正確
   - **範例**: 添加 CSS 規則確保 `.grid.md:grid-cols-2` 正確運作

6. **檔案路徑與載入順序**：
   - ✅ **檢查**: 確認 JSON 檔案路徑正確 (`../data/content.json`)
   - ✅ **檢查**: JavaScript 載入器在 DOM 元素之後載入
   - ✅ **檢查**: 使用 `setTimeout` 確保 DOM 完全就緒後再執行特效

7. **按鈕樣式配置錯誤**：
   - ❌ **錯誤**: 在風格配置的 `buttonStyle` 中使用自定義變數如 `bg-academic-blue`
   - ✅ **正確**: 使用標準 Tailwind 顏色如 `bg-blue-600 text-white hover:bg-blue-700`
   - **影響**: index.html 渲染風格卡片時，按鈕會透明不可見，只有 hover 才看得到
   - **範例**: `buttonStyle: { primary: 'bg-blue-600 text-white hover:bg-blue-700' }`

#### Scholar Dark - 學者暗黑風格 
**維度組合**: [Dark, Formal, Loose, Flat]  
**適用場景**: 深夜研讀、學術研究、古典書房氛圍

**視覺特徵**:
- **配色方案**: 深色背景 (#1a1a1a) + 溫暖琥珀色文字 (#e8e6e3) + 琥珀色重點 (#d97706)
- **字體設置**: 英文 Times New Roman/中文 思源宋體，清晰易讀的襯線字體
- **布局設計**: 寬鬆的閱讀版面，模仿古典書房氛圍
- **關鍵元素**: 燭光效果、溫暖漸層背景、古典引言框

**實作重點**:
- 溫暖護眼的深色主題設計
- 燭光效果和漸層背景
- 長時間閱讀的舒適性
- 古典學者研究室氛圍

#### Fashion - 時尚品牌風格
**維度組合**: [Light, Formal, Compact, Dimensional]  
**適用場景**: 時尚品牌、精品電商、設計師品牌

**視覺特徵**:
- **配色方案**: 純白背景 + 時尚粉色 (#ec4899) + 深灰文字 (#111827)
- **字體設置**: 英文 Didot/中文 思源黑體，時尚雜誌字體
- **布局設計**: 精品級緊湊布局，高端視覺比例
- **關鍵元素**: 精品閃爍動畫、時尚粉色系、雜誌風格排版

**實作重點**:
- 高級時尚品牌的精品質感
- 精品閃爍效果和互動動畫
- 時尚雜誌風格的版面設計
- 奢華質感的視覺呈現

#### Minimal Dark - 極簡建築風格
**維度組合**: [Dark, Formal, Loose, Flat]  
**適用場景**: 建築設計、極簡作品集、藝術展示

**視覺特徵**:
- **配色方案**: 純黑背景 (#000) + 白色文字 (#fff) + 中灰重點 (#666)
- **字體設置**: 英文 Helvetica/中文 蘋方，極簡無襯線字體
- **布局設計**: 大量留白，幾何線條，建築美學比例
- **關鍵元素**: 幾何分割線、網格系統、極簡圖標

**實作重點**:
- 精確的網格系統和比例關係
- 留白空間的藝術運用
- 黑白對比的視覺張力
- 建築感的幾何元素設計

#### Professional - 金融專業風格
**維度組合**: [Dark, Formal, Compact, Flat]  
**適用場景**: 金融商品、專業服務、數據分析

**視覺特徵**:
- **配色方案**: 深藍背景 (#1e3a8a) + 白色文字 + 金色重點 (#f59e0b)
- **字體設置**: 英文 Georgia/中文 思源黑體，嚴謹正式字體
- **布局設計**: 數據導向的緊湊布局，強調信息密度
- **關鍵元素**: 數據圖表樣式、專業圖標、嚴謹的表格設計

**實作重點**:
- 數據可視化的專業呈現
- 深色界面的高對比度設計
- 金融級別的嚴謹視覺語言
- 圖表和數據的清晰展示

#### Modern - 現代科技風格
**維度組合**: [Light, Casual, Compact, Dimensional]  
**適用場景**: 科技產品、新創公司、現代 APP

**視覺特徵**:
- **配色方案**: 漸層背景 + 鮮明色彩搭配
- **字體設置**: 英文 SF Pro/中文 蘋方，現代無襯線字體
- **布局設計**: 卡片式設計，科技感圓角元素
- **關鍵元素**: 現代漸層、微妙動畫、圓角卡片、科技圖標

**實作重點**:
- 實作簡潔的微交互動畫
- 現代漸層背景的技術實現
- 圓角卡片的層次感設計
- 科技感的色彩搭配系統

#### Creative - 創意設計風格
**維度組合**: [Light, Casual, Compact, Flat]  
**適用場景**: 設計師個人網站、創意作品集、設計工作室

**視覺特徵**:
- **配色方案**: 白色基調 + 創意彩色搭配 (多色彩組合)
- **字體設置**: 英文 Inter/中文 思源黑體，現代親和字體
- **布局設計**: 網格展示系統，創意布局變化
- **關鍵元素**: 作品展示網格、色彩搭配展示、創意圖標

**實作重點**:
- 彈性網格系統適應不同作品尺寸
- 色彩搭配的視覺和諧性
- 作品集的最佳展示效果
- 創意元素的平衡與統一

#### Playful - 兒童友善風格
**維度組合**: [Light, Casual, Loose, Flat]  
**適用場景**: 兒童教育、親子網站、遊戲化學習

**視覺特徵**:
- **配色方案**: 明亮色彩組合 (#fbbf24, #10b981, #3b82f6, #f472b6)
- **字體設置**: 英文 Comic Sans/中文 華康少女體，友善圓潤字體
- **布局設計**: 寬鬆布局，大按鈕設計，圓潤元素
- **關鍵元素**: 大型互動按鈕、可愛圖標、彩色裝飾元素

**實作重點**:
- 兒童友善的大型觸控目標
- 明亮色彩的視覺舒適度
- 圓潤設計語言的一致性
- 簡單直觀的互動邏輯

#### Underground - 獨立文化風格
**維度組合**: [Dark, Casual, Loose, Flat]  
**適用場景**: 獨立音樂、街頭藝術、反主流文化

**視覺特徵**:
- **配色方案**: 純黑 (#000) + 霓虹綠 (#00ff00) + 粗糙質感色彩
- **字體設置**: 手寫風格字體/塗鴉字體，反傳統設計
- **布局設計**: 不規則布局，粗糙邊緣，反叛美學
- **關鍵元素**: 手繪風格圖標、粗糙紋理、不規則形狀

**實作重點**:
- 手繪和粗糙質感的 CSS 實現
- 不規則布局的響應式適配
- 反主流美學的視覺平衡
- 保持可讀性的前提下展現風格

#### Editorial - 雜誌媒體風格
**維度組合**: [Dark, Casual, Loose, Dimensional]  
**適用場景**: 線上雜誌、內容媒體、部落格

**視覺特徵**:
- **配色方案**: 深灰背景 (#1f2937) + 白色文字 + 重點紅色 (#ef4444)
- **字體設置**: 英文 Georgia/中文 思源宋體，雜誌級字體
- **布局設計**: 雜誌式多欄布局，圖文並茂設計
- **關鍵元素**: 文章標題樣式、引用塊、圖片說明、閱讀進度

**實作重點**:
- 雜誌式排版的網頁適配
- 長文章的閱讀體驗優化
- 圖文混排的版面控制
- 內容層次的視覺引導

#### Gaming - 遊戲競技風格
**維度組合**: [Dark, Casual, Compact, Flat]  
**適用場景**: 遊戲網站、電競平台、遊戲工作室

**視覺特徵**:
- **配色方案**: 黑色基調 (#0f172a) + 電競綠 (#22c55e) + 警示橙 (#f97316)
- **字體設置**: 英文 Orbitron/中文 思源黑體，科技電競字體
- **布局設計**: 緊湊資訊布局，遊戲 UI 風格
- **關鍵元素**: 遊戲風格按鈕、狀態指示器、競技排行榜樣式

**實作重點**:
- 遊戲 UI 風格的網頁化實現
- 狀態和數據的清晰展示
- 競技感的視覺語言設計
- 暗色主題的高對比度

#### Gallery - 美術館風格
**維度組合**: [Light, Formal, Loose, Dimensional]  
**適用場景**: 美術館、藝術展覽、文化機構

**視覺特徵**:
- **配色方案**: 博物館白 (#fafafa) + 深灰文字 (#374151) + 金色裝飾 (#d4af37)
- **字體設置**: 英文 Playfair Display/中文 思源宋體，優雅襯線字體
- **布局設計**: 寬鬆典雅布局，藝術展示比例
- **關鍵元素**: 優雅邊框、光影效果、展品說明牌樣式

**實作重點**:
- 藝術品的最佳展示效果
- 博物館級別的視覺質感
- 光影效果的 CSS 實現
- 文化藝術的典雅氛圍營造

#### Fashion - 時尚品牌風格
**維度組合**: [Light, Formal, Compact, Dimensional]  
**適用場景**: 時尚品牌、精品電商、設計師品牌

**視覺特徵**:
- **配色方案**: 純白背景 (#fff) + 深灰文字 (#111827) + 時尚粉 (#ec4899)
- **字體設置**: 英文 Didot/中文 思源黑體，時尚雜誌字體
- **布局設計**: 精品級緊湊布局，高端視覺比例
- **關鍵元素**: 產品特寫展示、時尚攝影風格、精品按鈕設計

**實作重點**:
- 產品圖片的最佳展示效果
- 時尚攝影風格的版面設計
- 精品級別的細節質感
- 明亮奢華感的視覺呈現

每個新組合只需要一個配置檔案即可實現。

## 重要開發原則

### OCP 合規性 (開放封閉原則)
- **開放擴展**: 可以無限新增風格而不修改現有程式碼
- **封閉修改**: 新增功能時不需要修改 core 系統或現有風格
- **實現方式**: 透過配置檔案註冊、維度組合、統一介面

### 維度重用性
- 每個維度管理正交的 CSS 屬性組，避免衝突
- 新風格透過組合現有維度產生，而非從零編寫
- 維度修改會影響所有使用該維度的風格

### 路徑一致性
- **從 pages/ 到根目錄**: 使用 `../` (如 `../index.html`)
- **從根目錄到 data/**: 使用 `./data/` (如 `./data/content.json`)
- **從 pages/ 到 data/**: 使用 `../data/` (如 `../data/content.json`)
- **載入器檔案命名**: 使用簡潔風格名 (如 `zen.js` 而非 `zen-content-loader.js`)

### GitHub Pages 相容性
- 根目錄必須有 `index.html` 作為入口點
- 使用相對路徑確保 GitHub Pages 正常運作
- 避免使用絕對路徑或假設特定伺服器配置
- 所有資源路徑使用相對路徑參照

### 效能考量
- 統一系統使用單一載入器，減少程式碼重複
- 專業化系統允許風格特有的最佳化效果
- CSS 變數動態生成，避免靜態 CSS 檔案肥大
- 內容載入器支援錯誤處理和後備內容

### 測試策略
- 視覺回歸測試確保風格一致性
- 每個新風格都應該有對應的測試截圖
- 內容載入測試確保 JSON 資料正確解析

## 故障排除

### 常見問題

**風格不顯示在 index.html**
- 檢查風格是否在 `js/styles/index.js` 中註冊
- 確認風格配置檔案匯出正確
- 檢查瀏覽器 console 錯誤訊息

**頁面載入失敗**
- 確認所有路徑使用相對路徑
- 檢查 `data/content.json` 格式正確性
- 確認載入器檔案存在且可存取

**樣式不正確**
- 檢查維度匯入是否正確
- 確認 CSS 變數有正確應用到 DOM
- 檢查 Tailwind 類名拼寫

### 除錯工具
- 瀏覽器 console 會顯示風格註冊和載入狀態
- `styleRegistry.getStats()` 查看已註冊風格統計
- `window.styleRegistry` 和 `window.unifiedContentLoader` 可在 console 中直接存取

## 專案狀態

**目前版本**: v4.0.0
**已實現風格**: 6/16 (Zen, Luxury, Tech, Retro, Scholar Dark, Fashion)
**架構成熟度**: 生產就緒
**最新更新**: 
- ✅ Scholar Dark 學者暗黑風格：深夜研讀的溫暖護眼體驗
- ✅ Fashion 時尚品牌風格：高級時尚品牌的精品奢華質感
- ✅ index.html 風格卡片樣式優化：每個風格都有專屬的視覺特色
**未來規劃**: 完成剩餘 10 個維度組合風格

這個系統已經實現了完整的維度驅動架構，新增風格的邊際成本極低，是一個高度可擴展的設計系統。