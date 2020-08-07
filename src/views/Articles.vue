<template>
  <div class="articles-container mb-5">
    <app-header :headline="headline"></app-header>
    <slot name="alerts"></slot>
    <div class="articles-listing" v-show="!editView">
      <div class="row mx-0 justify-content-between align-items-end">
        <div class="col-auto">
          <app-article-filter @filter="onFilter"></app-article-filter>
        </div>
        <div class="col-auto">
          <app-insert-actions @import="onImport" @addNew="onEnableUpdateView"></app-insert-actions>
        </div>
      </div>
      <div v-if="pagination.recordCount > 0 && !$apollo.queries.articlesCount.loading" class="row justify-content-center mx-0 mt-5">
        <div class="col-auto">
          <app-pagination :pagination="pagination"></app-pagination>
        </div>
      </div>
      <div class="row justify-content-center mx-0">
        <div class="col-12">
          <div v-if="$apollo.queries.articles.loading">Loading...</div>
          <app-article-listing :articles="articles" @edit="onEnableUpdateView" @delete="onDelete"></app-article-listing>
        </div>
      </div>
      <div v-if="pagination.recordCount > 0 && !$apollo.queries.articlesCount.loading" class="row justify-content-center mx-0 mb-5">
        <div class="col-auto">
          <app-pagination :pagination="pagination"></app-pagination>
        </div>
    </div>
    </div>
    <div class="row mx-0 justify-content-center" v-if="editView">
      <div class="col-12 col-lg-8">
        <app-articles-edit :article="selectedArticle" @submit="onUpdate"></app-articles-edit>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './../components/Header'
import AppArticleFilter from './../components/articles/ArticleFilter'
import AppInsertActions from './../components/articles/InsertActions'
import AppPagination from './../components/Pagination'
import AppArticleListing from './../components/articles/Listing'
import AppArticlesEdit from './../components/articles/Edit'
import apollo from './../graphql/client/articles'
import { buildUpdateArticleMutation, buildCreateArticleMutation, buildDeleteArticleMutation } from './../graphql/mutations'
import { addDangerMessage } from './../helper/alert-helper'

export default {
  components: {
    AppHeader,
    AppArticleFilter,
    AppInsertActions,
    AppPagination,
    AppArticleListing,
    AppArticlesEdit
  },
  apollo,
  data () {
    return {
      headline: 'Articles',
      pagination: {
        ...this.$store.state.pagination,
        recordCount: 0,
        currentPage: 1
      },
      articles: [],
      editView: false,
      selectedArticle: null
    }
  },
  methods: {
    onImport () {
      // @TODO implement me!
      alert('import')
    },
    onFilter (event) {
      // @TODO implement me!
      alert('filter')
    },
    onEnableUpdateView (event) {
      this.selectedArticle = event.article
      this.editView = true
    },
    onDelete (event) {
      this.selectedArticle = null
      this.$apollo.mutate({
        mutation: buildDeleteArticleMutation(),
        variables: {
          id: event.article.id
        }
      }).then(() => {
        this.$apollo.queries.articles.refetch()
        this.$apollo.queries.articlesCount.refetch()
      }).catch(() => {
        addDangerMessage('Fehler!', 'Artikel konnte nicht entfernt werden.')
      })
    },
    onUpdate () {
      if (this.selectedArticle.id) {
        // @TODO implement manufacturer and certificate relations.
        delete this.selectedArticle.__typename
        delete this.selectedArticle.manufacturer
        delete this.selectedArticle.certificate
        this.$apollo.mutate({
          mutation: buildUpdateArticleMutation(),
          variables: {
            input: this.selectedArticle
          }
        }).then(() => {
          this.$apollo.queries.articles.refetch()
          this.$apollo.queries.articlesCount.refetch()
        })
      } else {
        // @TODO implement manufacturer and certificate relations.
        delete this.selectedArticle.id
        delete this.selectedArticle.__typename
        delete this.selectedArticle.manufacturer
        delete this.selectedArticle.certificate
        this.$apollo.mutate({
          mutation: buildCreateArticleMutation(),
          variables: {
            input: this.selectedArticle
          }
        }).then(() => {
          this.$apollo.queries.articles.refetch()
          this.$apollo.queries.articlesCount.refetch()
        })
      }
      this.editView = false
      this.selectedArticle = null
    }
  }
}
</script>
