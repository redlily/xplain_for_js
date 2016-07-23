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
     * コンテナ構造です。
     *
     * @class
     * @alias xpl.XModelContainer
     * @augments xpl.XModelExtensible
     */
    ns.XModelContainer = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_CONTAINER);

        /**
         * string : コンテナ名
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
         * @member {Array.<xpl.XModelTexture>} textures
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
         * @member {Array.<xpl.XModelMaterial>} materials
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
         * @member {Array.<xpl.XModelMesh>} meths
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
         * @member {Array.<xpl.XModelNode>} node
         */
        this.nodes = null;

        /**
         * float64_t : 一秒間の時間拡大率
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
         * @member {Array.<xpl.XModelAnimationSet>} animation_sets
         */
        this.animation_sets = null;
    };

    Object.setPrototypeOf(ns.XModelContainer.prototype, ns.XModelExtensible.prototype);

    /**
     * コンテナの名前を取得します。
     *
     * @instance
     * @memberof xpl.XModelContainer
     * @function toString
     * @returns {string} The name of this container.
     */
    ns.XModelContainer.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (ns) {

    "use strict";

    /**
     * ノード構造です。
     *
     * @class
     * @alias xpl.XModelNode
     * @augments xpl.XModelExtensible
     */
    ns.XModelNode = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_NODE);

        /**
         * string : ノード名
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
         * @member {Boolean} connected
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
         * float32_t[SIZE_VECTOR_3] : ボーンの端の位置
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
         * @member {Array.<xpl.XModelTransform>} transforms
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
         * @member {Array.<xpl.XModelIK>} iks
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
         * @member {Array.<xpl.XModelMesh>} meshes
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
         * @member {Array.<xpl.XModelNode>} children
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
        this.offset_matrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0]);

        /**
         * float32_t[SIZE_MATRIX] : 合成された行列
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} combined_matrix
         */
        this.combined_matrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelNode.prototype, ns.XModelExtensible.prototype);

    //noinspection JSValidateTypes
    Object.defineProperties(ns.XModelNode, {

        /**
         * 行列の変換構造
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.enum_t} TRANSFORM_MATRIX
         */
        "TRANSFORM_MATRIX": {value: 0},

        /**
         * 平行移動の変換構造
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.enum_t} TRANSFORM_TRANSLATE
         */
        "TRANSFORM_TRANSLATE": {value: 1},

        /**
         * 拡大の変換構造
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_SCALE
         */
        "TRANSFORM_SCALE": {value: 2},

        /**
         * 回転の変換構造
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_ROTATE
         */
        "TRANSFORM_ROTATE": {value: 3},

        /**
         * 変換構造の数
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} NUM_TRANSFORMS
         */
        "NUM_TRANSFORMS": {value: 4}
    });

    /**
     * ノード名を取得します。
     *
     * @instance
     * @memberof xpl.XModelNode
     * @function toString
     * @returns {string} ノード名
     */
    ns.XModelNode.prototype.toString = function () {
        return this.name;
    };

})(xpl);
