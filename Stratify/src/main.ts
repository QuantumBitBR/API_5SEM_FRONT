import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue, { defaultOptions } from 'primevue/config';
import App from './App.vue'
import Aura from '@primeuix/themes/aura';
import { Menubar } from 'primevue';
import router from './router';


const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
});
app.use(router);
app.component('Menubar', Menubar);
app.use(createPinia())


app.mount('#app')
