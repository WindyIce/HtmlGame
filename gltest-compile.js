"use strict";

main();

function main() {
    var canvas = document.querySelector("#glCanvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        alert("Your browser or machine may not support WebGL.");
        return;
    }
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}

//# sourceMappingURL=gltest-compile.js.map