import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {
  Grid,
  Typography,
  Paper,
  Box,
  //IconButton,
  Divider,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserContext from '../../utils/UserContext.js';
import CreateThread from './CreateThread.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
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
  deleteIcon: {
    marginLeft: '1rem',
  },
}));

const Threadlist = () => {
  const [threads, setThreads] = useState([]);
  const {id} = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  //for admin/user control
  const {user = {}} = useContext(UserContext);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/threads/${id}`)
      .then((data) => data.json())
      .then(
        (parsedData) => setThreads(parsedData),
        (err) => console.log(err)
      )
      .catch((error) => console.error('Error fetching threads:', error));
  }, [id]);

  const deleteThread = (threadid) => {
    fetch(`http://localhost:8000/api/threads/delete/${threadid}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log('res:', res);
        alert('Thread deleted successfully');
        navigate(0);
        navigate(0);
      })
      .then(() => {
        setThreads(threads.filter((thread) => thread.id !== id));
      })
      .catch((err) => console.error({error: err}));
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/profile/`)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setGetData(parsedData);
        },
        (err) => console.log(err)
      );
  }, []);

  const checkUser =
    user && getData.find((data) => data.username === user.username);
  const userStatus = checkUser?.status;
  //console.log('thread', threads);

  return (
    <div className={classes.root}>
      {threads.length > 0 && (
        <Typography
          sx={{
            mt: 2,
            mb: 1,
            ml: 2,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
          }}
          variant='h4'
          component='div'
        >
          {threads[0].topic.topic}
        </Typography>
      )}
      {user && <CreateThread threads={threads} />}

      {Object.values(threads).map((thread) => (
        <Paper className={classes.paper} key={thread.id}>
          {/* Topic: {thread.topic.topic} */}
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item xs>
              <Box display='flex' alignItems='center'>
                <Link to={`/thread/${thread.id}`}>
                  <Typography variant='h6'>{thread.thread}</Typography>
                </Link>
              </Box>
              <Typography variant='body1'>{thread.content}</Typography>
              <Divider />
              <Box className={classes.forumMeta} mt={1} color='text.secondary'>
                <AccountCircleIcon className={classes.userIcon} />
                <Typography variant='subtitle2' component='span'>
                  {thread.creator.username}
                  {` — ${thread.created}`}
                </Typography>
                <Grid item>
                  {/* <EditIcon /> */}
                  {user &&
                  (user.username === thread.creator.username ||
                    userStatus === 'admin') ? (
                    <DeleteIcon
                      className={classes.deleteIcon}
                      onClick={() => deleteThread(thread.id)}
                    />
                  ) : null}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default Threadlist;
