Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });

        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!post) {
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        }

        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
        });

        // Update the number of comments for the post
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        return Comments.insert(comment);
    }
});
