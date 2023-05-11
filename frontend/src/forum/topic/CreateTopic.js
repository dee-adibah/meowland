import React, {useState, useEffect} from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useNavigate} from 'react-router-dom';

const Createtopic = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    topic: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let handleThread = (e) => {
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
        topic: newTopic.topic,
        description: newTopic.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`New topic created:`, data);
        navigate(0);
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
          {/* <Box>
                  {alertShow && (
                    <Alert severity='error' onClose={() => setAlertShow(false)}>
                      Please login to add new thread.{' '}
                      <Link href='/login'>Click here to login.</Link>
                    </Alert>
                  )}
                </Box> */}

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
