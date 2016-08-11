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
     * パラメータ用のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.XModelParameterUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * パラメータを指定の入力指定のスロットから出力指定のスロットに複製します。
     *
     * @param {xpl.XModelParameter} param 処理対象のパラメータ構造
     * @param {xpl.size_t} dest - 出力先のスロット
     * @param {xpl.size_t} src - 入力元のスロット
     */
    xpl.XModelParameterUtils.copy = function (param, dest, src) {
        if (param != null) {
            switch (param.structure_type) {
                case xpl.XModelStructure.TYPE_AXIS_ROTATE:
                // 軸回転
                case xpl.XModelStructure.TYPE_QUATERNION:
                // 四元数
                case xpl.XModelStructure.TYPE_SCALE:
                // 拡大
                case xpl.XModelStructure.TYPE_TRANSLATE:
                // 平行移動
                case xpl.XModelStructure.TYPE_MATRIX:
                    // 行列
                    xpl.ArrayUtils.copy(
                        param.values, param.size * src,
                        param.values, param.size * dest,
                        param.size);
                    break;
            }
        }
    };

    /**
     * 浮動小数点数パラメータ構造に対して、指定の2つのスロットを線形して指定のスロットに結果を書き出します。
     *
     * @param {xpl.XModelFloat32Array} param - 処理対象のパラメータ構造
     * @param {xpl.size_t} dest 出力先のスロット
     * @param {xpl.size_t} start 開始のスロット
     * @param {xpl.size_t} end 終了のスロット
     * @param {xpl.float32_t|xpl.float64_t} [rate=0.0] 補間係数
     */
    xpl.XModelParameter.blendFloatArray = function (param, dest, start, end, rate) {
        if (param != null) {
            for (let i = 0; i < param.size; ++i) {
                param.values[param.size * dest + i] =
                    param.values[param.size * start + i] * (1.0 - rate) +
                    param.values[param.size * end + i] * rate;
            }
        }
    };

    /**
     * 指定の2つのスロットを補間して指定のスロットに結果を書き出します。
     *
     * @param {xpl.XModelParameter} param - 処理対象のパラメータ構造
     * @param {xpl.size_t} dest - 出力先のスロット
     * @param {xpl.size_t} start - 開始のスロット
     * @param {xpl.size_t} end - 終了のスロット
     * @param {xpl.float32_t} [rate=0.0] - 補間係数
     */
    xpl.XModelParameterUtils.blend = function (param, dest, start, end, rate) {
        rate = xpl.defaultValue(rate, 0.0);

        if (param != null) {
            switch (param.structure_type) {
                case xpl.XModelStructure.TYPE_RGB: // RGB
                case xpl.XModelStructure.TYPE_RGBA: // RGBA
                    xpl.XModelParameterUtils.blendFloatArray(param, dest, start, end, rate);
                    break;

                case xpl.XModelStructure.TYPE_AXIS_ROTATE: // 軸回転
                    xpl.Vector3.slerpv(
                        param.values, param.size * dest,
                        param.values, param.size * start,
                        param.values, param.size * end,
                        rate);
                    param.values[param.size * dest + xpl.XModelAxisRotate.ANGLE] =
                        param.values[param.size * start + xpl.XModelAxisRotate.ANGLE] * (1.0 - rate) +
                        param.values[param.size * start + xpl.XModelAxisRotate.ANGLE] * rate;
                    break;

                case xpl.XModelStructure.TYPE_QUATERNION: // 四元数
                    xpl.Quaternion.slerpv(
                        param.values, param.size * dest,
                        param.values, param.size * start,
                        param.values, param.size * end,
                        rate);
                    break;

                case xpl.XModelStructure.TYPE_SCALE: // 拡大
                case xpl.XModelStructure.TYPE_TRANSLATE: // 平行移動
                    xpl.Vector3.lerpv(
                        param.values, param.size * dest,
                        param.values, param.size * start,
                        param.values, param.size * end,
                        rate);
                    break;

                case xpl.XModelStructure.TYPE_MATRIX: // 行列
                    xpl.Matrix4x4.slrepAxisAndLrepOtherv(
                        param.values, param.size * dest,
                        param.values, param.size * start,
                        param.values, param.size * end,
                        rate);
                    break;
            }
        }
    };

    /**
     * 指定のスロットのパラメータを変形行列に適用します。
     *
     * @param {xpl.XModelParameter} param - 処理対象のパラメータ構造
     * @param {xpl.float32_t[]} m - 適用対象の行列
     * @param {xpl.size_t} m_off - 適用対象の行列の配列オフセット
     * @param {xpl.size_t} [slot=0] - 適用するスロット
     */
    xpl.XModelParameterUtils.applyTransform = function (param, m, m_off, slot) {
        slot = xpl.defaultValue(slot, 0);

        if (param != null) {
            switch (param.structure_type) {
                case xpl.XModelStructure.TYPE_AXIS_ROTATE: // 軸回転
                {
                    let index = param.size * slot;
                    xpl.Matrix4x4.mulRotate(
                        m, m_off,
                        param.values[index + xpl.XModelAxisRotate.X],
                        param.values[index + xpl.XModelAxisRotate.Y],
                        param.values[index + xpl.XModelAxisRotate.Z],
                        param.values[index + xpl.XModelAxisRotate.ANGLE],
                        true);
                }
                    break;

                case xpl.XModelStructure.TYPE_QUATERNION: // 四元数
                    xpl.Matrix4x4.mulQuaternionv(m, m_off, param.values, param.size * slot);
                    break;

                case xpl.XModelStructure.TYPE_SCALE: // 拡大
                {
                    let index = param.size * slot;
                    xpl.Matrix4x4.mulScale(
                        m, m_off,
                        param.values[index + xpl.Geometry.VX],
                        param.values[index + xpl.Geometry.VY],
                        param.values[index + xpl.Geometry.VZ]);
                }
                    break;

                case xpl.XModelStructure.TYPE_TRANSLATE: // 平行移動
                {
                    let index = param.size * slot;
                    xpl.Matrix4x4.mulTranslate(
                        m, m_off,
                        param.values[index + xpl.Geometry.VX],
                        param.values[index + xpl.Geometry.VY],
                        param.values[index + xpl.Geometry.VZ],
                        true);
                }
                    break;

                case xpl.XModelStructure.TYPE_MATRIX: // 行列
                    xpl.Matrix4x4.mulv(m, m_off, m, m_off, param.values, param.size * slot);
                    break;
            }
        }
    };

})(xpl);
