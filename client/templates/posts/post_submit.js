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

            // Note to the user if the link already exists
            if (result.postExists) {
                console.log('The URL ' + post.url + ' already added.');
            }

            Router.go('postPage', result);
        });
    }
});
