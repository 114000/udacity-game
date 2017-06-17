/**
 * 这个文件在全局添加了一些常量供其他部分的代码使用
 */
(function (global) {
  global.OBJECT_DISPLAY_OFFSET_Y = 22; // 为了更好显示游戏中可以移动的元素的位置需要的修正值
  global.GRID_WIDTH = 101;             // 每一格背景的宽度
  global.GRID_HEIGHT = 83;             // 每一格背景的高度

  global.GRID_ROW = 6;                 // 游戏行数
  global.GRID_COL = 5;                 // 游戏列数
})(this); 