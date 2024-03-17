import PostType from "../enums";
import { IFormData } from "../post.interface";
import "./post-creator.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useRef } from "react";

interface IDisableConfig {
  name?: boolean;
  comment?: boolean;
}

interface IPostCreatorProps {
  type: PostType;
  formDataHandler: (updatedValue: string, type: keyof IFormData) => void;
  name: string;
  comment: string;
  disableConfig?: IDisableConfig;
  postBtnClick: () => void;
}

const PostCreator = ({
  type,
  formDataHandler,
  name,
  comment,
  disableConfig,
  postBtnClick,
}: IPostCreatorProps) => {
  const handlePostBtnClick = () => {
    if (postBtnClick) {
      postBtnClick();
    }
  };

  const nameInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleFormDataUpdate = (
    updatedValue: string,
    type: keyof IFormData
  ) => {
    if (formDataHandler) {
      formDataHandler(updatedValue, type);
    }
  };

  return (
    <>
      <Card className="post-creator-container">
        <Card.Body>
          <h5> {type === PostType.COMMENT ? "Comment" : "Reply"} </h5>
          <div className="form-container">
            <input
              placeholder="Name"
              value={name}
              onChange={(ev) => {
                handleFormDataUpdate(ev.target.value, "name");
              }}
              required
              disabled={disableConfig?.name}
              ref={nameInputRef}
              style={{
                cursor: disableConfig?.name ? "not-allowed" : "",
              }}
            />

            <textarea
              placeholder={type === PostType.COMMENT ? "Comment" : "Reply"}
              value={comment}
              onChange={(ev) => {
                handleFormDataUpdate(ev.target.value, "comment");
              }}
              required
              disabled={disableConfig?.comment}
            />

            <Button
              variant="primary"
              className="post-btn"
              onClick={handlePostBtnClick}
              disabled={!name || !comment}
              style={{
                cursor: !name || !comment ? "not-allowed" : "",
              }}
            >
              Post
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCreator;
