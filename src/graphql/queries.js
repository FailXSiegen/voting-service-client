import gql from 'graphql-tag'

// @TODO add language params

export function buildArticlesQuery () {
  return gql`query ArticlesPaginated($page: Int, $first: Int) {
      articles(page: $page, first: $first) {
          id
          title
          ean
          articleNumber
          series
          protectionClass
          protectiveCap
          punctureProtection
          sizeFrom
          sizeTo
          secosolCertified
          instructionPresent
          instructionLink
          optionalFileLink
          certificate {
              id
          }
          manufacturer {
              id
          }
      }
  }`
}

export function buildManufacturersQuery () {
  return gql`query ManufacturersPaginated($page: Int, $first: Int) {
      manufacturers(page: $page, first: $first) {
          id
          title
          logo
          website
      }
  }`
}

export function buildManufacturersCountQuery (language) {
  return gql`query ManufacturersCount {
      manufacturersCount(language:de_DE)
  }`
}

export function buildArticlesCountQuery (language) {
  return gql`query ArticlesCount {
      articlesCount(language:de_DE)
  }`
}
