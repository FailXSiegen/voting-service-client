<template>
  <div>
    <form v-show="!selectMediaEnabled" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">{{ localize('view.manufacturer.edit.title') }}</label>
        <input v-model="manufacturer.title" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="logo">{{ localize('view.manufacturer.edit.logo') }}</label>
        <input type="hidden" v-model="manufacturer.logo" class="form-control" id="logo">
        <app-media-input :selected-media="selectedMedia" @openMediaSelector="onOpenMediaSelector"></app-media-input>
      </div>
      <div class="form-group">
        <label for="website">{{ localize('view.manufacturer.edit.website') }}</label>
        <input v-model="manufacturer.website" class="form-control" id="website">
      </div>
      <button type="submit" class="btn btn-primary btn-block">{{ localize('view.manufacturer.edit.submit') }}</button>
    </form>
    <div v-if="selectMediaEnabled">
      <app-media-selector @select="onSelect"></app-media-selector>
      <button class="btn btn-primary my-3" @click.prevent="onCloseMediaSelector">{{ localize('view.manufacturer.edit.selectMedia') }}</button>
    </div>
  </div>
</template>

<script>
import { localize } from '../../helper/localizatiion-helper'
import AppMediaSelector from './../../components/MediaSelector'
import AppMediaInput from '../MediaInput'

export default {
  components: {
    AppMediaSelector,
    AppMediaInput
  },
  props: {
    manufacturer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectMediaEnabled: false,
      selectedMedia: {
        fileName: '',
        mimeType: '',
        relativePath: '',
        extension: '',
        baseName: '',
        publicPath: '',
        absolutePath: ''
      }
    }
  },
  methods: {
    onOpenMediaSelector () {
      this.selectMediaEnabled = true
    },
    onCloseMediaSelector () {
      this.selectMediaEnabled = false
      this.manufacturer.logo = this.selectedMedia.publicPath
    },
    onSelect (event) {
      this.selectedMedia = event.media
    },
    onSubmit () {
      this.$emit('submit', {
        manufacturer: this.manufacturer
      })
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
