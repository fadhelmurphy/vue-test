import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
uri: process.env.GQL_API,
headers: {
  'x-hasura-admin-secret': process.env.API_KEY
}
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})