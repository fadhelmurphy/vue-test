// src/main.js
import { createApp, provide, h } from "vue"
import App from './App.vue';
import { DefaultApolloClient } from "@vue/apollo-composable"
import { apolloClient } from './apolloClient';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(
    {
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
}
)

app.use(router);
app.use(createPinia());

app.mount('#app');
