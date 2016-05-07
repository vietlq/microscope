Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update(userId, doc, fieldNames) {
        // Notification has only 1 field to update - 'read' (true/false)
        return ownsDocument(userId, doc)
            && (fieldNames.length == 1)
            && (fieldNames[0] == 'read');
    },
});

createCommentNotification = function(comment) {
    let post = Posts.findOne(comment.postId);

    // Only notify if the comment was created by another user, not the author
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            createdAt: comment.submitted,
            read: false
        });
    }
}
