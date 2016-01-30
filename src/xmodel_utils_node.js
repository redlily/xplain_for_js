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
     * Utilities for thens.XModel node structure.
     *
     * @namespace xpl.XModelNodeUtils
     * @see xpl.XModelNode
     * @author Syuuhei Kuno
     */
    ns.XModelNodeUtils = function() {
    };

    /**
     * Get the textures that be included in the node recursively.
     *
     * @memberof XModelNodeUtils
     * @function getTextures
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Array.<xpl.XModeltexture>?} dest -
     *              The array of destination array for textures.
     *              Can set the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination.
     * @param {xpl.size_t} len - Number of the destination to be copied.
     * @returns {xpl.size_t} Number of written the textures.
     */
    ns.XModelNodeUtils.getTextures = function(root, dest, off, len) {
        var count = 0;
        if (root != null) {
            // count the textures in the meshes that be chained to the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                var num = ns.XModelMeshUtils.getTextures(root.meshes[i], dest, off, len);
                off += num;
                len -= num;
                count += num;
            }

            // count the textures in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                var num = ns.XModelNodeUtils.getTextures(root.children[i], dest, off, len);
                off += num;
                len -= num;
                count += num;
            }
        }
        return count;
    };

    /**
     * Release the textures that be included in the node recursively.
     *
     * @memberof xpl.XModelNodeUtils
     * @function releaseTextures
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.releaseTextures = function(root) {
        if (root != null) {
            // release the textures in the meshes that be chained to the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                ns.XModelMeshUtils.releaseTextures(root.meshes[i]);
            }

            // release the textures in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                ns.XModelNodeUtils.releaseTextures(root.children[i]);
            }
        }
    };

    /**
     * Get the meshes that be included in the node recursively.
     *
     * @memberof xpl.XModelNodeUtils
     * @function getMeshes
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Array.<xpl.XModelMesh>?} dest -
     *              The array of destination array for meshes.
     *              Can set the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination.
     * @param {xpl.size_t} len - Number of the destination to be copied.
     * @returns {xpl.size_t} Number of written the meshes.
     */
    ns.XModelNodeUtils.getMeshes = function(root, dest, off, len) {
        var count = 0;
        if (root != null) {
            // count the mesh in the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                var mesh = root.meshes[i];
                if (mesh != null) {
                    if (dest != null && 0 < len) {
                        dest[off++] = mesh;
                        len--;
                    }
                    count++;
                }
            }

            // count the meshes in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                var num = ns.XModelNodeUtils.getMeshes(root.children[i], dest, off, len);
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
     * @memberof xpl.XModelNodeUtils
     * @function releaseShapes
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.releaseShapes = function(root) {
        if (root != null) {
            // release the shape information in the meshes that has been chained to the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                ns.XModelMeshUtils.releaseShape(root.meshes[i]);
            }

            // release the shape information in the nodes that has been chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                ns.XModelNodeUtils.releaseShapes(root.children[i]);
            }
        }
    };

    /**
     * Get the nodes that be included in the node recursively.
     *
     * @memberof xpl.XModelNodeUtils
     * @function getNodes
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Array.<xpl.XModelNode>?} dest -
     *              The array of destination array for meshes.
     *              Can set the null if not needed it.
     * @param {xpl.size_t} off - Starting position in the destination.
     * @param {xpl.size_t} len - Number of the destination to be copied.
     * @returns {xpl.size_t} Number of written the meshes.
     */
    ns.XModelNodeUtils.getNodes = function(root, dest, off, len) {
        var count = 0;
        if (root != null) {
            // destinate the this node.
            if (dest != null && 0 < len) {
                dest[off++] = root;
                len--;
            }
            count++;

            // count the nodes in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                var num = ns.XModelNodeUtils.getNodes(root.children[i], dest, off, len);
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
     * @memberof xpl.XModelNodeUtils
     * @function updateParent
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {xpl.XModelNode?} parent - The parent node.
     */
    ns.XModelNodeUtils.updateParent = function(root, parent) {
        if (root != null) {
            // update the this node.
            root.parent = parent;

            // update the parent of meshes in the node that has been chained to the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                root.meshes[i].parent = root;
            }

            // update the parent of nodes in the node that has been chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                ns.XModelNodeUtils.updateParent(root.children[i], root);
            }
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateCombinationp
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {xpl.size_t} num_children - Number of the nodes.
     * @param {Array.<xpl.XModelNode>} children - Array of the nodes.
     * @param {xpl.size_t} children_off - Starting position in the nodes.
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
    ns.XModelNodeUtils.updateCombinationp = function(root,
                                                     num_children, children, children_off,
                                                     m00, m01, m02, m03,
                                                     m10, m11, m12, m13,
                                                     m20, m21, m22, m23,
                                                     m30, m31, m32, m33) {
        if (root != null) {
            // blend the matrix.
            ns.Matrix4x4.load(
                root.combined_matrix, 0,
                m00, m01, m02, m03,
                m10, m11, m12, m13,
                m20, m21, m22, m23,
                m30, m31, m32, m33);
            for (var i = 0; i < ns.XModelNode.NUM_TRANSFORMS; ++i) {
                ns.XModelTransformUtils.applyTransform(
                    root.transforms[i],
                    root.combined_matrix, 0);
            }

            // update the work matrix.
            m00 = root.combined_matrix[ns.Geometry.M4X4_00];
            m01 = root.combined_matrix[ns.Geometry.M4X4_01];
            m02 = root.combined_matrix[ns.Geometry.M4X4_02];
            m03 = root.combined_matrix[ns.Geometry.M4X4_03];
            m10 = root.combined_matrix[ns.Geometry.M4X4_10];
            m11 = root.combined_matrix[ns.Geometry.M4X4_11];
            m12 = root.combined_matrix[ns.Geometry.M4X4_12];
            m13 = root.combined_matrix[ns.Geometry.M4X4_13];
            m20 = root.combined_matrix[ns.Geometry.M4X4_20];
            m21 = root.combined_matrix[ns.Geometry.M4X4_21];
            m22 = root.combined_matrix[ns.Geometry.M4X4_22];
            m23 = root.combined_matrix[ns.Geometry.M4X4_23];
            m30 = root.combined_matrix[ns.Geometry.M4X4_30];
            m31 = root.combined_matrix[ns.Geometry.M4X4_31];
            m32 = root.combined_matrix[ns.Geometry.M4X4_32];
            m33 = root.combined_matrix[ns.Geometry.M4X4_33];

            // conduction the matrix to the next node.
            for (var i = 0; i < num_children; ++i) {
                var child = children[children_off + i];
                ns.XModelNodeUtils.updateCombinationp(
                    child, child.num_children, child.children, 0,
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
     * @memberof xpl.XModelNodeUtils
     * @function updateCombinationv
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {xpl.size_t} num_children - Number of the node.
     * @param {Array.<xpl.XModelNode>} children - Array of the node.
     * @param {xpl.size_t} children_off - Starting position in the node.
     * @param {Float32Array} m - The source matrix.
     * @param {xpl.size_t} m_off - Starting position in the source matrix.
     */
    ns.XModelNodeUtils.updateCombinationv = function(root,
                                                     num_children, children, children_off,
                                                     m, m_off) {
        ns.XModelNodeUtils.updateCombinationp(
            root,
            num_children, children, children_off,
            m[m_off + ns.Geometry.M4X4_00], m[m_off + ns.Geometry.M4X4_01], m[m_off + ns.Geometry.M4X4_02], m[m_off + ns.Geometry.M4X4_03],
            m[m_off + ns.Geometry.M4X4_10], m[m_off + ns.Geometry.M4X4_11], m[m_off + ns.Geometry.M4X4_12], m[m_off + ns.Geometry.M4X4_13],
            m[m_off + ns.Geometry.M4X4_20], m[m_off + ns.Geometry.M4X4_21], m[m_off + ns.Geometry.M4X4_22], m[m_off + ns.Geometry.M4X4_23],
            m[m_off + ns.Geometry.M4X4_30], m[m_off + ns.Geometry.M4X4_31], m[m_off + ns.Geometry.M4X4_32], m[m_off + ns.Geometry.M4X4_33]);
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateCombination
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {xpl.size_t} num_children - Number of the node.
     * @param {Array.<xpl.XModelNode>} children - Array of the node.
     * @param {xpl.size_t} children_off - Starting position in the node.
     */
    ns.XModelNodeUtils.updateCombination = function(root, num_children, children, children_off) {
        ns.XModelNodeUtils.updateCombinationp(
            root,
            num_children, children, children_off,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1);
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateCombinationAllp
     * @param {xpl.XModelNode?} root - The root node instance.
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
    ns.XModelNodeUtils.updateCombinationAllp = function(root,
                                                        m00, m01, m02, m03,
                                                        m10, m11, m12, m13,
                                                        m20, m21, m22, m23,
                                                        m30, m31, m32, m33) {
        if (root != null) {
            ns.XModelNodeUtils.updateCombinationp(
                root,
                m00, m01, m02, m03,
                m10, m11, m12, m13,
                m20, m21, m22, m23,
                m30, m31, m32, m33);
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateCombinationAllv
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Float32Array} m - The source matrix.
     * @param {xpl.size_t} m_off - Starting position in the source matrix.
     */
    ns.XModelNodeUtils.updateCombinationAllv = function(root, m, m_off) {
        if (root != null) {
            ns.XModelNodeUtils.updateCombinationp(
                root, root.num_children, root.children, 0,
                m[m_off + ns.Geometry.M4X4_00], m[m_off + ns.Geometry.M4X4_01], m[m_off + ns.Geometry.M4X4_02], m[m_off + ns.Geometry.M4X4_03],
                m[m_off + ns.Geometry.M4X4_10], m[m_off + ns.Geometry.M4X4_11], m[m_off + ns.Geometry.M4X4_12], m[m_off + ns.Geometry.M4X4_13],
                m[m_off + ns.Geometry.M4X4_20], m[m_off + ns.Geometry.M4X4_21], m[m_off + ns.Geometry.M4X4_22], m[m_off + ns.Geometry.M4X4_23],
                m[m_off + ns.Geometry.M4X4_30], m[m_off + ns.Geometry.M4X4_31], m[m_off + ns.Geometry.M4X4_32], m[m_off + ns.Geometry.M4X4_33]);
        }
    };

    /**
     * Update the transform combinations for Attitude.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateCombinationAll
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.updateCombinationAll = function(root) {
        if (root != null) {
            ns.XModelNodeUtils.updateCombinationp(
                root, root.num_children, root.children, 0,
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
        }
    };

    /**
     * Update the offset transforms from the combination transform.
     *
     * @memberof xpl.XModelNodeUtils
     * @function updateOffset
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.updateOffset = function(root) {
        if (root != null) {
            // calculate the offset transform.
            ns.Matrix4x4.inversev(root.offset_matrix, 0, root.combined_matrix, 0);

            // update the offsets in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
               ns.XModelNodeUtils.updateOffset(root.children[i]);
            }
        }
    };

    /**
     * Apply the kinematics for Attitude.
     *
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.applyKinematics = function(root) {
        if (root != null) {
            // apply the inverse kinematics in the node.
            for(var i = 0; i < root.num_iks; ++i) {
                var ik = root.iks[i];
                if(ik != null) {
                    ns.XModelKinematicsUtils.applyInverseKinematices(
                        root,
                        ik.target,
                        ik.max_iterations,
                        ik.chain_length,
                        Math.PI * 1e-4);
                }
            }

            // apply the kinematics in the node that be chained to the this node.
            for(var i = 0; i < root.num_children; ++i) {
                ns.XModelNodeUtils.applyKinematics(root.children[i]);
            }
        }
    };

    /**
     * Reset the transforms for Attitude.
     *
     * @param {xpl.XModelNode?} root - The root node instance.
     */
    ns.XModelNodeUtils.resetTransforms = function(root) {
        if (root != null) {
            // assignment the initial value to transforms.
            for (var i = 0; i <ns.XModelNode.NUM_TRANSFORMS; ++i) {
                ns.XModelTransformUtils.resetTransform(root.transforms[i]);
            }

            // update the transforms in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
                ns.XModelNodeUtils.resetTransforms(root.children[i]);
            }
        }
    };

    /**
     * Process the each meshes in the node recursively.
     *
     * @memberof xpl.XModelNodeUtils
     * @function forEachMesh
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Function?} callback -
     *              The processing callback.
     *              First argument is the mesh instance,
     *              second argument is the any parameter.
     * @param {Object?} param - The any parameter for the callback to be passed.
     */
   ns.XModelNodeUtils.forEachMesh = function(root, callback, param) {
        if (root != null) {
            // process the mesh in the this node.
            for (var i = 0; i < root.num_meshes; ++i) {
                var mesh = root.meshes[i];
                if (mesh != null) {
                    callback(mesh, param);
                }
            }

            // process the mesh in the nodes that be chained to the this node.
            for (var i = 0; i < root.num_children; ++i) {
               ns.XModelNodeUtils.forEachMesh(root.children[i], callback, param);
            }
        }
    };

    /**
     * Process the each nodes in the node recursively.
     *
     * @memberof xpl.XModelNodeUtils
     * @function forEachNode
     * @param {xpl.XModelNode?} root - The root node instance.
     * @param {Function?} callback -
     *              The processing callback.
     *              First argument is the node instance,
     *              second argument is the hierarchy level.
     *              third argument is the any parameter.
     * @param {xpl.size_t} level - The hierarchy deep.
     * @param {Object?} param - The any parameter for the callback to be passed.
     */
   ns.XModelNodeUtils.forEachNode = function(root, callback, level, param) {
        if (root != null) {
            // process the this node.
            callback(root, level, param);

            // process the node in the nodes that be chained to the this node.
            level += 1;
            for (var i = 0; i < root.num_children; ++i) {
               ns.XModelNodeUtils.forEachNode(root.children[i], callback, level, param);
            }
        }
    };

})(xpl);
