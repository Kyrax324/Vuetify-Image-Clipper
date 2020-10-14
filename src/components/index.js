import VuetifyImageClipper from './Vuetify-Image-Clipper.vue'
import VueRx from "vue-rx"; 

VuetifyImageClipper.install = function (Vue) {
	Vue.use(VueRx);
    Vue.component('v-image-clipper', VuetifyImageClipper)
}

export default VuetifyImageClipper