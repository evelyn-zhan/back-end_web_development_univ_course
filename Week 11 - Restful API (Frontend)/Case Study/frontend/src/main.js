import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Index from './components/ProductList.vue'
import Create from './components/ProductAdd.vue'
import Edit from './components/ProductEdit.vue'

const routes = [
    {
        'name': 'Index',
        'path': '/',
        component: Index
    },
    {
        'name': 'Create',
        'path': '/create',
        component: Create
    },
    {
        'name': 'Edit',
        'path': '/edit/:id',
        component: Edit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')