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
    waitOn() {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
    data() {
        return Posts.findOne(this.params._id);
    },
});

// Specific post
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn() {
        return Meteor.subscribe('singlePost', this.params._id);
    },
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

// Naming convention = CamelCase('postsList') + 'Controller'
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions() {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    waitOn() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    subscriptions() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts() {
        return Posts.find({}, this.findOptions());
    },
    data() {
        let hasMore = (this.posts().count() == this.postsLimit());
        let nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    },
});

// List of posts
Router.route('/:postsLimit?', {
    // template name == 'postsList'
    name: 'postsList'
});

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: ['postPage', 'postEdit']});
Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
