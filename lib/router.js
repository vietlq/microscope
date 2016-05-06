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

let getPostsLimit = function(postsLimit, increment) {
    let newPostsLimit = parseInt(postsLimit) || increment;
    if (newPostsLimit < 3) {
        return 3;
    }
    if (newPostsLimit > 100) {
        return 100;
    }
    return newPostsLimit;
}

// Naming convention = CamelCase('postsList') + 'Controller'
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit() {
        return getPostsLimit(this.params.postsLimit, this.increment);
    },
    findOptions() {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    waitOn() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    data() {
        return {posts: Posts.find({}, this.findOptions())};
    }
});

// List of posts
Router.route('/:postsLimit?', {
    // template name == 'postsList'
    name: 'postsList'
});

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: ['postPage', 'postEdit']});
Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
