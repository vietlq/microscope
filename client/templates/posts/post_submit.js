Template.postSubmit.events({
    'submit form': function(e) {
        // Stop default form submission and page reload
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        let errors = validatePost(post);
        if (errors.title || errors.url) {
            return Session.set('postSubmitErrors', errors);
        }

        Meteor.call('postInsert', post, function(error, result) {
            // Display the error to the user and abort
            if (error) {
                return throwError('Unable to create a new post: ' + error.reason);
            }

            // Note to the user if the link already exists
            if (result.postExists) {
                throwError('The URL ' + post.url + ' was already added.');
            }

            Router.go('postPage', result);
        });
    }
});

Template.postSubmit.helpers({
    errorMessage: function(field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
