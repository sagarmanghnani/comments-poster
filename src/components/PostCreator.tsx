import PostType, { PostMode } from "../enums"
import IPostData, { IFormData } from "../post.interface"
import './post-creator.scss';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Button from 'react-bootstrap/Button';


interface IDisableConfig {
    name?: boolean;
    comment?: boolean;
}

interface IPostCreatorProps {
    type:PostType
    // postHandler: (postData: IPostData) => void;
    formDataHandler: (updatedValue:string, type: keyof IFormData) => void;
    name:string;
    comment:string;
    disableConfig?: IDisableConfig;
    postBtnClick: () => void;
}






const PostCreator = ({type, formDataHandler, name, comment, disableConfig, postBtnClick}: IPostCreatorProps) => {

    const handlePostBtnClick = () => {
        if(postBtnClick) {
            postBtnClick();
        }
    }

    const handleFormDataUpdate = (updatedValue:string, type: keyof IFormData) => {

        if(formDataHandler) {
            formDataHandler(updatedValue, type);
        }

        // setFormData((prevData: any) => {
        //         return {
        //             ...prevData,
        //             [type]: updatedValue
        //         }
        // })
    }

    return (
        <>
            <Card className="post-creator-container">
                <Card.Body>
                    <h4> {type === PostType.COMMENT ? 'Comment' : 'Reply'} </h4>
                    <div className="form-container">
                        <input placeholder="Name" value={name} onChange={(ev) => {
                            handleFormDataUpdate(ev.target.value, 'name')
                        }} required disabled={disableConfig?.name} />

                        <textarea placeholder="Comment" value={comment} onChange={(ev) => {
                            handleFormDataUpdate(ev.target.value, 'comment')
                        }} required disabled={disableConfig?.comment} />
                        
                        <Button variant="primary" className="post-btn" onClick={handlePostBtnClick}>Post</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default PostCreator

