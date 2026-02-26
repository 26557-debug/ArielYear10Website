// 获取页面元素（对应HTML中的id）
const introScreen = document.getElementById('introScreen');
const mainContent = document.getElementById('mainContent');

// 设置动画时长（和CSS中的animation时长对应，2000毫秒=2秒）
const animDuration = 2000;

// 动画结束后淡出开场层并显示主内容
setTimeout(() => {
    introScreen.classList.add('fade-out');
    
    // 等待淡出动画完成后显示主内容（800毫秒对应CSS中transition的时长）
    setTimeout(() => {
        mainContent.style.display = 'block';
    }, 800);
}, animDuration);