<template>
<div>
<v-card>
  <v-card-title>Demo:: Normal Usage</v-card-title>
  <v-card-subtitle>@ Vuetify-Image-Clipper</v-card-subtitle>
  <v-divider></v-divider>
  <v-card-text>
    <v-image-clipper v-model="image_1"></v-image-clipper>
  </v-card-text>
</v-card>

<v-card class="mt-12">
  <v-card-title>Demo:: Integrating with Dialog and Slots</v-card-title>
  <v-card-subtitle>@ Vuetify-Image-Clipper</v-card-subtitle>
  <v-divider></v-divider>
  <v-card-text>
    <v-dialog 
        ref="image_ref"
      v-model="image_dialog" 
        :return-value.sync="image_2"
      max-width="750px" 
      persistent
    >
      <template v-slot:activator="{ on }">
        <div class="text-center white">
          <div v-show="image_2">
            <img :src="image_2" width="100%">
          </div>
          <div v-show="!image_2" class="elevation-3 text-center pa-12" v-on="on">
            <div>
              <div><v-icon>mdi-upload</v-icon></div>
              <div class="caption">Upload Image</div>
            </div>
          </div>
        </div>
        </template>
      <v-image-clipper v-model="image_2">
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
            <v-btn text color="primary" @click="$refs.image_ref.save(image_2)">OK</v-btn>
        </template>
      </v-image-clipper>
    </v-dialog>
  </v-card-text>
</v-card>

</div>
</template>

<script>
export default {
  data(){
    return {
      image_dialog : false,
      image_1 : null,
      image_2 : null
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
    save_image_to_backend(){

        let data = new FormData();
          data.append("name", this.name || '');
          data.append("image", this.dataURLtoBlob(this.image));

          // to backend
      // this.$axios(some_url, data).then(...)
    },
  }
}
</script>