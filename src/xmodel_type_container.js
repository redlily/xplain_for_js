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
     * @author Syuuhei Kuno
     */
    ns.XModelContainer = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_CONTAINER);

        /**
         * string : The container name.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {String} name
         */
        this.name = null;

        /**
         * uint16_t : The Number of textures.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_textures
         */
        this.num_textures = 0;

        /**
         * XModelTexture[num_textures] : The array of textures.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelTexture>} textures
         */
        this.textures = null;

        /**
         * uint16_t : The number of materials.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_materials
         */
        this.num_materials = 0;

        /**
         * XModelMaterial[num_materials] : The array of materials.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelMaterial>} materials
         */
        this.materials = null;

        /**
         * uint16_t : The number of meshes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0;

        /**
         * XModelMesh[num_meshes] : The array of meshes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelMesh>} meths
         */
        this.meshes = null;

        /**
         * uint16_t : The number of nodes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNode[num_nodes] : The array of nodes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelNode>} node
         */
        this.nodes = null;

        /**
         * float64_t : The time rate of unit number of sec.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.float64_t} time_rate
         */
        this.time_rate = 1.0;

        /**
         * uint16_t : The number of animation sets.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_animation_sets
         */
        this.num_animation_sets = 0;

        /**
         * XModelAnimationSet[num_animation_sets] : The array of animation sets.
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
     * @returns {String} The name of this container.
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
     * @author Syuuhei Kuno
     */
    ns.XModelNode = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_NODE);

        /**
         * string : The node name.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {String} name
         */
        this.name = null;

        /**
         * boolean_t : The connected parent.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Boolean} connected
         */
        this.connected = true;

        /**
         * boolean_t[SIZE_VECTOR_3] : Lock the rotation of axis for kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} lock_axises
         */
        this.lock_axises = new Uint8Array([false, false, false]);

        /**
         * boolean_t[SIZE_VECTOR_3] : Limit the angle of axis rotate for kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} limit_angles
         */
        this.limit_angles = new Uint8Array([false, false, false]);

        /**
         * float32_t[SIZE_VECTOR_3] : The minimum angle for kinematics limits.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} min_angles
         */
        this.min_angles = new Float32Array([-Math.PI, -Math.PI, -Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : The maximum angle for kinematics limits.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} max_angles
         */
        this.max_angles = new Float32Array([Math.PI, Math.PI, Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : The location of bone tail.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} bone_tail
         */
        this.bone_tail = new Float32Array([0.0, 0.0, 0.0]);

        /**
         * XModelTransform[NUM_TRANSFORMS] : The array of transforms.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelTransform>} transforms
         */
        this.transforms = [null, null, null, null];

        /**
         * uint16_t : The number of inverse kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_iks
         */
        this.num_iks = 0;

        /**
         * XModelIK[num_iks] : The array of inverse kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelIK>} iks
         */
        this.iks = null;

        /**
         * uint16_t : The number of meshes.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0;

        /**
         * XModelMesh[num_meshes] : The array of meshes.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelMesh>} meshes
         */
        this.meshes = null;

        /**
         * uint16_t : The number of children.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_children
         */
        this.num_children = 0;

        /**
         * XModelFrame[num_children] : The array of children.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelNode>} children
         */
        this.children = null;

        // 作業変数

        /**
         * XModelNode : this object is parent of this node.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelNode} parent
         */
        this.parent = null; // weak reference.

        /**
         * float32_t[SIZE_MATRIX] : offset matrix.
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
         * float32_t[SIZE_MATRIX] : The combined matrix.
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

    Object.defineProperties(ns.XModelNode, {

        /**
         * Transform of the matrix.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_MATRIX
         */
        "TRANSFORM_MATRIX": {
            value: 0
        },

        /**
         * Transform of the translate.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_TRANSLATE
         */
        "TRANSFORM_TRANSLATE": {
            value: 1
        },

        /**
         * Transform of the scale.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_SCALE
         */
        "TRANSFORM_SCALE": {
            value: 2
        },

        /**
         * Transform of the rotate.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_ROTATE
         */
        "TRANSFORM_ROTATE": {
            value: 3
        },

        /**
         * Number of the transforms.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} NUM_TRANSFORMS
         */
        "NUM_TRANSFORMS": {

            value: 4
        }
    });

    /**
     * Get the name of this node.
     *
     * @instance
     * @memberof xpl.XModelNode
     * @function toString
     * @returns {String} The name of this node.
     */
    ns.XModelNode.prototype.toString = function () {
        return this.name;
    };

})(xpl);
