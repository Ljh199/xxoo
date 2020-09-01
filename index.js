/*
    单元格点击：

    1 获取到所有的单元格属性。
    2 遍历单元格列表，给每一个单元格添加点击事件。
    3 给当前被点击的单元格添加类名 X。
*/
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var cells = document.querySelectorAll('.cell');
var currentPlayer = Player.X;
var message = document.querySelector('#message');
var winner = document.querySelector('#winner');
var restart = document.querySelector('#restart');
var gameBord = document.querySelector('#bord');
var winsArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
var steps = 0;
restart.addEventListener('click', function () {
    message.style.display = 'none';
    steps = 0;
    currentPlayer = Player.X;
    gameBord.classList.remove(Player.O, Player.X);
    gameBord.classList.add(Player.X);
    cells.forEach(function (item) {
        var cell = item;
        cell.classList.remove(Player.O, Player.X);
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true });
    });
});
cells.forEach(function (item) {
    var cell = item;
    cell.addEventListener('click', clickCell, { once: true });
});
//棋盘中单元格的click事件处理程序
function clickCell(event) {
    var targrt = event.target;
    targrt.classList.add(currentPlayer);
    steps++;
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerText = '小徐好棒，竟然赢了！';
        return;
    }
    if (steps === 9) {
        message.style.display = 'block';
        winner.innerText = '哎呀差点点就赢了呢';
        return;
    }
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(currentPlayer);
}
function checkWin(Player) {
    return winsArr.some(function (item) {
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        if (
        /* cells[cellIndex1].classList.contains(Player) &&
        cells[cellIndex2].classList.contains(Player) &&
        cells[cellIndex3].classList.contains(Player) */
        hasClass(cells[cellIndex1], Player) &&
            hasClass(cells[cellIndex2], Player) &&
            hasClass(cells[cellIndex3], Player)) {
            return true;
        }
        return false;
    });
}
function hasClass(el, name) {
    return el.classList.contains(name);
}
