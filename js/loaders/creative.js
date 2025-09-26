/**
 * Creative Style Content Loader
 * 創意設計風格的專用載入器，注重視覺創新和多彩表達
 */
class CreativeContentLoader {
    constructor() {
        this.content = null;
        this.isLoaded = false;
        this.colorPalette = ['#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
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
            console.log('🎨 Creative style content loaded successfully');
            return this.content;
        } catch (error) {
            console.error('❌ Failed to load content:', error);
            return this.getDefaultContent();
        }
    }

    /**
     * 渲染網站元資訊
     */
    renderMeta() {
        if (!this.content) return;

        const { meta } = this.content;
        document.title = meta.title + ' - Creative Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 創意設計體驗');
        }
    }

    /**
     * 渲染導航列 - 創意風格：活潑多彩
     */
    renderNavigation() {
        if (!this.content) return;

        const nav = document.querySelector('nav');
        if (!nav) return;

        const { navigation } = this.content;

        nav.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center transform rotate-12">
                            <span class="text-white font-bold text-lg">C</span>
                        </div>
                        <span class="font-bold text-xl text-gray-900">${navigation.logo}</span>
                        <div class="hidden md:flex space-x-1">
                            ${this.colorPalette.slice(0, 4).map(color => `
                                <div class="w-2 h-2 rounded-full" style="background-color: ${color}"></div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="hidden md:flex items-center space-x-6">
                        ${navigation.menuItems.map((item, index) => `
                            <a href="${item.href}"
                               class="text-gray-700 hover:text-pink-600 font-medium transition-all duration-200 relative group"
                               style="color: ${this.colorPalette[index % this.colorPalette.length]}">
                                ${item.label}
                                <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></div>
                            </a>
                        `).join('')}
                    </div>

                    <a href="../index.html" class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium transform hover:scale-105">
                        返回首頁
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區域 - 創意風格：充滿活力
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.querySelector('#hero');
        if (!hero) return;

        const { hero: heroData } = this.content;

        hero.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-20">
                <div class="text-center">
                    <div class="flex justify-center mb-8">
                        ${this.colorPalette.map((color, index) => `
                            <div class="w-4 h-4 rounded-full mx-1 creative-dot"
                                 style="background-color: ${color}; animation-delay: ${index * 0.2}s"></div>
                        `).join('')}
                    </div>

                    <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        <span class="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            ${heroData.title}
                        </span>
                    </h1>

                    <p class="text-xl md:text-2xl text-gray-600 mb-4 font-semibold">
                        ${heroData.subtitle}
                    </p>

                    <div class="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        ${heroData.description}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        ${heroData.buttons.map((button, index) => `
                            <a href="${button.href}"
                               class="${button.type === 'primary'
                                 ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                                 : 'border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white'}
                               px-8 py-4 rounded-full font-semibold transition-all duration-200 text-lg transform hover:scale-105 shadow-lg">
                                ${button.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 創意風格：多彩卡片網格
     */
    renderSection(sectionId) {
        if (!this.content) return;

        const section = document.querySelector(`#${sectionId}`);
        if (!section) return;

        const sectionData = this.content.sections[sectionId];
        if (!sectionData) return;

        section.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-16">
                <div class="text-center mb-12">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            ${sectionData.title}
                        </span>
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                        ${sectionData.subtitle}
                    </p>
                    ${sectionData.quote ? `
                        <div class="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-500 mx-auto max-w-4xl rounded-r-lg">
                            <p class="text-lg text-gray-700 italic font-medium">
                                "${sectionData.quote}"
                            </p>
                        </div>
                    ` : ''}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${sectionData.cards.map((card, index) => {
                        const cardColor = this.colorPalette[index % this.colorPalette.length];
                        return `
                            <div class="creative-card bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-opacity-50"
                                 style="border-color: ${cardColor}20">
                                <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6"
                                     style="background: linear-gradient(135deg, ${cardColor}20, ${cardColor}10)">
                                    <span class="text-3xl">${card.icon}</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3" style="color: ${cardColor}">
                                    ${card.title}
                                </h3>
                                <p class="text-gray-600 leading-relaxed">
                                    ${card.description}
                                </p>
                                <div class="mt-4 w-full h-1 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                                         style="background: linear-gradient(90deg, ${cardColor}, ${this.colorPalette[(index + 1) % this.colorPalette.length]})"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 渲染頁腳 - 創意風格：彩色漸層
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.querySelector('footer');
        if (!footer) return;

        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-12">
                <div class="border-t-4 border-gradient-to-r from-pink-400 to-purple-400 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-4 md:mb-0">
                            <p class="text-gray-600 font-medium">
                                ${meta.copyright}
                            </p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="text-sm text-gray-500">
                                <span class="font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Creative Style</span> - 創意無限設計體驗
                            </div>
                            <div class="flex space-x-1">
                                ${this.colorPalette.map(color => `
                                    <div class="w-3 h-3 rounded-full animate-pulse" style="background-color: ${color}"></div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 預設內容
     */
    getDefaultContent() {
        return {
            meta: {
                title: "Creative Style",
                subtitle: "創意設計風格",
                description: "充滿創意能量的設計體驗",
                copyright: "© 2024 Creative Style. All rights reserved."
            },
            navigation: {
                logo: "Creative",
                menuItems: [
                    { label: "首頁", href: "#hero" },
                    { label: "創意", href: "#creative" },
                    { label: "靈感", href: "#inspiration" }
                ]
            },
            hero: {
                title: "Creative Style",
                subtitle: "創意無限設計",
                description: "激發創造力的多彩設計風格",
                buttons: [
                    { text: "探索創意", href: "#creative", type: "primary" }
                ]
            },
            sections: {
                creative: {
                    title: "創意理念",
                    subtitle: "多彩設計，激發無限可能",
                    cards: [
                        {
                            id: "innovation",
                            icon: "💡",
                            title: "創新思維",
                            description: "突破傳統框架，開創全新視覺體驗"
                        }
                    ]
                }
            }
        };
    }

    /**
     * 初始化創意風格特效
     */
    initCreativeEffects() {
        console.log('🎨 Creative style effects initialized');

        // 創意彩點動畫
        const dots = document.querySelectorAll('.creative-dot');
        dots.forEach((dot, index) => {
            dot.style.animation = `creativePulse 2s ease-in-out infinite ${index * 0.2}s`;
        });

        // 動態CSS動畫注入
        const style = document.createElement('style');
        style.textContent = `
            @keyframes creativePulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.5); opacity: 1; }
            }

            .creative-card {
                position: relative;
                overflow: hidden;
            }

            .creative-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(236, 72, 153, 0.1), transparent);
                transform: rotate(45deg);
                transition: all 0.6s ease;
                opacity: 0;
            }

            .creative-card:hover::before {
                transform: rotate(45deg) translate(50%, 50%);
                opacity: 1;
            }

            .creative-gradient-text {
                background: linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4, #10b981);
                background-size: 400% 400%;
                animation: gradientShift 3s ease infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);

        // 創意卡片特效
        const cards = document.querySelectorAll('.creative-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }
}

// 自動載入和初始化
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new CreativeContentLoader();

    try {
        await loader.loadContent();
        loader.renderMeta();
        loader.renderNavigation();
        loader.renderHero();
        loader.renderSection('wealth');
        loader.renderFooter();

        // 等待 DOM 更新後初始化效果
        setTimeout(() => {
            loader.initCreativeEffects();
        }, 100);

        console.log('✅ Creative style page fully loaded');
    } catch (error) {
        console.error('❌ Creative style page failed to load:', error);
    }
});

export default CreativeContentLoader;