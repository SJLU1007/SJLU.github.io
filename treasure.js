// 模拟宝藏地图API
class TreasureMap {//在图书馆过去宝藏线索
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了一张古老的地图...");
            }, 1000);
        });
    }
    static decodeAncientScript(clue) {//解码线索
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static crossRiver() {//在寻找宝藏时，要跨过河流
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("过河时遇到急流，船只被打翻了!");
                }
                resolve("成功渡过河流，来到神庙山脚...");
            }, 1800);
        });
    }

    static climbMountain() {//在寻找宝藏时，要爬上山顶
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) {
                    reject("山路太陡峭，攀爬失败!");
                }
                resolve("成功爬上山顶，神庙入口就在前方...");
            }, 2200);
        });
    }

    static solveTemplePuzzle() {//到达神庙入口，解开神庙的谜题
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.4) {
                    reject("谜题太难，无法解开神庙大门!");
                }
                resolve("成功解开神庙谜题，大门缓缓打开...");
            }, 2500);
        });
    }

    static searchTemple(location) {//进入神庙，开始寻宝
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static openTreasureBox() {//打开宝藏箱
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!里面有无数金银珠宝和古老文献!");
            }, 1000);
        });
    }
}
// DOM元素 
const startBtn = document.getElementById('startBtn');  
const messageBox = document.getElementById('message');
const scene = document.getElementById('scene');
const steps = document.querySelectorAll('.step');
const currentPosition = document.getElementById('current-position');
const path = document.getElementById('path');

// 地图上的点坐标
const mapPoints = {
    1: { x: 50, y: 100 },   // 起点
    2: { x: 120, y: 80 },  // 图书馆
    3: { x: 170, y: 95 },  // 河流
    4: { x: 220, y: 112 }, // 山峰
    5: { x: 270, y: 130 }, // 神庙入口
    6: { x: 340, y: 70 },  // 神庙内部
    7: { x: 390, y: 110 }, // 宝箱房间
    8: { x: 450, y: 90 }   // 宝藏
};

// 场景描述
const scenes = {
    1: "🏁 准备出发",
    2: "🏛️ 古老的图书馆(解码中)",
    3: "🚣‍♂️ 过河",
    4: "⛰️ 攀爬山峰",
    5: "⛩️ 古老的神庙入口",
    6: "🔍 神庙内部",
    7: "🔐 宝箱所在房间",
    8: "💎 发现宝藏！"
};

// 更新步骤显示
function updateStep(stepNumber, isActive = false) {
    // 标记已完成的步骤
    for(let i = 0; i < stepNumber - 1; i++) {
        steps[i].classList.add('completed');
        steps[i].classList.remove('active');
    }
    
    // 标记当前步骤
    if(stepNumber <= steps.length) {
        steps[stepNumber - 1].classList.add('active');
        scene.textContent = scenes[stepNumber] || "";  // 增加默认值防止undefined
        
        // 更新地图位置
        updateMapPosition(stepNumber);
        
        // 更新已走路径颜色
        updatePath(stepNumber);
    }
}

// 更新地图上的当前位置
function updateMapPosition(stepNumber) {
    if(mapPoints[stepNumber]) {
        currentPosition.setAttribute('cx', mapPoints[stepNumber].x);
        currentPosition.setAttribute('cy', mapPoints[stepNumber].y);
        currentPosition.style.opacity = 0;
        
        // 触发动画
        setTimeout(() => {
            currentPosition.style.transition = 'all 1s ease';
            currentPosition.style.opacity = 1;
            currentPosition.style.transform = 'scale(1.5)';
            
            setTimeout(() => {
                currentPosition.style.transform = 'scale(1)';
            }, 500);
        }, 100);
    }
}

// 更新已走路径的颜色
function updatePath(stepNumber) {
    // 重置路径颜色
    path.setAttribute('stroke', '#bcaaa4');
    
    // 如果到达第二步及以上，改变路径颜色
    if(stepNumber >= 2) {
        setTimeout(() => {
            path.setAttribute('stroke', '#4caf50');
        }, 500);
    }
    // 高亮当前点
    for(let i = 1; i <= 8; i++) {
        const point = document.getElementById(`point${i}`);
        if(point && i <= stepNumber) {  // 增加存在性检查
            point.setAttribute('fill', '#4caf50');
        } else if(point) {
            point.setAttribute('fill', '#9e9e9e');
        }
    }
}
// 更新消息显示
function showMessage(text, isError = false) {
    messageBox.textContent = text;
    messageBox.classList.remove('fade-in', 'error');
    // 触发重绘
    void messageBox.offsetWidth;
    messageBox.classList.add('fade-in');
    if(isError) {
        messageBox.classList.add('error');
    }
}
//用async await 重写寻宝流程
startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    startBtn.textContent = "寻宝中...";
    try {
        // 步骤1：起点 - 初始状态
        updateStep(1, false); // 先显示为当前步骤（黄色）
        showMessage("你站在寻宝之旅的起点，准备前往古老的图书馆寻找第一条线索...");
        updateStep(1, true); // 完成后标记为绿色
        
        // 步骤2：图书馆  获取并解码线索
        updateStep(2, false); 
        showMessage("你到达了古老的图书馆，开始寻找线索...");
        const initialClue = await TreasureMap.getInitialClue();
        showMessage(initialClue);
        showMessage("你开始解码古老的文字...");
        const decodedLocation = await TreasureMap.decodeAncientScript(initialClue);
        showMessage(decodedLocation);
        updateStep(2, true); 
        
        // 步骤3：河流 
        updateStep(3, false); 
        showMessage("你离开图书馆，前往河边...");
        const riverResult = await TreasureMap.crossRiver();
        showMessage(riverResult);
        updateStep(3, true); 
        
        // 步骤4：山峰 
        updateStep(4, false);
        showMessage("你开始攀爬山峰...");
        const mountainResult = await TreasureMap.climbMountain();
        showMessage(mountainResult);
        updateStep(4, true);
        
        // 步骤5：神庙入口 - 解谜
        updateStep(5, false);
        showMessage("达神庙入口，需要解开谜题才能进入...");
        const puzzleResult = await TreasureMap.solveTemplePuzzle();
        showMessage(puzzleResult);
        updateStep(5, true);
        
        // 步骤6：神庙内部 
        updateStep(6, false);
        showMessage("进入神庙内部，开始搜索宝藏的踪迹...");
        const templeSearchResult = await TreasureMap.searchTemple(decodedLocation);
        showMessage(templeSearchResult);
        updateStep(6, true);
        
        // 步骤7：宝箱房间 
        updateStep(7, false);
        showMessage("准备打开宝箱...");
        const treasure = await TreasureMap.openTreasureBox();
        showMessage(treasure);
        updateStep(7, true);
        
        // 步骤8：宝藏点 
        updateStep(8, false);
        showMessage("恭喜你成功找到宝藏，完成了这次寻宝之旅！");
        updateStep(8, true);

        startBtn.textContent = "寻宝完成！";
    } catch (error) {
        showMessage("寻宝失败: " + error, true);
        startBtn.textContent = "重新开始";
        startBtn.disabled = false;
    }
});