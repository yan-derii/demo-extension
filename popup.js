import { h, render, Component } from 'preact';
import { ChromeService } from './chrome-service';

/** @jsx h */


class PostExtensionUI extends Component {
    constructor (props) {
        super(props);
        this.state = {
            postId: null,
        }
    }

    get postId () {
        return this.state.postId;
    }

    set postId (postId) {
        this.setState({postId});
    }

    loadPost () {
        const isInputValid = this.postId && Number.isInteger(parseInt(this.postId, 10)) && (parseInt(this.postId, 10) > 0);
        if (isInputValid) {
            ChromeService.sendMessage(this.postId);
        }
    }

    render () {
        return (
            <div>
                <div>
                    <input type="text" placeholder="Enter post ID" value={this.postId} onChange={ev => this.postId = ev.target.value}/>
                    <button onClick={() => this.loadPost()}>Go</button>
                </div>
            </div>
        )
    }
}

render(<PostExtensionUI/>, document.body);