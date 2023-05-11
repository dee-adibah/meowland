import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  Grid,
  Box,
  IconButton,
  Pagination,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import {Edit} from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateTopic from './CreateTopic.js';

const Topiclist = () => {
  const [topics, setTopics] = useState([]);

  // For Pagination
  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const startIndex = (activePage - 1) * 8;
    const endIndex = startIndex + 8;
    fetch(
      `http://localhost:8000/api/topics/?start=${startIndex}&end=${endIndex}`
    )
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setTopics(parsedData);
          setTotalItems(parsedData[0].total);
        },
        (err) => console.log(err)
      );
  }, [activePage]);

  //console.log('topics:', topics);
  //console.log('ac:', activePage);
  const displayedTopics = topics.slice((activePage - 1) * 8, activePage * 8);

  const deleteTopic = (id) => {
    fetch(`http://localhost:8000/api/topics/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deletedTopic) => {
        setTopics(topics.filter((topic) => topic.id !== id));
        alert('Topic deleted successfully');
        navigate(0);
      })
      .catch((err) => console.error({error: err}));
  };

  return (
    <Box sx={{flexGrow: 1, maxWidth: 752}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{mt: 2, mb: 1, ml: 2}} variant='h6' component='div'>
            List of available category <CreateTopic />
          </Typography>
          <List>
            {displayedTopics.map((topic) => (
              <ListItem
                key={topic.id}
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => deleteTopic(topic.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ChatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link to={`/topic/${topic.topic}`}>{topic.topic}</Link>
                  }
                  secondary={topic.description}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Pagination
        count={Math.ceil(totalItems / 8)}
        page={activePage}
        onChange={(event, page) => setActivePage(page)}
        style={{marginTop: '10px'}}
      />
    </Box>
  );
};

export default Topiclist;
