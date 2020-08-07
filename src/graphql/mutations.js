import gql from 'graphql-tag'

export function buildUpdateManufacturerMutation () {
  return gql`mutation UpdateManufacturer($input: UpdateManufacturerInput!) {
      updateManufacturer(input: $input) {
          id
      }
  }`
}

export function buildCreateManufacturerMutation () {
  return gql`mutation CreateManufacturer($input: CreateManufacturerInput!) {
      createManufacturer(input: $input) {
          id
      }
  }`
}

export function buildUpdateArticleMutation () {
  return gql`mutation UpdateArticle($input: UpdateArticleInput!) {
      updateArticle(input: $input) {
          id
      }
  }`
}

export function buildCreateArticleMutation () {
  return gql`mutation CreateArticle($input: CreateArticleInput!) {
      createArticle(input: $input) {
          id
      }
  }`
}

export function buildDeleteManufacturerMutation () {
  return gql`mutation deleteManufacturer($id: ID!) {
      deleteManufacturer(id: $id)
  }`
}

export function buildDeleteArticleMutation () {
  return gql`mutation deleteArticle($id: ID!) {
      deleteArticle(id: $id)
  }`
}

export function uploadMediaMutation (language) {
  return gql`mutation ($input: UploadMediaInput!) { uploadMedia(input: $input)}`
}
