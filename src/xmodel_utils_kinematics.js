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

    var VX = ns.Geometry.VX, VY = ns.Geometry.VY, VZ = ns.Geometry.VZ;
    var CR = ns.Geometry.CR, CI = ns.Geometry.CI, CJ = ns.Geometry.CJ, CK = ns.Geometry.CK;
    var M00 = ns.Geometry.M4X4_00, M01 = ns.Geometry.M4X4_01, M02 = ns.Geometry.M4X4_02, M03 = ns.Geometry.M4X4_03,
        M10 = ns.Geometry.M4X4_10, M11 = ns.Geometry.M4X4_11, M12 = ns.Geometry.M4X4_12, M13 = ns.Geometry.M4X4_13,
        M20 = ns.Geometry.M4X4_20, M21 = ns.Geometry.M4X4_21, M22 = ns.Geometry.M4X4_22, M23 = ns.Geometry.M4X4_23,
        M30 = ns.Geometry.M4X4_30, M31 = ns.Geometry.M4X4_31, M32 = ns.Geometry.M4X4_32, M33 = ns.Geometry.M4X4_33;

    /**
     * Utilities for the xModel kinematics structure.
     *
     * @namespace xpl.XModelKinematicsUtils
     * @see xpl.XModelNode
     * @author Syuuhei Kuno
     */
    ns.XModelKinematicsUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * The rotation weight.
     *
     * @private
     * @memberof xpl.XModelKinematicsUtils
     * @member {xpl.float32_t} ROTATION_WEIGHT -
     */
    var ROTATION_WEIGHT = 0.5;

    /**
     * Bone information structure.
     *
     * @private
     * @class
     * @alias xpl.XModelKinematicsUtils.BoneInformation
     * @param {xpl.XModelNode} node - The node.
     */
    var BoneInformation = function (node) {

        /**
         * XModelNode : The node.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {XModelNode} node - The target node.
         */
        this.node = node;

        /**
         * float[16] : The local transform without rotation.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} local_transform - The local transform coordination of node.
         */
        this.local_transform = new Float32Array(ns.XModelStructure.SIZE_MATRIX);

        /**
         * float[16] : The combined transform.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} transform - The global transform coordination of node.
         */
        this.transform = new Float32Array(ns.XModelStructure.SIZE_MATRIX);

        /**
         * float[16] : The combined offset transform.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} offset_transform - The offset transform of global
         *              transform coordination of node.
         */
        this.offset_transform = new Float32Array(ns.XModelStructure.SIZE_MATRIX);

        /**
         * float[4] : The element of rotation.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} rotate - The rotation in the node transform.
         */
        this.rotate = new Float32Array(ns.XModelStructure.SIZE_QUATERNION);

        /**
         * float[3] : The min sines.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} min_sins - The min sine in rotation bounds.
         */
        this.min_sins = new Float32Array(ns.XModelStructure.SIZE_VECTOR_3);

        /**
         * float[3] : The max sines.
         *
         * @instance
         * @constant
         * @memberof BoneInformation
         * @member {Float32Array} max_sins - The max sin in rotation bounds.
         */
        this.max_sins = new Float32Array(ns.XModelStructure.SIZE_VECTOR_3);

        // initialize.

        // local transform.
        ns.Matrix4x4.loadIdentity(this.local_transform, 0);
        for (var i = 0; i < ns.XModelNode.TRANSFORM_ROTATE; ++i) {
            ns.XModelTransformUtils.applyTransform(
                this.node.transforms[i],
                this.local_transform, 0);
        }
        ns.Matrix4x4.normalizeAxisv(
            this.local_transform, 0, this.local_transform, 0, true);

        // check the volume of cube.
        var m00 = this.local_transform[M00], m01 = this.local_transform[M01], m02 = this.local_transform[M02],
            m10 = this.local_transform[M10], m11 = this.local_transform[M11], m12 = this.local_transform[M12],
            m20 = this.local_transform[M20], m21 = this.local_transform[M21], m22 = this.local_transform[M22];
        if (((m10 * m21 - m20 * m11) * m02 +
            (m20 * m01 - m00 * m21) * m12 +
            (m00 * m11 - m10 * m01) * m22) < 0) {
            // (xAxis × yAxis) ・ zAxis < 0
            this.local_transform[M00] = -this.local_transform[M00];
            this.local_transform[M01] = -this.local_transform[M01];
            this.local_transform[M02] = -this.local_transform[M02];
            this.local_transform[M10] = -this.local_transform[M10];
            this.local_transform[M11] = -this.local_transform[M11];
            this.local_transform[M12] = -this.local_transform[M12];
            this.local_transform[M20] = -this.local_transform[M20];
            this.local_transform[M21] = -this.local_transform[M21];
            this.local_transform[M22] = -this.local_transform[M22];
        }

        // local rotation.
        var transform = this.node.transforms[ns.XModelNode.TRANSFORM_ROTATE];
        if (transform.structure_type == ns.XModelStructure.TYPE_AXIS_ROTATE) {
            ns.Quaternion.loadRotate(
                this.rotate, 0,
                transform.value[ns.XModelAxisRotate.X],
                transform.value[ns.XModelAxisRotate.Y],
                transform.value[ns.XModelAxisRotate.Z],
                transform.value[ns.XModelAxisRotate.ANGLE],
                true);
        } else if (transform.structure_type == ns.XModelStructure.TYPE_QUATERNION) {
            ns.Quaternion.loadv(this.rotate, 0, transform.value, 0);
            ns.Quaternion.normalizev(this.rotate, 0, this.rotate, 0);
        } else {
            ns.Quaternion.loadIdentity(this.rotate, 0);
        }

        // limited of rotation sines.
        for (var i = 0; i < ns.XModelStructure.SIZE_VECTOR_3; ++i) {
            this.min_sins[i] = Math.sin(this.node.min_angles[i] * 0.5);
            this.max_sins[i] = Math.sin(this.node.max_angles[i] * 0.5);
        }
    };

    /**
     * Update the offset matrix of the transform.
     *
     * @instance
     * @memberof xpl.XModelKinematicsUtils.BoneInformation
     * @function updateOffsetTransform
     */
    BoneInformation.prototype.updateOffsetTransform = function () {
        var m00 = this.transform[M00], m01 = this.transform[M10], m02 = this.transform[M20],
            m10 = this.transform[M01], m11 = this.transform[M11], m12 = this.transform[M21],
            m20 = this.transform[M02], m21 = this.transform[M12], m22 = this.transform[M22],
            tx = -this.transform[M03], ty = -this.transform[M13], tz = -this.transform[M23];
        ns.Matrix4x4.load(
            this.offset_transform, 0,
            m00, m01, m02, tx * m00 + ty * m01 + tz * m02,
            m10, m11, m12, tx * m10 + ty * m11 + tz * m12,
            m20, m21, m22, tx * m20 + ty * m21 + tz * m22,
            0, 0, 0, 1,
            false);
    };

    /**
     * Reset the transform in the bone informations.
     *
     * @private
     * @memberof xpl.XModelKinematicsUtils
     * @function updateTransforms
     * @param {xpl.size_t} num_bones - The number of bones.
     * @param {Array.<BoneInformation>} bone_infos - The bones.
     */
    var updateTransforms = function (num_bones, bone_infos) {
        // calculate transform in the root.
        var bone_info = bone_infos[num_bones - 1];
        if (bone_info.node.parent != null) {
            ns.Matrix4x4.mulv(
                bone_info.transform, 0,
                bone_info.node.parent.combined_matrix, 0,
                bone_info.local_transform, 0);
        } else {
            ns.Matrix4x4.loadv(
                bone_info.transform, 0,
                bone_info.local_transform, 0,
                false);
        }
        ns.Matrix4x4.mulQuaternionv(bone_info.transform, 0, bone_info.rotate, 0, true);
        bone_info.updateOffsetTransform();

        // calculate transform in the children.
        for (var i = num_bones - 2; 0 <= i; --i) {
            var prev_bone_info = bone_info;
            bone_info = bone_infos[i];
            ns.Matrix4x4.mulv(
                bone_info.transform, 0,
                prev_bone_info.transform, 0,
                bone_info.local_transform, 0);
            ns.Matrix4x4.mulQuaternionv(bone_info.transform, 0, bone_info.rotate, 0, true);
            bone_info.updateOffsetTransform();
        }
    };

    /**
     * Reset the combination matrix in the node.
     *
     * @private
     * @memberof xpl.XModelKinematicsUtils
     * @function updateCombination
     * @param {xpl.XModelNode} node - The root node that apply transform.
     */
    var updateCombination = function (node) {
        if (node.parent != null) {
            ns.XModelNodeUtils.updateCombinationv(
                node,
                node.num_children, node.children, 0,
                node.parent.combined_matrix, 0);
        } else {
            ns.XModelNodeUtils.updateCombination(node);
        }
    };

    /**
     * Apply the inverse kinematics.
     *
     * @memberof xpl.XModelKinematicsUtils
     * @function applyInverseKinematicesLocation
     * @param {xpl.XModelNode} node - The node.
     * @param {Float32Array} target - The target coordination.
     * @param {xpl.uint32_t} num_max_iteration - The number of processing iteration.
     * @param {xpl.uint32_t} num_max_chain - The number of chained nodes.
     * @param {xpl.float32_t} err_len - The allowable error distance.
     */
    ns.XModelKinematicsUtils.applyInverseKinematicesLocation = function (node, target,
                                                                         num_max_iteration, num_max_chain,
                                                                         err_len) {
        if (node != null && 1 <= num_max_chain) {
            // count and reset transform at target nodes.
            var last_node = node;
            var num_nodes = 1;
            while (num_nodes < num_max_chain) {
                if (last_node.parent == null) {
                    break;
                }
                last_node = last_node.parent;
                num_nodes++;
            }
            if (num_max_chain == 1 || num_nodes <= 1) {
                num_max_iteration = 1;
            }

            // make temporary structure for the bones.
            var bone_infos = new Array(num_nodes);
            var current_node = node;
            for (var i = 0; i < num_nodes; ++i) {
                bone_infos[i] = bone_info = new BoneInformation(current_node);
                current_node = current_node.parent;
            }

            // calculate inverse kinematices same repeat.
            var effector = new Float32Array(ns.XModelStructure.SIZE_VECTOR_3);
            var between_rotate = new Float32Array(ns.XModelStructure.SIZE_QUATERNION);
            var before_rotate = new Float32Array(ns.XModelStructure.SIZE_QUATERNION);
            var diff_rotate = new Float32Array(ns.XModelStructure.SIZE_QUATERNION);
            var modified_rotation = false;
            for (var i = 0; i < num_max_iteration; ++i) {
                var bone_info = bone_infos[0];

                // update the effector.
                updateTransforms(num_nodes, bone_infos);
                ns.Vector3.mulMatrix4x4v(
                    effector, 0, bone_info.transform, 0, bone_info.node.bone_tail, 0, true);

                // check the range length.
                var dx = effector[VX] - target[VX];
                var dy = effector[VY] - target[VY];
                var dz = effector[VZ] - target[VZ];
                if (dx * dx + dy * dy + dz * dz <= err_len) {
                    break;
                }

                modified_rotation = false;

                // calculate rotation in a bone.
                for (var j = 0; j < num_nodes; ++j) {
                    bone_info = bone_infos[j];
                    var tx = bone_info.transform[M03];
                    var ty = bone_info.transform[M13];
                    var tz = bone_info.transform[M23];
                    ns.Quaternion.loadRotateVector3(
                        between_rotate, 0,
                        effector[VX] - tx, effector[VY] - ty, effector[VZ] - tz,
                        true,
                        target[VX] - tx, target[VY] - ty, target[VZ] - tz,
                        true,
                        (i == num_max_iteration - 1 ? 1.0 : ROTATION_WEIGHT) *
                        ((j + 1) / num_nodes));
                    if (modified_rotation) {
                        ns.Quaternion.mulv(
                            between_rotate, 0, between_rotate, 0, diff_rotate, 0);
                        modified_rotation = false;
                    }
                    ns.Quaternion.loadv(diff_rotate, 0, between_rotate, 0);

                    // convert rotation to bone local.
                    ns.Vector3.mulMatrix4x4Axisv(
                        between_rotate, CI,
                        bone_info.offset_transform, 0,
                        between_rotate, CI,
                        true);
                    ns.Quaternion.conjugatev(
                        between_rotate, 0, between_rotate, 0);
                    ns.Quaternion.loadv(before_rotate, 0, bone_info.rotate, 0);
                    ns.Quaternion.mulv(
                        bone_info.rotate, 0, between_rotate, 0, bone_info.rotate, 0);

                    for (var k = 0; k < ns.XModelStructure.SIZE_VECTOR_3; ++k) {
                        if (bone_info.node.lock_axises[k]) {
                            // lock rotation in the joint.
                            bone_info.rotate[CI + k] = 0;
                            modified_rotation = true;
                        } else {
                            // limit rotation in the joint.
                            var before = bone_info.rotate[CI + k];
                            var after = ns.MathUtils.mid(
                                before, bone_info.min_sins[k], bone_info.max_sins[k]);
                            if (before != after) {
                                bone_info.rotate[CI + k] = after;
                                modified_rotation = true;
                            }
                        }
                    }

                    // apply modified roation.
                    if (modified_rotation) {
                        ns.Quaternion.normalizev(bone_info.rotate, 0, bone_info.rotate, 0);
                        ns.Quaternion.divv(
                            between_rotate, 0, bone_info.rotate, 0, before_rotate, 0);
                    }
                    ns.Quaternion.conjugatev(between_rotate, 0, between_rotate, 0);

                    // apply rotation to the effector.
                    ns.Vector3.sub(
                        effector, 0,
                        effector[VX], effector[VY], effector[VZ],
                        tx, ty, tz);
                    ns.Vector3.mulMatrix4x4Axisv(
                        between_rotate, CI,
                        bone_info.transform, 0,
                        between_rotate, CI,
                        true);
                    ns.Vector3.mulQuaternionv(
                        effector, 0, between_rotate, 0, effector, 0);
                    ns.Vector3.add(
                        effector, 0,
                        effector[VX], effector[VY], effector[VZ],
                        tx, ty, tz);

                    // calculate modified roation.
                    if (modified_rotation) {
                        ns.Quaternion.divv(
                            diff_rotate, 0, diff_rotate, 0, between_rotate, 0);
                    }
                }
            }

            // apply result at the combination transforms.
            for (var i = 0; i < num_nodes; ++i) {
                var bone_info = bone_infos[i];
                var transform = bone_info.node.transforms[ns.XModelNode.TRANSFORM_ROTATE];
                if (transform.structure_type == ns.XModelStructure.TYPE_AXIS_ROTATE) {
                    var ip = bone_info.rotate[CI];
                    var jp = bone_info.rotate[CJ];
                    var kp = bone_info.rotate[CK];
                    var len = ip * ip + jp * jp + kp * kp;
                    if (0 < len) {
                        len = Math.sqrt(len);
                        ip /= len;
                        jp /= len;
                        kp /= len;
                    }
                    transform.value[ns.XModelAxisRotate.ANGLE] =
                        Math.acos(bone_info.rotation[ns.Geometry.CR]);
                    transform.value[ns.XModelAxisRotate.X] = ip;
                    transform.value[ns.XModelAxisRotate.Y] = jp;
                    transform.value[ns.XModelAxisRotate.Z] = kp;
                } else if (transform.structure_type == ns.XModelStructure.TYPE_QUATERNION) {
                    ns.Quaternion.loadv(transform.value, 0, bone_info.rotate, 0);
                }
            }
            updateCombination(last_node);
        }
    };

    /**
     * Apply the inverse kinematics.
     *
     * @memberof xpl.XModelKinematicsUtils
     * @function applyInverseKinematices
     * @param {xpl.XModelNode} node - The node.
     * @param {xpl.XModelNode} target - The target node.
     * @param {xpl.uint32_t} num_max_iteration - The number of processing iteration.
     * @param {xpl.uint32_t} num_max_chain - The number of chained nodes.
     * @param {xpl.float32} err_len - The allowable error distance.
     */
    ns.XModelKinematicsUtils.applyInverseKinematices = function (node,
                                                                 target,
                                                                 num_max_iteration,
                                                                 num_max_chain,
                                                                 err_len) {
        if (node != null && target != null) {
            var position = new Float32Array(ns.XModelStructure.SIZE_VECTOR_3);
            ns.Vector3.loadZero(position, 0);
            ns.Vector3.mulMatrix4x4v(
                position, 0,
                target.combined_matrix, 0,
                position, 0,
                true);
            ns.XModelKinematicsUtils.applyInverseKinematicesLocation(
                node,
                position,
                num_max_iteration,
                num_max_chain,
                0.0001);
        }
    };

    /**
     * Apply the copy transform.
     *
     * @memberof xpl.XModelKinematicsUtils
     * @function applyCopyTransform
     * @param {xpl.XModelNode} node - The node.
     * @param {xpl.XModelNode} target - The target node.
     */
    ns.XModelKinematicsUtils.applyCopyTransform = function (node, target) {
        // TODO: implementation.
    };

})(xpl);
