import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleDepartmentAdd } from '../services/api';

const DepartmentForm: React.FC = () => {
    const [department_name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            await handleDepartmentAdd({ department_name });
            navigate('/');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.name);
            } else {
                setError('追加に失敗しました。');
            }
            console.log(department_name);
        }
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography color="primary" variant="h4">部署追加フォーム</Typography>
            <TextField
                name="department_name"
                label="部署名"
                value={department_name}
                onChange={(e) => setName(e.target.value)}
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
                追加
            </Button>
        </Box>
    );
};

export default DepartmentForm;