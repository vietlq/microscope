import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "grid-block": {
        "background": "#fff",
        "borderRadius": 3,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "marginBottom": 10,
        "WebkitBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "MozBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)"
    },
    "main": {
        "background": "#fff",
        "borderRadius": 3,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "marginBottom": 10,
        "WebkitBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "MozBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "position": "relative"
    },
    "post": {
        "background": "#fff",
        "borderRadius": 3,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "marginBottom": 10,
        "WebkitBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "MozBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "Zoom": 1,
        "position": "relative",
        "opacity": 1
    },
    "comments li": {
        "background": "#fff",
        "borderRadius": 3,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "marginBottom": 10,
        "WebkitBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "MozBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)"
    },
    "comment-form": {
        "background": "#fff",
        "borderRadius": 3,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "marginBottom": 10,
        "WebkitBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "MozBoxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.15)"
    },
    "body": {
        "background": "#eee",
        "color": "#666666"
    },
    "page": {
        "position": "absolute",
        "top": 0,
        "width": "100%"
    },
    "navbar": {
        "marginBottom": 10
    },
    "navbar navbar-inner": {
        "borderRadius": "0px 0px 3px 3px"
    },
    "spinner": {
        "height": 300
    },
    "post:before": {
        "content": "",
        "display": "table"
    },
    "post:after": {
        "content": "",
        "display": "table",
        "clear": "both"
    },
    "postinvisible": {
        "opacity": 0
    },
    "postinstant": {
        "WebkitTransition": "none",
        "MozTransition": "none",
        "OTransition": "none",
        "transition": "none"
    },
    "postanimate": {
        "WebkitTransition": "all 300ms 0ms",
        "MozTransition": "all 300ms 0ms ease-in",
        "OTransition": "all 300ms 0ms ease-in",
        "transition": "all 300ms 0ms ease-in"
    },
    "post upvote": {
        "display": "block",
        "marginTop": 7,
        "marginRight": 12,
        "marginBottom": 0,
        "marginLeft": 0,
        "float": "left"
    },
    "post post-content": {
        "float": "left"
    },
    "post post-content h3": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": 1.4,
        "fontSize": 18
    },
    "post post-content h3 a": {
        "display": "inline-block",
        "marginRight": 5
    },
    "post post-content h3 span": {
        "fontWeight": "normal",
        "fontSize": 14,
        "display": "inline-block",
        "color": "#aaaaaa"
    },
    "post post-content p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "post post-actions": {
        "display": "block",
        "float": "right",
        "marginTop": 7,
        "marginLeft": 7
    },
    "comments": {
        "listStyleType": "none",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "comments li h4": {
        "fontSize": 16,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "comments li h4 date": {
        "fontSize": 12,
        "fontWeight": "normal"
    },
    "comments li h4 a": {
        "fontSize": 12
    },
    "comments li p:last-child": {
        "marginBottom": 0
    },
    "dropdown-menu span": {
        "display": "block",
        "paddingTop": 3,
        "paddingRight": 20,
        "paddingBottom": 3,
        "paddingLeft": 20,
        "clear": "both",
        "lineHeight": 20,
        "color": "#bbb",
        "whiteSpace": "nowrap"
    },
    "load-more": {
        "display": "block",
        "borderRadius": 3,
        "background": "rgba(0, 0, 0, 0.05)",
        "textAlign": "center",
        "height": 60,
        "lineHeight": 60,
        "marginBottom": 10
    },
    "load-more:hover": {
        "textDecoration": "none",
        "background": "rgba(0, 0, 0, 0.1)"
    },
    "posts spinner-container": {
        "position": "relative",
        "height": 100
    },
    "jumbotron": {
        "textAlign": "center"
    },
    "jumbotron h2": {
        "fontSize": 60,
        "fontWeight": 100
    },
    "errors": {
        "position": "fixed",
        "zIndex": 10000,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "pointerEvents": "none"
    },
    "alert": {
        "animation": "fadeOut 2700ms ease-in 0s 1 forwards",
        "WebkitAnimation": "fadeOut 2700ms ease-in 0s 1 forwards",
        "MozAnimation": "fadeOut 2700ms ease-in 0s 1 forwards",
        "width": 250,
        "float": "right",
        "clear": "both",
        "marginBottom": 5,
        "pointerEvents": "auto"
    }
});