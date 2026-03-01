// script.js — 完全分离的交互代码

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接 和 可滚动容器
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollContainer = document.getElementById('scrollContent');
    const sections = document.querySelectorAll('.card-section'); // 所有目标区域

    // --- 功能1: 点击带下划线的链接平滑跳转至指定id ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // 阻止默认锚点跳转（防止地址变化/刷新）

            // 获取目标元素的id (来自 href 属性，例如 "#home")
            const targetId = this.getAttribute('href'); // 包含 '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 滚动到目标元素 (平滑效果已在CSS中定义 scroll-behavior: smooth)
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });

                // 可选: 更新URL hash但不跳转 (history.pushState 可保留历史)
                // 这里不操作hash以免干扰滚动, 仅改变active样式(会在滚动监听里处理)
                // 但为了视觉反馈，我们暂时手动设置active类
                setActiveLink(targetId.substring(1)); // 去掉#传id名
            }
        });
    });

    // --- 功能2: 根据滚动位置自动高亮对应的导航项 (下划线随动) ---
    function updateActiveNavOnScroll() {
        if (!scrollContainer) return;

        // 获取当前滚动位置 (相对于容器)
        const scrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.clientHeight;

        // 为每个section计算可见区域，找出当前最合适的
        let currentActiveId = null;
        // 用于寻找占据视口比例最大的section
        let maxVisibleHeight = 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;               // 相对scrollContainer顶部
            const sectionHeight = section.offsetHeight;

            // 计算section在容器内的可见部分高度
            const visibleStart = Math.max(sectionTop, scrollTop);
            const visibleEnd = Math.min(sectionTop + sectionHeight, scrollTop + containerHeight);
            const visibleHeight = Math.max(0, visibleEnd - visibleStart);

            // 若可见高度大于目前最大值，则选为当前
            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                currentActiveId = section.getAttribute('id');
            }
        });

        // 如果某个section可见且面积大，就设置为active；如果没有（几乎不可能），保持原样
        if (currentActiveId) {
            setActiveLink(currentActiveId);
        }
    }

    // 辅助函数：根据id名设置active类
    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            // 获取href属性并去掉 '#'
            const href = link.getAttribute('href');
            const idFromHref = href ? href.substring(1) : null;
            
            if (idFromHref === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 监听滚动容器的滚动事件 (高性能passive模式)
    scrollContainer.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

    // 初始化：页面加载时根据当前滚动位置设置active (例如如果url有hash则跳转并高亮)
    // 先尝试从初始hash设置
    const initialHash = window.location.hash.substring(1); // 去掉#
    if (initialHash) {
        const targetSection = document.getElementById(initialHash);
        if (targetSection) {
            // 延迟一点点让DOM完全就绪再滚动，避免干扰渲染
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });
                setActiveLink(initialHash);
            }, 30);
        } else {
            // 没有对应hash，默认高亮第一个（Home）
            setActiveLink('home');
        }
    } else {
        // 默认高亮 Home
        setActiveLink('home');
    }

    // 再触发一次滚动更新，确保精确
    setTimeout(() => {
        updateActiveNavOnScroll();
    }, 100);

    // 额外优化：当窗口大小改变时重新计算高亮
    window.addEventListener('resize', () => {
        // 用requestAnimationFrame防抖
        requestAnimationFrame(updateActiveNavOnScroll);
    });
});