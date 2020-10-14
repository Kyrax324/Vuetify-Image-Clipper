<template>
	<v-dialog 
	    ref="image_ref"
		v-model="image_dialog" 
	    :return-value.sync="image"
		max-width="750px" 
		persistent
	>
		<template v-slot:activator="{ on, attrs }">
			<div class="text-center white">
				<div v-show="image">
					<img :src="image" width="100%">
				</div>
				<div v-show="!image" class="elevation-3 text-center pa-12" v-on="on">
					<div>
						<div><v-icon>mdi-upload</v-icon></div>
						<div class="caption">Upload Image</div>
					</div>
				</div>
			</div>
	    </template>
		<v-image-clipper v-model="image">
			<!-- slot::no_result -->
			<template slot="no_result">
				<div class="text-center pa-12 elevation-3">No result is clipped yet.</div>
			</template>
			<!-- slot::image_input -->
			<template slot="image_input">
				<div class="text-center pa-12 elevation-3">Click here to input image</div>
			</template>
			<!-- slot::default -->
			<template>
		        <v-spacer></v-spacer>
			    <v-btn text color="primary" @click="image_dialog = false">Cancel</v-btn>
			    <v-btn text color="primary" @click="$refs.image_ref.save(image)">OK</v-btn>
			</template>
		</v-image-clipper>
	</v-dialog>
</template>

<script>
import VuetifyImageClipper from "vuetify-image-clipper"
import "vuetify-image-clipper/dist/v-image-clipper.css"
export default{
	data(){
		return {
			image_dialog : false,
			image : null
		}
	},
	methods:{
		dataURLtoBlob(dataURL){ // convert result to file
			var blobBin = atob(dataURL.split(',')[1]);
			var array = [];
			for(var i = 0; i < blobBin.length; i++) {
			    array.push(blobBin.charCodeAt(i));
			}
			var file = new Blob([new Uint8Array(array)], {type: 'image/png'});
			return file
		},
		save_image_to_backend(item){

		    let data = new FormData();
	        data.append("name", this.name || '');
	        data.append("image", this.dataURLtoBlob(this.item.image));

	        // to backend
			// this.$axios(some_url, data).then(...)
		},
	}
}
</script>