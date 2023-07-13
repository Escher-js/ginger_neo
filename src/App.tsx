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

    const repoId = '23';
    const fileName = 'stacks.json'

    useEffect(() => {
        console.log(repoId)
        fetch(`https://us-central1-git-viewer-aefe4.cloudfunctions.net/getRepoContents?repoId=${repoId}`)
            .then(response => response.json())
            .then(data => {
                data.sort((a: Stack, b: Stack) => a.order - b.order);
                setStacks(data);
            });
    }, []);
    // // Load data from localStorage or fetch from stacks.json
    // useEffect(() => {
    //     const savedData = localStorage.getItem('stacks');
    //     if (savedData) {
    //         setStacks(JSON.parse(savedData));
    //     } else {
    //         fetch('stacks.json')
    //             .then(response => response.json())
    //             .then(data => {
    //                 data.sort((a: Stack, b: Stack) => a.order - b.order);
    //                 setStacks(data);
    //             });
    //     }
    // }, []);
    useEffect(() => {
        if (listRef.current) {
            new Sortable(listRef.current, {
                animation: 150,
                onUpdate: function () {  // ここに並び順が変わった時の処理を書く
                    const newStacks = Array.from(listRef.current!.children).map((child, index) => {
                        const order = Number(child.getAttribute('data-id'));
                        const text = stacks.find(stack => stack.order === order)!.text;
                        return { order: index + 1, text };
                    });
                    setStacks(newStacks);
                    localStorage.setItem('stacks', JSON.stringify(newStacks));
                }
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

    const handleSubmit = () => {
        const url = `https://us-central1-git-viewer-aefe4.cloudfunctions.net/postRepoContents`;

        const payload = {
            repoId: repoId,
            fileName: fileName,
            fileContent: stacks,
        };
        console.log(JSON.stringify(payload))
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                alert('Data successfully saved to the repository');
            } else {
                alert('Failed to save data to the repository');
            }
        });
    };

    const handleAddItem = () => {
        const order = Math.max(...stacks.map(s => s.order), 0) + 1;
        const newStack = { order, text: 'input your textttt' };
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
            <Button onClick={handleSubmit} variant="contained" style={{ marginTop: '20px' }}>Submit</Button>

        </div >
    );
}

export default App;
