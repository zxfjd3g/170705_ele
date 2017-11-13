# 问题记录
    1. 初始化显示时出错:  
        Cannot read property 'xxx' of null    状态的初始值不是null, 只能是{}/[]
        Cannot read property 'xxx' of undefined    外围用v-if来判断(3层表达式)
    2. 创建好BScroll对象, 样式都生成了, 就是不能滑动
        原因: 创建BScroll对象时, 列表没有显示(状态已经更新, 但列表更新是异步的, 所有还有显示)
        解决: 在列表更新之后才创建BScroll对象: this.$nextTick(() => {创建BScroll对象})
    3. 在组件中, 非组件的回调函数中更新状态, 界面不变化
        原因: this不是组件对象, 
        解决: 箭头函数/bind()/ 外部用me保存this, 内部不使用this而使用me

# day01
## 1. 开发项目准备
    如何描述项目: 功能/功能模块/主体用的什么技术/开发模块
    技术选型: 数据展现与交互/前后台交互/模块化/工程化/滑动相关/代码检查
    接口相关概念
    
## 2. 搭建项目骨架
    vue-cli
    vue
    webpack
    eslint
    es6/babel
    stylus
      结构化编码
      变量
      函数
      minxin
    vue-router
      如何拆分路由?

## 3. header静态组件
    使用stylus根据标注图实现移动端布局
    1px边框问题
    粘连(stiky footer)布局
    flex布局
    图标字体
    2X, 3X图
## 4. mock数据接口
    前后台(端)分离
    设计json数据
    编码实现模拟接口: 
        express: 可以使用浏览器/postman测试
        mockjs: 数据可以随机生成, 打包发布也可以访问接口
    ajax请求接口
        vue-resource: vue1.x
        axios: vue2.x

# day02
## 1. header动态组件
    1). 使用vuex管理状态
      store/index | state | mutations | actions | getters | mutation-types
    2). 发ajax请求
      api/index: 包含所有发ajax请求获取数据的代码(但并不读取数据)
    3). 组件获取后台数据显示
      在mounted()中, 通过this.$store.dispatch('getSeller')
      在computed中, 使用mapState获取seller作为组件的计算属性
      在模块中直接访问seller中的数据
    4). 基本transition动画
    
## 2. star组件
    1). 组件的作用
        简化界面功能开发
        复用
    2). 编写组件的基本流程
        定义vue文件
        分析确定props/state
        使用组件: 写它的标签<Xxx a="" b=""/>    
        组件内部的实现
            显示初始化数据
            交互
    3). 计算属性
        state/data
        props
        计算属性 
        
## 3. goods组件
    1). 使用vuex获取后台数据 , 更新状态, 读取数据展现
    2). 使用better-scroll实现滑动
        滑动的基本原理: 
           什么情况下才会形成滚动?
           创建Bscroll对象后, 不能形成滚动什么原因?
           Bscroll如何让内部部分滑动的: 在内容标签上添加style改变translateY()
    3). 如何在vue项目中使用第三库
        下载: npm install xxx --save
        根据文档/demo来使用这个库

# day03
    1. goods组件
        滑动右侧列表, 左侧当前分类样式变化
        点击左侧一个分类项, 右侧列表滑动到对应的分类的food列表
    2. cartcontrol组件
    3. shopcart组件
    4. food组件