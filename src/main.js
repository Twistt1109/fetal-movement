import { createApp } from 'vue';
import App from './App.vue';
import VueToastification from 'vue-toastification';

// 引入样式
import 'vue-toastification/dist/index.css';

const app = createApp(App);

// 注册插件
app.use(VueToastification, {
  // 这里可以配置 toast 的默认选项
  timeout: 3000, // 自动关闭的延时，单位毫秒
//   closeOnClick: true, // 点击关闭
//   pauseOnFocusLoss: true, // 失去焦点时暂停
//   pauseOnHover: true, // 鼠标悬停时暂停
//   draggable: true, // 是否可拖动
//   draggablePercent: 0.6, // 可拖动范围的百分比
//   showCloseButtonOnHover: false, // 鼠标悬停显示关闭按钮
});

app.mount('#app');