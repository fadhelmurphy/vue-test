<script setup>
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import LayoutComponent from '@/containers/LayoutComponent.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import NotFound from '@/components/NotFound.vue'
import LoadingShimmer from '@/components/LoadingShimmer.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import Pagination from '@/components/Pagination.vue'
import CategoryCard from '@/components/category/CategoryCard.vue'

const showAddModal = ref(false)
const showConfirmModal = ref(false)
const categoryToDelete = ref(null)
const store = useCategoryStore()

const categoryFields = [
  {
    name: 'name',
    label: 'Category Title',
    type: 'text',
    placeholder: 'Category Title',
    required: true
  }
]

const addCategory = (data) => {
  store.addCategory(data)
}

const confirmDeleteCategory = (id) => {
  categoryToDelete.value = id
  showConfirmModal.value = true
}

const handleConfirmDelete = () => {
  if (categoryToDelete.value !== null) {
    store.deleteCategory(categoryToDelete.value)
    categoryToDelete.value = null
  }
  showConfirmModal.value = false
}

const handleCancelDelete = () => {
  categoryToDelete.value = null
  showConfirmModal.value = false
}

onMounted(() => {
  store.fetchCategories()
})
</script>
<template>
  <LayoutComponent title="Categories Page" metaDescription="Browse and manage your categories">
    <button class="add-category-button" @click="showAddModal = true">Add Category</button>
    <div v-if="store.error">
      <ErrorComponent :message="store.error.message" />
    </div>

    <LoadingShimmer v-if="store.loading" height="100px" width="100%" />

    <template v-else>
      <div v-if="store.categories.length === 0">
        <NotFound message="No categories found." />
      </div>
      <div v-else>
        <div v-for="category in store.categories" :key="category.id">
          <CategoryCard
            :id="category.id"
            :name="category.name"
            :onDelete="() => confirmDeleteCategory(category.id)"
          />
        </div>
      </div>
    </template>
    <Pagination
      :currentPage="store.currentPage"
      :totalPages="store.totalPages"
      :prevPage="store.prevPage"
      :nextPage="store.nextPage"
    />

    <!-- Modal for adding category -->
    <ModalComponent
      :showModal="showAddModal"
      title="+ Add New Category"
      :fields="categoryFields"
      :submitButtonText="'Add Category'"
      :onClose="() => (showAddModal = false)"
      :onSubmit="addCategory"
    />

    <!-- Confirmation Modal -->
    <ConfirmationModal
      :showModal="showConfirmModal"
      title="Confirm Deletion"
      message="Are you sure you want to delete this category?"
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      :onConfirm="handleConfirmDelete"
      :onCancel="handleCancelDelete"
    />
  </LayoutComponent>
</template>
<style scoped>
.add-category-button {
  display: block;
  margin: 2rem 0 0 auto;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-category-button:hover {
  background: #0056b3;
}

.add-category-button:focus {
  outline: none;
}
</style>
