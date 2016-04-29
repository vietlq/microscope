Template.postSubmit.events({
    'submit form': function(e) {
        // Stop default form submission and page reload
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            createdAt: new Date(),
        };

        post._id = Posts.insert(post);
        Router.go('postPage', post);
    }
});
