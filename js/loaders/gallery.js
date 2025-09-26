/**
 * Gallery Style Content Loader
 * 美術館風格的專用載入器，注重藝術展覽級的視覺呈現
 */
class GalleryContentLoader {
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
            console.log('✅ Gallery style content loaded successfully');
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
        document.title = meta.title + ' - Gallery Museum Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 美術館典藏級體驗');
        }
    }

    /**
     * 渲染導航列 - 美術館風格
     */
    renderNavigation() {
        if (!this.content) return;

        const nav = document.getElementById('navigation');
        const { navigation } = this.content;

        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <!-- Gallery Logo -->
                    <div class="flex items-center space-x-4">
                        <a href="../index.html" class="text-2xl font-bold font-serif text-gallery-gray">
                            🎭 ${navigation.logo}
                        </a>
                        <div class="hidden md:block h-6 w-px bg-gallery-gold/30"></div>
                        <span class="hidden md:block text-xs text-gallery-gold font-serif tracking-widest uppercase">
                            Museum Collection
                        </span>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        ${navigation.menuItems.map(item => `
                            <a href="${item.href}" class="text-sm font-medium text-gallery-gray hover:text-gallery-gold transition-colors duration-300 tracking-wide">
                                ${item.label}
                            </a>
                        `).join('')}

                        <!-- Gallery Hours -->
                        <div class="exhibit-label px-4 py-2 rounded text-xs text-gallery-gray">
                            <div class="flex items-center space-x-2">
                                <div class="w-2 h-2 bg-gallery-gold rounded-full"></div>
                                <span class="font-serif">開放參觀</span>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="md:hidden text-gallery-gray hover:text-gallery-gold transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區塊 - 美術館展覽風格
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.getElementById('hero');
        const { hero: heroContent } = this.content;

        hero.innerHTML += `
            <div class="relative z-10 max-w-6xl mx-auto">
                <!-- Exhibition Placard -->
                <div class="exhibit-label inline-block px-8 py-3 rounded-lg mb-12 opacity-0 animate-fade-in-up">
                    <div class="flex items-center space-x-4 text-gallery-gray">
                        <div class="w-3 h-3 bg-gallery-gold rounded-full"></div>
                        <span class="font-serif text-sm tracking-widest uppercase">特別展覽</span>
                        <div class="w-12 h-px bg-gallery-gold/30"></div>
                        <span class="font-serif text-sm">Museum Collection</span>
                    </div>
                </div>

                <!-- Main Exhibition Title -->
                <h1 class="text-6xl md:text-9xl font-light font-serif mb-8 leading-none museum-title opacity-0 animate-fade-in-up animate-delay-200">
                    ${heroContent.title}
                </h1>

                <!-- Exhibition Subtitle -->
                <p class="text-2xl md:text-3xl text-gallery-gold font-light font-serif mb-10 opacity-0 animate-fade-in-up animate-delay-400">
                    ${heroContent.subtitle}
                </p>

                <!-- Exhibition Description -->
                <div class="text-lg text-gallery-gray-light max-w-4xl mx-auto mb-16 leading-relaxed font-light opacity-0 animate-fade-in-up animate-delay-600">
                    ${heroContent.description}
                </div>

                <!-- Gallery CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-0 animate-fade-in-up animate-delay-800">
                    ${heroContent.buttons.map(button => `
                        <a href="${button.href}" class="group relative px-10 py-4 ${
                            button.type === 'primary'
                                ? 'bg-gallery-gray text-gallery-cream hover:bg-gallery-gray-light shadow-lg shadow-gallery-gray/30'
                                : 'bg-transparent border-2 border-gallery-gray text-gallery-gray hover:bg-gallery-gray hover:text-gallery-cream shadow-lg shadow-gallery-gray/20'
                        } font-medium transition-all duration-500 transform hover:scale-105 overflow-hidden">
                            <span class="relative z-10 tracking-wide">${button.text}</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gallery-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </a>
                    `).join('')}
                </div>

                <!-- Museum Information -->
                <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-0 animate-fade-in-up animate-delay-1000">
                    <div class="gallery-frame px-6 py-8 rounded-lg">
                        <div class="text-2xl font-bold font-serif text-gallery-gray mb-2">15+</div>
                        <div class="text-xs text-gallery-gray-light uppercase tracking-widest font-serif">展覽廳</div>
                    </div>
                    <div class="gallery-frame px-6 py-8 rounded-lg">
                        <div class="text-2xl font-bold font-serif text-gallery-gray mb-2">100K+</div>
                        <div class="text-xs text-gallery-gray-light uppercase tracking-widest font-serif">典藏品</div>
                    </div>
                    <div class="gallery-frame px-6 py-8 rounded-lg">
                        <div class="text-2xl font-bold font-serif text-gallery-gray mb-2">24/7</div>
                        <div class="text-xs text-gallery-gray-light uppercase tracking-widest font-serif">線上參觀</div>
                    </div>
                    <div class="gallery-frame px-6 py-8 rounded-lg">
                        <div class="text-2xl font-bold font-serif text-gallery-gray mb-2">Global</div>
                        <div class="text-xs text-gallery-gray-light uppercase tracking-widest font-serif">國際認證</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 美術館展覽風格
     */
    renderSection(sectionId) {
        if (!this.content || !this.content.sections[sectionId]) return;

        const section = document.getElementById(sectionId);
        const sectionData = this.content.sections[sectionId];

        // Clear loading state
        section.classList.remove('loading');

        section.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <!-- Exhibition Section Header -->
                <div class="text-center mb-20">
                    <!-- Curatorial Note -->
                    <div class="exhibit-label inline-block px-6 py-2 rounded mb-8">
                        <span class="text-gallery-gray font-serif text-sm tracking-widest uppercase">策展特輯</span>
                    </div>

                    <h2 class="text-5xl md:text-6xl font-light font-serif text-gallery-gray mb-8 museum-title">
                        ${sectionData.title}
                    </h2>
                    ${sectionData.subtitle ? `
                        <p class="text-2xl text-gallery-gold font-light font-serif mb-10">
                            ${sectionData.subtitle}
                        </p>
                    ` : ''}
                    ${sectionData.quote ? `
                        <blockquote class="text-xl text-gallery-gray-light italic font-serif border-l-4 border-gallery-gold pl-8 max-w-4xl mx-auto leading-relaxed">
                            "${sectionData.quote}"
                        </blockquote>
                    ` : ''}
                </div>

                <!-- Gallery Exhibition Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    ${sectionData.cards.map((card, index) => `
                        <div class="gallery-frame text-gallery-gray rounded-lg p-8 relative group spotlight-effect" style="animation-delay: ${index * 0.2}s">
                            <!-- Exhibition Frame -->
                            <div class="relative">
                                <!-- Artwork Number -->
                                <div class="absolute -top-4 -left-4 exhibit-label w-12 h-12 rounded-full flex items-center justify-center">
                                    <span class="text-gallery-gray font-serif text-sm font-bold">${String.fromCharCode(65 + index)}</span>
                                </div>

                                <!-- Main Content -->
                                <div class="pt-4">
                                    <!-- Artwork Icon -->
                                    <div class="text-4xl mb-6 text-center group-hover:scale-110 transition-transform duration-500">${card.icon}</div>

                                    <!-- Artwork Title -->
                                    <h3 class="text-2xl font-semibold font-serif text-gallery-gray mb-4 text-center group-hover:text-gallery-gold transition-colors duration-500">
                                        ${card.title}
                                    </h3>

                                    <!-- Artist Statement -->
                                    <p class="text-gallery-gray-light leading-relaxed font-light text-center mb-6">
                                        ${card.description}
                                    </p>

                                    <!-- Exhibition Details -->
                                    <div class="pt-4 border-t border-gallery-gold/20">
                                        <div class="flex items-center justify-between text-xs text-gallery-gray-light">
                                            <span class="font-serif uppercase tracking-wider">Museum Collection</span>
                                            <div class="flex items-center space-x-1">
                                                <div class="w-1 h-1 bg-gallery-gold rounded-full"></div>
                                                <span class="font-serif">Permanent Display</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Gallery Information Panel -->
                <div class="mt-20 text-center">
                    <div class="exhibit-label inline-block px-8 py-4 rounded-lg">
                        <div class="text-gallery-gray font-serif">
                            <div class="text-sm uppercase tracking-widest mb-2">參觀資訊</div>
                            <div class="text-xs text-gallery-gray-light">
                                開放時間：每日 09:00 - 18:00 | 免費入場 | 專業導覽服務
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染頁尾 - 美術館信息
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.getElementById('footer');
        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-7xl mx-auto text-center">
                <!-- Gallery Footer Header -->
                <div class="flex items-center justify-center space-x-6 mb-12">
                    <div class="w-20 h-px bg-gallery-gold/30"></div>
                    <div class="text-gallery-gold font-serif text-lg tracking-widest uppercase">
                        Museum Gallery
                    </div>
                    <div class="w-20 h-px bg-gallery-gold/30"></div>
                </div>

                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <!-- Column 1: Navigation -->
                    <div>
                        <h4 class="text-gallery-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">展覽導覽</h4>
                        <div class="space-y-3">
                            <a href="../index.html" class="block text-gallery-cream hover:text-gallery-gold transition-colors duration-300 font-light">返回主頁</a>
                            <a href="#wealth" class="block text-gallery-cream hover:text-gallery-gold transition-colors duration-300 font-light">智慧典藏</a>
                        </div>
                    </div>

                    <!-- Column 2: Museum Services -->
                    <div>
                        <h4 class="text-gallery-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">Museum Services</h4>
                        <div class="space-y-3 text-gallery-cream text-sm font-serif">
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-1 h-1 bg-gallery-gold rounded-full"></div>
                                <span>專業導覽服務</span>
                            </div>
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-1 h-1 bg-gallery-gold rounded-full"></div>
                                <span>多媒體展示</span>
                            </div>
                            <div class="flex items-center justify-center space-x-3">
                                <div class="w-1 h-1 bg-gallery-gold rounded-full"></div>
                                <span>藝術教育工作坊</span>
                            </div>
                        </div>
                    </div>

                    <!-- Column 3: Contact -->
                    <div>
                        <h4 class="text-gallery-gold font-serif font-semibold mb-6 uppercase tracking-wider text-sm">參觀資訊</h4>
                        <div class="text-gallery-cream text-sm space-y-3 font-serif">
                            <div>開放時間：09:00 - 18:00</div>
                            <div>地址：文化藝術區</div>
                            <div class="text-gallery-gold">免費入場參觀</div>
                        </div>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="pt-8 border-t border-gallery-gold/20">
                    <p class="text-gallery-cream/80 text-sm font-serif">
                        ${meta.copyright} | Gallery Museum Edition |
                        <span class="text-gallery-gold">藝術典藏級體驗</span>
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
                title: "Gallery Museum Experience",
                description: "美術館典藏級體驗",
                copyright: "© 2024 Gallery Museum"
            },
            navigation: {
                logo: "GALLERY",
                menuItems: [
                    { id: "wealth", label: "智慧典藏", href: "#wealth" }
                ]
            },
            hero: {
                title: "藝術典藏",
                subtitle: "美學智慧展覽",
                description: "探索知識與藝術的完美融合",
                buttons: [
                    { text: "進入展廳", href: "#wealth", type: "primary" },
                    { text: "參觀資訊", href: "#", type: "secondary" }
                ]
            },
            sections: {
                wealth: {
                    title: "智慧典藏",
                    subtitle: "精選展品",
                    cards: [
                        {
                            id: "wisdom",
                            icon: "🎭",
                            title: "智慧藝術",
                            description: "深度思考與藝術表達的完美結合。"
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
        console.log('🚀 Initializing Gallery Content Loader...');

        await this.loadContent();

        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderSection('wealth');
        this.renderFooter();

        console.log('✅ Gallery museum style loaded successfully');
    }
}

// 初始化
const loader = new GalleryContentLoader();
loader.init().catch(console.error);