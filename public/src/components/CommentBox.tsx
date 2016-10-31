import React from 'react';
import $ from 'jquery';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export interface CommentData {
    author: string;
    text: string;
}

interface CommentBoxProps {
    url: string;
    pollInterval: number;
}
interface CommentBoxState {
    data: Array<API.Comment>;
}

class CommentBox extends React.Component<CommentBoxProps, CommentBoxState> {
    private setCommentsInterval: number;

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.setCommentsInterval = null;

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.setCommentsData = this.setCommentsData.bind(this);
    }
    
    public componentDidMount(): void {
        this.setCommentsData();
        this.setCommentsInterval = setInterval(this.setCommentsData, this.props.pollInterval);
    }
    public componentWillUnmount(): void {
        clearInterval(this.setCommentsInterval);
    }

    public setCommentsData(): void {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    public handleCommentSubmit(comment: CommentData): void {
        const comments = this.state.data;
        let newComment = Object.assign({}, comment, {id: Date.now()}) as API.Comment;
        const newComments = comments.concat([newComment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({data});
            },
            error: (xhr, status, err) => {
                this.setState({ data: comments });
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    public render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
};

export default CommentBox;
