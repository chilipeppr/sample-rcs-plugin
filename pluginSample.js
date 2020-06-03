// This is a second plugin being loaded at the same time and following same design pattern
// This plugin is for Authvia's Text Payments
var pluginSample = {

    // The ID should be camel case, prefixed with your company name/initials, and be a short
    // name for this plugin. It gets pre-pended to a lot of HTML element class names, CSS styles,
    // data attributes, etc. throughout the Zipwhip app. So this name is important.
    // Example: AuthviaPayments, ZwSuggReply, ZwSentiment, ZwNpsSurvey, SenseforthCreditUnion
    id: "Authvia", // This gets prepended to all CSS styles and class names so not to clobber other plugins

    settings: {
        name: "Text Payments",
        description: "Send credit card payment requests via text messages.",
    },

    // This is the boot code for a plugin. It is called once the page is loaded.
    // This is the only code that is automatically called by Zipwhip on load of a plugin.
    // For all other events you must register for them in your onLoad event.
    // The onLoad method in your plugin object is called ONCE and only ONCE.
    // RESERVED NAME
    onLoad: function() {

        // Register our plugin with Zipwhip so it's aware of us
        // Don't really need to pass "this" yet as 2nd param, but maybe the plugin system
        // will need it in the future.
        zw.plugin.register(this.id, this.settings, this);

        zw.plugin.addCss(`.authvia-dollar-textbox {
            background-color:red;
            }`);
        zw.plugin.addCssUrl();

        // listen to events
        zw.plugin.addEventListener(zw.plugin.events.COMPOSE_BOX_LOAD, this.onComposeBoxLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // The code below in this plugin is any name you want to use. Consider making these private methods/props.

    // We are called when the Compose Box is loaded. In the event object we are given
    // the current Conversation object which has a ConversationId and Contacts array
    // with ContactId's.
    // This is called each time a conversation is changed,
    onComposeBoxLoad: function(evt) {

        console.log("Got plugin onComposeBoxLoad. evt:", evt);

        // Setup my Compose Box Button Bar. Lazy load since we don't really know what final
        // scope our button will have, meaning will it be re-created each time? We don't know
        // as it will have a lifecyle based on React, so if we just lazy load then we're pretty
        // safe regardless of how the final implementation comes out. Another way of looking at
        // it is as long as we getOrCreateComposeBoxBtnBar() each time the compose box loads, that method
        // provided to us by core Zipwhip, will always ensure the button is there.
        // getOrCreateComposeBoxBtnBar: function(id, tooltip, iconBaseSvg, iconHoverSvg, iconToggleSvg, onClickCallback)
        var iconBaseSvg = '<svg width="24" height="24" viewBox="0 0 24 24" class="zk-action-icon-iconElement"><circle cx="11.9" cy="12.1" r="10.4" style="fill:transparent;"/><g transform="matrix(.364 0 0 .364 .87 1.07)"><path d="m30.4 0c-16.8 0-30.4 13.6-30.4 30.4s13.6 30.4 30.4 30.4c16.8 0 30.4-13.6 30.4-30.4 0-16.8-13.6-30.4-30.4-30.4zm0 57c-14.7 0-26.7-11.9-26.7-26.7 0-14.7 11.9-26.7 26.7-26.7 14.7 0 26.7 11.9 26.7 26.7 2e-3 14.7-11.9 26.7-26.7 26.7z"/><path d="m40 29.8c-1.46-1-4.24-2.08-8.32-3.22v-12.9c2.43 0.089 4.2 1.02 5.31 2.8 0.598 0.97 0.959 2.12 1.08 3.46h4.62c-0.087-2.99-1.07-5.39-2.94-7.21-1.88-1.82-4.57-2.85-8.07-3.09v-3.46h-2.51v3.51c-3.54 0.035-6.29 1.13-8.26 3.28-1.96 2.15-2.94 4.56-2.94 7.24 0 2.99 0.91 5.34 2.73 7.02 1.82 1.69 4.64 2.9 8.47 3.62v14.4c-2.98-0.247-5.02-1.36-6.12-3.36-0.622-1.11-1-2.87-1.15-5.28h-4.67c0 3.03 0.501 5.43 1.5 7.21 1.83 3.3 5.31 5.11 10.4 5.44v5.12h2.51v-5.12c3.19-0.352 5.62-1.07 7.32-2.17 3.05-1.98 4.57-5.3 4.57-9.98 0-3.24-1.18-5.69-3.56-7.34zm-10.8-3.72c-1.97-0.388-3.54-1.07-4.7-2.06-1.16-0.987-1.74-2.35-1.74-4.09 0-1.44 0.49-2.83 1.48-4.15 0.988-1.32 2.64-2.02 4.97-2.11zm8.74 16c-1.14 2.06-3.22 3.16-6.23 3.3v-13.9c2.2 0.598 3.77 1.23 4.7 1.9 1.62 1.14 2.44 2.82 2.44 5.02-1e-3 1.39-0.302 2.61-0.904 3.67z"/></g></svg>';
        var iconHoverSvg = '<svg width="24" height="24" viewBox="0 0 24 24" class="zk-action-icon-iconElement"><circle cx="11.9" cy="12.1" r="10.4" style="fill:transparent;"/><g fill="#86BBE0" transform="matrix(.364 0 0 .364 .87 1.07)"><path d="m30.4 0c-16.8 0-30.4 13.6-30.4 30.4s13.6 30.4 30.4 30.4c16.8 0 30.4-13.6 30.4-30.4 0-16.8-13.6-30.4-30.4-30.4zm0 57c-14.7 0-26.7-11.9-26.7-26.7 0-14.7 11.9-26.7 26.7-26.7 14.7 0 26.7 11.9 26.7 26.7 2e-3 14.7-11.9 26.7-26.7 26.7z"/><path d="m40 29.8c-1.46-1-4.24-2.08-8.32-3.22v-12.9c2.43 0.089 4.2 1.02 5.31 2.8 0.598 0.97 0.959 2.12 1.08 3.46h4.62c-0.087-2.99-1.07-5.39-2.94-7.21-1.88-1.82-4.57-2.85-8.07-3.09v-3.46h-2.51v3.51c-3.54 0.035-6.29 1.13-8.26 3.28-1.96 2.15-2.94 4.56-2.94 7.24 0 2.99 0.91 5.34 2.73 7.02 1.82 1.69 4.64 2.9 8.47 3.62v14.4c-2.98-0.247-5.02-1.36-6.12-3.36-0.622-1.11-1-2.87-1.15-5.28h-4.67c0 3.03 0.501 5.43 1.5 7.21 1.83 3.3 5.31 5.11 10.4 5.44v5.12h2.51v-5.12c3.19-0.352 5.62-1.07 7.32-2.17 3.05-1.98 4.57-5.3 4.57-9.98 0-3.24-1.18-5.69-3.56-7.34zm-10.8-3.72c-1.97-0.388-3.54-1.07-4.7-2.06-1.16-0.987-1.74-2.35-1.74-4.09 0-1.44 0.49-2.83 1.48-4.15 0.988-1.32 2.64-2.02 4.97-2.11zm8.74 16c-1.14 2.06-3.22 3.16-6.23 3.3v-13.9c2.2 0.598 3.77 1.23 4.7 1.9 1.62 1.14 2.44 2.82 2.44 5.02-1e-3 1.39-0.302 2.61-0.904 3.67z"/></g></svg>';
        var iconToggleSvg = '<svg width="24" height="24" viewBox="0 0 24 24" class="zk-action-icon-iconElement"><circle cx="11.9" cy="12.1" r="10.4" style="fill:#C2DEF2;"/><g transform="matrix(.364 0 0 .364 .87 1.07)"><path fill="#549ED1" d="m30.4 0c-16.8 0-30.4 13.6-30.4 30.4s13.6 30.4 30.4 30.4c16.8 0 30.4-13.6 30.4-30.4 0-16.8-13.6-30.4-30.4-30.4zm0 57c-14.7 0-26.7-11.9-26.7-26.7 0-14.7 11.9-26.7 26.7-26.7 14.7 0 26.7 11.9 26.7 26.7 2e-3 14.7-11.9 26.7-26.7 26.7z"/><path fill="#549ED1" d="m40 29.8c-1.46-1-4.24-2.08-8.32-3.22v-12.9c2.43 0.089 4.2 1.02 5.31 2.8 0.598 0.97 0.959 2.12 1.08 3.46h4.62c-0.087-2.99-1.07-5.39-2.94-7.21-1.88-1.82-4.57-2.85-8.07-3.09v-3.46h-2.51v3.51c-3.54 0.035-6.29 1.13-8.26 3.28-1.96 2.15-2.94 4.56-2.94 7.24 0 2.99 0.91 5.34 2.73 7.02 1.82 1.69 4.64 2.9 8.47 3.62v14.4c-2.98-0.247-5.02-1.36-6.12-3.36-0.622-1.11-1-2.87-1.15-5.28h-4.67c0 3.03 0.501 5.43 1.5 7.21 1.83 3.3 5.31 5.11 10.4 5.44v5.12h2.51v-5.12c3.19-0.352 5.62-1.07 7.32-2.17 3.05-1.98 4.57-5.3 4.57-9.98 0-3.24-1.18-5.69-3.56-7.34zm-10.8-3.72c-1.97-0.388-3.54-1.07-4.7-2.06-1.16-0.987-1.74-2.35-1.74-4.09 0-1.44 0.49-2.83 1.48-4.15 0.988-1.32 2.64-2.02 4.97-2.11zm8.74 16c-1.14 2.06-3.22 3.16-6.23 3.3v-13.9c2.2 0.598 3.77 1.23 4.7 1.9 1.62 1.14 2.44 2.82 2.44 5.02-1e-3 1.39-0.302 2.61-0.904 3.67z"/></g></svg>';
        var btnEl = zw.plugin.getOrCreateComposeBoxBtnBar(this.id, this.settings.name, iconBaseSvg, iconHoverSvg, iconToggleSvg, this.onComposeBoxBtnClick.bind(this));

        // Setup my keypress event



        // Setup my Compose Box Top Region

    },

    // This is called when the compose box button bar button is clicked
    onComposeBoxBtnClick: function(evt) {
        console.log("Got click on compose box btn bar. evt:", evt);
        var buttonEl = $(evt.currentTarget);
        var iconToggleEl = buttonEl.find(".iconToggleSvg");
        if (iconToggleEl.hasClass("hidden")) {
            // it is hidden, let's show it and toggle on
            console.log("we are toggling the Top Region to on");
            buttonEl.find(".iconSvg").addClass("hidden"); // hide all icons first
            iconToggleEl.removeClass("hidden"); // then just show us
            this.onTopRegionShow();
        } else {
            // it is not hidden, let's hide the Top Region and toggle off
            console.log("we are toggling the Top Region to off");
            iconToggleEl.addClass("hidden");
            buttonEl.find(".iconHoverSvg").removeClass("hidden"); // show the hover icon
            this.onTopRegionHide();
        }
    },

    // This is called when user clicks button to show, or when keypress triggers a show
    onTopRegionShow: function() {
        console.log(this.id + " onTopRegionshow");

        // Lazy load the DOM elements for the Top Region since we don't really know the scope
        // of React. We'll just always make sure the DOM elements exist each time this is called.
        var iconTopRegionSvg = '<svg width="18" height="18" viewBox="0 0 24 24" class="zk-action-icon-iconElement"><circle cx="11.9" cy="12.1" r="10.4" style="fill:transparent;"/><g fill="#b6bbc3" transform="matrix(.364 0 0 .364 .87 1.07)"><path d="m30.4 0c-16.8 0-30.4 13.6-30.4 30.4s13.6 30.4 30.4 30.4c16.8 0 30.4-13.6 30.4-30.4 0-16.8-13.6-30.4-30.4-30.4zm0 57c-14.7 0-26.7-11.9-26.7-26.7 0-14.7 11.9-26.7 26.7-26.7 14.7 0 26.7 11.9 26.7 26.7 2e-3 14.7-11.9 26.7-26.7 26.7z"/><path d="m40 29.8c-1.46-1-4.24-2.08-8.32-3.22v-12.9c2.43 0.089 4.2 1.02 5.31 2.8 0.598 0.97 0.959 2.12 1.08 3.46h4.62c-0.087-2.99-1.07-5.39-2.94-7.21-1.88-1.82-4.57-2.85-8.07-3.09v-3.46h-2.51v3.51c-3.54 0.035-6.29 1.13-8.26 3.28-1.96 2.15-2.94 4.56-2.94 7.24 0 2.99 0.91 5.34 2.73 7.02 1.82 1.69 4.64 2.9 8.47 3.62v14.4c-2.98-0.247-5.02-1.36-6.12-3.36-0.622-1.11-1-2.87-1.15-5.28h-4.67c0 3.03 0.501 5.43 1.5 7.21 1.83 3.3 5.31 5.11 10.4 5.44v5.12h2.51v-5.12c3.19-0.352 5.62-1.07 7.32-2.17 3.05-1.98 4.57-5.3 4.57-9.98 0-3.24-1.18-5.69-3.56-7.34zm-10.8-3.72c-1.97-0.388-3.54-1.07-4.7-2.06-1.16-0.987-1.74-2.35-1.74-4.09 0-1.44 0.49-2.83 1.48-4.15 0.988-1.32 2.64-2.02 4.97-2.11zm8.74 16c-1.14 2.06-3.22 3.16-6.23 3.3v-13.9c2.2 0.598 3.77 1.23 4.7 1.9 1.62 1.14 2.44 2.82 2.44 5.02-1e-3 1.39-0.302 2.61-0.904 3.67z"/></g></svg>';
        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, iconTopRegionSvg);
        regionEl.removeClass("hidden"); // ensure not hidden

        // ensure our other DOM elements exist
        var bodyEl = regionEl.find("." + this.id + "-composebox-topregion-body");
        if (bodyEl.length > 0) {
            // element exists, all set
            console.log(this.id + " body of topregion exists");
        } else {
            // create element
            bodyEl = $(`
<div class="` + this.id + `-composebox-topregion-body">
</div>
`);
            regionEl.find(".plugin-composebox-topregion-body").append(bodyEl);
        }

    },

    // This is called when user clicks button to hide, or when onblur triggers a hide
    onTopRegionHide: function() {
        console.log(this.id + " onTopRegionHide");

        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.iconBaseSvg);

        // hide via CSS
        regionEl.addClass("hidden");

    },

    // We are called when the Side Panel is loaded. In the event object we are given
    // the current Conversation object which has a ConversationId and Contacts array
    // with ContactId's
    onSidePanelLoad: function(evt) {
        console.log("Got plugin onSidePanelLoad. evt:", evt);
    },

}

// Now load it
pluginSample.onLoad();