Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404-not-found',
    waitOn() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
    },
});

// List of posts
Router.route('/', {name: 'postsList'});

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

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: ['postPage', 'postEdit']});
Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
