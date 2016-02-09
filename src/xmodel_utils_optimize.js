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

    var OptimizeMap = function() {
        this.bones
    }

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
                    var new_vertices = new Uint16Array(element.num_vertices);
                    var to_end = element.num_vertices - min_index;
                    xpl.ArrayUtils.copy(
                        element.vertices, 0,
                        new_vertices, min_index,
                        to_end);
                    xpl.ArrayUtils.copy(
                        element.vertices, to_end,
                        new_vertices, 0,
                        min_index);
                    element.vertices = new_vertices;
                }
            }
        }
    };

    ns.XModelOptimizeUtils.optimizeMeshSkinning = function(mesh, limit_matrix_pallet) {
        if (limit_matrix_pallet === undefined || limit_matrix_pallet < 16) {
            limit_matrix_pallet = 16;
        }
        if (mesh != null && mesh.skin != null && limit_matrix_pallet < mesh.skin.num_nodes) {
            //
            var map = new Array(mesh.num_vertices);
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var vertex = mesh.vertices[i];
                var skin_index = mesh.skin.weighted_index_stride * vertex.skinning;
                var skin_bone_len = mesh.skin.weighted_index_sizes[vertex.skinning];
                for (var j = 0; j < skin_bone_len; ++j) {
                    var bone_index = mesh.skin.indices[skin_index + k];
                    if (map[bone_index] == undefined) {
                        map[bone_index] = [i];
                    } else if (map.indexOf(i) == -1) {
                        map[bone_index]
                    }
                }
            }


            // build the skinning indices map.
            var indices_map = [];
            for (var i = 0; i < mesh.num_elements; ++i) {
                var indices = [];
                var element = mesh.elements[i];
                for (var j = 0; j < element.num_vertices; ++j) {
                    var vertex_index = element.vertices[j];
                    var vertex = mesh.vertices[vertex_index];
                    var skin_index = mesh.skin.weighted_index_stride * vertex.skinning;
                    for (var k = mesh.skin.weighted_index_sizes[vertex.skinning] - 1; 0 <= k; --k) {
                        var index = mesh.skin.indices[skin_index + k];
                        if (indices.indexOf(index) == -1) {
                            indices.push(index);
                        }
                    }
                }
                indices.sort();
                var key = "[" + indices.toString() + "]";
                if (indices_map[key] === undefined) {
                    indices_map[key] = indices;
                }
            }






            // build and sort skinning indices set.
            var indices_set = [];
            for (var key in indices_map) {
                indices_set.push(indices_map[key]);
            }
            indices_set.sort(function(a, b) { return b.length - a.length; });

            // exclude subset between elements.
            for (var i = 0; i < indices_set.length; ++i) {
                var indices = indices_set[i];
                if (indices != null) {
                    for (var j = i + 1; j < indices_set.length; ++j) {
                        var inds = indices_set[j];
                        if (inds != null) {
                            if (ns.ArrayUtils.isContained(
                                    indices, 0, indices.length,
                                    inds, 0, inds.length)) {
                                indices_set[j] = null;
                            }
                        }
                    }
                }
            }

            // build the replace map for skinning indices.
            var replace_indices_set = [];
            for (var i = 0; i < indices_set.length; ++i) {
                var indices = indices_set[i];
                if (indices != null) {
                    var replace_indices = [];
                    for (var j = i + 1; j < indices_set.length; ++j) {
                        var inds = indices_set[j];
                        if (inds != null) {
                            if (replace_indices.length <= limit_matrix_pallet) {
                                break;
                            }
                        }
                    }
                    replace_indices_set.push(replace_indices);
                }
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
