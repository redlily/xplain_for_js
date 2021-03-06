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

    const VX = xpl.Geometry.VX, VY = xpl.Geometry.VY, VZ = xpl.Geometry.VZ;
    const CI = xpl.Geometry.CI, CJ = xpl.Geometry.CJ, CK = xpl.Geometry.CK;
    const M00 = xpl.Geometry.M4X4_00, M01 = xpl.Geometry.M4X4_01, M02 = xpl.Geometry.M4X4_02, M03 = xpl.Geometry.M4X4_03;
    const M10 = xpl.Geometry.M4X4_10, M11 = xpl.Geometry.M4X4_11, M12 = xpl.Geometry.M4X4_12, M13 = xpl.Geometry.M4X4_13;
    const M20 = xpl.Geometry.M4X4_20, M21 = xpl.Geometry.M4X4_21, M22 = xpl.Geometry.M4X4_22, M23 = xpl.Geometry.M4X4_23;
    const SIZE_MATRIX = xpl.XModelStructure.SIZE_MATRIX;

    /**
     * 運動学用のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.XModelKinematicsUtils = function () {
        throw new Error("Unsupported operation");
    };

    // 回転の重み
    const ROTATION_WEIGHT = 0.5;

    // ボーン情報
    const BoneInformation = function (node, slot) {
        // XModelNode : ノード
        this.node = node;
        // float32_t[16] : ローカル変形
        this.local_transform = new Float32Array(SIZE_MATRIX);
        // float32_t[16] : 変形
        this.transform = new Float32Array(SIZE_MATRIX);
        // float32_t[16] : 変形オフセット
        this.offset_transform = new Float32Array(xpl.XModelStructure.SIZE_MATRIX);
        // float32_t[4] : 回転
        this.rotate = new Float32Array(xpl.XModelStructure.SIZE_QUATERNION);
        // float32_t[3] : 最小sin値
        this.min_sins = new Float32Array(xpl.XModelStructure.SIZE_VECTOR_3);
        // float32_t[3] : 最大sin値
        this.max_sins = new Float32Array(xpl.XModelStructure.SIZE_VECTOR_3);

        // ローカル変形
        xpl.Matrix4x4.loadIdentity(this.local_transform, 0);
        for (let i = 0; i < xpl.XModelNode.TRANSFORM_ROTATE; ++i) {
            xpl.XModelParameterUtils.applyTransform(
                this.node.transforms[i],
                this.local_transform, 0, 1);
        }
        xpl.Matrix4x4.normalizeAxisv(
            this.local_transform, 0, this.local_transform, 0, true);

        // ローカル変形の回転部の面積をチェックする
        let m00 = this.local_transform[M00], m01 = this.local_transform[M01], m02 = this.local_transform[M02];
        let m10 = this.local_transform[M10], m11 = this.local_transform[M11], m12 = this.local_transform[M12];
        let m20 = this.local_transform[M20], m21 = this.local_transform[M21], m22 = this.local_transform[M22];
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

        // ローカル回転
        var transform = this.node.transforms[xpl.XModelNode.TRANSFORM_ROTATE];
        if (transform.structure_type == xpl.XModelStructure.TYPE_AXIS_ROTATE) {
            let index = transform.size * slot;
            xpl.Quaternion.loadRotate(
                this.rotate, 0,
                transform.values[index + xpl.XModelAxisRotate.X],
                transform.values[index + xpl.XModelAxisRotate.Y],
                transform.values[index + xpl.XModelAxisRotate.Z],
                transform.values[index + xpl.XModelAxisRotate.ANGLE],
                true);
        } else if (transform.structure_type == xpl.XModelStructure.TYPE_QUATERNION) {
            xpl.Quaternion.loadv(this.rotate, 0, transform.values, transform.size * slot);
            xpl.Quaternion.normalizev(this.rotate, 0, this.rotate, 0);
        } else {
            xpl.Quaternion.loadIdentity(this.rotate, 0);
        }

        // 角度制限
        for (var i = 0; i < xpl.XModelStructure.SIZE_VECTOR_3; ++i) {
            this.min_sins[i] = Math.sin(this.node.min_angles[i] * 0.5);
            this.max_sins[i] = Math.sin(this.node.max_angles[i] * 0.5);
        }
    };

    // 変形オフセットを更新する
    BoneInformation.prototype.updateOffsetTransform = function () {
        let m00 = this.transform[M00], m01 = this.transform[M10], m02 = this.transform[M20];
        let m10 = this.transform[M01], m11 = this.transform[M11], m12 = this.transform[M21];
        let m20 = this.transform[M02], m21 = this.transform[M12], m22 = this.transform[M22];
        let tx = -this.transform[M03], ty = -this.transform[M13], tz = -this.transform[M23];
        xpl.Matrix4x4.load(
            this.offset_transform, 0,
            m00, m01, m02, tx * m00 + ty * m01 + tz * m02,
            m10, m11, m12, tx * m10 + ty * m11 + tz * m12,
            m20, m21, m22, tx * m20 + ty * m21 + tz * m22,
            0, 0, 0, 1,
            false);
    };

    // ボーンの情報をリセットする
    const updateTransforms = function (num_bones, bone_infos) {
        // ルートの変形を計算
        let bone_info = bone_infos[num_bones - 1];
        if (bone_info.node.parent != null) {
            // 親のノードが存在する場合
            xpl.Matrix4x4.mulv(
                bone_info.transform, 0,
                bone_info.node.parent.combined_matrix, 0,
                bone_info.local_transform, 0);
        } else {
            // 親のノードが存在しない場合
            xpl.Matrix4x4.loadv(bone_info.transform, 0, bone_info.local_transform, 0);
        }
        xpl.Matrix4x4.mulQuaternionv(bone_info.transform, 0, bone_info.rotate, 0, true);
        bone_info.updateOffsetTransform();

        // ルート以下の子の変形を計算
        for (var i = num_bones - 2; 0 <= i; --i) {
            var prev_bone_info = bone_info;
            bone_info = bone_infos[i];
            xpl.Matrix4x4.mulv(
                bone_info.transform, 0,
                prev_bone_info.transform, 0,
                bone_info.local_transform, 0);
            xpl.Matrix4x4.mulQuaternionv(bone_info.transform, 0, bone_info.rotate, 0, true);
            bone_info.updateOffsetTransform();
        }
    };

    // 合成された変形を更新する
    const updateCombination = function (node) {
        if (node.parent != null) {
            xpl.XModelNodeUtils.updateCombinationv(
                node,
                node.num_children, node.children, 0,
                node.parent.combined_matrix, 0);
        } else {
            xpl.XModelNodeUtils.updateCombination(node);
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
    xpl.XModelKinematicsUtils.applyInverseKinematicsLocation = function (node,
                                                                         target,
                                                                         num_max_iteration,
                                                                         num_max_chain,
                                                                         err_len,
                                                                         slot) {
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
                bone_infos[i] = bone_info = new BoneInformation(current_node, slot);
                current_node = current_node.parent;
            }

            // calculate inverse kinematices same repeat.
            var effector = new Float32Array(xpl.XModelStructure.SIZE_VECTOR_3);
            var between_rotate = new Float32Array(xpl.XModelStructure.SIZE_QUATERNION);
            var before_rotate = new Float32Array(xpl.XModelStructure.SIZE_QUATERNION);
            var diff_rotate = new Float32Array(xpl.XModelStructure.SIZE_QUATERNION);
            var modified_rotation = false;
            for (var i = 0; i < num_max_iteration; ++i) {
                var bone_info = bone_infos[0];

                // update the effector.
                updateTransforms(num_nodes, bone_infos);
                xpl.Vector3.mulMatrix4x4v(
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
                    xpl.Quaternion.loadRotateVector3(
                        between_rotate, 0,
                        effector[VX] - tx, effector[VY] - ty, effector[VZ] - tz,
                        true,
                        target[VX] - tx, target[VY] - ty, target[VZ] - tz,
                        true,
                        (i == num_max_iteration - 1 ? 1.0 : ROTATION_WEIGHT) *
                        ((j + 1) / num_nodes));
                    if (modified_rotation) {
                        xpl.Quaternion.mulv(
                            between_rotate, 0, between_rotate, 0, diff_rotate, 0);
                        modified_rotation = false;
                    }
                    xpl.Quaternion.loadv(diff_rotate, 0, between_rotate, 0);

                    // convert rotation to bone local.
                    xpl.Vector3.mulMatrix4x4Axisv(
                        between_rotate, CI,
                        bone_info.offset_transform, 0,
                        between_rotate, CI,
                        true);
                    xpl.Quaternion.conjugatev(
                        between_rotate, 0, between_rotate, 0);
                    xpl.Quaternion.loadv(before_rotate, 0, bone_info.rotate, 0);
                    xpl.Quaternion.mulv(
                        bone_info.rotate, 0, between_rotate, 0, bone_info.rotate, 0);

                    for (var k = 0; k < xpl.XModelStructure.SIZE_VECTOR_3; ++k) {
                        if (bone_info.node.lock_axises[k]) {
                            // lock rotation in the joint.
                            bone_info.rotate[CI + k] = 0;
                            modified_rotation = true;
                        } else {
                            // limit rotation in the joint.
                            var before = bone_info.rotate[CI + k];
                            var after = xpl.MathUtils.mid(
                                before, bone_info.min_sins[k], bone_info.max_sins[k]);
                            if (before != after) {
                                bone_info.rotate[CI + k] = after;
                                modified_rotation = true;
                            }
                        }
                    }

                    // apply modified roation.
                    if (modified_rotation) {
                        xpl.Quaternion.normalizev(bone_info.rotate, 0, bone_info.rotate, 0);
                        xpl.Quaternion.divv(
                            between_rotate, 0, bone_info.rotate, 0, before_rotate, 0);
                    }
                    xpl.Quaternion.conjugatev(between_rotate, 0, between_rotate, 0);

                    // apply rotation to the effector.
                    xpl.Vector3.sub(
                        effector, 0,
                        effector[VX], effector[VY], effector[VZ],
                        tx, ty, tz);
                    xpl.Vector3.mulMatrix4x4Axisv(
                        between_rotate, CI,
                        bone_info.transform, 0,
                        between_rotate, CI,
                        true);
                    xpl.Vector3.mulQuaternionv(
                        effector, 0, between_rotate, 0, effector, 0);
                    xpl.Vector3.add(
                        effector, 0,
                        effector[VX], effector[VY], effector[VZ],
                        tx, ty, tz);

                    // calculate modified roation.
                    if (modified_rotation) {
                        xpl.Quaternion.divv(
                            diff_rotate, 0, diff_rotate, 0, between_rotate, 0);
                    }
                }
            }

            // apply result at the combination transforms.
            for (var i = 0; i < num_nodes; ++i) {
                var bone_info = bone_infos[i];
                var transform = bone_info.node.transforms[xpl.XModelNode.TRANSFORM_ROTATE];
                if (transform.structure_type == xpl.XModelStructure.TYPE_AXIS_ROTATE) {
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
                    let index = transform.size * slot;
                    transform.values[index + xpl.XModelAxisRotate.X] = ip;
                    transform.values[index + xpl.XModelAxisRotate.Y] = jp;
                    transform.values[index + xpl.XModelAxisRotate.Z] = kp;
                    transform.values[index + xpl.XModelAxisRotate.ANGLE] =
                        Math.acos(bone_info.rotation[xpl.Geometry.CR]);
                } else if (transform.structure_type == xpl.XModelStructure.TYPE_QUATERNION) {
                    xpl.Quaternion.loadv(transform.values, transform.size * slot, bone_info.rotate, 0);
                }
            }
            updateCombination(last_node);
        }
    };
    
    /**
     * 逆運動学を適用します。
     * 
     * @param {xpl.XModelNode} node - 処理対象のノード構造
     * @param {xpl.XModelNode} target - 追従を行うノード構造
     * @param {xpl.size_t} num_max_iteration - 繰り返しの最大数
     * @param {xpl.size_t} num_max_chain - 連鎖数
     * @param {xpl.float32_t} err_len - 距離の許容誤差
     * @param {xpl.size_t} slot - 
     */
    xpl.XModelKinematicsUtils.applyInverseKinematics = function (node,
                                                                 target,
                                                                 num_max_iteration,
                                                                 num_max_chain,
                                                                 err_len,
                                                                 slot) {
        if (node != null && target != null) {
            var position = new Float32Array(xpl.XModelStructure.SIZE_VECTOR_3);
            xpl.Vector3.loadZero(position, 0);
            xpl.Vector3.mulMatrix4x4v(
                position, 0,
                target.combined_matrix, 0,
                position, 0);
            xpl.XModelKinematicsUtils.applyInverseKinematicsLocation(
                node,
                position,
                num_max_iteration,
                num_max_chain,
                0.0001,
                slot);
        }
    };

    /**
     * 変形の複製を行います。
     *
     * @param {xpl.XModelNode} node - 処理対象のノード構造
     * @param {xpl.XModelNode} target - 複製対象のノード構造
     * @param {xpl.float32_t} rate - 複製率
     * @param {xpl.size_t} slot - 更新を行うスロット
     */
    xpl.XModelKinematicsUtils.applyCopyTransform = function (node, target, rate, slot) {
        // TODO: implementation.
    };

})(xpl);
