<template>
  <table class="table table-responsive table-striped manufacturer-listing my-5">
    <thead>
      <tr>
        <th v-for="(key, index) in headers" :key="index">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <app-row :manufacturer="manufacturer" v-for="manufacturer in manufacturers" :key="manufacturer.id" @edit="onEdit" @delete="onDelete"></app-row>
    </tbody>
  </table>
</template>

<script>
import AppRow from './Row'

export default {
  props: {
    manufacturers: {
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
        'Logo',
        'Website'
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
