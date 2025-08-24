/**
 * Retro Content Loader Module
 * 專為復古/80年代風格設計的內容載入器
 */
class RetroContentLoader {
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
        document.title = meta.title + ' - ' + meta.subtitle + ' | Retro Style';
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }
    }

    /**
     * 渲染導航選單（復古風格）
     */
    renderNavigation() {
        if (!this.content) return;

        const { navigation } = this.content;
        
        const logos = document.querySelectorAll('.nav-logo h2');
        logos.forEach(logo => {
            logo.textContent = navigation.logo;
        });

        const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
        const mobileMenu = document.querySelector('.mobile-menu ul');

        if (desktopMenu) {
            desktopMenu.innerHTML = this.generateRetroMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateRetroMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生復古風格選單項目 HTML
     */
    generateRetroMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-3 text-retro-cream font-bold text-lg hover:text-retro-pink transition-colors border-b border-retro-pink/30 last:border-b-0"
            : "retro-nav-link relative px-6 py-3 text-retro-cream font-bold text-lg hover:text-retro-pink transition-colors hover:bg-retro-pink/20 rounded";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊（復古風格）
     */
    renderHero() {
        if (!this.content) return;

        const { hero } = this.content;
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const h1 = heroSection.querySelector('h1');
        const h2 = heroSection.querySelector('h2');
        const description = heroSection.querySelector('p');

        if (h1) h1.textContent = hero.title;
        if (h2) h2.textContent = hero.subtitle;
        if (description) description.innerHTML = hero.description;

        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                const isPrimary = button.type === 'primary';
                const classes = isPrimary 
                    ? "retro-btn-primary inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-retro-pink to-retro-purple text-white font-bold text-lg rounded-full shadow-lg hover:shadow-retro-glow hover:-translate-y-1 transition-all transform"
                    : "retro-btn-secondary inline-flex items-center justify-center px-8 py-4 bg-transparent text-retro-cyan font-bold text-lg border-3 border-retro-cyan rounded-full hover:bg-retro-cyan hover:text-retro-dark hover:-translate-y-1 transition-all transform";
                
                return `<a href="${button.href}" class="${classes}">${button.text}</a>`;
            }).join('');
        }
    }

    /**
     * 渲染各個區塊（復古風格）
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const sectionData = this.content.sections[sectionId];
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;

        const title = sectionElement.querySelector('h2');
        const subtitle = sectionElement.querySelector('p');
        
        if (title) title.textContent = sectionData.title;
        if (subtitle) subtitle.textContent = sectionData.subtitle;

        this.renderRetroCards(sectionElement, sectionData.cards);

        if (sectionData.quote) {
            this.renderRetroQuote(sectionElement, sectionData.quote);
        }
    }

    /**
     * 渲染復古風格卡片
     */
    renderRetroCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;

        cardsContainer.innerHTML = cards.map((card, index) => {
            const colSpanClass = cards.length % 3 === 1 && card === cards[cards.length - 1] 
                ? 'md:col-span-2 lg:col-span-1' 
                : '';

            // 復古風格的漸層背景變化
            const gradients = [
                'from-retro-orange via-retro-yellow to-retro-cyan',
                'from-retro-cyan via-retro-blue to-retro-green',
                'from-retro-yellow via-retro-orange to-retro-pink',
                'from-retro-green via-retro-cyan to-retro-blue'
            ];
            const gradientClass = gradients[index % gradients.length];

            return `
                <div class="retro-card group relative bg-gradient-to-br ${gradientClass} p-8 rounded-3xl shadow-2xl hover:shadow-retro-glow hover:-translate-y-4 transition-all duration-500 cursor-pointer border-4 border-white/20 hover:border-white/40 ${colSpanClass}">
                    <!-- Retro grid overlay -->
                    <div class="absolute inset-0 bg-retro-grid opacity-20 rounded-3xl"></div>
                    
                    <!-- Retro shine effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                    
                    <div class="relative z-10">
                        <!-- Retro header -->
                        <div class="flex items-center gap-4 mb-6">
                            <div class="retro-icon-bg w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <span class="text-4xl filter drop-shadow-lg">${card.icon}</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-2xl text-white drop-shadow-lg mb-1">${card.title}</h3>
                                <div class="w-12 h-1 bg-white/60 rounded-full"></div>
                            </div>
                        </div>
                        
                        <!-- Retro description -->
                        <p class="text-white/90 text-lg leading-relaxed font-medium drop-shadow-sm">${card.description}</p>
                        
                        <!-- Retro accent elements -->
                        <div class="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-60"></div>
                        <div class="absolute top-6 right-6 w-4 h-4 bg-white/20 rounded-full"></div>
                        <div class="absolute bottom-4 left-4 w-16 h-1 bg-white/40 rounded-full group-hover:w-24 transition-all duration-500"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染復古風格引言
     */
    renderRetroQuote(sectionElement, quote) {
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

        const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
        sections.forEach(sectionId => {
            this.renderSection(sectionId);
        });

        console.log('Retro content loaded and rendered successfully!');
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

window.retroContentLoader = new RetroContentLoader();