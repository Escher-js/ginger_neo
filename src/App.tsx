// App.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Sortable from "sortablejs";
import SortableItem from "./components/SortableItem";

interface Stack {
    order: number;
    text: string;
}

function App() {
    const [stacks, setStacks] = useState<Stack[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    const repoId = 23;
    useEffect(() => {
        console.log(repoId)
        fetch(`https://us-central1-git-viewer-aefe4.cloudfunctions.net/getRepoContents?repoId=${repoId}`)
            .then(response => response.json())
            .then(data => {
                data.sort((a: Stack, b: Stack) => a.order - b.order);
                setStacks(data);
            });
    }, []);

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

    const handleAddItem = () => {
        const order = Math.max(...stacks.map(s => s.order), 0) + 1;
        const newStack = { order, text: '' };
        const newStacks = [...stacks, newStack];
        setStacks(newStacks);
        localStorage.setItem('stacks', JSON.stringify(newStacks));
    };

    return (
        <div>
            <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
                {stacks.map(stack => (
                    <SortableItem key={stack.order} order={stack.order} text={stack.text} onTextChange={handleTextChange} />
                ))}
            </div>
            <Button onClick={handleAddItem} variant="contained" style={{ marginTop: '20px' }}>Add Item</Button>
        </div>
    );
}

export default App;
