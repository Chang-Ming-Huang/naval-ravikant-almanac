# 🎨 多風格 JSON 網站系統

一個革命性的網站開發系統：使用**維度驅動架構**和單一 JSON 資料檔案，創造無限多種視覺風格。

![](https://img.shields.io/badge/風格-6%2F16-blue) ![](https://img.shields.io/badge/架構-維度驅動-green) ![](https://img.shields.io/badge/原則-OCP-orange)

## ✨ 核心創新

**四維設計系統** - 透過組合產生 2⁴ = **16 種獨特風格**：

| 維度 | 選項 | 管理範圍 |
|------|------|----------|
| **Colors** | 明亮/深色 | 背景、文字、邊框 |
| **Typography** | 正式/輕鬆 | 字體、粗細、行高 |
| **Spacing** | 緊湊/寬鬆 | 間距、布局 |
| **Effects** | 平面/立體 | 陰影、動畫、特效 |

**內容與設計完全分離** - 單一 `data/content.json` 驅動所有風格

## 🎨 風格展示

### 已實現風格 (6/16)

| 風格 | 維度組合 | 視覺特色 |
|------|---------|---------|
| 🧘 **Zen** | [明亮, 正式, 寬鬆, 平面] | 極簡主義、溫暖米色、優雅體驗 |
| 💎 **Luxury** | [深色, 正式, 緊湊, 立體] | 奢華深色、3D 效果、精緻高端 |
| 🤖 **Tech** | [深色, 輕鬆, 緊湊, 立體] | 科技感、Matrix 風格、霓虹發光 |
| 🌈 **Retro** | [明亮, 輕鬆, 寬鬆, 立體] | 80年代合成波、復古溫暖風格 |
| 🌙 **Scholar Dark** | [深色, 正式, 寬鬆, 平面] | 深夜學者、燭光護眼、古典書房 |
| 💄 **Fashion** | [明亮, 正式, 緊密, 立體] | 時尚精品、雜誌風格、奢華質感 |

### 待開發風格 (10/16)
每個新風格只需**一個配置檔案**，零修改現有程式碼 ✨

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:3000
```

### 瀏覽不同風格
- **🏠 主頁面**: `index.html` - 動態風格展示
- **🧘 Zen**: `pages/zen.html` - 極簡主義體驗
- **💎 Luxury**: `pages/luxury.html` - 奢華深色主題
- **🤖 Tech**: `pages/tech.html` - 科技未來風格  
- **🌈 Retro**: `pages/retro.html` - 復古合成波美學

## 🔧 新增風格

```javascript
// js/styles/your-style.js
import { Dark, Casual, Loose, Flat } from '../dimensions/';

export default {
  id: 'your-style',
  name: 'Your Amazing Style',
  dimensions: [Dark, Casual, Loose, Flat], // 四維組合定義風格
  // 其他配置...
};
```

就是這麼簡單！系統會自動：
- ✅ 生成 CSS 變數和類名
- ✅ 註冊到風格系統
- ✅ 在主頁面顯示風格卡片

## 🛠️ 技術特色

- **🏗️ 維度驅動設計**: 系統性組合而非手工製作
- **🔀 OCP 合規**: 新增功能不修改現有程式碼
- **📱 響應式設計**: Mobile-first + Tailwind CSS
- **⚡ 零衝突**: 每個維度管理正交的 CSS 屬性組
- **🎯 GitHub Pages 就緒**: 相對路徑，無需特殊配置

## 🎯 使用場景

- **多品牌網站** - 同一內容，不同品牌視覺
- **季節主題** - 節慶風格快速切換  
- **A/B 測試** - 不同設計風格效果測試
- **個性化界面** - 用戶自選喜好風格

---

**💡 這不只是多主題網站，而是一個可複製的設計系統架構**

📚 詳細開發指南請參考 [CLAUDE.md](CLAUDE.md)