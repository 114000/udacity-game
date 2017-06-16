// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.gridX = Math.floor(Math.random() * GRID_ROW);
    this.gridY = 5;
    
    this.x = 0;
    this.y = 0;

    this.sprite = 'images/char-boy.png';
    
    this.update();
}

Player.prototype.update = function () {
    this.x = this.gridX * GRIRD_WIDTH;
    this.y = this.gridY * GRID_HEIGHT - 20;
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