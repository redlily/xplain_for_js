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

    /**
     * 幾何学ユーティリティの基底クラスです。
     *
     * @namespace xpl.Geometry
     * @author Syuuhei Kuno
     */
    ns.Geometry = function () {
        throw new Error("Unsupported operation!");
    };

    Object.defineProperties(ns.Geometry, {

        /**
         * ベクトルのX要素のインデックス
         *
         * @constant
         * @memberof Geometry
         * @member {xpl.enum_t} VY
         */
        "VX": {
            value: 0
        },

        /**
         * ベクトルのY要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} VY
         */
        "VY": {
            value: 1
        },

        /**
         * ベクトルのZ要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} VZ
         */
        "VZ": {
            value: 2
        },

        /**
         * ベクトルのW要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} VW
         */
        "VW": {
            value: 3
        },

        /**
         * 3次元ベクトルのサイズ
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.size_t} SIZE_VECTOR_3
         */
        "SIZE_VECTOR_3": {
            value: 3
        },

        /**
         * 複素数の実数要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} CR
         */
        "CR": {
            value: 0
        },

        /**
         * 複素数の虚数I要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} CI
         */
        "CI": {
            value: 1
        },

        /**
         * 複素数の虚数J要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} CJ
         */
        "CJ": {
            value: 2
        },

        /**
         * 複素数の虚数K要素のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} CK
         */
        "CK": {
            value: 3
        },

        /**
         * 四元数のサイズ
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.size_t} SIZE_QUATERNION
         */
        "SIZE_QUATERNION": {
            value: 4
        },

        /**
         * 4×4の行列の要素 0, 0 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_00
         */
        "M4X4_00": {
            value: 0
        },

        /**
         * 4×4の行列の要素 1, 0 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_10
         */
        "M4X4_10": {
            value: 1
        },

        /**
         * 4×4の行列の要素 2, 0 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_20
         */
        "M4X4_20": {
            value: 2
        },

        /**
         * 4×4の行列の要素 3, 0 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_30
         */
        "M4X4_30": {
            value: 3
        },

        /**
         * 4×4の行列の要素 0, 1 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_01
         */
        "M4X4_01": {
            value: 4
        },

        /**
         * 4×4の行列の要素 1, 1 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_11
         */
        "M4X4_11": {
            value: 5
        },

        /**
         * 4×4の行列の要素 2, 1 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_21
         */
        "M4X4_21": {
            value: 6
        },

        /**
         * 4×4の行列の要素 3, 1 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_31
         */
        "M4X4_31": {
            value: 7
        },

        /**
         * 4×4の行列の要素 0, 2 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_02
         */
        "M4X4_02": {
            value: 8
        },

        /**
         * 4×4の行列の要素 1, 2 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_12
         */
        "M4X4_12": {
            value: 9
        },

        /**
         * 4×4の行列の要素 2, 2 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_22
         */
        "M4X4_22": {
            value: 10
        },

        /**
         * 4×4の行列の要素 3, 2 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_32
         */
        "M4X4_32": {
            value: 11
        },

        /**
         * 4×4の行列の要素 0, 3 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_03
         */
        "M4X4_03": {
            value: 12
        },

        /**
         * 4×4の行列の要素 1, 3 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_13
         */
        "M4X4_13": {
            value: 13
        },

        /**
         * 4×4の行列の要素 2, 3 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_23
         */
        "M4X4_23": {
            value: 14
        },

        /**
         * 4×4の行列の要素 3, 3 のインデックス
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.enum_t} M4X4_33
         */
        "M4X4_33": {
            value: 15
        },

        /**
         * 4×4の行列のサイズ
         *
         * @constant
         * @memberof xpl.Geometry
         * @member {xpl.size_t} SIZE_MATRIX_4X4
         */
        "SIZE_MATRIX_4X4": {
            value: 16
        }
    });

})(xpl);
