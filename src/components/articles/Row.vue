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
    <td>{{ article.id }}</td>
    <td>{{ article.title }}</td>
    <td>{{ article.ean }}</td>
    <td>{{ article.articleNumber }}</td>
    <td>{{ article.series }}</td>
    <td>{{ article.protectionClass }}</td>
    <td>{{ article.protectiveCap }}</td>
    <td>{{ article.punctureProtection }}</td>
    <td>{{ article.sizeFrom }}</td>
    <td>{{ article.sizeTo }}</td>
    <td>{{ article.secosolCertified }}</td>
    <td>{{ article.instructionLink }}</td>
    <td>{{ article.optionalFileLink }}</td>
    <td>--- TODO</td>
    <td>--- TODO</td>
  </tr>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    onEdit () {
      this.$emit('edit', {
        article: this.article
      })
    },
    onDelete () {
      this.$emit('delete', {
        article: this.article
      })
    }
  }
}
</script>
