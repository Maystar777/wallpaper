### 一、项目简介
- **项目名称**：咸虾米壁纸
- **简短描述**：基于 Vue 3 的 uni-app 项目实战。
- **主要功能**：Banner轮播、图片网格布局、触底更新、公告详情、壁纸详情、图片下载、搜索页面。
- **项目状态**：已完成开发，未上线。

### 二、开发环境

- HBuilder X 4.57+
- Node.js v22.14.0+

### 三、项目结构

```bash
wallpaper
├─ api
│  └─ api.js
├─ static						# 静态文件夹会被整体复制到最终编译包内，因此存放一定会加载的资源
│  └─ images
├─ common						# 按需加载的公用资源放在common目录下。
│  ├─ images
│  └─ style
│     ├─ base.scss				# 自定义的scss变量，颜色之类的
│     └─ common.scss			# 自定义的全局样式
├─ components
│  ├─ common-title				# 首页标题组件
│  ├─ custom-nav-bar			# 自定义头部标题组件
│  ├─ menu-item					# 用户页菜单项
│  └─ theme-item				# 分类专题封面组件
├─ pages
│  ├─ classify					# 分类页
│  ├─ classifyList				# 某一类的详情列表页
│  ├─ index						# 首页
│  ├─ notice					# 公告页
│  ├─ preview					# 预览页
│  ├─ search					# 搜索页
│  └─ user						# 用户页
├─ utils
│  ├─ common.js					
│  ├─ request.js				# 封装的请求对象
│  └─ system.js					# 获取系统、环境数据相关的工具函数
├─ App.vue
├─ index.html
├─ main.js
├─ manifest.json
├─ package-lock.json
├─ package.json
├─ pages.json					# 配置项，包含路由
├─ README.md
├─ uni.promisify.adaptor.js
├─ uni.scss
├─ uni_modules
│  ├─ mp-html
│  ├─ uni-dateformat
│  ├─ uni-icons
│  ├─ uni-load-more
│  ├─ uni-popup
│  ├─ uni-rate
│  ├─ uni-scss
│  ├─ uni-search-bar
│  ├─ uni-tag
│  ├─ uni-transition
│  ├─ uv-empty
│  ├─ uv-icon
│  └─ uv-ui-tools
├─ unpackage
└─ vite.config.js
```

### 四、功能文档
#### 1. 公共部分

- 双重渐变背景色
- 头部标题栏自定义。
  - 标题需和微信小程序自带的、右上角的菜单按钮对齐，使用框架自带的api获取高度并动态计算。
  - 搜索栏跳转具体的搜索页面。包括历史搜索、热门搜索。
- 底部菜单栏（配置）
- 分享至好友（已测试）、分享朋友圈（需注册、未测试）

#### 2. 首页（推荐页）Index

包含以下几个部分：

- Banner轮播区。包含跳转功能，支持跳转到本站或其他小程序
- 公告。竖向轮播，跳转具体的v-html页面。
- 每日推荐。横向图片滚动区。
- 精选专题。展示部分分类，采用网格布局，点击最后的更多跳转“分类”菜单。

#### 3. 分类 Classify

网格布局展示全部分类，点击后跳转某个分类列表，展示该分类所有图片。

##### 3.1 分类列表 ClassifyList

- 还未返回图片时，顶部展示loading
- 一次查询12张，触底后，底部展示loading，查询下一页。
- 点击图片跳转预览

##### 3.2 预览页 Preview

- 图片全屏预览
- 遮罩层
  - 点击图片显示/关闭遮罩层
  - 内容包括：
    - 模拟手机时间，
    - 左上角返回按钮
    - 底部操作按钮：图片详情、打分、下载

#### 4. 用户中心 User

- 用户信息：包含头像、名称、IP属地。但目前只有前端所以暂未做登录接口，只做布局展示。
- 菜单项
  - 我的下载、我的评分：跳转ClassifyList
  - 联系客服：微信小程序调用官方API跳转微信对话框; H5则跳转拨打电话
  - 订阅更新、常见问题：跳转公告详情页
