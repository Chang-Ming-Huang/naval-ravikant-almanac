/**
 * Business Style Content Loader
 * 企業專業風格的專用載入器，注重信息清晰度和專業感
 */
class BusinessContentLoader {
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
            console.log('✅ Business style content loaded successfully');
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
        document.title = meta.title + ' - Business Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 企業級專業體驗');
        }
    }

    /**
     * 渲染導航列 - 企業風格：清晰專業
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
                        <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span class="text-white font-bold text-sm">B</span>
                        </div>
                        <span class="font-semibold text-xl text-gray-900">${navigation.logo}</span>
                    </div>

                    <div class="hidden md:flex items-center space-x-8">
                        ${navigation.menuItems.map(item => `
                            <a href="${item.href}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                                ${item.label}
                            </a>
                        `).join('')}
                    </div>

                    <a href="../index.html" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                        返回首頁
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區域 - 企業風格：權威可信
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.querySelector('#hero');
        if (!hero) return;

        const { hero: heroData } = this.content;

        hero.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-16">
                <div class="text-center">
                    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        ${heroData.title}
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
                        ${heroData.subtitle}
                    </p>
                    <div class="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        ${heroData.description}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        ${heroData.buttons.map(button => `
                            <a href="${button.href}"
                               class="${button.type === 'primary'
                                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                                 : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}
                               px-8 py-4 rounded-md font-semibold transition-all duration-200 text-lg">
                                ${button.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 企業風格：結構化信息呈現
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
                        ${sectionData.title}
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                        ${sectionData.subtitle}
                    </p>
                    ${sectionData.quote ? `
                        <div class="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 mx-auto max-w-4xl">
                            <p class="text-lg text-gray-700 italic font-medium">
                                "${sectionData.quote}"
                            </p>
                        </div>
                    ` : ''}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${sectionData.cards.map(card => `
                        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span class="text-2xl">${card.icon}</span>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">
                                ${card.title}
                            </h3>
                            <p class="text-gray-600 leading-relaxed">
                                ${card.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 渲染頁腳 - 企業風格：專業權威
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.querySelector('footer');
        if (!footer) return;

        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-8">
                <div class="border-t border-gray-200 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-4 md:mb-0">
                            <p class="text-gray-600 font-medium">
                                ${meta.copyright}
                            </p>
                        </div>
                        <div class="text-sm text-gray-500">
                            <span class="font-semibold">Business Style</span> - 企業級專業設計體驗
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
                title: "Business Style",
                subtitle: "企業專業風格",
                description: "企業級專業設計體驗",
                copyright: "© 2024 Business Style. All rights reserved."
            },
            navigation: {
                logo: "Business",
                menuItems: [
                    { label: "首頁", href: "#hero" },
                    { label: "服務", href: "#services" },
                    { label: "關於", href: "#about" }
                ]
            },
            hero: {
                title: "Business Style",
                subtitle: "企業級專業設計",
                description: "專注於信息傳達效率的專業企業風格",
                buttons: [
                    { text: "了解更多", href: "#services", type: "primary" }
                ]
            },
            sections: {
                services: {
                    title: "企業服務",
                    subtitle: "專業可靠的解決方案",
                    cards: [
                        {
                            id: "strategy",
                            icon: "📊",
                            title: "策略規劃",
                            description: "全面的商業策略分析與規劃服務"
                        }
                    ]
                }
            }
        };
    }

    /**
     * 初始化企業風格特效
     */
    initBusinessEffects() {
        // 企業風格注重穩重，使用微妙的視覺效果
        console.log('🏢 Business style effects initialized');

        // 添加專業的滑動動畫
        const cards = document.querySelectorAll('.bg-white');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// 自動載入和初始化
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new BusinessContentLoader();

    try {
        await loader.loadContent();
        loader.renderMeta();
        loader.renderNavigation();
        loader.renderHero();
        loader.renderSection('wealth');
        loader.renderFooter();

        // 等待 DOM 更新後初始化效果
        setTimeout(() => {
            loader.initBusinessEffects();
        }, 100);

        console.log('✅ Business style page fully loaded');
    } catch (error) {
        console.error('❌ Business style page failed to load:', error);
    }
});

export default BusinessContentLoader;