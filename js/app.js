// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var score = 0;
var allEnemies = [];
var allObstacles = [];
var player = new Player(score);

function getRandomSpaceTime () {
    return (Math.random() * (3 - 1) + 1) * 1000
}

/* function :
* 这个函数会遍历 allEnemies 数组中的敌人，使其与人物进行碰撞检测 
* 如果
*/

function gameCheck () {
    checkCollisions();
    checkSuccess();
}

function checkCollisions () {
    var collEnemy = player.checkCollision(allEnemies);
    if (collEnemy === null) return
    player.reset(--score);
}

function checkSuccess () {
    if (player.gridY !== 0) return;
    player.reset(++score);
}


function updateScore () {
    var fontStyle = ctx.font;
    var fillStyle = ctx.fillStyle;
    var strokeStyle = ctx.strokeStyle;

    ctx.font = "30px Verdana";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    ctx.strokeText(score, 10, 100);
    
    ctx.font = fontStyle;
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    
}

function generateEnemy () {
    allEnemies.push(new Enemy());
    setTimeout(generateEnemy, getRandomSpaceTime());
}


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
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

    player.handleInput(allowedKeys[e.keyCode]);
});

// 随机时间间隔创建一个敌人
setTimeout(generateEnemy, getRandomSpaceTime());