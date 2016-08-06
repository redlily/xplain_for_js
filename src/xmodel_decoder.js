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
     * xModelのバイナリデータをデコードするためのクラスです。
     *
     * @constructor
     */
    xpl.XModelDecoder = function () {

        /**
         * バイナリデータへのビュー
         *
         * @private
         * @instance
         * @memberof xpl.XModelDecoder
         * @var {DataView} __data_view
         */
        this.__data_view = null;

        /**
         * データオフセット
         *
         * @private
         * @instance
         * @memberof xpl.XModelDecoder
         * @var {xpl.size_t} __data_offset
         */
        this.__data_offset = 0;

        /**
         * インスタンスマップ
         *
         * @private
         * @instance
         * @memberof xpl.XModelDecoder
         * @var {Map.<uint32_t, XModelStructure>}
         */
        this.__inst_map = null;

        /**
         * 弱参照のインスタンスマップ
         *
         * @private
         * @instance
         * @memberof xpl.XModelDecoder
         * @var {Map.<uint32_t, XModelStructure>}
         */
        this.__weak_inst_map = null;
    };

    Object.setPrototypeOf(xpl.XModelDecoder.prototype, xpl.XModelCodec.prototype);

    /**
     * デコード処理を行います。
     *
     * @instance
     * @memberof xpl.XModelDecoder
     * @function decode
     * @param {ArrayBuffer} buf - デコード対象のデータバッファ
     * @returns {xpl.XModelStructure} デコードされたインスタンス
     */
    xpl.XModelDecoder.prototype.decode = function (buf) {
        this.__data_view = new DataView(buf);
        this.__data_offset = 0;
        this.__inst_map = {};
        this.__weak_inst_map = {};

        // マジックナンバー
        let magicNumber = this._getInt32();
        if (magicNumber != xpl.XModelCodec.MAGIC_NUMBER) {
            this._recycle();
            return null;
        }

        // バージョン
        let version = this._getInt32();
        if (version < xpl.XModelCodec.COMPATIBILITY_VERSION) {
            this._recycle();
            return null;
        }

        // 構造読み込み
        let type = this._getInt32();
        let inst = this._createStructureProcedure(type);
        this._getStructureProcedure(inst);

        // 終端子
        let end = this._getInt32();
        if (end != xpl.XModelCodec.END_OF_DATA) {
            console.error("Warning! This data doesn't has a terminator in the binary!")
        }

        this._recycle();
        return inst;
    };

    /**
     * このインスタンスをリサイクルします。
     *
     * @protected
     * @instance
     */
    xpl.XModelDecoder.prototype._recycle = function () {
        this.__data_view = null;
        this.__data_offset = 0;
        this.__inst_map = null;
        this.__weak_inst_map = null;
    };

    /**
     * 8bitの符号あり整数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.int8_t} 8bitの符号あり整数
     */
    xpl.XModelDecoder.prototype._getInt8 = function () {
        let value = this.__data_view.getInt8(this.__data_offset);
        this.__data_offset += 1;
        return value;
    };

    /**
     * 8bitの符号なし整数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.uint8_t} 8bitの符号なし整数
     */
    xpl.XModelDecoder.prototype._getUint8 = function () {
        let value = this.__data_view.getUint8(this.__data_offset);
        this.__data_offset += 1;
        return value;
    };

    /**
     * 16bitの符号あり整数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.int16_t} 16bitの符号あり整数
     */
    xpl.XModelDecoder.prototype._getInt16 = function () {
        let value = this.__data_view.getInt16(this.__data_offset, true);
        this.__data_offset += 2;
        return value;
    };

    /**
     * 32bitの符号あり整数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.int32_t} 32bitの符号あり整数
     */
    xpl.XModelDecoder.prototype._getInt32 = function () {
        let value = this.__data_view.getInt32(this.__data_offset, true);
        this.__data_offset += 4;
        return value;
    };

    /**
     * 32bitの浮動小数点数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.float32_t} 32bitの浮動小数点数
     */
    xpl.XModelDecoder.prototype._getFloat32 = function () {
        let value = this.__data_view.getFloat32(this.__data_offset, true);
        this.__data_offset += 4;
        return value;
    };

    /**
     * 64bitの浮動小数点数を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.float64_t} 64bitの浮動小数点数
     */
    xpl.XModelDecoder.prototype._getFloat64 = function () {
        let value = this.__data_view.getFloat64(this.__data_offset, true);
        this.__data_offset += 8;
        return value;
    };

    /**
     * 8bitの符号あり整数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Int8Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getInt8Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getInt8();
        }
    };

    /**
     * 8bitの符号なし整数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Uint8Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getUint8Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getUint8();
        }
    };

    /**
     * 16bitの符号ありの整数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Int16Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getInt16Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getInt16();
        }
    };

    /**
     * 32bitの符号ありの整数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Int32Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getInt32Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getInt32();
        }
    };

    /**
     * 32bitの浮動小数点数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Float32Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getFloat32Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getFloat32();
        }
    };

    /**
     * 64bitの浮動小数点数の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Float64Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getFloat64Array = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getFloat64();
        }
    };

    /**
     * 真偽値を取得します。
     *
     * @protected
     * @instance
     * @returns {Boolean} 真偽値
     */
    xpl.XModelDecoder.prototype._getBool = function () {
        return this._getInt8() != 0;
    };

    /**
     * 真偽値の配列を取得します。
     *
     * @protected
     * @instance
     * @param {Uint8Array} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getBoolArray = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getBool();
        }
    };

    /**
     * 文字列を取得します。
     *
     * @protected
     * @instance
     * @returns {string} The string value.
     */
    xpl.XModelDecoder.prototype._getString = function () {
        let len = this._getInt16();
        if (0 < len) {
            let str = new Array(len);
            this._getUint8Array(str, 0, len);
            return xpl.StringUtils.decodeUTF8(str);
        }
        return "";
    };

    /**
     * 文字列の配列を取得します。
     *
     * @protected
     * @instance
     * @param {string[]} buf - 出力先の配列
     * @param {number} off - 出力先の配列の開始位置
     * @param {number} len - The 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getStringArray = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off + i] = this._getString();
        }
    };

    /**
     * 構造を取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.XModelStructure} 構造
     */
    xpl.XModelDecoder.prototype._getStructure = function () {
        // 識別子
        let inst_id = this._getInt32();
        if (inst_id == 0) {
            return null;
        }

        // 種別
        let type = this._getInt32();

        // 検索
        let value = this.__inst_map[inst_id];
        if (value != null) {
            return value;
        }

        // 生成
        value = this.__weak_inst_map[inst_id];
        if (value != null) {
            delete this.__weak_inst_map[inst_id];
        } else {
            value = this._createStructureProcedure(type);
        }

        // 追加
        this.__inst_map[inst_id] = value;

        // 初期化
        this._getStructureProcedure(value);
        return value;
    };

    /**
     * 構造の配列を取得します。
     *
     * @protected
     * @instance
     * @param {xpl.XModelStructure[]} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getStructureArray = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off++] = this._getStructure();
        }
    };

    /**
     * 構造を弱参照で取得します。
     *
     * @protected
     * @instance
     * @returns {xpl.XModelStructure} The read xModel structure.
     */
    xpl.XModelDecoder.prototype._getStructureRef = function () {
        // 識別子
        let inst_id = this._getInt32();
        if (inst_id == 0) {
            return null;
        }

        // 種別
        let type = this._getInt32();

        // 検索
        let value = this.__inst_map[inst_id] || this.__weak_inst_map[inst_id];
        if (value != null) {
            return value;
        }

        // 生成
        value = this._createStructureProcedure(type);

        // 追加
        this.__weak_inst_map[inst_id] = value;
    };

    /**
     * 構造の配列を弱参照で取得します。
     *
     * @protected
     * @instance
     * @param {xpl.XModelStructure[]} buf - 出力先の配列
     * @param {xpl.size_t} off - 出力先の配列の開始位置
     * @param {xpl.size_t} len - 出力先の配列の要素数
     */
    xpl.XModelDecoder.prototype._getStructureRefArray = function (buf, off, len) {
        for (let i = 0; i < len; ++i) {
            buf[off++] = this._getStructRef();
        }
    };

    /**
     * It is a procedure that create the xModel structure.
     *
     *
     * @protected
     * @instance
     * @param {xpl.int32_t} struct_type - Will create the structure type.
     * @returns {xpl.XModelStructure} The created instance.
     */
    xpl.XModelDecoder.prototype._createStructureProcedure = function (struct_type) {
        switch (struct_type) {
            case xpl.XModelStructure.TYPE_AXIS_ROTATE:
                // 軸回転
                return new xpl.XModelAxisRotate();

            case xpl.XModelStructure.TYPE_QUATERNION:
                // 四元数
                return new xpl.XModelQuaternion();

            case xpl.XModelStructure.TYPE_SCALE:
                // 拡大
                return new xpl.XModelScale();

            case xpl.XModelStructure.TYPE_TRANSLATE:
                // 平行移動
                return new xpl.XModelTranslate();

            case xpl.XModelStructure.TYPE_MATRIX:
                // 行列
                return new xpl.XModelMatrix();

            case xpl.XModelStructure.TYPE_CONTAINER:
                // コンテナ
                return new xpl.XModelContainer();

            case xpl.XModelStructure.TYPE_TEXTURE:
                // テクスチャ
                return new xpl.XModelTexture();

            case xpl.XModelStructure.TYPE_MATERIAL:
                // 材質
                return new xpl.XModelMaterial();

            case xpl.XModelStructure.TYPE_MESH:
                // メッシュ
                return new xpl.XModelMesh();

            case xpl.XModelStructure.TYPE_NODE:
                // ノード
                return new xpl.XModelNode();

            case xpl.XModelStructure.TYPE_IK:
                // 逆運動学
                return new xpl.XModelIK();

            case xpl.XModelStructure.TYPE_ANIMATION:
                // アニメーション
                return new xpl.XModelAnimation();

            case xpl.XModelStructure.TYPE_ANIMATION_KEY:
                // アニメーションキー
                return new xpl.XModelAnimationKey();

            case xpl.XModelStructure.TYPE_ANIMATION_SET:
                // アニメーションセット
                return new xpl.XModelAnimationSet();
        }
        return null;
    };

    /**
     * It is a procedure that read the xModel structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getStructureProcedure
     * @param {xpl.XModelStructure} inst - The xModel instance uninitialized.
     * @returns {Boolean} Returns true if successful, returns false if failed.
     */
    xpl.XModelDecoder.prototype._getStructureProcedure = function (inst) {
        switch (inst.structure_type) {
            case xpl.XModelStructure.TYPE_AXIS_ROTATE:
                // axis rotate.
                this._getAxisRotate(inst);
                return true;

            case xpl.XModelStructure.TYPE_QUATERNION:
                // quaternion.
                this._getQuaternion(inst);
                return true;

            case xpl.XModelStructure.TYPE_SCALE:
                // scale.
                this._getScale(inst);
                return true;

            case xpl.XModelStructure.TYPE_TRANSLATE:
                // translate.
                this._getTranslate(inst);
                return true;

            case xpl.XModelStructure.TYPE_MATRIX:
                // matrix.
                this._getMatrix(inst);
                return true;

            case xpl.XModelStructure.TYPE_CONTAINER:
                // container.
                this._getContainer(inst);
                return true;

            case xpl.XModelStructure.TYPE_TEXTURE:
                // テクスチャ
                this._getTexture(inst);
                return true;

            case xpl.XModelStructure.TYPE_MATERIAL:
                // material.
                this._getMaterial(inst);
                return true;

            case xpl.XModelStructure.TYPE_MESH:
                // mesh.
                this._getMesh(inst);
                return true;

            case xpl.XModelStructure.TYPE_NODE:
                // node.
                this._getNode(inst);
                return true;

            case xpl.XModelStructure.TYPE_IK:
                // inverse kinematics.
                this._getIK(inst);
                return true;

            case xpl.XModelStructure.TYPE_ANIMATION:
                // animation.
                this._getAnimation(inst);
                return true;

            case xpl.XModelStructure.TYPE_ANIMATION_KEY:
                // animation key.
                this._getAnimationKey(inst);
                return true;

            case xpl.XModelStructure.TYPE_ANIMATION_SET:
                // アニメーションセット
                this._getAnimationSet(inst);
                return true;
        }
        return false;
    };

    /**
     * Get the user data structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getUserData
     * @returns {xpl.XModelUserData} The user data.
     */
    xpl.XModelDecoder.prototype._getUserData = function () {
        let size = this._getInt32();
        if (size < size) {
            // create structure.
            let obj = new xpl.XModelUserData();

            // data size.
            obj.data_size = size;

            // data.
            obj.data = new Int8Array(obj.data_size);
            this._getInt8Array(obj.data, 0, obj.data_size);
            return obj;
        }
        return null;
    };

    /**
     * Get the axis rotate structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getAxisRotate
     * @param {xpl.XModelAxisRotate} inst - The axis rotate structure.
     */
    xpl.XModelDecoder.prototype._getAxisRotate = function (inst) {
        // 値
        this._getFloat32Array(inst.initial, 0, xpl.XModelStructure.SIZE_AXIS_ROTATE);
        ArrayUtils.copy(inst.initial, 0, inst.value, 0, xpl.XModelStructure.SIZE_AXIS_ROTATE);
    };

    /**
     * Get the quaternion structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecodr
     * @function _getQuaternion
     * @param {xpl.XModelQuaternion} inst - The quaternion structure.
     */
    xpl.XModelDecoder.prototype._getQuaternion = function (inst) {
        // 値
        this._getFloat32Array(inst.initial, 0, xpl.XModelStructure.SIZE_QUATERNION);
        xpl.ArrayUtils.copy(inst.initial, 0, inst.value, 0, xpl.XModelStructure.SIZE_QUATERNION);
    };

    /**
     * Get the scale structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getScale
     * @param {xpl.XModelScale} inst - The scale structure.
     */
    xpl.XModelDecoder.prototype._getScale = function (inst) {
        // 値
        this._getFloat32Array(inst.initial, 0, xpl.XModelStructure.SIZE_SCALE);
        xpl.ArrayUtils.copy(inst.initial, 0, inst.value, 0, xpl.XModelStructure.SIZE_SCALE);
    };

    /**
     * Get the translate structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getTranslate
     * @param {xpl.XModelTranslate} inst - The translate structure.
     */
    xpl.XModelDecoder.prototype._getTranslate = function (inst) {
        // 値
        this._getFloat32Array(inst.initial, 0, xpl.XModelStructure.SIZE_TRANSLATE);
        xpl.ArrayUtils.copy(inst.initial, 0, inst.value, 0, xpl.XModelStructure.SIZE_TRANSLATE);
    };

    /**
     * Get the matrix structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getMatrix
     * @param {xpl.XModelMatrix} inst - The matrix structure.
     */
    xpl.XModelDecoder.prototype._getMatrix = function (inst) {
        // 値
        this._getFloat32Array(inst.initial, 0, xpl.XModelStructure.SIZE_MATRIX);
        xpl.ArrayUtils.copy(inst.initial, 0, inst.value, 0, xpl.XModelStructure.SIZE_MATRIX);
    };

    /**
     * Get the container structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getContainer
     * @param {xpl.XModelContainer} inst - The container object.
     */
    xpl.XModelDecoder.prototype._getContainer = function (inst) {
        // 名前
        inst.name = this._getString();

        // テクスチャ.
        inst.num_textures = this._getInt16();
        if (0 < inst.num_textures) {
            inst.textures = new Array(inst.num_textures);
            this._getStructureArray(inst.textures, 0, inst.num_textures);
        }

        // 材質配列
        inst.num_materials = this._getInt16();
        if (0 < inst.num_materials) {
            inst.materials = new Array(inst.num_materials);
            this._getStructureArray(inst.materials, 0, inst.num_materials);
        }

        // meshes.
        inst.num_meshes = this._getInt16();
        if (0 < inst.num_meshes) {
            inst.meshes = new Array(inst.num_meshes);
            this._getStructureArray(inst.meshes, 0, inst.num_meshes);
        }

        // nodes.
        inst.num_nodes = this._getInt16();
        if (0 < inst.num_nodes) {
            inst.nodes = new Array(inst.num_nodes);
            this._getStructureArray(inst.nodes, 0, inst.num_nodes);
        }

        // タイムレート
        inst.time_rate = this._getFloat64();

        // アニメーションセット
        inst.num_animation_sets = this._getInt16();
        if (0 < inst.num_animation_sets) {
            inst.animation_sets = new Array(inst.num_animation_sets);
            this._getStructureArray(inst.animation_sets, 0, inst.num_animation_sets);
        }

        // ユーザ データ (インライン展開)
        inst.userData = this._getUserData();
    };

    /**
     * Get the texture structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getTexture
     * @param {xpl.XModelTexture} inst - The texture object.
     */
    xpl.XModelDecoder.prototype._getTexture = function (inst) {
        // 名前
        inst.name = this._getString();

        // 参照
        inst.ref = this._getString();

        // バイナリ
        inst.data_size = this._getInt32();
        if (0 < inst.data_size) {
            inst.data = new Int8Array(inst.data_size);
            this._getInt8Array(inst.data, 0, inst.data_size);
        }

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

    /**
     * Get the material structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getMaterial
     * @param {xpl.XModelMaterial} inst - The material object.
     */
    xpl.XModelDecoder.prototype._getMaterial = function (inst) {
        // 名前.
        inst.name = this._getString();

        // パラメータ
        this._getFloat32Array(inst.emissive, 0, xpl.XModelStructure.SIZE_RGBA);
        this._getFloat32Array(inst.ambient, 0, xpl.XModelStructure.SIZE_RGBA);
        this._getFloat32Array(inst.diffuse, 0, xpl.XModelStructure.SIZE_RGBA);
        this._getFloat32Array(inst.specular, 0, xpl.XModelStructure.SIZE_RGBA);
        inst.shininess = this._getFloat32();
        inst.bump = this._getFloat32();

        // テクスチャ
        inst.emissive_map = this._getStructure();
        inst.ambient_map = this._getStructure();
        inst.diffuse_map = this._getStructure();
        inst.specular_map = this._getStructure();
        inst.shininess_map = this._getStructure();
        inst.bump_map = this._getStructure();

        // 描画モード
        inst.draw_mode = this._getInt32();

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

    /**
     * Get the mesh structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getMesh
     * @param {xpl.XModelMesh} inst - The mesh object.
     */
    xpl.XModelDecoder.prototype._getMesh = function (inst) {
        // 名前
        inst.name = this._getString();

        // 位置配列
        inst.num_positions = this._getInt32();
        if (0 < inst.num_positions) {
            inst.position_size = this._getInt8();
            let size = inst.position_size * inst.num_positions;
            inst.positions = new Float32Array(size);
            this._getFloat32Array(inst.positions, 0, size);
        }

        // normals.
        inst.num_normals = this._getInt32();
        if (0 < inst.num_normals) {
            inst.normal_size = this._getInt8();
            let size = inst.normal_size * inst.num_normals;
            inst.normals = new Float32Array(size);
            this._getFloat32Array(inst.normals, 0, size);
        }

        // colors.
        inst.num_colors = this._getInt32();
        if (0 < inst.num_colors) {
            inst.color_size = this._getInt8();
            let size = inst.color_size * inst.num_colors;
            inst.colors = new Float32Array(size);
            this._getFloat32Array(inst.colors, 0, size);
        }

        // テクスチャcoordinates.
        inst.num_tex_coords = this._getInt32();
        if (0 < inst.num_tex_coords) {
            inst.tex_coord_size = this._getInt8();
            let size = inst.tex_coord_size * inst.num_tex_coords;
            inst.tex_coords = new Float32Array(size);
            this._getFloat32Array(inst.tex_coords, 0, size);
        }

        // skin (inline).
        let has_skinning = this._getBool();
        if (has_skinning) {
            inst.skin = new xpl.XModelSkin();
            this._getSkin(inst.skin);
        }

        // vertices (inline).
        inst.num_vertices = this._getInt32();
        if (0 < inst.num_vertices) {
            inst.vertices = new Array(inst.num_vertices);
            for (let i = 0; i < inst.num_vertices; ++i) {
                let vertex = new xpl.XModelVertex();
                this._getVertex(
                    vertex,
                    inst.num_positions,
                    inst.num_normals,
                    inst.num_colors,
                    inst.num_tex_coords,
                    has_skinning);
                inst.vertices[i] = vertex;
            }
        }

        // 材質配列
        inst.num_materials = this._getInt16();
        if (0 < inst.num_materials) {
            inst.materials = new Array(inst.num_materials);
            this._getStructureArray(inst.materials, 0, inst.num_materials);
        }

        // 要素 (インライン展開)
        inst.num_elements = this._getInt32();
        if (0 < inst.num_elements) {
            inst.elements = new Array(inst.num_elements);
            for (let i = 0; i < inst.num_elements; ++i) {
                let element = new xpl.XModelElement();
                this._getElement(element);
                inst.elements[i] = element
            }
        }

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

    /**
     * Get the skin structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getSkin
     * @param {xpl.XModelSkin} inst - The skin object.
     */
    xpl.XModelDecoder.prototype._getSkin = function (inst) {
        // weighted indexs.
        inst.num_weighted_indices = this._getInt32();
        inst.weighted_index_stride = this._getInt8();
        if (0 < inst.num_weighted_indices) {
            // size of weighted indices array.
            inst.weighted_index_sizes = new Uint8Array(inst.num_weighted_indices);

            // array of weighted indices.
            let num = inst.weighted_index_stride * inst.num_weighted_indices;
            inst.indices = new Int16Array(num);
            inst.weights = new Float32Array(num);
            for (let i = 0; i < num; ++i) {
                inst.indices[i] = -1;
                inst.weights[i] = 0;
            }
            xpl.ArrayUtils.fill(inst.indices, 0, num, -1);
            xpl.ArrayUtils.fill(inst.weights, 0, num, 0);

            for (let i = 0, index = 0; i < inst.num_weighted_indices; ++i, index += inst.weighted_index_stride) {
                // number of elements.
                let size = this._getInt8();
                inst.weighted_index_sizes[i] = size;

                for (let j = 0; j < size; ++j) {
                    let ind = index + j;

                    // index.
                    inst.indices[ind] = this._getInt16();

                    // weight.
                    inst.weights[ind] = this._getFloat32();
                }
            }
        }

        // bones.
        inst.num_nodes = this._getInt16();
        if (0 < inst.num_nodes) {
            // nodes.
            inst.nodes = new Array(inst.num_nodes);
            this._getStructureArray(inst.nodes, 0, inst.num_nodes);

            // offset transformation matrices.
            let matrices_size = xpl.XModelStructure.SIZE_MATRIX * inst.num_nodes;
            inst.offset_matrices = new Float32Array(matrices_size);
            this._getFloat32Array(inst.offset_matrices, 0, matrices_size);

            // offset rotate quaternions.
            // @deprecated
            let quaternions_size = xpl.XModelStructure.SIZE_QUATERNION * inst.num_nodes;
            inst.offset_quaternions = new Float32Array(quaternions_size);
            this._getFloat32Array(inst.offset_quaternions, 0, quaternions_size);
        }
    };

    /**
     * Get the vertex structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getVertex
     * @param {xpl.XModelVertex} inst - The vertex object.
     * @param {xpl.int32_t} has_positions -
     *          Specified 0 < x if has the positions,
     *          specified x <= 0 if not has the positions.
     * @param {xpl.int32_t} has_normals -
     *          Specified 0 < x if has normals,
     *          specified x <= 0 if not has normals.
     * @param {xpl.int32_t} has_colors -
     *          Specified 0 < x if has the colors,
     *          specified x <= 0 if not has the colors.
     * @param {xpl.int32_t} has_tex_coords -
     *          Specified 0 < x if has the texture coordinates,
     *          specified x <= 0 if not has the texture coordinates.
     * @param {xpl.int32_t} has_skinning -
     *          Specified the true if has the skin weights,
     *          specified false if not has the skin weights.
     */
    xpl.XModelDecoder.prototype._getVertex = function (inst,
                                                       has_positions,
                                                       has_normals,
                                                       has_colors,
                                                       has_tex_coords,
                                                       has_skinning) {
        // position.
        if (0 < has_positions) {
            inst.position = this._getInt32();
        }

        // normal.
        if (0 < has_normals) {
            inst.normal = this._getInt32();
        }

        // color.
        if (0 < has_colors) {
            inst.color = this._getInt32();
        }

        // テクスチャcoordinate.
        if (0 < has_tex_coords) {
            inst.tex_coord = this._getInt32();
        }

        // skin weight.
        if (has_skinning) {
            inst.skinning = this._getInt32();
        }
    };

    /**
     * Get the element structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getElement
     * @param {xpl.XModelElement} inst - The element object.
     */
    xpl.XModelDecoder.prototype._getElement = function (inst) {
        // material.
        inst.material = this._getInt16();

        // vertices.
        inst.num_vertices = this._getInt8();
        if (0 < inst.num_vertices) {
            inst.vertices = new Uint32Array(inst.num_vertices);
            this._getInt32Array(inst.vertices, 0, inst.num_vertices);
        }
    };

    /**
     * Get the node structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getNode
     * @param {xpl.XModelNode} inst - The node object.
     */
    xpl.XModelDecoder.prototype._getNode = function (inst) {
        // 名前
        inst.name = this._getString();

        // connected.
        inst.connected = this._getBool();

        // limits of kinematics.
        this._getBoolArray(inst.lock_axises, 0, xpl.XModelStructure.SIZE_VECTOR_3);
        this._getBoolArray(inst.limit_angles, 0, xpl.XModelStructure.SIZE_VECTOR_3);
        this._getFloat32Array(inst.min_angles, 0, xpl.XModelStructure.SIZE_VECTOR_3);
        this._getFloat32Array(inst.max_angles, 0, xpl.XModelStructure.SIZE_VECTOR_3);

        // bone tail.
        this._getFloat32Array(inst.bone_tail, 0, xpl.XModelStructure.SIZE_VECTOR_3);

        // transform.
        this._getStructureArray(inst.transforms, 0, xpl.XModelNode.NUM_TRANSFORMS);

        // inverse kinematics.
        inst.num_iks = this._getInt16();
        if (0 < inst.num_iks) {
            inst.iks = new Array(inst.num_iks);
            this._getStructureArray(inst.iks, 0, inst.num_iks);
        }

        // meshes.
        inst.num_meshes = this._getInt16();
        if (0 < inst.num_meshes) {
            inst.meshes = new Array(inst.num_meshes);
            this._getStructureArray(inst.meshes, 0, inst.num_meshes);
            for (let i = 0; i < inst.num_meshes; ++i) {
                let mesh = inst.meshes[i];
                if (mesh != null) {
                    mesh.parent = inst;
                }
            }
        }

        // nodes.
        inst.num_children = this._getInt16();
        if (0 < inst.num_children) {
            inst.children = new Array(inst.num_children);
            this._getStructureArray(inst.children, 0, inst.num_children);
            for (let i = 0; i < inst.num_children; ++i) {
                let node = inst.children[i];
                if (node != null) {
                    node.parent = inst;
                }
            }
        }

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

    /**
     * Get the inverse kinematics structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getIK
     * @param {xpl.XModelIK} inst - The inverse kinematics object.
     */
    xpl.XModelDecoder.prototype._getIK = function (inst) {
        // 対象
        inst.target = this._getStructure();

        // 最大反復数
        inst.max_iterations = this._getInt16();

        // チェーン長
        inst.chain_length = this._getInt16();

        // 影響度
        inst.influence = this._getFloat32();
    };

    /**
     * Get the animation structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getAnimation
     * @param {xpl.XModelAnimation} inst - The animation object.
     */
    xpl.XModelDecoder.prototype._getAnimation = function (inst) {
        // 名前
        inst.name = this._getString();

        // 対象
        inst.target = this._getStructure();

        // 対象のインデックス
        inst.index = this._getInt16();

        // キー
        inst.num_keys = this._getInt16();
        if (0 < inst.num_keys) {
            inst.keys = new Array(inst.num_keys);
            this._getStructureArray(inst.keys, 0, inst.num_keys);
        }

        // アニメーション
        inst.num_children = this._getInt16();
        if (0 < inst.num_children) {
            inst.children = new Array(inst.num_children);
            this._getStructureArray(inst.children, 0, inst.num_children);
        }

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

    /**
     * Get the animation key structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getAnimationKey
     * @param {xpl.XModelAnimationKey} inst - The animation key object.
     */
    xpl.XModelDecoder.prototype._getAnimationKey = function (inst) {
        // 補間
        inst.interpolate = this._getInt8();

        // 時間
        inst.time = this._getFloat64();

        // 値
        inst.value_size = this._getInt16();
        if (0 < inst.value_size) {
            inst.value = new Float32Array(inst.value_size);
            this._getFloat32Array(inst.value, 0, inst.value_size);
        }
    };

    /**
     * Get the animation set structure.
     *
     * @protected
     * @instance
     * @memberof xpl.XModelDecoder
     * @function _getAnimationSet
     * @param {xpl.XModelAnimationSet} inst - The animation set.
     */
    xpl.XModelDecoder.prototype._getAnimationSet = function (inst) {
        // 名前
        inst.name = this._getString();

        // アニメーション
        inst.num_animations = this._getInt16();
        if (0 < inst.num_animations) {
            inst.animations = new Array(inst.num_animations);
            this._getStructureArray(inst.animations, 0, inst.num_animations);
        }

        // ユーザ データ (インライン展開)
        inst.user_data = this._getUserData();
    };

})(xpl);
