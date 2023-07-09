// components/SortableList.tsx
import React, { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import SortableItem from './SortableItem';

interface Stack {
    order: number;
    text: string;
}

interface SortableListProps {
    stacks: Stack[];
    onTextChange: (order: number, text: string) => void;
}

const SortableList: React.FC<SortableListProps> = ({ stacks, onTextChange }) => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            new Sortable(listRef.current, {
                animation: 150
            });
        }
    }, []);

    return (
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
            {stacks.map(stack => (
                <SortableItem key={stack.order} order={stack.order} text={stack.text} onTextChange={onTextChange} />
            ))}
        </div>
    );
}

export default SortableList;
