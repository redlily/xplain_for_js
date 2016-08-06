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

(function (xpl) {

    "use strict";

    /**
     * 材質構造用のユーティリティクラスです。
     *
     * @namespace xpl.XModelMeshUtils
     * @see xpl.XModelMesh
     */
    xpl.XModelMeshUtils = function () {
        throw new Error("Unsupported operation");
    };

    Object.defineProperties(xpl.XModelMeshUtils, {

        /**
         * 構造のサイズの属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_STRUCTURE_SIZE
         */
        ATTRIBUTE_STRUCTURE_SIZE: {value: 0},

        /**
         * 位置の属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_POSITION
         */
        ATTRIBUTE_POSITION: {value: 1},

        /**
         * 法線の属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_NORMAL
         */
        ATTRIBUTE_NORMAL: {value: 2},

        /**
         * 色の属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_COLOR
         */
        ATTRIBUTE_COLOR: {value: 3},

        /**
         * テクスチャ座標の属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_TEXCOORD
         */
        ATTRIBUTE_TEXCOORD: {value: 4},

        /**
         * ボーンの長さの属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_BONELENGTH
         */
        ATTRIBUTE_BONELENGTH: {value: 5},

        /**
         * ボーンのインデックスの属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_BONEINDICES
         */
        ATTRIBUTE_BONEINDICES: {value: 6},

        /**
         * ボーンの重みの属性
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} ATTRIBUTE_BONEWEIGHTS
         */
        ATTRIBUTE_BONEWEIGHTS: {value: 7},

        /**
         * 属性の定義数
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.size_t} MAX_ATTRIBUTE
         */
        MAX_ATTRIBUTE: {value: 8},

        /**
         * 型なし
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} TYPE_VOID
         */
        TYPE_VOID: {value: 0},

        /**
         * 符号なし8ビット整数型
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} TYPE_UNSIGNED_BYTE
         */
        TYPE_UNSIGNED_BYTE: {value: 1},

        /**
         * 符号なし16ビット整数型
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} TYPE_UNSIGNED_SHORT
         */
        TYPE_UNSIGNED_SHORT: {value: 2},

        /**
         * 符号なし32ビット整数型
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} TYPE_UNSIGNED_INT
         */
        TYPE_UNSIGNED_INT: {value: 3},

        /**
         * 32ビット浮動小数点数型
         *
         * @memberof xpl.XModelMeshUtils
         * @const {xpl.enum_t} TYPE_FLOAT
         */
        TYPE_FLOAT: {value: 4}
    });

    /**
     *
     * @param {xpl.XModelMesh} mesh -
     * @param {xpl.enum_t} attr -
     * @param {Float32Array} buff -
     * @param {} off -
     * @param {} size -
     * @param {} stride -
     * @param {} subset -
     */
    xpl.XModelMeshUtils.getAttributeValues = function (mesh, attr, buff, off, size, stride, subset) {
        off = xpl.defaultValue(off, 0);
        size = xpl.defaultValue(size, 1);
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        var value_size;
        var values;
        switch (attr) {
            case xpl.XModelMeshUtils.ATTRIBUTE_POSITION:
                value_size = mesh.position_size;
                values = mesh.positions;
                break;
        }

        let count = 0;
        if (mesh != null && mesh.positions != null && 0 < mesh.position_size) {
            if (stride < size) {
                stride = size;
            }

            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.position != -1) {
                    // 要素が存在する場合
                    let ind = mesh.position_size * v.position;
                    let j = 0;
                    for (; j < size && j < mesh.position_size; ++j) {
                        buf[off + j] = mesh.positions[ind++];
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * 頂点の位置を取得します。
     *
     * @memberof xpl.XModelMesh
     * @function getPositions
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {Float32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} [off=0] - 書き出し先のバッファの配列オフセット
     * @param {xpl.size_t} [size=3] - 位置の構造のサイズ
     * @param {xpl.size_t} [stride=0] - 位置の要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {xpl.int16_t} [subset=-1] - サブセットの番号
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getPositions = function (mesh, buf, off, size, stride, subset) {
        off = xpl.defaultValue(off, 0);
        size = xpl.defaultValue(size, 3);
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.positions != null && 0 < mesh.position_size) {
            if (stride < size) {
                stride = size;
            }

            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.position != -1) {
                    // 要素が存在する場合
                    let ind = mesh.position_size * v.position;
                    let j = 0;
                    for (; j < size && j < mesh.position_size; ++j) {
                        buf[off + j] = mesh.positions[ind++];
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * 頂点の法線を取得します。
     *
     * @memberof xpl.XModelMesh
     * @function getNormals
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} size - 法線の構造のサイズ
     * @param {xpl.size_t} stride - 法線の要素の配置間隔、0を指定した場合はデフォルト値を使用します。
     * @param {Float32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getNormals = function (mesh, size, stride, buf, off, subset) {
        off = xpl.defaultValue(off, 0);
        size = xpl.defaultValue(size, 3);
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.normals != null && 0 < mesh.normal_size) {
            if (stride < size) {
                stride = size;
            }

            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.normal != -1) {
                    // 要素が存在する場合
                    let ind = mesh.normal_size * v.normal;
                    let j = 0;
                    for (; j < size && j < mesh.normal_size; ++j) {
                        buf[off + j] = mesh.normals[ind++];
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * Get the colors data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getColors
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} size - Size of the color structure.
     * @param {xpl.size_t} stride - Size of the color structure.
     * @param {Uint8Array|Float32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getColors = function (mesh, size, stride, buf, off, subset) {
        off = xpl.defaultValue(off, 0);
        size = xpl.defaultValue(size, 4);
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.colors != null && 0 < mesh.color_size) {
            if (subset === undefined) {
                subset = -1;
            }
            if (stride < size) {
                stride = size;
            }
            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // scaling.
            let value_scale =
                (buf instanceof Uint8Array || buf instanceof Int8Array) ? 255 : 1;

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.color != -1) {
                    // 要素が存在する場合
                    let ind = mesh.color_size * v.color;
                    let j = 0;
                    for (; j < size && j < mesh.color_size; ++j) {
                        buf[off + j] = mesh.colors[ind++] * value_scale;
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * Get the texture coordinates data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getTexCoords
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} size - Size of the texture coordinate structure.
     * @param {xpl.size_t} stride - Size of the texture coordinate structure.
     * @param {Float32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getTexCoords = function (mesh, size, stride, buf, off, subset) {
        off = xpl.defaultValue(off, 0);
        size = xpl.defaultValue(size, 2);
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.tex_coords != null && 0 < mesh.tex_coord_size) {
            if (subset === undefined) {
                subset = -1;
            }
            if (stride < size) {
                stride = size;
            }
            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.tex_coord != -1) {
                    // 要素が存在する場合
                    let ind = mesh.tex_coord_size * v.tex_coord;
                    let j = 0;
                    for (; j < size && j < mesh.tex_coord_size; ++j) {
                        buf[off + j] = mesh.tex_coords[ind++];
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * Get the bone lengths data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getSkinBoneLengths
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} stride - Size of the bone lengths structure.
     * @param {Uint16Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getSkinBoneLengths = function (mesh, stride, buf, off, subset) {
        let count = 0;
        if (mesh != null && mesh.skin != null && 1 < mesh.skin.weighted_index_stride) {
            if (subset === undefined) {
                subset = -1;
            }
            if (stride < 1) {
                stride = 1;
            }
            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.skinning != -1) {
                    // 要素が存在する場合
                    buf[off] = mesh.skin.weighted_index_sizes[v.skinning];
                } else {
                    // 要素が存在しない場合
                    buf[off] = 0;
                }
            }
        }
        return count;
    };

    /**
     * Get the bone indices data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} size - Size of the bone indices structure.
     * @param {xpl.size_t} stride - Size of the bone indices structure.
     * @param {Uint8Array|Uint16Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getSkinBoneIndices = function (mesh, size, stride, buf, off, subset) {
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
            if (subset === undefined) {
                subset = -1;
            }
            if (stride < size) {
                stride = size;
            }
            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];

                // the element is exist.
                if (v.skinning != -1) {
                    let len = mesh.skin.weighted_index_sizes[v.skinning];
                    let ind = mesh.skin.weighted_index_stride * v.skinning;
                    let j = 0;
                    for (; j < size && j < len && mesh.skin.weighted_index_stride; ++j) {
                        if (sub == null) {
                            // use the superset.
                            buf[off + j] = mesh.skin.indices[ind++];
                        } else {
                            // use the subset.
                            let index = xpl.ArrayUtils.binarySearch(
                                sub.bones, 0, sub.num_bones, mesh.skin.indices[ind++]);
                            buf[off + j] = 0 <= index ? index : 0;
                        }
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // 要素が存在しない場合
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * Get the bone weights data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} size - Size of the bone weights structure.
     * @param {xpl.size_t} stride - Size of the bone weights structure.
     * @param {Float32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} 実際に書き出した要素数
     */
    xpl.XModelMeshUtils.getSkinBoneWeights = function (mesh, size, stride, buf, off, subset) {
        stride = xpl.defaultValue(stride, 0);
        subset = xpl.defaultValue(subset, -1);

        let count = 0;
        if (mesh != null && mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
            if (subset === undefined) {
                subset = -1;
            }
            if (stride < size) {
                stride = size;
            }
            let sub;
            let num_vertices;
            if (subset == -1) {
                sub = null;
                num_vertices = mesh.num_vertices;
            } else {
                sub = mesh.subsets[subset];
                num_vertices = sub.num_vertices;
            }

            // 全ての頂点を走査
            for (let i = 0; i < num_vertices; ++i) {
                let v = mesh.vertices[sub == null ? i : sub.vertices[i]];
                if (v.skinning != -1) {
                    // the element is exist.
                    let len = mesh.skin.weighted_index_sizes[v.skinning];
                    let ind = mesh.skin.weighted_index_stride * v.skinning;
                    let j = 0;
                    for (; j < size && j < len && mesh.skin.weighted_index_stride; ++j) {
                        buf[off + j] = mesh.skin.weights[ind++];
                        count++;
                    }

                    // 残りの要素を0で埋める
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // not exist element.
                    for (let j = 0; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                }
                off += stride;
            }
        }
        return count;
    };

    /**
     * Get the byte size of entire vertices that information.
     *
     * @memberof xpl.XModelMesh
     * @function getVerticesSize
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {Boolean} is_structured -
     *              Set true if output the structured information, set false
     *              if output the discreted information.
     * @param {xpl.size_t} alignment_size -
     *              The size of memory alignment,
     *              must specified the value of power of 2.
     * @param {xpl.size_t} position_size - The byte size of position.
     * @param {xpl.size_t} normal_size - The byte size of normal.
     * @param {xpl.size_t} color_size - The byte size of color.
     * @param {xpl.size_t} tex_coord_size - The byte size of texture coordinate.
     * @param {xpl.size_t} bone_length_size - The byte size of length of bones.
     * @param {xpl.size_t} bone_indices_size - The byte size of bone index.
     * @param {xpl.size_t} bone_weights_size - The byte size of bone weight.
     * @param {xpl.size_t[]} attrs -
     *              The destination byte size of each attribute.
     *              -1 set if it attribute is not exit the index.
     * @param {xpl.size_t} off - Starting position in the destination attribute indices.
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first arguments).
     * @returns {xpl.size_t} byte size of the all attributes.
     */
    xpl.XModelMeshUtils.getVerticesSize = function (mesh,
                                                   is_structured,
                                                   alignment_size,
                                                   position_size,
                                                   normal_size,
                                                   color_size,
                                                   tex_coord_size,
                                                   bone_length_size,
                                                   bone_indices_size,
                                                   bone_weights_size,
                                                   attrs, off,
                                                   subset) {
        attrs = xpl.defaultValue(attrs, null);
        off = xpl.defaultValue(off, 0);
        subset = xpl.defaultValue(subset, -1);

        if (mesh != null && mesh.vertices != null && 0 < mesh.num_vertices) {
            if (subset === undefined) {
                subset = -1;
            }
            if (attrs != null) {
                xpl.ArrayUtils.fill(attrs, off, off + xpl.XModelMeshUtils.MAX_ATTRIBUTE, -1);
            }
            let size = 0;
            let num_vertices = is_structured ?
                1 : (subset == -1 ? mesh.num_vertices : mesh.subsets[subset].num_vertices);

            // position.
            if (0 < position_size && 0 < mesh.position_size) {
                if (attrs != null) {
                    attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_POSITION] = size;
                }
                size += num_vertices * mesh.position_size * position_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // normal.
            if (0 < normal_size && 0 < mesh.normal_size) {
                if (attrs != null) {
                    attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_NORMAL] = size;
                }
                size += num_vertices * mesh.normal_size * normal_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // color.
            if (0 < color_size && 0 < mesh.color_size) {
                if (attrs != null) {
                    attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_COLOR] = size;
                }
                size += num_vertices * mesh.color_size * color_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // texture coordinate.
            if (0 < tex_coord_size && 0 < mesh.tex_coord_size) {
                if (attrs != null) {
                    attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_TEXCOORD] = size;
                }
                size += num_vertices * mesh.tex_coord_size * tex_coord_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            if (mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
                // has the skin.

                // weighted indices of the bones.
                if (0 < bone_length_size) {
                    if (attrs != null) {
                        attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_BONELENGTH] = size;
                    }
                    size += num_vertices * bone_length_size;
                    size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                }

                // indices of the bones.
                if (0 < bone_indices_size) {
                    if (attrs != null) {
                        attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_BONEINDICES] = size;
                    }
                    size += num_vertices * mesh.skin.weighted_index_stride * bone_indices_size;
                    size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                }

                // weights of the bones.
                if (0 < bone_weights_size) {
                    if (attrs != null) {
                        attrs[off + xpl.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS] = size;
                    }
                    size += num_vertices * mesh.skin.weighted_index_stride * bone_weights_size;
                    size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                }
            }

            // structured size.
            if (is_structured) {
                attrs[xpl.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE] = size;
                return (subset == -1 ?
                        mesh.num_vertices : mesh.subsets[subset].num_vertices) * size;
            } else {
                attrs[xpl.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE] = 0;
                return size;
            }
        }
        return 0;
    };

    /**
     * Get the vertex values that information.
     *
     * @memberof xpl.XModelMesh
     * @function getDividedVertices
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} position_type - The type of the position.
     * @param {xpl.size_t} normal_type - The type of normal.
     * @param {xpl.size_t} color_type - The type of color.
     * @param {xpl.size_t} tex_coord_type - The type of texture coordinate.
     * @param {xpl.size_t} bone_length_type - The type of length of bones.
     * @param {xpl.size_t} bone_indices_type - The type of bone indices.
     * @param {xpl.size_t} bone_weights_type - The type of bone weights.
     * @param {Int32Array} attrs - The attribute indices.
     * @param {xpl.size_t} attrs_off - Starting position in the attribute indices.
     * @param {ArrayBuffer} buf - The array buffer.
     * @param {xpl.size_t} buf_off - The offset of array buffer.
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     */
    xpl.XModelMeshUtils.getVertices = function (mesh,
                                               position_type,
                                               normal_type,
                                               color_type,
                                               tex_coord_type,
                                               bone_length_type,
                                               bone_indices_type,
                                               bone_weights_type,
                                               attrs, attrs_off,
                                               buf, buf_off,
                                               subset) {
        if (mesh != null && mesh.vertices != null && 0 < mesh.num_vertices) {
            let stride = attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE];
            let num_vertices = stride <= 0 ? mesh.num_vertices : 1;
            let offset;

            // write the positions.
            if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_POSITION]) {
                offset = buf_off +
                    attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_POSITION];
                switch (position_type) {
                    case xpl.XModelMeshUtils.TYPE_FLOAT:
                        xpl.XModelMeshUtils.getPositions(mesh, new Float32Array(
                            buf,
                            offset,
                            Math.floor((buf.byteLength - offset) / 4)), 0, mesh.position_size,
                            stride / 4,
                            subset);
                        break;
                }
            }

            // write the normals.
            if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_NORMAL]) {
                offset = buf_off +
                    attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_NORMAL];
                switch (normal_type) {
                    case xpl.XModelMeshUtils.TYPE_FLOAT:
                        xpl.XModelMeshUtils.getNormals(
                            mesh,
                            mesh.normal_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                offset,
                                Math.floor((buf.byteLength - offset) / 4)),
                            0,
                            subset);
                        break;
                }
            }

            // write the colors.
            if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_COLOR]) {
                offset = buf_off +
                    attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_COLOR];
                switch (color_type) {
                    case xpl.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                        xpl.XModelMeshUtils.getColors(
                            mesh,
                            mesh.color_size,
                            stride,
                            new Uint8Array(
                                buf,
                                offset),
                            0,
                            subset);
                        break;

                    case xpl.XModelMeshUtils.TYPE_FLOAT:
                        xpl.XModelMeshUtils.getColors(
                            mesh,
                            mesh.color_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                offset,
                                Math.floor((buf.byteLength - offset) / 4)),
                            0,
                            subset);
                        break;
                }
            }

            // write the texture coordnates.
            if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_TEXCOORD]) {
                offset = buf_off +
                    attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_TEXCOORD];
                switch (tex_coord_type) {
                    case xpl.XModelMeshUtils.TYPE_FLOAT:
                        xpl.XModelMeshUtils.getTexCoords(
                            mesh,
                            mesh.tex_coord_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                offset,
                                Math.floor((buf.byteLength - offset) / 4)),
                            0,
                            subset);
                        break;
                }
            }

            if (mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
                // has the skin.
                // write the number of bones.
                if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONELENGTH]) {
                    offset = buf_off +
                        attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONELENGTH];
                    switch (bone_length_type) {
                        case xpl.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                            xpl.XModelMeshUtils.getSkinBoneLengths(
                                mesh,
                                stride,
                                new Uint8Array(
                                    buf,
                                    offset),
                                0,
                                subset);
                            break;
                    }
                }

                // write the bone indices.
                if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONEINDICES]) {
                    offset = buf_off +
                        attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONEINDICES];
                    switch (bone_indices_type) {
                        case xpl.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                            xpl.XModelMeshUtils.getSkinBoneIndices(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride,
                                new Uint8Array(
                                    buf,
                                    offset),
                                0,
                                subset);
                            break;

                        case xpl.XModelMeshUtils.TYPE_UNSIGNED_SHORT:
                            xpl.XModelMeshUtils.getSkinBoneIndices(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride / 2,
                                new Uint16Array(
                                    buf,
                                    offset,
                                    Math.floor((buf.byteLength - offset) / 2)),
                                0,
                                subset);
                            break;
                    }
                }

                // write the bone weights.
                if (0 <= attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS]) {
                    offset = buf_off +
                        attrs[attrs_off + xpl.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS];
                    switch (bone_weights_type) {
                        case xpl.XModelMeshUtils.TYPE_FLOAT:
                            xpl.XModelMeshUtils.getSkinBoneWeights(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride / 4,
                                new Float32Array(
                                    buf,
                                    offset,
                                    Math.floor((buf.byteLength - offset) / 4)),
                                0,
                                subset);
                            break;
                    }
                }
            }
        }
    };

    /**
     * Get the number of triangle indices of specified material within the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getNumTriangledFaceIndices
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t} material - The index of material.
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} The number of elements.
     */
    xpl.XModelMeshUtils.getNumTriangledFaceIndices = function (mesh, material, subset) {
        let count = 0;
        if (mesh != null) {
            if (subset === undefined) {
                subset = -1
            }
            let num_elements;
            let elements;
            if (subset == -1) {
                num_elements = mesh.num_elements;
                elements = mesh.elements;
            } else {
                let sub = mesh.subsets[subset];
                num_elements = sub.num_elements;
                elements = sub.elements;
            }

            // count the triangle faces.
            for (let i = 0; i < num_elements; ++i) {
                let element = elements[i];
                if (element.material == material) {
                    if (3 <= element.num_vertices) {
                        count += (element.num_vertices - 2) * 3;
                    }
                }
            }
        }
        return count;
    };

    /**
     * Get the number of triangle indices of all materials within the mesh.
     *
     *
     * @memberof xpl.XModelMesh
     * @function getNumAllTriangledFaceIndices
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.size_t[]} offs -
     *              The destination array of each offset.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} offs_off -
     *              Starting position in the destination
     *              array of each offset.
     * @param {xpl.size_t[]} sizes -
     *              The destination array of each size.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} sizes_off -
     *              Starting position in the the destination
     *              array of each size.
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t}
     *              The number of elements.
     */
    xpl.XModelMeshUtils.getNumAllTriangledFaceIndices = function (mesh,
                                                                 offs, offs_off,
                                                                 sizes, sizes_off,
                                                                 subset) {
        let count = 0;
        if (mesh != null) {
            // listed the materials.
            for (let i = 0; i < mesh.num_materials; ++i) {
                if (offs != null) {
                    offs[offs_off + i] = count;
                }
                let num = xpl.XModelMeshUtils.getNumTriangledFaceIndices(mesh, i, subset);
                if (sizes != null) {
                    sizes[sizes_off + i] = num;
                }
                count += num;
            }

            // default a material.
            if (offs != null) {
                offs[offs_off + mesh.num_materials] = count;
            }
            let num = xpl.XModelMeshUtils.getNumTriangledFaceIndices(mesh, -1, subset);
            if (sizes != null) {
                sizes[sizes_off + mesh.num_materials] = num;
            }
            count += num;
        }
        return count;
    };

    /**
     * Get the indices in triangled faces of mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getTriangledFaceIndices
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.int16_t} material - The index of material.
     * @param {Boolean} reverse -
     *              Set the true if reverse the faces,
     *              Set the false if not reverse the faces.
     * @param {Uint16Array|Uint32Array} buf - 書き出し先のバッファ
     * @param {xpl.size_t} off - 書き出し先のバッファの配列オフセット
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} The number of elements.
     */
    xpl.XModelMeshUtils.getTriangledFaceIndices = function (mesh,
                                                           material, reverse,
                                                           buf, off,
                                                           subset) {
        let count = 0;
        if (mesh != null) {
            if (subset === undefined) {
                subset = -1;
            }
            let num_elements;
            let elements;
            if (subset == -1) {
                num_elements = mesh.num_elements;
                elements = mesh.elements;
            } else {
                let sub = mesh.subsets[subset];
                num_elements = sub.num_elements;
                elements = sub.elements;
            }

            // triangle order.
            let sq0, sq1, sq2;
            if (reverse) {
                sq0 = 0;
                sq1 = 2;
                sq2 = 1;
            } else {
                sq0 = 0;
                sq1 = 1;
                sq2 = 2;
            }

            // write the vertex indices of face to the buffer.
            for (let i = 0; i < num_elements; ++i) {
                let element = elements[i];
                if (element.material == material) {
                    for (let j = 0, j_end = element.num_vertices - 2; j < j_end; ++j) {
                        buf[off + sq0] = element.vertices[0];
                        buf[off + sq1] = element.vertices[j + 1];
                        buf[off + sq2] = element.vertices[j + 2];
                        off += 3;
                        count += 3;
                    }
                }
            }
        }
        return count;
    };

    /**
     * Get the number of indices in triangled faces of mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getAllTriangledFaceIndices
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {Boolean} reverse -
     *              Set the true if reverse the faces,
     *              Set the false if not reverse the faces.
     * @param {xpl.size_t[]} offs - The offset of array.
     * @param {xpl.size_t} offs_off - The offset of offset array.
     * @param {Uint16Array|Uint32Array} buf - The buffer of writing destination.
     * @param {xpl.size_t} buf_off - The offset of buffer.
     * @param {xpl.int16_t} [subset=-1] -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argument).
     * @returns {xpl.size_t} The number of elements.
     */
    xpl.XModelMeshUtils.getAllTriangledFaceIndices = function (mesh,
                                                              reverse,
                                                              offs, offs_off,
                                                              buf, buf_off,
                                                              subset) {
        let count = 0;
        if (mesh != null) {
            for (let i = 0; i < mesh.num_materials; ++i) {
                count += xpl.XModelMeshUtils.getTriangledFaceIndices(
                    mesh, i, reverse, buf, buf_off + offs[offs_off + i], subset);
            }
        }
        return count;
    };

    /**
     * Release retention the memory which shape data in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function releaseShape
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     */
    xpl.XModelMeshUtils.releaseShape = function (mesh) {
        if (mesh != null) {
            mesh.positions = null;
            mesh.normals = null;
            mesh.colors = null;
            mesh.tex_coords = null;
            mesh.vertices = null;
            if (mesh.skin != null) {
                mesh.skin.weighted_index_sizes = null;
                mesh.skin.indices = null;
                mesh.skin.weights = null;
            }
            mesh.elements = null;
            if (mesh.subsets != null) {
                for (let i = 0; i < mesh.num_subsets; ++i) {
                    let subset = mesh.subsets[i];
                    subset.vertices = null;
                    subset.elements = null;
                }
            }
        }
    };

    /**
     * Get the number of textures that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getTextures
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     * @param {xpl.XModelTexture[]} dest -
     *              The destination array for texture.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination array.
     * @param {xpl.size_t} len - maximum number of the elements to be copied.
     * @returns {xpl.size_t} Number of the texture.
     */
    xpl.XModelMeshUtils.getTextures = function (mesh, dest, off, len) {
        let count = 0;
        if (mesh != null) {
            for (let i = 0; i < mesh.num_materials; ++i) {
                let num = xpl.XModelMaterialUtils.getTextures(
                    mesh.materials[i], dest, off, len);
                off += num;
                len -= num;
                count += num;
            }
        }
        return count;
    };

    /**
     * Release the textures that included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function releaseTextures
     * @param {xpl.XModelMesh} mesh - メッシュ構造のインスタンス
     */
    xpl.XModelMeshUtils.releaseTextures = function (mesh) {
        if (mesh != null) {
            for (let i = 0; i < mesh.num_materials; ++i) {
                xpl.XModelMaterialUtils.releaseTexture(mesh.materials[i]);
            }
        }
    };

})(xpl);
