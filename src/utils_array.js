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
     * 配列用のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.ArrayUtils = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * 比較用のチェック関数の定義です。
     *
     * @callback xpl.ArrayUtils~comparator
     * @param {Object} v1 - 演算子の左側の値
     * @param {Object} v2 - 演算子の右側の値
     * @returns {number} 比較の結果
     *              値が0の場合は等しく、
     *              0以上の正の値の場合は左側の値の方が大きく、
     *              0以下の負の数の場合は右側の値の方が大きくなります。
     */

    /**
     * 配列の要素をコピーします。
     *
     * @param {Array} src - 入力元の配列
     * @param {number} src_off - 入力元の配列オフセット
     * @param {Array} dest - The 出力先の配列
     * @param {number} dest_off - 出力先の配列オフセット
     * @param {number} len - コピーする要素の数
     */
    xpl.ArrayUtils.copy = function (src, src_off, dest, dest_off, len) {
        for (let i = 0; i < len; ++i) {
            dest[dest_off + i] = src[src_off + i];
        }
    };

    /**
     * 配列を指定の値で埋めます。
     *
     * @param {Array} ary - 配列
     * @param {number} from - 配列の開始インデックス
     * @param {number} to - 配列の開始インデックス
     * @param {number} value - 指定の値
     */
    xpl.ArrayUtils.fill = function (ary, from, to, value) {
        for (let i = from; i < to; ++i) {
            ary[i] = value;
        }
    };

    /**
     * ソート済みの配列から指定の要素を2分探索します。
     *
     * @param {Array} ary - 配列
     * @param {number} from - 配列の開始インデックス
     * @param {number} to - 配列の開始インデックス
     * @param {number} key - 指定の値
     * @param {xpl.ArrayUtils~comparator} [comp=null] - 比較関数
     *              nullの場合はJavaScriptの比較演算子が使用されます。
     * @returns {number} 指定の値が見つかった場合は、その要素の配列インデックス値を返し、
     *              見つからなかった場合は指定の要素以下の値を持つ最も近い要素の配列インデックスの負数のプラス1の値を返します。
     */
    xpl.ArrayUtils.binarySearch = function (ary, from, to, key, comp) {
        comp = xpl.defaultValue(comp, null);

        to--;
        while (from <= to) {
            let mid = (from + to) >> 1;
            let value = ary[mid];
            let c;
            if (comp != null) {
                c = comp(value, key);
            } else {
                c = value - key;
            }
            if (c < 0) {
                from = mid + 1;
            } else if (0 < c) {
                to = mid - 1;
            } else {
                return mid;
            }
        }
        return -(from + 1);
    };

    /**
     * 配列の要素の重複を取り除いた配列を返します。
     *
     * @param {Array} ary - 配列
     * @param {number} from - 配列の開始のインデックス
     * @param {number} to - 配列の終了のインデックス
     * @param {xpl.ArrayUtils~comparator} [comp=null] - 比較関数、nullの場合はJavaScriptの比較演算子が使用されます。
     * @returns {Array} 重複が取り除かれた新たな配列
     */
    xpl.ArrayUtils.convertToSet = function (ary, from, to, comp) {
        comp = xpl.defaultValue(comp, null);

        let dest = [];
        loop: for (let i = from; i < to; ++i) {
            let value = ary[i];
            for (let j = 0; j < dest.length; ++j) {
                if (comp != null ? comp(dest[j], value) : dest[j] == value) {
                    continue loop;
                }
            }
            dest.push(value);
        }
        return dest;
    };

    /**
     * 部分集合が指定の上位集合に内包されているかを調べます。
     *
     * super ⊆ sub
     *
     * @param {Array} superset - 上位集合
     * @param {number} super_from - 上位集合の配列の開始インデックス
     * @param {number} super_to - 上位集合の配列の終了インデックス
     * @param {Array} subset - 下位集合
     * @param {number} sub_from - 下位集合の配列の開始インデックス
     * @param {number} sub_to - 下位集合の配列の終了インデックス
     * @param {xpl.ArrayUtils~comparator} [comp=null] - 比較関数、nullの場合はJavaScriptの比較演算子が使用されます。
     * @returns {boolean} 内包されているかどうか
     */
    xpl.ArrayUtils.isContained = function (superset, super_from, super_to, subset, sub_from, sub_to, comp) {
        comp = xpl.defaultValue(comp, null);

        if (sub_to - sub_from <= super_to - super_from) {
            loop: for (let i = sub_from; i < sub_to; ++i) {
                let value = subset[i];
                for (let j = super_from; j < super_to; ++j) {
                    if (comp != null ? comp(superset[j], value) == 0 : superset[j] == value) {
                        continue loop;
                    }
                }
                return false;
            }
            return true;
        }
        return false;
    };

})(xpl);
