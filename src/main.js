import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import "ant-design-vue/dist/antd.css";
import { Layout, Row, Col, List, Select, Avatar, Tooltip }  from 'ant-design-vue';

const app = createApp(App);
app.use(store);
const antDesignComponents = [Layout, Row, Col, List, Select, Avatar, Tooltip];
antDesignComponents.forEach((component) => app.use(component));

app.mount('#app');