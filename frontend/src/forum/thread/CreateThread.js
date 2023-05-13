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

const CreateThread = ({threads}) => {
  const [alertShow, setAlertShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [newThread, setNewThread] = useState({
    topic: '',
    thread: '',
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
  const topicID = threads.length > 0 ? threads[1].topic.id : '';
  const handleThread = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 16);
    const response = await fetch(`http://localhost:8000/api/threads/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topicID,
        thread: newThread.thread,
        content: newThread.content,
        creator: user.username,
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
      alert('Thread successfully created');
      navigate(0);
    } else {
      alert('Something went wrong! Thread title need to be unique');
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
          New Thread
        </Button>
      </Grid>

      <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
        <form onSubmit={handleThread} id='NewThreadForm'>
          <DialogTitle>New Thread</DialogTitle>
          <DialogContent>
            <TextField
              style={{
                marginTop: 20,
              }}
              required
              autoFocus
              margin='dense'
              id='thread'
              name='thread'
              label='input new thread title here'
              type='text'
              fullWidth
              variant='standard'
              value={newThread.thread}
              onChange={(e) =>
                setNewThread({...newThread, thread: e.target.value})
              }
            />

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
                setNewThread({...newThread, content: e.target.value})
              }
              value={newThread.content}
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

export default CreateThread;
