/**
 * Luxury Content Loader Module
 * 專為豪華風格設計的內容載入器
 */
class LuxuryContentLoader {
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
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        
        document.title = meta.title + ' - ' + meta.subtitle + ' | Modern Luxury Design';
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }
    }

    /**
     * 渲染導航選單（豪華風格）
     */
    renderNavigation() {
        if (!this.content) return;

        const { navigation } = this.content;
        
        // 更新 logo
        const logos = document.querySelectorAll('.nav-logo h2');
        logos.forEach(logo => {
            logo.textContent = navigation.logo;
        });

        // 更新選單項目
        const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
        const mobileMenu = document.querySelector('.mobile-menu ul');

        if (desktopMenu) {
            desktopMenu.innerHTML = this.generateLuxuryMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateLuxuryMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生豪華風格選單項目 HTML
     */
    generateLuxuryMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-4 text-luxury-cream font-medium hover:text-luxury-gold transition-colors text-xl"
            : "luxury-nav-link relative px-6 py-3 text-luxury-cream font-medium hover:text-luxury-navy transition-all duration-500 rounded-lg overflow-hidden";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊（豪華風格）
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

        // 更新按鈕（豪華風格）
        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                const isPrimary = button.type === 'primary';
                const classes = isPrimary 
                    ? "luxury-btn-primary group relative inline-flex items-center justify-center px-12 py-5 bg-gold-gradient text-luxury-navy font-bold text-lg rounded-2xl shadow-2xl hover:shadow-luxury-gold/50 hover:-translate-y-1 transition-all duration-300"
                    : "luxury-btn-secondary inline-flex items-center justify-center px-12 py-5 bg-transparent text-luxury-gold font-bold text-lg border-3 border-luxury-gold rounded-2xl hover:bg-luxury-gold hover:text-luxury-navy transition-all duration-300";
                
                return `<a href="${button.href}" class="${classes}">
                    <span class="relative z-10">${button.text}</span>
                </a>`;
            }).join('');
        }
    }

    /**
     * 渲染各個區塊（豪華風格）
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
        this.renderLuxuryCards(sectionElement, sectionData.cards);

        // 渲染引言（如果有的話）
        if (sectionData.quote) {
            this.renderLuxuryQuote(sectionElement, sectionData.quote);
        }
    }

    /**
     * 渲染豪華風格卡片
     */
    renderLuxuryCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;

        cardsContainer.innerHTML = cards.map((card, index) => {
            const animationDelay = `animate-delay-${(index + 2) * 200}`;
            const colSpanClass = cards.length % 3 === 1 && card === cards[cards.length - 1] 
                ? 'md:col-span-2 lg:col-span-1' 
                : '';

            return `
                <div class="luxury-card group relative bg-luxury-white rounded-3xl p-10 shadow-2xl hover:shadow-luxury-gold/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-luxury-border hover:border-luxury-gold ${colSpanClass}">
                    <div class="relative z-10">
                        <!-- Icon and title -->
                        <div class="flex items-center gap-6 mb-8">
                            <div class="text-5xl opacity-90">${card.icon}</div>
                            <h3 class="font-serif text-3xl font-semibold text-luxury-charcoal">${card.title}</h3>
                        </div>
                        
                        <!-- Description -->
                        <p class="text-luxury-text-light text-lg leading-relaxed font-light">${card.description}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染豪華風格引言
     */
    renderLuxuryQuote(sectionElement, quote) {
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

        console.log('Luxury content loaded and rendered successfully!');
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
window.luxuryContentLoader = new LuxuryContentLoader();