import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

const ProfileUpdate = ({profile}) => {
  const [open, setOpen] = useState(false);
  const [newProfile, setNewProfile] = useState({
    photo: profile.photo,
    about: profile.about,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfile = async () => {
    const response = await fetch(
      `http://localhost:8000/api/profile/update/${profile.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo: newProfile.photo,
          about: newProfile.about,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Grid container justifyContent='flex-end'>
        <IconButton aria-label='edit' size='large' onClick={handleClickOpen}>
          <EditIcon sx={{mt: 2, mr: 2}} />
        </IconButton>
      </Grid>

      <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
        <form onSubmit={handleProfile} id='profile-edit-form'>
          <DialogTitle>Edit profile </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{mb: 2}}>
              You're free to edit your about you and photo.
            </DialogContentText>

            <TextField
              required
              autoFocus
              margin='dense'
              id='photo'
              name='photo URL'
              label='photo URL'
              type='url'
              fullWidth
              variant='standard'
              defaultValue={profile?.photo}
              onChange={(e) =>
                setNewProfile({
                  ...newProfile,
                  photo: e.target.value,
                })
              }
            />

            <TextField
              required
              autoFocus
              margin='dense'
              id='about'
              label='about'
              type='about'
              fullWidth
              variant='standard'
              multiline
              rows={4}
              defaultValue={profile?.about}
              onChange={(e) =>
                setNewProfile({
                  ...newProfile,
                  about: e.target.value,
                })
              }
            />
          </DialogContent>

          <DialogActions>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' type='submit'>
                Save
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfileUpdate;
