# xPlain for JavaScript 0.9.0 beta

<img src="./readme_res/ss.png" alt=""/>

## 概要

このライブラリはWebGLを使用して3Dを表示するためのライブラリです。ライブラリの設計思想としてはプレーンなWebGL上で動作するライブラリを
目指しています。機能としてベクトル、行列、四元数等の数学的チューティリティ、3Dモデルデータの読み込み、3Dモデルのアニメーション制御を含みます。

このライブラリは下記の構成になります。

- ベクトル、行列、四元数の数学的ユーティリティ
- 独自形式の3Dモデルデータを書き出すためのBlenderのアドオン
- 独自形式の3DモデルデータをJavaScriptで読み込むためのユーティリティ
- 読み込み済みの3Dモデルを制御するためのユーティリティ
- WebGL、ブラウザ用のユーティリティ

## サンプルプログラムの実行の流れ

1. GitHubからリポジトリをクローンして下さい。  
2. そしてクローンしたリポジトリのディレクトリをドキュメントルートとしてサーバを起動して下さい。
3. 最後にブラウザを開き "http://localhost:8000/example/000_experiment/" とアドレスバーに入力してWebページに移動するとサンプルが
表示されます。

``` bash
git clone https://github.com/redlily/xplain_for_js.git
cd xplain_for_js
python3 -m http.server 8000
```

最後の行はPython3を使用して簡易的なサーバを起動しています。サーバのアプリケーションやポートは任意のものを使用して頂いて構いません。

## ライブラリの使い方

ビルド済みのJSファイルかソースコードをHTMLが配置されているディレクトリにコピーしてください。

そしてHTML上で、それらをインポートしてください。

```html
<script type="text/javascript" src="build/xplain.min.js"></script>
```

もしくは

```html
<script type="text/javascript" src="src/xplain_core.js"></script>
<script type="text/javascript" src="src/utils_system.js"></script>
<script type="text/javascript" src="src/utils_array.js"></script>
<script type="text/javascript" src="src/utils_string.js"></script>
<script type="text/javascript" src="src/utils_math.js"></script>
<script type="text/javascript" src="src/utils_opengl.js"></script>
<script type="text/javascript" src="src/math_geometry.js"></script>
<script type="text/javascript" src="src/math_quaternion.js"></script>
<script type="text/javascript" src="src/math_quaternion_dim.js"></script>
<script type="text/javascript" src="src/math_matrix4x4.js"></script>
<script type="text/javascript" src="src/math_matrix4x4_dim.js"></script>
<script type="text/javascript" src="src/math_vector3.js"></script>
<script type="text/javascript" src="src/xmodel_type_base.js"></script>
<script type="text/javascript" src="src/xmodel_type_parameter.js"></script>
<script type="text/javascript" src="src/xmodel_type_container.js"></script>
<script type="text/javascript" src="src/xmodel_type_kinematics.js"></script>
<script type="text/javascript" src="src/xmodel_type_material.js"></script>
<script type="text/javascript" src="src/xmodel_type_mesh.js"></script>
<script type="text/javascript" src="src/xmodel_type_animation.js"></script>
<script type="text/javascript" src="src/xmodel_codec.js"></script>
<script type="text/javascript" src="src/xmodel_decoder.js"></script>
<script type="text/javascript" src="src/xmodel_utils_parameter.js"></script>
<script type="text/javascript" src="src/xmodel_utils_material.js"></script>
<script type="text/javascript" src="src/xmodel_utils_skin.js"></script>
<script type="text/javascript" src="src/xmodel_utils_mesh.js"></script>
<script type="text/javascript" src="src/xmodel_utils_node.js"></script>
<script type="text/javascript" src="src/xmodel_utils_kinematics.js"></script>
<script type="text/javascript" src="src/xmodel_utils_animation.js"></script>
<script type="text/javascript" src="src/xmodel_utils_container.js"></script>
<script type="text/javascript" src="src/xmodel_utils_optimize.js"></script>
<script type="text/javascript" src="src/xmodel_utils_wrapper.js"></script>
```

ライブラリをインポートしたのであればJavaScript上でモデルの読み込み処理を実装してください。

```javascript
var model = new xpl.XModelWrapperGL();
var config = xpl.XModelWrapperGL.defaultConfig();
config.use_skinning = true; // enable skinning by animation.
model.loadModelWithUrl(gl, "model.xm", "./current_path", config);
```

そして最後に描画処理を実装してください。

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

## Blenderのプラグインの導入

1. blender/io_scene_xmをBlenderのアドオンディレクトリにコピーしてください。  
細かい手順はBlenderのマニュアルを参照してください。
2. Blenderを起動してください。
3. File > User Prefarences > Addons > Import-Export > Import-Export: xModel の順に移動しアドオンを有効にしてください。
4. そして File > Import/Export の項目に xModel (.xm) が表示されれば導入は完了です。

### Blender用のサンプルプロジェクト

下記のURLからダウンロードすることができます。

https://github.com/redlily/test_resources

もしくはGitを使用してcloneすることができます。

``` bash
git clone git@github.com:redlily/test_resources.git
```

このBlenderのプロジェクトを使用することによりサンプルプログラムで使用されているモデルデータを生成することができます。

### サンプルデータについて

ハッカドールの3Dモデルデータはライブラリの都合に合わせて下記のデータを調整してあります。

- 画像形式の変換  
すべてPNGかBMPに変換してあります。
- 画像パスを絶対パスから相対パスに書き換え
- 足のIKの反復回数の上限変更
こちらで実装したIKの結果収束に問題があったので、今のところは数十回から数百回へ変更しています。

### その他

- まだモデルデータのインポートには対応していません。

## 履歴

|バージョン|日付|概要|
|:---|:---|:---|
|0.9.0 Beta|Jan. 24, 2016|初期リリース|
|HEAD|-|-|

## 動作確認

|ブラウザ|ソースコード|ビルド済みソース|備考|
|:---|:---|:---|:---|
|Chrome|○|○||
|Firefox|○|○||
|Safari|×|○|letキーワードでエラー|
|Edge|-|-|未検証|

## ライセンス

### xPlainのライセンス

The BSD 3-Clause License

Copyright (c) 2016, Syuuhei Kuno
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

### サンプルプログラム上で使用されている "ハッカドール" の3Dモデルのライセンス

The Creative Commons license.

(c) 2015 DeNA Co.,Ltd.

オフシャルサイト: https://hackadoll.com/mmd  
ガイドライン: https://hackadoll.com/mmd/terms
