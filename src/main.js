import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app
    .component('MyDataTable', DataTable)
    .component('MyColumn', Column)
    .component('MyRow', Row)
    .component('MyButton', Button)
    .component('MyInputText', InputText)


app
    .use(PrimeVue)
    .mount('#app')
