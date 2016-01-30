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

bl_info = {
    "name": "xModel Format",
    "description": "Import and Export by xModel Format.",
    "author": "Syuuhei Kuno",
    "version": (0, 0, 1),
    "blender": (2, 60, 0),
    "location": "File > Import-Export > xModel (.xm)",
    "category": "Import-Export"
}

import bpy

from mathutils import Matrix
from bpy.props import (BoolProperty,
                       StringProperty,
                       EnumProperty)
from bpy_extras.io_utils import (ImportHelper,
                                 ExportHelper,
                                 axis_conversion)

class ImportBlenderXModel(bpy.types.Operator, ImportHelper):

    bl_idname = "import.xm_data"
    bl_label = "Import xModel Data"

    filename_ext = ".xm"

    filter_glob = StringProperty(
            default = "*.xm",
            options = {'HIDDEN'})

    axis_forward = EnumProperty(
            name = "Forward",
            items = (('X', "X Forward", ""),
                     ('Y', "Y Forward", ""),
                     ('Z', "Z Forward", ""),
                     ('-X', "-X Forward", ""),
                     ('-Y', "-Y Forward", ""),
                     ('-Z', "-Z Forward", "")),
            default = 'Z')

    axis_up = EnumProperty(
            name = "Up",
            items = (('X', "X Up", ""),
                     ('Y', "Y Up", ""),
                     ('Z', "Z Up", ""),
                     ('-X', "-X Up", ""),
                     ('-Y', "-Y Up", ""),
                     ('-Z', "-Z Up", "")),
            default='Y')

    invert_face = BoolProperty(
            name = "Invert Face",
            default = True)

    flip_x = BoolProperty(
            name = "Flip X-Axis",
            default = True)

    flip_y = BoolProperty(
            name = "Flip Y-Axis",
            default = False)

    flip_z = BoolProperty(
            name = "Flip Z-Axis",
            default = False)

    def execute(self, context):
        from . import import_xm

        config = {}
        config["filepath"] = self.filepath
        global_matrix = Matrix()
        if self.flip_x:
            global_matrix[0][0] = -1
        if self.flip_y:
            global_matrix[1][1] = -1
        if self.flip_z:
            global_matrix[2][2] = -1
        config["global_matrix"] = axis_conversion(self.axis_forward,
                                                  self.axis_up).to_4x4() * \
                                  global_matrix

        importer = import_xm.XModelImporter(self, **context)
        return importer.decode()

class ExportBlenderXModel(bpy.types.Operator, ExportHelper):

    bl_idname = "export.xm_data"
    bl_label = "Export xModel Data"

    filename_ext = ".xm"

    filter_glob = StringProperty(
            default = "*.xm",
            options = {'HIDDEN'})
            
    output_visible_mesh = BoolProperty(
            name = "Output Visible Mesh Only",
            default = True)

    use_mesh_modifiers = BoolProperty(
            name = "Apply Modifiers",
            default = False)

    invert_face = BoolProperty(
            name = "Invert Face",
            default = True)

    axis_forward = EnumProperty(
            name = "Forward",
            items = (('X', "X Forward", ""),
                     ('Y', "Y Forward", ""),
                     ('Z', "Z Forward", ""),
                     ('-X', "-X Forward", ""),
                     ('-Y', "-Y Forward", ""),
                     ('-Z', "-Z Forward", "")),
            default = 'Z')

    axis_up = EnumProperty(
            name = "Up Axis",
            items = (('X', "X Up", ""),
                     ('Y', "Y Up", ""),
                     ('Z', "Z Up", ""),
                     ('-X', "-X Up", ""),
                     ('-Y', "-Y Up", ""),
                     ('-Z', "-Z Up", "")),
            default = 'Y')

    flip_x = BoolProperty(
            name = "Flip X-Axis",
            default = True)

    flip_y = BoolProperty(
            name = "Flip Y-Axis",
            default = False)

    flip_z = BoolProperty(
            name = "Flip Z-Axis",
            default = False)
            
    export_bones = BoolProperty(
            name = "Export Bones",
            default = True)
            
    export_actions = BoolProperty(
            name = "Export Actions",
            default = True)

    def execute(self, context):
        from . import export_xm

        config = {}
        config["filepath"] = self.filepath
        config["output_visible_mesh"] = self.output_visible_mesh
        config["use_mesh_modifiers"] = self.use_mesh_modifiers
        config["invert_face"] = self.invert_face
        global_matrix = Matrix()
        if self.flip_x:
            global_matrix[0][0] = -1
        if self.flip_y:
            global_matrix[1][1] = -1
        if self.flip_z:
            global_matrix[2][2] = -1
        config["global_matrix"] = axis_conversion(self.axis_forward,
                                                  self.axis_up).to_4x4() * \
                                  global_matrix
        config["export_bones"] = self.export_bones
        config["export_actions"] = self.export_actions

        exporter = export_xm.XModelExporter(context, **config)
        return exporter.encode()

def import_test(filepath = ".\\test.xm",
                invert_face = True,
                flip_x = False,
                flip_y = True,
                flip_z = False,
                axis_forward = "Z",
                axis_up = "Y"):
    from . import import_xm
    import imp
    imp.reload(import_xm)

    config = {}
    config["filepath"] = filepath
    config["invert_face"] = invert_face
    if flip_x:
        global_matrix[0][0] = -1
    if flip_y:
        global_matrix[1][1] = -1
    if flip_z:
        global_matrix[2][2] = -1
    config["global_matrix"] = axis_conversion(axis_forward,
                                              axis_up).to_4x4() * \
                              global_matrix

    importer = import_xm.XModelImporter(bpy.context, **config)
    return importer.decode()

def export_test(filepath = ".\\test.xm",
                use_mesh_modifiers = True,
                invert_face = True,
                flip_x = True,
                flip_y = False,
                flip_z = False,
                axis_forward = "Z",
                axis_up = "Y",
                export_bones = True,
                export_actions = True):
    from . import export_xm
    import imp
    imp.reload(export_xm)

    config = {}
    config["filepath"] = filepath
    config["use_mesh_modifiers"] = use_mesh_modifiers
    config["invert_face"] = invert_face
    global_matrix = Matrix()
    if flip_x:
        global_matrix[0][0] = -1
    if flip_y:
        global_matrix[1][1] = -1
    if flip_z:
        global_matrix[2][2] = -1
    config["global_matrix"] = axis_conversion(axis_forward,
                                              axis_up).to_4x4() * \
                              global_matrix
    config["export_bones"] = export_bones
    config["export_actions"] = export_actions

    exporter = export_xm.XModelExporter(bpy.context, **config)
    return exporter.encode()

def menu_func_import(self, context):
    self.layout.operator(ImportBlenderXModel.bl_idname, text="xModel (.xm)")

def menu_func_export(self, context):
    self.layout.operator(ExportBlenderXModel.bl_idname, text="xModel (.xm)")

def register():
    bpy.utils.register_module(__name__)
    bpy.types.INFO_MT_file_export.append(menu_func_export)
    bpy.types.INFO_MT_file_import.append(menu_func_import)

def unregister():
    bpy.utils.unregister_module(__name__)
    bpy.types.INFO_MT_file_export.remove(menu_func_export)
    bpy.types.INFO_MT_file_import.remove(menu_func_import)

if __name__ == "__main__":
    register()
