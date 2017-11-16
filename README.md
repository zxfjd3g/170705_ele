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
    4. 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: this.$set(obj, 'xxx', value)才有数据绑定
              Vue.set(obj, 'xxx', value)才有数据绑定
    5. 点击添加购物项, 会1次添加多个
        原因: 创建了多个BScroll对象来管理同一个DOM元素
        解决: 只创建一个BScroll对象 
        扩展: 单例对象: 
            在准备创建前, 先判断是否已经存在(创建过)
            只有当不存在时, 才去创建对象, 并保存起来
    6. 点击添加购物项时, 同时还打开食物详情
        原因: 外部元素也响应了点击事件, 因为事件有冒泡
        解决: 停止事件冒泡 @click.stop="xxx"
    
    7. 如果从其它路由切换过来显示没有问题, 如果直接刷新当前路由就报错
        原因: 两种访问的方式, 创建组件对象时, 传给组件对象的数据不一样
        解决: 在初始化, 判断只有有数据时才创建Scroll对象
              监视数据的变化, 当数据变化时创建Scroll对象
                    
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
## 1. goods组件
    滑动右侧列表, 左侧当前分类样式变化
    点击左侧一个分类项, 右侧列表滑动到对应的分类的food列表
    
    根据功能分析出与这个功能相关的点
        滑动的监听, 获取滑动的Y坐标: scrollY
        设计一个计算属性来确定current类所在的下标: currentIndex
        currentIndex属性相关的因素:
            scrollY: 滑动时回调函数动态指定它的值
            tops数组: 在列表显示后立即就可以统计出来
            通过数组的findIndex()来确定下标值
                
## 2. cartcontrol组件
    只使用vue和使用vuex在编码上的区别
    熟悉vuex编码
        
## 3. shopcart组件
    BScroll对象的创建和刷新
    transition动画
        
# day04
## 1. food组件
    父组件中调用子组件的方法: this.$refs.child.fn()
    列表的过滤显示: 计算属性-->arr.filter()-->
    
## 2. ratingselect组件
    父子组件通信: vue自定义事件机制
        绑定事件监听: 父组件中, 通过子组件标签 @xxx='fn'
        分发事件: 子组件中, this.$emit('xxx', data)
        
## 3. ratings组件
    多个组件重复的代码如何简化: minxin
        在minxins中定义包含相同组件配置代码的对象
        在多个组件中通过mixins配置引入定义在minxins中的代码
        
## 4. seller组件
    异常问题的分析
    数据监视

# day05
## 1. 小球动画
    1). 在页面定义6个小球的div, 并实现6个小球循环使用 (比每次创建一个新的div效率要高)
    2). 利用vue中transition的钩子(生命周期回调函数)函数去控制动画(动画的起始是动态的, 通过样式无法指定)
    3). 小球是两个嵌套的div组成(x轴与y轴的动画效果是不一样的)
    4). 组件(父子或兄弟)间通信
        PubSubJS(消息订阅与发布/全局事件总线)
    5). 强制重排与重绘

## 2. 路由组件缓存与懒加载
    路由组件缓存: 
        <keep-alive><router-view/></keep-alive>
    懒加载: 
        import goods from '../pages/goods/goods.vue'
        const goods = () => import('../pages/goods/goods.vue')
## 3. 图片懒加载: vue-lazyload
    npm install --save vue-lazyload
    import VueLazyload from 'vue-lazyload'
    import loading from './common/imgs/loading.gif'
    Vue.use(VueLazyload, {
      loading
    }) // 内部会自定义一个全局指令 lazy来实现图片懒加载
    <img v-lazy="food.image">
    
## 4. 滑动效果: vue-scroller
    npm install --save vue-scroller@2.2.1
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    <scroller>列表div</scroller>

## 5. vue UI库使用: mint-ui/element-ui/iview
     引入mint-ui
     实现按需自动打包使用的组件和样式
     组件的分类
        标签组件
        函数组件
        
## 6. 百度地图
    注册账号
    进入控制台创建一个虚拟应用--> 得到AK
    利用DEMO和类参考来实现自己的功能
    
## 7. 短信验证码登陆
    注册/登陆容联的账号
      ACCOUNT SID：8aaf070855b647ab0155b9f80994058a
      AUTH TOKEN：aa8aa679414e49df8908ea5b3d043c24
      Rest URL(生产)：https://app.cloopen.com:8883
      AppID(默认)：8aaf070855b647ab0155b9f809f90590
    添加测试号码: 
      至少要有一个是你自己的
    后台应用
      接口1: 处理发送验证的请求
        地址: http://localhost:3000/sendcode
        路由回调中:
           1. 获取请求中手机号: phone
           2. 生成一个随机数据验证码: code
           3. 向容联的接口发请求, 传phone和code, 并向前台返回数据: {code:0}
           4. 当容联的请求返回后, 如果成功, 保存phone和code: users[phone] = code
      接口2: 处理登陆请求
        地址: http://localhost:3000/login
           1. 获取请求中手机号: phone和输入的验证码: code
           2. 读取phone对应的code: users[phone], 与输入的验证码code进行比较
           3. 如果不同, 返回一个响应标识登陆失败
           4. 根据phone去数据库集合中查询对应的数据, 如果没有保存, 返回一个标识登陆成功的响应
    前台应用
      地址: http://localhost:8081   相对于后台是跨域
      解决跨域的问题:
          proxyTable: {
            '/sendcode': {
              target: 'http://localhost:3000',
              changeOrigin: true,
            },
            '/login': {
              target: 'http://localhost:3000',
              changeOrigin: true,
            }
          }
      请求发送验证码: 
          axios.get(`/sendcode?phone=${this.phone}`).then(response => {
            alert(response.data.code) // 0
          })
      请求登陆:
          axios.post('/login', {phone: this.phone, code: this.code}).then(response => {
            const result = response.data
            if (result.code == 0) {
              const user = result.data
              alert(`登陆成功: ${user.phone}`)
            } else {
              alert(`登陆失败, 请输入正确的手机号和验证码`)
            }
          })
# [重要点截图文档](doc.md)

