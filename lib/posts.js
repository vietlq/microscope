Posts = new Mongo.Collection('posts');

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
            title: String,
            url: String
        });

        // Check for duplicated posts
        const postMatch = Posts.findOne({url: postAttribs.url});
        if (! postMatch) {
            return {
                postExists: false
            }
        }

        const postId = postMatch._id;

        Posts.update(postId, { $set: {url: postAttribs.url, title: postAttribs.title} });

        return {
            postExists: true,
            _id: postId
        };
    }
});
