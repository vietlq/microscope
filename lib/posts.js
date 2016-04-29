Posts = new Mongo.Collection('posts');

Posts.allow({
    insert(userId, doc) {
        // Only allow logged in users to post
        return !! userId;
    }
});
