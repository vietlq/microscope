// http://momentjs.com/
// http://momentjs.com/timezone/

Template.postItem.helpers({
    domain() {
        let a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    time_ago() {
        return moment(this.submitted).fromNow();
    },
});
