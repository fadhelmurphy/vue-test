<template>
  <div class="layout-container">
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/categories">Categories</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>&copy; 2024 Fadhel@Softon.Inc. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Vite App'
  },
  metaDescription: {
    type: String,
    default: ''
  }
})

watchEffect(() => {
  // Set title
  document.title = props.title

  // Set meta description
  let metaTag = document.querySelector('meta[name="description"]')
  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.name = 'description'
    document.head.appendChild(metaTag)
  }
  metaTag.content = props.metaDescription
})
</script>

<style scoped>
.layout-container {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

footer {
  background: #f8f9fa;
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  text-align: center;
  margin-top: auto;
}
</style>
