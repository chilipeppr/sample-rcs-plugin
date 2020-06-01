// ==UserScript==
// @name         Override Zipwhip Default Behaviour
// @namespace    http://zipwhip.com/
// @version      0.3
// @description  Override Zipwhip experience with plugins. Updated May 25 11 pm
// @author       You
// @match        https://app.zipwhip.com/
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

var manifest = {

}

var pluginRCS = {

    id: "ZwRCS",

    settings: {
        name: "RCS Plugin",
        description: "This plugin adds features to the Zipwhip web app to support RCS messaging.",
    },

    iconTagSvg: `<svg width="36px" height="14px" viewBox="0 0 38 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" fill="none">
        <path d="M6.54138489,0 L32.9658815,0 C35.0450712,-1.27011936e-15 36.7305874,1.68551624 36.7305874,3.76470588 C36.7305874,4.03625027 36.7012084,4.30699769 36.6429631,4.57222182 L34.7827554,13.0428101 C34.4035198,14.7696868 32.8737019,16 31.1056739,16 L4.68117728,16 C2.60198763,16 0.916471394,14.3144838 0.916471394,12.2352941 C0.916471394,11.9637497 0.945850473,11.6930023 1.00409577,11.4277782 L2.86430338,2.95718994 C3.24353906,1.2303132 4.7733569,2.10113831e-15 6.54138489,0 Z" fill="#5E55AB"></path>
        <text font-size="11.3" font-style="italic" font-weight="500" fill="#FFFFFF">
            <tspan x="8" y="11.5">RCS</tspan>
        </text>
    </g>
</svg>`,

    iconUrlCarousel: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/carousel_btn_default_rcs_POC%401x.svg',
    iconUrlCarouselHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/carousel_btn_hover_rcs_POC%401x.svg',
    iconUrlCarouselSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/carousel_btn_selected_rcs_POC%401x.svg',
    iconUrlChip: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_default_POC%401x.svg',
    iconUrlChipHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_hover_POC%401x.svg',
    iconUrlChipSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_selected_POC%401x.svg',
    iconUrlCal: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_default_abc_POC%401x.svg',
    iconUrlCalHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_hover_abc_POC%401x.svg',
    iconUrlCalSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_selected_abc_POC%401x.svg',
    iconUrlLoc: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_default_abc_POC%401x.svg',
    iconUrlLocHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_hover_abc_POC%401x.svg',
    iconUrlLocSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_selected_abc_POC%401x.svg',


    // The Zipwhip Plugin Bootstrapper calls this method.
    onLoad: function() {

        // Register
        zw.plugin.register(this.id, this.settings, this);

        zw.plugin.addCss("." + this.id + `-convlistitem-tag {
flex-direction: row;
display: flex;
flex-grow: 1;
xwidth: 100%;
xborder: 1px solid red;
font-style: italic;
background-color: #5E55AB;
color: white;
padding: 2px 8px;
border-radius: 4px;
font-size: 10px;
/* line-height: 16px; */
height: 12px;
margin: 4px 30px 0 0;
}
.` + this.id + `-convlistitem-svgtag {
padding-right: 26px;
}
.` + this.id + `-translatedtext {
flex-grow: 1;
}
.plugin-rcs-bubble .message-bubble_bubbleContainer.message-bubble_bubbleContainer_read {
background-color: #5E55AB;
}
.plugin-rcs-bubble .message-bubble_bubbleContainer.message-bubble_bubbleContainer_unread {
background-color: #352F66;
}
.plugin-rcs-bubble .zk-button-primary:disabled {
background-color: #B1ACE4;
}
`, this.id + " plugin css");

        // Listen to events
        zw.plugin.addEventListener(zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD, this.onConvListItemLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.CONVERSATION_LIST_ITEM_MENU_LOAD, this.onConvListItemMenuLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.COMPOSE_BOX_LOAD, this.onComposeBoxLoad.bind(this));
        //zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // Called when a conversation list item loads. We insert our RCS logo on appropriate
    // conversations.
    // var evt = {
    //    itemEl: retItemEl,
    //    contactId: contactId,
    //    phoneNum: phoneNum,
    //    contact: contact,
    //    contacts: contacts,
    //};
    onConvListItemLoad: function(evt) {
        console.log("onConvListItemLoad. evt:", evt);

        // see if they are set for the RCS tag, if so show the logo

        if ('notes' in evt.contact && evt.contact.notes) {

            // see if we can parse json in notes field
            var meta = zw.tryParseJSON(evt.contact.notes);
            if (meta && 'tags' in meta && 'rcs' in meta.tags && meta.tags.rcs) {

                // We are going to add a tag to each item
                var itemEl = evt.itemEl;
                this.getOrCreateTagSvg(itemEl);
            }
        }

    },

    getOrCreateTagSvg: function(itemEl) {
        // We are going to add a tag to each item

        // Check if it's there already
        var tagEl = itemEl.find('.' + this.id + '-convlistitem-svgtag');
        if (tagEl.length > 0) {
            console.log("the tag svg is already there. returning it.");
            return tagEl;
        }

        var lowerRightEl = itemEl.find('.user-card-extension-container');
        //lowerRightEl.append('<div class="zk-styled-text-small ' + this.id + '-convlistitem-tag">RCS</div>');
        tagEl = $('<div class="zk-styled-text-small ' + this.id + '-convlistitem-svgtag">' + this.iconTagSvg + '</div>');
        lowerRightEl.append(tagEl);
        return tagEl;
    },

    // Called when the ellipsis menu is shown on a conversation list item.
    // var evt = {
    //    itemEl: itemEl,
    //    itemMenuEl: convItemMenuEl,
    //    contactId: contactId,
    //    phoneNum: phoneNum,
    //};
    onConvListItemMenuLoad: function(evt) {
        console.log("onConvListItemMenuLoad. evt:", evt);

        // Pass in menuEl, id, menuTxt, tooltip
        var menuItemEl = zw.plugin.getOrCreateConvListItemMenu(evt.itemMenuEl, this.id, "Toggle RCS", "Click to artificially set/unset this as an RCS conversation.");

        // setup click event. pass in event data that will get passed to click event automagically for us.
        menuItemEl.click({itemEl: evt.itemEl, contactId: evt.contactId, phoneNum: evt.phoneNum}, this.onPretendRcsClick.bind(this));
    },

    // Called after the click on the conv list ellipsis menu item
    onPretendRcsClick: function(evt) {
        console.log("onPretendRcsClick. evt:", evt);

        var that = this;

        // Ajax call to get contact info, so that we can tweak Notes to add our tag
        zw.getContactInfoFromPhoneNum(evt.data.phoneNum, function(contact, conversation, contactId) {
            console.log("got contact info back. contact:", contact);

            console.log("notes:", contact.notes);

            var meta = zw.tryParseJSON(contact.notes);
            if (meta) {
                console.log("got good JSON parse on notes. meta:", meta);

                // see if tags field
                if (!('tags' in meta)) meta.tags = {rcs:false};

                // invert
                meta.tags.rcs = !meta.tags.rcs; //true;

                //var menuEl = $(evt.target);
                //console.log("menuEl:", menuEl);


            } else {
                console.log("bad parsing of JSON on notes field. meta:", meta);

                meta = {
                    tags: {
                        rcs: true,
                    }
                };

            }

            // Now stick it in DOM, or get a ref if it's already there, and show or hide it
            var convItemEl = evt.data.itemEl; //menuEl.parents('.conversation-list-panel_hover');
            console.log("convItemEl:", convItemEl);
            var rcsEl = that.getOrCreateTagSvg(convItemEl); //convItemEl.find('.' + that.id + '-convlistitem-svgtag');
            console.log("rcsEl:", rcsEl);
            if (meta.tags.rcs) {
                rcsEl.removeClass("hidden");
            } else {
                rcsEl.addClass("hidden");
            }

            // now save it
            contact.notes = JSON.stringify(meta);
            contact.keywords = contact.notes;
            zw.saveContactInfo(contact, function(data) {
                console.log("got ajax callback on saveContactInfo. data:", data);
            });

        });

    },

    btnCarouselEl: null, // holds element ref to button
    btnChipEl: null,
    btnCalEl: null,
    btnLocEl: null,

    onComposeBoxLoad: function(evt) {

        console.log("onComposeBoxLoad. evt:", evt);

        // remove purple from bubbles
        $('.message-panel_messageContainer').removeClass("plugin-rcs-bubble");
        $('.send-message-panel_buttonWrapper > .zk-button.zk-button-primary > div').text("Send");

        // See if this contact is RCS enabled
        if ('contact' in evt && 'notes' in evt.contact && evt.contact.notes) {
            var meta = zw.tryParseJSON(evt.contact.notes);

            if ('tags' in meta && 'rcs' in meta.tags && meta.tags.rcs) {

                // getOrCreateComposeBoxBtnBarCss: function(id, tooltip, iconUrl, iconUrlHover, iconUrlSel, onClickCallback) {
                this.btnCarouselEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-carousel", "Carousel", this.iconUrlCarousel, this.iconUrlCarouselHover, this.iconUrlCarouselSelected, this.onClickCarouselBtn.bind(this));
                this.btnChipEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-chip", "Chip List", this.iconUrlChip, this.iconUrlChipHover, this.iconUrlChipSelected, this.onClickChipBtn.bind(this));
                this.btnCalEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-cal", "Calendar Entry", this.iconUrlCal, this.iconUrlCalHover, this.iconUrlCalSelected, this.onClickCalBtn.bind(this));
                this.btnLocEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-loc", "Location Share", this.iconUrlLoc, this.iconUrlLocHover, this.iconUrlLocSelected, this.onClickLocBtn.bind(this));

                // make bubbles purple
                $('.message-panel_messageContainer').addClass("plugin-rcs-bubble");
                $('.send-message-panel_buttonWrapper > .zk-button.zk-button-primary > div').text("Send RCS");

            }

        }
    },

    onClickCarouselBtn: function(evt) {
        console.log("onClickCarouselBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-carousel-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-carousel', "RCS Carousel Widget", this.iconUrlCarousel, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("RCS Carousel - Coming soon. Lets you create your carousel.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickCarouselBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnCarouselEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnCarouselEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickChipBtn: function(evt) {
        console.log("onClickChipBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-chip-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-chip', "RCS Chip List Widget", this.iconUrlChip, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("RCS Chip List - Coming soon. Lets you create chip lists that will appear on receiver's phone.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickChipBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnChipEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnChipEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickCalBtn: function(evt) {
        console.log("onClickCalBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-cal-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-cal', "Calendar Entry Widget", this.iconUrlChip, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("RCS Calendar Entry - Coming soon. Lets you send calendar invites.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickCalBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnCalEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnCalEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickLocBtn: function(evt) {
        console.log("onClickLocBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-loc-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-loc', "Location Share Widget", this.iconUrlLoc, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("RCS Location Share - Coming soon. Lets you send your map location.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickLocBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnLocEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnLocEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

}

var pluginABC = {

    id: "ZwABC",

    settings: {
        name: "Apple Business Chat Plugin",
        description: "This plugin adds features to the Zipwhip web app to support Apple Business Chat.",
    },

    iconTagSvg: `<svg width="21px" height="16px" viewBox="0 0 21 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>label_abc@1x</title>
    <g id="label_abc" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group">
            <path d="M6.54138489,0 L15.6754909,0 C17.7546805,-8.26030152e-16 19.4401968,1.68551624 19.4401968,3.76470588 C19.4401968,4.03625027 19.4108177,4.30699769 19.3525724,4.57222182 L17.4923648,13.0428101 C17.1131291,14.7696868 15.5833113,16 13.8152833,16 L4.68117728,16 C2.60198763,16 0.916471394,14.3144838 0.916471394,12.2352941 C0.916471394,11.9637497 0.945850473,11.6930023 1.00409577,11.4277782 L2.86430338,2.95718994 C3.24353906,1.2303132 4.7733569,1.6570491e-15 6.54138489,0 Z" id="Rectangle" fill="#848E99"></path>
            <g id="Apple_logo_black" transform="translate(6.000000, 2.000000)" fill="#FFFFFF" fill-rule="nonzero">
                <path d="M8.15867955,7.79303628 C8.00906318,8.14240839 7.83196607,8.46400341 7.62677771,8.75967367 C7.3470863,9.1627473 7.11808153,9.44175142 6.94159508,9.5966852 C6.66801075,9.85099841 6.3748845,9.98124127 6.0609951,9.98864863 C5.83565442,9.98864863 5.56390191,9.92383549 5.24756993,9.79235863 C4.93019985,9.6614975 4.63853919,9.5966852 4.37185536,9.5966852 C4.09216411,9.5966852 3.7921982,9.6614975 3.47134721,9.79235863 C3.1500073,9.92383549 2.89114038,9.99235231 2.69321903,9.99914225 C2.39221503,10.0121047 2.09218837,9.87815817 1.79271088,9.5966852 C1.60156835,9.42817154 1.36248734,9.13929122 1.07607843,8.73004423 C0.768784569,8.29302108 0.516146412,7.78624634 0.318225138,7.20848611 C0.10625826,6.58443089 0,5.98012824 0,5.39508448 C0,4.72491966 0.143265449,4.14691246 0.430223779,3.66254436 C0.655747753,3.27348231 0.95577463,2.96657794 1.33128135,2.741276 C1.7067884,2.5159744 2.11252395,2.40116309 2.54946532,2.39381747 C2.78854616,2.39381747 3.10206932,2.4685683 3.49168279,2.61547747 C3.88019717,2.76288041 4.12965984,2.83763124 4.23903239,2.83763124 C4.32080237,2.83763124 4.59792879,2.75022632 5.06772465,2.57597259 C5.51199426,2.41437252 5.8869514,2.34746073 6.19412323,2.37381793 C7.02647964,2.44171717 7.65181554,2.77337386 8.06768841,3.37088657 C7.32327005,3.82679875 6.95503016,4.46535956 6.96235824,5.28453219 C6.96907574,5.92259915 7.19808051,6.45357061 7.64815137,6.87516306 C7.85211823,7.07083581 8.07990191,7.22206583 8.33333333,7.32947011 C8.27837293,7.49057625 8.22035837,7.64489261 8.15867955,7.79303628 Z M6.24969529,0.200056937 C6.24969529,0.700171112 6.06893385,1.1671263 5.70863312,1.59933517 C5.27382892,2.11314698 4.74791191,2.41005142 4.17759808,2.36320108 C4.17033108,2.30320281 4.16611733,2.2400567 4.16611733,2.17370077 C4.16611733,1.69359169 4.37289352,1.17978013 4.74009533,0.759669384 C4.92342102,0.546959957 5.15657854,0.370094946 5.43932328,0.229006375 C5.7214572,0.0900229289 5.98832429,0.0131620901 6.23931338,0 C6.24664204,0.0668574523 6.24969529,0.133719112 6.24969529,0.200050451 L6.24969529,0.200056937 Z" id="path4"></path>
            </g>
        </g>
    </g>
</svg>`,

    iconUrlPay: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/applePay_btn_default_abc_POC%401x.svg',
    iconUrlPayHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/applePay_btn_hover_abc_POC%401x.svg',
    iconUrlPaySelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/applePay_btn_selected_abc_POC%401x.svg',
    iconUrlChip: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_default_POC%401x.svg',
    iconUrlChipHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_hover_POC%401x.svg',
    iconUrlChipSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/chip_btn_selected_POC%401x.svg',
    iconUrlCal: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_default_abc_POC%401x.svg',
    iconUrlCalHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_hover_abc_POC%401x.svg',
    iconUrlCalSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/cal_btn_selected_abc_POC%401x.svg',
    iconUrlLoc: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_default_abc_POC%401x.svg',
    iconUrlLocHover: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_hover_abc_POC%401x.svg',
    iconUrlLocSelected: 'https://raw.githubusercontent.com/chilipeppr/sample-rcs-plugin/4b9b71a93983ed065e76a7939bc5995ab4157c67/loc_btn_selected_abc_POC%401x.svg',


    // The Zipwhip Plugin Bootstrapper calls this method.
    onLoad: function() {

        // Register
        zw.plugin.register(this.id, this.settings, this);

        zw.plugin.addCss(
`.` + this.id + `-convlistitem-abctag {
padding-right: 26px;
font-family: "proxima-nova",apple-system,BlinkMacSystemFont,"Segoe UI","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;
}
.plugin-abc-bubble .message-bubble_bubbleContainer.message-bubble_bubbleContainer_read {
background-color: #848E99;
}
.plugin-abc-bubble .message-bubble_bubbleContainer.message-bubble_bubbleContainer_unread {
background-color: #2C2C2E;
}
.plugin-abc-bubble .zk-button-primary:disabled {
background-color: #C5C9CD;
}
.topregion-abc-iconurl {
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
    opacity: 0.5;
    margin-right: 8px;
}
.plugin-abc-leftlinedivider {
    border-left: 1px solid gray;
    padding-left: 10px;
}
`, this.id + " plugin css");

        // Listen to events
        zw.plugin.addEventListener(zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD, this.onConvListItemLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.CONVERSATION_LIST_ITEM_MENU_LOAD, this.onConvListItemMenuLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.COMPOSE_BOX_LOAD, this.onComposeBoxLoad.bind(this));
        //zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // Called when a conversation list item loads. We insert our RCS logo on appropriate
    // conversations.
    // var evt = {
    //    itemEl: retItemEl,
    //    contactId: contactId,
    //    phoneNum: phoneNum,
    //    contact: contact,
    //    contacts: contacts,
    //};
    onConvListItemLoad: function(evt) {
        console.log("onConvListItemLoad. evt:", evt);

        // see if they are set for the RCS tag, if so show the logo

        if ('notes' in evt.contact && evt.contact.notes) {

            // see if we can parse json in notes field
            var meta = zw.tryParseJSON(evt.contact.notes);
            if (meta && 'tags' in meta && 'abc' in meta.tags && meta.tags.abc) {

                // We are going to add a tag to each item
                var itemEl = evt.itemEl;
                this.getOrCreateTagSvg(itemEl);
            }
        }

    },

    getOrCreateTagSvg: function(itemEl) {
        // We are going to add a tag to each item

        // Check if it's there already
        var tagEl = itemEl.find('.' + this.id + '-convlistitem-abctag');
        if (tagEl.length > 0) {
            console.log("the abc tag is already there. returning it.");
            return tagEl;
        }

        var lowerRightEl = itemEl.find('.user-card-extension-container');
        tagEl = $('<div class="zk-styled-text-small ' + this.id + '-convlistitem-abctag">' + this.iconTagSvg + '</div>');
        lowerRightEl.append(tagEl);
        return tagEl;
    },

    // Called when the ellipsis menu is shown on a conversation list item.
    // var evt = {
    //    itemEl: itemEl,
    //    itemMenuEl: convItemMenuEl,
    //    contactId: contactId,
    //    phoneNum: phoneNum,
    //};
    onConvListItemMenuLoad: function(evt) {
        console.log("onConvListItemMenuLoad. evt:", evt);

        // Pass in menuEl, id, menuTxt, tooltip
        var menuItemEl = zw.plugin.getOrCreateConvListItemMenu(evt.itemMenuEl, this.id, "Toggle ABC", "Click to artificially set/unset this as an Apple Business Chat conversation.");

        // setup click event. pass in event data that will get passed to click event automagically for us.
        menuItemEl.click({itemEl: evt.itemEl, contactId: evt.contactId, phoneNum: evt.phoneNum}, this.onPretendAbcClick.bind(this));
    },

    // Called after the click on the conv list ellipsis menu item
    onPretendAbcClick: function(evt) {
        console.log("onPretendAbcClick. evt:", evt);

        var that = this;

        // Ajax call to get contact info, so that we can tweak Notes to add our tag
        zw.getContactInfoFromPhoneNum(evt.data.phoneNum, function(contact, conversation, contactId) {
            console.log("got contact info back. contact:", contact);

            console.log("notes:", contact.notes);

            var meta = zw.tryParseJSON(contact.notes);
            if (meta) {
                console.log("got good JSON parse on notes. meta:", meta);

                // see if tags field
                if (!('tags' in meta)) meta.tags = {abc:false};

                // invert
                meta.tags.abc = !meta.tags.abc;

            } else {
                console.log("bad parsing of JSON on notes field. meta:", meta);

                meta = {
                    tags: {
                        abc: true,
                    }
                };

            }

            // Now stick it in DOM, or get a ref if it's already there, and show or hide it
            var convItemEl = evt.data.itemEl; //menuEl.parents('.conversation-list-panel_hover');
            console.log("convItemEl:", convItemEl);
            var abcEl = that.getOrCreateTagSvg(convItemEl); //convItemEl.find('.' + that.id + '-convlistitem-svgtag');
            console.log("abcEl:", abcEl);
            if (meta.tags.abc) {
                abcEl.removeClass("hidden");
            } else {
                abcEl.addClass("hidden");
            }

            // now save it
            contact.notes = JSON.stringify(meta);
            contact.keywords = contact.notes;
            zw.saveContactInfo(contact, function(data) {
                console.log("got ajax callback on saveContactInfo. data:", data);
            });

        });

    },

    btnPayEl: null, // holds element ref to button
    btnChipEl: null,
    btnCalEl: null,
    btnLocEl: null,

    onComposeBoxLoad: function(evt) {

        console.log("onComposeBoxLoad. evt:", evt);

        // remove purple from bubbles
        $('.message-panel_messageContainer').removeClass("plugin-abc-bubble");
        $('.send-message-panel_buttonWrapper > .zk-button.zk-button-primary > div').text("Send");

        // See if this contact is ABC enabled
        if ('contact' in evt && 'notes' in evt.contact && evt.contact.notes) {
            var meta = zw.tryParseJSON(evt.contact.notes);

            if ('tags' in meta && 'abc' in meta.tags && meta.tags.abc) {

                // getOrCreateComposeBoxBtnBarCss: function(id, tooltip, iconUrl, iconUrlHover, iconUrlSel, onClickCallback) {
                this.btnPayEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-pay", "Apple Pay", this.iconUrlPay, this.iconUrlPayHover, this.iconUrlPaySelected, this.onClickPayBtn.bind(this));
                this.btnPayEl.addClass("plugin-abc-leftlinedivider");

                //this.btnChipEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-chip", "Chip List", this.iconUrlChip, this.iconUrlChipHover, this.iconUrlChipSelected, this.onClickChipBtn.bind(this));
                this.btnCalEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-cal", "Calendar Entry", this.iconUrlCal, this.iconUrlCalHover, this.iconUrlCalSelected, this.onClickCalBtn.bind(this));
                this.btnLocEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-loc", "Location Share", this.iconUrlLoc, this.iconUrlLocHover, this.iconUrlLocSelected, this.onClickLocBtn.bind(this));

                // make bubbles purple
                $('.message-panel_messageContainer').addClass("plugin-abc-bubble");
                $('.send-message-panel_buttonWrapper > .zk-button.zk-button-primary > div').text("Send ABC");

            }

        }
    },

    onClickPayBtn: function(evt) {
        console.log("onClickPayBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-pay-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-pay', "Apple Pay Widget", this.iconUrlPay, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("ABC Apple Pay - Coming soon. Lets you accept payments via Apple Pay.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickPayBtn.bind(this));
            // make icon bigger
            regionEl.find('.topregion-iconurl').addClass('topregion-abc-iconurl');
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnPayEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnPayEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickChipBtn: function(evt) {
        console.log("onClickChipBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-chip-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-chip', "RCS Chip List Widget", this.iconUrlChip, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("RCS Chip List - Coming soon. Lets you create chip lists that will appear on receiver's phone.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickChipBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnChipEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnChipEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickCalBtn: function(evt) {
        console.log("onClickCalBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-cal-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-cal', "ABC Calendar Widget", this.iconUrlCal, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("ABC Calendar Entry - Coming soon. Lets you send calendar invites.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickCalBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnCalEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnCalEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

    onClickLocBtn: function(evt) {
        console.log("onClickLocBtn. evt:", evt);

        var regionEl = $('.' + this.id + '-loc-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '-loc', "Location Share Widget", this.iconUrlLoc, "hidden");
            regionEl.find('.plugin-composebox-topregion-body').text("ABC Location Share - Coming soon. Lets you send your map location.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickLocBtn.bind(this));
        }

        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnLocEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnLocEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

}

// A plugin would provide an object like this:
var pluginLangTranslator = {

    // The ID should be camel case, prefixed with your company name/initials, and be a short
    // name for this plugin. It gets pre-pended to a lot of HTML element class names, CSS styles,
    // data attributes, etc. throughout the Zipwhip app. So this name is important.
    // Example: AuthviaPayments, ZwSuggReply, ZwSentiment, ZwNpsSurvey, SenseforthCreditUnion
    id: "ZwLangTrans", // This gets prepended to all CSS styles and class names so not to clobber other plugins

    settings: {
        name: "Language Translator",
        description: "You can translate language on your text messages automatically in the Zipwhip cloud as well as see a preview of the translation in many of the Zipwhip front-end apps.",
    },

    iconBaseSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)"><g transform="translate(0,-488)"><path d="m272.53 56.558v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/></g><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029"/></g></g></svg>',
    iconHoverSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)" fill="#549ed1"><path d="m272.53-431.44v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g></g></svg>',
    iconToggleSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)"><path d="m6.9779-80.034 186.59 1.1614 39.68 31.163-4.2583-175.95h-223.17z" fill="#c2def2"/><path d="m281.06-424.18-1.5485 174.2 39.68-29.615 184.46-0.77424v-142.27z" fill="#c2def2"/><g fill="#549ed1"><path d="m272.53-431.44v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g></g></g></svg>',
    iconTopRegionSvg: '<svg width="18" height="18" viewBox="0 0 24 24"><g fill="#b6bbc3" transform="matrix(.046649 0 0 .046649 .071778 22.966)"><g transform="translate(0,-488)"><path d="m272.53 56.558v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/></g><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029"/></g></g></svg>',

    langList: [{"pretty":"Arabic","short":"ar"},{"pretty":"Bulgarian","short":"bg"},{"pretty":"Bangla","short":"bn"},{"pretty":"Bosnian","short":"bs"},{"pretty":"Catalan","short":"ca"},{"pretty":"Czech","short":"cs"},{"pretty":"Welsh","short":"cy"},{"pretty":"Danish","short":"da"},{"pretty":"German","short":"de"},{"pretty":"Greek","short":"el"},{"pretty":"English","short":"en"},{"pretty":"Spanish","short":"es"},{"pretty":"Estonian","short":"et"},{"pretty":"Persian","short":"fa"},{"pretty":"Finnish","short":"fi"},{"pretty":"Filipino","short":"fil"},{"pretty":"Fijian","short":"fj"},{"pretty":"French","short":"fr"},{"pretty":"Hebrew","short":"he"},{"pretty":"Hindi","short":"hi"},{"pretty":"Croatian","short":"hr"},{"pretty":"Haitian","short":"ht"},{"pretty":"Hungarian","short":"hu"},{"pretty":"Indonesian","short":"id"},{"pretty":"Icelandic","short":"is"},{"pretty":"Italian","short":"it"},{"pretty":"Japanese","short":"ja"},{"pretty":"Korean","short":"ko"},{"pretty":"Lithuanian","short":"lt"},{"pretty":"Latvian","short":"lv"},{"pretty":"Malagasy","short":"mg"},{"pretty":"Maori","short":"mi"},{"pretty":"Malay","short":"ms"},{"pretty":"Maltese","short":"mt"},{"pretty":"Hmong Daw","short":"mww"},{"pretty":"Norwegian","short":"nb"},{"pretty":"Dutch","short":"nl"},{"pretty":"Otomi","short":"otq"},{"pretty":"Polish","short":"pl"},{"pretty":"Portuguese","short":"pt"},{"pretty":"Romanian","short":"ro"},{"pretty":"Russian","short":"ru"},{"pretty":"Slovak","short":"sk"},{"pretty":"Slovenian","short":"sl"},{"pretty":"Samoan","short":"sm"},{"pretty":"Swedish","short":"sv"},{"pretty":"Kiswahili","short":"sw"},{"pretty":"Tamil","short":"ta"},{"pretty":"Telugu","short":"te"},{"pretty":"Thai","short":"th"},{"pretty":"Klingon","short":"tlh"},{"pretty":"Tongan","short":"to"},{"pretty":"Turkish","short":"tr"},{"pretty":"Tahitian","short":"ty"},{"pretty":"Ukrainian","short":"uk"},{"pretty":"Urdu","short":"ur"},{"pretty":"Vietnamese","short":"vi"},{"pretty":"Yucatec Maya","short":"yua"},{"pretty":"Cantonese","short":"yue"},{"pretty":"Serbian (Cyrillic)","short":"sr-Cyrl"},{"pretty":"Serbian (Latin)","short":"sr-Latn"},{"pretty":"Chinese (Simplified)","short":"zh-Hans"},{"pretty":"Chinese (Traditional)","short":"zh-Hant"}],

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

        zw.plugin.addCss("." + this.id + `-composebox-topregion-body {
flex-direction: row;
display: flex;
width: 100%;
}
.` + this.id + `-translatedtext {
flex-grow: 1;
}
.plugin-select-airy {
border: 0px;
background: transparent;
}
`);
        zw.plugin.addCssUrl();

        // listen to events
        zw.plugin.addEventListener(zw.plugin.events.COMPOSE_BOX_LOAD, this.onComposeBoxLoad.bind(this));
        zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // The code below in this plugin is any name you want to use. Consider making these private methods/props.

    // We are called when the Compose Box is loaded. In the event object we are given
    // the current Conversation object which has a ConversationId and Contacts array
    // with ContactId's.
    // This is called each time a conversation is changed.
    /*
       composeTextAreaEl: composeTextAreaEl,
       composeBoxBtnBarPluginEl: composeBoxBtnBarPluginEl,
       composeTopRegionPluginEl: composeTopRegionPluginEl,
       phoneObj: newPhoneObj,
       phone: newPhone,
       oldPhone: oldPhone,
       conversation: conversation,
       contactId: contactId
    */
    onComposeBoxLoad: function(evt) {
        console.log("Got plugin onComposeBoxLoad. evt:", evt);

        // store the textarea for now in this plugin obj so we can retrieve it later
        this.composeBoxTextAreaEl = evt.composeTextAreaEl;

        // Let's get our user settings first.
        var that = this;
        this.ajaxGetSettingsPerContactId(evt.contactId, function(settings) {
            console.log("got back from ajax call getting settings for this contactId. settings:", settings);

            // see if null. if so then we know the defaults of english and auto
            if (settings == null) {
                settings = {
                    locale: 'English',
                    state: 'Auto'
                }
            }

            // Create a full-blown object with all of our info and settings so we can
            // use it downstream as we create the UI
            var loadEvtObj = evt;
            loadEvtObj.langSettings = settings;

            // Setup my Compose Box Button Bar. Lazy load since we don't really know what final
            // scope our button will have, meaning will it be re-created each time? We don't know
            // as it will have a lifecyle based on React, so if we just lazy load then we're pretty
            // safe regardless of how the final implementation comes out. Another way of looking at
            // it is as long as we getOrCreateComposeBoxBtnBar() each time the compose box loads, that method
            // provided to us by core Zipwhip, will always ensure the button is there.
            // getOrCreateComposeBoxBtnBar: function(id, tooltip, iconBaseSvg, iconHoverSvg, iconToggleSvg, onClickCallback)
            var btnEl = zw.plugin.getOrCreateComposeBoxBtnBar(that.id, that.settings.name, that.iconBaseSvg, that.iconHoverSvg, that.iconToggleSvg, that.onComposeBoxBtnClick.bind(that))

            // Make sure toggle is turned off. It may have been left on from prior conversation.
            //this.btnToggleOff();

            // Setup my Compose Box Top Region
            // This just lazy loads stuff, so we'll call this from other paths as well
            that.getOrCreateTopRegion(loadEvtObj);

            // Setup my keypress event
            that.setupKeypress(loadEvtObj);

            // Load the settings / wipe old ones if they are there
            //this.ensureSettingsForThisContactId(evt.contactId, evt.phone);

            // see if this was manually shown by the user before, which we treat as a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            var stickyShow = localStorage.getItem(that.id + "-sticky-show");
            if (stickyShow == "on") {
                console.log("sticky was on, so showing.");
                that.show();
            }

            // setup close button
            that.setupCloseBtn();
        });
    },

    // Setup the close button to hide
    setupCloseBtn: function() {
        var btnEl = $('.plugin-composebox-topregion-close button');
        console.log("setupCloseBtn. btnEl:", btnEl);

        var that = this;
        btnEl.click(function() {

            that.hide();

            // since this was manually unshown by the user, let's do a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            localStorage.setItem(that.id + "-sticky-show", "off");
            console.log("sticky setting storing off");
        });
    },

    // NOT USING THIS METHOD ANYMORE
    // This method makes sure the settings are correctly setup for this contactId since
    // we may have no settings in the Top Region yet, or we have old ones from a prior
    // conversation, or we may have not had all of our elements loaded when the settings got
    // applied.
    // Pass in the isOverride if you want to force the reading of the settings from the cloud
    // as opposed to the default behavior of debouncing out of this method in case it's called
    // multiple times due to lifecyle issues from React
    ensureSettingsForThisContactId: function(contactId, contactPhone, isOverride) {

        console.log("ensureSettingsForThisContactId. contactId:", contactId);

        //var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, this.iconTopRegionSvg);
        var regionEl = pluginEl.find("." + this.id + "-composebox-topregion");

        // see if any settings exist, are same, or different
        var dataContactId = regionEl.attr('data-contactid');

        // does the contactId equal our special val of "loading" meaning something timed out during
        // the ajax call and we never really ended up with any settings
        if (dataContactId == "loading") {
            console.log("uh oh, we are seeing our special loading value");
        }

        // are they the same?
        if (dataContactId == contactId && !isOverride) {
            console.log("contactId is same as data-contactId. ensured. returning.");
            return;
        }

        // see if something exists, if so it has to be old, cuz can't be same contactId at this point
        if (dataContactId != null) {
            console.log("data-contactId does not match current contactId. data-contactId:", dataContactId);

            regionEl.removeAttr('data-contactid');
            regionEl.removeAttr('data-contactphone');
            regionEl.removeAttr('data-locale');
            regionEl.removeAttr('data-state');
        }

        // if we made it here, we need to Ajax load our settings for this contactId
        // let the DOM know we're loading so we have a breadcrumb in case Ajax call fails
        regionEl.attr('data-contactId', "loading");

        var that = this;
        this.ajaxGetSettingsPerContactId(contactId, function(settings) {
            console.log("got back from ajax call getting settings for this contactId. settings:", settings);

            // see if null. if so then we know the defaults of english and auto
            if (settings == null) {
                settings = {
                    locale: 'English',
                    state: 'Auto'
                }
            }

            // set the settings into the DOM so we know based on lifecycle if we
            // already have the DOM set for this contactId, so we don't have to query ajax call again
            regionEl.attr('data-contactid', contactId);
            regionEl.attr('data-contactphone', contactPhone);
            regionEl.attr('data-locale', settings.locale);
            regionEl.attr('data-state', settings.state);

            var selEl = regionEl.find("." + that.id + "-langselect");
            selEl.val(settings.locale);
            var selStateEl = regionEl.find("." + that.id + "-transonoffauto");
            selStateEl.val(settings.state);
            //selStateEl.val("Off");

            selEl.change();

            //regionEl.attr('title', "Settings set for contactId: " + contactId);
            var iconEl = regionEl.find(".iconSvg");
            iconEl.attr('title', "Settings set for phone: " + contactPhone);

            // Put human readable description of setting state for this
            var desc = "";
            if (settings.state == "Auto" && settings.locale == "English") {
                desc = "Not translating, but will auto-detect if incoming texts from " + contactPhone + " need translated.";
            }
            if (settings.state == "On") {
                desc = "Translating to/from " + settings.locale + " for " + contactPhone + " on all inbound and outbound texts.";
            }
            if (settings.state == "Off") {
                desc = "Translation off. Will not auto-detect for " + contactPhone + " until you set back to Auto.";
            }
            var bodyEl = $("." + that.id + "-translatedtext");
            //bodyEl.html('<span style="color:silver;font-size:8px;">For phone: ' + contactPhone + '</span>');
            bodyEl.html('<span style="color:silver;font-size:12px;">' + desc + '</span>');
        });

    },

    // This is called when the compose box button bar button is clicked
    // We now store this as a stick setting so we carry thru the lang plugin
    // being shown across conversations if you chose to turn it on
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

            // since this was manually shown by the user, let's do a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            localStorage.setItem(this.id + "-sticky-show", "on");
            console.log("sticky setting storing on");
        } else {
            // it is not hidden, let's hide the Top Region and toggle off
            console.log("we are toggling the Top Region to off");
            iconToggleEl.addClass("hidden");
            buttonEl.find(".iconHoverSvg").removeClass("hidden"); // show the hover icon
            this.onTopRegionHide();

            // since this was manually unshown by the user, let's do a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            localStorage.setItem(this.id + "-sticky-show", "off");
            console.log("sticky setting storing off");
        }
    },

    // Programmatically show the top region for this plugin
    show: function() {
        this.onTopRegionShow();
        this.btnToggleOn();
    },

    // Programmatically hide the top region for this plugin
    hide: function() {
        this.onTopRegionHide();
        this.btnToggleOff();
    },

    btnToggle: function() {
    },

    btnToggleOn: function() {
        var buttonEl = $('.' + this.id + '-composebox-btnbar');
        var iconToggleEl = buttonEl.find(".iconToggleSvg");
        buttonEl.find(".iconSvg").addClass("hidden"); // hide all icons first
        iconToggleEl.removeClass("hidden"); // then just show the toggled on icon
    },

    btnToggleOff: function() {
        var buttonEl = $('.' + this.id + '-composebox-btnbar');
        buttonEl.find(".iconSvg").addClass("hidden"); // hide all icons first
        buttonEl.find(".iconBaseSvg").removeClass("hidden"); // show the base icon
    },

    // Lazy load the DOM elements for the Top Region since we don't really know the scope
    // of React. We'll just always make sure the DOM elements exist each time this is called.
    getOrCreateTopRegion: function(loadEvtObj) {

        // Lazy load the DOM elements for the Top Region since we don't really know the scope
        // of React. We'll just always make sure the DOM elements exist each time this is called.
        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, this.iconTopRegionSvg);
        regionEl.addClass("hidden"); // ensure hidden

        // ensure our other DOM elements exist
        var bodyEl = regionEl.find("." + this.id + "-composebox-topregion-body");
        if (bodyEl.length > 0) {
            // element exists, all set
            console.log(this.id + " body of topregion exists");
            return;
        }

        // store our data-contactid since it is our primary key
        regionEl.attr('data-contactid', loadEvtObj.contactId);

        // create element
        bodyEl = $(`
<div class="` + this.id + `-composebox-topregion-body">
<div class="` + this.id + `-translatedtext"></div>
<div class="` + this.id + `-langtools">
<select class="` + this.id + `-langselect plugin-select-airy zk-styled-text-base">
<option value="-">-</option>
</select>
</div>
<div class="` + this.id + `-onoffauto">
<select class="` + this.id + `-transonoffauto plugin-select-airy zk-styled-text-base">
<option>Auto</option>
<option>On</option>
<option>Off</option>
</select>
</div>
</div>
`);
        regionEl.find(".plugin-composebox-topregion-body").append(bodyEl);

        // Get the language list and populate it
        var selEl = regionEl.find("." + this.id + "-langselect");

        // See if the list is already in there
        // NOTE: This should never happen since we now wipe all HTML DOM elements before onComposeBoxLoad event
        if (selEl.hasClass("list-is-populated")) {
            // already populated, we're done
            console.error("lang list already populated.");
        } else {
            console.log("populating our list of languages");
            var list = this.langList;
            selEl.addClass("list-is-populated");
            selEl.html(""); // wipe list
            var listLen = list.length;
            for (var i = 0; i < listLen; i++) {
                var item = list[i];
                //console.log("populating list item:", item);
                selEl.append('<option value="' + item.pretty + '">' + item.pretty + "</option>");
            }

            // Since we now have our settings, we can pick our setting here for the language select box
            selEl.val(loadEvtObj.langSettings.locale);

            // setup this select element to resize as narrow as the selected text so it looks
            // prettier in the menu
            this.resizeWidthOfLanguageSelect();

            // now setup the state select box

            // Get the language list and populate it
            var stateEl = regionEl.find("." + this.id + "-transonoffauto");
            stateEl.val(loadEvtObj.langSettings.state);

            // now attach to change event so we can write the changes to the cloud
            selEl.change(this.onSelectLanguageChange.bind(this));
            stateEl.change(this.onSelectStateChange.bind(this));
            this.bindDropdowns();

            // Put human readable description of setting state for this
            var desc = "";
            var contactPhone = loadEvtObj.phone;
            if (loadEvtObj.phoneObj.isGroup) {
                desc = "This is a group. Translations on outbound texts are based per contact.";
            } else {
                if (loadEvtObj.langSettings.state == "Auto" && loadEvtObj.langSettings.locale == "English") {
                    desc = "Auto-detecting if incoming texts from " + contactPhone + " need translated.";
                }
                if (loadEvtObj.langSettings.state == "On") {
                    desc = "Translating to/from " + loadEvtObj.langSettings.locale + " for " + contactPhone + " on all texts.";
                }
                if (loadEvtObj.langSettings.state == "Off") {
                    desc = "Translation off. Will not auto-detect for " + contactPhone + " until you set back to Auto.";
                }
            }
            var bodyEl = $("." + this.id + "-translatedtext");
            //bodyEl.html('<span style="color:silver;font-size:8px;">For phone: ' + contactPhone + '</span>');
            bodyEl.html('<span style="color:silver;font-size:12px;">' + desc + '</span>');
        }


    },

    // Flag to keep track whether we really want changes in form elements to store settings in cloud
    isBound: false,

    // We need to rebind after we unbind
    // Yes, we're just using a flag for now instead of physically unbind the event callbacks
    bindDropdowns: function() {
        this.isBound = true;
    },

    // We need to unbind in case we write to the form elements programatically
    // and don't want to trigger a change and thus an ajax write
    unbindDropdowns: function() {
        this.isBound = false;
    },

    // This is our callback if the language was changed. We call the main change event
    // but we add a breadcrumb that this was the language pulldown so we know to override
    // the state pulldown based on what was picked
    onSelectLanguageChange: function(evt) {
        this.onSelectLanguageOrStateChange("locale");
    },

    // This is our callback if the state was changed. We call the main change event
    // but we add a breadcrumb that this was the state pulldown so we know to override
    // the locale pulldown based on what was picked
    onSelectStateChange: function(evt) {
        this.onSelectLanguageOrStateChange("state");
    },

    // This method is called when the select element for Language is changed by the user
    // Make sure if programmatically changed we don't get called
    onSelectLanguageOrStateChange: function(fromWhichSelectDropdown) {

        console.log("onSelectLanguageOrStateChange. fromWhichSelectDropdown:", fromWhichSelectDropdown);

        // see if we're bound. if not, return
        if (this.isBound == false) {
            console.log("we are not bound, so exiting change onSelectLanguageOrStateChange");
            return;
        }

        // we need to unbind cuz we'll make changes to the dropdowns and get callbacks here recursively
        // if we don't unbind
        this.unbindDropdowns();

        var selEl = $("." + this.id + "-langselect");
        var stateEl = $("." + this.id + "-transonoffauto");
        console.log("selEl:", selEl, "stateEl:", stateEl);

        // what's our new language/locale val
        var languageSel = selEl.val(); //$(this).val();

        // get our State value too since we'll need it to compare situation
        var state = stateEl.val();

        // if they picked a new language, and the state was Auto, then they just forced it to On
        if (fromWhichSelectDropdown == "locale") {
            if (languageSel != "English" && state == "Auto") {
                // set state select value to On
                state = "On";
            } else if (languageSel != "English" && state == "Off") {
                state = "On";
            }
        } else {
            // it was from the state pulldown
            if (state == "Auto") {
                languageSel = "English";
            } else if (state == "Off") {
                languageSel = "English";
            }
        }

        // reset the value of the lang select box and state box
        selEl.val(languageSel);
        stateEl.val(state);

        // Get ref to our top region so we can query stuff
        var regionEl = $('.' + this.id + '-composebox-topregion');

        // we seem to be getting called a bunch here, so debounce if the val is the same as before
        /* var currentLang = regionEl.attr('data-locale');
        if (currentLang == languageSel) {
            console.log("nothing changed on the lang select change() event, so returning...");
            return;
        } */

        // resize the width of the main select element so it looks pretty
        this.resizeWidthOfLanguageSelect();

        // Show a saving... msg
        var innerBodyEl = $("." + this.id + "-translatedtext");
        //bodyEl.html('<span style="color:silver;font-size:8px;">For phone: ' + contactPhone + '</span>');
        innerBodyEl.html('<span style="color:silver;font-size:12px;">' + "Saving new language " + languageSel + ' and state ' + state + '...</span>');


        // now let's store this new setting
        var contactId = regionEl.attr('data-contactid');
        var settings = {
            contact_id: contactId,
            locale: languageSel,
            state: state,
        };

        // call ajax to store settings
        this.ajaxSetSettingsPerContactId(contactId, languageSel, state, function() {
            console.log("done writing settings to cloud.");
            //var contactPhone = regionEl.attr('data-contactphone');
            //that.ensureSettingsForThisContactId(contactId, contactPhone, true); // trigger override
        });

        this.bindDropdowns();
    },

    // Write change programmatically to language select box
    changeLanguageVal: function(newLang) {

        var selEl = $("." + this.id + "-langselect");
        if (selEl.val() == newLang) {
            console.log("u asked me to change the language val, but newLang == oldLang. newLang:", newLang, "oldLang:", selEl.val());
            return;
        }

        // we need to unbind cuz we'll make changes to the dropdowns and get callbacks here recursively
        // if we don't unbind
        this.unbindDropdowns();

        selEl.val(newLang);

        this.bindDropdowns();
    },

    // Write change programmatically to state select box
    changeStateVal: function(newState) {
        // we need to unbind cuz we'll make changes to the dropdowns and get callbacks here recursively
        // if we don't unbind
        this.unbindDropdowns();

        var stateEl = $("." + this.id + "-transonoffauto");
        stateEl.val(newState);

        this.bindDropdowns();
    },

    // This just prettifies the select item so it's as narrow of a width as it can be. Sadly there's no CSS
    // that does this for us automatically. Could/should move to more of a Bootstrap style menu to avoid this.
    resizeWidthOfLanguageSelect: function() {

        // Get ref to element of our top region so we can query stuff
        var regionEl = $('.' + this.id + '-composebox-topregion');

        // Get ref to element of our language select dropdown
        var selEl = regionEl.find('.' + this.id + '-langselect');

        // what's our new val
        var languageSel = selEl.val();

        // resize the width of the main select element so it looks pretty
        console.log("inside language select resize. text for width:", languageSel);
        var width = this.getTextWidthDOM(languageSel, '14px "proxima-nova",apple-system,BlinkMacSystemFont,"Segoe UI","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;');
        width += 20; // add room for triangle
        console.log("width resizing to:", width);
        selEl.width(width);

    },

    getTextWidthCanvas: function(text, font) {
        // re-use canvas object for better performance
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        console.log("canvas metrics:", metrics);
        return metrics.width;
    },

    getTextWidthDOM: function(text, font) {
        var f = font || '14px arial';
        var o = $('<span>' + text + '</span>')
        .css({'font': f, 'float': 'left', 'white-space': 'nowrap'})
        .css({'visibility': 'hidden'})
        .appendTo($('body'));
        var w = o.width();
        o.remove();
        return w;
    },

    // This is called when user clicks button to show, or when keypress triggers a show
    onTopRegionShow: function() {
        console.log(this.id + " onTopRegionshow");

        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, this.iconTopRegionSvg);
        //var regionEl = pluginEl.find("." + this.id + "-composebox-topregion");

        // Now ensure the body contents are loaded. If this is the first time in, we just will have empty DOM items
        // and they will populate before your eyes. Other times you'll see everything ready to go cuz loaded already.
        this.getOrCreateTopRegion();

        regionEl.removeClass("hidden"); // ensure not hidden

    },

    // This is called when user clicks button to hide, or when onblur triggers a hide
    onTopRegionHide: function() {
        console.log(this.id + " onTopRegionHide");

        // It's almost certain we'll just get back the previously created item here because we
        // would never get the hide event without it
        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, this.iconTopRegionSvg);

        // hide via CSS
        regionEl.addClass("hidden");

    },

    // We are called when the Side Panel is loaded. In the event object we are given
    // the current Conversation object which has a ConversationId and Contacts array
    // with ContactId's
    onSidePanelLoad: function(evt) {
        console.log("Got plugin onSidePanelLoad. evt:", evt);
    },

    // Ajax calls to the back-end of this plugin

    // Decided to hard code the lang list. so, no longer need this Ajax call
    // Ajax call to get language list
    // http://178.128.129.151:8080/function/translate/langList
    // [{"pretty":"Arabic","short":"ar"},{"pretty":"Bulgarian","short":"bg"},{"pretty":"Bangla","short":"bn"},{"pretty":"Bosnian","short":"bs"},{"pretty":"Catalan","short":"ca"},{"pretty":"Czech","short":"cs"},{"pretty":"Welsh","short":"cy"},{"pretty":"Danish","short":"da"},{"pretty":"German","short":"de"},{"pretty":"Greek","short":"el"},{"pretty":"English","short":"en"},{"pretty":"Spanish","short":"es"},{"pretty":"Estonian","short":"et"},{"pretty":"Persian","short":"fa"},{"pretty":"Finnish","short":"fi"},{"pretty":"Filipino","short":"fil"},{"pretty":"Fijian","short":"fj"},{"pretty":"French","short":"fr"},{"pretty":"Hebrew","short":"he"},{"pretty":"Hindi","short":"hi"},{"pretty":"Croatian","short":"hr"},{"pretty":"Haitian","short":"ht"},{"pretty":"Hungarian","short":"hu"},{"pretty":"Indonesian","short":"id"},{"pretty":"Icelandic","short":"is"},{"pretty":"Italian","short":"it"},{"pretty":"Japanese","short":"ja"},{"pretty":"Korean","short":"ko"},{"pretty":"Lithuanian","short":"lt"},{"pretty":"Latvian","short":"lv"},{"pretty":"Malagasy","short":"mg"},{"pretty":"Maori","short":"mi"},{"pretty":"Malay","short":"ms"},{"pretty":"Maltese","short":"mt"},{"pretty":"Hmong Daw","short":"mww"},{"pretty":"Norwegian","short":"nb"},{"pretty":"Dutch","short":"nl"},{"pretty":"Otomi","short":"otq"},{"pretty":"Polish","short":"pl"},{"pretty":"Portuguese","short":"pt"},{"pretty":"Romanian","short":"ro"},{"pretty":"Russian","short":"ru"},{"pretty":"Slovak","short":"sk"},{"pretty":"Slovenian","short":"sl"},{"pretty":"Samoan","short":"sm"},{"pretty":"Swedish","short":"sv"},{"pretty":"Kiswahili","short":"sw"},{"pretty":"Tamil","short":"ta"},{"pretty":"Telugu","short":"te"},{"pretty":"Thai","short":"th"},{"pretty":"Klingon","short":"tlh"},{"pretty":"Tongan","short":"to"},{"pretty":"Turkish","short":"tr"},{"pretty":"Tahitian","short":"ty"},{"pretty":"Ukrainian","short":"uk"},{"pretty":"Urdu","short":"ur"},{"pretty":"Vietnamese","short":"vi"},{"pretty":"Yucatec Maya","short":"yua"},{"pretty":"Cantonese","short":"yue"},{"pretty":"Serbian (Cyrillic)","short":"sr-Cyrl"},{"pretty":"Serbian (Latin)","short":"sr-Latn"},{"pretty":"Chinese (Simplified)","short":"zh-Hans"},{"pretty":"Chinese (Traditional)","short":"zh-Hant"}]
    // Since this list rarely changes, we'll just cache it per browser in-memory session
    cacheLangList: null, // Store cached list here
    ajaxGetLangList: function(callback) {

        console.log("ajaxGetLangList");

        // see if we have a cached list
        if (this.cacheLangList != null) {
            // we have a list, return it
            callback(this.cacheLangList);
        }

        // since using GET for now to solve https issues, build GET url
        var url = "http://178.128.129.151:8080/function/translate/langList";
        console.log("url to call:", url);

        // do ajax query and get results. based on the results i'll render shit.
        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                this.cacheLangList = data;
                callback(this.cacheLangList);
            },
            error: function(errMsg) {
                console.log("got err on ajax. err:", errMsg);
                callback(null);
            }
        });

    },

    // Ajax call to get user settings specific to this contactId, as the language
    // translation settings are unique to each conversation the Zipwhip user has
    // with each contact.
    // http://178.128.129.151:8080/function/translate/get?line=%2B15035751700&contactId=1&session=98fe
    // {"contact_id":1,"locale":"English","state":"Auto"}
    ajaxGetSettingsPerContactId: function(contactId, callback) {

        console.log("ajaxGetSettingsPerContactId");

        // see if we have a cached list
        if (this.cacheLangList != null) {
            // we have a list, return it
            callback(this.cacheLangList);
        }

        // since using GET for now to solve https issues, build GET url
        var line = encodeURIComponent(zw.getLine());
        console.log("line:", line);
        var session = encodeURIComponent(zw.getSessionKey());
        var url = "http://178.128.129.151:8080/function/translate/get?line=" + line + "&contactId=" + contactId + "&session=" + session;
        console.log("url to call:", url);

        // do ajax query and get results.
        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                callback(data);
            },
            error: function(errMsg) {
                console.log("got err on ajax. err:", errMsg);
                callback(null);
            }
        });

    },

    // Ajax call to set user settings specific to this contactId, as the language
    // translation settings are unique to each conversation the Zipwhip user has
    // with each contact.
    // http://178.128.129.151:8080/function/translate/get?line=%2B15035751700&contactId=2&lang=English&state=Auto&session=98fe
    // Returns (which doesn't really matter, since it's a regurgitation):
    // {"contact_id":1,"locale":"English","state":"Auto"}
    ajaxSetSettingsPerContactId: function(contactId, locale, state, callback) {

        console.log("ajaxSetSettingsPerContactId");

        // see if we have a cached list
        if (this.cacheLangList != null) {
            // we have a list, return it
            callback(this.cacheLangList);
        }

        // since using GET for now to solve https issues, build GET url
        var line = encodeURIComponent(zw.getLine());
        console.log("line:", line);
        var session = encodeURIComponent(zw.getSessionKey());
        var url = "http://178.128.129.151:8080/function/translate/set?line=" + line + "&contactId=" + contactId + "&locale=" + locale + "&state=" + state + "&session=" + session;
        console.log("url to call:", url);

        // do ajax query and get results.
        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                callback(data);
            },
            error: function(errMsg) {
                console.log("got err on ajax. err:", errMsg);
                callback(null);
            }
        });

    },

    // Attach a keypress event to the textarea. Make sure we don't attach
    // too many times due to lifecyle issues.
    setupKeypress: function(evt) {

        console.log("setupKeypress. evt:", evt);

        // see if we have previously attached our keypress event.
        // we can do this because we leave a breadcrumb that we bound data
        if (evt.composeTextAreaEl.attr('isboundtolangtranslate') == "yes") {
            // it's already bound
            console.log("textarea keypress event already bound. returning...");
            return;
        }

        // leave breadcrumb that we bound it
        evt.composeTextAreaEl.attr('isboundtolangtranslate', "yes");
        evt.composeTextAreaEl.on("input propertychange", this.onKeypress.bind(this));
    },

    onKeypress: function(evt) {
        console.log("onKeypress", evt);

        var regionEl = zw.plugin.getOrCreateComposeBoxTopRegion(this.id, this.settings.description, this.iconTopRegionSvg);
        //var regionEl = $("." + this.id + "-composebox-topregion");

        var composeBoxTextAreaEl = this.composeBoxTextAreaEl;

        // see if any settings exist, are same, or different
        var dataContactId = regionEl.attr('data-contactid');
        console.log("data-contactid:", dataContactId);

        // get body content of compose box
        console.log("composeBoxTextAreaEl:", composeBoxTextAreaEl);
        console.log("val of textarea:", composeBoxTextAreaEl.val());

        //var myData = {
        //    body: this.composeBoxTextAreaEl.val()
        //}

        var innerBodyEl = $("." + this.id + "-translatedtext");

        // debounce if i don't really have a value
        var val = composeBoxTextAreaEl.val();
        if (val.length == 0) {
            console.log("val was empty");
            innerBodyEl.text("");
            return;
        }

        // since using GET for now to solve https issues, build GET url
        var url = "";
        var param = "http://178.128.129.151:8080/function/translate/keypress?";
        param = param + "line=" + encodeURIComponent(zw.getLine());
        param = param + "&body=" + encodeURIComponent(composeBoxTextAreaEl.val());
        param = param + "&contactId=" + encodeURIComponent(dataContactId);
        param = param + "&session=" + encodeURIComponent(zw.getSessionKey());

        // may need to urlencode
        url = param; //url + param;
        console.log("url to call:", url);

        var that = this;
        // do ajax query and get results. based on the results i'll render shit.
        $.ajax({
            type: "GET",
            url: url,
            // The key needs to match your method's input parameter (case-sensitive).
            // data: JSON.stringify(myData),
            // contentType: "application/json; charset=utf-8",
            // dataType: "json",
            success: function(data) {
                console.log("got success on ajax call. data:", data);

                var json = data;

                if (json.update && json.update.length > 0) {
                    that.btnToggleOn();
                    that.onTopRegionShow();
                    innerBodyEl.html(json.update);
                } else {
                    console.log("error trying to find update translated text");
                }

                // we get the language back as well in this call. we may need to update our UI
                if (json.locale) {
                    that.changeLanguageVal(json.locale);
                }
            },
            failure: function(errMsg) {
                console.log("got err on ajax. err:", errMsg);
            }
        });

        // test call
        //obj.onAjaxCallback('{"update":"¡Hola! ¡John!","lang":"Spanish"}');
    }

}

// This is a second plugin being loaded at the same time and following same design pattern
// This plugin is for Authvia's Text Payments
var pluginAuthvia = {

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

var obj = {

    // contains the reference to the DOM element for the compose box textarea
    composeBoxTextAreaEl: null, // gets set when compose box loaded
    // contains contactId of currently selected conversation
    currentContactId: null, // null when no conversation selected yet
    // when compose box gets loaded
    onComposeBoxLoad: function(el) {
        console.log("got onComposeBoxLoad. el:", el);

        // we have to set our currentContactId for the selected conversation.
        // this is a slow async process as we can find the phone number of the contact in the DOM
        // but then have to populate our cached variable
        this.currentContactId = null;

        var that = this;

        zw.getCurrentConversationContactId(function(contactId) {
            obj.currentContactId = contactId;

        });

        this.composeBoxTextAreaEl = el;

        // let's show a region above the compose box
        var mainEl = el.parents('.zw-default-div-style.compose-box-new');

        var divEl = $('<div class="plugin-compose-box-top-region zk-styled-text-base"></div>');
        //divEl.click(this.onTopRegionClick.bind(this));
        this.composeBoxTopRegionEl = divEl;

        mainEl.parent().prepend(divEl);
        console.log("prepended compose top region");

        // let's get our global data
        //var user = pendo.validateInstall();
        //console.log("user:", user);
    },
    onComposeBoxUnload: function() {
    },

    // contains the reference to the DOM element for the compose box top region
    composeBoxTopRegionEl: null, // gets set when created
    // event called when Top Region is clicked
    onTopRegionClick: function(evt) {
        console.log("got click on top region. evt:", evt);

    },
    // when keypress occurs in compose box textarea
    onComposeBoxKeypress: function(evt) {
        console.log("got onComposeBoxKeypress. evt:", evt);

        // get body content of compose box
        console.log("composeBoxTextAreaEl:", this.composeBoxTextAreaEl);
        console.log("val of textarea:", this.composeBoxTextAreaEl.val());

        //var myData = {
        //    body: this.composeBoxTextAreaEl.val()
        //}

        // debounce if i don't really have a value
        var val = this.composeBoxTextAreaEl.val();
        if (val.length == 0) {
            console.log("val was empty");
            return;
        }

        // since using GET for now to solve https issues, build GET url
        var url = "https://i2dcui.appspot.com/slingshot?url=";
        var param = "http://178.128.129.151:8080/function/translate/keypress?";
        param = param + "line=+12065823770&";
        param = param + "body=" + encodeURIComponent(this.composeBoxTextAreaEl.val()); // may need to urlencode
        //param = param + "body=" + this.composeBoxTextAreaEl.val(); // may need to urlencode
        //param = encodeURIComponent(param);
        url = param; //url + param;
        console.log("url to call:", url);

        // do ajax query and get results. based on the results i'll render shit.
        $.ajax({
            type: "GET",
            url: url,
            // The key needs to match your method's input parameter (case-sensitive).
            // data: JSON.stringify(myData),
            // contentType: "application/json; charset=utf-8",
            // dataType: "json",
            success: function(data) {
                obj.onAjaxCallback(data);
            },
            failure: function(errMsg) {
                console.log("got err on ajax. err:", errMsg);
            }
        });

        // test call
        //obj.onAjaxCallback('{"update":"¡Hola! ¡John!","lang":"Spanish"}');

    },
    // Gets called when onKeypress ajax callback succeeds
    onAjaxCallback: function(data) {
        console.log("got success on ajax call. data:", data);

        // will get back JSON like {"update":"¡Hola! ¡John!","lang":"Spanish"}
        //if (data.match(/^{/) && data.match(/}$/) ) {
        //    console.log("looks like json");
        //    var json = JSON.parse(data);
        //    console.log("json:", json);

        var json = data;

        if (json.update && json.update.length > 0) {
            this.composeBoxTopRegionEl.text(json.update);
        } else {
            console.log("error trying to find update translated text");
        }
        //}
    },
}

// This is the object that eventually Zipwhip core engineering should expose to us
// These are methods we will need for our plugins to function
var zw = {

    // Returns the sessionkey currently in use
    getSessionKey: function() {

        return this.getCookie("zw-session");

    },
    // Return the username@line of the user logged in
    getUsernameAtLine: function() {

        return this.getCookie("identity");

    },
    // Return the line of the user logged in
    getLine: function() {

        var userAtLine = this.getUsernameAtLine();
        if (userAtLine.match(/^.*@(.*)$/) ) {
            return RegExp.$1;
        }
        return null;

    },
    // Gets a cookie by name
    getCookie: function(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    // Gives you current contact id for selected conversation. if no selected convo, return null
    // Async
    getCurrentConversationContactId: function(callback) {

        console.log("looking up contact id of selected convo");
        var el = $('.single-contact-panel_singleContactPanelContainer');
        console.log("parent contact card", el);
        if (el.length == 0) {
            console.log("could not find an open conversation");
            return null;
        }

        var phoneEl = el.find('.zk-styled-text-small.zk-styled-text-primary.zk-styled-text-secondary');
        console.log("phone el:", phoneEl);

        if (phoneEl.length > 0) {
            console.log("found convo");
            var contactPhone = phoneEl.text();
            console.log("contact phone:", contactPhone);

            // now we have to do an ajax lookup to get contactId from contact phone
            this.getContactIdFromContactPhone(contactPhone, function(contactId) {
                console.log("got callback. contactId:", contactId);
                if (callback) callback(contactId);
            });

        } else {
            console.log("could not find phone number");
            return null;
        }
    },

    // Ajax call to get contact info
    getContactInfoFromPhoneNum: function(phone, callback) {

        console.log("getContactInfoFromPhoneNum. phone:", phone);
        phone = phone.replace(/[^0-9+]/g, "");  // swap anything other than numbers and plus sign for emptiness to get clean phone number. don't u love regular expressions!
        console.log("cleaned up phone number", phone);

        var url = "https://app.zipwhip.com/api/v1/conversation/get?address=ptn%3A%2F%2B1" + phone + "&limit=1&start=0";
        var headersObj = {
            authorization: zw.getSessionKey()
        };
        console.log("url to query for contactid:", url, "headers:", headersObj);

        // do ajax query and get results. based on the results i'll render stuff.
        $.ajax({
            type: "GET",
            url: url,
            headers: headersObj,
            success: function(data) {

                console.log("got success from ajax call for getContactIdFromContactPhone. data:", data);

                // now go deep into the object
                /* response: {messages: [,…],…}
conversation: {id: 396472207207, version: 18, deviceId: 366608407, lastUpdated: "2019-12-13T20:26:26+00:00",…}
address: "ptn:/+15035752613"
bcc: null
cc: null
class: "com.zipwhip.website.data.dto.Conversation"
contacts: [{id: 31324856907, version: 1, lastUpdated: "2019-12-13T04:51:56+00:00",…}]
0: {id: 31324856907, version: 1, lastUpdated: "2019-12-13T04:51:56+00:00",…}
id: 31324856907
*/
                if ('response' in data) {

                    console.log("found response in data", data.response);

                    if ('conversation' in data.response && 'contacts' in data.response.conversation && data.response.conversation.contacts.length > 0) {
                        var contacts = data.response.conversation.contacts;
                        console.log("we have a contacts array in the conversation. good.", contacts);

                        if (contacts.length == 1) {
                            var contactId = contacts[0].id;
                            console.log("got contactId:", contactId);

                            // finally do callback
                            // contact, conversation, contactId
                            if (callback) callback(contacts[0], data.response.conversation, contactId);
                        } else {
                            console.error("got back more than one contact id, so treating as error.");
                        }
                    }
                }
            },
            error: function (err) {
                console.log("got error on ajax. err:", err);
            },
            failure: function(err) {
                console.log("got failure on ajax. err:", err);
            }
        });
    },

    // Ajax call to set contact info
    // You should pass in the same contact object as getContactInfoFromPhoneNum() gives you,
    // but with the updated values you want to save
    saveContactInfo: function(contact, callback) {

        console.log("saveContactInfo. contact:", contact);

        //https://app.zipwhip.com/api/v1/contact/save?
        var url = "https://app.zipwhip.com/api/v1/contact/save";
        var headersObj = {
            authorization: zw.getSessionKey()
        };
        let formData = new FormData();
        for (let item in contact) {
            formData.append(item.name, item.value);
        }
        console.log("url:", url, "formData:", formData, "headers:", headersObj);
        //console.log("serialize:", $(formData).serialize());

        // do ajax query and get results. based on the results i'll render stuff.
        $.ajax({
            type: "POST",
            url: url,
            data: contact,
            headers: headersObj,
            success: function(data) {

                console.log("got success from ajax call for saveContactInfo. data:", data);


            },
            error: function (err) {
                console.log("got error on ajax. err:", err);
            },
            failure: function(err) {
                console.log("got failure on ajax. err:", err);
            }
        });
    },

    // Utility function to test parsing of JSON
    tryParseJSON: function(jsonString){
        try {
            var o = JSON.parse(jsonString);

            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object",
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { }

        return false;
    },

    // Global storage of registered plugins
    pluginsRegistered: [],

    // The plugin object that Zipwhip should expose to give Plugins a way to tap into the Zipwhip lifecyle
    plugin: {

        // A plugin calls this to register itself.
        // @param obj : An object containing at least a key called name {name: "Your Plugin Name", description: "Your desc" }
        register: function(id, settings, obj) {

            // For now just store the name in the pluginsArr
            zw.pluginsRegistered[id] = obj;
        },

        // A plugin calls this to add CSS globally to the DOM.
        // @param cssStr : A string containing the CSS you want to add to the DOM
        // @return nothing
        addCss: function(cssStr, desc) {

            // add CSS to head of HTML
            $('head').append(
                '<style type="text/css">' +
                cssStr +
                '</style>'
            );
            console.log("appended " + desc + " plugin CSS to head of doc");
        },

        // A plugin calls this to add CSS globally to the DOM via a URL
        // @param cssUrl : A URL containing the CSS you want to add to the DOM
        // @return nothing
        addCssUrl: function(cssUrl) {
            // TODO: Implement
            console.log("TODO: Implement addCssUrl");
        },

        // Event names that a plugin can listen to
        events: {
            COMPOSE_BOX_LOAD: "compose_box_load",
            SIDE_PANEL_LOAD: "side_panel_load",
            CONTROL_PANEL_LOAD: "control_panel_load",
            //CONVERSATION_LIST_CHANGE: "conversation_list_change",
            CONVERSATION_LIST_ITEM_LOAD: "conversation_list_item_load",
            CONVERSATION_LIST_ITEM_MENU_LOAD: "conversation_list_item_menu_load", // the ellipsis menu
        },

        // A plugin calls this to add an event listener
        addEventListener: function(eventName, callback) {
            console.log("addEventListener. eventName:", eventName);
            switch(eventName) {
                case zw.plugin.events.COMPOSE_BOX_LOAD:
                    // Add to our array for callbacks
                    console.log("adding COMPOSE_BOX_LOAD callback listener");
                    zw.plugin.callbacks[zw.plugin.events.COMPOSE_BOX_LOAD].push(callback);
                    break;
                case zw.plugin.events.SIDE_PANEL_LOAD:
                    // Add to our array for callbacks
                    console.log("adding SIDE_PANEL_LOAD callback listener");
                    zw.plugin.callbacks[zw.plugin.events.SIDE_PANEL_LOAD].push(callback);
                    break;
                case zw.plugin.events.CONTROL_PANEL_LOAD:
                    // Add to our array for callbacks
                    console.log("adding CONTROL_PANEL_LOAD callback listener");
                    zw.plugin.callbacks[zw.plugin.events.CONTROL_PANEL_LOAD].push(callback);
                    break;
                case zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD:
                    // Add to our array for callbacks
                    console.log("adding CONVERSATION_LIST_ITEM_LOAD callback listener");
                    zw.plugin.callbacks[zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD].push(callback);
                    break;
                case zw.plugin.events.CONVERSATION_LIST_ITEM_MENU_LOAD:
                    // Add to our array for callbacks
                    console.log("adding CONVERSATION_LIST_ITEM_MENU_LOAD callback listener");
                    zw.plugin.callbacks[zw.plugin.events.CONVERSATION_LIST_ITEM_MENU_LOAD].push(callback);
                    break;
                default:
                    console.log("You called addEventListener with an event name that does not exist.");

            }
        },

        // Stores the callbacks that are passed in for the events. We call each callback that's in the array
        // for each event when that event occurs
        // Use the enum string val here to make sure name is correct when referencing keys via
        // naming style of zw.plugin.callbacks[zw.plugin.events.CONTROL_PANEL_LOAD]
        callbacks: {
            compose_box_load: [],
            side_panel_load: [],
            control_panel_load: [],
            conversation_list_item_load: [],
            conversation_list_item_menu_load: [],
        },

        // Calls all the callbacks for a listener
        // Example: zw.plugin.callEventListeners(zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD, {});
        callEventListeners: function(eventName, evt) {

            console.log("callEventListeners. eventName:", eventName, "evt:", evt);

            var arrayLength = zw.plugin.callbacks[eventName].length;
            for (var i = 0; i < arrayLength; i++) {
                var cb = zw.plugin.callbacks[eventName][i];
                //console.log("callEventListeners. cb:", cb);
                cb(evt);
            }
        },

        // Create or Get a Conversation List Item Ellipsis Menu
        getOrCreateConvListItemMenu: function(menuEl, id, menuTxt, tooltip) {

            console.log("getOrCreateConvListItemMenu. menuEl:", menuEl, "id:", id, "menuTxt:", menuTxt, "tooltip:", tooltip);

            // check to see if this menu item is already in there
            var curEl = menuEl.find('.' + id + '-convlistitem-menu');
            if (curEl.length > 0) {
                console.log("menu item was already there. returning it. curEl:", curEl);
                return curEl;
            }

            var el = $(`<div class="drop-down-menu_menuOption ` + id + `-convlistitem-menu" tabindex="0" testid="` + id + `_CONVLISTMENU_CLICK">
<div data-testid="` + id + `_CONVLISTMENU_TEXT" class="zk-styled-text-base zk-styled-text-primary" title="` + tooltip + `" >` + menuTxt + `</div>
</div>`);
            menuEl.append(el);
            return el;
        },

        // Create or Get a Top Region DIV DOM element for the Compose Box
        // You can call this on an ongoing basis. It will lazy load a panel for you,
        // or if one already exists it will return the DOM element for you.
        // @param id : The id of your plugin. You should have registered it first.
        // @param tooltip : The text shown on hover of top region element.
        // @param iconBaseSvg : A string of the SVG for the base icon that always shows
        getOrCreateComposeBoxTopRegion: function(id, tooltip, iconBaseSvg, iconUrl) {

            console.log("getOrCreateComposeBoxTopRegion. id:", id);

            // find the plugin area and append
            var pluginEl = $('.plugin-composebox-topregion');

            // See if the button already exists for this ID
            var regionEl = pluginEl.find("." + id + "-composebox-topregion");
            //console.log("regionEl:", regionEl);

            if (regionEl.length > 0) {
                // the region already exists, just return it
                console.log("region already existed.");
                return regionEl;
            }

            // the region does not exist. let's create it.
            console.log("region did not exist. creating it.");

            regionEl = $(`
<div class="` + id + `-composebox-topregion plugin-composebox-topregion-item" title="` + tooltip + `">
<div class="iconSvg iconTopRegionSvg">
` + iconBaseSvg + `
</div>
<div class="plugin-composebox-topregion-body">
</div>
<div class="plugin-composebox-topregion-close">
<button style="width:18px;height:18px;" class="zk-button zk-button-transparent xzk-modal-overlay_closeBtn" data-testid="` + id + `-TOPREGION_CLOSE" xtabindex="0" type="button">
<svg viewBox="0 0 24 24" fill="#2b3037" height="18" width="18" class=""><path d="M13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 0 0 0 1.06.75.75 0 0 0 1.06 0L12 13.06l5.47 5.47a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06z"></path></svg>
</button>
</div>
</div>
`);
            pluginEl.append(regionEl);
            return regionEl;

        },

        // Create or Get a Top Region DIV DOM element for the Compose Box
        // You can call this on an ongoing basis. It will lazy load a panel for you,
        // or if one already exists it will return the DOM element for you.
        // The CSS version of this method implements the SVG image as a CSS background-image
        // rather than as an inline block of the SVG content.
        // @param id : The id of your plugin, or an extended id if your plugin has multiple top regions
        // @param tooltip : The text shown on hover of top region element.
        // @param iconUrl : A URL of the SVG for the base icon that always shows
        getOrCreateComposeBoxTopRegionCss: function(id, tooltip, iconUrl, startingCss) {

            console.log("getOrCreateComposeBoxTopRegionCss. id:", id);

            // find the plugin area and append
            var pluginEl = $('.plugin-composebox-topregion');

            // See if the button already exists for this ID
            var regionEl = pluginEl.find("." + id + "-composebox-topregion");
            //console.log("regionEl:", regionEl);

            if (regionEl.length > 0) {
                // the region already exists, just return it
                console.log("region already existed.");
                return regionEl;
            }

            // the region does not exist. let's create it.
            console.log("region did not exist. creating it.");

            // create the CSS
            zw.plugin.addCss("." + id + `-topregion-iconurl {
background-image: url('` + iconUrl + `');
}
`, "top region css");


            regionEl = $(`
<div class="` + id + `-composebox-topregion plugin-composebox-topregion-item ` + startingCss + `" title="` + tooltip + `">
<div class="topregion-iconurl ` + id + `-topregion-iconurl"></div>
<div class="plugin-composebox-topregion-body">
</div>
<div class="plugin-composebox-topregion-close">
<button style="width:18px;height:18px;" class="zk-button zk-button-transparent xzk-modal-overlay_closeBtn" data-testid="` + id + `-TOPREGION_CLOSE" xtabindex="0" type="button">
<svg viewBox="0 0 24 24" fill="#2b3037" height="18" width="18" class=""><path d="M13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 0 0 0 1.06.75.75 0 0 0 1.06 0L12 13.06l5.47 5.47a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06z"></path></svg>
</button>
</div>
</div>
`);
            pluginEl.append(regionEl);
            return regionEl;

        },

        // Create or Get a button in the Compose Box Button Bar
        // You can call this on an ongoing basis. It will lazy load a button for you,
        // or if one already exists it will return the DOM element for you.
        // @param id : The id of your plugin button. If multiple buttons, append your plugin id with btn id
        // @param tooltip : The hover text shown to user if they hover their mouse over the icon
        // @param iconUrl : A URL of the SVG for the base icon that always shows
        // @param iconUrlHover : A URL of the SVG shown when mouse is hovering over the button
        // @param iconUrlSel : A URL of the SVG shown after the button is toggled on
        // @param onClickCallback : The function to be called after the user clicks the button
        getOrCreateComposeBoxBtnBarCss: function(id, tooltip, iconUrl, iconUrlHover, iconUrlSel, onClickCallback) {

            console.log("getOrCreateComposeBoxBtnBarCss. id:", id);

            // find the plugin area and append
            var pluginEl = $('.plugin-composebox-btnbar');

            // See if the button already exists for this ID
            var btnEl = pluginEl.find("." + id + "-composebox-btnbar");
            console.log("btnEl:", btnEl);

            if (btnEl.length > 0) {
                // the btn already exists, just return it
                console.log("btn already existed.");
                //return btnEl;
            } else {
                // the btn does not exist. let's create it.
                console.log("btn did not exist. creating it.");

                // create the CSS
                zw.plugin.addCss("." + id + `-iconUrl {
background-image: url('` + iconUrl + `');
}
.` + id + `-iconUrl:hover {
background-image: url('` + iconUrlHover + `');
}
.` + id + `-iconUrl:active, .` + id + `-iconUrl.active {
background-image: url('` + iconUrlSel + `');
}
`, "compose box btn bar css");

                // create the HTML
                btnEl = $(`
<div class="` + id + `-composebox-btnbar zw-default-div-style send-message-panel_iconContainer">
<div data-testid="` + id + `-COMPOSEBOX-BTN" class="dynamic-attr-picker_icon">
<button class="zk-button zk-button-transparent zk-hover-icon dynamic-attr-picker_buttonStyle" tabindex="0" type="button">
 <div title="` + tooltip + `">
  <div class="iconUrlSvg iconUrlBaseSvg ` + id + `-iconUrl ">
  </div>
 </div>
</button>
</div>
</div>
`);

                pluginEl.append(btnEl);

                // we need to attach the hover and toggle events
                /*
                btnEl.hover(function(evt) {
                    console.log("got hover in");
                    var myBtnEl = $(evt.currentTarget);
                    // if toggle is on, then don't show the hover
                    if (myBtnEl.find('.iconToggleSvg').hasClass("hidden")) {
                        myBtnEl.find('.iconHoverSvg').removeClass("hidden");
                    }
                    myBtnEl.find('.iconBaseSvg').addClass("hidden");
                }, function(evt) {
                    console.log("got hover out");
                    var myBtnEl = $(evt.currentTarget);
                    // if toggle is on, then don't show the base
                    if (myBtnEl.find('.iconToggleSvg').hasClass("hidden")) {
                        myBtnEl.find('.iconBaseSvg').removeClass("hidden");
                    }
                    myBtnEl.find('.iconHoverSvg').addClass("hidden");
                });*/

                btnEl.find('.zk-button').click(onClickCallback);
            }

            // we can return our button now
            return btnEl;

        },

        // Create or Get a button in the Compose Box Button Bar
        // You can call this on an ongoing basis. It will lazy load a button for you,
        // or if one already exists it will return the DOM element for you.
        // @param id : The id of your plugin. You should have registered it first.
        // @param tooltip : The hover text shown to user if they hover their mouse over the icon
        // @param iconBaseSvg : A string of the SVG for the base icon that always shows
        // @param iconHoverSvg : A string of the SVG shown when mouse is hovering over the button
        // @param iconToggleSvg : A string of the SVG shown after the button is toggled on
        // @param onClickCallback : The function to be called after the user clicks the button
        getOrCreateComposeBoxBtnBar: function(id, tooltip, iconBaseSvg, iconHoverSvg, iconToggleSvg, onClickCallback) {

            console.log("getOrCreateComposeBoxBtnBar. id:", id);

            // find the plugin area and append
            var pluginEl = $('.plugin-composebox-btnbar');

            // See if the button already exists for this ID
            var btnEl = pluginEl.find("." + id + "-composebox-btnbar");
            console.log("btnEl:", btnEl);

            if (btnEl.length > 0) {
                // the btn already exists, just return it
                console.log("btn already existed.");
                //return btnEl;
            } else {
                // the btn does not exist. let's create it.
                console.log("btn did not exist. creating it.");
                btnEl = $(`
<div class="` + id + `-composebox-btnbar zw-default-div-style send-message-panel_iconContainer">
<div data-testid="` + id + `-COMPOSEBOX-BTN" class="dynamic-attr-picker_icon">
<button class="zk-button zk-button-transparent zk-hover-icon dynamic-attr-picker_buttonStyle" tabindex="0" type="button">
<div title="` + tooltip + `">
<div class="iconSvg iconBaseSvg">
` + iconBaseSvg + `
</div>
<div class="iconSvg iconHoverSvg hidden">
` + iconHoverSvg + `
</div>
<div class="iconSvg iconToggleSvg hidden">
` + iconToggleSvg + `
</div>
</div>
</button>
</div>
</div>
`);

                pluginEl.append(btnEl);

                // we need to attach the hover and toggle events
                btnEl.hover(function(evt) {
                    console.log("got hover in");
                    var myBtnEl = $(evt.currentTarget);
                    // if toggle is on, then don't show the hover
                    if (myBtnEl.find('.iconToggleSvg').hasClass("hidden")) {
                        myBtnEl.find('.iconHoverSvg').removeClass("hidden");
                    }
                    myBtnEl.find('.iconBaseSvg').addClass("hidden");
                }, function(evt) {
                    console.log("got hover out");
                    var myBtnEl = $(evt.currentTarget);
                    // if toggle is on, then don't show the base
                    if (myBtnEl.find('.iconToggleSvg').hasClass("hidden")) {
                        myBtnEl.find('.iconBaseSvg').removeClass("hidden");
                    }
                    myBtnEl.find('.iconHoverSvg').addClass("hidden");
                });

                btnEl.find('.zk-button').click(onClickCallback);
            }

            // we can return our button now
            return btnEl;

        },

    },

    // The Shim code is an area where we are writing Javascript that likely is not needed in the final product
    // when core engineering can do stuff natively in the React codebase to achieve what we had to do with duct-tape
    // like workarounds.
    shim: {

        onLoad: function() {

            console.log("shim onLoad");

            // When we get this as a first class citizen, we should not need this code. So trying to keep
            // weird workarounds in here. This method should get called at load of page to start any code
            // in here that does watching of the DOM, for instance.

            // Watch DOM to see if conv selection changes. If so trigger events. Eventually a real implementation
            // of the plugin infrastructure would call the COMPOSE_BOX_LOAD events from React
            //this.startWatchingForConversationSelectChange();

            // Also watch DOM to see if the conversation list changes, so we can fire off an event, to let
            // a plugin do stuff like add a tag to the coversation list item, or bind a hover event to the contact name,
            // or add some other element to the conv list item
            this.startWatchingForConversationChange();

            // Older approach of setInterval() that we are using to detect if you click on
            // a diff conversation. We should refactor to be part of the Mutation Observer approach
            // used in startWatchingForConversationChange()
            this.startWatchingForConversationSelectChange();

            // add a hidden class so we can easily hide DOM elements, when without react, we need to do via css
            // other classes here we expect core zipwhip app to provide once it treats plugins as a 1st class citizen
            zw.plugin.addCss(`
.hidden { display:none !important; }
.plugin-composebox-btnbar {
-webkit-box-orient: horizontal;
-webkit-box-direction: normal;
-ms-flex-direction: row;
flex-direction: row;
display: flex;
}
.plugin-composebox-topregion {
white-space: normal;
}
.plugin-composebox-topregion-item {
border:1px solid #d2d7de;
border-bottom: 0px;
background-color: #eeeff2;
border-radius:2px;
padding:6px 4px 6px 12px;
margin:0px;
-webkit-box-orient: horizontal;
-webkit-box-direction: normal;
-ms-flex-direction: row;
flex-direction: row;
display: flex;
}
.plugin-composebox-topregion-body {
flex-grow: 1;
}
.plugin-composebox-topregion-close {
margin-left: 4px;
}
.iconTopRegionSvg {
margin-right:8px;
width: 18px;
height: 18px;
}
.iconUrlSvg {
width: 24px;
height: 24px;
background-size: 24px 24px;
margin-top:-3px;
}
.topregion-iconurl {
width: 18px;
height: 18px;
background-size: 18px 18px;
opacity: 0.5;
margin-right: 8px;
}
`, "global plugin css");

        },

        // Looks thru the DOM for the Contact Info panel and grabs the phone number
        // Done - TODO: Watch for if they don't ahve the Info panel open, as this will fail
        // Done - TODO 2: If it's a group, we'll get something whacky and definitely not a phone number
        // Long term we should not need this as it should just be given in the events
        // Return obj with phone string that is a primary key including for groups, isGroup flag, and phone array if it is a group
        getContactPhone: function() {

            //console.log("getContactPhone");

            var el = $('.single-contact-panel_singleContactPanelContainer');
            //console.log("parent contact card", el);

            if (el.length == 0) {
                //console.log("could not find an open conversation");

                // before we give up here, check if there's a group and return "group"
                // because this means there is a conversation, just not one specific to a contact
                var groupEl = $('.group-contacts-panel_groupContactPanelContainer');
                if (groupEl.length > 0) {
                    // get all the phone numbers
                    var allNumEls = groupEl.find('.zk-styled-text-small.zk-styled-text-primary.zk-styled-text-secondary');
                    //console.log("allNumEls:", allNumEls, allNumEls.text());
                    var arr = [];
                    for(var i = 0; i < allNumEls.length; i++) {
                        var item = $(allNumEls[i]);
                        //console.log("item:", item);

                        if (item.text()) arr.push(item.text());
                    }

                    return {isGroup: true, phone:"group:" + arr.join(","), phones: arr}; //"group:" + arr.join(",");
                }

                return null;
            }

            var phoneEl = el.find('.zk-styled-text-small.zk-styled-text-primary.zk-styled-text-secondary');
            //console.log("phone el:", phoneEl);

            if (phoneEl.length > 0) {
                //console.log("found convo");
                var contactPhone = phoneEl.text();
                //console.log("contact phone:", contactPhone);
                return {phone: contactPhone, isGroup: false};
            } else {
                //console.log("could not find phone number for current contact");
                return null;
            }
        },

        // Get the ContactId from a phone number by calling Zipwhip API via ajax
        getContactIdFromContactPhone: function(phone, callback) {

            console.log("getContactIdFromContactPhone. phone:", phone);
            phone = phone.replace(/\D/g, "");  // swap non-digits for emptiness to get clean phone number. don't u love regular expressions!
            console.log("cleaned up phone number", phone);

            var url = "https://app.zipwhip.com/api/v1/conversation/get?address=ptn%3A%2F%2B1" + phone + "&limit=1&start=0";
            var headersObj = {
                authorization: zw.getSessionKey()
            };
            console.log("url to query for contactid:", url, "headers:", headersObj);

            // do ajax query and get results. based on the results i'll render stuff.
            $.ajax({
                type: "GET",
                url: url,
                headers: headersObj,
                success: function(data) {

                    console.log("got success from ajax call for getContactIdFromContactPhone. data:", data);

                    // now go deep into the object
                    /* response: {messages: [,…],…}
conversation: {id: 396472207207, version: 18, deviceId: 366608407, lastUpdated: "2019-12-13T20:26:26+00:00",…}
address: "ptn:/+15035752613"
bcc: null
cc: null
class: "com.zipwhip.website.data.dto.Conversation"
contacts: [{id: 31324856907, version: 1, lastUpdated: "2019-12-13T04:51:56+00:00",…}]
0: {id: 31324856907, version: 1, lastUpdated: "2019-12-13T04:51:56+00:00",…}
id: 31324856907
*/
                    if ('response' in data) {

                        console.log("found response in data", data.response);

                        if ('conversation' in data.response && 'contacts' in data.response.conversation && data.response.conversation.contacts.length > 0) {
                            var contacts = data.response.conversation.contacts;
                            console.log("we have a contacts array in the conversation. good.", contacts);

                            if (contacts.length == 1) {
                                var contactId = contacts[0].id;
                                console.log("got contactId:", contactId);

                                // finally do callback
                                if (callback) callback(data.response.conversation, contactId, contacts[0]);
                            } else {
                                console.error("got back more than one contact id, so treating as error.");
                            }
                        }
                    }
                },
                error: function (err) {
                    console.log("got error on ajax. err:", err);
                },
                failure: function(err) {
                    console.log("got failure on ajax. err:", err);
                }
            });
        },

        getContactIdFromName: function(name, retItemEl, callback) {

            console.log("getContactIdFromName. name:", name);

            // https://app.zipwhip.com/api/search/contact-list?filter=NAME_MOBILE&from=0&query=John%20Lauer%20Mobile&size=20
            var url = "https://app.zipwhip.com/api/search/contact-list?filter=NAME_MOBILE&from=0&query=" + encodeURIComponent(name) + "&size=1";
            var headersObj = {
                authorization: zw.getSessionKey()
            };
            console.log("url to query for contactid from name:", url, "headers:", headersObj);

            // do ajax query and get results. based on the results i'll render stuff.
            $.ajax({
                type: "GET",
                url: url,
                headers: headersObj,
                success: function(data) {

                    //console.log("got success from ajax call for getContactIdFromName. data:", data);

                    // now go deep into the object
                    /*
{success: true,…}
response: {results: {contact: [{id: 11289716707, lastUpdated: "2020-04-15T01:10:33.000+0000",…}]}, total: 1,…}
from: 0
results: {contact: [{id: 11289716707, lastUpdated: "2020-04-15T01:10:33.000+0000",…}]}
contact: [{id: 11289716707, lastUpdated: "2020-04-15T01:10:33.000+0000",…}]
0: {id: 11289716707, lastUpdated: "2020-04-15T01:10:33.000+0000",…}
address: "ptn:/+13134147502"
addressLine1: ""
addressLine2: ""
birthday: null
blocked: false
businessName: ""
carrier: "Vzw"
city: ""
country: ""
custom1: ""
custom2: ""
dateCreated: "2018-04-30T15:19:49.000+0000"
deleted: false
deviceId: 366608407
email: ""
firstName: "John"
fullName: "John Lauer Mobile"
hidden: 0
id: 11289716707
isZwUser: false
jobTitle: ""
lastName: "Lauer Mobile"
lastUpdated: "2020-04-15T01:10:33.000+0000"
latlong: ""
loc: ""
matchFields: ["nameMetaData"]
mobileNumber: "+13134147502"
notes: ""
optOut: false
state: ""
zipcode: ""
size: 20
total: 1
success: true
*/
                    if ('response' in data) {

                        //console.log("found response in data", data.response);

                        if ('results' in data.response && 'contact' in data.response.results && data.response.results.contact.length > 0) {
                            var contacts = data.response.results.contact;
                            //console.log("we have a contacts array in the respone. good.", contacts);

                            if (contacts.length == 1) {
                                var contactId = contacts[0].id;
                                var phoneNum = contacts[0].mobileNumber;
                                //console.log("got contactId:", contactId, "phoneNum:", phoneNum);

                                // finally do callback
                                if (callback) callback(retItemEl, contactId, phoneNum, contacts[0], contacts);
                            } else {
                                console.error("got back more than one contact id, so treating as error.");
                            }
                        }
                    }
                },
                error: function (err) {
                    console.log("got error on ajax. err:", err);
                },
                failure: function(err) {
                    console.log("got failure on ajax. err:", err);
                }
            });


        },

        // keeps track of last contact phone number we saw, to know if we have a new contact
        lastContactPhone: null,

        // keep track of last selected conversation
        lastConvSelPhone: null,

        // Loop every 500ms to see if the user selected a diff conversation by watching CSS tags
        // Highly inefficient. Can't wait for core engineering to give us a native event.
        startWatchingForConversationSelectChange: function() {

            console.log("startWatchingForConversationChange");

            // we are going to just watch for a selected conversation
            // we can do this by watching the DOM for this CSS selector
            //   .conversation-list-panel_hover.conversation-list-panel_selected
            // if we find nothing, we can set our selected conversation back to null
            // if we find something selected, we check if it's different than last convo
            var that = this;
            var intervalId = setInterval(function() {

                // check if we have .conversation-list-panel_hover.conversation-list-panel_selected
                var convSelEl = $('.conversation-list-panel_hover.conversation-list-panel_selected');

                if (convSelEl.length > 0) {
                    // we found a selected element.
                    //console.log("found selected conversation. convSelEl:", convSelEl);

                    // we need to get the phone number of this convo to determine if we've changed convos
                    var newPhoneObj = zw.shim.getContactPhone();

                    if (newPhoneObj.phone != zw.shim.lastConvSelPhone) {

                        //console.log("newPhone did not equal lastConvSelPhone. new convo! old:", zw.shim.lastConvSelPhone, "new:", newPhone);

                        var oldPhone = zw.shim.lastConvSelPhone;
                        zw.shim.lastConvSelPhone = newPhoneObj.phone;

                        that.onNewConversationSelected(newPhoneObj, oldPhone);

                    } else {

                        // this is the same convo. we can punt.
                        //console.log("selected conversation didn't change. ignoring...");
                    }

                } else {
                    // we found nothing, set lastContactPhone to null
                    //console.log("setting last selected conversation to null");
                    zw.shim.lastConvSelPhone = null;
                }


            }, 500);
        },

        // We call this method after we've determined a new conversation has been selected
        onNewConversationSelected: function(newPhoneObj, oldPhone) {

            var newPhone = newPhoneObj.phone;

            console.log("onNewConversationSelected. newPhone:", newPhone, "oldPhone:", oldPhone);

            // we can get a group here, so in that case there's no contactId to look up.
            if (newPhoneObj.isGroup) {
                newPhone = newPhoneObj.phones[0]; // just take 1st array item
            }

            // Now let's look up the ContactId asynchronously, and when we get it back call the load events
            zw.shim.getContactIdFromContactPhone(newPhone, function(conversation, contactId, contact) {

                // Now that we have a ContactId let's call the load events
                console.log("ok we got back from our ajax call and have a new contactid");

                // Before we call the event listeners for load events, let's create our Plugin regions.
                // These would be created by default by React once this is a 1st class citizen, but for now
                // let's sort of lazy load ensure that our plugin region divs are created

                // Create Compose Box Button Bar plugin region, if not created
                var composeBoxBtnBarPluginEl = $('.send-message-panel_row .plugin-composebox-btnbar');
                if (composeBoxBtnBarPluginEl.length > 0) {
                    // it's already there. leave alone.
                    console.log(".plugin-composebox-btnbar was already there. leaving alone.");
                    // actually, delete it all, so we start fresh
                    composeBoxBtnBarPluginEl.remove();
                }
                //} else {

                // it's not there. create it.
                console.log(".plugin-composebox-btnbar was NOT there. creating...");
                var rowEl = $('.send-message-panel_row');
                composeBoxBtnBarPluginEl = $('<div class="plugin-composebox-btnbar"></div>');
                rowEl.append(composeBoxBtnBarPluginEl);
                //}

                // Make sure the signature toggle icon has class name of send-message-panel_iconContainer
                // so that it adds padding-right like all the other buttons
                var sigBtnEl = composeBoxBtnBarPluginEl.parent().find('.signature-toggle_image');
                sigBtnEl.css("margin-right", "10px");

                // Create Compose Box Top Region plugin region, if not created
                var composeTopRegionPluginEl = $('.plugin-composebox-topregion');
                if (composeTopRegionPluginEl.length > 0) {
                    // it's already there. leave alone.
                    console.log(".plugin-composebox-topregion was already there. leaving alone.");
                    // actually, delete it all, so we start fresh
                    composeTopRegionPluginEl.remove();
                }
                //} else {

                // it's not there. create it.
                console.log(".plugin-composebox-topregion was NOT there. creating...");

                // let's show a region above the compose box
                var mainEl = $('.zw-default-div-style.compose-box-new');

                var divEl = $('<div class="plugin-composebox-topregion zk-styled-text-base"></div>');
                //divEl.click(this.onTopRegionClick.bind(this));
                this.composeBoxTopRegionEl = divEl;

                mainEl.parent().prepend(divEl);
                console.log("prepended compose top region");
                //}

                // We should wipe everything attached to the textarea, but for now
                // let's leave it alone cuz i don't know if i'd be deleting react stuff

                // Call Compose Box Load event
                var composeTextAreaEl = $(".zk-text-editor_input.zk-text-editor_content.compose-box_textInput");
                zw.plugin.callEventListeners(zw.plugin.events.COMPOSE_BOX_LOAD, {
                    composeTextAreaEl: composeTextAreaEl,
                    composeBoxBtnBarPluginEl: composeBoxBtnBarPluginEl,
                    composeTopRegionPluginEl: composeTopRegionPluginEl,
                    phoneObj: newPhoneObj,
                    phone: newPhone,
                    oldPhone: oldPhone,
                    conversation: conversation,
                    contactId: contactId,
                    contact: contact,
                } );

                // Call Side Panel Load event
                zw.plugin.callEventListeners(zw.plugin.events.SIDE_PANEL_LOAD, null);

            });

        },


        // Use a setInterval to loop every n milliseconds to see when our page has loaded
        // and React created the core layout
        startWatchingForConversationChange: function() {

            console.log("startWatchingForConversationChange");

            // we have to wait around for the DOM to get loaded by React, so just loop
            // until we find the DOM element we're after
            var that = this;
            var intervalId = setInterval(function() {

                //var el = $('#root');
                var el = $('.conversation-list-panel_container');
                if (el.length > 0) {
                    // we found it.
                    //console.log("finally found the root panel. el:", el);
                    console.log("finally found the conversation panel. el:", el);

                    // clear myself so i stop looping
                    clearInterval(intervalId);

                    // now continue on with watching the conversation change
                    that.startWatchingForConversationChangeStepTwo();

                } else {
                    // do nothing
                    //console.log("continuing to wait for DOM conversation panel to load...");
                }


            }, 200);
        },

        // This continues our process of watching for conversation changes once we have our DOM element
        // of the conversation panel
        startWatchingForConversationChangeStepTwo: function() {
            // Use the amazing DOM event of DOMSubtreeModified to see if anything changes
            // And if it does, check to see if it's a new conversation. If it's new, do lots of stuff

            // this watches the right side info panel, which is fleeting. i think it gets deleted so lose bind()
            //$('.single-contact-panel_singleContactPanelContainer').bind('DOMSubtreeModified', function(e) {

            // watch the left side conversation panel, which does not get destroyed, so bind stays intact
            // old: .conversation-list-panel_listContainer
            // old: .conversation-list-panel_container
            // old: .single-contact-panel_singleContactPanelContainer
            // conversation-list-panel_container
            // #root

            var el = $('#root');
            //var el = $('.conversation-list-panel_container');
            console.log("got el to attach watch event. el:", el);

            // we need to debounce all of these callbacks. so the trick is to do a setTimeout but to wipe
            // the timeout on each callback so that we get the actual load pretty much only once. even if we don't
            // get it once, that's safe, it's just that we don't want to call all our phone retrieval events a million time
            var timeoutId = null;

            // Select the node that will be observed for mutations
            const targetNode = el[0];

            // Options for the observer (which mutations to observe)
            const config = { attributes: false, childList: true, subtree: true, characterData: true, };

            // Just use callback as trigger to re-look at DOM, just debounce so don't overdo it
            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                // do debounce
                if (timeoutId != null) {
                    // we have a timeout already. cancel it.
                    clearTimeout(timeoutId);
                }

                // now create setTimeout
                timeoutId = setTimeout(zw.shim.onWatchingForConversationChange, 500);
            }

            /*
            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                // Use traditional 'for loops' for IE 11
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        //console.log('A child node has been added or removed. mutation:', mutation);

                        // see if added
                        if (mutation.addedNodes.length > 0) {
                            console.log("Child node added. node:", mutation);

                            var mutEl = $(mutation.addedNodes[0]);
                            console.log("mutEl:", mutEl);

                            var itemEls = mutEl.find('.conversation-list-panel_hover');
                            if (itemEls.length && itemEls.length > 0 ) {
                                console.log("this is a conversation list item added!!. itemEls:", itemEls);
                                for(let item of itemEls) {
                                    console.log("item:", item);
                                }
                            }

                        }
                        else if (mutation.removedNodes.length > 0) {
                            console.log("Child node removed. node:", mutation);

                            var mutEl = $(mutation.target);
                            console.log("mutEl:", mutEl);

                            if (mutEl.find('.conversation-list-panel_hover').length > 0) {
                                console.log("this is a conversation list item removed!!");
                            }

                        }
                        else {
                            console.log("Did not get add or remove. huh? node:", mutation);
                        }
                    }
                    else if (mutation.type === 'attributes') {
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                    }
                    else {
                        console.log('Mutation of type:', mutation.type, mutation);
                    }
                }
            };*/

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);

            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);

            // Go ahead and call it the first time
            //zw.shim.onWatchingForConversationChange()

            // Later, you can stop observing
            //observer.disconnect();

            /*
            var target = el[0];
            console.log("target:", target);
            // Create an observer instance
            var observer = new MutationObserver(function( mutations ) {
                mutations.forEach(function( mutation ) {
                    var newNodes = mutation.addedNodes; // DOM NodeList
                    if( newNodes !== null ) { // If there are new nodes added

                        //alert('something has been changed');
                        console.log("got mutation observer. mutation:", mutation);

                        // do debounce
                        if (timeoutId != null) {
                            // we have a timeout already. cancel it.
                            clearTimeout(timeoutId);
                        }

                        // now create setTimeout
                        timeoutId = setTimeout(zw.shim.onWatchingForConversationChange, 1000);
                    }
                });
            });

            // Configuration of the observer:
            var config = {
                attributes: true, //true,
                childList: true,
                characterData: true, //true
            };

            // Pass in the target node, as well as the observer options
            observer.observe(target, config);
            // Later, you can stop observing
            // observer.disconnect();
            */

            /*el.bind('DOMSubtreeModified', function(e) {

                console.log("looks like we got DOM modified");

                // do debounce
                if (timeoutId != null) {
                    // we have a timeout already. cancel it.
                    clearTimeout(timeoutId);
                }

                // now create setTimeout
                timeoutId = setTimeout(zw.shim.onWatchingForConversationChange, 1000);
            });*/
        },

        // This is called after our DOM change event thinks we had a change, but it's called
        // after a nice debounce so we are efficient
        onWatchingForConversationChange: function() {

            console.log("onWatchingForConversationChange. that means debounce is done.");

            // Let's scan all conversation items, see if they are new, and if so trigger an event
            // Leave a tag per item in the DOM so we know we've thrown an event for it
            var convItemEls = $('.conversation-list-panel_hover');
            for (var item of convItemEls) {
                //console.log("item:", item);

                let itemEl = $(item);

                // see if already have tag that we threw event
                if (itemEl.attr('data-contactid')) {
                    // already fired new event for this conv item, so can ignore
                    //console.log("already handled conv item data-contactid:", itemEl.attr('data-contactid'));
                } else {
                    // throw new event
                    //console.log("throwing new event for conv item. itemEl:", itemEl);

                    // get the name, so that we can lookup the contactId
                    var nameEl = itemEl.find(".conversation-card-container_nameContainer > .conversation-card-container_nameContainer");
                    var nameTxt = nameEl.text();
                    //console.log("nameEl:", nameEl);

                    zw.shim.getContactIdFromName(nameTxt, itemEl, function(retItemEl, contactId, phoneNum, contact, contacts) {
                        //console.log("got callback from getContactIdFromName. contactId:", contactId, phoneNum, contacts);

                        retItemEl.attr('data-contactid', contactId);
                        retItemEl.attr('data-phone', phoneNum);
                        //console.log("attached data items to retItemEl:", retItemEl);

                        // now throw event
                        var evt = {
                            itemEl: retItemEl,
                            contactId: contactId,
                            phoneNum: phoneNum,
                            contact: contact,
                            contacts: contacts,
                        };
                        zw.plugin.callEventListeners(zw.plugin.events.CONVERSATION_LIST_ITEM_LOAD, evt);
                    });

                }
            }

            // let's secondarily see if a menu was shown, and if so throw off an event
            var convItemMenuEls = $('.drop-down-menu_menu.conversation-list-panel_moreMenu');
            if (convItemMenuEls.length > 0) {
                console.log("convItemMenuEl:", convItemMenuEls);

                var convItemMenuEl = $(convItemMenuEls[0]);

                // let's make sure we haven't thrown an event for this yet. that can happen
                // if a change is made to the DOM by a plugin on this menu
                if (convItemMenuEl.attr('data-iseventthrown') == "yes") {
                    console.log("load evt already thrown for this menu. ignoring...");
                } else {

                    convItemMenuEl.attr('data-iseventthrown', "yes");
                    let itemEl = convItemMenuEl.parent('.conversation-list-panel_hover');
                    var contactId = itemEl.attr('data-contactid');
                    var phoneNum = itemEl.attr('data-phone');

                    // now throw event
                    var evt = {
                        itemEl: itemEl,
                        itemMenuEl: convItemMenuEl,
                        contactId: contactId,
                        phoneNum: phoneNum,
                    };
                    zw.plugin.callEventListeners(zw.plugin.events.CONVERSATION_LIST_ITEM_MENU_LOAD, evt);

                }
            }

        },

                // This is called after our DOM change event thinks we had a change, but it's called
        // after a nice debounce so we are efficient
        OldonWatchingForConversationChange: function() {

            console.log("onWatchingForConversationChange. that means debounce is done.");

            var newPhone = zw.shim.getContactPhone();

            if (newPhone != zw.shim.lastContactPhone) {

                console.log("newPhone did not equal oldPhone. new convo!");

                var oldPhone = zw.shim.lastContactPhone;
                zw.shim.lastContactPhone = newPhone;

                console.log("looks like we have a new phone num for the contact, thus this is a new conversation. old:", oldPhone, "new:", newPhone);

                // Now let's look up the ContactId asynchronously, and when we get it back call the load events
                zw.shim.getContactIdFromContactPhone(newPhone, function(conversation, contactId) {

                    // Now that we have a ContactId let's call the load events
                    console.log("ok we got back from our ajax call and have a new contactid");

                    // Before we call the event listeners for load events, let's create our Plugin regions.
                    // These would be created by default by React once this is a 1st class citizen, but for now
                    // let's sort of lazy load ensure that our plugin region divs are created

                    // Create Compose Box Button Bar plugin region, if not created
                    var composeBoxBtnBarPluginEl = $('.send-message-panel_row .plugin-composebox-btnbar');
                    if (composeBoxBtnBarPluginEl.length > 0) {
                        // it's already there. leave alone.
                        console.log(".plugin-composebox-btnbar was already there. leaving alone.");
                    } else {
                        // it's not there. create it.
                        console.log(".plugin-composebox-btnbar was NOT there. creating...");
                        var rowEl = $('.send-message-panel_row');
                        composeBoxBtnBarPluginEl = $('<div class="plugin-composebox-btnbar"></div>');
                        rowEl.append(composeBoxBtnBarPluginEl);
                    }

                    // Make sure the signature toggle icon has class name of send-message-panel_iconContainer
                    // so that it adds padding-right like all the other buttons
                    var sigBtnEl = composeBoxBtnBarPluginEl.parent().find('.signature-toggle_image');
                    sigBtnEl.css("margin-right", "10px");

                    // Create Compose Box Top Region plugin region, if not created
                    var composeTopRegionPluginEl = $('.plugin-composebox-topregion');
                    if (composeTopRegionPluginEl.length > 0) {
                        // it's already there. leave alone.
                        console.log(".plugin-composebox-topregion was already there. leaving alone.");
                    } else {
                        // it's not there. create it.
                        console.log(".plugin-composebox-topregion was NOT there. creating...");

                        // let's show a region above the compose box
                        var mainEl = $('.zw-default-div-style.compose-box-new');

                        var divEl = $('<div class="plugin-composebox-topregion zk-styled-text-base"></div>');
                        //divEl.click(this.onTopRegionClick.bind(this));
                        this.composeBoxTopRegionEl = divEl;

                        mainEl.parent().prepend(divEl);
                        console.log("prepended compose top region");
                    }

                    // Call Compose Box Load event
                    var composeTextAreaEl = $(".zk-text-editor_input.zk-text-editor_content.compose-box_textInput");
                    zw.plugin.callEventListeners(zw.plugin.events.COMPOSE_BOX_LOAD, {
                        composeTextAreaEl: composeTextAreaEl,
                        composeBoxBtnBarPluginEl: composeBoxBtnBarPluginEl,
                        composeTopRegionPluginEl: composeTopRegionPluginEl,
                        phone: newPhone,
                        oldPhone: oldPhone,
                        conversation: conversation,
                        contactId: contactId
                    } );

                    // Call Side Panel Load event
                    zw.plugin.callEventListeners(zw.plugin.events.SIDE_PANEL_LOAD, null);

                });

            } else {
                console.log("newPhone = oldPhone. nothing to do here.");
            }

            /* OLD
            // Watch for Compose Box showing up
            setInterval(function() {
                var composeEl = $(".zk-text-editor_input.zk-text-editor_content.compose-box_textInput");

                if (composeEl.length > 0) {
                    //console.log("found compose box. composeEl:", composeEl);

                    // if has a data-isLoaded tag then we already called onComposeBoxLoad() so ignore
                    if (composeEl.attr('data-isloaded')) {
                        // ignore
                        //console.log("looks like already had this compose box handled");
                    } else {
                        //console.log("looks like new compose box. adding data field to track we know it.");
                        composeEl.attr('data-isloaded', true);

                        //obj.onComposeBoxLoad(composeEl);

                        zw.plugins.callEventListeners(zw.plugins.events.COMPOSE_BOX_LOAD, composeEl);

                        // attach keystroke events
                        composeEl.on("input propertychange", obj.onComposeBoxKeypress.bind(obj));
                    }

                } else {
                    //console.log("looked for compose box, but did not find it.");
                }

            }, 2000);
            */
        },
    }
}

// store as global
window["zw"] = zw;

$(document).ready(function() {

    console.log("tampermonkey doc ready");

    // Load the shim. This should not be needed in production. For now, it loads
    // some watch events to mimic calling plugin events like COMPOSE_BOX_LOAD from React
    zw.shim.onLoad();

    // I'm going to load my own Language Translator plugin here

    // This would mean a global plugin has to be registered to Zipwhip like this:
    // http://api.zipwhip.com/plugin/globalRegister?id=ZwLanguageTranslator&url=https://github.com/myuser/plugin-lang-trans/plugin.js

    // This would likely be done by calling a Zipwhip API to register a plugin for a user like:
    // http://api.zipwhip.com/v3/plugin/userRegister?sessionkey=...&pluginName=ZwLanguageTranslator

    // Then this next line of code would happen automatically. Meaning the Plugin's Javascript would get loaded and then it's onLoad()
    // method would get called automatically.

    pluginLangTranslator.onLoad();
    pluginAuthvia.onLoad();

    pluginRCS.onLoad();
    pluginABC.onLoad();

});
