import React, {useState, useEffect} from 'react';
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
import Richeditor from '../richeditor/Richeditor';

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

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then((data) => data.json())
      .then(
        (parsedData) => setPosts(parsedData),
        (err) => console.log(err)
      )
      .catch((error) => console.error('Error fetching posts:', error));
  }, [id]);

  console.log('post:', posts);
  console.log('id:', id);

  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/delete/`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deletedPost) => {
        navigate(`/thread/${id}`);
      })
      .catch((err) => console.error({error: err}));
  };

  return (
    <div className={classes.root}>
      {posts.map((post) => (
        <Paper className={classes.paper} key={post.id}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.postUsername} mb={1}>
                <Icon name='user' />
                <Typography variant='subtitle2' component='span'>
                  {post.creator}
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
                <Button
                  className={classes.button}
                  variant='contained'
                  onClick={deletePost}
                >
                  Delete Post
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Richeditor />
    </div>
  );
};

export default Postlist;
