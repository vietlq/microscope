Posts = new Mongo.Collection('posts');

Posts.deny({
    update: function (userId, post, fieldNames) { return (ownsDocument(userId, post) === false); }
});

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

        // Check for duplicated posts
        const postMatch = Posts.findOne(_id);
        if (! postMatch) {
            return {
                postExists: false
            }
        }

        if (ownsDocument(Meteor.userId(), postMatch.userId) === false) {
            throw new Meteor.Error('accessDenied');
        }

        const postId = postMatch._id;

        Posts.update(postId, { $set: {url: postAttribs.url, title: postAttribs.title} });

        return {
            postExists: true,
            _id: postId
        };
    },
});
