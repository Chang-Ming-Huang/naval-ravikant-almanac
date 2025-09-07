/**
 * Playful Content Loader - 高級溫暖親和設計載入器
 * 專業質感的兒童友善界面，遵循高級設計原則
 */

class PlayfulContentLoader {
    constructor() {
        this.content = null;
        this.isLoaded = false;
        this.styleId = 'playful-premium-styles';
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
            /* Playful Premium Design System - 高級溫暖親和風格 */
            
            /* CSS 變數系統 - 避免 Tailwind 依賴 */
            :root {
                --playful-primary: #f4a261;
                --playful-secondary: #e9c46a;
                --playful-accent: #e76f51;
                --playful-neutral: #fefae0;
                --playful-text: #2d3436;
                --playful-text-light: #636e72;
                
                /* 高級動畫曲線 */
                --playful-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                --playful-ease-out: cubic-bezier(0.4, 0.0, 0.2, 1.0);
                
                /* 響應式數值 */
                --playful-title-size: clamp(2.5rem, 6vw, 4rem);
                --playful-card-padding: clamp(2rem, 4vw, 3rem);
                --playful-section-gap: clamp(4rem, 8vw, 8rem);
            }

            /* 基礎樣式重置與優化 */
            body.playful-theme {
                background: linear-gradient(135deg, var(--playful-neutral) 0%, #f4f3f0 100%);
                font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
                color: var(--playful-text);
                line-height: 1.6;
            }

            /* 專業級卡片系統 */
            .playful-card-bg {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 24px;
                border: 1px solid rgba(244, 162, 97, 0.2);
            }

            .playful-card-hover:hover {
                transform: translateY(-8px);
                box-shadow: 0 16px 48px rgba(244, 162, 97, 0.25);
            }

            .playful-transition {
                transition: all 0.4s var(--playful-ease);
            }

            .playful-card-border {
                border: 2px solid rgba(244, 162, 97, 0.15);
            }

            .playful-card-shadow {
                box-shadow: 0 8px 32px rgba(244, 162, 97, 0.15);
            }

            /* 專業級按鈕系統 */
            .playful-btn-primary {
                background: linear-gradient(45deg, var(--playful-primary) 0%, var(--playful-secondary) 100%);
                color: white;
                border: none;
                border-radius: 16px;
                padding: 20px 40px;
                font-weight: 600;
                font-size: 1.1rem;
                letter-spacing: 0.025em;
                position: relative;
                overflow: hidden;
                transition: all 0.4s var(--playful-ease);
            }

            .playful-btn-primary::before {
                content: '';
                position: absolute;
                top: 0; left: 0;
                right: 0; bottom: 0;
                background: linear-gradient(45deg, var(--playful-accent) 0%, var(--playful-primary) 100%);
                opacity: 0;
                transition: opacity 0.4s var(--playful-ease);
            }

            .playful-btn-primary:hover::before {
                opacity: 1;
            }

            .playful-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 32px rgba(244, 162, 97, 0.4);
            }

            .playful-btn-secondary {
                background: transparent;
                color: var(--playful-primary);
                border: 2px solid var(--playful-primary);
                border-radius: 16px;
                padding: 18px 38px;
                font-weight: 500;
                transition: all 0.4s var(--playful-ease);
            }

            .playful-btn-secondary:hover {
                background: var(--playful-primary);
                color: white;
                transform: translateY(-2px);
            }

            /* 高級標題系統 */
            .playful-hero-title {
                font-size: var(--playful-title-size);
                font-weight: 300;
                line-height: 1.1;
                letter-spacing: -0.02em;
                color: var(--playful-text);
                margin-bottom: 1.5rem;
            }

            .playful-section-title {
                font-size: clamp(2rem, 4vw, 3rem);
                font-weight: 400;
                color: var(--playful-primary);
                margin-bottom: 2rem;
                text-align: center;
            }

            .playful-card-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--playful-text);
                margin-bottom: 1rem;
                font-family: 'Poppins', sans-serif;
            }

            /* 專業級導航系統 */
            .playful-nav {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(244, 162, 97, 0.1);
            }

            .playful-nav-link {
                color: var(--playful-text-light);
                font-weight: 500;
                padding: 12px 20px;
                border-radius: 12px;
                transition: all 0.3s var(--playful-ease);
                position: relative;
            }

            .playful-nav-link::before {
                content: '';
                position: absolute;
                bottom: 0; left: 50%;
                width: 0; height: 2px;
                background: var(--playful-primary);
                transition: all 0.3s var(--playful-ease);
                transform: translateX(-50%);
            }

            .playful-nav-link:hover {
                color: var(--playful-primary);
                background: rgba(244, 162, 97, 0.1);
            }

            .playful-nav-link:hover::before {
                width: 80%;
            }

            /* 響應式設計優化 */
            @media (max-width: 768px) {
                .playful-card-bg {
                    margin: 1rem;
                    padding: var(--playful-card-padding);
                }

                .playful-btn-primary {
                    width: 100%;
                    padding: 18px 30px;
                }

                .playful-hero-title {
                    font-size: clamp(2rem, 8vw, 3rem);
                }
            }

            /* 微妙的動畫效果 */
            .playful-gentle-float {
                animation: gentleFloat 6s ease-in-out infinite;
            }

            @keyframes gentleFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            /* 內容載入動畫 */
            .playful-fade-in {
                animation: playfulFadeIn 0.8s var(--playful-ease-out) forwards;
                opacity: 0;
                transform: translateY(30px);
            }

            @keyframes playfulFadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* 高級卡片網格系統 */
            .playful-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                padding: 2rem 0;
            }

            .playful-card {
                padding: var(--playful-card-padding);
                position: relative;
            }

            .playful-card-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                display: block;
                opacity: 0.9;
            }

            /* 專業級文字處理 */
            .playful-text {
                font-size: 1.1rem;
                line-height: 1.8;
                color: var(--playful-text-light);
            }

            .playful-emphasis {
                color: var(--playful-accent);
                font-weight: 600;
            }

            /* 優雅的分割線 */
            .playful-divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--playful-primary), transparent);
                margin: 4rem auto;
                width: 200px;
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
            console.log('🌞 Playful content loaded successfully');
            return this.content;
        } catch (error) {
            console.error('Failed to load playful content:', error);
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        document.title = `${meta.title} - ${meta.subtitle} | Playful Design`;
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }

        // 應用主題樣式到 body
        document.body.classList.add('playful-theme');
    }

    /**
     * 渲染專業導航
     */
    renderNavigation() {
        if (!this.content) return;

        const { navigation } = this.content;
        
        // 更新 logo
        const logos = document.querySelectorAll('.nav-logo h2');
        logos.forEach(logo => {
            logo.textContent = navigation.logo;
            logo.className = 'playful-nav-logo';
        });

        // 更新導航容器樣式
        const navContainers = document.querySelectorAll('nav');
        navContainers.forEach(nav => {
            nav.classList.add('playful-nav');
        });

        // 更新選單項目
        const desktopMenu = document.querySelector('nav ul:not(.mobile-menu ul)');
        const mobileMenu = document.querySelector('.mobile-menu ul');

        if (desktopMenu) {
            desktopMenu.innerHTML = this.generatePlayfulMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generatePlayfulMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生專業導航選單項目
     */
    generatePlayfulMenuItems(menuItems, isMobile = false) {
        return menuItems.map((item, index) => {
            const linkClass = isMobile 
                ? 'playful-nav-link block py-4 px-6'
                : 'playful-nav-link inline-block';

            return `<li><a href="${item.href}" class="${linkClass}">${item.label}</a></li>`;
        }).join('');
    }

    /**
     * 渲染專業 Hero 區域
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
            h1.className = 'playful-hero-title playful-fade-in';
        }
        if (h2) {
            h2.textContent = hero.subtitle;
            h2.className = 'playful-section-title playful-fade-in';
            h2.style.animationDelay = '0.2s';
        }
        if (description) {
            description.innerHTML = hero.description;
            description.className = 'playful-text playful-fade-in';
            description.style.animationDelay = '0.4s';
        }

        // 更新按鈕
        const buttonsContainer = heroSection.querySelector('.flex, .button-container');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map((button, index) => {
                const btnClass = index === 0 ? 'playful-btn-primary' : 'playful-btn-secondary';
                const delay = (index + 3) * 0.2;
                
                return `<a href="${button.href}" 
                           class="${btnClass} playful-fade-in" 
                           style="animation-delay: ${delay}s; position: relative; z-index: 1;">
                    ${button.text}
                </a>`;
            }).join('');
        }
    }

    /**
     * 渲染專業區塊內容
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
            title.textContent = sectionData.title;
            title.className = 'playful-section-title';
        }
        if (subtitle) {
            subtitle.innerHTML = sectionData.subtitle;
            subtitle.className = 'playful-text';
        }

        // 渲染專業卡片
        this.renderProfessionalCards(sectionElement, sectionData.cards);

        // 添加優雅分割線
        if (!sectionElement.querySelector('.playful-divider')) {
            const divider = document.createElement('div');
            divider.className = 'playful-divider';
            sectionElement.appendChild(divider);
        }
    }

    /**
     * 渲染專業級卡片
     */
    renderProfessionalCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid, .cards-container');
        if (!cardsContainer || !cards) return;

        // 應用專業網格系統
        cardsContainer.className = 'playful-card-grid';

        cardsContainer.innerHTML = cards.map((card, index) => {
            const delay = index * 0.1;
            
            return `
                <div class="playful-card playful-card-bg playful-card-hover playful-transition playful-card-border playful-card-shadow playful-fade-in playful-gentle-float" 
                     style="animation-delay: ${delay}s; animation-duration: ${6 + index * 0.5}s;">
                    
                    <span class="playful-card-icon">${card.icon}</span>
                    
                    <h3 class="playful-card-title">${card.title}</h3>
                    
                    <p class="playful-text">${card.description}</p>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染專業頁尾
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.querySelector('footer p');
        if (footer) {
            footer.innerHTML = `<span class="playful-emphasis">${this.content.meta.copyright}</span>`;
            footer.className = 'playful-text';
        }
    }

    /**
     * 初始化完整系統
     */
    async init() {
        console.log('🌞 Initializing Playful Premium Content Loader...');
        
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

        console.log('✨ Playful Premium Design loaded successfully!');
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
                description: "正在載入溫暖的設計體驗...",
                buttons: []
            },
            sections: {}
        };
    }
}

// 建立全域實例
window.playfulContentLoader = new PlayfulContentLoader();