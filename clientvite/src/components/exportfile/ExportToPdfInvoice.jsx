import React from 'react'
import { jsPDF } from "jspdf";
import { applyPlugin } from 'jspdf-autotable';

export const ExportToPdfInvoice = (records, columns, fileName = 'exported_data') => {
    applyPlugin(jsPDF);
    
    const doc = new jsPDF('l', 'pt', 'a4');
    const tablecolumn = columns.map(col => col.name);
    const tableRows = records.map(
        record => [
            record.invoice_ref,
            record.itemnumber,
            record.product_name,
            record.category,
            record.quantity,
            record.wholesale,
            record.retail,
        

        ]
    );
    doc.text("Invoice Details", 15, 15);
    doc.autoTable({
        head: [tablecolumn],
        body: tableRows,
        bodyStyles: { minCellHeight: 40 }, // Ensure cell is tall enough for the image
       

 
    })
    doc.save('Invoice Details.pdf');
}

