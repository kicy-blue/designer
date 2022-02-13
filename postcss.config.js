module.exports = () => ({
  plugins: {
    autoprefixer: {},
    // require('postcss-px2rem')({ remUnit: 75 })
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ['*']
    }
  }
})

//参考 ： https://www.cnblogs.com/zhangycun/p/10762762.html