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
     * xModelの最適化を行うためのユーティリティクラスです。
     *
     * @namespace xpl.XModelOptimizeUtils
     * @see xpl.XModelMesh
     * @see xpl.XModelMeshSubset
     * @see xpl.XModelSkin
     */
    ns.XModelOptimizeUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     *
     * @memberof xpl.XModelOptimizeUtils
     * @function optimizeMeshVertices
     * @param {xpl.XModelMesh} mesh - The terget mesh.
     */
    ns.XModelOptimizeUtils.optimizeMeshVertices = function (mesh) {
        if (mesh != null) {
            // TODO
            console.log("it's not implemented yet.");
        }
    };

    /**
     *
     * @memberof xpl.XModelOptimizeUtils
     * @function optimizeMeshElements
     * @param {xpl.XModelMesh} mesh - The target mesh.
     */
    ns.XModelOptimizeUtils.optimizeMeshElements = function (mesh) {
        if (mesh != null) {
            // TODO
            console.log("it's not implemented yet.");
        }
    };

    /**
     * Skinning subset for optimiaze of the xModel mesh.
     *
     * @private
     * @class
     * @alias xpl.XModelOptimizeUtils.MeshSubset
     */
    var MeshSubset = function () {

        /**
         *
         * @type {Array}
         */
        this.bones = [];

        /**
         *
         * @type {Array}
         */
        this.vertices = [];

        /**
         *
         * @instance
         * @memberof xpl.XModelOptimizeUtils.MeshSubset
         * @type {Array} elements
         */
        this.elements = [];
    };

    /**
     * Add the bone index to the set.
     *
     * @memberof xpl.XModelOptimizeUtils.MeshSubset
     * @function addBone
     * @param {xpl.uint16_t} bone - The bone index.
     */
    MeshSubset.prototype.addBone = function (bone) {
        var index = ns.ArrayUtils.binarySearch(
            this.bones, 0, this.bones.length, bone);
        if (index < 0) {
            this.bones.splice(-index - 1, 0, bone);
        }
    };

    /**
     * Add the vector index to the set.
     *
     * @instance
     * @memberof xpl.XModelOptimizeUtils.MeshSubset
     * @function addVertex
     * @param {xpl.uint32_t} vertex - The vertex index.
     */
    MeshSubset.prototype.addVertex = function (vertex) {
        var index = ns.ArrayUtils.binarySearch(
            this.vertices, 0, this.vertices.length, vertex);
        if (index < 0) {
            this.vertices.splice(-index - 1, 0, vertex);
        }
    };

    /**
     * Add the element index to the set.
     *
     * @instance
     * @memberof xpl.XModelOptimizeUtils.MeshSubset
     * @function addElement
     * @param {xpl.uint32_t} element - The element index.
     */
    MeshSubset.prototype.addElement = function (element) {
        var index = ns.ArrayUtils.binarySearch(
            this.elements, 0, this.elements.length, element);
        if (index < 0) {
            this.elements.splice(-index - 1, 0, element);
        }
    };

    /**
     * Merge bone, vector and element indices to the set in this instance.
     *
     * @instance
     * @memberof xpl.XModelOptimizeUtils.MeshSubset
     * @function merge
     * @param {xpl.XModelOptimizeUtils.MeshSubset} subset - The terget subset.
     * @param {Boolean} enable_bones - Enable the merge for the bone index set.
     * @param {Boolean} enable_vertices - Enable the merge for the vertex index set.
     * @param {Boolean} enable_elements - Enable the merge for the element index set.
     */
    MeshSubset.prototype.merge = function (subset,
                                           enable_bones,
                                           enable_vertices,
                                           enable_elements) {
        if (enable_bones) {
            for (let i = 0; i < subset.bones.length; ++i) {
                this.addBone(subset.bones[i]);
            }
        }
        if (enable_vertices) {
            for (let i = 0; i < subset.vertices.length; ++i) {
                this.addVertex(subset.vertices[i]);
            }
        }
        if (enable_elements) {
            for (let i = 0; i < subset.elements.length; ++i) {
                this.addElement(subset.elements[i]);
            }
        }
    };

    /**
     * 必要となる行列パレットの数を指定の上限を超えないようにするためメッシュのスキン情報を最適化します。
     *
     * @memberof xpl.XModelOptimizeUtils
     * @function optimizeMeshSkinForMatrixPallet
     * @param {xpl.XModelMesh} mesh - 処理対象のメッシュ構造
     * @param {xpl.size_t} [max_matrix_pallet=16] - 行列パレットの最大数
     */
    ns.XModelOptimizeUtils.optimizeMeshSkinForMatrixPallet = function (mesh, max_matrix_pallet) {
        if (mesh != null && mesh.skin != null && max_matrix_pallet < mesh.skin.num_nodes) {
            if (max_matrix_pallet === undefined || max_matrix_pallet < 16) {
                max_matrix_pallet = 16;
            }

            // スキニングマップを構築
            let skinning_map = {};
            for (let i = 0; i < mesh.num_elements; ++i) {
                let subset = new MeshSubset();
                subset.addElement(i);
                let element = mesh.elements[i];
                for (let j = 0; j < element.num_vertices; ++j) {
                    let vertex_index = element.vertices[j];
                    subset.addVertex(vertex_index);
                    let vertex = mesh.vertices[vertex_index];
                    let bone_off = mesh.skin.weighted_index_stride * vertex.skinning;
                    let bone_len = mesh.skin.weighted_index_sizes[vertex.skinning];
                    for (let k = 0; k < bone_len; ++k) {
                        subset.addBone(mesh.skin.indices[bone_off + k]);
                    }
                }
                let key = "[" + subset.bones.toString() + "]";
                if (skinning_map[key] !== undefined) {
                    skinning_map[key].merge(subset, false, true, true);
                } else {
                    skinning_map[key] = subset;
                }
            }

            // build the sorted skinning set.
            let sorted_skinning_list = [];
            for (let key in skinning_map) {
                sorted_skinning_list.push(skinning_map[key]);
            }
            sorted_skinning_list.sort(function (a, b) {
                return b.bones.length - a.bones.length;
            });

            // build the optimized skinning set.
            for (let i = sorted_skinning_list.length - 1; 0 <= i; --i) {
                let subset_i = sorted_skinning_list[i];
                for (let j = 0; j < i; ++j) {
                    let subset_j = sorted_skinning_list[j];
                    if (ns.ArrayUtils.isContained(
                            subset_j.bones, 0, subset_j.bones.length,
                            subset_i.bones, 0, subset_i.bones.length)) {
                        subset_j.merge(subset_i, false, true, true);
                        delete sorted_skinning_list[i];
                        break;
                    }
                }
            }
            sorted_skinning_list = sorted_skinning_list.filter(function (a) {
                return a !== undefined;
            });
            console.log(sorted_skinning_list.length);

            // concat the skinning set.
            for (let i = 0; i < sorted_skinning_list.length - 1; ++i) {
                let subset_i = sorted_skinning_list[i];
                if (subset_i !== undefined &&
                    subset_i.bones.length <= max_matrix_pallet) {
                    for (let j = i + 1;
                         j < sorted_skinning_list.length && subset_i.bones.length < max_matrix_pallet;
                         ++j) {
                        let subset_j = sorted_skinning_list[j];
                        if (subset_j !== undefined &&
                            subset_i.bones.length + subset_j.bones.length <= max_matrix_pallet) {
                            subset_i.merge(subset_j, true, true, true);
                            delete sorted_skinning_list[j];
                        }
                    }
                }
            }
            sorted_skinning_list = sorted_skinning_list.filter(function (a) {
                return a !== undefined;
            });
            console.log(sorted_skinning_list.length);

            // copy the optimized skinning set to the mesh subsets.
            mesh.num_subsets = sorted_skinning_list.length;
            mesh.subsets = new Array(mesh.num_subsets);
            for (let i = 0; i < mesh.num_subsets; ++i) {
                let subset = sorted_skinning_list[i];
                let mesh_subset = new ns.XModelMeshSubset();
                mesh.subsets[i] = mesh_subset;

                // copy the bone set.
                mesh_subset.num_bones = subset.bones.length;
                mesh_subset.bones = new Uint16Array(subset.bones);

                // copy vertex indices.
                mesh_subset.num_vertices = subset.vertices.length;
                mesh_subset.vertices = new Uint32Array(subset.vertices);

                // build the elements for subset.
                mesh_subset.num_elements = subset.elements.length;
                mesh_subset.elements = new Array(mesh_subset.num_elements);
                for (let j = 0; j < subset.elements.length; ++j) {
                    let superset_element = mesh.elements[subset.elements[j]];
                    let subset_element = new ns.XModelElement();
                    mesh_subset.elements[j] = subset_element;

                    // copy element information from superset's element.
                    subset_element.material = superset_element.material;
                    subset_element.num_vertices = superset_element.num_vertices;
                    subset_element.vertices = new Uint32Array(subset_element.num_vertices);
                    for (let k = 0; k < subset_element.num_vertices; ++k) {
                        let index = ns.ArrayUtils.binarySearch(
                            mesh_subset.vertices,
                            0, mesh_subset.num_vertices,
                            superset_element.vertices[k]);
                        subset_element.vertices[k] = 0 <= index ? index : 0;
                    }
                }
            }
        }
    };

    /**
     *
     * @memberof xpl.XModelOptimizeUtils
     * @function
     * @param {xpl.XModelMesh} mesh -
     * @param {xpl.size_t} [max_weighted_indices=4] -
     */
    ns.XModelOptimizeUtils.optimizeMeshSkinForWeightedIndices = function (mesh, max_weighted_indices) {
        max_weighted_indices = ns.defaultValue(max_weighted_indices, 4);

        if (mesh != null && mesh.skin != null) {
            // TODO
            console.log("it's not implemented yet.");
        }
    };

})(xpl);
