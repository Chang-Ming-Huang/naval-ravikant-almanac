/**
 * Fashion Brand Content Loader - 時尚品牌風格專用載入器
 * 實現高級時尚品牌的精品奢華視覺體驗
 */

class FashionBrandContentLoader {
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
      console.log('✅ Fashion Brand content loaded successfully');
      return this.content;
    } catch (error) {
      console.error('Failed to load fashion brand content:', error);
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
    document.title = `${meta.title} - 時尚品牌風格 | Fashion Brand Style`;
    
    // 更新 meta 標籤
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', `${meta.description} - 高級時尚品牌風格展示`);
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
        logo.innerHTML = `<h2 class="font-serif text-2xl font-bold text-gray-800 tracking-tight">${navigation.logo}</h2>`;
      }
    });

    // 更新選單項目
    this.renderMenuItems(navigation.menuItems);
  }

  /**
   * 產生時尚品牌風格的選單項目
   */
  renderMenuItems(menuItems) {
    const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
    const mobileMenu = document.querySelector('.mobile-menu ul');

    const desktopMenuHTML = menuItems.map(item => 
      `<li><a href="${item.href}" class="nav-link relative py-3 px-8 text-gray-700 font-medium hover:text-pink-600 transition-all duration-300 rounded-lg hover:bg-pink-50 hover:shadow-sm uppercase tracking-wide text-sm">${item.label}</a></li>`
    ).join('');

    const mobileMenuHTML = menuItems.map(item => 
      `<li><a href="${item.href}" class="block py-3 px-4 text-gray-700 font-medium hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md uppercase tracking-wide">${item.label}</a></li>`
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
      h1.className = 'font-serif text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight tracking-tight';
    }
    if (h2) {
      h2.textContent = hero.subtitle;
      h2.className = 'text-2xl md:text-3xl text-gray-600 font-light mb-10 leading-relaxed tracking-wide uppercase';
    }
    if (description) {
      description.innerHTML = hero.description;
      description.className = 'text-lg text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto font-light';
    }

    // 更新按鈕
    this.renderHeroButtons(heroSection, hero.buttons);
  }

  /**
   * 渲染時尚品牌風格的按鈕（奢華質感）
   */
  renderHeroButtons(heroSection, buttons) {
    const buttonsContainer = heroSection.querySelector('.hero-buttons, .flex');
    if (!buttonsContainer || !buttons) return;

    const buttonsHTML = buttons.map(button => {
      const isPrimary = button.type === 'primary';
      const buttonClass = isPrimary 
        ? 'inline-flex items-center justify-center px-12 py-4 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform uppercase tracking-wider text-sm'
        : 'inline-flex items-center justify-center px-12 py-4 bg-transparent text-pink-600 border-2 border-pink-600 font-medium rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform uppercase tracking-wider text-sm';
      
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
      title.className = 'font-serif text-5xl md:text-6xl font-bold text-gray-800 mb-6 text-center tracking-tight';
    }
    if (subtitle) {
      subtitle.textContent = sectionData.subtitle;
      subtitle.className = 'text-xl text-gray-600 text-center max-w-3xl mx-auto mb-20 font-light leading-relaxed';
    }

    // 渲染時尚品牌風格卡片
    console.log(`👗 Rendering fashion section '${sectionId}' with`, sectionData.cards?.length, 'cards');
    this.renderFashionCards(sectionElement, sectionData.cards);

    // 渲染引言（如果有）
    if (sectionData.quote) {
      this.renderFashionQuote(sectionElement, sectionData.quote);
    }
  }

  /**
   * 渲染時尚品牌風格卡片（精品展示）
   */
  renderFashionCards(sectionElement, cards) {
    const cardsContainer = sectionElement.querySelector('.magazine-grid, .grid');
    if (!cardsContainer || !cards) {
      console.log('⚠️ Fashion cards container or cards not found:', { cardsContainer: !!cardsContainer, cards: !!cards });
      return;
    }
    
    console.log('🎨 Rendering fashion cards:', cards.length, 'cards');

    const cardsHTML = cards.map(card => `
      <article class="fashion-card bg-white rounded-2xl border border-gray-100 shadow-lg p-10 hover:border-pink-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer group overflow-hidden relative">
        <!-- 時尚金色裝飾線 -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-pink-600 to-pink-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <header class="flex items-start gap-6 mb-8">
          <div class="text-5xl opacity-80 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">${card.icon}</div>
          <h3 class="font-serif text-3xl font-bold text-gray-800 leading-tight group-hover:text-pink-600 transition-colors duration-300 tracking-tight">${card.title}</h3>
        </header>
        
        <div class="fashion-content">
          <p class="text-gray-600 leading-relaxed text-base font-light mb-6">${card.description}</p>
        </div>
        
        <!-- 時尚品牌裝飾 -->
        <div class="mt-8 pt-6 border-t border-gray-100 flex justify-center items-center">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-pink-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="w-2 h-2 bg-pink-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="w-2 h-2 bg-pink-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <!-- 時尚光影效果 -->
        <div class="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-pink-100 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      </article>
    `).join('');

    cardsContainer.innerHTML = cardsHTML;
    cardsContainer.className = 'magazine-grid';
    
    console.log('✅ Fashion cards rendered successfully');
  }

  /**
   * 渲染時尚品牌風格引言（雜誌風格）
   */
  renderFashionQuote(sectionElement, quote) {
    const quoteElement = sectionElement.querySelector('blockquote') || 
                        sectionElement.querySelector('.quote-container');
    
    if (!quoteElement) {
      // 創建時尚品牌風格引言區塊
      const quoteSection = document.createElement('div');
      quoteSection.className = 'fashion-quote-section my-24 px-8';
      quoteSection.innerHTML = `
        <div class="max-w-5xl mx-auto">
          <div class="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-12 shadow-xl relative overflow-hidden">
            <!-- 時尚背景裝飾 -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-transparent rounded-full -mr-16 -mt-16 opacity-60"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-transparent rounded-full -ml-12 -mb-12 opacity-40"></div>
            
            <!-- 時尚引號裝飾 -->
            <div class="absolute top-8 left-8 text-8xl text-pink-300/30 font-serif leading-none">"</div>
            <div class="absolute bottom-8 right-8 text-8xl text-pink-300/30 font-serif leading-none">"</div>
            
            <div class="relative z-10 text-center">
              <blockquote class="font-serif text-3xl md:text-4xl text-gray-800 font-light italic leading-loose mb-8 tracking-wide px-16">
                ${quote}
              </blockquote>
              <footer class="flex items-center justify-center space-x-4">
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
                <cite class="font-serif text-lg font-medium text-pink-600 tracking-wide">納瓦爾·拉維肯特</cite>
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              </footer>
              <p class="text-sm text-gray-500 mt-4 uppercase tracking-widest font-medium">時尚哲學家</p>
            </div>
          </div>
        </div>
      `;
      
      // 插入到區塊末尾
      sectionElement.appendChild(quoteSection);
    } else {
      quoteElement.innerHTML = `
        <span class="font-serif text-3xl md:text-4xl text-gray-800 font-light italic leading-loose tracking-wide">
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
      footer.className = 'text-gray-500 text-center font-light uppercase tracking-wider text-sm';
    }
  }

  /**
   * 初始化時尚品牌風格特效
   */
  initFashionEffects() {
    // 添加時尚品牌風格的 CSS 變數
    const root = document.documentElement;
    root.style.setProperty('--fashion-pink', '#ec4899');
    root.style.setProperty('--fashion-gray', '#374151');
    root.style.setProperty('--fashion-text', '#111827');
    
    console.log('💄 Fashion Brand CSS variables applied');
    
    // 時尚品牌的精品效果
    setTimeout(() => {
      this.initLuxuryEffects();
    }, 100);
    
    // 時尚品牌的滾動效果
    setTimeout(() => {
      this.initScrollEffects();
    }, 200);
    
    // 時尚品牌的卡片互動效果
    setTimeout(() => {
      this.initCardEffects();
    }, 300);
  }

  /**
   * 奢華精品效果
   */
  initLuxuryEffects() {
    // 為整體頁面添加時尚品牌氛圍
    const body = document.body;
    body.style.background = `
      linear-gradient(135deg, #fef7ff 0%, #ffffff 50%, #fdf2f8 100%)
    `;
    
    // 為導航添加時尚質感
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.borderBottom = '1px solid rgba(236, 72, 153, 0.1)';
    }

    // 添加精品光影效果
    this.createLuxurySparkles();
  }

  /**
   * 創建精品閃爍效果
   */
  createLuxurySparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'luxury-sparkles fixed inset-0 pointer-events-none z-10';
    document.body.appendChild(sparkleContainer);

    // 創建多個閃爍點
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute w-1 h-1 bg-pink-400 rounded-full opacity-20';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = `sparkle 3s ease-in-out infinite ${i * 0.5}s`;
        sparkleContainer.appendChild(sparkle);
      }, i * 200);
    }

    // 添加閃爍動畫
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 0.6; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 時尚品牌滾動效果
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

    // 觀察所有時尚卡片 - 等待卡片渲染後再觀察
    setTimeout(() => {
      document.querySelectorAll('.fashion-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
      console.log('👀 Observing', document.querySelectorAll('.fashion-card').length, 'fashion cards');
    }, 500);
  }

  /**
   * 時尚品牌卡片奢華效果
   */
  initCardEffects() {
    // 等待卡片渲染後再綁定事件
    setTimeout(() => {
      document.querySelectorAll('.fashion-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px -12px rgba(236, 72, 153, 0.25)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      });

      // 添加時尚品牌的微妙光影效果
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.background = `
          radial-gradient(circle at ${x}px ${y}px, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
          white
        `;
      });

      card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
      });
      });
      console.log('🎆 Card effects applied to', document.querySelectorAll('.fashion-card').length, 'fashion cards');
    }, 600);
  }

  /**
   * 預設內容（載入失敗時使用）
   */
  getDefaultContent() {
    return {
      meta: { 
        title: "時尚品牌範例",
        subtitle: "Fashion Brand Example",
        description: "展示高級時尚品牌的網頁設計",
        copyright: "© 2024 Fashion Brand Style Demo"
      },
      navigation: { 
        logo: "時尚精品", 
        menuItems: [
          { id: "hero", label: "首頁", href: "../index.html" }
        ]
      },
      hero: { 
        title: "時尚品牌風格",
        subtitle: "Fashion Brand Luxury",
        description: "高級時尚品牌的精品體驗",
        buttons: [
          { text: "探索精品", href: "#content", type: "primary" }
        ]
      },
      sections: {}
    };
  }

  /**
   * 初始化並渲染所有內容
   */
  async init() {
    console.log('💄 Initializing Fashion Brand Style...');
    
    await this.loadContent();
    
    // 調試：檢查內容是否載入成功
    if (this.content) {
      console.log('👗 Fashion content loaded:', {
        meta: !!this.content.meta,
        navigation: !!this.content.navigation,
        hero: !!this.content.hero,
        sections: Object.keys(this.content.sections || {})
      });
    } else {
      console.error('❌ No fashion content loaded');
      return;
    }
    
    this.renderMeta();
    this.renderNavigation();
    this.renderHero();
    this.renderFooter();

    // 渲染所有內容區塊
    const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
    sections.forEach(sectionId => {
      console.log(`🔍 Rendering fashion section: ${sectionId}`);
      this.renderSection(sectionId);
    });
    
    console.log('🚀 All sections rendered, checking cards...');
    setTimeout(() => {
      const totalCards = document.querySelectorAll('.fashion-card').length;
      console.log(`📊 Total fashion cards found: ${totalCards}`);
    }, 1000);

    // 初始化時尚品牌風格特效
    this.initFashionEffects();

    console.log('✅ Fashion Brand style initialized successfully');
  }
}

// 創建全域實例
window.contentLoader = new FashionBrandContentLoader();

// 匯出類別
export default FashionBrandContentLoader;