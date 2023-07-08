import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import Sortable from "sortablejs";

function SortableTextFields() {
  const listRef = useRef(null);

  useEffect(() => {
    new Sortable(listRef.current, {
      animation: 150,
      handle: ".my-handle",
    });
  }, []);

  return (
    <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        defaultValue="Item 1"
        variant="outlined"
        margin="normal"
        InputProps={{ startAdornment: <span className="my-handle">::</span> }}
      />
      <TextField
        defaultValue="Item 2"
        variant="outlined"
        margin="normal"
        InputProps={{ startAdornment: <span className="my-handle">::</span> }}
      />
      <TextField
        defaultValue="Item 3"
        variant="outlined"
        margin="normal"
        InputProps={{ startAdornment: <span className="my-handle">::</span> }}
      />
    </div>
  );
}

export default SortableTextFields;
