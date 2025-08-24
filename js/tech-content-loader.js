/**
 * Tech Content Loader Module
 * 專為科技/未來風格設計的內容載入器
 */
class TechContentLoader {
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
        document.title = meta.title + ' - ' + meta.subtitle + ' | Tech Style';
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }
    }

    /**
     * 渲染導航選單（科技風格）
     */
    renderNavigation() {
        if (!this.content) return;

        const { navigation } = this.content;
        
        const logos = document.querySelectorAll('.nav-logo h2');
        logos.forEach(logo => {
            // 保持英文 NAVAL.SYS，不覆蓋為中文
            logo.textContent = 'NAVAL.SYS';
            logo.setAttribute('data-text', 'NAVAL.SYS');
        });

        const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
        const mobileMenu = document.querySelector('.mobile-menu ul');

        if (desktopMenu) {
            desktopMenu.innerHTML = this.generateTechMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateTechMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生科技風格選單項目 HTML
     */
    generateTechMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-3 text-tech-green font-mono text-sm uppercase tracking-wider hover:text-tech-cyan transition-colors"
            : "tech-nav-link relative px-6 py-3 text-tech-green font-mono text-sm uppercase tracking-wider hover:text-tech-cyan transition-colors border border-tech-green/30 hover:border-tech-cyan";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊（科技風格）
     */
    renderHero() {
        if (!this.content) return;

        const { hero } = this.content;
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const h1 = heroSection.querySelector('h1');
        const h2 = heroSection.querySelector('h2');
        const description = heroSection.querySelector('p');

        // 將中文標題轉換為科技風格的英文版本
        if (h1) {
            const techTitle = hero.title.replace('納瓦爾寶典', 'NAVAL.ALGORITHM');
            h1.textContent = techTitle;
            h1.setAttribute('data-text', techTitle);
        }
        if (h2) {
            const techSubtitle = hero.subtitle.replace('人生智慧大全', 'WISDOM.PROTOCOL.v2024');
            h2.textContent = techSubtitle;
        }
        if (description) {
            // 將描述轉換為終端機風格
            const techDescription = `
                > INITIALIZING NEURAL NETWORK...<br>
                > LOADING INVESTMENT.ALGORITHMS...<br>
                > HAPPINESS.SUBROUTINES ACTIVATED...<br>
                > ${hero.description}
            `;
            description.innerHTML = techDescription;
        }

        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                const isPrimary = button.type === 'primary';
                const classes = isPrimary 
                    ? "tech-btn-primary inline-flex items-center justify-center px-8 py-4 bg-tech-cyan text-tech-dark font-mono font-bold text-sm uppercase tracking-wider border-2 border-tech-cyan hover:bg-transparent hover:text-tech-cyan transition-colors"
                    : "tech-btn-secondary inline-flex items-center justify-center px-8 py-4 bg-transparent text-tech-green font-mono font-bold text-sm uppercase tracking-wider border-2 border-tech-green hover:bg-tech-green hover:text-tech-dark transition-colors";
                
                return `<a href="${button.href}" class="${classes}">${button.text}</a>`;
            }).join('');
        }
    }

    /**
     * 渲染各個區塊（科技風格）
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

        this.renderTechCards(sectionElement, sectionData.cards);

        if (sectionData.quote) {
            this.renderTechQuote(sectionElement, sectionData.quote);
        }
    }

    /**
     * 渲染科技風格卡片
     */
    renderTechCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;

        cardsContainer.innerHTML = cards.map((card, index) => {
            const colSpanClass = cards.length % 3 === 1 && card === cards[cards.length - 1] 
                ? 'md:col-span-2 lg:col-span-1' 
                : '';

            return `
                <div class="tech-card group relative bg-tech-dark border border-tech-green/30 hover:border-tech-cyan p-6 transition-colors cursor-pointer ${colSpanClass}">
                    <div class="absolute inset-0 bg-tech-grid opacity-10"></div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="text-3xl filter grayscale group-hover:grayscale-0 transition-all">${card.icon}</div>
                            <div class="tech-glow-line w-8 h-px bg-tech-cyan"></div>
                            <h3 class="font-mono text-lg font-bold text-tech-green group-hover:text-tech-cyan transition-colors uppercase tracking-wider">${card.title}</h3>
                        </div>
                        
                        <p class="text-tech-light text-sm leading-relaxed font-mono">${card.description}</p>
                        
                        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-tech-green via-tech-cyan to-tech-green opacity-50"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染科技風格引言
     */
    renderTechQuote(sectionElement, quote) {
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

        console.log('Tech content loaded and rendered successfully!');
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

window.techContentLoader = new TechContentLoader();