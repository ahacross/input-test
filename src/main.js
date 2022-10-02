import { createApp } from "vue";
import App from "./App.vue";

import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";

import "./assets/main.css";

const app = createApp(App);
new WaveUI(app, {
  components: ["WButton", "WInput", "WSelect", "WCheckbox"],
});
app.mount("#app");
