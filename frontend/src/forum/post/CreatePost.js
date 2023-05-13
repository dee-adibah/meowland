import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useNavigate, Link} from 'react-router-dom';
import UserContext from '../../utils/UserContext.js';

const CreatePost = ({posts}) => {
  const [alertShow, setAlertShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
  });
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const threadID = window.location.pathname.slice(8);
  console.log('id', threadID); // prints the current URL to the console

  const handlePost = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 16);
    const response = await fetch(`http://localhost:8000/api/posts/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '',
        thread: threadID,
        content: newPost.content,
        creator: user.user_id,
        created: now,
      }),
    });
    const data = null;

    try {
      const responseBody = await response.text();
      if (responseBody) {
        data = JSON.parse(responseBody);
      }
    } catch (error) {
      console.log('Error parsing JSON:', error.message);
    }
    if (response.status === 201) {
      console.log(`New thread created:`, data);
      alert('Post successfully created');
      navigate(0);
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      <Grid container justifyContent='flex-end'>
        <Button
          variant='outlined'
          onClick={handleClickOpen}
          endIcon={<PostAddIcon />}
          style={{
            maxWidth: '180px',
            maxHeight: '32px',
            minWidth: '100px',
            minHeight: '32px',
          }}
        >
          New/Reply Post
        </Button>
      </Grid>

      <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
        <form onSubmit={handlePost} id='NewThreadForm'>
          <DialogTitle>New/Reply Post</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin='dense'
              id='content'
              name='content'
              placeholder='content'
              hiddenLabel
              type='text'
              fullWidth
              variant='standard'
              multiline
              rows={10}
              onChange={(e) =>
                setNewPost({...newPost, content: e.target.value})
              }
              value={newPost.content}
            />
          </DialogContent>

          <DialogActions>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' endIcon={<SendIcon />} type='submit'>
                Send
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreatePost;
