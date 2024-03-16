import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card"
import getPostById from "../post-viewer.utils";
import IPostData from "../post.interface";

interface IPostViewerProps {
    postId:string;
}

const PostViewer = ({postId}: IPostViewerProps) => {

    const postData: IPostData = getPostById(postId)

    return (
        <>
            <Card>
                <Card.Body>
                    <h4> {postData?.name} </h4>
                    <span> {postData?.comment} </span>
                </Card.Body>

                <Card.Footer>
                    <Button variant="link"> Reply </Button>
                    <Button variant="link"> Edit </Button>
                </Card.Footer>
            </Card>
        </>
    )
}