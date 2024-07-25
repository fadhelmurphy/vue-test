<template>
    <div class="category-card">
      <router-link :to="`/category/${id}`" class="category-link">{{ name }}</router-link>
      <button class="delete-button" @click="onDelete">Delete</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    id: Number,
    name: String,
    onDelete: Function
  })
  </script>
  
  <style scoped>
  .category-card {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .category-link {
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
  }
  .delete-button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .delete-button:hover {
    background: #c82333;
  }
  </style>
  