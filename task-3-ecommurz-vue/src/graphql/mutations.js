// src/graphql/mutations.js
import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
mutation Insert_products_one($data: products_insert_input!) {
  insert_products_one(object: $data) {
      id
      name
      price
      quantity
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation Update_products_by_pk($id: Int!, $data: products_set_input!) {
  update_products_by_pk(pk_columns: { id: $id }, _set: $data) {
    category_id
    company_id
    created_at
    price
    quantity
    id
    name
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation Delete_products_by_pk($id: Int!) {
  delete_products_by_pk(id: $id) {
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

export const ADD_CATEGORY = gql`
mutation Insert_categories_one($data: categories_insert_input!) {
  insert_categories_one(object: $data) {
    created_at
    id
    name
    parent_id
  }
}
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int!, $name: String!) {
    update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      created_at
      parent_id
    }
  }
`

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($id: Int!) {
  delete_categories_by_pk(id: $id) {
    id
  }
}
`;
