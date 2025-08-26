/**
 * Underground Content Loader - 高級地下文化美學載入器
 * 極簡暗黑設計，工業質感的前衛視覺語言
 */

class UndergroundContentLoader {
    constructor() {
        this.content = null;
        this.isLoaded = false;
        this.styleId = 'underground-premium-styles';
    }

    /**
     * 載入專業級 CSS 樣式
     */
    loadPremiumStyles() {
        // 移除舊樣式（如果存在）
        const existingStyles = document.getElementById(this.styleId);
        if (existingStyles) {
            existingStyles.remove();
        }

        // 創建高級 CSS 樣式
        const style = document.createElement('style');
        style.id = this.styleId;
        style.textContent = `
            /* Underground Premium Design System - 高級地下文化美學 */
            
            /* CSS 變數系統 - 極簡三色系統 */
            :root {
                --underground-primary: #0d0d0d;
                --underground-secondary: #1a1a1a;
                --underground-accent: #ff3333;
                --underground-neutral: #333333;
                --underground-text: #e0e0e0;
                --underground-text-dim: #888888;
                
                /* 專業動畫曲線 */
                --underground-ease: cubic-bezier(0.4, 0.0, 0.2, 1.0);
                --underground-ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                
                /* 響應式數值 */
                --underground-title-size: clamp(3rem, 8vw, 8rem);
                --underground-card-padding: clamp(3rem, 6vw, 5rem);
                --underground-section-gap: clamp(6rem, 12vw, 12rem);
            }

            /* 基礎樣式重置與優化 */
            body.underground-theme {
                background: var(--underground-primary);
                background-image: 
                    repeating-linear-gradient(
                        90deg, 
                        transparent, 
                        transparent 1px, 
                        rgba(51, 51, 51, 0.1) 1px, 
                        rgba(51, 51, 51, 0.1) 2px
                    );
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                color: var(--underground-text);
                line-height: 1.5;
                font-weight: 300;
            }

            /* 極簡工業卡片系統 */
            .underground-card-bg {
                background: var(--underground-secondary);
                border-radius: 2px;
                border: 1px solid var(--underground-neutral);
                backdrop-filter: blur(5px);
            }

            .underground-card-hover:hover {
                transform: translateY(-4px);
                border-color: var(--underground-accent);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
            }

            .underground-transition {
                transition: all 0.3s var(--underground-ease);
            }

            .underground-card-border {
                border: 1px solid rgba(51, 51, 51, 0.8);
            }

            .underground-card-shadow {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
            }

            /* 極簡按鈕系統 */
            .underground-btn-primary {
                background: transparent;
                color: var(--underground-text);
                border: 2px solid var(--underground-accent);
                border-radius: 2px;
                padding: 20px 40px;
                font-weight: 400;
                font-size: 0.9rem;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                font-family: 'JetBrains Mono', monospace;
                position: relative;
                overflow: hidden;
                transition: all 0.3s var(--underground-ease);
            }

            .underground-btn-primary::before {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                right: 0; bottom: 0;
                background: var(--underground-accent);
                transition: left 0.3s var(--underground-ease);
                z-index: -1;
            }

            .underground-btn-primary:hover::before {
                left: 0;
            }

            .underground-btn-primary:hover {
                color: var(--underground-primary);
                border-color: var(--underground-accent);
            }

            .underground-btn-secondary {
                background: transparent;
                color: var(--underground-text-dim);
                border: 1px solid var(--underground-neutral);
                border-radius: 2px;
                padding: 18px 38px;
                font-weight: 300;
                transition: all 0.3s var(--underground-ease);
                font-family: 'Inter', sans-serif;
            }

            .underground-btn-secondary:hover {
                border-color: var(--underground-text);
                color: var(--underground-text);
            }

            /* 極大標題系統 - 視覺衝擊 */
            .underground-hero-title {
                font-size: var(--underground-title-size);
                font-weight: 300;
                line-height: 0.85;
                letter-spacing: -0.03em;
                color: var(--underground-text);
                margin-bottom: 2rem;
                font-family: 'Space Mono', monospace;
            }

            .underground-section-title {
                font-size: clamp(2.5rem, 6vw, 5rem);
                font-weight: 300;
                color: var(--underground-text);
                margin-bottom: 4rem;
                text-align: left;
                letter-spacing: -0.02em;
                position: relative;
            }

            .underground-section-title::after {
                content: '';
                position: absolute;
                bottom: -10px; left: 0;
                width: 60px; height: 2px;
                background: var(--underground-accent);
            }

            .underground-card-title {
                font-size: 1.25rem;
                font-weight: 500;
                color: var(--underground-text);
                margin-bottom: 1.5rem;
                font-family: 'JetBrains Mono', monospace;
                letter-spacing: 0.025em;
            }

            /* 工業導航系統 */
            .underground-nav {
                background: rgba(13, 13, 13, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--underground-neutral);
            }

            .underground-nav-link {
                color: var(--underground-text-dim);
                font-weight: 300;
                padding: 16px 24px;
                border-radius: 0;
                transition: all 0.3s var(--underground-ease);
                position: relative;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9rem;
                letter-spacing: 0.05em;
            }

            .underground-nav-link::before {
                content: '▶';
                position: absolute;
                left: 8px;
                opacity: 0;
                transition: opacity 0.3s var(--underground-ease);
                color: var(--underground-accent);
            }

            .underground-nav-link:hover {
                color: var(--underground-text);
                background: var(--underground-secondary);
                padding-left: 32px;
            }

            .underground-nav-link:hover::before {
                opacity: 1;
            }

            /* 響應式設計優化 */
            @media (max-width: 768px) {
                .underground-card-bg {
                    margin: 1rem;
                    padding: var(--underground-card-padding);
                }

                .underground-btn-primary {
                    width: 100%;
                    padding: 16px 24px;
                }

                .underground-hero-title {
                    font-size: clamp(2.5rem, 12vw, 4rem);
                }

                .underground-section-title {
                    text-align: center;
                }
            }

            /* 微妙工業動畫 */
            .underground-pulse {
                animation: undergroundPulse 2s ease-in-out infinite;
            }

            @keyframes undergroundPulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }

            /* 內容載入動畫 */
            .underground-fade-in {
                animation: undergroundFadeIn 0.6s var(--underground-ease-out) forwards;
                opacity: 0;
                transform: translateY(20px);
            }

            @keyframes undergroundFadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* 極簡網格系統 */
            .underground-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 3rem;
                padding: 3rem 0;
            }

            .underground-card {
                padding: var(--underground-card-padding);
                position: relative;
            }

            .underground-card-icon {
                font-size: 2.5rem;
                margin-bottom: 2rem;
                display: block;
                opacity: 0.7;
            }

            /* 極簡文字系統 */
            .underground-text {
                font-size: 1rem;
                line-height: 1.7;
                color: var(--underground-text-dim);
                font-weight: 300;
            }

            .underground-emphasis {
                color: var(--underground-accent);
                font-weight: 400;
            }

            .underground-metadata {
                font-size: 0.75rem;
                font-weight: 500;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--underground-text-dim);
                font-family: 'JetBrains Mono', monospace;
            }

            /* 工業分割線 */
            .underground-divider {
                height: 1px;
                background: var(--underground-neutral);
                margin: 6rem auto;
                width: 100%;
                position: relative;
            }

            .underground-divider::after {
                content: '■';
                position: absolute;
                top: -8px; left: 50%;
                transform: translateX(-50%);
                background: var(--underground-primary);
                color: var(--underground-accent);
                font-size: 1rem;
                padding: 0 1rem;
            }

            /* 特殊標記系統 */
            .underground-marker {
                color: var(--underground-accent);
                margin-right: 0.5rem;
                font-family: 'JetBrains Mono', monospace;
            }

            /* 工業質感背景 */
            .underground-texture {
                background: linear-gradient(
                    135deg, 
                    var(--underground-primary) 0%, 
                    var(--underground-secondary) 50%, 
                    var(--underground-primary) 100%
                );
            }
        `;

        document.head.appendChild(style);
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
            console.log('🏴 Underground content loaded successfully');
            return this.content;
        } catch (error) {
            console.error('Failed to load underground content:', error);
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        document.title = `${meta.title} - ${meta.subtitle} | Underground Aesthetics`;
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }

        // 應用主題樣式到 body
        document.body.classList.add('underground-theme');
    }

    /**
     * 渲染工業風導航
     */
    renderNavigation() {
        if (!this.content) return;

        const { navigation } = this.content;
        
        // 更新 logo
        const logos = document.querySelectorAll('.nav-logo h2');
        logos.forEach(logo => {
            logo.textContent = navigation.logo;
            logo.className = 'underground-metadata';
        });

        // 更新導航容器樣式
        const navContainers = document.querySelectorAll('nav');
        navContainers.forEach(nav => {
            nav.classList.add('underground-nav');
        });

        // 更新選單項目
        const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
        const mobileMenu = document.querySelector('.mobile-menu ul');

        if (desktopMenu) {
            desktopMenu.innerHTML = this.generateUndergroundMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateUndergroundMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生工業風導航選單項目
     */
    generateUndergroundMenuItems(menuItems, isMobile = false) {
        const markers = ['▶', '■', '▪', '□'];
        
        return menuItems.map((item, index) => {
            const marker = markers[index % markers.length];
            const linkClass = isMobile 
                ? 'underground-nav-link block py-4 px-6'
                : 'underground-nav-link inline-block';

            return `<li><a href="${item.href}" class="${linkClass}">
                <span class="underground-marker">${marker}</span>${item.label}
            </a></li>`;
        }).join('');
    }

    /**
     * 渲染極大 Hero 區域
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

        if (h1) {
            h1.textContent = hero.title;
            h1.className = 'underground-hero-title underground-fade-in';
        }
        if (h2) {
            h2.textContent = hero.subtitle;
            h2.className = 'underground-metadata underground-fade-in';
            h2.style.animationDelay = '0.2s';
        }
        if (description) {
            description.innerHTML = `<span class="underground-marker">■</span>${hero.description}`;
            description.className = 'underground-text underground-fade-in';
            description.style.animationDelay = '0.4s';
        }

        // 更新按鈕
        const buttonsContainer = heroSection.querySelector('.flex, .button-container');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map((button, index) => {
                const btnClass = index === 0 ? 'underground-btn-primary' : 'underground-btn-secondary';
                const delay = (index + 3) * 0.2;
                
                return `<a href="${button.href}" 
                           class="${btnClass} underground-fade-in" 
                           style="animation-delay: ${delay}s;">
                    ${button.text}
                </a>`;
            }).join('');
        }
    }

    /**
     * 渲染工業風區塊內容
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const sectionData = this.content.sections[sectionId];
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;

        // 更新標題
        const title = sectionElement.querySelector('h2');
        const subtitle = sectionElement.querySelector('p');
        
        if (title) {
            title.innerHTML = `<span class="underground-marker">■</span>${sectionData.title}`;
            title.className = 'underground-section-title';
        }
        if (subtitle) {
            subtitle.innerHTML = sectionData.subtitle;
            subtitle.className = 'underground-text';
        }

        // 渲染工業卡片
        this.renderIndustrialCards(sectionElement, sectionData.cards);

        // 添加工業分割線
        if (!sectionElement.querySelector('.underground-divider')) {
            const divider = document.createElement('div');
            divider.className = 'underground-divider';
            sectionElement.appendChild(divider);
        }
    }

    /**
     * 渲染工業風卡片
     */
    renderIndustrialCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid, .cards-container');
        if (!cardsContainer || !cards) return;

        // 應用工業網格系統
        cardsContainer.className = 'underground-card-grid underground-texture';

        const symbols = ['■', '▪', '▫', '□'];
        
        cardsContainer.innerHTML = cards.map((card, index) => {
            const delay = index * 0.15;
            const symbol = symbols[index % symbols.length];
            
            return `
                <div class="underground-card underground-card-bg underground-card-hover underground-transition underground-card-border underground-card-shadow underground-fade-in" 
                     style="animation-delay: ${delay}s;">
                    
                    <span class="underground-card-icon underground-pulse" style="animation-delay: ${delay}s;">${card.icon}</span>
                    
                    <h3 class="underground-card-title">
                        <span class="underground-marker">${symbol}</span>${card.title}
                    </h3>
                    
                    <p class="underground-text">${card.description}</p>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染工業頁尾
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.querySelector('footer p');
        if (footer) {
            footer.innerHTML = `<span class="underground-marker">■</span><span class="underground-emphasis">${this.content.meta.copyright}</span>`;
            footer.className = 'underground-metadata';
        }
    }

    /**
     * 初始化完整系統
     */
    async init() {
        console.log('🏴 Initializing Underground Premium Content Loader...');
        
        // 載入專業樣式系統
        this.loadPremiumStyles();
        
        // 載入內容
        await this.loadContent();
        
        // 渲染所有組件
        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderFooter();

        // 渲染所有區塊
        const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
        sections.forEach(sectionId => {
            this.renderSection(sectionId);
        });

        console.log('⚡ Underground Premium Design loaded successfully!');
    }

    /**
     * 預設內容
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
                description: "載入地下美學體驗...",
                buttons: []
            },
            sections: {}
        };
    }
}

// 建立全域實例
window.undergroundContentLoader = new UndergroundContentLoader();