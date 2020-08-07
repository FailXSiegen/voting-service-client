import { buildArticlesQuery, buildArticlesCountQuery } from './../../graphql/queries'

export default {
  articles: {
    query: buildArticlesQuery(),
    variables () {
      return {
        page: this.pagination.currentPage,
        first: this.pagination.itemsPerPage
      }
    }
  },
  articlesCount: {
    query: buildArticlesCountQuery(),
    update (data) {
      console.log('hit: ' + data.articlesCount)
      this.pagination.recordCount = data.articlesCount
      return data.articlesCount
    }
  }
}
