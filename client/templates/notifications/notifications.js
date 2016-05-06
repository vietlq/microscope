Template.notifications.helpers({
    notifications() {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationCount(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});

Template.notificationItem.helpers({
    notificationPostPath() {
        return Router.routes.postPage.path({_id: this.postId});
    },
    notificationPostTitle() {
        const post = Posts.findOne({_id: this.postId});
        if (post) {
            return post.title;
        }
        return '';
    },
});

Template.notificationItem.events({
    'click a': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});
