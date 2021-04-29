<template>
<v-card flat>
	<v-row no-gutters class="ma-0">
		<v-col cols=12 md>
			<clipper-fixed 
				class="my-clipper fill-height" ref="clipper" 
				:src="imgURL"
				:ratio="ratio"
				grid
				bg-color="#eee"
				:rotate="rotate"
				style="cursor: pointer;"
				@load="resetRotate()"
			>
				<div slot="placeholder">
					<clipper-upload v-model="imgURL" class="clipper-upload" :accept="accept">
						<!-- image input slot -->
						<slot name="image_input">
							<div class="py-12 text-center font-italic">
								<div>
									<v-icon size="80px">mdi-file-image-outline</v-icon>
								</div>                                
								<div class="grey--text">
                                    <div>No image is selected.</div>
                                    <div class="pt-1"><v-btn small color="primary" class="text-capitalize">upload image</v-btn></div>
                                </div>
							</div>
						</slot>
					</clipper-upload>
				</div>
			</clipper-fixed>
		</v-col>
		<template v-if="imgURL != '' ">
			<v-col cols=12 md=3 align-self="center">
				<v-row dense class="pa-1 ma-0" justify="space-around" :class="hide_result ? 'flex-column' : '' ">
					<v-col cols=12 v-if="!hide_result">
							<img :src="imgResult" class="fill-width">
							<div v-show="imgResult == '' ">
								<!-- no result slot -->
								<slot name="no_result">
									<div class="radius-05 body-2 font-italic grey--text py-6 text-center" style="border: 2px dashed #ccc;">No Result</div>
								</slot>
							</div>
							<!-- file details slot -->
							<slot name="extra_info"></slot>
					</v-col>
					<v-col cols=auto><v-icon color="success" title="Confirm" @click="clipImage()">{{ clip_icon }}</v-icon></v-col>
					<v-col cols=auto><v-icon color="error" title="Reset" @click="resetComponent()">{{ reset_icon }}</v-icon></v-col>
					<v-col cols=auto><v-icon title="Rotate Image" @click="rotateImage()">{{ rotate_icon }}</v-icon></v-col>	
				</v-row>
			</v-col>
		</template>
	</v-row>
	<v-card-actions>
		<!-- default slot -->
		<slot></slot>
	</v-card-actions>
</v-card>
</template>

<script>
import { clipperFixed, clipperUpload  } from 'vuejs-clipper'
export default {
	components: { 
		clipperFixed,
		clipperUpload,
	},
	props:{
		value: {
			required: true,
		},
		hide_result: {
			type: Boolean,
			default: false,
		},
		ratio: {
			type: Number,
			default : 1
		},
		clip_icon: {
			type: String,
			default : "mdi-content-cut"
		},
		reset_icon: {
			type: String,
			default : "mdi-backup-restore"
		},
		rotate_icon: {
			type: String,
			default : "mdi-format-rotate-90"
		},
		accept: {
			type: String,
			default : "image/*"
		},
	},
	data () {
		return {
			imgURL: '',
			imgResult : '',
			rotate : 0,
		}
	},
	created(){
	},
	watch:{
	},
	methods: {
		rotateImage(){
			if(this.rotate == 270){
				this.rotate = 0
			}else{
				this.rotate+=90
			}
		},
		resetComponent(){
			this.imgURL = ''
			this.imgResult = ''
			this.$emit('reset')
		},
		resetRotate(){
			this.rotate = 0
		},
		clipImage() {
			const canvas = this.$refs.clipper.clip(); // call component's clip method
			let result = canvas.toDataURL(); // canvas->image
			this.imgResult = result
			this.$emit('input',result)
		},
	}
  }
</script>

<style scoped>
	.radius-05{
		border-radius: 5px !important;
	}
	.fill-width{
		width: 100% !important;
	}
</style>