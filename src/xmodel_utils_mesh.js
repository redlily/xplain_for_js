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

    /**
     * Utilities for the xModel mesh structure.
     *
     * @namespace xpl.XModelMeshUtils
     * @see xpl.XModelMesh
     * @author Syuuhei Kuno
     */
    ns.XModelMeshUtils = function() {
    };

    Object.defineProperties(ns.XModelMeshUtils, {

        /**
         * Attribute index of the structure size.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_STRUCTURE_SIZE
         */
        "ATTRIBUTE_STRUCTURE_SIZE": {
            value: 0,
        },

        /**
         * Attribute index of the position.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_POSITION
         */
        "ATTRIBUTE_POSITION": {
            value: 1,
        },

        /**
         * Attribute index of the normal.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_NORMAL
         */
        "ATTRIBUTE_NORMAL": {
            value: 2,
        },

        /**
         * Attribute index of the color.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_COLOR
         */
        "ATTRIBUTE_COLOR": {
            value: 3,
        },

        /**
         * Attribute index of the texture coordinate.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_TEXCOORD
         */
        "ATTRIBUTE_TEXCOORD": {
            value: 4,
        },

        /**
         * Attribute index of the bone length.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_BONELENGTH
         */
        "ATTRIBUTE_BONELENGTH": {
            value: 5,
        },

        /**
         * Attribute index of the bone indices.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_BONEINDICES
         */
        "ATTRIBUTE_BONEINDICES": {
            value: 6,
        },

        /**
         * Attribute index of the bone weights.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} ATTRIBUTE_BONEWEIGHTS
         */
        "ATTRIBUTE_BONEWEIGHTS": {
            value: 7,
        },

        /**
         * Maximum number of the attributes.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} MAX_ATTRIBUTE
         */
        "MAX_ATTRIBUTE": {
            value: 8,
        },

        /**
         * Type of the void.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} TYPE_VOID
         */
        "TYPE_VOID": {
            value: 0,
        },

        /**
         * Type of 8 bits unsigned integer.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} TYPE_UNSIGNED_BYTE
         */
        "TYPE_UNSIGNED_BYTE": {
            value: 1,
        },

        /**
         * Type of 16 bits unsigned integer.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} TYPE_UNSIGNED_SHORT
         */
        "TYPE_UNSIGNED_SHORT": {
            value: 2,
        },

        /**
         * Type of 32 bits unsigned integer.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} TYPE_UNSIGNED_INT
         */
        "TYPE_UNSIGNED_INT": {
            value: 3,
        },

        /**
         * Type of 32 bits float number.
         *
         * @constant
         * @memberof xpl.XModelMeshUtils
         * @member {xpl.enum_t} TYPE_FLOAT
         */
        "TYPE_FLOAT": {
            value: 4,
        },
    });

    /**
     * Get the positions data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getPositions
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the position structure.
     * @param {xpl.size_t} stride - Size of the position structure.
     * @param {Float32Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getPositions = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.positions != null && 0 < mesh.position_size) {
            if (stride < size) {
                stride = size;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.position != -1) {
                    // exist the element.
                    var ind = mesh.position_size * v.position;
                    var j = 0;
                    for (; j < size && j < mesh.position_size; ++j) {
                        buf[off + j] = mesh.positions[ind++];
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // the element is not exist.
                    for (var j = 0; j < size; ++j) {
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
     * Get the normals data that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getNormals
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the normal structure.
     * @param {xpl.size_t} stride - Size of the normal structure.
     * @param {Float32Array} buf - The destination buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getNormals = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.normals != null && 0 < mesh.normal_size) {
            if (stride < size) {
                stride = size;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.normal != -1) {
                    // exist the element.
                    var ind = mesh.normal_size * v.normal;
                    var j = 0;
                    for (; j < size && j < mesh.normal_size; ++j) {
                        buf[off + j] = mesh.normals[ind++];
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // the element is not exist.
                    for (var j = 0; j < size; ++j) {
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the color structure.
     * @param {xpl.size_t} stride - Size of the color structure.
     * @param {Uint8Array|Float32Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getColors = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.colors != null && 0 < mesh.color_size) {
            if (stride < size) {
                stride = size;
            }

            // scaling.
            var value_scale =
                (buf instanceof Uint8Array || buf instanceof Int8Array) ? 255 : 1;

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.color != -1) {
                    // exist the element.
                    var ind = mesh.color_size * v.color;
                    var j = 0;
                    for (; j < size && j < mesh.color_size; ++j) {
                        buf[off + j] = mesh.colors[ind++] * value_scale;
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // the element is not exist.
                    for (var j = 0; j < size; ++j) {
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the texture coordinate structure.
     * @param {xpl.size_t} stride - Size of the texture coordinate structure.
     * @param {Float32Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getTexCoords = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.tex_coords != null && 0 < mesh.tex_coord_size) {
            if (stride < size) {
                stride = size;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.tex_coord != -1) {
                    // exist the element.
                    var ind = mesh.tex_coord_size * v.tex_coord;
                    var j = 0;
                    for (; j < size && j < mesh.tex_coord_size; ++j) {
                        buf[off + j] = mesh.tex_coords[ind++];
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // the element is not exist.
                    for (var j = 0; j < size; ++j) {
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the bone lengths structure.
     * @param {xpl.size_t} stride - Size of the bone lengths structure.
     * @param {Uint16Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getSkinBoneLengths = function(mesh, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.skin != null && 1 < mesh.skin.weighted_index_stride) {
            if (stride < 1) {
                stride = 1;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.skinning != -1) {
                    // exist the element.
                    buf[off] = mesh.skin.weighted_index_sizes[v.skinning];
                } else {
                    // the element is not exist.
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the bone indices structure.
     * @param {xpl.size_t} stride - Size of the bone indices structure.
     * @param {Uint8Array|Uint16Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getSkinBoneIndices = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
            if (stride < size) {
                stride = size;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];

                // the element is exist.
                if (v.skinning != -1) {
                    var len = mesh.skin.weighted_index_sizes[v.skinning];
                    var ind = mesh.skin.weighted_index_stride * v.skinning;
                    var j = 0;
                    for (; j < size && j < len && mesh.skin.weighted_index_stride; ++j) {
                        buf[off + j] = mesh.skin.indices[ind++];
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // the element is not exist.
                    for (var j = 0; j < size; ++j) {
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} size - Size of the bone weights structure.
     * @param {xpl.size_t} stride - Size of the bone weights structure.
     * @param {Float32Array} buf - The destination buffer.
     * @param {xpl.size_t} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} Number of written the elements.
     */
    ns.XModelMeshUtils.getSkinBoneWeights = function(mesh, size, stride, buf, off, subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.skin != null && 0 < mesh.skin.weighted_index_stride) {
            if (stride < size) {
                stride = size;
            }

            // scanning the all vertex.
            for (var i = 0; i < mesh.num_vertices; ++i) {
                var v = mesh.vertices[i];
                if (v.skinning != -1) {
                    // the element is exist.
                    var len = mesh.skin.weighted_index_sizes[v.skinning];
                    var ind = mesh.skin.weighted_index_stride * v.skinning;
                    var j = 0;
                    for (; j < size && j < len && mesh.skin.weighted_index_stride; ++j) {
                        buf[off + j] = mesh.skin.weights[ind++];
                        count++;
                    }

                    // fill the zero to the residual elements.
                    for (; j < size; ++j) {
                        buf[off + j] = 0;
                        count++;
                    }
                } else {
                    // not exist element.
                    for (var j = 0; j < size; ++j) {
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
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
     * @param {Array.<xpl.size_t>} attrs -
     *              The destination byte size of each attribute.
     *              -1 set if it attribute is not exit the index.
     * @param {xpl.size_t} off - Starting position in the destination attribute indices.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} byte size of the all attributes.
     */
    ns.XModelMeshUtils.getVerticesSize = function(mesh,
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
        if (subset === undefined) {
            subset = -1;
        }
        if (attrs != null) {
            ns.ArrayUtils.fill(attrs, off, off + ns.XModelMeshUtils.MAX_ATTRIBUTE, -1);
        }
        if (mesh != null) {
            var size = 0;
            var num_vertices = is_structured ?
                1 : (subset == -1 ? mesh.num_vertices : mesh.subset[subset].num_vertices);

            // position.
            if (0 < position_size && 0 < mesh.position_size) {
                if (attrs != null) {
                    attrs[off + ns.XModelMeshUtils.ATTRIBUTE_POSITION] = size;
                }
                size += num_vertices * mesh.position_size * position_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // normal.
            if (0 < normal_size && 0 < mesh.normal_size) {
                if (attrs != null) {
                    attrs[off + ns.XModelMeshUtils.ATTRIBUTE_NORMAL] = size;
                }
                size += num_vertices* mesh.normal_size * normal_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // color.
            if (0 < color_size && 0 < mesh.color_size) {
                if (attrs != null) {
                    attrs[off + ns.XModelMeshUtils.ATTRIBUTE_COLOR] = size;
                }
                size += num_vertices * mesh.color_size * color_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            // texture coordinate.
            if (0 < tex_coord_size && 0 < mesh.tex_coord_size) {
                if (attrs != null) {
                    attrs[off + ns.XModelMeshUtils.ATTRIBUTE_TEXCOORD] = size;
                }
                size += num_vertices * mesh.tex_coord_size * tex_coord_size;
                size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
            }

            if (mesh.skin != null) {
                // has the skin.
                if (1 < mesh.skin.weighted_index_stride) {
                    // weighted indices of the bones.
                    if (0 < bone_length_size) {
                        if (attrs != null) {
                            attrs[off + ns.XModelMeshUtils.ATTRIBUTE_BONELENGTH] = size;
                        }
                        size += num_vertices * bone_length_size;
                        size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                    }

                    // indices of the bones.
                    if (0 < bone_indices_size) {
                        if (attrs != null) {
                            attrs[off + ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES] = size;
                        }
                        size += num_vertices * mesh.skin.weighted_index_stride * bone_indices_size;
                        size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                    }

                    // weights of the bones.
                    if (0 < bone_weights_size) {
                        if (attrs != null) {
                            attrs[off + ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS] = size;
                        }
                        size += num_vertices * mesh.skin.weighted_index_stride * bone_weights_size;
                        size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                    }
                } else if (0 < mesh.skin.weighted_index_stride) {
                    // indices of bones.
                    if (0 < bone_indices_size) {
                        if (attrs != null) {
                            attrs[off + ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES] = size;
                        }
                        size += num_vertices * mesh.skin.weighted_index_stride * bone_weights_size;
                        size = alignment_size * Math.floor((size + alignment_size - 1) / alignment_size);
                    }
                }
            }

            // structured size.
            if (is_structured) {
                attrs[ns.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE] = size;
                return subset == -1 ?
                    mesh.num_vertices * size : mesh.subset[subset].num_vertices;
            } else {
                attrs[ns.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE] = 0;
                return size;
            }
        }
    };

    /**
     * Get the vertex values that information.
     *
     * @memberof xpl.XModelMesh
     * @function getDividedVertices
     * @param {xpl.XModelMesh} mesh - The mesh instance.
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
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     */
    ns.XModelMeshUtils.getVertices = function(mesh,
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
        if (mesh != null) {
            var stride = attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE];
            var num_vertices = stride <= 0 ? mesh.num_vertices : 1;

            // write the positions.
            if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_POSITION]) {
                switch(position_type) {
                    case ns.XModelMeshUtils.TYPE_FLOAT:
                        ns.XModelMeshUtils.getPositions(
                            mesh,
                            mesh.position_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_POSITION]),
                            0,
                            subset);
                        break;
                }
            }

            // write the normals.
            if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_NORMAL]) {
                switch(normal_type) {
                    case ns.XModelMeshUtils.TYPE_FLOAT:
                        ns.XModelMeshUtils.getNormals(
                            mesh,
                            mesh.normal_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_NORMAL]),
                            0,
                            subset);
                        break;
                }
            }

            // write the colors.
            if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_COLOR]) {
                switch(color_type) {
                    case ns.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                        ns.XModelMeshUtils.getColors(
                            mesh,
                            mesh.color_size,
                            stride,
                            new Uint8Array(
                                buf,
                                buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_COLOR]),
                            0,
                            subset);
                        break;

                    case ns.XModelMeshUtils.TYPE_FLOAT:
                        ns.XModelMeshUtils.getColors(
                            mesh,
                            mesh.color_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_COLOR]),
                            0,
                            subset);
                        break;
                }
            }

            // write the texture coordnates.
            if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_TEXCOORD]) {
                switch(tex_coord_type) {
                    case ns.XModelMeshUtils.TYPE_FLOAT:
                        ns.XModelMeshUtils.getTexCoords(
                            mesh,
                            mesh.tex_coord_size,
                            stride / 4,
                            new Float32Array(
                                buf,
                                buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_TEXCOORD]),
                            0,
                            subset);
                        break;
                }
            }

            if (mesh.skin) {
                // has the skin.

                // write the number of bones.
                if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONELENGTH]) {
                    switch(bone_length_type) {
                        case ns.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                            ns.XModelMeshUtils.getSkinBoneLengths(
                                mesh,
                                stride,
                                new Uint8Array(
                                    buf,
                                    buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONELENGTH]),
                                0,
                                subset);
                            break;
                    }
                }

                // write the bone indices.
                if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES]) {
                    switch(bone_indices_type) {
                        case ns.XModelMeshUtils.TYPE_UNSIGNED_BYTE:
                            ns.XModelMeshUtils.getSkinBoneIndices(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride,
                                new Uint8Array(
                                    buf,
                                    buf_off +
                                    attrs[attrs_off + ns.XModelMeshUtils.XModelMeshUtils.ATTRIBUTE_BONEINDICES]),
                                0,
                                subset);
                            break;
                        case ns.XModelMeshUtils.TYPE_UNSIGNED_SHORT:
                            ns.XModelMeshUtils.getSkinBoneIndices(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride / 2,
                                new Uint16Array(
                                    buf,
                                    buf_off + attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES]),
                                0,
                                subset);
                            break;
                    }
                }

                // write the bone weights.
                if (0 <= attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS]) {
                    switch(bone_weights_type) {
                        case ns.XModelMeshUtils.TYPE_FLOAT:
                            ns.XModelMeshUtils.getSkinBoneWeights(
                                mesh,
                                mesh.skin.weighted_index_stride,
                                stride / 4,
                                new Float32Array(
                                    buf,
                                    buf_off +
                                    attrs[attrs_off + ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS]),
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {xpl.size_t} material - The index of material.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t} The number of elements.
     */
    ns.XModelMeshUtils.getNumTriangledFaceIndices = function(mesh, material, subset) {
        if (subset === undefined) {
            subset = -1
        }
        var count = 0;
        if (mesh != null && mesh.elements != null) {
            for (var i = 0; i < mesh.num_elements; ++i) {
                var f = mesh.elements[i];
                if (f.material == material) {
                    if (3 <= f.num_vertices) {
                        count += (f.num_vertices - 2) * 3;
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {Array.<xpl.size_t>} offs -
     *              The destination array of each offset.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} offs_off -
     *              Starting position in the destination
     *              array of each offset.
     * @param {Array.<xpl.size_t>} sizes -
     *              The destination array of each size.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} sizes_off -
     *              Starting position in the the destination
     *              array of each size.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {xpl.size_t}
     *              The number of elements.
     */
    ns.XModelMeshUtils.getNumAllTriangledFaceIndices = function(mesh,
                                                                offs, offs_off,
                                                                sizes, sizes_off,
                                                                subset) {
        var count = 0;
        if (mesh != null && mesh.elements != null) {
            // listed the materials.
            for (var i = 0; i < mesh.num_materials; ++i) {
                if (offs != null) {
                    offs[offs_off + i] = count;
                }
                var num = ns.XModelMeshUtils.getNumTriangledFaceIndices(mesh, i, subset);
                if (sizes != null) {
                    sizes[sizes_off + i] = num;
                }
                count += num;
            }

            // default a material.
            if (offs != null) {
                offs[offs_off + mesh.num_materials] = count;
            }
            var num = ns.XModelMeshUtils.getNumTriangledFaceIndices(mesh, -1, subset);
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {Number} material - The index of material.
     * @param {Boolean} reverse -
     *              Set the true if reverse the faces,
     *              Set the false if not reverse the faces.
     * @param {Array} buf - The destination buffer.
     * @param {Number} off - Starting position in the buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {Number} The number of elements.
     */
    ns.XModelMeshUtils.getTriangledFaceIndices = function(mesh, material, reverse,
                                                          buf, off,
                                                          subset) {
        if (subset === undefined) {
            subset = -1;
        }
        var count = 0;
        if (mesh != null && mesh.elements != null) {
            // triangle order.
            var sq0, sq1, sq2;
            if (reverse) {
                sq0 = 0; sq1 = 2; sq2 = 1;
            } else {
                sq0 = 0; sq1 = 1; sq2 = 2;
            }

            // write the vertex indices of face to the buffer.
            for (var i = 0; i < mesh.num_elements; ++i) {
                var f = mesh.elements[i];
                if (f.material == material) {
                    for (var j = 0, j_end = f.num_vertices - 2; j < j_end; ++j) {
                        buf[off + sq0] = f.vertices[0];
                        buf[off + sq1] = f.vertices[j + 1];
                        buf[off + sq2] = f.vertices[j + 2];
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {Boolean} reverse -
     *              Set the true if reverse the faces,
     *              Set the false if not reverse the faces.
     * @param {Array} offs - The offset of array.
     * @param {Number} offs_off - Thew offset of offset array.
     * @param {Array} buf - The buffer of writing destination.
     * @param {Number} buf_off - The offset of buffer.
     * @param {xpl.int16_t} subset -
     *              The subset number of mesh.
     *              But if specified -1, it get superset information (first argment).
     * @returns {Number} The number of elements.
     */
    ns.XModelMeshUtils.getAllTriangledFaceIndices = function(mesh,
                                                             reverse,
                                                             offs, offs_off,
                                                             buf, buf_off,
                                                             subset) {
        var count = 0;
        if (mesh != null && mesh.elements != null) {
            for (var i = 0; i < mesh.num_materials; ++i) {
                count += ns.XModelMeshUtils.getTriangledFaceIndices(
                    mesh, i, reverse, buf, buf_off + offs[offs_off + i], subset);
            }
        }
        var count;
    };

    /**
     * Release retention the memory which shape data in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function releaseShape
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     */
    ns.XModelMeshUtils.releaseShape = function(mesh) {
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
            if (0 < mesh.num_subsets && mesh.subsets != null) {
                for (var i = 0; i < mesh.num_subsets; ++i) {
                    var subset = mesh.subsets[i];
                    subset.vertices = null;
                    subset.elements = null;
                    subset.bones = null;
                }
            }
        }
    };

    /**
     * Get the number of textures that be included in the mesh.
     *
     * @memberof xpl.XModelMesh
     * @function getTextures
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     * @param {Array.<xpl.XModelTexture>} dest -
     *              The destination array for texture.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} off - Starting position the in the destination array.
     * @param {xpl.size_t} len - maximum number of the elements to be copied.
     * @returns {xpl.size_t} Number of the texture.
     */
    ns.XModelMeshUtils.getTextures = function(mesh, dest, off, len) {
        var count = 0;
        if (mesh != null) {
            for (var i = 0; i < mesh.num_materials; ++i) {
                var num = ns.XModelMaterialUtils.getTextures(mesh.materials[i], dest, off, len);
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
     * @param {xpl.XModelMesh} mesh - The mesh instance.
     */
    ns.XModelMeshUtils.releaseTextures = function(mesh) {
        if (mesh != null) {
            for (var i = 0; i < mesh.num_materials; ++i) {
                ns.XModelMaterialUtils.releaseTexture(mesh.materials[i]);
            }
        }
    };

})(xpl);
