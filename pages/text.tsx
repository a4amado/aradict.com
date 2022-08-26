import React, { useState } from "react";
import "draft-js/dist/Draft.css";
import { Editor, EditorState } from "draft-js";
 import { Box } from "@chakra-ui/react";

export default function Text() {
  const [State, setState] = useState(EditorState.createEmpty());
  return (
    <Box flexGrow={1}>
      <Editor
        editorState={State}
        onChange={(editorState) => setState(editorState)}

      />
    </Box>
  );
}
