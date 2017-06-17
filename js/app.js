// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var score = 0;
var allEnemies = [];
var allObstacles = [];
var player = new Player(score);

/**
 * @function {} gameCheck: 游戏内部检测，目前只有碰撞检测
 */
function gameCheck () {
    checkCollisions();
}

/**
 * @function {} checkCollisions: 这里通过检测的结果，处理玩家的显示信息
 */
function checkCollisions () {
    var collEnemy = player.checkCollision(allEnemies);
    if (collEnemy === null) return

    score = --score < 0 ? 0 : score;
    player.reset(score);
}

/**
 * @function {bool} checkSuccess: 检查玩家是否得分，按下按键后，渲染前调用，否则会有残影出
 * 现
 * @param {string} 按键代表的方向，也是玩家将要移动的方向
 */
function checkSuccess (moveDirection) {
    if (player.gridY === 1 && moveDirection === "up") {
        player.reset(++score);
        player.update();
        return true;
    }

    return false;
}

/**
 * @function {number} getRandomSpaceTime: 获取生成敌人的间隔时间
 */
function getRandomSpaceTime () {
    return (Math.random() * (3 - 1) + 1) * 1000 - score * 100
}

/**
 * @function {} generateEnemy: 递归调用此方法可以持续生成敌人
 */
function generateEnemy () {
    allEnemies.push(new Enemy(score));
    setTimeout(generateEnemy, getRandomSpaceTime());
}


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    if (score >= 20) return;
    var allowedKeys = {
        65: 'left',
        37: 'left',
        87: 'up',
        38: 'up',
        68: 'right',
        39: 'right',
        83: 'down',
        40: 'down'
    };
    if (checkSuccess(allowedKeys[e.keyCode])) return;
    player.handleInput(allowedKeys[e.keyCode]);
});

// 随机时间间隔创建一个敌人
setTimeout(generateEnemy, getRandomSpaceTime());