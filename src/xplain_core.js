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
 * xPlainのネームスペースです。
 *
 * @namespace xpl
 */
var xpl = null;

if (typeof module == "object") {
    // Node.jsの場合
    xpl = module.exports;

} else if (typeof exports == "object") {
    // CommonJSの場合
    xpl = exports;
} else {
    // 直接的にリンクした場合
    xpl = {};
}

(function (xpl) {

    /**
     * 指定の変数が未定義かチェックします。
     * 指定の変数が未定義の場合は既定値を返し、そうでない場合は指定の値を返します。
     *
     * @param {*} value - チェックする値
     * @param {*} default_value - 既定値
     * @returns {*} チェック済みの値
     */
    xpl.defaultValue = function (value, default_value) {
        return value === undefined ? default_value : value;
    };

    /**
     * クラス継承をサポートするための処理を行います。
     * 処理内容としてクラスそのもののプロパティとプロトタイプのプロパティの複製を行い、コンストラクタにてスーパークラスの
     * コンストラクタを動作させるための __super をプロトタイプに追加します。
     *
     * @param {function} sub_class - サブクラス
     * @param {function} super_class - スーパークラス
     */
    xpl.classExtends = function (sub_class, super_class) {
        if (sub_class.prototype != null && super_class.prototype != null) {
            Object.setPrototypeOf(sub_class, super_class);
            Object.setPrototypeOf(sub_class.prototype, super_class.prototype);
            sub_class.prototype.__super = function () {
                super_class.apply(this, arguments);
            };
        }
    };

    /**
     * xPlainについての情報を収納するネームスペースです。
     *
     * @namespace xpl.about
     */
    xpl.about = {};

    Object.defineProperties(xpl.about, {

        /**
         * このライブラリの名前
         *
         * @memberof xpl.about
         * @const {string} NAME
         */
        NAME: {value: "xPlain for JavaScript"},

        /**
         * このライブラリのコードネーム
         *
         * @memberof xpl.about
         * @const {string} CODE_NAME
         */
        CODE_NAME: {value: "ORBIS"},

        /**
         * このライブラリの管理用の整数バージョン
         *
         * @memberof xpl.about
         * @const {number} VERSION_CODE
         */
        VERSION_CODE: {value: 2},

        /**
         * このライブラリの表示用の文字列バージョン
         *
         * @memberof xpl.about
         * @const {string} VERSION_NAME
         */
        VERSION_NAME: {value: "0.9.1"},

        /**
         * このライブラリの開発者
         *
         * @memberof xpl.about
         * @const {string[]} AUTHOR
         */
        AUTHOR: {value: ["Syuuhei Kuno"]},

        /**
         * このライブラリのコピーライト
         *
         * @memberof xpl.about
         * @const {string} COPYRIGHT
         */
        COPYRIGHT: {value: "Copyright (c) 2016, xPlain All rights reserved."},

        /**
         * このライブラリのライセンス
         *
         * @memberof xpl.about
         * @const {string} LICENSE
         */
        LICENSE: {value: "http://opensource.org/licenses/BSD-3-Clause"},

        /**
         * このライブラリのGitリポジトリURL
         *
         * @memberof xpl.about
         * @const {string} REPOSITORY
         */
        REPOSITORY: {value: "git@github.com:redlily/xplain_for_js.git"}
    });

    /**
     * ライブラリの情報を取得します。
     *
     * @returns {string} 情報
     */
    xpl.getAbout = function () {
        return xpl.about.NAME + "\n" +
            "Version code: " + xpl.about.VERSION_CODE + "\n" +
            "Version name: " + xpl.about.VERSION_NAME + "\n" +
            "Author: " + xpl.about.AUTHOR + "\n" +
            "Copyright: " + xpl.about.COPYRIGHT + "\n" +
            "License: " + xpl.about.LICENSE + "\n" +
            "Repository: " + xpl.about.REPOSITORY
    };

    /**
     * ライブラリの情報をコンソール上に表示します。
     *
     * @memberof xpl
     * @function printAbout
     */
    xpl.putAboutToStdout = function () {
        console.log(xpl.getAbout);
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
     * size_t型のクラスです。
     *
     * @augments xpl.size_t
     * @param {Object} value - 任意の数
     * @returns {xpl.size_t} 変換後の数値
     */
    xpl.Size = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * ptrdiff_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.ptrdiff_t} 変換後の数値
     */
    xpl.Ptrdiff = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * int8_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.int8_t} 変換後の数値
     */
    xpl.Int8 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 24) >> 24;
    };

    Object.defineProperties(xpl.Int8, {

        /**
         * 最小数値
         *
         * @memberof xpl.Int8
         * @const {xpl.int8_t} MIN_VALUE
         */
        "MIN_VALUE": {value: -Math.pow(2, 7)},

        /**
         * 最大数値
         *
         * @memberof xpl.Int8
         * @const {xpl.int8_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 7) - 1}
    });

    /**
     * uint8_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint8_t} 変換後の数値
     */
    xpl.Uint8 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 24) >>> 24;
    };

    Object.defineProperties(xpl.Uint8, {

        /**
         * 最小数値
         *
         * @memberof xpl.Uint8
         * @const {xpl.uint8_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @memberof xpl.Uint8
         * @const {xpl.uint8_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 8) - 1}
    });

    /**
     * int16_t型のクラスです。
     *
     * @augments xpl.int16_t
     * @param {Object} value - 任意の数
     * @returns {xpl.int16_t} 変換後の数値
     */
    xpl.Int16 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 16) >> 16;
    };

    Object.defineProperties(xpl.Int16, {

        /**
         * 最小数値
         *
         * @memberof xpl.Int16
         * @const {xpl.uint16_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @memberof xpl.Int16
         * @const {xpl.uint16_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 8) - 1}
    });

    /**
     * uint16_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint16_t} 変換後の数値
     */
    xpl.Uint16 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 16) >>> 16;
    };

    Object.defineProperties(xpl.Uint16, {

        /**
         * 最小数値
         *
         * @memberof xpl.Uint16
         * @const {xpl.int16_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @memberof xpl.Uint16
         * @const {xpl.uint16_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 16) - 1}
    });

    /**
     * int32_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.int32_t} 変換後の数値
     */
    xpl.Int32 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 0) >> 0;
    };

    Object.defineProperties(xpl.Int32, {

        /**
         * 最小数値
         *
         * @memberof xpl.Int32
         * @const {xpl.int32_t} MIN_VALUE
         */
        "MIN_VALUE": {value: -Math.pow(2, 31)},

        /**
         * 最大数値
         *
         * @memberof xpl.Int32
         * @const {xpl.int32_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 31) - 1}
    });

    /**
     * uint32_t型のクラスです。
     *
     * @augments Number
     * @param {Object} value - 任意の数
     * @returns {xpl.uint32_t} 変換後の数値
     */
    xpl.Uint32 = function (value) {
        return (Number.parseInt.apply(null, arguments) << 0) >>> 0;
    };

    Object.defineProperties(xpl.Uint32, {

        /**
         * 最小数値
         *
         * @memberof xpl.Uint32
         * @const {xpl.uint32_t} MIN_VALUE
         */
        "MIN_VALUE": {value: 0},

        /**
         * 最大数値
         *
         * @memberof xpl.Uint32
         * @const {xpl.uint32_t} MIN_VALUE
         */
        "MAX_VALUE": {value: Math.pow(2, 32) - 1}
    });

    /**
     * float32_t型のクラスです。
     *
     * @constructor
     * @augments Number
     * @param {Object} value - 任意の数値
     * @returns {xpl.float32_t} 変換後の数値
     */
    xpl.Float32 = function (value) {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * ハッシュ値を算出します。
     *
     * @param {xpl.float32_t} value - 任意の値値
     * @returns {string} ハッシュ値
     */
    xpl.Float32.hashCode = function (value) {
        workBuf.setFloat64(value);
        return workBuf.getUint32(0).toString(16);
    };

    /**
     * float64_t型のクラスです。
     *
     * @constructor
     * @augments xpl.float64_t
     * @param {Object} value - 任意の数値
     * @returns {xpl.float64_t} 変換後の数値
     */
    xpl.Float64 = function (value) {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * ハッシュ値を算出します。
     *
     * @param {xpl.float64_t} value - 任意の値
     * @returns {string} ハッシュ値
     */
    xpl.Float64.hashCode = function (value) {
        workBuf.setFloat64(value);
        return workBuf.getUint32(0).toString(16) + workBuf.getUint32(1).toString(16);
    };

    /**
     * 列挙型のクラスです。
     *
     * @constructor
     * @augments xpl.enum_t
     * @param {Object} value - 任意の数
     * @returns {xpl.enum_t} 変換後の数値
     */
    xpl.Enum = function (value) {
        return Number.parseInt.apply(null, arguments);
    };

})(xpl);
