/**
 * Gaming Style Content Loader
 * 遊戲電競風格的專用載入器，注重競技氛圍和科技感
 */
class GamingContentLoader {
    constructor() {
        this.content = null;
        this.isLoaded = false;
        this.gamingColors = {
            primary: '#22c55e',
            secondary: '#f97316',
            danger: '#ef4444',
            info: '#06b6d4',
            warning: '#eab308'
        };
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
            console.log('🎮 Gaming style content loaded successfully');
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
        document.title = meta.title + ' - Gaming Edition';

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', meta.description + ' - 電競遊戲體驗');
        }
    }

    /**
     * 渲染導航列 - 電競風格：科技競技
     */
    renderNavigation() {
        if (!this.content) return;

        const nav = document.querySelector('nav');
        if (!nav) return;

        const { navigation } = this.content;

        nav.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-black border-2 border-green-500 flex items-center justify-center relative">
                            <span class="text-green-400 font-bold text-lg font-orbitron">G</span>
                            <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <span class="font-bold text-xl text-green-400 font-orbitron tracking-wider">${navigation.logo}</span>
                        <div class="hidden md:flex items-center space-x-1">
                            <div class="w-2 h-2 bg-green-500 animate-pulse"></div>
                            <div class="w-2 h-2 bg-orange-500 animate-pulse" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-red-500 animate-pulse" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>

                    <div class="hidden md:flex items-center space-x-6">
                        ${navigation.menuItems.map((item, index) => `
                            <a href="${item.href}"
                               class="text-gray-400 hover:text-green-400 font-semibold transition-all duration-200 relative group font-orbitron uppercase tracking-wide text-sm"
                               style="text-shadow: 0 0 10px currentColor">
                                ${item.label}
                                <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                            </a>
                        `).join('')}
                    </div>

                    <a href="../index.html" class="bg-green-500 text-black px-6 py-2 font-bold font-orbitron uppercase tracking-wider border-2 border-green-400 hover:bg-green-400 hover:border-green-300 transition-all duration-200 shadow-lg shadow-green-500/30">
                        MAIN MENU
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主標題區域 - 電競風格：競技氛圍
     */
    renderHero() {
        if (!this.content) return;

        const hero = document.querySelector('#hero');
        if (!hero) return;

        const { hero: heroData } = this.content;

        hero.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-20">
                <div class="text-center">
                    <!-- Gaming Status Bar -->
                    <div class="flex justify-center mb-8">
                        <div class="bg-black border border-green-500 px-6 py-2 font-orbitron text-green-400 tracking-wider">
                            <span class="text-xs">SYSTEM STATUS: </span>
                            <span class="text-green-400 font-bold animate-pulse">ONLINE</span>
                        </div>
                    </div>

                    <h1 class="text-5xl md:text-7xl font-bold text-green-400 mb-6 leading-tight font-orbitron tracking-wider">
                        <span class="gaming-glitch-text">${heroData.title}</span>
                    </h1>

                    <p class="text-xl md:text-2xl text-gray-300 mb-4 font-semibold font-rajdhani tracking-wide">
                        ${heroData.subtitle}
                    </p>

                    <div class="text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-rajdhani">
                        ${heroData.description}
                    </div>

                    <!-- Gaming HUD Style Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        ${heroData.buttons.map((button, index) => `
                            <a href="${button.href}"
                               class="${button.type === 'primary'
                                 ? 'bg-green-500 text-black hover:bg-green-400 border-2 border-green-400 hover:border-green-300 shadow-lg shadow-green-500/30'
                                 : 'bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black shadow-lg shadow-orange-500/20'}
                               px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-200 text-lg relative overflow-hidden group">
                                <span class="relative z-10">${button.text}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </a>
                        `).join('')}
                    </div>

                    <!-- Gaming Stats Display -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
                        <div class="bg-black border border-green-500/30 p-4 text-center">
                            <div class="text-2xl font-bold text-green-400 font-orbitron">16</div>
                            <div class="text-xs text-gray-400 font-rajdhani uppercase">STYLES</div>
                        </div>
                        <div class="bg-black border border-orange-500/30 p-4 text-center">
                            <div class="text-2xl font-bold text-orange-400 font-orbitron">100%</div>
                            <div class="text-xs text-gray-400 font-rajdhani uppercase">COMPLETE</div>
                        </div>
                        <div class="bg-black border border-blue-500/30 p-4 text-center">
                            <div class="text-2xl font-bold text-blue-400 font-orbitron">∞</div>
                            <div class="text-xs text-gray-400 font-rajdhani uppercase">WISDOM</div>
                        </div>
                        <div class="bg-black border border-red-500/30 p-4 text-center">
                            <div class="text-2xl font-bold text-red-400 font-orbitron">MAX</div>
                            <div class="text-xs text-gray-400 font-rajdhani uppercase">LEVEL</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染內容區塊 - 電競風格：HUD介面風格
     */
    renderSection(sectionId) {
        if (!this.content) return;

        const section = document.querySelector(`#${sectionId}`);
        if (!section) return;

        const sectionData = this.content.sections[sectionId];
        if (!sectionData) return;

        section.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-16">
                <!-- Gaming Section Header -->
                <div class="text-center mb-12">
                    <div class="inline-block bg-black border border-green-500 px-6 py-2 mb-6">
                        <span class="text-green-400 font-orbitron text-sm uppercase tracking-wider">MISSION BRIEFING</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-green-400 mb-4 font-orbitron tracking-wider">
                        ${sectionData.title}
                    </h2>
                    <p class="text-xl text-gray-300 max-w-3xl mx-auto font-semibold font-rajdhani">
                        ${sectionData.subtitle}
                    </p>
                    ${sectionData.quote ? `
                        <div class="mt-8 p-6 bg-black border-l-4 border-green-500 mx-auto max-w-4xl">
                            <p class="text-lg text-green-300 italic font-medium font-rajdhani">
                                > "${sectionData.quote}"
                            </p>
                        </div>
                    ` : ''}
                </div>

                <!-- Gaming Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${sectionData.cards.map((card, index) => {
                        const colors = Object.values(this.gamingColors);
                        const cardColor = colors[index % colors.length];
                        return `
                            <div class="gaming-card bg-black border border-gray-700 hover:border-green-500 p-6 transition-all duration-300 relative overflow-hidden group">
                                <!-- Card Header -->
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gray-900 border border-green-500/50 flex items-center justify-center">
                                        <span class="text-2xl">${card.icon}</span>
                                    </div>
                                    <div class="text-xs text-gray-500 font-orbitron">
                                        ID: ${String(index + 1).padStart(3, '0')}
                                    </div>
                                </div>

                                <!-- Card Content -->
                                <h3 class="text-xl font-bold text-green-400 mb-3 font-orbitron uppercase tracking-wide">
                                    ${card.title}
                                </h3>
                                <p class="text-gray-300 leading-relaxed font-rajdhani">
                                    ${card.description}
                                </p>

                                <!-- Card Status Bar -->
                                <div class="mt-4 flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <div class="w-2 h-2 bg-green-500 animate-pulse"></div>
                                        <div class="w-2 h-2 bg-green-500/50"></div>
                                        <div class="w-2 h-2 bg-green-500/25"></div>
                                    </div>
                                    <div class="text-xs text-green-400 font-orbitron">ACTIVE</div>
                                </div>

                                <!-- Hover Effect -->
                                <div class="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div class="absolute top-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-500"></div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 渲染頁腳 - 電競風格：終端機界面
     */
    renderFooter() {
        if (!this.content) return;

        const footer = document.querySelector('footer');
        if (!footer) return;

        const { meta } = this.content;

        footer.innerHTML = `
            <div class="max-w-6xl mx-auto px-6 py-12">
                <div class="border-t border-green-500/30 pt-8">
                    <!-- Terminal Style Footer -->
                    <div class="bg-black border border-green-500/50 p-6 font-mono">
                        <div class="flex items-center mb-4">
                            <span class="text-green-400">[SYSTEM]</span>
                            <span class="text-gray-400 ml-2">Terminal Ready</span>
                            <div class="ml-auto flex space-x-2">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="text-green-400">
                                <span class="text-gray-500">user@gaming-style:~$</span>
                                <span class="text-green-400">echo "${meta.copyright}"</span>
                            </div>
                            <div class="text-gray-300 ml-6">
                                ${meta.copyright}
                            </div>
                            <div class="text-green-400">
                                <span class="text-gray-500">user@gaming-style:~$</span>
                                <span class="text-green-400">status --gaming-style</span>
                            </div>
                            <div class="text-gray-300 ml-6">
                                <span class="text-green-400">●</span> Gaming Style - 電競級設計體驗 [ACTIVE]
                            </div>
                            <div class="text-green-400">
                                <span class="text-gray-500">user@gaming-style:~$</span>
                                <span class="animate-pulse">█</span>
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
                title: "Gaming Style",
                subtitle: "電競遊戲風格",
                description: "電競級遊戲設計體驗",
                copyright: "© 2024 Gaming Style. All rights reserved."
            },
            navigation: {
                logo: "GAMING",
                menuItems: [
                    { label: "HOME", href: "#hero" },
                    { label: "MISSIONS", href: "#missions" },
                    { label: "STATS", href: "#stats" }
                ]
            },
            hero: {
                title: "GAMING STYLE",
                subtitle: "ENTER THE ARENA",
                description: "體驗電競級的設計與競技氛圍",
                buttons: [
                    { text: "START GAME", href: "#missions", type: "primary" }
                ]
            },
            sections: {
                missions: {
                    title: "MISSIONS",
                    subtitle: "完成挑戰，獲得成就",
                    cards: [
                        {
                            id: "challenge",
                            icon: "🏆",
                            title: "ULTIMATE CHALLENGE",
                            description: "突破極限，達成最高成就"
                        }
                    ]
                }
            }
        };
    }

    /**
     * 初始化電競風格特效
     */
    initGamingEffects() {
        console.log('🎮 Gaming style effects initialized');

        // 電競故障文字效果
        const style = document.createElement('style');
        style.textContent = `
            .gaming-glitch-text {
                position: relative;
                color: #22c55e;
                font-weight: bold;
                animation: glitch 2s infinite;
            }

            .gaming-glitch-text::before,
            .gaming-glitch-text::after {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .gaming-glitch-text::before {
                animation: glitch-1 0.5s infinite;
                color: #ef4444;
                z-index: -1;
            }

            .gaming-glitch-text::after {
                animation: glitch-2 0.5s infinite;
                color: #06b6d4;
                z-index: -2;
            }

            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-1px, 1px); }
                40% { transform: translate(-1px, -1px); }
                60% { transform: translate(1px, 1px); }
                80% { transform: translate(1px, -1px); }
            }

            @keyframes glitch-1 {
                0%, 100% { transform: translate(0); }
                10% { transform: translate(-2px, -1px); }
                20% { transform: translate(-2px, -1px); }
                30% { transform: translate(1px, 2px); }
                40% { transform: translate(1px, 2px); }
                50% { transform: translate(-1px, 2px); }
                60% { transform: translate(-1px, 2px); }
                70% { transform: translate(3px, 1px); }
                80% { transform: translate(3px, 1px); }
                90% { transform: translate(-1px, 1px); }
            }

            @keyframes glitch-2 {
                0%, 100% { transform: translate(0); }
                10% { transform: translate(2px, 1px); }
                20% { transform: translate(2px, 1px); }
                30% { transform: translate(-1px, -2px); }
                40% { transform: translate(-1px, -2px); }
                50% { transform: translate(1px, -2px); }
                60% { transform: translate(1px, -2px); }
                70% { transform: translate(-3px, -1px); }
                80% { transform: translate(-3px, -1px); }
                90% { transform: translate(1px, -1px); }
            }

            .gaming-card {
                position: relative;
            }

            .gaming-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
                transition: left 0.5s;
            }

            .gaming-card:hover::before {
                left: 100%;
            }
        `;
        document.head.appendChild(style);

        // 電競卡片動畫
        const cards = document.querySelectorAll('.gaming-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // 設置故障文字效果
        const glitchText = document.querySelector('.gaming-glitch-text');
        if (glitchText) {
            glitchText.setAttribute('data-text', glitchText.textContent);
        }
    }
}

// 自動載入和初始化
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new GamingContentLoader();

    try {
        await loader.loadContent();
        loader.renderMeta();
        loader.renderNavigation();
        loader.renderHero();
        loader.renderSection('wealth');
        loader.renderFooter();

        // 等待 DOM 更新後初始化效果
        setTimeout(() => {
            loader.initGamingEffects();
        }, 100);

        console.log('✅ Gaming style page fully loaded');
    } catch (error) {
        console.error('❌ Gaming style page failed to load:', error);
    }
});

export default GamingContentLoader;