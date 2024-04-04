import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, children }) => {
    return ReactDOM.createPortal(
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">
                    Delete
                </Button>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>,
        document.body
    );
};

export default Modal;