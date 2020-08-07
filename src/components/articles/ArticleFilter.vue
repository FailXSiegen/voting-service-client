<template>
  <form class="form" @submit.prevent="onSubmitFilter">
    <div class="row px-0 justify-content-center align-items-end">
      <div class="form-group mb-0 col-12 col-md-auto">
        <label for="manufacturer">{{ localize('view.article.filter.manufacturer') }}</label>
        <input class="form-control mb-2 px-1" id="manufacturer" name="manufacturer" v-model="filter.manufacturer">
      </div>
      <div class="form-group mb-0 col-12 col-md-auto">
        <label for="article-title">{{ localize('view.article.filter.articleTitle') }}</label>
        <input class="form-control mb-2 px-1" id="article-title" name="article-title" v-model="filter.articleTitle">
      </div>
      <div class="form-group mb-0 col-12 col-md-auto">
        <label for="article-number">{{ localize('view.article.filter.articleNumber') }}</label>
        <input class="form-control mb-2 px-1" id="article-number" name="article-number" v-model="filter.articleNumber">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-2">{{ localize('view.article.filter.submit') }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import { localize } from '../../helper/localizatiion-helper'

export default {
  props: {
    filter: {
      type: Object,
      default: function () {
        return {
          manufacturer: '',
          articleTitle: '',
          articleNumber: ''
        }
      }
    }
  },
  methods: {
    onSubmitFilter () {
      this.$emit('filter', {
        filter: this.filter
      })
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
