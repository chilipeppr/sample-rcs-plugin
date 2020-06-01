// This is the Apple Business Chat Plugin
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

pluginABC.onLoad();

