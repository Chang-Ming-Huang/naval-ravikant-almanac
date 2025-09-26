/**
 * Unified Content Loader - 統一的內容載入器
 * 取代原本的多個 content-loader，支援所有風格
 */

class UnifiedContentLoader {
  constructor(styleId = null) {
    this.styleId = styleId;
    this.content = null;
    this.isLoaded = false;
    this.styleConfig = null;
  }

  /**
   * 設定風格 ID
   */
  setStyle(styleId) {
    this.styleId = styleId;
    this.loadStyleConfig();
  }

  /**
   * 載入風格配置
   */
  loadStyleConfig() {
    if (this.styleId && window.styleSystem) {
      this.styleConfig = window.styleSystem.getStyle(this.styleId);
      if (this.styleConfig) {
        console.log(`✓ Style config loaded: ${this.styleConfig.name}`);
      } else {
        console.warn(`❌ Style not found: ${this.styleId}`);
      }
    }
  }

  /**
   * 載入 JSON 內容
   */
  async loadContent() {
    if (this.isLoaded) return this.content;

    try {
      // Smart path detection - check if we're in a subdirectory
      const dataPath = window.location.pathname.includes('/pages/') 
        ? '../data/content.json' 
        : './data/content.json';
      
      const response = await fetch(dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.content = await response.json();
      this.isLoaded = true;
      console.log('✓ Content loaded successfully');
      return this.content;
    } catch (error) {
      console.error('Failed to load content:', error);
      return this.getDefaultContent();
    }
  }

  /**
   * 渲染網站元資訊
   */
  renderMeta() {
    if (!this.content) return;

    const { meta } = this.content;
    
    // 更新 title
    document.title = meta.title + ' - ' + meta.subtitle;
    
    // 更新 meta 標籤
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', meta.description);
    }
  }

  /**
   * 渲染導航選單 (支援不同風格的樣式)
   */
  renderNavigation() {
    if (!this.content) return;

    const { navigation } = this.content;
    
    // 更新 logo
    const logos = document.querySelectorAll('.nav-logo h2, .nav-logo');
    logos.forEach(logo => {
      if (logo.tagName === 'H2') {
        logo.textContent = navigation.logo;
      } else {
        logo.innerHTML = `<h2 class="font-serif text-2xl font-medium text-gray-800 tracking-tight">${navigation.logo}</h2>`;
      }
    });

    // 更新選單項目
    const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
    const mobileMenu = document.querySelector('.mobile-menu ul');

    if (desktopMenu) {
      desktopMenu.innerHTML = this.generateMenuItems(navigation.menuItems, false);
    }
    if (mobileMenu) {
      mobileMenu.innerHTML = this.generateMenuItems(navigation.menuItems, true);
    }
  }

  /**
   * 產生選單項目 HTML (根據風格調整樣式)
   */
  generateMenuItems(menuItems, isMobile = false) {
    // 根據風格配置決定樣式類名
    let baseClass;
    
    if (this.styleConfig) {
      // 根據風格特性調整樣式
      const { characteristics } = this.styleConfig;
      const isDark = characteristics?.brightness === 'dark';
      const textColor = isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800';
      
      baseClass = isMobile 
        ? `block py-3 ${textColor} font-medium transition-colors`
        : `nav-link relative py-2 ${textColor} font-medium transition-colors duration-300`;
    } else {
      // 預設樣式
      baseClass = isMobile 
        ? "block py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
        : "nav-link relative py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors duration-300";
    }

    return menuItems.map(item => 
      `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
    ).join('');
  }

  /**
   * 渲染首頁區塊 (支援不同風格的按鈕樣式)
   */
  renderHero() {
    if (!this.content) return;

    const { hero } = this.content;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // 更新標題
    const h1 = heroSection.querySelector('h1');
    const h2 = heroSection.querySelector('h2');
    const description = heroSection.querySelector('p');

    if (h1) h1.textContent = hero.title;
    if (h2) h2.textContent = hero.subtitle;
    if (description) description.innerHTML = hero.description;

    // 更新按鈕 (根據風格配置調整樣式)
    const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row, .hero-buttons');
    if (buttonsContainer) {
      buttonsContainer.innerHTML = hero.buttons.map(button => {
        const buttonClasses = this.getButtonClasses(button.type);
        return `<a href="${button.href}" class="${buttonClasses}">${button.text}</a>`;
      }).join('');
    }
  }

  /**
   * 獲取按鈕樣式類名 (根據風格配置)
   */
  getButtonClasses(buttonType) {
    const baseClasses = "inline-flex items-center justify-center px-8 py-4 font-medium rounded-2xl transition-all duration-300";
    
    if (this.styleConfig && this.styleConfig.buttonStyle) {
      const styleClasses = this.styleConfig.buttonStyle[buttonType] || this.styleConfig.buttonStyle.primary;
      return `${baseClasses} ${styleClasses}`;
    }
    
    // 預設樣式
    const isPrimary = buttonType === 'primary';
    return isPrimary 
      ? `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 shadow-lg hover:shadow-xl`
      : `${baseClasses} bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1`;
  }

  /**
   * 渲染各個區塊
   */
  renderSection(sectionId) {
    if (!this.content || !this.content.sections[sectionId]) return;

    const sectionData = this.content.sections[sectionId];
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    // 更新標題和副標題
    const title = sectionElement.querySelector('h2');
    const subtitle = sectionElement.querySelector('p');
    
    if (title) title.textContent = sectionData.title;
    if (subtitle) subtitle.textContent = sectionData.subtitle;

    // 渲染卡片
    this.renderCards(sectionElement, sectionData.cards);

    // 渲染引言（如果有的話）
    if (sectionData.quote) {
      this.renderQuote(sectionElement, sectionData.quote);
    }
  }

  /**
   * 渲染卡片 (根據風格配置調整樣式)
   */
  renderCards(sectionElement, cards) {
    const cardsContainer = sectionElement.querySelector('.grid');
    if (!cardsContainer || !cards) return;

    cardsContainer.innerHTML = cards.map(card => {
      const cardClasses = this.getCardClasses();
      
      return `
        <div class="${cardClasses}">
          <div class="relative">
            <div class="flex items-center gap-4 mb-6">
              <div class="text-4xl opacity-80">${card.icon}</div>
              <h3 class="font-serif text-2xl">${card.title}</h3>
            </div>
            <p class="leading-relaxed">${card.description}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * 獲取卡片樣式類名 (根據風格配置)
   */
  getCardClasses() {
    const baseClasses = "group rounded-2xl p-8 shadow-lg cursor-pointer";
    
    if (this.styleConfig && this.styleConfig.cardStyle) {
      const { background, hover, transition, border } = this.styleConfig.cardStyle;
      return `${baseClasses} ${background || ''} ${hover || ''} ${transition || ''} ${border || ''}`.trim();
    }
    
    // 預設樣式
    return `${baseClasses} bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-gray-100`;
  }

  /**
   * 渲染引言
   */
  renderQuote(sectionElement, quote) {
    const quoteElement = sectionElement.querySelector('blockquote');
    if (quoteElement) {
      quoteElement.textContent = quote;
    }
  }

  /**
   * 渲染頁尾
   */
  renderFooter() {
    if (!this.content) return;

    const footer = document.querySelector('footer p');
    if (footer) {
      footer.textContent = this.content.meta.copyright;
    }
  }

  /**
   * 應用風格的 CSS 變數
   */
  applyStyleVars() {
    if (this.styleId && window.styleSystem) {
      window.styleSystem.applyStyleVars(this.styleId);
    }
  }

  /**
   * 初始化並渲染所有內容
   */
  async init(styleId = null) {
    if (styleId) {
      this.setStyle(styleId);
    }
    
    await this.loadContent();
    
    // 應用風格變數
    this.applyStyleVars();
    
    this.renderMeta();
    this.renderNavigation();
    this.renderHero();
    this.renderFooter();

    // 渲染所有區塊
    const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
    sections.forEach(sectionId => {
      this.renderSection(sectionId);
    });

    console.log(`✓ Content rendered successfully${this.styleId ? ` with ${this.styleId} style` : ''}`);
  }

  /**
   * 預設內容（載入失敗時使用）
   */
  getDefaultContent() {
    return {
      meta: { 
        title: "納瓦爾寶典", 
        subtitle: "人生智慧大全",
        description: "矽谷傳奇投資人納瓦爾·拉維肯特的畢生智慧精華",
        copyright: "© 2024 納瓦爾寶典"
      },
      navigation: { 
        logo: "納瓦爾寶典", 
        menuItems: [] 
      },
      hero: { 
        title: "納瓦爾寶典", 
        subtitle: "人生智慧大全",
        description: "內容載入中...",
        buttons: []
      },
      sections: {}
    };
  }
}

// 建立全域實例
window.unifiedContentLoader = new UnifiedContentLoader();

// 匯出類別和實例
export default UnifiedContentLoader;
export { UnifiedContentLoader };