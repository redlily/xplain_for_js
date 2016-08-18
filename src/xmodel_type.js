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
     * xModelのインスタンスを判別するための識別子カウンタ
     *
     * @private
     * @memberof xpl.XModelStructure
     * @member {xpl.uint32_t} identifier_counter
     */
    var identifier_counter = 1;

    /**
     * xModelの基礎構造です。
     *
     * @constructor
     * @param {xpl.uint32_t} structure_type - 構造種別
     */
    xpl.XModelStructure = function (structure_type) {

        /**
         * uint32_t : 構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.uint32_t} structure_type
         */
        this.structure_type = structure_type;

        /**
         * uint32_t : 識別子
         *
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
         * @returns {xpl.uint32_t} ハッシュ値
         */
        this.hashCode = function () {
            return identifier;
        };
    };

    /**
     * この構造と引数で指定する構造が同じものかを調べます。
     *
     * @instance
     * @param {xpl.XModelStructure} other - 指定の構造
     * @returns {boolean} 同じ構造かどうか
     */
    xpl.XModelStructure.prototype.equals = function (other) {
        return this === other;
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
         * RGBの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_RGB
         */
        TYPE_RGB: {value: 16},

        /**
         * RGBAの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum_t} TYPE_RBGA
         */
        TYPE_RGBA: {value: 17},

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
         * サブメッシュの構造種別
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.enum} TYPE_SUB_MESH
         */
        TYPE_SUB_MESH: {value: 15},

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
         * シングルパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_SINGLE
         */
        SIZE_SINGLE: {value: 1},

        /**
         * RGBのパラメータのサイズ
         *
         * @memberof xpl.XModelStructure
         * @const {xpl.size_t} SIZE_RGB
         */
        SIZE_RGB: {value: 3},

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

(function (xpl) {

    "use strict";

    /**
     * パラメータを格納するための基礎構造です。
     *
     * @constructor
     * @augments xpl.XModelStructure
     * @param {xpl.uint32_t} structure_type - 構造種別
     */
    xpl.XModelParameter = function (structure_type) {
        xpl.XModelStructure.call(this, structure_type);
    };

    Object.setPrototypeOf(xpl.XModelParameter.prototype, xpl.XModelStructure.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 32ビットの浮動小数点数型の配列構造です。
     *
     * @constructor
     * @augments xpl.XModelParameter
     * @param {xpl.uint32_t} structure_type - 構造種別
     * @param {xpl.size_t} size - 配列のサイズ
     */
    xpl.XModelFloat32Array = function (structure_type, size) {
        xpl.XModelStructure.call(this, structure_type);

        /**
         * 値の配列のサイズ
         *
         * @instanceof
         * @memberof xpl.XModelFloat32Array
         * @member {xpl.size_t} size
         */
        this.size = size;

        /**
         * float32_t[size * (NUM_BLEND_SLOT + 1)] : 値の配列
         *
         * @instanceof
         * @memberof xpl.XModelFloat32Array
         * @member {Float32Array} values
         */
        this.values = new Float32Array(size * (xpl.XModelStructure.NUM_BLEND_SLOT + 1));
    };

    Object.setPrototypeOf(xpl.XModelFloat32Array.prototype, xpl.XModelParameter.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 軸回転の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelFloat32Array
     */
    xpl.XModelAxisRotate = function () {
        xpl.XModelFloat32Array.call(this, xpl.XModelStructure.TYPE_AXIS_ROTATE, xpl.XModelStructure.SIZE_AXIS_ROTATE);
    };

    Object.setPrototypeOf(xpl.XModelAxisRotate.prototype, xpl.XModelFloat32Array.prototype);

    Object.defineProperties(xpl.XModelStructure, {

        /**
         * 軸ベクトルのX要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} X
         */
        X: {value: 0},

        /**
         * 軸ベクトルのY要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} Y
         */
        Y: {value: 1},

        /**
         * 軸ベクトルのZ要素
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} Z
         */
        Z: {value: 2},

        /**
         * 回転角度
         *
         * @memberof xpl.XModelAxisRotate
         * @const {xpl.enum_t} ANGLE
         */
        ANGLE: {value: 3},

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
     * @augments xpl.XModelFloat32Array
     */
    xpl.XModelQuaternion = function () {
        xpl.XModelFloat32Array.call(this, xpl.XModelStructure.TYPE_QUATERNION, xpl.XModelStructure.SIZE_QUATERNION);
    };

    Object.setPrototypeOf(xpl.XModelQuaternion.prototype, xpl.XModelFloat32Array.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 拡大の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelFloat32Array
     */
    ns.XModelScale = function () {
        ns.XModelFloat32Array.call(this, ns.XModelStructure.TYPE_SCALE, xpl.XModelStructure.SIZE_SCALE);
    };

    Object.setPrototypeOf(ns.XModelScale.prototype, ns.XModelFloat32Array.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 平行移動の変換構造です。
     *
     * @constructor
     * @augments xpl.XModelFloat32Array
     */
    xpl.XModelTranslate = function () {
        xpl.XModelFloat32Array.call(this, xpl.XModelStructure.TYPE_TRANSLATE, xpl.XModelStructure.SIZE_TRANSLATE);
    };

    Object.setPrototypeOf(xpl.XModelTranslate.prototype, xpl.XModelFloat32Array.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 行列の変換構造です。
     *
     * @class
     * @alias xpl.XModelMatrix
     * @augments xpl.XModelFloat32Array
     */
    xpl.XModelMatrix = function () {
        xpl.XModelFloat32Array.call(this, xpl.XModelStructure.TYPE_MATRIX, xpl.XModelStructure.SIZE_MATRIX);
    };

    Object.setPrototypeOf(xpl.XModelMatrix.prototype, xpl.XModelFloat32Array.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 拡張可能な構造です。
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
         * @member {xpl.XModelUserData} user_data
         */
        this.user_data = null;

        // 作業変数

        /**
         * void* : ユーザ定義のオブジェクト
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @member {Object} user_object
         */
        this.user_object = null
    };

    Object.setPrototypeOf(xpl.XModelExtensible.prototype, xpl.XModelStructure.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * コンテナの構造です。
     *
     * @constructor
     * @augments xpl.XModelExtensible
     */
    ns.XModelContainer = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_CONTAINER);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {string} name
         */
        this.name = null;

        /**
         * uint16_t : テクスチャの数
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_textures
         */
        this.num_textures = 0;

        /**
         * XModelTexture[num_textures] : テクスチャの配列
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.XModelTexture[]} textures
         */
        this.textures = null;

        /**
         * uint16_t : 材質の数
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_materials
         */
        this.num_materials = 0;

        /**
         * XModelMaterial[num_materials] : 材質の配列
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.XModelMaterial[]} materials
         */
        this.materials = null;

        /**
         * uint16_t : メッシュの数
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0;

        /**
         * XModelMesh[num_meshes] : メッシュの配列
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.XModelMesh[]} meths
         */
        this.meshes = null;

        /**
         * uint16_t : ノードの数
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNode[num_nodes] : ノードの配列
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.XModelNode[]} node
         */
        this.nodes = null;

        /**
         * float64_t : 秒間比
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.float64_t} time_rate
         */
        this.time_rate = 1.0;

        /**
         * uint16_t : アニメーションセットの数
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_animation_sets
         */
        this.num_animation_sets = 0;

        /**
         * XModelAnimationSet[num_animation_sets] : アニメーションセットの配列
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.XModelAnimationSet[]} animation_sets
         */
        this.animation_sets = null;
    };

    Object.setPrototypeOf(ns.XModelContainer.prototype, ns.XModelExtensible.prototype);

    /**
     * コンテナの名前を取得します。
     *
     * @instance
     * @returns {string} The name of this container.
     */
    ns.XModelContainer.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * テクスチャの構造です。
     *
     * @constructor
     * @augments xpl.XModelExtensible
     */
    xpl.XModelTexture = function () {
        xpl.XModelExtensible.call(this, xpl.XModelStructure.TYPE_TEXTURE);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {string} name
         */
        this.name = null;

        /**
         * string : 参照名
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {string} ref
         */
        this.ref = null;

        /**
         * uint32_t : バイナリデータのサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * uint8_t[data_size] : バイナリデータ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Uint8Array} data
         */
        this.data = null;

        // 作業変数

        /**
         * Object : インスタンス
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Object} texture
         */
        this.texture = null;

        /**
         * uint32_t : X軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} x_size
         */

        this.x_size = 0;
        /**
         * uint32_t : Y軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} y_size
         */

        this.y_size = 0;

        /**
         * uint32_t : Z軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} z_size
         */
        this.z_size = 0;
    };

    Object.setPrototypeOf(xpl.XModelTexture.prototype, xpl.XModelExtensible.prototype);

    /**
     * この構造と引数で指定する構造が同じものかを調べます。
     *
     * @instance
     * @param {xpl.XModelStructure} other - 指定の構造
     * @returns {boolean} 同じ構造かどうか
     */
    xpl.XModelTexture.prototype.equals = function (other) {

    };

    /**
     * テクスチャの名前を取得します。
     *
     * @instance
     * @returns {string} テクスチャ名
     */
    xpl.XModelTexture.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 材質の構造です。
     *
     * @class
     * @alias xpl.XModelMaterial
     * @augments xpl.XModelExtensible
     */
    xpl.XModelMaterial = function () {
        xpl.XModelExtensible.call(this, xpl.XModelStructure.TYPE_MATERIAL);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {string} name
         */
        this.name = null;

        /**
         * float32_t[SIZE_RGBA] : 発光色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} emissive
         */
        this.emissive = [0.0, 0.0, 0.0, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 環境光の反射色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} ambient
         */
        this.ambient = [0.1, 0.1, 0.1, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 拡散反射の色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} diffuse
         */
        this.diffuse = [1.0, 1.0, 1.0, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 鏡面反射の色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} specular
         */
        this.specular = [0.4, 0.4, 0.4, 1.0];

        /**
         * float32_t : 鏡面反射の度合
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.float32_t} shininess
         */
        this.shininess = 5.0;

        /**
         * float32_t : バンプマップの度合
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.float32_t} bump
         */
        this.bump = 1.0;

        /**
         * XModelTexture : 発行色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} emissive_map
         */
        this.emissive_map = null;

        /**
         * XModelTexture : 環境光の反射色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} ambient_map
         */
        this.ambient_map = null;

        /**
         * XModelTexture : 拡散反射の色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} diffuse_map
         */
        this.diffuse_map = null;

        /**
         * XModelTexture : 鏡面反射の色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture}specular_map
         */
        this.specular_map = null;

        /**
         * XModelTexture : 鏡面反射の度合のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} shininess_map
         */
        this.shininess_map = null;

        /**
         * XModelTexture : バンプマップの度合のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} bump_map
         */
        this.bump_map = null;

        /**
         * uint32_t : 描画モードのフラグ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} draw_mode
         */
        this.draw_mode = xpl.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS;
    };

    Object.setPrototypeOf(xpl.XModelMaterial.prototype, xpl.XModelExtensible.prototype);

    Object.defineProperties(xpl.XModelMaterial, {

        /**
         * 描画なしの描画モード
         *
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_NONE_BITS
         */
        DRAW_MODE_FACE_NONE_BITS: {value: 0},

        /**
         * 表面描画のモード
         *
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_FRONT_BITS
         */
        DRAW_MODE_FACE_FRONT_BITS: {value: 0x1 << 0},

        /**
         * 裏面描画の描画モード
         *
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_BACK_BITS
         */
        DRAW_MODE_FACE_BACK_BITS: {value: 0x1 << 1},

        /**
         * 両面描画の描画モード
         *
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_FRONT_AND_BACK_BITS
         */
        DRAW_MODE_FACE_FRONT_AND_BACK_BITS: {
            value: xpl.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS |
            xpl.XModelMaterial.DRAW_MODE_FACE_BACK_BITS
        }
    });

    /**
     * マテリアルの名前を取得します。
     *
     * @instance
     * @returns {string} マテリアル名
     */
    xpl.XModelMaterial.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * メッシュの基礎構造です。
     *
     * @constructor
     * @augments xpl.XModelStructure
     * @param {xpl.uint32_t} structure_type - 構造種別
     */
    xpl.XModelMeshBase = function (structure_type) {
        xpl.XModelExtensible.call(this, structure_type);

        // 作業変数

        /**
         * void* : 頂点バッファのオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_buffer
         */
        this.vertex_buffer = null;

        /**
         * void* : 頂点配列のオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_array.
         */
        this.vertex_array = null;

        /**
         * void* : 要素バッファのオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} element_buffer
         */
        this.element_buffer = null;
    };

    Object.setPrototypeOf(xpl.XModelMeshBase.prototype, xpl.XModelExtensible.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * メッシュ構造です。
     *
     * @constructor
     * @augments xpl.XModelMeshBase
     */
    xpl.XModelMesh = function () {
        xpl.XModelMeshBase.call(this, xpl.XModelStructure.TYPE_MESH);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {string} name
         */
        this.name = null;

        /**
         * uint32_t : 位置の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_positions
         */
        this.num_positions = 0;

        /**
         * uint8_t : 位置のサイズ
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} position_size
         */
        this.position_size = 0;

        /**
         * float32_t[position_size * num_positions] : 位置の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} positions
         */
        this.positions = null;

        /**
         * uint32_t : 法線の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_normals
         */
        this.num_normals = 0;

        /**
         * uint8_t : 法線のサイズ
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} normal_size
         */
        this.normal_size = 0;

        /**
         * float32_t[normal_size * num_normals] : 法線の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} normals
         */
        this.normals = null;

        /**
         * uint32_t : 色の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_colors
         */
        this.num_colors = 0;

        /**
         * uint8_t : 色のサイズ
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} color_size
         */
        this.color_size = 0;

        /**
         * float32_t[color_size * num_colors] : 色の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} colors
         */
        this.colors = null;

        /**
         * uint32_t : テクスチャ座標の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_tex_coords
         */
        this.num_tex_coords = 0;

        /**
         * uint8_t : テクスチャ座標のサイズ
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} tex_coord_size
         */
        this.tex_coord_size = 0;

        /**
         * float32_t[tex_coord_size * num_tex_coords] : テクスチャ座標の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} tex_coords
         */
        this.tex_coords = null;

        /**
         * XModelSkin : スキン構造
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelSkin} skin
         */
        this.skin = null;

        /**
         * uint32_t : 頂点の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * XModelVertex[num_vertices] : 頂点の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelVertex[]} vertices
         */
        this.vertices = null;

        /**
         * uint16_t : 材質の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint16_t} num_materials
         */
        this.num_materials = 0;

        /**
         * XModelMaterial[num_materials] : 材質の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelMaterial[]} materials
         */
        this.materials = null;

        /**
         * uint32_t : 要素の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_elements
         */
        this.num_elements = 0;

        /**
         * XModelElement[num_elements] : 要素の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelElement[]} elements
         */
        this.elements = null;

        /**
         * int16_t : サブセットの数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.int16_t} num_subset
         */
        this.num_subsets = 0;

        /**
         * XModelMeshSubset[num_subset] : サブセットの配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {XModelMeshSubset[]} subset
         */
        this.subsets = null;

        // 作業変数

        /**
         * XModelNode : 親のノード
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelNode} parent
         */
        this.parent = null; // 弱参照
    };

    Object.setPrototypeOf(xpl.XModelMesh.prototype, xpl.XModelMeshBase.prototype);

    Object.defineProperties(xpl.XModelMesh, {

        /**
         * 位置の型
         *
         * @memberof xpl.XModelMesh
         * @const {xpl.enum_t} TYPE_POSITION
         */
        TYPE_POSITION: {value: 0},

        /**
         * 法線の型
         *
         * @memberof xpl.XModelMesh
         * @const {xpl.enum_t} TYPE_NORMAL
         */
        TYPE_NORMAL: {value: 1}
    });

    /**
     * メッシュの名前を取得します。
     *
     * @instance
     * @returns {string} メッシュ名
     */
    xpl.XModelMesh.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * サブメッシュの構造です。
     *
     * @constructor
     * @augments xpl.XModelMeshBase
     */
    xpl.XModelMeshSubset = function () {
        xpl.XModelMeshBase.call(this, xpl.XModelStructure.TYPE_SUB_MESH);

        /**
         * uint32_t : ボーンのインデックスの数
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_bones
         */
        this.num_bones = 0;

        /**
         * uint32_t[num_bones] : ボーンのインデックスの配列
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Uint16Array} bones
         */
        this.bones = null;

        /**
         * uint32_t : 頂点のインデックスの数
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * uint32_t[num_vertices] : 頂点のインデクスの配列
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Uint32Array} vertices
         */
        this.vertices = null;

        /**
         * uint32_t : 要素の数
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_elements
         */
        this.num_elements = 0;

        /**
         * XModelElement[num_elements] : 要素の配列
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.XModelElement} elements
         */
        this.elements = null;
    };

    Object.setPrototypeOf(xpl.XModelMesh.prototype, xpl.XModelMeshBase.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * スキンの構造です。
     *
     * @constructor
     */
    ns.XModelSkin = function () {

        /**
         * uint32_t : 重み付きインデックスの数
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint32_t} num_weighted_indices
         */
        this.num_weighted_indices = 0;

        /**
         * uint8_t : 重み付きインデックスの要素のサイズ
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint8_t} weighted_index_stride
         */
        this.weighted_index_stride = 0;

        /**
         * uint8_t[num_weighted_indices] : 重み付きインデックスのサイズの配列
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Uint8Array} weighted_index_sizes
         */
        this.weighted_index_sizes = null;

        /**
         * uint16_t[num_weighted_indices * weighted_index_stride] : インデックスの配列
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Int16Array} indices
         */
        this.indices = null;

        /**
         * float32_t[num_weighted_indices * weighted_index_stride] : 重みの配列
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Float32Array} weights
         */
        this.weights = null;

        /**
         * uint16_t : ボーンとなるノードの数
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNodes[num_nodes] : ボーンとなるノードの配列
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.XModelNode[]} nodes
         */
        this.nodes = null; // 弱参照

        /**
         * float32_t[SIZE_MATRIX * num_nodes] : オフセット行列の配列
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Float32Array} offset_matrices
         */
        this.offset_matrices = null;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 頂点の構造です。
     *
     * @constructor
     */
    xpl.XModelVertex = function () {

        /**
         * uint32_t : 位置のインデックス
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} position
         */
        this.position = -1;

        /**
         * uint32_t : 法線のインデックス
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} normal
         */
        this.normal = -1;

        /**
         * uint32_t : 色のインデックス
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} color
         */
        this.color = -1;

        /**
         * uint32_t : テクスチャ座標のインデックス
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} tex_coord
         */
        this.tex_coord = -1;

        /**
         * uint32_t : スキンウェイトのインデックス
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} skin_weight
         */
        this.skinning = -1;
    };

    /**
     * ハッシュ値を取得します。
     *
     * @instance
     * @returns {xpl.uint32_t} ハッシュ値
     */
    xpl.XModelVertex.prototype.hashCode = function () {
        return this.position ^ this.normal ^ this.color ^ this.tex_coord ^ this.skinning;
    };

    /**
     * この構造と引数で指定する構造が同じものかを調べます。
     *
     * @instance
     * @param {xpl.XModelVertex} other - 指定の構造
     * @returns {boolean} 同じ構造かどうか
     */
    xpl.XModelVertex.prototype.equals = function (other) {
        if (this === other) {
            return true;
        }
        if (other != null && other instanceof xpl.XModelVertex) {
            return this.position == other.position &&
                this.normal == other.normal &&
                this.color == other.color &&
                this.tex_coord == other.tex_coord &&
                this.skinning == other.skinning;
        }
        return false;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 要素の構造です。
     *
     * @constructor
     */
    xpl.XModelElement = function () {

        /**
         * uint16_t : 材質のインデックス
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {xpl.uint16_t} material
         */
        this.material = -1;

        /**
         * uint8_t : 頂点のインデックスの数
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {xpl.uint8_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * uint32_t[num_vertices] : 頂点のインデックスの配列
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {Uint32Array} vertices
         */
        this.vertices = null;
    };

    /**
     * ハッシュ値を取得します。
     *
     * @instance
     * @returns {xpl.uint32_t} ハッシュ値
     */
    xpl.XModelElement.prototype.hashCode = function () {
        var hash_code = this.material ^ this.num_vertices;
        for (var i = 0; i < this.num_vertices; ++i) {
            hash_code ^= this.vertices[i];
        }
        return hash_code;
    };

    /**
     * この構造と引数で指定する構造が同じものかを調べます。
     *
     * @instance
     * @param {xpl.XModelElement} other - 指定の構造
     * @returns {boolean} 同じ構造かどうか
     */
    xpl.XModelElement.prototype.equals = function (other) {
        if (this === other) {
            return true;
        }
        if (other instanceof xpl.XModelElement &&
            this.material == other.material &&
            this.num_vertices == other.num_vertices) {
            for (let i = 0; i < this.vertices; ++i) {
                if (this.vertices[i] == null || !this.vertices[i].equals(other.vertices[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * ノードの構造です。
     *
     * @constructor
     * @augments xpl.XModelExtensible
     */
    xpl.XModelNode = function () {
        xpl.XModelExtensible.call(this, xpl.XModelStructure.TYPE_NODE);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {string} name
         */
        this.name = null;

        /**
         * boolean_t : 親のノードと接続されているかどうか
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {boolean} connected
         */
        this.connected = true;

        /**
         * boolean_t[SIZE_VECTOR_3] : 各軸が固定されているかどうか
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} lock_axises
         */
        this.lock_axises = new Uint8Array([false, false, false]);

        /**
         * boolean_t[SIZE_VECTOR_3] : 各軸に角度制限があるかどうか
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} limit_angles
         */
        this.limit_angles = new Uint8Array([false, false, false]);

        /**
         * float32_t[SIZE_VECTOR_3] : 各軸の最小角度
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} min_angles
         */
        this.min_angles = new Float32Array([-Math.PI, -Math.PI, -Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : 各軸の最大角度
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} max_angles
         */
        this.max_angles = new Float32Array([Math.PI, Math.PI, Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : ボーンの末端の位置
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} bone_tail
         */
        this.bone_tail = new Float32Array([0.0, 0.0, 0.0]);

        /**
         * XModelTransform[NUM_TRANSFORMS] : 変換の配列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelTransform[]} transforms
         */
        this.transforms = [null, null, null, null];

        /**
         * uint16_t : 逆運動学の構造の数
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_iks
         */
        this.num_iks = 0;

        /**
         * XModelIK[num_iks] : 逆運動学の構造の配列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelIK[]} iks
         */
        this.iks = null;

        /**
         * uint16_t : メッシュの数
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0;

        /**
         * XModelMesh[num_meshes] : メッシュの配列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelMesh[]} meshes
         */
        this.meshes = null;

        /**
         * uint16_t : 子のノードの数
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_children
         */
        this.num_children = 0;

        /**
         * XModelFrame[num_children] : 子のノードの配列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelNode[]} children
         */
        this.children = null;

        // 作業変数

        /**
         * XModelNode : 親のノード
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelNode} parent
         */
        this.parent = null; // 弱参照

        /**
         * float32_t[SIZE_MATRIX] : オフセット行列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} offset_matrix
         */
        this.offset_matrix = new Float32Array(xpl.XModelStructure.SIZE_MATRIX);

        /**
         * float32_t[SIZE_MATRIX * (NUM_BLEND_SLOT + 1)] : 合成された行列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} combined_matrix
         */
        this.combined_matrix = new Float32Array(xpl.XModelStructure.SIZE_MATRIX * (xpl.XModelStructure.NUM_BLEND_SLOT + 1));
    };

    Object.setPrototypeOf(xpl.XModelNode.prototype, xpl.XModelExtensible.prototype);

    Object.defineProperties(xpl.XModelNode, {

        /**
         * 行列の変換構造
         *
         * @memberof xpl.XModelNode
         * @const {xpl.enum_t} TRANSFORM_MATRIX
         */
        TRANSFORM_MATRIX: {value: 0},

        /**
         * 平行移動の変換構造
         *
         * @memberof xpl.XModelNode
         * @const {xpl.enum_t} TRANSFORM_TRANSLATE
         */
        TRANSFORM_TRANSLATE: {value: 1},

        /**
         * 拡大の変換構造
         *
         * @memberof xpl.XModelNode
         * @const {xpl.size_t} TRANSFORM_SCALE
         */
        TRANSFORM_SCALE: {value: 2},

        /**
         * 回転の変換構造
         *
         * @memberof xpl.XModelNode
         * @const {xpl.size_t} TRANSFORM_ROTATE
         */
        TRANSFORM_ROTATE: {value: 3},

        /**
         * 変換構造の数
         *
         * @memberof xpl.XModelNode
         * @const {xpl.size_t} NUM_TRANSFORMS
         */
        NUM_TRANSFORMS: {value: 4}
    });

    /**
     * ノードの名前を取得します。
     *
     * @instance
     * @returns {string} ノードの名前
     */
    xpl.XModelNode.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 逆運動学の構造です。
     *
     * @class
     * @alias xpl.XModelIK
     * @augments xpl.XModelStructure
     */
    xpl.XModelIK = function () {
        xpl.XModelStructure.call(this, xpl.XModelStructure.TYPE_IK);

        /**
         * XModelNode : 対象のノード
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.XModelNode} target
         */
        this.target = null;

        /**
         * uint16_t : 繰り返しの最大数
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} max_iterations
         */
        this.max_iterations = 500;

        /**
         * uint16_t : チェインの数
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} chain_length
         */
        this.chain_length = 1;

        /**
         * float32_t : 影響度
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.float32_t} influence
         */
        this.influence = 1.0;
    };

    Object.setPrototypeOf(xpl.XModelIK.prototype, xpl.XModelStructure.prototype);

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * アニメーションの構造です。
     *
     * @constructor
     * @augments xpl.XModelExtensible
     */
    xpl.XModelAnimation = function () {
        xpl.XModelExtensible.call(this, xpl.XModelStructure.TYPE_ANIMATION);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {string} name
         */
        this.name = null;

        /**
         * XModelStructure : 処理対象のパラメータ
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.XModelParameter} target
         */
        this.target = null;

        /**
         * uint32_t : 処理対象のパラメータのインデックス
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint32_t} index
         */
        this.index = -1;

        /**
         * uint16_t : キーフレームの数
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint16_t} num_keys
         */
        this.num_keys = 0;

        /**
         * XModelAnimationKey[num_keys] : キーフレームの配列
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.XModelAnimationKey[]} keys
         */
        this.keys = null;

        /**
         * uint16_t : 子のアニメーションの数
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint16_t} num_children
         */
        this.num_children = 0;

        /**
         * XModelAnimation[] : 子のアニメーションの配列
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.XModelAnimation[]} children
         */
        this.children = null;
    };

    Object.setPrototypeOf(xpl.XModelAnimation.prototype, xpl.XModelExtensible.prototype);

    /**
     * アニメーションの名前を取得します。
     *
     * @instance
     * @returns {string} アニメーションの名前
     */
    xpl.XModelAnimation.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * アニメーションキーの構造です。
     *
     * @constructor
     * @augments xpl.XModelStructure
     */
    xpl.XModelAnimationKey = function () {
        xpl.XModelStructure.call(this, xpl.XModelStructure.TYPE_ANIMATION_KEY);

        /**
         * uint8_t : 補間の種別
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.uint8_t} interpolate
         */
        this.interpolate = xpl.XModelAnimationKey.INTERPOLATE_UNKNOWN;

        /**
         * float64_t : 時間
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} time
         */
        this.time = 0;

        /**
         * float64_t : 始点の時間
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} before_time
         */
        this.before_time = 0;

        /**
         * float64_t : 終点の時間
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} after_time
         */
        this.after_time = 0;

        /**
         * uint32_t : 値のサイズ
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.uint32_t} value_size
         */
        this.value_size = 0;

        /**
         * float32_t[value_size] : 値
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} value
         */
        this.value = null;

        /**
         * float32_t[value_size] : 始点の値
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} before_value
         */
        this.before_value = null;

        /**
         * float32_t[value_size] : 終点の値
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} after_value
         */
        this.after_value = null;
    };

    Object.setPrototypeOf(xpl.XModelAnimationKey.prototype, xpl.XModelStructure.prototype);

    Object.defineProperties(xpl.XModelAnimationKey, {

        /**
         * 補間の種別不明
         *
         * @memberof xpl.XModelAnimationKey
         * @const {xpl.enum_t} INTERPOLATE_UNKNOWN
         */
        INTERPOLATE_UNKNOWN: {value: -1},

        /**
         * 線形補間
         *
         * @memberof xpl.XModelAnimationKey
         * @const {xpl.enum_t} INTERPOLATE_LINER
         */
        INTERPOLATE_LINER: {value: 0},

        /**
         * ベジェ曲線補間
         *
         * @memberof xpl.XModelAnimationKey
         * @const {xpl.enum_t} INTERPOLATE_BEZIER
         */
        INTERPOLATE_BEZIER: {value: 1}
    });

})(xpl);

(function (ns) {

    "use strict";

    /**
     * アニメーションセットの構造です。
     *
     * @constructor
     * @augments xpl.XModelExtensible
     */
    ns.XModelAnimationSet = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_ANIMATION_SET);

        /**
         * string : 名前
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {string} name
         */
        this.name = null;

        /**
         * uint16_t : アニメーションの数
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {xpl.uint16_t} num_animations
         */
        this.num_animations = 0;

        /**
         * XModelAnimation[num_animations] : アニメーションの配列
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {xpl.XModelAnimation[]} animations
         */
        this.animations = null;
    };

    Object.setPrototypeOf(ns.XModelAnimationSet.prototype, ns.XModelExtensible.prototype);

    /**
     * アニメーションセットの名前を取得します。
     *
     * @instance
     * @returns {string} アニメーションセットの名前
     */
    ns.XModelAnimationSet.prototype.toString = function () {
        return this.name;
    };

})(xpl);
