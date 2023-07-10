// App.tsx
import React, { useEffect, useState } from "react";
import SortableList from "./components/SortableList";
import BasicModal from "./components/Modal"

interface Stack {
    order: number;
    text: string;
}

function App() {
    const [stacks, setStacks] = useState<Stack[]>([]);

    useEffect(() => {
        fetch('stacks.json')
            .then(response => response.json())
            .then(data => {
                data.sort((a: Stack, b: Stack) => a.order - b.order);
                setStacks(data);
            });
    }, []);

    const handleTextChange = (order: number, text: string) => {
        const newStacks = stacks.map(stack =>
            stack.order === order ? { ...stack, text } : stack
        );
        setStacks(newStacks);
        localStorage.setItem('stacks', JSON.stringify(newStacks));
    };

    return (
        <div>
            <SortableList stacks={stacks} onTextChange={handleTextChange} />
            <BasicModal />
        </div>
    );
}

export default App;