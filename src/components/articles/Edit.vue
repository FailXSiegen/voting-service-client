<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">{{ localize('view.article.edit.title') }}</label>
      <input v-model="article.title" class="form-control" id="title">
    </div>
    <div class="form-group">
      <label for="ean">{{ localize('view.article.edit.ean') }}</label>
      <input v-model="article.ean" class="form-control" id="ean">
    </div>
    <div class="form-group">
      <label for="articleNumber">{{ localize('view.article.edit.articleNumber') }}</label>
      <input v-model="article.articleNumber" class="form-control" id="articleNumber">
    </div>
    <div class="form-group">
      <label for="series">{{ localize('view.article.edit.series') }}</label>
      <input v-model="article.series" class="form-control" id="series">
    </div>
    <div class="form-group">
      <label for="protectionClass">{{ localize('view.article.edit.protectionClass') }}</label>
      <input v-model="article.protectionClass" class="form-control" id="protectionClass">
    </div>
    <div class="form-group">
      <label for="protectiveCap">{{ localize('view.article.edit.protectiveCap') }}</label>
      <input v-model="article.protectiveCap" class="form-control" id="protectiveCap">
    </div>
    <div class="form-group">
      <label for="punctureProtection">{{ localize('view.article.edit.punctureProtection') }}</label>
      <input v-model="article.punctureProtection" class="form-control" id="punctureProtection">
    </div>
    <div class="form-group">
      <label for="sizeFrom">{{ localize('view.article.edit.sizeFrom') }}</label>
      <input v-model="article.sizeFrom" class="form-control" id="sizeFrom">
    </div>
    <div class="form-group">
      <label for="sizeTo">{{ localize('view.article.edit.sizeTo') }}</label>
      <input v-model="article.sizeTo" class="form-control" id="sizeTo">
    </div>
    <div class="form-group">
      <label for="secosolCertified">{{ localize('view.article.edit.secosolCertified') }}</label>
      <input v-model="article.secosolCertified" class="form-control" id="secosolCertified">
    </div>
    <div class="form-group">
      <label for="instructionPresent">{{ localize('view.article.edit.instructionPresent') }}</label>
      <input v-model="article.instructionPresent" class="form-control" id="instructionPresent">
    </div>
    <div class="form-group">
      <label for="instructionLink">{{ localize('view.article.edit.instructionLink') }}</label>
      <input v-model="article.instructionLink" class="form-control" id="instructionLink">
    </div>
    <div class="form-group">
      <label for="optionalFileLink">{{ localize('view.article.edit.optionalFileLink') }}</label>
      <input v-model="article.optionalFileLink" class="form-control" id="optionalFileLink">
    </div>
    <div class="form-group">
      <label for="certificate">{{ localize('view.article.edit.certificate') }}</label>
      <input v-model="article.certificate" class="form-control" id="certificate">
    </div>
    <div class="form-group">
      <label for="manufacturer">{{ localize('view.article.edit.manufacturer') }}</label>
      <input v-model="article.manufacturer" class="form-control" id="manufacturer">
    </div>
    <button type="submit" class="btn btn-primary btn-block">{{ localize('view.article.edit.submit') }}</button>
  </form>
</template>

<script>
import { localize } from '../../helper/localizatiion-helper'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', {
        article: this.article
      })
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
