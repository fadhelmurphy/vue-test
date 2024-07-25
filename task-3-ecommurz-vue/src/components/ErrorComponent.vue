<template>
    <div class="error-message" v-if="message">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorComponent',
    props: {
      message: {
        type: String,
        required: true,
        default: 'An unexpected error occurred.',
      },
    },
  };
  </script>
  
  <style scoped>
  .error-message {
    color: #ff4d4d;
    background-color: #ffe6e6;
    border: 1px solid #ff4d4d;
    padding: 16px;
    border-radius: 4px;
    text-align: center;
    margin-top: 20px;
    font-size: 1.2em;
  }
  </style>
  