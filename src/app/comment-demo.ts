export class CommentDemo {
    postId: String;
    commentBody: String;
    commentCreator: String;
    commentEmail: string;
    commentDate: String;
    constructor(postId, commentBody, commentCreator, commentEmail, commentDate){
        this.postId = postId;
        this.commentBody = commentBody;
        this.commentCreator = commentCreator;
        this.commentEmail = commentEmail;
        this.commentDate = commentDate;
    }
}
