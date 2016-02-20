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
     * OpenGL utilities for WebGL.
     *
     * @namespace xpl.GLUtils
     * @author Syuuhei Kuno
     */
    ns.GLUtils = function() {
        throw new Error("Unsupported operation");
    };

    Object.defineProperties(ns.GLUtils, {

        /**
        * Type of the OpenGL vertex shader.
        *
        * @constant
        * @memberof xpl.GLUtils
        * @member {String} TYPE_VERTEX_SHADER
        */
        "TYPE_VERTEX_SHADER": {
            value: "OpenGL Vertex Shader",
        },

        /**
        * Type of the OpenGL fragment shader.
        *
        * @constant
        * @memberof xpl.GLUtils
        * @member {String} TYPE_FRAGMENT_SHADER
        */
        "TYPE_FRAGMENT_SHADER": {
            value: "OpenGL Fragment Shader",
        },

        /**
        * Type of the OpenGL program.
        *
        * @constant
        * @memberof xpl.GLUtils
        * @member {String} TYPE_PROGRAM
        */
        "TYPE_PROGRAM": {
            value: "OpenGL Program",
        },
    });

    /**
     * This calback is prosessing for the error.
     *
     * @callback xpl.GLUtils~buildErrorCallback
     * @param {String} type - The error type.
     * @param {String} message - The error message.
     */

    /**
     * Create the OpenGL buffer instance.
     *
     * @memberof xpl.GLUtils
     * @function createBuffer
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {Number} type - The type of buffer.
     * @param {Number} data - The binary data.
     * @param {Number} usage - The usage of buffer.
     * @returns {WebGLBuffer} The buffer instance.
     */
    ns.GLUtils.createBuffer = function(gl, type, data, usage) {
        if (type == gl.ARRAY_BUFFER || type == gl.ELEMENT_ARRAY_BUFFER) {
            var buf = gl.createBuffer();
            if (buf != null) {
                gl.bindBuffer(type, buf);
                gl.bufferData(type, data, usage);
            }
            return buf;
        }
        return null;
    };

    /**
     * Create the OpenGL texture instance.
     *
     * @memberof xpl.GLUtils
     * @function createTexture2D
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {Number} format - The color format.
     * @param {Number} type - The data type.
     * @param {Number} width - The texture width.
     * @param {Number} height - The texture height.
     * @param {Object?} pixels -
     *              The pixel data.
     *              Can specified the null if not needed it.
     * @param {Boolean} mipmap -
     *              Generate the mipmap if set the true,
     *              not generate the mipmap if set the false.
     * @param {Array.<Number>?} size -
     *              Output size if set the destination array.
     *              Can specified the null if not needed it.
     * @param {Number} size_off - Starting position in the destination array of size.
     * @returns {WebGLTexture} The texture instance.
     */
    ns.GLUtils.createTexture2D = function(gl,
                                          format, type,
                                          width, height,
                                          pixels, mipmap,
                                          size, size_off) {
        // create the texture instance.
        var tex = gl.createTexture();
        if (tex != null) {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            var tex_width = ns.MathUtils.cailPow2(width);
            var tex_height = ns.MathUtils.cailPow2(height);
            if (width == tex_width && height == tex_height) {
                // size is number of power of two.
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                gl.texImage2D(
                    gl.TEXTURE_2D, 0,
                    format, tex_width, tex_height, 0,
                    format, type, pixels);
            } else {
                // size isn't number of power of two.
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

            // generate the mipmap.
            if (mipmap) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }

            // output the size.
            if (size != null) {
                size[size_off + 0] = tex_width;
                size[size_off + 1] = tex_height;
            }
        }
        return tex;
    };

    /**
     * Create the OpenGL texture instance from 2D.
     *
     * @memberof xpl.GLUtils
     * @function createTexture2DFromImage
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {Number} format - The color format.
     * @param {Number} type - The data type.
     * @param {Object} object - The image data.
     * @returns {WebGLTexture} The texture instance.
     */
    ns.GLUtils.createTexture2DFromImage = function(gl, format, type, object) {
        var tex = gl.createTexture();
        if (tex != null) {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, object);
        }
        return tex;
    };

    /**
     * Create the OpenGL shader instance.
     *
     * @memberof xpl.GLUtils
     * @function createShader
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {Number} type - The type of shader.
     * @param {String} code - The source code of shader.
     * @param {xpl.GLUtils.buildErrorCallback?} err_handle -
     *              Call the error handle when an exception occurs.
     *              Can specified the null if not needed it.
     * @returns {WebGLShader} The shader instance.
     */
    ns.GLUtils.createShader = function(gl, type, code, err_handle) {
        if (type == gl.VERTEX_SHADER || type == gl.FRAGMENT_SHADER) {
            // create the shader instance.
            var shader = gl.createShader(type);
            if (shader != null) {
                // compile the shader.
                gl.shaderSource(shader, code);
                gl.compileShader(shader);

                // error check.
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    var err_info = gl.getShaderInfoLog(shader);
                    console.error("Shader compile error:\n" + err_info);
                    if (err_handle != null) {
                        if (type == gl.VERTEX_SHADER) {
                            err_handle(ns.GLUtils.TYPE_VERTEX_SHADER, err_info);
                        } else if (type == gl.FRAGMENT_SHADER) {
                            err_handle(ns.GLUtils.TYPE_FRAGMENT_SHADER, + err_info);
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
     * Create the OpenGL program instance.
     *
     * @memberof xpl.GLUtils
     * @function createProgram
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {WebGLShader} vs - The vertex shader instance.
     * @param {WebGLShader} fs - The fragment shader instance.
     * @param {Map.<String, Number>} attr_map - The map of named attribute variables.
     * @param {xpl.GLUtils.buildErrorCallback?} err_handle -
     *              Call the error handle when an exception occurs.
     *              Can specified the null if not needed it.
     * @returns {WebGLProgram} The program instance.
     */
    ns.GLUtils.createProgram = function(gl, vs, fs, attr_map, err_handle) {
        if (vs != null && fs != null) {
            // create the program instance.
            var program = gl.createProgram();
            if (program != null) {
                // attach shader object to the program.
                gl.attachShader(program, vs);
                gl.attachShader(program, fs);
                if (attr_map != null) {
                    for (var key in attr_map) {
                        gl.bindAttribLocation(program, attr_map[key], key);
                    }
                }

                // linkage the program.
                gl.linkProgram(program);

                // error check.
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    var err_info = gl.getProgramInfoLog(program);
                    console.error("Program linkage error:\n" + err_info);
                    if (err_handle != null) {
                        err_handle(ns.GLUtils.TYPE_PROGRAM, err_info);
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
     * Create the OpenGL program instance from source code.
     *
     * @memberof xpl.GLUtils
     * @function createShaderProgram
     * @param {WebGLRenderingContext} gl - The OpenGL interface.
     * @param {String} vs_code - The source code of vertex shader.
     * @param {String} fs_code - The source code of fragment shader.
     * @param {Map.<String, Number>} attr_map - The map of named attribute variables.
     * @param {xpl.GLUtils.buildErrorCallback?} err_handle -
     *              Call the error handle when an exception occurs.
     *              Can specified the null if not needed it.
     * @returns {WebGLProgram} The program instance.
     */
    ns.GLUtils.createShaderProgram = function(gl, vs_code, fs_code, attr_map, err_handle) {
        // create the vertex shader instance.
        var vs = ns.GLUtils.createShader(gl, gl.VERTEX_SHADER, vs_code, err_handle);
        if (vs == null) {
            return null;
        }

        // create the fragment shader instance.
        var fs = ns.GLUtils.createShader(gl, gl.FRAGMENT_SHADER, fs_code, err_handle);
        if (fs == null) {
            gl.deleteShader(vs);
            return null;
        }

        // create the program instance.
        var pg = ns.GLUtils.createProgram(gl, vs, fs, attr_map, err_handle);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return pg;
    };

})(xpl);
