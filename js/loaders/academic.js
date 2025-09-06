/**
 * Scholar Dark Content Loader - 學者暗黑風格專用載入器
 * 實現深夜學者研究室的溫暖護眼閱讀氛圍
 */

class ScholarDarkContentLoader {
  constructor() {
    this.content = null;
    this.isLoaded = false;
  }

  /**
   * 載入 JSON 內容
   */
  async loadContent() {
    if (this.isLoaded) return this.content;

    try {
      const response = await fetch('../data/content.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.content = await response.json();
      this.isLoaded = true;
      console.log('✅ Scholar Dark content loaded successfully');
      return this.content;
    } catch (error) {
      console.error('Failed to load scholar dark content:', error);
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
    document.title = `${meta.title} - 學者暗黑風格 | Scholar Dark Style`;
    
    // 更新 meta 標籤
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', `${meta.description} - 深夜學者研究室風格展示`);
    }
  }

  /**
   * 渲染導航選單
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
        logo.innerHTML = `<h2 class="font-serif text-2xl font-medium text-amber-300 tracking-tight">${navigation.logo}</h2>`;
      }
    });

    // 更新選單項目
    this.renderMenuItems(navigation.menuItems);
  }

  /**
   * 產生學者暗黑風格的選單項目
   */
  renderMenuItems(menuItems) {
    const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
    const mobileMenu = document.querySelector('.mobile-menu ul');

    const desktopMenuHTML = menuItems.map(item => 
      `<li><a href="${item.href}" class="nav-link relative py-3 px-6 text-amber-200 font-medium hover:text-amber-100 transition-all duration-300 rounded-lg hover:bg-gray-800/50">${item.label}</a></li>`
    ).join('');

    const mobileMenuHTML = menuItems.map(item => 
      `<li><a href="${item.href}" class="block py-3 px-4 text-amber-200 font-medium hover:text-amber-100 hover:bg-gray-800/50 transition-colors rounded-md">${item.label}</a></li>`
    ).join('');

    if (desktopMenu) desktopMenu.innerHTML = desktopMenuHTML;
    if (mobileMenu) mobileMenu.innerHTML = mobileMenuHTML;
  }

  /**
   * 渲染首頁區塊
   */
  renderHero() {
    if (!this.content) return;

    const { hero } = this.content;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // 更新標題和內容
    const h1 = heroSection.querySelector('h1');
    const h2 = heroSection.querySelector('h2');
    const description = heroSection.querySelector('p');

    if (h1) {
      h1.textContent = hero.title;
      h1.className = 'font-serif text-5xl md:text-6xl font-light text-amber-200 mb-8 leading-tight tracking-wide';
    }
    if (h2) {
      h2.textContent = hero.subtitle;
      h2.className = 'text-2xl md:text-3xl text-amber-300/80 font-light mb-10 leading-relaxed';
    }
    if (description) {
      description.innerHTML = hero.description;
      description.className = 'text-lg text-gray-300 leading-relaxed mb-16 max-w-4xl mx-auto font-light';
    }

    // 更新按鈕
    this.renderHeroButtons(heroSection, hero.buttons);
  }

  /**
   * 渲染學者暗黑風格的按鈕
   */
  renderHeroButtons(heroSection, buttons) {
    const buttonsContainer = heroSection.querySelector('.hero-buttons, .flex');
    if (!buttonsContainer || !buttons) return;

    const buttonsHTML = buttons.map(button => {
      const isPrimary = button.type === 'primary';
      const buttonClass = isPrimary 
        ? 'inline-flex items-center justify-center px-10 py-4 bg-amber-600 text-gray-900 font-medium rounded-lg hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl'
        : 'inline-flex items-center justify-center px-10 py-4 bg-transparent text-amber-400 border-2 border-amber-600 font-medium rounded-lg hover:bg-amber-600 hover:text-gray-900 transition-all duration-300';
      
      return `<a href="${button.href}" class="${buttonClass}">${button.text}</a>`;
    }).join('');

    buttonsContainer.innerHTML = buttonsHTML;
    buttonsContainer.className = 'flex flex-col sm:flex-row gap-6 justify-center items-center';
  }

  /**
   * 渲染內容區塊
   */
  renderSection(sectionId) {
    if (!this.content || !this.content.sections[sectionId]) return;

    const sectionData = this.content.sections[sectionId];
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    // 更新區塊標題
    const title = sectionElement.querySelector('h2');
    const subtitle = sectionElement.querySelector('p.subtitle, .text-xl');
    
    if (title) {
      title.textContent = sectionData.title;
      title.className = 'font-serif text-4xl md:text-5xl font-light text-amber-200 mb-6 text-center tracking-wide';
    }
    if (subtitle) {
      subtitle.textContent = sectionData.subtitle;
      subtitle.className = 'text-xl text-gray-300 text-center max-w-4xl mx-auto mb-20 font-light leading-relaxed';
    }

    // 渲染學者暗黑風格卡片
    this.renderScholarCards(sectionElement, sectionData.cards);

    // 渲染引言（如果有）
    if (sectionData.quote) {
      this.renderScholarQuote(sectionElement, sectionData.quote);
    }
  }

  /**
   * 渲染學者暗黑風格卡片（溫暖護眼設計）
   */
  renderScholarCards(sectionElement, cards) {
    const cardsContainer = sectionElement.querySelector('.grid');
    if (!cardsContainer || !cards) return;

    const cardsHTML = cards.map(card => `
      <article class="scholar-card bg-gray-800 rounded-xl border border-gray-700 p-10 hover:border-amber-600/50 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
        <header class="flex items-start gap-6 mb-8">
          <div class="text-5xl opacity-80 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">${card.icon}</div>
          <h3 class="font-serif text-2xl font-medium text-amber-200 leading-tight group-hover:text-amber-100 transition-colors duration-300">${card.title}</h3>
        </header>
        <div class="scholar-content">
          <p class="text-gray-300 leading-loose text-base font-light">${card.description}</p>
        </div>
        <!-- 學者風格的燭光分隔線 -->
        <div class="mt-8 pt-6 border-t border-gray-700/50 flex justify-center">
          <div class="w-16 h-px bg-gradient-to-r from-amber-600 to-amber-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </article>
    `).join('');

    cardsContainer.innerHTML = cardsHTML;
    cardsContainer.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-10';
  }

  /**
   * 渲染學者暗黑風格引言（古典書卷感）
   */
  renderScholarQuote(sectionElement, quote) {
    const quoteElement = sectionElement.querySelector('blockquote') || 
                        sectionElement.querySelector('.quote-container');
    
    if (!quoteElement) {
      // 創建學者風格引言區塊
      const quoteSection = document.createElement('div');
      quoteSection.className = 'scholar-quote-section my-24 px-8';
      quoteSection.innerHTML = `
        <div class="max-w-5xl mx-auto">
          <div class="bg-gray-800/60 border-l-4 border-amber-600 rounded-xl p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <!-- 暖光背景裝飾 -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-600/10 to-transparent rounded-full -ml-16 -mb-16"></div>
            
            <div class="relative z-10">
              <div class="flex items-start">
                <div class="text-6xl text-amber-600/40 font-serif leading-none mr-8">"</div>
                <div class="flex-1">
                  <blockquote class="font-serif text-3xl md:text-4xl text-amber-200 font-light italic leading-loose mb-8 tracking-wide">
                    ${quote}
                  </blockquote>
                  <footer class="text-sm text-gray-400 flex items-center font-light">
                    <div class="w-16 h-px bg-amber-600/60 mr-6"></div>
                    <cite class="font-medium text-amber-300">納瓦爾·拉維肯特</cite>
                    <span class="ml-3 text-amber-600/80">• 深夜學者</span>
                  </footer>
                </div>
                <div class="text-6xl text-amber-600/40 font-serif leading-none ml-8 self-end">"</div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // 插入到區塊末尾
      sectionElement.appendChild(quoteSection);
    } else {
      quoteElement.innerHTML = `
        <span class="font-serif text-3xl md:text-4xl text-amber-200 font-light italic leading-loose tracking-wide">
          ${quote}
        </span>
      `;
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
      footer.className = 'text-gray-400 text-center font-light';
    }
  }

  /**
   * 初始化學者暗黑風格特效
   */
  initScholarEffects() {
    // 添加學者暗黑風格的 CSS 變數
    const root = document.documentElement;
    root.style.setProperty('--scholar-dark', '#1a1a1a');
    root.style.setProperty('--scholar-amber', '#d97706');
    root.style.setProperty('--scholar-text', '#e8e6e3');
    
    console.log('🌙 Scholar Dark CSS variables applied');
    
    // 學者風格的燭光效果
    setTimeout(() => {
      this.initCandlelightEffects();
    }, 100);
    
    // 學者風格的滾動效果
    setTimeout(() => {
      this.initScrollEffects();
    }, 200);
    
    // 學者風格的卡片互動效果
    setTimeout(() => {
      this.initCardEffects();
    }, 300);
  }

  /**
   * 燭光暖光效果
   */
  initCandlelightEffects() {
    // 為整體頁面添加溫暖的燭光氛圍
    const body = document.body;
    body.style.background = `
      radial-gradient(circle at 20% 20%, rgba(217, 119, 6, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.03) 0%, transparent 50%),
      #1a1a1a
    `;
    
    // 為導航添加微妙的暖光
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.background = 'rgba(45, 45, 45, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
    }
  }

  /**
   * 學者風格滾動效果
   */
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // 觀察所有學者卡片
    document.querySelectorAll('.scholar-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = `all 0.8s ease ${index * 0.15}s`;
      observer.observe(card);
    });
  }

  /**
   * 學者風格卡片燭光效果
   */
  initCardEffects() {
    document.querySelectorAll('.scholar-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px) scale(1.01)';
        this.style.boxShadow = '0 20px 40px rgba(217, 119, 6, 0.15), 0 8px 16px rgba(0, 0, 0, 0.3)';
        this.style.background = '#374151';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
        this.style.background = '#1f2937';
      });
    });
  }

  /**
   * 預設內容（載入失敗時使用）
   */
  getDefaultContent() {
    return {
      meta: { 
        title: "學者暗黑範例",
        subtitle: "Scholar Dark Example",
        description: "展示深夜學者研究室的閱讀體驗",
        copyright: "© 2024 Scholar Dark Style Demo"
      },
      navigation: { 
        logo: "深夜學者", 
        menuItems: [
          { id: "hero", label: "首頁", href: "../index.html" }
        ]
      },
      hero: { 
        title: "學者暗黑風格",
        subtitle: "Scholar Dark Reading Experience",
        description: "溫暖護眼的深夜閱讀氛圍",
        buttons: [
          { text: "開始夜讀", href: "#content", type: "primary" }
        ]
      },
      sections: {}
    };
  }

  /**
   * 初始化並渲染所有內容
   */
  async init() {
    console.log('🌙 Initializing Scholar Dark Style...');
    
    await this.loadContent();
    
    // 調試：檢查內容是否載入成功
    if (this.content) {
      console.log('📚 Scholar content loaded:', {
        meta: !!this.content.meta,
        navigation: !!this.content.navigation,
        hero: !!this.content.hero,
        sections: Object.keys(this.content.sections || {})
      });
    } else {
      console.error('❌ No scholar content loaded');
      return;
    }
    
    this.renderMeta();
    this.renderNavigation();
    this.renderHero();
    this.renderFooter();

    // 渲染所有內容區塊
    const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
    sections.forEach(sectionId => {
      console.log(`🔍 Rendering scholar section: ${sectionId}`);
      this.renderSection(sectionId);
    });

    // 初始化學者暗黑風格特效
    this.initScholarEffects();

    console.log('✅ Scholar Dark style initialized successfully');
  }
}

// 創建全域實例
window.contentLoader = new ScholarDarkContentLoader();

// 匯出類別
export default ScholarDarkContentLoader;