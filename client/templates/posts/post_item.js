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
    postUrl() {
        return (this.shortURL ? this.shortURL : this.url);
    },
    time_ago() {
        return moment(this.submitted).fromNow();
    },
    upvotedClass() {
        const userId = Meteor.userId();
        // If the userId is not the owner and is not among upvoters, still can vote
        if (userId && (userId != this.userId) && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    },
});

Template.postItem.events({
    // Only works for .upvotable classes
    'click .upvotable'(e) {
        e.preventDefault();

        Meteor.call('upvote', this._id);
    },
});
