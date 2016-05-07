Template.layout.onRendered(function() {
    this.find('#main')._uihooks = {
        insertElement(node, next) {
            $(node).hide().insertBefore(next).fadeIn();
        },
        removeElement(node) {
            $(node).fadeOut(function() {
                $(this).remove();
            });
        }
    }
});
