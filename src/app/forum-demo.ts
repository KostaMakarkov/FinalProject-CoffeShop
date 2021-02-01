export class ForumDemo {
    postId: String;
    postEmail: string;
    postTitle: String;
    postContent: String;
    postCreator: String;
    postDate: String;
    constructor(postId, postEmail, postTitle, postContent, postCreator, postDate){
        this.postId = postId;  
        this.postEmail = postEmail;      
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.postCreator = postCreator;
        this.postDate = postDate;       
    }
}
