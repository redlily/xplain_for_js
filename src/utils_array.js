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

    /**
     * Array utilities.
     *
     * @namespace xpl.ArrayUtils
     * @author Syuuhei Kuno
     */
    ns.ArrayUtils = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * Element of the comparator for magnitude relation.
     *
     * @callback xpl.ArrayUtils~comparator
     * @param {Object} v1 - The left-hand side value.
     * @param {Object} v2 - The right-hand side value.
     * @returns {Number}
     *              Returns value is comparator result,
     *              the zero if equal then left side and right side,
     *              the positive value if the left side is less then right side,
     *              the negative value if the left side is greater then right side.
     */

    /**
     * Element of the Collection for magnitude relation.
     *
     * @callback xpl.ArrayUtils~collection
     * @param {Object} v1 - The left-hand side value.
     * @param {Object} v2 - The right-hand side value.
     * @returns {Number}
     *              Returns value is comparison result,
     *              the true if equal then left side and right side,
     *              the false if not equal then left side and right side.
     */

    /**
     * Copy the elements from the source array to the destination array.
     *
     * @memberof xpl.ArrayUtils
     * @function copy
     * @param {Array} src - The source array.
     * @param {Number} src_off - Starting position in the source.
     * @param {Array} dest - The destination array.
     * @param {Number} dest_off - Starting position in the destination.
     * @param {Number} len - Number of the elements to be copied.
     */
    ns.ArrayUtils.copy = function (src, src_off, dest, dest_off, len) {
        for (let i = 0; i < len; ++i) {
            dest[dest_off + i] = src[src_off + i];
        }
    };

    /**
     * Assigns the specified value to the elements.
     *
     * @memberof xpl.ArrayUtils
     * @function fill
     * @param {Array} ary - The array.
     * @param {Number} from - The index of the first element.
     * @param {Number} to - The index of the last element.
     * @param {Number} value - The value.
     */
    ns.ArrayUtils.fill = function (ary, from, to, value) {
        for (let i = from; i < to; ++i) {
            ary[i] = value;
        }
    };

    /**
     * Binary Search an element from the array.
     *
     * @memberof xpl.ArrayUtils
     * @function binarySearch
     * @param {Array} ary - The array.
     * @param {Number} from - The index of the first element.
     * @param {Number} to - The index of the last element.
     * @param {Number} key - The key value.
     * @param {xpl.ArrayUtils~comparator} [comparator=null] -
     *              The comparison function. Can specified the null if not needed it.
     * @returns {Number} The index to element.
     */
    ns.ArrayUtils.binarySearch = function (ary, from, to, key, comparator) {
        to--;
        while (from <= to) {
            let mid = (from + to) >> 1;
            let value = ary[mid];
            let c;
            if (comparator != null) {
                c = comparator(value, key);
            } else {
                c = value - key;
            }
            if (c < 0) {
                from = mid + 1;
            } else if (0 < c) {
                to = mid - 1;
            } else {
                return mid;
            }
        }
        return -(from + 1);
    };

    /**
     * Convert to the array of elements without duplicates.
     *
     * @memberof xpl.ArrayUtils
     * @function convertSet
     * @param {Array} ary - The array.
     * @param {Number} from - The index of the first element.
     * @param {Number} to - The index of the last element.
     * @param {xpl.ArrayUtils~collection} [comparator=null] -
     *              The comparison function. Can specified the null if not needed it.
     * @returns {Array} The new array.
     */
    ns.ArrayUtils.convertToSet = function (ary, from, to, comparator) {
        let dest = [];
        loop: for (let i = from; i < to; ++i) {
            let value = ary[i];
            for (let j = 0; j < dest.length; ++j) {
                if (comparator != null ?
                        comparator(dest[j], value) :
                    dest[j] == value) {
                    continue loop;
                }
            }
            dest.push(value);
        }
        return dest;
    };

    /**
     * Check that the subset contained in the superset.
     *
     * @memberof xpl.ArrayUtils
     * @function isContained
     * @param {Array} superset - The superset.
     * @param {Number} superset_from - The index of the first element at superset.
     * @param {Number} superset_to - The index of the last element at superset.
     * @param {Array} subset - The subset.
     * @param {Number} subset_from - The index of the first element at subset.
     * @param {Number} subset_to - The index of the last element at subset.
     * @param {xpl.ArrayUtils~collection} [collection=null] -
     *              The comparison function. Can specified the null if not needed it.
     * @return {Boolean}
     *              Returns value is check result,
     *              the if subset contained all elements in superset,
     *              false if subset not contained all elements in superset.
     */
    ns.ArrayUtils.isContained = function (superset, superset_from, superset_to,
                                          subset, subset_from, subset_to,
                                          collection) {
        if (superset_to - superset_from < subset_to - subset_from) {
            return false;
        }
        loop: for (let i = subset_from; i < subset_to; ++i) {
            let value = subset[i];
            for (let j = superset_from; j < superset_to; ++j) {
                if (collection != null ? collection(superset[j], value) :
                    superset[j] == value) {
                    continue loop;
                }
            }
            return false;
        }
        return true;
    };

})(xpl);
