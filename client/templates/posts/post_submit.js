Template.postSubmit.events({
    'submit form': function(e) {
        // Stop default form submission and page reload
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // Display the error to the user and abort
            if (error) {
                return alert('Unable to create a new post: ' + error.reason);
            }

            Router.go('postPage', result);
        });
    }
});
