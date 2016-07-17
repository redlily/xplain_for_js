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

    /**
     * 変換構造用のユーティリティクラスです。
     *
     * @namespace xpl.XModelTransformUtils
     * @see xpl.XModelTransform
     * @see xpl.XModelAxisRotate
     * @see xpl.XModelQuaternion
     * @see xpl.XModelScale
     * @see xpl.XModelTranslate
     * @see xpl.XModelMatrix
     * @author Syuuhei Kuno
     */
    ns.XModelTransformUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * 変換を行列に適用します。
     *
     * @memberof xpl.XModelTransformUtils
     * @function applyTransform
     * @param {xpl.XModelTransform} transform - 処理対象の変換構造
     * @param {Float32Array} m - 出力先の行列
     * @param {xpl.size_t} m_off - 出力先の行列の配列インデックス
     * @param {xpl.size_t} [blend_rate=0.0] - 2つのスロットのブレンド率
     */
    ns.XModelTransformUtils.applyTransform = function (transform, m, m_off, blend_rate) {
        blend_rate = ns.defaultValue(blend_rate, 0.0);

        if (transform != null) {
            var value;
            var value_off;
            switch (transform.structure_type) {
                case ns.XModelStructure.TYPE_AXIS_ROTATE:
                    // 軸回転

                    // 合成
                    if (blend_rate <= 0.0) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_AXIS_ROTATE * 0;
                    } else if (1.0 <= blend_rate) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_AXIS_ROTATE * 1;
                    } else {
                        value = new Float32Array(ns.XModelStructure.SIZE_AXIS_ROTATE);
                        value_off = 0;
                        ns.Vector3.slerpv(
                            value, 0,
                            transform.value, ns.XModelStructure.SIZE_AXIS_ROTATE * 0,
                            transform.value, ns.XModelStructure.SIZE_AXIS_ROTATE * 1,
                            blend_rate);
                        ns.Vector3.normalizev(value, 0, value, 0);
                        value[ns.XModelAxisRotate.ANGLE] =
                            transform.value[ns.XModelStructure.SIZE_AXIS_ROTATE * 0 + ns.XModelAxisRotate.ANGLE] * (1.0 - blend_rate) +
                            transform.value[ns.XModelStructure.SIZE_AXIS_ROTATE * 1 + ns.XModelAxisRotate.ANGLE] * blend_rate;
                    }

                    // 変換
                    ns.Matrix4x4.mulRotate(
                        m, m_off,
                        value[value_off + ns.XModelAxisRotate.X],
                        value[value_off + ns.XModelAxisRotate.Y],
                        value[value_off + ns.XModelAxisRotate.Z],
                        value[value_off + ns.XModelAxisRotate.ANGLE],
                        true, true);
                    break;

                case ns.XModelStructure.TYPE_QUATERNION:
                    // 四元数

                    // 合成
                    if (blend_rate <= 0.0) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_QUATERNION * 0;
                    } else if (1.0 <= blend_rate) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_QUATERNION * 1;
                    } else {
                        value = new Float32Array(ns.XModelStructure.SIZE_QUATERNION);
                        value_off = 0;
                        ns.Quaternion.slerpv(
                            value, 0,
                            transform.value, ns.XModelStructure.SIZE_QUATERNION * 0,
                            transform.value, ns.XModelStructure.SIZE_QUATERNION * 1,
                            blend_rate);
                        ns.Quaternion.normalizev(value, 0, value, 0);
                    }

                    // 変換
                    ns.Matrix4x4.mulQuaternionv(m, m_off, value, value_off, true);
                    break;

                case ns.XModelStructure.TYPE_SCALE:
                    // 拡大

                    // 合成
                    if (blend_rate <= 0.0) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_SCALE * 0;
                    } else if (1.0 <= blend_rate) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_SCALE * 1;
                    } else {
                        value = new Float32Array(ns.XModelStructure.SIZE_SCALE);
                        value_off = 0;
                        ns.Vector3.lerpv(
                            value, 0,
                            transform.value, ns.XModelStructure.SIZE_SCALE * 0,
                            transform.value, ns.XModelStructure.SIZE_SCALE * 1,
                            blend_rate);
                    }

                    // 変換
                    ns.Matrix4x4.mulScale(
                        m, m_off,
                        value[value_off + ns.Geometry.VX],
                        value[value_off + ns.Geometry.VY],
                        value[value_off + ns.Geometry.VZ]);
                    break;

                case ns.XModelStructure.TYPE_TRANSLATE:
                    // 平行移動

                    // 合成
                    if (blend_rate <= 0.0) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_TRANSLATE * 0;
                    } else if (1.0 <= blend_rate) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_TRANSLATE * 1;
                    } else {
                        value = new Float32Array(ns.XModelStructure.SIZE_TRANSLATE);
                        value_off = 0;
                        ns.Vector3.lerpv(
                            value, 0,
                            transform.value, ns.XModelStructure.SIZE_TRANSLATE * 0,
                            transform.value, ns.XModelStructure.SIZE_TRANSLATE * 1,
                            blend_rate);
                    }

                    // 変換
                    ns.Matrix4x4.mulTranslate(
                        m, m_off,
                        value[value_off + ns.Geometry.VX],
                        value[value_off + ns.Geometry.VY],
                        value[value_off + ns.Geometry.VZ],
                        true);
                    break;

                case ns.XModelStructure.TYPE_MATRIX:
                    // 行列

                    // 合成
                    if (blend_rate <= 0.0) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_MATRIX * 0;
                    } else if (1.0 <= blend_rate) {
                        value = transform.value;
                        value_off = ns.XModelStructure.SIZE_MATRIX * 1;
                    } else {
                        value = new Float32Array(ns.XModelStructure.SIZE_MATRIX);
                        value_off = 0;
                        ns.Matrix4x4.slrepAxisAndLrepOtherv(
                            value, 0,
                            transform.value, ns.XModelStructure.SIZE_MATRIX * 0,
                            transform.value, ns.XModelStructure.SIZE_MATRIX * 1,
                            blend_rate,
                            true);
                    }

                    // 変換
                    ns.Matrix4x4.mulv(m, m_off, m, m_off, value, value_off);
                    break;
            }
        }
    };

    /**
     * 変換構造をリセットします。
     *
     * @memberof xpl.XModelTransformUtils
     * @function resetTransform
     * @param {xpl.XModelTransform} transform - 対象の変換構造
     * @param {xpl.enum_t} [slot=xpl.] - リセットするスロット番号
     */
    ns.XModelTransformUtils.resetTransform = function (transform, slot) {
        slot = ns.defaultValue(slot, 0);

        if (transform != null) {
            switch (transform.structure_type) {
                case ns.XModelStructure.TYPE_AXIS_ROTATE:
                    // 軸回転
                    ns.ArrayUtils.copy(
                        transform.initial, 0,
                        transform.value, ns.XModelStructure.SIZE_AXIS_ROTATE * slot,
                        ns.XModelStructure.SIZE_AXIS_ROTATE);
                    break;

                case ns.XModelStructure.TYPE_QUATERNION:
                    // 四元数
                    ns.ArrayUtils.copy(
                        transform.initial, 0,
                        transform.value, ns.XModelStructure.SIZE_QUATERNION * slot,
                        ns.XModelStructure.SIZE_QUATERNION);
                    break;

                case ns.XModelStructure.TYPE_SCALE:
                    // 拡大
                    ns.ArrayUtils.copy(
                        transform.initial, 0,
                        transform.value, ns.XModelStructure.SIZE_SCALE * slot,
                        ns.XModelStructure.SIZE_SCALE);
                    break;

                case ns.XModelStructure.TYPE_TRANSLATE:
                    // 平行移動
                    ns.ArrayUtils.copy(
                        transform.initial, 0,
                        transform.value, ns.XModelStructure.SIZE_TRANSLATE * slot,
                        ns.XModelStructure.SIZE_TRANSLATE);
                    break;

                case ns.XModelStructure.TYPE_MATRIX:
                    // 行列
                    ns.ArrayUtils.copy(
                        transform.initial, 0,
                        transform.value, ns.XModelStructure.SIZE_MATRIX * slot,
                        ns.XModelStructure.SIZE_MATRIX);
                    break;
            }
        }
    };

})(xpl);
