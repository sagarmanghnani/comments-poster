import PostType, { PostMode } from "../enums"
import IPostData from "../post.interface"
import './post-creator.scss';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Button from 'react-bootstrap/Button';


interface IPostCreatorProps {
    type:PostType
    postHandler: (postData: IPostData) => void;
    parentId?:string;
    mode?:PostMode
}

interface IFormData {
    name:string;
    comment: string;
}




const PostCreator = ({type, postHandler, parentId}: IPostCreatorProps) => {
    const [formData, setFormData] = useState<IFormData | undefined>()

    const handleFormDataUpdate = (updatedValue:string, type: keyof IFormData) => {
        setFormData((prevData) => {
                return {
                    ...prevData,
                    [type]: updatedValue
                }
        })
    }

    return (
        <>
            <Card className="post-creator-container">
                <Card.Body>
                    <h4> {type === PostType.COMMENT ? 'Comment' : 'Reply'} </h4>
                    <div className="form-container">
                        <input placeholder="Name" value={formData?.name} onChange={(ev) => {
                            handleFormDataUpdate(ev.target.value, 'name')
                        }} />

                        <textarea placeholder="Comment" value={formData?.name} onChange={(ev) => {
                            handleFormDataUpdate(ev.target.value, 'comment')
                        }} />
                        
                        <Button variant="primary" className="post-btn">Post</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default PostCreator

