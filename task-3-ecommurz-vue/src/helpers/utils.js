export function calculateTotalPrice(products) {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  export function getAllCategoryIds(categoryId, categories, visited = new Set()) {
    if (visited.has(categoryId)) return [];
    visited.add(categoryId);
  
    let categoryIds = [categoryId];
    const subcategories = categories.filter(cat => cat.parent_id === categoryId);
  
    subcategories.forEach(subcategory => {
      categoryIds = categoryIds.concat(getAllCategoryIds(subcategory.id, categories, visited));
    });
  
    return categoryIds;
  }