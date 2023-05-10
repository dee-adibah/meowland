import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Icon} from 'semantic-ui-react';
import Richeditor from '../richeditor/Richeditor';

const Topiclist = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/topics/')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setTopics(parsedData),
        (err) => console.log(err)
      );
  }, []);
  console.log('topics:', topics);

  return (
    <div>
      <Richeditor />
      {topics.map((topic) => (
        <Segment vertical key={topic.id}>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={7}>
              <Grid.Row>
                <Icon name='edit' />
                <Link to={`/topic/${topic.topic}`}>{topic.topic}</Link>
              </Grid.Row>
              <Grid.Row>{topic.description}</Grid.Row>
            </Grid.Column>
            {/* <Grid.Column width={3}>
          <div className='home-column home-stats home-vertical'>
            <div style={{paddingBottom: '5px'}}>
              <Icon name='write' />
              {threads_count}
              {threads_count > 1 ? ' threads' : ' thread'}
            </div>
            <div>
              <Icon name='comment outline' />
              {posts_count}
              {posts_count > 1 ? ' posts' : ' post'}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>{lastActivity}</Grid.Column> */}
          </Grid>
        </Segment>
      ))}
    </div>
  );
};

export default Topiclist;
