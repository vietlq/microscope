Template.errors.helpers({
    errors() {
        return Errors.find();
    }
});

Template.error.onRendered(function () {
    var error = this.data;
    // Remove error from Errors collection after 3 seconds so they don't pile up
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
});
