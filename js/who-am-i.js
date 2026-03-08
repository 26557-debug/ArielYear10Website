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

// 暴露函数到全局
window.switchWhoPage = switchWhoPage;