/**
 * @license
 *
 * Copyright (c) 2016, Syuuhei Kuno
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of xplain_for_js nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (xpl) {

    "use strict";

    /**
     * 数値と数学のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.MathUtils = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * 引数のうち最も小さい値を返します。
     *
     * @param {number} v1 - 第1引数
     * @param {number} v2 - 第2引数
     * @param {number} v3 - 第3引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.min = function (v1, v2, v3) {
        return v1 < v2 ? (v1 < v3 ? v1 : v3) : (v2 < v3 ? v2 : v3);
    };

    /**
     * 引数のうち中間の値を返します。
     *
     * @param {number} v1 - 第1引数
     * @param {number} v2 - 第2引数
     * @param {number} v3 - 第3引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.mid = function (v1, v2, v3) {
        return v1 < v2 ? (v2 < v3 ? v2 : (v3 < v1 ? v1 : v3)) : (v1 < v3 ? v1 : (v3 < v2 ? v2 : v3));
    };

    /**
     * 引数のうち最も大きいの値を返します。
     *
     * @param {number} v1 - 第1引数
     * @param {number} v2 - 第2引数
     * @param {number} v3 - 第3引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.max = function (v1, v2, v3) {
        return v1 < v2 ? (v2 < v3 ? v3 : v2) : (v1 < v3 ? v3 : v1);
    };

    /**
     * 対数値を返します。
     *
     * @param {number} base - 基数
     * @param {number} index - 指数
     * @returns {number} 結果値
     */
    xpl.MathUtils.log = function (base, index) {
        return Math.log(index) / Math.log(base);
    };

    /**
     * 立方根の値を返します。
     *
     * @param {number} v - 引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.cqrt = function (v) {
        return 0 <= v ? Math.pow(v, 1.0 / 3.0) : -Math.pow(-v, 1.0 / 3.0);
    };

    /**
     * 指定の値以上の正の整数の2乗値の中で小さい値を返します。
     *
     * @param {number} value - 引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.floorPow2 = function (value) {
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
     * 指定の値以下の正の整数の2乗値の中で大きい値を返します。
     *
     * @param {number} value - 引数
     * @returns {number} 結果値
     */
    xpl.MathUtils.ceilPow2 = function (value) {
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
