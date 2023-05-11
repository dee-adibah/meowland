import React, {useState} from 'react';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richeditor.css';

const Richeditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className='App'>
      <header className='App-header'>Rich Text Editor Example</header>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
      />
    </div>
  );

  //   const _contentState = ContentState.createFromText('Sample content state');
  //   const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  //   const [contentState, setContentState] = useState(raw); // ContentState JSON

  //   return (
  //     <div className='App'>
  //       <header className='App-header'>Rich Text Editor Example</header>
  //       <Editor
  //         defaultContentState={contentState}
  //         onContentStateChange={setContentState}
  //         wrapperClassName='wrapper-class'
  //         editorClassName='editor-class'
  //         toolbarClassName='toolbar-class'
  //       />
  //     </div>
  //   );
};

export default Richeditor;
