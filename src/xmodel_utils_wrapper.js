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

    ns.XModelWrapper = function() {
        this._container = null;
        this.__prev_anim_index = -1;
        this.__min_bounds = new Float32Array([ Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE ]);
        this.__max_bounds = new Float32Array([ -Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]);
        this.__is_completed = false;
        this.__is_canseled = false;
    };

    Object.defineProperties(ns.XModelWrapper.prototype, {

        "container": {
            get: function() {
                return this._container;
            }
        },

        "isCompleted": {
            get: function() {
                return this.__is_completed;
            },
        },

        "isCanceled": {
            get: function() {
                return this.__is_canseled;
            },
        },

        "numAnimationSets": {
            get: function() {
                return this._container != null ? this._container.num_animation_sets : 0;
            },
        },
    });

    ns.XModelWrapper.prototype._complete = function() {
        this.__is_completed = true;
        ns.XModelContainerUtils.forEachMesh(this._container, (function (mesh, arg) {
            // get the size.
            for (var i = 0; i < mesh.num_positions; ++i) {
                for (var j = 0; j < mesh.position_size; ++j) {
                    var value = mesh.positions[mesh.position_size * i + j];
                    this.__min_bounds[j] = Math.min(this.__min_bounds[j], value);
                    this.__max_bounds[j] = Math.max(this.__max_bounds[j], value);
                }
            }
        }).bind(this), null);
    };

    ns.XModelWrapper.prototype.cancel = function() {
        this.__is_canseled = true;
    };

    ns.XModelWrapper.prototype.getMinBound = function(index) {
        return this.__min_bounds[index];
    };

    ns.XModelWrapper.prototype.getMaxBound = function(index) {
        return this.__max_bounds[index];
    };

    ns.XModelWrapper.prototype.getSize = function(index) {
        return this.__max_bounds[index] - this.__min_bounds[index];
    }

    ns.XModelWrapper.prototype.getCenter = function(index) {
        return (this.__min_bounds[index] + this.__max_bounds[index]) * 0.5;
    };

    ns.XModelWrapper.prototype.resetPose = function() {
        ns.XModelContainerUtils.resetTransforms(this._container);
        ns.XModelContainerUtils.updateCombination(this._container);
    };

    ns.XModelWrapper.prototype.setAnimation = function(index, time, loop, kinematics) {
        if (kinematics == undefined) {
            kinematics = false;
        }
        if (loop == undefined) {
            loop = false;
        }
        if (this.__prev_anim_index != index) {
            this.__prev_anim_index = index;
            this.resetPose();
        } else {
            ns.XModelContainerUtils.resetTransforms(this._container);
        }
        ns.XModelContainerUtils.setAnimation(
            this._container, index, time, loop);
        if (kinematics) {
            ns.XModelContainerUtils.applyKinematics(this._container);
        }
        ns.XModelContainerUtils.updateCombination(this._container);
    };

    ns.XModelWrapper.prototype.dispose = function() {
        this.cancel();
        this.__is_completed = false;
    };

})(xpl);

(function(ns) {

    "use strict";

    ns.XModelWrapperGL = function() {
        ns.XModelWrapper.call(this);
        this.__config = null;
        this.__white_texture = null;
        this.__remain_textures = 0;
        this.__is_update_anim = false;
    };

    Object.setPrototypeOf(ns.XModelWrapperGL.prototype, ns.XModelWrapper.prototype);

    Object.defineProperties(ns.XModelWrapperGL, {

        "CONFIG_MEMORY_ALIGNMENT_SIZE": {
            value: "memory_alignment_size",
        },

        "CONFIG_USE_VERTEX_ARRAY_OBJECT": {
            value: "use_vertex_array_object",
        },

        "CONFIG_USE_MIPMAP_TEXTURE": {
            value: "use_mipmap_texture",
        },

        "CONFIG_USE_SKINNING": {
            value: "use_skinning",
        },

        "CONFIG_GPU_SKINNING": {
            value: "gpu_skinning",
        },

        "CONFIG_MAX_BONE_WEIGHTED_INDICES": {
            value: "max_bone_weighted_indices",
        },

        "CONFIG_MAX_BONE_MATRICES": {
            value: "max_bone_matrices",
        },

        "CONFIG_PATH_ALIAS": {
            value: "path_alias",
        },

        "CONFIG_USE_MORFING": {
            value: "use_mofing",
        },

        "CONFIG_GPU_MORFING": {
            value: "gpu_morfing",
        },

        "UNIFORM_DIFFUSE": {
            value: "d_diffuse",
        },

        "UNIFORM_DIFFUSE_MAP": {
            value: "u_diffuse_map",
        },

        "UNIFORM_SPECULAR": {
            value: "u_specular",
        },

        "UNIFORM_SPECULAR_MAP": {
            value: "u_specular_map",
        },

        "UNIFORM_BONE_MATRICES": {
            value: "u_bone_matrices",
        },

        "ATTRIBUTE_POSITION": {
            value: "a_position",
        },

        "ATTRIBUTE_NORMAL": {
            value: "a_normal",
        },

        "ATTRIBUTE_COLOR": {
            value: "a_color",
        },

        "ATTRIBUTE_TEXCOORD": {
            value: "a_tex_coord",
        },

        "ATTRIBUTE_BONEINDICES": {
            value: "a_bone_indices",
        },

        "ATTRIBUTE_BONEWEIGHTS": {
            value: "a_bone_weights",
        },
    });

    // alias of the class name.
    var stc_fld = ns.XModelWrapperGL;

    ns.XModelWrapperGL.defaultConfig = function() {
        var config = {};
        config[stc_fld.CONFIG_MEMORY_ALIGNMENT_SIZE] = 4;
        config[stc_fld.CONFIG_USE_VERTEX_ARRAY_OBJECT] = false;
        config[stc_fld.CONFIG_USE_MIPMAP_TEXTURE] = false;
        config[stc_fld.CONFIG_USE_SKINNING] = false;
        config[stc_fld.CONFIG_GPU_SKINNING] = false;
        config[stc_fld.CONFIG_MAX_BONE_MATRICES] = 32;
        config[stc_fld.CONFIG_MAX_BONE_WEIGHTED_INDICES] = 4;
        config[stc_fld.CONFIG_USE_MORFING] = false;
        config[stc_fld.CONFIG_GPU_MORFING] = false;
        config[stc_fld.CONFIG_PATH_ALIAS] = null;
        return config;
    };

    ns.XModelWrapperGL.copyConfig = function(src) {
        var members = [
            stc_fld.CONFIG_MEMORY_ALIGNMENT_SIZE,
            stc_fld.CONFIG_USE_VERTEX_ARRAY_OBJECT,
            stc_fld.CONFIG_USE_MIPMAP_TEXTURE,
            stc_fld.CONFIG_USE_SKINNING,
            stc_fld.CONFIG_GPU_SKINNING,
            stc_fld.CONFIG_MAX_BONE_MATRICES,
            stc_fld.CONFIG_MAX_BONE_WEIGHTED_INDICES,
            stc_fld.CONFIG_USE_MORFING,
            stc_fld.CONFIG_GPU_MORFING,
            stc_fld.CONFIG_PATH_ALIAS,
        ];
        var config = {};
        for (var key of members) {
            config[key] = src[key];
        }
        return config;
    };

    ns.XModelWrapperGL.defaultUniforms = function() {
        var uniforms = {};
        uniforms[stc_fld.UNIFORM_DIFFUSE] = 0;
        uniforms[stc_fld.UNIFORM_DIFFUSE_MAP] = 0;
        return uniforms;
    };

    ns.XModelWrapperGL.defaultAttributes = function() {
        var attributes = {};
        attributes[stc_fld.ATTRIBUTE_POSITION] = -1;
        attributes[stc_fld.ATTRIBUTE_NORMAL] = -1;
        attributes[stc_fld.ATTRIBUTE_COLOR] = -1;
        attributes[stc_fld.ATTRIBUTE_TEXCOORD] = -1;
        attributes[stc_fld.ATTRIBUTE_BONEINDICES] = -1;
        attributes[stc_fld.ATTRIBUTE_BONEWEIGHTS] = -1;
        return attributes;
    };

    var attachVertexAttributes = function(self, gl, mesh, attributes) {
        // bind the vertex buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertex_buffer);

        var stride =
            mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_STRUCTURE_SIZE];

        // set the position information.
        var position_off =
            mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_POSITION];
        if (attributes.a_position != -1 && position_off != -1) {
            gl.enableVertexAttribArray(attributes.a_position);
            gl.vertexAttribPointer(
                attributes.a_position,
                mesh.position_size,
                gl.FLOAT,
                false,
                stride,
                position_off);
        }

        // set the normal information.
        var normal_off =
            mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_NORMAL];
        if (attributes.a_normal != -1 && normal_off != -1) {
            gl.enableVertexAttribArray(attributes.a_normal);
            gl.vertexAttribPointer(
                attributes.a_normal,
                mesh.normal_size,
                gl.FLOAT,
                false,
                stride,
                normal_off);
        }

        // set the color information.
        var color_off =
            mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_COLOR];
        if (attributes.a_color != -1 && color_off != -1) {
            gl.enableVertexAttribArray(attributes.a_color);
            gl.vertexAttribPointer(
                attributes.a_color,
                mesh.color_size,
                gl.UNSIGNED_BYTE,
                false,
                stride,
                color_off);
        }

        // set the texture coordinate information.
        var tex_coord_off =
            mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_TEXCOORD];
        if (attributes.a_tex_coord != -1 && tex_coord_off != -1) {
            gl.enableVertexAttribArray(attributes.a_tex_coord);
            gl.vertexAttribPointer(
                attributes.a_tex_coord,
                mesh.tex_coord_size,
                gl.FLOAT,
                false,
                stride,
                tex_coord_off);
        }

        // set skinning.
        if (mesh.skin != null && self.__config[stc_fld.CONFIG_USE_SKINNING]) {
            // set the bone indices.
            var bone_indices_off =
                mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES];
            if (attributes.a_bone_indices != -1 && bone_indices_off != -1) {
                gl.enableVertexAttribArray(attributes.a_bone_indices);
                gl.vertexAttribPointer(
                    attributes.a_bone_indices,
                    mesh.skin.weighted_index_stride,
                    gl.UNSIGNED_SHORT,
                    false,
                    stride,
                    bone_indices_off);
            }

            // set the bone indices.
            var bone_weights_off =
                mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS];
            if (attributes.a_bone_weights != -1 && bone_weights_off != -1) {
                gl.enableVertexAttribArray(attributes.a_bone_weights);
                gl.vertexAttribPointer(
                    attributes.a_bone_weights,
                    mesh.skin.weighted_index_stride,
                    gl.FLOAT,
                    false,
                    stride,
                    bone_weights_off);
            }
        }
    };

    var detachVertexAttributes = function(self, gl, mesh, attributes) {
        // dispose attribute.
        if (attributes.a_position != -1) {
            gl.disableVertexAttribArray(attributes.a_position);
        }
        if (attributes.a_normal != -1) {
            gl.disableVertexAttribArray(attributes.a_normal);
        }
        if (attributes.a_color != -1) {
            gl.disableVertexAttribArray(attributes.a_color);
        }
        if (attributes.a_tex_coord != -1) {
            gl.disableVertexAttribArray(attributes.a_tex_coord);
        }
        if (attributes.a_bone_indices != -1) {
            gl.disableVertexAttribArray(attributes.a_bone_indices);
        }
        if (attributes.a_bone_weights != -1) {
            gl.disableVertexAttribArray(attributes.a_bone_weights);
        }
    };

    var loadModelWithUrl = function(self, gl, name, prefix, config) {
        // check the supported extensions.
        if (gl.getExtension("OES_element_index_uint") == null) {
            throw new Error("Required the OES_element_index_uint");
        }

        if (prefix == null) {
            prefix = "";
        }
        var request = new XMLHttpRequest();
        var max_bones = 0;
        request.open("GET", prefix + name, true);
        request.responseType = "arraybuffer";
        request.onload = (function (event) {
            if (!this.isCanceled) {
                if (event.target.status == 200) {
                    this._container = new ns.XModelDecoder().decode(event.target.response);
                    if (this._container != null) {
                        ns.XModelContainerUtils.forEachMesh(this._container, function(mesh, arg) {
                            xpl.XModelOptimizeUtils.optimizeMeshSkinning(mesh, 32);

                            var is_structure =
                                !config[stc_fld.CONFIG_USE_SKINNING] ||
                                config[stc_fld.CONFIG_GPU_SKINNING];
                            var index_size, index_type;
                            var weight_size, weight_type;
                            if (config[stc_fld.CONFIG_USE_SKINNING] &&
                                config[stc_fld.CONFIG_GPU_SKINNING]) {
                                index_size = 2;
                                index_type = ns.XModelMeshUtils.TYPE_UNSIGNED_SHORT;
                                weight_size = 4;
                                weight_type = ns.XModelMeshUtils.TYPE_FLOAT;
                            } else {
                                index_size = 0;
                                index_type = ns.XModelMeshUtils.TYPE_VOID;
                                weight_size = 0;
                                weight_type = ns.XModelMeshUtils.TYPE_VOID;
                            }

                            // get the vertices information.
                            var vertices_offsets =
                                new Int32Array(ns.XModelMeshUtils.MAX_ATTRIBUTE);
                            var vertices_size = ns.XModelMeshUtils.getVerticesSize(
                                mesh,
                                is_structure,
                                config[stc_fld.CONFIG_MEMORY_ALIGNMENT_SIZE],
                                4, 4, 1, 4,
                                0, index_size, weight_size,
                                vertices_offsets, 0);
                            var vertices = new ArrayBuffer(vertices_size);
                            ns.XModelMeshUtils.getVertices(
                                mesh,
                                ns.XModelMeshUtils.TYPE_FLOAT,
                                ns.XModelMeshUtils.TYPE_FLOAT,
                                ns.XModelMeshUtils.TYPE_UNSIGNED_BYTE,
                                ns.XModelMeshUtils.TYPE_FLOAT,
                                ns.XModelMeshUtils.TYPE_VOID,
                                index_type,
                                weight_type,
                                vertices_offsets, 0,
                                vertices, 0);

                            // update size of the matrix pallet.
                            if (mesh.skin != null) {
                                max_bones = Math.max(mesh.skin.num_nodes, max_bones);
                            }

                            // the buffer for CPU skinning.
                            var src_vertices;
                            var src_positions;
                            var src_normals;
                            var src_bone_indices;
                            var src_bone_weights;
                            var dest_vertices;
                            var dest_positions;
                            var dest_normals;
                            var is_cpu_skinning =
                                config[stc_fld.CONFIG_USE_SKINNING] &&
                                !config[stc_fld.CONFIG_GPU_SKINNING] &&
                                mesh.skin != null && 0 < mesh.skin.num_nodes;
                            if (is_cpu_skinning) {
                                var work_vertices_offsets =
                                    new Int32Array(ns.XModelMeshUtils.MAX_ATTRIBUTE);
                                var work_vertices_size = ns.XModelMeshUtils.getVerticesSize(
                                    mesh,
                                    false,
                                    config[stc_fld.CONFIG_MEMORY_ALIGNMENT_SIZE],
                                    4, 4, 0, 0,
                                    0, 2, 4,
                                    work_vertices_offsets, 0);
                                src_vertices = new ArrayBuffer(work_vertices_size);
                                src_positions = new Float32Array(
                                    src_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_POSITION]);
                                src_normals = new Float32Array(
                                    src_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_NORMAL]);
                                src_bone_indices = new Uint16Array(
                                    src_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES]);
                                src_bone_weights = new Float32Array(
                                    src_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS]);
                                ns.XModelMeshUtils.getVertices(
                                    mesh,
                                    ns.XModelMeshUtils.TYPE_FLOAT,
                                    ns.XModelMeshUtils.TYPE_FLOAT,
                                    ns.XModelMeshUtils.TYPE_VOID,
                                    ns.XModelMeshUtils.TYPE_VOID,
                                    ns.XModelMeshUtils.TYPE_VOID,
                                    ns.XModelMeshUtils.TYPE_UNSIGNED_SHORT,
                                    ns.XModelMeshUtils.TYPE_FLOAT,
                                    work_vertices_offsets, 0,
                                    src_vertices, 0);
                                dest_vertices = new ArrayBuffer(
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES]);
                                dest_positions = new Float32Array(
                                    dest_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_POSITION]);
                                dest_normals = new Float32Array(
                                    dest_vertices,
                                    work_vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_NORMAL]);
                            } else {
                                src_vertices = null;
                                src_positions = null;
                                src_normals = null;
                                src_bone_indices = null;
                                src_bone_weights = null;
                                dest_vertices = null;
                                dest_positions = null;
                                dest_normals = null;
                            }

                            // get the faces information.
                            var elements_offsets = new Int32Array(mesh.num_materials + 1);
                            var elements_sizes = new Uint32Array(mesh.num_materials + 1);
                            var elements_size = ns.XModelMeshUtils.getNumAllTriangledFaceIndices(
                                mesh, elements_offsets, 0, elements_sizes, 0);
                            var elements = new Uint32Array(elements_size);
                            ns.XModelMeshUtils.getAllTriangledFaceIndices(
                                mesh, true, elements_offsets, 0, elements, 0);

                            // generate the GPU buffer.
                            mesh.vertex_buffer = ns.GLUtils.createBuffer(
                                gl, gl.ARRAY_BUFFER, vertices, is_cpu_skinning ? gl.STREAM_DRAW : gl.STATIC_DRAW);
                            mesh.element_buffer = ns.GLUtils.createBuffer(
                                gl, gl.ELEMENT_ARRAY_BUFFER, elements.buffer, gl.STATIC_DRAW);

                            // user object.
                            mesh.user_object = {
                                "vertices_offsets": vertices_offsets,
                                "src_vertices": src_vertices,
                                "src_positions": src_positions,
                                "src_normals": src_normals,
                                "src_bone_indices": src_bone_indices,
                                "src_bone_weights": src_bone_weights,
                                "dest_vertices": dest_vertices,
                                "dest_positions": dest_positions,
                                "dest_normals": dest_normals,
                                "elements_offsets": elements_offsets,
                                "elements_sizes": elements_sizes,
                            };
                        }, null);

                        // create the matrix pallet.
                        if (0 < max_bones) {
                            this.__matrix_pallet = new Float32Array(
                                ns.Geometry.SIZE_MATRIX_4X4 * max_bones);
                            this.resetPose();
                        }

                        // get the texture information.
                        var num_textures = ns.XModelContainerUtils.getTextures(this._container, null, 0, 0);
                        var textures = new Array(num_textures);
                        ns.XModelContainerUtils.getTextures(this._container, textures, 0, num_textures);
                        textures = ns.ArrayUtils.convertToSet(textures, 0, textures.length, function(a, b) {
                            return a.name == b.name;
                        });

                        // load the textures.
                        this.__remain_textures = textures.length;
                        for (var i = 0; i < textures.length; ++i) {
                            loadTextureWithUrl(this, gl, textures[i], prefix, config);
                        }
                        if (this.__remain_textures <= 0) {
                            this._complete();
                        }
                    } else {
                        this.cancel();
                    }
                } else {
                    this.cancel();
                }
            }
        }).bind(self);
        request.send();
    };

    var loadTextureWithUrl = function(self, gl, texture, prefix, config) {
        var request = new XMLHttpRequest();
        if (config[stc_fld.CONFIG_PATH_ALIAS] != null && config[stc_fld.CONFIG_PATH_ALIAS][texture.ref] != null) {
            request.open("GET", config[stc_fld.CONFIG_PATH_ALIAS][texture.ref], true);
        } else {
            request.open("GET", prefix + texture.ref, true);
        }
        request.responseType = "blob";
        request.onload = (function (event) {
            if (!self.isCanceled) {
                if (event.target.status == 200) {
                    var blob = event.target.response
                    var img = new Image();
                    img.onload = function () {
                        texture.texture = ns.GLUtils.createTexture2DFromImage(
                            gl, gl.RGBA, gl.UNSIGNED_BYTE, img);
                        gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                        if (config[stc_fld.CONFIG_USE_MIPMAP_TEXTURE]) {
                            gl.generateMipmap(gl.TEXTURE_2D);
                        }
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    };
                    img.src = URL.createObjectURL(blob);
                }
                this.__remain_textures--;
                if (this.__remain_textures <= 0) {
                    this._complete();
                }
            }
        }).bind(self);
        request.send();
    };

    ns.XModelWrapperGL.prototype.initializeWithUrl = function(gl, name, prefix, config) {
        this.__white_texture = ns.GLUtils.createTexture2D(
            gl,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            1, 1,
            new Uint8Array([255, 255, 255, 255]),
            false,
            null, 0);
        this.__config = ns.XModelWrapperGL.copyConfig(config);
        loadModelWithUrl(this, gl, name, prefix, this.__config);
    };

    ns.XModelWrapperGL.prototype.setAnimation = function(index, time, loop, kinematics) {
        ns.XModelWrapper.prototype.setAnimation.call(this, index, time, loop, kinematics);
        this.__is_update_anim = true;
    };

    ns.XModelWrapperGL.prototype._complete = function() {
        ns.XModelWrapper.prototype._complete.call(this);
        ns.XModelContainerUtils.releaseShapes(this._container);
    };

    ns.XModelWrapperGL.prototype.draw = function(gl, uniforms, attributes) {
        // draw meshs.
        ns.XModelContainerUtils.forEachMesh(this._container, (function(mesh, args) {
            // attach the vertex attributes.
            attachVertexAttributes(this, gl, mesh, attributes, false);

            // set the skinning.
            if (mesh.skin != null && this.__config[stc_fld.CONFIG_USE_SKINNING]) {
                if (mesh.user_object.src_vertices != null && this.__is_update_anim) {
                    // update the matrix pallet.
                    ns.XModelSkinUtils.updateMatrixPallet(
                        mesh.skin, mesh.skin.num_nodes, this.__matrix_pallet, 0);

                    // CPU skinning.
                    var bone_indices_off =
                        mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEINDICES] / 4;
                    var bone_weights_off =
                        mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_BONEWEIGHTS] / 4;

                    // update the positions.
                    var position_off =
                        mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_POSITION];
                    if (position_off != -1) {
                        ns.XModelSkinUtils.updatePositions(
                            this.__matrix_pallet, 0,
                            mesh.num_vertices,
                            mesh.user_object.src_positions, 0, 0,
                            mesh.user_object.dest_positions, 0, 0,
                            mesh.skin.weighted_index_stride,
                            mesh.user_object.src_bone_indices, 0, 0,
                            mesh.user_object.src_bone_weights, 0, 0);
                    }

                    // update the normals.
                    var normal_off =
                        mesh.user_object.vertices_offsets[ns.XModelMeshUtils.ATTRIBUTE_NORMAL];
                    if (normal_off != -1) {
                        for (var i = 0; i < mesh.skin.num_nodes; ++i) {
                            var matrix_index = ns.Geometry.SIZE_MATRIX_4X4 * i;
                            ns.Matrix4x4.loadAxisv(
                                this.__matrix_pallet, matrix_index,
                                this.__matrix_pallet, matrix_index,
                                false);
                            ns.Matrix4x4.normalizeAxisv(
                                this.__matrix_pallet, matrix_index,
                                this.__matrix_pallet, matrix_index,
                                true);
                        }
                        ns.XModelSkinUtils.updateNormals(
                            this.__matrix_pallet, 0,
                            mesh.num_vertices,
                            mesh.user_object.src_normals, 0, 0,
                            mesh.user_object.dest_normals, 0, 0,
                            mesh.skin.weighted_index_stride,
                            mesh.user_object.src_bone_indices, 0, 0,
                            mesh.user_object.src_bone_weights, 0, 0);
                    }

                    // send the updated workbuffer to the video memory.
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, mesh.user_object.dest_vertices);
                    this.__is_update_anim = false;
                } else {
                    // GPU skinning.

                    // update the matrix pallet.
                    ns.XModelSkinUtils.updateMatrixPallet(
                        mesh.skin, mesh.skin.num_nodes, this.__matrix_pallet, 0);

                    // TODO:
                }
            }

            // bind the element buffer.
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.element_buffer);

            // draw the elements.
            for(var i = 0; i < mesh.num_materials; ++i) {
                var material = mesh.materials[i];

                // set the ambient.
                // TODO:

                // set the diffuse.
                if (uniforms.u_diffuse_map != null) {
                    gl.activeTexture(gl.TEXTURE0);
                    gl.uniform1i(uniforms.u_diffuse_map, 0);
                    if (material.diffuse_map != null && material.diffuse_map.texture != null) {
                        gl.uniform4fv(uniforms.u_diffuse_color, material.diffuse);
                        gl.bindTexture(gl.TEXTURE_2D, material.diffuse_map.texture);
                    } else {
                        gl.uniform4f(uniforms.u_diffuse_color, 1, 1, 1, 1);
                        gl.bindTexture(gl.TEXTURE_2D, this.__white_texture);
                    }
                } else if (uniforms.u_diffuse_color != null) {
                    gl.uniform4f(uniforms.u_diffuse_color, 1, 1, 1, 1);
                }

                // set specular.
                // TODO:

                // set bumpmap.
                // TODO:

                // draw.
                gl.drawElements(
                    gl.TRIANGLES,
                    mesh.user_object.elements_sizes[i],
                    gl.UNSIGNED_INT,
                    mesh.user_object.elements_offsets[i] * 4);
            }

            // detach the vertex attributes.
            detachVertexAttributes(this, gl, mesh, attributes, false);
        }).bind(this), null);
    };

    ns.XModelWrapperGL.prototype.dispose = function(gl) {
        ns.XModelWrapper.prototype.dispose.call(this);

        // release the shape memory.
        ns.XModelContainerUtils.forEachMesh(this._container, function(mesh, args) {
            if (mesh.vertex_buffer != null) {
                gl.deleteBuffer(mesh.vertex_buffer);
                mesh.vertex_buffer = null;
            }
            if (mesh.element_buffer != null) {
                gl.deleteBuffer(mesh.element_buffer);
                mesh.element_buffer = null;
            }
        }, null);

        // release the textures memory.
        gl.deleteTexture(this.__white_texture);
        var num_textures = ns.XModelContainerUtils.getTextures(this._container, null, 0, 0);
        var textures = new Array(num_textures);
        for (var i = 0; i < num_textures; ++i) {
            var texture = textures[i];
            if (texture != null) {
                gl.deleteTexture(texture.texture);
                texture.texture = null;
            }
        }
    };

})(xpl);
