import React from 'react';
import Comment from './Comment';

interface CommentListProps {
    data: Array<API.Comment>;
}

class CommentList extends React.Component<CommentListProps, {}> {
    render() {
        let commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
};

export default CommentList;
