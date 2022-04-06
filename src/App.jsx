import React, {useEffect, useState} from 'react';

import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';

import { usePosts } from './hooks/usePosts';

import './style/App.css';

import PostService from './API/PostService';
import Loader from './components/UI/Loading/Loader';

function App() {
 
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: "", query: ""})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostsLading, setIsPostsLoading] = useState(false)

  useEffect(()=>{
    fetchPosts()
  }, [])
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>
        Создание пользовтеля
      </MyButton>
       <MyModal style={{marginTop: 30}} visible={modal} setVisible={setModal}>
         <PostForm create={createPost}></PostForm>
       </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <div>
       <PostFilter
        filter={filter}
        setFilter ={setFilter}
       />
      </div>
      {isPostsLading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов про JS'/>
      }
     
    </div>
  );
}

export default App;
