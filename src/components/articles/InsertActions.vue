<template>
  <div class="article-actions mb-2">
    <button class="btn btn-primary" @click.prevent="onImport">{{ localize('action.import') }}</button>
    <button class="btn btn-success ml-2" @click.prevent="onAddNew">{{ localize('action.addNew') }}</button>
  </div>
</template>

<script>
import { localize } from '../../helper/localizatiion-helper'

export default {
  methods: {
    onAddNew () {
      this.$emit('addNew', {
        article: {
          id: ''
        }
      })
    },
    onImport () {
      this.$emit('import')
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
