<template>
  <tr>
    <td class="btn-group">
      <button class="btn btn-secondary p-1" @click.prevent="onEdit">
        <img alt="edit" src="../../assets/icons/edit.svg" width="24">
      </button>
      <button class="btn btn-danger p-1" @click.prevent="onDelete">
        <img alt="trash" src="../../assets/icons/trash.svg" width="24">
      </button>
    </td>
    <td>{{ manufacturer.id }}</td>
    <td>{{ manufacturer.title }}</td>
    <td>{{ manufacturer.logo }}</td>
    <td>{{ manufacturer.website }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    manufacturer: {
      type: Object,
      required: true
    }
  },
  methods: {
    onEdit () {
      this.$emit('edit', {
        manufacturer: this.manufacturer
      })
    },
    onDelete () {
      this.$emit('delete', {
        manufacturer: this.manufacturer
      })
    }
  }
}
</script>
