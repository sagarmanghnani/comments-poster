import { useEffect, useRef, useState } from "react";
import PostType from "../enums";
import getPostById, { putPosts } from "../post-viewer.utils";
import IPostData, { ICommentPostProps, IFormData } from "../post.interface";
import PostCreator from "./PostCreator";

const CommentPost = ({
  isExisting,
  parentId,
  id,
  type,
  onPost,
}: ICommentPostProps) => {
  const [formData, setFormData] = useState<IFormData | undefined>();
  const alreadyExistingPostRef = useRef<IPostData | null>();
  useEffect(() => {
    if (isExisting) {
      const existingPost = getPostById(id as string);
      if (existingPost) {
        setFormData({
          comment: existingPost.comment,
          name: existingPost.name,
        });
        alreadyExistingPostRef.current = existingPost;
      }
    }
  }, []);

  const formDataHandler = (updatedValue: string, type: keyof IFormData) => {
    setFormData((prevData: any) => {
      return {
        ...prevData,
        [type]: updatedValue,
      };
    });
  };

  const onPostBtnClick = () => {
    if (!formData?.comment || !formData?.name) return;
    const postId = id ?? `${Date.now()}`;
    const postDetail: IPostData = {
      id: postId,
      name: formData?.name,
      comment: formData?.comment,
      type: PostType.COMMENT,
      createdAt: postId,
      childPostIds: alreadyExistingPostRef?.current?.childPostIds ?? [],
      parentId: parentId,
    };

    putPosts(postDetail);
    if (onPost) {
      onPost();
    }
    setFormData(undefined);
  };

  return (
    <>
      <PostCreator
        formDataHandler={formDataHandler}
        name={formData?.name ?? ""}
        comment={formData?.comment ?? ""}
        type={type ?? PostType.COMMENT}
        postBtnClick={onPostBtnClick}
        disableConfig={{
          name: isExisting,
        }}
      ></PostCreator>
    </>
  );
};

export default CommentPost;
