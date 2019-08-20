const POSTS_URL = (postId) => `https://jsonplaceholder.typicode.com/posts/${postId}`;
const COMMENTS_URL = () => `https://jsonplaceholder.typicode.com/comments`;

/**
 * Service for getting posts from the API
 */
export class PostsService {
    /**
     * Get post by ID
     * @param {*} postId - post ID
     */
    static async getPost (postId) {
        try {
            const response = await fetch(POSTS_URL(postId));
            
            if (response.ok) {
                return await response.json();
            }

            throw Error('Cannot retreive post');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get comments for the post by post ID
     * @param {*} postId - post ID
     */
    static async getComments (postId) {
        try {
            const response = await fetch(COMMENTS_URL());
            
            if (response.ok) {
                const comments = await response.json();
                console.log({comments});
                return comments.filter(
                    comment => comment.postId === parseInt(postId, 10)
                );
            }

            throw Error('Cannot retreive comments');
        } catch (error) {
            throw error;
        }
    }
}