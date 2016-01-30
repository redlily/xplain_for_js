# xPlain for JavaScript 0.9.0 beta

<img src="readme_res/ss.png" width="256" height="256" alt=""/>

## Discription

This is the library of JavaScript for general utilities and rendering the 3D model.

## How to use xPlain Library

Copies the library or source codes to your html directory.

Or install a library to use the bower.

```sh
$ bower install xplain
```

Import the script in html when copied the library.

```html
<script type="text/javascript" src="lib/xplain.min.js"></script>
```

Import the script in html when copied the source codes.

```html
<script type="text/javascript" src="lib/xplain_core.js"></script>
<script type="text/javascript" src="lib/utils_system.js"></script>
<script type="text/javascript" src="lib/utils_array.js"></script>
<script type="text/javascript" src="lib/utils_string.js"></script>
<script type="text/javascript" src="lib/utils_math.js"></script>
<script type="text/javascript" src="lib/utils_opengl.js"></script>
<script type="text/javascript" src="lib/math_geometry.js"></script>
<script type="text/javascript" src="lib/math_quaternion.js"></script>
<script type="text/javascript" src="lib/math_quaternion_dim.js"></script>
<script type="text/javascript" src="lib/math_matrix4x4.js"></script>
<script type="text/javascript" src="lib/math_matrix4x4_dim.js"></script>
<script type="text/javascript" src="lib/math_vector3.js"></script>
<script type="text/javascript" src="lib/xmodel_types.js"></script>
<script type="text/javascript" src="lib/xmodel_codec.js"></script>
<script type="text/javascript" src="lib/xmodel_decoder.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_transform.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_material.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_mesh.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_skin.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_node.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_kinematics.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_animation.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_container.js"></script>
<script type="text/javascript" src="lib/xmodel_utils_wrapper.js"></script>
```

And load a moudel data.

```javascript
var model = new xpl.XModelWrapperGL();
var config = xpl.XModelWrapperGL.defaultConfig();
config.use_skinning = true; // enable skinning by animation.
model.loadModelWithUrl(gl, "moudel.xm", "./current_path", config);
```

And drawing a moudel finally.
```javascript
var uniform_map = xpl.XModelWrapperGL.defaultUniformMap();
uniform_map.u_diffuse_color = u_diffuse_color;
uniform_map.u_diffuse_map = u_diffuse_map;
var attribute_map = xpl.XModelWrapperGL.defaultAttributeMap();
attribute_map.a_position = a_position;
attribute_map.a_normal = a_normal;
attribute_map.a_color = a_color;
attribute_map.a_tex_coord = a_tex_coord;
model.draw(gl, uniform_map, attribute_map);
```

## How to use Blender addons for xModel format

1. Copy from io_scene_xm directory in xplain_for_js/blender to blender addons directory.

2. Enable the xModel import/export module.  
File > User Prefarences > Addons > Import-Export > Import-Export: xModel Format

3. Then you can use the xModel importer and exporter.

### Notes
- Unsupported import from the xModel format yet.

## History

|Version|Date|Discription|
|:--|:--|:--|
|0.9.0 Beta|Jan. 24, 2016|Init release.|
|HEAD|-|-|

## Authors

Name: Syuuhei Kuno

E-Mail: circular.nine@gmail.com  
Twitter: [@tabihato](https://twitter.com/tabihato)

## Lincense

### xPlain Library

The BSD 3-Clause License

Copyright (c) 2015, Syuuhei Kuno
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

3. Neither the name of xplain_for_js nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### Moudel data of "Hackadoll" used in demonstrator

The Creative Commons license.

(c) 2015 DeNA Co.,Ltd.

Official Site: https://hackadoll.com/mmd  
Terms of service: https://hackadoll.com/mmd/terms
