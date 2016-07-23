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
     * アニメーション構造です。
     *
     * @class
     * @alias xpl.XModelAnimation
     * @augments xpl.XModelExtensible
     */
    ns.XModelAnimation = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_ANIMATION);

        /**
         * string : アニメーション名
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {String} name
         */
        this.name = null;

        /**
         * XModelStructure : The target.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.XModelStructure} target
         */
        this.target = null;

        /**
         * uint32_t : The index in elements of target.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint32_t} index
         */
        this.index = -1;

        /**
         * uint16_t : The number of keys.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint16_t} num_keys
         */
        this.num_keys = 0;

        /**
         * XModelAnimationKey[num_keys] : The array of keys.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {Array.<xpl.XModelAnimationKey>} keys
         */
        this.keys = null;

        /**
         * uint16_t : The number of children.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {xpl.uint16_t} num_children
         */
        this.num_children = 0;

        /**
         * XModelAnimation[] : The array of children.
         *
         * @instance
         * @memberof xpl.XModelAnimation
         * @member {Array.<xpl.XModelAnimation>} children
         */
        this.children = null;
    };

    Object.setPrototypeOf(ns.XModelAnimation.prototype, ns.XModelExtensible.prototype);

    /**
     * アニメーション名を取得します。
     *
     * @instance
     * @memberof xpl.XModelAnimation
     * @function toString
     * @returns {String} The name of this animation structure.
     */
    ns.XModelAnimation.prototype.toString = function () {
        return this.name;
    };

})(xpl);

(function (ns) {

    "use strict";

    /**
     * アニメーションキー構造です。
     *
     * @class
     * @alias xpl.XModelAnimationKey
     * @augments xpl.XModelStructure
     */
    ns.XModelAnimationKey = function () {
        ns.XModelStructure.call(this, ns.XModelStructure.TYPE_ANIMATION_KEY);

        /**
         * uint8_t : The interpolate.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.uint8_t} interpolate
         */
        this.interpolate = ns.XModelAnimationKey.INTERPOLATE_UNKNOWN;

        /**
         * float64_t : The time.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} time
         */
        this.time = 0;

        /**
         * float64_t : The before control time.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} before_time
         */
        this.before_time = 0;

        /**
         * float64_t : The after control time.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.float64_t} after_time
         */
        this.after_time = 0;

        /**
         * uint32_t : The value size.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.uint32_t} value_size
         */
        this.value_size = 0;

        /**
         * float32_t[value_size | 2 * value_size] : The value.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} value
         */
        this.value = null;

        /**
         * float32_t[value_size] : The before control value.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} before_value
         */
        this.before_value = null;

        /**
         * float32_t[value_size] : The after control value.
         *
         * @instance
         * @memberof xpl.XModelAnimationKey
         * @member {Float32Array} after_value
         */
        this.after_value = null;
    };

    Object.setPrototypeOf(ns.XModelAnimationKey.prototype, ns.XModelStructure.prototype);

    Object.defineProperties(ns.XModelAnimationKey, {

        /**
         * Interpolate by unknown.
         *
         * @constant
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.enum_t} INTERPOLATE_UNKNOWN
         */
        "INTERPOLATE_UNKNOWN": {

            value: -1
        },

        /**
         * Interpolate by liner.
         *
         * @constant
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.enum_t} INTERPOLATE_LINER
         */
        "INTERPOLATE_LINER": {

            value: 0
        },

        /**
         * Interpolate by bezier.
         *
         * @constant
         * @memberof xpl.XModelAnimationKey
         * @member {xpl.enum_t} INTERPOLATE_BEZIER
         */
        "INTERPOLATE_BEZIER": {

            value: 1
        }
    });

})(xpl);

(function (ns) {

    "use strict";

    /**
     * Animation set structure of the xModel.
     *
     * @class
     * @alias xpl.XModelAnimationSet
     * @augments xpl.XModelExtensible
     */
    ns.XModelAnimationSet = function () {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_ANIMATION_SET);

        /**
         * string : The animation set name.
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {String} name
         */
        this.name = null;

        /**
         * uint16_t : The number of animations.
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {xpl.uint16_t} num_animations
         */
        this.num_animations = 0;

        /**
         * XModelAnimation[num_animations] : The array of animations.
         *
         * @instance
         * @memberof xpl.XModelAnimationSet
         * @member {Array.<xpl.XModelAnimation>} animations
         */
        this.animations = null;
    };

    Object.setPrototypeOf(ns.XModelAnimationSet.prototype, ns.XModelExtensible.prototype);

    /**
     * Get the name of this animation set.
     *
     * @instance
     * @memberof xpl.XModelAnimationSet
     * @function toString
     * @returns {String} The name of this animation set.
     */
    ns.XModelAnimationSet.prototype.toString = function () {
        return this.name;
    };

})(xpl);
