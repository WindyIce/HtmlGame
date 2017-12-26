'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(width, height, position, color, relativelyDom) {
        _classCallCheck(this, Map);

        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
        this.dom = null;
        this.relativelyDom = relativelyDom;
    }

    _createClass(Map, [{
        key: 'show',
        value: function show() {
            this.dom = document.createElement("div");
            this.dom.style.width = this.width + 'px';
            this.dom.style.height = this.height + 'px';
            this.dom.style.position = this.position;
            this.dom.style.backgroundColor = this.color;
            this.relativelyDom.appendChild(this.dom);
        }
    }]);

    return Map;
}();

var Food = function () {
    function Food(width, height, position, color, relativelyMap) {
        _classCallCheck(this, Food);

        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
        this.dom = document.createElement('div');
        this.x = 0;
        this.y = 0;
        this.maxX = relativelyMap.width / this.width;
        this.maxY = relativelyMap.height / this.height;
        this.relativelyDom = relativelyMap.dom;
    }

    _createClass(Food, [{
        key: 'show',
        value: function show() {
            this.dom.style.width = this.width + 'px';
            this.dom.style.height = this.height + 'px';
            this.dom.style.position = this.position;
            this.dom.style.backgroundColor = this.color;
            this.x = Math.floor(Math.random() * this.maxX);
            this.y = Math.floor(Math.random() * this.maxY);
            this.dom.style.left = this.x * this.width + 'px';
            this.dom.style.top = this.y * this.height + 'px';
            this.relativelyDom.appendChild(this.dom);
        }
    }]);

    return Food;
}();

var Snake = function () {
    function Snake(width, height, colorHead, colorBody, position, relativelyMap) {
        _classCallCheck(this, Snake);

        this.width = width;
        this.height = height;
        this.colorHead = colorHead;
        this.colorBody = colorBody;
        this.position = position;
        this.direct = '';
        this.dom = relativelyMap.dom; //不要进行任何对这个dom的修改！！这是为了定位
        this.maxX = relativelyMap.width / this.width;
        this.maxY = relativelyMap.height / this.height;
        this.body = [new SnakeBody(6, 2, this.colorHead), new SnakeBody(5, 2, this.colorBody), new SnakeBody(4, 2, this.colorBody)];
        this.initLength = this.body.length;
        this.nowLength = this.initLength;
        this.isAlive = true;
    }

    _createClass(Snake, [{
        key: 'setDirection',
        value: function setDirection(code) {
            switch (code) {
                case 37:
                    if (this.direct !== 'right') this.direct = 'left';
                    break;
                case 38:
                    if (this.direct !== 'down') this.direct = 'up';
                    break;
                case 39:
                    if (this.direct !== 'left') this.direct = 'right';
                    break;
                case 40:
                    if (this.direct !== 'up') this.direct = 'down';
                    break;
            }
        }
    }, {
        key: 'show',
        value: function show() {
            for (var i = 0; i < this.body.length; i++) {
                var eachBody = this.body[i];
                if (eachBody.dom == null) {
                    eachBody.dom = document.createElement('div');
                    eachBody.dom.style.width = this.width + 'px';
                    eachBody.dom.style.height = this.height + 'px';
                    eachBody.dom.style.position = this.position;
                    eachBody.dom.style.backgroundColor = eachBody.color;
                    this.dom.appendChild(eachBody.dom);
                }
                eachBody.dom.style.left = this.width * eachBody.x + 'px';
                eachBody.dom.style.top = this.height * eachBody.y + 'px';
            }
        }
    }, {
        key: 'move',
        value: function move(food) {
            //处理除了第一节的所有蛇身，让后面的坐标等于前面的
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            //处理第一节蛇身
            switch (this.direct) {
                case 'up':
                    this.body[0].y--;
                    break;
                case 'down':
                    this.body[0].y++;
                    break;
                case 'left':
                    this.body[0].x--;
                    break;
                case 'right':
                    this.body[0].x++;
                    break;
                default:
                    return;
            }
            //是否撞墙
            if (this.body[0].x < 0 || this.body[0].x >= this.maxX || this.body[0].y < 0 || this.body[0].y >= this.maxY) {
                this.isAlive = false;
            }
            //是否吃到自己
            for (var _i = 1; _i < this.body.length; _i++) {
                if (this.body[0].x === this.body[_i].x && this.body[0].y === this.body[_i].y) {
                    this.isAlive = false;
                    break;
                }
            }
            //是否吃到食物
            if (this.body[0].x === food.x && this.body[0].y === food.y) {
                var x = this.body[this.body.length - 1].x;
                var y = this.body[this.body.length - 1].y;
                this.nowLength++;
                this.body.push(new SnakeBody(x, y, this.colorBody));
                food.show();
            }
            this.show();
        }
    }]);

    return Snake;
}();

var SnakeBody = function SnakeBody(x, y, color) {
    _classCallCheck(this, SnakeBody);

    this.x = x;
    this.y = y;
    this.color = color;
    this.dom = null;
};

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

var map = void 0;
var food = void 0;
var snake = void 0;
var timer = void 0;
window.onload = function () {
    map = new Map(800, 800, 'absolute', '#000000', document.getElementsByTagName('body')[0]);
    map.show();
    food = new Food(20, 20, 'absolute', '#00ff00', map);
    food.show();
    snake = new Snake(20, 20, '#ff00ff', '#0000ff', 'absolute', map);
    snake.show();
    var intervalTime = 100;
    timer = setInterval('snake.move(food)', intervalTime);
    var firstStart = false;
    var initTime = void 0,
        nowTime = void 0;
    var a = function a() {
        if (!snake.isAlive) {
            alert('DEAD');
            snake.isAlive = true;
            sleep(2000);
            location.reload();
        }
    };
    setInterval(a, intervalTime);
    document.onkeydown = function () {
        if (!firstStart) {
            firstStart = true;
            initTime = new Date().getMilliseconds();
            nowTime = initTime;
            var code = void 0;
            if (window.event) {
                code = window.event.keyCode;
            } else {
                code = event.keyCode;
            }
            snake.setDirection(code);
        }
        if (firstStart) {
            var _code = void 0;
            var trueTime = new Date().getMilliseconds();
            if (window.event) {
                _code = window.event.keyCode;
            } else {
                _code = event.keyCode;
            }
            if (trueTime / 100 !== nowTime / 100) {
                snake.setDirection(_code);
                nowTime = trueTime;
            }
        }
    };
};

//# sourceMappingURL=MainOO-compile.js.map