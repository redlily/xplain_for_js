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

    /**
     * Search the index of the key from time.
     *
     * @private
     * @memberof xpl.XModelAnimationUtils
     * @function search
     * @param {Float64Array} keys - The sorted time sequence.
     * @param {xpl.size_t} from - The Starting position in the sequence.
     * @param {xpl.size_t} to - The End position in the sequence.
     * @param {xpl.float64_t} time - The target time.
     * @returns {xpl.ptrdiff_t}
     *              found index to the element if return value is positive,
     *              target time following nearest negative index to the element nearest
     *              if return value is negative.
     */
    var search = function (keys, from, to, time) {
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
     * Interpolate the matrix transformation.
     *
     * @private
     * @memberof xpl.XModelAnimationUtils
     * @function interpolateMatrix
     * @param {xpl.XModelAnimation} anim - The animation structure.
     * @param {xpl.XModelAnimationKey} key0 - The first animation key structure.
     * @param {xpl.XModelAnimationKey} key1 - The second animation key structure.
     * @param {xpl.float32_t} weight - The interpolation weight must be set to between 0.0 and 1.0.
     */
    var interpolateMatrix = function (anim, key0, key1, weight) {
        var target = anim.target;
        if (weight <= 0) {
            if (anim.index == -1) {
                // assignment to the all elements.
                xpl.Matrix4x4.loadv(target.value, 0, key0.value, 0);
            } else {
                // assignment to a element.
                target.value[anim.index] = key0.value[0];
            }
        } else {
            if (anim.index == -1) {
                // interpolate to the all elements.
                xpl.Matrix4x4.slrepAxisAndLrepOtherv(
                    target.value, 0,
                    key0.value, 0,
                    key1.value, 0,
                    weight,
                    true);
            } else {
                // interpolate to a element.
                target.value[anim.index] = key0.value[0] * (1.0 - weight) + key1.value[0] * weight;
            }
        }
    };

    /**
     * Update the animation to transformation.
     *
     * @memberof xpl.XModelAnimationUtils
     * @function setAnimation
     * @param {xpl.XModelAnimation?} anim - The target animation structure.
     * @param {xpl.float64_t} time - The any time.
     */
    xpl.XModelAnimationUtils.setAnimation = function (anim, time) {
        if (anim != null) {
            if (0 < anim.num_keys) {
                // search a keys.
                let key0, key1, weight;




                if (anim.num_keys == 1) {
                    // キーフーレムの数が単数の場合
                    key0 = anim.keys[0];
                    key1 = anim.keys[0];
                    weight = 0;
                } else {
                    // キーフレームの数が複数の場合
                    var index = search(anim.keys, 0, anim.num_keys, time);
                    if (0 <= index) {
                        // キーフレームが見つかった場合
                        key0 = anim.keys[index];
                        key1 = anim.keys[index];
                        weight = 0;
                    } else if (index != -1) {
                        // キーフレームが見つからなかった場合
                        index = -(index + 2);
                        if (index < anim.num_keys - 1) {
                            key0 = anim.keys[index + 0];
                            key1 = anim.keys[index + 1];
                            weight = (time - key0.time) / (key1.time - key0.time);
                        } else {
                            key0 = anim.keys[index];
                            key1 = anim.keys[index];
                            weight = 0;
                        }
                    } else {
                        key0 = anim.keys[0];
                        key1 = anim.keys[0];
                        weight = 0;
                    }
                }

                switch (anim.target.structure_type) {
                    case xpl.XModelStructure.TYPE_AXIS_ROTATE: // 軸回転
                        xpl.interpolateRotate(anim, key0, key1, weight, 1);
                        break;

                    case xpl.XModelStructure.TYPE_QUATERNION: // 四元数
                        xpl.interpolateQuaternion(anim, key0, key1, weight, 1);
                        break;

                    case xpl.XModelStructure.TYPE_SCALE: // 拡大
                        xpl.interpolateScale(anim, key0, key1, weight, 1);
                        break;

                    case xpl.XModelStructure.TYPE_TRANSLATE: // 平行移動
                        xpl.interpolateTranslate(anim, key0, key1, weight, 1);
                        break;

                    case xpl.XModelStructure.TYPE_MATRIX: // 行列
                        xpl.interpolateMatrix(anim, key0, key1, weight, 1);
                        break;
                }
            }

            // update the animation children.
            for (var i = 0; i < anim.num_children; ++i) {
                xpl.XModelAnimation.setAnimation(anim.children[i], time);
            }
        }
    };

    /**
     * Update the animation set to transformation.
     *
     * @memberof xpl.XModelAnimationUtils
     * @function setAnimationSet
     * @param {xpl.XModelAnimationSet?} anim_set - The target animation structure.
     * @param {xpl.float64_t} time - The any value.
     */
    xpl.XModelAnimationUtils.setAnimationSet = function (anim_set, time) {
        if (anim_set != null) {
            for (var i = 0; i < anim_set.num_animations; ++i) {
                xpl.XModelAnimationUtils.setAnimation(anim_set.animations[i], time);
            }
        }
    };

    /**
     * Get the total time of the animation.
     *
     * @memberof xpl.XModelAnimationSet
     * @function getAnimationTotalTime
     * @param {xpl.XModelAnimation?} anim - The target animation structure.
     * @returns {xpl.float64_t} The total animation time.
     */
    xpl.XModelAnimationUtils.getAnimationTotalTime = function (anim) {
        var max = 0;
        if (anim != null) {
            // scane the maximum time to this animation.
            for (var i = 0; i < anim.num_keys; ++i) {
                var time = anim.keys[anim.num_keys - 1].time;
                if (max < time) {
                    max = time;
                }
            }

            // scan the maximum time that be chained to the this animation.
            for (var i = 0; i < anim.num_children; ++i) {
                var time = xpl.XModelAnimationUtils.getAnimationTotalTime(anim.children[i]);
                if (max < time) {
                    max = time;
                }
            }
        }
        return max;
    };

    /**
     * Get the total time of the animation set.
     *
     * @memberof xpl.XModelAnimationUtils
     * @function getAnimationSetTotalTime
     * @param {xpl.XModelAnimationSet?} anim_set - The target animation set structure.
     * @returns {xpl.float64_t} The total animation time.
     */
    xpl.XModelAnimationUtils.getAnimationSetTotalTime = function (anim_set) {
        var max = 0;
        if (anim_set != null) {
            for (var i = 0; i < anim_set.num_animations; ++i) {
                var time = xpl.XModelAnimationUtils.getAnimationTotalTime(anim_set.animations[i]);
                if (max < time) {
                    max = time;
                }
            }
        }
        return max;
    };

})(xpl);
