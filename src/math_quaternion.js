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

    /**
     * 四元数のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.Quaternion = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * 任意の数値を四元数に読み込ませます。
     *
     * d = (a, b, c, d)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp - 入力元の四元数の実数部
     * @param {number} ip - 入力元の四元数の虚数I部
     * @param {number} jp - 入力元の四元数の虚数J部
     * @param {number} kp - 入力元の四元数の虚数K部
     */
    xpl.Quaternion.load = function (d, d_off, rp, ip, jp, kp) {
        d[d_off + CR] = rp;
        d[d_off + CI] = ip;
        d[d_off + CJ] = jp;
        d[d_off + CK] = kp;
    };

    /**
     * 任意の数値を四元数に読み込ませます。
     *
     * d = (a, b, c, d)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 入力元の四元数
     * @param {number} q_off - 入力元の四元数の配列インデックス
     */
    xpl.Quaternion.loadv = function (d, d_off, q, q_off) {
        xpl.Quaternion.load(d, d_off, q[q_off + CR], q[q_off + CI], q[q_off + CJ], q[q_off + CK]);
    };

    /**
     * 全ての要素が0の値を四元数に読み込ませます。
     *
     * d = (0, 0, 0, 0)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - The 出力先の四元数の配列インデックス
     */
    xpl.Quaternion.loadZero = function (d, d_off) {
        xpl.Quaternion.load(d, d_off, 0, 0, 0, 0);
    };

    /**
     * 単位値を四元数に読み込ませます。
     *
     * d = (1, 0, 0, 0)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     */
    xpl.Quaternion.loadIdentity = function (d, d_off) {
        xpl.Quaternion.load(d, d_off, 1, 0, 0, 0);
    };

    /**
     * 四元数の絶対値の2乗の値を算出します。
     *
     * d = |q|^2
     *
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @returns {number} 四元数の絶対値の2乗の値
     */
    xpl.Quaternion.absSq = function (q, q_off) {
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        return rp * rp + ip * ip + jp * jp + kp * kp;
    };

    /**
     * 四元数の絶対値を算出します。
     *
     * d = |q|
     *
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @returns {number} 四元数の絶対値
     */
    xpl.Quaternion.abs = function (q, q_off) {
        return Math.sqrt(xpl.Quaternion.absSq(q, q_off));
    };

    /**
     * 四元数を正規化します。
     *
     * d = q / |q|
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     */
    xpl.Quaternion.normalizev = function (d, d_off, q, q_off) {
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        let len = rp * rp + ip * ip + jp * jp + kp * kp;
        if (0 < len) {
            len = Math.sqrt(len);
            xpl.Quaternion.load(d, d_off, rp / len, ip / len, jp / len, kp / len);
        } else {
            xpl.Quaternion.loadZero(d, d_off);
        }
    };

    /**
     * ネイピア数を底として指数を算出します。
     *
     * d = e^q
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp - 指数部の四元数の実数部
     * @param {number} ip - 指数部の四元数の虚数I部
     * @param {number} jp - 指数部の四元数の虚数J部
     * @param {number} kp - 指数部の四元数の虚数K部
     */
    xpl.Quaternion.exp = function (d, d_off, rp, ip, jp, kp) {
        // e^(a + bi + cj + dk) = e^(a + v) = e^a * (cos|v| + (v / |v|) * sin|v|)
        let aexp = Math.exp(rp);                            // e^a
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp); // |v| = √(bi^2 + cj^2 + dk^2)
        let vscale = aexp * Math.sin(vnorm) / vnorm;        // e^a * sin|v| / |v|
        xpl.Quaternion.load(
            d, d_off,
            aexp * Math.cos(vnorm),                         // e^2 * cos|v|
            ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * ネイピア数を底として指数を算出します。
     *
     * d = e^q
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 指数部の四元数
     * @param {number} q_off - 指数部の四元数の配列インデックス
     */
    xpl.Quaternion.expv = function (d, d_off, q, q_off) {
        xpl.Quaternion.exp(d, d_off, q[q_off + CR], q[q_off + CI], q[q_off + CJ], q[q_off + CK]);
    };

    /**
     * ネイピア数を底として純虚数の指数を算出します。
     *
     * d = e^iv
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} ip - 指数部の虚数I部
     * @param {number} jp - 指数部の虚数J部
     * @param {number} kp - 指数部の虚数K部
     */
    xpl.Quaternion.cis = function (d, d_off, ip, jp, kp) {
        // e^(bi + cj + dk) = e^v = cos|v| + (v / |v|) * sin|v|
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp); // |v| = √(bi^2 + cj^2 + dk^2)
        let vscale = Math.sin(vnorm) / vnorm;               // e^a * sin|v| / |v|
        xpl.Quaternion.load(
            d, d_off,
            Math.cos(vnorm),                                // cos|v|
            ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * ネイピア数を底として純虚数の指数を算出します。
     *
     * d = e^iv
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} v - 指数部の虚数ベクトル
     * @param {number} v_off - 指数部の虚数ベクトルの配列インデックス
     */
    xpl.Quaternion.cisv = function (d, d_off, v, v_off) {
        xpl.Quaternion.cis(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ]);
    };

    /**
     * 対数を算出します。
     *
     * d = log(q)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp - 対象の四元数の実数部
     * @param {number} ip - 対象の四元数の虚数I部
     * @param {number} jp - 対象の四元数の虚数J部
     * @param {number} kp - 対象の四元数の虚数K部
     */
    xpl.Quaternion.log = function (d, d_off, rp, ip, jp, kp) {
        // ln(a + bi + cj + dk) = ln(a + v) = ln(q) = ln|q| + v / |v| * cos^-1 (a / |q|)
        let qnorm = Math.sqrt(rp * rp + ip * ip + jp * jp + kp * kp); // |q| = √(a^2 + bi^2 + cj^2 + dk^2)
        let qln = Math.log(qnorm);                                    // ln|q|
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp);           // |v| = √(bi^2 + cj^2 + dk^2)
        let vscale = Math.acos(rp / qnorm) / vnorm;                   // cos^-1 (a / |q|) / |v|
        xpl.Quaternion.load(d, d_off, qln, ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * 対数を算出します。
     *
     * d = log(q)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     */
    xpl.Quaternion.logv = function (d, d_off, q, q_off) {
        xpl.Quaternion.log(d, d_off, q[q_off + CR], q[q_off + CI], q[q_off + CJ], q[q_off + CK]);
    };

    /**
     * 2つの四元数を線形補間します。
     *
     * d = lerp(q1, q2; t)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 開始の四元数の実数部
     * @param {number} ip1 - 開始の四元数の虚数I部
     * @param {number} jp1 - 開始の四元数の虚数J部
     * @param {number} kp1 - 開始の四元数の虚数K部
     * @param {number} rp2 - 終了の四元数の実数部
     * @param {number} ip2 - 終了の四元数の虚数I部
     * @param {number} jp2 - 終了の四元数の虚数J部
     * @param {number} kp2 - 終了の四元数の虚数K部
     * @param {number} t - 補間係数
     */
    xpl.Quaternion.lerp = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2, t) {
        // lerp(p1, p2; t) = (1.0 - t) * p1 + t * p2
        let t1 = 1.0 - t;
        xpl.Quaternion.load(
            d, d_off,
            rp1 * t1 + rp2 * t,
            ip1 * t1 + ip2 * t,
            jp1 * t1 + jp2 * t,
            kp1 * t1 + kp2 * t);
    };

    /**
     * 2つの四元数を線形補間します。
     *
     * d = lerp(q1, q2; t)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 開始の四元数
     * @param {number} q1_off - 開始の四元数の配列インデックス
     * @param {number[]} q2 - 終了の四元数
     * @param {number} q2_off - 終了の四元数の配列インデックス
     * @param {number} t - 補間係数
     */
    xpl.Quaternion.lerpv = function (d, d_off, q1, q1_off, q2, q2_off, t) {
        xpl.Quaternion.lerp(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK],
            t);
    };

    /**
     * 2つの四元数を球面線形補間します。
     *
     * d = slerp(q1, q2; t)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 開始の四元数の実数部
     * @param {number} ip1 - 開始の四元数の虚数I部
     * @param {number} jp1 - 開始の四元数の虚数J部
     * @param {number} kp1 - 開始の四元数の虚数K部
     * @param {number} rp2 - 終了の四元数の実数部
     * @param {number} ip2 - 終了の四元数の虚数I部
     * @param {number} jp2 - 終了の四元数の虚数J部
     * @param {number} kp2 - 終了の四元数の虚数K部
     * @param {number} t - 補間係数
     */
    xpl.Quaternion.slerp = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2, t) {
        // 開始の四元数の正規化
        let abs1 = rp1 * rp1 + ip1 * ip1 + jp1 * jp1 + kp1 * kp1;
        if (0 < abs1) {
            abs1 = Math.sqrt(abs1);
            rp1 /= abs1;
            ip1 /= abs1;
            jp1 /= abs1;
            kp1 /= abs1;
        }

        // 終了の四元数の正規化
        let abs2 = rp2 * rp2 + ip2 * ip2 + jp2 * jp2 + kp2 * kp2;
        if (0 < abs2) {
            abs2 = Math.sqrt(abs2);
            rp2 /= abs2;
            ip2 /= abs2;
            jp2 /= abs2;
            kp2 /= abs2;
        }

        // 四元数同士のcos値を算出
        let cs = rp1 * rp2 + ip1 * ip2 + jp1 * jp2 + kp1 * kp2;

        if (1.0 <= cs) {
            // 2つの四元数の向きが同一の場合
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) + abs2 * t;
            xpl.Quaternion.load(d, d_off, rp1 * abs, ip1 * abs, jp1 * abs, kp1 * abs);
        } else if (cs <= -1.0) {
            // 2つの四元数の向きが真逆の場合
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) - abs2 * t;
            xpl.Quaternion.load(d, d_off, rp1 * abs, ip1 * abs, jp1 * abs, kp1 * abs);
        } else {
            // その他の場合

            // 四元数の絶対値を線形補間
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) + abs2 * t;

            // 四元数の方向を球面線形補間
            // slerp(p0, p1; t) = (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(cs);
            let rad2 = rad1 * (1.0 - t);
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // 結果の書き出し
            xpl.Quaternion.load(
                d, d_off,
                (rp1 * sn1 + rp2 * sn2) * abs,
                (ip1 * sn1 + ip2 * sn2) * abs,
                (jp1 * sn1 + jp2 * sn2) * abs,
                (kp1 * sn1 + kp2 * sn2) * abs);
        }
    };

    /**
     * 2つの四元数を球面線形補間します。
     *
     * d = slerp(q1, q2; t)
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 開始の四元数
     * @param {number} q1_off - 開始の四元数の配列インデックス
     * @param {number[]} q2 - 終了の四元数
     * @param {number} q2_off - 終了の四元数の配列インデックス
     * @param {number} t - 補間係数
     */
    xpl.Quaternion.slerpv = function (d, d_off, q1, q1_off, q2, q2_off, t) {
        xpl.Quaternion.slerp(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK],
            t);
    };

    /**
     * 内積を算出します。
     *
     * d = a1 ・ a2
     *
     * @param {number} rp1 - 演算子の左側の四元数の実数部
     * @param {number} ip1 - 演算子の左側の四元数の虚数I部
     * @param {number} jp1 - 演算子の左側の四元数の虚数J部
     * @param {number} kp1 - 演算子の左側の四元数の虚数K部
     * @param {number} rp2 - 演算子の右側の四元数の実数部
     * @param {number} ip2 - 演算子の右側の四元数の虚数I部
     * @param {number} jp2 - 演算子の右側の四元数の虚数J部
     * @param {number} kp2 - 演算子の右側の四元数の虚数K部
     * @returns {number} 内積値
     */
    xpl.Quaternion.dot = function (rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        return rp1 * rp2 + ip1 * ip2 + jp1 * jp2 + kp1 * kp2;
    };

    /**
     * 内積を算出します。
     *
     * d = a1 ・ a2
     *
     * @param {number[]} q1 - 演算子の左側の四元数
     * @param {number} q1_off - 演算子の左側の四元数の配列インデックス
     * @param {number[]} q2 - 演算子の右側の四元数
     * @param {number} q2_off - 演算子の右側の四元数の配列インデックス
     * @returns {number} 内積値
     */
    xpl.Quaternion.dotv = function (q1, q1_off, q2, q2_off) {
        return q1[q1_off + CR] * q2[q2_off + CR] +
            q1[q1_off + CI] * q2[q2_off + CI] +
            q1[q1_off + CJ] * q2[q2_off + CJ] +
            q1[q1_off + CK] * q2[q2_off + CK];
    };

    /**
     * 共役を算出します。
     *     _
     * d = q
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     */
    xpl.Quaternion.conjugatev = function (d, d_off, q, q_off) {
        xpl.Quaternion.load(d, d_off, q[q_off + CR], -q[q_off + CI], -q[q_off + CJ], -q[q_off + CK]);
    };

    /**
     * 符号を反転させます。
     *
     * d = -q
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     */
    xpl.Quaternion.reversev = function (d, d_off, q, q_off) {
        xpl.Quaternion.load(d, d_off, -q[q_off + CR], -q[q_off + CI], -q[q_off + CJ], -q[q_off + CK]);
    };

    /**
     * 逆数を算出します。
     *
     * d = q^-1
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     */
    xpl.Quaternion.inversev = function (d, d_off, q, q_off) {
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        let det = rp * rp + ip * ip + jp * jp + kp * kp;
        if (0 < det) {
            det = Math.sqrt(det);
            rp /= det;
            ip /= -det;
            jp /= -det;
            kp /= -det;
        }
        xpl.Quaternion.load(d, d_off, rp, ip, jp, kp);
    };

    /**
     * 四元数の加算をします。
     *
     * d = q1 + q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 演算子の左側の四元数の実数部
     * @param {number} ip1 - 演算子の左側の四元数の虚数I部
     * @param {number} jp1 - 演算子の左側の四元数の虚数J部
     * @param {number} kp1 - 演算子の左側の四元数の虚数K部
     * @param {number} rp2 - 演算子の右側の四元数の実数部
     * @param {number} ip2 - 演算子の右側の四元数の虚数I部
     * @param {number} jp2 - 演算子の右側の四元数の虚数J部
     * @param {number} kp2 - 演算子の右側の四元数の虚数K部
     */
    xpl.Quaternion.add = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        xpl.Quaternion.load(d, d_off, rp1 + rp2, ip1 + ip2, jp1 + jp2, kp1 + kp2);
    };

    /**
     * 四元数の加算をします。
     *
     * d = q1 + q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 演算子の左側の四元数
     * @param {number} q1_off - 演算子の左側の四元数の配列インデックス
     * @param {number[]} q2 - 演算子の右側の四元数
     * @param {number} q2_off - 演算子の右側の四元数の配列インデックス
     */
    xpl.Quaternion.addv = function (d, d_off, q1, q1_off, q2, q2_off) {
        xpl.Quaternion.add(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK]);
    };

    /**
     * 四元数の減算をします。
     *
     * d = q1 - q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 演算子の左側の四元数の実数部
     * @param {number} ip1 - 演算子の左側の四元数の虚数I部
     * @param {number} jp1 - 演算子の左側の四元数の虚数J部
     * @param {number} kp1 - 演算子の左側の四元数の虚数K部
     * @param {number} rp2 - 演算子の右側の四元数の実数部
     * @param {number} ip2 - 演算子の右側の四元数の虚数I部
     * @param {number} jp2 - 演算子の右側の四元数の虚数J部
     * @param {number} kp2 - 演算子の右側の四元数の虚数K部
     */
    xpl.Quaternion.sub = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        xpl.Quaternion.load(d, d_off, rp1 - rp2, ip1 - ip2, jp1 - jp2, kp1 - kp2);
    };

    /**
     * 四元数の減算をします。
     *
     * d = q1 - q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 演算子の左側の四元数
     * @param {number} q1_off - 演算子の左側の四元数の配列インデックス
     * @param {number[]} q2 - 演算子の右側の四元数
     * @param {number} q2_off - 演算子の右側の四元数の配列インデックス
     */
    xpl.Quaternion.subv = function (d, d_off, q1, q1_off, q2, q2_off) {
        xpl.Quaternion.sub(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK]);
    };

    /**
     * 四元数の掛け算をします。
     *
     * d = q1 * q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 演算子の左側の四元数の実数部
     * @param {number} ip1 - 演算子の左側の四元数の虚数I部
     * @param {number} jp1 - 演算子の左側の四元数の虚数J部
     * @param {number} kp1 - 演算子の左側の四元数の虚数K部
     * @param {number} rp2 - 演算子の右側の四元数の実数部
     * @param {number} ip2 - 演算子の右側の四元数の虚数I部
     * @param {number} jp2 - 演算子の右側の四元数の虚数J部
     * @param {number} kp2 - 演算子の右側の四元数の虚数K部
     */
    xpl.Quaternion.mul = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        xpl.Quaternion.load(
            d, d_off,
            rp1 * rp2 - (ip1 * ip2 + jp1 * jp2 + kp1 * kp2),
            rp1 * ip2 + ip1 * rp2 + (jp1 * kp2 - kp1 * jp2),
            rp1 * jp2 + jp1 * rp2 + (kp1 * ip2 - ip1 * kp2),
            rp1 * kp2 + kp1 * rp2 + (ip1 * jp2 - jp1 * ip2));
    };

    /**
     * 四元数の掛け算をします。
     *
     * d = q1 * q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 演算子の左側の四元数
     * @param {number} q1_off - 演算子の左側の四元数の配列インデックス
     * @param {number[]} q2 - 演算子の右側の四元数
     * @param {number} q2_off - 演算子の右側の四元数の配列インデックス
     */
    xpl.Quaternion.mulv = function (d, d_off, q1, q1_off, q2, q2_off) {
        xpl.Quaternion.mul(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK]);
    };

    /**
     * 四元数とスカラの掛け算をします。
     *
     * d = q * s
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp - 対象の四元数の実数部
     * @param {number} ip - 対象の四元数の虚数I部
     * @param {number} jp - 対象の四元数の虚数J部
     * @param {number} kp - 対象の四元数の虚数K部
     * @param {number} s - 対象のスカラ
     */
    xpl.Quaternion.mulScalar = function (d, d_off, rp, ip, jp, kp, s) {
        xpl.Quaternion.load(d, d_off, rp * s, ip * s, jp * s, kp * s);
    };

    /**
     * 四元数とスカラの掛け算をします。
     *
     * d = q * s
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} s - 対象のスカラ
     */
    xpl.Quaternion.mulScalarv = function (d, d_off, q, q_off, s) {
        xpl.Quaternion.mulScalar(d, d_off, q[q_off + CR], q[q_off + CI], q[q_off + CJ], q[q_off + CK], s);
    };

    /**
     * 四元数を割り算します。
     *
     * d = q1 / q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp1 - 演算子の左側の四元数の実数部
     * @param {number} ip1 - 演算子の左側の四元数の虚数I部
     * @param {number} jp1 - 演算子の左側の四元数の虚数J部
     * @param {number} kp1 - 演算子の左側の四元数の虚数K部
     * @param {number} rp2 - 演算子の右側の四元数の実数部
     * @param {number} ip2 - 演算子の右側の四元数の虚数I部
     * @param {number} jp2 - 演算子の右側の四元数の虚数J部
     * @param {number} kp2 - 演算子の右側の四元数の虚数K部
     */
    xpl.Quaternion.div = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = (r1r2 - i1 ・ i2) / (r2^2 + i2^2), ip = (r1i2 + r2i1 + i1 × i2) / (r2^2 + i2^2)
        let det = rp2 * rp2 + ip2 * ip2 + jp2 * jp2 + kp2 * kp2;
        xpl.Quaternion.load(
            d, d_off,
            (  rp1 * rp2 + (ip1 * ip2 + jp1 * jp2 + kp1 * kp2)) / det,
            (-rp1 * ip2 + ip1 * rp2 - (jp1 * kp2 - kp1 * jp2)) / det,
            (-rp1 * jp2 + jp1 * rp2 - (kp1 * ip2 - ip1 * kp2)) / det,
            (-rp1 * kp2 + kp1 * rp2 - (ip1 * jp2 - jp1 * ip2)) / det);
    };

    /**
     * 四元数の割り算をします。
     *
     * d = q1 / q2
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q1 - 演算子の左側の四元数
     * @param {number} q1_off - 演算子の左側の四元数の配列インデックス
     * @param {number[]} q2 - 演算子の右側の四元数
     * @param {number} q2_off - 演算子の右側の四元数の配列インデックス
     */
    xpl.Quaternion.divv = function (d, d_off, q1, q1_off, q2, q2_off) {
        xpl.Quaternion.div(
            d, d_off,
            q1[q1_off + CR], q1[q1_off + CI], q1[q1_off + CJ], q1[q1_off + CK],
            q2[q2_off + CR], q2[q2_off + CI], q2[q2_off + CJ], q2[q2_off + CK]);
    };

    /**
     * 四元数とスカラの割り算をします。
     *
     * d = q / s
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rp - 対象の四元数の実数部
     * @param {number} ip - 対象の四元数の虚数I部
     * @param {number} jp - 対象の四元数の虚数J部
     * @param {number} kp - 対象の四元数の虚数K部
     * @param {number} s - 対象のスカラ
     */
    xpl.Quaternion.divScalar = function (d, d_off, rp, ip, jp, kp, s) {
        xpl.Quaternion.load(d, d_off, rp / s, ip / s, jp / s, kp / s);
    };

    /**
     * 四元数とスカラの割り算をします。
     *
     * d = q / s
     *
     * @param {number[]} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number[]} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} s - 対象のスカラ
     */
    xpl.Quaternion.divScalarv = function (d, d_off, q, q_off, s) {
        xpl.Quaternion.divScalar(d, d_off, q[q_off + CR], q[q_off + CI], q[q_off + CJ], q[q_off + CK], s);
    };

    /**
     * 四元数の文字列表現を返します。
     *
     * @param {number[]} q - 対象の四元数
     * @param {number} off - 対象の四元数の配列インデックス
     * @returns {string} 四元数から変換された文字列
     */
    xpl.Quaternion.convertToString = function (q, off) {
        return "Quaternion(" + q[off + CR] + ", " + q[off + CI] + ", " + q[off + CJ] + ", " + q[off + CK] + ")";
    };

})(xpl);
