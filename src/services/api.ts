import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/employees/`);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }

};

export const fetchEmployee = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/employees/${id}/`);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};

export const handleEmployeeAdd = async (employeeData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/employees/`, employeeData);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};

export const handleEmployeeUpdate = async (employeeData: any) => {
    try {
        const response = await axios.put(`${API_URL}/api/employees/${employeeData.id}/`, employeeData);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};

export const handleDeleteEmployee = async (employeeData: any) => {
    try {
        await axios.delete(`${API_URL}/api/employees/${employeeData.id}/`);
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};

export const handleDepartmentAdd = async (department: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/departments/`, department);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};

export const fetchDepartments = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/departments/`);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }
};