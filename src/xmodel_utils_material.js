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


(function(ns) {

    "use strict";

    /**
     * Utilities material for the xModel material structure.
     *
     * @namespace xpl.XModelMaterialUtils
     * @see xpl.XModelMaterial
     * @author Syuuhei Kuno
     */
    ns.XModelMaterialUtils = function() {
        throw new Error("Unsupported operation");
    };

    /**
     * Get the textures that be included in the mesh.
     *
     * @memberof xpl.XModelMaterialUtils
     * @function getTextures
     * @param {xpl.XModelMaterial?} material - The material instance.
     * @param {Array.<xpl.XModelTexture>?} dest -
     *              The destination array for texture.
     *              Can specified the null if not needed it.
     * @param {xpl.size_t} off - Starting position the in the destination array.
     * @param {xpl.size_t} len - The maximum number of elements to be copied.
     * @returns {xpl.size_t} The number of texture.
     */
    ns.XModelMaterialUtils.getTextures = function(material, dest, off, len) {
        var count = 0;
        if (material != null) {
            // emissive map.
            if (material.emissive_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.emissive_map;
                    len--;
                }
                count++;
            }

            // ambient reflection map.
            if (material.ambient_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.ambient_map;
                    len--;
                }
                count++;
            }

            // diffuse reflection map.
            if (material.diffuse_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.diffuse_map;
                    len--;
                }
                count++;
            }

            // specular reflection map.
            if (material.specular_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.specular_map;
                    len--;
                }
                count++;
            }

            // specular power map.
            if (material.shininess_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.shininess_map;
                    len--;
                }
                count++;
            }

            // bump map.
            if (material.bump_map) {
                if (dest && 0 < len) {
                    dest[off++] = material.bump_map;
                    len--;
                }
                count++;
            }
        }
        return count;
    };

    /**
     * Release the textures that be included in the mesh.
     *
     * @param {xpl.XModelMaterial?} material - The material instance.
     */
    ns.XModelMaterialUtils.releaseTexture = function(material) {
        if (material != null) {
            // emissive map.
            if (material.emissive_map) {
                material.emissive_map.data = null;
                material.emissive_map.data_size = 0;
            }

            // ambient reflection map.
            if (material.ambient_map) {
                material.ambient_map.data = null;
                material.ambient_map.data_size = 0;
            }

            // diffuse reflection map.
            if (material.diffuse_map) {
                material.diffuse_map.data = null;
                material.diffuse_map.data_size = 0;
            }

            // specular reflection map.
            if (material.specular_map) {
                material.specular_map.data = null;
                material.specular_map.data_size = 0;
            }

            // specular power map.
            if (material.shininess_map) {
                material.shininess_map.data = null;
                material.shininess_map.data_size = 0;
            }

            // bump map.
            if (material.bump_map) {
                material.bump_map.data = null;
                material.bump_map.data_size = 0;
            }
        }
    };

})(xpl);
