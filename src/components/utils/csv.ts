import { Employee } from './allCSV';
import { escapeForCSV } from './allCSV';
import { headersMapping } from './allCSV';

function convertToCSV(data: Employee[]): string {
    if (data.length === 0) {
        return '';
    }
    const headers = Object.keys(headersMapping) as Array<keyof typeof headersMapping>;
    const translatedHeaders = headers.map(header => headersMapping[header]);
    const csvRows = data.map(row =>
        headers.map(fieldName => {
            if (fieldName === 'department.department_name') {
                return escapeForCSV(row.department.department_name);
            } else {
                const value = row[fieldName as keyof Employee];
                return escapeForCSV(value);
            }
        }).join(',')
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