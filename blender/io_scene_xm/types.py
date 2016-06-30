#
# Copyright (c) 2015, Syuuhei Kuno
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
#  1. Redistributions of source code must retain the above copyright notice, this
#     list of conditions and the following disclaimer.
#
#  2. Redistributions in binary form must reproduce the above copyright notice,
#     this list of conditions and the following disclaimer in the documentation
#     and / or other materials provided with the distribution.
#
#  3. Neither the name of the copyright holder nor the names of its contributors
#     may be used to endorse or promote products derived from this software
#     without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
# ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#

import math

# create the unit quaternion
def _identity_quaternion():
    return [ 1.0, 0.0, 0.0, 0.0 ]


# create the identity matrix
def _identity_matrix():
    return [ 1.0, 0.0, 0.0, 0.0,
             0.0, 1.0, 0.0, 0.0,
             0.0, 0.0, 1.0, 0.0,
             0.0, 0.0, 0.0, 1.0 ]

# Base structure of xModel
# @author Syuuhei Kuno
class XModelStructure:

    # structure of nudefined
    TYPE_UNDEFINED      = -1
    # structure of null
    TYPE_NULL           =  0
    # structure of axis rotate
    TYPE_AXIS_ROTATE    =  1
    # structure of quaternion
    TYPE_QUATERNION     =  2
    # structure of scale
    TYPE_SCALE          =  3
    # structure of translate
    TYPE_TRANSLATE      =  4
    # structure of matrix
    TYPE_MATRIX         =  5
    # structure of container
    TYPE_CONTAINER      =  6
    # structure of texture
    TYPE_TEXTURE        =  7
    # structure of material
    TYPE_MATERIAL       =  8
    # structure of mesh
    TYPE_MESH           =  9
    # structure of node
    TYPE_NODE           =  10
    # structure of kinematic
    TYPE_KINEMATIC      =  11
    # structure of animation
    TYPE_ANIMATION      =  12
    # structure of animation key
    TYPE_ANIMATION_KEY  =  13
    # structure of animation set
    TYPE_ANIMATION_SET  =  14

    # size of RGBA parameter
    SIZE_RGBA       = 4
    # size of three dimensionally vector
    SIZE_VECTOR_3   = 3
    # size of axis rotate parameter
    SIZE_AXIS_ROTATE     = 4 # three dimensionally vector and angle.
    # size of quaternion parameter
    SIZE_QUATERNION = 4
    # size of scale parameter
    SIZE_SCALE      = 3
    # size of translate parameter
    SIZE_TRANSLATE  = 3
    # size of matrix parameter
    SIZE_MATRIX     = 16
    
    # number of slot for animation blend
    NUM_BLEND_SLOT = 2;
    
    # initialize
    def __init__(self, structure_type):
        # const int32_t : type of structure
        self.structure_type = structure_type

# User data structure of xModel
# @author Syuuhei Kuno
class XModelUserData:

    # initialize
    def __init__(self):
        # int32_t : size of data
        self.data_size = 0
        # byte[] : data
        self.data = None

# Axis rotate transform structure of xModel
# @author Syuuhei Kuno
class XModelAxisRotate(XModelStructure):

    # initialize
    def __init__(self):
        super(XModelRotate, self).__init__(self.TYPE_AXIS_ROTATE)

        # float32[SIZE_ASIS_ROTATE] : initial value
        self.initial = [ 0.0, 0.0, 0.1, 0.0 ]

        # work variable

        # float32[SIZE_AXIS_ROTATE * NUM_BLEND_SLOT] : work value
        self.value = [ 0.0, 0.0, 0.1, 0.0 ] * self.NUM_BLEND_SLOT

# Quaternion transform structure fo xModel
# @author Syuuhei Kuno
class XModelQuaternion(XModelStructure):

    # initialize
    def __init__(self):
        super(XModelQuaternion, self).__init__(self.TYPE_QUATERNION)

        # float32[SIZE_QUATERNION] : initial value
        self.initial = _identity_quaternion()

        # work variable

        # float32[SIZE_QUATERNION * NUM_BLEND_SLOT] : work value
        self.value = _identity_quaternion() * self.NUM_BLEND_SLOT

# Scale transform structure of xModel
# @author Syuuhei Kuno
class XModelScale(XModelStructure):

    # initialize
    def __init__(self):
        super(XModelScale, self).__init__(self.TYPE_SCALE)

        # float32[SIZE_SCALE] : initial value
        self.initial = [ 1.0, 1.0, 1.0 ]

        # work variable

        # float32[SIZE_SCALE * NUM_BLEND_SLOT] : work value
        self.value = [ 1.0, 1.0, 1.0 ] * self.NUM_BLEND_SLOT

# Translate transform structure of xModel
# @author Syuuhei Kuno
class XModelTranslate(XModelStructure):

    # initialize
    def __init__(self):
        super(XModelTranslate, self).__init__(self.TYPE_TRANSLATE)

        # float32[SIZE_TRANSLATE] : initial value
        self.initial = [ 0.0, 0.0, 0.0 ]

        # work variable

        # float32[SIZE_TRANSLATE * NUM_BLEND_SLOT : work value
        self.value = [ 0.0, 0.0, 0.0 ] * self.NUM_BLEND_SLOT

# Matrix transform structure of xModel
# @author Syuuhei Kuno
class XModelMatrix(XModelStructure):

    # initialize
    def __init__(self):
        super(XModelMatrix, self).__init__(self.TYPE_MATRIX)

        # float32[SIZE_MATRIX * NUM_BLEND_SLOT] : initial value
        self.initial = _identity_matrix()

        # work variable

        # float32[SIZE_MATRIX] : work value
        self.value = _identity_matrix() * self.NUM_BLEND_SLOT

# Extensible structure of xModel
# @author Syuuhei Kuno
class XModelExtensible(XModelStructure):

    # initialize
    def __init__(self, structure_type):
        super(XModelExtensible, self).__init__(structure_type)

        # XModelUserData[] : it's user data
        self.user_data = None

        # work variable

        # any object : temporary user object
        self.user_object = None

# Container structure of xModel
# @author Syuuhei Kuno
class XModelContainer(XModelExtensible):

    # initialize
    def __init__(self):
        super(XModelContainer, self).__init__(self.TYPE_CONTAINER)

        # string : container name
        self.name = None

        # int16_t : number of textures
        self.num_textures = 0
        # XModelTexture[] : array of textures
        self.textures = None

        # int16_t : number of materials
        self.num_materials = 0
        # XModelMateria[] : array of materials
        self.materials = None

        # int16_t : number of meshs
        self.num_meshs = 0
        # XModelMesh[] : array of meshs
        self.meshs = None

        # int16_t : number of nodes
        self.num_nodes = 0
        # XModelNone[] : array of nodes
        self.nodes = None

        # double : time rate of unit number of sec
        self.time_rate = 1.0

        # int16_t : number of animation sets
        self.num_animation_sets = 0
        # XmodelAnimationSet[] : array of animation sets
        self.animation_sets = None

# Texture structure of xModel
# @author Syuuhei Kuno
class XModelTexture(XModelExtensible):

    # initialize
    def __init__(self):
        super(XModelTexture, self).__init__(self.TYPE_TEXTURE)

        # string : texture name
        self.name = None
        # string : reference name to texture
        self.ref = None
        # int32_t : size of binary data of texture
        self.data_size = 0
        # byte[] : binary data of texture
        self.data = None

        # work variable

        # any object :
        self.texture = None
        # int32_t :
        self.x_size = 0
        # int32_t :
        self.y_size = 0
        # int32_t :
        self.z_size = 0

# Material structure of xModel
# @author Syuuhei Kuno
class XModelMaterial(XModelExtensible):

    # draw mode none
    DRAW_MODE_FACE_NONE                = 0
    # draw mode for draw only the front surface
    DRAW_MODE_FACE_FRONT_BITS          = 0x1<<0
    # draw mode for draw only the back surface
    DRAW_MODE_FACE_BACK_BITS           = 0x1<<1
    # draw mode for draw front and back surface
    DRAW_MODE_FACE_FRONT_AND_BACK_BITS = (DRAW_MODE_FACE_FRONT_BITS |
                                          DRAW_MODE_FACE_BACK_BITS)

    # initialize
    def __init__(self):
        super(XModelMaterial, self).__init__(self.TYPE_MATERIAL)

        # string : material name
        self.name = None

        # float32_t[SIZE_RGBA] : emissive color
        self.emissive = [ 0.0, 0.0, 0.0, 1.0 ]
        # float32_t[SIZE_RGBA] : ambient color
        self.ambient = [ 0.1, 0.1, 0.1, 1.0 ]
        # float32_t[SIZE_RGBA] : diffuse color
        self.diffuse =  [ 1.0, 1.0, 1.0, 1.0 ]
        # float32_t[SIZE_RGBA] : specular color
        self.specular = [ 0.4, 0.4, 0.4, 1.0 ]
        # float32_t : shininess power
        self.shininess = 5.0
        # float32_t : bump power
        self.bump = 1.0

        # XModelTexture : texture of emissive color map
        self.emissive_map = None
        # XModelTexture : texture of ambient color map
        self.ambient_map = None
        # XModelTexture : texture of diffuse color map
        self.diffuse_map = None
        # XModelTexture : texture of specular color map
        self.specular_map = None
        # XModelTexture : texture of shininess power map
        self.shininess_map = None
        # XModelTexture : texture of bump power map
        self.bump_map = None

        # int32_t : draw mode flags
        self.draw_mode = self.DRAW_MODE_FACE_FRONT_BITS

# Mesh structure of xModel
# @author Syuuhei Kuno
class XModelMesh(XModelExtensible):

    # initialize
    def __init__(self):
        super(XModelMesh, self).__init__(self.TYPE_MESH)

        # string : mesh name
        self.name = None

        # int32_t : number of positions
        self.num_positions = 0
        # int8_t : vector size of position
        self.position_size = 0
        # float32_t[] : position array
        self.positions = None

        # int32_t : number of normals
        self.num_normals = 0
        # int8_t : vector size of normal
        self.normal_size = 0
        # float32_t[] : normal array
        self.normals = None

        # int32_t : number of colors
        self.num_colors = 0
        # int8_t : vector size of color
        self.color_size = 0
        # float32_t[] : color array
        self.colors = None

        # int32_t : number of texture coordinates
        self.num_tex_coords = 0
        # int8_t : vector size of texture coordinate
        self.tex_coord_size = 0
        # float32_t[] : texture coordinate array
        self.tex_coords = None

        # XModelSkin : skin structure
        self.skin = None

        # int32_t : number of vertices
        self.num_vertices = 0
        # XModelVertex[] : vertex array
        self.vertices = None

        # int16_t : number of materials
        self.num_materials = 0
        # XModelMaterial[] : material array
        self.materials = None

        # int32_t : number of element
        self.num_elements = 0
        # XModelElement[] : element array
        self.elements = None

        # work variable

        # XModelNone : parent of this mesh
        self.parent = None # weak reference

        # any object : vertex buffer object
        self.vertex_buffer = None
        # any object : element buffer object
        self.element_buffer = None

# Skin data structure of xModel
# @author Syuuhei Kuno
class XModelSkin:

    # 1 dimentions weight
    SIZE_WEIGHTED1 = 1
    # 2 dimentions weight
    SIZE_WEIGHTED2 = 2
    # 3 dimentions weight
    SIZE_WEIGHTED3 = 3
    # 3 dimentions weight
    SIZE_WEIGHTED4 = 4

    # initialize
    def __init__(self):
        # int32_t : number of weighted indices
        self.num_weighted_indices = 0
        # int8_t : weighted index stride
        self.weighted_index_stride = 0

        # int8_t : weighted index sizes of bone
        self.weighted_index_sizes = None
        # int32_t : bone indices
        self.indices = None
        # float32_t : bone weights
        self.weights = None

        # int16_t : number of nodes as the bones
        self.num_nodes = 0

        # float[] : offset matrices
        self.offset_matrices = None
        # float[] : offset quaternions
        self.offset_quaternions = None

        # XModelNodes[] : nodes as the bones
        self.nodes = None # elements is weak reference

# Vertex data structure of xModel
# @author Syuuhei Kuno
class XModelVertex:
    
    # initialize
    def __init__(self):
        # int32_t : position index
        self.position = -1
        # int32_t : normal index
        self.normal = -1
        # int32_t : color index
        self.color = -1
        # int32_t : texture coordinate index
        self.tex_coord = -1
        # int32_t : skinning weight index
        self.skin_weight = -1

    def __hash__(self):
        return (self.position ^
                self.normal ^
                self.color ^
                self.tex_coord ^
                self.skin_weight)

    def __eq__(self, other):
        if not isinstance(other, XModelVertex):
            return False
        return (self.position == other.position and
                self.normal == other.normal and
                self.color == other.color and
                self.tex_coord == other.tex_coord and
                self.skin_weight == other.skin_weight)

# Element data structure of xModel
# @author Syuuhei Kuno
class XModelElement:

    # initialize
    def __init__(self):
        # int16_t : material index
        self.material = -1
        # int8_t : number of vertex indices
        self.num_vertices = 0
        # int32_t[] : vertex index array
        self.vertices = None

    def __hash__(self):
        return (self.material ^
                self.num_vertices ^
                hash(self.vertices) if self.vertices is not None else 0)

    def __eq__(self, other):
        if not isinstance(other, XModelElement):
            return False
        return (self.material == other.material and
                self.num_vertices == other.num_vertices and
                self.vertices == other.vertices)

# Node structure of xModel
# @author Syuuhei Kuno
class XModelNode(XModelExtensible):

    # transform of matrix
    TRANSFORM_MATRIX    = 0
    # transform of translate
    TRANSFORM_TRANSLATE = 1
    # transform of scale
    TRANSFORM_SCALE     = 2
    # transform of rotate
    TRANSFORM_ROTATE    = 3
    # number of transforms
    NUM_TRANSFORMS      = 4

    # initialize
    def __init__(self):
        super(XModelNode, self).__init__(self.TYPE_NODE)

        # string : node name
        self.name = None
        
        # bool : connected parent
        self.connected = True
        
        # bool[SIZE_VECTOR_3] : lock the rotation of axis by ik
        self.ik_lock_axis = [ False, False, False ]
        # bool[SIZE_VECTOR_3] : limit the angle of axis rotate by ik
        self.ik_limit_angle = [ False, False, False ]
        # float32_t[SIZE_VECTOR_3] : minimum angle for ik limits
        self.ik_min_angle = [ -math.pi, -math.pi, -math.pi  ]
        # float32_t[SIZE_VECTOR_3] : maximum angle for ik limits
        self.ik_max_angle = [ math.pi, math.pi, math.pi  ]
        
        # float32_t[SIZE_VECTOR_3] : location of bone tail
        self.bone_tail = [ 0.0, 0.0, 0.0 ]

        # XModelTransform[NUM_TRANSFORMS] : array of transforms
        self.transforms = [ None, None, None, None ]
        
        # int16_t : number of inverse kinematics
        self.num_inverse_kinematics = 0
        # XModelKinematic[] : array of inverse kinematics
        self.inverse_kinematics = None

        # int16_t : number of meshs
        self.num_meshs = 0
        # XModelMesh[] : array of meshs
        self.meshs = None

        # int16_t : number of children
        self.num_children = 0
        # XModelFrame[] : array of children
        self.children = None

        # work variable

        # XModelNode : this object is parent of this node
        self.parent = None # weak reference

        # float32_t[SIZE_MATRIX] : offset matrix
        self.offset_matrix = _identity_matrix()
        # float32_t[SIZE_QUATERNION] : offset quaternion
        self.offset_quaternion = _identity_quaternion()

        # float32_t[] : combined matrix
        self.combined_matrix = _identity_matrix()
        # float32_t[] : combined quaternion
        self.combined_quaternion = _identity_quaternion()
        
# Kinematic structure of xModel
# @author Syuuhei Kuno
class XModelKinematic(XModelStructure):
    
    # initialize
    def __init__(self):
        super(XModelKinematic, self).__init__(self.TYPE_KINEMATIC)
        
        # XModelNode : target node
        self.target = None
        # int16 : max number of iterations
        self.max_iterations = 100
        # int16 : chain length of nodes
        self.chain_length = 1
        # float32_t : influence on transform of bone
        self.influence = 1.0
        
# Animation structure of xModel
# @author Syuuhei Kuno
class XModelAnimation(XModelExtensible):
    
    # initialize
    def __init__(self):
        super(XModelAnimation, self).__init__(self.TYPE_ANIMATION)
        
        # string : animation name
        self.name = None
        
        # XModelStructure : target
        self.target = None
        # int32_t : index in elements of target
        self.index = -1
        
        # int16_t : number of keys
        self.num_keys = 0
        # XModelAnimationKey[] : array of keys
        self.keys = None
        
        # int16_t : number of children
        self.num_children = 0
        # XModelAnimation[] : array of children
        self.children = None
        
# Animation key structure of xModel
# @author Syuuhei Kuno
class XModelAnimationKey(XModelStructure):
    
    # interpolate by unknown
    INTERPOLATE_UNKNOWN = -1;
    # interpolate by liner
    INTERPOLATE_LINER   =  0
    # interpolate by bezier
    INTERPOLATE_BEZIER  =  1
    
    # initialize
    def __init__(self):
        super(XModelAnimationKey, self).__init__(self.TYPE_ANIMATION_KEY)
        
        # int8_t : interpolate
        self.interpolate = self.INTERPOLATE_UNKNOWN
        
        # float64_t : time
        self.time = 0
        # float64_t : before control time
        self.before_time = 0
        # float64_t : after control time
        self.after_time = 0
        
        # int32_t : value size
        self.value_size = 0
        # float32_t[] : value
        self.value = None
        # float32_t[] : before control value
        self.before_value = None
        # float32_t[] : after control value
        self.after_value = None
        
# Animation set structure of xModel
# @author Syuuhei Kuno
class XModelAnimationSet(XModelExtensible):
    
    # initialize
    def __init__(self):
        super(XModelAnimationSet, self).__init__(self.TYPE_ANIMATION_SET)
        
        # string : animation set name
        self.name = None
        
        # int16_t : number of animations
        self.num_animations = 0
        # XModelAnimation[] : array of animations
        self.animations = None
        