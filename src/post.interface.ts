import PostType from "./enums";

interface IPostData {
    id:string;
    parentId?:string;
    type: PostType;
    childPostIds: string[];
    createdAt:string;
    name:string;
    comment:string;
}

export interface IFormData {
    name:string;
    comment: string;
}

export default IPostData;
