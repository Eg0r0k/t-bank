import './assets/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import { useApp } from './lib/hooks/useApp'

const app = createApp(App)

useApp(app)
