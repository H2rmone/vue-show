import Vue from 'vue'
import app from './app'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(app)
})
