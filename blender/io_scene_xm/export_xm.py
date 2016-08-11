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

import bpy
import weakref
import math

from mathutils import Matrix, Vector
from bpy.types import PoseBone
from io_scene_xm import types
from io_scene_xm.types import (XModelStructure,
                               XModelAxisRotate,
                               XModelQuaternion,
                               XModelScale,
                               XModelTranslate,
                               XModelMatrix,
                               XModelContainer,
                               XModelTexture,
                               XModelMaterial,
                               XModelMesh,
                               XModelSkin,
                               XModelVertex,
                               XModelElement,
                               XModelNode,
                               XModelKinematic,
                               XModelAnimation,
                               XModelAnimationKey,
                               XModelAnimationSet)
from io_scene_xm.code import XModelBinaryEncoder


# class that convert to xModel format from context.
class XModelExporter:
    # initialize
    def __init__(self,
                 context,
                 filepath=None,
                 output_visible_mesh=True,
                 use_mesh_modifiers=True,
                 invert_face=True,
                 global_matrix=Matrix(),
                 export_bones=False,
                 export_actions=False):
        self.context = context
        self.filepath = filepath
        self.output_visible_mesh = output_visible_mesh
        self.use_mesh_modifiers = use_mesh_modifiers
        self.invert_face = invert_face
        self.global_matrix = global_matrix
        self.export_bones = export_bones
        self.export_actions = export_actions
        self.textures = {}
        self.materials = {}
        self.meshs = {}
        self.nodes = {}
        self.animation_sets = {}

    # exporting to xModel format
    def encode(self):
        self.__convertXModelContainer()
        return {"FINISHED"}

    # convert the context to xModel container
    def __convertXModelContainer(self):
        # scan the scene objects
        objects = []
        root_meshs = []
        root_nodes = []
        for obj in self.context.scene.objects:
            if obj.type == "MESH":
                if obj.is_visible(self.context.scene) and self.output_visible_mesh:
                    objects.append(obj)
                    mesh = self.__convertXModelMeshWithMesh(obj)
                    root_meshs.append(mesh)
            elif obj.type == "ARMATURE":
                objects.append(obj)
                nodes = self.__convertXModelNodeWithArmature(obj)
                root_nodes.append(nodes)

        # create the container
        container = XModelContainer()

        # time rate
        container.time_rate = self.context.scene.render.fps / \
                              self.context.scene.render.fps_base

        # build textures
        textures = []
        for value in self.textures.values():
            textures.append(value)
        container.num_textures = len(textures)
        container.textures = textures

        # build materials
        materials = []
        for value in self.materials.values():
            materials.append(value)
        container.num_materials = len(materials)
        container.materials = materials

        # build mesh
        for key, value in self.meshs.items():
            if value.skin is not None:
                self.__convertXModelSkinWithMesh(key, value.skin)
        container.num_meshs = len(root_meshs)
        container.meshs = root_meshs

        # build node
        container.num_nodes = len(root_nodes)
        container.nodes = root_nodes

        # scan the actions
        if self.export_actions:
            animation_sets = []
            for value in bpy.data.actions:
                animation_set = self.__convertXModelAnimationSetWithAction(value, objects)
                animation_sets.append(animation_set)
            container.num_animation_sets = len(animation_sets)
            container.animation_sets = animation_sets

        # encode to binary
        with open(self.filepath, "wb") as file:
            encoder = XModelBinaryEncoder()
            encoder.encode(container, file)

        # clean temporary dictionaries
        self.textures.clear()
        self.materials.clear()
        self.meshs.clear()
        self.nodes.clear()
        self.animation_sets.clear()

        return container

    # convert the texture slot to xModel texture
    def __convertXModelTexture(self, texture):
        if texture in self.textures:
            return self.textures[texture]

        # register the texture at dictionary
        dest_texture = XModelTexture()
        self.textures[texture] = dest_texture

        dest_texture.name = texture.name

        if texture.image is not None:
            dest_texture.ref = texture.image.filepath

        return dest_texture

    # convert the material to xModel material
    def __convertXModelMaterial(self, material):
        if material in self.materials:
            return self.materials[material]

        # register material at dictionary
        dest_material = XModelMaterial()
        self.materials[material] = dest_material

        dest_material.name = material.name

        # emissive parameter
        dest_material.emissive[0] = material.emit
        dest_material.emissive[1] = material.emit
        dest_material.emissive[2] = material.emit
        dest_material.emissive[3] = 1.0

        # ambient parameter
        dest_material.ambient[0] = material.ambient
        dest_material.ambient[1] = material.ambient
        dest_material.ambient[2] = material.ambient
        dest_material.ambient[3] = 1.0

        # diffuse parameter
        dest_material.diffuse[0] = material.diffuse_color[0]
        dest_material.diffuse[1] = material.diffuse_color[1]
        dest_material.diffuse[2] = material.diffuse_color[2]
        dest_material.diffuse[3] = material.alpha

        # specular parameter
        dest_material.specular[0] = material.specular_color[0]
        dest_material.specular[1] = material.specular_color[1]
        dest_material.specular[2] = material.specular_color[2]
        dest_material.specular[3] = 1.0

        # shininess parameter
        dest_material.shininess = material.specular_hardness

        # scan the textures
        for texture in material.texture_slots:
            if texture is not None and texture.texture.type == "IMAGE":
                converted = self.__convertXModelTexture(texture.texture)

                # emissive map texture
                if (dest_material.emissive_map is None and
                        texture.use_map_emission):
                    dest_material.emissive_map = converted

                # ambient map texture
                if (dest_material.ambient_map is None and
                        texture.use_map_ambient):
                    dest_material.ambient_map = converted

                # diffuse map texture
                if (dest_material.diffuse_map is None and
                        (texture.use_map_color_diffuse or texture.use_map_alpha)):
                    dest_material.diffuse_map = converted

                # specular map texture
                if (dest_material.specular_map is None and
                        texture.use_map_color_spec):
                    dest_material.specular_map = converted

                # shininess map texture
                if (dest_material.shininess_map is None and
                        texture.use_map_hardness):
                    dest_material.shininess_map = converted

                # bump map texture
                if (dest_material.bump_map is None and
                        texture.use_map_normal):
                    dest_material.bump = texture.normal_factor
                    dest_material.bump_map = converted

        return dest_material

    # convert the mesh to xModel mesh
    def __convertXModelMeshWithMesh(self, mesh):
        if mesh in self.meshs:
            return self.meshs[mesh]

        # register mesh to dictionary
        dest_mesh = XModelMesh()
        self.meshs[mesh] = dest_mesh

        dest_mesh.name = mesh.name

        # scan the materials
        materials = []
        for material in mesh.data.materials:
            converted = self.__convertXModelMaterial(material)
            materials.append(converted)
        dest_mesh.num_materials = len(materials)
        dest_mesh.materials = materials

        # create the work mesh
        work_mesh = mesh.to_mesh(self.context.scene,
                                 self.use_mesh_modifiers,
                                 "PREVIEW")

        # scan the vertices
        num_positions = 0
        positions = {}
        num_normals = 0
        normals = {}
        skin_weight_stride = 0
        num_skin_weights = 0
        skin_weights = {}
        for value in work_mesh.vertices:
            # position
            position = value.co[:]
            if position not in positions:
                positions[position] = num_positions
                num_positions += 1

            # normal
            normal = value.normal[:]
            if normal not in normals:
                normals[normal] = num_normals
                num_normals += 1

            # groups
            skin_weight = tuple((group.group, group.weight)
                                for group in value.groups
                                if 0.0 < group.weight)
            if skin_weight not in skin_weights:
                skin_weight_len = len(skin_weight)
                if skin_weight_stride < skin_weight_len:
                    skin_weight_stride = skin_weight_len

                skin_weights[skin_weight] = num_skin_weights
                num_skin_weights += 1

        # scan the colors
        num_colors = 0
        colors = {}
        if work_mesh.vertex_colors.active is not None:
            for value in work_mesh.vertex_colors.active.data:
                color = value.color[:]
                if color not in colors:
                    colors[color] = num_colors
                    num_colors += 1

        # scan the texture coordinates
        num_tex_coords = 0
        tex_coords = {}
        if work_mesh.uv_layers.active is not None:
            for value in work_mesh.uv_layers.active.data:
                tex_coord = value.uv[:]
                if tex_coord not in tex_coords:
                    tex_coords[tex_coord] = num_tex_coords
                    num_tex_coords += 1

        # scan the polygons
        num_vertices = 0
        vertices = {}
        elements = []
        for value in work_mesh.polygons:
            element = XModelElement()
            element.material = value.material_index
            element.num_vertices = min(len(value.vertices), value.loop_total)
            element.vertices = [0] * element.num_vertices

            # scan the vertices
            for i in range(element.num_vertices):
                vertex = work_mesh.vertices[value.vertices[i]]
                position = vertex.co
                normal = vertex.normal
                loop_index = value.loop_start + i

                position_index = positions[position[:]]
                normal_index = normals[normal[:]]

                color_index = -1
                if work_mesh.vertex_colors.active is not None:
                    color = work_mesh.vertex_colors.active.data[loop_index].color
                    color_index = colors[color[:]]

                tex_coord_index = -1
                if work_mesh.uv_layers.active is not None:
                    tex_coord = work_mesh.uv_layers.active.data[loop_index].uv
                    tex_coord_index = tex_coords[tex_coord[:]]

                skin_weight_index = -1
                if 0 < num_skin_weights:
                    skin_weight = tuple((group.group, group.weight)
                                        for group in vertex.groups
                                        if 0.0 < group.weight)
                    skin_weight_index = skin_weights[skin_weight]

                vertex_key = (position_index,
                              normal_index,
                              color_index,
                              tex_coord_index,
                              skin_weight_index)
                if vertex_key not in vertices:
                    element.vertices[i] = num_vertices
                    vertices[vertex_key] = num_vertices
                    num_vertices += 1
                else:
                    element.vertices[i] = vertices[vertex_key]

            if self.invert_face:
                element.vertices.reverse()
            elements.append(element)

        dest_mesh.num_elements = len(elements)
        dest_mesh.elements = elements

        # build xModel vertices
        dest_mesh.num_vertices = num_vertices
        dest_mesh.vertices = [None] * dest_mesh.num_vertices
        for key, value in vertices.items():
            vertex = XModelVertex()
            vertex.position = key[0]
            vertex.normal = key[1]
            vertex.color = key[2]
            vertex.tex_coord = key[3]
            vertex.skin_weight = key[4]
            dest_mesh.vertices[value] = vertex

        # build xModel positions
        dest_mesh.num_positions = num_positions
        if 0 < dest_mesh.num_positions:
            dest_mesh.position_size = 3
            dest_mesh.positions = [0.0] * 3 * dest_mesh.num_positions
            for key, value in positions.items():
                index = 3 * value
                vp = self.global_matrix * Vector(key)
                for i in range(min(len(key), 3)):
                    dest_mesh.positions[index + i] = vp[i]

        # build xModel normals
        dest_mesh.num_normals = num_normals
        if 0 < dest_mesh.num_normals:
            rot_mat = self.global_matrix.to_3x3()
            dest_mesh.normal_size = 3
            dest_mesh.normals = [0.0] * 3 * dest_mesh.num_normals
            for key, value in normals.items():
                index = 3 * value
                vn = rot_mat * Vector(key)
                for i in range(min(len(key), 3)):
                    dest_mesh.normals[index + i] = vn[i]

        # build xModel colors
        dest_mesh.num_colors = 0  # num_colors
        if 0 < dest_mesh.num_colors:
            dest_mesh.color_size = 4
            dest_mesh.colors = [1.0] * 4 * dest_mesh.num_colors
            for key, value in colors.items():
                index = 4 * value
                for i in range(min(len(key), 4)):
                    dest_mesh.colors[index + i] = key[i]

        # build xModel texture coordinates
        dest_mesh.num_tex_coords = num_tex_coords
        if 0 < dest_mesh.num_tex_coords:
            dest_mesh.tex_coord_size = 2
            dest_mesh.tex_coords = [0.0] * 2 * dest_mesh.num_tex_coords
            for key, value in tex_coords.items():
                index = 2 * value
                dest_mesh.tex_coords[index + 0] = key[0]
                dest_mesh.tex_coords[index + 1] = 1.0 - key[1]

        # build indices and weights in xModel skin
        if 0 < num_skin_weights:
            dest_skin = XModelSkin()
            dest_skin.num_weighted_indices = num_skin_weights
            dest_skin.weighted_index_stride = skin_weight_stride
            dest_skin.weighted_index_sizes = [0] * dest_skin.num_weighted_indices

            array_size = dest_skin.weighted_index_stride * dest_skin.num_weighted_indices
            dest_skin.indices = [-1] * array_size
            dest_skin.weights = [0.0] * array_size

            for key, value in skin_weights.items():
                size = len(key)
                dest_skin.weighted_index_sizes[value] = size
                for i in range(size):
                    index = dest_skin.weighted_index_stride * value + i
                    dest_skin.indices[index] = key[i][0]
                    dest_skin.weights[index] = key[i][1]

            dest_mesh.skin = dest_skin

        return dest_mesh

    # convert the armature modifiers to xModel skin
    def __convertXModelSkinWithMesh(self, src_mesh, dest_skin):
        # build node and offset matrices and offset quaternions in xModel skin
        num_nodes = len(src_mesh.vertex_groups)
        nodes = [None] * num_nodes
        offset_matrices = [1.0, 0.0, 0.0, 0.0,
                           0.0, 1.0, 0.0, 0.0,
                           0.0, 0.0, 1.0, 0.0,
                           0.0, 0.0, 0.0, 1.0] * num_nodes

        # scan the bones in armature modifiers
        for modifier in src_mesh.modifiers:
            if modifier.type != "ARMATURE":
                continue
            armature = modifier.object

            bones = {}
            for bone in armature.data.bones:
                bones[bone.name] = bone

            for key, value in enumerate(src_mesh.vertex_groups):
                # search bone from armature modifiers
                if value.name not in bones:
                    continue
                bone = bones[value.name]

                # search node from dictionary
                if bone not in self.nodes:
                    continue
                nodes[key] = self.nodes[bone]

                offset_matrix = (self.global_matrix *
                                 armature.matrix_world *
                                 bone.matrix_local).inverted()

                # build offset transform matrix
                mat_index = 16 * key
                offset_matrices[mat_index + 0] = offset_matrix[0][0]
                offset_matrices[mat_index + 1] = offset_matrix[1][0]
                offset_matrices[mat_index + 2] = offset_matrix[2][0]
                offset_matrices[mat_index + 3] = offset_matrix[3][0]
                offset_matrices[mat_index + 4] = offset_matrix[0][1]
                offset_matrices[mat_index + 5] = offset_matrix[1][1]
                offset_matrices[mat_index + 6] = offset_matrix[2][1]
                offset_matrices[mat_index + 7] = offset_matrix[3][1]
                offset_matrices[mat_index + 8] = offset_matrix[0][2]
                offset_matrices[mat_index + 9] = offset_matrix[1][2]
                offset_matrices[mat_index + 10] = offset_matrix[2][2]
                offset_matrices[mat_index + 11] = offset_matrix[3][2]
                offset_matrices[mat_index + 12] = offset_matrix[0][3]
                offset_matrices[mat_index + 13] = offset_matrix[1][3]
                offset_matrices[mat_index + 14] = offset_matrix[2][3]
                offset_matrices[mat_index + 15] = offset_matrix[3][3]

        dest_skin.num_nodes = num_nodes
        dest_skin.nodes = nodes
        dest_skin.offset_matrices = offset_matrices

    # convert the armature to xModel node
    def __convertXModelNodeWithArmature(self, armature):
        if armature in self.nodes:
            return self.nodes[armature]

        # register the node to dictionary
        dest_node = XModelNode()
        self.nodes[armature] = dest_node

        dest_node.name = armature.name

        node_matrix = self.global_matrix * armature.matrix_world
        dest_matrix = XModelMatrix()
        dest_matrix.initial = [node_matrix[0][0],
                               node_matrix[1][0],
                               node_matrix[2][0],
                               node_matrix[3][0],
                               node_matrix[0][1],
                               node_matrix[1][1],
                               node_matrix[2][1],
                               node_matrix[3][1],
                               node_matrix[0][2],
                               node_matrix[1][2],
                               node_matrix[2][2],
                               node_matrix[3][2],
                               node_matrix[0][3],
                               node_matrix[1][3],
                               node_matrix[2][3],
                               node_matrix[3][3]]
        dest_node.transforms[XModelNode.TRANSFORM_MATRIX] = dest_matrix

        # scan the root bones
        children = []
        for bone in armature.data.bones:
            if bone.parent is None:
                converted = self.__convertXModelNodeWithBone(bone)
                converted.parent = weakref.proxy(dest_node)
                children.append(converted)

        dest_node.num_children = len(children)
        dest_node.children = children

        # scane the poses
        for pose in armature.pose.bones:
            self.__convertXModelNodeWithPoseBone(pose)

        return dest_node

    # convert the bone to xModel node
    def __convertXModelNodeWithBone(self, bone, invert_matrix=Matrix()):
        if bone in self.nodes:
            return self.nodes[bone]

        # register the node to dictionary
        dest_node = XModelNode()
        self.nodes[bone] = dest_node

        dest_node.name = bone.name

        # bone tail
        inv_mat = bone.matrix_local.inverted()
        bone_tail = inv_mat * bone.tail_local
        dest_node.bone_tail = [bone_tail[0], bone_tail[1], bone_tail[2]]

        # node transform
        bone_matrix = invert_matrix * bone.matrix_local
        dest_matrix = XModelMatrix()
        dest_matrix.initial = [bone_matrix[0][0],
                               bone_matrix[1][0],
                               bone_matrix[2][0],
                               bone_matrix[3][0],
                               bone_matrix[0][1],
                               bone_matrix[1][1],
                               bone_matrix[2][1],
                               bone_matrix[3][1],
                               bone_matrix[0][2],
                               bone_matrix[1][2],
                               bone_matrix[2][2],
                               bone_matrix[3][2],
                               bone_matrix[0][3],
                               bone_matrix[1][3],
                               bone_matrix[2][3],
                               bone_matrix[3][3]]
        dest_node.transforms[XModelNode.TRANSFORM_MATRIX] = dest_matrix
        dest_node.transforms[XModelNode.TRANSFORM_TRANSLATE] = XModelTranslate()
        dest_node.transforms[XModelNode.TRANSFORM_SCALE] = XModelScale()
        dest_node.transforms[XModelNode.TRANSFORM_ROTATE] = XModelQuaternion()

        # scan the child bonds
        children = []
        for child in bone.children:
            converted = self.__convertXModelNodeWithBone(child, inv_mat)
            converted.parent = weakref.proxy(dest_node)
            children.append(converted)

        dest_node.num_children = len(children)
        dest_node.children = children
        return dest_node

    # convert the pose to xModel node
    def __convertXModelNodeWithPoseBone(self, pose):
        bone = pose.bone
        if bone not in self.nodes:
            return

        dest_node = self.nodes[bone]

        # flag of lock the axis of rotate
        dest_node.ik_lock_axis[0] = pose.lock_ik_x
        dest_node.ik_lock_axis[1] = pose.lock_ik_y
        dest_node.ik_lock_axis[2] = pose.lock_ik_z

        # flag of limit the rotate angle
        dest_node.ik_limit_angle[0] = pose.use_ik_limit_x
        dest_node.ik_limit_angle[1] = pose.use_ik_limit_y
        dest_node.ik_limit_angle[2] = pose.use_ik_limit_z

        # minimum of rotate angle
        dest_node.ik_min_angle[0] = pose.ik_min_x
        dest_node.ik_min_angle[1] = pose.ik_min_y
        dest_node.ik_min_angle[2] = pose.ik_min_z

        # maximum of rotate angle
        dest_node.ik_max_angle[0] = pose.ik_max_x
        dest_node.ik_max_angle[1] = pose.ik_max_y
        dest_node.ik_max_angle[2] = pose.ik_max_z

        # scan the constraint
        inverse_kinematics = []
        for constraint in pose.constraints:
            if constraint.type == "IK":
                if constraint.target.type == "ARMATURE":
                    target_bone = constraint.target.data.bones[constraint.subtarget]
                    if target_bone in self.nodes:
                        dest_kinematic = XModelKinematic()
                        dest_kinematic.target = self.nodes[target_bone]
                        dest_kinematic.max_iterations = constraint.iterations
                        dest_kinematic.chain_length = constraint.chain_count
                        dest_kinematic.influence = constraint.influence
                        inverse_kinematics.append(dest_kinematic)

            elif constraint.type == "COPY_ROTATION":
                pass

            elif constraint.type == "COPY_SCALE":
                pass

            elif constraint.type == "COPY_LOCATION":
                pass

        dest_node.num_inverse_kinematics = len(inverse_kinematics)
        dest_node.inverse_kinematics = inverse_kinematics

        return dest_node

    # convert the action to xModel animation set
    def __convertXModelAnimationSetWithAction(self, action, objects):
        if action in self.animation_sets:
            return self.animation_sets[action]

        # register the animation set
        dest_animation_set = XModelAnimationSet()
        self.animation_sets[action] = dest_animation_set

        # scan the animation
        animations = []
        for obj in objects:
            if obj.type == "MESH":
                anims = self.__convertXModelAnimationsWithMesh(obj, action)
                animations.extend(anims)

            elif obj.type == "ARMATURE":
                anims = self.__convertXModelAnimationsWithArmature(obj, action)
                animations.extend(anims)

        dest_animation_set.num_animations = len(animations)
        dest_animation_set.animations = animations

        return dest_animation_set

    # convert the action with mesh to xModel animations
    def __convertXModelAnimationsWithMesh(self, mesh, action):
        animations = []
        for fcurve in action.fcurves:
            try:
                value = mesh.data.shape_keys.path_resolve(fcurve.data_path, False)
            except ValueError:
                value = None

        return animations

    # convert the action with armature to xModel animations
    def __convertXModelAnimationsWithArmature(self, armature, action):
        animations = []
        for fcurve in action.fcurves:
            try:
                value = armature.path_resolve(fcurve.data_path, False)
            except ValueError:
                value = None

            if value is not None:
                if isinstance(value.data, PoseBone):
                    if value.data.bone in self.nodes:
                        node = self.nodes[value.data.bone]
                        dest_animation = XModelAnimation()

                        # case of the translate transform
                        if fcurve.data_path == value.data.path_from_id("location"):
                            dest_animation.target = node.transforms[XModelNode.TRANSFORM_TRANSLATE]
                            dest_animation.index = fcurve.array_index

                        # case of the scale transform
                        elif fcurve.data_path == value.data.path_from_id("scale"):
                            dest_animation.target = node.transforms[XModelNode.TRANSFORM_SCALE]
                            dest_animation.index = fcurve.array_index

                        # case of the quaternion transform
                        elif fcurve.data_path == value.data.path_from_id("rotation_quaternion"):
                            if not isinstance(node.transforms[XModelNode.TRANSFORM_ROTATE], XModelQuaternion):
                                node.transforms[XModelNode.TRANSFORM_ROTATE] = XModelQuaternion()
                            dest_animation.target = node.transforms[XModelNode.TRANSFORM_ROTATE]
                            dest_animation.index = fcurve.array_index

                        # case of the axis rotate transform
                        elif fcurve.data_path == value.data.path_from_id("rotation_axis_angle"):
                            if not isinstance(node.transforms[XModelNode.TRANSFORM_ROTATE], XModelAxisRotate):
                                node.transforms[XModelNode.TRANSFORM_ROTATE] = XModelAxisRotate()
                            dest_animation.target = node.transforms[XModelNode.TRANSFORM_ROTATE]
                            dest_animation.index = fcurve.array_index

                        # scan the keys
                        keys = []
                        for keyframe in fcurve.keyframe_points:
                            key = XModelAnimationKey()
                            key.interpolate = XModelAnimationKey.INTERPOLATE_LINER
                            key.time = keyframe.co[0]
                            key.value_size = 1
                            key.value = [keyframe.co[1]]
                            keys.append(key)

                        dest_animation.num_keys = len(keys)
                        dest_animation.keys = keys
                        animations.append(dest_animation)

        return animations
