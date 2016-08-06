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

    const VX = 0, VY = 1, VZ = 2;
    const CR = 0, CI = 1, CJ = 2, CK = 3;
    const M00 = 0, M01 = 4, M02 = 8, M03 = 12,
        M10 = 1, M11 = 5, M12 = 9, M13 = 13,
        M20 = 2, M21 = 6, M22 = 10, M23 = 14,
        M30 = 3, M31 = 7, M32 = 11, M33 = 15;

    /**
     * 3次元ベクトルのユーティリティクラスです。
     *
     * @constructor
     */
    xpl.Vector3 = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * 任意の数値をベクトルに読み込ませます。
     *
     * d = (x, y, z)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x - 入力元のベクトルのX要素
     * @param {number} y - 入力元のベクトルのY要素
     * @param {number} z - 入力元のベクトルのZ要素
     */
    xpl.Vector3.load = function (d, d_off, x, y, z) {
        d[d_off + VX] = x;
        d[d_off + VY] = y;
        d[d_off + VZ] = z;
    };

    /**
     * 任意の数値をベクトルに読み込ませます。
     *
     * d = (x, y, z)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v - 入力元のベクトル
     * @param {number} v_off - 入力元のベクトルの配列インデックス
     */
    xpl.Vector3.loadv = function (d, d_off, v, v_off) {
        xpl.Vector3.load(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ]);
    };

    /**
     * 全ての要素が0の値をベクトルに読み込ませます。
     *
     * d = (0, 0, 0)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     */
    xpl.Vector3.loadZero = function (d, d_off) {
        xpl.Vector3.load(d, d_off, 0, 0, 0);
    };

    /**
     * ベクトルの長さの2乗の値を算出します。
     *
     * d = |v|^2
     *
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     * @returns {number} ベクトルの長さの2乗の値
     */
    xpl.Vector3.lenSq = function (v, v_off) {
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];
        return x * x + y * y + z * z;
    };

    /**
     * ベクトルの長さを算出します。
     *
     * d = |v|
     *
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     * @returns {number} ベクトルの長さ
     */
    xpl.Vector3.len = function (v, v_off) {
        return Math.sqrt(xpl.Vector3.lenSq(v, v_off));
    };

    /**
     * ベクトルを正規化します。
     *
     * d = v / |v|
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     */
    xpl.Vector3.normalizev = function (d, d_off, v, v_off) {
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];
        let len = x * x + y * y + z * z;
        if (0 < len) {
            len = Math.sqrt(len);
            xpl.Vector3.load(d, d_off, x / len, y / len, z / len);
        } else {
            xpl.Vector3.loadZero(d, d_off);
        }
    };

    /**
     * 2つのベクトルを線形補間します。
     *
     * d = lerp(v1, v2; t)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x1 - 開始のベクトルのX要素
     * @param {number} y1 - 開始のベクトルのY要素
     * @param {number} z1 - 開始のベクトルのZ要素
     * @param {number} x2 - 終了のベクトルのX要素
     * @param {number} y2 - 終了のベクトルのY要素
     * @param {number} z2 - 終了のベクトルのZ要素
     * @param {number} t - 補間係数
     */
    xpl.Vector3.lerp = function (d, d_off, x1, y1, z1, x2, y2, z2, t) {
        let t1 = 1.0 - t;
        xpl.Vector3.load(d, d_off, x1 * t1 + x2 * t, y1 * t1 + y2 * t, z1 * t1 + z2 * t);
    };

    /**
     * 2つのベクトルを線形補間します。
     *
     * d = lerp(v1, v2; t)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v1 - 開始のベクトル
     * @param {number} v1_off - 開始のベクトルの配列インデックス
     * @param {number[]} v2 - 終了のベクトル
     * @param {number} v2_off - 終了のベクトルの配列インデックス
     * @param {number} t - 補間係数
     */
    xpl.Vector3.lerpv = function (d, d_off, v1, v1_off, v2, v2_off, t) {
        xpl.Vector3.lerp(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ],
            t);
    };

    /**
     * 2つのベクトルを球面線形補間します。
     *
     * d = slerp(v1, v2; t)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x1 - 開始のベクトルのX要素
     * @param {number} y1 - 開始のベクトルのY要素
     * @param {number} z1 - 開始のベクトルのZ要素
     * @param {number} x2 - 終了のベクトルのX要素
     * @param {number} y2 - 終了のベクトルのY要素
     * @param {number} z2 - 終了のベクトルのZ要素
     * @param {number} t - 補間係数
     */
    xpl.Vector3.slerp = function (d, d_off, x1, y1, z1, x2, y2, z2, t) {
        // 開始ベクトルを正規化
        let len1 = x1 * x1 + y1 * y1 + z1 * z1;
        if (0 < len1) {
            len1 = Math.sqrt(len1);
            x1 /= len1;
            y1 /= len1;
            z1 /= len1;
        }

        // 終了ベクトルを正規化
        let len2 = x2 * x2 + y2 * y2 + z2 * z2;
        if (0 < len2) {
            len2 = Math.sqrt(len2);
            x2 /= len2;
            y2 /= len2;
            z2 /= len2;
        }

        // 2つのベクトルのcos値を算出
        let cs = x1 * x2 + y1 * y2 + z1 * z2;

        if (1.0 <= cs) {
            // 2つのベクトルの向きが同じ場合
            let len = len1 * (1.0 - t) + len2 * t;
            xpl.Vector3.load(d, d_off, x1 * len, y1 * len, z1 * len);
        } else if (cs <= -1.0) {
            // 2つのベクトルの向きが真逆の場合
            let len = len1 * (1.0 - t) - len2 * t;
            xpl.Vector3.load(d, d_off, x1 * len, y1 * len, z1 * len);
        } else {
            // その他の場合

            // ベクトルの長さを線形補間
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let len = len1 * (1.0 - t) + len2 * t;

            // ベクトルの向きを球面線形補間
            // slerp(p0, p1; t) = (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(cs);
            let rad2 = rad1 * (1.0 - t);
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // 結果の書き出し
            xpl.Vector3.load(
                d, d_off,
                (x1 * sn1 + x2 * sn2) * len,
                (y1 * sn1 + y2 * sn2) * len,
                (z1 * sn1 + z2 * sn2) * len);
        }
    };

    /**
     * 2つのベクトルを球面線形補間します。
     *
     * d = slerp(v1, v2; t)
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v1 - 開始のベクトル
     * @param {number} v1_off - 開始のベクトルの配列インデックス
     * @param {number[]} v2 - 終了のベクトル
     * @param {number} v2_off - 終了のベクトルの配列インデックス
     * @param {number} t - 補間係数
     */
    xpl.Vector3.slerpv = function (d, d_off, v1, v1_off, v2, v2_off, t) {
        xpl.Vector3.slerp(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ],
            t);
    };

    /**
     * 内積を算出します。
     *
     * d = v1 ・ v2
     *
     * @param {number} x1 - 演算子の左側のベクトルのX要素
     * @param {number} y1 - 演算子の左側のベクトルのY要素
     * @param {number} z1 - 演算子の左側のベクトルのZ要素
     * @param {number} x2 - 演算子の右側のベクトルのX要素
     * @param {number} y2 - 演算子の右側のベクトルのY要素
     * @param {number} z2 - 演算子の右側のベクトルのZ要素
     * @returns {number} 内積値
     */
    xpl.Vector3.dot = function (x1, y1, z1, x2, y2, z2) {
        return x1 * x2 + y1 * y2 + z1 * z2;
    };

    /**
     * 内積を算出します。
     *
     * d = v1 ・ v2
     *
     * @param {number[]} v1 - 演算子の左側のベクトル
     * @param {number} v1_off - 演算子の左側のベクトルの配列インデックス
     * @param {number[]} v2 - 演算子の右側のベクトル
     * @param {number} v2_off - 演算子の右側のベクトルの配列インデックス
     * @returns {number} 内積値
     */
    xpl.Vector3.dotv = function (v1, v1_off, v2, v2_off) {
        return v1[v1_off + VX] * v2[v2_off + VX] +
            v1[v1_off + VY] * v2[v2_off + VY] +
            v1[v1_off + VZ] * v2[v2_off + VZ];
    };

    /**
     * 外積を算出します。
     *
     * d = v1 × v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x1 - 演算子の左側のベクトルのX要素
     * @param {number} y1 - 演算子の左側のベクトルのY要素
     * @param {number} z1 - 演算子の左側のベクトルのZ要素
     * @param {number} x2 - 演算子の右側のベクトルのX要素
     * @param {number} y2 - 演算子の右側のベクトルのY要素
     * @param {number} z2 - 演算子の右側のベクトルのZ要素
     */
    xpl.Vector3.cross = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        xpl.Vector3.load(d, d_off, y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
    };

    /**
     * 外積を算出します。
     *
     * d = v1 × v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v1 - 演算子の左側のベクトル
     * @param {number} v1_off - 演算子の左側のベクトルの配列インデックス
     * @param {number[]} v2 - 演算子の右側のベクトル
     * @param {number} v2_off - 演算子の右側のベクトルの配列インデックス
     */
    xpl.Vector3.crossv = function (d, d_off, v1, v1_off, v2, v2_off) {
        xpl.Vector3.cross(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * 2つのベクトルのcos値を算出します。
     *
     * d = (v1 / |v1|) ・ (v2 / |v2|)
     *
     * @param {number} x1 - 演算子の左側のベクトルのX要素
     * @param {number} y1 - 演算子の左側のベクトルのY要素
     * @param {number} z1 - 演算子の左側のベクトルのZ要素
     * @param {number} x2 - 演算子の右側のベクトルのX要素
     * @param {number} y2 - 演算子の右側のベクトルのY要素
     * @param {number} z2 - 演算子の右側のベクトルのZ要素
     * @returns {number} 2つのベクトル間のcos値
     */
    xpl.Vector3.cos = function (x1, y1, z1, x2, y2, z2) {
        // 開始ベクトルを正規化
        let len1 = x1 * x1 + y1 * y1 + z1 * z1;
        if (0 < len1) {
            len1 = Math.sqrt(len1);
            x1 /= len1;
            y1 /= len1;
            z1 /= len1;
        }

        // 終了ベクトルを正規化
        let len2 = x2 * x2 + y2 * y2 + z2 * z2;
        if (0 < len2) {
            len2 = Math.sqrt(len2);
            x2 /= len2;
            y2 /= len2;
            z2 /= len2;
        }

        // 2つのベクトルのcos値を算出
        return x1 * x2 + y1 * y2 + z1 * z2;
    };

    /**
     * 2つのベクトルのcos値を算出します。
     *
     * d = (v1 / |v1|) ・ (v2 / |v2|)
     *
     * @param {number[]} v1 - 演算子の左側のベクトル
     * @param {number} v1_off - 演算子の左側のベクトルの配列インデックス
     * @param {number[]} v2 - 演算子の右側のベクトル
     * @param {number} v2_off - 演算子の右側のベクトルの配列インデックス
     * @returns {number} 2つのベクトル間のcos値
     */
    xpl.Vector3.cosv = function (v1, v1_off, v2, v2_off) {
        return xpl.Vector3.cos(
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * ベクトルを反転させます。
     *
     * d = -v
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     */
    xpl.Vector3.reversev = function (d, d_off, v, v_off) {
        xpl.Vector3.load(d, d_off, -v[v_off + VX], -v[v_off + VY], -v[v_off + VZ]);
    };

    /**
     * ベクトルを加算します。
     *
     * d = v1 + v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x1 - 演算子の左側のベクトルのX要素
     * @param {number} y1 - 演算子の左側のベクトルのY要素
     * @param {number} z1 - 演算子の左側のベクトルのZ要素
     * @param {number} x2 - 演算子の右側のベクトルのX要素
     * @param {number} y2 - 演算子の右側のベクトルのY要素
     * @param {number} z2 - 演算子の右側のベクトルのZ要素
     */
    xpl.Vector3.add = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        xpl.Vector3.load(d, d_off, x1 + x2, y1 + y2, z1 + z2);
    };

    /**
     * ベクトルを加算します。
     *
     * d = v1 + v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v1 - 演算子の左側のベクトル
     * @param {number} v1_off - 演算子の左側のベクトルの配列インデックス
     * @param {number[]} v2 - 演算子の右側のベクトル
     * @param {number} v2_off - 演算子の右側のベクトルの配列インデックス
     */
    xpl.Vector3.addv = function (d, d_off, v1, v1_off, v2, v2_off) {
        xpl.Vector3.add(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * ベクトルの減算をします。
     *
     * d = v1 - v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x1 - 演算子の左側のベクトルのX要素
     * @param {number} y1 - 演算子の左側のベクトルのY要素
     * @param {number} z1 - 演算子の左側のベクトルのZ要素
     * @param {number} x2 - 演算子の右側のベクトルのX要素
     * @param {number} y2 - 演算子の右側のベクトルのY要素
     * @param {number} z2 - 演算子の右側のベクトルのZ要素
     */
    xpl.Vector3.sub = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        xpl.Vector3.load(d, d_off, x1 - x2, y1 - y2, z1 - z2);
    };

    /**
     * ベクトルの減算をします。
     *
     * d = v1 - v2
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v1 - 演算子の左側のベクトル
     * @param {number} v1_off - 演算子の左側のベクトルの配列インデックス
     * @param {number[]} v2 - 演算子の右側のベクトル
     * @param {number} v2_off - 演算子の右側のベクトルの配列インデックス
     */
    xpl.Vector3.subv = function (d, d_off, v1, v1_off, v2, v2_off) {
        xpl.Vector3.sub(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * ベクトルとスカラの掛け算をします。
     *
     * d = v * s
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number} x - 対象のベクトルのX要素
     * @param {number} y - 対象のベクトルのY要素
     * @param {number} z - 対象のベクトルのZ要素
     * @param {number} s - 対象のスカラ
     */
    xpl.Vector3.mul = function (d, d_off, x, y, z, s) {
        xpl.Vector3.load(d, d_off, x * s, y * s, z * s);
    };

    /**
     * ベクトルとスカラの掛け算をします。
     *
     * d = v * s
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     * @param {number} s - 対象のスカラ
     */
    xpl.Vector3.mulv = function (d, d_off, v, v_off, s) {
        xpl.Vector3.mul(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], s);
    };

    /**
     * ベクトルと四元数の掛け算をします。
     *                      _
     * d = q * (0; i * v) * q
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     */
    xpl.Vector3.mulQuaternionv = function (d, d_off, q, q_off, v, v_off) {
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];

        // q * (0 + xi + yj + zk)
        let rp1 = /*rp * 0*/ -(ip * x + jp * y + kp * z);
        let ip1 = rp * x /*+  ip * 0*/ + (jp * z - kp * y);
        let jp1 = rp * y /*+  jp * 0*/ + (kp * x - ip * z);
        let kp1 = rp * z /*+  kp * 0*/ + (ip * y - jp * x);

        //                          _
        // q * (0 + xi + yj + zk) * q
        // let rp2 =  rp1 * rp + (ip1 * ip +  jp1 * j1 + kp1 * kp);
        xpl.Vector3.load(
            d, d_off,
            -rp1 * ip + ip1 * rp - (jp1 * kp - kp1 * jp),
            -rp1 * jp + jp1 * rp - (kp1 * ip - ip1 * kp),
            -rp1 * kp + kp1 * rp - (ip1 * jp - jp1 * ip));
    };

    /**
     * ベクトルと行列の掛け算をします。
     *
     * 引数columnで列ベクトルか行ベクトルかを選択することができます。
     * 列ベクトルか行ベクトルかで引数a1, a2の意味合いが変わります。
     *
     * 列ベクトルを指定した場合:
     * d = m * v
     *
     * 行ベクトルを指定した場合:
     * d = v * m
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} a1 - 演算子の左側の数値
     * @param {number} a1_off - 演算子の左側の数値の配列インデックス
     * @param {number[]} a2 - 演算子の右側の数値
     * @param {number} a2_off - 演算子の右側の数値の配列インデックス
     * @param {boolean} [column=true] - 指定されている列ベクトルかどうか
     */
    xpl.Vector3.mulMatrix4x4v = function (d, d_off, a1, a1_off, a2, a2_off, column) {
        column = xpl.defaultValue(column, true);

        if (column) {
            // 列ベクトル場合
            let x = a2[a2_off + VX];
            let y = a2[a2_off + VY];
            let z = a2[a2_off + VZ];
            let w = a1[a1_off + M30] * x + a1[a1_off + M31] * y + a1[a1_off + M32] * z + a1[a1_off + M33];
            xpl.Vector3.load(
                d, d_off,
                (a1[a1_off + M00] * x + a1[a1_off + M01] * y + a1[a1_off + M02] * z + a1[a1_off + M03]) / w,
                (a1[a1_off + M10] * x + a1[a1_off + M11] * y + a1[a1_off + M12] * z + a1[a1_off + M13]) / w,
                (a1[a1_off + M20] * x + a1[a1_off + M21] * y + a1[a1_off + M22] * z + a1[a1_off + M23]) / w);
        } else {
            // 列ベクトルの場合
            let x = a1[a1_off + VX];
            let y = a1[a1_off + VY];
            let z = a1[a1_off + VZ];
            let w = x * a2[a2_off + M03] + y * a2[a2_off + M13] + z * a2[a2_off + M23] + a2[a2_off + M33];
            xpl.Vector3.load(
                d, d_off,
                (x * a2[a2_off + M00] + y * a2[a2_off + M10] + z * a2[a2_off + M20] + a2[a2_off + M30]) / w,
                (x * a2[a2_off + M01] + y * a2[a2_off + M11] + z * a2[a2_off + M21] + a2[a2_off + M31]) / w,
                (x * a2[a2_off + M02] + y * a2[a2_off + M12] + z * a2[a2_off + M22] + a2[a2_off + M32]) / w);
        }
    };

    /**
     * 回転ベクトルに限定してベクトルと行列の掛け算をします。
     *
     * 引数columnで列ベクトルか行ベクトルかを選択することができます。
     * 列ベクトルか行ベクトルかで引数a1, a2の意味合いが変わります。
     *
     * 列ベクトルを指定した場合:
     * d = m * v
     *
     * 行ベクトルを指定した場合:
     * d = v * m
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} a1 - 演算子の左側の数値
     * @param {number} a1_off - 演算子の左側の数値の配列インデックス
     * @param {number[]} a2 - 演算子の右側の数値
     * @param {number} a2_off - 演算子の右側の数値の配列インデックス
     * @param {boolean} [column=true] - 指定されている列ベクトルかどうか
     */
    xpl.Vector3.mulMatrix4x4Axisv = function (d, d_off, a1, a1_off, a2, a2_off, column) {
        column = xpl.defaultValue(column, true);

        if (column) {
            // 列ベクトルの場合
            let x = a2[a2_off + VX];
            let y = a2[a2_off + VY];
            let z = a2[a2_off + VZ];
            xpl.Vector3.load(
                d, d_off,
                a1[a1_off + M00] * x + a1[a1_off + M01] * y + a1[a1_off + M02] * z,
                a1[a1_off + M10] * x + a1[a1_off + M11] * y + a1[a1_off + M12] * z,
                a1[a1_off + M20] * x + a1[a1_off + M21] * y + a1[a1_off + M22] * z);
        } else {
            // 行ベクトルの場合
            let x = a1[a1_off + VX];
            let y = a1[a1_off + VY];
            let z = a1[a1_off + VZ];
            xpl.Vector3.load(
                d, d_off,
                x * a2[a2_off + M00] + y * a2[a2_off + M10] + z * a2[a2_off + M20],
                x * a2[a2_off + M01] + y * a2[a2_off + M11] + z * a2[a2_off + M21],
                x * a2[a2_off + M02] + y * a2[a2_off + M12] + z * a2[a2_off + M22]);
        }
    };

    /**
     * ベクトルとスカラの割り算をします。
     *
     * d = v / s
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} off - 出力先のベクトルの配列インデックス
     * @param {number} x - 対象のベクトルのX要素
     * @param {number} y - 対象のベクトルのY要素
     * @param {number} z - 対象のベクトルのZ要素
     * @param {number} s - 対象のスカラ
     */
    xpl.Vector3.div = function (d, off, x, y, z, s) {
        xpl.Vector3.load(d, off, x * s, y * s, z * s);
    };

    /**
     * ベクトルとスカラの割り算をします。
     *
     * d = v / s
     *
     * @param {number[]} d - 出力先のベクトル
     * @param {number} d_off - 出力先のベクトルの配列インデックス
     * @param {number[]} v - 対象のベクトル
     * @param {number} v_off - 対象のベクトルの配列インデックス
     * @param {number} s - 対象のスカラ
     */
    xpl.Vector3.divv = function (d, d_off, v, v_off, s) {
        xpl.Vector3.div(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], s);
    };

    /**
     * ベクトルの文字列表現を返します。
     *
     * @param {number[]} v - 対象のベクトル
     * @param {number} off - 対象のベクトルの配列オフセット
     * @returns {string} ベクトルから変換された文字列
     */
    xpl.Vector3.convertToString = function (v, off) {
        return "Vector3(" + v[off + VX] + ", " + v[off + VY] + ", " + v[off + VZ] + ")";
    };

})(xpl);
