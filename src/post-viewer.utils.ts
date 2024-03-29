import POST_DATA from "./constants";
import { PostOrder } from "./enums";
import IPostData from "./post.interface";

const getAllPosts = (): Record<string, IPostData> | null => {
  try {
    const stringifiedPostData = localStorage.getItem(POST_DATA);
    if (stringifiedPostData) {
      return JSON.parse(stringifiedPostData);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getPostById = (postId: string): null | IPostData => {
  try {
    const allPostData = getAllPosts();
    if (allPostData?.[postId]) {
      return allPostData[postId];
    }
    return null;
  } catch (err) {
    return null;
  }
};

const putPosts = (postData: IPostData): void => {
  if (!postData) return;
  const { parentId, id } = postData;
  const allPostData = getAllPosts() ?? {};
  if (parentId) {
    const parentItem = allPostData[parentId];
    const isItemAlreadyPresent = parentItem.childPostIds.includes(id);
    if (!isItemAlreadyPresent) {
      parentItem.childPostIds.push(id);
    }
  }
  allPostData[id] = postData;
  localStorage.setItem(POST_DATA, JSON.stringify(allPostData));
};

const deletePost = (postId: string): void => {
  if (!postId) return;
  const postData = getPostById(postId);
  if (!postData) return;
  const { childPostIds } = postData;
  const allPostData = getAllPosts() ?? {};
  if (childPostIds?.length) {
    childPostIds.forEach((id) => {
      delete allPostData[id];
    });
  }
  delete allPostData[postId];
  localStorage.setItem(POST_DATA, JSON.stringify(allPostData));
};

export const formatDate = (dateInMilliSeconds: string): string => {
  const dateObj = new Date(+dateInMilliSeconds);
  let date = dateObj.toLocaleDateString("en-us", { day: "numeric" });
  let month = dateObj.toLocaleDateString("en-us", { month: "long" });
  let year = dateObj.toLocaleDateString("en-us", { year: "numeric" });
  const formattedDate = `${date}-${month}-${year}`;
  return formattedDate;
};

export const setAllTopLevelPosts = (
  sortedOrder: PostOrder,
  setCommentPostIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const userPosts = getAllPosts();
  if (userPosts) {
    const commentPosts = [];
    Object.values(userPosts).forEach((post) => {
      if (!post.parentId) {
        commentPosts.push(post.id);
      }
    });
    const sortFunc =
      sortedOrder === PostOrder.INCREASING ? increasingOrder : decreasingOrder;
    commentPosts.sort(sortFunc);
    setCommentPostIds(commentPosts);
  }
};

export const increasingOrder = (a, b) => +a - +b;

export const decreasingOrder = (a, b) => +b - +a;

export default getPostById;

export { putPosts, getAllPosts, deletePost };
