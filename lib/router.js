Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404-not-found',
    waitOn: function() { return Meteor.subscribe('posts'); },
});

// List of posts
Router.route('/', {name: 'postsList'});

// Specific post
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() {
        return Posts.findOne(this.params._id);
    },
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

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
