
import { h, render, Component } from 'preact';
import { PostsService } from './posts-service';

/** @jsx h */

const wrapperStyle = {
    margin: '0 auto',
    padding: '14px',
    maxWidth: '400px',
    fontSize: '14px',
    lineHeight: '1.4',
    fontFamily: 'Georgia, Times, serif',
}

const postStyle = {
    paddingBottom: '14px',
    borderBottom: '1px dashed #2f2f2f',
}

const commentStyle = {
    margin: '14px 0',
}

const headerStyle = {
    fontFamily: 'Helvetica, Arial, sans-serif',
    lineHeight: '1.1',
    fontSize: '24px',
    textTransform: 'uppercase',
}

class Post extends Component {
    constructor (props) {
        super (props);
        this.state = {
            post: null,
            postId: props.postId,
            isLoading: false,
            hasErrors: false,
            comments: [],
        };
    }

    get postId () {
        return this.state.postId;
    }

    get post () {
        return this.state.post && this.state.post.body;
    }

    get title () {
        return this.state.post && this.state.post.title
    }

    get comments () {
        return this.state.comments || [];
    }

    componentDidMount () {
        this.setState({
            isLoading: true,
            hasErrors: false,
        });

        PostsService.getPost(this.postId).then(
            post => this.setState({post})
        ).then(
            () => PostsService.getComments(this.postId)
        ).then(
            comments => this.setState({
                comments,
                isLoading: false,
                hasErrors: false,
            })
        ).catch(
            (error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                    hasErrors: true,
                })
            }
        );

    }

    render () {
        if (this.state.isLoading) {
            return <div>Loading content...</div>
        }

        if (this.state.hasErrors) {
            return <div>Post loading failed!</div>
        }

        return <div style={wrapperStyle}>
            <h1 style={headerStyle}>
                <a href={`https://jsonplaceholder.typicode.com/posts/${this.postId}`}>#{this.postId}</a>&nbsp;
                {this.title}
            </h1>

            <p style={postStyle}>{this.post}</p>

            <p>Comments ({this.comments.length}):</p>
            {this.comments.map(
                comment => (
                    <div style={commentStyle}>
                        <a href={'mailto:' + comment.email}>{comment.name}</a>
                        <br/>
                        {comment.body}
                    </div>
                )
            )}
        </div>
    }
}

/**
 * Listen to the extension
 */
chrome.runtime.onMessage.addListener(function (postId) {
    document.body.innerHTML = '';
    document.documentElement.innerHTML = '';
    document.body.style.backgroundColor = '#f2f2f2';
    render(<Post postId={postId}/>, document.body);
})