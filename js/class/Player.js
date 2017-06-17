/**
 * 玩家类
 * @class Player
 * @constructor
 *     @param {number} score : 设置分数可以改变玩家的贴图
 * @prop {number} gridX: 玩家所在的网格的横坐标
 * @prop {number} gridY: 玩家所在的网格的纵坐标
 * @prop {number} x: 玩家的像素横坐标
 * @prop {number} y: 玩家的像素纵坐标
 * @prop {string} sprite: 玩家的贴图资源路径
 */
var Player = function (score) {
    this.gridX = 0;
    this.gridY = 0;
    
    this.x = 0;
    this.y = 0;

    this.sprite = 'images/char-boy.png';
    this.reset(score);
}


/**
 * @method {bool} _check: 检查玩家和检测对象是否重叠，返回bool值
 * @param {Enemy} obj: 被检测的物体，需要实现 x, gridY 属性值
 */
Player.prototype._check = function (obj) {
    return Math.abs(obj.x - this.x) < GRID_WIDTH / 2 && this.gridY == obj.gridY;
}

/**
 * @method {Enemy|null} checkCollision: 检查单个或一组物体是否与玩家碰撞到，将碰撞的物体
 *                                  返回。
 * @param {Enemy|Array<Enemy>} objects: 被检测的物体。
 */
Player.prototype.checkCollision = function (objects) {
    var collObject = null

    if (objects instanceof Array) {
        for (var i = 0; i < objects.length; i++) {
            if (this._check(objects[i])) {
                collObject = objects[i];
                break;
            }
        }
    } else if (objects && this._check(objects)) {
        collObject = objects;
    }

    return collObject;
}
/**
 * @method {} update: 更新玩家渲染时需要的数据
 */
Player.prototype.update = function () {
    this.x = this.gridX * GRID_WIDTH;
    this.y = this.gridY * GRID_HEIGHT - OBJECT_DISPLAY_OFFSET_Y;
}

/**
 * @method {} render: 引擎调用的玩家的渲染函数，将玩家绘制到ctx中
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @method {} handleInput: 引擎调用的玩家的渲染函数，将玩家绘制到ctx中
 * @param {string} direction: 玩家下一步的移动方向
 */
Player.prototype.handleInput = function (direction) {
   /**
    * 这里需要对玩家的动作进行边界判断
    * 左右移动时 gridX 不能小于 0，不能大于 GRID_COL - 1
    * 上下移动时 gridY 不能小于 0，不能大于 GRID_ROW - 1
    */
    switch (direction) {
        case 'left': this.gridX = this.gridX === 0 ? 0 : this.gridX - 1; break;
        case 'up': this.gridY = this.gridY === 0 ? 0 : this.gridY - 1; break;
        case 'right': this.gridX = this.gridX === GRID_COL - 1 ? GRID_COL - 1 : this.gridX + 1; break;
        case 'down': this.gridY = this.gridY === GRID_ROW - 1 ? GRID_ROW - 1 : this.gridY + 1; break;
    }

    this.update();
}

/**
 * @method {} setSprite: 根据分数设置玩家图片
 * @param {number} score: 当前游戏分数
 */
Player.prototype.setSprite = function (score) {
    var score = score || 0;
    
    if (score < 3) {
        this.sprite = "images/char-boy.png";
    } else if (score < 7) {
        this.sprite = 'images/char-cat-girl.png';
    } else if (score < 12) {
        this.sprite = "images/char-horn-girl.png";
    } else if (score < 18) {
        this.sprite = "images/char-pink-girl.png";
    } else if (score >= 18) {
        this.sprite = "images/char-princess-girl.png";
    } else {
        this.sprite = "images/char-boy.png";
    }
}

/**
 * @method {} reset: 可以在得分或碰撞后通过调用此方法重新摆放玩家位置，无需重新实例化
 * @param {number} score: 当前游戏分数，用来设置玩家应该显示的图片
 */
Player.prototype.reset = function (score) {
    this.setSprite(score);
    this.gridX = Math.floor(Math.random() * GRID_COL);
    this.gridY = 5;
}