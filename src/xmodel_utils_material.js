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

    /**
     * 材質用のユーティリティクラス
     *
     * @constructor
     */
    xpl.XModelMaterialUtils = function () {
        throw new Error("Unsupported operation");
    };

    /**
     * テクスチャの配列を除去した配列を返します。
     *
     * @param {xpl.XModelTexture[]} textures - テクスチャの配列
     * @returns {xpl.XModelTexture[]} 重複を除去したテクスチャの配列
     */
    xpl.XModelMaterialUtils.convertToTextureSet = function (textures) {
        return xpl.ArrayUtils.convertToSet(
            textures,
            0,
            textures.length,
            function (a, b) {
                return a.name == b.name;
            });
    };

    /**
     * 材質に含まれるテクスチャを取得します。
     *
     * @param {xpl.XModelMaterial} material - 処理対象の材質構造
     * @returns {xpl.XModelTexture[]} テクスチャの配列
     */
    xpl.XModelMaterialUtils.getTextures = function (material) {
        let textures = [];
        if (material != null) {
            if (material.emissive_map != null) {
                textures.push(material.emissive_map);
            }
            if (material.ambient_map != null) {
                textures.push(material.ambient_map);
            }
            if (material.diffuse_map != null) {
                textures.push(material.diffuse_map);
            }
            if (material.specular_map != null) {
                textures.push(material.specular_map);
            }
            if (material.shininess_map != null) {
                textures.push(material.shininess_map);
            }
            if (material.bump_map != null) {
                textures.push(material.bump_map);
            }
        }
        return xpl.XModelMaterialUtils.convertToTextureSet(textures);
    };

    /**
     * 材質に含まれるテクスチャを開放します。
     *
     * @param {xpl.XModelMaterial} material - 処理対象の材質構造
     */
    xpl.XModelMaterialUtils.releaseTexture = function (material) {
        if (material != null) {
            if (material.emissive_map) {
                material.emissive_map.data = null;
                material.emissive_map.data_size = 0;
            }
            if (material.ambient_map) {
                material.ambient_map.data = null;
                material.ambient_map.data_size = 0;
            }
            if (material.diffuse_map) {
                material.diffuse_map.data = null;
                material.diffuse_map.data_size = 0;
            }
            if (material.specular_map) {
                material.specular_map.data = null;
                material.specular_map.data_size = 0;
            }
            if (material.shininess_map) {
                material.shininess_map.data = null;
                material.shininess_map.data_size = 0;
            }
            if (material.bump_map) {
                material.bump_map.data = null;
                material.bump_map.data_size = 0;
            }
        }
    };

})(xpl);
