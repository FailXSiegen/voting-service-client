import { ApolloLink, Observable } from '@apollo/client/core'
import { print } from 'graphql'
import { createClient } from 'graphql-sse'

class SSELink extends ApolloLink {
  constructor (options) {
    super()
    this.client = createClient(options)
  }

  request (operation) {
    console.log('sse Request')
    return new Observable((sink) => {
      return this.client.subscribe(Object.assign(Object.assign({}, operation), { query: print(operation.query) }), {
        next: sink.next.bind(sink),
        complete: sink.complete.bind(sink),
        error: sink.error.bind(sink)
      })
    })
  }
}
export const sseApolloLink = new SSELink({
  url: 'http://localhost:4000/sse'
})
