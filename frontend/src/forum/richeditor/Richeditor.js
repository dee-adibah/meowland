import React, {useState} from 'react';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richeditor.css';
import {Button, FormControl} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from 'react-router-dom';

const Richeditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState({
    content: '',
  });

  const handleThread = (e) => {
    e.preventDefault();
    // check the authenticated user
    // if (!user) {
    //   setAlertShow(true);
    //   event.preventDefault();
    // }
    fetch(`http://localhost:8000/api/topics/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: createPost.content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`New post created:`, data);
        navigate(0);
      })
      .catch((err) => console.error({Error: err}));
  };

  return (
    <div className='App'>
      <header className='App-header'>Create New Post</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
      />
      <Button variant='contained' endIcon={<CreateIcon />}>
        Post
      </Button>
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
