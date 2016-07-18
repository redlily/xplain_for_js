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
     * パラメータ構造の基礎構造です。
     *
     * @class
     * @alias xpl.XModelParameter
     * @augments xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - 構造種別
     */
    ns.XModelParameter = function (structure_type) {
        ns.XModelStructure.call(this, structure_type);
    };

    Object.setPrototypeOf(ns.XModelParameter.prototype, ns.XModelStructure.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 変換構造の基礎構造です。
     *
     * @class
     * @alias xpl.XModelTransform
     * @augments xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - 構造種別
     * @author Syuuhei Kuno
     */
    ns.XModelTransform = function (structure_type) {
        ns.XModelStructure.call(this, structure_type);
    };

    Object.setPrototypeOf(ns.XModelTransform.prototype, ns.XModelParameter.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 軸回転の変換構造です。
     *
     * @class
     * @alias xpl.XModelAxisRotate
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelAxisRotate = function () {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_AXIS_ROTATE);

        /**
         * float32_t[SIZE_AXIS_ROTATE] : 初期値
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([0.0, 0.0, 0.0, 1.0]);

        // 作業変数

        /**
         * float32_t[SIZE_AXIS_ROTATE * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @member {Float32Array} value
         */
        this.value = new Float32Array([
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelAxisRotate.prototype, ns.XModelTransform.prototype);

    Object.defineProperties(ns.XModelStructure, {

        /**
         * 回転角度
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.enum_t} ANGLE
         */
        "ANGLE": {
            value: 0
        },

        /**
         * 軸ベクトルのX要素
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.enum_t} X
         */
        "X": {
            value: 1
        },

        /**
         * 軸ベクトルのY要素
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.enum_t} Y
         */
        "Y": {
            value: 2
        },

        /**
         * 軸ベクトルのZ要素
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.enum_t} Z
         */
        "Z": {
            value: 3
        },

        /**
         * 配列のサイズ
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.size_t} SIZE
         */
        "SIZE": {
            value: 4
        }
    });

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 四元数の変換構造です。
     *
     * @class
     * @alias xpl.XModelQuaternion
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelQuaternion = function () {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_QUATERNION);

        /**
         * float32_t[SIZE_MATRIX] : 初期値
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 0.0, 0.0, 0.0]);

        // 作業変数

        /**
         * float32_t[SIZE_MATRIX * NUM_BLEND_SLOT] : 作業用の数値
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @member {Float32Array} value
         */
        this.value = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0]);
    };

    Object.setPrototypeOf(ns.XModelQuaternion.prototype, ns.XModelTransform.prototype);

})(xpl);

(function (ns) {

    "use strict";

    /**
     * 拡大の変換構造です。
     *
     * @class
     * @alias xpl.XModelScale
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
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
     * @class
     * @alias xpl.XModelTranslate
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
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
     * @author Syuuhei Kuno
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
