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

(function (ns) {

    "use strict";

    /**
     * 文字列のユーティリティクラスです。
     *
     * @namespace xpl.StringUtils
     */
    ns.StringUtils = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * JavaScript内部の文字列表現からUTF-8の文字列にエンコードします。
     *
     * @memberof xpl.StringUtils
     * @function encodeUTF8
     * @param {string} str - JavaScriptの文字列
     * @returns {Array.<string>} UTF-8の文字列
     */
    ns.StringUtils.encodeUTF8 = function (str) {
        let ary = [];
        for (let i = 0; i < str.length; ++i) {
            // UTF-16からUnicodeへ変換
            let code = str.charCodeAt(i);
            if ((0xd800 <= code && code <= 0xdfff) && i < str.length - 1) {
                code = ((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff)
                    + 0x10000;
            }

            // UnicodeからUTF-8へ変換
            if (code < 0x80) {
                // 7bit.
                ary.push(code);
            } else if (code < 0x800) {
                // 11bit.
                ary.push(
                    ((code >> 6) & 0x1f) | 0xc0,
                    ((code >> 0) & 0x3f) | 0x80);
            } else if (code < 0x10000) {
                // 16bit.
                ary.push(
                    ((code >> 12) & 0xf) | 0xe0,
                    ((code >> 6) & 0x3f) | 0x80,
                    ((code >> 0) & 0x3f) | 0x80);
            } else if (code < 0x200000) {
                // 21bit.
                ary.push(
                    ((code >> 18) & 0x7) | 0xf0,
                    ((code >> 12) & 0x3f) | 0x80,
                    ((code >> 6) & 0x3f) | 0x80,
                    ((code >> 0) & 0x3f) | 0x80);
            } else if (code < 0x4000000) {
                // 26bit.
                ary.push(
                    ((code >> 24) & 0x3) | 0xf8,
                    ((code >> 18) & 0x3f) | 0x80,
                    ((code >> 12) & 0x3f) | 0x80,
                    ((code >> 6) & 0x3f) | 0x80,
                    ((code >> 0) & 0x3f) | 0x80);
            } else if (code < 0x80000000) {
                // 31bit.
                ary.push(
                    ((code >> 30) & 0x1) | 0xfc,
                    ((code >> 24) & 0x3f) | 0x80,
                    ((code >> 18) & 0x3f) | 0x80,
                    ((code >> 12) & 0x3f) | 0x80,
                    ((code >> 6) & 0x3f) | 0x80,
                    ((code >> 0) & 0x3f) | 0x80);
            }
        }
        return ary;
    };

    /**
     * UTF-8の文字列からJavaScript内部の文字列表現にデコードします。
     *
     * @memberof xpl.StringUtils
     * @function decodeUTF8
     * @param {Array.<string>} ary - UTF-8の文字列
     * @returns {string} JavaScriptの文字列
     */
    ns.StringUtils.decodeUTF8 = function (ary) {
        let str = "";
        for (let i = 0; i < ary.length;) {
            // UTF-8からUnicodeへ変換
            let code = 0xff & ary[i];
            let remain = 0;

            if (code < 0x80) {
                // 7bit.
                remain = 0;
            } else if (code < 0xdf) {
                // 11bit.
                code = (0x1f & code) << 6;
                remain = 1;
            } else if (code < 0xef) {
                // 16bit.
                code = (0xf & code) << 12;
                remain = 2;
            } else if (code < 0xf7) {
                // 21bit.
                code = (0x7 & code) << 18;
                remain = 3;
            } else if (code < 0xfb) {
                // 26bit.
                code = (0x3 & code) << 24;
                remain = 4;
            } else if (code < 0xfd) {
                // 31bit.
                code = (0x1 & code) << 30;
                remain = 5;
            }
            i++;
            while (0 < remain && i < ary.length) {
                let c = ary[i];
                if (c < 0x80) {
                    break;
                }
                code |= (0x3f & c) << (6 * --remain);
                i++;
            }

            // UnicodeからUTF-8へ変換
            if (code < 0xd7ff || (0xe000 <= code && code <= 0xffff)) {
                // 1つのUTF-16のコードで1文字の場合
                str += String.fromCharCode(code);
            } else {
                // 2つのUTF-16のコードで1文字の場合
                str += String.fromCharCode(
                    0xd800 | (((code - 0x10000) >> 10) & 0x3ff),
                    0xdc00 | (code & 0x3ff));
            }
        }
        return str;
    };

})(xpl);
