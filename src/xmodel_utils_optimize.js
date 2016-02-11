/**
 * @license
 * Copyright (c) 2015, Syuuhei Kuno
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(ns) {

    "use strict";

    ns.XModelOptimizeUtils = function() {
    };

    ns.XModelOptimizeUtils.optimizeMeshVertices = function(mesh) {
        if (mesh != null) {
        }
    };

    ns.XModelOptimizeUtils.optimizeMeshElements = function(mesh) {
        if (mesh != null) {
            // fix the order of elements.
            for (var i = 0; i < mesh.num_elements; ++i) {
                var element = mesh.elements[i];
                var min_index = 0;
                var min_vertex = 0;
                for (var j = element.num_vertices - 1; 0 <= j; --j) {
                    var vertex = element.vertices[j];
                    if (vertex < min_vertex) {
                        min_vertex = vertex;
                        min_index = j;
                    }
                }
                if (min_index != 0) {
                }
            }
        }
    };

    var SkinningSubset = function() {
        this.bones = [];
        this.vertices = [];
        this.elements = [];
    };

    SkinningSubset.prototype.addBone = function(bone) {
        var index = ns.ArrayUtils.binarySearch(
            this.bones, 0, this.bones.length, bone);
        if (index < 0) {
            this.bones.splice(-index - 1, 0, bone);
        }
    };

    SkinningSubset.prototype.addVertex = function(vertex) {
        var index = ns.ArrayUtils.binarySearch(
            this.vertices, 0, this.vertices.length, vertex);
        if (index < 0) {
            this.vertices.splice(-index - 1, 0, vertex);
        }
    };

    SkinningSubset.prototype.addElement = function(element) {
        var index = ns.ArrayUtils.binarySearch(
            this.elements, 0, this.elements.length, element);
        if (index < 0) {
            this.elements.splice(-index - 1, 0, element);
        }
    };

    SkinningSubset.prototype.merge = function(set,
                                              enable_bones,
                                              enable_vertices,
                                              enable_elements) {
        if (enable_bones) {
            for (var i = 0; i < set.bones.length; ++i) {
                this.addBone(set.bones[i]);
            }
        }
        if (enable_vertices) {
            for (var i = 0; i < set.vertices.length; ++i) {
                this.addVertex(set.vertices[i]);
            }
        }
        if (enable_elements) {
            for (var i = 0; i < set.elements.length; ++i) {
                this.addElement(set.elements[i]);
            }
        }
    };

    ns.XModelOptimizeUtils.optimizeMeshSkinning = function(mesh, max_matrix_pallet) {
        if (mesh != null && mesh.skin != null && max_matrix_pallet < mesh.skin.num_nodes) {
            if (max_matrix_pallet === undefined || max_matrix_pallet < 16) {
                max_matrix_pallet = 16;
            }

            // build a skinning maps.
            var skinning_map = {};
            for (var i = 0; i < mesh.num_elements; ++i) {
                var skinning_set = new SkinningSubset();
                skinning_set.addElement(i);
                var element = mesh.elements[i];
                for (var j = 0; j < element.num_vertices; ++j) {
                    var vertex_index = element.vertices[j];
                    skinning_set.addVertex(vertex_index);
                    var vertex = mesh.vertices[vertex_index];
                    var bone_off = mesh.skin.weighted_index_stride * vertex.skinning;
                    var bone_len = mesh.skin.weighted_index_sizes[vertex.skinning];
                    for (var k = 0; k < bone_len; ++k) {
                        skinning_set.addBone(mesh.skin.indices[bone_off + k]);
                    }
                }
                var key = "[" + skinning_set.bones.toString() + "]";
                if (skinning_map[key] !== undefined) {
                    skinning_map[key].merge(skinning_set, false, true, true);
                } else {
                    skinning_map[key] = skinning_set;
                }
            }

            // build a sorted skinning set.
            var sorted_skinning_set = [];
            for (var key in skinning_map) {
                sorted_skinning_set.push(skinning_map[key]);
            }
            sorted_skinning_set.sort(function(a, b) { return b.bones.length - a.bones.length; });

            // build a optimized skinning set.
            for (var i = skinning_set.length - 1; 0 <= i; --i) {
                var skinning_set_i = sorted_skinning_set[i];
                for (var j = 0; j < i; ++j) {
                    var skinning_set_j = sorted_skinning_set[j];
                    if (ns.ArrayUtils.isContained(
                            skinning_set_j.bones, 0, skinning_set_j.bones.length,
                            skinning_set_i.bones, 0, skinning_set_i.bones.length)) {
                        skinning_set_j.merge(skinning_set_i, false, true, true);
                        delete sorted_skinning_set[i];
                        break;
                    }
                }
            }
            for (var i = 0; i < skinning_set.length - 1; ++i) {
                var skinning_set_i = sorted_skinning_set[i];
                if (skinning_set_i !== undefined &&
                    skinning_set_i.bones.length <= max_matrix_pallet) {
                    for (var j = i + 1;
                        j < skinning_set.length &&
                            skinning_set_i.bones.length <= max_matrix_pallet;
                        ++j) {
                        var skinning_set_j = sorted_skinning_set[j];
                        if (skinning_set_j !== undefined &&
                            skinning_set_i.bones.length + skinning_set_j.bones.length <=
                                max_matrix_pallet) {
                            skinning_set_i.merge(skinning_set_j, true, true, true);
                            delete sorted_skinning_set[j];
                        }
                    }
                }
            }
            sorted_skinning_set =
                sorted_skinning_set.filter(function (a) { return a !== undefined; });

            // copy the optimized skinning set to the mesh subsets.
            mesh.num_subsets = skinning_set.length;
            mesh.subsets = new Array(mesh.num_subsets);
            for (var i = 0; i < mesh.num_subsets; ++i) {
                var skinning_set = skinning_set.length;
                var mesh_subset = new XModelMeshSubset();
                mesh_subset.num_vertices = skinning_set.vertices.length;
                mesh_subset.vertices = skinning_set.vertices;
                mesh_subset.num_elements = skinning_set.element.length;
                mesh_subset.elements = skinning_set.elements;
                mesh_subset.num_bones = skinning_set.bones.length;
                mesh_subset.bones = skinning_set.bones;
                mesh.subsets[i] = mesh_subset;
            }
        }
    };

    ns.XModelOptimizeUtils.optimizeBoneWeightedIndices = function(skin, limit_weighted_indices) {
        if (skin != null) {
            if (limit_weighted_indices === undefined || limit_weighted_indices <= 0) {
                limit_weighted_indices = 4;
            }
        }
    };

})(xpl);
