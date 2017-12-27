var plane;
var offset = 100;
var correct = 0;
var numToUpdate = 10;
window.onload = function () {
    var canvas = document.getElementById("planeCanvas");
    plane = new Plane1(500, canvas);
    plane.drawRect(3 + Math.floor(correct / numToUpdate), offset);
    window.onclick = function (e) {
        var x = getCanvasPosition(canvas, e).x;
        var y = getCanvasPosition(canvas, e).y;
        if (plane.isRightClick(x, y)) {
            ++correct;
            document.getElementById("Score").innerText = "Score: " + correct;
            plane.drawRect(3 + Math.floor(correct / numToUpdate), offset);
            offset = Math.max(10, offset - Math.floor(Math.log(correct)));
        }
    };
};
function getCanvasPosition(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left * (canvas.width / rect.width),
        y: e.clientY - rect.top * (canvas.height / rect.height)
    };
}
var Plane1 = /** @class */ (function () {
    function Plane1(width, canvasDom) {
        this.width = width;
        this.canvasDom = canvasDom;
        canvasDom.width = width;
        canvasDom.height = width;
        this.context = canvasDom.getContext("2d");
    }
    Plane1.prototype.drawRect = function (rows, offset) {
        this.rows = rows;
        var eachWidth = this.width / this.rows;
        // 获取要出错的坐标值
        this.wrongx = Math.floor(Math.random() * this.rows);
        this.wrongy = Math.floor(Math.random() * this.rows);
        // 获取真实的RGB值和假的RGB值
        var red = Math.floor(Math.random() * 255);
        var offsetRed = Math.min(255, red + Math.floor(Math.random() * offset));
        var green = Math.floor(Math.random() * 255);
        var offsetGreen = Math.min(255, green + Math.floor(Math.random() * offset));
        var blue = Math.floor(Math.random() * 255);
        var offsetBlue = Math.min(255, blue + Math.floor(Math.random() * offset));
        this.mainColor = "rgb(" + red + "," + green + "," + blue + ")";
        this.offsetColor = "rgb(" + offsetRed + "," + offsetGreen + "," + offsetBlue + ")";
        //this.context.clearRect(0,0,this.width,this.width);
        this.context.fillStyle = this.mainColor;
        this.context.fillRect(0, 0, this.width, this.width);
        this.context.fillStyle = this.offsetColor;
        this.context.fillRect(this.wrongx * eachWidth, this.wrongy * eachWidth, eachWidth, eachWidth);
        for (var i = 0; i <= this.rows; i++) {
            var initx = eachWidth * i;
            var inity = eachWidth * i;
            this.context.beginPath();
            this.context.moveTo(0, initx);
            this.context.lineTo(this.width, initx);
            this.context.stroke();
            this.context.moveTo(inity, 0);
            this.context.lineTo(inity, this.width);
            this.context.stroke();
            this.context.closePath();
        }
    };
    Plane1.prototype.isRightClick = function (absoluteX, absoluteY) {
        var eachW = this.width / this.rows;
        var x = Math.floor(absoluteX / eachW);
        var y = Math.floor(absoluteY / eachW);
        return x == this.wrongx && y == this.wrongy;
    };
    return Plane1;
}());
