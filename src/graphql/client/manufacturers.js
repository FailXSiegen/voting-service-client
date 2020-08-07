import { buildManufacturersQuery, buildManufacturersCountQuery } from './../../graphql/queries'

export default {
  manufacturers: {
    query: buildManufacturersQuery(),
    variables () {
      return {
        page: this.pagination.currentPage,
        first: this.pagination.itemsPerPage
      }
    }
  },
  manufacturersCount: {
    query: buildManufacturersCountQuery(),
    update (data) {
      this.pagination.recordCount = data.manufacturersCount
      return data.manufacturersCount
    }
  }
}
