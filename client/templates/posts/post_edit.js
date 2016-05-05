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

            Router.go('postsList');
        }
    }
});
