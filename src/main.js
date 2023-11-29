import { createApp, createVNode } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Icon from './components/Icon.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// global css
import './less/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './lang';
import Directives from './directive'

// permission control
import './permission'

// import './test'

// utils
import { DateFormat } from '@/utils/util'


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// const { mockXHR } = require('../mock')
// mockXHR()

const app = createApp(App)
console.log(i18n, 'i18n');
zhCn.el.pagination.goto = '跳至';
zhCn.el.pagination.pageClassifier = '页';
app
  .use(i18n)
  .use(ElementPlus, { locale: zhCn })
  .use(Directives)
  .use(router)
  .use(store)
  .provide('$DateFormat', DateFormat)
  .mount('#app');


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('Icon', Icon);

export default app;
