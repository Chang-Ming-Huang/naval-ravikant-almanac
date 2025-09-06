# CLAUDE.md

這個檔案為 Claude Code (claude.ai/code) 提供在此專案中工作的指導方針。

## 專案概述

這是一個革命性的**維度驅動多風格 JSON 網站系統**，使用納瓦爾·拉維肯特的智慧內容作為範例。專案現已擴展為包含兩個完整系統：

1. **維度驅動系統**: 透過 4 個設計維度的系統性組合生成 16 種風格
2. **AI 創意實驗室**: 完全獨立的 HTML 藝術作品創造系統

**關鍵架構理念**：內容與設計完全分離，維度組合式設計，符合開放封閉原則 (OCP)，同時支持無框架限制的純創意表達。

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
- **`js/loaders/modern.js`**: Modern 風格專用載入器 (現代幾何動畫)
- **`js/loaders/editorial.js`**: Editorial 風格專用載入器 (雜誌排版效果)
- **`js/loaders/playful.js`**: Playful 風格專用載入器 (溫暖親和動畫)
- **`js/loaders/underground.js`**: Underground 風格專用載入器 (地下文化工業美學)
- **`js/loaders/academic.js`**: Academic 風格專用載入器 (學者暗黑燭光效果)
- **`js/loaders/corporate.js`**: Corporate 風格專用載入器 (時尚品牌精品動畫)
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
├── retro.js        # [Light, Casual, Loose, Dimensional]
├── modern.js       # [Light, Casual, Compact, Dimensional]
├── editorial.js    # [Dark, Casual, Loose, Flat]
├── playful.js      # [Light, Casual, Loose, Flat]
├── underground.js  # [Dark, Casual, Loose, Flat]
├── academic.js     # [Dark, Formal, Loose, Flat] - Scholar Dark
└── corporate.js    # [Light, Formal, Compact, Dimensional] - Fashion
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

### 已實現組合 (10/16)
| 風格 | Colors | Typography | Spacing | Effects | 特色 |
|------|--------|------------|---------|---------|------|
| Zen | Light | Formal | Loose | Flat | 極簡、溫暖、優雅 |
| Luxury | Dark | Formal | Compact | Dimensional | 奢華、3D、高端 |
| Tech | Dark | Casual | Compact | Dimensional | 科技、Matrix、霓虹 |
| Retro | Light | Casual | Loose | Dimensional | 80年代、合成波、復古 |
| Scholar Dark | Dark | Formal | Loose | Flat | 深夜學者、燭光護眼 |
| Fashion | Light | Formal | Compact | Dimensional | 時尚精品、奢華質感 |
| Modern | Light | Casual | Compact | Dimensional | 現代科技、幾何美學、未來感 |
| Editorial | Dark | Casual | Loose | Flat | 編輯藝術、雜誌質感、印刷美學 |
| **Playful** | **Light** | **Casual** | **Loose** | **Flat** | **溫暖親和、家庭友善、專業質感** |
| **Underground** | **Dark** | **Casual** | **Loose** | **Flat** | **地下美學、極簡暗黑、工業質感** |

### 待實現組合 (6/16)

**高級設計實作指導原則 (必須遵循)**：
- **設計差異化**: 參考現有風格，創造視覺上截然不同的體驗，每個風格都應有獨特的視覺語言
- **可讀性優先**: 確保文字與背景有足夠對比度 (4.5:1 以上)，使用適當字體大小和行高
- **專業質感**: 重視設計質感勝過炫技動畫，每個動畫都應有明確的功能性目的
- **色彩策略**: 避免過度使用紫色和其他 AI 生成風格標誌色，選擇更具設計感的色彩搭配
- **遵循高級設計原則**: 參考本文件「⭐ 高級網頁設計指導原則」章節的所有技術標準

**技術實作指導 (結合高級設計原則)**：

1. **色彩系統最佳實踐**：
   - ❌ **舊式做法**: 依賴 Tailwind 預設顏色如 `bg-blue-600`, `text-gray-800`
   - ✅ **高級做法**: 使用自定義 CSS 變數搭配精心選擇的色彩 `var(--primary)`, `var(--accent)`
   - ✅ **最佳實踐**: 限制色彩數量至 3-4 種，每個都經過精心調配
   ```css
   :root {
     --primary: #1a1a1a;    /* 深而不純的黑 */
     --accent: #e6e6e6;     /* 溫暖的白 */
     --highlight: #666666;   /* 精確的灰 */
   }
   ```

2. **現代化腳本載入**：
   - ❌ **舊式**: 使用 `<script src="../js/loaders/style.js"></script>`
   - ✅ **現代**: 使用 `<script type="module" src="../js/loaders/style.js"></script>`
   - **重要**: ES6 模組語法確保代碼的模組化和可維護性

3. **專業級樣式架構**：
   - ❌ **框架依賴**: 過度依賴 Tailwind 預設類名
   - ✅ **專業做法**: 自定義 CSS 類名搭配精心設計的樣式系統
   - **高級範例**: 
   ```css
   .professional-card {
     background: rgba(26, 26, 26, 0.9);
     backdrop-filter: blur(10px);
     padding: 60px 40px;
     transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
   }
   ```

4. **開發與調試最佳實踐**：
   - ✅ **必須**: 詳細的載入狀態追蹤和錯誤處理
   - ✅ **必須**: 防禦性程式設計 (`if (!element) return;`)
   - ✅ **必須**: 內容載入驗證和狀態回報
   - ✅ **新增**: 設計質感驗證 - 確保每個元素都符合高級設計標準

5. **專業級響應式設計**：
   - ✅ **高級做法**: 使用 `clamp()` 函數創建流暢的響應式排版
   - ✅ **必須**: 在所有螢幕尺寸保持設計完整性和視覺層次
   - **高級範例**: 
   ```css
   .responsive-title {
     font-size: clamp(3rem, 8vw, 8rem);
     line-height: clamp(0.9, 1vw, 1.1);
   }
   ```

6. **載入順序與效能優化**：
   - ✅ **路徑管理**: 智慧型路徑解析 (`../data/content.json`)
   - ✅ **載入時序**: 確保 DOM 就緒後再執行高級特效
   - ✅ **效能考量**: 使用 `requestAnimationFrame` 優化動畫效能
   - ✅ **漸進增強**: 基本功能優先，特效作為增強體驗

7. **專業級按鈕設計系統**：
   - ❌ **普通做法**: 簡單的背景色和 hover 效果
   - ✅ **專業做法**: 複合樣式系統與精緻交互效果
   - **高級範例**:
   ```javascript
   buttonStyle: {
     primary: 'bg-transparent border-2 border-accent text-accent font-light tracking-wide uppercase transition-all duration-400 hover:bg-accent hover:text-primary position-relative overflow-hidden',
     secondary: 'bg-primary/10 backdrop-blur text-accent border border-accent/20 hover:border-accent/40'
   }
   ```

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
**適用場景**: 時尚品牌、精品電商、設計師品

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

# ⭐ 高級網頁設計指導原則 (重要資訊)

這個章節包含創造專業級、具設計感網頁的核心原則和技術，是從普通 Tailwind 組件風格躍升至獲獎級別設計的關鍵指導。

## 🎨 設計思維轉變

### 1. **跳脫框架依賴**
```
❌ 錯誤思維：依賴 Tailwind 預設組件拼湊
✅ 正確思維：自定義 CSS，創造獨特視覺語言
✅ 正確思維：將每個元素視為藝術作品的一部分
```

### 2. **專業設計原則核心**

#### **空間感系統**
```css
/* ❌ 普通設計：標準間距 */
margin: 20px;
padding: 16px;

/* ✅ 高級設計：非標準比例創造獨特感 */
margin-bottom: 120px;  /* 大量留白創造呼吸感 */
padding: 80px 60px;    /* 寬鬆內距提升質感 */
gap: 80px;             /* 非常見的間距比例 */
```

#### **字體層次革命**
```css
/* ❌ 普通設計：安全的字體大小 */
h1 { font-size: 32px; }

/* ✅ 高級設計：極大標題創造視覺衝擊 */
h1 { 
  font-size: clamp(3.5rem, 7vw, 7rem);
  line-height: 0.95;           /* 緊密行距 */
  letter-spacing: -0.02em;     /* 微妙字距調整 */
  font-weight: 300;            /* 輕字重更優雅 */
}
```

#### **色彩系統精煉**
```css
/* ❌ 普通設計：使用很多顏色 */
.card { background: #3b82f6; }
.text { color: #10b981; }
.accent { color: #f59e0b; }

/* ✅ 高級設計：限制色彩，每個都精準 */
:root {
  --primary: #1a1a1a;      /* 深而不是純黑 */
  --accent: #e6e6e6;       /* 暖白而不是純白 */
  --highlight: #666666;    /* 精確的灰階 */
  --subtle: #333333;       /* 微妙的對比 */
}
/* 只用 3-4 個顏色，但每個都經過精心選擇 */
```

### 3. **專業級交互設計**

#### **自定義游標系統**
```css
.interactive-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(230, 230, 230, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;  /* 混合模式創造酷炫效果 */
  transition: all 0.1s ease;
  transform: translate(-50%, -50%);
}
```

#### **專業緩動函數**
```css
/* ❌ 普通設計：簡單緩動 */
transition: all 0.3s ease;

/* ✅ 高級設計：專業緩動曲線 */
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* 這個緩動曲線來自專業動畫設計 */
```

### 4. **高級視覺細節處理**

#### **幾何裁切創造獨特形狀**
```css
/* ✅ 創造非標準形狀 */
.unique-card {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
}
```

#### **質感效果實現**
```css
/* ✅ 膠片質感 */
.grain-effect {
  background-image: 
    radial-gradient(circle at 25% 25%, white 2px, transparent 0),
    radial-gradient(circle at 75% 75%, white 1px, transparent 0);
  background-size: 50px 50px, 25px 25px;
  opacity: 0.05;
  animation: grain 8s steps(10) infinite;
}

/* ✅ 玻璃模糊效果 */
.glass-effect {
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## 🚀 高級設計策略秘訣

### **數值選擇原則**
```css
/* ❌ 使用 Tailwind 預設數值 */
p-4    /* 16px */
m-6    /* 24px */
text-lg /* 18px */

/* ✅ 使用專業比例數值 */
padding: 80px 60px;        /* 4:3 黃金比例 */
margin-bottom: 120px;      /* 80px 的 1.5 倍 */
font-size: clamp(3.5rem, 7vw, 7rem); /* 響應式極大字體 */
```

### **微妙透明度層次**
```css
/* ✅ 專業透明度階層 */
.subtle { opacity: 0.02; }      /* 極微妙背景 */
.light { opacity: 0.05; }       /* 輕微效果 */
.medium { opacity: 0.1; }       /* 中等顯示 */
.visible { opacity: 0.8; }      /* 主要內容 */
.highlight { opacity: 0.9; }    /* 重點強調 */
```

### **專業動畫時間**
```css
/* ❌ 預設動畫時間 */
animation: fade 0.3s ease;

/* ✅ 專業動畫時序 */
animation: fadeIn 0.8s ease forwards;           /* 進場動畫 */
transition: all 0.4s cubic-bezier(...);        /* 互動動畫 */
animation: floating 6s ease-in-out infinite;   /* 背景動畫 */
```

## 💡 設計質感檢查清單

### **空間設計檢查**
- [ ] 是否有大量留白 (80px+ 間距)
- [ ] 字體大小是否有戲劇性對比 (3rem+ 標題)
- [ ] 行高是否經過調整 (0.9-1.8)
- [ ] 元素是否有呼吸感 (非緊密排列)

### **視覺層次檢查**
- [ ] 色彩是否限制在 3-4 種
- [ ] 每個色彩是否經過精心選擇
- [ ] 透明度是否有微妙層次
- [ ] 字重對比是否明顯 (300 vs 600)

### **交互體驗檢查**
- [ ] 動畫是否使用專業緩動函數
- [ ] hover 效果是否微妙而精緻
- [ ] 載入動畫是否順滑自然
- [ ] 是否有自定義游標或特殊效果

### **技術實現檢查**
- [ ] 是否避免過度依賴 Tailwind 預設
- [ ] CSS 變數是否有語意化命名
- [ ] 是否使用現代 CSS 特性 (clip-path, backdrop-filter)
- [ ] 響應式是否保持設計完整性

## 🎯 從普通到高級的對比範例

### **按鈕設計對比**
```css
/* ❌ 普通設計 */
.button {
  padding: 10px 20px;
  background: #3b82f6;
  border-radius: 6px;
  transition: background 0.2s;
}

/* ✅ 高級設計 */
.button {
  padding: 20px 40px;                                    /* 更大的觸控區域 */
  background: transparent;                               /* 透明背景更精緻 */
  border: 2px solid #e6e6e6;                           /* 邊框而非填充 */
  font-weight: 300;                                     /* 輕字重 */
  letter-spacing: 1px;                                  /* 字母間距 */
  text-transform: uppercase;                            /* 大寫更現代 */
  position: relative;                                    /* 為特效準備 */
  overflow: hidden;                                      /* 隱藏內部動畫 */
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  background: #e6e6e6;
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: translate(-50%, -50%);
}

.button:hover::before {
  width: 300px; height: 300px;                          /* 擴散效果 */
}
```

### **卡片設計對比**
```css
/* ❌ 普通設計 */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ✅ 高級設計 */
.card {
  background: rgba(26, 26, 26, 0.9);                    /* 深色透明 */
  backdrop-filter: blur(10px);                          /* 玻璃效果 */
  padding: 60px 40px;                                   /* 大量內距 */
  border: 1px solid rgba(255, 255, 255, 0.1);          /* 微妙邊框 */
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px)); /* 獨特形狀 */
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card:hover {
  transform: translateY(-10px);                          /* 浮起效果 */
  border-color: rgba(255, 255, 255, 0.2);              /* 邊框變亮 */
}
```

## 📚 專業設計參考來源

### **學習資源**
- **Awwwards**: 獲獎網站設計參考
- **Dribbble**: 高端視覺設計靈感  
- **CSS Design Awards**: 技術實現參考
- **Behance**: 品牌設計案例研究

### **字體組合建議**
```css
/* 現代極簡組合 */
font-family: 'Inter', sans-serif;          /* 正文 */
font-family: 'Space Mono', monospace;      /* 程式碼/數字 */

/* 優雅編輯組合 */  
font-family: 'Crimson Text', serif;        /* 正文 */
font-family: 'JetBrains Mono', monospace;  /* 標題/代碼 */

/* 未來科技組合 */
font-family: 'Orbitron', sans-serif;       /* 標題 */
font-family: 'Roboto', sans-serif;         /* 正文 */
```

### **色彩搭配系統**
```css
/* 極簡黑白系 */
--bg: #0a0a0a;           /* 深黑背景 */
--text: #e6e6e6;         /* 暖白文字 */
--accent: #666666;       /* 中性重點 */

/* 溫暖單色系 */
--bg: #1a1612;           /* 咖啡黑 */
--text: #f5f1eb;         /* 奶油白 */
--accent: #d4a574;       /* 咖啡金 */

/* 冷色單色系 */
--bg: #0f172a;           /* 深藍黑 */
--text: #f8fafc;         /* 冰雪白 */
--accent: #3b82f6;       /* 科技藍 */
```

這些原則確保每個設計都能達到專業級水準，避免看起來像是用框架快速拼湊的結果。記住：**每個細節都要經過精心考慮，沒有隨意的決定。**

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

## 專案狀態與設計革新

**目前版本**: v7.1.0 - 8層空間導航體驗
**維度系統**: 10/16 風格完成 (Zen, Luxury, Tech, Retro, Scholar Dark, Fashion, Modern, Editorial, Playful, Underground)  
**創意實驗室**: 30個獨立風格頁面 + 革命性空間導航實驗室
**空間導航系統**: 8層深度體驗，2100px 總深度，完整3D導航
**完成進度**: 維度系統 62.5%，創意實驗室 100%，空間導航系統 100%
**架構成熟度**: 企業級生產就緒，雙系統完整運行，空間導航技術領先
**設計品質**: 獲獎級專業設計系統，3D空間交互新標準

**最新重大更新 v7.1.0**:
- 🌌 **空間導航實驗室**: 全新8層3D導航體驗
  - 第1層：空間導航體驗 (基礎介紹)
  - 第2層：深度層級2 (進階體驗)  
  - 第3層：深度層級3 (抽象空間)
  - 第4層：量子界面 (量子級數位空間)
  - 第5層：神經網路層 (思維可視化)
  - 第6層：數據矩陣 (純粹信息空間)
  - 第7層：意識流動 (抽象思維數位化)
  - 第8層：奇點核心 (終極抽象層級)
- 🎯 **技術創新**: 2100px總深度，300px層級間距，完整3D變換
- 🎨 **視覺設計**: 每層獨特主題內容，科幻級UI體驗
- 🚀 **交互升級**: 滾輪/鍵盤/點擊多重導航方式
- ✨ **Hero區域優化**: 修正文字溢出，完善響應式體驗

**設計品質指標**:
- ✅ 所有風格達到 Awwwards 參賽水準的視覺質感
- ✅ 專業級色彩系統 (限制 3-4 色，精心調配)
- ✅ 響應式設計使用 `clamp()` 函數達到流暢適配
- ✅ 自定義緩動函數 `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- ✅ 高對比度文字確保完美可讀性 (4.5:1+)

**未來規劃**:
- 🎭 **實驗風格完善**: 完成 Playful 和 Underground 風格的高級設計實作
- 📊 **剩餘風格開發**: 運用專業設計標準完成其餘 8/16 個維度組合
- 🧪 **創新功能**: 探索動態主題切換、個性化偏好系統
- 🏆 **品質保證**: 確保每個風格都具備設計獎項參賽資格

**技術里程碑**:
這個系統不僅實現了維度驅動架構，更重要的是建立了一套完整的**專業級網頁設計方法論**。每個新風格都會遵循嚴格的設計品質標準，確保最終產品具備真正的商業價值和藝術美感。

**設計哲學**:
> "每個細節都要經過精心考慮，沒有隨意的決定。" 
> 
> 我們追求的不只是功能性網站，而是能夠激發情感共鳴的數位藝術作品。