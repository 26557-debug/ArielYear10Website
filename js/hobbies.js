// ===== hobbies.js =====
// Hobbies页面的交互逻辑

// 当前选中的hobby索引 (0-based)
let currentHobbyIndex = 0;
const totalHobbies = 9; // 一共9个爱好

// 获取DOM元素
const sliderWrapper = document.getElementById('sliderWrapper');
const galleryWrapper = document.getElementById('galleryWrapper');
const dotIndicators = document.getElementById('dotIndicators');

// 存储所有hobby卡片和gallery项
let hobbyCards = [];
let galleryItems = [];

// 初始化：获取所有元素并设置初始状态
function initHobbies() {
    // 获取所有hobby卡片
    hobbyCards = document.querySelectorAll('.hobby-card');
    
    // 获取所有gallery项
    galleryItems = document.querySelectorAll('.gallery-item');
    
    // 创建小圆点
    createDotIndicators();
    
    // 设置初始位置为第一个hobby
    slideToIndex(0);
    
    // 添加卡片点击事件（点击卡片本身切换）
    setupCardClick();
    
    // 添加画廊点击事件
    setupGalleryClick();
    
    // 添加点击卡片两侧露出的部分切换的功能
    setupSliderContainerClick();
}

// 创建小圆点指示器
function createDotIndicators() {
    if (!dotIndicators) return;
    
    dotIndicators.innerHTML = '';
    
    for (let i = 0; i < totalHobbies; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.getAttribute('data-index'));
            slideToIndex(index);
        });
        dotIndicators.appendChild(dot);
    }
}

// 更新小圆点状态
function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 滑动到指定的hobby索引
function slideToIndex(index) {
    // 边界检查
    if (index < 0) index = 0;
    if (index >= totalHobbies) index = totalHobbies - 1;
    
    // 更新主内容滑块位置
    updateMainSlider(index);
    
    // 更新卡片高亮
    updateCardHighlight(index);
    
    // 更新画廊高亮和滚动位置
    updateGalleryHighlight(index);
    
    // 更新小圆点
    updateDots(index);
    
    // 更新当前索引
    currentHobbyIndex = index;
}

// 更新主内容滑块位置
function updateMainSlider(index) {
    if (!sliderWrapper) return;
    
    // 获取卡片宽度（包括gap）
    const card = document.querySelector('.hobby-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 30; // 与CSS中的gap保持一致
    
    // 每个卡片的实际占用宽度 = 卡片宽度 + gap
    const itemWidth = cardWidth + gap;
    
    // 计算偏移量：让第index张卡片居中
    // 偏移量 = index * itemWidth
    const offset = index * itemWidth;
    
    sliderWrapper.style.transform = `translateX(-${offset}px)`;
}

// 更新卡片高亮
function updateCardHighlight(index) {
    hobbyCards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// 更新画廊高亮和滚动位置
function updateGalleryHighlight(index) {
    if (!galleryWrapper || !galleryItems.length) return;
    
    // 先移除所有高亮
    galleryItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 找出属于当前hobby的所有图片并高亮
    const currentHobbyItems = document.querySelectorAll(`.gallery-item[data-hobby-id="${index + 1}"]`);
    currentHobbyItems.forEach(item => {
        item.classList.add('active');
    });
    
    // 将画廊滚动到当前hobby的第一张图片
    if (currentHobbyItems.length > 0) {
        const firstItem = currentHobbyItems[0];
        const gallerySlider = document.querySelector('.hobbies-gallery');
        
        // 计算滚动位置，让第一张图片靠左显示
        const itemLeft = firstItem.offsetLeft;
        gallerySlider.scrollTo({
            left: itemLeft - 20,
            behavior: 'smooth'
        });
    }
}

// 设置卡片点击事件
function setupCardClick() {
    hobbyCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            slideToIndex(index);
        });
    });
}

// 设置画廊点击事件
function setupGalleryClick() {
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const hobbyId = this.getAttribute('data-hobby-id');
            if (hobbyId) {
                const index = parseInt(hobbyId) - 1;
                slideToIndex(index);
            }
        });
    });
}

// 设置点击卡片两侧露出的部分切换
function setupSliderContainerClick() {
    const container = document.querySelector('.slider-container');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        // 如果点击的是卡片本身，已经在setupCardClick中处理了
        if (e.target.closest('.hobby-card')) return;
        
        // 获取点击位置相对于容器的X坐标
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        
        // 如果点击在左侧三分之一区域，切换到上一个
        if (clickX < rect.width / 3) {
            slideToIndex(currentHobbyIndex - 1);
        }
        // 如果点击在右侧三分之一区域，切换到下一个
        else if (clickX > (rect.width * 2 / 3)) {
            slideToIndex(currentHobbyIndex + 1);
        }
    });
}

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

function setupTouchSupport() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动 -> 下一个
            slideToIndex(currentHobbyIndex + 1);
        } else {
            // 向右滑动 -> 上一个
            slideToIndex(currentHobbyIndex - 1);
        }
    }
}

// 键盘支持
function setupKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideToIndex(currentHobbyIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideToIndex(currentHobbyIndex + 1);
        }
    });
}

// 切换分类标签的函数
function switchCategory(category) {
    if (category === 'who') {
        window.location.href = 'who-am-i.html';
    } else if (category === 'hobbies') {
        console.log('Already on hobbies page');
    }
}

// 窗口大小改变时重新计算位置
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (currentHobbyIndex !== undefined) {
            updateMainSlider(currentHobbyIndex);
            updateGalleryHighlight(currentHobbyIndex);
        }
    }, 250);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initHobbies();
    setupTouchSupport();
    setupKeyboardSupport();
    
    // 暴露函数给全局，以便HTML onclick调用
    window.slideToIndex = slideToIndex;
    window.switchCategory = switchCategory;
});