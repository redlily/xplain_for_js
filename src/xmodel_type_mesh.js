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
     * 拡張可能なメッシュの基礎構造です。
     *
     * @class
     * @alias xpl.XModelMeshBase
     * @augments xpl.XModelStructure
     */
    ns.XModelMeshBase = function (structure_type) {
        ns.XModelExtensible.call(this, structure_type);

        // 作業変数

        /**
         * Object : 頂点バッファのオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_buffer
         */
        this.vertex_buffer = null;

        /**
         * Object : 頂点配列のオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_array.
         */
        this.vertex_array = null;

        /**
         * Object : 要素バッファのオブジェクト
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} element_buffer
         */
        this.element_buffer = null;
    };

    Object.setPrototypeOf(ns.XModelMeshBase.prototype, ns.XModelExtensible.prototype);

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
         * @var {string} name
         */
        this.name = null;

        /**
         * uint32_t : 位置の数
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @var {xpl.uint32_t} num_positions
         */
        this.num_positions = 0;

        /**
         * uint8_t : 位置のサイズ
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @var {xpl.uint8_t} position_size
         */
        this.position_size = 0;

        /**
         * float32_t[position_size * num_positions] : 位置の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @var {Float32Array} positions
         */
        this.positions = null;

        /**
         * uint32_t : 法線の配列
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @var {xpl.uint32_t} num_normals
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
     * メッシュ名を取得します。
     *
     * @instance
     * @memberof xpl.XModelMesh
     * @function toString
     * @returns {string} メッシュ名
     */
    xpl.XModelMesh.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (ns) {

    "use strict";

    /**
     * サブメッシュ構造です。
     *
     * @class
     * @alias xpl.XModelSubsetMesh
     */
    ns.XModelMeshSubset = function () {
        ns.XModelMeshBase.call(this, ns.XModelStructure.TYPE_MESH_SUBSET);

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

    Object.setPrototypeOf(ns.XModelMesh.prototype, ns.XModelMeshBase.prototype);

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
         * uint32_t : The number of weighted indices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {xpl.uint32_t} num_weighted_indices
         */
        this.num_weighted_indices = 0;

        /**
         * uint8_t : The weighted index stride.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {xpl.uint8_t} weighted_index_stride
         */
        this.weighted_index_stride = 0;

        /**
         * uint8_t[num_weighted_indices] : The weighted index sizes of bone.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {Uint8Array} weighted_index_sizes
         */
        this.weighted_index_sizes = null;

        /**
         * uint16_t[num_weighted_indices * weighted_index_stride] : The bone indices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {Int16Array} indices
         */
        this.indices = null;

        /**
         * float32_t[num_weighted_indices * weighted_index_stride] : The bone weights.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {Float32Array} weights
         */
        this.weights = null;

        /**
         * uint16_t : The number of nodes as bones.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNodes[num_nodes] : The nodes as bones.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {xpl.XModelNode[]} nodes
         */
        this.nodes = null; // elements is the weak reference.

        /**
         * float32_t[num_nodes] : The offset matrices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @var {Float32Array} offset_matrices
         */
        this.offset_matrices = null;

        /**
         * float32_t[num_nodes] : The offset quaternions.
         *
         * @deprecated
         * @instance
         * @memberof xpl.XModelSkin
         * @var {Float32Array} offset_quaternions
         */
        this.offset_quaternions = null;
    };

})(xpl);

(function (xpl) {

    "use strict";

    /**
     * 頂点構造です。
     *
     * @class
     * @alias xpl.XModelVertex
     */
    /**
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
         * uint32_t : The skin weight.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} skin_weight
         */
        this.skinning = -1;
    };

    /**
     * ハッシュ値を湯得します。
     *
     * @instance
     * @memberof xpl.XModelVertex
     * @function hashCode
     * @returns {xpl.uint32_t} ハッシュ値
     */
    xpl.XModelVertex.prototype.hashCode = function () {
        return this.position ^ this.normal ^ this.color ^ this.tex_coord ^ this.skinning;
    };

    /**
     * このインスタンスと引数で指定されたインスタンスが同じものかを調べます。
     *
     * @instance
     * @memberof xpl.XModelVertex
     * @function equals
     * @param {xpl.XModelVertex} other - 対象のインスタンス
     * @returns {Boolean} 比較の結果
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

(function (ns) {

    "use strict";

    /**
     * 要素構造です。
     *
     * @class
     * @alias xpl.XModelElement
     */
    ns.XModelElement = function () {

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
     * ハッシュ値を湯得します。
     *
     * @instance
     * @memberof xpl.XModelElement
     * @function hashCode
     * @returns {xpl.uint32_t} ハッシュ値
     */
    ns.XModelElement.prototype.hashCode = function () {
        var vertices_hash_code = 0;
        for (var i = 0; i < this.num_vertices; ++i) {
            vertices_hash_code ^= this.vertices[i];
        }
        return this.material ^ this.num_vertices ^ vertices_hash_code;
    };

    /**
     * このインスタンスと引数で指定されたインスタンスが同じものかを調べます。
     *
     * @instance
     * @memberof xpl.XModelElement
     * @function equals
     * @param {xpl.XModelElement} other - 対象のインスタンス
     * @returns {Boolean} 比較の結果
     */
    ns.XModelElement.prototype.equals = function (other) {
        if (this !== other) {
            if (other && other instanceof ns.XModelElement) {
                for (var i = 0; i < this.num_vertices && i < other.num_vertices; ++i) {
                    if (this.vertices[i] != other.vertices[i]) {
                        return false;
                    }
                }
                return this.material == other.material && this.num_vertices == other.num_vertices;
            }
            return false;
        }
        return true;
    };

})(xpl);
