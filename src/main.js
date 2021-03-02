import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Form,Input,Select,Tabs,Upload,Icon,message,Button,List,Modal  } from 'ant-design-vue';
import vcolorpicker from 'vcolorpicker'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css';
import {getCookie} from './utils/getCookie'
Vue.config.productionTip = false
Vue.use(vcolorpicker)
Vue.use(Form);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Icon);
Vue.use(Button);
Vue.use(List);
Vue.use(Modal);
Vue.prototype.$message = message;
axios.defaults.baseURL='/api'
axios.interceptors.request
.use(config=>{
  if (config.method=='post') {
    document.cookie
    const csrfToken = getCookie('csrfToken')
    config.headers.common["x-csrf-token"] = csrfToken
  }
  const token = window.localStorage.getItem('page_builder_token')
  if (token) {
    config.headers.common["Authorization"] = "Bearer " +[token]
    return config
  }
  return config
},
err=>{
  return Promise.reject(err)
}
)
Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
