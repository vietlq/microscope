Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404-not-found',
    waitOn() {
        return Meteor.subscribe('notifications');
    },
});

// Specific post
Router.route('/posts/:_id', {
    name: 'postPage',
    data() {
        return Posts.findOne(this.params._id);
    },
    waitOn() {
        return Meteor.subscribe('comments', this.params._id);
    },
});

// Specific post
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data() {
        let post = Posts.findOne(this.params._id);
        if (! post) {
            return undefined;
        }
        if (post.userId !== Meteor.userId()) {
            this.render('403-access-denied');
            return undefined;
        }
        return post;
    }
});

Router.route('submit', {name: 'postSubmit'});

let requireLogin = function() {
    if (! Meteor.user()) {
        // If the user is being logged in, show spinner
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('403-access-denied');
        }
    } else {
        this.next();
    }
};

let getPostsLimit = function(postsLimit) {
    let newPostsLimit = parseInt(postsLimit) || 5;
    if (newPostsLimit < 3) {
        return 3;
    }
    if (newPostsLimit > 100) {
        return 100;
    }
    return newPostsLimit;
}

// List of posts
Router.route('/:postsLimit?', {
    name: 'postsList',
    waitOn() {
        const limit = getPostsLimit(this.params.postsLimit);
        return Meteor.subscribe('posts', {sort: {submitted: -1}, limit});
    },
    data() {
        const limit = getPostsLimit(this.params.postsLimit);
        return {
            posts: Posts.find({}, {sort: {submitted: -1}, limit})
        };
    }
});

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: ['postPage', 'postEdit']});
Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
