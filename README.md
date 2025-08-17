# 🌟 Naval Ravikant Almanac - Interactive Presentation Website

> An interactive presentation website showcasing wisdom from "The Almanack of Naval Ravikant" (《納瓦爾寶典》) with **34 interactive cards** featuring detailed popup content for deep learning and presentations.

[![Deploy to GitHub Pages](https://github.com/your-username/naval-ravikant-almanac/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/naval-ravikant-almanac/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Key Features

### 🎯 **34 Interactive Cards** 
Each card opens detailed popups with structured content:
- **概述 (Overview)** - Brief introduction
- **深度解析 (Analysis)** - Detailed explanation with examples  
- **實際應用 (Application)** - Practical implementation steps
- **關鍵要點 (Key Points)** - Summary of main takeaways

### 📱 **Presentation Ready**
- **Mobile Optimized**: Full functionality on tablets and phones
- **Touch Friendly**: Enhanced mobile interactions with touch events
- **Speaker Notes**: Each popup serves as comprehensive talking points
- **Professional Design**: Glass-morphism popups with smooth animations

### 🎨 **Modern Design**
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Gradient Backgrounds**: Unique colors for each section
- **Smooth Animations**: Fade-in effects, hover animations, parallax scrolling
- **Interactive Elements**: Progress indicator, floating action buttons

## 📚 Content Sections

### 💰 Wealth (致富) - 4 Interactive Cards
- **財富 vs 金錢**: Understanding the fundamental differences
- **把自己產品化**: Core concept of productizing yourself
- **四種運氣**: From blind luck to character-driven opportunities
- **槓桿效應**: How to amplify personal impact

### 😊 Happiness (快樂) - 4 Interactive Cards  
- **減少慾望**: Path to inner peace
- **活在當下**: Importance of present moment awareness
- **選擇快樂**: Happiness as an internal choice
- **真誠自我**: Wisdom of exiting competition

### 🧠 Thinking (思考) - 4 Interactive Cards
- **判斷力 > 努力**: Importance of good decision-making
- **基礎知識學習**: Building strong knowledge foundations
- **閱讀的力量**: Continuous learning through reading
- **質疑信念**: Maintaining open and critical thinking

### 🏛️ Philosophy (哲學) - 6 Interactive Cards
- **長期賽局**: Applying compound effects
- **正和遊戲**: Value creation mindset
- **持續精進**: Continuous self-improvement
- **三大人生選擇**: Career, location, and partnerships

### 📚 Glossary (關鍵詞彙) - 4 Interactive Cards
- **把自己產品化**: Detailed definition and implementation
- **獨特知識**: Understanding specific knowledge
- **零邊際成本產品**: Digital-age opportunities
- **複利效應**: Compound effects in all areas of life

### ❓ Q&A Section - 12 Interactive Cards
Comprehensive Q&A covering all major concepts with detailed explanations and practical guidance.

## 🚀 Quick Start

### Method 1: Using Python Server (Recommended)

```bash
# Start server on port 8000
python3 scripts/server.py

# Specify different port  
python3 scripts/server.py 3000
```

The server automatically:
- 📂 Shows current directory and file information
- 🌐 Opens website in default browser
- ✅ Provides friendly startup/shutdown messages
- 🛠️ Handles common errors like port conflicts

### Method 2: Using npm Scripts

```bash
# Install dependencies
npm install

# Start development server (port 8000)
npm start

# Start on port 3000
npm run dev

# Run tests
npm test
```

### Method 3: Traditional Python Server

```bash
python -m http.server 8000
```

Then open `src/index.html` in your browser.

## 🧪 Testing

```bash
# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run specific tests
npx playwright test tests/website.spec.js

# Debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

## 📁 Project Structure

```
naval-ravikant-almanac/
├── README.md                    # This file
├── package.json                 # Dependencies and scripts
├── .gitignore                   # Git ignore rules
├── .github/                     # GitHub-specific files
│   ├── workflows/deploy.yml    # Auto-deploy to GitHub Pages
│   └── ISSUE_TEMPLATE.md       # Issue template
├── src/                         # Main source code
│   ├── index.html              # Main HTML file
│   ├── styles.css              # CSS styles
│   └── script.js               # JavaScript functionality
├── docs/                        # Documentation
│   ├── CLAUDE.md               # Development documentation
│   ├── USAGE.md                # Presentation usage guide
│   └── CONTRIBUTING.md         # Contribution guidelines
├── tests/                       # Testing files
│   ├── website.spec.js         # Main test suite
│   ├── test-navigation.spec.js # Navigation tests
│   └── test-page.html          # Test interface
├── config/                      # Configuration files
│   ├── playwright.config.js    # Playwright configuration
│   └── mcp_config.json         # MCP server config
├── scripts/                     # Utility scripts
│   ├── server.py               # Development server
│   ├── setup.sh                # Linux/Mac setup
│   └── setup.bat               # Windows setup
├── content/                     # Source materials
│   ├── source-materials/       # Original content
│   └── analysis-files/         # Research and analysis
└── build/                       # Build output (auto-generated)
```

## 🎯 Usage for Presentations

1. **Start the server**: `python3 scripts/server.py`
2. **Navigate sections**: Use main navigation to move between topics
3. **Interactive content**: Click any card to open detailed popup
4. **Mobile support**: Full functionality on tablets and phones
5. **Speaker notes**: Use popup content as comprehensive talking points

### Perfect for:
- 📊 **Business presentations** on wealth and success principles
- 🎓 **Educational workshops** on philosophy and decision-making
- 💡 **Personal development seminars**
- 📱 **Mobile presentations** for on-the-go sharing

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic structure with accessibility
- **CSS3**: Modern features (Grid, Flexbox, backdrop-filter)
- **Vanilla JavaScript**: No dependencies, ES6+ syntax
- **Playwright**: Automated testing and cross-browser support

### Browser Support
- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+

### Performance Features
- CSS transform-based animations
- Event delegation for optimal DOM manipulation
- Throttled parallax effects
- Optimized mobile touch events

## 🎨 Special Features

### Easter Egg
Enter the Konami code (`↑↑↓↓←→←→BA`) for a rainbow background animation!

### Accessibility  
- Keyboard navigation support
- Screen reader friendly
- Focus management for popups
- Semantic HTML structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## 📚 Documentation

- [Development Guide](docs/CLAUDE.md) - Technical documentation
- [Usage Guide](docs/USAGE.md) - How to use for presentations
- [Contributing Guide](docs/CONTRIBUTING.md) - Contribution guidelines

## 🙏 Acknowledgments

- **Naval Ravikant** for sharing his wisdom
- The open-source community for tools and inspiration
- **"The Almanack of Naval Ravikant"** as the source material

---

**💡 Tip**: This website is designed to be used as an interactive presentation tool. Each of the 34 cards contains comprehensive speaker notes perfect for educational or business presentations on Naval Ravikant's philosophy.