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
     * @class
     * @alias xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - 構造種別
     */
    ns.XModelStructure = function (structure_type) {

        /**
         * enum_t : 構造種別
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} structure_type
         */
        this.structure_type = structure_type;

        /**
         * uint32_t : 識別子
         *
         * @private
         * @instance
         * @memberof xpl.XModelStructure
         * @member {xpl.uint32_t} identifier
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
     * このメソッドのインスタンスと引数で指定されたインスタンスが同じものかを調べます。
     *
     * @instance
     * @memberof xpl.XModelStructure
     * @function equals
     * @param {xpl.XModelStructure} other - 対象のインスタンス
     * @returns {Boolean} 比較の結果
     */
    ns.XModelStructure.prototype.equals = function (other) {
        return this == other;
    };

    Object.defineProperties(ns.XModelStructure, {

        /**
         * 未定義の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_UNDEFINED
         */
        "TYPE_UNDEFINED": {value: -1},

        /**
         * 空の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_NULL
         */
        "TYPE_NULL": {value: 0},

        /**
         * 軸回転の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_AXIS_ROTATE
         */
        "TYPE_AXIS_ROTATE": {value: 1},

        /**
         * 四元数の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_QUATERNION
         */
        "TYPE_QUATERNION": {value: 2},

        /**
         * 拡大の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_SCALE
         */
        "TYPE_SCALE": {value: 3},

        /**
         * 平行移動の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_TRANSLATE
         */
        "TYPE_TRANSLATE": {value: 4},

        /**
         * 行列の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MATRIX
         */
        "TYPE_MATRIX": {value: 5},

        /**
         * コンテナの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_CONTAINER
         */
        "TYPE_CONTAINER": {value: 6},

        /**
         * テクスチャの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_TEXTURE
         */
        "TYPE_TEXTURE": {value: 7},

        /**
         * 材質の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MATERIAL
         */
        "TYPE_MATERIAL": {value: 8},

        /**
         * メッシュの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MESH
         */
        "TYPE_MESH": {value: 9},

        /**
         * メッシュのサブセットの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MESH_SUBSET
         */
        "TYPE_MESH_SUBSET": {value: 15},

        /**
         * ノードの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_NODE
         */
        "TYPE_NODE": {value: 10},

        /**
         * 逆運動学の構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_IK
         */
        "TYPE_IK": {value: 11},

        /**
         * アニメーションの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION
         */
        "TYPE_ANIMATION": {value: 12},

        /**
         * アニメーションキーの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION_KEY
         */
        "TYPE_ANIMATION_KEY": {value: 13},

        /**
         * アニメーションセットの構造種別
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION_SET
         */
        "TYPE_ANIMATION_SET": {value: 14},

        /**
         * RGBAのパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_RGBA
         */
        "SIZE_RGBA": {value: 4},

        /**
         * 3次元ベクトルのパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_VECTOR_3
         */
        "SIZE_VECTOR_3": {value: 3},

        /**
         * 軸回転のパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_AXIS_ROTATE
         */
        "SIZE_AXIS_ROTATE": {value: 4},

        /**
         * 四元数のパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_QUATERNION
         */
        "SIZE_QUATERNION": {value: 4},

        /**
         * 拡大のパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_SCALE
         */
        "SIZE_SCALE": {value: 3},

        /**
         * 平行移動のパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_TRANSLATE
         */
        "SIZE_TRANSLATE": {value: 3},

        /**
         * 行列のパラメータのサイズ
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_MATRIX
         */
        "SIZE_MATRIX": {value: 16},

        /**
         * ブレンドのためのスロットの数
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} NUM_BLEND_SLOT
         */
        "NUM_BLEND_SLOT": {value: 2}
    });

})(xpl);

(function (ns) {

    "use strict";

    /**
     * ユーザ定義のデータ構造です。
     *
     * @class
     * @alias xpl.XModelUserData
     */
    ns.XModelUserData = function () {

        /**
         * uint32_t : データサイズ
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @member {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * uint8_t[data_size] : データ
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @member {Uint8Array} data
         */
        this.data = null;
    };

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 拡張可能な基礎構造です。
     *
     * @class
     * @alias xpl.XModelExtensible
     * @augments xpl.XModelStructure
     */
    ns.XModelExtensible = function (structure_type) {
        ns.XModelStructure.call(this, structure_type);

        /**
         * XModelUserData : ユーザ定義のデータ
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @member {xpl.XModelUserData} user_data
         */
        this.user_data = null;

        // 作業変数

        /**
         * Object : ユーザ定義の一時オブジェクト
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @member {Object} user_object
         */
        this.user_object = null
    };

    Object.setPrototypeOf(ns.XModelExtensible.prototype, ns.XModelStructure.prototype);

})(xpl);
