// ===== js/who-am-i.js =====
// 这个文件控制 who-am-i 页面内部的切换 (只保留 Who am I? 和 My Hobbies)

document.addEventListener('DOMContentLoaded', function() {
    // 获取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    
    if (page === 'hobbies') {
        switchWhoPage('hobbies');
    } else if (page === 'who') {
        switchWhoPage('who');
    } else {
        // 检查哪个按钮有active类，就加载哪个页面
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn) {
            const btnText = activeBtn.textContent.trim();
            if (btnText.includes('Who am I')) {
                switchWhoPage('who');
            } else if (btnText.includes('My Hobbies')) {
                switchWhoPage('hobbies');
            } else {
                // 默认加载 Who am I
                switchWhoPage('who');
            }
        } else {
            // 默认加载 Who am I
            switchWhoPage('who');
        }
    }
    
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
    
    window.whoObserver = observer;
}

// 切换 Who 页面内部的分类 (只保留 Who/Hobbies)
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
    }
    // 注意：第三个按钮（Masterpiece）保留active状态？不需要，因为它是独立页面
    
    // 添加淡出动画
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateX(-10px)';
    contentDiv.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        contentDiv.innerHTML = generateWhoPageContent(pageType);
        
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'translateX(0)';
        
        // 重新观察新的滚动元素
        document.querySelectorAll('.scroll-section').forEach(el => {
            if (window.whoObserver) {
                window.whoObserver.observe(el);
            }
        });
    }, 300);
}

// 生成不同页面的内容 (只保留 Who 和 Hobbies)
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
            
        default:
            return '<div>Content not found</div>';
    }
}

// 暴露函数到全局
window.switchWhoPage = switchWhoPage;