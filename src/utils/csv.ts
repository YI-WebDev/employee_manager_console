import { Employee } from './allCSV';
import { escapeForCSV } from './allCSV';
import { headersMapping } from './allCSV';


function convertToCSV(data: Employee[]): string {
    if (data.length === 0) {
        return '';
    }
    const headers = Object.keys(data[0]) as Array<keyof Employee>;
    const translatedHeaders = headers.map(header => headersMapping[header]);
    const csvRows = data.map(row =>
        headers.map(fieldName => escapeForCSV(row[fieldName])).join(',')
    );
    return [translatedHeaders.join(','), ...csvRows].join('\r\n');
}


function downloadCSV(data: Employee[]) {
    const BOM = '\uFEFF';
    const csvString: string = BOM + convertToCSV(data);
    const blob: Blob = new Blob([csvString], { type: 'text/csv' });
    const link: HTMLAnchorElement = document.createElement('a');
    const url: string = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default downloadCSV;