// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (score) {
    this.gridX = 0;
    this.gridY = 0;
    
    this.x = 0;
    this.y = 0;

    this.sprite = 'images/char-boy.png';
    this.reset(score);
}


Player.prototype._check = function (object) {
    return Math.abs(object.x - this.x) < GRID_WIDTH / 2 && this.gridY == object.gridY;
}

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

Player.prototype.update = function () {
    this.x = this.gridX * GRID_WIDTH;
    this.y = this.gridY * GRID_HEIGHT - OBJECT_DISPLAY_OFFSET_Y;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keyName) {
   
    switch (keyName) {
        case 'left': this.gridX = this.gridX === 0 ? 0 : this.gridX - 1; break;
        case 'up': this.gridY = this.gridY === 0 ? 0 : this.gridY - 1; break;
        case 'right': this.gridX = this.gridX === GRID_ROW - 1 ? GRID_ROW - 1 : this.gridX + 1; break;
        case 'down': this.gridY = this.gridY === GRID_COL - 1 ? GRID_COL - 1 : this.gridY + 1; break;
    }

    this.update();
}

Player.prototype.setSprite = function (score) {
    var score = score || 0;
        console.log(score)

    
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

Player.prototype.reset = function (score) {
    this.gridX = Math.floor(Math.random() * GRID_ROW);
    this.gridY = 5;

    this.setSprite(score);
}