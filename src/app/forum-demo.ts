export class ForumDemo {
    postId: String;
    postEmail: string;
    postTitle: String;
    postBody: String;
    postCreator: String;
    postDate: String;
    constructor(postId, postEmail, postTitle, postBody, postCreator, postDate){
        this.postId = postId;  
        this.postEmail = postEmail;      
        this.postTitle = postTitle;
        this.postBody = postBody;
        this.postCreator = postCreator;
        this.postDate = postDate;       
    }
}
