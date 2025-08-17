// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to cards and sections
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const animatedElements = document.querySelectorAll('.card, .happiness-principle, .philosophy-card, .glossary-item, .choice-item, .thinking-card, .qa-item, .guide-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add stagger delay to grid items
    document.querySelectorAll('.grid-container .card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.happiness-grid .happiness-principle').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.philosophy-grid .philosophy-card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.glossary-grid .glossary-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.thinking-grid .thinking-card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger animations for Q&A items
    document.querySelectorAll('.qa-grid .qa-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.qa-guide .guide-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Initialize popup system
    initializePopupSystem();
});

// Popup System Implementation
function initializePopupSystem() {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupTitle = document.querySelector('.popup-title');
    const popupOverview = document.querySelector('.popup-overview');
    const popupAnalysis = document.querySelector('.popup-analysis');
    const popupApplication = document.querySelector('.popup-application');
    const popupKeypoints = document.querySelector('.popup-keypoints');
    const popupClose = document.querySelector('.popup-close');
    
    // Popup content data
    const popupData = {
        'wealth-vs-money': {
            title: '💰 財富 vs 金錢',
            overview: '納瓦爾區分了三個常被混淆的概念：財富、金錢和地位，這是理解現代經濟的基礎。',
            analysis: `<p><strong>財富（Wealth）</strong>：能在你睡覺時為你賺錢的資產。它代表著所有權，例如你所擁有的企業、房產、股票或軟體。財富創造是一種「正和遊戲」，因為一個人的財富增長，並不會減少他人的機會。</p>
                      <p><strong>金錢（Money）</strong>：我們用來交換時間與財富的工具，是一種社會信用。金錢本身不具備永久價值，其意義在於能夠兌換他人的時間或服務。</p>
                      <p><strong>地位（Status）</strong>：在社會階層中的排名。這是一種「零和遊戲」，因為頂端的位子是有限的，一個人的地位提升往往以犧牲他人的地位為代價。</p>`,
            application: `<ul>
                         <li>投資股票、房地產或創建企業來累積資產</li>
                         <li>避免將高收入誤認為財富</li>
                         <li>專注創造價值而非追求社會認可</li>
                         <li>建立能產生被動收入的系統</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>財富帶來真正的自由和選擇權</li>
                       <li>金錢是手段，不是目標</li>
                       <li>地位競爭是無底洞，要懂得退出</li>
                       <li>複利效應是財富增長的關鍵</li>
                       </ul>`
        },
        'productize-yourself': {
            title: '🎯 把自己產品化',
            overview: '這是納瓦爾最核心的概念：結合獨特知識、槓桿效應和責任感，創造一個持續運轉的價值系統。',
            analysis: `<p>「把自己產品化」意味著將你的知識、技能和經驗轉化為可擴展的產品或服務。這需要三個關鍵要素的結合：</p>
                      <p><strong>獨特知識</strong>：無法透過標準教育習得的技能，通常來自你的好奇心和熱情。</p>
                      <p><strong>槓桿效應</strong>：使用工具、技術或系統來放大你的影響力。</p>
                      <p><strong>責任感</strong>：願意承擔風險和後果，用真名做事，建立長期聲譽。</p>`,
            application: `<ul>
                         <li>識別你獨有的技能組合</li>
                         <li>創建可擴展的數位產品（課程、軟體、內容）</li>
                         <li>建立個人品牌和專業聲譽</li>
                         <li>使用網路和技術放大影響力</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>專注於你天生擅長的領域</li>
                       <li>追隨真正的好奇心，不是熱門趨勢</li>
                       <li>建立系統性的價值創造機制</li>
                       <li>讓機會主動找上門來</li>
                       </ul>`
        },
        'four-types-luck': {
            title: '⚡ 四種運氣',
            overview: '納瓦爾將運氣分為四個層次，從隨機到可控，第四種運氣是成功的最高境界。',
            analysis: `<p><strong>第一種：盲目運氣</strong> - 完全隨機，如中彩票或意外發現。</p>
                      <p><strong>第二種：努力帶來的運氣</strong> - 透過大量行動和嘗試創造機會。</p>
                      <p><strong>第三種：準備帶來的運氣</strong> - 專業能力讓你看見他人忽略的機會。</p>
                      <p><strong>第四種：獨特性格帶來的運氣</strong> - 成為某領域的唯一選擇，讓好運主動找上門。這是最強大的運氣，因為它讓你成為不可替代的存在。</p>`,
            application: `<ul>
                         <li>成為你所在領域的專家和權威</li>
                         <li>培養獨特的技能組合</li>
                         <li>建立強大的個人品牌</li>
                         <li>讓自己成為特定問題的最佳解決方案</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>第四種運氣是可以系統性創造的</li>
                       <li>專業聲譽是吸引機會的磁石</li>
                       <li>獨特性比普遍性更有價值</li>
                       <li>長期思維是培養運氣的基礎</li>
                       </ul>`
        },
        'leverage-effect': {
            title: '🚀 槓桿效應',
            overview: '槓桿是放大個人努力的工具，現代最強大的槓桿是程式碼和媒體，它們無需許可且可無限複製。',
            analysis: `<p>納瓦爾識別了四種槓桿類型：</p>
                      <p><strong>勞力槓桿</strong>：讓他人為你工作，但管理成本高且易引發衝突。</p>
                      <p><strong>資本槓桿</strong>：用金錢投資放大決策影響力，需要建立信用和聲譽。</p>
                      <p><strong>程式碼槓桿</strong>：軟體可以無限複製，在你睡覺時持續工作。</p>
                      <p><strong>媒體槓桿</strong>：內容創作（書籍、播客、影片）可以影響數百萬人。</p>
                      <p>程式碼和媒體是「無需許可」的槓桿，任何人都可以開始使用。</p>`,
            application: `<ul>
                         <li>學習程式設計或內容創作</li>
                         <li>建立可自動化的業務流程</li>
                         <li>創造一次製作、多次銷售的產品</li>
                         <li>使用網路平台擴大影響力</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>邊際成本接近零的產品最有潛力</li>
                       <li>技術讓個人也能擁有企業級影響力</li>
                       <li>選擇無需許可的槓桿降低門檻</li>
                       <li>槓桿放大判斷力的重要性</li>
                       </ul>`
        },
        'reduce-desires': {
            title: '🧘‍♂️ 減少慾望',
            overview: '納瓦爾認為每個慾望都是你與自己訂下的痛苦契約，減少慾望是獲得內在平靜的關鍵。',
            analysis: `<p>納瓦爾將慾望視為快樂的對立面。他的核心觀點是：<strong>「慾望是你與自己訂下的一份痛苦契約，承諾在得到某物前不會快樂」</strong>。</p>
                      <p>這個概念深受佛教哲學影響。慾望創造了一種持續的不滿足感，因為：</p>
                      <ul><li>慾望是無止境的 - 滿足一個慾望只會產生新的慾望</li>
                      <li>追求過程中的痛苦往往超過獲得時的快樂</li>
                      <li>外在獲得無法填補內在的空虛感</li></ul>
                      <p>納瓦爾提出的解決方案是「減法式幸福」：透過減少慾望而非增加獲得來達到滿足。</p>`,
            application: `<ul>
                         <li>練習感恩現有的一切，減少「想要更多」的衝動</li>
                         <li>避免社交媒體比較，專注自己的進步</li>
                         <li>延遲滿足，在購買前等待48小時思考是否真正需要</li>
                         <li>定期斷食或簡約生活實驗，體驗「少即是多」</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>慾望本身就包含著痛苦的種子</li>
                       <li>快樂來自減少慾望，而非滿足慾望</li>
                       <li>接受現狀是內在平靜的基礎</li>
                       <li>真正的富足是想要你所擁有的</li>
                       </ul>`
        },
        'live-present': {
            title: '⏰ 活在當下',
            overview: '透過冥想、運動、閱讀等方式，讓自己回到當下，感受當前的幸福，培養專注力。',
            analysis: `<p>納瓦爾強調「活在當下」的重要性，認為大部分痛苦來自於活在過去（後悔）或未來（焦慮）中。</p>
                      <p><strong>冥想實踐</strong>：納瓦爾推薦「無為冥想」，就是坐下來什麼都不做，觀察自己的思維。他的目標是達到心理「收件匣零」狀態。</p>
                      <p><strong>24/7冥想</strong>：不只是正式的冥想時間，而是隨時觀察自己的思維和情緒狀態。</p>
                      <p>當下是唯一真實存在的時刻，過去已經過去，未來尚未到來。專注當下能讓我們：</p>
                      <ul><li>減少焦慮和擔憂</li>
                      <li>提高工作和生活效率</li>
                      <li>增強感恩和滿足感</li>
                      <li>建立更深層的人際連結</li></ul>`,
            application: `<ul>
                         <li>每天5-10分鐘的正念冥想練習</li>
                         <li>用餐時專注品嚐食物，不看手機或電視</li>
                         <li>走路時感受腳步和呼吸，練習行走冥想</li>
                         <li>設定手機提醒，每2小時檢查一次當下狀態</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>當下是擺脫痛苦的避風港</li>
                       <li>冥想是訓練專注力的工具</li>
                       <li>觀察思維而不被思維綁架</li>
                       <li>現在就是生命的全部</li>
                       </ul>`
        },
        'choose-happiness': {
            title: '🌟 選擇快樂',
            overview: '快樂、愛、熱情都不是從外在「找到」的東西，而是內心做出的「選擇」。',
            analysis: `<p>納瓦爾最具革命性的觀點之一是：<strong>快樂是一種可以學習的技能</strong>，而不是外在環境的產物。</p>
                      <p><strong>快樂公式</strong>：快樂 = 現實 - 預期</p>
                      <p>這意味著有兩種方式增加快樂：</p>
                      <ul><li>改善現實狀況</li>
                      <li>降低不切實際的預期</li></ul>
                      <p>但納瓦爾更偏向第二種方法，因為外在現實往往不在我們完全控制之下，而預期和心態是我們可以掌控的。</p>
                      <p>快樂是大腦的預設狀態，但現代社會和進化機制讓我們傾向於焦慮和不滿足。透過有意識的練習，我們可以重新訓練大腦回到自然的快樂狀態。</p>`,
            application: `<ul>
                         <li>每天記錄三件感恩的事情</li>
                         <li>練習正向解釋：將困難視為成長機會</li>
                         <li>避免使用「應該」一詞，接受事實本身</li>
                         <li>與積極正面的人為伍，遠離消極情緒</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>快樂是技能，可以透過練習提升</li>
                       <li>心態比環境更重要</li>
                       <li>選擇如何詮釋發生的事情</li>
                       <li>快樂是內在的決定，不是外在的發現</li>
                       </ul>`
        },
        'authentic-self': {
            title: '🎭 真誠自我',
            overview: '活出最真實的自己，退出永無止境的競爭，因為在「做自己」這條路上，沒有人能與你競爭。',
            analysis: `<p>納瓦爾提出「在做自己這件事上，沒有人能與你競爭」這個深刻觀點。</p>
                      <p><strong>真誠的力量</strong>：當你停止試圖成為別人眼中的成功人士，開始成為自己的最佳版本時，你就自動進入了一個無競爭的領域。</p>
                      <p><strong>退出社會比較遊戲</strong>：</p>
                      <ul><li>停止在社交媒體上比較生活</li>
                      <li>不再追求他人的認可和讚美</li>
                      <li>專注內在價值而非外在表現</li>
                      <li>接受自己的獨特性和不完美</li></ul>
                      <p>真誠自我不是自私，而是一種對自己負責的態度。就像飛機安全指示：先給自己戴上氧氣面罩，才能幫助他人。</p>`,
            application: `<ul>
                         <li>定期自我反省：問自己「這是我真正想要的嗎？」</li>
                         <li>勇敢說出自己的真實想法和感受</li>
                         <li>設定個人界限，學會說「不」</li>
                         <li>追隨內心的好奇心，而非社會期待</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>真實性是最稀缺的商品</li>
                       <li>做自己比做完美更重要</li>
                       <li>真誠是建立信任的基礎</li>
                       <li>自我接納帶來內在自由</li>
                       </ul>`
        },
        'judgment-over-effort': {
            title: '🧠 判斷力 > 努力',
            overview: '在槓桿時代，一個正確的判斷所帶來的影響力，遠遠超過單純的時間與勞力投入。',
            analysis: `<p>納瓦爾最具爭議性的觀點之一是：<strong>判斷力比努力更重要</strong>。在傳統工業時代，最頂尖的工人可能比普通人強三倍；但在槓桿時代，這種差異可能達到上千倍。</p>
                      <p><strong>為什麼判斷力被放大？</strong></p>
                      <ul><li>槓桿工具讓每個決定的影響力被無限放大</li>
                      <li>資訊唾手可得，稀缺的是做出正確決策的能力</li>
                      <li>在關鍵時刻做出正確選擇的能力，才是真正的稀缺資源</li></ul>
                      <p>例如：兩個基金經理管理同等規模的資金，判斷力相差10%可能意味著數億美元的收益差距。</p>
                      <p>判斷力包含兩個層面：知道如何實現目標，以及選擇正確的目標追求。</p>`,
            application: `<ul>
                         <li>專注學習基礎學科建立思維框架</li>
                         <li>多讀跨領域書籍培養跨界思考</li>
                         <li>向有判斷力的人學習，觀察他們的決策過程</li>
                         <li>記錄重要決策及其結果，建立個人決策資料庫</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>槓桿時代放大了判斷力的價值</li>
                       <li>一個好決策勝過一年苦工</li>
                       <li>投資時間學習思考，而非只是執行</li>
                       <li>培養長期思維和系統性思考</li>
                       </ul>`
        },
        'learning-fundamentals': {
            title: '📚 學習基礎知識',
            overview: '建立強大的知識基礎，包括微觀經濟學、賽局理論、心理學、倫理學、數學和計算機等學科。',
            analysis: `<p>納瓦爾強調學習<strong>基礎學科</strong>的重要性，這些學科提供了理解世界的基本框架：</p>
                      <p><strong>核心學科清單：</strong></p>
                      <ul><li><strong>微觀經濟學</strong>：理解供需、激勵機制、市場行為</li>
                      <li><strong>賽局理論</strong>：理解策略互動、協作與競爭</li>
                      <li><strong>心理學</strong>：理解人類行為、認知偏誤、決策模式</li>
                      <li><strong>倫理學</strong>：建立道德框架和價值判斷標準</li>
                      <li><strong>數學</strong>：邏輯思維、機率統計、複合成長</li>
                      <li><strong>計算機科學</strong>：系統思維、演算法、自動化</li></ul>
                      <p>這些基礎知識就像「思維工具箱」，在面對複雜問題時能提供多元視角和解決方案。</p>`,
            application: `<ul>
                         <li>每週至少讀一本基礎學科的經典書籍</li>
                         <li>學習線上課程（如Khan Academy, Coursera）</li>
                         <li>將學到的概念應用到日常決策中</li>
                         <li>與不同領域的專家交流，拓展知識邊界</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>基礎學科是思維的操作系統</li>
                       <li>跨領域知識創造獨特洞察</li>
                       <li>投資學習基礎，受益終身</li>
                       <li>知識複利效應隨時間顯現</li>
                       </ul>`
        },
        'extensive-reading': {
            title: '📖 大量閱讀',
            overview: '閱讀是人生的終極元技能，可以被用來換取任何其他技能。「讀你喜愛的書，直到你愛上閱讀」。',
            analysis: `<p>納瓦爾將閱讀視為<strong>「終極元技能」</strong>，認為它可以被用來換取任何其他技能。</p>
                      <p><strong>閱讀哲學：</strong></p>
                      <ul><li>讀你喜愛的書，直到你愛上閱讀</li>
                      <li>重讀經典比讀新書更有價值</li>
                      <li>同時閱讀多本書，根據心情選擇</li>
                      <li>不用強迫自己讀完每一本書</li></ul>
                      <p><strong>納瓦爾的閱讀建議：</strong></p>
                      <p>「每天閱讀一小時的科學、數學、哲學，七年內就能躋身少數成功人士之列。」</p>
                      <p>重點在於建立閱讀習慣，而非追求閱讀量。質量比數量更重要。</p>`,
            application: `<ul>
                         <li>每天固定30-60分鐘閱讀時間</li>
                         <li>選擇經典著作而非暢銷新書</li>
                         <li>做讀書筆記，記錄重要洞察</li>
                         <li>與他人討論書中觀點，深化理解</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>閱讀是獲取智慧的最快途徑</li>
                       <li>經典書籍經過時間考驗</li>
                       <li>享受閱讀過程比完成更重要</li>
                       <li>知識的複利需要時間累積</li>
                       </ul>`
        },
        'question-beliefs': {
            title: '🔍 質疑信念',
            overview: '對自己的信念存疑，從根本重新評估，挑戰固有觀念。避免被自負所困，保持開放心態看清事實。',
            analysis: `<p>納瓦爾推崇<strong>「第一性原理思考」</strong>：將複雜問題拆解至最基本、無法再簡化的真相，然後從這些基礎上重新建構。</p>
                      <p><strong>為什麼要質疑信念？</strong></p>
                      <ul><li>大部分信念來自社會灌輸，未經個人驗證</li>
                      <li>固化的信念阻礙新想法和成長</li>
                      <li>世界變化快速，舊觀念可能已不適用</li>
                      <li>自負會讓我們忽視事實和證據</li></ul>
                      <p><strong>質疑的方法：</strong></p>
                      <ul><li>問「為什麼」到第五層，挖掘根本原因</li>
                      <li>尋找反對意見和不同視角</li>
                      <li>用實驗心態測試假設</li>
                      <li>承認「我不知道」的智慧</li></ul>`,
            application: `<ul>
                         <li>定期檢視自己的核心信念和假設</li>
                         <li>主動尋找挑戰自己觀點的資訊</li>
                         <li>與持不同意見的人深度對話</li>
                         <li>記錄並反思自己的錯誤判斷</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>保持初學者心態</li>
                       <li>事實比觀點更重要</li>
                       <li>改變想法是智慧的象徵</li>
                       <li>獨立思考比跟隨潮流更有價值</li>
                       </ul>`
        },
        'long-term-games': {
            title: '🎯 長期賽局',
            overview: '生命中所有的重大回報都來自於複利。與願意玩長期賽局的人合作，因為信任和複利效應會隨時間累積。',
            analysis: `<p>納瓦爾強調：<strong>「生命中所有的重大回報都來自於複利效應」</strong>。這不僅適用於金錢，更適用於人際關係、知識、技能和聲譽。</p>
                      <p><strong>長期賽局的特徵：</strong></p>
                      <ul><li>重複性互動：與同一群人長期合作</li>
                      <li>信任累積：每次成功的互動都增加信任值</li>
                      <li>聲譽建立：長期行為模式形成個人品牌</li>
                      <li>複利效應：時間讓小的優勢變成巨大差異</li></ul>
                      <p><strong>為什麼長期思維稀缺？</strong></p>
                      <p>大多數人被短期利益誘惑，願意犧牲長期價值。這創造了機會給那些能夠延遲滿足、專注長期價值創造的人。</p>
                      <p>納瓦爾的原則：「如果你不能想像與某人合作一輩子，那就連一天都不要合作。」</p>`,
            application: `<ul>
                         <li>選擇合作夥伴時優先考慮品格和長期潛力</li>
                         <li>投資時間建立深度關係而非廣度人脈</li>
                         <li>在每個項目中都追求卓越，建立長期聲譽</li>
                         <li>避免短期利益的誘惑，專注長期價值創造</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>複利是宇宙中最強大的力量</li>
                       <li>信任是一切複利的基礎</li>
                       <li>長期思維創造競爭優勢</li>
                       <li>時間是最好的過濾器</li>
                       </ul>`
        },
        'positive-sum-games': {
            title: '⚖️ 正和遊戲',
            overview: '有意識地選擇正和遊戲，讓所有參與者共同創造價值並從中獲益，遠離零和遊戲的惡性競爭。',
            analysis: `<p>納瓦爾區分了兩種根本不同的遊戲類型，這決定了你的人生軌跡：</p>
                      <p><strong>零和遊戲</strong>：總價值固定，一個人的獲得等於另一個人的損失。例如：</p>
                      <ul><li>地位競爭：升職、社會排名</li>
                      <li>資源爭奪：有限的位置或機會</li>
                      <li>政治權力：權力的再分配</li></ul>
                      <p><strong>正和遊戲</strong>：創造新價值，所有參與者都能獲益。例如：</p>
                      <ul><li>創業：創造新產品和服務</li>
                      <li>教育：知識分享讓所有人受益</li>
                      <li>科技創新：提升整體生產力</li></ul>
                      <p>納瓦爾的建議：<strong>「追求財富是正和遊戲，追求地位是零和遊戲。選擇正和遊戲，讓所有人共同獲益。」</strong></p>`,
            application: `<ul>
                         <li>專注創造價值而非重新分配既有價值</li>
                         <li>尋找能讓所有參與者受益的商業模式</li>
                         <li>避免純粹的競爭行業，選擇創新領域</li>
                         <li>合作而非競爭，共同擴大市場蛋糕</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>財富創造 vs 財富轉移</li>
                       <li>創新比競爭更有價值</li>
                       <li>協作創造更大的可能性</li>
                       <li>正和思維吸引更好的合作夥伴</li>
                       </ul>`
        },
        'continuous-improvement': {
            title: '🌱 持續精進',
            overview: '個性、職涯和團隊都需要持續改版，成為更好的自己需要不斷編輯信念、升級自我身份認知。',
            analysis: `<p>納瓦爾認為成功者與不成功者的最大區別在於前者願意<strong>一次又一次重新開始</strong>。</p>
                      <p><strong>持續精進的三個層面：</strong></p>
                      <p><strong>1. 信念升級</strong>：定期檢視和更新你的核心信念。世界在變化，你的思維框架也需要與時俱進。</p>
                      <p><strong>2. 身份演化</strong>：不要被過去的成就綁架。偉大的創造者總有重新開始的能力。</p>
                      <p><strong>3. 技能迭代</strong>：持續學習新技能，適應變化的環境。</p>
                      <p>納瓦爾舉例Elon Musk：從PayPal賺到2億美元後，將大部分資金投入新創業，一度需要借錢付房租。這就是重新開始的勇氣。</p>
                      <p><strong>關鍵障礙：</strong>恐懼失敗和過度身份認同。</p>`,
            application: `<ul>
                         <li>每年設定新的學習目標和挑戰</li>
                         <li>主動尋求反饋，識別盲點和改進空間</li>
                         <li>不要讓過去的成功阻礙未來的成長</li>
                         <li>保持初學者心態，勇於承認不足</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>重新開始比固守成就更有價值</li>
                       <li>身份要隨著能力和環境進化</li>
                       <li>失敗的代價比停滯更小</li>
                       <li>成長需要走出舒適圈</li>
                       </ul>`
        },
        'career-choice': {
            title: '💼 要做什麼',
            overview: '選擇有長期發展前景的職業，在自己選擇的領域裡做到全球頂尖。',
            analysis: `<p>納瓦爾認為職業選擇是年輕人最重要的決定之一，因為你可能要做幾十年。</p>
                      <p><strong>選擇標準：</strong></p>
                      <ul><li><strong>長期前景</strong>：選擇成長行業而非衰退行業</li>
                      <li><strong>個人優勢</strong>：結合你的天賦和興趣</li>
                      <li><strong>槓桿潛力</strong>：能否透過技術或媒體放大影響力</li>
                      <li><strong>全球化機會</strong>：不受地理限制的工作更有潛力</li></ul>
                      <p><strong>做到頂尖的意義：</strong></p>
                      <p>在任何領域做到前1%，都比在多個領域做到前10%更有價值。專業深度創造稀缺性和不可替代性。</p>`,
            application: `<ul>
                         <li>評估自己的天賦和真正的興趣所在</li>
                         <li>研究行業趨勢，選擇成長領域</li>
                         <li>專注深度而非廣度，成為專家</li>
                         <li>持續學習，保持行業領先地位</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>深度專業比廣度技能更有價值</li>
                       <li>選擇比努力更重要</li>
                       <li>技能要有全球競爭力</li>
                       <li>職業要與個人價值觀一致</li>
                       </ul>`
        },
        'location-choice': {
            title: '🏡 住在哪裡',
            overview: '一個城市可能要居住數十年，地點決定了你的生活品質和機會。',
            analysis: `<p>地理位置的選擇比大多數人想像的更重要，因為它影響：</p>
                      <ul><li><strong>機會密度</strong>：不同城市提供的機會數量和質量差異巨大</li>
                      <li><strong>人脈網絡</strong>：你周圍的人決定了你的可能性</li>
                      <li><strong>生活成本</strong>：影響財富累積的速度</li>
                      <li><strong>文化環境</strong>：塑造你的思維模式和價值觀</li></ul>
                      <p><strong>選擇原則：</strong></p>
                      <p>找到你所在行業的聚集地。科技在矽谷、金融在紐約、媒體在洛杉磯。雖然網路讓遠程工作成為可能，但物理接近仍然創造獨特價值。</p>`,
            application: `<ul>
                         <li>研究你的行業在哪些城市最活躍</li>
                         <li>考慮生活成本與收入機會的平衡</li>
                         <li>評估當地的教育和文化資源</li>
                         <li>不要害怕為了機會而搬遷</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>地理位置影響人生軌跡</li>
                       <li>聚集效應創造更多機會</li>
                       <li>環境塑造個人發展</li>
                       <li>投資居住地就是投資未來</li>
                       </ul>`
        },
        'partner-choice': {
            title: '🤝 和誰合作',
            overview: '選擇聰明、有活力且正直誠信的商業夥伴，避免與消極悲觀的人合作。',
            analysis: `<p>納瓦爾認為<strong>「與誰合作」</strong>是最重要的人生決定，因為你的合作夥伴決定了你能達到的高度。</p>
                      <p><strong>理想合作夥伴的特質：</strong></p>
                      <ul><li><strong>聰明</strong>：能夠快速學習和適應</li>
                      <li><strong>有活力</strong>：充滿熱情和執行力</li>
                      <li><strong>正直誠信</strong>：可以信任的長期夥伴</li></ul>
                      <p><strong>要避免的人：</strong></p>
                      <ul><li>憤世嫉俗和消極悲觀的人</li>
                      <li>只關心短期利益的人</li>
                      <li>不願承擔責任的人</li>
                      <li>經常抱怨而不採取行動的人</li></ul>
                      <p>納瓦爾的建議：<strong>「與樂觀的人合作。悲觀主義者通常是對的，但樂觀主義者改變世界。」</strong></p>`,
            application: `<ul>
                         <li>花時間深入了解潛在合作夥伴的品格</li>
                         <li>觀察他們在困難時期的行為表現</li>
                         <li>選擇能力互補而價值觀一致的夥伴</li>
                         <li>建立清晰的合作框架和期望</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>品格比能力更重要</li>
                       <li>樂觀主義者創造更多可能性</li>
                       <li>價值觀一致是合作基礎</li>
                       <li>好的夥伴讓你成為更好的自己</li>
                       </ul>`
        },
        'what-is-specific-knowledge': {
            title: '🎯 什麼是「獨特知識」？',
            overview: '獨特知識是無法透過標準教育習得的個人技能與天賦組合，是創造財富的起點。',
            analysis: `<p><strong>獨特知識的定義：</strong></p>
                      <p>獨特知識是不能透過標準教育獲得的能力。如果能輕易透過課程學會，他人也能學會，你就容易被取代。</p>
                      <p><strong>獨特知識的三個特徵：</strong></p>
                      <ul><li><strong>對你而言是玩樂，對他人看來是工作</strong>：這是天賦與興趣的結合</li>
                      <li><strong>需要高度創意和技術性</strong>：無法被標準化或外包</li>
                      <li><strong>在知識前沿不斷探索獲得</strong>：需要持續學習和實踐</li></ul>
                      <p><strong>如何尋找？</strong></p>
                      <p>追隨真實的好奇心和熱情，而不是選擇當下最熱門的工作。在人工智慧時代，真正稀缺的不是資訊，而是學習的慾望和深入探索的能力。</p>`,
            application: `<ul>
                         <li>回想童年時期自然被吸引的活動和興趣</li>
                         <li>觀察什麼事情對你來說很容易，但別人覺得困難</li>
                         <li>在交叉領域尋找機會，結合不同的技能</li>
                         <li>持續實驗和學習，不怕失敗</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>獨特性比普遍性更有價值</li>
                       <li>好奇心是最好的指南針</li>
                       <li>技能組合創造競爭壁壘</li>
                       <li>熱情是持續學習的動力</li>
                       </ul>`
        },
        'wealth-money-status-definition': {
            title: '💰 財富、金錢、地位的區別',
            overview: '納瓦爾嚴格區分這三個概念，理解差異是財富創造的基礎。',
            analysis: `<p>這是納瓦爾思想體系的基石，幫助人們重新理解什麼是真正值得追求的：</p>
                      <p><strong>財富（Wealth）</strong>：</p>
                      <ul><li>定義：在你睡覺時仍能為你賺錢的資產</li>
                      <li>例子：企業、房產、股票、軟體、智慧財產權</li>
                      <li>性質：正和遊戲，創造新價值</li></ul>
                      <p><strong>金錢（Money）</strong>：</p>
                      <ul><li>定義：社會信用，用來轉移時間和財富的工具</li>
                      <li>特點：時間換取，線性關係</li>
                      <li>限制：停止工作就停止收入</li></ul>
                      <p><strong>地位（Status）</strong>：</p>
                      <ul><li>定義：在社會階層中的排名</li>
                      <li>性質：零和遊戲，有人上升就有人下降</li>
                      <li>問題：追求地位消耗能量但不創造價值</li></ul>`,
            application: `<ul>
                         <li>投資資產而非消費品</li>
                         <li>建立被動收入來源</li>
                         <li>避免純粹的地位競爭</li>
                         <li>專注創造價值而非炫耀財富</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>財富帶來真正的自由</li>
                       <li>金錢是手段，不是目標</li>
                       <li>地位遊戲浪費時間和精力</li>
                       <li>專注正和遊戲創造共贏</li>
                       </ul>`
        },
        'how-to-get-rich-without-luck': {
            title: '⚡ 如何不靠運氣致富',
            overview: '透過系統性的方法創造財富，將隨機運氣轉變為可控的成功。',
            analysis: `<p>納瓦爾的「不靠運氣致富」並非否定運氣的存在，而是將運氣系統化：</p>
                      <p><strong>四種運氣層次：</strong></p>
                      <ol><li><strong>盲目運氣</strong>：完全隨機，無法控制</li>
                      <li><strong>努力運氣</strong>：透過大量行動增加機會</li>
                      <li><strong>準備運氣</strong>：專業能力讓你識別機會</li>
                      <li><strong>獨特運氣</strong>：成為特定領域的唯一選擇</li></ol>
                      <p><strong>致富公式：</strong></p>
                      <p>財富 = 獨特知識 × 槓桿 × 責任感</p>
                      <p>這個公式的每個要素都可以透過學習和實踐來獲得，使致富變成一個可複製的過程。</p>`,
            application: `<ul>
                         <li>識別並發展你的獨特知識</li>
                         <li>學習使用現代槓桿（程式碼、媒體）</li>
                         <li>承擔責任，建立個人品牌</li>
                         <li>專注長期價值創造</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>成功有跡可循，不純粹靠運氣</li>
                       <li>第四種運氣可以系統性創造</li>
                       <li>專業深度吸引機會</li>
                       <li>長期思維是成功基礎</li>
                       </ul>`
        },
        'desire-as-pain-source': {
            title: '🧘‍♂️ 慾望為什麼是痛苦的根源',
            overview: '每個慾望都是與自己訂下的痛苦契約，理解這點是獲得內在平靜的關鍵。',
            analysis: `<p>納瓦爾這個觀點深受佛教哲學影響，但用現代語言重新詮釋：</p>
                      <p><strong>慾望 = 痛苦契約</strong></p>
                      <p>每當你產生一個慾望，你實際上是在告訴自己：「在得到這個東西之前，我不會快樂。」這創造了一種持續的不滿足狀態。</p>
                      <p><strong>慾望的問題：</strong></p>
                      <ul><li>慾望是無止境的螺旋</li>
                      <li>滿足一個慾望只會產生新的慾望</li>
                      <li>追求過程的痛苦往往超過獲得的快樂</li>
                      <li>外在獲得無法填補內在空虛</li></ul>
                      <p><strong>解決方案：減法式幸福</strong></p>
                      <p>透過減少慾望而非增加獲得來達到滿足。這不是消極逃避，而是積極選擇內在平靜。</p>`,
            application: `<ul>
                         <li>練習延遲滿足，觀察慾望的來去</li>
                         <li>區分「需要」和「想要」</li>
                         <li>培養感恩心態，珍惜已有的</li>
                         <li>避免社交媒體的比較陷阱</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>快樂來自減少慾望，不是滿足慾望</li>
                       <li>內在平靜比外在獲得更重要</li>
                       <li>接受現狀是智慧的開始</li>
                       <li>真正的富足是想要你所擁有的</li>
                       </ul>`
        },
        'leverage-for-ordinary-people': {
            title: '🚀 普通人如何運用槓桿',
            overview: '槓桿是放大個人努力的工具，普通人最可行的是無需許可的程式碼與媒體槓桿。',
            analysis: `<p>納瓦爾將槓桿分為四種類型，其中後兩種是普通人最容易獲得的：</p>
                      <p><strong>傳統槓桿（需要許可）：</strong></p>
                      <ul><li><strong>人力槓桿</strong>：管理團隊，但管理成本高</li>
                      <li><strong>資本槓桿</strong>：使用他人的錢，需要信用和聲譽</li></ul>
                      <p><strong>現代槓桿（無需許可）：</strong></p>
                      <ul><li><strong>程式碼槓桿</strong>：軟體、應用、自動化系統</li>
                      <li><strong>媒體槓桿</strong>：內容、書籍、播客、影片</li></ul>
                      <p><strong>無需許可槓桿的優勢：</strong></p>
                      <ul><li>零邊際成本複製</li>
                      <li>無需事先獲得許可</li>
                      <li>可以規模化</li>
                      <li>24/7為你工作</li></ul>
                      <p>在數位時代，一個人寫的程式或創造的內容可以影響數百萬人，這是史上最強大的財富創造機會。</p>`,
            application: `<ul>
                         <li>學習基礎程式設計或內容創作技能</li>
                         <li>選擇平台開始創造（YouTube、部落格、應用商店）</li>
                         <li>專注可規模化的產品或服務</li>
                         <li>建立個人品牌，讓作品持續為你工作</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>無需許可的槓桿最具潛力</li>
                       <li>軟體和媒體可以無限複製</li>
                       <li>從小規模開始，逐步擴大</li>
                       <li>一次創造，終身受益</li>
                       </ul>`
        },
        'happiness-as-skill': {
            title: '😊 幸福作為可學習的技能',
            overview: '幸福不是外在事物賦予的，而是內在狀態，可以透過習慣與心態調整來培養。',
            analysis: `<p>納瓦爾顛覆了傳統的幸福觀念，提出<strong>「幸福是技能」</strong>的革命性觀點：</p>
                      <p><strong>幸福 = 現實 - 期望</strong></p>
                      <p>這個公式揭示了幸福的本質：你可以透過改變現實或調整期望來增加幸福感。</p>
                      <p><strong>幸福技能的培養：</strong></p>
                      <ul><li><strong>冥想</strong>：訓練注意力，觀察念頭而不被困</li>
                      <li><strong>感恩練習</strong>：每天記錄值得感恩的事物</li>
                      <li><strong>減少慾望</strong>：區分需要和想要</li>
                      <li><strong>活在當下</strong>：專注現在而非過去或未來</li></ul>
                      <p>就像身體健康需要運動，心理健康也需要訓練。納瓦爾將其比作「心理健身」。</p>
                      <p>核心觀念：<strong>「快樂、愛、熱情都不是外在找到的，而是內心選擇的。」</strong></p>`,
            application: `<ul>
                         <li>建立每日冥想習慣，從5分鐘開始</li>
                         <li>睡前寫下三件值得感恩的事</li>
                         <li>練習深呼吸，在壓力時回到當下</li>
                         <li>定期數位排毒，減少外在干擾</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>幸福 = 現實 - 期望</li>
                       <li>內在狀態比外在條件更重要</li>
                       <li>心理訓練如同身體訓練</li>
                       <li>選擇快樂是一種能力</li>
                       </ul>`
        },
        'exit-competition': {
            title: '🎯 退出競爭的智慧',
            overview: '停止模仿他人，追隨自己的好奇心與熱情，培養獨特知識，進入無人競爭的領域。',
            analysis: `<p>「退出競爭」是納瓦爾最具顛覆性的觀念之一：</p>
                      <p><strong>競爭的問題：</strong></p>
                      <ul><li>模仿導致同質化競爭</li>
                      <li>零和遊戲消耗所有人的精力</li>
                      <li>追逐他人定義的成功會迷失自我</li>
                      <li>競爭降低利潤，創新創造價值</li></ul>
                      <p><strong>如何退出競爭：</strong></p>
                      <ul><li><strong>培養獨特知識</strong>：找到只有你能做好的事</li>
                      <li><strong>追隨真實興趣</strong>：做你熱愛的事</li>
                      <li><strong>組合式創新</strong>：結合多個領域</li>
                      <li><strong>建立個人品牌</strong>：成為某領域的首選</li></ul>
                      <p>納瓦爾的金句：<strong>「在做自己這件事上，沒有人能與你競爭。」</strong></p>
                      <p>實例：與其和千萬人競爭當律師，不如成為「懂法律的程式設計師」或「懂科技的律師」。</p>`,
            application: `<ul>
                         <li>找出你的天然興趣和天賦組合</li>
                         <li>避開過度競爭的紅海市場</li>
                         <li>建立跨領域的知識和技能</li>
                         <li>專注創造獨特價值而非追趕對手</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>獨特性比優秀更有價值</li>
                       <li>創造勝過競爭</li>
                       <li>做自己是最好的策略</li>
                       <li>避開紅海，尋找藍海</li>
                       </ul>`
        },
        'integrate-daily-life': {
            title: '🌱 融入日常生活的實踐',
            overview: '從小處著手，透過系統性方法將納瓦爾的理念內化為思維習慣和生活方式。',
            analysis: `<p>將抽象理念轉化為具體實踐需要<strong>系統性的方法</strong>：</p>
                      <p><strong>納瓦爾的優先順序架構：</strong></p>
                      <ol><li><strong>健康第一</strong>：身體是一切的基礎</li>
                      <li><strong>幸福第二</strong>：內在平靜比外在成就重要</li>
                      <li><strong>財富第三</strong>：在前兩者基礎上追求財富</li></ol>
                      <p><strong>實踐策略：</strong></p>
                      <ul><li><strong>小賭注實驗</strong>：從小規模開始測試新想法</li>
                      <li><strong>系統思維</strong>：建立可持續的習慣</li>
                      <li><strong>長期視角</strong>：專注複利而非即時回報</li>
                      <li><strong>反思迭代</strong>：定期檢視和調整</li></ul>
                      <p><strong>心智模型內化：</strong></p>
                      <p>將概念轉化為決策框架。面對選擇時問：「這是正和還是零和遊戲？」「這能創造長期價值嗎？」「這符合我的獨特知識嗎？」</p>`,
            application: `<ul>
                         <li>建立晨間例行公事：冥想、運動、閱讀</li>
                         <li>每週花時間學習一項新技能</li>
                         <li>記錄重要決策的思考過程和結果</li>
                         <li>定期進行「生活審計」，檢視目標和方向</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>從基礎開始：健康→幸福→財富</li>
                       <li>小步前進比大步跨越更有效</li>
                       <li>建立系統而非依賴意志力</li>
                       <li>反思和迭代是成長的關鍵</li>
                       </ul>`
        },
        'reading-philosophy': {
            title: '📚 閱讀的終極價值',
            overview: '閱讀是人生的終極元技能，可以換取任何其他技能。專注經典著作，培養獨立思考。',
            analysis: `<p>納瓦爾將閱讀視為<strong>「終極元技能」(Ultimate Meta-skill)</strong>：</p>
                      <p><strong>閱讀的獨特價值：</strong></p>
                      <ul><li>可以用來換取任何其他技能</li>
                      <li>接觸人類最優秀的思想</li>
                      <li>提供低成本的高品質教育</li>
                      <li>培養獨立思考和批判性思維</li></ul>
                      <p><strong>納瓦爾的閱讀哲學：</strong></p>
                      <ul><li><strong>「讀你喜愛的書，直到你愛上閱讀」</strong></li>
                      <li>重讀經典比閱讀新書更有價值</li>
                      <li>同時閱讀多本書，根據心情選擇</li>
                      <li>不必強迫自己讀完每一本書</li></ul>
                      <p><strong>推薦閱讀領域：</strong></p>
                      <ul><li><strong>哲學</strong>：培養智慧和價值觀</li>
                      <li><strong>數學</strong>：訓練邏輯思維</li>
                      <li><strong>科學</strong>：理解世界運作原理</li></ul>
                      <p>他的承諾：<strong>「每天閱讀一小時的科學、數學和哲學，七年後你就能躋身人類知識的上層。」</strong></p>`,
            application: `<ul>
                         <li>建立每日閱讀習慣，從30分鐘開始</li>
                         <li>選擇經典著作而非流行書籍</li>
                         <li>保持讀書筆記，記錄重要洞察</li>
                         <li>與他人分享和討論讀書心得</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>閱讀是學習任何技能的基礎</li>
                       <li>經典書籍經過時間考驗</li>
                       <li>享受過程比完成更重要</li>
                       <li>知識的複利需要時間累積</li>
                       </ul>`
        },
        'health-philosophy': {
            title: '💪 健康優先的人生哲學',
            overview: '將健康放在人生優先順序的首位，甚至高於工作與家庭。健康 = 運動 + 飲食 + 睡眠。',
            analysis: `<p>納瓦爾的健康哲學基於一個簡單但深刻的認知：<strong>沒有健康，其他一切都無意義</strong>。</p>
                      <p><strong>健康公式：健康 = 運動 + 飲食 + 睡眠</strong></p>
                      <p><strong>運動哲學：</strong></p>
                      <ul><li>每天早晨運動，優先於所有其他活動</li>
                      <li>重量訓練比有氧運動更重要</li>
                      <li>運動是為了長期健康，不是為了外觀</li>
                      <li>一週最少運動5天，每次45-60分鐘</li></ul>
                      <p><strong>飲食原則：</strong></p>
                      <ul><li>避免糖和加工食品</li>
                      <li>間歇性斷食</li>
                      <li>吃真正的食物，避免包裝食品</li>
                      <li>聽從身體的信號</li></ul>
                      <p><strong>睡眠重要性：</strong></p>
                      <ul><li>睡眠是良好決策的基礎</li>
                      <li>寧可睡飽也不要早起工作</li>
                      <li>睡眠不足影響判斷力和創造力</li></ul>
                      <p>優先順序：<strong>「健康 > 家庭 > 工作」</strong></p>`,
            application: `<ul>
                         <li>建立固定的晨間運動習慣</li>
                         <li>優先安排充足睡眠時間（7-8小時）</li>
                         <li>簡化飲食，專注於天然食物</li>
                         <li>定期體檢，預防勝於治療</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>健康是人生的第一優先級</li>
                       <li>運動、飲食、睡眠三位一體</li>
                       <li>投資健康是最好的投資</li>
                       <li>身體健康是心理健康的基礎</li>
                       </ul>`
        },
        'judgment-over-effort': {
            title: '🎯 判斷力勝過努力',
            overview: '在槓桿時代，一個正確判斷的影響力遠超過單純的時間與勞力投入。',
            analysis: `<p>這是納瓦爾最具爭議但也最重要的觀點：</p>
                      <p><strong>為什麼判斷力更重要？</strong></p>
                      <ul><li><strong>槓桿效應放大</strong>：好決策的影響可以是壞決策的1000倍</li>
                      <li><strong>機會成本</strong>：時間精力有限，選擇比努力更重要</li>
                      <li><strong>非線性回報</strong>：努力帶來線性回報，判斷力帶來指數回報</li>
                      <li><strong>稀缺性</strong>：努力變得商品化，判斷力仍然稀缺</li></ul>
                      <p><strong>判斷力的構成：</strong></p>
                      <ul><li><strong>知道做什麼</strong>：選擇正確的方向和目標</li>
                      <li><strong>知道如何做</strong>：理解因果關係和系統動力學</li>
                      <li><strong>知道何時做</strong>：掌握時機和節奏</li>
                      <li><strong>知道和誰做</strong>：選擇正確的夥伴和團隊</li></ul>
                      <p>實例：兩個基金經理管理同樣資金，判斷力10%的差異可能意味著數億美元的差距。</p>
                      <p><strong>誤區澄清：</strong>不是說努力不重要，而是在有槓桿的情況下，方向比速度更關鍵。</p>`,
            application: `<ul>
                         <li>投資時間學習基礎學科和心智模型</li>
                         <li>多向有好判斷力的人學習和討論</li>
                         <li>記錄重要決策和結果，建立決策資料庫</li>
                         <li>在重要決策前多花時間思考和研究</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>槓桿時代放大了判斷力的價值</li>
                       <li>方向比速度更重要</li>
                       <li>好決策創造非線性回報</li>
                       <li>投資學習思考比投資執行更有價值</li>
                       </ul>`
        },
        'compound-effects': {
            title: '📈 複利效應的多重面向',
            overview: '複利不僅限於金錢，還包括人際關係、知識學習、健康習慣等生活各個層面。',
            analysis: `<p>納瓦爾將複利視為<strong>「宇宙中最強大的力量」</strong>，擴展到生活各層面：</p>
                      <p><strong>1. 財務複利</strong></p>
                      <ul><li>金錢的時間價值</li>
                      <li>投資回報的再投資</li>
                      <li>被動收入的建立</li></ul>
                      <p><strong>2. 關係複利</strong></p>
                      <ul><li><strong>信任累積</strong>：每次守信都增加信任存款</li>
                      <li><strong>聲譽建立</strong>：長期行為形成個人品牌</li>
                      <li><strong>人脈網絡</strong>：關係的關係創造指數型機會</li></ul>
                      <p><strong>3. 知識複利</strong></p>
                      <ul><li><strong>概念連結</strong>：新舊知識組合創造洞察</li>
                      <li><strong>思維模型</strong>：多元框架提升判斷力</li>
                      <li><strong>學習加速</strong>：學會學習讓後續學習更高效</li></ul>
                      <p><strong>4. 健康複利</strong></p>
                      <ul><li><strong>習慣累積</strong>：每日運動的長期效益</li>
                      <li><strong>能量提升</strong>：健康創造更多工作和生活能量</li>
                      <li><strong>壽命延長</strong>：更多時間享受複利的力量</li></ul>
                      <p>關鍵洞察：<strong>複利需要時間</strong>，前期微小，後期驚人。</p>`,
            application: `<ul>
                         <li>在每個重要領域都建立可累積的系統</li>
                         <li>專注長期價值創造而非短期收益</li>
                         <li>與能夠長期合作的人建立關係</li>
                         <li>投資於可以相互加成的技能和知識</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>複利是宇宙最強大的力量</li>
                       <li>時間是複利的最好朋友</li>
                       <li>複利效應存在於生活各個層面</li>
                       <li>耐心和長期思維是關鍵</li>
                       </ul>`
        },
        
        // Glossary definitions
        'productize-yourself-definition': {
            title: '🏗️ 把自己產品化',
            overview: '納瓦爾財富哲學的核心概念：將個人獨特知識、責任感與槓桿效應結合，打造獨一無二且有價值的自己。',
            analysis: `<p>「把自己產品化」是納瓦爾最重要的概念之一，代表了個人價值創造的系統性方法：</p>
                      <p><strong>產品化公式：</strong></p>
                      <p>個人產品 = 獨特知識 × 槓桿 × 責任感</p>
                      <p><strong>三個核心要素：</strong></p>
                      <ul><li><strong>獨特知識</strong>：你獨有的技能、洞察和專業知識</li>
                      <li><strong>槓桿效應</strong>：能放大個人影響力的工具（程式碼、媒體、人力、資本）</li>
                      <li><strong>責任感</strong>：承擔風險和決策，建立個人品牌</li></ul>
                      <p><strong>為什麼要產品化自己？</strong></p>
                      <ul><li>傳統就業是「出租時間」，產品化是「銷售價值」</li>
                      <li>產品可以規模化，時間不能</li>
                      <li>產品創造被動收入，擺脫時間換錢的限制</li></ul>
                      <p>實例：部落客將寫作能力（獨特知識）+ 網路平台（槓桿）+ 個人品牌（責任感）= 可規模化的內容產品</p>`,
            application: `<ul>
                         <li>識別你的獨特知識和技能組合</li>
                         <li>選擇適合的槓桿工具（程式碼、內容、社群）</li>
                         <li>建立個人品牌，承擔公開責任</li>
                         <li>創造可規模化、可重複銷售的產品或服務</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>產品化 = 獨特知識 × 槓桿 × 責任感</li>
                       <li>從出租時間轉向銷售價值</li>
                       <li>產品可以規模化，時間不能</li>
                       <li>建立被動收入，實現財務自由</li>
                       </ul>`
        },
        'specific-knowledge-definition': {
            title: '🧠 獨特知識',
            overview: '你獨有、無法被簡單複製的技能或知識體系，來自興趣、天賦和長時間專注鑽研的領域。',
            analysis: `<p>獨特知識是財富創造的基礎，決定了你在市場上的不可替代性：</p>
                      <p><strong>獨特知識的特徵：</strong></p>
                      <ul><li><strong>無法教授</strong>：很難透過學校或培訓快速傳授</li>
                      <li><strong>高度個人化</strong>：與你的興趣、經歷、天賦密切相關</li>
                      <li><strong>難以複製</strong>：需要長時間專注投入才能獲得</li>
                      <li><strong>市場價值</strong>：社會願意為此付費</li></ul>
                      <p><strong>如何識別獨特知識？</strong></p>
                      <ul><li>觀察什麼事情對你來說很容易，但別人覺得困難</li>
                      <li>找出你願意花大量時間研究的領域</li>
                      <li>結合多個看似無關的技能或興趣</li>
                      <li>關注你天然好奇和熱愛的事物</li></ul>
                      <p><strong>獨特知識的類型：</strong></p>
                      <ul><li><strong>技術知識</strong>：程式設計、設計、工程</li>
                      <li><strong>創意知識</strong>：寫作、藝術、內容創作</li>
                      <li><strong>商業知識</strong>：銷售、行銷、產品開發</li>
                      <li><strong>跨領域知識</strong>：結合不同領域的獨特洞察</li></ul>
                      <p>納瓦爾的建議：「如果社會能夠訓練你，社會也能夠訓練其他人來取代你。」</p>`,
            application: `<ul>
                         <li>花時間自我反思，識別你的天然優勢</li>
                         <li>深入鑽研你感興趣的領域</li>
                         <li>尋找跨領域的知識組合機會</li>
                         <li>持續學習和更新你的獨特知識</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>獨特知識無法被簡單教授或複製</li>
                       <li>來自個人興趣、天賦和長期專注</li>
                       <li>跨領域組合創造更大價值</li>
                       <li>是財富創造和職業成功的基礎</li>
                       </ul>`
        },
        'zero-marginal-cost': {
            title: '💻 零邊際成本產品',
            overview: '每多生產一件產品的成本極低甚至為零的產品類型，如軟體、線上課程、數位內容等。',
            analysis: `<p>零邊際成本產品是現代財富創造的核心，代表了數位時代的最大機會：</p>
                      <p><strong>零邊際成本的定義：</strong></p>
                      <p>邊際成本是生產額外一件產品的成本。零邊際成本意味著一旦創造完成，可以無限複製而幾乎不增加成本。</p>
                      <p><strong>典型的零邊際成本產品：</strong></p>
                      <ul><li><strong>軟體和應用程式</strong>：一次開發，無限下載</li>
                      <li><strong>數位內容</strong>：電子書、線上課程、音樂、影片</li>
                      <li><strong>網路服務</strong>：SaaS平台、網站、部落格</li>
                      <li><strong>知識產品</strong>：範本、工具、資源包</li></ul>
                      <p><strong>為什麼重要？</strong></p>
                      <ul><li><strong>無限規模化</strong>：可以服務全球市場</li>
                      <li><strong>高利潤率</strong>：固定成本攤薄，利潤率極高</li>
                      <li><strong>被動收入</strong>：一次創造，持續收益</li>
                      <li><strong>時間自由</strong>：不需要持續投入時間生產</li></ul>
                      <p><strong>與傳統產品的對比：</strong></p>
                      <p>傳統製造業每生產一件產品都需要原材料、人工等成本，而數位產品一旦完成，複製成本幾乎為零。</p>
                      <p>這解釋了為什麼科技公司能夠快速達到巨大規模和估值。</p>`,
            application: `<ul>
                         <li>將你的知識和技能數位化</li>
                         <li>創造可重複銷售的數位產品</li>
                         <li>建立線上平台或內容頻道</li>
                         <li>專注於可規模化的商業模式</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>複製成本幾乎為零</li>
                       <li>可以無限規模化</li>
                       <li>創造被動收入來源</li>
                       <li>數位時代的最大財富機會</li>
                       </ul>`
        },
        'compound-interest-definition': {
            title: '📈 複利效應',
            overview: '愛因斯坦稱為「世界第八大奇蹟」的力量：財富、知識、關係等隨時間推移而指數級增長的效應。',
            analysis: `<p>複利效應是納瓦爾財富哲學的核心原理，也是他口中<strong>「宇宙中最強大的力量」</strong>：</p>
                      <p><strong>複利的數學原理：</strong></p>
                      <p>複利 = 本金 × (1 + 利率)^時間</p>
                      <p>關鍵在於「時間」的指數效應，時間越長，複利效應越驚人。</p>
                      <p><strong>生活中的複利效應：</strong></p>
                      <p><strong>1. 財務複利</strong></p>
                      <ul><li>投資回報的再投資</li>
                      <li>被動收入的持續增長</li>
                      <li>資產價值的時間增值</li></ul>
                      <p><strong>2. 知識複利</strong></p>
                      <ul><li>學習能力的提升讓後續學習更高效</li>
                      <li>知識間的連結創造新洞察</li>
                      <li>專業聲譽帶來更多學習機會</li></ul>
                      <p><strong>3. 關係複利</strong></p>
                      <ul><li>信任的累積創造更多合作機會</li>
                      <li>人脈網絡的指數型擴展</li>
                      <li>聲譽的複利效應</li></ul>
                      <p><strong>4. 健康複利</strong></p>
                      <ul><li>良好習慣的長期累積</li>
                      <li>健康投資的終身受益</li>
                      <li>精力充沛創造更多可能性</li></ul>
                      <p><strong>複利的關鍵因素：</strong></p>
                      <ul><li><strong>時間</strong>：複利需要時間發酵</li>
                      <li><strong>一致性</strong>：持續投入，避免中斷</li>
                      <li><strong>耐心</strong>：前期效果不明顯，需要耐心等待</li></ul>`,
            application: `<ul>
                         <li>在重要領域建立可累積的系統</li>
                         <li>專注長期投資而非短期收益</li>
                         <li>保持學習和成長的習慣</li>
                         <li>培養能夠隨時間增值的技能和關係</li>
                         </ul>`,
            keypoints: `<ul>
                       <li>時間是複利最重要的因素</li>
                       <li>適用於財富、知識、關係、健康</li>
                       <li>需要一致性和耐心</li>
                       <li>是實現財務自由的關鍵原理</li>
                       </ul>`
        }
    };
    
    // Add click/touch event listeners to all cards with data-popup attribute
    document.querySelectorAll('[data-popup]').forEach(card => {
        // Click event for desktop and mobile
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const popupId = this.getAttribute('data-popup');
            const data = popupData[popupId];
            
            if (data) {
                showPopup(data);
            }
        });
        
        // Touch events for better mobile interaction
        let touchStarted = false;
        
        card.addEventListener('touchstart', function() {
            touchStarted = true;
        });
        
        card.addEventListener('touchend', function(e) {
            if (touchStarted) {
                e.preventDefault();
                const popupId = this.getAttribute('data-popup');
                const data = popupData[popupId];
                
                if (data) {
                    showPopup(data);
                }
            }
            touchStarted = false;
        });
        
        card.addEventListener('touchcancel', function() {
            touchStarted = false;
        });
    });
    
    // Close popup events with touch support
    popupClose.addEventListener('click', hidePopup);
    popupClose.addEventListener('touchend', function(e) {
        e.preventDefault();
        hidePopup();
    });
    
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });
    
    popupOverlay.addEventListener('touchend', function(e) {
        if (e.target === popupOverlay) {
            e.preventDefault();
            hidePopup();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            hidePopup();
        }
    });
    
    // Prevent scroll on body when popup is open (better mobile experience)
    let scrollY = 0;
    
    function disableScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    }
    
    function enableScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
    }
    
    function showPopup(data) {
        popupTitle.textContent = data.title;
        popupOverview.innerHTML = `<p>${data.overview}</p>`;
        popupAnalysis.innerHTML = data.analysis;
        popupApplication.innerHTML = data.application;
        popupKeypoints.innerHTML = data.keypoints;
        
        disableScroll();
        popupOverlay.classList.add('active');
        
        // Focus on popup for accessibility
        popupOverlay.focus();
    }
    
    function hidePopup() {
        popupOverlay.classList.remove('active');
        enableScroll();
    }
}

// Subtle parallax effect for hero section (fixed version)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const heroRect = hero.getBoundingClientRect();
        
        // Only apply subtle parallax when hero section is still visible
        if (heroRect.bottom > 0 && scrolled < heroHeight) {
            const parallaxSpeed = 0.3;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        } else {
            // Ensure hero stays in place when scrolled past
            hero.style.transform = `translateY(${heroHeight * 0.3}px)`;
        }
    }
});

// Interactive quote animation
const quote = document.querySelector('.quote');
if (quote) {
    quote.addEventListener('mouseenter', () => {
        quote.style.transform = 'scale(1.02)';
    });
    
    quote.addEventListener('mouseleave', () => {
        quote.style.transform = 'scale(1)';
    });
}

// Add hover effects to cards
document.querySelectorAll('.card, .happiness-principle, .philosophy-card, .thinking-card').forEach(card => {
    // Store original transform
    const originalTransform = card.style.transform || '';
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = originalTransform + ' translateY(-10px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = originalTransform;
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
createScrollIndicator();

// Add active state to navigation based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)';
        document.body.style.backgroundSize = '600% 600%';
        document.body.style.animation = 'rainbow 3s ease infinite';
        
        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(easterEggStyle);
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
            document.body.style.animation = '';
            easterEggStyle.remove();
        }, 5000);
        
        konamiCode = [];
    }
});

// Add floating action button for quick navigation
function createFloatingNav() {
    const fab = document.createElement('div');
    fab.innerHTML = '↑';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
    `;
    
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'translateY(0) scale(1.1)';
        fab.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'translateY(0) scale(1)';
        fab.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
    });
    
    document.body.appendChild(fab);
    
    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(100px)';
        }
    });
}

// Initialize floating action button
createFloatingNav();

console.log('Naval Ravikant Almanac - Wisdom for Life 🚀');