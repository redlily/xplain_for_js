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

    const M00 = 0, M01 = 4, M02 = 8, M03 = 12,
        M10 = 1, M11 = 5, M12 = 9, M13 = 13,
        M20 = 2, M21 = 6, M22 = 10, M23 = 14,
        M30 = 3, M31 = 7, M32 = 11, M33 = 15;

    /**
     * 4*4の行列のユーティリティクラスです。
     *
     * @namespace xpl.Matrix4x4
     */
    ns.Matrix4x4 = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * 任意の数値を行列に読み込ませます。
     *
     *     | a, b, c, d |
     * d = | e, f, g, h |
     *     | i, j, k, l |
     *     | m, n, o, p |
     *
     * @memberof xpl.Matrix4x4
     * @function load
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} m00 - 入力元の行列の0, 0の要素
     * @param {number} m01 - 入力元の行列の0, 0の要素
     * @param {number} m02 - 入力元の行列の0, 0の要素
     * @param {number} m03 - 入力元の行列の0, 0の要素
     * @param {number} m10 - 入力元の行列の1, 1の要素
     * @param {number} m11 - 入力元の行列の1, 1の要素
     * @param {number} m12 - 入力元の行列の1, 1の要素
     * @param {number} m13 - 入力元の行列の1, 1の要素
     * @param {number} m20 - 入力元の行列の2, 2の要素
     * @param {number} m21 - 入力元の行列の2, 2の要素
     * @param {number} m22 - 入力元の行列の2, 2の要素
     * @param {number} m23 - 入力元の行列の2, 2の要素
     * @param {number} m30 - 入力元の行列の3, 3の要素
     * @param {number} m31 - 入力元の行列の3, 3の要素
     * @param {number} m32 - 入力元の行列の3, 3の要素
     * @param {number} m33 - 入力元の行列の3, 3の要素
     * @param {boolean} [trans=false] - 行列の要素を転置するかどうか
     */
    ns.Matrix4x4.load = function (d, d_off,
                                  m00, m01, m02, m03,
                                  m10, m11, m12, m13,
                                  m20, m21, m22, m23,
                                  m30, m31, m32, m33,
                                  trans) {
        trans = ns.defaultValue(trans, false);

        if (trans) {
            d[d_off + M00] = m00;
            d[d_off + M01] = m10;
            d[d_off + M02] = m20;
            d[d_off + M03] = m30;
            d[d_off + M10] = m01;
            d[d_off + M11] = m11;
            d[d_off + M12] = m21;
            d[d_off + M13] = m31;
            d[d_off + M20] = m02;
            d[d_off + M21] = m12;
            d[d_off + M22] = m22;
            d[d_off + M23] = m32;
            d[d_off + M30] = m03;
            d[d_off + M31] = m13;
            d[d_off + M32] = m23;
            d[d_off + M33] = m33;
        } else {
            d[d_off + M00] = m00;
            d[d_off + M01] = m01;
            d[d_off + M02] = m02;
            d[d_off + M03] = m03;
            d[d_off + M10] = m10;
            d[d_off + M11] = m11;
            d[d_off + M12] = m12;
            d[d_off + M13] = m13;
            d[d_off + M20] = m20;
            d[d_off + M21] = m21;
            d[d_off + M22] = m22;
            d[d_off + M23] = m23;
            d[d_off + M30] = m30;
            d[d_off + M31] = m31;
            d[d_off + M32] = m32;
            d[d_off + M33] = m33;
        }
    };

    /**
     * 任意の数値を行列に読み込ませます。
     *
     *     | a, b, c, d |
     * d = | e, f, g, h |
     *     | i, j, k, l |
     *     | m, n, o, p |
     *
     * @memberof xpl.Matrix4x4
     * @function loadv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @param {boolean} [trans=false] - 行列の要素を転置するかどうか
     */
    ns.Matrix4x4.loadv = function (d, d_off, m, m_off, trans) {
        ns.Matrix4x4.load(
            d, d_off,
            m[m_off + M00], m[m_off + M01], m[m_off + M02], m[m_off + M03],
            m[m_off + M10], m[m_off + M11], m[m_off + M12], m[m_off + M13],
            m[m_off + M20], m[m_off + M21], m[m_off + M22], m[m_off + M23],
            m[m_off + M30], m[m_off + M31], m[m_off + M32], m[m_off + M33],
            trans);
    };

    /**
     * 全ての要素が0の値を行列に読み込ませます。
     *
     *     | 0, 0, 0, 0 |
     * d = | 0, 0, 0, 0 |
     *     | 0, 0, 0, 0 |
     *     | 0, 0, 0, 0 |
     *
     * @memberof xpl.Matrix4x4
     * @function loadZero
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     */
    ns.Matrix4x4.loadZero = function (d, d_off) {
        ns.Matrix4x4.load(
            d, d_off,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            false);
    };

    /**
     * 単位値を行列に読み込ませます。
     *
     *     | 1, 0, 0, 0 |
     * d = | 0, 1, 0, 0 |
     *     | 0, 0, 1, 0 |
     *     | 0, 0, 0, 1 |
     *
     * @memberof xpl.Matrix4x4
     * @function loadIdentity
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     */
    ns.Matrix4x4.loadIdentity = function (d, d_off) {
        ns.Matrix4x4.load(
            d, d_off,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
            false);
    };

    /**
     * 2つの行列を線形補間します。
     *
     * d = lrep(a, b; t)
     *
     * @memberof xpl.Matrix4x4
     * @function lrepv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} a - 開始の行列
     * @param {number} a_off - 開始の行列の配列インデックス
     * @param {Array.<number>} b - 終了の行列
     * @param {number} b_off - 終了の行列の配列インデックス
     * @param {number} t - 補完係数
     */
    ns.Matrix4x4.lrepv = function (d, d_off, a, a_off, b, b_off, t) {
        // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
        let t1 = 1.0 - t;
        ns.Matrix4x4.load(
            d, d_off,
            a[a_off + M00] * t1 + b[b_off + M00] * t,
            a[a_off + M01] * t1 + b[b_off + M01] * t,
            a[a_off + M02] * t1 + b[b_off + M02] * t,
            a[a_off + M03] * t1 + b[b_off + M03] * t,
            a[a_off + M10] * t1 + b[b_off + M10] * t,
            a[a_off + M11] * t1 + b[b_off + M11] * t,
            a[a_off + M12] * t1 + b[b_off + M12] * t,
            a[a_off + M13] * t1 + b[b_off + M13] * t,
            a[a_off + M20] * t1 + b[b_off + M20] * t,
            a[a_off + M21] * t1 + b[b_off + M21] * t,
            a[a_off + M22] * t1 + b[b_off + M22] * t,
            a[a_off + M23] * t1 + b[b_off + M23] * t,
            a[a_off + M30] * t1 + b[b_off + M30] * t,
            a[a_off + M31] * t1 + b[b_off + M31] * t,
            a[a_off + M32] * t1 + b[b_off + M32] * t,
            a[a_off + M33] * t1 + b[b_off + M33] * t,
            false);
    };

    /**
     * 行列を転置させます。
     *
     * d = m^t
     *
     * @memberof xpl.Matrix4x4
     * @function transposev
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     */
    ns.Matrix4x4.transposev = function (d, d_off, m, m_off) {
        let m00 = m[m_off + M00], m01 = m[m_off + M01], m02 = m[m_off + M02], m03 = m[m_off + M03];
        let m10 = m[m_off + M10], m11 = m[m_off + M11], m12 = m[m_off + M12], m13 = m[m_off + M13];
        let m20 = m[m_off + M20], m21 = m[m_off + M21], m22 = m[m_off + M22], m23 = m[m_off + M23];
        let m30 = m[m_off + M30], m31 = m[m_off + M31], m32 = m[m_off + M32], m33 = m[m_off + M33];
        d[d_off + M00] = m00;
        d[d_off + M01] = m10;
        d[d_off + M02] = m20;
        d[d_off + M03] = m30;
        d[d_off + M10] = m01;
        d[d_off + M11] = m11;
        d[d_off + M12] = m21;
        d[d_off + M13] = m31;
        d[d_off + M20] = m02;
        d[d_off + M21] = m12;
        d[d_off + M22] = m22;
        d[d_off + M23] = m32;
        d[d_off + M30] = m03;
        d[d_off + M31] = m13;
        d[d_off + M32] = m23;
        d[d_off + M33] = m33;
    };

    /**
     * 行列式を算出します。
     *
     * d = |m|
     *
     * @memberof xpl.Matrix4x4
     * @function determinant
     * @param {Array.<number>} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @returns {number} 行列式
     */
    ns.Matrix4x4.determinant = function (m, m_off) {
        let m10 = m[m_off + M10], m11 = m[m_off + M11], m12 = m[m_off + M12], m13 = m[m_off + M13];
        let m20 = m[m_off + M20], m21 = m[m_off + M21], m22 = m[m_off + M22], m23 = m[m_off + M23];
        let m30 = m[m_off + M30], m31 = m[m_off + M31], m32 = m[m_off + M32], m33 = m[m_off + M33];
        return m[m_off + M00] * (m11 * (m22 * m33 - m23 * m32) + m12 * (m23 * m31 - m21 * m33) + m13 * (m21 * m32 - m22 * m31)) +
            m[m_off + M01] * (m10 * (m23 * m32 - m22 * m33) + m12 * (m20 * m33 - m23 * m30) + m13 * (m22 * m30 - m20 * m32)) +
            m[m_off + M02] * (m10 * (m21 * m33 - m23 * m31) + m11 * (m23 * m30 - m20 * m33) + m13 * (m20 * m31 - m21 * m30)) +
            m[m_off + M03] * (m10 * (m22 * m31 - m21 * m32) + m11 * (m20 * m32 - m22 * m30) + m12 * (m21 * m30 - m20 * m31));
    };

    /**
     * 逆行列を算出します。
     *
     * d = m^-1
     *
     * @memberof xpl.Matrix4x4
     * @function inversev
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     */
    ns.Matrix4x4.inversev = function (d, d_off, m, m_off) {
        let m00 = m[m_off + M00], m01 = m[m_off + M01], m02 = m[m_off + M02], m03 = m[m_off + M03];
        let m10 = m[m_off + M10], m11 = m[m_off + M11], m12 = m[m_off + M12], m13 = m[m_off + M13];
        let m20 = m[m_off + M20], m21 = m[m_off + M21], m22 = m[m_off + M22], m23 = m[m_off + M23];
        let m30 = m[m_off + M30], m31 = m[m_off + M31], m32 = m[m_off + M32], m33 = m[m_off + M33];

        // 共通項を算出
        let m10_m21 = m10 * m21, m10_m22 = m10 * m22, m10_m23 = m10 * m23, m10_m31 = m10 * m31, m10_m32 = m10 * m32, m10_m33 = m10 * m33;
        let m11_m20 = m11 * m20, m11_m22 = m11 * m22, m11_m23 = m11 * m23, m11_m30 = m11 * m30, m11_m32 = m11 * m32, m11_m33 = m11 * m33;
        let m12_m20 = m12 * m20, m12_m21 = m12 * m21, m12_m23 = m12 * m23, m12_m30 = m12 * m30, m12_m31 = m12 * m31, m12_m33 = m12 * m33;
        let m13_m20 = m13 * m20, m13_m21 = m13 * m21, m13_m22 = m13 * m22, m13_m30 = m13 * m30, m13_m31 = m13 * m31, m13_m32 = m13 * m32;
        let m20_m31 = m20 * m31, m20_m32 = m20 * m32, m20_m33 = m20 * m33;
        let m21_m30 = m21 * m30, m21_m32 = m21 * m32, m21_m33 = m21 * m33;
        let m22_m30 = m22 * m30, m22_m31 = m22 * m31, m22_m33 = m22 * m33;
        let m23_m30 = m23 * m30, m23_m31 = m23 * m31, m23_m32 = m23 * m32;

        // 行列式を算出
        let det00 = m11 * (m22_m33 - m23_m32) + m12 * (m23_m31 - m21_m33) + m13 * (m21_m32 - m22_m31);
        let det01 = m10 * (m23_m32 - m22_m33) + m12 * (m20_m33 - m23_m30) + m13 * (m22_m30 - m20_m32);
        let det02 = m10 * (m21_m33 - m23_m31) + m11 * (m23_m30 - m20_m33) + m13 * (m20_m31 - m21_m30);
        let det03 = m10 * (m22_m31 - m21_m32) + m11 * (m20_m32 - m22_m30) + m12 * (m21_m30 - m20_m31);
        let det = m00 * det00 + m01 * det01 + m02 * det02 + m03 * det03;

        // 逆行列を算出して、結果の書き出し
        ns.Matrix4x4.load(
            d, d_off,
            det00 / det,
            (m01 * (m23_m32 - m22_m33) + m02 * (m21_m33 - m23_m31) + m03 * (m22_m31 - m21_m32)) / det,
            (m01 * (m12_m33 - m13_m32) + m02 * (m13_m31 - m11_m33) + m03 * (m11_m32 - m12_m31)) / det,
            (m01 * (m13_m22 - m12_m23) + m02 * (m11_m23 - m13_m21) + m03 * (m12_m21 - m11_m22)) / det,
            det01 / det,
            (m00 * (m22_m33 - m23_m32) + m02 * (m23_m30 - m20_m33) + m03 * (m20_m32 - m22_m30)) / det,
            (m00 * (m13_m32 - m12_m33) + m02 * (m10_m33 - m13_m30) + m03 * (m12_m30 - m10_m32)) / det,
            (m00 * (m12_m23 - m13_m22) + m02 * (m13_m20 - m10_m23) + m03 * (m10_m22 - m12_m20)) / det,
            det02 / det,
            (m00 * (m23_m31 - m21_m33) + m01 * (m20_m33 - m23_m30) + m03 * (m21_m30 - m20_m31)) / det,
            (m00 * (m11_m33 - m13_m31) + m01 * (m13_m30 - m10_m33) + m03 * (m10_m31 - m11_m30)) / det,
            (m00 * (m13_m21 - m11_m23) + m01 * (m10_m23 - m13_m20) + m03 * (m11_m20 - m10_m21)) / det,
            det03 / det,
            (m00 * (m21_m32 - m22_m31) + m01 * (m22_m30 - m20_m32) + m02 * (m20_m31 - m21_m30)) / det,
            (m00 * (m12_m31 - m11_m32) + m01 * (m10_m32 - m12_m30) + m02 * (m11_m30 - m10_m31)) / det,
            (m00 * (m11_m22 - m12_m21) + m01 * (m12_m20 - m10_m22) + m02 * (m10_m21 - m11_m20)) / det,
            false);
    };

    /**
     * 行列を加算します。
     *
     * d = a + b
     *
     * @memberof xpl.Matrix4x4
     * @function add
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} a00 - 演算子の左側の行列の0, 0の要素
     * @param {number} a01 - 演算子の左側の行列の0, 1の要素
     * @param {number} a02 - 演算子の左側の行列の0, 2の要素
     * @param {number} a03 - 演算子の左側の行列の0, 3の要素
     * @param {number} a10 - 演算子の左側の行列の1, 0の要素
     * @param {number} a11 - 演算子の左側の行列の1, 1の要素
     * @param {number} a12 - 演算子の左側の行列の1, 2の要素
     * @param {number} a13 - 演算子の左側の行列の1, 3の要素
     * @param {number} a20 - 演算子の左側の行列の2, 0の要素
     * @param {number} a21 - 演算子の左側の行列の2, 1の要素
     * @param {number} a22 - 演算子の左側の行列の2, 2の要素
     * @param {number} a23 - 演算子の左側の行列の2, 3の要素
     * @param {number} a30 - 演算子の左側の行列の3, 0の要素
     * @param {number} a31 - 演算子の左側の行列の3, 1の要素
     * @param {number} a32 - 演算子の左側の行列の3, 2の要素
     * @param {number} a33 - 演算子の左側の行列の3, 3の要素
     * @param {number} b00 - 演算子の右側の行列の0, 0の要素
     * @param {number} b01 - 演算子の右側の行列の0, 1の要素
     * @param {number} b02 - 演算子の右側の行列の0, 2の要素
     * @param {number} b03 - 演算子の右側の行列の0, 3の要素
     * @param {number} b10 - 演算子の右側の行列の1, 0の要素
     * @param {number} b11 - 演算子の右側の行列の1, 1の要素
     * @param {number} b12 - 演算子の右側の行列の1, 2の要素
     * @param {number} b13 - 演算子の右側の行列の1, 3の要素
     * @param {number} b20 - 演算子の右側の行列の2, 0の要素
     * @param {number} b21 - 演算子の右側の行列の2, 1の要素
     * @param {number} b22 - 演算子の右側の行列の2, 2の要素
     * @param {number} b23 - 演算子の右側の行列の2, 3の要素
     * @param {number} b30 - 演算子の右側の行列の3, 0の要素
     * @param {number} b31 - 演算子の右側の行列の3, 1の要素
     * @param {number} b32 - 演算子の右側の行列の3, 2の要素
     * @param {number} b33 - 演算子の右側の行列の3, 3の要素
     */
    ns.Matrix4x4.add = function (d, d_off,
                                 a00, a01, a02, a03,
                                 a10, a11, a12, a13,
                                 a20, a21, a22, a23,
                                 a30, a31, a32, a33,
                                 b00, b01, b02, b03,
                                 b10, b11, b12, b13,
                                 b20, b21, b22, b23,
                                 b30, b31, b32, b33) {
        ns.Matrix4x4.load(
            d, d_off,
            a00 + b00, a01 + b01, a02 + b02, a03 + b03,
            a10 + b10, a11 + b11, a12 + b12, a13 + b13,
            a20 + b20, a21 + b21, a22 + b22, a23 + b23,
            a30 + b30, a31 + b31, a32 + b32, a33 + b33,
            false);
    };

    /**
     * 行列を加算します。
     *
     * d = a + b
     *
     * @memberof xpl.Matrix4x4
     * @function addv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} a - 演算子の左側の行列
     * @param {number} a_off - 演算子の左側の行列の配列インデックス
     * @param {Array.<number>} b - 演算子の右側の行列
     * @param {number} b_off - 演算子の左側の行列の配列インデックス
     */
    ns.Matrix4x4.addv = function (d, d_off, a, a_off, b, b_off) {
        ns.Matrix4x4.add(
            d, d_off,
            a[a_off + M00], a[a_off + M01], a[a_off + M02], a[a_off + M03],
            a[a_off + M10], a[a_off + M11], a[a_off + M12], a[a_off + M13],
            a[a_off + M20], a[a_off + M21], a[a_off + M22], a[a_off + M23],
            a[a_off + M30], a[a_off + M31], a[a_off + M32], a[a_off + M33],
            b[b_off + M00], b[b_off + M01], b[b_off + M02], b[b_off + M03],
            b[b_off + M10], b[b_off + M11], b[b_off + M12], b[b_off + M13],
            b[b_off + M20], b[b_off + M21], b[b_off + M22], b[b_off + M23],
            b[b_off + M30], b[b_off + M31], b[b_off + M32], b[b_off + M33]);
    };

    /**
     * 行列を減算します。
     *
     * d = a - b
     *
     * @memberof xpl.Matrix4x4
     * @function sub
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} a00 - 演算子の左側の行列の0, 0の要素
     * @param {number} a01 - 演算子の左側の行列の0, 1の要素
     * @param {number} a02 - 演算子の左側の行列の0, 2の要素
     * @param {number} a03 - 演算子の左側の行列の0, 3の要素
     * @param {number} a10 - 演算子の左側の行列の1, 0の要素
     * @param {number} a11 - 演算子の左側の行列の1, 1の要素
     * @param {number} a12 - 演算子の左側の行列の1, 2の要素
     * @param {number} a13 - 演算子の左側の行列の1, 3の要素
     * @param {number} a20 - 演算子の左側の行列の2, 0の要素
     * @param {number} a21 - 演算子の左側の行列の2, 1の要素
     * @param {number} a22 - 演算子の左側の行列の2, 2の要素
     * @param {number} a23 - 演算子の左側の行列の2, 3の要素
     * @param {number} a30 - 演算子の左側の行列の3, 0の要素
     * @param {number} a31 - 演算子の左側の行列の3, 1の要素
     * @param {number} a32 - 演算子の左側の行列の3, 2の要素
     * @param {number} a33 - 演算子の左側の行列の3, 3の要素
     * @param {number} b00 - 演算子の右側の行列の0, 0の要素
     * @param {number} b01 - 演算子の右側の行列の0, 1の要素
     * @param {number} b02 - 演算子の右側の行列の0, 2の要素
     * @param {number} b03 - 演算子の右側の行列の0, 3の要素
     * @param {number} b10 - 演算子の右側の行列の1, 0の要素
     * @param {number} b11 - 演算子の右側の行列の1, 1の要素
     * @param {number} b12 - 演算子の右側の行列の1, 2の要素
     * @param {number} b13 - 演算子の右側の行列の1, 3の要素
     * @param {number} b20 - 演算子の右側の行列の2, 0の要素
     * @param {number} b21 - 演算子の右側の行列の2, 1の要素
     * @param {number} b22 - 演算子の右側の行列の2, 2の要素
     * @param {number} b23 - 演算子の右側の行列の2, 3の要素
     * @param {number} b30 - 演算子の右側の行列の3, 0の要素
     * @param {number} b31 - 演算子の右側の行列の3, 1の要素
     * @param {number} b32 - 演算子の右側の行列の3, 2の要素
     * @param {number} b33 - 演算子の右側の行列の3, 3の要素
     */
    ns.Matrix4x4.sub = function (d, d_off,
                                 a00, a01, a02, a03,
                                 a10, a11, a12, a13,
                                 a20, a21, a22, a23,
                                 a30, a31, a32, a33,
                                 b00, b01, b02, b03,
                                 b10, b11, b12, b13,
                                 b20, b21, b22, b23,
                                 b30, b31, b32, b33) {
        ns.Matrix4x4.load(
            d, d_off,
            a00 - b00, a01 - b01, a02 - b02, a03 - b03,
            a10 - b10, a11 - b11, a12 - b12, a13 - b13,
            a20 - b20, a21 - b21, a22 - b22, a23 - b23,
            a30 - b30, a31 - b31, a32 - b32, a33 - b33,
            false);
    };

    /**
     * 行列を減算します。
     *
     * d = a - b
     *
     * @memberof xpl.Matrix4x4
     * @function subv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} a - 演算子の左側の行列
     * @param {number} a_off - 演算子の左側の行列の配列インデックス
     * @param {Array.<number>} b - 演算子の右側の行列
     * @param {number} b_off - 演算子の左側の行列の配列インデックス
     */
    ns.Matrix4x4.subv = function (d, d_off, a, a_off, b, b_off) {
        ns.Matrix4x4.sub(
            d, d_off,
            a[a_off + M00], a[a_off + M01], a[a_off + M02], a[a_off + M03],
            a[a_off + M10], a[a_off + M11], a[a_off + M12], a[a_off + M13],
            a[a_off + M20], a[a_off + M21], a[a_off + M22], a[a_off + M23],
            a[a_off + M30], a[a_off + M31], a[a_off + M32], a[a_off + M33],
            b[b_off + M00], b[b_off + M01], b[b_off + M02], b[b_off + M03],
            b[b_off + M10], b[b_off + M11], b[b_off + M12], b[b_off + M13],
            b[b_off + M20], b[b_off + M21], b[b_off + M22], b[b_off + M23],
            b[b_off + M30], b[b_off + M31], b[b_off + M32], b[b_off + M33]);
    };

    /**
     * 行列の掛け算をします。
     *
     * d = a * b
     *
     * @memberof xpl.Matrix4x4
     * @function mul
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} a00 - 演算子の左側の行列の0, 0の要素
     * @param {number} a01 - 演算子の左側の行列の0, 1の要素
     * @param {number} a02 - 演算子の左側の行列の0, 2の要素
     * @param {number} a03 - 演算子の左側の行列の0, 3の要素
     * @param {number} a10 - 演算子の左側の行列の1, 0の要素
     * @param {number} a11 - 演算子の左側の行列の1, 1の要素
     * @param {number} a12 - 演算子の左側の行列の1, 2の要素
     * @param {number} a13 - 演算子の左側の行列の1, 3の要素
     * @param {number} a20 - 演算子の左側の行列の2, 0の要素
     * @param {number} a21 - 演算子の左側の行列の2, 1の要素
     * @param {number} a22 - 演算子の左側の行列の2, 2の要素
     * @param {number} a23 - 演算子の左側の行列の2, 3の要素
     * @param {number} a30 - 演算子の左側の行列の3, 0の要素
     * @param {number} a31 - 演算子の左側の行列の3, 1の要素
     * @param {number} a32 - 演算子の左側の行列の3, 2の要素
     * @param {number} a33 - 演算子の左側の行列の3, 3の要素
     * @param {number} b00 - 演算子の右側の行列の0, 0の要素
     * @param {number} b01 - 演算子の右側の行列の0, 1の要素
     * @param {number} b02 - 演算子の右側の行列の0, 2の要素
     * @param {number} b03 - 演算子の右側の行列の0, 3の要素
     * @param {number} b10 - 演算子の右側の行列の1, 0の要素
     * @param {number} b11 - 演算子の右側の行列の1, 1の要素
     * @param {number} b12 - 演算子の右側の行列の1, 2の要素
     * @param {number} b13 - 演算子の右側の行列の1, 3の要素
     * @param {number} b20 - 演算子の右側の行列の2, 0の要素
     * @param {number} b21 - 演算子の右側の行列の2, 1の要素
     * @param {number} b22 - 演算子の右側の行列の2, 2の要素
     * @param {number} b23 - 演算子の右側の行列の2, 3の要素
     * @param {number} b30 - 演算子の右側の行列の3, 0の要素
     * @param {number} b31 - 演算子の右側の行列の3, 1の要素
     * @param {number} b32 - 演算子の右側の行列の3, 2の要素
     * @param {number} b33 - 演算子の右側の行列の3, 3の要素
     */
    ns.Matrix4x4.mul = function (d, d_off,
                                 a00, a01, a02, a03,
                                 a10, a11, a12, a13,
                                 a20, a21, a22, a23,
                                 a30, a31, a32, a33,
                                 b00, b01, b02, b03,
                                 b10, b11, b12, b13,
                                 b20, b21, b22, b23,
                                 b30, b31, b32, b33) {
        ns.Matrix4x4.load(
            d, d_off,
            a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
            a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
            a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
            a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
            a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
            a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
            a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
            a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
            a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
            a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
            a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
            a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
            a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
            a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
            a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
            a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
            false);
    };

    /**
     * 行列の掛け算をします。
     *
     * d = a * b
     *
     * @memberof xpl.Matrix4x4
     * @function mulv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} a - 演算子の左側の行列
     * @param {number} a_off - 演算子の左側の行列の配列インデックス
     * @param {Array.<number>} b - 演算子の右側の行列
     * @param {number} b_off - 演算子の左側の行列の配列インデックス
     */
    ns.Matrix4x4.mulv = function (d, d_off, a, a_off, b, b_off) {
        ns.Matrix4x4.mul(
            d, d_off,
            a[a_off + M00], a[a_off + M01], a[a_off + M02], a[a_off + M03],
            a[a_off + M10], a[a_off + M11], a[a_off + M12], a[a_off + M13],
            a[a_off + M20], a[a_off + M21], a[a_off + M22], a[a_off + M23],
            a[a_off + M30], a[a_off + M31], a[a_off + M32], a[a_off + M33],
            b[b_off + M00], b[b_off + M01], b[b_off + M02], b[b_off + M03],
            b[b_off + M10], b[b_off + M11], b[b_off + M12], b[b_off + M13],
            b[b_off + M20], b[b_off + M21], b[b_off + M22], b[b_off + M23],
            b[b_off + M30], b[b_off + M31], b[b_off + M32], b[b_off + M33]);
    };

    /**
     * 行列とスカラの掛け算をします。
     *
     * d = m * s
     *
     * @memberof xpl.Matrix4x4
     * @function mulScalar
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} m00 - 対象の行列の0, 0の要素
     * @param {number} m01 - 対象の行列の0, 1の要素
     * @param {number} m02 - 対象の行列の0, 2の要素
     * @param {number} m03 - 対象の行列の0, 3の要素
     * @param {number} m10 - 対象の行列の1, 0の要素
     * @param {number} m11 - 対象の行列の1, 1の要素
     * @param {number} m12 - 対象の行列の1, 2の要素
     * @param {number} m13 - 対象の行列の1, 3の要素
     * @param {number} m20 - 対象の行列の2, 0の要素
     * @param {number} m21 - 対象の行列の2, 1の要素
     * @param {number} m22 - 対象の行列の2, 2の要素
     * @param {number} m23 - 対象の行列の2, 3の要素
     * @param {number} m30 - 対象の行列の3, 0の要素
     * @param {number} m31 - 対象の行列の3, 1の要素
     * @param {number} m32 - 対象の行列の3, 2の要素
     * @param {number} m33 - 対象の行列の3, 3の要素
     * @param {number} s - 対象のスカラ
     */
    ns.Matrix4x4.mulScalar = function (d, d_off,
                                       m00, m01, m02, m03,
                                       m10, m11, m12, m13,
                                       m20, m21, m22, m23,
                                       m30, m31, m32, m33,
                                       s) {
        ns.Matrix4x4.load(
            d, d_off,
            m00 * s, m01 * s, m02 * s, m03 * s,
            m10 * s, m11 * s, m12 * s, m13 * s,
            m20 * s, m21 * s, m22 * s, m23 * s,
            m30 * s, m31 * s, m32 * s, m33 * s,
            false);
    };

    /**
     * 行列とスカラの掛け算をします。
     *
     * d = m * s
     *
     * @memberof xpl.Matrix4x4
     * @function mulScalarv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} s - 対象のスカラ
     */
    ns.Matrix4x4.mulScalarv = function (d, d_off, m, m_off, s) {
        ns.Matrix4x4.mulScalar(
            d, d_off,
            m[m_off + M00], m[m_off + M01], m[m_off + M02], m[m_off + M03],
            m[m_off + M10], m[m_off + M11], m[m_off + M12], m[m_off + M13],
            m[m_off + M20], m[m_off + M21], m[m_off + M22], m[m_off + M23],
            m[m_off + M30], m[m_off + M31], m[m_off + M32], m[m_off + M33],
            s);
    };

    /**
     * 行列の割り算をします。
     *
     * d = a / b
     *
     * @memberof xpl.Matrix4x4
     * @function div
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} a00 - 演算子の左側の行列の0, 0の要素
     * @param {number} a01 - 演算子の左側の行列の0, 1の要素
     * @param {number} a02 - 演算子の左側の行列の0, 2の要素
     * @param {number} a03 - 演算子の左側の行列の0, 3の要素
     * @param {number} a10 - 演算子の左側の行列の1, 0の要素
     * @param {number} a11 - 演算子の左側の行列の1, 1の要素
     * @param {number} a12 - 演算子の左側の行列の1, 2の要素
     * @param {number} a13 - 演算子の左側の行列の1, 3の要素
     * @param {number} a20 - 演算子の左側の行列の2, 0の要素
     * @param {number} a21 - 演算子の左側の行列の2, 1の要素
     * @param {number} a22 - 演算子の左側の行列の2, 2の要素
     * @param {number} a23 - 演算子の左側の行列の2, 3の要素
     * @param {number} a30 - 演算子の左側の行列の3, 0の要素
     * @param {number} a31 - 演算子の左側の行列の3, 1の要素
     * @param {number} a32 - 演算子の左側の行列の3, 2の要素
     * @param {number} a33 - 演算子の左側の行列の3, 3の要素
     * @param {number} b00 - 演算子の右側の行列の0, 0の要素
     * @param {number} b01 - 演算子の右側の行列の0, 1の要素
     * @param {number} b02 - 演算子の右側の行列の0, 2の要素
     * @param {number} b03 - 演算子の右側の行列の0, 3の要素
     * @param {number} b10 - 演算子の右側の行列の1, 0の要素
     * @param {number} b11 - 演算子の右側の行列の1, 1の要素
     * @param {number} b12 - 演算子の右側の行列の1, 2の要素
     * @param {number} b13 - 演算子の右側の行列の1, 3の要素
     * @param {number} b20 - 演算子の右側の行列の2, 0の要素
     * @param {number} b21 - 演算子の右側の行列の2, 1の要素
     * @param {number} b22 - 演算子の右側の行列の2, 2の要素
     * @param {number} b23 - 演算子の右側の行列の2, 3の要素
     * @param {number} b30 - 演算子の右側の行列の3, 0の要素
     * @param {number} b31 - 演算子の右側の行列の3, 1の要素
     * @param {number} b32 - 演算子の右側の行列の3, 2の要素
     * @param {number} b33 - 演算子の右側の行列の3, 3の要素
     */
    ns.Matrix4x4.div = function (d, d_off,
                                 a00, a01, a02, a03,
                                 a10, a11, a12, a13,
                                 a20, a21, a22, a23,
                                 a30, a31, a32, a33,
                                 b00, b01, b02, b03,
                                 b10, b11, b12, b13,
                                 b20, b21, b22, b23,
                                 b30, b31, b32, b33) {
        // 共通項の算出
        let m10_m21 = b10 * b21, m10_m22 = b10 * b22, m10_m23 = b10 * b23,
            m10_m31 = b10 * b31, m10_m32 = b10 * b32, m10_m33 = b10 * b33;
        let m11_m20 = b11 * b20, m11_m22 = b11 * b22, m11_m23 = b11 * b23,
            m11_m30 = b11 * b30, m11_m32 = b11 * b32, m11_m33 = b11 * b33;
        let m12_m20 = b12 * b20, m12_m21 = b12 * b21, m12_m23 = b12 * b23,
            m12_m30 = b12 * b30, m12_m31 = b12 * b31, m12_m33 = b12 * b33;
        let m13_m20 = b13 * b20, m13_m21 = b13 * b21, m13_m22 = b13 * b22,
            m13_m30 = b13 * b30, m13_m31 = b13 * b31, m13_m32 = b13 * b32;
        let m20_m31 = b20 * b31, m20_m32 = b20 * b32, m20_m33 = b20 * b33;
        let m21_m30 = b21 * b30, m21_m32 = b21 * b32, m21_m33 = b21 * b33;
        let m22_m30 = b22 * b30, m22_m31 = b22 * b31, m22_m33 = b22 * b33;
        let m23_m30 = b23 * b30, m23_m31 = b23 * b31, m23_m32 = b23 * b32;

        // 行列式の算出
        let det00 = b11 * (m22_m33 - m23_m32) + b12 * (m23_m31 - m21_m33) + b13 * (m21_m32 - m22_m31);
        let det01 = b10 * (m23_m32 - m22_m33) + b12 * (m20_m33 - m23_m30) + b13 * (m22_m30 - m20_m32);
        let det02 = b10 * (m21_m33 - m23_m31) + b11 * (m23_m30 - m20_m33) + b13 * (m20_m31 - m21_m30);
        let det03 = b10 * (m22_m31 - m21_m32) + b11 * (m20_m32 - m22_m30) + b12 * (m21_m30 - m20_m31);
        let det = b00 * det00 + b01 * det01 + b02 * det02 + b03 * det03;

        // 逆行列を掛け合わせて、結果の書き出し
        ns.Matrix4x4.mul(
            d, d_off,
            // 行列A
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,

            // 行列Bの逆行列
            det00 / det,
            (b01 * (m23_m32 - m22_m33) + b02 * (m21_m33 - m23_m31) + b03 * (m22_m31 - m21_m32)) / det,
            (b01 * (m12_m33 - m13_m32) + b02 * (m13_m31 - m11_m33) + b03 * (m11_m32 - m12_m31)) / det,
            (b01 * (m13_m22 - m12_m23) + b02 * (m11_m23 - m13_m21) + b03 * (m12_m21 - m11_m22)) / det,
            det01 / det,
            (b00 * (m22_m33 - m23_m32) + b02 * (m23_m30 - m20_m33) + b03 * (m20_m32 - m22_m30)) / det,
            (b00 * (m13_m32 - m12_m33) + b02 * (m10_m33 - m13_m30) + b03 * (m12_m30 - m10_m32)) / det,
            (b00 * (m12_m23 - m13_m22) + b02 * (m13_m20 - m10_m23) + b03 * (m10_m22 - m12_m20)) / det,
            det02 / det,
            (b00 * (m23_m31 - m21_m33) + b01 * (m20_m33 - m23_m30) + b03 * (m21_m30 - m20_m31)) / det,
            (b00 * (m11_m33 - m13_m31) + b01 * (m13_m30 - m10_m33) + b03 * (m10_m31 - m11_m30)) / det,
            (b00 * (m13_m21 - m11_m23) + b01 * (m10_m23 - m13_m20) + b03 * (m11_m20 - m10_m21)) / det,
            det03 / det,
            (b00 * (m21_m32 - m22_m31) + b01 * (m22_m30 - m20_m32) + b02 * (m20_m31 - m21_m30)) / det,
            (b00 * (m12_m31 - m11_m32) + b01 * (m10_m32 - m12_m30) + b02 * (m11_m30 - m10_m31)) / det,
            (b00 * (m11_m22 - m12_m21) + b01 * (m12_m20 - m10_m22) + b02 * (m10_m21 - m11_m20)) / det);
    };

    /**
     * 行列の割り算をします。
     *
     * d = a / b
     *
     * @memberof xpl.Matrix4x4
     * @function divv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} a - 演算子の左側の行列
     * @param {number} a_off - 演算子の左側の行列の配列インデックス
     * @param {Array.<number>} b - 演算子の右側の行列
     * @param {number} b_off - 演算子の左側の行列の配列インデックス
     */
    ns.Matrix4x4.divv = function (d, d_off, a, a_off, b, b_off) {
        ns.Matrix4x4.div(
            d, d_off,
            a[a_off + M00], a[a_off + M01], a[a_off + M02], a[a_off + M03],
            a[a_off + M10], a[a_off + M11], a[a_off + M12], a[a_off + M13],
            a[a_off + M20], a[a_off + M21], a[a_off + M22], a[a_off + M23],
            a[a_off + M30], a[a_off + M31], a[a_off + M32], a[a_off + M33],
            b[b_off + M00], b[b_off + M01], b[b_off + M02], b[b_off + M03],
            b[b_off + M10], b[b_off + M11], b[b_off + M12], b[b_off + M13],
            b[b_off + M20], b[b_off + M21], b[b_off + M22], b[b_off + M23],
            b[b_off + M30], b[b_off + M31], b[b_off + M32], b[b_off + M33]);
    };

    /**
     * 行列とスカラの割り算をします。
     *
     * d = m / s
     *
     * @memberof xpl.Matrix4x4
     * @function divScalar
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} m00 - 対象の行列の0, 0の要素
     * @param {number} m01 - 対象の行列の0, 1の要素
     * @param {number} m02 - 対象の行列の0, 2の要素
     * @param {number} m03 - 対象の行列の0, 3の要素
     * @param {number} m10 - 対象の行列の1, 0の要素
     * @param {number} m11 - 対象の行列の1, 1の要素
     * @param {number} m12 - 対象の行列の1, 2の要素
     * @param {number} m13 - 対象の行列の1, 3の要素
     * @param {number} m20 - 対象の行列の2, 0の要素
     * @param {number} m21 - 対象の行列の2, 1の要素
     * @param {number} m22 - 対象の行列の2, 2の要素
     * @param {number} m23 - 対象の行列の2, 3の要素
     * @param {number} m30 - 対象の行列の3, 0の要素
     * @param {number} m31 - 対象の行列の3, 1の要素
     * @param {number} m32 - 対象の行列の3, 2の要素
     * @param {number} m33 - 対象の行列の3, 3の要素
     * @param {number} s - 対象のスカラ
     */
    ns.Matrix4x4.divScalar = function (d, d_off,
                                       m00, m01, m02, m03,
                                       m10, m11, m12, m13,
                                       m20, m21, m22, m23,
                                       m30, m31, m32, m33,
                                       s) {
        ns.Matrix4x4.load(
            d, d_off,
            m00 / s, m01 / s, m02 / s, m03 / s,
            m10 / s, m11 / s, m12 / s, m13 / s,
            m20 / s, m21 / s, m22 / s, m23 / s,
            m30 / s, m31 / s, m32 / s, m33 / s,
            false);
    };

    /**
     * 行列とスカラの割り算をします。
     *
     * d = m / s
     *
     * @memberof xpl.Matrix4x4
     * @function divScalarv
     * @param {Array.<number>} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {Array.<number>} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} s - 対象のスカラ
     */
    ns.Matrix4x4.divScalarv = function (d, d_off, m, m_off, s) {
        ns.Matrix4x4.divScalar(
            d, d_off,
            m[m_off + M00], m[m_off + M01], m[m_off + M02], m[m_off + M03],
            m[m_off + M10], m[m_off + M11], m[m_off + M12], m[m_off + M13],
            m[m_off + M20], m[m_off + M21], m[m_off + M22], m[m_off + M23],
            m[m_off + M30], m[m_off + M31], m[m_off + M32], m[m_off + M33],
            s);
    };

    /**
     * 行列の文字列表現を返します。
     *
     * @memberof xpl.Matrix4x4
     * @function convertToString
     * @param {Array.<number>} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @returns {string} The converted matrix to string.
     */
    ns.Matrix4x4.convertToString = function (m, m_off) {
        return "Matrix4x4(" + "\n" +
            "    " + m[m_off + M00] + ", " + m[m_off + M01] + ", " + m[m_off + M02] + ", " + m[m_off + M03] + ",\n" +
            "    " + m[m_off + M10] + ", " + m[m_off + M11] + ", " + m[m_off + M12] + ", " + m[m_off + M13] + ",\n" +
            "    " + m[m_off + M20] + ", " + m[m_off + M21] + ", " + m[m_off + M22] + ", " + m[m_off + M23] + ",\n" +
            "    " + m[m_off + M30] + ", " + m[m_off + M31] + ", " + m[m_off + M32] + ", " + m[m_off + M33] + ")";
    };

})(xpl);
