
/**
 * @class Enemy:  玩家要躲避的敌人 
 * @constructor
 *     @param {number} score : 设置分数可以改变敌人的随机速度
 * @prop {number} gridY: 敌人所在的网格的纵坐标
 * @prop {number} x: 敌人的像素横坐标
 * @prop {number} y: 敌人的像素纵坐标
 * @prop {number} speed: 敌人行进的速度
 * @prop {string} sprite: 敌人的贴图资源路径
 */
var Enemy = function(score) {
    // 敌人随机生成时所在的行数 1-3行
    this.gridY = Math.floor(Math.random() * (4 - 1) + 1);
    this.x = - 101;
    this.y = this.gridY * GRID_HEIGHT - OBJECT_DISPLAY_OFFSET_Y;
    // 敌人的速度与分数有关，决定了游戏的难度
    this.speed = Math.floor(Math.random() * (300 - 100) + 100) * (1 + 0.1 * score);

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @method {} update: 更新敌人的位置以供渲染出移动的敌人
 */
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
};



/**
 * @method {} render: 此为游戏必须的函数，用来在屏幕上画出敌人
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
