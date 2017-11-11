# 问题记录
    1. 初始化显示时出错:  
        Cannot read property 'xxx' of null    状态的初始值不是null, 只能是{}/[]
        Cannot read property 'xxx' of undefined    外围用v-if来判断(3层表达式)
         

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
## 2. goods组件