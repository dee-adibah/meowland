import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {
  Grid,
  Typography,
  Paper,
  Box,
  IconButton,
  Divider,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  iconButton: {
    marginRight: theme.spacing(1),
  },
  forumMeta: {
    display: 'flex',
    alignItems: 'center',
  },
  userIcon: {
    fontSize: 20,
    marginRight: theme.spacing(0.5),
  },
}));

const Threadlist = () => {
  const [threads, setThreads] = useState([]);
  const {id} = useParams();
  const classes = useStyles();

  useEffect(() => {
    fetch(`http://localhost:8000/api/threads/${id}`)
      .then((data) => data.json())
      .then(
        (parsedData) => setThreads(parsedData),
        (err) => console.log(err)
      )
      .catch((error) => console.error('Error fetching threads:', error));
  }, [id]);

  return (
    <div className={classes.root}>
      {threads.map((thread) => (
        <Paper className={classes.paper} key={thread.id}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <IconButton
                component={Link}
                to={`/thread/${thread.id}`}
                className={classes.iconButton}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Box display='flex' alignItems='center'>
                <Link to={`/thread/${thread.id}`}>
                  <Typography variant='h6'>{thread.thread}</Typography>
                </Link>
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  component='span'
                >
                  {` — ${thread.created}`}
                </Typography>
              </Box>
              <Typography variant='body1'>{thread.content}</Typography>
              <Divider />
              <Box className={classes.forumMeta} mt={1} color='text.secondary'>
                <AccountCircleIcon className={classes.userIcon} />
                <Typography variant='subtitle2' component='span'>
                  {thread.creator}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default Threadlist;
