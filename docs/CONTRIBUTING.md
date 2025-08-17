# 🤝 Contributing to Naval Ravikant Almanac

Thank you for your interest in contributing to this interactive presentation website! This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be constructive**: Provide helpful feedback and suggestions
- **Stay focused**: Keep discussions relevant to the project
- **Be patient**: Remember that everyone has different skill levels

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 14.0.0
- **Python** >= 3.7 (for development server)
- **Git** for version control

### Quick Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/naval-ravikant-almanac.git
cd naval-ravikant-almanac

# 3. Install dependencies
npm install

# 4. Set up Playwright for testing
npx playwright install

# 5. Start development server
npm start
```

## 🏗️ Development Setup

### Local Development

```bash
# Start the development server
npm start

# Or with specific port
npm run dev

# Build the project
npm run build

# Run tests
npm test

# Clean build artifacts
npm run clean
```

### File Structure Understanding

```
src/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
└── script.js           # All JavaScript functionality

docs/
├── CLAUDE.md           # Development documentation
├── USAGE.md            # Presentation usage guide
└── CONTRIBUTING.md     # This file

tests/
├── website.spec.js     # Main test suite
└── test-*.spec.js      # Additional test files

config/
├── playwright.config.js    # Test configuration
└── mcp_config.json         # MCP server config
```

## 📂 Project Structure

### Core Components

#### HTML Structure (`src/index.html`)
- **Semantic HTML5** with proper section organization
- **Accessibility** attributes for screen readers
- **Data attributes** for popup system (`data-popup`)

#### CSS Architecture (`src/styles.css`)
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Custom Properties** for theming
- **Mobile-first** responsive design
- **Glass-morphism** popup styling

#### JavaScript Functionality (`src/script.js`)
- **Popup System**: Interactive card functionality
- **Navigation**: Smooth scrolling and active states
- **Animations**: Intersection Observer for scroll effects
- **Mobile Support**: Touch events and responsive behavior

## 🛠️ Contributing Guidelines

### Types of Contributions

1. **🐛 Bug Fixes**
   - Fix broken functionality
   - Improve mobile compatibility
   - Resolve accessibility issues

2. **✨ New Features**
   - Additional interactive elements
   - New content sections
   - Enhanced accessibility features

3. **📚 Content Improvements**
   - Better popup content
   - Additional translations
   - Improved explanations

4. **🎨 Design Enhancements**
   - Better visual design
   - Improved animations
   - Enhanced mobile experience

5. **📖 Documentation**
   - Improve guides and documentation
   - Add code comments
   - Update README files

### Before Contributing

1. **Check existing issues** to avoid duplicating work
2. **Create an issue** for major changes to discuss approach
3. **Fork the repository** and create a feature branch
4. **Follow coding standards** outlined below

### Coding Standards

#### HTML Guidelines
```html
<!-- Use semantic HTML5 elements -->
<section class="section wealth-section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <!-- Interactive cards must have data-popup attributes -->
    <div class="card" data-popup="unique-identifier">
      <h3>Card Title</h3>
      <p>Card description</p>
    </div>
  </div>
</section>
```

#### CSS Guidelines
```css
/* Use CSS custom properties for theming */
.section {
  --section-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background: var(--section-bg);
}

/* Mobile-first responsive design */
.card {
  /* Mobile styles first */
  padding: 1rem;
}

@media (min-width: 768px) {
  .card {
    /* Desktop styles */
    padding: 2rem;
  }
}
```

#### JavaScript Guidelines
```javascript
// Use const/let, avoid var
const popupData = {
  'unique-identifier': {
    title: 'Card Title',
    overview: 'Brief overview',
    analysis: 'Detailed analysis with HTML',
    application: 'Practical applications',
    keypoints: 'Key takeaways'
  }
};

// Use modern ES6+ syntax
document.querySelectorAll('[data-popup]').forEach(card => {
  card.addEventListener('click', handleCardClick);
});
```

## 📝 Pull Request Process

### 1. Prepare Your Changes

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Test your changes
npm test

# Build to ensure no errors
npm run build
```

### 2. Commit Guidelines

Use conventional commit messages:

```bash
# Format: type(scope): description
git commit -m "feat(popup): add new interactive card for meditation"
git commit -m "fix(mobile): resolve touch event issues on iOS"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(css): improve card hover animations"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 3. Pull Request Template

When creating a pull request, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Tested on mobile devices
- [ ] Tested popup functionality
- [ ] Cross-browser testing completed

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🎨 Style Guidelines

### Interactive Popup System

When adding new interactive cards:

1. **HTML Structure**:
```html
<div class="card" data-popup="unique-id">
  <h3>Card Title</h3>
  <p>Brief description</p>
</div>
```

2. **JavaScript Data**:
```javascript
'unique-id': {
  title: '🔥 Card Title',
  overview: 'Brief overview of the concept',
  analysis: `<p>Detailed analysis with <strong>HTML formatting</strong></p>`,
  application: `<ul><li>Practical application step 1</li></ul>`,
  keypoints: `<ul><li>Key takeaway 1</li></ul>`
}
```

3. **CSS Styling**:
```css
.card[data-popup] {
  cursor: pointer;
  transition: all 0.3s ease;
}

.card[data-popup]:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Responsive Design Requirements

- **Mobile First**: Design for mobile, enhance for desktop
- **Touch Friendly**: Minimum 44px touch targets
- **Performance**: Use CSS transforms for animations
- **Accessibility**: Proper focus management and ARIA labels

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/website.spec.js

# Debug mode
npm run test:debug

# Generate test report
npm run test:report
```

### Writing Tests

When adding new features, include tests:

```javascript
test('should open popup when card is clicked', async ({ page }) => {
  await page.goto('/');
  
  // Click a card with data-popup
  await page.click('[data-popup="wealth-vs-money"]');
  
  // Check popup appears
  await expect(page.locator('#popup-overlay')).toHaveClass(/active/);
  
  // Check popup content
  await expect(page.locator('.popup-title')).toContainText('財富 vs 金錢');
});
```

### Test Coverage Requirements

- **Popup functionality**: All interactive cards
- **Mobile responsiveness**: Touch events and mobile layouts
- **Navigation**: Smooth scrolling and menu functionality
- **Accessibility**: Keyboard navigation and screen readers

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in package.json
- [ ] GitHub release created with notes

## 💡 Helpful Tips

### Development Workflow

1. **Start Small**: Begin with minor improvements
2. **Test Thoroughly**: Check on multiple devices and browsers
3. **Ask Questions**: Don't hesitate to ask for help in issues
4. **Follow Patterns**: Look at existing code for patterns to follow

### Common Pitfalls

- **Don't forget mobile testing**: Always test on actual mobile devices
- **Check accessibility**: Use screen readers and keyboard navigation
- **Test popup interactions**: Ensure all cards have working popups
- **Verify responsive design**: Test at different screen sizes

### Getting Help

- **Create an issue**: For questions or discussions
- **Check documentation**: Review existing docs first
- **Follow examples**: Look at existing code patterns
- **Be patient**: Maintainers will respond as soon as possible

## 📞 Contact

- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check the [docs](docs/) folder for guides
- **Code Review**: All contributions are reviewed for quality

---

**Thank you for contributing!** 🙏 Your efforts help make this educational resource better for everyone interested in Naval Ravikant's wisdom.