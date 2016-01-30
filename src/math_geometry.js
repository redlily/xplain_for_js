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

(function(ns) {

    "use strict";

    /**
     * Definition list that is used in the geometory utilities.
     *
     * @namespace xpl.Geometry
     * @author Syuuhei Kuno
     */
    ns.Geometry = function() {
        throw new Error("Unsupported operation");
    };

    Object.defineProperties(ns.Geometry, {

        /**
         * Index of X element in the vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} VX
         */
        "VX": {
            value: 0,
        },

        /**
         * Index of Y element in the vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} VY
         */
        "VY": {
            value: 1,
        },

        /**
         * Index of Z element in the vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} VZ
         */
        "VZ": {
            value: 2,
        },

        /**
         * Index of W element in the vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} VW
         */
        "VW": {
            value: 3,
        },

        /**
         * Size of the 2D vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} SIZE_VECTOR_2
         */
        "SIZE_VECTOR_2": {
            value: 2,
        },

        /**
         * Size of the 3D vector.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} SIZE_VECTOR_3
         */
        "SIZE_VECTOR_3": {
            value: 3,
        },

        /**
         * Index of real number element in the complex and quaternion.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} CR
         */
        "CR": {
            value: 0,
        },

        /**
         * Index of first imaginary number element in the complex and quaternion.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} CI
         */
        "CI": {
            value: 1,
        },

        /**
         * Index of second imaginary number element in the quaternion.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} CJ
         */
        "CJ": {
            value: 2,
        },

        /**
         * Index of sard imaginary number element in the quaternion.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} CK
         */
        "CK": {
            value: 3,
        },

        /**
         * Size of the complex number.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} SIZE_COMPLEX
         */
        "SIZE_COMPLEX": {
            value: 2,
        },

        /**
         * Size of the quaternion number.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} SIZE_QUATERNION
         */
        "SIZE_QUATERNION": {
            value: 4,
        },

        /**
         * Index of 0-0 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_00
         */
        "M4X4_00": {
            value: 0,
        },

        /**
         * Index of 1-0 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_10
         */
        "M4X4_10": {
            value: 1,
        },

        /**
         * Index of 2-0 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_20
         */
        "M4X4_20": {
            value: 2,
        },

        /**
         * Index of 3-0 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_30
         */
        "M4X4_30": {
            value: 3,
        },

        /**
         * Index of 0-1 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_01
         */
        "M4X4_01": {
            value: 4,
        },

        /**
         * Index of 1-1 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_11
         */
        "M4X4_11": {
            value: 5,
        },

        /**
         * Index of 2-1 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_21
         */
        "M4X4_21": {
            value: 6,
        },

        /**
         * Index of 3-1 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_31
         */
        "M4X4_31": {
            value: 7,
        },

        /**
         * Index of 0-2 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_02
         */
        "M4X4_02": {
            value: 8,
        },

        /**
         * Index of 1-2 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_12
         */
        "M4X4_12": {
            value: 9,
        },

        /**
         * Index of 2-2 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_22
         */
        "M4X4_22": {
            value: 10,
        },

        /**
         * Index of 3-2 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_32
         */
        "M4X4_32": {
            value: 11,
        },

        /**
         * Index of 0-3 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_03
         */
        "M4X4_03": {
            value: 12,
        },

        /**
         * Index of 1-3 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_13
         */
        "M4X4_13": {
            value: 13,
        },

        /**
         * Index of 2-3 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_23
         */
        "M4X4_23": {
            value: 14,
        },

        /**
         * Index of 3-3 element in the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} M4X4_33
         */
        "M4X4_33": {
            value: 15,
        },

        /**
         * Size of the 4x4 matrix.
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {Number} SIZE_MATRIX_4X4
         */
        "SIZE_MATRIX_4X4": {
            value: 16,
        }
    });

})(xpl);
