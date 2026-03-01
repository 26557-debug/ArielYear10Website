/**
 * 全局音乐播放器
 * 在所有页面间保持音乐连续播放
 */

// 直接执行，不等待事件（因为脚本已经在body末尾）
initGlobalMusic();

function initGlobalMusic() {
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-btn');
    
    // 如果找不到元素，可能是脚本加载太早？等一会儿再试
    if (!bgm || !musicBtn) {
        console.log('音乐元素未找到，1秒后重试...');
        setTimeout(initGlobalMusic, 1000);
        return;
    }
    
    console.log('找到音乐元素，初始化播放器');
    
    // 从localStorage读取上次的播放状态
    const musicState = JSON.parse(localStorage.getItem('globalMusicState')) || {
        isPlaying: false,
        currentTime: 0,
        volume: 0.7
    };
    
    // 设置音量和播放位置
    bgm.volume = musicState.volume;
    bgm.currentTime = musicState.currentTime;
    
    // 更新按钮文本
    updateButtonText(musicState.isPlaying);
    
    // 如果之前是播放状态，自动播放
    if (musicState.isPlaying) {
        // 浏览器可能阻止自动播放，需要用户交互
        const playPromise = bgm.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log('自动播放被阻止，等待用户点击');
                musicState.isPlaying = false;
                localStorage.setItem('globalMusicState', JSON.stringify(musicState));
                updateButtonText(false);
            });
        }
    }
    
    // 移除旧的事件监听（避免重复）
    musicBtn.onclick = null;
    
    // 点击按钮切换播放/暂停
    musicBtn.onclick = function() {
        toggleMusic(bgm, musicBtn);
    };
    
    // 定期保存播放进度（每秒）
    setInterval(() => {
        saveMusicState(bgm);
    }, 1000);
    
    // 页面关闭前保存状态
    window.addEventListener('beforeunload', function() {
        saveMusicState(bgm);
    });
    
    // 监听音量变化
    bgm.addEventListener('volumechange', function() {
        saveMusicState(bgm);
    });
}

// 切换播放/暂停
function toggleMusic(bgm, musicBtn) {
    if (bgm.paused) {
        bgm.play().then(() => {
            saveMusicState(bgm, true);
            updateButtonText(true, musicBtn);
        }).catch(e => console.log('播放失败:', e));
    } else {
        bgm.pause();
        saveMusicState(bgm, false);
        updateButtonText(false, musicBtn);
    }
}

// 保存音乐状态到localStorage
function saveMusicState(bgm, isPlaying = null) {
    const state = {
        isPlaying: isPlaying !== null ? isPlaying : !bgm.paused,
        currentTime: bgm.currentTime,
        volume: bgm.volume
    };
    localStorage.setItem('globalMusicState', JSON.stringify(state));
}

// 更新按钮文字
function updateButtonText(isPlaying, btn = null) {
    const musicBtn = btn || document.getElementById('music-btn');
    if (!musicBtn) return;
    musicBtn.textContent = isPlaying ? '⏸ Stop Music' : '▶ Play Music';
}

// 导出函数供其他脚本使用
window.globalMusic = {
    toggle: toggleMusic,
    play: function() {
        const bgm = document.getElementById('bgm');
        const btn = document.getElementById('music-btn');
        if (bgm && bgm.paused) toggleMusic(bgm, btn);
    },
    pause: function() {
        const bgm = document.getElementById('bgm');
        const btn = document.getElementById('music-btn');
        if (bgm && !bgm.paused) toggleMusic(bgm, btn);
    }
};