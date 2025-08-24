# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this revolutionary **dimensional-driven multi-style JSON website system**.

## Project Overview

This is a revolutionary **dimensional-driven architecture** that demonstrates how a single content source can power infinite visual styles through systematic dimension combinations. Using Naval Ravikant's wisdom from "The Almanack of Naval Ravikant" (《納瓦爾寶典》) as example content, we've created a **4-dimensional design system** that generates 2⁴ = 16 unique style combinations.

**Key Innovation**: Dimensional design system + OCP compliance + zero CSS conflicts + unified style registry system.

## Current Status (v4.0.0)

✅ **Completed Features**:
- 4 fully implemented styles: Zen, Luxury, Tech, Retro
- Dimensional-driven architecture with 4 dimensions (Colors, Typography, Spacing, Effects)
- Unified style registry system for centralized style management
- Unified content loader supporting all styles
- Dynamic index.html with OCP compliance
- Complete documentation and examples

✅ **Implemented Styles** (4/16):
- Zen: [Light, Formal, Loose, Flat] - Minimalist elegance
- Luxury: [Dark, Formal, Compact, Dimensional] - Premium dark theme
- Tech: [Dark, Casual, Compact, Dimensional] - Futuristic tech style
- Retro: [Light, Casual, Loose, Dimensional] - 80s synthwave aesthetic

## Architecture & Structure

### Dimensional-Driven Architecture

#### Core System Files
- `data/content.json` - Single source of truth for all website content
- `js/core/style-registry.js` - Centralized style registration and management system
- `js/core/unified-content-loader.js` - Unified content loader supporting all styles  
- `js/styles/index.js` - Style system initialization and auto-registration
- `index.html` - Dynamic homepage with complete OCP compliance

#### Four Design Dimensions
- `js/dimensions/colors.js` - Colors: Light/Dark (background, text, borders)
- `js/dimensions/typography.js` - Typography: Formal/Casual (fonts, weights, spacing)
- `js/dimensions/spacing.js` - Spacing: Compact/Loose (padding, margins, gaps)
- `js/dimensions/effects.js` - Effects: Flat/Dimensional (shadows, animations)

#### Style Combination Configs
- `js/styles/zen.js` - [Light, Formal, Loose, Flat] combination
- `js/styles/luxury.js` - [Dark, Formal, Compact, Dimensional] combination  
- `js/styles/tech.js` - [Dark, Casual, Compact, Dimensional] combination
- `js/styles/retro.js` - [Light, Casual, Loose, Dimensional] combination
- `js/styles/index.js` - Style system initialization and management

### GitHub Pages Setup
**Important**: 由於我們會推上 github 並用 github page 作為展示頁面，所以 root 資料夾中必定要有一個 index.html 當作入口頁面。

For GitHub Pages deployment, we need to create an `index.html` file in the root directory that serves as the entry point.

### JSON Data Structure
The unified content structure in `data/content.json`:

```json
{
  "meta": {
    "title": "Website title",
    "subtitle": "Website subtitle",
    "description": "Website description",
    "copyright": "Copyright notice"
  },
  "navigation": {
    "logo": "Logo text",
    "menuItems": [
      { "id": "section-id", "label": "Menu text", "href": "#section-id" }
    ]
  },
  "hero": {
    "title": "Main title",
    "subtitle": "Subtitle",
    "description": "Hero description",
    "buttons": [
      { "text": "Button text", "href": "#target", "type": "primary|secondary" }
    ]
  },
  "sections": {
    "wealth": {
      "title": "Section title",
      "subtitle": "Section subtitle", 
      "quote": "Inspirational quote (optional)",
      "cards": [
        {
          "id": "card-id",
          "icon": "emoji",
          "title": "Card title",
          "description": "Card description"
        }
      ]
    }
  }
}
```

## Content Loader Architecture

### Unified Content Loader System (js/core/unified-content-loader.js)
- **Revolutionary Unified Approach**: One loader supports ALL styles
- **Dimensional CSS Generation**: Automatically generates CSS from style dimensions
- **Dynamic Style Application**: Applies CSS variables and classes based on style configuration
- **OCP Compliance**: Adding new styles requires ZERO changes to the loader
- **Performance Optimized**: Single loader instance with style-specific rendering

### Legacy Content Loaders (js/legacy/)
- **js/content-loader.js** - Original Zen style loader (maintained for compatibility)
- **js/luxury-content-loader.js** - Original Luxury style loader (maintained for compatibility)
- **js/tech-content-loader.js** - Original Tech style loader (maintained for compatibility)
- **js/retro-content-loader.js** - Original Retro style loader (maintained for compatibility)

### Unified Content Loader Methods
The unified loader implements these core methods:
- `loadContent()` - Fetch and parse JSON data
- `renderMeta()` - Update document title and meta tags  
- `renderNavigation()` - Render navigation menu
- `renderHero()` - Render hero section with style-specific adaptations
- `renderSection(sectionId)` - Render content sections with dimensional styling
- `renderCards()` - Render card grids with adaptive layouts
- `renderFooter()` - Render footer content
- `applyStyleConfig(styleConfig)` - Apply dimensional CSS and variables
- `init(styleConfig)` - Initialize with specific style configuration

## Development Commands

### Local Development Server
```bash
# Start development server
npm run dev                     # Port 3000
npm start                      # Port 3000  
npm run serve                  # Port 3000

# Alternative method
npx http-server . -p 3000 -c-1
```

### Build and Deploy
```bash
# Build for production
npm run build                  # Copy files to build/ directory

# Preview build
npm run preview               # Serve build directory

# Clean build directory
npm run clean                 # Remove build/ directory
```

## Style System Architecture

### Style Registry System
The revolutionary style registry system provides centralized management of all styles:

#### Style Registration API
```javascript
import styleRegistry from './js/core/style-registry.js';

// Register individual style
styleRegistry.register(styleConfig);

// Register multiple styles
styleRegistry.registerMultiple([zen, luxury, tech, retro]);

// Retrieve styles
const allStyles = styleRegistry.getAllStyles();
const zenStyle = styleRegistry.getStyle('zen');
const modernStyles = styleRegistry.getStylesByCategory('modern');

// Apply CSS variables
styleRegistry.applyCSSVars('zen');
```

#### Implemented Style Profiles

### 🧘 Zen Minimalist Style [Light, Formal, Loose, Flat]
- **Design Philosophy**: Clean, minimal, content-focused
- **Dimensional Profile**: Light Colors + Formal Typography + Loose Spacing + Flat Effects
- **Color Palette**: Warm creams, gold accents (`zen-cream`, `zen-gold`)  
- **Typography**: Crimson Pro (serif) + Inter (sans-serif)
- **Features**: Subtle animations, clean lines, gentle hover effects

### 💎 Luxury Premium Style [Dark, Formal, Compact, Dimensional]
- **Design Philosophy**: High-end, visually striking, premium feel  
- **Dimensional Profile**: Dark Colors + Formal Typography + Compact Spacing + Dimensional Effects
- **Color Palette**: Dark backgrounds, gold gradients (`luxury-navy`, `luxury-gold`)
- **Typography**: Playfair Display (serif) + Source Sans Pro (sans-serif)
- **Features**: 3D effects, particle animations, shimmer effects, glass-morphism

### 🤖 Tech Futuristic Style [Dark, Casual, Compact, Dimensional]
- **Design Philosophy**: Cyberpunk aesthetic, futuristic interface design
- **Dimensional Profile**: Dark Colors + Casual Typography + Compact Spacing + Dimensional Effects
- **Color Palette**: Deep blacks, electric blues, neon accents
- **Typography**: JetBrains Mono (monospace) + Inter (sans-serif)
- **Features**: Matrix-style effects, terminal aesthetics, neon glows

### 🌈 Retro Synthwave Style [Light, Casual, Loose, Dimensional] 
- **Design Philosophy**: 80s synthwave aesthetic, vibrant and nostalgic
- **Dimensional Profile**: Light Colors + Casual Typography + Loose Spacing + Dimensional Effects
- **Color Palette**: Vibrant pinks, purples, electric blues
- **Typography**: Orbitron (futuristic) + Inter (sans-serif)
- **Features**: Neon glows, gradient overlays, retro animations

## Adding New Styles (Dimensional-Driven Method)

### 🚀 **ULTRA SIMPLE**: Just One Configuration File!

Thanks to the dimensional-driven architecture, adding new styles is incredibly simple:

```javascript
// js/styles/your-new-style.js
import { Dark } from '../dimensions/colors.js';        // Choose Dark
import { Casual } from '../dimensions/typography.js';  // Choose Casual
import { Loose } from '../dimensions/spacing.js';      // Choose Loose  
import { Flat } from '../dimensions/effects.js';       // Choose Flat

export default {
  id: 'your-style',
  name: 'Your Amazing Style',
  description: 'Your style description',
  icon: '✨',
  category: 'creative',
  
  // The four-dimension combination - this IS your style!
  dimensions: [Dark, Casual, Loose, Flat],
  
  url: 'pages/design-your-style.html',
  buttonText: 'Experience Your Style →',
  
  // Optional: Custom color overrides
  customColors: {
    primary: '#your-color',
    accent: '#accent-color'
  },
  
  characteristics: {
    brightness: 'dark',    // Dark
    typography: 'casual',  // Casual
    spacing: 'loose',      // Loose
    effects: 'flat'        // Flat
  }
};
```

### Register New Style
```javascript
// js/styles/index.js - Add your style
import yourNewStyle from './your-new-style.js';

const styles = [
  zenStyle,
  luxuryStyle, 
  techStyle,
  retroStyle,
  yourNewStyle  // ← That's it!
];
```

### ✨ **That's All!**
- ✅ index.html automatically displays your new style
- ✅ Style cards are auto-generated
- ✅ Button styles are auto-applied
- ✅ Perfect OCP compliance
- ✅ Zero existing code changes required

## Content Management

### Updating Content
1. Edit `data/content.json` - all changes automatically reflect across all styles
2. Content structure must match expected format for all loaders
3. Test changes across all style implementations

### Adding New Sections
1. Add section data to `data/content.json` under `sections`
2. Update content loaders to handle new section in `renderSection()` method
3. Add corresponding HTML structure in style pages
4. Test responsive behavior across all breakpoints

### Internationalization Preparation
The architecture naturally supports multiple languages:
- Create `data/content-en.json`, `data/content-zh.json`, etc.
- Modify loaders to accept language parameter
- Implement language switching in navigation

## Browser Compatibility & Performance

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Features
- Async content loading with loading states
- Tailwind CSS for optimized styling
- Event delegation for optimal DOM manipulation
- Lazy loading preparation for future expansion
- Minimal JavaScript footprint

### Mobile Optimization
- Responsive design across all styles
- Touch-friendly interactions
- Optimized animations for mobile devices
- Progressive enhancement approach

## Testing & Quality Assurance

### Visual Testing
- Use `test-pages.html` to compare all styles side-by-side
- Test responsive behavior at different breakpoints
- Verify content consistency across all styles

### Content Validation
- Ensure all required JSON fields are present
- Test loading error scenarios and fallbacks
- Verify accessibility of dynamically generated content

## Deployment Considerations

### GitHub Pages Setup
1. Ensure `index.html` exists in root (entry point requirement)
2. All assets must be served over HTTPS
3. Relative paths required for proper GitHub Pages functionality
4. Consider creating `index.html` that redirects to `test-pages.html`

### Production Build
- Use `npm run build` to create optimized build directory
- Verify all JSON files and assets are included
- Test build directory with `npm run preview`

## Development Best Practices

### Content Loader Development
- Always implement error handling and fallback content
- Maintain consistent API across different style loaders
- Use semantic HTML structure for accessibility
- Follow responsive design principles

### Style Development  
- Use Tailwind CSS utility classes for consistency
- Implement proper loading states and transitions
- Ensure keyboard navigation support
- Test across multiple devices and browsers

### Content Structure
- Keep JSON structure flat and simple
- Use consistent naming conventions
- Include all necessary metadata
- Plan for future expansion and localization

## Dimensional-Driven Architecture Benefits

### 🏗️ **Architectural Excellence**
1. **Perfect OCP Compliance**: Open for extension (new styles), closed for modification (existing code)
2. **Zero CSS Conflicts**: Each dimension manages orthogonal CSS property groups
3. **Predictable Combinations**: Dimension combinations produce completely predictable results
4. **Component Reusability**: 8 dimension components generate 16 style combinations
5. **Maintenance Efficiency**: Modify one dimension, affect multiple styles systematically

### 🎯 **Development Benefits**
1. **Rapid Style Development**: New styles require only one configuration file
2. **Systematic Design**: Dimensional approach ensures consistent design language
3. **Scalable Architecture**: Supports unlimited style combinations without complexity growth
4. **Error Prevention**: Dimensional separation prevents accidental style conflicts
5. **Team Collaboration**: Designers can work on dimensions independently

### 🚀 **Business Value**
1. **Time-to-Market**: New brands/themes can be launched in minutes, not days
2. **Brand Consistency**: Dimensional constraints ensure brand guideline compliance
3. **A/B Testing**: Easy creation of style variants for experimentation
4. **Multi-Audience**: Same content, different styles for different target audiences
5. **Seasonal Themes**: Quick deployment of holiday or seasonal style variations

This represents a fundamental shift from **artisan design** (each style hand-crafted) to **systematic design** (styles as dimensional combinations).