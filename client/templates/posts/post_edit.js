Template.postEdit.onCreated(function() {
    Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
    errorMessage(field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass(field) {
        return (!!Session.get('postEditErrors')[field]) ? 'has-error' : '';
    },
});

Template.postEdit.events({
    'submit form': function(e) {
        // Stop default form submission and page reload
        e.preventDefault();

        const currPostId = this._id;

        const post = {
            _id: currPostId,
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
        };

        var errors = validatePost(post);
        if (errors.title || errors.url) {
            return Session.set('postEditErrors', errors);
        }

        Meteor.call('postUpdate', post, function(error, result) {
            // Display the error to the user and abort
            if (error) {
                return throwError('Unable to update the post: ' + error.reason);
            }

            Router.go('postPage', {_id: currPostId});
        });
    },
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            const currPostId = this._id;
            Posts.remove(currPostId);

            Router.go('home');
        }
    }
});
