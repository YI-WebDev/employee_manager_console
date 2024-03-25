import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeEdit from './EmployeeEdit';
import EmployeeDelete from './EmployeeDelete';
import EmployeeTable from './EmployeeTable';
import { fetchEmployees } from '../services/api';
import Sidebar from './Sidebar';
import { Button, CssBaseline, Box, Container, Typography, Drawer } from '@mui/material';
import downloadCSV from '../utils/csv';
import downloadAllCSV from '../utils/allCSV';
import { MdOutlineFileDownload } from "react-icons/md";
import DepartmentForm from './DepartmentForm';

const drawerWidth = 200;

type Employee = {
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
};

const Main: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetchEmployees().then(data => {
            const employeesWithDepartmentName = data.map((employee: any) => ({
                ...employee,
                department: {
                    id: employee.department,
                    department_name: employee.department_name
                }
            }));

            setEmployees(employeesWithDepartmentName);
        });
    }, []);

    const handleSelectEmployee = (employeeId: number, isSelected: boolean) => {
        setSelectedEmployeeIds(prevSelectedEmployeeIds => {
            const newSelectedEmployeeIds = new Set(prevSelectedEmployeeIds);
            if (isSelected) {
                newSelectedEmployeeIds.add(employeeId);
            } else {
                newSelectedEmployeeIds.delete(employeeId);
            }
            return newSelectedEmployeeIds;
        });
    };

    const handleDownloadSelectedCSV = () => {
        const selectedEmployees = employees.filter(employee => selectedEmployeeIds.has(employee.id));
        downloadCSV(selectedEmployees);
    };

    const handleDownloadAllCSV = () => {
        downloadAllCSV(employees);
    };

    const handleEmployeeUpdate = (updatedEmployee: Employee) => {
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    };

    const handleEmployeeDelete = (deletedEmployeeId: string) => {
        const idNum = parseInt(deletedEmployeeId, 10);
        setEmployees(employees.filter(emp => emp.id !== idNum));
    };

    const handleEmployeeAdd = (newEmployee: Employee) => {
        setEmployees([...employees, newEmployee]);
    };
    
    return (
        <Router>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Sidebar />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
                <Container>
                    <Routes>
                        <Route path="/delete/:id" element={<EmployeeDelete onDelete={handleEmployeeDelete} />} />
                        <Route path="/edit/:id" element={<EmployeeEdit onEmployeeUpdate={handleEmployeeUpdate} />} />
                        <Route path="/add_employee" element={<EmployeeForm onEmployeeAdd={handleEmployeeAdd} />} />
                        <Route path="/add_department" element={<DepartmentForm />} />
                        <Route path="/" element={
                            <div>
                                <Typography variant="h4" sx={{ my: 4 }}>
                                    List of All Employees
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {selectedEmployeeIds.size > 0 && (
                                        <Button
                                            variant="text"
                                            color="primary"
                                            size="medium"
                                            endIcon={<MdOutlineFileDownload />}
                                            onClick={handleDownloadSelectedCSV}>
                                            Download CSV of Selected Employees
                                        </Button>
                                    )}
                                    <Button
                                        variant="text"
                                        color="primary"
                                        size="medium"
                                        endIcon={<MdOutlineFileDownload />}
                                        onClick={handleDownloadAllCSV}>
                                        Download CSV of All Employees
                                    </Button>
                                </div>
                                <EmployeeTable employees={employees} onSelectEmployee={handleSelectEmployee} selectedEmployeeIds={selectedEmployeeIds} />
                            </div>
                        } />
                    </Routes>
                </Container>
            </Box>
        </Router>
    );
};

export default Main;