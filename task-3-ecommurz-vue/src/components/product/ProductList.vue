<script>
import ProductCard from '@/components/product/ProductCard.vue'
import LoadingShimmer from '@/components/LoadingShimmer.vue'
import NotFound from '@/components/NotFound.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    LoadingShimmer,
    NotFound
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
<template>
  <div class="product-list">
    <LoadingShimmer width="200px" height="150px" v-if="isLoading" />
    <template v-if="!isLoading && products.length > 0">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :quantity="product.quantity"
        :category-id="product.category_id"
        :company-id="product.company_id"
        :created-at="product.created_at"
      />
    </template>
    <NotFound v-if="!isLoading && products.length === 0" />
  </div>
</template>
