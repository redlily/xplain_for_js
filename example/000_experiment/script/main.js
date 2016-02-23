/*
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

(function() {

    "use strict";

    // model's URL.
    var MODEL_NAME = "model.xm";
    // model's prefix.
    var MODEL_PREFIX = "../test_resources/3d_model/hackadoll_no2/";

    // attribute index map.
    var ATTRIBUTE_MAP = {
        "a_position": 0,
        "a_normal": 1,
        "a_color": 2,
        "a_tex_coord": 3,
        "a_bone_indices": 4,
        "a_bone_weights": 5,
    };
    // uniform names.
    var UNIFORM_NAMES = [
        "u_projection_transform",
        "u_view_transform",
        "u_model_transform",
        "u_light_diffuse_direction",
        "u_light_diffuse_color",
        "u_color",
        "u_diffuse_color",
        "u_diffuse_map",
        "u_bone_matrices",
        "u_max_bones",
    ];

    // screen element.
    var screen_element = null;
    // main canvas.
    var main_canvas = null;
    // play controller.
    var play_controller = null;
    // load progress.
    var load_spinner = null;
    // fps textfield.
    var fps_textfield = null;
    // OpenGL context.
    var gl = null;

    // prev frame time.
    var reflesh_prev_time = 0;
    // enable the refresh.
    var refresh_enable = false;
    // timer object for refresh.
    var refresh_timer = null;
    // refresh counter.
    var refresh_count = 0;
    // saved time for measurement fps.
    var refresh_saved_time = 0;

    // last of touch position.
    var last_touch_x = 0;
    // last of touch position.
    var last_touch_y = 0;

    // enable rotation.
    var enable_rotation = false;
    // radius horizontal rotation.
    var rotation_h = Math.PI / 8;
    // radius vertical rotation.
    var rotation_v = Math.PI / -16;

    // model shader.
    var model_shader = null;
    // guide shader.
    var guide_shader = null;
    // white texture.
    var white_texture = null;

    // model.
    var model = null;
    // ligth.
    var light = {
        diffuse_direction: new Float32Array([ 1, 1, -1 ]), // x, y, z
        diffuse_color: new Float32Array([ 1.0, 1.0, 1.0, 0.85 ]), // red, green, blue, opening
    };
    xpl.Vector3.normalizev(light.diffuse_direction, 0, light.diffuse_direction, 0);
    // animation index.
    var anim_index = 0;
    // animation time.
    var anim_time = 0;
    // is playing animation.
    var is_play_anim = true;

    // create shader program.
    var createShaderProgram = function(gl, vs, fs, failed_callback) {
        var inst = {};
        inst.program = xpl.GLUtils.createShaderProgram(
            gl, vs, fs, ATTRIBUTE_MAP, failed_callback);
        inst.attributes = ATTRIBUTE_MAP;
        inst.uniforms = {};
        for (var key in UNIFORM_NAMES) {
            var value = UNIFORM_NAMES[key];
            inst.uniforms[value] = gl.getUniformLocation(inst.program, value);
        }
        return inst;
    };

    // initialize the OpenGL.
    var onInitializeGL = function() {
        onRestoreGL();
    };

    // restore the OpenGL.
    var onRestoreGL = function() {
        enable_rotation = false;

        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // create the shader program.
        model_shader = createShaderProgram(
            gl,
            document.getElementById("model_vertex_shader").text,
            document.getElementById("model_fragment_shader").text,
            function(type, message) {
                alert("Compile failed for model be rendering.\n" + type + "\n" + message);
            });
        guide_shader = createShaderProgram(
            gl,
            document.getElementById("guide_vertex_shader").text,
            document.getElementById("guide_fragment_shader").text,
            function(type, message) {
                alert("Compile failed for guide be rendering.\n" + type + "\n" + message);
            });

        // create the white texture.
        white_texture = xpl.GLUtils.createTexture2D(
            gl,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            1, 1,
            new Uint8Array([255, 255, 255, 255]),
            false,
            null, 0);

        // load the model.
        model = new xpl.XModelWrapperGL();
        var config = xpl.XModelWrapperGL.defaultConfig();
        config[xpl.XModelWrapperGL.CONFIG_USE_SKINNING] = true;
        config[xpl.XModelWrapperGL.CONFIG_GPU_SKINNING] = true;
        config[xpl.XModelWrapperGL.CONFIG_MAX_BONE_MATRICES] = 32;
        model.initializeWithUrl(gl, MODEL_NAME, MODEL_PREFIX, config);
    };

    // refresh the OpenGL.
    var onRefreshGL = function(width, height, delta) {
        gl.viewport(0, 0, width, height);

        // draw the model.
        if (model.isCompleted) {
            gl.clearColor(0.5, 0.5, 0.5, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // hide a load spinner.
            load_spinner.style.visibility = "hidden";

            gl.useProgram(model_shader.program);

            // set the light information.
            gl.uniform3fv(
                model_shader.uniforms.u_light_diffuse_direction,
                light.diffuse_direction);
            gl.uniform4fv(
                model_shader.uniforms.u_light_diffuse_color,
                light.diffuse_color);

            // calculate projection transform.
            var width_rate = Math.min(height / width, 1.0);
            var height_rate = Math.min(width / height, 1.0);
            var projection_transform = new Float32Array(xpl.Geometry.SIZE_MATRIX_4X4);
            xpl.Matrix4x4.loadIdentity(projection_transform, 0);
            xpl.Matrix4x4.mulScale(
                projection_transform, 0,
                width_rate, height_rate, 1.0);
            xpl.Matrix4x4.mulPerspective(
                projection_transform, 0,
                1.0 / 16.0, 1.0 / 16.0, 1.0 / 4.0, 8.0,
                1.0, 1.0, -1.0, 1.0,
                true);
            gl.uniformMatrix4fv(
                model_shader.uniforms.u_projection_transform, false, projection_transform);

            // calculate view transform.
            var view_transform = new Float32Array(xpl.Geometry.SIZE_MATRIX_4X4);
            xpl.Matrix4x4.loadIdentity(view_transform, 0);
            xpl.Matrix4x4.mulLookAt(
                view_transform, 0,
                0, 0, -4.0,
                0, 0, 0,
                0, -1, 0,
                true);
            gl.uniformMatrix4fv(
                model_shader.uniforms.u_view_transform, false, view_transform);

            // calculate model transform.
            var model_transform = new Float32Array(xpl.Geometry.SIZE_MATRIX_4X4);
            xpl.Matrix4x4.loadIdentity(model_transform, 0);
            var model_scale = Math.min(
                1.7 / (Math.max(model.getSize(xpl.Geometry.VX), model.getSize(xpl.Geometry.VZ)) * width_rate),
                1.7 / (model.getSize(xpl.Geometry.VY) * height_rate));
            xpl.Matrix4x4.mulScale(model_transform, 0, model_scale, model_scale, model_scale);
            xpl.Matrix4x4.mulRotate(model_transform, 0, 1, 0, 0, rotation_v, true, true);
            xpl.Matrix4x4.mulRotate(model_transform, 0, 0, 1, 0, rotation_h, true, true);
            xpl.Matrix4x4.mulTranslate(
                model_transform, 0,
                -model.getCenter(xpl.Geometry.VX),
                -model.getCenter(xpl.Geometry.VY),
                -model.getCenter(xpl.Geometry.VZ),
                true);
            gl.uniformMatrix4fv(
                model_shader.uniforms.u_model_transform, false, model_transform);

            // draw the model.
            if (0 < model.numAnimationSets) {
                if (is_play_anim) {
                    model.setAnimation(
                        anim_index % model.numAnimationSets, anim_time / 1000.0, true, true);
                    anim_time += delta;
                }
            }

            // set the named argments.
            var uniforms = xpl.XModelWrapperGL.defaultUniforms();
            uniforms.u_diffuse_color = model_shader.uniforms.u_diffuse_color;
            uniforms.u_diffuse_map = model_shader.uniforms.u_diffuse_map;
            uniforms.u_bone_matrices = model_shader.uniforms.u_bone_matrices;
            uniforms.u_max_bones = model_shader.uniforms.u_max_bones;

            var attributes = xpl.XModelWrapperGL.defaultAttributes();
            attributes.a_position = model_shader.attributes.a_position;
            attributes.a_normal = model_shader.attributes.a_normal;
            attributes.a_color = model_shader.attributes.a_color;
            attributes.a_tex_coord = model_shader.attributes.a_tex_coord;
            attributes.a_bone_indices = model_shader.attributes.a_bone_indices;
            attributes.a_bone_weights = model_shader.attributes.a_bone_weights;

            model.draw(gl, uniforms, attributes);
        } else {
            gl.clearColor(0.25, 0.25, 0.25, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // visible a load spinner.
            load_spinner.style.visibility="visible";
        }

        // draw the guide.
        gl.useProgram(guide_shader.program);
    };

    // terminate the OpenGL.
    var onTerminateGL = function() {
        if (model != null) {
        }
    };

    // resume event.
    var onCreate = function(event) {
        console.log("create");

        // initalize the context.
        screen_element = document.getElementById("screen_element");
        fps_textfield = document.getElementById("fps_textfield");
        play_controller = document.getElementById("play_controller");
        play_controller.onselectstart = function () {
            return false;
        }
        load_spinner = document.getElementById("load_spinner");
        load_spinner.onselectstart = function() {
            return false;
        }
        main_canvas = document.getElementById("main_canvas");
        onResize();
        main_canvas.onselectstart = function () {
            return false;
        };

        var play_button = document.getElementById("play_button");
        play_button.onclick = onPlayAnim;
        var prev_button = document.getElementById("prev_button");
        prev_button.onclick = onPrevAnim;
        var next_button = document.getElementById("next_button");
        next_button.onclick = onNextAnim;
        var screen_mode_button = document.getElementById("screen_mode_button");
        screen_mode_button.onclick = onChangeScreenMode;

        // attach the event listeners.
        main_canvas.addEventListener("mousedown", onMouseEvent, false);
        main_canvas.addEventListener("mouseup", onMouseEvent, false);
        main_canvas.addEventListener("mousemove", onMouseEvent, false);
        main_canvas.addEventListener("mouseout", onMouseEvent, false);
        main_canvas.addEventListener("touchstart", onTouchEvent, false);
        main_canvas.addEventListener("touchend", onTouchEvent, false);
        main_canvas.addEventListener("touchmove", onTouchEvent, false);

        // initialize the OpenGL context.
        gl = main_canvas.getContext("webgl") || main_canvas.getContext('experimental-webgl');
        main_canvas.addEventListener(
            "webglcontextrestored", onRestoreWebGLContext, false);
        if (gl.getExtension("OES_element_index_uint") == null) {
            alert("Unsupported the OES_element_index_uint.");
            return;
        }

        // initialize the OpenGL.
        onInitializeGL();
        onResume(event);
    };

    // resize event.
    var onResize = function() {
        // FPS.
        if (fps_textfield != null) {
            fps_textfield.style.left = 5;
            fps_textfield.style.top = 5;
        }

        // load spinner.
        if (load_spinner != null) {
            load_spinner.style.left = window.innerWidth / 2 - load_spinner.clientWidth / 2;
            load_spinner.style.top = window.innerHeight / 2 - load_spinner.clientHeight / 2;
        }

        // controller.
        if (play_controller != null) {
            play_controller.style.left = 0;
            play_controller.style.top = window.innerHeight - play_controller.clientHeight;
        }

        // canvas.
        var width = window.innerWidth;
        var height = window.innerHeight;
        var devicePixelRatio = xpl.MathUtils.floorPow2(Math.max(window.devicePixelRatio, 1) || 1);
        console.log("resize: width=" + width + ", height=" + height + ", pixel_ratio=" + devicePixelRatio);
        main_canvas.style.width = width + "px";
        main_canvas.style.height = height + "px";
        main_canvas.width = width * devicePixelRatio;
        main_canvas.height = height * devicePixelRatio;
        screen_element.style.width = width + "px";
        screen_element.style.height = height + "px";
    };

    // mouse event.
    var onMouseEvent = function(event) {
        switch (event.type) {
            case "mousedown":
                enable_rotation = true;
                last_touch_x = event.clientX;
                last_touch_y = event.clientY;
                break;
            case "mousemove":
                if (enable_rotation) {
                    var now_x = event.clientX;
                    var now_y = event.clientY;
                    var weight = Math.min(main_canvas.width, main_canvas.height);
                    rotation_h -= 2.0 * Math.PI * (now_x - last_touch_x) / weight;
                    rotation_v -= 2.0 * Math.PI * (now_y - last_touch_y) / weight;
                    rotation_v = xpl.MathUtils.mid(rotation_v, -Math.PI * 0.5, Math.PI * 0.5);
                    last_touch_x = now_x;
                    last_touch_y = now_y;
                }
                break;
            case "mouseup":
                enable_rotation = false;
                break;
            case "mouseout":
                enable_rotation = false;
                break;
        }
    };

    // touch event.
    var onTouchEvent = function(event) {
        event.preventDefault();
        switch (event.type) {
            case "touchstart":
                enable_rotation = true;
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
                    last_touch_x = touch.clientX;
                    last_touch_y = touch.clientY;
                }
                break;
            case "touchmove":
                if (enable_rotation && event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
                    var now_x = touch.clientX;
                    var now_y = touch.clientY;
                    var weight = Math.min(main_canvas.width, main_canvas.height);
                    rotation_h -= 2.0 * Math.PI * (now_x - last_touch_x) / weight;
                    rotation_v -= 2.0 * Math.PI * (now_y - last_touch_y) / weight;
                    rotation_v = xpl.MathUtils.mid(rotation_v, -Math.PI * 0.5, Math.PI * 0.5);
                    last_touch_x = now_x;
                    last_touch_y = now_y;
                }
                break;
            case "touchend":
                enable_rotation = false;
                break;
        }
    };

    // change play animation.
    var onPlayAnim = function(event) {
        console.log("change play animation");
        if (is_play_anim) {
            is_play_anim = false;
        } else {
            is_play_anim = true;
        }
    };

    // change prev animation.
    var onPrevAnim = function(event) {
        console.log("change prev animation");
        if (model != null && model.isCompleted && 0 < model.numAnimationSets) {
            anim_index--;
            if (anim_index < 0) {
                anim_index = model.numAnimationSets - 1;
            }
            anim_time = 0;
            model.setAnimation(anim_index % model.numAnimationSets, 0.0, true, true);
        }
    };

    // change next animation.
    var onNextAnim = function(event) {
        console.log("change next animation");
        if (model != null && model.isCompleted && 0 < model.numAnimationSets) {
            anim_index++;
            anim_time = 0;
            model.setAnimation(anim_index % model.numAnimationSets, 0.0, true, true);
        }
    };

    // change screen mode.
    var onChangeScreenMode = function(event) {
        console.log("change screen mode");
        if (xpl.SystemUtils.isSupportedFullScreen(screen_element)) {
            if (!xpl.SystemUtils.isFullScreen(screen_element)) {
                // to full screen mode.
                xpl.SystemUtils.requestFullScreen(screen_element);
            } else {
                // to window screen mode.
                xpl.SystemUtils.cancelFullScreen();
            }
        }
    };

    // resume event.
    var onResume = function(event) {
        console.log("resume");
        startRefresh();
    };

    // restore WebGL context.
    var onRestoreWebGLContext = function(event) {
        console.log("restore");
        onRestoreGL();
    };

    // start refresh.
    var startRefresh = function() {
        if (!refresh_enable) {
            refresh_timer = xpl.SystemUtils.requestAnimationFrame(onRefresh);
            refresh_enable = true;
            refresh_count = 0;
            refresh_saved_time = Date.now();
            reflesh_prev_time = refresh_saved_time;
        }
    };

    // stop refresh.
    var stoprefresh = function() {
        if (refresh_enable) {
            cancelTimeout(refresh_timer);
            refresh_timer = null;
            refresh_enable = false;
        }
    };

    // refresh event.
    var onRefresh = function() {
        var now_time = Date.now();

        if (!gl.isContextLost()) {
            onRefreshGL(main_canvas.width, main_canvas.height, now_time - reflesh_prev_time);
            reflesh_prev_time = now_time;
        }

        // FPS control.
        if (refresh_enable) {
            refresh_timer = xpl.SystemUtils.requestAnimationFrame(onRefresh);

            // update the display FPS.
            if (1000 < now_time - refresh_saved_time) {
                fps_textfield.innerHTML = "FPS:" + refresh_count;
                refresh_saved_time = now_time;
                refresh_count = 0;
            }
            refresh_count++;
        }
    };

    // suspend event.
    var onSuspend = function(event) {
        console.log("suspend");
        stoprefresh();
    };

    // unload event.
    var onDestroy = function(event) {
        onSuspend(event);
        console.log("destroy");

        // terminate the OpenGL.
        if (gl != null) {
            onTerminateGL();
            gl = null;
        }
        main_canvas.removeEventListener(
            "webglcontextrestored", onRestoreWebGLContext, false);

        // detach the event listeners.
        if (main_canvas != null) {
            main_canvas.removeEventListener("mousedown", onMouseEvent, false);
            main_canvas.removeEventListener("mouseup", onMouseEvent, false);
            main_canvas.removeEventListener("mousemove", onMouseEvent, false);
            main_canvas.removeEventListener("mouseout", onMouseEvent, false);
            main_canvas.removeEventListener("touchstart", onTouchEvent, false);
            main_canvas.removeEventListener("touchend", onTouchEvent, false);
            main_canvas.removeEventListener("touchmove", onTouchEvent, false);
            main_canvas = null;
        }
        window.removeEventListener("load", onCreate);
        window.removeEventListener("resize", onResize);
        //window.removeEventListener("focus", onResume);
        //window.removeEventListener("blur", onSuspend);
        window.removeEventListener("unload", onDestroy);
    };

    // attach the event listeners.
    window.addEventListener("load", onCreate, false);
    window.addEventListener("resize", onResize, false);
    //window.addEventListener("focus", onResume, false);
    //window.addEventListener("blur", onSuspend, false);
    window.addEventListener("unload", onDestroy, false);

})();
