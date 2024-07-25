<template>
  <div class="product-card">
    <h3>{{ name }}</h3>
    <p>Price: ${{ price.toFixed(2) }}</p>
    <p>Quantity: {{ quantity }}</p>
    <p>Category ID: {{ categoryId }}</p>
    <p>Company ID: {{ companyId }}</p>
    <p>Created At: {{ formatDate(createdAt) }}</p>
    <router-link :to="`/product/${id}`" class="view-details-button">View Details</router-link>
  </div>
</template>

<script>
import { formatDate } from '@/helpers/dateHelpers.js'

export default {
  name: 'ProductCard',
  props: {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    categoryId: Number,
    companyId: Number,
    createdAt: String,
  },
  methods: {
    formatDate
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.product-card h3 {
  margin: 0 0 10px;
}

.product-card p {
  margin: 5px 0;
}

.view-details-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
}

.view-details-button:hover {
  background-color: #0056b3;
}
</style>
