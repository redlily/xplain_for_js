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
     * テクスチャ構造です。
     *
     * @class
     * @alias xpl.XModelTexture
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelTexture = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_TEXTURE);

        /**
         * string : テクスチャ名
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {String} name
         */
        this.name = null;

        /**
         * string : テクスチャの参照名
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {String} ref
         */
        this.ref = null;

        /**
         * uint32_t : テクスチャのバイナリデータのサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * uint8_t[data_size] : テクスチャのバイナリデータ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Uint8Array|Int8Array} data
         */
        this.data = null;

        // 作業変数

        /**
         * void* : テクスチャのインスタンス
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Object} texture
         */
        this.texture = null;

        /**
         * uint32_t : テクスチャのX軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} x_size
         */

        this.x_size = 0;
        /**
         * uint32_t : テクスチャのY軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} y_size
         */

        this.y_size = 0;

        /**
         * uint32_t : テクスチャのZ軸のサイズ
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} z_size
         */
        this.z_size = 0;
    };

    Object.setPrototypeOf(ns.XModelTexture.prototype, ns.XModelExtensible.prototype);

    /**
     * テクスチャ名を取得します。
     *
     * @instance
     * @memberof xpl.XModelTexture
     * @function toString
     * @returns {String} テクスチャ名
     */
    ns.XModelTexture.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 材質構造です。
     *
     * @class
     * @alias xpl.XModelMaterial
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelMaterial = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_MATERIAL);

        /**
         * string : 材質名
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {String} name
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
        this.draw_mode = ns.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS;
    };

    Object.setPrototypeOf(ns.XModelMaterial.prototype, ns.XModelExtensible.prototype);

    Object.defineProperties(ns.XModelMaterial, {

        /**
         * 描画なしの描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_NONE_BITS
         */
        "DRAW_MODE_FACE_NONE_BITS": {
            value: 0
        },

        /**
         * 表面描画のモード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_FRONT_BITS
         */
        "DRAW_MODE_FACE_FRONT_BITS": {
            value: 0x1 << 0
        },

        /**
         * 裏面描画の描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_BACK_BITS
         */
        "DRAW_MODE_FACE_BACK_BITS": {
            value: 0x1 << 1
        },

        /**
         * 両面描画の描画モード
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_FRONT_AND_BACK_BITS
         */
        "DRAW_MODE_FACE_FRONT_AND_BACK_BITS": {
            value: ns.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS | ns.XModelMaterial.DRAW_MODE_FACE_BACK_BITS
        }
    });

    /**
     * マテリアル名を取得します。
     *
     * @instance
     * @memberof xpl.XModelMaterial
     * @function toString
     * @returns {String} マテリアル名
     */
    ns.XModelMaterial.prototype.toString = function () {
        return this.name;
    };

})(xpl);
