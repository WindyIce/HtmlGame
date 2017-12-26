var ChessBoard = /** @class */ (function () {
    function ChessBoard(width, height, position, color, relativelyDom, canvasDom, numOfchess) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
        this.relativelyDom = relativelyDom;
        this.canvasDom = canvasDom;
        this.numOfchess = numOfchess;
        this.chesses = [];
        this.eachChess = [];
        this.context = canvasDom.getContext("2d");
        for (var i = 0; i < numOfchess; i++) {
            this.chesses[i] = [];
            for (var j = 0; j < numOfchess; j++) {
                this.chesses[i][j] = new chess1(i, j, null, this.context, width / numOfchess, height / numOfchess);
            }
        }
        this.step = 0;
    }
    ChessBoard.prototype.checkWinner = function (x, y) {
    };
    ChessBoard.prototype.move = function (absoluteX, absoluteY) {
        //获得真实的XY
        var x = Math.floor(absoluteX / (this.width / this.numOfchess));
        console.log('x' + x);
        var y = Math.floor(absoluteY / (this.height / this.numOfchess));
        console.log('y' + y);
        var color;
        //判断是黑棋还是白
        if (this.step % 2 == 0)
            color = 'black';
        else
            color = 'white';
        this.chesses[x][y].color = color;
        this.chesses[x][y].draw(this.context);
        this.checkWinner(x, y);
        var theChess = new chess1(x, y, color, this.context, this.width / this.numOfchess, this.height / this.numOfchess);
        this.eachChess[this.eachChess.length] = theChess;
        ++this.step;
    };
    ChessBoard.prototype.show = function (src) {
        //设置高和宽
        this.canvasDom.width = this.width;
        this.canvasDom.height = this.height;
        //获取棋盘材质
        var img = new Image();
        img.src = src;
        this.context = this.canvasDom.getContext("2d");
        this.context.strokeStyle = "black";
        this.context.strokeRect(0, 0, this.width, this.height);
        var pattern = this.context.createPattern(img, 'repeat');
        this.context.fillStyle = pattern;
        this.context.fillRect(0, 0, this.width, this.height);
        this.drawChessBoardLines(15);
    };
    ChessBoard.prototype.drawChessBoardLines = function (rows) {
        var eachWidth = this.width / rows;
        var eachHeight = this.height / rows;
        for (var i = 0; i < rows; i++) {
            this.context.moveTo(0, eachHeight * i);
            this.context.lineTo(this.width, eachHeight * i);
            this.context.stroke();
            this.context.moveTo(eachWidth * i, 0);
            this.context.lineTo(eachHeight * i, this.height);
            this.context.stroke();
        }
    };
    return ChessBoard;
}());
var chess1 = /** @class */ (function () {
    //color 可以为空，就是该位置没有棋子
    function chess1(x, y, color, context, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.context = context;
        this.width = width;
        this.height = height;
    }
    chess1.prototype.draw = function (context) {
        if (this.color === null) {
            return;
        }
        var left = this.x * this.width + this.width / 2;
        var top = this.y * this.height + this.height / 2;
        if (this.color == "black") {
            context.strokeStyle = "#000000";
            context.fillstyle = "#000000";
        }
        else if (this.color == "white") {
            context.strokeStyle = "#ffffff";
            context.fillstyle = "#ffffff";
        }
        context.beginPath();
        context.arc(left, top, this.width / 4 - 1, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.lineWidth = this.width / 2 - 1;
        context.stroke();
    };
    return chess1;
}());