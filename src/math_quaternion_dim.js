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

/**
 * 3次元の幾何学に特化した機能を四元数のユーティリティクラスに追加する拡張です。
 */
(function (ns) {

    "use strict";

    if (ns.Quaternion == null) {
        return;
    }

    const VX = 0, VY = 1, VZ = 2;
    const CR = 0, CI = 1, CJ = 2, CK = 3;

    /**
     * I軸(X軸)の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2), sin(rad / 2), 0, 0)
     *
     * @memberof xpl.Quaternion
     * @function loadIAxisRotate
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.loadIAxisRotate = function (d, d_off, rad) {
        rad *= 0.5;
        ns.Quaternion.load(d, d_off, Math.cos(rad), Math.sin(rad), 0, 0);
    };

    /**
     * J軸(Y軸)の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2), 0, sin(rad / 2), 0)
     *
     * @memberof xpl.Quaternion
     * @function loadJAxisRotate
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.loadJAxisRotate = function (d, d_off, rad) {
        rad *= 0.5;
        ns.Quaternion.load(d, d_off, Math.cos(rad), 0, Math.sin(rad), 0);
    };

    /**
     * K軸(Z軸)の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2), 0, 0, sin(rad / 2))
     *
     * @memberof xpl.Quaternion
     * @function loadKAxisRotate
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.loadKAxisRotate = function (d, d_off, rad) {
        rad *= 0.5;
        ns.Quaternion.load(d, d_off, Math.cos(rad), 0, 0, Math.sin(rad));
    };

    /**
     * 任意軸の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2); v * sin(rad / 2))
     *
     * @memberof xpl.Quaternion
     * @function loadRotate
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} ip - 入力元の四元数の虚数I部
     * @param {number} jp - 入力元の四元数の虚数J部
     * @param {number} kp - 入力元の四元数の虚数K部
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [norm=true] - 入力元の四元数を正規化するかどうか
     */
    ns.Quaternion.loadRotate = function (d, d_off, ip, jp, kp, rad, norm) {
        norm = ns.defaultValue(norm, true);

        // 四元数を正規化
        if (norm) {
            let len = ip * ip + jp * jp + kp * kp;
            if (0 < len) {
                len = Math.sqrt(len);
                ip /= len;
                jp /= len;
                kp /= len;
            }
        }

        // 結果の書き出し
        rad *= 0.5;
        let sn = Math.sin(rad);
        ns.Quaternion.load(d, d_off, Math.cos(rad), ip * sn, jp * sn, kp * sn);
    };

    /**
     * 2つのベクトルの回転を四元数に読み込ませます。
     *
     * rad = acos(from ・ to) / 2 * t
     * axis = from × to
     * x = (cos(rad); axis * sin(rad))
     *
     * @memberof xpl.Quaternion
     * @function loadRotateVector3
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {number} fx - 開始のベクトルのX要素
     * @param {number} fy - 開始のベクトルのY要素
     * @param {number} fz - 開始のベクトルのZ要素
     * @param {boolean} fv_norm - 開始のベクトルを正規化するかどうか
     * @param {number} tx - 終了のベクトルのX要素
     * @param {number} ty - 終了のベクトルのY要素
     * @param {number} tz - 終了のベクトルのZ要素
     * @param {boolean} tv_norm - 終了のベクトルを正規化するかどうか
     * @param {number} [t=1.0] - 補完係数
     */
    ns.Quaternion.loadRotateVector3 = function (d, d_off, fx, fy, fz, fv_norm, tx, ty, tz, tv_norm, t) {
        t = ns.defaultValue(t, 1.0);

        // 開始のベクトルを正規化
        if (fv_norm) {
            let f_len = fx * fx + fy * fy + fz * fz;
            if (0 < f_len) {
                f_len = Math.sqrt(f_len);
                fx /= f_len;
                fy /= f_len;
                fz /= f_len;
            } else {
                ns.Quaternion.loadIdentity(d, d_off);
                return;
            }
        }

        // 終了のベクトルを正規化
        if (tv_norm) {
            let t_len = tx * tx + ty * ty + tz * tz;
            if (0 < t_len) {
                t_len = Math.sqrt(t_len);
                tx /= t_len;
                ty /= t_len;
                tz /= t_len;
            } else {
                ns.Quaternion.loadIdentity(d, d_off);
                return;
            }
        }

        // 2つのベクトルのcos値を算出
        let cs = fx * tx + fy * ty + fz * tz;
        if (1.0 <= cs) {
            ns.Quaternion.loadIdentity(d, d_off);
            return;
        }

        // 回転軸を算出
        let ip = fy * tz - fz * ty;
        let jp = fz * tx - fx * tz;
        let kp = fx * ty - fy * tx;

        // 回転軸を正規化
        let axis_len = ip * ip + jp * jp + kp * kp;
        if (0 < axis_len) {
            axis_len = Math.sqrt(axis_len);
            ip /= axis_len;
            jp /= axis_len;
            kp /= axis_len;
        } else {
            ns.Quaternion.loadIdentity(d, d_off);
            return;
        }

        // 結果の書き出し
        let rad = Math.acos(cs) * 0.5 * t;
        let sn = Math.sin(rad);
        ns.Quaternion.load(d, d_off, Math.cos(rad), ip * sn, jp * sn, kp * sn);
    };

    /**
     * 2つのベクトルの回転を四元数に読み込ませます。
     *
     * rad = acos(from ・ to) / 2 * t
     * axis = from × to
     * x = (cos(rad); axis * sin(rad))
     *
     * @memberof xpl.Quaternion
     * @function loadRotateVector3v
     * @param {Array.<number>} d - 出力先の四元数
     * @param {number} d_off - 出力先の四元数の配列インデックス
     * @param {Array.<number>} fv - 開始のベクトル
     * @param {number} fv_off - 開始のベクトルの配列インデックス
     * @param {boolean} fv_norm - 開始のベクトルを正規化するかどうか
     * @param {Array.<number>} tv - 終了のベクトル
     * @param {number} tv_off - 終了のベクトルの配列インデックス
     * @param {boolean} tv_norm - 終了のベクトルの配列インデックス
     * @param {number} [t=1.0] - 補完係数
     */
    ns.Quaternion.loadRotateVector3v = function (d, d_off, fv, fv_off, fv_norm, tv, tv_off, tv_norm, t) {
        ns.Quaternion.loadRotateVector3(
            d, d_off,
            fv[fv_off + VX], fv[fv_off + VY], fv[fv_off + VZ], fv_norm,
            tv[tv_off + VX], tv[tv_off + VY], tv[tv_off + VZ], tv_norm,
            t);
    };

    /**
     * 四元数にI軸(X軸)回転を掛けあわせます。
     *
     * q *= (cos(rad / 2), sin(rad / 2), 0, 0)
     *
     * @memberof xpl.Quaternion
     * @function mulIAxisRotate
     * @param {Array.<number>} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.mulIAxisRotate = function (q, q_off, rad) {
        // r = cs(rad * 0.5), i = sn(rad * 0.5), j = 0, k = 0
        rad *= 0.5;
        let cs = Math.cos(rad);
        let sn = Math.sin(rad);

        // 掛け合わせて、結果の書き出し
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        ns.Quaternion.load(
            q, q_off,
            rp * cs - ip * sn,
            rp * sn + ip * cs,
            jp * cs + kp * sn,
            kp * cs - jp * sn);
    };

    /**
     * 四元数にJ軸(Y軸)回転を掛けあわせます。
     *
     * q *= (cos(rad / 2), 0, sin(rad / 2), 0)
     *
     * @memberof xpl.Quaternion
     * @function mulJAxisRotate
     * @param {Array.<number>} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.mulJAxisRotate = function (q, q_off, rad) {
        // r = cs(rad * 0.5), i = 0, j = sn(rad * 0.5), k = 0
        rad *= 0.5;
        let cs = Math.cos(rad);
        let sn = Math.sin(rad);

        // 掛け合わせて、結果の書き出し
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        ns.Quaternion.load(
            q, q_off,
            rp * cs - jp * sn,
            ip * cs - kp * sn,
            rp * sn + jp * cs,
            kp * cs + ip * sn);
    };

    /**
     * 四元数にK軸(Z軸)回転を掛けあわせます。
     *
     * q *= (cos(rad / 2), 0, 0, sin(rad / 2))
     *
     * @memberof xpl.Quaternion
     * @function mulKAxisRotate
     * @param {Array.<number>} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} rad - 回転のラジアン値
     */
    ns.Quaternion.mulKAxisRotate = function (q, q_off, rad) {
        // r = cs(rad), i = 0, j = 0, k = sn(rad)
        rad *= 0.5;
        let cs = Math.cos(rad);
        let sn = Math.sin(rad);

        // 掛け合わせて、結果の書き出し
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        ns.Quaternion.load(
            q, q_off,
            rp * cs - kp * sn,
            ip * cs + jp * sn,
            jp * cs - ip * sn,
            rp * sn + kp * cs);
    };

    /**
     * 四元数にK軸(Z軸)回転を掛けあわせます。
     *
     * q *= (cos(rad / 2); sin(rad / 2) * v)
     *
     * @memberof xpl.Quaternion
     * @function mulRotate
     * @param {Array.<number>} q - 対象の四元数
     * @param {number} q_off - 対象の四元数の配列インデックス
     * @param {number} ip - 入力元の四元数の虚数I部
     * @param {number} jp - 入力元の四元数の虚数J部
     * @param {number} kp - 入力元の四元数の虚数K部
     * @param {number} rad - 回転のラジアン値
     * @param {boolean} [norm=true] - 入力元の四元数を正規化するかどうか
     */
    ns.Quaternion.mulRotate = function (q, q_off, ip, jp, kp, rad, norm) {
        norm = ns.defaultValue(norm, true);

        // 四元数の正規化
        if (norm) {
            let len = ip * ip + jp * jp + kp * kp;
            if (0 < len) {
                len = Math.sqrt(len);
                ip /= len;
                jp /= len;
                kp /= len;
            }
        }

        // 四元数の算出
        rad *= 0.5;
        let cs = Math.cos(rad);
        let sn = Math.sin(rad);
        ip *= sn;
        jp *= sn;
        kp *= sn;

        // 掛け合わせて、結果の書き出し
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let trp = q[q_off + CR];
        let tip = q[q_off + CI];
        let tjp = q[q_off + CJ];
        let tkp = q[q_off + CK];
        ns.Quaternion.load(
            q, q_off,
            trp * cs - (tip * ip + tjp * jp + tkp * kp),
            trp * ip + tip * cs + (tjp * kp - tkp * jp),
            trp * jp + tjp * cs + (tkp * ip - tip * kp),
            trp * kp + tkp * cs + (tip * jp - tjp * ip));
    };

})(xpl);
