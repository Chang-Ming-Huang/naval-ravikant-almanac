/**
 * Professional Style Content Loader
 * 金融級專業風格的專用載入器，注重數據權威感和嚴謹性
 */
class ProfessionalContentLoader {
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
            console.log('✅ Professional style content loaded successfully');
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
        document.title = meta.title + ' - Professional Financial Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 金融級專業分析');
        }
    }

    /**
     * 渲染導航列 - 金融專業風格：數據導向
     */
    renderNavigation() {
        if (!this.content) return;

        const nav = document.getElementById('navigation');
        const { navigation } = this.content;

        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center space-x-4">
                        <a href="../index.html" class="text-2xl font-bold professional-title">
                            📊 ${navigation.logo}
                        </a>
                        <span class="hidden md:block text-xs text-professional-gold font-mono tracking-wider">
                            FINANCIAL ANALYSIS
                        </span>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        ${navigation.menuItems.map(item => `
                            <a href="${item.href}" class="text-sm font-semibold text-white hover:text-professional-gold transition-colors duration-200 tracking-wide">
                                ${item.label}
                            </a>
                        `).join('')}

                        <!-- Data Indicator -->
                        <div class="flex items-center space-x-2 text-xs text-professional-gold font-mono">
                            <div class="w-2 h-2 bg-professional-gold rounded-full animate-pulse"></div>
                            <span>LIVE DATA</span>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="md:hidden text-white hover:text-professional-gold">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區塊 - 金融權威風格
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.getElementById('hero');
        const { hero: heroContent } = this.content;

        hero.innerHTML += `
            <div class="relative z-10 max-w-5xl mx-auto">
                <!-- Financial Data Header -->
                <div class="flex items-center justify-center space-x-6 text-professional-gold text-sm font-mono mb-8 opacity-0 animate-fade-in-up">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-professional-gold rounded-full animate-pulse"></div>
                        <span>MARKET ANALYSIS</span>
                    </div>
                    <div class="w-px h-4 bg-professional-gold/30"></div>
                    <div class="flex items-center space-x-2">
                        <span>REAL-TIME INSIGHTS</span>
                        <div class="w-3 h-3 bg-professional-gold rounded-full animate-pulse animation-delay-200"></div>
                    </div>
                </div>

                <!-- Main Title -->
                <h1 class="text-6xl md:text-8xl font-light mb-6 leading-none opacity-0 animate-fade-in-up animate-delay-200">
                    <span class="professional-title">${heroContent.title}</span>
                </h1>

                <!-- Subtitle -->
                <p class="text-xl md:text-2xl text-professional-gold font-light mb-8 opacity-0 animate-fade-in-up animate-delay-400">
                    ${heroContent.subtitle}
                </p>

                <!-- Description -->
                <div class="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up animate-delay-600">
                    ${heroContent.description}
                </div>

                <!-- Professional CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up animate-delay-800">
                    ${heroContent.buttons.map(button => `
                        <a href="${button.href}" class="group relative px-8 py-4 ${
                            button.type === 'primary'
                                ? 'bg-professional-blue text-white border-2 border-professional-blue hover:bg-transparent hover:text-professional-blue'
                                : 'bg-transparent border-2 border-professional-gold text-professional-gold hover:bg-professional-gold hover:text-professional-blue'
                        } font-semibold transition-all duration-300 overflow-hidden">
                            <span class="relative z-10">${button.text}</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </a>
                    `).join('')}
                </div>

                <!-- Financial Metrics Display -->
                <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-0 animate-fade-in-up animate-delay-800">
                    <div class="text-professional-gold">
                        <div class="text-2xl font-bold font-mono">95%</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider">Accuracy Rate</div>
                    </div>
                    <div class="text-professional-gold">
                        <div class="text-2xl font-bold font-mono">24/7</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider">Market Monitor</div>
                    </div>
                    <div class="text-professional-gold">
                        <div class="text-2xl font-bold font-mono">$2.5B</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider">Assets Analyzed</div>
                    </div>
                    <div class="text-professional-gold">
                        <div class="text-2xl font-bold font-mono">15K+</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider">Professionals</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 數據分析風格
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const section = document.getElementById(sectionId);
        const sectionData = this.content.sections[sectionId];

        // Clear loading state
        section.classList.remove('loading');

        section.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-light text-white mb-6 professional-title">
                        ${sectionData.title}
                    </h2>
                    ${sectionData.subtitle ? `
                        <p class="text-xl text-professional-gold font-light mb-8">
                            ${sectionData.subtitle}
                        </p>
                    ` : ''}
                    ${sectionData.quote ? `
                        <blockquote class="text-lg text-gray-300 italic border-l-4 border-professional-gold pl-6 max-w-3xl mx-auto">
                            "${sectionData.quote}"
                        </blockquote>
                    ` : ''}
                </div>

                <!-- Professional Data Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${sectionData.cards.map((card, index) => `
                        <div class="professional-card text-white rounded-lg p-8 relative overflow-hidden group" style="animation-delay: ${index * 0.1}s">
                            <!-- Data visualization line -->
                            <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-professional-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <!-- Card Header -->
                            <div class="flex items-center justify-between mb-6">
                                <div class="text-3xl">${card.icon}</div>
                                <div class="text-professional-gold font-mono text-xs">
                                    DATA_${String(index + 1).padStart(2, '0')}
                                </div>
                            </div>

                            <!-- Card Content -->
                            <h3 class="text-xl font-semibold text-white mb-4">
                                ${card.title}
                            </h3>

                            <p class="text-gray-300 leading-relaxed">
                                ${card.description}
                            </p>

                            <!-- Professional metrics indicator -->
                            <div class="mt-6 pt-4 border-t border-gray-600/30">
                                <div class="flex items-center justify-between text-xs text-gray-400">
                                    <span class="font-mono">RELIABILITY</span>
                                    <div class="flex space-x-1">
                                        ${Array(5).fill(0).map((_, i) => `
                                            <div class="w-1 h-1 ${i < 4 ? 'bg-professional-gold' : 'bg-gray-600'} rounded-full"></div>
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
     * 渲染頁尾 - 金融級信息
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.getElementById('footer');
        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-7xl mx-auto text-center">
                <!-- Professional Footer Header -->
                <div class="flex items-center justify-center space-x-4 mb-8">
                    <div class="h-px bg-professional-gold flex-1 max-w-xs"></div>
                    <div class="text-professional-gold font-mono text-sm tracking-wider">
                        PROFESSIONAL FINANCIAL ANALYSIS
                    </div>
                    <div class="h-px bg-professional-gold flex-1 max-w-xs"></div>
                </div>

                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <!-- Column 1: Navigation -->
                    <div>
                        <h4 class="text-professional-gold font-semibold mb-4 uppercase tracking-wider text-sm">Navigation</h4>
                        <div class="space-y-2">
                            <a href="../index.html" class="block text-gray-300 hover:text-professional-gold transition-colors duration-200">回到主頁</a>
                            <a href="#wealth" class="block text-gray-300 hover:text-professional-gold transition-colors duration-200">財富智慧</a>
                        </div>
                    </div>

                    <!-- Column 2: Professional Info -->
                    <div>
                        <h4 class="text-professional-gold font-semibold mb-4 uppercase tracking-wider text-sm">Financial Data</h4>
                        <div class="space-y-2 text-gray-300 text-sm font-mono">
                            <div>Market Status: <span class="text-professional-gold">ACTIVE</span></div>
                            <div>Last Update: <span class="text-professional-gold">${new Date().toLocaleTimeString()}</span></div>
                            <div>Data Source: <span class="text-professional-gold">VERIFIED</span></div>
                        </div>
                    </div>

                    <!-- Column 3: Contact -->
                    <div>
                        <h4 class="text-professional-gold font-semibold mb-4 uppercase tracking-wider text-sm">Professional Contact</h4>
                        <div class="text-gray-300 text-sm space-y-2">
                            <div>Financial Analysis Division</div>
                            <div>Professional Services</div>
                            <div class="text-professional-gold font-mono">24/7 SUPPORT</div>
                        </div>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="pt-8 border-t border-gray-600/30">
                    <p class="text-gray-400 text-sm font-mono">
                        ${meta.copyright} | Professional Financial Edition |
                        <span class="text-professional-gold">SECURE & VERIFIED</span>
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
                title: "Professional Financial Analysis",
                description: "金融級專業分析系統",
                copyright: "© 2024 Professional Analysis Suite"
            },
            navigation: {
                logo: "PROF ANALYSIS",
                menuItems: [
                    { id: "wealth", label: "財富分析", href: "#wealth" }
                ]
            },
            hero: {
                title: "專業金融分析",
                subtitle: "數據驅動決策",
                description: "使用專業級金融分析工具，獲得深度市場洞察",
                buttons: [
                    { text: "開始分析", href: "#wealth", type: "primary" },
                    { text: "查看報告", href: "#", type: "secondary" }
                ]
            },
            sections: {
                wealth: {
                    title: "專業財富分析",
                    subtitle: "基於數據的投資決策",
                    cards: [
                        {
                            id: "analysis",
                            icon: "📊",
                            title: "市場分析",
                            description: "專業級市場數據分析和趨勢預測。"
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
        console.log('🚀 Initializing Professional Content Loader...');

        await this.loadContent();

        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderSection('wealth');
        this.renderFooter();

        console.log('✅ Professional style loaded successfully');
    }
}

// 初始化
const loader = new ProfessionalContentLoader();
loader.init().catch(console.error);