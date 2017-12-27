var Plane = /** @class */ (function () {
    function Plane(width, canvasDom) {
        this.width = width;
        this.canvasDom = canvasDom;
        canvasDom.width = width;
        canvasDom.height = width;
        this.context = canvasDom.getContext("2d");
    }
    Plane.prototype.drawRect = function (rows, offset) {
        this.rows = rows;
        var eachWidth = this.width / rows;
        // 获取真实的RGB值和假的RGB值
        var red = Math.floor(Math.random() * 255);
        var offsetRed = Math.max(255, red + Math.floor(Math.random() * offset));
        var green = Math.floor(Math.random() * 255);
        var offsetGreen = Math.max(255, green + Math.floor(Math.random() * offset));
        var blue = Math.floor(Math.random() * 255);
        var offsetBlue = Math.max(255, blue + Math.floor(Math.random() * offset));
        this.mainColor = "rgb(" + red + "," + green + "," + blue + ")";
        this.offsetColor = "rgb(" + offsetRed + "," + offsetGreen + "," + offsetBlue + ")";
        for (var i = 0; i <= rows; i++) {
            var initx = eachWidth * i;
            var inity = eachWidth * i;
            this.context.moveTo(0, this.width * i);
            this.context.lineTo(this.width, eachWidth * i);
            this.context.stroke();
            this.context.moveTo(eachWidth * i, 0);
            this.context.lineTo(eachWidth * i, this.width);
            this.context.stroke();
        }
    };
    return Plane;
}());
