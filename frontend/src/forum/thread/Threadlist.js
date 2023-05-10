import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Segment, Grid, Icon} from 'semantic-ui-react';

const Threadlist = () => {
  const [threads, setThreads] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/threads/${id}`)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setThreads(parsedData),
        (err) => console.log(err)
      )
      .catch((error) => console.error('Error fetching threads:', error));
  }, [id]);

  console.log('thread:', threads);
  console.log('id:', id);

  return (
    <div>
      {threads.map((thread) => (
        <Segment vertical key={thread.id}>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={7}>
              <Grid.Row>
                <Icon name='edit' />
                <Link to={`/thread/${thread.id}`}>{thread.thread}</Link>
              </Grid.Row>
              <Grid.Row>{thread.content}</Grid.Row>
              <Grid.Row>
                <div className='forum-meta'>
                  {/* <Link to={`/user/${creator}`}> */}
                  <Icon name='user' />
                  {thread.creator}
                  {/* </Link> */}
                  <b>{`  —  ${thread.created}`}</b>
                </div>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      ))}
    </div>
  );
};

export default Threadlist;
