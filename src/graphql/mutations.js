import gql from 'graphql-tag'

export function updateEventUser () {
  return gql`mutation updateEventUser($input: UpdateEventUserInput!){
    updateEventUser(input: $input) {
      id
    }
  }`
}

export function updateEventUserVerified () {
  return gql`mutation updateEventUserVerified($input: UpdateEventUserVerifiedInput!){
    updateEventUserVerified(input: $input) {
      id
      verified
      allowToVote
    }
  }`
}
