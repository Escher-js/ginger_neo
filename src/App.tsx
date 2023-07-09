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

    useEffect(() => {
        fetch('stacks.json')
            .then(response => response.json())
            .then(data => {
                data.sort((a: Stack, b: Stack) => a.order - b.order);
                setStacks(data);
            });
    }, []);

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
                <SortableItem key={stack.order} order={stack.order} text={stack.text} />
            ))}
        </div>
    );
}

export default App;
