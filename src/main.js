import { createApp } from "vue";
const app = createApp();
import App from "./App.vue";
import router from "./router";
import "@/assets/golbal.scss";

createApp(App).use(router).mount("#app");
