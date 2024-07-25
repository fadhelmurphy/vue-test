<template>
  <LayoutComponent title="Category Details" metaDescription="Manage category details">
    <div v-if="store.loading" class="loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error.message }}</div>
    <div v-if="!store.loading && store.category" class="category-details">
      <h1 class="category-title">{{ store.category.name }}</h1>
      <p><strong>ID:</strong> {{ store.category.id }}</p>
      <p><strong>Created At:</strong> {{ formatDate(store.category.created_at) }}</p>
      <p><strong>Parent ID:</strong> {{ store.category.parent_id }}</p>
      <div class="buttons">
        <button class="update-btn" @click="showModal = true">Update</button>
        <button class="delete-btn" @click="confirmDeleteCategory">Delete</button>
      </div>
    </div>

    <!-- Modal for updating category -->
    <ModalComponent
      :showModal="showModal"
      title="Update Category"
      :fields="categoryFields"
      :initialData="store.category"
      :submitButtonText="'Update Category'"
      :onClose="() => showModal = false"
      :onSubmit="updateCategory"
    />

    <!-- Confirmation Modal for deletion -->
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


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import LayoutComponent from '@/containers/LayoutComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { formatDate } from '@/helpers/dateHelpers';

const store = useCategoryStore();
const route = useRoute();
const id = parseInt(route.params.id);
const showModal = ref(false);
const showConfirmModal = ref(false);

const categoryFields = [
  {
    name: 'name',
    label: 'Category Title',
    type: 'text',
    placeholder: 'Category Title',
    required: true
  },
];

const updateCategory = async (data) => {
  await store.updateCategory({ ...data, id });
  showModal.value = false; // Close the modal after update
};

const confirmDeleteCategory = () => {
  showConfirmModal.value = true;
};

const handleConfirmDelete = async () => {
  await store.deleteCategory(id);
  showConfirmModal.value = false; 
  window.location.href = "/categories"; // Redirect after deletion
};

const handleCancelDelete = () => {
  showConfirmModal.value = false;
};

onMounted(() => {
  store.fetchCategory(id);
});
</script>
<style scoped>
.loading, .error {
  text-align: center;
  margin: 20px 0;
}

.category-details {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
}

.category-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.update-btn, .delete-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.update-btn {
  background-color: #007bff;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}
</style>

