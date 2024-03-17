enum PostType {
  COMMENT = 1,
  REPLY = 2,
  NONE = 0,
}

enum PostMode {
  CREATE = 1,
  EDIT = 2,
}

enum PostOrder {
  INCREASING = 0,
  DECREASING = 1,
}

export default PostType;
export { PostMode, PostOrder };
