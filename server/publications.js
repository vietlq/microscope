Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);

    return Comments.find({postId});
});

Meteor.publish('notifications', function() {
    // For each user, load only his/her notifications that have not been seen
    return Notifications.find({userId: this.userId, read: false});
});
