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

/**
 * xPlainのネームスペースの定義です。
 *
 * @namespace xpl
 */
var xpl = null;
if (typeof module == "object") {
    // Node.jsの場合
    xpl = module.exports;
    xpl.running_type = "Node.js";

} else if (typeof exports == "object") {
    // CommonJSの場合
    xpl = exports;
    xpl.running_type = "CommonJS";
} else {
    // 直接的にリンクした場合
    xpl = {};
    xpl.running_type = "Direct Link"
}

/**
 * 指定の変数が未定義かチェックする。
 * 指定の変数が未定義の場合は既定値を返し、そうでない場合は指定の値を返します。
 *
 * @param {*} val - チェックする値
 * @param {*} defVal - 既定値
 * @returns {*} チェック済みの値
 */
function ns.defaultValue(val, defVal) {
    return val === undefined ? defVal : val;
}

(function (ns) {

    /**
     *
     * 指定の変数が未定義かチェックする。
     * 指定の変数が未定義の場合は既定値を返し、そうでない場合は指定の値を返します。
     * 
     * @param {*} value - チェックする値
     * @param {*} default_value - 既定値
     * @returns {*} チェック済みの値
     */
    ns.defaultValue = function (value, default_value) {
        return value === undefined ? default_value : value;
    };

    //noinspection JSValidateTypes
    Object.defineProperties(ns, {

        /**
         * Node.jsで動作している場合の識別子
         *
         * @const
         * @memberof xpl
         * @member {string} RUNTYPE_NODE_JS
         */
        "RUNTYPE_NODE_JS": {value: "Node.js"},

        /**
         * CommonJSで動作している場合の識別子
         *
         * @constant
         * @memberof xpl
         * @member {string} RUNTYPE_COMMON_JS
         */
        "RUNTYPE_COMMON_JS": {value: "CommonJS"},

        /**
         * 直接的なリンクで動作している場合の識別子
         *
         * @constant
         * @memberof xpl
         * @member {string} RUNTYPE_DIRECT_LINK
         */
        "RUNTYPE_DIRECT_LINK": {value: "Direct Link"}
    });

    /**
     * xPlainについての情報
     *
     * @namespace xpl.about
     */
    ns.about = {};

    //noinspection JSValidateTypes
    Object.defineProperties(ns.about, {

        /**
         * このライブラリの名前
         *
         * @constant
         * @memberof xpl.about
         * @member {string} NAME
         */
        "NAME": {value: "xPlain for JavaScript"},

        /**
         * このライブラリのコードネーム
         *
         * @constant
         * @memberof xpl.about
         * @member {string} CODE_NAME
         */
        "CODE_NAME": {value: "ORBIS"},

        /**
         * このライブラリの管理用の整数バージョン
         *
         * @constant
         * @memberof xpl.about
         * @member {number} VERSION_CODE
         */
        "VERSION_CODE": {value: 1},

        /**
         * このライブラリの表示用の文字列バージョン
         *
         * @constant
         * @memberof xpl.about
         * @member {string} VERSION_NAME
         */
        "VERSION_NAME": {value: "0.9.0"},

        /**
         * このライブラリの開発者
         *
         * @constant
         * @memberof xpl.about
         * @member {Array.<string>} AUTHOR
         */
        "AUTHOR": {
            value: ["Syuuhei Kuno"]
        },

        /**
         * このライブラリのコピーライト
         *
         * @constant
         * @memberof xpl.about
         * @member {string} COPYRIGHT
         */
        "COPYRIGHT": {value: "Copyright (c) 2016, xPlain All rights reserved."},

        /**
         * このライブラリのライセンス
         *
         * @constant
         * @memberof xpl.about
         * @member {string} LICENSE
         */
        "LICENSE": {value: "http://opensource.org/licenses/BSD-3-Clause"},

        /**
         * このライブラリのGitリポジトリURL
         *
         * @constant
         * @memberof xpl.about
         * @member {string} REPOSITORY
         */
        "REPOSITORY": {value: "git@github.com:redlily/xplain_for_js.git"}
    });

    /**
     * ライブラリの情報を取得します。
     *
     * @memberof xpl
     * @function getAbout
     * @returns {string} - 情報
     */
    ns.getAbout = function () {
        return ns.about.NAME + "\n" +
            "Version code: " + ns.about.VERSION_CODE + "\n" +
            "Version name: " + ns.about.VERSION_NAME + "\n" +
            "Author: " + ns.about.AUTHOR + "\n" +
            "Copyright: " + ns.about.COPYRIGHT + "\n" +
            "License: " + ns.about.LICENSE + "\n" +
            "Repository: " + ns.about.REPOSITORY
    };

    /**
     * ライブラリの情報をコンソール上に表示します。
     *
     * @memberof xpl
     * @function printAbout
     */
    ns.putAboutToStdout = function () {
        console.log(ns.getAbout);
    };

    // 作業用バッファ
    let workBuf = new DataView(new ArrayBuffer(8));

    // JsDoc用の型定義

    /**
     * @typedef {number} xpl.size_t
     * @typedef {number} xpl.ptrdiff_t
     * @typedef {number} xpl.int8_t
     * @typedef {number} xpl.uint8_t
     * @typedef {number} xpl.int16_t
     * @typedef {number} xpl.uint16_t
     * @typedef {number} xpl.int32_t
     * @typedef {number} xpl.uint32_t
     * @typedef {number} xpl.float32_t
     * @typedef {number} xpl.float64_t
     * @typedef {number} xpl.enum_t
     */

    /**
     * size_t型のクラス
     *
     * @class
     * @alias xpl.size_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.size_t} 変換後の数値
     */
    ns.size_t = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * ptrdiff_t型のクラス
     *
     * @class
     * @alias xpl.ptrdiff_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.ptrdiff_t} 変換後の数値
     */
    ns.ptrdiff_t = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * int8_t型のクラス
     *
     * @class
     * @alias xpl.int8_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.int8_t} 変換後の数値
     */
    ns.int8_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 24) >> 24;
    };

    //noinspection JSValidateTypes
    Object.defineProperties(ns.int8_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.int8_t
         * @member {xpl.int8_t} MIN_VALUE
         */
        "MIN_VALUE": {value: -Math.pow(2, 7)},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.int8_t
         * @member {xpl.int8_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 7) - 1}
    });

    /**
     * uint8_t型のクラス
     *
     * @class
     * @alias xpl.uint8_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint8_t} 変換後の数値
     */
    ns.uint8_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 24) >>> 24;
    };

    Object.defineProperties(ns.uint8_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.uint8_t
         * @member {xpl.uint8_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.uint8_t
         * @member {xpl.uint8_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 8) - 1}
    });

    /**
     * int16_t型のクラス
     *
     * @class
     * @alias xpl.int16_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.int32_t} 変換後の数値
     */
    ns.int16_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 16) >> 16;
    };

    Object.defineProperties(ns.int16_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.uint16_t
         * @member {xpl.uint16_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.uint16_t
         * @member {xpl.uint16_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 8) - 1}
    });

    /**
     * uint16_t型のクラス
     *
     * @class
     * @alias xpl.uint16_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint16_t} 変換後の数値
     */
    ns.uint16_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 16) >>> 16;
    };

    Object.defineProperties(ns.uint16_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.uint16_t
         * @member {xpl.int16_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.uint16_t
         * @member {xpl.uint16_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 16) - 1}
    });

    /**
     * int32_t型のクラス
     *
     * @class
     * @alias xpl.int32_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.int32_t} 変換後の数値
     */
    ns.int32_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 0) >> 0;
    };

    Object.defineProperties(ns.int32_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.int32_t
         * @member {xpl.int32_t} MIN_VALUE
         */
        "MIN_VALUE": {value: -Math.pow(2, 31)},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.int32_t
         * @member {xpl.int32_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 31) - 1}
    });

    /**
     * uint32_t型のクラス
     *
     * @class
     * @alias xpl.uint32_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint32_t} 変換後の数値
     */
    ns.uint32_t = function (value) {
        return (Number.parseInt.apply(null, arguments) << 0) >>> 0;
    };

    Object.defineProperties(ns.uint32_t, {

        /**
         * 最小数値
         *
         * @constant
         * @memberof xpl.uint32_t
         * @member {xpl.uint32_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @constant
         * @memberof xpl.uint32_t
         * @member {xpl.uint32_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 32) - 1}
    });

    /**
     * float32_t型のクラス
     *
     * @class
     * @alias xpl.float32_t
     * @augments Number
     * @param {Object} value - 任意の数値
     * @returns {xpl.float32_t} 変換後の数値
     */
    ns.float32_t = function (value) {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * ハッシュ値を算出します。
     *
     * @memberof xpl.float64_t
     * @function hashCode
     * @param {xpl.float32_t} value - The value.
     * @return {string} ハッシュコード
     */
    ns.float32_t.hashCode = function (value) {
        workBuf.setFloat64(value);
        return workBuf.getUint32(0).toString(16);
    };

    /**
     * float64_t型のクラス
     *
     * @class
     * @alias xpl.float64_t
     * @augments Number
     * @param {Object} value - 任意の数値
     * @returns {xpl.float64_t} 変換後の数値
     */
    ns.float64_t = function (value) {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * ハッシュ値を算出します。
     *
     * @memberof xpl.float64_t
     * @function hashCode
     * @param {xpl.float64_t} value - The value.
     * @return {string} ハッシュコード
     */
    ns.float64_t.hashCode = function (value) {
        workBuf.setFloat64(value);
        return workBuf.getUint32(0).toString(16) + workBuf.getUint32(1).toString(16);
    };

    /**
     * 列挙型のクラス
     *
     * @class
     * @alias xpl.enum_t
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.enum_t} 変換後の数値
     */
    ns.enum_t = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

})(xpl);
