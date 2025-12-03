import React from 'react'

const ProductColumns = [
    {
      name: "id",
      selector: row => row.id,
      sortable: true

    },

    {
      name: "itemnumber",
      selector: row => row.product_itemno,
      sortable: true,
      maxwidth: '800px',
    },
    {
      name: "product_name",
      selector: row => row.product_name,
      sortable: true,

    },
    {
      name: "wholesale",
      selector: row => row.wholesale_price,
      sortable: true,

    },
    {
      name: "retail",
      selector: row => row.retail_price,
      sortable: true,

    },
    {
      name: "quantity",
      selector: row => row.quantity,
      sortable: true,

    },
  ]

export default ProductColumns