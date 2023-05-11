import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {Segment, Grid, Icon, Button} from 'semantic-ui-react';
import Richeditor from '../richeditor/Richeditor.js';

const Postlist = () => {
  const [posts, setPosts] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

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
  //const currentID = location.pathname;
  //console.log('check:', currentID);

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
    <div>
      {posts.map((post) => (
        <Segment vertical key={post.id}>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={12}>
              <Grid.Row>
                <div className='post-row'>
                  <div className='post-column'>
                    <div className='post-username'>
                      {/* <Link to={`/user/${creator.username}`}> */}
                      <Grid.Row>{post.content}</Grid.Row>
                      <Icon name='user' />
                      {post.creator}
                      {/* </Link> */}
                      {`  —  ${post.created}`}
                      {/* {(authenticatedIsStaff ||
                authenticatedUsername === creator.username) &&
                actions} */}
                    </div>
                    {/* <div className='post-status'>
                      {creator.status || 'Member'}
                    </div> */}
                  </div>
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12}>
              <Button color='red' onClick={deletePost}>
                Delete Post
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      ))}
      <Richeditor />
    </div>
  );
};

export default Postlist;
