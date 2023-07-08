import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import Sortable from "sortablejs";

function SortableTextFields() {
  const listRef = useRef(null);

  useEffect(() => {
    new Sortable(listRef.current, {
      animation: 150
    });
  }, []);

  return (
    <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        defaultValue="Item 1"
        variant="outlined"
        margin="normal"
      />
      <TextField
        defaultValue="Item 2"
        variant="outlined"
        margin="normal"
      />
      <TextField
        defaultValue="Item 3"
        variant="outlined"
        margin="normal"
      />
    </div>
  );
}

export default SortableTextFields;
