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

(function (ns) {

    "use strict";

    let M00 = 0, M01 = 4, M02 = 8, M03 = 12,
        M10 = 1, M11 = 5, M12 = 9, M13 = 13,
        M20 = 2, M21 = 6, M22 = 10, M23 = 14,
        M30 = 3, M31 = 7, M32 = 11, M33 = 15;

    /**
     * Matrix utilities for the three dimensional.
     *
     * @namespace xpl.Matrix4x4
     * @author Syuuhei Kuno
     */
    ns.Matrix4x4 = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * Load the any values that to elements of the matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function load
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} m00 - Element of 0-0 in the source matrix.
     * @param {Number} m01 - Element of 0-1 in the source matrix.
     * @param {Number} m02 - Element of 0-2 in the source matrix.
     * @param {Number} m03 - Element of 0-3 in the source matrix.
     * @param {Number} m10 - Element of 1-0 in the source matrix.
     * @param {Number} m11 - Element of 1-1 in the source matrix.
     * @param {Number} m12 - Element of 1-2 in the source matrix.
     * @param {Number} m13 - Element of 1-3 in the source matrix.
     * @param {Number} m20 - Element of 2-0 in the source matrix.
     * @param {Number} m21 - Element of 2-1 in the source matrix.
     * @param {Number} m22 - Element of 2-2 in the source matrix.
     * @param {Number} m23 - Element of 2-3 in the source matrix.
     * @param {Number} m30 - Element of 3-0 in the source matrix.
     * @param {Number} m31 - Element of 3-1 in the source matrix.
     * @param {Number} m32 - Element of 3-2 in the source matrix.
     * @param {Number} m33 - Element of 3-3 in the source matrix.
     * @param {Boolean} [transpose=false] -
     *              Set true if transpose the matrix,
     *              set false if don't transpose the matrix.
     */
    ns.Matrix4x4.load = function (d, d_off,
                                  m00, m01, m02, m03,
                                  m10, m11, m12, m13,
                                  m20, m21, m22, m23,
                                  m30, m31, m32, m33,
                                  transpose) {
        if (transpose === undefined) {
            transpose = false;
        }
        if (transpose) {
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
     * Load the any values that to elements of the matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function loadv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} m - The source matrix.
     * @param {Number} m_off - Starting position in the source matrix.
     * @param {Boolean} [transpose=false] -
     *              Set true if transpose the matrix,
     *              set false if don't transpose the matrix.
     */
    ns.Matrix4x4.loadv = function (d, d_off, m, m_off, transpose) {
        ns.Matrix4x4.load(
            d, d_off,
            m[m_off + M00], m[m_off + M01], m[m_off + M02], m[m_off + M03],
            m[m_off + M10], m[m_off + M11], m[m_off + M12], m[m_off + M13],
            m[m_off + M20], m[m_off + M21], m[m_off + M22], m[m_off + M23],
            m[m_off + M30], m[m_off + M31], m[m_off + M32], m[m_off + M33],
            transpose);
    };

    /**
     * Load the zero values at the all elements of the matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function loadZero
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
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
     * Load the identity values at the all elements of the matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function loadIdentity
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
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
     * Linear interpolate any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function lrepv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} a - The start point matrix.
     * @param {Number} a_off - Starting position in the start point matrix.
     * @param {Array.<Number>} b - The end point matrix.
     * @param {Number} b_off - Starting position in the end point matrix.
     * @param {Number} t - The interpolation coefficient.
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
     * Transpose the matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function transposev
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} m - The target matrix.
     * @param {Number} m_off - Starting position in the target matrix.
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
     * Calculate the determinant value.
     *
     * @memberof xpl.Matrix4x4
     * @function determinant
     * @param {Array.<Number>} m - The target matrix.
     * @param {Number} m_off - Starting position in the target matrix.
     * @returns {Number} The determinant value.
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
     * Calculate the inversion then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function inversev
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} m - The target matrix.
     * @param {Number} m_off - Starting position in the target matrix.
     */
    ns.Matrix4x4.inversev = function (d, d_off, m, m_off) {
        let m00 = m[m_off + M00], m01 = m[m_off + M01], m02 = m[m_off + M02], m03 = m[m_off + M03];
        let m10 = m[m_off + M10], m11 = m[m_off + M11], m12 = m[m_off + M12], m13 = m[m_off + M13];
        let m20 = m[m_off + M20], m21 = m[m_off + M21], m22 = m[m_off + M22], m23 = m[m_off + M23];
        let m30 = m[m_off + M30], m31 = m[m_off + M31], m32 = m[m_off + M32], m33 = m[m_off + M33];

        // calculate the common denominator.
        let m10_m21 = m10 * m21, m10_m22 = m10 * m22, m10_m23 = m10 * m23, m10_m31 = m10 * m31, m10_m32 = m10 * m32, m10_m33 = m10 * m33;
        let m11_m20 = m11 * m20, m11_m22 = m11 * m22, m11_m23 = m11 * m23, m11_m30 = m11 * m30, m11_m32 = m11 * m32, m11_m33 = m11 * m33;
        let m12_m20 = m12 * m20, m12_m21 = m12 * m21, m12_m23 = m12 * m23, m12_m30 = m12 * m30, m12_m31 = m12 * m31, m12_m33 = m12 * m33;
        let m13_m20 = m13 * m20, m13_m21 = m13 * m21, m13_m22 = m13 * m22, m13_m30 = m13 * m30, m13_m31 = m13 * m31, m13_m32 = m13 * m32;
        let m20_m31 = m20 * m31, m20_m32 = m20 * m32, m20_m33 = m20 * m33;
        let m21_m30 = m21 * m30, m21_m32 = m21 * m32, m21_m33 = m21 * m33;
        let m22_m30 = m22 * m30, m22_m31 = m22 * m31, m22_m33 = m22 * m33;
        let m23_m30 = m23 * m30, m23_m31 = m23 * m31, m23_m32 = m23 * m32;

        // calculate the determinant.
        let det00 = m11 * (m22_m33 - m23_m32) + m12 * (m23_m31 - m21_m33) + m13 * (m21_m32 - m22_m31);
        let det01 = m10 * (m23_m32 - m22_m33) + m12 * (m20_m33 - m23_m30) + m13 * (m22_m30 - m20_m32);
        let det02 = m10 * (m21_m33 - m23_m31) + m11 * (m23_m30 - m20_m33) + m13 * (m20_m31 - m21_m30);
        let det03 = m10 * (m22_m31 - m21_m32) + m11 * (m20_m32 - m22_m30) + m12 * (m21_m30 - m20_m31);
        let det = m00 * det00 + m01 * det01 + m02 * det02 + m03 * det03;

        // inverse then load on the matrix.
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
     * Calculate the addition any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function add
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} a00 - Element of 0-0 in the left-hand side matrix of operator.
     * @param {Number} a01 - Element of 0-1 in the left-hand side matrix of operator.
     * @param {Number} a02 - Element of 0-2 in the left-hand side matrix of operator.
     * @param {Number} a03 - Element of 0-3 in the left-hand side matrix of operator.
     * @param {Number} a10 - Element of 1-0 in the left-hand side matrix of operator.
     * @param {Number} a11 - Element of 1-1 in the left-hand side matrix of operator.
     * @param {Number} a12 - Element of 1-2 in the left-hand side matrix of operator.
     * @param {Number} a13 - Element of 1-3 in the left-hand side matrix of operator.
     * @param {Number} a20 - Element of 2-0 in the left-hand side matrix of operator.
     * @param {Number} a21 - Element of 2-1 in the left-hand side matrix of operator.
     * @param {Number} a22 - Element of 2-2 in the left-hand side matrix of operator.
     * @param {Number} a23 - Element of 2-3 in the left-hand side matrix of operator.
     * @param {Number} a30 - Element of 3-0 in the left-hand side matrix of operator.
     * @param {Number} a31 - Element of 3-1 in the left-hand side matrix of operator.
     * @param {Number} a32 - Element of 3-2 in the left-hand side matrix of operator.
     * @param {Number} a33 - Element of 3-3 in the left-hand side matrix of operator.
     * @param {Number} b00 - Element of 0-0 in the right-hand side matrix of operator.
     * @param {Number} b01 - Element of 0-1 in the right-hand side matrix of operator.
     * @param {Number} b02 - Element of 0-2 in the right-hand side matrix of operator.
     * @param {Number} b03 - Element of 0-3 in the right-hand side matrix of operator.
     * @param {Number} b10 - Element of 1-0 in the right-hand side matrix of operator.
     * @param {Number} b11 - Element of 1-1 in the right-hand side matrix of operator.
     * @param {Number} b12 - Element of 1-2 in the right-hand side matrix of operator.
     * @param {Number} b13 - Element of 1-3 in the right-hand side matrix of operator.
     * @param {Number} b20 - Element of 2-0 in the right-hand side matrix of operator.
     * @param {Number} b21 - Element of 2-1 in the right-hand side matrix of operator.
     * @param {Number} b22 - Element of 2-2 in the right-hand side matrix of operator.
     * @param {Number} b23 - Element of 2-3 in the right-hand side matrix of operator.
     * @param {Number} b30 - Element of 3-0 in the right-hand side matrix of operator.
     * @param {Number} b31 - Element of 3-1 in the right-hand side matrix of operator.
     * @param {Number} b32 - Element of 3-2 in the right-hand side matrix of operator.
     * @param {Number} b33 - Element of 3-3 in the right-hand side matrix of operator.
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
     * Calculate the addition any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function addv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} a - The left-hand side matrix of operator.
     * @param {Number} a_off - Starting position in the left-hand side matrix of operator.
     * @param {Array.<Number>} b - The right-hand side matrix of operator.
     * @param {Number} b_off - Starting position in the right-hand side matrix of operator.
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
     * Calculate the subtraction any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function sub
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} a00 - Element of 0-0 in the left-hand side matrix of operator.
     * @param {Number} a01 - Element of 0-1 in the left-hand side matrix of operator.
     * @param {Number} a02 - Element of 0-2 in the left-hand side matrix of operator.
     * @param {Number} a03 - Element of 0-3 in the left-hand side matrix of operator.
     * @param {Number} a10 - Element of 1-0 in the left-hand side matrix of operator.
     * @param {Number} a11 - Element of 1-1 in the left-hand side matrix of operator.
     * @param {Number} a12 - Element of 1-2 in the left-hand side matrix of operator.
     * @param {Number} a13 - Element of 1-3 in the left-hand side matrix of operator.
     * @param {Number} a20 - Element of 2-0 in the left-hand side matrix of operator.
     * @param {Number} a21 - Element of 2-1 in the left-hand side matrix of operator.
     * @param {Number} a22 - Element of 2-2 in the left-hand side matrix of operator.
     * @param {Number} a23 - Element of 2-3 in the left-hand side matrix of operator.
     * @param {Number} a30 - Element of 3-0 in the left-hand side matrix of operator.
     * @param {Number} a31 - Element of 3-1 in the left-hand side matrix of operator.
     * @param {Number} a32 - Element of 3-2 in the left-hand side matrix of operator.
     * @param {Number} a33 - Element of 3-3 in the left-hand side matrix of operator.
     * @param {Number} b00 - Element of 0-0 in the right-hand side matrix of operator.
     * @param {Number} b01 - Element of 0-1 in the right-hand side matrix of operator.
     * @param {Number} b02 - Element of 0-2 in the right-hand side matrix of operator.
     * @param {Number} b03 - Element of 0-3 in the right-hand side matrix of operator.
     * @param {Number} b10 - Element of 1-0 in the right-hand side matrix of operator.
     * @param {Number} b11 - Element of 1-1 in the right-hand side matrix of operator.
     * @param {Number} b12 - Element of 1-2 in the right-hand side matrix of operator.
     * @param {Number} b13 - Element of 1-3 in the right-hand side matrix of operator.
     * @param {Number} b20 - Element of 2-0 in the right-hand side matrix of operator.
     * @param {Number} b21 - Element of 2-1 in the right-hand side matrix of operator.
     * @param {Number} b22 - Element of 2-2 in the right-hand side matrix of operator.
     * @param {Number} b23 - Element of 2-3 in the right-hand side matrix of operator.
     * @param {Number} b30 - Element of 3-0 in the right-hand side matrix of operator.
     * @param {Number} b31 - Element of 3-1 in the right-hand side matrix of operator.
     * @param {Number} b32 - Element of 3-2 in the right-hand side matrix of operator.
     * @param {Number} b33 - Element of 3-3 in the right-hand side matrix of operator.
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
     * Calculate the subtraction any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function subv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} a - The left-hand side matrix of operator.
     * @param {Number} a_off - Starting position in the left-hand side matrix of operator.
     * @param {Array.<Number>} b - The right-hand side matrix of operator.
     * @param {Number} b_off - Starting position in the right-hand side matrix of operator.
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
     * Calculate the multiplication any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function mul
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} a00 - Element of 0-0 in the left-hand side matrix of operator.
     * @param {Number} a01 - Element of 0-1 in the left-hand side matrix of operator.
     * @param {Number} a02 - Element of 0-2 in the left-hand side matrix of operator.
     * @param {Number} a03 - Element of 0-3 in the left-hand side matrix of operator.
     * @param {Number} a10 - Element of 1-0 in the left-hand side matrix of operator.
     * @param {Number} a11 - Element of 1-1 in the left-hand side matrix of operator.
     * @param {Number} a12 - Element of 1-2 in the left-hand side matrix of operator.
     * @param {Number} a13 - Element of 1-3 in the left-hand side matrix of operator.
     * @param {Number} a20 - Element of 2-0 in the left-hand side matrix of operator.
     * @param {Number} a21 - Element of 2-1 in the left-hand side matrix of operator.
     * @param {Number} a22 - Element of 2-2 in the left-hand side matrix of operator.
     * @param {Number} a23 - Element of 2-3 in the left-hand side matrix of operator.
     * @param {Number} a30 - Element of 3-0 in the left-hand side matrix of operator.
     * @param {Number} a31 - Element of 3-1 in the left-hand side matrix of operator.
     * @param {Number} a32 - Element of 3-2 in the left-hand side matrix of operator.
     * @param {Number} a33 - Element of 3-3 in the left-hand side matrix of operator.
     * @param {Number} b00 - Element of 0-0 in the right-hand side matrix of operator.
     * @param {Number} b01 - Element of 0-1 in the right-hand side matrix of operator.
     * @param {Number} b02 - Element of 0-2 in the right-hand side matrix of operator.
     * @param {Number} b03 - Element of 0-3 in the right-hand side matrix of operator.
     * @param {Number} b10 - Element of 1-0 in the right-hand side matrix of operator.
     * @param {Number} b11 - Element of 1-1 in the right-hand side matrix of operator.
     * @param {Number} b12 - Element of 1-2 in the right-hand side matrix of operator.
     * @param {Number} b13 - Element of 1-3 in the right-hand side matrix of operator.
     * @param {Number} b20 - Element of 2-0 in the right-hand side matrix of operator.
     * @param {Number} b21 - Element of 2-1 in the right-hand side matrix of operator.
     * @param {Number} b22 - Element of 2-2 in the right-hand side matrix of operator.
     * @param {Number} b23 - Element of 2-3 in the right-hand side matrix of operator.
     * @param {Number} b30 - Element of 3-0 in the right-hand side matrix of operator.
     * @param {Number} b31 - Element of 3-1 in the right-hand side matrix of operator.
     * @param {Number} b32 - Element of 3-2 in the right-hand side matrix of operator.
     * @param {Number} b33 - Element of 3-3 in the right-hand side matrix of operator.
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
     * Calculate the multiplication any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function mulv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} a - The left-hand side matrix of operator.
     * @param {Number} a_off - Starting position in the left-hand side matrix of operator.
     * @param {Array.<Number>} b - The right-hand side matrix of operator.
     * @param {Number} b_off - Starting position in the right-hand side matrix of operator.
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
     * Calculate the multiplication any one matrix and one scalar value then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function mulScalar
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} m00 - Element of 0-0 in the target matrix.
     * @param {Number} m01 - Element of 0-1 in the target matrix.
     * @param {Number} m02 - Element of 0-2 in the target matrix.
     * @param {Number} m03 - Element of 0-3 in the target matrix.
     * @param {Number} m10 - Element of 1-0 in the target matrix.
     * @param {Number} m11 - Element of 1-1 in the target matrix.
     * @param {Number} m12 - Element of 1-2 in the target matrix.
     * @param {Number} m13 - Element of 1-3 in the target matrix.
     * @param {Number} m20 - Element of 2-0 in the target matrix.
     * @param {Number} m21 - Element of 2-1 in the target matrix.
     * @param {Number} m22 - Element of 2-2 in the target matrix.
     * @param {Number} m23 - Element of 2-3 in the target matrix.
     * @param {Number} m30 - Element of 3-0 in the target matrix.
     * @param {Number} m31 - Element of 3-1 in the target matrix.
     * @param {Number} m32 - Element of 3-2 in the target matrix.
     * @param {Number} m33 - Element of 3-3 in the target matrix.
     * @param {Number} s - The target scalar.
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
     * Calculate the multiplication any one matrix and one scalar value then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function mulScalarv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} m - The target matrix.
     * @param {Number} m_off - Starting position in the target matrix.
     * @param {Number} s - The target scalar.
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
     * Calculate the division any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function div
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} a00 - Element of 0-0 in the left-hand side matrix of operator.
     * @param {Number} a01 - Element of 0-1 in the left-hand side matrix of operator.
     * @param {Number} a02 - Element of 0-2 in the left-hand side matrix of operator.
     * @param {Number} a03 - Element of 0-3 in the left-hand side matrix of operator.
     * @param {Number} a10 - Element of 1-0 in the left-hand side matrix of operator.
     * @param {Number} a11 - Element of 1-1 in the left-hand side matrix of operator.
     * @param {Number} a12 - Element of 1-2 in the left-hand side matrix of operator.
     * @param {Number} a13 - Element of 1-3 in the left-hand side matrix of operator.
     * @param {Number} a20 - Element of 2-0 in the left-hand side matrix of operator.
     * @param {Number} a21 - Element of 2-1 in the left-hand side matrix of operator.
     * @param {Number} a22 - Element of 2-2 in the left-hand side matrix of operator.
     * @param {Number} a23 - Element of 2-3 in the left-hand side matrix of operator.
     * @param {Number} a30 - Element of 3-0 in the left-hand side matrix of operator.
     * @param {Number} a31 - Element of 3-1 in the left-hand side matrix of operator.
     * @param {Number} a32 - Element of 3-2 in the left-hand side matrix of operator.
     * @param {Number} a33 - Element of 3-3 in the left-hand side matrix of operator.
     * @param {Number} b00 - Element of 0-0 in the right-hand side matrix of operator.
     * @param {Number} b01 - Element of 0-1 in the right-hand side matrix of operator.
     * @param {Number} b02 - Element of 0-2 in the right-hand side matrix of operator.
     * @param {Number} b03 - Element of 0-3 in the right-hand side matrix of operator.
     * @param {Number} b10 - Element of 1-0 in the right-hand side matrix of operator.
     * @param {Number} b11 - Element of 1-1 in the right-hand side matrix of operator.
     * @param {Number} b12 - Element of 1-2 in the right-hand side matrix of operator.
     * @param {Number} b13 - Element of 1-3 in the right-hand side matrix of operator.
     * @param {Number} b20 - Element of 2-0 in the right-hand side matrix of operator.
     * @param {Number} b21 - Element of 2-1 in the right-hand side matrix of operator.
     * @param {Number} b22 - Element of 2-2 in the right-hand side matrix of operator.
     * @param {Number} b23 - Element of 2-3 in the right-hand side matrix of operator.
     * @param {Number} b30 - Element of 3-0 in the right-hand side matrix of operator.
     * @param {Number} b31 - Element of 3-1 in the right-hand side matrix of operator.
     * @param {Number} b32 - Element of 3-2 in the right-hand side matrix of operator.
     * @param {Number} b33 - Element of 3-3 in the right-hand side matrix of operator.
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
        // calculate the common denominator.
        let m10_m21 = b10 * b21, m10_m22 = b10 * b22, m10_m23 = b10 * b23, m10_m31 = b10 * b31, m10_m32 = b10 * b32, m10_m33 = b10 * b33;
        let m11_m20 = b11 * b20, m11_m22 = b11 * b22, m11_m23 = b11 * b23, m11_m30 = b11 * b30, m11_m32 = b11 * b32, m11_m33 = b11 * b33;
        let m12_m20 = b12 * b20, m12_m21 = b12 * b21, m12_m23 = b12 * b23, m12_m30 = b12 * b30, m12_m31 = b12 * b31, m12_m33 = b12 * b33;
        let m13_m20 = b13 * b20, m13_m21 = b13 * b21, m13_m22 = b13 * b22, m13_m30 = b13 * b30, m13_m31 = b13 * b31, m13_m32 = b13 * b32;
        let m20_m31 = b20 * b31, m20_m32 = b20 * b32, m20_m33 = b20 * b33;
        let m21_m30 = b21 * b30, m21_m32 = b21 * b32, m21_m33 = b21 * b33;
        let m22_m30 = b22 * b30, m22_m31 = b22 * b31, m22_m33 = b22 * b33;
        let m23_m30 = b23 * b30, m23_m31 = b23 * b31, m23_m32 = b23 * b32;

        // calculate the determinant.
        let det00 = b11 * (m22_m33 - m23_m32) + b12 * (m23_m31 - m21_m33) + b13 * (m21_m32 - m22_m31);
        let det01 = b10 * (m23_m32 - m22_m33) + b12 * (m20_m33 - m23_m30) + b13 * (m22_m30 - m20_m32);
        let det02 = b10 * (m21_m33 - m23_m31) + b11 * (m23_m30 - m20_m33) + b13 * (m20_m31 - m21_m30);
        let det03 = b10 * (m22_m31 - m21_m32) + b11 * (m20_m32 - m22_m30) + b12 * (m21_m30 - m20_m31);
        let det = b00 * det00 + b01 * det01 + b02 * det02 + b03 * det03;

        // inverse then multiplication and load on the matrix.
        ns.Matrix4x4.mul(
            d, d_off,
            // the matrix A.
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            // the inverse matrix B.
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
     * Calculate the division any two matrix then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function divv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} a - The left-hand side matrix of operator.
     * @param {Number} a_off - Starting position in the left-hand side matrix of operator.
     * @param {Array.<Number>} b - The right-hand side matrix of operator.
     * @param {Number} b_off - Starting position in the right-hand side matrix of operator.
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
     * Calculate the division any one matrix and one scalar value then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function divScalar
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Number} m00 - Element of 0-0 in the target matrix.
     * @param {Number} m01 - Element of 0-1 in the target matrix.
     * @param {Number} m02 - Element of 0-2 in the target matrix.
     * @param {Number} m03 - Element of 0-3 in the target matrix.
     * @param {Number} m10 - Element of 1-0 in the target matrix.
     * @param {Number} m11 - Element of 1-1 in the target matrix.
     * @param {Number} m12 - Element of 1-2 in the target matrix.
     * @param {Number} m13 - Element of 1-3 in the target matrix.
     * @param {Number} m20 - Element of 2-0 in the target matrix.
     * @param {Number} m21 - Element of 2-1 in the target matrix.
     * @param {Number} m22 - Element of 2-2 in the target matrix.
     * @param {Number} m23 - Element of 2-3 in the target matrix.
     * @param {Number} m30 - Element of 3-0 in the target matrix.
     * @param {Number} m31 - Element of 3-1 in the target matrix.
     * @param {Number} m32 - Element of 3-2 in the target matrix.
     * @param {Number} m33 - Element of 3-3 in the target matrix.
     * @param {Number} s - The target scalar.
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
     * Calculate the division any one matrix and one scalar value then set the destination matrix.
     *
     * @memberof xpl.Matrix4x4
     * @function divScalarv
     * @param {Array.<Number>} d - The destination matrix.
     * @param {Number} d_off - Starting position in the destination matrix.
     * @param {Array.<Number>} m - The target matrix.
     * @param {Number} m_off - Starting position in the target matrix.
     * @param {Number} s - The target scalar.
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
     * Convert to the string.
     *
     * @memberof xpl.Matrix4x4
     * @function convertToString
     * @param {Array.<Number>} m - The source matrix.
     * @param {Number} m_off - Starting position in the source matrix.
     * @returns {String} The converted matrix to string.
     */
    ns.Matrix4x4.convertToString = function (m, m_off) {
        return "Matrix4x4(" + "\n" +
            "   " + m[m_off + M00] + ", " + m[m_off + M01] + ", " + m[m_off + M02] + ", " + m[m_off + M03] + ",\n" +
            "   " + m[m_off + M10] + ", " + m[m_off + M11] + ", " + m[m_off + M12] + ", " + m[m_off + M13] + ",\n" +
            "   " + m[m_off + M20] + ", " + m[m_off + M21] + ", " + m[m_off + M22] + ", " + m[m_off + M23] + ",\n" +
            "   " + m[m_off + M30] + ", " + m[m_off + M31] + ", " + m[m_off + M32] + ", " + m[m_off + M33] + ")";
    };

})(xpl);
