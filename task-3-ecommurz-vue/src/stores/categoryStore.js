import { defineStore } from 'pinia'
import { GET_ALL_CATEGORIES, GET_CATEGORIES, GET_CATEGORY } from '../graphql/queries'
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../graphql/mutations'
import { apolloClient } from '@/apolloClient'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    products: [],
    product: {},
    categories: [],
    category: {},
    loading: false,
    error: null,
    limit: 5,
    offset: 0,
    currentPage: 1
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await apolloClient.query({
          query: GET_CATEGORIES,
          variables: { limit: this.limit, offset: this.offset },
          fetchPolicy: 'network-only' // Ensure fresh data
        })
        this.categories = response.data.categories
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchAllCategories() {
      this.loading = true
      try {
        const response = await apolloClient.query({
          query: GET_ALL_CATEGORIES,
          fetchPolicy: 'network-only' // Ensure fresh data
        })
        this.categories = response.data.categories
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    nextPage() {
      this.currentPage += 1
      this.offset = (this.currentPage - 1) * this.limit
      this.fetchCategories()
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.offset = (this.currentPage - 1) * this.limit
        this.fetchCategories()
      }
    },
    async fetchCategory(id) {
      this.loading = true
      this.error = null
      try {
        const { data, loading } = await apolloClient.query({
          query: GET_CATEGORY,
          variables: { id },
          fetchPolicy: 'network-only' // Ensure fresh data
        })
        this.loading = loading
        this.category = data.categories_by_pk
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async addCategory(category) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: ADD_CATEGORY,
          variables: {data: category}
        })
        if(data){
          this.fetchCategories()
        } 
      } catch (err) {
        this.error = err
      }
    },
    async updateCategory(category) {
      this.loading = true 
      try {
        const { data } = await apolloClient.mutate({
          mutation: UPDATE_CATEGORY,
          variables: { id: category.id, name: category.name }
        })
        
        await this.fetchCategory(category.id)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false 
      }
    },
    async deleteCategory(id) {
        this.loading = true
  
        const {data} = await apolloClient.mutate({
          mutation: DELETE_CATEGORY,
          variables: {id}
        })
        if(data){
          this.fetchCategories()
        } 
        this.loading = false
    }
  }
})
