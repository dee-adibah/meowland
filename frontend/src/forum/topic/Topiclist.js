import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Grid, IconButton, Pagination, Paper, Typography} from '@mui/material';
import {Edit} from '@mui/icons-material';
import CreateTopic from './CreateTopic.js';

const Topiclist = () => {
  const [topics, setTopics] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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

  return (
    <div>
      <CreateTopic />
      {displayedTopics.map((topic) => (
        <Paper elevation={3} key={topic.id} style={{padding: '10px'}}>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs={2}>
              <IconButton disabled>
                <Edit />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6'>
                <Link to={`/topic/${topic.topic}`}>{topic.topic}</Link>
              </Typography>
              <Typography variant='body1'>{topic.description}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Pagination
        count={Math.ceil(totalItems / 8)}
        page={activePage}
        onChange={(event, page) => setActivePage(page)}
        style={{marginTop: '10px'}}
      />
    </div>
  );
};

export default Topiclist;
