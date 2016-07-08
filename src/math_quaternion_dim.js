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
 * 幾何学に特化した機能を四元数のユーティリティクラスに追加する定義
 *
 * @author Syuuhei Kuno
 */
(function (ns) {

    "use strict";

    if (ns.Quaternion === undefined) {
        return;
    }

    let VX = 0, VY = 1, VZ = 2;
    let QR = 0, QI = 1, QJ = 2, QK = 3;

    /**
     * I軸(X軸)の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2), sin(rad / 2), 0, 0)
     *
     * @memberof xpl.Quaternion
     * @function loadIAxisRotate
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rad - The rotation value.
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
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rad - The rotation value.
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
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rad - The rotation value.
     */
    ns.Quaternion.loadKAxisRotate = function (d, d_off, rad) {
        rad *= 0.5;
        ns.Quaternion.load(d, d_off, Math.cos(rad), 0, 0, Math.sin(rad));
    };

    /**
     * 任意軸の回転を四元数に読み込ませます。
     *
     * x = (cos(rad / 2); sin(rad / 2) * v / ||v||)
     *
     * @memberof xpl.Quaternion
     * @function loadRotate
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} ip - I imaginary part element of the imaginary axis vector.
     * @param {Number} jp - J imaginary part element of the imaginary axis vector.
     * @param {Number} kp - K imaginary part element of the imaginary axis vector.
     * @param {Number} rad - The rotation value.
     * @param {boolean} [normalize=true] -
     *              Set true if normalized axis vector,
     *              set false if not normalized axis vector.
     */
    ns.Quaternion.loadRotate = function (d, d_off, ip, jp, kp, rad, normalize) {
        if (normalize === undefined) {
            normalize = true;
        }

        // normalize the quaternion.
        if (normalize) {
            let len = ip * ip + jp * jp + kp * kp;
            if (0 < len) {
                len = Math.sqrt(len);
                ip /= len;
                jp /= len;
                kp /= len;
            }
        }

        // load on the quaternion.
        rad *= 0.5;
        let sn = Math.sin(rad);
        ns.Quaternion.load(d, d_off, Math.cos(rad), ip * sn, jp * sn, kp * sn);
    };

    /**
     * 2つのベクトルの回転を四元数に読み込ませます。
     *
     * rad = acos( (from / ||from||) ・ (to / ||to||) ) / 2 * t
     * axis = (from / ||from||) × (to / ||to||)
     * x = (cos(rad); sin(rad) * axis)
     *
     * @memberof xpl.Quaternion
     * @function loadRotateVector3
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} fx - X element of the from vector.
     * @param {Number} fy - Y element of the from vector.
     * @param {Number} fz - Z element of the from vector.
     * @param {Boolean} fv_normalize -
     *              Set the true if normalized axis vector, set the false if not normalized axis vector.
     * @param {Number} tx - X element of the to vector.
     * @param {Number} ty - Y element of the to vector.
     * @param {Number} tz - Z element of the to vector.
     * @param {Boolean} tv_normalize -
     *              Set the true if normalized axis vector, set the false if not normalized axis vector.
     * @param {Number} [t=1] - The interpolation coefficient.
     */
    ns.Quaternion.loadRotateVector3 = function (d, d_off,
                                                fx, fy, fz, fv_normalize,
                                                tx, ty, tz, tv_normalize,
                                                t) {
        if (t === undefined) {
            t = 1.0;
        }

        // normalize the start point vector.
        if (fv_normalize) {
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

        // normalize the end point vector.
        if (tv_normalize) {
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

        // calculate the cosine and sine value from two vectors.
        let cs = fx * tx + fy * ty + fz * tz;
        if (1.0 <= cs) {
            ns.Quaternion.loadIdentity(d, d_off);
            return;
        }

        // calculate the axis vector for be rotation.
        let ip = fy * tz - fz * ty;
        let jp = fz * tx - fx * tz;
        let kp = fx * ty - fy * tx;

        // normalize the axis vector.
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

        // load on the quaternion.
        let rad = Math.acos(cs) * 0.5 * t;
        let sn = Math.sin(rad);
        ns.Quaternion.load(d, d_off, Math.cos(rad), ip * sn, jp * sn, kp * sn);
    };

    /**
     * 2つのベクトルの回転を四元数に読み込ませます。
     *
     * rad = acos( (from / ||from||) ・ (to / ||to||) ) / 2 * t
     * axis = (from / ||from||) × (to / ||to||)
     * x = (cos(rad); sin(rad) * axis)
     *
     * @memberof xpl.Quaternion
     * @function loadRotateVector3v
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} fv - The from vector.
     * @param {Number} fv_off - Starting position in the from vector.
     * @param {Boolean} fv_normalize -
     *              Set the true if normalized axis vector, set the false if not normalized axis vector.
     * @param {Array.<Number>} tv - The to vector.
     * @param {Number} tv_off - Starting position in the to vector.
     * @param {Boolean} tv_normalize -
     *              Set the true if normalized axis vector, set the false if not normalized axis vector.
     * @param {Number} [t=1] - The interpolation coefficient.
     */
    ns.Quaternion.loadRotateVector3v = function (d, d_off,
                                                 fv, fv_off, fv_normalize,
                                                 tv, tv_off, tv_normalize,
                                                 t) {
        ns.Quaternion.loadRotateVector3(
            d, d_off,
            fv[fv_off + VX], fv[fv_off + VY], fv[fv_off + VZ], fv_normalize,
            tv[tv_off + VX], tv[tv_off + VY], tv[tv_off + VZ], tv_normalize,
            t);
    };

    /**
     * 四元数にI軸(X軸)回転を掛けあわせます。
     *
     * q *= (cos(rad / 2), sin(rad / 2), 0, 0)
     *
     * @memberof xpl.Quaternion
     * @function mulIAxisRotate
     * @param {Array.<Number>} q - The quaternion of push target.
     * @param {Number} q_off - Starting position in the quaternion of push target.
     * @param {Number} rad - The rotation value.
     */
    ns.Quaternion.mulIAxisRotate = function (q, q_off, rad) {
        // r = cs(rad * 0.5), i = sn(rad * 0.5), j = 0, k = 0
        rad *= 0.5;
        let sn = Math.sin(rad);
        let cs = Math.cos(rad);

        // load on the quaternion.
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
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
     * @param {Array.<Number>} q - The quaternion of push target.
     * @param {Number} q_off - Starting position in the quaternion of push target.
     * @param {Number} rad - The rotation value.
     */
    ns.Quaternion.mulJAxisRotate = function (q, q_off, rad) {
        // r = cs(rad * 0.5), i = 0, j = sn(rad * 0.5), k = 0
        rad *= 0.5;
        let sn = Math.sin(rad);
        let cs = Math.cos(rad);

        // load on the quaternion.
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
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
     * @param {Array.<Number>} q - The quaternion of push target.
     * @param {Number} q_off - Starting position in the quaternion of push target.
     * @param {Number} rad - The rotation value.
     */
    ns.Quaternion.mulKAxisRotate = function (q, q_off, rad) {
        // r = cs(rad), i = 0, j = 0, k = sn(rad)
        rad *= 0.5;
        let sn = Math.sin(rad);
        let cs = Math.cos(rad);

        // multiplication then load on the quaternion.
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
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
     * q *= (cos(rad / 2); sin(rad / 2) * v / ||v||)
     *
     * @memberof xpl.Quaternion
     * @function mulRotate
     * @param {Array.<Number>} q - The quaternion of push target.
     * @param {Number} q_off - Starting position in the quaternion of push target.
     * @param {Number} ip - I imaginary part element of the imaginary axis vector.
     * @param {Number} jp - J imaginary part element of the imaginary axis vector.
     * @param {Number} kp - K imaginary part element of the imaginary axis vector.
     * @param {Number} rad - The rotation value.
     * @param {boolean} [normalize=true] -
     *              Set true if normalized axis vector,
     *              set false if not normalized axis vector.
     */
    ns.Quaternion.mulRotate = function (q, q_off, ip, jp, kp, rad, normalize) {
        if (normalize === undefined) {
            normalize = true;
        }

        // normalize the quaternion.
        if (normalize) {
            let len = ip * ip + jp * jp + kp * kp;
            if (0 < len) {
                len = Math.sqrt(len);
                ip /= len;
                jp /= len;
                kp /= len;
            }
        }
        rad *= 0.5;
        let sn = Math.sin(rad);
        let cs = Math.cos(rad);
        ip *= sn;
        jp *= sn;
        kp *= sn;

        // multiplication then load on the quaternion.
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        let trp = q[q_off + QR];
        let tip = q[q_off + QI];
        let tjp = q[q_off + QJ];
        let tkp = q[q_off + QK];
        ns.Quaternion.load(
            q, q_off,
            trp * cs - (tip * ip + tjp * jp + tkp * kp),
            trp * ip + tip * cs + (tjp * kp - tkp * jp),
            trp * jp + tjp * cs + (tkp * ip - tip * kp),
            trp * kp + tkp * cs + (tip * jp - tjp * ip));
    };

})(xpl);
