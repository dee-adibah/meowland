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
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateTopic from './CreateTopic.js';

const Topiclist = () => {
  const [topics, setTopics] = useState([]);
  const [newUpdateTopic, setNewUpdateTopic] = useState();

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

  console.log('topics:', topics);
  //console.log('ac:', activePage);
  const displayedTopics = topics.slice((activePage - 1) * 8, activePage * 8);

  const deleteTopic = (id) => {
    fetch(`http://localhost:8000/api/topics/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        res.json();
        alert('Topic deleted successfully');
        navigate(0);
      })
      .catch((err) => console.error({error: err}));
  };

  const updateTopic = (id) => {
    fetch(`http://localhost:8000/api/topics/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: newUpdateTopic.topic,
        description: newUpdateTopic.description,
      }),
    })
      .then((res) => res.json())
      .then((updatedTopic) => {
        setTopics(
          topics.map((topic) =>
            topic.id === updatedTopic.id ? updatedTopic : topic
          )
        );
        alert('Topic updated successfully');
        navigate(0);
      })
      .catch((err) => console.error({error: err}));
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid item xs={12} md={3} mr={4} ml={4}>
        <Typography sx={{mt: 2, mb: 1, ml: 2}} variant='h4' component='div'>
          List of Topics <CreateTopic />
        </Typography>
        <List>
          {displayedTopics.map((topic) => (
            <ListItem
              key={topic.id}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <EditIcon
                    onClick={() => {
                      const updatedTopicData = {
                        topic: 'New topic',
                        description: 'Updated description',
                      };
                      updateTopic(topic.id, updatedTopicData);
                    }}
                  />
                  <DeleteIcon onClick={() => deleteTopic(topic.id)} />
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
