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

    const SIZE_VECTOR_3 = ns.Geometry.SIZE_VECTOR_3;
    const SIZE_MATRIX_4X4 = ns.Geometry.SIZE_MATRIX_4X4;

    /**
     * スキニング構造用のユーティリティクラスです。
     *
     * @namespace xpl.XModelSkinUtils
     * @see xpl.XModelNode
     * @see xpl.XModelMesh
     * @see xpl.XModelSkin
     * @author Syuuhei Kuno
     */
    ns.XModelSkinUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * 行列パレットを更新します。
     *
     * @memberof xpl.XModelSkinUtils
     * @function updateMatrixPallet
     * @param {xpl.XModelSkin?} skin - スキン構造のインスタンス
     * @param {xpl.uint16_t} num_matrices - 行列の数
     * @param {Float32Array} matrices - 行列パレット
     * @param {xpl.size_t} matrices_off - 行列パレットの配列インデックス
     * @returns {xpl.uint16_t} 実際に更新した行列の数
     */
    ns.XModelSkinUtils.updateMatrixPallet = function (skin, num_matrices, matrices, matrices_off) {
        if (skin != null) {
            for (let i = 0; i < skin.num_nodes && i < num_matrices; ++i) {
                let index = SIZE_MATRIX_4X4 * i;
                let node = skin.nodes[i];
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
     * 行列パレットの情報を元に頂点の位置を更新します。
     *
     * @memberof xpl.XModelSkinUtils
     * @member updateVertices
     * @param {Float32Array} mat_pallet - 行列パレット
     * @param {xpl.size_t} mat_pallet_off - 行列パレットの配列インデックス
     * @param {xpl.size_t} num_vertices - 頂点数
     * @param {Float32Array} src - 入力元の位置の配列
     * @param {xpl.size_t} src_off - 入力元の位置の配列インデックス
     * @param {xpl.size_t} src_stride - 入力元の位置の要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {Float32Array} dest - 出力先の位置の配列
     * @param {xpl.size_t} dest_off - 出力先の位置の配列インデックス
     * @param {xpl.size_t} dest_stride - 出力先の位置の要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {xpl.size_t} weighted_indices_size - 重み付きインデックスの配列長
     * @param {Uint8Array|Uint16Array|Uint32Array} indices - インデックスの配列
     * @param {xpl.size_t} indices_off - インデックスの配列インデックス
     * @param {xpl.size_t} indices_stride - インデックスの要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {Float32Array} weights - 重みの配列
     * @param {xpl.size_t} weights_off - 重みの配列インデックス
     * @param {xpl.size_t} weights_stride - 重みの要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {xpl.enum_t} type - 入力値のデータ種別を指定、
     *              <ul>
     *                  <li>xpl.XModelMesh.TYPE_POSITION: 位置</li>
     *                  <li>xpl.XModelMesh.TYPE_NORMAL: 法線</li>
     *              </ul>
     */
    ns.XModelSkinUtils.updateVertices = function (mat_pallet, mat_pallet_off,
                                                  num_vertices,
                                                  src, src_off, src_stride,
                                                  dest, dest_off, dest_stride,
                                                  weighted_indices_size,
                                                  indices, indices_off, indices_stride,
                                                  weights, weights_off, weights_stride,
                                                  type) {
        if (src_stride < SIZE_VECTOR_3) {
            src_stride = SIZE_VECTOR_3;
        }
        if (dest_stride < SIZE_VECTOR_3) {
            dest_stride = SIZE_VECTOR_3;
        }
        if (weights_stride < weighted_indices_size) {
            weights_stride = weighted_indices_size;
        }
        if (indices_stride < weighted_indices_size) {
            indices_stride = weighted_indices_size;
        }
        let trans_func = null;
        switch (type) {
            case ns.XModelMesh.TYPE_POSITION:
                trans_func = ns.Vector3.mulMatrix4x4v;
                break;
            case ns.XModelMesh.TYPE_NORMAL:
                trans_func = ns.Vector3.mulMatrix4x4Axisv;
                break;
            default:
                throw new Error("Unsupported the type of " + +".");
        }
        if (weighted_indices_size == 1) {
            // 重み付きインデックスの幅が1の場合
            for (let i = 0; i < num_vertices; ++i) {
                trans_func(
                    dest, dest_off,
                    mat_pallet, mat_pallet_off + SIZE_MATRIX_4X4 * indices[indices_off],
                    src, src_off,
                    true);
                src_off += src_stride;
                dest_off += dest_stride;
                indices_off += indices_stride;
            }
        } else if (1 < weighted_indices_size) {
            // 重み付きインデックスの幅が1を超える場合
            let vector = new Float32Array(SIZE_VECTOR_3);
            for (let i = 0; i < num_vertices; ++i) {
                ns.Vector3.loadZero(dest, dest_off);
                for (let j = 0; j < weighted_indices_size; ++j) {
                    let weight = weights[weights_off + j];
                    if (0 < weight) {
                        // 座標変換
                        trans_func(
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

})(xpl);
