

export const temp_columns = [
    { name: "User Name", selector: row => row.username, sortable: true,}    ,
    { name: "id", selector: row => row.id, sortable: true  },
    { name: "Quantity", selector: row => row.quantity,     sortable: true,    },
    { name: "Linkedid",  selector: row => row.product_linkid, sortable: true, },
    { name: "productname", selector: row => row.product_name, sortable: true, },
    { name: "quantity", selector: row => row.quantity, sortable: true, },
    { name: "saleprice", selector: row => row.retail_price, sortable: true, },
  ]

export default temp_columns