// src/graphql/queries.js
import gql from 'graphql-tag';

export const GET_PRODUCTS_BY_CATEGORIES = gql`
query GetProductsByCategories($category_ids: [Int!]!) {
  products(where: { category_id: { _in: $category_ids } }) {
    category_id
    company_id
    created_at
    id
    name
    price
    quantity
  }
}
`;

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $offset: Int!) {
    products(limit: $limit, offset: $offset) {
      category_id
      company_id
      created_at
      id
      name
      price
      quantity
    }
  }
`;

export const GET_CATEGORIES = gql`
query Categories($limit: Int!, $offset: Int!) {
  categories(limit: $limit, offset: $offset) {
      created_at
      id
      name
      parent_id
  }
}
`;

export const GET_ALL_CATEGORIES = gql`
query Categories {
  categories {
      created_at
      id
      name
      parent_id
  }
}
`;

export const GET_PRODUCT = gql`
query Products_by_pk($id: Int!) {
  products_by_pk(id: $id) {
      category_id
      company_id
      created_at
      id
      name
      price
      quantity
  }
}
`;

export const GET_CATEGORY = gql`
query Categories_by_pk($id: Int!) {
  categories_by_pk(id: $id) {
      created_at
      id
      name
      parent_id
  }
}
`;
