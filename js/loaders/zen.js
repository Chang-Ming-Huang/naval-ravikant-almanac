/**
 * Content Loader Module
 * 負責載入並渲染 JSON 資料到頁面中
 */
class ContentLoader {
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
            // Smart path detection - check if we're in a subdirectory
            const dataPath = window.location.pathname.includes('/pages/') ? '../data/content.json' : './data/content.json';
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.content = await response.json();
            this.isLoaded = true;
            return this.content;
        } catch (error) {
            console.error('Failed to load content:', error);
            // 返回預設內容以防載入失敗
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
                logo.innerHTML = `<h2 class="font-serif text-2xl font-medium text-zen-charcoal tracking-tight">${navigation.logo}</h2>`;
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
     * 產生選單項目 HTML
     */
    generateMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-3 text-zen-medium-gray font-medium hover:text-zen-charcoal transition-colors"
            : "nav-link relative py-2 text-zen-medium-gray font-medium hover:text-zen-charcoal transition-colors duration-300";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊
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

        // 更新按鈕
        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                const isPrimary = button.type === 'primary';
                const classes = isPrimary 
                    ? "inline-flex items-center justify-center px-8 py-4 bg-zen-gold text-zen-white font-medium rounded-2xl shadow-lg hover:bg-zen-gold-light hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                    : "inline-flex items-center justify-center px-8 py-4 bg-transparent text-zen-charcoal font-medium border-2 border-zen-medium-gray rounded-2xl hover:bg-zen-charcoal hover:text-zen-white hover:-translate-y-1 transition-all duration-300";
                
                return `<a href="${button.href}" class="${classes}">${button.text}</a>`;
            }).join('');
        }
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
     * 渲染卡片
     */
    renderCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;

        cardsContainer.innerHTML = cards.map(card => {
            const colSpanClass = cards.length % 3 === 1 && card === cards[cards.length - 1] 
                ? 'md:col-span-2 lg:col-span-1' 
                : '';

            return `
                <div class="group bg-zen-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-zen-charcoal/5 hover:border-zen-gold/20 ${colSpanClass}">
                    <div class="relative">
                        <div class="absolute -top-8 left-0 w-full h-1 bg-gradient-to-r from-zen-gold to-zen-gold-light rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="text-4xl opacity-80">${card.icon}</div>
                            <h3 class="font-serif text-2xl text-zen-charcoal">${card.title}</h3>
                        </div>
                        <p class="text-zen-medium-gray leading-relaxed">${card.description}</p>
                    </div>
                </div>
            `;
        }).join('');
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
     * 初始化並渲染所有內容
     */
    async init() {
        await this.loadContent();
        
        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderFooter();

        // 渲染所有區塊
        const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
        sections.forEach(sectionId => {
            this.renderSection(sectionId);
        });

        console.log('Content loaded and rendered successfully!');
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
window.contentLoader = new ContentLoader();