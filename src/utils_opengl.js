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
     * WebGL用のユーティリティクラスです。
     *
     * @constructor
     */
    xpl.GLUtils = function () {
        throw new Error("Unsupported operation!");
    };

    Object.defineProperties(xpl.GLUtils, {

        /**
         * 頂点シェーダの識別子
         *
         * @memberof xpl.GLUtils
         * @const {string} TYPE_VERTEX_SHADER
         */
        TYPE_VERTEX_SHADER: {value: "WebGL Vertex Shader"},

        /**
         * フラグメントシェーダの識別子
         *
         * @memberof xpl.GLUtils
         * @const {string} TYPE_FRAGMENT_SHADER
         */
        TYPE_FRAGMENT_SHADER: {value: "WebGL Fragment Shader"},

        /**
         * シェーダプログラムの識別子
         *
         * @memberof xpl.GLUtils
         * @const {string} TYPE_PROGRAM
         */
        TYPE_PROGRAM: {value: "WebGL Program"}
    });

    /**
     * エラーが発生した場合のコールバック関数の定義です。
     *
     * @callback xpl.GLUtils~buildErrorCallback
     * @param {string} type - エラー種別
     * @param {string} message - エラーメッセージ
     */

    /**
     * WebGLのバッファのインスタンスを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {number} type - バッファ種別
     * @param {ArrayBuffer|TypedArray} data - データ配列
     * @param {number} [usage=gl.STATIC_DRAW] - バッファの使用方法
     * @returns {WebGLBuffer} バッファのインスタンス
     */
    xpl.GLUtils.createBuffer = function (gl, type, data, usage) {
        usage = xpl.defaultValue(usage, gl.STATIC_DRAW);

        if (type == gl.ARRAY_BUFFER || type == gl.ELEMENT_ARRAY_BUFFER) {
            let buf = gl.createBuffer();
            if (buf != null) {
                gl.bindBuffer(type, buf);
                gl.bufferData(type, data, usage);
            }
            return buf;
        }
        return null;
    };

    /**
     * WebGLのテクスチャのインスタンスを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {number} format - 色のフォーマット
     * @param {number} type - データ種別
     * @param {number} width - テクスチャの幅
     * @param {number} height - テクスチャの高さ
     * @param {Object} [pixels=null] - ピクセル配列
     * @param {boolean} [mipmap=false] - ミップマップを生成するかどうか
     * @param {number[]} [size=null] - テクスチャサイズ
     * @param {number} [size_off=0] - テクスチャサイズの配列インデックス
     * @returns {WebGLTexture} テクスチャのインスタンス
     */
    xpl.GLUtils.createTexture2D = function (gl,
                                            format, type,
                                            width, height,
                                            pixels, mipmap,
                                            size, size_off) {
        pixels = xpl.defaultValue(pixels, null);
        mipmap = xpl.defaultValue(mipmap, false);
        size = xpl.defaultValue(size, null);
        size_off = xpl.defaultValue(size_off, 0);

        // テクスチャのインスタンス生成
        let tex = gl.createTexture();
        if (tex != null) {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            let tex_width = xpl.MathUtils.ceilPow2(width);
            let tex_height = xpl.MathUtils.ceilPow2(height);
            if (width == tex_width && height == tex_height) {
                // サイズが2の乗数の場合
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                gl.texImage2D(
                    gl.TEXTURE_2D, 0,
                    format, tex_width, tex_height, 0,
                    format, type, pixels);
            } else {
                // サイズが2の乗数ではない場合
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                gl.texImage2D(
                    gl.TEXTURE_2D, 0,
                    format, texWidth, texHeight, 0,
                    format, type, null);
                if (pixels != null) {
                    gl.texSubImage2D(
                        gl.TEXTURE_2D, 0,
                        0, 0, width, height,
                        format, type, pixels);
                }
            }

            // 初期パラメータを設定
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // ミップマップを生成
            if (mipmap) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }

            // テクスチャサイズを出力
            if (size != null) {
                size[size_off + 0] = tex_width;
                size[size_off + 1] = tex_height;
            }
        }
        return tex;
    };

    /**
     * 2次元の画像からWebGLのテクスチャのインスタンスを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {number} format - 色のフォーマット
     * @param {number} type - データ種別
     * @param {Object} object - 画像データ
     * @returns {WebGLTexture} テクスチャのインスタンス
     */
    xpl.GLUtils.createTexture2DFromImage = function (gl, format, type, object) {
        let tex = gl.createTexture();
        if (tex != null) {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, object);

            // 初期パラメータを設定
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        return tex;
    };

    xpl.GLUtils.createRenderBuffer = function (type, width, height) {
        let buf = gl.createRenderbuffer();
        if (buf != null) {
            gl.bindRenderbuffer(gl.RENDERBUFFER, buf);
            gl.renderbufferStorage(gl.RENDERBUFFER, type, width, height);
        }
        return buf;
    };

    xpl.GLUtils.createFramebuffer = function (color, depth, stencil) {
        let buf = gl.createFramebuffer();
        if (buf != null) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, buf);
            if (color != null) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, color);
            }
            if (depth != null) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth);
            }
            if (stencil != null) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
            }
        }
        return buf;
    };

    /**
     * ソースコードからWebGLのシェーダのインスタンを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {number} type - シェーダの種別
     * @param {string} code - シェーダのソースコード
     * @param {xpl.GLUtils~buildErrorCallback} [err_handle=null] - エラーをハンドルするためのコールバック関数
     * @returns {WebGLShader} シェーダのインスタンス
     */
    xpl.GLUtils.createShader = function (gl, type, code, err_handle) {
        err_handle = xpl.defaultValue(err_handle, null);

        if (type == gl.VERTEX_SHADER || type == gl.FRAGMENT_SHADER) {
            // シェーダのインスタンスを生成
            let shader = gl.createShader(type);
            if (shader != null) {
                // シェーダのコンパイル
                gl.shaderSource(shader, code);
                gl.compileShader(shader);

                // エラーをチェック
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    let err_info = gl.getShaderInfoLog(shader);
                    console.error("Shader compile error:\n" + err_info);
                    if (err_handle != null) {
                        if (type == gl.VERTEX_SHADER) {
                            err_handle(xpl.GLUtils.TYPE_VERTEX_SHADER, err_info);
                        } else if (type == gl.FRAGMENT_SHADER) {
                            err_handle(xpl.GLUtils.TYPE_FRAGMENT_SHADER, err_info);
                        }
                    }
                    gl.deleteShader(shader);
                    return null;
                }
            }
            return shader;
        }
        return null;
    };

    /**
     * WegGLのシェーダにアトリビュート変数のロケーションをバインドします。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {WebGLProgram} program - 対象のプログラム
     * @param {Map.<string, number>} map - バインドする名前付きアトリビュート変数のマップ
     */
    xpl.GLUtils.bindAttributes = function (gl, program, map) {
        Object.keys(map).forEach((key) => {
            gl.bindAttribLocation(program, map[key], key);
        });
    };

    /**
     * WebGLのプログラムからアトリビュート変数のロケーションを取得します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {WebGLProgram} program - 対象のプログラム
     * @param {Map.<string, number>} map - ロケーションを取得する名前付きアトリビュート変数のマップ
     */
    xpl.GLUtils.getAttributes = function (gl, program, map) {
        Object.keys(map).forEach((key) => {
            map[key] = gl.getAttribLocation(program, key);
        });
    };

    /**
     * WebGLのプログラムからユニフォーム変数のロケーションを取得します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {WebGLProgram} program - 対象のプログラム
     * @param {Map.<string, number>} map - ロケーションを取得する名前付きユニフォーム変数のマップ
     */
    xpl.GLUtils.getUniforms = function (gl, program, map) {
        Object.keys(map).forEach((key) => {
            map[key] = gl.getUniformLocation(program, key);
        });
    };

    /**
     * WebGLのシェーダからWebGLのプログラムのインスタンスを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {WebGLShader} vs - 頂点シェーダ
     * @param {WebGLShader} fs - フラグメントシェーダ
     * @param {Map.<string, number>} attr_map - バインドする名前付きアトリビュート変数のマップ
     * @param {xpl.GLUtils~buildErrorCallback} err_handle - エラーをハンドルするためのコールバック関数
     * @returns {WebGLProgram} プログラムのインスタンス
     */
    xpl.GLUtils.createProgram = function (gl, vs, fs, attr_map, err_handle) {
        if (vs != null && fs != null) {
            // プログラムのインスタンスを生成
            let program = gl.createProgram();
            if (program != null) {
                // シェーダオブジェクトをプログラムに接続
                gl.attachShader(program, vs);
                gl.attachShader(program, fs);
                if (attr_map != null) {
                    xpl.GLUtils.bindAttributes(gl, program, attr_map);
                }

                // プログラムのリンク
                gl.linkProgram(program);

                // エラーをチェック
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    let err_info = gl.getProgramInfoLog(program);
                    console.error("Program linkage error:\n" + err_info);
                    if (err_handle != null) {
                        err_handle(xpl.GLUtils.TYPE_PROGRAM, err_info);
                    }
                    gl.deleteProgram(program);
                    return null;
                }
            }
            return program;
        }
        return null;
    };

    /**
     * ソースコードからWebGLのプログラムを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {string} vs_code - 頂点シェーダのソースコード
     * @param {string} fs_code - フラグメントシェーダのソースコード
     * @param {Map.<string, number>} attr_map - バインドする名前付きアトリビュート変数のマップ
     * @param {xpl.GLUtils.buildErrorCallback} err_handle - エラーをハンドルするためのコールバック関数
     * @returns {WebGLProgram} プログラムのインスタンス
     */
    xpl.GLUtils.createShaderProgram = function (gl, vs_code, fs_code, attr_map, err_handle) {
        // 頂点シェーダのインスタンス生成
        let vs = xpl.GLUtils.createShader(gl, gl.VERTEX_SHADER, vs_code, err_handle);
        if (vs == null) {
            return null;
        }

        // フラグメントシェーダのインスタンス生成
        let fs = xpl.GLUtils.createShader(gl, gl.FRAGMENT_SHADER, fs_code, err_handle);
        if (fs == null) {
            gl.deleteShader(vs);
            return null;
        }

        // プログラムのインスタンス生成
        let pg = xpl.GLUtils.createProgram(gl, vs, fs, attr_map, err_handle);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return pg;
    };

    /**
     * DOMのIDからソースコードを取得してWebGLのプログラムを生成します。
     *
     * @param {WebGLRenderingContext} gl - WebGLのコンテキスト
     * @param {string} vs_id - 頂点シェーダのDOM ID
     * @param {string} fs_id - フラグメントシェーダのDOM ID
     * @param {Map.<string, number>} attr_map - バインドする名前付きアトリビュート変数のマップ
     * @param {xpl.GLUtils.buildErrorCallback} err_handle - エラーをハンドルするためのコールバック関数
     * @returns {WebGLProgram} プログラムのインスタンス
     */
    xpl.GLUtils.createShaderProgramFromDomId = function (gl, vs_id, fs_id, attr_map, err_handle) {
        return xpl.GLUtils.createShaderProgram(
            gl,
            document.getElementById(vs_id).text,
            document.getElementById(fs_id).text,
            attr_map,
            err_handle);
    };

})(xpl);
