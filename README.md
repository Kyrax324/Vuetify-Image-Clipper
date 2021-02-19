# vuetify-image-clipper

A simple image input with clipper.

* integrate and inspired by:
	- [vuetify's date-picker](https://vuetifyjs.com/en/components/date-pickers)
	- [vuejs-clipper](https://www.npmjs.com/package/vuejs-clipper)

## Installation

```bash
npm install vuetify-image-clipper --save
```
### Import

main.js / app.js
```javascript
import VuetifyImageClipper from "vuetify-image-clipper"
import "vuetify-image-clipper/dist/v-image-clipper.css"
Vue.use(VuetifyImageClipper)
```

any.vue
```html
<v-image-clipper v-model="image"></v-image-clipper>
```

* Props

|Name|Type|Default|Description|
|-|-|-|-|
|hide_result|Boolean|false|Hide the clipped image output preview
|ratio|Number|1|Ratio of image clipper
|clip_icon|String|"mdi-content-cut"|Icon for clip image
|reset_icon|String|"mdi-backup-restore"|Icon for reset image
|rotate_icon|String|"mdi-format-rotate-90"|Icon for rotate image
|accept|String|"image/*"|accept attribute of html input tag

* Slot

|Slot|Description|
|-|-|
|default|Displayed below the clipper, can be used for example for adding action button (OK and Cancel)|
|image_input|Displayed when no image is selected|
|no_result|Displayed when no result image is clipped|
|extra_info|Displayed extra information|

<!-- * Example
	- [Demo](https://bbitwolf.github.io/Vue-Project-Demo/)
	- [Demo Src Code](/docs/examples/integrating-with-dialog.vue) -->