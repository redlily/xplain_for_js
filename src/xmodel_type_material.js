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
         * @var {string} name
         */
        this.name = null;

        /**
         * string : 参照名
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {string} ref
         */
        this.ref = null;

        /**
         * uint32_t : バイナリデータのサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * uint8_t[data_size] : バイナリデータ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {Uint8Array} data
         */
        this.data = null;

        // 作業変数

        /**
         * Object : インスタンス
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {Object} texture
         */
        this.texture = null;

        /**
         * uint32_t : X軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {xpl.uint32_t} x_size
         */

        this.x_size = 0;
        /**
         * uint32_t : Y軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {xpl.uint32_t} y_size
         */

        this.y_size = 0;

        /**
         * uint32_t : Z軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @var {xpl.uint32_t} z_size
         */
        this.z_size = 0;
    };

    Object.setPrototypeOf(xpl.XModelTexture.prototype, xpl.XModelExtensible.prototype);

    /**
     * テクスチャ名を取得します。
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
         * @var {string} name
         */
        this.name = null;

        /**
         * float32_t[SIZE_RGBA] : 発光色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {Float32Array} emissive
         */
        this.emissive = [0.0, 0.0, 0.0, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 環境光の反射色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {Float32Array} ambient
         */
        this.ambient = [0.1, 0.1, 0.1, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 拡散反射の色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {Float32Array} diffuse
         */
        this.diffuse = [1.0, 1.0, 1.0, 1.0];

        /**
         * float32_t[SIZE_RGBA] : 鏡面反射の色
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {Float32Array} specular
         */
        this.specular = [0.4, 0.4, 0.4, 1.0];

        /**
         * float32_t : 鏡面反射の度合
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.float32_t} shininess
         */
        this.shininess = 5.0;

        /**
         * float32_t : バンプマップの度合
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.float32_t} bump
         */
        this.bump = 1.0;

        /**
         * XModelTexture : 発行色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture} emissive_map
         */
        this.emissive_map = null;

        /**
         * XModelTexture : 環境光の反射色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture} ambient_map
         */
        this.ambient_map = null;

        /**
         * XModelTexture : 拡散反射の色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture} diffuse_map
         */
        this.diffuse_map = null;

        /**
         * XModelTexture : 鏡面反射の色のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture}specular_map
         */
        this.specular_map = null;

        /**
         * XModelTexture : 鏡面反射の度合のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture} shininess_map
         */
        this.shininess_map = null;

        /**
         * XModelTexture : バンプマップの度合のテクスチャマップ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.XModelTexture} bump_map
         */
        this.bump_map = null;

        /**
         * uint32_t : 描画モードのフラグ
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @var {xpl.uint32_t} draw_mode
         */
        this.draw_mode = xpl.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS;
    };

    Object.setPrototypeOf(xpl.XModelMaterial.prototype, xpl.XModelExtensible.prototype);
    
    Object.defineProperties(xpl.XModelMaterial, {

        /**
         * 描画なしの描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_NONE_BITS
         */
        DRAW_MODE_FACE_NONE_BITS: {value: 0},

        /**
         * 表面描画のモード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_FRONT_BITS
         */
        DRAW_MODE_FACE_FRONT_BITS: {value: 0x1 << 0},

        /**
         * 裏面描画の描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_BACK_BITS
         */
        DRAW_MODE_FACE_BACK_BITS: {value: 0x1 << 1},

        /**
         * 両面描画の描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @const {xpl.uint32_t} DRAW_MODE_FACE_FRONT_AND_BACK_BITS
         */
        DRAW_MODE_FACE_FRONT_AND_BACK_BITS: {
            value: xpl.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS | xpl.XModelMaterial.DRAW_MODE_FACE_BACK_BITS
        }
    });

    /**
     * マテリアル名を取得します。
     *
     * @instance
     * @returns {string} マテリアル名
     */
    xpl.XModelMaterial.prototype.toString = function () {
        return this.name;
    };

})(xpl);
