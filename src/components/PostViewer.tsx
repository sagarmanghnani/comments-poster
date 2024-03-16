import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card"
import getPostById from "../post-viewer.utils";
import IPostData from "../post.interface";
import './post-viewer.scss';

interface IPostViewerProps {
    postId:string;
    onPostDeleteBtnClick?: (postId:string) => void;
}

const PostViewer = ({postId, onPostDeleteBtnClick}: IPostViewerProps) => {

    const postData: IPostData | null = getPostById(postId)

    return (
        <>
            {postData && <> 
            <Card className="post-viewer-container">
                <Card.Body>
                    <h5> {postData?.name} </h5>
                    <span className="comment"> {postData?.comment} </span>
                </Card.Body>

                <div className="footer-actions">
                    <Button variant="link"> Reply </Button>
                    <Button variant="link"> Edit </Button>
                </div>
            </Card>
            <button> Delete </button>
            </>
            }
        </>
    )
}

export default PostViewer;