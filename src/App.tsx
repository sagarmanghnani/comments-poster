import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PostCreator from "./components/PostCreator";
import PostType from "./enums";
import "bootstrap/dist/css/bootstrap.min.css";
import IPostData from "./post.interface";
import { getAllPosts, putPosts } from "./post-viewer.utils";
import CommentPost from "./components/CommentPost";
import PostViewer from "./components/PostViewer";

function App() {
  const [commentPostIds, setCommentPostIds] = useState<string[]>([]);

  const updatePosts = () => {
    const userPosts = getAllPosts();
    if (userPosts) {
      const commentPosts = [];
      Object.values(userPosts).forEach((post) => {
        if (!post.parentId) {
          commentPosts.push(post.id);
        }
      });
      setCommentPostIds(commentPosts);
    }
  };

  const handleOnPost = () => {
    updatePosts();
  };

  const handleOnPostDelete = () => {
    updatePosts();
  };

  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <div className="App">
      <CommentPost onPost={handleOnPost}></CommentPost>
      {commentPostIds.map((postId) => {
        return <PostViewer postId={postId} onPost={handleOnPost}></PostViewer>;
      })}
    </div>
  );
}

export default App;
