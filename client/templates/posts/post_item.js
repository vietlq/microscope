Template.postItem.helpers({
    id() {
        return this._id.valueOf();
    },
    domain() {
        let a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
});
