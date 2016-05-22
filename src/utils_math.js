/**
 * @license
 *
 * Copyright (c) 2016, Syuuhei Kuno
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

    /**
     * Mathematics utilities.
     *
     * @author Syuuhei Kuno
     * @namespace xpl.MathUtils
     */
    ns.MathUtils = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * Returns minimum value in three arguments.
     *
     * @memberof xpl.MathUtils
     * @function min
     * @param {Number} v1 - The value of first.
     * @param {Number} v2 - The value of second.
     * @param {Number} v3 - The value of third.
     * @returns {Number} The value.
     */
    ns.MathUtils.min = function (v1, v2, v3) {
        return v1 < v2 ? (v1 < v3 ? v1 : v3) : (v2 < v3 ? v2 : v3);
    };

    /**
     * Returns middle number in three arguments.
     *
     * @memberof xpl.MathUtils
     * @function mid
     * @param {Number} v1 - The value of first.
     * @param {Number} v2 - The value of second.
     * @param {Number} v3 - The value of third.
     * @returns {Number} The value.
     */
    ns.MathUtils.mid = function (v1, v2, v3) {
        return v1 < v2 ? (v2 < v3 ? v2 : (v3 < v1 ? v1 : v3)) : (v1 < v3 ? v1 : (v3 < v2 ? v2 : v3));
    };

    /**
     * Returns maximum value in three arguments.
     *
     * @memberof xpl.MathUtils
     * @function max
     * @param {Number} v1 - The value of first.
     * @param {Number} v2 - The value of second.
     * @param {Number} v3 - The value of third.
     * @returns {Number} The value.
     */
    ns.MathUtils.max = function (v1, v2, v3) {
        return v1 < v2 ? (v2 < v3 ? v3 : v2) : (v1 < v3 ? v3 : v1);
    };

    /**
     * Returns logarithm value.
     *
     * @memberof xpl.MathUtils
     * @function log
     * @param {Number} base - The base.
     * @param {Number} index - The index.
     * @returns {Number} The value.
     */
    ns.MathUtils.log = function (base, index) {
        return Math.log(index) / Math.log(base);
    };

    /**
     * Returns cube root value.
     *
     * @memberof xpl.MathUtils
     * @function cqrt
     * @param {Number} v - The target value.
     * @returns {Number} The value.
     */
    ns.MathUtils.cqrt = function (v) {
        return 0 <= v ? Math.pow(v, 1.0 / 3.0) : -Math.pow(-v, 1.0 / 3.0);
    };

    /**
     * Returns round down value in numbers of power of two.
     *
     * @memberof xpl.MathUtils
     * @function floorPow2
     * @param {Number} value - The target value.
     * @returns {Number} The value.
     */
    ns.MathUtils.floorPow2 = function (value) {
        value = Math.floor(value);
        value = value | (value >> 1);
        value = value | (value >> 2);
        value = value | (value >> 4);
        value = value | (value >> 8);
        value = value | (value >> 16);
        value = value | (value >> 32);
        return value ^ (value >> 1);
    };

    /**
     * Returns round up value in numbers of power of two.
     *
     * @memberof xpl.MathUtils
     * @function ceilPow2
     * @param {Number} value - The target value.
     * @returns {Number} The value.
     */
    ns.MathUtils.ceilPow2 = function (value) {
        value = Math.floor(value);
        value = value - 1;
        value = value | (value >> 1);
        value = value | (value >> 2);
        value = value | (value >> 4);
        value = value | (value >> 8);
        value = value | (value >> 16);
        value = value | (value >> 32);
        return value + 1;
    };

})(xpl);
