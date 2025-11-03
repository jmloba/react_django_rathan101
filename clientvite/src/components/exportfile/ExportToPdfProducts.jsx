import React from 'react'
import { jsPDF } from "jspdf";
import { applyPlugin } from 'jspdf-autotable';


export const ExportToPdfProducts = (records, fileName = 'exported_data') => {
    const columns = [

        {
            name: "Prod Id",
            selector: row => row.id,
            sortable: true

        },
        
        {
            name: "Product Name",
            selector: row => row.product_name,
            sortable: true
        },
        {
            name: "Category Code",
            selector: row => row.product_category,

        },
        {
            name: "Category Name",
            selector: row => row.category_name,
            sortable: true
        },

        {
            name: "Wholesale",
            selector: row => row.wholesale_price,
            sortable: true
        },
        {
            name: "Retail",
            selector: row => row.retail_price,
            sortable: true
        },
      
        
    ]

    applyPlugin(jsPDF);

    const doc = new jsPDF('l', 'pt', 'a4');
    const tablecolumn = columns.map(col => col.name);
    const tableRows = records.map(
        record => [
   
            record.product_id,
            record.product_name,
            record.product_category,
            record.category_name,
            record.wholesale_price,
            record.retail_price,

        ]
    );

    doc.text("Product List  Data Export", 15, 15);
   doc.autoTable({
        head: [tablecolumn],
        body: tableRows,
        bodyStyles: { minCellHeight: 40 }, // Ensure cell is tall enough for the image
       

 
    })
    doc.save('ProductList.pdf');

}


