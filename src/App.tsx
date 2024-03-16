import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostCreator from './components/PostCreator';
import PostType from './enums';
import IPostData from './post.interface';
import { putPosts } from './post-viewer.utils';
import CommentPost from './components/NewPost';

function App() {


  const makePost = (postData:IPostData) => {
    try {
      putPosts(postData)
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <CommentPost ></CommentPost>
    </div>
  );
}

export default App;
