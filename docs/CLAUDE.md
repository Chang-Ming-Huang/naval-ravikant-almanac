# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive presentation website showcasing Naval Ravikant's wisdom from "The Almanack of Naval Ravikant" (《納瓦爾寶典》). It's a modern, elegant single-page application built with vanilla HTML, CSS, and JavaScript, featuring smooth animations, responsive design, and a comprehensive interactive popup system designed for presentations and deep learning.

## Architecture & Structure

### Core Website Files
- `index.html` - Main HTML file with semantic structure using sections: hero, wealth, happiness, thinking, philosophy, and glossary
- `styles.css` - CSS with modern features (Grid, Flexbox, CSS variables, animations, responsive design)
- `script.js` - Vanilla JavaScript handling navigation, animations, parallax effects, and interactive features

### Content Structure
The website follows a card-based layout system with **34 interactive cards** total, each with detailed popup content:
- **致富 (Wealth)** - 4 interactive cards in 2x2 grid about wealth building concepts
- **快樂 (Happiness)** - 4 interactive cards in 2x2 grid about happiness principles  
- **思考 (Thinking)** - 4 interactive cards in 2x2 grid about judgment and learning
- **哲學 (Philosophy)** - 6 interactive cards (3 philosophy concepts + 3 life choice items)
- **關鍵詞彙 (Glossary)** - 4 interactive cards in 2x2 grid with key term definitions
- **Q&A Section** - 12 interactive cards with comprehensive Q&A content

### Design System
- **Responsive Breakpoints**: 1024px (tablet), 768px (mobile nav), 600px (single column)
- **Color Scheme**: Each section has unique gradient backgrounds with consistent card styling
- **Typography**: Inter font family with semantic heading hierarchy
- **Animations**: Fade-in animations, hover effects, parallax scrolling, smooth scroll behavior
- **Interactive Elements**: Glass-morphism popup design with backdrop blur effects
- **Mobile Optimization**: Touch-friendly interactions with enhanced mobile experience

## Development Commands

### Local Development Server
```bash
# Recommended - Custom Python server with auto-browser opening
python3 server.py [port]

# NPM scripts
npm start                    # Start server on port 8000
npm run dev                 # Start server on port 3000
npm run serve               # Alternative start command

# Traditional Python server
python3 -m http.server 8000
```

### Testing Commands
```bash
# Install Playwright and dependencies
npm install
npx playwright install

# Run all tests
npx playwright test
npm run test-website

# Run specific test files
npx playwright test tests/website.spec.js
npx playwright test test-navigation.spec.js

# Debug mode and reports
npx playwright test --debug
npx playwright show-report

# Use simplified config for standalone testing
npx playwright test --config=playwright-simple.config.js
```

### Setup Commands
```bash
# Cross-platform setup scripts
./setup.sh          # Linux/Mac
setup.bat            # Windows

# Manual Playwright MCP server setup
npm run install-playwright
npm run setup-playwright
```

## CSS Architecture

### Layout System
- **Grid-based layouts**: All 4-card sections use `grid-template-columns: repeat(2, 1fr)` for consistent 2x2 grids
- **Card components**: Standardized card styling with hover effects, min-heights, and flexbox alignment
- **Responsive design**: Mobile-first approach with collapsing grids to single column

### Key CSS Classes
- `.grid-container`, `.happiness-grid`, `.thinking-grid`, `.glossary-grid` - 2x2 grid layouts
- `.card`, `.happiness-principle`, `.thinking-card`, `.glossary-item` - Card components with data-popup attributes
- `.hero`, `.section` - Main layout containers
- `.navbar` - Fixed navigation with mobile hamburger menu
- `.popup-overlay`, `.popup-container`, `.popup-content` - Interactive popup system
- `.qa-item`, `.choice-item`, `.philosophy-card` - Specialized interactive elements

## JavaScript Features

### Core Functionality
- **Smooth scrolling navigation** with active state highlighting
- **Parallax effects** for hero section (optimized to prevent layout issues)
- **Mobile navigation** with hamburger menu toggle
- **Scroll progress indicator** at top of page
- **Floating action button** for back-to-top functionality
- **Interactive popup system** with 34 detailed content popups
- **Touch-optimized interactions** for mobile devices

### Popup System
- **34 Interactive Cards**: Each with data-popup attributes linking to detailed content
- **Structured Content**: Each popup contains 概述 (Overview), 深度解析 (Analysis), 實際應用 (Application), 關鍵要點 (Key Points)
- **Mobile Optimized**: Touch events, scroll management, responsive design
- **Accessibility**: Keyboard navigation, focus management, screen reader support
- **Glass-morphism Design**: Modern backdrop blur effects with smooth animations

### Animation System
- **Intersection Observer** for fade-in animations on scroll
- **Staggered animations** with calculated delays for grid items
- **Hover effects** with transform preservation
- **Touch feedback** with scale animations on mobile
- **Easter egg**: Konami code (`↑↑↓↓←→←→BA`) triggers rainbow background

## Testing Architecture

### Test Structure
- `tests/website.spec.js` - Comprehensive website functionality tests
- `test-navigation.spec.js` - Focused navigation interaction tests
- `test-page.html` - Interactive testing interface with iframe

### Playwright MCP Integration
- `mcp_config.json` - Configuration for Claude Code MCP server
- Enables automated browser testing, screenshot capture, and responsive testing
- Supports browser automation for navigation testing and UI verification

## Content Management

### Source Content
- `content.md` - Raw content in Chinese about Naval Ravikant's philosophy
- `questions.md` - Study guide and test questions based on the content
- Content is organized around key themes: wealth building, happiness, thinking, and life philosophy

### Content Architecture
The website translates Naval Ravikant's concepts into structured, interactive sections:
1. **"把自己產品化" (Productize Yourself)** - Core concept about creating personal leverage
2. **Four types of luck** - From blind luck to unique character-driven opportunities  
3. **Wealth vs Money vs Status** - Fundamental distinctions about value creation
4. **Positive-sum vs Zero-sum games** - Framework for life decisions
5. **Judgment over effort** - Emphasis on decision-making quality

### Interactive Content Features
- **Presentation Ready**: Each popup serves as detailed speaker notes for presentations
- **Comprehensive Coverage**: 34 topics covering all major concepts from Naval's philosophy
- **Structured Learning**: Content organized with clear sections for easy understanding
- **Mobile Friendly**: Full functionality on mobile devices for on-the-go learning

## Development Notes

### Layout Consistency
All 4-card sections must maintain 2x2 grid layouts. When adding new sections, use the established grid classes and ensure responsive behavior is maintained across all breakpoints.

### Navigation System
The navigation uses anchor links with smooth scrolling. Section IDs must match navigation hrefs: `#hero`, `#wealth`, `#happiness`, `#thinking`, `#philosophy`, `#qa`. JavaScript handles active state management and mobile menu behavior.

### Interactive Elements System
- **Data Attributes**: All interactive cards use `data-popup` attributes with unique identifiers
- **Popup Content**: Stored in JavaScript `popupData` object with structured content
- **Event Handling**: Click and touch events for desktop and mobile compatibility
- **Content Structure**: Each popup follows the format: title, overview, analysis, application, keypoints

### Performance Considerations
- CSS animations use `transform` for optimal performance
- Images and fonts are loaded from CDN (Google Fonts)
- JavaScript uses event delegation and optimized DOM queries
- Parallax effects are throttled to prevent performance issues
- Popup system optimized for smooth animations and mobile performance
- Scroll management prevents background scrolling when popups are active

### Browser Compatibility
- Targets modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Uses modern CSS features (Grid, custom properties, backdrop-filter)
- Touch events for mobile compatibility
- Graceful degradation for older browsers

## Presentation Usage

### How to Use for Presentations
1. **Start Server**: Run `python3 server.py` to start local server
2. **Navigate Sections**: Use the main navigation to move between topics
3. **Interactive Content**: Click any card to open detailed popup with speaker notes
4. **Mobile Support**: Full functionality on tablets and phones for portable presentations
5. **Structured Content**: Each popup provides comprehensive talking points organized by:
   - **概述 (Overview)**: Brief introduction to the concept
   - **深度解析 (Analysis)**: Detailed explanation with examples
   - **實際應用 (Application)**: Practical implementation steps
   - **關鍵要點 (Key Points)**: Summary of main takeaways

### Content Coverage
The website covers all major themes from Naval Ravikant's philosophy:
- Wealth creation and financial independence
- Happiness and mental well-being
- Decision-making and judgment
- Life philosophy and choices
- Key terminology and concepts
- Comprehensive Q&A section