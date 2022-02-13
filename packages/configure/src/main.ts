import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import Antd, { message, Modal } from "ant-design-vue"

// Vue.config.productionTip = false

// Vue.prototype.$message = message
// Vue.prototype.$info = Modal.info
// Vue.prototype.$success = Modal.success
// Vue.prototype.$error = Modal.error
// Vue.prototype.$warning = Modal.warning
// Vue.prototype.$confirm = Modal.confirm

// Vue.use(Antd)

// //@ts-ignore
// router.beforeEach(async (to: any, from: any, next: any) => {
//   if (to.meta && to.meta.title) {
//     document.title = to.meta.title
//   }
//   //处理路由前进、后退销毁对话框问题，无需去每个使用对话框的地方进行关闭
//   Modal.destroyAll()
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
