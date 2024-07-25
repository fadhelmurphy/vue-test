<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <form @submit.prevent="submitForm">
        <div v-for="field in fields" :key="field.name" class="form-group">
          <label :for="field.name">{{ field.label }}</label>
          <input 
            v-model="formData[field.name]" 
            :type="field.type" 
            :id="field.name" 
            :placeholder="field.placeholder" 
            :required="field.required" 
            :disabled="field.disabled ?? false" 
            class="form-input"
          />
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn-submit">{{ submitButtonText }}</button>
          <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  props: {
    showModal: Boolean,
    title: String,
    fields: Array, // Array of field objects for form
    initialData: Object, // Data to pre-fill the form (if any)
    onClose: {
      type: Function,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    },
    submitButtonText: {
      type: String,
      default: 'Submit'
    }
  },
  setup(props) {
    const formData = ref({ ...props.initialData })

    const submitForm = () => {
      props.onSubmit(formData.value)
      formData.value = {} // Reset form input
      props.onClose() // Close modal after submitting
    }

    const closeModal = () => {
      props.onClose()
    }

    // Watch for changes in initialData and update formData
    watchEffect(() => {
      formData.value = { ...props.initialData }
    })

    return {
      formData,
      submitForm,
      closeModal
    }
  }
}
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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-submit, .btn-cancel {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.btn-cancel {
  background-color: #6c757d;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #5a6268;
}
</style>
