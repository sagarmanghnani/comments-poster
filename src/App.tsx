import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PostCreator from "./components/PostCreator";
import PostType from "./enums";
import "bootstrap/dist/css/bootstrap.min.css";
import IPostData from "./post.interface";
import { putPosts } from "./post-viewer.utils";
import CommentPost from "./components/CommentPost";
import PostViewer from "./components/PostViewer";

function App() {
  const makePost = (postData: IPostData) => {
    try {
      putPosts(postData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <CommentPost></CommentPost>
      <PostViewer postId="1710618202720"></PostViewer>
    </div>
  );
}

export default App;
