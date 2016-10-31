import React from 'react';
import Remarkable from 'remarkable';

interface CommentProps {
    author: string;
}

class Comment extends React.Component<CommentProps, {}> {
    constructor(props) {
        super(props);
        this.rawMarkup = this.rawMarkup.bind(this);
    }

    private rawMarkup() {
        const md = new Remarkable();
        const rawMarkup = md.render(this.props.children.toString());
        return {
            __html: rawMarkup
        };
    }
    public render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
};

export default Comment;
