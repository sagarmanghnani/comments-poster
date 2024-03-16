import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import getPostById, { formatDate } from "../post-viewer.utils";
import IPostData from "../post.interface";
import "./post-viewer.scss";
import { Trash3Fill } from "react-bootstrap-icons";
import { useState } from "react";
import PostType, { PostMode } from "../enums";
import ReplyPost from "./ReplyPost";
import CommentPost from "./CommentPost";

interface IPostViewerProps {
  postId: string;
  onPostDeleteBtnClick: (postId: string) => void;
  onPost?: () => void;
}

const PostViewer = ({
  postId,
  onPost,
  onPostDeleteBtnClick,
}: IPostViewerProps) => {
  const postData: IPostData | null = getPostById(postId);
  const [showEditCommentOrReply, setShowEditCommentOrReply] = useState(
    PostType.NONE
  );
  const handleReplyBtnClick = () => {
    setShowEditCommentOrReply(PostType.REPLY);
  };

  const handleEditBtnClick = () => {
    setShowEditCommentOrReply(PostType.COMMENT);
  };

  const augmentedOnPost = () => {
    setShowEditCommentOrReply(PostType.NONE);
    if (onPost) {
      onPost();
    }
  };

  const handleOnPostDeleteClick = (postId: string) => {
    if (onPostDeleteBtnClick) {
      onPostDeleteBtnClick(postId);
    }
  };

  const renderReplyOrCommentEdit = () => {
    if (showEditCommentOrReply === PostType.REPLY) {
      return (
        <ReplyPost parentId={postData?.id} onPost={augmentedOnPost}></ReplyPost>
      );
    } else if (showEditCommentOrReply === PostType.COMMENT) {
      return (
        <CommentPost
          isExisting={true}
          parentId={postData.parentId}
          id={postData.id}
          onPost={augmentedOnPost}
        ></CommentPost>
      );
    }
    return null;
  };

  const generateChildPosts = () => {
    const childPostIds = postData.childPostIds;
    const ChildPosts = childPostIds.map((postId) => {
      return (
        <PostViewer
          postId={postId}
          onPostDeleteBtnClick={handleOnPostDeleteClick}
        ></PostViewer>
      );
    });
    return ChildPosts;
  };

  return (
    <>
      {postData && (
        <>
          <Card className="post-viewer-container">
            <Card.Body>
              <div className="heading">
                <h5> {postData?.name} </h5>
                <span> {formatDate(postData?.createdAt)} </span>
              </div>
              <span className="comment"> {postData?.comment} </span>
            </Card.Body>

            {!postData?.parentId && (
              <div className="footer-actions">
                <Button variant="link" onClick={handleReplyBtnClick}>
                  {" "}
                  Reply{" "}
                </Button>
                <Button variant="link" onClick={handleEditBtnClick}>
                  {" "}
                  Edit{" "}
                </Button>
              </div>
            )}
            <button
              className="delete-btn"
              onClick={() => handleOnPostDeleteClick(postData?.id)}
            >
              <Trash3Fill />
            </button>
          </Card>

          <div className="related-posts">
            {renderReplyOrCommentEdit()}
            {generateChildPosts()}
          </div>
        </>
      )}
    </>
  );
};

export default PostViewer;
