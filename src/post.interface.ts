import PostType from "./enums";

interface IPostData {
    id:string;
    parentId:string;
    type: PostType;
    childPostIds: string[];
    createdAt:number;
}

export default IPostData;