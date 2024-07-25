<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      prevPage: {
        type: Function,
        required: true
      },
      nextPage: {
        type: Function,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    margin: 20px 0;
    text-align: center;
  }
  
  .pagination button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin: 0 5px;
  }
  
  .pagination button:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
  
  .pagination span {
    margin: 0 10px;
    font-size: 1rem;
  }
  </style>
  