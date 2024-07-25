<script>
import { onMounted, ref } from 'vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { useProductStore } from '@/stores/productStore'
import ErrorComponent from '@/components/ErrorComponent.vue'
import ProductList from './ProductList.vue'
import LayoutComponent from '@/containers/LayoutComponent.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { ModalComponent, ErrorComponent, ProductList, LayoutComponent, Pagination },
  setup() {
    const showModal = ref(false)
    const store = useProductStore()

    const productFields = [
      {
        name: 'name',
        label: 'Product Title',
        type: 'text',
        placeholder: 'Product Title',
        required: true
      },
      {
        name: 'price',
        label: 'Product Price',
        type: 'number',
        placeholder: 'Product Price',
        required: true
      },
      {
        name: 'quantity',
        label: 'Product Quantity',
        type: 'number',
        placeholder: 'Product Quantity',
        required: true
      }
    ]

    const addProduct = (data) => {
      store.addProduct(data)
    }

    onMounted(() => {
      store.fetchProducts()
    })

    return {
      showModal,
      productFields,
      addProduct,
      store,
      prevPage: store.prevPage,
      nextPage: store.nextPage
    }
  }
}
</script>

<template>
  <LayoutComponent title="Product Page" metaDescription="Explore our products">

    <button @click="showModal = !showModal" class="add-product-button">+ Add Product</button>
    <ErrorComponent v-if="store.error" :message="store.error?.message" />

    <div class="product-container">
      <ProductList :products="store.products" :isLoading="store.loading" />
      
      <template v-if="!store.loading && !store.error">
        <Pagination
          :currentPage="store.currentPage"
          :totalPages="store.totalPages"
          :prevPage="prevPage"
          :nextPage="nextPage"
        />
      </template>
    </div>

    <!-- Modal Component -->
    <ModalComponent
      :showModal="showModal"
      title="Add New Product"
      :fields="productFields"
      :submitButtonText="'Add Product'"
      :onClose="() => (showModal = false)"
      :onSubmit="addProduct"
    />
  </LayoutComponent>
</template>

<style scoped>
.product-container {
  margin: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.add-product-button {
  display: block;
  width: 200px;
  padding: 10px;
  margin: 20px 0 0 auto;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.add-product-button:hover {
  background-color: #0056b3;
}
</style>
