Template.postsList.helpers({
    posts: Posts.find({}, { sort: {createdAt: -1} })
});
