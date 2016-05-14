/**
 * @license
 *
 * Copyright (c) 2015, Syuuhei Kuno
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (ns) {

    "use strict";

    ns.xdc.ParametricImage = function (size, angle, matrix) {
        this.__size = size;
        this.__angle = angle;
        this.__matrix = new Float32Array(ns.Geometry.SIZE_MATRIX_4X4);
        ns.Matrix4x4.loadv(this.__matrix, 0, matrix, 0);
        let num_elements = size * size;
        this.__color_map = new Float32Array(ns.xdc.ParametricImage.SIZE_COLOR_PIXEL * num_elements);
        this.__depth_map = new Float32Array(ns.xdc.ParametricImage.SIZE_DEPTH_PIXEL * num_elements);
    };

    let thisClass = ns.xdc.ParametricImage;

    Object.defineProperties(thisClass, {

        "SIZE_COLOR_PIXEL": {

            value: 3
        },

        "INDEX_RED": {

            value: 0
        },

        "INDEX_GREEN": {

            value: 1
        },

        "INDEX_BLUE": {

            value: 2
        },

        "SIZE_DEPTH_PIXEL": {

            value: 1
        }
    });

    Object.defineProperties(thisClass.prototype, {

        "size": {

            get function () {
                return this.__size;
            }
        },

        "angle": {

            get function () {
                return this.__angle;
            }
        }
    });

    ns.xdc.ParametricImage.prototype.getRed = function (x, y) {
        let index = thisClass.SIZE_COLOR_PIXEL + (x + this.__size * y) + thisClass.INDEX_RED;
        return this.__color_map[index]
    };

    thisClass.prototype.setRed = function (x, y, red) {

    };

    thisClass.prototype.getGreen = function (x, y) {

    };

    thisClass.prototype.setGreen = function (x, y, green) {

    };

    thisClass.getBlue = function (x, y) {

    };

    thisClass.setBlue = function (x, y, blue) {

    };

    thisClass.getDepth = function (x, y) {

    };

    thisClass.setDepth = function (x, y, depth) {

    };

    thisClass.setImage = function (img) {

    };

})(xpl);
