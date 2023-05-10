import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Segment, Grid, Icon} from 'semantic-ui-react';

const Postlist = () => {
  const [posts, setPosts] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setPosts(parsedData),
        (err) => console.log(err)
      );
  }, [id]);

  console.log('post:', posts);
  console.log('id:', id);

  return (
    <div>
      {posts.map((post) => (
        <Segment vertical key={post.id}>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={4}>
              <Grid.Row>
                <div className='post-row'>
                  <div className='post-column'>
                    <div className='post-username'>
                      {/* <Link to={`/user/${creator.username}`}> */}
                      <Grid.Row>Title: {post.title}</Grid.Row>
                      <Grid.Row>
                        Content: <br />
                        {post.content}
                      </Grid.Row>
                      <Icon name='user' />
                      {post.creator}
                      {/* </Link> */}
                    </div>
                    {/* <div className="post-status">
                    {creator.status || 'Member'}
                  </div> */}
                  </div>
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12}>
              <div className='post-time'>
                {post.created}
                {/* {(authenticatedIsStaff ||
                authenticatedUsername === creator.username) &&
                actions} */}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      ))}
    </div>
  );
};

export default Postlist;
