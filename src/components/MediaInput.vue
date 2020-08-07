<template>
  <div class="my-3">
    <div class="img-preview">
      <img v-if="selectedMedia.publicPath" :src="selectedMedia.publicPath" :alt="selectedMedia.fileName" class="img img-fluid" width="60"/>
      <span v-if="selectedMedia.fileName ">{{ selectedMedia.fileName }}</span>
      <span v-else>...</span>
    </div>
    <button class="btn btn-primary" @click.prevent="onClick">Open Media Manager</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedMedia: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$emit('openMediaSelector', {
        selectedMedia: this.selectedMedia
      })
    }
  }
}
</script>
