<template>
  <LayoutComponent :title="product.name ?? `Product Detail`">
    <div v-if="store.loading" class="loading">Loading...</div>
    <div v-else-if="store.error" class="error">{{ store.error?.message }}</div>
    <div v-if="!store.loading && !store.error && product">
      <div class="product-detail">
        <h1>{{ product.name }}</h1>
        <p><strong>Price:</strong> ${{ product.price?.toFixed(2) }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity }}</p>
        <p><strong>Category ID:</strong> {{ product.category_id }}</p>
        <p><strong>Company ID:</strong> {{ product.company_id }}</p>
        <p><strong>Created At:</strong> {{ formatDate(product.created_at) }}</p>
        <button @click="showModal = true" class="update-button">Update Product</button>
        <button @click="showConfirmationModal = true" class="delete-button">Delete Product</button>
      </div>

      <!-- Modal for updating product -->
      <ModalComponent
        :showModal="showModal"
        title="Update Product"
        :fields="productFields"
        :initialData="product"
        :submitButtonText="'Update Product'"
        :onClose="() => showModal = false"
        :onSubmit="updateProduct"
      />

      <!-- Confirmation Modal for deletion -->
      <ConfirmationModal
        :showModal="showConfirmationModal"
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
        :onConfirm="handleDelete"
        :onCancel="() => showConfirmationModal = false"
      />
    </div>
  </LayoutComponent>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ModalComponent from '@/components/ModalComponent.vue'
import LayoutComponent from '@/containers/LayoutComponent.vue'
import { formatDate } from '@/helpers/dateHelpers.js'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { useRoute } from 'vue-router'

export default {
  components: { ModalComponent, LayoutComponent, ConfirmationModal },
  setup() {
    const showModal = ref(false)
    const showConfirmationModal = ref(false)
    const route = useRoute();
    const store = useProductStore();
    const id = parseInt(route.params.id);
    const product = ref({})

    const productFields = [
      { name: 'name', label: 'Product Title', type: 'text', placeholder: 'Product Title', required: true },
      { name: 'price', label: 'Product Price', type: 'number', placeholder: 'Product Price', required: true },
      { name: 'quantity', label: 'Product Quantity', type: 'number', placeholder: 'Product Quantity', required: true }
    ]

    const fetchProduct = async () => {
      await store.fetchProduct(id)
      product.value = store.product
    }

    const updateProduct = (data) => {
      store.updateProduct({ ...data, id })
    }

    const handleDelete = async () => {
      await store.deleteProduct(id)
      window.location.href = "/products"
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      showModal,
      showConfirmationModal,
      productFields,
      product,
      updateProduct,
      handleDelete,
      formatDate,
      store,
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.product-detail h1 {
  margin: 0 0 20px;
}

.product-detail p {
  margin: 10px 0;
}

.update-button, .delete-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.update-button {
  background-color: #007bff;
  color: #fff;
}

.update-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
}

.loading, .error {
  text-align: center;
  font-size: 18px;
  color: #333;
}
</style>
