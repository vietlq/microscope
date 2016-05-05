Posts = new Mongo.Collection('posts');

Posts.allow({
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

// Meteor Methods will run on the server side only
Meteor.methods({
    postInsert(postAttribs) {
        check(Meteor.userId(), String);
        check(postAttribs, {
            title: String,
            url: String
        });

        let errors = validatePost(post);
        if (errors.title || errors.url) {
            throw new Meteor.Error('invalid-post', 'Both URL & title must be set');
        }

        // Check for duplicated posts
        const postSameLink = Posts.findOne({url: postAttribs.url});
        if (postSameLink) {
            return {
                postExists: true,
                _id: postSameLink._id
            }
        }

        const user = Meteor.user();
        // Use Underscore to enrich post with metadata
        let post = _.extend(postAttribs, {
            userId: user._id,
            author: user.username,
            submitted: new Date
        });

        const postId = Posts.insert(post);

        return {
            _id: postId
        };
    },
    postUpdate(postAttribs) {
        check(Meteor.userId(), String);
        check(postAttribs, {
            _id: String,
            title: String,
            url: String
        });

        const postId = postAttribs._id;

        // Check for duplicated posts
        const postMatch = Posts.findOne(postId);
        if (! postMatch) {
            throw new Meteor.Error('notFound');
        }

        if (postMatch.userId !== Meteor.userId()) {
            throw new Meteor.Error('accessDenied');
        }

        Posts.update(postId, { $set: {url: postAttribs.url, title: postAttribs.title} });

        return {
            postExists: true,
            _id: postId
        };
    },
});

validatePost = function(post) {
    let errors = {};

    if (!post.title) {
        errors.title = "Please fill in a headline";
    }

    if (!post.url) {
        errors.url = "URL is required";
    }

    return errors;
}
