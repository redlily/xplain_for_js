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
     * システムのユーティリティクラスです。
     *
     * @constructor
     */
    xpl.SystemUtils = function () {
        throw new Error("Unsupported operation!");
    };

    if (typeof window == "object") {

        const requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        const cancelAnimationFrame =
            window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.msCancelAnimationFrame;

        /**
         * アニメーションの開始を要求します。
         *
         * @param {Function} callback - 定期的に呼び出すコールバック関数
         * @returns {number} タイマーID
         */
        xpl.SystemUtils.requestAnimationFrame = function (callback) {
            return requestAnimationFrame(callback);
        };

        /**
         * アニメーションをキャンセルします。
         *
         * @param {number} timer_id - タイマーID
         */
        xpl.SystemUtils.cancelAnimationFrame = function (timer_id) {
            cancelAnimationFrame(timer_id);
        };
    }

    if (typeof document == "object") {

        const exitFullscreen =
            document.exitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

        /**
         * フルスクリーンをサポートしているかどうかを調べます。
         *
         * @returns {boolean} フルスクリーンをサポートしているかどうか
         */
        xpl.SystemUtils.isSupportedFullScreen = function (target_element) {
            return (target_element.requestFullscreen ||
                target_element.mozRequestFullScreen ||
                target_element.webkitRequestFullscreen ||
                target_element.msRequestFullscreen) != null;
        };

        /**
         * 指定の要素をフルスクリーン化を要求します。
         *
         * @param {Element} target_element - フルスクリーンの対象になる対象の要素
         * @returns {boolean} フルスクリーンに成功したかどうか
         */
        xpl.SystemUtils.requestFullScreen = function (target_element) {
            if (typeof target_element.requestFullscreen == "function") {
                // HTML5 API.
                target_element.requestFullscreen();
            } else if (typeof target_element.mozRequestFullScreen == "function") {
                // Mozilla API.
                target_element.mozRequestFullScreen();
            } else if (typeof target_element.webkitRequestFullscreen == "function") {
                // Webkit API.
                target_element.webkitRequestFullscreen();
            } else if (typeof target_element.msRequestFullscreen == "function") {
                // Classic Microsoft API.
                target_element.msRequestFullscreen();
            } else {
                return false;
            }
            return true;
        };

        /**
         * フルスクリーンかどうかを調べます。
         *
         * @returns {boolean} フルスクリーンかどうか
         */
        xpl.SystemUtils.isFullScreen = function () {
            return window.innerWidth == screen.width && window.innerHeight == screen.height;
        };

        /**
         * フルスクリーンをキャンセルします。
         */
        xpl.SystemUtils.cancelFullScreen = function () {
            if (exitFullscreen != null) {
                exitFullscreen();
            }
        };
    }

})(xpl);
