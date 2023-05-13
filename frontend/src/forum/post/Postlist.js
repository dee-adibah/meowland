import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {
  Grid,
  Icon,
  Button,
  Typography,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Richeditor from '../richeditor/Richeditor';
import UserContext from '../../utils/UserContext.js';
import CreatePost from './CreatePost';
import './postlist.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  postUsername: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  button: {
    backgroundColor: 'red',
  },
}));

const Postlist = () => {
  const [posts, setPosts] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  //for admin/user control
  const {user = {}} = useContext(UserContext);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then((data) => data.json())
      .then(
        (parsedData) => setPosts(parsedData),
        (err) => console.log(err)
      )
      .catch((error) => console.error('Error fetching posts:', error));
  }, [id]);

  // console.log('post:', posts);
  // console.log('id:', id);

  const deletePost = (id) => {
    fetch(`http://localhost:8000/api/posts/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log('res:', res);
        alert('Post deleted successfully');
        navigate(0);
      })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
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

  return (
    <Box sx={{flexGrow: 1}}>
      <div className={classes.root}>
        {posts.length > 0 && (
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              ml: 2,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
            variant='h4'
            component='div'
            className='post-status'
          >
            Title: {posts[0].thread.thread}
          </Typography>
        )}
        {user && <CreatePost posts={posts} />}
        {posts.map((post) => (
          <Paper className={classes.paper} key={post.id}>
            <Grid container wrap='nowrap' spacing={2}>
              <Grid item xs={12}>
                <Box className={classes.postUsername} mb={1}>
                  <AccountCircleIcon name='user' />
                  <Typography variant='subtitle2' component='span'>
                    {post.creator.username}
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    color='textSecondary'
                    component='span'
                  >
                    {` — ${post.created}`}
                  </Typography>
                </Box>
                <Typography variant='body1'>{post.content}</Typography>
                <Divider />
                <Box mt={1}>
                  {user &&
                    (user.username === post.creator.username ||
                      userStatus === 'admin') && (
                      <Button
                        className={classes.button}
                        variant='contained'
                        onClick={() => deletePost(post.id)}
                      >
                        Delete Post
                      </Button>
                    )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
        {/* <Richeditor /> */}
      </div>
    </Box>
  );
};

export default Postlist;
