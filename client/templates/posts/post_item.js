// http://momentjs.com/
// http://momentjs.com/timezone/

Template.postItem.helpers({
    ownPost() {
        return (this.userId === Meteor.userId());
    },
    domain() {
        let a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    time_ago() {
        return moment(this.submitted).fromNow();
    },
    commentsCount() {
        return Comments.find({postId: this._id}).count();
    },
});
