import React from 'react'
import { jsPDF } from "jspdf";
import { applyPlugin } from 'jspdf-autotable';


export const ExportToPdfEmployeeList = (records, columns, fileName = 'exported_data') => {
    applyPlugin(jsPDF);

    const doc = new jsPDF('l', 'pt', 'a4');
    const tablecolumn = columns.map(col => col.name);
    const tableRows = records.map(
        record => [
            ""
            ,
            record.id,
            record.emp_id,
            record.emp_name,
            record.designation,
            record.email,
            record.deptname,
            record.department,
            record.gender,
            record.emp_gendername,

        ]
    );
    doc.text("Employees Data Export", 15, 15);
    doc.autoTable({
        head: [tablecolumn],
        body: tableRows,
        bodyStyles: { minCellHeight: 40 }, // Ensure cell is tall enough for the image
        didDrawCell: (data) => {
            if (data.column.index === 1 && data.cell.section === 'body') { // Assuming image is in the 3rd column
                const cellHeight = data.cell.height+10;
                const cellWidth = data.cell.width;
                const imgDim = Math.min(cellHeight, cellWidth)  // Adjust dimension and padding
                const imgX = data.cell.x - 40 + (cellWidth - imgDim) / 2;
                const imgY = data.cell.y -8 + (cellHeight - imgDim) / 2 ;
                doc.addImage(
                    records[data.row.index].image,
                    'PNG',
                    imgX, imgY,
                    imgDim, imgDim,
                );

            }
        },

 
    })
    doc.save('EmployeeList.pdf');
};