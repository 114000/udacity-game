// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var allObstacles = [];
var player = new Player();

function getRandomSpaceTime () {
    return (Math.random() * (3 - 1) + 1) * 1000
}

function generateEnemy () {
    allEnemies.push(new Enemy());
    setTimeout(generateEnemy, getRandomSpaceTime());
}

setTimeout(generateEnemy, getRandomSpaceTime());

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
