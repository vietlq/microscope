Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404-not-found',
    waitOn: function() { return Meteor.subscribe('posts'); },
});

// List of posts
Router.route('/', {name: 'postsList'});

// Specific post
Router.route('/posts/:id', {
    name: 'postPage',
    data: function() {
        try {
            const _id = new Meteor.Collection.ObjectID(this.params.id);
            return Posts.findOne(_id);
        } catch (e) {
            console.log('Invalid post ID! Exception message: ' + e);
            return undefined;
        }
        return undefined;
    },
});

// This will make sure non-existent IDs will go to 404
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
