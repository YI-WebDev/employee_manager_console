export interface Employee {
    id: number;
    name: string;
    gender: string;
    birth_date: Date;
    department: {
        id: number;
        department_name: string;
    };
    joined_date: Date;
    termination_date: Date | null;
}

export const headersMapping = {
    id: 'ID',
    name: 'Name',
    gender: 'Gender',
    birth_date: 'Birth Date',
    'department.department_name': 'Department',
    joined_date: 'Joined Date',
    termination_date: 'Termination Date',
};

export function escapeForCSV(field: any): string {
    if (field == null) {
        return '';
    }
    const str = String(field);
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return `"${str.replace(/"/g, '""')}"`;
    } else {
        return str;
    }
}

function convertToCSV(data: Employee[]): string {
    if (data.length === 0) {
        return '';
    }
    const headers = Object.keys(headersMapping) as Array<keyof typeof headersMapping>;
    const translatedHeaders = headers.map(header => headersMapping[header]);
    const csvRows = data.map(row =>
        headers.map(fieldName => {
            const value = fieldName.split('.').reduce((obj, key) => obj && obj[key], row as any);
            return escapeForCSV(value);
        }).join(',')
    );
    return [translatedHeaders.join(','), ...csvRows].join('\r\n');
}

function downloadAllCSV(data: Employee[]) {
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

export default downloadAllCSV;