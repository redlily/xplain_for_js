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
     * Identifier counter of the instance.
     *
     * @private
     * @static
     * @memberof xpl.XModelStructure
     * @member {xpl.uint32_t} identifier_counter
     */
    var identifier_counter = 1;

    /**
     * Base structure of the xModel.
     *
     * @class
     * @alias xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - The structure type.
     * @author Syuuhei Kuno
     */
    ns.XModelStructure = function(structure_type) {

        /**
         * uint32_t : Type of the structure.
         *
         * @constant
         * @instance
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} structure_type
         */
        this.structure_type = structure_type;

        /**
         * uint32_t : Identifier of the instance.
         *
         * @private
         * @constant
         * @instance
         * @memberof xpl.XModelStructure
         * @member {xpl.uint32_t} identifier
         */
        var identifier = identifier_counter++;

        /**
         * Get the identifier of instance.
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @function valueOf
         * @returns {xpl.uint32_t} The identifier.
         */
        this.valueOf = function() {
            return identifier;
        };

        /**
         * Get the hash code of instance.
         * Default implementation is equivalent to the valueOf().
         *
         * @instance
         * @memberof xpl.XModelStructure
         * @function hashCode
         * @returns {xpl.uint32_t} The hash code.
         */
        this.hashCode = function() {
            return identifier;
        };
    };

    /**
     * Compares this instance with specified object.
     *
     * @instance
     * @memberof xpl.XModelStructure
     * @function equals
     * @param {xpl.XModelStructure} other - The other instance.
     * @returns {Boolean} Returns true if equivalent to the parameter.
     */
    ns.XModelStructure.prototype.equals = function(other) {
        return this == other;
    };

    Object.defineProperties(ns.XModelStructure, {

        /**
         * Structure of the nudefined.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_UNDEFINED
         */
        "TYPE_UNDEFINED": {
            value: -1,
        },

        /**
         * Structure of the null.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_NULL
         */
        "TYPE_NULL": {
            value: 0,
        },

        /**
         * Structure of the axis rotation.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_AXIS_ROTATE
         */
        "TYPE_AXIS_ROTATE": {
            value: 1,
        },

        /**
         * Structure of the quaternion.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_QUATERNION
         */
        "TYPE_QUATERNION": {
            value: 2,
        },

        /**
         * Structure of the scale.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_SCALE
         */
        "TYPE_SCALE": {
            value: 3,
        },

        /**
         * Structure of the translate.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_TRANSLATE
         */
        "TYPE_TRANSLATE": {
            value: 4,
        },

        /**
         * Structure of the matrix.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MATRIX
         */
        "TYPE_MATRIX": {
            value: 5,
        },

        /**
         * Structure of the container.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_CONTAINER
         */
        "TYPE_CONTAINER": {
            value:6,
        },

        /**
         * Structure of the texture.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_TEXTURE
         */
        "TYPE_TEXTURE": {
            value: 7,
        },

        /**
         * Structure of the material.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MATERIAL
         */
        "TYPE_MATERIAL": {
            value: 8,
        },

        /**
         * Structure of the mesh.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MESH
         */
        "TYPE_MESH": {
            value: 9,
        },

        /**
         * Structure of the mesh subset.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_MESH_SUBSET
         */
        "TYPE_MESH_SUBSET": {
            value: 15,
        },

        /**
         * Structure of the node.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_NODE
         */
        "TYPE_NODE": {
            value: 10,
        },

        /**
         * Structure of the inverse kinematics.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_IK
         */
        "TYPE_IK": {
            value: 11,
        },

        /**
         * Structure of the animation.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION
         */
        "TYPE_ANIMATION": {
            value: 12,
        },

        /**
         * Structure of the animation key.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION_KEY
         */
        "TYPE_ANIMATION_KEY": {
            value: 13,
        },

        /**
         * Structure of the animation set.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.enum_t} TYPE_ANIMATION_SET
         */
        "TYPE_ANIMATION_SET": {
            value: 14,
        },

        /**
         * Size of the RGBA parameter.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_RGBA
         */
        "SIZE_RGBA": {
            value: 4,
        },

        /**
         * Size of the three dimensionally vector.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_VECTOR_3
         */
        "SIZE_VECTOR_3": {
            value: 3,
        },

        /**
         * Size of the axis rotate parameter.
         * Elements are the three dimensionally vector and angle.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_AXIS_ROTATE
         */
        "SIZE_AXIS_ROTATE": {
            value: 4,
        },

        /**
         * Size of the quaternion parameter.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_QUATERNION
         */
        "SIZE_QUATERNION": {
            value: 4,
        },

        /**
         * Size of the scale parameter.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_SCALE
         */
        "SIZE_SCALE": {
            value: 3,
        },

        /**
         * Size of the translate parameter.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_TRANSLATE
         */
        "SIZE_TRANSLATE": {
            value: 3,
        },

        /**
         * Size of the matrix parameter.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} SIZE_MATRIX
         */
        "SIZE_MATRIX": {
            value: 16,
        },

        /**
         * Number of slot for animation blend.
         *
         * @constant
         * @memberof xpl.XModelStructure
         * @member {xpl.size_t} NUM_BLEND_SLOT
         */
        "NUM_BLEND_SLOT": {
            value: 2,
        },
    });

})(xpl);

(function(ns) {

    "use strict";

    /**
     * User data structure of the xModel.
     *
     * @class
     * @alias xpl.XModelUserData
     * @author Syuuhei Kuno
     */
    ns.XModelUserData = function() {

        /**
         * uint32_t : The size of data.
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @member {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * (uint8_t|int8_t)[data_size] : The data.
         *
         * @instance
         * @memberof xpl.XModelUserData
         * @member {Uint8Array|Int8Array} data
         */
        this.data = null;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Base transform structure of the xModel.
     *
     * @class
     * @alias xpl.XModelTransform
     * @augments xpl.XModelStructure
     * @param {xpl.enum_t} structure_type - The structure type.
     * @author Syuuhei Kuno
     */
    ns.XModelTransform = function(structure_type) {
        ns.XModelStructure.call(this, structure_type);
    };

    Object.setPrototypeOf(ns.XModelTransform.prototype, ns.XModelStructure.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Axis rotate transform structure of the xModel.
     *
     * @class
     * @alias xpl.XModelAxisRotate
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelAxisRotate = function() {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_AXIS_ROTATE);

        /**
         * float32_t[SIZE_ASIS_ROTATE] : The initial value.
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([0.0, 0.0, 0.0, 1.0]);

        // work variable.

        /**
         * float32_t[SIZE_AXIS_ROTATE * NUM_BLEND_SLOT] : The work value.
         *
         * @instance
         * @memberof xpl.XModelAxisRotate
         * @member {Float32Array} value
         */
        this.value = new Float32Array([0.0, 0.0, 0.0, 1.0,
                                       0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelAxisRotate.prototype, ns.XModelTransform.prototype);

    Object.defineProperties(ns.XModelStructure, {

        /**
         * Angle element of the rotation.
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.size_t} ANGLE
         */
        "ANGLE": {
            value: 0,
        },

        /**
         * X-axis element of the rotation.
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.size_t} X
         */
        "X": {
            value: 1,
        },

        /**
         * Y-axis element of the roattion.
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.size_t} Y
         */
        "Y": {
            value: 2,
        },

        /**
         * Z-axis element of the rotation.
         *
         * @constant
         * @memberof xpl.XModelAxisRotate
         * @member {xpl.size_t} Z
         */
        "Z": {
            value: 3,
        },
    });

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Quaternion transform structure fo the xModel.
     *
     * @class
     * @alias xpl.XModelQuaternion
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelQuaternion = function() {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_QUATERNION);

        /**
         * float32_t[SIZE_MATRIX] : The initial value.
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 0.0, 0.0, 0.0]);

        // work variable.

        /**
         * float32_t[SIZE_MATRIX * NUM_BLEND_SLOT] : The work value.
         *
         * @instance
         * @memberof xpl.XModelQuaternion
         * @member {Float32Array} value
         */
        this.value = new Float32Array([1.0, 0.0, 0.0, 0.0,
                                       1.0, 0.0, 0.0, 0.0]);
    };

    Object.setPrototypeOf(ns.XModelQuaternion.prototype, ns.XModelTransform.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Scale transform structure of the xModel.
     *
     * @class
     * @alias xpl.XModelScale
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelScale = function() {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_SCALE);

        /**
         * float32_t[SIZE_SCALE] : The initial value.
         *
         * @instance
         * @memberof xpl.XModelScale
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 1.0, 1.0]);

        // work variable.

        /**
         * float32_t[SIZE_SCALE * NUM_BLEND_SLOT] : The work value.
         *
         * @instance
         * @memberof xpl.XModelScale
         * @member {Float32Array} value
         */
        this.value = new Float32Array([1.0, 1.0, 1.0,
                                       1.0, 1.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelScale.prototype, ns.XModelTransform.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Translate transform structure of the xModel.
     *
     * @class
     * @alias xpl.XModelTranslate
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelTranslate = function() {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_TRANSLATE);

        /**
         * float32_t[SIZE_TRANSLATE] : The initial value.
         *
         * @instance
         * @memberof xpl.XModelTranslate
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([0.0, 0.0, 0.0]);

        // work variable.

        /**
         * float32_t[SIZE_TRANSLATE * NUM_BLEND_SLOT] : The work value.
         *
         * @instance
         * @memberof xpl.XModelTranslate
         * @member {Float32Array} value
         */
        this.value = new Float32Array([0.0, 0.0, 0.0,
                                       0.0, 0.0, 0.0]);
    };

    Object.setPrototypeOf(ns.XModelTranslate.prototype, ns.XModelTransform.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Matrix transform structure of the xModel.
     *
     * @class
     * @alias xpl.XModelMatrix
     * @augments xpl.XModelTransform
     * @author Syuuhei Kuno
     */
    ns.XModelMatrix = function() {
        ns.XModelTransform.call(this, ns.XModelStructure.TYPE_MATRIX);

        /**
         * float32_t[SIZE_MATRIX] : The initial value.
         *
         * @instance
         * @memberof xpl.XModelMatrix
         * @member {Float32Array} initial
         */
        this.initial = new Float32Array([1.0, 0.0, 0.0, 0.0,
                                         0.0, 1.0, 0.0, 0.0,
                                         0.0, 0.0, 1.0, 0.0,
                                         0.0, 0.0, 0.0, 1.0]);

        // work variable.

        /**
         * float32_t[SIZE_MATRIX * NUM_BLEND_SLOT] : The work value.
         *
         * @instance
         * @memberof xpl.XModelMatrix
         * @member {Float32Array} value
         */
        this.value = new Float32Array([1.0, 0.0, 0.0, 0.0,
                                       0.0, 1.0, 0.0, 0.0,
                                       0.0, 0.0, 1.0, 0.0,
                                       0.0, 0.0, 0.0, 1.0,
                                       1.0, 0.0, 0.0, 0.0,
                                       0.0, 1.0, 0.0, 0.0,
                                       0.0, 0.0, 1.0, 0.0,
                                       0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelMatrix.prototype, ns.XModelTransform.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Extensible structure of the xModel.
     *
     * @class
     * @alias xpl.XModelExtensible
     * @augments xpl.XModelStructure
     * @author Syuuhei Kuno
     */
    ns.XModelExtensible = function(structure_type) {
        ns.XModelStructure.call(this, structure_type);

        /**
         * XModelUserData : The user data.
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @member {xpl.XModelUserData} user_data
         */
        this.user_data = null

        // work variable.

        /**
         * Object : The temporary user object.
         *
         * @instance
         * @memberof xpl.XModelExtensible
         * @member {Object} user_object
         */
        this.user_object = null
    };

    Object.setPrototypeOf(ns.XModelExtensible.prototype, ns.XModelStructure.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Container structure of the xModel.
     *
     * @class
     * @alias xpl.XModelContainer
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelContainer = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_CONTAINER);

        /**
         * string : The container name.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {String} name
         */
        this.name = null;

        /**
         * uint16_t : The Number of textures.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_textures
         */
        this.num_textures = 0;

        /**
         * XModelTexture[num_textures] : The array of textures.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelTexture>} textures
         */
        this.textures = null;

        /**
         * uint16_t : The number of materials.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_materials
         */
        this.num_materials = 0;

        /**
         * XModelMateria[num_materials] : The array of materials.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelMaterial>} materials
         */
        this.materials = null;

        /**
         * uint16_t : The number of meshes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0;

        /**
         * XModelMesh[num_meshes] : The array of meshes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelMesh>} meths
         */
        this.meshes = null;

        /**
         * uint16_t : The number of nodes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNode[num_nodes] : The array of nodes.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelNode>} node
         */
        this.nodes = null;

        /**
         * float64_t : The time rate of unit number of sec.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.float64_t} time_rate
         */
        this.time_rate = 1.0;

        /**
         * uint16_t : The number of animation sets.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {xpl.uint16_t} num_animation_sets
         */
        this.num_animation_sets = 0;

        /**
         * XModelAnimationSet[num_animation_sets] : The array of animation sets.
         *
         * @instance
         * @memberof xpl.XModelContainer
         * @member {Array.<xpl.XModelAnimationSet>} animation_sets
         */
        this.animation_sets = null;
    };

    Object.setPrototypeOf(ns.XModelContainer.prototype, ns.XModelExtensible.prototype);

    /**
     * Get the name of this container.
     *
     * @instance
     * @memberof xpl.XModelContainer
     * @function toString
     * @returns {String} The name of this container.
     */
    ns.XModelContainer.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Texture structure of the xModel.
     *
     * @class
     * @alias xpl.XModelTexture
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelTexture = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_TEXTURE);

        /**
         * string : The texture name.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {String} name
         */
        this.name = null;

        /**
         * string : The reference name to texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {String} ref
         */
        this.ref = null;

        /**
         * uint32_t : The size of binary data of texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} data_size
         */
        this.data_size = 0;

        /**
         * (uint8_t|int8_t)[data_size] : The binary data of texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Uint8Array|Int8Array} data
         */
        this.data = null;

        // work variable.

        /**
         * Object : The texture instance.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {Object} texture
         */
        this.texture = null

        /**
         * uint32_t : X-axis size of the texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} x_size
         */

        this.x_size = 0;
        /**
         * uint32_t : Y-axis size of the texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} y_size
         */

        this.y_size = 0;

        /**
         * uint32_t : Z-axis size of the texture.
         *
         * @instance
         * @memberof xpl.XModelTexture
         * @member {xpl.uint32_t} z_size
         */
        this.z_size = 0;
    };

    Object.setPrototypeOf(ns.XModelTexture.prototype, ns.XModelExtensible.prototype);

    /**
     * Get the name of this texture.
     *
     * @instance
     * @memberof xpl.XModelTexture
     * @function toString
     * @returns {String} The name of this texture.
     */
    ns.XModelTexture.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Material structure of the xModel.
     *
     * @class
     * @alias xpl.XModelMaterial
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelMaterial = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_MATERIAL);

        /**
         * string : The material name.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {String} name
         */
        this.name = null;

        /**
         * float32_t[SIZE_RGBA] : The emissive color.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} emissive
         */
        this.emissive = [ 0.0, 0.0, 0.0, 1.0 ];

        /**
         * float32_t[SIZE_RGBA] : The ambient color.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} ambient
         */
        this.ambient = [ 0.1, 0.1, 0.1, 1.0 ];

        /**
         * float32_t[SIZE_RGBA] : The diffuse color.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} diffuse
         */
        this.diffuse =  [ 1.0, 1.0, 1.0, 1.0 ];

        /**
         * float32_t[SIZE_RGBA] : The specular color.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {Float32Array} specular
         */
        this.specular = [ 0.4, 0.4, 0.4, 1.0 ];

        /**
         * float32_t : The shininess power.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.float32_t} shininess
         */
        this.shininess = 5.0;

        /**
         * float32_t : The bump power.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.float32_t} bump
         */
        this.bump = 1.0;

        /**
         * XModelTexture : The texture of emissive color map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} emissive_map
         */
        this.emissive_map = null;

        /**
         * XModelTexture : The texture of ambient color map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} ambient_map
         */
        this.ambient_map = null;

        /**
         * XModelTexture : The texture of diffuse color map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} diffuse_map
         */
        this.diffuse_map = null;

        /**
         * XModelTexture : The texture of specular color map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture}specular_map
         */
        this.specular_map = null;

        /**
         * XModelTexture : The texture of shininess power map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} shininess_map
         */
        this.shininess_map = null;

        /**
         * XModelTexture : The texture of bump power map.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.XModelTexture} bump_map
         */
        this.bump_map = null;

        /**
         * uint32_t : The draw mode flags.
         *
         * @instance
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} draw_mode
         */
        this.draw_mode = ns.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS;
    };

    Object.setPrototypeOf(ns.XModelMaterial.prototype, ns.XModelExtensible.prototype);

    Object.defineProperties(ns.XModelMaterial, {

        /**
         * Draw mode none.
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_NONE_BITS
         */
        "DRAW_MODE_FACE_NONE_BITS": {
            value: 0,
        },

        /**
         * Draw mode for draw only the front surface.
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_FRONT_BITS
         */
        "DRAW_MODE_FACE_FRONT_BITS": {
            value: 0x1 << 0,
        },

        /**
         * Draw mode for draw only the back surface.
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_BACK_BITS
         */
        "DRAW_MODE_FACE_BACK_BITS": {
            value: 0x1 << 1,
        },

        /**
         * Draw mode for draw front and back surface.
         *
         * @constant
         * @memberof xpl.XModelMaterial
         * @member {xpl.uint32_t} DRAW_MODE_FACE_FRONT_AND_BACK_BITS
         */
        "DRAW_MODE_FACE_FRONT_AND_BACK_BITS": {
            value: (ns.XModelMaterial.DRAW_MODE_FACE_FRONT_BITS |
                    ns.XModelMaterial.DRAW_MODE_FACE_BACK_BITS),
        },
    });

    /**
     * Get the name of this material.
     *
     * @instance
     * @memberof xpl.XModelMaterial
     * @function toString
     * @returns {String} The name of this material.
     */
    ns.XModelMaterial.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Mesh structure of the xModel.
     *
     * @class
     * @alias xpl.XModelMesh
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelMesh = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_MESH);

        /**
         * string : The mesh name.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {String} name
         */
        this.name = null;

        /**
         * uint32_t : The number of positions.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_positions
         */
        this.num_positions = 0;

        /**
         * uint8_t : The vector size of position.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} position_size
         */
        this.position_size = 0;

        /**
         * float32_t[position_size * num_positions] : The position array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} positions
         */
        this.positions = null;

        /**
         * uint32_t : The number of normals.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_normals
         */
        this.num_normals = 0;

        /**
         * uint8_t : The vector size of normal.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} normal_size
         */
        this.normal_size = 0;

        /**
         * float32_t[normal_size * num_normals] : The normal array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} normals
         */
        this.normals = null;

        /**
         * uint32_t : The number of colors.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_colors
         */
        this.num_colors = 0;

        /**
         * uint8_t : The vector size of color.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} color_size
         */
        this.color_size = 0;

        /**
         * float32_t[color_size * num_colors] : The color array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} colors
         */
        this.colors = null;

        /**
         * uint32_t : The number of texture coordinates.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_tex_coords
         */
        this.num_tex_coords = 0;

        /**
         * uint8_t : The vector size of texture coordinate.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint8_t} tex_coord_size
         */
        this.tex_coord_size = 0;

        /**
         * float32_t[tex_coord_size * num_tex_coords] : The texture coordinate array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Float32Array} tex_coords
         */
        this.tex_coords = null;

        /**
         * XModelSkin : The skin structure.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelSkin} skin
         */
        this.skin = null;

        /**
         * uint32_t : The number of vertices.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * XModelVertex[num_vertices] : The vertex array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Array.<xpl.XModelVertex>} vertices
         */
        this.vertices = null;

        /**
         * uint16_t : The number of materials.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint16_t} num_materials
         */
        this.num_materials = 0;

        /**
         * XModelMaterial[num_materials] : The material array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Array.<xpl.XModelMaterial>} materials
         */
        this.materials = null;

        /**
         * uint32_t : The number of elements.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.uint32_t} num_elements
         */
        this.num_elements = 0;

        /**
         * XModelElement[num_elements] : The element array.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Array.<xpl.XModelElement>} elements
         */
        this.elements = null;

        // work variable.

        /**
         * XModelNode : The parent of this mesh.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.XModelNode} parent
         */
        this.parent = null; // weak reference.

        /**
         * int16_t : The number of subset meshs of this mesh.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {xpl.int16_t} num_subset
         */
        this.num_subsets = 0;

        /**
         * XModelMeshSubset[num_subset] : The subset mesh array of this mesh.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Array.<XModelMeshSubset>} subset
         */
        this.subsets = null;

        /**
         * Object : The vertex buffer object.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_buffer
         */
        this.vertex_buffer = null;

        /**
         * Object : The vertex array object.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} vertex_array.
         */
        this.vertex_array = null;

        /**
         * Object : The element buffer object.
         *
         * @instance
         * @memberof xpl.XModelMesh
         * @member {Object} element_buffer
         */
        this.element_buffer = null;
    };

    Object.setPrototypeOf(ns.XModelMesh.prototype, ns.XModelExtensible.prototype);

    /**
     * Get the name of this mesh.
     *
     * @instance
     * @memberof xpl.XModelMesh
     * @function toString
     * @returns {String} The name of this mesh.
     */
    ns.XModelMesh.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Subset mesh of the xModel.
     *
     * @class
     * @alias xpl.XModelSubsetMesh
     * @author Syuuhei Kuno
     */
    ns.XModelMeshSubset = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_MESH_SUBSET);

        /**
         * uint32_t : The number of bone indices.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_bones
         */
        this.num_bones = 0;

        /**
         * uint32_t[num_bones] : The indices of bone indices that are sorted in ascending order.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Uint16Array} bones
         */
        this.bones = null;

        /**
         * uint32_t : The number of vertices.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * uint32_t[num_vertices] : The indices of vertices that are sorted in ascending order.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Uint32Array} vertices
         */
        this.vertices = null;

        /**
         * uint32_t : The number of elements.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.uint32_t} num_elements
         */
        this.num_elements = 0;

        /**
         * XModelElement[num_elements] : The indices of element that are sorted in ascending order.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {xpl.XModelElement} elements
         */
        this.elements = null;

        /**
         * Object : The vertex buffer object.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Object} vertex_buffer
         */
        this.vertex_buffer = null;

        /**
         * Object : The vertex array object.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Object} vertex_array.
         */
        this.vertex_array = null;

        /**
         * Object : The element buffer object.
         *
         * @instance
         * @memberof xpl.XModelMeshSubset
         * @member {Object} element_buffer
         */
        this.element_buffer = null;
    };

    Object.setPrototypeOf(ns.XModelMesh.prototype, ns.XModelExtensible.prototype);

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Skin data structure of the xModel.
     *
     * @class
     * @alias xpl.XModelMesh
     * @author Syuuhei Kuno
     */
    ns.XModelSkin = function() {
        /**
         * uint32_t : The number of weighted indices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint32_t} num_weighted_indices
         */
        this.num_weighted_indices = 0;

        /**
         * uint8_t : The weighted index stride.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint8_t} weighted_index_stride
         */
        this.weighted_index_stride = 0;

        /**
         * uint8_t[num_weighted_indices] : The weighted index sizes of bone.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Uint8Array} weighted_index_sizes
         */
        this.weighted_index_sizes = null;

        /**
         * uint16_t[num_weighted_indices * weighted_index_stride] : The bone indices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Int16Array} indices
         */
        this.indices = null;

        /**
         * float32_t[num_weighted_indices * weighted_index_stride] : The bone weights.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Float32Array} weights
         */
        this.weights = null;

        /**
         * uint16_t : The number of nodes as bones.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {xpl.uint16_t} num_nodes
         */
        this.num_nodes = 0;

        /**
         * XModelNodes[num_nodes] : The nodes as bones.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Array.<xpl.XModelNode>} nodes
         */
        this.nodes = null; // elements is the weak reference.

        /**
         * float32_t[num_nodes] : The offset matrices.
         *
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Float32Array} offset_matrices
         */
        this.offset_matrices = null;

        /**
         * float32_t[num_nodes] : The offset quaternions.
         *
         * @deprecated
         * @instance
         * @memberof xpl.XModelSkin
         * @member {Float32Array} offset_quaternions
         */
        this.offset_quaternions = null;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Vertex data structure of the xModel.
     *
     * @class
     * @alias xpl.XModelVertex
     * @author Syuuhei Kuno
     */
    ns.XModelVertex = function() {
        /**
         * uint32_t : The position index.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} position
         */
        this.position = -1;

        /**
         * uint32_t : The normal index.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} normal
         */
        this.normal = -1;

        /**
         * uint32_t : The color index.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} color
         */
        this.color = -1;

        /**
         * uint32_t : The texture coordinate index.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} tex_coord
         */
        this.tex_coord = -1;

        /**
         * uint32_t : The skin weight.
         *
         * @instance
         * @memberof xpl.XModelVertex
         * @member {xpl.uint32_t} skin_weight
         */
        this.skinning = -1;
    };

    /**
     * Get the hash code of instance.
     *
     * @instance
     * @memberof xpl.XModelVertex
     * @function hashCode
     * @returns {Boolean} The hash code.
     */
    ns.XModelVertex.prototype.hashCode = function() {
        return this.position ^
               this.normal ^
               this.color ^
               this.tex_coord ^
               this.skinning;
    };

    /**
     * Compares this instance with specified object.
     *
     * @instance
     * @memberof xpl.XModelVertex
     * @function equals
     * @param {xpl.XModelVertex} other - The other instance.
     * @returns {Boolean} Returns true if equivalent to the parameter.
     */
    ns.XModelVertex.prototype.equals = function(other) {
        if (this === other) {
            return true;
        }
        if (other != null && other instanceof ns.XModelVertex) {
            return this.position == other.position &&
                   this.normal == other.normal &&
                   this.color == other.color &&
                   this.tex_coord == other.tex_coord &&
                   this.skinning == other.skinning;
        }
        return false;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Element data structure of the xModel.
     *
     * @class
     * @alias xpl.XModelElement
     * @author Syuuhei Kuno
     */
    ns.XModelElement = function() {
        /**
         * uint16_t : The material index.
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {xpl.uint16_t} material
         */
        this.material = -1;

        /**
         * uint8_t : The number of vertex indices.
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {xpl.uint8_t} num_vertices
         */
        this.num_vertices = 0;

        /**
         * uint32_t[num_vertices] : The vertex index array.
         *
         * @instance
         * @memberof xpl.XModelElement
         * @member {Uint32Array} vertices
         */
        this.vertices = null;
    };

    /**
     * Get the hash code of instance.
     *
     * @instance
     * @memberof xpl.XModelElement
     * @function hashCode
     * @returns {Boolean} The hash code.
     */
    ns.XModelElement.prototype.hashCode = function() {
        var vertices_hash_code = 0;
        for (var i = 0; i < this.num_vertices; ++i) {
            vertices_hash_code ^= this.vertices[i];
        }
        return this.material ^
               this.num_vertices ^
               vertices_hash_code;
    };

    /**
     * Compares this instance with specified object.
     *
     * @instance
     * @memberof xpl.XModelElement
     * @function equals
     * @param {xpl.XModelElement} other - The other instance.
     * @returns {Boolean} Returns true if equivalent to the parameter.
     */
    ns.XModelElement.prototype.equals = function(other) {
        if (this === other) {
            return true;
        }
        if (other && other instanceof ns.XModelElement) {
            for (var i = 0; i < this.num_vertices && i < other.num_vertices; ++i) {
                if (this.vertices[i] != other.vertices[i]) {
                    return false;
                }
            }
            return this.material == other.material &&
                   this.num_vertices == other.num_vertices;
        }
        return false;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Node structure of the xModel.
     *
     * @class
     * @alias xpl.XModelNode
     * @augments xpl.ModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelNode = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_NODE);

        /**
         * string : The node name.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {String} name
         */
        this.name = null;

        /**
         * boolean_t : The connected parent.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Boolean} connected
         */
        this.connected = true;

        /**
         * boolean_t[SIZE_VECTOR_3] : Lock the rotation of axis for kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} lock_axises
         */
        this.lock_axises = new Uint8Array([false, false, false]);

        /**
         * boolean_t[SIZE_VECTOR_3] : Limit the angle of axis rotate for kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Uint8Array} limit_angles
         */
        this.limit_angles = new Uint8Array([false, false, false]);

        /**
         * float32_t[SIZE_VECTOR_3] : The minimum angle for kinematics limits.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} min_angles
         */
        this.min_angles = new Float32Array([-Math.PI, -Math.PI, -Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : The maximum angle for kinematics limits.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} max_angles
         */
        this.max_angles = new Float32Array([Math.PI, Math.PI, Math.PI]);

        /**
         * float32_t[SIZE_VECTOR_3] : The location of bone tail.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} bone_tail
         */
        this.bone_tail = new Float32Array([0.0, 0.0, 0.0]);

        /**
         * XModelTransform[NUM_TRANSFORMS] : The array of transforms.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelTransform>} transforms
         */
        this.transforms = [null, null, null, null];

        /**
         * uint16_t : The number of inverse kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_iks
         */
        this.num_iks = 0;

        /**
         * XModelIK[num_iks] : The array of inverse kinematics.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelIK>} iks
         */
        this.iks = null;

        /**
         * uint16_t : The number of meshes.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_meshes
         */
        this.num_meshes = 0

        /**
         * XModelMesh[num_meshes] : The array of meshes.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelMesh>} meshes
         */
        this.meshes = null;

        /**
         * uint16_t : The number of children.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.uint16_t} num_children
         */
        this.num_children = 0;

        /**
         * XModelFrame[num_children] : The array of children.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Array.<xpl.XModelFrame>} children
         */
        this.children = null;

        // work variable.

        /**
         * XModelNode : this object is parent of this node.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {xpl.XModelNode} parent
         */
        this.parent = null; // weak reference.

        /**
         * float32_t[SIZE_MATRIX] : offset matrix.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} offset_matrix
         */
        this.offset_matrix = new Float32Array([1.0, 0.0, 0.0, 0.0,
                                               0.0, 1.0, 0.0, 0.0,
                                               0.0, 0.0, 1.0, 0.0,
                                               0.0, 0.0, 0.0, 1.0]);

        /**
         * float32_t[SIZE_MATRIX] : The combined matrix.
         *
         * @instance
         * @memberof xpl.XModelNode
         * @member {Float32Array} combined_matrix
         */
        this.combined_matrix = new Float32Array([1.0, 0.0, 0.0, 0.0,
                                                 0.0, 1.0, 0.0, 0.0,
                                                 0.0, 0.0, 1.0, 0.0,
                                                 0.0, 0.0, 0.0, 1.0]);
    };

    Object.setPrototypeOf(ns.XModelNode.prototype, ns.XModelExtensible.prototype);

    Object.defineProperties(ns.XModelNode, {

        /**
         * Transform of the matrix.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_MATRIX
         */
        "TRANSFORM_MATRIX": {
            value: 0,
        },

        /**
         * Transform of the translate.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_TRANSLATE
         */
        "TRANSFORM_TRANSLATE": {
            value: 1,
        },

        /**
         * Transform of the scale.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_SCALE
         */
        "TRANSFORM_SCALE": {
            value: 2,
        },

        /**
         * Transform of the rotate.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} TRANSFORM_ROTATE
         */
        "TRANSFORM_ROTATE": {
            value: 3,
        },

        /**
         * Number of the transforms.
         *
         * @constant
         * @memberof xpl.XModelNode
         * @member {xpl.size_t} NUM_TRANSFORMS
         */
        "NUM_TRANSFORMS": {
            value: 4,
        },
    });

    /**
     * Get the name of this node.
     *
     * @instance
     * @memberof xpl.XModelNode
     * @function toString
     * @returns {String} The name of this node.
     */
    ns.XModelNode.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Inverse kinematics structure of the xModel.
     *
     * @class
     * @alias xpl.XModelIK
     * @augments xpl.XModelStructure
     * @author Syuuhei Kuno
     */
    ns.XModelIK = function() {
        ns.XModelStructure.call(this, ns.XModelStructure.TYPE_IK);

        /**
         * XModelNode : The target node.
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.XModelNode} target
         */
        this.target = null;

        /**
         * uint16_t : The max number of iterations.
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} max_iterations
         */
        this.max_iterations = 500;

        /**
         * uint16_t : The chain length of nodes.
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} chain_length
         */
        this.chain_length = 1;

        /**
         * float32_t : The influence on transform of bone.
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.float32_t} influence
         */
        this.influence = 1.0;
    };

    Object.setPrototypeOf(ns.XModelIK.prototype, ns.XModelStructure.prototype);

    /**
     * Get the name of this inverse kinematics structure.
     *
     * @instance
     * @memberof xpl.XModelIK
     * @function toString
     * @returns {String} The name of this inverse kinematics structure.
     */
    ns.XModelIK.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Animation structure of xModel.
     *
     * @class
     * @alias xpl.XModelAnimation
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelAnimation = function() {
        ns.XModelExtensible.call(this, ns.XModelStructure.TYPE_ANIMATION);

        /**
         * string : The animation name.
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
     * Get the name of this animation structure.
     *
     * @instance
     * @memberof xpl.XModelAnimation
     * @function toString
     * @returns {String} The name of this animation structure.
     */
    ns.XModelAnimation.prototype.toString = function() {
        return this.name;
    };

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Animation key structure of the xModel.
     *
     * @class
     * @alias xpl.XModelAnimationKey
     * @augments xpl.XModelStructure
     * @author Syuuhei Kuno
     */
    ns.XModelAnimationKey = function() {
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
        },
    });

})(xpl);

(function(ns) {

    "use strict";

    /**
     * Animation set structure of the xModel.
     *
     * @class
     * @alias xpl.XModelAnimationSet
     * @augments xpl.XModelExtensible
     * @author Syuuhei Kuno
     */
    ns.XModelAnimationSet = function() {
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
    ns.XModelAnimationSet.prototype.toString = function() {
        return this.name
    };

})(xpl);
