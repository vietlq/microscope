Template.postEdit.events({
    'submit form': function(e) {
        // Stop default form submission and page reload
        e.preventDefault();

        const currPostId = this._id;

        const post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
        };

        Meteor.call('postUpdate', post, function(error, result) {
            // Display the error to the user and abort
            if (error) {
                return alert('Unable to update the post: ' + error.reason);
            }

            // Note to the user if the link does not exist
            if (result.postExists === false) {
                console.log('The URL ' + post.url + ' does not exist.');
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
