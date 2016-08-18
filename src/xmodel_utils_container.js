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
     * コンテナ用のユーティリティクラスです。
     *
     * @namespace xpl.XModelContainerUtils
     */
    xpl.XModelContainerUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * コンテナに含まれる全てのテクスチャを取得します。
     * 
     * @param {xpl.XModelContainer} container - 処理対象のコンテナ構造
     * @param {boolean} [allow_duplicate=false] - 結果のテクスチャの配列の重複を許容するかどうか
     * @returns {xpl.XModelTexture[]} テクスチャの配列
     */
    xpl.XModelContainerUtils.getTextures = function (container, allow_duplicate) {
        allow_duplicate = xpl.defaultValue(allow_duplicate, false);
        let textures = [];
        if (container != null) {
            for (let i = 0; i < container.num_textures; ++i) {
                textures.push(container.textures[i]);
            }
            for (let i = 0; i < container.num_materials; ++i) {
                textures.concat(xpl.XModelMaterialUtils.getTextures(container.materials[i]), true);
            }
            for (let i = 0; i < container.num_meshes; ++i) {
                textures.concat(xpl.XModelMeshUtils.getTextures(container.meshes[i]), true);
            }
            for (var i = 0; i < container.num_nodes; ++i) {
                textures.concat(xpl.XModelNodeUtils.getTextures(container.nodes[i]), true);
            }
        }
        return allow_duplicate ? textures : xpl.XModelMaterialUtils.convertToTextureSet(textures);
    };
    
    /**
     * コンテナに含まれる全てのテクスチャを開放します。
     * 
     * @param {xpl.XModelContainer} container - 処理対象のコンテナ構造
     */
    xpl.XModelContainerUtils.releaseTextures = function (container) {
        if (container != null) {
            for (let i = 0; i < container.num_textures; ++i) {
                var texture = container.textures[i];
                if (texture != null) {
                    texture.data = null;
                    texture.data_size = 0;
                }
            }
            for (let i = 0; i < container.num_materials; ++i) {
                xpl.XModelMaterialUtils.releaseTexture(container.materials[i]);
            }
            for (let i = 0; i < container.num_meshes; ++i) {
                xpl.XModelMeshUtils.releaseTextures(container.meshes[i]);
            }
            for (let i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.releaseTextures(container.nodes[i]);
            }
        }
    };

    /**
     * Get the meshes that be included in the container recursively.
     *
     * @memberof xpl.XModelContainerUtils
     * @function getMeshes
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {xpl.XModelNode[]?} dest -
     *              The array of destination array for meshes.
     *              Can set the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination.
     * @param {xpl.size_t} len - Number of the destination to be copied.
     * @returns {xpl.size_t} Number of the meshes.
     */
    xpl.XModelContainerUtils.getMeshes = function (container, dest, off, len) {
        var count = 0;
        if (container != null) {
            // count the meshes in the this container.
            for (var i = 0; i < container.num_meshes; ++i) {
                var mesh = container.meshes[i];
                if (mesh != null) {
                    if (dest != null && 0 < len) {
                        dest[off++] = mesh;
                        len--;
                    }
                    count++;
                }
            }

            // count the textures in the nodes that be chained to the this container.
            for (var i = 0; i < container.num_nodes; ++i) {
                var num = xpl.XModelNodeUtils.getMeshes(node, dest, off, len);
                off += num;
                len -= num;
                count += num;
            }
        }
        return count;
    };

    /**
     * Release the shape data that be included in the node recursively.
     *
     * @memberof xpl.XModelContainerUtils
     * @function releaseShapes
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.releaseShapes = function (container) {
        if (container != null) {
            // release the shape information in the meshes that has been chained to the this container.
            for (var i = 0; i < container.num_meshes; ++i) {
                xpl.XModelMeshUtils.releaseShape(container.meshes[i]);
            }

            // release the shape information in the nodes that has been chained to the this container.
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.releaseShapes(container.nodes[i]);
            }
        }
    };

    /**
     * Get the nodes that be included in the node recursively.
     *
     * @memberof xpl.XModelContainerUtils
     * @function getNodes
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {xpl.XModelNode[]?} dest -
     *              The array of destination array for nodes.
     *              Can set the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination.
     * @param {xpl.size_t} len - Number of the destination to be copied.
     * @returns {xpl.size_t} Number of the nodes.
     */
    xpl.XModelContainerUtils.getNodes = function (container, dest, off, len) {
        var count = 0;
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                var num = xpl.XModelNodeUtils.getNodes(container.nodes[i], dest, off, len);
                off += num;
                len -= num;
                count += num;
            }
        }
        return count;
    };

    /**
     * Update the parent information.
     *
     * @memberof xpl.XModelContainerUtils
     * @function updateParent
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.updateParent = function (container) {
        if (container != null) {
            // update the parent in the this container.
            for (var i = 0; i < container.num_meshes; ++i) {
                var mesh = container.meshes[i];
                if (mesh != null) {
                    mesh.parent = null;
                }
            }

            // update the parent in the nodes that be chained to the this container.
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.updateParent(container.nodes[i], null);
            }
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelContainerUtils
     * @function updateCombinationp
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {xpl.float32_t} m00 - Element of 0-0 in the source matrix.
     * @param {xpl.float32_t} m01 - Element of 0-1 in the source matrix.
     * @param {xpl.float32_t} m02 - Element of 0-2 in the source matrix.
     * @param {xpl.float32_t} m03 - Element of 0-3 in the source matrix.
     * @param {xpl.float32_t} m10 - Element of 1-0 in the source matrix.
     * @param {xpl.float32_t} m11 - Element of 1-1 in the source matrix.
     * @param {xpl.float32_t} m12 - Element of 1-2 in the source matrix.
     * @param {xpl.float32_t} m13 - Element of 1-3 in the source matrix.
     * @param {xpl.float32_t} m20 - Element of 2-0 in the source matrix.
     * @param {xpl.float32_t} m21 - Element of 2-1 in the source matrix.
     * @param {xpl.float32_t} m22 - Element of 2-2 in the source matrix.
     * @param {xpl.float32_t} m23 - Element of 2-3 in the source matrix.
     * @param {xpl.float32_t} m30 - Element of 3-0 in the source matrix.
     * @param {xpl.float32_t} m31 - Element of 3-1 in the source matrix.
     * @param {xpl.float32_t} m32 - Element of 3-2 in the source matrix.
     * @param {xpl.float32_t} m33 - Element of 3-3 in the source matrix.
     */
    xpl.XModelContainerUtils.updateCombinationp = function (container,
                                                           m00, m01, m02, m03,
                                                           m10, m11, m12, m13,
                                                           m20, m21, m22, m23,
                                                           m30, m31, m32, m33) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.updateCombinationAllp(
                    container.nodes[i],
                    m00, m01, m02, m03,
                    m10, m11, m12, m13,
                    m20, m21, m22, m23,
                    m30, m31, m32, m33);
            }
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelContainerUtils
     * @function updateCombinationv
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {Float32Array} m - The source matrix.
     * @param {xpl.size_t} m_off - Starting position in the source matrix.
     */
    xpl.XModelContainerUtils.updateCombinationv = function (container, m, m_off) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.updateCombinationAllv(container.nodes[i], m, m_off);
            }
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelContainerUtils
     * @function updateCombination
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.updateCombination = function (container) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.updateCombinationAll(container.nodes[i]);
            }
        }
    };

    /**
     * Update the offset transforms from the combination transform.
     *
     * @memberof xpl.XModelContainerUtils
     * @function updateOffset
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.updateOffset = function (container) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.updateOffset(container.nodes[i]);
            }
        }
    };

    /**
     * Set the specified track animation.
     *
     * @memberof xpl.XModelContainerUtils
     * @function setAnimation
     * @param {xpl.XModelContainer?} container - container - The container instance.
     * @param {xpl.size_t} index - The index of the animation track.
     * @param {xpl.float64_t} time - The time
     * @param {Boolean} loop - It's the true if enable the loop, It's false if disnable the loop.
     */
    xpl.XModelContainerUtils.setAnimation = function (container, index, time, loop) {
        if (container != null && 0 <= index && index < container.num_animation_sets) {
            var anim_set = container.animation_sets[index];
            var total = xpl.XModelAnimationUtils.getAnimationSetTotalTime(anim_set);
            time *= container.time_rate;
            if (0 < total && loop) {
                time %= total;
            } else {
                xpl.MathUtils.mid(0, total, time);
            }
            xpl.XModelAnimationUtils.setAnimationSet(anim_set, time);
        }
    };

    /**
     * Get the time of the specified track animation.
     *
     * @memberof xpl.XModelContainerUtils
     * @function getAnimationTotalTime
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {xpl.size_t} index - The index of the animation track.
     * @returns {xpl.float64_t} The total time.
     */
    xpl.XModelContainerUtils.getAnimationTotalTime = function (container, index) {
        if (container != null && 0 <= index && index < container.num_animation_sets) {
            return xpl.XModelAnimationUtils.getAnimationSetTotalTime(container.animation_sets[index]) / container.time_rate;
        }
        return 0;
    };

    /**
     * Apply the kinematics for Attitude.
     *
     * @memberof xpl.XModelContainer
     * @function applyKinematics
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.applyKinematics = function (container) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.applyKinematics(container.nodes[i]);
            }
        }
    };

    /**
     * Reset the transforms for Attitude.
     *
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.resetTransforms = function (container) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.resetTransforms(container.nodes[i]);
            }
        }
    };

    /**
     * Reset the offset transforms for Attitude.
     *
     * @param {xpl.XModelContainer?} container - The container instance.
     */
    xpl.XModelContainerUtils.resetOffset = function (container) {
        xpl.XModelContainerUtils.resetTransforms(container);
        xpl.XModelContainerUtils.updateCombination(container);
        xpl.XModelContainerUtils.updateOffset(container);
    };

    /**
     * Process the each meshes in the node recursively.
     *
     * @memberof xpl.forEachMesh
     * @function forEachMesh
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {Function?} callback -
     *              The be processing callback.
     *              First argument is the mesh instance.
     *              Second argument is the any parameter.
     * @param {Object?} param - The any parameter for the callback to be passed.
     */
    xpl.XModelContainerUtils.forEachMesh = function (container, callback, arg) {
        if (container != null) {
            // process the mesh in the this container.
            for (var i = 0; i < container.num_meshes; ++i) {
                var mesh = container.meshes[i];
                if (mesh != null) {
                    callback(mesh, arg);
                }
            }

            // process the mesh in the nodes that be chained to the this container.
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.forEachMesh(container.nodes[i], callback, arg);
            }
        }
    };

    /**
     * Process the each nodes in the node recursively.
     *
     * @memberof xpl.XModelContainer
     * @function forEachNode
     * @param {xpl.XModelContainer?} container - The container instance.
     * @param {Function?} callback -
     *              The be processing callback.
     *              First argument is the node instance.
     *              Second argument is the hierarchy level.
     *              Third argument is the any parameter.
     * @param {Object?} param - The any parameter for the callback to be passed.
     */
    xpl.XModelContainerUtils.forEachNode = function (container, callback, arg) {
        if (container != null) {
            for (var i = 0; i < container.num_nodes; ++i) {
                xpl.XModelNodeUtils.forEachNode(container.nodes[i], callback, 0, arg);
            }
        }
    };

})(xpl);
