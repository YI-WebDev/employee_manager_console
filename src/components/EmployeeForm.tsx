import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { handleEmployeeAdd } from '../services/api';

interface Employee {
    id: number;
    name: string;
    gender: string;
    birth_date: Date;
    department: string;
    joined_date: Date;
    termination_date: Date | null;
}

type Props = {
    onEmployeeAdd: (employeeData: Employee) => void;
};

const EmployeeForm: React.FC<Props> = ({ onEmployeeAdd }) => {
    const [error, setError] = useState('');
    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        name: '',
        gender: '',
        birth_date: new Date(),
        department: '',
        joined_date: new Date(),
        termination_date: null,
    });
    const requiredFields = ['name', 'gender', 'birth_date', 'department', 'joined_date'];

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setEmployee({ ...employee, [event.target.name as keyof typeof employee]: event.target.value });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(event.target.value)) {
            setEmployee((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        } else {
            console.error('Date error');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            const addedEmployee = await handleEmployeeAdd(employee);
            onEmployeeAdd(addedEmployee);
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
                setError('Failed to update.');
            }
        }
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography color="primary" variant="h4">Employee Information Addition Form</Typography>
            <TextField
                name="name"
                label="Name"
                value={employee.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!error}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    name="gender"
                    value={employee.gender}
                    onChange={handleSelectChange}
                    error={!!error}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                name="birth_date"
                label="Birth Date"
                type="date"
                value={employee.birth_date || ""}
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
                    value={employee.department}
                    onChange={handleSelectChange}
                    error={!!error}
                >
                    <MenuItem value="Dev">Dev</MenuItem>
                    <MenuItem value="Prod">Prod</MenuItem>
                    <MenuItem value="Ope">Ope</MenuItem>
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
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
                Add Employee
            </Button>
        </Box>
    );
};

export default EmployeeForm;