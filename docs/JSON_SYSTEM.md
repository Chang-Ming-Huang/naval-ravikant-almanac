# JSON 內容管理系統

## 概述

本專案已經重新架構，將所有頁面內容統一管理在 JSON 檔案中，方便維護和擴展不同的設計風格。

## 檔案結構

```
book/
├── data/
│   └── content.json          # 統一的內容資料檔案
├── js/
│   ├── zen-content-loader.js # Zen 風格內容載入器
│   └── luxury-content-loader.js # Luxury 風格內容載入器
├── zen.html                     # Zen 風格頁面（使用 JSON）
├── luxury.html                  # Luxury 風格頁面（使用 JSON）
├── design-1-zen.html            # 原始 Zen 風格（未使用 JSON）
├── design-2-luxury.html         # 原始 Luxury 風格（未使用 JSON）
└── test-pages.html              # 測試頁面
```

## JSON 資料結構

### data/content.json

```json
{
  "meta": {
    "title": "網站標題",
    "subtitle": "副標題",
    "description": "網站描述",
    "tagline": "標語",
    "copyright": "版權聲明"
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
    "description": "描述內容",
    "buttons": [
      { "text": "按鈕文字", "href": "#target", "type": "primary|secondary" }
    ]
  },
  "sections": {
    "section-name": {
      "title": "區塊標題",
      "subtitle": "區塊副標題",
      "quote": "引言（選用）",
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

## 內容載入器

### ContentLoader (js/content-loader.js)
- 適用於 Zen 極簡風格頁面
- 提供基本的內容載入和渲染功能
- 支援載入失敗的回退機制

### LuxuryContentLoader (js/luxury-content-loader.js)  
- 適用於 Luxury 奢華風格頁面
- 包含特殊的奢華風格渲染效果
- 支援 3D 動畫和特效

## 使用方式

### 1. 在頁面中引入載入器

**Zen 風格頁面:**
```html
<!-- 在 </footer> 之後 -->
<script src="./js/content-loader.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    document.body.classList.add('loading');
    try {
      await window.contentLoader.init();
      // 重新初始化互動效果
    } finally {
      document.body.classList.remove('loading');
    }
  });
</script>
```

**Luxury 風格頁面:**
```html
<!-- 在 </footer> 之後 -->
<script src="./js/luxury-content-loader.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    document.body.classList.add('loading');
    try {
      await window.luxuryContentLoader.init();
      // 重新初始化奢華風格互動效果
    } finally {
      document.body.classList.remove('loading');
    }
  });
</script>
```

### 2. 頁面元素要求

載入器會尋找以下元素進行內容填充：

- `document.title` - 網站標題
- `.nav-logo h2` - 導航 Logo
- `nav ul` - 導航選單
- `#hero h1, #hero h2, #hero p` - 首頁內容
- `#[section-id] h2, #[section-id] p` - 各區塊標題和副標題
- `.grid` - 卡片容器
- `blockquote` - 引言
- `footer p` - 頁尾版權

## 優勢

1. **統一管理**: 所有內容都在一個 JSON 檔案中，便於維護
2. **多風格支援**: 同一份內容可以套用不同的設計風格
3. **易於擴展**: 新增內容只需修改 JSON 檔案
4. **國際化準備**: 可以輕鬆支援多語言
5. **內容與樣式分離**: 設計師可以專注於樣式，內容管理者專注於內容

## 測試

訪問 `http://localhost:3000/test-pages.html` 查看所有頁面和測試結果。

## 開發伺服器

```bash
npm run dev
# 或
npx http-server . -p 3000 -c-1
```