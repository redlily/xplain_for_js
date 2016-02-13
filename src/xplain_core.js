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

/**
 * Namespace for the xPlain.
 *
 * @namespace xpl
 * @author Syuuhei Kuno
 */
var xpl;
if (typeof module == "object") {
    // for the Node.js.
    xpl = module.exports;
    xpl.running_type = "Node.js";
} else if (typeof exports == "object") {
    // for the CommonJS.
    xpl = exports;
    xpl.running_type = "CommonJS";
} else {
    // for the direct link.
    xpl = {};
    xpl.running_type = "direct link"
}

// Initialize the xPlain namespace.
(function(ns) {

    "use strict";

    Object.defineProperties(ns, {

        /**
         * Running type of the Node.js.
         *
         * @constant
         * @memberof xpl
         * @member RUNTYPE_NODE_JS
         */
         "RUNTYPE_NODE_JS": {
             value: "Node.js",
         },

         /**
          * Running type of the CommonJS.
          *
          * @constant
          * @memberof xpl
          * @member RUNTYPE_COMMON_JS
          */
         "RUNTYPE_COMMON_JS": {
             value: "CommonJS"
         },

         /**
          * Running type of the direct link.
          *
          * @constant
          * @memberof xpl
          * @member RUNTYPE_DIRECT_LINK
          */
         "RUNTYPE_DIRECT_LINK": {
             value: "direct link",
         },
    });

    /**
     * About xPlain information.
     *
     * @namespace xpl.about
     */
    ns.about = {};

    Object.defineProperties(ns.about, {

        /**
         * Name of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member NAME
         */
        "NAME": {
            value: "xPlain for JavaScript",
        },

        /**
         * Code name of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member CODE_NAME
         */
        "CODE_NAME": {
            value: "DEUS",
        },

        /**
         * Integer version of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member VERSION_CODE
         */
        "VERSION_CODE": {
            value: 1,
        },

        /**
         * String version of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member VERSION_NAME
         */
        "VERSION_NAME": {
            value: "0.9.0",
        },

        /**
         * Developer name of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member ABOUT
         */
        "AUTHOR": {
            value: "Syuuhei Kuno",
        },

        /**
         * Copyright of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member COPYRIGHT
         */
        "COPYRIGHT": {
            value: "Copyright (c) 2015, Syuuhei Kuno All rights reserved.",
        },

        /**
         * License URL of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member LICENSE
         */
        "LICENSE": {
            value: "http://opensource.org/licenses/BSD-3-Clause",
        },

        /**
         * Repository URI of the this framework.
         *
         * @constant
         * @memberof xpl.about
         * @member REPOSITORY
         */
        "REPOSITORY": {
            value: "git@github.com:redlily/xplain_for_js.git",
        },
    });

    /**
     * Get about information of the xPlain for JavaScript.
     *
     * @memberof xpl
     * @function getAbout
     * @returns {String} - The about information.
     */
    ns.getAbout = function() {
        return ns.about.name                             + "\n" +
               "Version code:  " + ns.about.VERSION_CODE + "\n" +
               "Version name:  " + ns.about.VERSION_NAME + "\n" +
               "Author:        " + ns.about.AUTHOR       + "\n" +
               "Copyright:     " + ns.about.COPYRIGHT    + "\n" +
               "License:       " + ns.about.LICENSE      + "\n" +
               "Repository:    " + ns.about.REPOSITORY
    };

    /**
     * Put about information of the xPlain for JavaScript to the standard output.
     *
     * @memberof xpl
     * @function printAbout
     */
    ns.putAboutToStdout = function() {
        console.log(ns.getAbout);
    };

    var workBuf = new ArrayBuffer(8);

    /**
     * Convert to unsigned integer of the pointer size type.
     *
     * @class
     * @alias xpl.size_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.size_t} The converted value.
     */
    ns.size_t = function() {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * Convert to signed integer of the pointer size type.
     *
     * @class
     * @alias xpl.ptrdiff_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.ptrdiff_t} The converted value.
     */
    ns.ptrdiff_t = function() {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * Convert to the enumeration type.
     *
     * @class
     * @alias xpl.enum_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.enum_t} The converted value.
     */
    ns.enum_t = function() {
        return Number.parseInt.apply(null, arguments);
    };

    /**
     * Convert to signed integer of the 8bits size type.
     *
     * @class
     * @alias xpl.int8_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.int32_t} The converted value.
     */
    ns.int8_t = function() {
        return (Number.parseInt.apply(null, arguments) << 24) >> 24;
    };

    Object.defineProperties(ns.int8_t, {

        /**
         * The most minimum value in this type.
         *
         * @constant
         * @memberof xpl.int8_t
         * @member {xpl.int8_t} MIN_VALUE
         */
        "MIN_VALUE": {
            value: -Math.pow(2, 7),
        },

        /**
         * The most maximum value in this type.
         *
         * @constant
         * @memberof xpl.int8_t
         * @member {xpl.int8_t} MIN_VALUE
         */
        "MAX_VALUE": {
            value: Math.pow(2, 7) - 1,
        },
    });

    /**
     * Convert to signed integer of the 16bits size type.
     *
     * @class
     * @alias xpl.int16_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.int32_t} The converted value.
     */
    ns.int16_t = function() {
        return (Number.parseInt.apply(null, arguments) << 16) >> 16;
    };

    Object.defineProperties(ns.int16_t, {

        /**
         * The most minimum value in this type.
         *
         * @constant
         * @memberof xpl.int16_t
         * @member {xpl.int16_t} MIN_VALUE
         */
        "MIN_VALUE": {
            value: -Math.pow(2, 15),
        },

        /**
         * The most maximum value in this type.
         *
         * @constant
         * @memberof xpl.int16_t
         * @member {xpl.int16_t} MIN_VALUE
         */
        "MAX_VALUE": {
            value: Math.pow(2, 15) - 1,
        },
    });

    /**
     * Convert to signed integer of the 32bits size type.
     *
     * @class
     * @alias xpl.int32_t
     * @augments Number
     * @param {Object} value - The any value.
     * @returns {xpl.int32_t} The converted value.
     */
    ns.int32_t = function() {
        return (Number.parseInt.apply(null, arguments) << 0) >> 0;
    };

    Object.defineProperties(ns.int32_t, {

        /**
         * The most minimum value in this type.
         *
         * @constant
         * @memberof xpl.int32_t
         * @member {xpl.int32_t} MIN_VALUE
         */
        "MIN_VALUE": {
            value: -Math.pow(2, 31),
        },

        /**
         * The most maximum value in this type.
         *
         * @constant
         * @memberof xpl.int32_t
         * @member {xpl.int32_t} MIN_VALUE
         */
        "MAX_VALUE": {
            value: Math.pow(2, 31) - 1,
        },
    });

    /**
     * Convert to float number of the 32bits size type.
     *
     * @class
     * @alias xpl.float32_t
     * @augments Number
     * @param {Object} value - The any type value.
     * @returns {xpl.float32_t} The converted value.
     */
    ns.float32_t = function() {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * Get a hash code of specify value.
     *
     * @memberof xpl.float64_t
     * @function hashCode
     * @param {xpl.float32_t} value - The value.
     * @return {String} The hash code.
     */
    ns.float32_t.hashCode = function(value) {
        workBuf.setFloat64(value);
        return workBuf.getUnit32(0).toString(16);
    }

    /**
     * Convert to float number of the 64bits size type.
     *
     * @class
     * @alias xpl.float64_t
     * @augments Number
     * @param {Object} value - The any type value.
     * @returns {xpl.float64_t} The converted value.
     */
    ns.float64_t = function() {
        return Number.parseFloat.apply(null, arguments);
    };

    /**
     * Get a hash code of specify value.
     *
     * @memberof xpl.float64_t
     * @function hashCode
     * @param {xpl.float64_t} value - The value.
     * @return {String} The hash code.
     */
    ns.float64_t.hashCode = function(value) {
        workBuf.setFloat64(value);
        return workBuf.getUnit32(0).toString(16) + workBuf.getUnit32(1).toString(16);
    }

})(xpl);
