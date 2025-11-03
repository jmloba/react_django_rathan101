import React from 'react'
import Papa from 'papaparse';
   export const ExportToCsv = (data, fileName = 'exported_data') => {
      const csvData =Papa.unparse(data);
        const blob = new Blob([csvData],{ type: 'text/csv;charset=utf-8;' }    );
        saveAs(blob, `${fileName}.csv`);
    };