// components/SortableItem.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface SortableItemProps {
    order: number;
    text: string;
    onTextChange: (order: number, text: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ order, text, onTextChange }) => {
    return (
        <TextField
            defaultValue={text}
            variant="outlined"
            margin="normal"
            onChange={(e) => onTextChange(order, e.target.value)}
        />
    );
}

export default SortableItem;
