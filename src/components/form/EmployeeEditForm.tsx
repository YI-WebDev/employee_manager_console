import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import { fetchDepartments, fetchEmployee, handleEmployeeUpdate } from '../api/api';

interface Employee {
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

interface EmployeeEditProps {
    onEmployeeUpdate: (updatedEmployee: Employee) => void;
}

const EmployeeEdit: React.FC<EmployeeEditProps> = ({ onEmployeeUpdate }) => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        name: '',
        gender: '',
        birth_date: new Date(),
        department: {
            id: 0,
            department_name: "",
        },
        joined_date: new Date(),
        termination_date: null,
    });
    const requiredFields = ['name', 'gender', 'birth_date', 'department', 'joined_date'];
    const [departments, setDepartments] = useState<Array<{ id: number; department_name: string }>>([]);

    useEffect(() => {
        fetchDepartments().then(setDepartments);
    }, []);

    useEffect(() => {
        if (id) {
            fetchEmployee(id).then((data) => {
                setEmployee({
                    ...data,
                    birth_date: new Date(data.birth_date),
                    joined_date: new Date(data.joined_date),
                    termination_date: data.termination_date ? new Date(data.termination_date) : null,
                    department: data.department,
                });
            });
        }
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setEmployee((prev) => ({ ...prev, [event.target.name as keyof Employee]: event.target.value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const updatedEmployee = await handleEmployeeUpdate(employee);
            onEmployeeUpdate(updatedEmployee);
            navigate('/');
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errors = error.response.data;
                const errorMessage = requiredFields.find(field => errors[field])
                    || errors.non_field_errors
                    || errors.termination_date
                    || 'There are required fields that are not filled.';
                setError(errorMessage);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(event.target.value)) {
            setEmployee((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        } else {
            console.error('Date error');
        }
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography color="primary" variant="h4">Employee Information Update Form</Typography>
            <TextField
                name="name"
                label="Name"
                value={employee.name || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!error}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={employee.gender || ''}
                    onChange={handleSelectChange}
                    error={!!error}
                >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                name="birth_date"
                label="Birth Date"
                type="date"
                value={employee.birth_date || ''}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                margin="normal"
                error={!!error}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                    labelId="department-label"
                    name="department"
                    value={employee.department.department_name}
                    onChange={handleSelectChange}
                    error={!!error}
                >
                    {departments.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
                            {department.department_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                name="joined_date"
                label="Joined Date"
                type="date"
                value={employee.joined_date || ""}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                margin="normal"
                error={!!error}
            />
            <TextField
                name="termination_date"
                label="Termination Date"
                type="date"
                value={employee.termination_date || ''}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                margin="normal"
                error={!!error}
            />
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default EmployeeEdit;