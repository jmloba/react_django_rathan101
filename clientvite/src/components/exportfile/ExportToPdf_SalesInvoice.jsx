import React from 'react'
import { jsPDF } from "jspdf";
import { applyPlugin } from 'jspdf-autotable';



export const ExportToPdf_SalesInvoice = (inv_no,records, columns, fileName = 'exported_data',totalQuantity,totalAmount) => {
    applyPlugin(jsPDF);

    const doc = new jsPDF('p', 'pt', 'a4');
    // const doc = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 format
    // const customDoc = new jsPDF('l', 'in', [8.5, 11]); // Landscape, inches, Letter size

    const tablecolumn = columns.map(col => col.name);
    const tableRows = records.map(
        
        record => [
          record.item_number,
        
            
            record.product_name,

            record.quantity,
            record.wholesale,
            record.retail,
        

        ]
    );
    let yPos = 15;
    const verticalSpacing = 15; // Define spacing between lines
    doc.text(`Sales Invoice ${inv_no}`, 15, yPos);
    yPos += verticalSpacing; 
    doc.text(`Total Quantity : ${totalQuantity}`, 15, yPos);
    yPos += verticalSpacing; 
    doc.text(`Total Amount : ${totalAmount}`, 15, yPos);
    yPos += verticalSpacing; 


    doc.autoTable({
        head: [tablecolumn],
        body: tableRows,
        bodyStyles: { minCellHeight: 35 }, // Ensure cell is tall enough for the image
        margin: { top: 50, left: 20, right: 20, bottom: 30 }, // Sets margins for the table
    })
    doc.save(`Invoice Details ${inv_no}.pdf`);
}

