Template.postPage.helpers({
    comments() {
        return Comments.find({postId: this._id});
    }
});
