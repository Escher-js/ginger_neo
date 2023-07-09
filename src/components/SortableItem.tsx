// components/SortableItem.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface SortableItemProps {
    order: number;
    text: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ order, text }) => {
    return (
        <TextField
            defaultValue={`Order: ${order}, Text: ${text}`}
            variant="outlined"
            margin="normal"
        />
    );
}

export default SortableItem;
