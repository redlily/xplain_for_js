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
     * アニメーション用のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.XModelAnimationUtils = function () {
        throw new Error("Unsupported operation");
    };

    // 2分探索
    var binarySearch = function (keys, from, to, time) {
        to--;
        while (from <= to) {
            var mid = (from + to) >> 1;
            var value = keys[mid].time;
            if (value < time) {
                from = mid + 1;
            } else if (value > time) {
                to = mid - 1;
            } else {
                return mid;
            }
        }
        return -(from + 1);
    };

    /**
     * 軸回転構造に対する補間を行います。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.XModelAnimationKey} start - 開始のキー
     * @param {xpl.XModelAnimationKey} end - 終了のキー
     * @param {xpl.float32_t} rate - 補間係数
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.interpolateRotate = function (anim, start, end, rate, slot) {
        if (anim != null) {
            let target = anim.target;
            let index = target.size * slot;
            if (anim.index == -1) {
                // 全体的な補間
                xpl.Vector3.slerpv(target.values, index, start.value, 0, end.value, 0, rate);
                target.values[index + xpl.XModelAxisRotate.ANGLE] =
                    start.value[xpl.XModelAxisRotate.ANGLE] * (1.0 - rate) +
                    end.value[xpl.XModelAxisRotate.ANGLE] * rate;
            } else {
                // 局所的な補間
                target.values[index + anim.index] = start.value[0] * (1.0 - rate) + end.value[0] * rate;
            }
        }
    };

    /**
     * 四元数構造に対する補間を行います。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.XModelAnimationKey} start - 開始のキー
     * @param {xpl.XModelAnimationKey} end - 終了のキー
     * @param {xpl.float32_t} rate - 補間係数
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.interpolateQuaternion = function (anim, start, end, rate, slot) {
        if (anim != null) {
            let target = anim.target;
            let index = target.size * slot;
            if (anim.index == -1) {
                // 全体的な補間
                xpl.Quaternion.slerpv(target.values, index, start.value, 0, end.value, 0, rate);
            } else {
                // 局所的な補間
                target.values[index + anim.index] = start.value[0] * (1.0 - rate) + end.value[0] * rate;
            }
        }
    };

    /**
     * 拡大構造に対する補間を行います。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.XModelAnimationKey} start - 開始のキー
     * @param {xpl.XModelAnimationKey} end - 終了のキー
     * @param {xpl.float32_t} rate - 補間係数
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.interpolateScale = function (anim, start, end, rate, slot) {
        if (anim != null) {
            let target = anim.target;
            let index = target.size * slot;
            if (anim.index == -1) {
                // 全体的な補間
                xpl.Vector3.lerpv(target.values, index, key0.value, 0, key1.value, 0, weight);
            } else {
                // 局所的な補間
                target.values[index + anim.index] = start.value[0] * (1.0 - rate) + end.value[0] * rate;
            }
        }
    };

    /**
     * 平行移動に対する補間を行います。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.XModelAnimationKey} start - 開始のキー
     * @param {xpl.XModelAnimationKey} end - 終了のキー
     * @param {xpl.float32_t} rate - 補間係数
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.interpolateTranslate = function (anim, start, end, rate, slot) {
        if (anim != null) {
            let target = anim.target;
            let index = target.size * slot;
            if (anim.index == -1) {
                // 全体的な補間
                xpl.Vector3.lerpv(target.values, index, start.value, 0, end.value, 0, weight);
            } else {
                // 局所的な補間
                target.values[index + anim.index] = start.value[0] * (1.0 - rate) + end.value[0] * rate;
            }
        }
    };

    /**
     * 行列に対する補間を行います。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.XModelAnimationKey} start - 開始のキー
     * @param {xpl.XModelAnimationKey} end - 終了のキー
     * @param {xpl.float32_t} rate - 補間係数
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.interpolateMatrix = function (anim, start, end, rate, slot) {
        if (anim != null) {
            let target = anim.target;
            let index = target.size * slot;
            if (anim.index == -1) {
                // 全体的な補間
                xpl.Matrix4x4.slrepAxisAndLrepOtherv(
                    target.values, index,
                    start.value, 0,
                    end.value, 0,
                    weight);
            } else {
                // 局所的な補間
                target.values[index + anim.index] = start.value[0] * (1.0 - rate) + end.value[0] * rate;
            }
        }
    };

    /**
     * 変形をアニメーションにより更新します。
     *
     * @param {xpl.XModelAnimation} anim - 処理対象のアニメーション構造
     * @param {xpl.float64_t} time - 任意の時間
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.XModelAnimationUtils.setAnimation = function (anim, time, slot) {
        if (anim != null) {
            if (0 < anim.num_keys) {
                // キーフレームの検索
                let start = anim.keys[0];
                let end = anim.keys[0];
                let rate = 0.0;
                if (1 < anim.num_keys) {
                    var index = binarySearch(anim.keys, 0, anim.num_keys, time);
                    if (0 <= index) {
                        start = anim.keys[index];
                        end = anim.keys[index];
                        rate = 0.0;
                    } else if (index != -1) {
                        index = -(index + 2);
                        if (index < anim.num_keys - 1) {
                            start = anim.keys[index + 0];
                            end = anim.keys[index + 1];
                            rate = (time - start.time) / (end.time - start.time);
                        } else {
                            start = anim.keys[index];
                            end = anim.keys[index];
                            rate = 0.0;
                        }
                    }
                }

                // キーフーレム間の補間
                switch (anim.target.structure_type) {
                    case xpl.XModelStructure.TYPE_AXIS_ROTATE: // 軸回転
                        xpl.interpolateRotate(anim, start, end, rate, slot);
                        break;

                    case xpl.XModelStructure.TYPE_QUATERNION: // 四元数
                        xpl.interpolateQuaternion(anim, start, end, rate, slot);
                        break;

                    case xpl.XModelStructure.TYPE_SCALE: // 拡大
                        xpl.interpolateScale(anim, start, end, rate, slot);
                        break;

                    case xpl.XModelStructure.TYPE_TRANSLATE: // 平行移動
                        xpl.interpolateTranslate(anim, start, end, rate, slot);
                        break;

                    case xpl.XModelStructure.TYPE_MATRIX: // 行列
                        xpl.interpolateMatrix(anim, start, end, rate, slot);
                        break;
                }
            }

            // 子のアニメーションの更新
            for (var i = 0; i < anim.num_children; ++i) {
                xpl.XModelAnimation.setAnimation(anim.children[i], time);
            }
        }
    };

    /**
     * 変形をアニメーションセットにより更新します。
     *
     * @memberof xpl.XModelAnimationUtils
     * @function setAnimationSet
     * @param {xpl.XModelAnimationSet?} anim_set - 処理対象のアニメーションセット
     * @param {xpl.float64_t} time - 任意の時間
     * @param {xpl.size_t} slot - 結果を書き出すスロット
     */
    xpl.XModelAnimationUtils.setAnimationSet = function (anim_set, time, slot) {
        if (anim_set != null) {
            for (var i = 0; i < anim_set.num_animations; ++i) {
                xpl.XModelAnimationUtils.setAnimation(anim_set.animations[i], time, 1);
            }
        }
    };

    /**
     * アニメーションのトータル時間を取得します。
     *
     * @param {xpl.XModelAnimation?} anim - 処理対象のアニメーション構造
     * @returns {xpl.float64_t} トータルの時間
     */
    xpl.XModelAnimationUtils.getAnimationTotalTime = function (anim) {
        var time = 0;
        if (anim != null) {
            for (var i = 0; i < anim.num_keys; ++i) {
                time = Math.max(anim.keys[anim.num_keys - 1].time, time);
            }
            for (var i = 0; i < anim.num_children; ++i) {
                time = Math.max(xpl.XModelAnimationUtils.getAnimationTotalTime(anim.children[i]), time);
            }
        }
        return time;
    };

    /**
     * アニメーションセットのトータル時間を取得します。
     *
     * @param {xpl.XModelAnimationSet?} anim_set - 処理対象のアニメーションセット構造
     * @returns {xpl.float64_t} トータルの時間
     */
    xpl.XModelAnimationUtils.getAnimationSetTotalTime = function (anim_set) {
        var time = 0;
        if (anim_set != null) {
            for (var i = 0; i < anim_set.num_animations; ++i) {
                time = Math.max(xpl.XModelAnimationUtils.getAnimationTotalTime(anim_set.animations[i]), time);
            }
        }
        return time;
    };

})(xpl);
