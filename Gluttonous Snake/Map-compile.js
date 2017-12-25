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

//# sourceMappingURL=Map-compile.js.map