Template.postItem.helpers({
    domain() {
        let a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});
