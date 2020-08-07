<template>
  <table class="table table-responsive table-striped article-listing my-5">
    <thead>
      <tr>
        <th v-for="(key, index) in headers" :key="index">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <app-row :article="article" v-for="article in articles" :key="article.id" @edit="onEdit" @delete="onDelete"></app-row>
    </tbody>
  </table>
</template>

<script>
import AppRow from './Row'

export default {
  props: {
    articles: {
      type: Array,
      require: true
    }
  },
  components: {
    AppRow
  },
  data () {
    return {
      headers: [
        '', // Actions
        'ID',
        'Title',
        'EAN',
        'Article No.',
        'Series',
        'Protection Class',
        'Protective Cap',
        'Puncture protection',
        'Size from',
        'Size to',
        'Secosol certified',
        'Instruction link',
        'File link',
        'Certificate',
        'Manufacturer'
      ]
    }
  },
  methods: {
    onEdit (event) {
      this.$emit('edit', event)
    },
    onDelete (event) {
      this.$emit('delete', event)
    }
  }
}
</script>
