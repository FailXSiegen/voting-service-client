<template>
    <ul class="pagination m-0">
      <li class="page-item previous" v-if="pagination.currentPage > 1">
        <a class="page-link" href="#" @click.prevent="navigateToPage((pagination.currentPage - 1))">{{ localize('pagination.previous') }}</a>
      </li>
      <li class="page-item first" v-if="pagination.currentPage > pagination.maximumNumberOfLinks - 1">
        <a class="page-link" href="#" @click.prevent="navigateToPage(1)">1</a>
      </li>
      <li class="page-item" v-if="pagination.currentPage > pagination.maximumNumberOfLinks - 1">
        <a class="page-link" href="#" @click.prevent="">...</a>
      </li>
      <li :class="isCurrentPage(n)" v-for="(n, index) in getPageRange()" :key="index">
        <template v-if="n === pagination.currentPage">
          <a class="page-link" href="#" @click.prevent="">{{ n }}</a>
        </template>
        <template v-else>
          <a class="page-link" href="#" @click.prevent="navigateToPage(n)">{{ n }}</a>
        </template>
      </li>
      <li v-if="pagesCount < lastPage && pagination.currentPage < lastPage">
        <a class="page-link" href="#" @click.prevent="">...</a>
      </li>
      <li class="page-item last" v-if="getPageRange()[getPageRange().length - 1] < lastPage">
        <a class="page-link" href="#" @click.prevent="navigateToPage(lastPage)">{{ lastPage }}</a>
      </li>
      <li class="page-item next" v-if="pagination.currentPage < lastPage">
        <a class="page-link" href="#" @click.prevent="navigateToPage((pagination.currentPage + 1))">{{ localize('pagination.next') }}</a>
      </li>
    </ul>
</template>

<script>
import { range } from '../helper/array-helper'
import { localize } from '../helper/localizatiion-helper'

export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  computed: {
    pagesCount () {
      const pages = this.pagination.currentPage + (this.pagination.maximumNumberOfLinks - 1)
      return pages > (this.lastPage - 1) ? this.lastPage + 1 : pages
    },
    lastPage () {
      return Math.ceil(this.pagination.recordCount / this.pagination.itemsPerPage)
    }
  },
  methods: {
    getPageRange () {
      const start = this.pagesCount - this.pagination.maximumNumberOfLinks > 0
        ? this.pagesCount - this.pagination.maximumNumberOfLinks : 1
      const end = this.pagesCount >= this.lastPage ? this.lastPage + 1 : this.pagesCount
      return range(start, end)
    },
    isCurrentPage (n) {
      return {
        'page-item active': n === this.pagination.currentPage
      }
    },
    navigateToPage (page) {
      const me = this
      me.$emit('navigateToPage', { page })
      me.pagination.currentPage = page
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
