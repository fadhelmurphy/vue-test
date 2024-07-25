import { defineStore } from 'pinia'
import { GET_PRODUCTS, GET_PRODUCT, GET_PRODUCTS_BY_CATEGORIES } from '../graphql/queries'
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../graphql/mutations'
import { apolloClient } from '@/apolloClient'
import { calculateTotalPrice } from '@/helpers/utils'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: {},
    categories: [],
    loading: false,
    error: null,
    limit: 5,
    offset: 0,
    currentPage: 1,
    totalPrice: 0
  }),
  actions: {
    async fetchProductsByCategory(categoryId) {
      if (categoryId !== null) {
        this.loading = true
        try {
          const { data, loading } = await apolloClient.query({
            query: GET_PRODUCTS_BY_CATEGORIES,
            variables: { category_id: categoryId },
            fetchPolicy: 'network-only' // Ensure fresh data
          })
          this.products = data.products
          this.loading = loading
          this.totalPrice = calculateTotalPrice(data.products)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      }
    },
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const { data, loading } = await apolloClient.query({
          query: GET_PRODUCTS,
          variables: { limit: this.limit, offset: this.offset },
          fetchPolicy: 'network-only' // Ensure fresh data
        })
        this.products = data.products
        this.loading = loading
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    nextPage() {
      this.currentPage += 1
      this.offset = (this.currentPage - 1) * this.limit
      this.fetchProducts()
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.offset = (this.currentPage - 1) * this.limit
        this.fetchProducts()
      }
    },
    async fetchProduct(id) {
      this.loading = true
      this.error = null
      try {
        const { data, loading } = await apolloClient.query({
          query: GET_PRODUCT,
          variables: { id },
          fetchPolicy: 'network-only' // Ensure fresh data
        })
        this.product = data.products_by_pk
        this.loading = loading
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async addProduct(product) {
      this.loading = true
      // Push newProduct into products array
      const { data } = await apolloClient.mutate({
        mutation: ADD_PRODUCT,
        variables: { data: product }
      })
      if (data) {
        this.fetchProducts()
      }
      // this.products = [...this.products, data.insert_products_one];
    },

    async updateProduct(updatedProduct) {
      this.loading = true
      try {
        const { id, ...data } = updatedProduct

        // Remove __typename from the data
        const cleanData = JSON.parse(JSON.stringify(data), (key, value) => {
          return key === '__typename' ? undefined : value
        })

        const response = await apolloClient.mutate({
          mutation: UPDATE_PRODUCT,
          variables: { id, data: cleanData }
        })
        if (response) {
          this.fetchProduct(id)
        }
        // // Update the product in the state
        // this.product = response.data.update_products_by_pk
        // // Optionally update the product list if needed
        // const index = this.products.findIndex(p => p.id === id)
        // if (index !== -1) {
        //   this.products.splice(index, 1, response.data.update_products_by_pk)
        // }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async deleteProduct(id) {
      this.loading = true

      const { data } = await apolloClient.mutate({
        mutation: DELETE_PRODUCT,
        variables: { id }
      })
      if (data) {
        this.fetchProducts()
      }
      this.loading = false
    }
  }
})
