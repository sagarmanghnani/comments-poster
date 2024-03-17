import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  decreasingOrder,
  deletePost,
  getAllPosts,
  increasingOrder,
  setAllTopLevelPosts,
} from "./post-viewer.utils";
import CommentPost from "./components/CommentPost";
import PostViewer from "./components/PostViewer";
import { PostOrder } from "./enums";
import SortedOrderContext from "./sortedOrderContext";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
function App() {
  const [commentPostIds, setCommentPostIds] = useState<string[]>([]);
  const [sortedOrder, setSortedOrder] = useState(PostOrder.INCREASING);

  const updatePosts = () => {
    setAllTopLevelPosts(sortedOrder, setCommentPostIds);
  };

  const handleOnPost = () => {
    updatePosts();
  };

  const handleOnPostDelete = (postId: string) => {
    deletePost(postId);
    updatePosts();
  };

  useEffect(() => {
    updatePosts();
  }, [sortedOrder]);

  return (
    <SortedOrderContext.Provider value={sortedOrder}>
      <div className="App">
        <CommentPost onPost={handleOnPost}></CommentPost>
        <span className="sort-order">
          {" "}
          Sort By:{" "}
          <Button
            variant="link"
            onClick={() => {
              setSortedOrder((order) =>
                order === PostOrder.INCREASING
                  ? PostOrder.DECREASING
                  : PostOrder.INCREASING
              );
            }}
          >
            {" "}
            Date and time{" "}
            {sortedOrder === PostOrder.INCREASING ? (
              <ArrowDown></ArrowDown>
            ) : (
              <ArrowUp></ArrowUp>
            )}{" "}
          </Button>{" "}
        </span>
        {commentPostIds.map((postId) => {
          return (
            <PostViewer
              postId={postId}
              onPost={handleOnPost}
              onPostDeleteBtnClick={handleOnPostDelete}
            ></PostViewer>
          );
        })}
      </div>
    </SortedOrderContext.Provider>
  );
}

export default App;
