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


(function(ns) {

    "use strict";

    var SIZE_VECTOR_3 = ns.Geometry.SIZE_VECTOR_3;
    var SIZE_MATRIX_4X4 = ns.Geometry.SIZE_MATRIX_4X4;

    /**
     * Utilities for the xModel skin structure.
     *
     * @namespace xpl.XModelSkinUtils
     * @see xpl.XModelMesh
     * @see xpl.XModelSkin
     * @author Syuuhei Kuno
     */
    ns.XModelSkinUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * Update the matrix pallet.
     *
     * @memberof xpl.XModelSkinUtils
     * @function updateMatrixPallet
     * @param {xpl.XModelSkin?} skin - The skin instance.
     * @param {xpl.uint16_t} num_matrices - Number of the matrices in the pallet.
     * @param {Float32Array} matrices - The destination matrices.
     * @param {xpl.size_t} matrices_off - Starting position in the destination matrices.
     * @returns {xpl.uint16_t} The number of updated nodes.
     */
    ns.XModelSkinUtils.updateMatrixPallet = function(skin, num_matrices, matrices, matrices_off) {
        if (skin != null) {
            for (var i = 0; i < skin.num_nodes && i < num_matrices; ++i) {
                var index = SIZE_MATRIX_4X4 * i;
                var node = skin.nodes[i];
                if (node != null) {
                    ns.Matrix4x4.mulv(
                        matrices, matrices_off + index,
                        node.combined_matrix, 0,
                        skin.offset_matrices, index);
                } else {
                    ns.Matrix4x4.loadIdentity(matrices, matrices_off + index);
                }
            }
            return Math.min(skin.num_nodes, num_matrices);
        }
        return 0;
    };

    /**
     * Update the positions by matrix pallet.
     *
     * @memberof xpl.XModelSkinUtils
     * @function updatePositions
     * @param {Float32Array} mat_pallet - The matrix pallet.
     * @param {xpl.size_t} mat_pallet_off - Starting position in the matrix pallet.
     * @param {xpl.size_t} num_vertices - Number of the positions.
     * @param {Float32Array} src - The source positions.
     * @param {xpl.size_t} src_off - Starting position in the source positions.
     * @param {xpl.size_t} src_stride - The offset between consecutive source positions.
     * @param {Float32Array} dest - The destination positions.
     * @param {xpl.size_t} dest_off - Starting position in the destination positions.
     * @param {xpl.size_t} dest_stride - The offset between consecutive destination positions.
     * @param {xpl.size_t} weighted_indices_stride - The offset between consecutive weighted indices.
     * @param {Uint8Array|Uint16Array|Uint32Array} indices - The indices in matrix pallet.
     * @param {xpl.size_t} indices_off - Starting position in the indices in matrix pallet.
     * @param {xpl.size_t} indices_stride - The offset between consecutive indices in matrix pallet.
     * @param {Float32Array} weights - The weights for matrix.
     * @param {xpl.size_t} weights_off - Starting position in the weights for matrix.
     * @param {xpl.size_t} weights_stride - The offset between consecutive weights for matrix.
     */
    ns.XModelSkinUtils.updatePositions = function(mat_pallet, mat_pallet_off,
                                                  num_vertices,
                                                  src, src_off, src_stride,
                                                  dest, dest_off, dest_stride,
                                                  weighted_indices_stride,
                                                  indices, indices_off, indices_stride,
                                                  weights, weights_off, weights_stride) {
        if (src_stride < SIZE_VECTOR_3) {
            src_stride = SIZE_VECTOR_3;
        }
        if (dest_stride < SIZE_VECTOR_3) {
            dest_stride = SIZE_VECTOR_3;
        }
        if (weights_stride < weighted_indices_stride) {
            weights_stride = weighted_indices_stride;
        }
        if (indices_stride < weighted_indices_stride) {
            indices_stride = weighted_indices_stride;
        }
        if (weighted_indices_stride == 1) {
            // number of bone affected is one.
            for (var i = 0; i < num_vertices; ++i) {
                ns.Vector3.mulMatrix4x4v(
                    dest, dest_off,
                    mat_pallet, mat_pallet_off + SIZE_MATRIX_4X4 * indices[indices_off],
                    src, src_off,
                    true);
                src_off += src_stride;
                dest_off += dest_stride;
                indices_off += indices_stride;
            }
        } else if (1 < weighted_indices_stride) {
            // number of bones affected is multiple.
            var vector = new Float32Array(SIZE_VECTOR_3);
            for (var i = 0; i < num_vertices; ++i) {
                ns.Vector3.loadZero(dest, dest_off);
                for (var j = 0; j < weighted_indices_stride; ++j) {
                    var weight = weights[weights_off + j];
                    if (0 < weight) {
                        // transform the position.
                        ns.Vector3.mulMatrix4x4v(
                            vector, 0,
                            mat_pallet, mat_pallet_off + SIZE_MATRIX_4X4 * indices[indices_off + j],
                            src, src_off,
                            true);
                        ns.Vector3.mulv(vector, 0, vector, 0, weight);
                        ns.Vector3.addv(dest, dest_off, dest, dest_off, vector, 0);
                    }
                }
                src_off += src_stride;
                dest_off += dest_stride;
                indices_off += indices_stride;
                weights_off += weights_stride;
            }
        }
    };

    /**
     * Update the normals by rotation pallet.
     *
     * @memberof xpl.XModelSkin
     * @function updateNormals
     * @param {Float32Array} rot_pallet - The rotation matrix pallet.
     * @param {xpl.size_t} rot_pallet_off - Starting position in the rotation matrix pallet.
     * @param {xpl.uint32_t} num_vertices - Number of the normals.
     * @param {Float32Array} src - The source normals.
     * @param {xpl.size_t} src_off - Starting position in the source normals.
     * @param {xpl.size_t} src_stride - The offset between consecutive source normals.
     * @param {Float32Array} dest - The destination normals.
     * @param {xpl.size_t} dest_off - Starting position in the destination normals.
     * @param {xpl.size_t} dest_stride - The offset between consecutive destination normals.
     * @param {xpl.size_t} weighted_indices_stride - The offset between consecutive weighted indices.
     * @param {Uint8Array|Uint16Array|Uint32Array} indices - The indices in matrix pallet.
     * @param {xpl.size_t} indices_off - Starting position in the indices in matrix pallet.
     * @param {xpl.size_t} indices_stride - The offset between consecutive indices in matrix pallet.
     * @param {Float32Array} weights - The weights for matrix.
     * @param {xpl.size_t} weights_off - Starting position in the weights for rotation matrix.
     * @param {xpl.size_t} weights_stride - The offset between consecutive weights for rotation_matrix.
     */
    ns.XModelSkinUtils.updateNormals = function(rot_pallet, rot_pallet_off,
                                                num_vertices,
                                                src, src_off, src_stride,
                                                dest, dest_off, dest_stride,
                                                weighted_indices_stride,
                                                indices, indices_off, indices_stride,
                                                weights, weights_off, weights_stride) {
        if (src_stride < SIZE_VECTOR_3) {
            src_stride = SIZE_VECTOR_3;
        }
        if (dest_stride < SIZE_VECTOR_3) {
            dest_stride = SIZE_VECTOR_3;
        }
        if (weights_stride < weighted_indices_stride) {
            weights_stride = weighted_indices_stride;
        }
        if (indices_stride < weighted_indices_stride) {
            indices_stride = weighted_indices_stride;
        }
        if (weighted_indices_stride == 1) {
            // number of bone affected is one.
            for (var i = 0; i < num_vertices; ++i) {
                ns.Vector3.mulMatrix4x4Axisv(
                    dest, dest_off,
                    rot_pallet, rot_pallet_off + SIZE_MATRIX_4X4 * indices[indices_off],
                    src, src_off);
                src_off += src_stride;
                dest_off += dest_stride;
                indices_off += indices_stride;
            }
        } else if (1 < weighted_indices_stride) {
            // number of bones affected is multiple.
            var vector = new Float32Array(SIZE_VECTOR_3);
            for (var i = 0; i < num_vertices; ++i) {
                ns.Vector3.loadZero(dest, dest_off);
                for (var j = 0; j < weighted_indices_stride; ++j) {
                    var weight = weights[weights_off + j];
                    if (0 < weight) {
                        // transform the normal.
                        ns.Vector3.mulMatrix4x4Axisv(
                            vector, 0,
                            rot_pallet, rot_pallet_off + SIZE_MATRIX_4X4 * indices[indices_off + j],
                            src, src_off);
                        ns.Vector3.mulv(vector, 0, vector, 0, weight);
                        ns.Vector3.addv(dest, dest_off, dest, dest_off, vector, 0);
                    }
                }
                src_off += src_stride;
                dest_off += dest_stride;
                indices_off += indices_stride;
                weights_off += weights_stride;
            }
        }
    };

})(xpl);
