<template>
  <form @submit.prevent='onSubmit' enctype='multipart/form-data' class="my-5">
    <h3 class="mb-3">{{ localize('view.media.upload.headline') }}</h3>
    <div class='custom-file'>
      <input :disabled='!uploadEnabled' @change="onChange"  name="upload-file" type='file' class='custom-file-input' id='file-upload'>
      <label id="upload-file-label" class='custom-file-label' for='file-upload'>{{ localize('view.media.upload.label') }}</label>
    </div>
    <div class="form-group my-3">
      <input id="override" type="checkbox" value="1" v-model="override" class="mr-3"/>
      <label for="override">Override</label>
    </div>
    <div class="form-group mt-3 mb-5">
      <button class="btn btn-primary btn-block">{{ localize('view.media.upload.submit') }}</button>
    </div>
  </form>
</template>

<script>
import { localize } from '../../helper/localizatiion-helper'

export default {
  props: {
    uploadEnabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      override: false
    }
  },
  methods: {
    onChange (event) {
      const fileName = event.target.value.split('\\').pop()
      const label = document.getElementById('upload-file-label')
      label.innerHTML = fileName
      label.classList.add('selected')
    },
    onSubmit (event) {
      const formData = new FormData(event.target)
      this.$emit('upload', {
        file: formData.get('upload-file'),
        override: this.override
      })
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
