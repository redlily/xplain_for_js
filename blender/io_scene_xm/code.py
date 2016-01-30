#
# Copyright (c) 2012 - 2015, Syuuhei Kuno
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

import struct
import io_scene_xm
from io_scene_xm.types import (XModelStructure,
                               XModelNode)

# code name
CODE_NAME = "Elise"

# magic number (XModel DAta)
MAGIC_NUMBER = (((0xff & ord('x')) << 0)  |
                ((0xff & ord('m')) << 8)  |
                ((0xff & ord('d')) << 16) |
                ((0xff & ord('a')) << 24))

# tarminator (End Of Xmodel Data)
END_OF_DATA = (((0xff & ord('e')) << 0)  |
               ((0xff & ord('o')) << 8)  |
               ((0xff & ord('x')) << 16) |
               ((0xff & ord('d')) << 24))

# version
VERSION = 35

# compatibility version
COMPATIBILITY_VERSION = 35

# version name
VERSION_NAME = "0.9.91"

# compatibility version name
COMPATIBILITY_VERSION_NAME = "0.9.91"

# binary encoder for xModel
# @author Syuuhei Kuno
class XModelBinaryEncoder:

    # initialize
    def __init__(self):
        # writer
        self.__writer = None
        # instance map, key is structure, value is identifier
        self.__inst_map = {}
        # weak reference instance map, key is structure, value is identifier
        self.__weak_inst_map = {}
        # instance identifier counter
        self.__inst_id_cnt = 1
        # worte size in binary
        self.__write_size = 0

    # recycle for this instance
    def __recycle(self):
        self.__writer = None
        self.__inst_map.clear()
        self.__weak_inst_map.clear()
        self.__inst_id_cnt = 1

    # write 8bits size integer
    def _putInt8(self, value):
        self.__writer.write(struct.pack("<B", 0xff & value))
        self.__write_size += 1

    # write 16bits size integer
    def _putInt16(self, value):
        self.__writer.write(struct.pack("<H", 0xffff & value))
        self.__write_size += 2

    # write 32bits size integer
    def _putInt32(self, value):
        self.__writer.write(struct.pack("<I", 0xffffffff & value))
        self.__write_size += 4

    # put 32bits size float number
    def _putFloat32(self, value):
        self.__writer.write(struct.pack("<f", value))
        self.__write_size += 4

    # write 64bits size float number
    def _putFloat64(self, value):
        self.__writer.write(struct.pack("<d", value))
        self.__write_size += 8

    # write 8bits size integer array
    def _putInt8Array(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putInt8(array[i])

    # write 16bits size integer array
    def _putInt16Array(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putInt16(array[i])

    # write 32bits size integer array
    def _putInt32Array(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putInt32(array[i])

    # write 32bits size float number array
    def _putFloat32Array(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putFloat32(array[i])

    # write 64bits size float number array
    def _putFloat64Arrat(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putFloat64(array[i])

    # write boolean
    def _putBool(self, value):
        self._putInt8(1 if value else 0)
        
    # write boolean array
    def _putBoolArray(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putBool(array[i])
        
    # write string
    def _putString(self, value):
        if value is None:
            self._putInt16(0)
        else:
            buffer = value.encode("utf-8")
            self._putInt16(len(buffer))
            self.__writer.write(buffer)

    # write string array
    def _putStringArray(self, array, offset, length):
        for i in range(offset, offset+length):
            self._putString(array[i])

    # write boolean
    def _putBool(self, value):
        if value:
            self._putInt8(1)
        else:
            self._putInt8(0)
            
    # write boolean array
    def _putBoolArray(self, array, offset, length):
        for i in range(offset, offset + length):
            self._putBool(array[i])

    # write structure
    def _putXModelStructure(self, value):
        if value is None:
            self._putInt32(0)
        elif value in self.__inst_map:
            self._putInt32(self.__inst_map[value])
        else:
            self.__inst_map[value] = self.__inst_id_cnt
            self._putInt32(self.__inst_id_cnt)
            self.__inst_id_cnt += 1
            self._putInt32(value.structure_type)
            self._putStructureProcedure(value)

    # write structure array
    def _putStructureArray(self, array, offset, length):
        for i in range(offset, offset+length):
            self._putXModelStructure(array[i])

    # encode to binary
    def encode(self, structure, writer):
        self.__recycle()
        self.__writer = writer
        self.__write_size = 0

        # magic number
        self._putInt32(MAGIC_NUMBER)

        # version
        self._putInt32(VERSION)

        # writing structure
        self._putInt32(structure.structure_type)
        self._putStructureProcedure(structure)

        # terminator
        self._putInt32(END_OF_DATA)

        self.__writer.flush()
        self.__recycle()
        return self.__write_size

    # write procedure for structure
    def _putStructureProcedure(self, obj):
        # axis rotate
        if obj.structure_type == XModelStructure.TYPE_AXIS_ROTATE:
            self._putAxisRotate(obj)

        # quaternion
        elif obj.structure_type == XModelStructure.TYPE_QUATERNION:
            self._putQuaternion(obj)

        # scale
        elif obj.structure_type == XModelStructure.TYPE_SCALE:
            self._putScale(obj)

        # translate
        elif obj.structure_type == XModelStructure.TYPE_TRANSLATE:
            self._putTranslate(obj)

        # matrix
        elif obj.structure_type == XModelStructure.TYPE_MATRIX:
            self._putMatrix(obj)

        # container
        elif obj.structure_type == XModelStructure.TYPE_CONTAINER:
            self._putContainer(obj)

        # texture
        elif obj.structure_type == XModelStructure.TYPE_TEXTURE:
            self._putTexture(obj)

        # material
        elif obj.structure_type == XModelStructure.TYPE_MATERIAL:
            self._putMaterial(obj)

        # mesh
        elif obj.structure_type == XModelStructure.TYPE_MESH:
            self._putMesh(obj)

        # node
        elif obj.structure_type == XModelStructure.TYPE_NODE:
            self._putNode(obj)
            
        # kinematic
        elif obj.structure_type == XModelStructure.TYPE_KINEMATIC:
            self._putKinematic(obj)

        # animation
        elif obj.structure_type == XModelStructure.TYPE_ANIMATION:
            self._putAnimation(obj)

        # animation key
        elif obj.structure_type == XModelStructure.TYPE_ANIMATION_KEY:
            self._putAnimationKey(obj)

        # animation set
        elif obj.structure_type == XModelStructure.TYPE_ANIMATION_SET:
            self._putAnimationSet(obj)

    # write user data
    def _putUserData(self, obj):
        if obj is None:
            self._putInt32(0)
        else:
            # data size
            self._putInt32(obj.data_size)
            # data
            self._putInt8Array(obj.data, 0, obj.data_size)

    # write axis rotate
    def _putAxisRotate(self, obj):
        # value
        self._putFloat32Array(obj.initial, 0, XModelStructure.SIZE_AXIS_ROTATE)

    # write quaternion
    def _putQuaternion(self, obj):
        # value
        self._putFloat32Array(obj.initial, 0, XModelStructure.SIZE_QUATERNION)

    # write scale
    def _putScale(self, obj):
        # value
        self._putFloat32Array(obj.initial, 0, XModelStructure.SIZE_SCALE)

    # write translate
    def _putTranslate(self, obj):
        # value
        self._putFloat32Array(obj.initial, 0, XModelStructure.SIZE_TRANSLATE)

    # write matrix
    def _putMatrix(self, obj):
        # value
        self._putFloat32Array(obj.initial, 0, XModelStructure.SIZE_MATRIX)

    # write container
    def _putContainer(self, obj):
        # name
        self._putString(obj.name)

        # texture
        self._putInt16(obj.num_textures)
        if 0 < obj.num_textures:
            self._putStructureArray(obj.textures, 0, obj.num_textures)

        # material
        self._putInt16(obj.num_materials)
        if 0 < obj.num_materials:
            self._putStructureArray(obj.materials, 0, obj.num_materials)

        # mesh
        self._putInt16(obj.num_meshs)
        if 0 < obj.num_meshs:
            self._putStructureArray(obj.meshs, 0, obj.num_meshs)

        # node
        self._putInt16(obj.num_nodes)
        if 0 < obj.num_nodes:
            self._putStructureArray(obj.nodes, 0, obj.num_nodes)

        # time rate
        self._putFloat64(obj.time_rate)

        # animation set
        self._putInt16(obj.num_animation_sets)
        if 0 < obj.num_animation_sets:
            self._putStructureArray(obj.animation_sets, 0, obj.num_animation_sets)

        # user data
        self._putUserData(obj.user_data)

    # write texture
    def _putTexture(self, obj):
        # name
        self._putString(obj.name)

        # reference identifier
        self._putString(obj.ref)

        # binary data
        self._putInt32(obj.data_size)
        if 0 < obj.data_size:
            self._putInt8Array(obj.data, 0, obj.data_size)

        # user data
        self._putUserData(obj.user_data)

    # write material
    def _putMaterial(self, obj):
        # name
        self._putString(obj.name)

        # parameters
        self._putFloat32Array(obj.emissive, 0, 4)
        self._putFloat32Array(obj.ambient, 0, 4)
        self._putFloat32Array(obj.diffuse, 0, 4)
        self._putFloat32Array(obj.specular, 0, 4)
        self._putFloat32(obj.shininess)
        self._putFloat32(obj.bump)

        # texture maps
        self._putXModelStructure(obj.emissive_map)
        self._putXModelStructure(obj.ambient_map)
        self._putXModelStructure(obj.diffuse_map)
        self._putXModelStructure(obj.specular_map)
        self._putXModelStructure(obj.shininess_map)
        self._putXModelStructure(obj.bump_map)

        # draw mode
        self._putInt32(obj.draw_mode)

        # user data
        self._putUserData(obj.user_data)

    # write mesh
    def _putMesh(self, obj):
        # name
        self._putString(obj.name)

        # positions
        self._putInt32(obj.num_positions)
        if 0 < obj.num_positions:
            self._putInt8(obj.position_size)
            self._putFloat32Array(obj.positions, 0, obj.position_size * obj.num_positions)

        # normals
        self._putInt32(obj.num_normals)
        if 0 < obj.num_normals:
            self._putInt8(obj.normal_size)
            self._putFloat32Array(obj.normals, 0, obj.normal_size * obj.num_normals)

        # colors
        self._putInt32(obj.num_colors)
        if 0 < obj.num_colors:
            self._putInt8(obj.color_size)
            self._putFloat32Array(obj.colors, 0, obj.color_size * obj.num_colors)

        # texture coordinates
        self._putInt32(obj.num_tex_coords)
        if 0 < obj.num_tex_coords:
            self._putInt8(obj.tex_coord_size)
            self._putFloat32Array(obj.tex_coords, 0, obj.tex_coord_size * obj.num_tex_coords)

        # skin weights (inline)
        has_skin_weight = None
        if obj.skin is not None:
            has_skin_weight = 1
            self._putInt8(has_skin_weight)
            self._putSkin(obj.skin)
        else:
            has_skin_weight = 0
            self._putInt8(has_skin_weight)

        # vertices (inline)
        self._putInt32(obj.num_vertices)
        for i in range(obj.num_vertices):
            self._putVertex(obj.vertices[i],
                            obj.num_positions,
                            obj.num_normals,
                            obj.num_colors,
                            obj.num_tex_coords,
                            has_skin_weight)

        # materials
        self._putInt16(obj.num_materials)
        if 0 < obj.num_materials:
            self._putStructureArray(obj.materials, 0, obj.num_materials)

        # elements (inline)
        self._putInt32(obj.num_elements)
        for i in range(obj.num_elements):
            self._putElement(obj.elements[i])

        # user data
        self._putUserData(obj.user_data)

    # write skin
    def _putSkin(self, obj):
        # number of weighted indices
        self._putInt32(obj.num_weighted_indices)

        # weighted index stride
        self._putInt8(obj.weighted_index_stride)

        for i in range(obj.num_weighted_indices):
            index = obj.weighted_index_stride * i

            # element size
            num_elem = obj.weighted_index_sizes[i]
            self._putInt8(num_elem)

            for j in range(num_elem):
                ind = index + j

                # index
                self._putInt16(obj.indices[ind])

                # weight
                self._putFloat32(obj.weights[ind])

        # number of nodes
        self._putInt16(obj.num_nodes)

        if 0 < obj.num_nodes:
            # nodes
            self._putStructureArray(obj.nodes, 0, obj.num_nodes)

            # offset matrices
            self._putFloat32Array(obj.offset_matrices,
                                  0,
                                  XModelStructure.SIZE_MATRIX * obj.num_nodes)

            # offset quaternions
            self._putFloat32Array(obj.offset_quaternions,
                                  0,
                                  XModelStructure.SIZE_QUATERNION * obj.num_nodes)

    # write vertex
    def _putVertex(self,
                   obj,
                   has_position,
                   has_normal,
                   has_color,
                   has_tex_coord,
                   has_skin_weight):
        # position
        if 0 < has_position:
            self._putInt32(obj.position)

        # normal
        if 0 < has_normal:
            self._putInt32(obj.normal)

        # color
        if 0 < has_color:
            self._putInt32(obj.color)

        # texture coordinate
        if 0 < has_tex_coord:
            self._putInt32(obj.tex_coord)

        # skin weight
        if 0 < has_skin_weight:
            self._putInt32(obj.skin_weight)

    # write element
    def _putElement(self, obj):
        # material
        self._putInt16(obj.material)

        # vertices
        self._putInt8(obj.num_vertices)
        if 0 < obj.num_vertices:
            self._putInt32Array(obj.vertices, 0, obj.num_vertices)

    # write node
    def _putNode(self, obj):
        # name
        self._putString(obj.name)

        # connected
        self._putBool(obj.connected)
        
        # inverse kinematics
        self._putBoolArray(obj.ik_lock_axis, 0, XModelStructure.SIZE_VECTOR_3)
        self._putBoolArray(obj.ik_limit_angle, 0, XModelStructure.SIZE_VECTOR_3)
        self._putFloat32Array(obj.ik_min_angle, 0, XModelStructure.SIZE_VECTOR_3)
        self._putFloat32Array(obj.ik_max_angle, 0, XModelStructure.SIZE_VECTOR_3)
        
        # bone tail
        self._putFloat32Array(obj.bone_tail, 0, XModelStructure.SIZE_VECTOR_3)

        # transforms
        self._putStructureArray(obj.transforms, 0, XModelNode.NUM_TRANSFORMS)

        # inverse kinematics
        self._putInt16(obj.num_inverse_kinematics)
        if 0 < obj.num_inverse_kinematics:
            self._putStructureArray(obj.inverse_kinematics, 0, obj.num_inverse_kinematics)

        # meshs
        self._putInt16(obj.num_meshs)
        if 0 < obj.num_children:
            self._putStructureArray(obj.meshs, 0, obj.num_meshs)

        # nodes
        self._putInt16(obj.num_children)
        if 0 < obj.num_children:
            self._putStructureArray(obj.children, 0, obj.num_children)

        # user data
        self._putUserData(obj.user_data)
        
    # write kinematic
    def _putKinematic(self, obj):
        # target
        self._putXModelStructure(obj.target)
        
        # maxinum number of iterations
        self._putInt16(obj.max_iterations)
        
        # chain length
        self._putInt16(obj.chain_length)
        
        # influence
        self._putFloat32(obj.influence)

    # write animation
    def _putAnimation(self, obj):
        # name
        self._putString(obj.name)
        
        # target
        self._putXModelStructure(obj.target)
        
        # index
        self._putInt16(obj.index)
        
        # keys
        self._putInt16(obj.num_keys)
        if 0 < obj.num_keys:
            self._putStructureArray(obj.keys, 0, obj.num_keys)
            
        # animations
        self._putInt16(obj.num_children)
        if 0 < obj.num_children:
            self._putStructureArray(obj.children, 0, obj.num_children)
            
        # user data
        self._putUserData(obj.user_data)

    # write animation key
    def _putAnimationKey(self, obj):
        # interpolate
        self._putInt8(obj.interpolate)
        
        # time
        self._putFloat64(obj.time)
        
        # value
        self._putInt16(obj.value_size)
        if 0 < obj.value_size:
            self._putFloat32Array(obj.value, 0, obj.value_size)

    # write animation set
    def _putAnimationSet(self, obj):
        # name
        self._putString(obj.name)
        
        # animations
        self._putInt16(obj.num_animations)
        if 0 < obj.num_animations:
            self._putStructureArray(obj.animations, 0, obj.num_animations)
            
        # user data
        self._putUserData(obj.user_data)