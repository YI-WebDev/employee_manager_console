import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../style/buttonStyles';

interface EmployeeTableProps {
    className?: string;
    employees: Array<{
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
    }>;
    onSelectEmployee: (employeeId: number, isSelected: boolean) => void;
    selectedEmployeeIds: Set<number>;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ className, employees, onSelectEmployee, selectedEmployeeIds }) => {
    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} className={className}>
                <Table aria-label="employee details table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 65 }}>Select</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Joined Date</TableCell>
                            <TableCell>Termination Date</TableCell>
                            <TableCell>Edit / Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedEmployeeIds.has(employee.id)}
                                        onChange={(event) => onSelectEmployee(employee.id, event.target.checked)}
                                    />
                                </TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.gender}</TableCell>
                                <TableCell>{new Date(employee.birth_date).toLocaleDateString()}</TableCell>
                                <TableCell>{employee.department.department_name}</TableCell>
                                <TableCell>{new Date(employee.joined_date).toLocaleDateString()}</TableCell>
                                <TableCell>{employee.termination_date ? new Date(employee.termination_date).toLocaleDateString() : '-'}</TableCell>
                                <TableCell>
                                    <IconButton component={RouterLink} to={`/edit/${employee.id}`} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton component={RouterLink} to={`/delete/${employee.id}`} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};

export default EmployeeTable;