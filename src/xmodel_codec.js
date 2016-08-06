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
     * xModelのデコーダの定義クラスです。
     *
     * @constructor
     */
    xpl.XModelCodec = function () {
    };

    Object.defineProperties(xpl.XModelCodec, {

        /**
         * コードネーム.
         *
         * @memberof xpl.XModelCodec
         * @const {string} CODE_NAME
         */
        "CODE_NAME": {
            value: "EX-MACHINA"
        },

        /**
         * マジックナンバー (XModel DAta).
         *
         * @memberof xpl.XModelCodec
         * @const {xpl.uint32_t} MAGIC_NUMBER
         */
        "MAGIC_NUMBER": {
            value: ((0xff & "x".charCodeAt(0)) << 0) |
            ((0xff & "m".charCodeAt(0)) << 8) |
            ((0xff & "d".charCodeAt(0)) << 16) |
            ((0xff & "a".charCodeAt(0)) << 24)
        },

        /**
         * 終端識別子 (End Of xModel Data).
         *
         * @memberof xpl.XModelCodec
         * @const {xpl.uint32_t} END_OF_DATA
         */
        "END_OF_DATA": {
            value: ((0xff & "e".charCodeAt(0)) << 0) |
            ((0xff & "o".charCodeAt(0)) << 8) |
            ((0xff & "x".charCodeAt(0)) << 16) |
            ((0xff & "d".charCodeAt(0)) << 24)
        },

        /**
         * バージョン数
         *
         * @memberof xpl.XModelCodec
         * @const {xpl.uint32_t} VERSION
         */
        "VERSION": {value: 35},

        /**
         * 互換のあるバージョン数
         *
         * @memberof xpl.XModelCodec
         * @const {xpl.uint32_t} COMPATIBILITY_VERSION
         */
        "COMPATIBILITY_VERSION": {value: 35},

        /**
         * バージョン文字列
         *
         * @memberof xpl.XModelCodec
         * @const {string} VERSION_NAME
         */
        "VERSION_NAME": {value: "0.9.90"},

        /**
         * 互換のあるバージョン文字列
         *
         * @memberof xpl.XModelCodec
         * @const {string} COMPATIBILITY_VERSION_NAME
         */
        "COMPATIBILITY_VERSION_NAME": {value: "0.9.90"}
    });

})(xpl);
