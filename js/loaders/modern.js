/**
 * Modern Content Loader Module
 * 專為現代科技風格設計的內容載入器
 */
class ModernContentLoader {
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
            console.log('Modern content loaded:', this.content);
            return this.content;
        } catch (error) {
            console.error('Failed to load modern content:', error);
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        
        document.title = meta.title + ' - ' + meta.subtitle + ' | Modern Technology';
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }
    }

    /**
     * 渲染導航選單（Modern 風格）
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
            desktopMenu.innerHTML = this.generateModernMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateModernMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生 Modern 風格選單項目 HTML
     */
    generateModernMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-3 text-white hover:text-gray-300 transition-colors font-mono"
            : "nav-link";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊（Modern 風格）
     */
    renderHero() {
        if (!this.content) return;

        const { hero } = this.content;
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        // 更新標題
        const h1 = heroSection.querySelector('h1');
        const description = heroSection.querySelector('p');

        if (h1) {
            h1.innerHTML = `${hero.title}<br><span class="title-accent">${hero.subtitle}</span>`;
        }
        if (description) description.innerHTML = hero.description;

        // 更新按鈕（Modern 風格）
        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                const isPrimary = button.type === 'primary';
                return `<button class="modern-btn">
                    <span>${button.text}</span>
                </button>`;
            }).join('');
        }
    }

    /**
     * 渲染各個區塊（Modern 風格）
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
        this.renderModernCards(sectionElement, sectionData.cards);

        // 渲染引言（如果有的話）
        if (sectionData.quote) {
            this.renderModernQuote(sectionElement, sectionData.quote);
        }
    }

    /**
     * 渲染 Modern 風格卡片 - 幾何未來感設計
     */
    renderModernCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;

        const accentColors = ['white', 'gray-300', 'gray-400'];
        
        cardsContainer.innerHTML = cards.map((card, index) => {
            const colorClass = accentColors[index % accentColors.length];
            const delay = index * 0.2;
            
            return `
                <div class="modern-card fade-in group" style="animation-delay: ${delay}s;">
                    <div class="relative z-10">
                        <!-- Icon 和標題 - 現代幾何風格 -->
                        <div class="flex items-center gap-6 mb-8">
                            <div class="text-4xl bg-white bg-opacity-10 text-${colorClass} p-4 backdrop-blur border border-white border-opacity-20 modern-icon-container">
                                ${card.icon}
                            </div>
                            <h3 class="font-mono text-2xl text-${colorClass} modern-title group-hover:tracking-wider transition-all duration-400">
                                ${card.title}
                            </h3>
                        </div>
                        
                        <!-- 描述 - 現代簡潔風格 -->
                        <p class="text-white text-lg leading-relaxed font-light opacity-90 hover:opacity-100 transition-opacity duration-400 modern-description">
                            ${card.description}
                        </p>
                    </div>
                    
                    <!-- 現代幾何裝飾元素 -->
                    <div class="absolute top-4 right-4 w-2 h-2 bg-${colorClass} opacity-60 transform rotate-45"></div>
                    <div class="absolute bottom-4 left-4 w-1 h-8 bg-gradient-to-t from-${colorClass} to-transparent opacity-30"></div>
                </div>
            `;
        }).join('');
        
        // 啟動卡片特效
        setTimeout(() => this.activateModernEffects(), 100);
    }

    /**
     * 啟動 Modern 特效系統
     */
    activateModernEffects() {
        // 幾何圖標懸停效果
        document.querySelectorAll('.modern-icon-container').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
        });
        
        // 標題追蹤效果
        document.querySelectorAll('.modern-title').forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.style.letterSpacing = '0.1em';
                title.style.textShadow = '0 0 10px currentColor';
            });
            
            title.addEventListener('mouseleave', () => {
                title.style.letterSpacing = '';
                title.style.textShadow = '';
            });
        });

        // 卡片磁吸效果
        document.querySelectorAll('.modern-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.1;
                card.style.transform = `translateY(-10px) rotateX(${y * strength}deg) rotateY(${x * strength}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * 渲染 Modern 風格引言 - 未來感設計
     */
    renderModernQuote(sectionElement, quote) {
        const quoteElement = sectionElement.querySelector('blockquote');
        if (quoteElement) {
            quoteElement.innerHTML = `
                <div class="relative">
                    <div class="absolute -top-6 -left-6 text-6xl text-white opacity-20 font-mono">"</div>
                    <div class="absolute -bottom-6 -right-6 text-6xl text-white opacity-20 font-mono">"</div>
                    <p class="relative z-10">${quote}</p>
                </div>
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
        }
    }

    /**
     * 初始化並渲染所有內容
     */
    async init() {
        console.log('Initializing Modern content loader...');
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

        console.log('Modern content loaded and rendered successfully!');
        
        // 添加 Modern 特效
        this.addModernVisualEffects();
    }

    /**
     * 添加 Modern 特有的視覺效果
     */
    addModernVisualEffects() {
        // 幾何形狀互動效果
        document.querySelectorAll('.shape').forEach(shape => {
            shape.addEventListener('mouseenter', () => {
                shape.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                shape.style.background = 'rgba(255, 255, 255, 0.05)';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                shape.style.background = 'rgba(255, 255, 255, 0.03)';
            });
        });

        // 現代按鈕特效增強
        document.querySelectorAll('.modern-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.letterSpacing = '3px';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.letterSpacing = '2px';
            });
        });

        // 滾動觸發動畫
        const observeOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observeOptions);

        // 觀察所有需要動畫的元素
        document.querySelectorAll('.modern-card, .fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 預設內容（載入失敗時使用）
     */
    getDefaultContent() {
        return {
            meta: { 
                title: "納瓦爾寶典", 
                subtitle: "現代科技美學",
                description: "體驗現代科技美學的網頁設計",
                copyright: "© 2024 納瓦爾寶典 - 現代科技美學"
            },
            navigation: { 
                logo: "MODERN", 
                menuItems: [] 
            },
            hero: { 
                title: "現代科技", 
                subtitle: "美學體驗",
                description: "系統載入中...",
                buttons: []
            },
            sections: {}
        };
    }
}

// 建立全域實例
window.modernContentLoader = new ModernContentLoader();