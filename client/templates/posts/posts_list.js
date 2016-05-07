Template.postsList.onRendered(function() {
    this.find('.wrapper')._uihooks = {
        moveElement(node, next) {
            let $node = $(node), $next = $(next);
            let oldTop = $node.offset().top;
            let height = $node.outerHeight(true);

            // Find all the elements between next and node
            let $inBetween = $next.nextUntil(node);
            if ($inBetween.length === 0) {
                $inBetween = $node.nextUntil(next);
            }

            // Now put node in place
            $node.insertBefore(next);

            // Measure new top
            let newTop = $node.offset().top;

            // Move node back to where it was before
            $node.removeClass('animate').css('top', oldTop < newTop ? height : -1 * height);

            // Force a redraw
            $node.offset();

            // Reset everything to 0, animated
            $node.addClass('animate').css('top', 0);
            $inBetween.addClass('animate').css('top', 0);
        }
    }
});
