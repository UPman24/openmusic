## Uniapp部署

### （1）如果是 插件市场则直接导入即可。如果是 gitee 可以在 uniapp 文件夹下导入项目。

### （2）步骤一：导入 HbuilderX 后点击 main.js。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u1.png" width="200px"/>

### （3）步骤二：

```
按照下面的数据库、后端的步骤把值填好
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u2.png" width="200px"/>

### （3）步骤三：点击 manifest.json。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u3.png" width="200px"/>

### （4）步骤四：在 "app-plus" 节点下添加

```
"compatible" : {
    "ignoreVersion" : true //true表示忽略版本检查提示框，HBuilderX1.9.0及以上版本支持 
},
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u4.png" width="200px"/>

### （5）步骤五：在 "app-plus" 节点下的 "ios" 节点添加

```
"ios" : {
    "UIBackgroundModes" : [ "audio" ],
    "idfa" : false,
    "dSYMs" : false
},
```

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/uniapp/u5.png" width="200px"/>

### （6）最后保存所有设置。启动后端以及数据库，使用 HbuilderX 运行到浏览器或者打包成App均可。

## MongoDB 数据库配置

### 1.宝塔面板配置（这里可以使用你自己熟悉的 mongodb 配置方式）

#### （1）步骤一：打开宝塔面板软件商店，搜索：MongoDB，选择官方的即可。安装。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m1.png" width="200px"/>

#### （2）步骤二：找到已安装的软件，把开关打开，让MongoDB模块出现在首页。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m2.png" width="200px"/>

#### （3）步骤三：在首页找到 MongoDB 并点击它（如下图）。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m3.png" width="200px"/>

#### （4）步骤四：打开，设置数据库。先点击“数据库”，输入“数据库名称为：musics”，再点击创建数据库。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m4.png" width="200px"/>

#### （5）步骤五：点击配置项。设置 BindIP 为 `0.0.0.0` ，Port 为 `27017`。然后点击保存。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m5.png" width="200px"/>

#### （6）步骤六：要记得把端口打开。点击安全把 27017 端口放行。

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/mongodb/m6.png" width="200px"/>

### 2.nodejs 配置

#### （1）步骤一：

##### 按照下面文件找到 user.js 修改 url = "mongodb://你的ip地址:27017/"。记得7后面要加 “/” 这个斜杆。
    node
    |_ components
        |_ user
            |_ user.js

<img src="https://bmdlife-1304060577.cos.ap-beijing.myqcloud.com/app/music/node/n1.png" width="200px"/>

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

### 后端使用 python+Flask 开发
 
### 0.docker 部署【推荐】

#### （1）执行 `docker build -t 你的用户名/musicpy:1.0 .`

#### （2）运行docker容器：`docker run -d -p 13874:13874 --name musicpy -m 900m --restart=always 你的用户名/musicpy:1.0`

#### （3）记得放开 `13874` 端口（或者你自定义的端口）

##### 直接部署
<br>

### 1.切换到 python 目录下

#### （1）执行 `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt`

#### （2）运行 `python main.py`

### 2.打开浏览器访问：`http://127.0.0.1:13874/search/稻香/?page=1`，如果出现 json 数据代表获取成功。

### 3.API基本功能

#### 基础地址：`http://你的（IP地址+端口）（或者是CDN域名）`

#### （1）获取歌曲列表
|接口地址|参数说明|
|--------|----|
|/search/\<keyword>/?page=\<num>|keyword就是歌曲名称(或者歌手名称)，num就是页数（一页默认大概15-20个左右）|

##### 演示1(使用uniapp请求)

```
this.baseurl = http://你的（IP地址+端口）（或者是CDN域名）
...
uni.request({
    url: this.baseurl + '/search/' + '稻香' + '/?page=' + '1',
    method: 'GET',
    success: (res) => {
        console.log(res.data);
    }
});
```
##### 演示2（直接使用浏览器）

`访问：http://你的（IP地址+端口）（或者是CDN域名）/search/花海/?page=1`

#### （2）快速获取歌曲信息

|接口地址|参数说明|
|--------|----|
|/fast_search/\<path:url>|path:url就是获取到的歌曲链接|

##### 演示：

##### `访问：http://你的（IP地址+端口）（或者是CDN域名）/fast_search/https://xxx/thread-916.htm` 即可

##### 说明：此接口用于程序内部，直接浏览器访问比较繁琐。

### 4.后端配置好后 http://你的（IP地址+端口）（或者是CDN域名），这个地址就是 `Vue.prototype.$pythonurl` 的地址。