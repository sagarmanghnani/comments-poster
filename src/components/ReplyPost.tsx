import PostType from "../enums";
import { ICommentPostProps } from "../post.interface";
import CommentPost from "./CommentPost";

type IReplyPostProps = Omit<ICommentPostProps, "type">;
const ReplyPost = ({ isExisting, parentId, id }: IReplyPostProps) => {
  return (
    <CommentPost
      isExisting={isExisting}
      parentId={parentId}
      id={id}
      type={PostType.REPLY}
    ></CommentPost>
  );
};

export default ReplyPost;
