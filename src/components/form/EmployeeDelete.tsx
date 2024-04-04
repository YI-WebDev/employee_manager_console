import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../common/Modal';
import { fetchEmployee, handleDeleteEmployee } from '../api/api';

interface Employee {
    id: string;
    name: string;
}

interface EmployeeDeleteProps {
    onDelete: (deletedEmployeeId: string) => void;
}

const EmployeeDelete: React.FC<EmployeeDeleteProps> = ({ onDelete }) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            fetchEmployee(id).then(employeeData => setEmployee(employeeData));
        }
    }, [id]);

    const handleDelete = async () => {
        if (employee && employee.id) {
            await handleDeleteEmployee({ id: employee.id });
            onDelete(employee.id);
            navigate('/');
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleClose} onConfirm={handleDelete}>
                <p>{employee ? `Are you sure you want to delete ${employee.name}?` : 'Employee not found.'}</p>
            </Modal>
            {!isModalOpen && <p>Deleting employee...</p>}
        </>
    );
};

export default EmployeeDelete;