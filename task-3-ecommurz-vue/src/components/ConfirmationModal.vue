<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
        <div class="modal-buttons">
        <button @click="handleConfirm" class="confirm-button">{{ confirmButtonText }}</button>
        <button @click="handleCancel" class="cancel-button">{{ cancelButtonText }}</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  showModal: {type: Boolean, default: false},
  title: {type: String, default: ''},
  message: {type: String, default: ''},
  confirmButtonText: {type: String, default: 'Confirm'},
  cancelButtonText: {type: String, default: 'Cancel'}
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};

const closeModal = () => {
  emit('cancel');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.modal-content p {
  margin: 10px 0 20px;
  color: #555;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-buttons button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.confirm-button {
  background-color: #007bff;
  color: #fff;
}

.confirm-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
