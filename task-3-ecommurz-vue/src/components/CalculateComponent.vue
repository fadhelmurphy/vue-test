<script>
import { ref, onMounted, watch } from 'vue'
import { GET_PRODUCTS_BY_CATEGORIES, GET_ALL_CATEGORIES } from '@/graphql/queries'
import { calculateTotalPrice, getAllCategoryIds } from '@/helpers/utils'
import { apolloClient } from '@/apolloClient'
import LayoutComponent from '@/containers/LayoutComponent.vue'
import ProductList from '@/components/product/ProductList.vue'

export default {
  components: {
    LayoutComponent,
    ProductList
  },
  setup() {
    const selectedCategoryId = ref(null)
    const categories = ref([])
    const products = ref([])
    const totalPrice = ref(0)
    const isLoading = ref(true)
    const errorMessage = ref(null)

    const fetchCategories = async () => {
      try {
        const { data: categoryData } = await apolloClient.query({
          query: GET_ALL_CATEGORIES
        })
        categories.value = categoryData.categories

        if (categories.value.length > 0 && selectedCategoryId.value === null) {
          selectedCategoryId.value = categories.value[0].id
        }
      } catch (error) {
        errorMessage.value = 'Error fetching categories.'
        console.error('Error fetching categories:', error)
      }
    }

    const fetchProducts = async () => {
      if (selectedCategoryId.value === null) return

      isLoading.value = true
      errorMessage.value = null
      try {
        const allCategoryIds = getAllCategoryIds(selectedCategoryId.value, categories.value)
        const { data: productData } = await apolloClient.query({
          query: GET_PRODUCTS_BY_CATEGORIES,
          variables: { category_ids: allCategoryIds }
        })

        products.value = productData.products
        totalPrice.value = calculateTotalPrice(products.value)
      } catch (error) {
        errorMessage.value = 'Error fetching products.'
        console.error('Error fetching products:', error)
      } finally {
        isLoading.value = false
      }
    }

    watch(selectedCategoryId, fetchProducts, { immediate: true })

    onMounted(() => {
      fetchCategories()
      fetchProducts()
    })

    return {
      selectedCategoryId,
      products,
      totalPrice,
      categories,
      isLoading,
      errorMessage
    }
  }
}
</script>

<template>
  <LayoutComponent title="Product Page" metaDescription="Explore our products">
    <div class="category-select">
      <select v-if="!isLoading" v-model="selectedCategoryId">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <ProductList :products="products" :isLoading="isLoading" />

    <div v-if="!isLoading" class="total-price">
      <h2>Total Price: {{ totalPrice }}</h2>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </LayoutComponent>
</template>
<style scoped>
.category-select {
  margin: 2rem;
  display: flex;
  justify-content: end;
}

.category-select select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.total-price {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: #333;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>

