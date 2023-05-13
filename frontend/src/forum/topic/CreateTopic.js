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

const Createtopic = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    topic: '',
    description: '',
  });

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThread = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/topics/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: newTopic.topic,
        description: newTopic.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`New topic created:`, data);
        alert('Topic successfully created');
      })
      .catch((err) => console.error({Error: err}));
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
          New Topic
        </Button>
      </Grid>

      <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
        <form onSubmit={handleThread} id='NewTopicForm'>
          <DialogTitle>New Topic</DialogTitle>
          <DialogContent>
            <TextField
              style={{
                marginTop: 20,
              }}
              required
              autoFocus
              margin='dense'
              id='subject'
              name='subject'
              label='input new topic here'
              type='text'
              fullWidth
              variant='standard'
              value={newTopic.topic}
              onChange={(e) =>
                setNewTopic({...newTopic, topic: e.target.value})
              }
            />

            <TextField
              required
              autoFocus
              margin='dense'
              id='content'
              name='content'
              placeholder='description'
              hiddenLabel
              type='text'
              fullWidth
              variant='standard'
              multiline
              rows={10}
              onChange={(e) =>
                setNewTopic({
                  ...newTopic,
                  description: e.target.value,
                })
              }
              value={newTopic.description}
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

export default Createtopic;
