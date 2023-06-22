import { createApp } from "vue";
import { VueTrackPlugin } from "./plugin";
import App from "./App.vue";

createApp(App).use(VueTrackPlugin).mount("#app");
