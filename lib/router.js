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
        return {sort: this.sort, limit: this.postsLimit()};
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
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    },
});

NewPostsListController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath() {
        return Router.routes.newPosts.path({
            postsLimit: this.postsLimit() + this.increment
        });
    },
});

BestPostsListController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath() {
        return Router.routes.bestPosts.path({
            postsLimit: this.postsLimit() + this.increment
        });
    },
});

ClickedPostsController = PostsListController.extend({
    sort: {clicks: -1, submitted: -1, _id: -1},
    nextPath() {
        return Router.routes.clickedPosts.path({
            postsLimit: this.postsLimit() + this.increment
        });
    }
});

// List of posts
Router.route('/', {
    name: 'home',
    controller: NewPostsListController
});

Router.route('/new/:postsLimit?', {
    name: 'newPosts',
    controller: NewPostsListController
});

Router.route('/best/:postsLimit?', {
    name: 'bestPosts',
    controller: BestPostsListController
});

Router.route('/clicked/:postsLimit?', {
    name: 'clickedPosts',
    controller: ClickedPostsController
});

// This will stop server side to fail for RSS feeds
if (Meteor.isClient) {
    // This will make sure non-existent IDs will go to 404
    Router.onBeforeAction('dataNotFound', {only: ['postPage', 'postEdit']});
    Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
}

Router.route('/feed.xml', {
    where: 'server',
    name: 'rss',
    action() {
        let feed = new RSS({
            title: "New Microscope Posts",
            description: "The latest posts from Microscope, the smallest news aggregator"
        });

        Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
            feed.item({
                title: post.title,
                description: post.body,
                author: post.author,
                date: post.submitted,
                url: '/posts/' + post._id,
            });
        });

        this.response.write(feed.xml());
        this.response.end();
    }
});

Router.route('/api/posts', {
    where: 'server',
    name: 'apiPosts',
    action() {
        let parameters = this.request.query;
        let limit = !!parameters.limit ? parseInt(parameters.limit) : 20;
        let data = Posts.find({}, {limit: limit, fields: {title: 1, author: 1, url: 1, submitted: 1, }}).fetch();

        this.response.write(JSON.stringify(data));
        this.response.end();
    }
});

Router.route('/api/posts/:_id', {
    where: 'server',
    name: 'apiPost',
    action() {
        const post = Posts.findOne(this.params._id);

        if (post) {
            this.response.write(JSON.stringify(post));
        } else {
            this.response.writeHead(404, {'Context-Type': 'text/html'});
            this.response.write('Post not found');
        }
        this.response.end();
    }
});
