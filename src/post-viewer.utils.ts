import POST_DATA from "./constants";
import IPostData from "./post.interface"


const getAllPosts = (): Record<string, IPostData> | null => {
    try {
        const stringifiedPostData = localStorage.getItem(POST_DATA);
        if(stringifiedPostData) {
            return JSON.parse(stringifiedPostData);
        }
        return null;
    } catch (error) {
        return null;
    }
}

const getPostById = (postId:string): null | IPostData => {
    try {
        const allPostData = getAllPosts();
            if(allPostData?.[postId]) {
                return allPostData[postId];
            }
            return null;
    } catch(err) {
        return null;
    }
}

const putPosts = (postData:IPostData): void => {
    if(!postData) return;
    const {parentId, id} = postData;
    const allPostData = getAllPosts() ?? {};
    if(parentId) {
        const parentItem = allPostData[parentId];
        const isItemAlreadyPresent = parentItem.childPostIds.includes(id);
        if(!isItemAlreadyPresent) {
            parentItem.childPostIds.push(id);
        }
    }
    allPostData[id] = postData;
    localStorage.setItem(POST_DATA, JSON.stringify(allPostData));
}


const deletePost = (postId:string): void => {
    if(!postId) return;
    const postData = getPostById(postId);
    if(!postData) return;
    const {parentId, id} = postData;
    const allPostData = getAllPosts() ?? {};
    if(parentId) {
        const parentItem = allPostData[parentId];
        const newChildPostIds = parentItem.childPostIds.filter((id) => {
            return id !== postId;
        })
        parentItem.childPostIds = newChildPostIds;
    }
    delete allPostData[postId];
    localStorage.setItem(POST_DATA, JSON.stringify(allPostData));
}




export default getPostById;

export {
    putPosts,
    getAllPosts,
    deletePost
}