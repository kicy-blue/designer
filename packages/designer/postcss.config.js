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