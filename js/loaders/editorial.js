/**
 * Editorial Content Loader Module
 * 專為編輯藝術風格設計的內容載入器
 */
class EditorialContentLoader {
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
            console.log('Editorial content loaded:', this.content);
            return this.content;
        } catch (error) {
            console.error('Failed to load editorial content:', error);
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        
        document.title = meta.title + ' - ' + meta.subtitle + ' | Editorial Culture';
        
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description);
        }
    }

    /**
     * 渲染導航選單（Editorial 風格）
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
            desktopMenu.innerHTML = this.generateEditorialMenuItems(navigation.menuItems, false);
        }
        if (mobileMenu) {
            mobileMenu.innerHTML = this.generateEditorialMenuItems(navigation.menuItems, true);
        }
    }

    /**
     * 產生 Editorial 風格選單項目 HTML
     */
    generateEditorialMenuItems(menuItems, isMobile = false) {
        const baseClass = isMobile 
            ? "block py-3 text-white hover:text-gray-300 transition-colors font-mono"
            : "nav-link";

        return menuItems.map(item => 
            `<li><a href="${item.href}" class="${baseClass}">${item.label}</a></li>`
        ).join('');
    }

    /**
     * 渲染首頁區塊（Editorial 風格）
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
            h1.innerHTML = `${hero.title}<br>${hero.subtitle}`;
        }
        if (description) description.innerHTML = hero.description;

        // 更新按鈕（Editorial 風格）
        const buttonsContainer = heroSection.querySelector('.flex.flex-col.sm\\:flex-row');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = hero.buttons.map(button => {
                return `<button class="editorial-btn">
                    <span>${button.text}</span>
                </button>`;
            }).join('');
        }
    }

    /**
     * 渲染各個區塊（Editorial 風格）
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const sectionData = this.content.sections[sectionId];
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;

        // 更新標題和副標題
        const title = sectionElement.querySelector('h2.section-title');
        const subtitle = sectionElement.querySelector('p.section-subtitle');
        
        if (title) title.textContent = sectionData.title;
        if (subtitle) subtitle.textContent = sectionData.subtitle;

        // 渲染卡片
        this.renderEditorialCards(sectionElement, sectionData.cards);

        // 渲染引言（如果有的話）
        if (sectionData.quote) {
            this.renderEditorialQuote(sectionElement, sectionData.quote);
        }
    }

    /**
     * 渲染 Editorial 風格卡片 - 雜誌編輯美學
     */
    renderEditorialCards(sectionElement, cards) {
        const cardsContainer = sectionElement.querySelector('.grid');
        if (!cardsContainer || !cards) return;
        
        cardsContainer.innerHTML = cards.map((card, index) => {
            const cardNumber = String(index + 1).padStart(2, '0');
            const delay = index * 0.2;
            
            return `
                <div class="editorial-card fade-in content-block group relative" style="animation-delay: ${delay}s;">
                    <!-- 藝術裝飾元素 -->
                    <div class="artistic-element" style="right: -50px; top: 20%;"></div>
                    
                    <div class="relative z-10">
                        <!-- 卡片編號 -->
                        <div class="card-number">${cardNumber}</div>
                        
                        <!-- 標題區域 - 編輯風格 -->
                        <div class="flex items-baseline gap-6 mb-8">
                            <div class="text-4xl editorial-icon opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                ${card.icon}
                            </div>
                            <h3 class="card-title group-hover:text-white transition-colors duration-500">
                                ${card.title}
                            </h3>
                        </div>
                        
                        <!-- 描述 - 雜誌風格 -->
                        <div class="card-content">
                            <span class="text-highlight">${this.extractHighlight(card.description)}</span>${this.removeHighlight(card.description)}
                        </div>
                    </div>
                    
                    <!-- 裝飾線條 -->
                    <div class="absolute bottom-6 left-0 w-16 h-0.5 bg-gray-600 opacity-60"></div>
                </div>
            `;
        }).join('');
        
        // 啟動編輯特效
        setTimeout(() => this.activateEditorialEffects(), 100);
    }

    /**
     * 提取文字中的重點詞彙用於高亮
     */
    extractHighlight(text) {
        // 簡單提取第一個重要詞彙
        const words = text.split(' ');
        return words.length > 3 ? words.slice(0, 2).join(' ') : words[0] || '';
    }

    /**
     * 移除已高亮的文字部分
     */
    removeHighlight(text) {
        const words = text.split(' ');
        if (words.length > 3) {
            return ' ' + words.slice(2).join(' ');
        } else {
            return words.length > 1 ? ' ' + words.slice(1).join(' ') : '';
        }
    }

    /**
     * 啟動 Editorial 特效系統
     */
    activateEditorialEffects() {
        // 藝術裝飾元素互動
        document.querySelectorAll('.artistic-element').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.borderColor = 'rgba(230, 230, 230, 0.6)';
                element.style.transform = 'rotate(25deg) scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.borderColor = 'rgba(102, 102, 102, 0.3)';
                element.style.transform = 'rotate(15deg) scale(1)';
            });
        });

        // 卡片編號特效
        document.querySelectorAll('.card-number').forEach(number => {
            number.addEventListener('mouseenter', () => {
                number.style.letterSpacing = '4px';
                number.style.opacity = '1';
            });
            
            number.addEventListener('mouseleave', () => {
                number.style.letterSpacing = '2px';
                number.style.opacity = '0.6';
            });
        });

        // 文字高亮互動增強
        document.querySelectorAll('.text-highlight').forEach(highlight => {
            highlight.addEventListener('mouseenter', () => {
                const before = highlight.querySelector('::before');
                highlight.style.background = 'rgba(230, 230, 230, 0.25)';
            });
            
            highlight.addEventListener('mouseleave', () => {
                highlight.style.background = 'transparent';
            });
        });

        // 卡片深度互動效果
        document.querySelectorAll('.editorial-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = 'rgba(230, 230, 230, 0.4)';
                const decorLine = card.querySelector('.absolute.bottom-6');
                if (decorLine) {
                    decorLine.style.width = '60px';
                    decorLine.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'rgba(102, 102, 102, 1)';
                const decorLine = card.querySelector('.absolute.bottom-6');
                if (decorLine) {
                    decorLine.style.width = '64px';
                    decorLine.style.opacity = '0.6';
                }
            });
        });
    }

    /**
     * 渲染 Editorial 風格引言 - 雜誌編輯設計
     */
    renderEditorialQuote(sectionElement, quote) {
        const quoteElement = sectionElement.querySelector('blockquote');
        if (quoteElement) {
            quoteElement.innerHTML = quote;
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
        console.log('Initializing Editorial content loader...');
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

        console.log('Editorial content loaded and rendered successfully!');
        
        // 添加 Editorial 特效
        this.addEditorialVisualEffects();
    }

    /**
     * 添加 Editorial 特有的視覺效果
     */
    addEditorialVisualEffects() {
        // 滾動視差效果
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // 藝術裝飾元素視差
            document.querySelectorAll('.artistic-element').forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `rotate(${15 + scrolled * 0.05}deg) translateY(${scrolled * speed * 0.1}px)`;
            });
            
            // 裝飾線條視差
            document.querySelectorAll('.header-line').forEach((line, index) => {
                const speed = index * 0.2;
                line.style.transform = `translateX(${scrolled * speed * 0.1}px)`;
            });
        });

        // 按鈕互動增強
        document.querySelectorAll('.editorial-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.letterSpacing = '2px';
                btn.style.transform = 'scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.letterSpacing = '1px';
                btn.style.transform = 'scale(1)';
            });
        });

        // 打字機效果（可選）
        this.addTypingEffect();

        // 滾動觸發淡入動畫
        const observeOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observeOptions);

        // 觀察所有需要動畫的元素
        document.querySelectorAll('.editorial-card, .fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 添加打字機效果（主標題）
     */
    addTypingEffect() {
        const mainTitle = document.querySelector('.main-heading');
        if (mainTitle && !mainTitle.dataset.typed) {
            const text = mainTitle.textContent;
            mainTitle.textContent = '';
            mainTitle.dataset.typed = 'true';
            
            let index = 0;
            const typeSpeed = 100;
            
            function type() {
                if (index < text.length) {
                    mainTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, typeSpeed);
                } else {
                    // 添加游標閃爍效果
                    mainTitle.style.borderRight = '2px solid #e6e6e6';
                    mainTitle.style.animation = 'blink 1s infinite';
                    
                    // 3秒後移除游標
                    setTimeout(() => {
                        mainTitle.style.borderRight = 'none';
                        mainTitle.style.animation = 'none';
                    }, 3000);
                }
            }
            
            // 延遲開始打字效果
            setTimeout(type, 1000);
        }
    }

    /**
     * 預設內容（載入失敗時使用）
     */
    getDefaultContent() {
        return {
            meta: { 
                title: "納瓦爾寶典", 
                subtitle: "編輯藝術美學",
                description: "體驗編輯藝術美學的網頁設計",
                copyright: "© 2024 納瓦爾寶典 - 編輯藝術美學"
            },
            navigation: { 
                logo: "EDITORIAL", 
                menuItems: [] 
            },
            hero: { 
                title: "Editorial", 
                subtitle: "Culture",
                description: "系統載入中...",
                buttons: []
            },
            sections: {}
        };
    }
}

// 建立全域實例
window.editorialContentLoader = new EditorialContentLoader();