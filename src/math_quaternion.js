/**
 * @license
 *
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

    let VX = 0, VY = 1, VZ = 2;
    let QR = 0, QI = 1, QJ = 2, QK = 3;

    /**
     * Quaternion utilities.
     *
     * @namespace xpl.Quaternion
     * @author Syuuhei Kuno
     */
    ns.Quaternion = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * Load the any values at the elements of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function load
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp - Real part in the source quaternion.
     * @param {Number} ip - I imaginary part in the source quaternion.
     * @param {Number} jp - J imaginary part in the source quaternion.
     * @param {Number} kp - The tertiary imaginary part in the source quaternion.
     */
    ns.Quaternion.load = function (d, d_off, rp, ip, jp, kp) {
        d[d_off + QR] = rp;
        d[d_off + QI] = ip;
        d[d_off + QJ] = jp;
        d[d_off + QK] = kp;
    };

    /**
     * Load the ary values at the elements of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function loadv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - Starting position in the source quaternion.
     * @param {Number} q_off - The source quaternion.
     */
    ns.Quaternion.loadv = function (d, d_off, q, q_off) {
        ns.Quaternion.load(d, d_off, q[q_off + QR], q[q_off + QI], q[q_off + QJ], q[q_off + QK]);
    };

    /**
     * Load the zero values at the all elements of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function loadZero
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - The Starting position in the destination quaternion.
     */
    ns.Quaternion.loadZero = function (d, d_off) {
        ns.Quaternion.load(d, d_off, 0, 0, 0, 0);
    };

    /**
     * Load the identity values at the all elements of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function loadIdentity
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     */
    ns.Quaternion.loadIdentity = function (d, d_off) {
        ns.Quaternion.load(d, d_off, 1, 0, 0, 0);
    };

    /**
     * Calculate square absolute value of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function absSq
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the quaternion.
     * @returns {Number} The square of the absolute value of the target quaternion.
     */
    ns.Quaternion.absSq = function (q, q_off) {
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
        return rp * rp + ip * ip + jp * jp + kp * kp;
    };

    /**
     * Calculate absolute value of the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function abs
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the quaternion.
     * @returns {Number} The absolute value of the target quaternion.
     */
    ns.Quaternion.abs = function (q, q_off) {
        return Math.sqrt(ns.Quaternion.absSq(q, q_off));
    };

    /**
     * Normalize the quaternion.
     *
     * @memberof xpl.Quaternion
     * @function normalizev
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     */
    ns.Quaternion.normalizev = function (d, d_off, q, q_off) {
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
        let len = rp * rp + ip * ip + jp * jp + kp * kp;
        if (0 < len) {
            len = Math.sqrt(len);
            ns.Quaternion.load(d, d_off, rp / len, ip / len, jp / len, kp / len);
        } else {
            ns.Quaternion.loadZero(d, d_off);
        }
    };

    /**
     * Calculate the exponentiation of the Napier's constant.
     *
     * @memberof xpl.Quaternion
     * @function exp
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp - Real part in the target quaternion.
     * @param {Number} ip - I imaginary part in the target quaternion.
     * @param {Number} jp - J imaginary part in the target quaternion.
     * @param {Number} kp - K imaginary part in the target quaternion.
     */
    ns.Quaternion.exp = function (d, d_off, rp, ip, jp, kp) {
        // e^(a + bi + cj + dk) = e^(a + v) = e^a * (cos||v|| + (v / ||v||) * sin||v||)
        let aexp = Math.exp(rp);                            // e^a
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp); // ||v|| = √(bi^2 + cj^2 + dk^2)
        let vscale = aexp * Math.sin(vnorm) / vnorm;        // e^a * sin||v|| / ||v||
        ns.Quaternion.load(
            d, d_off,
            aexp * Math.cos(vnorm),                         // e^2 * cos||v||
            ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * Calculate the exponentiation of the Napier's constant.
     *
     * @memberof xpl.Quaternion
     * @function expv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the quaternion.
     */
    ns.Quaternion.expv = function (d, d_off, q, q_off) {
        ns.Quaternion.exp(d, d_off, q[q_off + QR], q[q_off + QI], q[q_off + QJ], q[q_off + QK]);
    };

    /**
     * Calculate the exponentiation of the Napier's constant of the purely imaginary number.
     *
     * @memberof xpl.Quaternion
     * @function cis
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} ip - I imaginary part in the target quaternion.
     * @param {Number} jp - J imaginary part in the target quaternion.
     * @param {Number} kp - K imaginary part in the target quaternion.
     */
    ns.Quaternion.cis = function (d, d_off, ip, jp, kp) {
        // e^(bi + cj + dk) = e^v = cos||v|| + (v / ||v||) * sin||v||
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp); // ||v|| = √(bi^2 + cj^2 + dk^2)
        let vscale = Math.sin(vnorm) / vnorm;               // e^a * sin||v|| / ||v||
        ns.Quaternion.load(
            d, d_off,
            Math.cos(vnorm),                                // cos||v||
            ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * Calculate the exponentiation of the Napier's constant of the purely imaginary number.
     *
     * @memberof xpl.Quaternion
     * @function cisv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param v - The target imaginary vector.
     * @param v_off - Starting position in the target imaginary vector.
     */
    ns.Quaternion.cisv = function (d, d_off, v, v_off) {
        ns.Quaternion.cis(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ]);
    };

    /**
     * Calculate the logarithm.
     *
     * @memberof xpl.Quaternion
     * @function log
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp - Real part in the target quaternion.
     * @param {Number} ip - I imaginary part in the target quaternion.
     * @param {Number} jp - J imaginary part in the target quaternion.
     * @param {Number} kp - K imaginary part in the target quaternion.
     */
    ns.Quaternion.log = function (d, d_off, rp, ip, jp, kp) {
        // ln(a + bi + cj + dk) = ln(a + v) = ln(q) = ln||q|| + v / ||v|| * cos^-1 (a / ||q||)
        let qnorm = Math.sqrt(rp * rp + ip * ip + jp * jp + kp * kp); // ||q|| = √(a^2 + bi^2 + cj^2 + dk^2)
        let qln = Math.log(qnorm);                                    // ln||q||
        let vnorm = Math.sqrt(ip * ip + jp * jp + kp * kp);           // ||v|| = √(bi^2 + cj^2 + dk^2)
        let vscale = Math.acos(rp / qnorm) / vnorm;                   // cos^-1 (a / ||q||) / ||v||
        ns.Quaternion.load(d, d_off, qln, ip * vscale, jp * vscale, kp * vscale);
    };

    /**
     * Calculate the logarithm.
     *
     * @memberof xpl.Quaternion
     * @function logv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the quaternion.
     */
    ns.Quaternion.logv = function (d, d_off, q, q_off) {
        ns.Quaternion.log(d, d_off, q[q_off + QR], q[q_off + QI], q[q_off + QJ], q[q_off + QK]);
    };

    /**
     * Linear interpolate any two the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function lerp
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - Real part element of the quaternion.
     * @param {Number} ip1 - I imaginary part element of the start point quaternion.
     * @param {Number} jp1 - J imaginary part element of the start point quaternion.
     * @param {Number} kp1 - K imaginary part element of the start point quaternion.
     * @param {Number} rp2 - I imaginary part element of the end point quaternion.
     * @param {Number} ip2 - I imaginary part element of the end point quaternion.
     * @param {Number} jp2 - J imaginary part element of the end point quaternion.
     * @param {Number} kp2 - K imaginary part element of the end point quaternion.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Quaternion.lerp = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2, t) {
        // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
        let t1 = 1.0 - t;
        ns.Quaternion.load(
            d, d_off,
            rp1 * t1 + rp2 * t,
            ip1 * t1 + ip2 * t,
            jp1 * t1 + jp2 * t,
            kp1 * t1 + kp2 * t);
    };

    /**
     * Linear interpolate any two the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function lerpv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The start point quaternion.
     * @param {Number} q1_off - Starting position in the start point quaternion.
     * @param {Array.<Number>} q2 - The end point quaternion.
     * @param {Number} q2_off - Starting position in the end point quaternion.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Quaternion.lerpv = function (d, d_off, q1, q1_off, q2, q2_off, t) {
        ns.Quaternion.lerp(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK],
            t);
    };

    /**
     * Spherical linear interpolate any two the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function slerp
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - R real part element of the end point quaternion.
     * @param {Number} ip1 - I imaginary part element of the start point quaternion.
     * @param {Number} jp1 - J imaginary part element of the start point quaternion.
     * @param {Number} kp1 - K imaginary part element of the start point quaternion.
     * @param {Number} rp2 - R real part element of the end point quaternion.
     * @param {Number} ip2 - I imaginary part element of the end point quaternion.
     * @param {Number} jp2 - J imaginary part element of the end point quaternion.
     * @param {Number} kp2 - K imaginary part element of the end point quaternion.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Quaternion.slerp = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2, t) {
        // normalize the starting quaternion.
        let abs1 = rp1 * rp1 + ip1 * ip1 + jp1 * jp1 + kp1 * kp1;
        if (0 < abs1) {
            abs1 = Math.sqrt(abs1);
            rp1 /= abs1;
            ip1 /= abs1;
            jp1 /= abs1;
            kp1 /= abs1;
        }

        // normalize the ending quaternion.
        let abs2 = rp2 * rp2 + ip2 * ip2 + jp2 * jp2 + kp2 * kp2;
        if (0 < abs2) {
            abs2 = Math.sqrt(abs2);
            rp2 /= abs2;
            ip2 /= abs2;
            jp2 /= abs2;
            kp2 /= abs2;
        }

        // calculate the cosine value from two vectors.
        let cs = rp1 * rp2 + ip1 * ip2 + jp1 * jp2 + kp1 * kp2;
        if (1.0 <= cs) {
            // two quaternions are the same direction.
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) + abs2 * t;
            ns.Quaternion.load(d, d_off, rp1 * abs, ip1 * abs, jp1 * abs, kp1 * abs);
        } else if (cs <= -1.0) {
            // two quaternions are the reverse direction.
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) - abs2 * t;
            ns.Quaternion.load(d, d_off, rp1 * abs, ip1 * abs, jp1 * abs, kp1 * abs);
        } else {
            // other conditions.
            // linear interpolate the absolute value.
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let abs = abs1 * (1.0 - t) + abs2 * t;

            // spherical linear interpolate the direction.
            // slerp(p0, p1; t) = (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(cs);
            let rad2 = rad1 * (1.0 - t);
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // load on the quaternion.
            ns.Quaternion.load(
                d, d_off,
                (rp1 * sn1 + rp2 * sn2) * abs,
                (ip1 * sn1 + ip2 * sn2) * abs,
                (jp1 * sn1 + jp2 * sn2) * abs,
                (kp1 * sn1 + kp2 * sn2) * abs);
        }
    };

    /**
     * Spherical linear interpolate any two the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function slerpv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The start point quaternion.
     * @param {Number} q1_off - Starting position in the start point quaternion.
     * @param {Array.<Number>} q2 - The end point quaternion.
     * @param {Number} q2_off - Starting position in the end point quaternion.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Quaternion.slerpv = function (d, d_off, q1, q1_off, q2, q2_off, t) {
        ns.Quaternion.slerp(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK],
            t);
    };

    /**
     * Calculate the dot value.
     *
     * @memberof xpl.Quaternion
     * @function dot
     * @param {Number} rp1 - Real part element in the left-hand side quaternion of the operator.
     * @param {Number} ip1 - I imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} jp1 - J imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} kp1 - K imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} rp2 - Real part element in the right-hand side quaternion of the operator.
     * @param {Number} ip2 - I imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} jp2 - J imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} kp2 - K imaginary part element in the right-hand side quaternion of the operator.
     * @returns {Number} The dot value.
     */
    ns.Quaternion.dot = function (rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        return rp1 * rp2 + ip1 * ip2 + jp1 * jp2 + kp1 * kp2;
    };

    /**
     * Calculate the dot value.
     *
     * @memberof xpl.Quaternion
     * @function dotv
     * @param {Array.<Number>} q1 - The left-hand side quaternion of the operator.
     * @param {Number} q1_off - Starting position in the left-hand side quaternion of the operator.
     * @param {Array.<Number>} q2 - The right-hand side quaternion of the operator.
     * @param {Number} q2_off - Starting position in the right-hand side quaternion of the operator.
     * @returns {Number} The dot value.
     */
    ns.Quaternion.dotv = function (q1, q1_off, q2, q2_off) {
        return q1[q1_off + QR] * q2[q2_off + QR] +
            q1[q1_off + QI] * q2[q2_off + QI] +
            q1[q1_off + QJ] * q2[q2_off + QJ] +
            q1[q1_off + QK] * q2[q2_off + QK];
    };

    /**
     * Conjugate the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function conjugatev
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     */
    ns.Quaternion.conjugatev = function (d, d_off, q, q_off) {
        ns.Quaternion.load(d, d_off, q[q_off + QR], -q[q_off + QI], -q[q_off + QJ], -q[q_off + QK]);
    };

    /**
     * Inverse the quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function inversev
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     */
    ns.Quaternion.inversev = function (d, d_off, q, q_off) {
        let rp = q[q_off + QR];
        let ip = q[q_off + QI];
        let jp = q[q_off + QJ];
        let kp = q[q_off + QK];
        let det = rp * rp + ip * ip + jp * jp + kp * kp;
        if (0 < det) {
            det = Math.sqrt(det);
            rp /= det;
            ip /= -det;
            jp /= -det;
            kp /= -det;
        }
        ns.Quaternion.load(d, d_off, rp, ip, jp, kp);
    };

    /**
     * Calculate the addition any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function add
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - Real part element in the left-hand side quaternion of the operator.
     * @param {Number} ip1 - I imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} jp1 - J imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} kp1 - K imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} rp2 - Real part element in the right-hand side quaternion of the operator.
     * @param {Number} ip2 - I imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} jp2 - J imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} kp2 - K imaginary part element in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.add = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        ns.Quaternion.load(d, d_off, rp1 + rp2, ip1 + ip2, jp1 + jp2, kp1 + kp2);
    };

    /**
     * Calculate the subtraction any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function addv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The left-hand side quaternion of the operator.
     * @param {Number} q1_off - Starting position in the left-hand side quaternion of the operator.
     * @param {Array.<Number>} q2 - The right-hand side quaternion of the operator.
     * @param {Number} q2_off - Starting position in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.addv = function (d, d_off, q1, q1_off, q2, q2_off) {
        ns.Quaternion.add(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK]);
    };

    /**
     * Calculate the subtraction any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function sub
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - Real part element in the left-hand side quaternion of the operator.
     * @param {Number} ip1 - I imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} jp1 - J imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} kp1 - K imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} rp2 - Real part element in the right-hand side quaternion of the operator.
     * @param {Number} ip2 - I imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} jp2 - J imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} kp2 - K imaginary part element in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.sub = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        ns.Quaternion.load(d, d_off, rp1 - rp2, ip1 - ip2, jp1 - jp2, kp1 - kp2);
    };

    /**
     * Calculate the subtraction any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function subv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The left-hand side quaternion of the operator.
     * @param {Number} q1_off - Starting position in the left-hand side quaternion of the operator.
     * @param {Array.<Number>} q2 - The right-hand side quaternion of the operator.
     * @param {Number} q2_off - Starting position in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.subv = function (d, d_off, q1, q1_off, q2, q2_off) {
        ns.Quaternion.sub(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK]);
    };

    /**
     * Calculate the multiplication any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function mul
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - Real part element in the left-hand side quaternion of the operator.
     * @param {Number} ip1 - I imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} jp1 - J imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} kp1 - K imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} rp2 - Real part element in the right-hand side quaternion of the operator.
     * @param {Number} ip2 - I imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} jp2 - J imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} kp2 - K imaginary part element in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.mul = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = r1r2 - i1 ・ i2, ip = r1i2 + r2i1 + i1 × i2
        ns.Quaternion.load(
            d, d_off,
            rp1 * rp2 - (ip1 * ip2 + jp1 * jp2 + kp1 * kp2),
            rp1 * ip2 + ip1 * rp2 + (jp1 * kp2 - kp1 * jp2),
            rp1 * jp2 + jp1 * rp2 + (kp1 * ip2 - ip1 * kp2),
            rp1 * kp2 + kp1 * rp2 + (ip1 * jp2 - jp1 * ip2));
    };

    /**
     * Calculate the multiplication any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function mulv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The left-hand side quaternion of the operator.
     * @param {Number} q1_off - Starting position in the left-hand side quaternion of the operator.
     * @param {Array.<Number>} q2 - The right-hand side quaternion of the operator.
     * @param {Number} q2_off - Starting position in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.mulv = function (d, d_off, q1, q1_off, q2, q2_off) {
        ns.Quaternion.mul(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK]);
    };

    /**
     * Calculate the multiplication any one quaternion and one scalar value then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function mulScalar
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp - Real part element in the target quaternion.
     * @param {Number} ip - I imaginary part element in the target quaternion.
     * @param {Number} jp - J imaginary part element in the target quaternion.
     * @param {Number} kp - K imaginary part element in the target quaternion.
     * @param {Number} s - The target scalar.
     */
    ns.Quaternion.mulScalar = function (d, d_off, rp, ip, jp, kp, s) {
        ns.Quaternion.load(d, d_off, rp * s, ip * s, jp * s, kp * s);
    };

    /**
     * Calculate the multiplication any one quaternion and one scalar value then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function mulScalarv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     * @param {Number} s - The target scalar.
     */
    ns.Quaternion.mulScalarv = function (d, d_off, q, q_off, s) {
        ns.Quaternion.mulScalar(d, d_off, q[q_off + QR], q[q_off + QI], q[q_off + QJ], q[q_off + QK], s);
    };

    /**
     * Calculate the division any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function div
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp1 - Real part element in the left-hand side quaternion of the operator.
     * @param {Number} ip1 - I imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} jp1 - J imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} kp1 - K imaginary part element in the left-hand side quaternion of the operator.
     * @param {Number} rp2 - Real part element in the right-hand side quaternion of the operator.
     * @param {Number} ip2 - I imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} jp2 - J imaginary part element in the right-hand side quaternion of the operator.
     * @param {Number} kp2 - K imaginary part element in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.div = function (d, d_off, rp1, ip1, jp1, kp1, rp2, ip2, jp2, kp2) {
        // i^2 = j^2 = k^2 = ijk = -1, ij = -ji = k, jk = -kj = i, ki = -ik = j
        // rp = (r1r2 - i1 ・ i2) / (r2^2 + i2^2), ip = (r1i2 + r2i1 + i1 × i2) / (r2^2 + i2^2)
        let det = rp2 * rp2 + ip2 * ip2 + jp2 * jp2 + kp2 * kp2;
        ns.Quaternion.load(
            d, d_off,
            (  rp1 * rp2 + (ip1 * ip2 + jp1 * jp2 + kp1 * kp2)) / det,
            (-rp1 * ip2 + ip1 * rp2 - (jp1 * kp2 - kp1 * jp2)) / det,
            (-rp1 * jp2 + jp1 * rp2 - (kp1 * ip2 - ip1 * kp2)) / det,
            (-rp1 * kp2 + kp1 * rp2 - (ip1 * jp2 - jp1 * ip2)) / det);
    };

    /**
     * Calculate the division any two quaternion then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function divv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q1 - The left-hand side quaternion of the operator.
     * @param {Number} q1_off - Starting position in the left-hand side quaternion of the operator.
     * @param {Array.<Number>} q2 - The right-hand side quaternion of the operator.
     * @param {Number} q2_off - Starting position in the right-hand side quaternion of the operator.
     */
    ns.Quaternion.divv = function (d, d_off, q1, q1_off, q2, q2_off) {
        ns.Quaternion.div(
            d, d_off,
            q1[q1_off + QR], q1[q1_off + QI], q1[q1_off + QJ], q1[q1_off + QK],
            q2[q2_off + QR], q2[q2_off + QI], q2[q2_off + QJ], q2[q2_off + QK]);
    };

    /**
     * Calculate the division any one quaternion and one scalar value then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function divScalar
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Number} rp - Real part element in the target quaternion.
     * @param {Number} ip - I imaginary part element in the target quaternion.
     * @param {Number} jp - J imaginary part element in the target quaternion.
     * @param {Number} kp - K imaginary part element in the target quaternion.
     * @param {Number} s - The target scalar.
     */
    ns.Quaternion.divScalar = function (d, d_off, rp, ip, jp, kp, s) {
        ns.Quaternion.load(d, d_off, rp / s, ip / s, jp / s, kp / s);
    };

    /**
     * Calculate the division any one quaternion and one scalar value then set the destination quaternion.
     *
     * @memberof xpl.Quaternion
     * @function divScalarv
     * @param {Array.<Number>} d - The destination quaternion.
     * @param {Number} d_off - Starting position in the destination quaternion.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     * @param {Number} s - The target scalar.
     */
    ns.Quaternion.divScalarv = function (d, d_off, q, q_off, s) {
        ns.Quaternion.divScalar(d, d_off, q[q_off + QR], q[q_off + QI], q[q_off + QJ], q[q_off + QK], s);
    };

    /**
     * Convert to the string.
     *
     * @memberof xpl.Quaternion
     * @function convertToString
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} off - Starting position in the target quaternion.
     * @returns {String} The converted quaternion to string.
     */
    ns.Quaternion.convertToString = function (q, off) {
        return "Quaternion(" + q[off + QR] + ", " + q[off + QI] + ", " + q[off + QJ] + ", " + q[off + QK] + ")";
    };

})(xpl);
