# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this multi-style JSON website system.

## Project Overview

This is a revolutionary JSON-driven multi-style website system that demonstrates how a single content source can power multiple completely different visual designs. Using Naval Ravikant's wisdom from "The Almanack of Naval Ravikant" (《納瓦爾寶典》) as example content, we've created Zen minimalist and Luxury premium styles that share the same data source.

**Key Innovation**: Same JSON content, infinite visual possibilities.

## Architecture & Structure

### Core System Files
- `data/content.json` - Single source of truth for all website content
- `js/content-loader.js` - Content loader for Zen minimalist style
- `js/luxury-content-loader.js` - Content loader for Luxury premium style
- `design-1-zen-tailwind.html` - Zen style page using Tailwind CSS
- `design-2-luxury-tailwind.html` - Luxury style page using Tailwind CSS
- `test-pages.html` - Testing overview page for all styles

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

### Base ContentLoader (js/content-loader.js)
- Designed for Zen minimalist style
- Loads content from `data/content.json`
- Renders content into appropriate DOM elements
- Handles loading states and error fallback
- Maintains clean, minimal styling approach

### LuxuryContentLoader (js/luxury-content-loader.js)  
- Designed for Luxury premium style
- Extends base functionality with luxury-specific rendering
- Adds premium animations and 3D effects
- Implements luxury color schemes and gradients
- Handles particle effects and advanced interactions

### Content Loader Methods
Both loaders implement these core methods:
- `loadContent()` - Fetch and parse JSON data
- `renderMeta()` - Update document title and meta tags
- `renderNavigation()` - Render navigation menu
- `renderHero()` - Render hero section
- `renderSection(sectionId)` - Render specific content sections
- `renderCards()` - Render card grids
- `renderFooter()` - Render footer content
- `init()` - Initialize and render all content

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

### Zen Minimalist Style (design-1-zen-tailwind.html)
- **Design Philosophy**: Clean, minimal, content-focused
- **Color Palette**: Warm creams, gold accents (`zen-cream`, `zen-gold`)
- **Typography**: Crimson Pro (serif) + Inter (sans-serif)
- **Features**: Subtle animations, clean lines, gentle hover effects
- **CSS Framework**: Tailwind CSS with custom color configuration

### Luxury Premium Style (design-2-luxury-tailwind.html)
- **Design Philosophy**: High-end, visually striking, premium feel
- **Color Palette**: Dark backgrounds, gold gradients (`luxury-navy`, `luxury-gold`)
- **Typography**: Playfair Display (serif) + Source Sans Pro (sans-serif)  
- **Features**: 3D effects, particle animations, shimmer effects, glass-morphism
- **CSS Framework**: Tailwind CSS with luxury color configuration

## Adding New Styles

### 1. Create Content Loader
```javascript
// js/your-style-content-loader.js
class YourStyleContentLoader {
    constructor() {
        this.content = null;
        this.isLoaded = false;
    }

    async loadContent() {
        const response = await fetch('./data/content.json');
        this.content = await response.json();
        return this.content;
    }

    // Implement rendering methods specific to your style
    renderSection(sectionId) {
        // Custom rendering logic for your style
    }

    async init() {
        await this.loadContent();
        // Render all sections
    }
}

window.yourStyleContentLoader = new YourStyleContentLoader();
```

### 2. Create Style Page
```html
<!-- design-3-your-style.html -->
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <!-- Your style-specific CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'your-style': {
                            // Your color palette
                        }
                    }
                }
            }
        }
    </script>
</head>
<body>
    <!-- Your HTML structure -->
    
    <script src="./js/your-style-content-loader.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            document.body.classList.add('loading');
            try {
                await window.yourStyleContentLoader.init();
            } finally {
                document.body.classList.remove('loading');
            }
        });
    </script>
</body>
</html>
```

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

## Architecture Benefits

1. **Separation of Concerns**: Content, styling, and behavior are completely separate
2. **Scalability**: Easy to add unlimited new visual styles
3. **Maintainability**: Content updates apply to all styles automatically  
4. **Flexibility**: Each style can have completely different UX/UI approaches
5. **Performance**: Lightweight system with minimal JavaScript
6. **Accessibility**: Semantic HTML structure maintained across all styles

This architecture demonstrates the power of content-design separation and provides a foundation for building sophisticated multi-brand, multi-theme, or multi-audience websites.