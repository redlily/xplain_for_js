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
     * xModelのインスタンスを判別するための識別子
     *
     * @private
     * @memberof xpl.XModelStructure
     * @member {xpl.uint32_t} identifier_counter
     */
    var identifier_counter = 1;

    /**
     * xModelの構造の基礎となる構造です。
     *
     * @constructor
     * @param {xpl.uint32_t} structure_type - 構造種別
     */
    xpl.XModelStructure = function (structure_type) {


        /**
         * uint32_t : 構造種別
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} structure_type
         */
        this.structure_type = structure_type;

        /**
         * uint32_t : 識別子
         *
         * @private
         * @instance
         * @memberof xpl.XModelStructure
         * @const {xpl.uint32_t} identifier
         */
        var identifier = identifier_counter++;

        /**
         * 識別子を取得します。
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @function valueOf
         * @returns {xpl.uint32_t} 識別子
         */
        this.valueOf = function () {
            return identifier;
        };

        /**
         * ハッシュ値を取得します。
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @function hashCode
         * @returns {xpl.uint32_t} ハッシュ値
         */
        this.hashCode = function () {
            return identifier;
        };
    };

    /**
     * このインスタンスと引数で指定されたインスタンスが同じものかを調べます。
     *
     * @instance
     * @memberof xpl.XModelStructure
     * @function equals
     * @param {xpl.XModelStructure} other - 対象のインスタンス
     * @returns {Boolean} 比較の結果
     */
    xpl.XModelStructure.prototype.equals = function (other) {
        return this == other;
    };

    Object.defineProperties(xpl.XModelStructure, {

        /**
         * 未定義の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_UNDEFINED
         */
        TYPE_UNDEFINED: {value: -1},

        /**
         * 空の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_NULL
         */
        TYPE_NULL: {value: 0},

        /**
         * 軸回転の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_AXIS_ROTATE
         */
        TYPE_AXIS_ROTATE: {value: 1},

        /**
         * 四元数の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_QUATERNION
         */
        TYPE_QUATERNION: {value: 2},

        /**
         * 拡大の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_SCALE
         */
        TYPE_SCALE: {value: 3},

        /**
         * 平行移動の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_TRANSLATE
         */
        TYPE_TRANSLATE: {value: 4},

        /**
         * 行列の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_MATRIX
         */
        TYPE_MATRIX: {value: 5},

        /**
         * コンテナの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_CONTAINER
         */
        TYPE_CONTAINER: {value: 6},

        /**
         * テクスチャの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_TEXTURE
         */
        TYPE_TEXTURE: {value: 7},

        /**
         * 材質の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_MATERIAL
         */
        TYPE_MATERIAL: {value: 8},

        /**
         * メッシュの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_MESH
         */
        TYPE_MESH: {value: 9},

        /**
         * ノードの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_NODE
         */
        TYPE_NODE: {value: 10},

        /**
         * 逆運動学の構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_IK
         */
        TYPE_IK: {value: 11},

        /**
         * アニメーションの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_ANIMATION
         */
        TYPE_ANIMATION: {value: 12},

        /**
         * アニメーションキーの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_ANIMATION_KEY
         */
        TYPE_ANIMATION_KEY: {value: 13},

        /**
         * アニメーションセットの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_ANIMATION_SET
         */
        TYPE_ANIMATION_SET: {value: 14},

        /**
         * RGBAのパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_RGBA
         */
        SIZE_RGBA: {value: 4},

        /**
         * 3次元ベクトルのパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_VECTOR_3
         */
        SIZE_VECTOR_3: {value: 3},

        /**
         * 軸回転のパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_AXIS_ROTATE
         */
        SIZE_AXIS_ROTATE: {value: 4},

        /**
         * 四元数のパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_QUATERNION
         */
        SIZE_QUATERNION: {value: 4},

        /**
         * 拡大のパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_SCALE
         */
        SIZE_SCALE: {value: 3},

        /**
         * 平行移動のパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_TRANSLATE
         */
        SIZE_TRANSLATE: {value: 3},

        /**
         * 行列のパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_MATRIX
         */
        SIZE_MATRIX: {value: 16},

        /**
         * ブレンドのためのスロットの数
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} NUM_BLEND_SLOT
         */
        NUM_BLEND_SLOT: {value: 4}
    });

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * ユーザ定義のデータ構造です。
     *
     * @constructor
     */
    xpl.XModelUserData = function () {

        /**
         * uint32_t : バイナリデータサイズ
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @var {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * uint8_t[data_size] : バイナリデータ
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @var {Uint8Array} data
         */
        this.data = null;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * パラメータ構造の基礎構造です。
     *
     * @class
     * @alias xpl.XModelParameter
     * @augments xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - 構造種別
     */
    xpl.XModelParameter = function (structure_type) {
        __super(this, structure_type);
    };

    xpl.classExtends(xpl.XModelParameter, xpl.XModelStructure);

})(xpl);

(function (xpl) {

    // TODO: アニメーションで動的に変更される構造は、この構造を基底構造に変更する。

    "use strict";

    /**
     * 32bitの浮動小数点数型の配列の構造です。
     *
     * @constructor
     * @augments xpl.XModelParameter
     * @param {xpl.enum_t} structure_type - 構造種別
     * @param {xpl.size_t} size - float配列の
     */
    xpl.XModelFloat32Array = function (structure_type, size) {
        xpl.XModelStructure.call(this, structure_type);
        size = xpl.defaultValue(size, 0);

        /**
         * 数値のサイズ
         *
         * @instanceof
         * @memberof xpl.XModelFloat32Array
         * @var {xpl.size_t} size
         */
        this.size = size;

        /**
         * float32_t[size * (NUM_BLEND_SLOT + 1)] : 数値の配列
         *
         * @instanceof
         * @memberof xpl.XModelFloat32Array
         * @var {Float32Array} values
         */
        this.values = new Float32Array(size * (xpl.XModelStructure.NUM_BLEND_SLOT + 1));
    };

    Object.setPrototypeOf(xpl.XModelFloat32Array.prototype, xpl.XModelParameter.prototype);

})(xpl);

(function (ns) {

    "use strict";

    // TODO: そのうち削除する。

    /**
     * 変換構造の基礎構造です。
     *
     * @class
     * @alias xpl.XModelTransform
     * @augments xpl.XModelParameter
     * @param {xpl.enum_t} structure_type - 構造種別
     */
    ns.XModelTransform = function (structure_type) {
        ns.XModelStructure.call(this, structure_type);
    };

    Object.setPrototypeOf(ns.XModelTransform.prototype, ns.XModelParameter.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 軸回転の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelTransform
     */
    xpl.XModelAxisRotate = function () {
        xpl.XModelTransform.call(this, xpl.XModelStructure.TYPE_AXIS_ROTATE);

        /**
         * float32_t[SIZE_AXIS_ROTATE] : 初期値
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @var {Float32Array} initial
         */
        this.initial = new Float32Array([0.0, 0.0, 0.0, 1.0]);

        // 作業変数

        /**
         * float32_t[SIZE_AXIS_ROTATE * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @var {Float32Array} value
         */
        this.value = new Float32Array([
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(xpl.XModelAxisRotate.prototype, xpl.XModelTransform.prototype);

    Object.defineProperties(xpl.XModelStructure, {

        /**
         * 回転角度
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} ANGLE
         */
        ANGLE: {value: 0},

        /**
         * 軸ベクトルのX要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} X
         */
        X: {value: 1},

        /**
         * 軸ベクトルのY要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} Y
         */
        Y: {value: 2},

        /**
         * 軸ベクトルのZ要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} Z
         */
        Z: {value: 3},

        /**
         * 配列のサイズ
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.size_t} SIZE
         */
        SIZE: {value: 4}
    });

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 四元数の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelTransform
     */
    xpl.XModelQuaternion = function () {
        xpl.XModelTransform.call(this, xpl.XModelStructure.TYPE_QUATERNION);

        /**
         * float32_t[SIZE_MATRIX] : 初期値
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @var {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 0.0, 0.0, 0.0]);

        // 作業変数

        /**
         * float32_t[SIZE_MATRIX * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @var {Float32Array} value
         */
        this.value = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0]);
    };

    Object.setPrototypeOf(xpl.XModelQuaternion.prototype, xpl.XModelTransform.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 拡大の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelTransform
     */
    ns.XModelScale = function () {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_SCALE);

        /**
         * float32_t[SIZE_SCALE] : 初期値
         *
         * @instance
         * @memberof xpl.XModelScale
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 1.0, 1.0]);

        // 作業変数

        /**
         * float32_t[SIZE_SCALE * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelScale
         * @member {Float32Array} value
         */
        this.value = new Float32Array([
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelScale.prototype, ns.XModelTransform.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 平行移動の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelTransform
     */
    ns.XModelTranslate = function () {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_TRANSLATE);

        /**
         * float32_t[SIZE_TRANSLATE] : 初期値
         *
         * @instance
         * @memberof xpl.XModelTranslate
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([0.0, 0.0, 0.0]);

        // 作業変数

        /**
         * float32_t[SIZE_TRANSLATE * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelTranslate
         * @member {Float32Array} value
         */
        this.value = new Float32Array([
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0]);
    };

    Object.setPrototypeOf(ns.XModelTranslate.prototype, ns.XModelTransform.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 行列の変換構造です。
     *
     * @class
     * @alias xpl.XModelMatrix
     * @augments xpl.XModelTransform
     */
    ns.XModelMatrix = function () {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_MATRIX);

        /**
         * float32_t[SIZE_MATRIX] : 初期値
         *
         * @instance
         * @memberof xpl.XModelMatrix
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0]);

        // 作業変数

        /**
         * float32_t[SIZE_MATRIX * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelMatrix
         * @member {Float32Array} value
         */
        this.value = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelMatrix.prototype, ns.XModelTransform.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 拡張可能な基礎構造です。
     *
     * @constructor
     * @augments xpl.XModelStructure
     * @param {xpl.uint32_t} structure_type - 構造種別
     */
    xpl.XModelExtensible = function (structure_type) {
        xpl.XModelStructure.call(this, structure_type);

        /**
         * XModelUserData : ユーザ定義のデータ
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @var {xpl.XModelUserData} user_data
         */
        this.user_data = null;

        // 作業変数

        /**
         * Object : ユーザ定義の一時オブジェクト
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @var {Object} user_object
         */
        this.user_object = null
    };

    Object.setPrototypeOf(xpl.XModelExtensible.prototype, xpl.XModelStructure.prototype);

})(xpl);
