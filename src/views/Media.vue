<template>
  <div class="media-view-container mb-5">
    <app-header :headline="headline"></app-header>
    <slot name="alerts"></slot>
    <div class="row justify-content-center mx-0">
      <div class="col-12 col-md-8">
        <app-media-selector @select="onSelect"></app-media-selector>
        <div class="media-actions my-5">
          <button :disabled="!selectedMedia"  @click.prevent="onDelete" class="btn btn-danger btn-block px-3">
            <span aria-hidden="true">{{ localize('view.media.removeFile') }}</span>
          </button>
          <app-upload :uploadEnabled="true" @upload="onUpload"></app-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './../components/Header'
import AppMediaSelector from './../components/MediaSelector'
import AppUpload from './../components/media/Upload'
import { localize } from '../helper/localizatiion-helper'
import { addDangerMessage } from '../helper/alert-helper'
// import { uploadMediaMutation } from '../graphql/mutations'

export default {
  components: {
    AppHeader,
    AppMediaSelector,
    AppUpload
  },
  data () {
    return {
      headline: 'Media',
      selectedMedia: false
    }
  },
  methods: {
    onSelect (event) {
      this.selectedMedia = event.media
      console.log(this.selectedMedia)
    },
    onUpload (event) {
      addDangerMessage('Not yet implemented', ':-(')
      // const file = event.file
      // const override = event.override
      // this.$apollo.mutate({
      //   mutation: uploadMediaMutation(),
      //   variables: {
      //     input: {
      //       fileName: file.name,
      //       mediaType: 'Logo',
      //       override: override
      //     }
      //   },
      //   context: {
      //     hasUpload: true
      //   }
      // }).then((data) => {
      //   console.log(data)
      // })
    },
    onDelete (event) {
      alert('Delete')
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
