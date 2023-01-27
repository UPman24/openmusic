# 开源音乐阅读手册

##### 注意：本项目为学习项目，禁止用于商业用途。音乐版权归音乐公司所有。

## 项目展示：

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z1.png" width="150px"/>
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z2.png" width="150px"/>
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z3.png" width="150px"/>
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z4.png" width="150px"/>
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z5.png" width="150px"/>
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/zs/z7.gif" width="150px"/>

## 项目地址：

#### （1）gitee：https://gitee.com/ZhenYJ/openmusic

#### （2）插件市场：https://ext.dcloud.net.cn/plugin?id=10665

#### （3）github：https://github.com/UPman24/openmusic

##### 文件结构说明：
```
根目录
    |_ node                         //此文件用于用户信息存储，数据库操作
        |_ components
                |_ user
                    |_ user.js      //需要修改的文件
                    
        |_ Dockerfile               //可以选择 Docker 部署
        |_ index.js                 //执行 npm install && npm run start 能直接部署
        |_ package.json             //依赖
        
    |_ backnode                     //用于获取歌曲信息
        |_ package.json             //依赖
        |_ ...                      //执行 npm install && npm run ci && npm run start 能直接部署
        
    |_ uniapp                       //此文件可以直接导入 HbuilderX 中
```

## 项目演示：

#### 安卓下载地址：（二维码）
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/app/download8.png" width="150px"/>

#### [版本：1.1.6]

#### 在线预览

###### 注意：只支持手机 H5版，不支持电脑网页版。

[小北云音乐](http://music.bfmzdx.cn)【最好用微信打开链接浏览】

## 项目模块：

```
1.用户登录
2.喜欢音乐列表
3.音乐收藏
4.播放控制（顺序播放、单曲循环、随机播放）
5.更多
6.播放、暂停
7.后台播放
8.上一首、下一首
9.进度条拖动
10.歌词显示
11.底部音乐 tabbar 左右切换
12.UI美化
    |_ iOS：高斯模糊、磨砂玻璃
    |_ 安卓：背景虚化
```

## 项目特点：

### 1.音乐接口不掉，并特殊化处理。

### 2.docker 部署，后台可以随时切换。

### 3.所有接口可以完全自定义。

## Uniapp部署

### （1）步骤一：导入 HbuilderX 后点击 main.js。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u1.png" width="250px"/>

### （2）步骤二：

```
按照下面的数据库、后端的步骤把值填好
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u2.png" width="250px"/>

### （3）步骤三：点击 manifest.json。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u3.png" width="250px"/>

### （4）步骤四：在 "app-plus" 节点下添加

```
"compatible" : {
    "ignoreVersion" : true //true表示忽略版本检查提示框，HBuilderX1.9.0及以上版本支持 
},
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u4.png" width="250px"/>

### （5）步骤五：在 "app-plus" 节点下的 "ios" 节点添加

```
"ios" : {
    "UIBackgroundModes" : [ "audio" ],
    "idfa" : false,
    "dSYMs" : false
},
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u5.png" width="250px"/>

### （6）在 manifest.json 文件里的 "app-plus" 同级别节点添加如下请求时间限制

```
"networkTimeout" : {
    "request" : 2000    //这里设置的是 2 秒，具体根据你的服务器
},
```

### （7）最后保存所有设置。启动后端以及数据库，使用 HbuilderX 运行到浏览器或者打包成App均可。

## MongoDB 数据库配置

### ⚠️注意：请关注你的数据库安全。

### 1.宝塔面板配置（这里可以使用你自己熟悉的 mongodb 配置方式）

#### （1）步骤一：打开宝塔面板软件商店，搜索：MongoDB，选择官方的即可。安装。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m1.png" width="250px"/>

#### （2）步骤二：找到已安装的软件，把开关打开，让MongoDB模块出现在首页。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m2.png" width="250px"/>

#### （3）步骤三：在首页找到 MongoDB 并点击它（如下图）。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m3.png" width="250px"/>

#### （4）步骤四：打开，设置数据库。先点击“数据库”，输入“数据库名称为：musics”，再点击创建数据库。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m4.png" width="250px"/>

#### （5）步骤五：点击配置项。设置 BindIP 为 `0.0.0.0` ，Port 为 `27017`。然后点击保存。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m5.png" width="250px"/>

#### （6）步骤六：要记得把端口打开。点击安全把 27017 端口放行。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m6.png" width="250px"/>

#### （7）步骤七：在数据库中创建一个名称为 user 的表，用于存放用户数据。

##### 字段说明：
```
初始化数据结构
{
    "_id": "xxxxx",
    "username": "xxxxx",
    "list": []
}

有数据的情况
{
    "_id": "xxxxx",//唯一 id
    "username": "xxxxx",//用户手机号
    "list": [
        {
            "author": "歌手名称",
            "lrc": [],//歌词
            "pic": "xxxxx",//歌曲封面
            "pre_url": "预加载链接",
            "title": "歌曲名称",
            "url": "音乐真实链接"
        },
        .....
    ]
}
```
<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m7.png" width="250px"/>

### 2.nodejs 配置

#### （1）步骤一：

##### 按照下面文件找到 user.js 修改 url = "mongodb://你的ip地址:27017/"。记得7后面要加 “/” 这个斜杆。
    node
    |_ components
        |_ user
            |_ user.js

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/node/n1.png" width="250px"/>

#### （2）步骤二：回到 node 文件夹下，执行 `npm install`

#### （3）步骤三：执行 `npm run start`

#### （4）看到项目启动后打开浏览器访问 `http://127.0.0.1:14521/user` ，如果界面出现 `用户模块` 就代表访问成功。

### 3.部署到服务器

#### （1）使用 Docker 部署【推荐】

#### 构建镜像：`docker build -t 你的用户名/musicnode:1.0 .`

#### 运行docker容器：`docker run -d -p 14521:14521 --name musicnode -m 900m --restart=always 你的用户名/musicnode:1.0`

#### （2）直接部署

#### 在服务器装好nodejs环境，执行 `npm install && npm run start` 项目即可运行。

#### （3）记得放开 `14521` 端口（或者你自定义的端口）

### 4.访问服务

#### （1）打开浏览器访问：http://你的（IP地址+端口）（或者是CDN域名）/user

#### （2）网页出现 “用户模块” 即代表数据库端配置成功。

### 5.`http://你的（IP地址+端口）（或者是CDN域名）/user` 这个地址就是 `Vue.prototype.$nodeurl` 的地址。


## 后端API配置

### 后端使用 eggjs+Typescript 开发

##### 直接部署
<br>

### 1.切换到 backnode 目录下

```
backnode
    |_ docs
        |_ README.md    //这是文档
```

#### （1）执行 `npm i && npm run ci`

#### （2）运行 `npm run start`

### 2.打开浏览器访问：`http://127.0.0.1:7002/kuwo/search/searchMusicBykeyWord?key=稻香&pn=1&rn=12`，如果出现 json 数据代表获取成功。

### 3.API基本功能

#### 基础地址：`http://你的（IP地址+端口）（或者是CDN域名）`

### 4.后端配置好后 http://你的（IP地址+端口）（或者是CDN域名），这个地址就是 `Vue.prototype.$pythonurl` 的地址。

`注意：在部署过程中可能会出现外网无法访问的情况，可以使用 nginx 或者 内网穿透 反向代理来处理。`

### QQ交流群：643980281
