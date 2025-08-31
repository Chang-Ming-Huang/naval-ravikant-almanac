# 🛠️ Tools Directory

這個目錄包含多風格 JSON 網站專案的開發工具集。

## 📁 工具目錄

### 🎨 CodePen Analyzer
**路徑**: `tools/codepen-analyzer/`

專業級 CodePen 分析工具，能夠：
- 自動提取任何 CodePen 的 HTML、CSS、JavaScript 代碼
- 智能分析設計特徵、色彩搭配、動畫複雜度等
- 提供項目整合建議
- 完全免費，不消耗 AI API token

**快速使用**:
```bash
cd tools/codepen-analyzer
npm install
node analyze-codepen.js https://codepen.io/[用戶名]/pen/[筆記ID]
```

詳細說明請參閱：[CodePen Analyzer README](codepen-analyzer/README.md)

## 🚀 未來工具

隨著專案發展，這個目錄將包含更多實用工具：

- **Style Generator** - 自動生成新的風格配置
- **Dimension Builder** - 維度組合器和測試工具  
- **Performance Analyzer** - 網站效能分析工具
- **Content Migrator** - JSON 內容遷移工具
- **Theme Optimizer** - 主題優化建議工具

## 💡 貢獻新工具

如果您想要添加新工具：

1. 在 `tools/` 下創建新目錄
2. 包含完整的 `package.json` 和 `README.md`
3. 遵循專案的代碼風格和文檔標準
4. 確保工具是獨立的，不依賴專案的其他部分
5. 提供清晰的使用範例和說明

## 🤖 AI 友好設計

所有工具都遵循 AI 友好的設計原則：
- 清晰的命令行介面
- 結構化的輸出格式
- 詳細的錯誤訊息
- 完整的使用文檔
- 獨立運行能力

這確保任何 AI 助手都能輕鬆使用這些工具來協助開發工作。