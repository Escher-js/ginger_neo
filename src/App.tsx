// App.tsx
import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import SortableItem from "./components/SortableItem";

interface Stack {
    order: number;
    text: string;
}

function App() {
    const [stacks, setStacks] = useState<Stack[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    // Load data from localStorage or fetch from stacks.json
    useEffect(() => {
        const savedData = localStorage.getItem('stacks');
        if (savedData) {
            setStacks(JSON.parse(savedData));
        } else {
            fetch('stacks.json')
                .then(response => response.json())
                .then(data => {
                    data.sort((a: Stack, b: Stack) => a.order - b.order);
                    setStacks(data);
                });
        }
    }, []);

    useEffect(() => {
        if (listRef.current) {
            new Sortable(listRef.current, {
                animation: 150
            });
        }
    }, []);

    const handleTextChange = (order: number, text: string) => {
        const newStacks = stacks.map(stack =>
            stack.order === order ? { ...stack, text } : stack
        );
        setStacks(newStacks);
        localStorage.setItem('stacks', JSON.stringify(newStacks));
    };

    return (
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
            {stacks.map(stack => (
                <SortableItem key={stack.order} order={stack.order} text={stack.text} onTextChange={handleTextChange} />
            ))}
        </div>
    );
}

export default App;
