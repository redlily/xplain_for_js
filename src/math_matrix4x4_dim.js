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
     * 3次元の幾何学に特化した機能を4*4の行列のユーティリティクラスに追加する拡張定義です。
     */
    if (xpl.Matrix4x4 == null) {
        return;
    }

    const VX = 0, VY = 1, VZ = 2;
    const CR = 0, CI = 1, CJ = 2, CK = 3;
    const M00 = 0, M01 = 4, M02 = 8, M03 = 12;
    const M10 = 1, M11 = 5, M12 = 9, M13 = 13;
    const M20 = 2, M21 = 6, M22 = 10, M23 = 14;
    const M30 = 3, M31 = 7, M32 = 11, M33 = 15;

    /**
     * 拡大の変換行列に読み込ませます。
     *
     *     | x, 0, 0, 0 |
     * d = | 0, y, 0, 0 |
     *     | 0, 0, z, 0 |
     *     | 0, 0, 0, 1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} x - X軸の拡大率
     * @param {number} y - Y軸の拡大率
     * @param {number} z - Z軸の拡大率
     */
    xpl.Matrix4x4.loadScale = function (d, d_off, x, y, z) {
        xpl.Matrix4x4.load(
            d, d_off,
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1,
            false);
    };

    /**
     * 拡大の変換行列に読み込ませます。
     *
     *     | x, 0, 0, 0 |
     * d = | 0, y, 0, 0 |
     *     | 0, 0, z, 0 |
     *     | 0, 0, 0, 1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number[]} v - 拡大率のベクトル
     * @param {number} v_off - 拡大率のベクトルの配列インデックス
     */
    xpl.Matrix4x4.loadScalev = function (d, d_off, v, v_off) {
        xpl.Matrix4x4.loadScale(d, d_off, v[v_off + VX], v[v_off + VX], v[v_off + VX]);
    };

    /**
     * 平行移動の変換行列を読み込ませます。
     *
     *     | 1, 0, 0, x |
     * d = | 0, 1, 0, y |
     *     | 0, 0, 1, z |
     *     | 0, 0, 0, 1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} x - X軸の移動量
     * @param {number} y - Y軸の移動量
     * @param {number} z - Z軸の移動量
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadTranslate = function (d, d_off, x, y, z, column) {
        column = xpl.defaultValue(column, true);

        xpl.Matrix4x4.load(
            d, d_off,
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1,
            !column);
    };

    /**
     * 平行移動の変換行列を読み込ませます。
     *
     *     | 1, 0, 0, x |
     * d = | 0, 1, 0, y |
     *     | 0, 0, 1, z |
     *     | 0, 0, 0, 1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number[]} v - 移動量のベクトル
     * @param {number} v_off - 移動量のベクトルの配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadTranslatev = function (d, d_off, v, v_off, column) {
        xpl.Matrix4x4.loadTranslate(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], column);
    };

    /**
     * X軸回転の変換行列を読み込ませます。
     *
     *     | 1, 0,     0,    0 |
     * d = | 0, cosθ, -sinθ, 0 |
     *     | 0, sinθ,  cosθ, 0 |
     *     | 0, 0,     0,    1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadRotateXAxis = function (d, d_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs = Math.cos(rad);
        let sn = Math.sin(rad);
        xpl.Matrix4x4.load(
            d, d_off,
            1, 0, 0, 0,
            0, cs, -sn, 0,
            0, sn, cs, 0,
            0, 0, 0, 1,
            !column);
    };

    /**
     * Y軸回転の変換行列を読み込ませます。
     *
     *     |  cosθ, 0, sinθ, 0 |
     * d = |  0,    0, 0,    0 |
     *     | -sinθ, 0, cosθ, 0 |
     *     |  0,    0, 0,    1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadRotateYAxis = function (d, d_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs = Math.cos(rad);
        let sn = Math.sin(rad);
        xpl.Matrix4x4.load(
            d, d_off,
            cs, 0, sn, 0,
            0, 1, 0, 0,
            -sn, 0, cs, 0,
            0, 0, 0, 1,
            !column);
    };

    /**
     * Z軸回転の変換行列を読み込ませます。
     *
     *     | cosθ, -sinθ, 0, 0 |
     * d = | sinθ,  cosθ, 0, 0 |
     *     | 0,     0,    0, 0 |
     *     | 0,     0,    0, 1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadRotateZAxis = function (d, d_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs = Math.cos(rad);
        let sn = Math.sin(rad);
        xpl.Matrix4x4.load(
            d, d_off,
            cs, -sn, 0, 0,
            sn, cs, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
            !column);
    };

    /**
     * 任意軸の回転の変換用列を読み込ませます。
     *
     *     | cosθ + x^2 * (1.0 - cosθ),       x * y * (1.0 - cosθ) - z * sinθ, x * z * (1.0 - cosθ) + y * sinθ, 0 |
     * d = | x * y * (1.0 - cosθ) + z * sinθ, cosθ + y^2 * (1.0 - cosθ),       y * z * (1.0 - cosθ) - x * sinθ, 0 |
     *     | x * z * (1.0 - cosθ) - y * sinθ, y * z * (1.0 - cosθ) + x * sinθ, cosθ + y^2 * (1.0 - cosθ),       0 |
     *     | 0,                               0,                               0,                               1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} x - 回転軸のX要素
     * @param {number} y - 回転軸のY要素
     * @param {number} z - 回転軸のZ要素
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [norm=true] - 回転軸を正規化するかどうか
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadRotate = function (d, d_off, x, y, z, rad, norm, column) {
        norm = xpl.defaultValue(norm, true);
        column = xpl.defaultValue(column, true);

        let cs = Math.cos(rad);
        let sn = Math.sin(rad);

        // 回転軸を正規化
        if (norm) {
            let len = x * x + y * y + z * z;
            if (0 < len) {
                len = Math.sqrt(len);
                x /= len;
                y /= len;
                z /= len;
            }
        }

        // 共通項を算出
        let cs1 = 1.0 - cs;
        let xcs1 = x * cs1, ycs1 = y * cs1;
        let xycs1 = y * xcs1, xzcs1 = z * xcs1, yzcs1 = z * ycs1;
        let xsn = x * sn, ysn = y * sn, zsn = z * sn;

        // 結果の書き出し
        xpl.Matrix4x4.load(
            d, d_off,
            cs + x * xcs1, xycs1 - zsn, xzcs1 + ysn, 0,
            xycs1 + zsn, cs + y * ycs1, yzcs1 - xsn, 0,
            xzcs1 - ysn, yzcs1 + xsn, cs + z * z * cs1, 0,
            0, 0, 0, 1,
            !column);
    };

    /**
     * 任意軸の回転の変換用列を読み込ませます。
     *
     *     | cosθ + x^2 * (1.0 - cosθ),       x * y * (1.0 - cosθ) - z * sinθ, x * z * (1.0 - cosθ) + y * sinθ, 0 |
     * d = | x * y * (1.0 - cosθ) + z * sinθ, cosθ + y^2 * (1.0 - cosθ),       y * z * (1.0 - cosθ) - x * sinθ, 0 |
     *     | x * z * (1.0 - cosθ) - y * sinθ, y * z * (1.0 - cosθ) + x * sinθ, cosθ + y^2 * (1.0 - cosθ),       0 |
     *     | 0,                               0,                               0,                               1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} v - 回転軸のベクトル
     * @param {number} v_off - 回転軸のベクトルの配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [norm=true] - 回転軸を正規化するかどうか
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadRotatev = function (d, d_off, v, v_off, rad, norm, column) {
        xpl.Matrix4x4.loadRotate(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], rad, norm, column);
    };

    /**
     * ビューの変換行列を読み込ませます。
     *
     * z_axis = (center - eye) / |center - eye|
     * x_axis = (z × upper) / |z × upper|
     * y_axis = z × x
     *
     *     | x_axis.x, x_axis.y, x_axis.z |
     * t = | y_axis.x, y_axis.y, y_axis.z | * eye * - 1
     *     | z_axis.x, z_axis.y, z_axis.z |
     *
     *     | x_axis.x, x_axis.y, x_axis.z, t.x |
     * d = | y_axis.x, y_axis.y, y_axis.z, t.y |
     *     | z_axis.x, z_axis.y, z_axis.z, t.z |
     *     | 0,        0,        0,        1   |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} eye_x - 視点の位置のX要素
     * @param {number} eye_y - 視点の位置のY要素
     * @param {number} eye_z - 視点の位置のZ要素
     * @param {number} center_x - 参照点の位置のX要素
     * @param {number} center_y - 参照点の位置のY要素
     * @param {number} center_z - 参照点の位置のZ要素
     * @param {number} [upper_x=0.0] - 吊上げのベクトルのX要素
     * @param {number} [upper_y=1.0] - 吊上げのベクトルのY要素
     * @param {number} [upper_z=0.0] - 吊上げのベクトルのZ要素
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadLookAt = function (d, d_off,
                                         eye_x, eye_y, eye_z,
                                         center_x, center_y, center_z,
                                         upper_x, upper_y, upper_z,
                                         column) {
        upper_x = xpl.defaultValue(upper_x, 0.0);
        upper_y = xpl.defaultValue(upper_y, 1.0);
        upper_z = xpl.defaultValue(upper_z, 0.0);
        column = xpl.defaultValue(column, true);

        // Z軸のベクトルを算出
        // (center - eye) / |center - eye|
        let zx = center_x - eye_x;
        let zy = center_y - eye_y;
        let zz = center_z - eye_z;
        let z_len = zx * zx + zy * zy + zz * zz;
        if (0 < z_len) {
            z_len = Math.sqrt(z_len);
            zx /= z_len;
            zy /= z_len;
            zz /= z_len;
        }

        // X軸のベクトルを算出
        // (z_axis × upper) / |z_axis × upper|
        let xx = zy * upper_z - zz * upper_y;
        let xy = zz * upper_x - zx * upper_z;
        let xz = zx * upper_y - zy * upper_x;
        let x_len = xx * xx + xy * xy + xz * xz;
        if (0 < x_len) {
            x_len = Math.sqrt(x_len);
            xx /= x_len;
            xy /= x_len;
            xz /= x_len;
        }

        // Y軸のベクトルを算出
        // z_axis × x_axis
        let yx = zy * xz - zz * xy;
        let yy = zz * xx - zx * xz;
        let yz = zx * xy - zy * xx;

        // 平行移動に回転を掛ける
        // | xx, xy, xz |   | eye_x |
        // | yx, yy, yz | * | eye_y | * -1
        // | zx, zy, zz |   | eye_z |
        let tx = -(xx * eye_x + xy * eye_y + xz * eye_z);
        let ty = -(yx * eye_x + yy * eye_y + yz * eye_z);
        let tz = -(zx * eye_x + zy * eye_y + zz * eye_z);

        // 結果の書き出し
        xpl.Matrix4x4.load(
            d, d_off,
            xx, xy, xz, tx,
            yx, yy, yz, ty,
            zx, zy, zz, tz,
            0, 0, 0, 1,
            !column);
    };

    /**
     * 射影の変換行列を読み込ませます。
     *
     * range_view = view_far - view_near
     * scaled_far = view_far * (device_far - device_near)
     *
     *     | view_near * device_width / view_width, 0,                                       0,                                     0                                    |
     * d = | 0,                                     view_near * device_height / view_height, 0,                                     0                                    |
     *     | 0,                                     0,                                       scaled_far / view_depth + device_near, view_near * scaled_far / -view_depth |
     *     | 0,                                     0,                                       1,                                     0                                    |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number} view_width - ビューの仮想的な幅
     * @param {number} view_height - ビューの仮想的な高さ
     * @param {number} view_near - ビューの仮想的な近平面の座標
     * @param {number} view_far - ビューの仮想的な遠平面の座標
     * @param {number} [device_width=2.0] - デバイスで定められている実際の幅
     * @param {number} [device_height=2.0] - デバイスで定められている実際の高さ
     * @param {number} [device_near=-1.0] - デバイスで定められている実際の近平面の座標
     * @param {number} [device_far=1.0] - デバイスで定められている実際の遠平面の座標
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.loadPerspective = function (d, d_off,
                                              view_width, view_height,
                                              view_near, view_far,
                                              device_width, device_height,
                                              device_near, device_far,
                                              column) {
        device_width = xpl.defaultValue(device_width, 2.0);
        device_height = xpl.defaultValue(device_height, 2.0);
        device_near = xpl.defaultValue(device_near, -1.0);
        device_far = xpl.defaultValue(device_far, 1.0);
        column = xpl.defaultValue(column, true);

        let view_depth = view_far - view_near;
        let scaled_far = view_far * (device_far - device_near);
        let xx = (view_near * device_width) / view_width;
        let yy = (view_near * device_height) / view_height;
        let zz = scaled_far / view_depth + device_near;
        let wz = (view_near * scaled_far) / -view_depth;
        xpl.Matrix4x4.load(
            d, d_off,
            xx, 0, 0, 0,
            0, yy, 0, 0,
            0, 0, zz, wz,
            0, 0, 1, 0,
            !column);
    };

    /**
     * 軸の要素のみを行列に読み込ませます。
     *
     *     | m(0, 0), m(0, 1), m(0, 2), 0 |
     * d = | m(1, 0), m(1, 1), m(1, 2), 0 |
     *     | m(2, 0), m(2, 1), m(2, 2), 0 |
     *     | 0,       0,      0,        1 |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number[]} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @param {boolean} [trans=false] -
     */
    xpl.Matrix4x4.loadAxisv = function (d, d_off, m, m_off, trans) {
        xpl.Matrix4x4.load(
            d, d_off,
            m[m_off + M00], m[m_off + M01], m[m_off + M02], 0,
            m[m_off + M10], m[m_off + M11], m[m_off + M12], 0,
            m[m_off + M20], m[m_off + M21], m[m_off + M22], 0,
            0, 0, 0, 1,
            trans);
    };

    /**
     * 拡大の変換行列を行列に掛け合わせます。
     *
     *      | x, 0, 0, 0 |
     * d *= | 0, y, 0, 0 |
     *      | 0, 0, z, 0 |
     *      | 0, 0, 0, 1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} x - X軸の拡大値
     * @param {number} y - Y軸の拡大値
     * @param {number} z - Z軸の拡大値
     */
    xpl.Matrix4x4.mulScale = function (m, m_off, x, y, z) {
        m[m_off + M00] *= x;
        m[m_off + M01] *= y;
        m[m_off + M02] *= z;
        m[m_off + M10] *= x;
        m[m_off + M11] *= y;
        m[m_off + M12] *= z;
        m[m_off + M20] *= x;
        m[m_off + M21] *= y;
        m[m_off + M22] *= z;
        m[m_off + M30] *= x;
        m[m_off + M31] *= y;
        m[m_off + M32] *= z;
    };

    /**
     * 平行移動の変換行列を行列に掛け合わせます。
     *
     *      | 1, 0, 0, x |
     * d *= | 0, 1, 0, y |
     *      | 0, 0, 1, z |
     *      | 0, 0, 0, 1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} x - X軸の移動量
     * @param {number} y - Y軸の移動量
     * @param {number} z - Z軸の移動量
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulTranslate = function (m, m_off, x, y, z, column) {
        column = xpl.defaultValue(column, true);

        if (column) {
            m[m_off + M03] += m[m_off + M00] * x + m[m_off + M01] * y + m[m_off + M02] * z;
            m[m_off + M13] += m[m_off + M10] * x + m[m_off + M11] * y + m[m_off + M12] * z;
            m[m_off + M23] += m[m_off + M20] * x + m[m_off + M21] * y + m[m_off + M22] * z;
            m[m_off + M33] += m[m_off + M30] * x + m[m_off + M31] * y + m[m_off + M32] * z;
        } else {
            let a03 = m[m_off + M03];
            let a13 = m[m_off + M13];
            let a23 = m[m_off + M23];
            let a33 = m[m_off + M33];
            m[m_off + M00] += a03 * x;
            m[m_off + M01] += a03 * y;
            m[m_off + M02] += a03 * z;
            m[m_off + M10] += a13 * x;
            m[m_off + M11] += a13 * y;
            m[m_off + M12] += a13 * z;
            m[m_off + M20] += a23 * x;
            m[m_off + M21] += a23 * y;
            m[m_off + M22] += a23 * z;
            m[m_off + M30] += a33 * x;
            m[m_off + M31] += a33 * y;
            m[m_off + M32] += a33 * z;
        }
    };

    /**
     * X軸回転の変換行列を行列に掛け合わせます。
     *
     *      | 1, 0,     0,    0 |
     * d *= | 0, cosθ, -sinθ, 0 |
     *      | 0, sinθ,  cosθ, 0 |
     *      | 0, 0,     0,    1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulRotateXAxis = function (m, m_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs, sn;
        if (column) {
            cs = Math.cos(rad);
            sn = Math.sin(rad);
        } else {
            cs = Math.cos(rad);
            sn = -Math.sin(rad);
        }
        let a01 = m[m_off + M01], a02 = m[m_off + M02];
        let a11 = m[m_off + M11], a12 = m[m_off + M12];
        let a21 = m[m_off + M21], a22 = m[m_off + M22];
        let a31 = m[m_off + M31], a32 = m[m_off + M32];
        m[m_off + M01] = a01 * cs + a02 * sn;
        m[m_off + M02] = a01 * -sn + a02 * cs;
        m[m_off + M11] = a11 * cs + a12 * sn;
        m[m_off + M12] = a11 * -sn + a12 * cs;
        m[m_off + M21] = a21 * cs + a22 * sn;
        m[m_off + M22] = a21 * -sn + a22 * cs;
        m[m_off + M31] = a31 * cs + a32 * sn;
        m[m_off + M32] = a31 * -sn + a32 * cs;
    };

    /**
     * Y軸回転の変換行列を行列に掛け合わせます。
     *
     *      |  cosθ, 0, sinθ, 0 |
     * d *= |  0,    0, 0,    0 |
     *      | -sinθ, 0, cosθ, 0 |
     *      |  0,    0, 0,    1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulRotateYAxis = function (m, m_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs, sn;
        if (column) {
            cs = Math.cos(rad);
            sn = Math.sin(rad);
        } else {
            cs = Math.cos(rad);
            sn = -Math.sin(rad);
        }
        let a00 = m[m_off + M00], a02 = m[m_off + M02];
        let a10 = m[m_off + M10], a12 = m[m_off + M12];
        let a20 = m[m_off + M20], a22 = m[m_off + M22];
        let a30 = m[m_off + M30], a32 = m[m_off + M32];
        m[m_off + M00] = a00 * cs + a02 * -sn;
        m[m_off + M02] = a00 * sn + a02 * cs;
        m[m_off + M10] = a10 * cs + a12 * -sn;
        m[m_off + M12] = a10 * sn + a12 * cs;
        m[m_off + M20] = a20 * cs + a22 * -sn;
        m[m_off + M22] = a20 * sn + a22 * cs;
        m[m_off + M30] = a30 * cs + a32 * -sn;
        m[m_off + M32] = a30 * sn + a32 * cs;
    };

    /**
     * Z軸回転の変換行列を行列に掛け合わせます。
     *
     *      | cosθ, -sinθ, 0, 0 |
     * d *= | sinθ,  cosθ, 0, 0 |
     *      | 0,     0,    0, 0 |
     *      | 0,     0,    0, 1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulRotateZAxis = function (m, m_off, rad, column) {
        column = xpl.defaultValue(column, true);

        let cs, sn;
        if (column) {
            cs = Math.cos(rad);
            sn = Math.sin(rad);
        } else {
            cs = Math.cos(rad);
            sn = -Math.sin(rad);
        }
        let a00 = m[m_off + M00], a01 = m[m_off + M01];
        let a10 = m[m_off + M10], a11 = m[m_off + M11];
        let a20 = m[m_off + M20], a21 = m[m_off + M21];
        let a30 = m[m_off + M30], a31 = m[m_off + M31];
        m[m_off + M00] = a00 * cs + a01 * sn;
        m[m_off + M01] = a00 * -sn + a01 * cs;
        m[m_off + M10] = a10 * cs + a11 * sn;
        m[m_off + M11] = a10 * -sn + a11 * cs;
        m[m_off + M20] = a20 * cs + a21 * sn;
        m[m_off + M21] = a20 * -sn + a21 * cs;
        m[m_off + M30] = a30 * cs + a31 * sn;
        m[m_off + M31] = a30 * -sn + a31 * cs;
    };

    /**
     * 任意軸回転の変換行列を行列に掛け合わせます。
     *
     *      | cosθ + x^2 * (1.0 - cosθ),       x * y * (1.0 - cosθ) - z * sinθ, x * z * (1.0 - cosθ) + y * sinθ, 0 |
     * d *= | x * y * (1.0 - cosθ) + z * sinθ, cosθ + y^2 * (1.0 - cosθ),       y * z * (1.0 - cosθ) - x * sinθ, 0 |
     *      | x * z * (1.0 - cosθ) - y * sinθ, y * z * (1.0 - cosθ) + x * sinθ, cosθ + y^2 * (1.0 - cosθ),       0 |
     *      | 0,                               0,                               0,                               1 |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} x - 回転軸のX要素
     * @param {number} y - 回転軸のY要素
     * @param {number} z - 回転軸のZ要素
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [norm=true] - 回転軸ベクトルを正規化するかどうか
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulRotate = function (m, m_off, x, y, z, rad, norm, column) {
        norm = xpl.defaultValue(norm, true);
        column = xpl.defaultValue(column, true);

        let cs, sn;
        if (column) {
            cs = Math.cos(rad);
            sn = Math.sin(rad);
        } else {
            cs = Math.cos(rad);
            sn = -Math.sin(rad);
        }

        // 回転軸を正規化
        if (norm) {
            let len = x * x + y * y + z * z;
            if (0 < len) {
                len = Math.sqrt(len);
                x /= len;
                y /= len;
                z /= len;
            }
        }

        // 共通項を算出
        let cs1 = 1.0 - cs;
        let xcs1 = x * cs1, ycs1 = y * cs1;
        let xycs1 = y * xcs1, xzcs1 = z * xcs1, yzcs1 = z * ycs1;
        let xsn = x * sn, ysn = y * sn, zsn = z * sn;

        // 掛けあわせて、結果の書き出し
        let a00 = m[m_off + M00], a01 = m[m_off + M01], a02 = m[m_off + M02];
        let a10 = m[m_off + M10], a11 = m[m_off + M11], a12 = m[m_off + M12];
        let a20 = m[m_off + M20], a21 = m[m_off + M21], a22 = m[m_off + M22];
        let a30 = m[m_off + M30], a31 = m[m_off + M31], a32 = m[m_off + M32];
        let b00 = cs + x * xcs1, b01 = xycs1 - zsn, b02 = xzcs1 + ysn;
        let b10 = xycs1 + zsn, b11 = cs + y * ycs1, b12 = yzcs1 - xsn;
        let b20 = xzcs1 - ysn, b21 = yzcs1 + xsn, b22 = cs + z * z * cs1;
        m[m_off + M00] = a00 * b00 + a01 * b10 + a02 * b20;
        m[m_off + M01] = a00 * b01 + a01 * b11 + a02 * b21;
        m[m_off + M02] = a00 * b02 + a01 * b12 + a02 * b22;
        m[m_off + M10] = a10 * b00 + a11 * b10 + a12 * b20;
        m[m_off + M11] = a10 * b01 + a11 * b11 + a12 * b21;
        m[m_off + M12] = a10 * b02 + a11 * b12 + a12 * b22;
        m[m_off + M20] = a20 * b00 + a21 * b10 + a22 * b20;
        m[m_off + M21] = a20 * b01 + a21 * b11 + a22 * b21;
        m[m_off + M22] = a20 * b02 + a21 * b12 + a22 * b22;
        m[m_off + M30] = a30 * b00 + a31 * b10 + a32 * b20;
        m[m_off + M31] = a30 * b01 + a31 * b11 + a32 * b21;
        m[m_off + M32] = a30 * b02 + a31 * b12 + a32 * b22;
    };

    /**
     * ビューの変換行列を行列に掛け合わせます。
     *
     * z_axis = (center - eye) / |center - eye|
     * x_axis = (z × upper) / |z × upper|
     * y_axis = z × z
     *
     *     | x_axis.x, x_axis.y, x_axis.z |
     * t = | y_axis.x, y_axis.y, y_axis.z | * eye * - 1
     *     | z_axis.x, z_axis.y, z_axis.z |
     *
     *      | x_axis.x, x_axis.y, x_axis.z, t.x |
     * d *= | y_axis.x, y_axis.y, y_axis.z, t.y |
     *      | z_axis.x, z_axis.y, z_axis.z, t.z |
     *      | 0,        0,        0,        1   |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} eye_x - 視点の位置のX要素
     * @param {number} eye_y - 視点の位置のY要素
     * @param {number} eye_z - 視点の位置のZ要素
     * @param {number} center_x - 参照点の位置のX要素
     * @param {number} center_y - 参照点の位置のY要素
     * @param {number} center_z - 参照点の位置のZ要素
     * @param {number} upper_x - 吊上げのベクトルのX要素
     * @param {number} upper_y - 吊上げのベクトルのY要素
     * @param {number} upper_z - 吊上げのベクトルのZ要素
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulLookAt = function (m, m_off,
                                        eye_x, eye_y, eye_z,
                                        center_x, center_y, center_z,
                                        upper_x, upper_y, upper_z,
                                        column) {
        column = xpl.defaultValue(column, true);

        // Z軸のベクトルを算出
        // (center - eye) / |center - eye|
        let zx = center_x - eye_x;
        let zy = center_y - eye_y;
        let zz = center_z - eye_z;
        let z_len = zx * zx + zy * zy + zz * zz;
        if (0 < z_len) {
            z_len = Math.sqrt(z_len);
            zx /= z_len;
            zy /= z_len;
            zz /= z_len;
        }

        // X軸のベクトルを算出
        // (z_axis × upper) / |z_axis × upper|
        let xx = zy * upper_z - zz * upper_y;
        let xy = zz * upper_x - zx * upper_z;
        let xz = zx * upper_y - zy * upper_x;
        let x_len = xx * xx + xy * xy + xz * xz;
        if (0 < x_len) {
            x_len = Math.sqrt(x_len);
            xx /= x_len;
            xy /= x_len;
            xz /= x_len;
        }

        // Y軸のベクトルを算出
        // z_axis × x_axis
        let yx = zy * xz - zz * xy;
        let yy = zz * xx - zx * xz;
        let yz = zx * xy - zy * xx;

        // 平行移動に回転を掛ける
        // | x.x, x.y, x.z |   | eye_x |
        // | y.x, y.y, y.z | * | eye_y | * - 1
        // | z.x, z.y, z.z |   | eye_z |
        let tx = -(xx * eye_x + xy * eye_y + xz * eye_z);
        let ty = -(yx * eye_x + yy * eye_y + yz * eye_z);
        let tz = -(zx * eye_x + zy * eye_y + zz * eye_z);

        // 掛けあわせて、結果の書き出し
        let a00 = m[m_off + M00], a01 = m[m_off + M01], a02 = m[m_off + M02];
        let a10 = m[m_off + M10], a11 = m[m_off + M11], a12 = m[m_off + M12];
        let a20 = m[m_off + M20], a21 = m[m_off + M21], a22 = m[m_off + M22];
        let a30 = m[m_off + M30], a31 = m[m_off + M31], a32 = m[m_off + M32];
        if (column) {
            m[m_off + M00] = a00 * xx + a01 * yx + a02 * zx;
            m[m_off + M01] = a00 * xy + a01 * yy + a02 * zy;
            m[m_off + M02] = a00 * xz + a01 * yz + a02 * zz;
            m[m_off + M03] += a00 * tx + a01 * ty + a02 * tz;
            m[m_off + M10] = a10 * xx + a11 * yx + a12 * zx;
            m[m_off + M11] = a10 * xy + a11 * yy + a12 * zy;
            m[m_off + M12] = a10 * xz + a11 * yz + a12 * zz;
            m[m_off + M13] += a10 * tx + a11 * ty + a12 * tz;
            m[m_off + M20] = a20 * xx + a21 * yx + a22 * zx;
            m[m_off + M21] = a20 * xy + a21 * yy + a22 * zy;
            m[m_off + M22] = a20 * xz + a21 * yz + a22 * zz;
            m[m_off + M23] += a20 * tx + a21 * ty + a22 * tz;
            m[m_off + M30] = a30 * xx + a31 * yx + a32 * zx;
            m[m_off + M31] = a30 * xy + a31 * yy + a32 * zy;
            m[m_off + M32] = a30 * xz + a31 * yz + a32 * zz;
            m[m_off + M33] += a30 * tx + a31 * ty + a32 * tz;
        } else {
            let a03 = m[m_off + M03];
            let a13 = m[m_off + M13];
            let a23 = m[m_off + M23];
            let a33 = m[m_off + M33];
            m[m_off + M00] = a00 * xx + a01 * xy + a02 * xz + a03 * tx;
            m[m_off + M01] = a00 * yx + a01 * yy + a02 * yz + a03 * ty;
            m[m_off + M02] = a00 * zx + a01 * zy + a02 * zz + a03 * tz;
            m[m_off + M10] = a10 * xx + a11 * xy + a12 * xz + a13 * tx;
            m[m_off + M11] = a10 * yx + a11 * yy + a12 * yz + a13 * ty;
            m[m_off + M12] = a10 * zx + a11 * zy + a12 * zz + a13 * tz;
            m[m_off + M20] = a20 * xx + a21 * xy + a22 * xz + a23 * tx;
            m[m_off + M21] = a20 * yx + a21 * yy + a22 * yz + a23 * ty;
            m[m_off + M22] = a20 * zx + a21 * zy + a22 * zz + a23 * tz;
            m[m_off + M30] = a30 * xx + a31 * xy + a32 * xz + a33 * tx;
            m[m_off + M31] = a30 * yx + a31 * yy + a32 * yz + a33 * ty;
            m[m_off + M32] = a30 * zx + a31 * zy + a32 * zz + a33 * tz;
        }
    };

    /**
     * 射影の変換行列を行列に掛け合わせます。
     *
     * range_view = view_far - view_near
     * scaled_far = view_far * (device_far - device_near)
     *
     *      | view_near * device_width / view_width, 0,                                       0,                                     0                                    |
     * d *= | 0,                                     view_near * device_height / view_height, 0,                                     0                                    |
     *      | 0,                                     0,                                       scaled_far / view_depth + device_near, view_near * scaled_far / -view_depth |
     *      | 0,                                     0,                                       1,                                     0                                    |
     *
     * @param {number[]} m - 対象の行列
     * @param {number} m_off - 対象の行列の配列インデックス
     * @param {number} view_width - ビューの仮想的な幅
     * @param {number} view_height - ビューの仮想的な高さ
     * @param {number} view_near - ビューの仮想的な近平面の座標
     * @param {number} view_far - ビューの仮想的な遠平面の座標
     * @param {number} [device_width=2.0] - デバイスで定めている実際の幅
     * @param {number} [device_height=2.0] - デバイスで定めている実際の高さ
     * @param {number} [device_near=-1.0] - デバイスで定めている実際の近平面の座標
     * @param {number} [device_far=1.0] - デバイスで定めている実際の遠平面の座標
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulPerspective = function (m, m_off,
                                             view_width, view_height,
                                             view_near, view_far,
                                             device_width, device_height,
                                             device_near, device_far,
                                             column) {
        device_width = xpl.defaultValue(device_width, 2.0);
        device_height = xpl.defaultValue(device_height, 2.0);
        device_near = xpl.defaultValue(device_near, -1.0);
        device_far = xpl.defaultValue(device_far, 1.0);
        column = xpl.defaultValue(column, true);

        // 共通項を算出
        let range_view = view_far - view_near;
        let scaled_far = view_far * (device_far - device_near);

        // 行列に掛けあわせて、結果の書き出し
        let a02 = m[m_off + M02];
        let a12 = m[m_off + M12];
        let a22 = m[m_off + M22];
        let a32 = m[m_off + M32];
        let b00 = view_near * device_width / view_width;
        let b11 = view_near * device_height / view_height;
        let b22 = scaled_far / range_view + device_near;
        if (column) {
            let b23 = view_near * scaled_far / -range_view;
            m[m_off + M00] *= b00;
            m[m_off + M01] *= b11;
            m[m_off + M02] = a02 * b22 + m[m_off + M03];
            m[m_off + M03] = a02 * b23;
            m[m_off + M10] *= b00;
            m[m_off + M11] *= b11;
            m[m_off + M12] = a12 * b22 + m[m_off + M13];
            m[m_off + M13] = a12 * b23;
            m[m_off + M20] *= b00;
            m[m_off + M21] *= b11;
            m[m_off + M22] = a22 * b22 + m[m_off + M23];
            m[m_off + M23] = a22 * b23;
            m[m_off + M30] *= b00;
            m[m_off + M31] *= b11;
            m[m_off + M32] = a32 * b22 + m[m_off + M33];
            m[m_off + M33] = a32 * b23;
        } else {
            let b32 = view_near * scaled_far / -range_view;
            m[m_off + M00] *= b00;
            m[m_off + M01] *= b11;
            m[m_off + M02] = a02 * b22 + m[m_off + M03] * b32;
            m[m_off + M03] = a02;
            m[m_off + M10] *= b00;
            m[m_off + M11] *= b11;
            m[m_off + M12] = a12 * b22 + m[m_off + M13] * b32;
            m[m_off + M13] = a12;
            m[m_off + M20] *= b00;
            m[m_off + M21] *= b11;
            m[m_off + M22] = a22 * b22 + m[m_off + M23] * b32;
            m[m_off + M23] = a22;
            m[m_off + M30] *= b00;
            m[m_off + M31] *= b11;
            m[m_off + M32] = a32 * b22 + m[m_off + M33] * b32;
            m[m_off + M33] = a32;
        }
    };

    /**
     * 行列の軸ベクトルのみを正規化します。
     *
     * x_axis = (m(0,0), m(1,0), m(2, 0)) / |(m(0,0), m(1,0), m(2, 0))|
     * y_axis = (m(0,1), m(1,1), m(2, 1)) / |(m(0,1), m(1,1), m(2, 1))|
     * z_axis = (m(0,2), m(1,2), m(2, 2)) / |(m(0,2), m(1,2), m(2, 2))|
     *
     *     | x_axis.x,    y_axis.x,    z_axis.x,    m(0,3) |
     * d = | x_axis.y,    y_axis.y,    z_axis.y,    m(1,3) |
     *     | x_axis.z,    y_axis.z,    z_axis.z,    m(2,3) |
     *     | m(3,0),      m(3,1),      m(3,2),      m(3,3) |
     *
     * @param {number[]} d - 出力先の配列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number[]} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.normalizeAxisv = function (d, d_off, m, m_off, column) {
        column = xpl.defaultValue(column, true);

        let xx, xy, xz, yx, yy, yz, zx, zy, zz;
        xx = m[m_off + M00];
        yy = m[m_off + M11];
        zz = m[m_off + M22];
        if (column) {
            xy = m[m_off + M10];
            xz = m[m_off + M20];
            yx = m[m_off + M01];
            yz = m[m_off + M21];
            zx = m[m_off + M02];
            zy = m[m_off + M12];
        } else {
            xy = m[m_off + M01];
            xz = m[m_off + M02];
            yx = m[m_off + M10];
            yz = m[m_off + M12];
            zx = m[m_off + M20];
            zy = m[m_off + M21];
        }

        // X軸を正規化
        let x_len = xx * xx + xy * xy + xz * xz;
        if (0 < x_len) {
            x_len = Math.sqrt(x_len);
            xx /= x_len;
            xy /= x_len;
            xz /= x_len;
        }

        // Y軸を正規化
        let y_len = yx * yx + yy * yy + yz * yz;
        if (0 < y_len) {
            y_len = Math.sqrt(y_len);
            yx /= y_len;
            yy /= y_len;
            yz /= y_len;
        }

        // Z軸を正規化
        let z_len = zx * zx + zy * zy + zz * zz;
        if (0 < z_len) {
            z_len = Math.sqrt(z_len);
            zx /= z_len;
            zy /= z_len;
            zz /= z_len;
        }

        // 結果の書き出し
        d[d_off + M00] = xx;
        d[d_off + M11] = yy;
        d[d_off + M22] = zz;
        if (column) {
            d[d_off + M10] = xy;
            d[d_off + M20] = xz;
            d[d_off + M01] = yx;
            d[d_off + M21] = yz;
            d[d_off + M02] = zx;
            d[d_off + M12] = zy;
        } else {
            d[d_off + M01] = xy;
            d[d_off + M02] = xz;
            d[d_off + M10] = yx;
            d[d_off + M12] = yz;
            d[d_off + M20] = zx;
            d[d_off + M21] = zy;
        }
    };

    /**
     * 軸ベクトルを球面線形補間、それ以外の要素を線形補間します。
     *
     * x_axis = slrep((a(0, 0), a(1, 0), a(2, 0)), (b(0, 0), b(1, 0), b(2, 0)); t)
     * y_axis = slrep((a(0, 1), a(1, 1), a(2, 1)), (b(0, 1), b(1, 1), b(2, 1)); t)
     * z_axis = slrep((a(0, 2), a(1, 2), a(2, 2)), (b(0, 2), b(1, 2), b(2, 2)); t)
     *
     *     | x_axis.x,                       y_axis.x,                       z_axis.x,                 lrep(a(0, 3), b(0, 3); t) |
     * d = | x_axis.y,                       y_axis.y,                       z_axis.y,                 lrep(a(1, 3), b(1, 3); t) |
     *     | x_axis.z,                       y_axis.z                        z_axis.z,                 lrep(a(2, 3), b(2, 3); t) |
     *     | lrep(a(3, 0), b(3, 0); t),      lrep(a(3, 1), b(3, 1); t),      lrep(a(3, 2, b(3, 2); t), lrep(a(3, 3), b(3, 3); t) |
     *
     * @param {number[]} d - 出力先の行列
     * @param {number} d_off - 出力先の行列の配列インデックス
     * @param {number[]} a - 開始の行列
     * @param {number} a_off - 開始の行列の配列インデックス
     * @param {number[]} b - 終了の行列
     * @param {number} b_off - 終了の行列の配列インデックス
     * @param {number} t - 補間係数
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.slrepAxisAndLrepOtherv = function (d, d_off, a, a_off, b, b_off, t, column) {
        column = xpl.defaultValue(column, true);

        let t1 = 1.0 - t;
        let rxx, rxy, rxz, ryx, ryy, ryz, rzx, rzy, rzz;

        // 行列Aの要素を自動変数に展開
        let axx, axy, axz, axw,
            ayx, ayy, ayz, ayw,
            azx, azy, azz, azw,
            atx, aty, atz, atw;
        axx = a[a_off + M00];
        ayy = a[a_off + M11];
        azz = a[a_off + M22];
        atw = a[a_off + M33];
        if (column) {
            axy = a[a_off + M10];
            axz = a[a_off + M20];
            axw = a[a_off + M30];
            ayx = a[a_off + M01];
            ayz = a[a_off + M21];
            ayw = a[a_off + M31];
            azx = a[a_off + M02];
            azy = a[a_off + M12];
            azw = a[a_off + M32];
            atx = a[a_off + M03];
            aty = a[a_off + M13];
            atz = a[a_off + M23];
        } else {
            axy = a[a_off + M01];
            axz = a[a_off + M02];
            axw = a[a_off + M03];
            ayx = a[a_off + M10];
            ayz = a[a_off + M12];
            ayw = a[a_off + M13];
            azx = a[a_off + M20];
            azy = a[a_off + M21];
            azw = a[a_off + M23];
            atx = a[a_off + M30];
            aty = a[a_off + M31];
            atz = a[a_off + M32];
        }

        // 行列Bの要素を自動変数に展開
        let bxx, bxy, bxz, bxw,
            byx, byy, byz, byw,
            bzx, bzy, bzz, bzw,
            btx, bty, btz, btw;
        bxx = b[b_off + M00];
        byy = b[b_off + M11];
        bzz = b[b_off + M22];
        btw = b[b_off + M33];
        if (column) {
            bxy = b[b_off + M10];
            bxz = b[b_off + M20];
            bxw = b[b_off + M30];
            byx = b[b_off + M01];
            byz = b[b_off + M21];
            byw = b[b_off + M31];
            bzx = b[b_off + M02];
            bzy = b[b_off + M12];
            bzw = b[b_off + M32];
            btx = b[b_off + M03];
            bty = b[b_off + M13];
            btz = b[b_off + M23];
        } else {
            bxy = b[b_off + M01];
            bxz = b[b_off + M02];
            bxw = b[b_off + M03];
            byx = b[b_off + M10];
            byz = b[b_off + M12];
            byw = b[b_off + M13];
            bzx = b[b_off + M20];
            bzy = b[b_off + M21];
            bzw = b[b_off + M23];
            btx = b[b_off + M30];
            bty = b[b_off + M31];
            btz = b[b_off + M32];
        }

        // 行列AのX軸のベクトルを正規化
        let axlen = axx * axx + axy * axy + axz * axz;
        if (0 < axlen) {
            axlen = Math.sqrt(axlen);
            axx /= axlen;
            axy /= axlen;
            axz /= axlen;
        }

        // 行列AのY軸のベクトルを正規化
        let aylen = ayx * ayx + ayy * ayy + ayz * ayz;
        if (0 < aylen) {
            aylen = Math.sqrt(aylen);
            ayx /= aylen;
            ayy /= aylen;
            ayz /= aylen;
        }

        // 行列AのZ軸のベクトルを正規化
        let azlen = azx * azx + azy * azy + azz * azz;
        if (0 < azlen) {
            azlen = Math.sqrt(azlen);
            azx /= azlen;
            azy /= azlen;
            azz /= azlen;
        }

        // 行列BのX軸のベクトルを正規化
        let bxlen = bxx * bxx + bxy * bxy + bxz * bxz;
        if (0 < bxlen) {
            bxlen = Math.sqrt(bxlen);
            bxx /= bxlen;
            bxy /= bxlen;
            bxz /= bxlen;
        }

        // 行列BのY軸のベクトルを正規化
        let bylen = byx * byx + byy * byy + byz * byz;
        if (0 < bylen) {
            bylen = Math.sqrt(bylen);
            byx /= bylen;
            byy /= bylen;
            byz /= bylen;
        }

        // 行列BのZ軸のベクトルを正規化
        let bzlen = bzx * bzx + bzy * bzy + bzz * bzz;
        if (0 < bzlen) {
            bzlen = Math.sqrt(bzlen);
            bzx /= bzlen;
            bzy /= bzlen;
            bzz /= bzlen;
        }

        // 2つのX軸のベクトルのcos値を算出
        let xcs = axx * bxx + axy * bxy + axz * bxz;

        if (1.0 <= xcs) {
            // 2つのX軸ベクトルの方向が同一の場合
            let len = axlen * t1 + bxlen * t;
            rxx = axx * len;
            rxy = axy * len;
            rxz = axz * len;
        } else if (xcs <= -1.0) {
            // 2つのX軸ベクトルの方向が真逆の場合
            let len = axlen * t1 - bxlen * t;
            rxx = axx * len;
            rxy = axy * len;
            rxz = axz * len;
        } else {
            // その他の場合

            // 絶対値を線形補間
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let len = axlen * t1 + bxlen * t;

            // 方向を球面線形補間
            // slerp(p0, p1; t) =
            // (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(xcs);
            let rad2 = rad1 * t1;
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // 結果の書き出し
            rxx = (axx * sn1 + bxx * sn2) * len;
            rxy = (axy * sn1 + bxy * sn2) * len;
            rxz = (axz * sn1 + bxz * sn2) * len;
        }

        // 2つのY軸のベクトルのcos値を算出
        let ycs = ayx * byx + ayy * byy + ayz * byz;

        if (1.0 <= ycs) {
            // 2つのY軸ベクトルの方向が同一の場合
            let len = aylen * t1 + bylen * t;
            ryx = ayx * len;
            ryy = ayy * len;
            ryz = ayz * len;
        } else if (ycs <= -1.0) {
            // 2つのY軸ベクトルの方向が真逆の場合
            let len = aylen * t1 - bylen * t;
            ryx = ayx * len;
            ryy = ayy * len;
            ryz = ayz * len;
        } else {
            // その他の場合

            // 絶対値を線形補間
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let len = aylen * t1 + bylen * t;

            // 方向を球面線形補間
            // slerp(p0, p1; t) =
            // (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(ycs);
            let rad2 = rad1 * t1;
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // 結果の書き出し
            ryx = (ayx * sn1 + byx * sn2) * len;
            ryy = (ayy * sn1 + byy * sn2) * len;
            ryz = (ayz * sn1 + byz * sn2) * len;
        }

        // 2つのZ軸のベクトルのcos値を算出
        let zcs = azx * bzx + azy * bzy + azz * bzz;

        if (1.0 <= zcs) {
            // 2つのZ軸ベクトルの方向が同一の場合
            let len = azlen * t1 + bzlen * t;
            rzx = azx * len;
            rzy = azy * len;
            rzz = azz * len;
        } else if (zcs <= -1.0) {
            // 2つのZ軸ベクトルの方向が真逆の場合
            let len = azlen * t1 - bzlen * t;
            rzx = azx * len;
            rzy = azy * len;
            rzz = azz * len;
        } else {
            // その他の場合

            // 絶対値を線形補間
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let len = azlen * t1 + bzlen * t;

            // 方向を球面線形補間
            // slerp(p0, p1; t) =
            // (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(zcs);
            let rad2 = rad1 * t1;
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // 結果の書き出し
            rzx = (azx * sn1 + bzx * sn2) * len;
            rzy = (azy * sn1 + bzy * sn2) * len;
            rzz = (azz * sn1 + bzz * sn2) * len;
        }

        // その他の要素を線形補間して、結果の書き出し
        // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
        xpl.Matrix4x4.load(
            d, d_off,
            rxx, ryx, rzx, atx * t1 + btx * t,
            rxy, ryy, rzy, aty * t1 + bty * t,
            rxz, ryz, rzz, atz * t1 + btz * t,
            axw * t1 + bxw * t, ayw * t1 + byw * t, azw * t1 + bzw * t, atw * t1 + btw * t,
            !column);
    };

    /**
     * 四元数を行列に変換します。
     *                          _
     * x_axis = q * (0; (1, 0, 0)) * q
     *                          _
     * y_axis = q * (0; (0, 1, 0)) * q
     *                          _
     * z_axis = q * (0; (0, 0, 1)) * q
     *
     *     | x_axis.x, y_axis.x, z_axis.x, 0 |
     * d = | x_axis.y, y_axis.y, z_axis.y, 0 |
     *     | x_axis.z, y_axis.z, z_axis.z, 0 |
     *     | 0,        0,        0,        1 |
     *
     * @param {number[]} m - 出力先の行列
     * @param {number} m_off - 出力先の行列の配列インデックス
     * @param {number[]} q - 入力元の四元数
     * @param {number} q_off - 入力元の四元数の配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.fromQuaternionv = function (m, m_off, q, q_off, column) {
        column = xpl.defaultValue(column, true);

        //                               _
        // X-axis = q * (0; (1, 0, 0)) * q
        //                               _
        // Y-axis = q * (0; (0, 1, 0)) * q
        //                               _
        // Z-axis = q * (0; (0, 0, 1)) * q

        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];

        // 共通項を算出
        let rr = rp * rp, ii = ip * ip, jj = jp * jp, kk = kp * kp;
        let ij2 = ip * jp * 2, ik2 = ip * kp * 2, jk2 = jp * kp * 2;
        let ri2 = rp * ip * 2, rj2 = rp * jp * 2, rk2 = rp * kp * 2;

        // 結果の書き出し
        xpl.Matrix4x4.load(
            m, m_off,
            ii + rr - kk - jj, ij2 - rk2, ik2 + rj2, 0,
            ij2 + rk2, jj + rr - ii - kk, jk2 - ri2, 0,
            ik2 - rj2, jk2 + ri2, kk + rr - jj - ii, 0,
            0, 0, 0, 1,
            !column);
    };

    /**
     * 四元数を行列に掛け合わせます。
     *                          _
     * x_axis = q * (0; (1, 0, 0)) * q
     *                          _
     * y_axis = q * (0; (0, 1, 0)) * q
     *                          _
     * z_axis = q * (0; (0, 0, 1)) * q
     *
     *      | x_axis.x, y_axis.x, z_axis.x, 0 |
     * d *= | x_axis.y, y_axis.y, z_axis.y, 0 |
     *      | x_axis.z, y_axis.z, z_axis.z, 0 |
     *      | 0,        0,        0,        1 |
     *
     * @param {number[]} m - 出力先の行列
     * @param {number} m_off - 出力先の行列の配列インデックス
     * @param {number[]} q - 入力元の四元数
     * @param {number} q_off - 入力元の四元数の配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulQuaternionv = function (m, m_off, q, q_off, column) {
        column = xpl.defaultValue(column, true);

        //                               _
        // X-axis = q * (0; (1, 0, 0)) * q
        //                               _
        // Y-axis = q * (0; (0, 1, 0)) * q
        //                               _
        // Z-axis = q * (0; (0, 0, 1)) * q

        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];

        // 共通項を算出
        let rr = rp * rp, ii = ip * ip, jj = jp * jp, kk = kp * kp;
        let ij2 = ip * jp * 2, ik2 = ip * kp * 2, jk2 = jp * kp * 2;
        let ri2 = rp * ip * 2, rj2 = rp * jp * 2, rk2 = rp * kp * 2;

        // 行列に掛けあわせて、結果の書き出し
        let a00 = m[m_off + M00], a01 = m[m_off + M01], a02 = m[m_off + M02];
        let a10 = m[m_off + M10], a11 = m[m_off + M11], a12 = m[m_off + M12];
        let a20 = m[m_off + M20], a21 = m[m_off + M21], a22 = m[m_off + M22];
        let a30 = m[m_off + M30], a31 = m[m_off + M31], a32 = m[m_off + M32];
        let b00 = ii + rr - kk - jj, b11 = jj + rr - ii - kk, b22 = kk + rr - jj - ii;
        let b01, b02, b10, b12, b20, b21;
        if (column) {
            b01 = ij2 - rk2;
            b02 = ik2 + rj2;
            b10 = ij2 + rk2;
            b12 = jk2 - ri2;
            b20 = ik2 - rj2;
            b21 = jk2 + ri2;
        } else {
            b01 = ij2 + rk2;
            b02 = ik2 - rj2;
            b10 = ij2 - rk2;
            b12 = jk2 + ri2;
            b20 = ik2 + rj2;
            b21 = jk2 - ri2;
        }
        m[m_off + M00] = a00 * b00 + a01 * b10 + a02 * b20;
        m[m_off + M01] = a00 * b01 + a01 * b11 + a02 * b21;
        m[m_off + M02] = a00 * b02 + a01 * b12 + a02 * b22;
        m[m_off + M10] = a10 * b00 + a11 * b10 + a12 * b20;
        m[m_off + M11] = a10 * b01 + a11 * b11 + a12 * b21;
        m[m_off + M12] = a10 * b02 + a11 * b12 + a12 * b22;
        m[m_off + M20] = a20 * b00 + a21 * b10 + a22 * b20;
        m[m_off + M21] = a20 * b01 + a21 * b11 + a22 * b21;
        m[m_off + M22] = a20 * b02 + a21 * b12 + a22 * b22;
        m[m_off + M30] = a30 * b00 + a31 * b10 + a32 * b20;
        m[m_off + M31] = a30 * b01 + a31 * b11 + a32 * b21;
        m[m_off + M32] = a30 * b02 + a31 * b12 + a32 * b22;
    };

    /**
     * 四元数を行列の軸要素に掛け合わせます。
     *                          _
     * x_axis = q * (0; (1, 0, 0)) * q
     *                          _
     * y_axis = q * (0; (0, 1, 0)) * q
     *                          _
     * z_axis = q * (0; (0, 0, 1)) * q
     *
     *      | x_axis.x, y_axis.x, z_axis.x |
     * d *= | x_axis.y, y_axis.y, z_axis.y |
     *      | x_axis.z, y_axis.z, z_axis.z |
     *
     * @param {number[]} m - 出力先の行列
     * @param {number} m_off - 出力先の行列の配列インデックス
     * @param {number[]} q - 入力元の四元数
     * @param {number} q_off - 入力元の四元数の配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.mulQuaternionAxisv = function (m, m_off, q, q_off, column) {
        column = xpl.defaultValue(column, true);

        //                               _
        // X-axis = q * (0; (1, 0, 0)) * q
        //                               _
        // Y-axis = q * (0; (0, 1, 0)) * q
        //                               _
        // Z-axis = q * (0; (0, 0, 1)) * q

        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];

        // 共通項を算出
        let rr = rp * rp, ii = ip * ip, jj = jp * jp, kk = kp * kp;
        let ij2 = ip * jp * 2, ik2 = ip * kp * 2, jk2 = jp * kp * 2;
        let ri2 = rp * ip * 2, rj2 = rp * jp * 2, rk2 = rp * kp * 2;

        // 行列に掛けあわせて、結果の書き出し
        let a00 = m[m_off + M00], a01 = m[m_off + M01], a02 = m[m_off + M02];
        let a10 = m[m_off + M10], a11 = m[m_off + M11], a12 = m[m_off + M12];
        let a20 = m[m_off + M20], a21 = m[m_off + M21], a22 = m[m_off + M22];
        let b00 = ii + rr - kk - jj, b11 = jj + rr - ii - kk, b22 = kk + rr - jj - ii;
        let b01, b02, b10, b12, b20, b21;
        if (column) {
            b01 = ij2 - rk2;
            b02 = ik2 + rj2;
            b10 = ij2 + rk2;
            b12 = jk2 - ri2;
            b20 = ik2 - rj2;
            b21 = jk2 + ri2;
        } else {
            b01 = ij2 + rk2;
            b02 = ik2 - rj2;
            b10 = ij2 - rk2;
            b12 = jk2 + ri2;
            b20 = ik2 + rj2;
            b21 = jk2 - ri2;
        }
        m[m_off + M00] = a00 * b00 + a01 * b10 + a02 * b20;
        m[m_off + M01] = a00 * b01 + a01 * b11 + a02 * b21;
        m[m_off + M02] = a00 * b02 + a01 * b12 + a02 * b22;
        m[m_off + M10] = a10 * b00 + a11 * b10 + a12 * b20;
        m[m_off + M11] = a10 * b01 + a11 * b11 + a12 * b21;
        m[m_off + M12] = a10 * b02 + a11 * b12 + a12 * b22;
        m[m_off + M20] = a20 * b00 + a21 * b10 + a22 * b20;
        m[m_off + M21] = a20 * b01 + a21 * b11 + a22 * b21;
        m[m_off + M22] = a20 * b02 + a21 * b12 + a22 * b22;
    };

    /**
     * 行列から四元数に変換します。
     *
     * @param {number[]} q - 出力先の四元数
     * @param {number} q_off - 出力先の四元数の配列インデックス
     * @param {number[]} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @param {number} [reverse=false] - 虚数部の符号を反転させるかどうか
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     */
    xpl.Matrix4x4.toQuaternionv = function (q, q_off, m, m_off, reverse, column) {
        reverse = xpl.defaultValue(reverse, false);
        column = xpl.defaultValue(column, true);

        //   X-axis,             Y-axis,             Z-axis,
        // | ii  + rr - kk - jj, ij2 - rk2,          ik2 + rj2,          n |
        // | ij2 + rk2,          jj  + rr - ii - kk, jk2 - ri2,          n |
        // | ik2 - rj2,          jk2 + ri2,          kk  + rr - jj - ii, n |
        // | n,                  n,                  n,                  n |

        let m00 = m[m_off + M00];
        let m11 = m[m_off + M11];
        let m22 = m[m_off + M22];
        let m01, m02, m10, m12, m20, m21;
        if (column) {
            m01 = m[m_off + M01];
            m02 = m[m_off + M02];
            m10 = m[m_off + M10];
            m12 = m[m_off + M12];
            m20 = m[m_off + M20];
            m21 = m[m_off + M21];
        } else {
            m01 = m[m_off + M10];
            m02 = m[m_off + M20];
            m10 = m[m_off + M01];
            m12 = m[m_off + M21];
            m20 = m[m_off + M02];
            m21 = m[m_off + M12];
        }

        // 行列の拡大率を算出
        // scale = √(|(x_axis × yAxis) ・ z_axis|^(1.0 / 3.0))
        //       = |(x_axis × yAxis) ・ z_axis|^(1.0 / 6.0)
        let scale = (m10 * m21 - m20 * m11) * m02 +
            (m20 * m01 - m00 * m21) * m12 +
            (m00 * m11 - m10 * m01) * m22;
        let is_imaginary = scale < 0;
        if (scale != 0) {
            scale = Math.pow(Math.abs(scale), 1.0 / 3.0);
            m00 /= scale;
            m10 /= scale;
            m20 /= scale;
            m01 /= scale;
            m11 /= scale;
            m21 /= scale;
            m02 /= scale;
            m12 /= scale;
            m22 /= scale;
            scale = Math.sqrt(scale);
        }

        // sin値と軸ベクトルを算出
        //   (v * 4 * sinθ * cosθ) / 2.0
        // = (v * 2 * sin2θ) / 2.0
        // = v * sin2θ
        let ip = (m21 - m12) * 0.5;
        let jp = (m02 - m20) * 0.5;
        let kp = (m10 - m01) * 0.5;
        let sn = ip * ip + jp * jp + kp * kp;
        if (0 < sn) {
            sn = Math.sqrt(sn);
            if (!is_imaginary) {
                // 軸ベクトルの絶対値が実数の場合
                // 0 <= |axis|
                ip /= sn;
                jp /= sn;
                kp /= sn;
            } else {
                // 軸ベクトルの絶対値が虚数の場合
                // 0 > |axis|
                ip /= -sn;
                jp /= -sn;
                kp /= -sn;
            }
        }

        // cos値を算出
        let cs = xpl.MathUtils.mid((m00 + m11 + m22 - 1.0) * 0.5, 1, -1);
        if (!is_imaginary) {
            // 四元数の絶対値が実数の場合
            //   (rr + rr + rr - ii - jj - kk - 1.0) / 2.0
            // = (3 * cos^2(θ) - |v| * sin^2(θ) - 1.0) / 2.0
            // = ((2 * cos^2(θ) - 1.0) - (cos^2(θ) - 1.0 * sin^2(θ))) / 2.0
            // = (cos2θ + cos2θ) / 2.0
            // = cos2θ
            cs = xpl.MathUtils.mid((m00 + m11 + m22 - 1.0) * 0.5, 1, -1);
        } else {
            // 四元数の絶対値が虚数の場合
            //   -(rr + rr + rr + ii + jj + kk + 1.0) / 2.0
            // = -(3 * -cos^2(θ) - |v * i| * sin^2(θ) + 1.0) / 2.0
            // = -((2 * -cos^2(θ) + 1.0) - (-cos^2(θ) + 1.0 * sin^2(θ))) / 2.0
            // = -(-cos2θ - cos2θ) / 2.0
            // = cos2θ
            cs = -xpl.MathUtils.mid((m00 + m11 + m22 + 1.0) * 0.5, 1, -1);
        }

        // 半角のsin値とcos値を算出
        let rad = Math.acos(cs) * 0.5;
        cs = Math.cos(rad);
        sn = Math.sin(rad);

        // 結果の書き出し
        if (!reverse) {
            q[q_off + CR] = scale * -cs;
            q[q_off + CI] = scale * -sn * ip;
            q[q_off + CJ] = scale * -sn * jp;
            q[q_off + CK] = scale * -sn * kp;
        } else {
            q[q_off + CR] = scale * cs;
            q[q_off + CI] = scale * sn * ip;
            q[q_off + CJ] = scale * sn * jp;
            q[q_off + CK] = scale * sn * kp;
        }
    };

    /**
     * 行列を回転軸と回転角度に変換します。
     * 回転軸は引数のベクトルに出力し、回転角度は戻り値として出力します。
     *
     * @param {number[]} v - 出力先のベクトル
     * @param {number} v_off - 出力先のベクトルの配列インデックス
     * @param {number[]} m - 入力元の行列
     * @param {number} m_off - 入力元の行列の配列インデックス
     * @param {boolean} [column=true] - 処理対象のベクトルが列ベクトルかどうか
     * @returns {number} 回転のラジアン値
     */
    xpl.Matrix4x4.toRotateAxisv = function (v, v_off, m, m_off, column) {
        column = xpl.defaultValue(column, true);

        //   X-axis,                     Y-axis,                 Z-axis,
        // | x^2 (1 - cosθ) +  cosθ, xy  (1 - cosθ) - zsinθ, xz  (1 - cosθ) + ysinθ, n |
        // | xy  (1 - cosθ) + zsinθ, y^2 (1 - cosθ) +  cosθ, yz  (1 - cosθ) - xsinθ, n |
        // | xz  (1 - cosθ) - ysinθ, yz  (1 - cosθ) + xsinθ, z^2 (1 - cosθ) +  cosθ, n |
        // | n,                      n,                      n,                      n |

        let m00 = m[m_off + M00];
        let m11 = m[m_off + M11];
        let m22 = m[m_off + M22];
        let m01, m02, m10, m12, m20, m21;
        if (column) {
            m01 = m[m_off + M01];
            m02 = m[m_off + M02];
            m10 = m[m_off + M10];
            m12 = m[m_off + M12];
            m20 = m[m_off + M20];
            m21 = m[m_off + M21];
        } else {
            m01 = m[m_off + M10];
            m02 = m[m_off + M20];
            m10 = m[m_off + M01];
            m12 = m[m_off + M21];
            m20 = m[m_off + M02];
            m21 = m[m_off + M12];
        }
        let xycs = (m01 + m10) * 0.5; // xy (1 - cosθ)
        let xzcs = (m20 + m02) * 0.5; // xz (1 - cosθ)
        let yzcs = (m12 + m21) * 0.5; // yz (1 - cosθ)
        let xxcs = yzcs != 0 ? Math.abs((xycs * xzcs) / yzcs) : 0; // x^2 (1 - cosθ)
        let yycs = xzcs != 0 ? Math.abs((xycs * yzcs) / xzcs) : 0; // y^2 (1 - cosθ)
        let zzcs = xycs != 0 ? Math.abs((xzcs * yzcs) / xycs) : 0; // z^2 (1 - cosθ)

        // 回転の要素となる複素数を算出
        let cs = Math.min(m00 - xxcs, m11 - yycs, m22 - zzcs); // |axis| cosθ
        let xsn = (m12 - m21) * 0.5; // x sinθ
        let ysn = (m20 - m02) * 0.5; // y sinθ
        let zsn = (m01 - m10) * 0.5; // z sinθ
        let sn = xsn * xsn + ysn * ysn + zsn * zsn; // (|axis| sinθ)^2

        // 複素数を正規化
        let norm = cs * cs + sn;
        if (0 < norm) {
            cs /= Math.sqrt(norm);
        }
        if (1.0 <= cs) {
            v[v_off + VX] = 0;
            v[v_off + VY] = 0;
            v[v_off + VZ] = 0;
            return 0;
        }

        // 回転軸を算出して、結果を書き出す
        if (0 < sn) {
            sn = Math.sqrt(sn);
            v[v_off + VX] = -xsn / sn;
            v[v_off + VY] = -ysn / sn;
            v[v_off + VZ] = -zsn / sn;
        } else {
            v[v_off + VX] = 0;
            v[v_off + VY] = 0;
            v[v_off + VZ] = 0;
        }
        return Math.acos(cs);
    };

})(xpl);
