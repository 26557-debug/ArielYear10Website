// ===== js/who-am-i.js =====
// 这个文件只控制 who-am-i 页面内部的切换

document.addEventListener('DOMContentLoaded', function() {
    // 默认加载 Who am I 内容
    switchWhoPage('who');
    
    // 初始化滚动动画观察器
    initScrollObserver();
});

// 滚动动画观察器
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px' });
    
    // 存储观察器以便后续使用
    window.whoObserver = observer;
}

// 切换 Who 页面内部的三个分类 (Who/Hobbies/Masterpiece)
function switchWhoPage(pageType) {
    const contentDiv = document.getElementById('who-dynamic-content');
    
    // 更新分类按钮的 active 状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (pageType === 'who') {
        document.querySelectorAll('.category-btn')[0].classList.add('active');
    } else if (pageType === 'hobbies') {
        document.querySelectorAll('.category-btn')[1].classList.add('active');
    } else if (pageType === 'masterpiece') {
        document.querySelectorAll('.category-btn')[2].classList.add('active');
    }
    
    // 添加淡出动画
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateX(-10px)';
    contentDiv.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        // 根据选择的分类生成不同内容
        contentDiv.innerHTML = generateWhoPageContent(pageType);
        
        // 添加滑入动画
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'translateX(0)';
        
        // 重新观察新的滚动元素
        document.querySelectorAll('.scroll-section').forEach(el => {
            window.whoObserver.observe(el);
        });
    }, 300);
}

// 生成不同页面的内容
function generateWhoPageContent(pageType) {
    switch(pageType) {
        case 'who':
            return `
                <div class="who-page-content who-scroll-content">
                    <section class="scroll-section">
                        <h2>Who am I?</h2>
                        <p class="date">??/??/2026</p>
                        <p>Let's start to get to know me!!</p>
                        <img src="https://picsum.photos/500/350?random=1" alt="About me">
                        <p>I'm a passionate creator who loves to explore different forms of art and technology. 
                           This website is my digital playground where I showcase everything I'm proud of.</p>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>My Background</h2>
                        <img src="https://picsum.photos/500/350?random=2" alt="Background">
                        <p>I started my creative journey when I was young, experimenting with drawing, 
                           photography, and later digital design and coding.</p>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>My Vision</h2>
                        <img src="https://picsum.photos/500/350?random=3" alt="Vision">
                        <p>I believe in the power of creativity and technology to make the world better. 
                           Every project I work on is a step towards mastering my craft.</p>
                    </section>
                </div>
            `;
            
        case 'hobbies':
            return `
                <div class="who-page-content who-scroll-content">
                    <section class="scroll-section">
                        <h2>My Hobbies</h2>
                        <p class="date">??/??/2026</p>
                        <p>Let's see what I like to do in my free time!</p>
                        <img src="https://picsum.photos/500/350?random=4" alt="Hobbies">
                        <p>When I'm not coding or designing, you can find me exploring new hobbies 
                           and passions that inspire my creativity.</p>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>Photography</h2>
                        <img src="https://picsum.photos/500/350?random=5" alt="Photography">
                        <p>I love capturing moments through my lens. Whether it's nature, cityscapes, 
                           or portraits, photography helps me see the world differently.</p>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>Gaming</h2>
                        <img src="https://picsum.photos/500/350?random=6" alt="Gaming">
                        <p>Video games are not just entertainment - they're interactive art that 
                           inspires my own creative projects.</p>
                    </section>
                </div>
            `;
            
        case 'masterpiece':
            return `
                <div class="who-page-content who-scroll-content">
                    <section class="scroll-section">
                        <h2>My Masterpiece</h2>
                        <p class="date">??/??/2026</p>
                        <p>Let's see my works that I'm very proud of...</p>
                        <img src="https://picsum.photos/500/350?random=7" alt="Masterpiece">
                        <p>These are the projects that represent my best work - the ones that 
                           challenged me and helped me grow as a creator.</p>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>PowerPoint Designs</h2>
                        <img src="https://picsum.photos/500/350?random=8" alt="PowerPoint">
                        <p>I create visually stunning presentations that tell stories and 
                           captivate audiences.</p>
                        <div class="tags-group">
                            <span class="tag">power points</span>
                        </div>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>Posters & Drawings</h2>
                        <img src="https://picsum.photos/500/350?random=9" alt="Posters">
                        <p>From digital illustrations to traditional paintings, I love 
                           expressing ideas through visual art.</p>
                        <div class="tags-group">
                            <span class="tag">posters</span>
                            <span class="tag">drawings/paintings</span>
                        </div>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>Photography</h2>
                        <img src="https://picsum.photos/500/350?random=10" alt="Photos">
                        <p>My photographic journey captures beauty in everyday moments.</p>
                        <div class="tags-group">
                            <span class="tag">photographs</span>
                        </div>
                    </section>
                    
                    <section class="scroll-section">
                        <h2>Baking & Cosplay</h2>
                        <img src="https://picsum.photos/500/350?random=11" alt="Baking">
                        <p>Creativity isn't just digital - I also enjoy baking and cosplay 
                           as forms of artistic expression.</p>
                        <div class="tags-group">
                            <span class="tag">baking works</span>
                            <span class="tag">cosplay</span>
                        </div>
                    </section>
                </div>
            `;
            
        default:
            return '<div>Content not found</div>';
    }
}

// 暴露函数到全局，让 HTML 中的 onclick 可以调用
window.switchWhoPage = switchWhoPage;