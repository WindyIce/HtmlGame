'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

//# sourceMappingURL=Food-compile.js.map