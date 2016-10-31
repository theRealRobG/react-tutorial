import React from 'react';
import { CommentData } from './CommentBox';

interface CommentFormProps {
    onCommentSubmit: (comment: CommentData) => void;
}

interface CommentFormState {
    author?: string;
    text?: string;
}

class CommentForm extends React.Component<CommentFormProps, CommentFormState> {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubit = this.handleSubit.bind(this);
    }
    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    }
    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }
    handleSubit(event) {
        event.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!author || !text) {
            return;
        }
        this.props.onCommentSubmit({ author, text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubit}>
                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input 
                    type="text" 
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange} 
                />
                <input type="submit" value="post" />
            </form>
        );
    }
};

export default CommentForm
