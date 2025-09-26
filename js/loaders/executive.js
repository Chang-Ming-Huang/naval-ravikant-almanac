/**
 * Executive Style Content Loader
 * 高端商務風格的專用載入器，注重奢華質感和權威感
 */
class ExecutiveContentLoader {
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
            console.log('✅ Executive style content loaded successfully');
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
        document.title = meta.title + ' - Executive Luxury Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 高管專屬奢華體驗');
        }
    }

    /**
     * 渲染導航列 - 高端奢華風格
     */
    renderNavigation() {
        if (!this.content) return;

        const nav = document.getElementById('navigation');
        const { navigation } = this.content;

        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <!-- Executive Logo -->
                    <div class="flex items-center space-x-4">
                        <a href="../index.html" class="text-2xl font-bold font-serif executive-title">
                            👔 ${navigation.logo}
                        </a>
                        <div class="hidden md:block h-6 w-px bg-executive-gold/30"></div>
                        <span class="hidden md:block text-xs text-executive-gold font-sans tracking-widest uppercase">
                            Executive Suite
                        </span>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        ${navigation.menuItems.map(item => `
                            <a href="${item.href}" class="text-sm font-semibold text-white hover:text-executive-gold transition-all duration-300 tracking-wide uppercase">
                                ${item.label}
                            </a>
                        `).join('')}

                        <!-- Executive Status -->
                        <div class="flex items-center space-x-3 px-4 py-2 border border-executive-gold/30 rounded">
                            <div class="w-2 h-2 bg-executive-gold rounded-full animate-pulse"></div>
                            <span class="text-xs text-executive-gold font-sans tracking-wider uppercase">Premium Access</span>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="md:hidden text-white hover:text-executive-gold transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區塊 - 奢華高管風格
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.getElementById('hero');
        const { hero: heroContent } = this.content;

        hero.innerHTML += `
            <div class="relative z-10 max-w-6xl mx-auto">
                <!-- Executive Status Bar -->
                <div class="flex items-center justify-center space-x-8 text-executive-gold text-sm font-sans mb-12 opacity-0 animate-fade-in-up">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-px bg-executive-gold"></div>
                        <span class="tracking-widest uppercase">Executive Access</span>
                        <div class="w-8 h-px bg-executive-gold"></div>
                    </div>
                </div>

                <!-- Main Executive Title -->
                <h1 class="text-6xl md:text-9xl font-light font-serif mb-8 leading-none opacity-0 animate-fade-in-up animate-delay-200">
                    <span class="executive-title">${heroContent.title}</span>
                </h1>

                <!-- Executive Subtitle -->
                <p class="text-2xl md:text-3xl text-executive-gold font-light font-serif mb-10 opacity-0 animate-fade-in-up animate-delay-400">
                    ${heroContent.subtitle}
                </p>

                <!-- Executive Description -->
                <div class="text-xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light opacity-0 animate-fade-in-up animate-delay-600">
                    ${heroContent.description}
                </div>

                <!-- Executive Luxury CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-0 animate-fade-in-up animate-delay-800">
                    ${heroContent.buttons.map(button => `
                        <a href="${button.href}" class="group relative px-10 py-5 ${
                            button.type === 'primary'
                                ? 'bg-gradient-to-r from-executive-gold to-executive-gold-light text-black font-bold shadow-2xl shadow-executive-gold/40 hover:shadow-executive-gold/60'
                                : 'bg-transparent border-2 border-executive-gold text-executive-gold hover:bg-executive-gold hover:text-black font-bold shadow-xl shadow-executive-gold/20'
                        } transition-all duration-500 transform hover:scale-105 overflow-hidden">
                            <span class="relative z-10 tracking-wide uppercase">${button.text}</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </a>
                    `).join('')}
                </div>

                <!-- Executive Prestige Indicators -->
                <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-0 animate-fade-in-up animate-delay-800">
                    <div class="executive-card px-6 py-8 rounded-lg">
                        <div class="text-3xl font-bold font-serif text-executive-gold mb-2">C-Suite</div>
                        <div class="text-xs text-gray-400 uppercase tracking-widest">Executive Level</div>
                    </div>
                    <div class="executive-card px-6 py-8 rounded-lg">
                        <div class="text-3xl font-bold font-serif text-executive-gold mb-2">24/7</div>
                        <div class="text-xs text-gray-400 uppercase tracking-widest">Premium Support</div>
                    </div>
                    <div class="executive-card px-6 py-8 rounded-lg">
                        <div class="text-3xl font-bold font-serif text-executive-gold mb-2">Elite</div>
                        <div class="text-xs text-gray-400 uppercase tracking-widest">Members Only</div>
                    </div>
                    <div class="executive-card px-6 py-8 rounded-lg">
                        <div class="text-3xl font-bold font-serif text-executive-gold mb-2">Global</div>
                        <div class="text-xs text-gray-400 uppercase tracking-widest">Network Access</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 高端奢華風格
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const section = document.getElementById(sectionId);
        const sectionData = this.content.sections[sectionId];

        // Clear loading state
        section.classList.remove('loading');

        section.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <!-- Executive Section Header -->
                <div class="text-center mb-20">
                    <!-- Decorative Line -->
                    <div class="flex items-center justify-center space-x-6 mb-8">
                        <div class="w-20 h-px bg-gradient-to-r from-transparent to-executive-gold"></div>
                        <div class="w-4 h-4 border-2 border-executive-gold rotate-45"></div>
                        <div class="w-20 h-px bg-gradient-to-l from-transparent to-executive-gold"></div>
                    </div>

                    <h2 class="text-5xl md:text-6xl font-light font-serif text-white mb-8 executive-title">
                        ${sectionData.title}
                    </h2>
                    ${sectionData.subtitle ? `
                        <p class="text-2xl text-executive-gold font-light font-serif mb-10">
                            ${sectionData.subtitle}
                        </p>
                    ` : ''}
                    ${sectionData.quote ? `
                        <blockquote class="text-xl text-gray-300 italic font-serif border-l-4 border-executive-gold pl-8 max-w-4xl mx-auto leading-relaxed">
                            "${sectionData.quote}"
                        </blockquote>
                    ` : ''}
                </div>

                <!-- Executive Luxury Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    ${sectionData.cards.map((card, index) => `
                        <div class="executive-card text-white rounded-lg p-10 relative group" style="animation-delay: ${index * 0.15}s">
                            <!-- Luxury accent border -->
                            <div class="absolute -inset-0.5 bg-gradient-to-r from-executive-gold via-executive-gold-light to-executive-gold rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <div class="relative bg-gradient-to-br from-executive-black to-gray-900 rounded-lg p-8">

                                <!-- Card Header -->
                                <div class="flex items-center justify-between mb-8">
                                    <div class="text-4xl group-hover:scale-110 transition-transform duration-500">${card.icon}</div>
                                    <div class="text-executive-gold font-serif text-sm tracking-widest uppercase">
                                        Premium ${String.fromCharCode(65 + index)}
                                    </div>
                                </div>

                                <!-- Card Content -->
                                <h3 class="text-2xl font-semibold font-serif text-white mb-6 group-hover:text-executive-gold transition-colors duration-500">
                                    ${card.title}
                                </h3>

                                <p class="text-gray-300 leading-relaxed font-light text-lg mb-8">
                                    ${card.description}
                                </p>

                                <!-- Executive quality indicator -->
                                <div class="flex items-center justify-between pt-6 border-t border-executive-gold/20">
                                    <span class="text-executive-gold font-serif text-sm tracking-wider uppercase">Executive Grade</span>
                                    <div class="flex space-x-1">
                                        ${Array(5).fill(0).map(() => `
                                            <div class="w-2 h-2 bg-executive-gold rounded-full"></div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 渲染頁尾 - 高端商務信息
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.getElementById('footer');
        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-7xl mx-auto text-center">
                <!-- Executive Footer Header -->
                <div class="flex items-center justify-center space-x-6 mb-12">
                    <div class="w-20 h-px bg-gradient-to-r from-transparent to-executive-gold"></div>
                    <div class="text-executive-gold font-serif text-lg tracking-widest uppercase">
                        Executive Suite
                    </div>
                    <div class="w-20 h-px bg-gradient-to-l from-transparent to-executive-gold"></div>
                </div>

                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <!-- Column 1: Navigation -->
                    <div>
                        <h4 class="text-executive-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">Executive Navigation</h4>
                        <div class="space-y-3">
                            <a href="../index.html" class="block text-gray-300 hover:text-executive-gold transition-colors duration-300 font-light">返回主頁</a>
                            <a href="#wealth" class="block text-gray-300 hover:text-executive-gold transition-colors duration-300 font-light">財富智慧</a>
                        </div>
                    </div>

                    <!-- Column 2: Executive Services -->
                    <div>
                        <h4 class="text-executive-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">Premium Services</h4>
                        <div class="space-y-3 text-gray-300 text-sm">
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-2 h-2 bg-executive-gold rounded-full"></div>
                                <span>Concierge Support</span>
                            </div>
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-2 h-2 bg-executive-gold rounded-full"></div>
                                <span>Private Consultation</span>
                            </div>
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-2 h-2 bg-executive-gold rounded-full"></div>
                                <span>Global Network Access</span>
                            </div>
                        </div>
                    </div>

                    <!-- Column 3: Contact -->
                    <div>
                        <h4 class="text-executive-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">Executive Contact</h4>
                        <div class="text-gray-300 text-sm space-y-3 font-light">
                            <div>Executive Assistant</div>
                            <div>Premium Support Line</div>
                            <div class="text-executive-gold font-serif tracking-wider">Available 24/7</div>
                        </div>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="pt-8 border-t border-executive-gold/30">
                    <p class="text-gray-400 text-sm font-light">
                        ${meta.copyright} | Executive Luxury Edition |
                        <span class="text-executive-gold font-serif">Premium Experience</span>
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * 獲取預設內容
     */
    getDefaultContent() {
        return {
            meta: {
                title: "Executive Luxury Experience",
                description: "高管專屬奢華體驗",
                copyright: "© 2024 Executive Suite"
            },
            navigation: {
                logo: "EXEC SUITE",
                menuItems: [
                    { id: "wealth", label: "財富智慧", href: "#wealth" }
                ]
            },
            hero: {
                title: "高管專屬體驗",
                subtitle: "奢華商務典範",
                description: "為頂級決策者打造的專屬智慧平台",
                buttons: [
                    { text: "進入尊享", href: "#wealth", type: "primary" },
                    { text: "了解更多", href: "#", type: "secondary" }
                ]
            },
            sections: {
                wealth: {
                    title: "財富智慧",
                    subtitle: "高管決策指南",
                    cards: [
                        {
                            id: "strategy",
                            icon: "👔",
                            title: "戰略思維",
                            description: "頂級商業戰略和領導智慧。"
                        }
                    ]
                }
            }
        };
    }

    /**
     * 初始化載入器
     */
    async init() {
        console.log('🚀 Initializing Executive Content Loader...');

        await this.loadContent();

        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderSection('wealth');
        this.renderFooter();

        console.log('✅ Executive luxury style loaded successfully');
    }
}

// 初始化
const loader = new ExecutiveContentLoader();
loader.init().catch(console.error);