<template>
    <div :style="{ width: width, height: height }" class="shimmer-wrapper">
      <div class="shimmer-content"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingShimmer',
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '100px', // Default height set to 100px; adjust as necessary
      },
    },
  };
  </script>
  
  <style scoped>
  .shimmer-wrapper {
    position: relative;
    overflow: hidden;
    background: #f6f7f8;
  }
  
  .shimmer-content {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #f6f7f8 0%, #eaeaea 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  </style>
  