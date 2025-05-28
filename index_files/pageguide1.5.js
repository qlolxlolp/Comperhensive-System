

/*
 * PageGuide usage:
 *
 *  Preferences:
 *  auto_show_first:    Whether or not to focus on the first visible item
 *                      immediately on PG open (default true)
 *  loading_selector:   The CSS selector for the loading element. pageguide
 *                      will wait until this element is no longer visible
 *                      starting up.
 *  track_events_cb:    Optional callback for tracking user interactions
 *                      with pageguide.  Should be a method taking a single
 *                      parameter indicating the name of the interaction.
 *                      (default none)
 *  handle_doc_switch:  Optional callback to enlight or adapt interface
 *                      depending on current documented element. Should be a
 *                      function taking 2 parameters, current and previous
 *                      data-tourtarget selectors. (default null)
 *  custom_open_button: Optional id for toggling pageguide. Default null.
 *                      If not specified then the default button is used.
 *  dismiss_welcome:    Optional function to permanently dismiss the welcome
 *                      message, corresponding to check_welcome_dismissed.
 *                      Default: sets a localStorage or cookie value for the
 *                      (hashed) current URL to indicate the welcome message
 *                      has been dismissed, corresponds to default
 *                      check_welcome_dismissed function.
 *  check_welcome_dismissed: Optional function to check whether or not the
 *                      welcome message has been dismissed. Must return true
 *                      or false. This function should check against whatever
 *                      state change is made in dismiss_welcome. Default:
 *                      checks whether a localStorage or cookie value has been
 *                      set for the (hashed) current URL, corresponds to default
 *                      dismiss_welcome function.
 *  ready_callback:     A function to run once the pageguide ready event fires.
 *  pointer_fallback:   Specify whether or not to provide a fallback for css
 *                      pointer-events in browsers that do not support it
 *                      (default true).
 *  default_zindex:     The css z-index to apply to the asrpageguide_shadow
 *                      overlay elements (default 100);
 *  steps_element:      Selector for the ul element whose steps you wish to use
 *                      in this particular pageguide object (default '#asrPageGuide');
 *  auto_refresh:       If set to true, pageguide will run a timer to constantly
 *                      monitor the DOM for changes in the target elements and
 *                      adjust the pageguide display (bubbles, overlays, etc)
 *                      accordingly. The timer will only run while pageguide is open.
 *                      Useful for single-page or heavily dynamic apps where
 *                      pageguide steps or visible DOM elements can change often.
 *                      (default false)
 *  welcome_refresh:    Similar to auto_refresh, welcome_refresh enables a timer to
 *                      monitor the DOM for new .asrPageGuideWelcome elements. This is
 *                      useful if your welcome element isn't loaded immediately, or if
 *                      you want to show different welcome elements on different pages.
 *                      The timer will run constantly, whether or not the pageguide is
 *                      open, so enable at your discretion. (default false)
 *  refresh_interval:   If auto_refresh or welcome_refresh is enabled, refresh_interval
 *                      indicates in ms how often to poll the DOM for changes. (default 500)
 *
 */
asr = window.asr || {};
asr.pg = asr.pg || {};
asr.pg.pageGuideList = asr.pg.pageGuideList || [];
asr.pg.interval = {};

(function ($) {
    /**
     * default preferences. can be overridden by user settings passed into
     * asr.pg.init().
     **/
    asr.pg.default_prefs = {
        'auto_show_first': true,
        'loading_selector' : '#loading',
        'track_events_cb': function() { return; },
        'handle_doc_switch': null,
        'custom_open_button': null,
        'check_welcome_dismissed': function () {
            var key = 'asrpageguide_welcome_shown_' + asr.pg.hashUrl();
            // first, try to use localStorage
            try {
                if (localStorage.getItem(key)) {
                    return true;
                }
            // cookie fallback for older browsers
            } catch(e) {
                if (document.cookie.indexOf(key) > -1) {
                    return true;
                }
            }
            return false;
        },
        'dismiss_welcome': function () {
            var key = 'asrpageguide_welcome_shown_' + asr.pg.hashUrl();
            try {
                localStorage.setItem(key, true);
            } catch(e) {
                var exp = new Date();
                exp.setDate(exp.getDate() + 365);
                document.cookie = (key + '=true; expires=' + exp.toUTCString());
            }
        },
        'ready_callback': null,
        'pointer_fallback': true,
        'default_zindex': 900,
        'steps_element': '.asrPageGuide',
        'auto_refresh': false,
        'refresh_welcome': false,
        'refresh_interval': 500
    };

    // boilerplate markup for the message display element and shadow/index bubble container.
    asr.pg.wrapper_markup =
        '<div id="asrPageGuideWrapper">' +
            '<div id="asrPageGuideOverlay"></div>' +
            '<div id="asrPageGuideMessages">' +
                '<a href="#" class="asrpageguide_close" title="بستن راهنما">بستن</a>' +
                '<span class="asrpageguide_index"></span>' +
                '<div class="asrpageguide_text"></div>' +
                '<a href="#" class="asrpageguide_back fa fa-chevron-right" title="قبلی"></a>' +
                '<a href="#" class="asrpageguide_play fa fa-play" title="اجرا / توقف"></a>' +
                '<a href="#" class="asrpageguide_fwd fa fa-chevron-left" title="بعدی"></a>' +
            '</div>' +
            '<div id="asrPageGuideContent"></div>' +
            '<div id="asrPageGuideToggles"></div>' +
        '</div>';

    // boilerplate markup for the toggle element.
    asr.pg.toggle_markup =
        '<a class="asrpageguide_toggle fa fa-question-circle" title="راهنمای صفحه"></a>';

    /**
     * initiates the pageguide using the given preferences. must be idempotent, that is,
     * able to run multiple times without changing state.
     * preferences (object): any preferences the user wishes to override.
     **/
    asr.pg.init = function(preferences) {
        preferences = $.extend({}, asr.pg.default_prefs, preferences);
        var $guide = $(preferences.steps_element);
        var uuid = asr.pg.hashCode(preferences.steps_element);
        clearInterval(asr.pg.interval[uuid]);

        /* page guide object, for pages that have one */
        if ($guide.length === 0) {
            return;
        }

        // only worry about pointer_fallback if pointers are not supported in
        // the user's browser
        if (preferences.pointer_fallback && asr.pg.pointerEventSupport()) {
            preferences.pointer_fallback = false;
        }

        var $wrapper = $('#asrPageGuideWrapper');
        var wrapperExists = true;
        if (!$wrapper.length) {
            wrapperExists = false;
            $wrapper = $(asr.pg.wrapper_markup);
        }

        if (preferences.custom_open_button == null &&
            $('#asrPageGuideToggle' + uuid).length < 1) {
            var $toggle = $(asr.pg.toggle_markup)
                .attr('id', ('asrPageGuideToggle' + uuid));
            $wrapper.find('#asrPageGuideToggles').append($toggle);
        }

        if (!wrapperExists) {
            $('body>#d1>form>.first-wrapper').prepend($wrapper);
        }

        var pg = new asr.pg.PageGuide($('#asrPageGuideWrapper'), preferences);

        pg.ready(function() {
            pg.setup_welcome();
            // start (neverending) welcome watch timer if preference is enabled
            if (pg.preferences.welcome_refresh) {
                pg.updateTimer(function () {
                    pg.setup_welcome();
                }, 'خوش آمدید');
            }
            pg.setup_handlers();
            $("#asrPageGuideToggles").css("left",$(".DateTimeClasss").width() + 215);
            if (typeof(preferences.ready_callback) === 'function') {
                preferences.ready_callback();
            }
        });
        asr.pg.pageGuideList.push(pg);
        return pg;
    };

    /**
     * constructor for the base PageGuide object. contains: relevant elements,
     * user-defined preferences, and state information. all of this data is public.
     * pg_elem (jQuery element): the base wrapper element which contains all the pg
     *     elements
     * preferences (object): combined user-defined and default preferences.
     **/
    asr.pg.PageGuide = function (pg_elem, preferences) {
        this.preferences = preferences;
        this.$base = pg_elem;
        this.$message = this.$base.find('#asrPageGuideMessages');
        
        this.$play = this.$base.find('a.asrpageguide_play');
        this.playStatus = null; /* stop = null | play =1 */
        this.playInterval= null;
        this.$fwd = this.$base.find('a.asrpageguide_fwd');
        this.$back = this.$base.find('a.asrpageguide_back');
        this.$content = this.$base.find('#asrPageGuideContent');
        this.$steps = $(preferences.steps_element);
        this.uuid = asr.pg.hashCode(preferences.steps_element);
        this.$toggle = this.$base.find('#asrPageGuideToggle' + this.uuid);
        this.cur_idx = 0;
        
        this.cur_selector = null;
        this.track_event = this.preferences.track_events_cb;
        this.handle_doc_switch = this.preferences.handle_doc_switch;
        this.custom_open_button = this.preferences.custom_open_button;
        this.is_open = false;
        this.targetData = {};
        this.hashTable = {};
        this.changeQueue = [];
        this.visibleTargets = [];
        this.timer = {
            overlay: null,
            welcome: null
        };
    };

    /**
     * hash the current page's url. used in the default check_welcome_dismissed
     * and dismiss_welcome functions
     **/
    asr.pg.hashUrl = function () {
        return asr.pg.hashCode(window.location.href);
    };

    /**
     * generate a random numeric hash for a given string. originally from:
     * http://stackoverflow.com/a/7616484/1135244
     * str (string): the string to be hashed
     **/
    asr.pg.hashCode = function (str) {
        var hash = 0, i, c;
        if (str == null || str.length === 0) {
            return hash;
        }
        for (i = 0; i < str.length; i++) {
            c = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+c;
            hash = hash & hash;
        }
        return hash.toString();
    };

    /**
     * check whether the element targeted by the given selector is within the
     * currently scrolled viewport.
     * elem (string): selector for the element in question
     **/
    asr.pg.isScrolledIntoView = function(elem, height) {
        var dvtop = $(window).scrollTop(),
            dvbtm = dvtop + $(window).height(),
            eltop = $(elem).offset().top,
            elbtm = eltop + $(elem).height();

        return (eltop >= dvtop) && (elbtm <= dvbtm - height);
    };

    /**
     * remove all traces of pageguide from the DOM.
     **/
    asr.pg.destroy = function () {
        $('#asrPageGuideWrapper').remove();
        $('body').removeClass('asrpageguide-open');
        $('body').removeClass('asrPageGuideWelcomeOpen');
        for (var k in asr.pg.interval) {
            if (asr.pg.interval.hasOwnProperty(k)) {
                clearInterval(asr.pg.interval[k]);
            }
        }
    };

    /**
     * check whether pointer events are supported in the user's browser.
     * from http://stackoverflow.com/a/8898475/1135244
     **/
    asr.pg.pointerEventSupport = function () {
        var element = document.createElement('x');
        var documentElement = document.documentElement;
        var getComputedStyle = window.getComputedStyle;
        var supports = null;
        if(!('pointerEvents' in element.style)){
            return false;
        }
        element.style.pointerEvents = 'auto';
        element.style.pointerEvents = 'x';
        documentElement.appendChild(element);
        supports = getComputedStyle && getComputedStyle(element, '').pointerEvents === 'auto';
        documentElement.removeChild(element);
        return !!supports;
    };

    /**
     * close any other open pageguides
     * uuid (string): the uuid of the pageguide that should remain open
     **/
    asr.pg.closeOpenGuides = function (uuid) {
        for (var i=0; i<asr.pg.pageGuideList.length; i++) {
            if (asr.pg.pageGuideList[i].uuid !== uuid) {
                asr.pg.pageGuideList[i].close();
            }
        }
    }

    /**
     * check for a welcome message. if it exists, determine whether or not to show it,
     * using self.preferences.check_welcome_dismissed. then, bind relevant handlers to
     * the buttons included in the welcome message element.
     **/
    asr.pg.PageGuide.prototype.setup_welcome = function () {
        var $welcome = $('.asrPageGuideWelcome, #asrPageGuideWelcome')
            .not('#asrPageGuideWrapper > .asrPageGuideWelcome, #asrPageGuideWrapper > #asrPageGuideWelcome')
            .eq(0);
        var self = this;
        if ($welcome.length > 0) {
            self.preferences.show_welcome = !self.preferences.check_welcome_dismissed();
            if (self.preferences.show_welcome) {
                $welcome.appendTo(self.$base);
            }

            if ($welcome.find('.asrpageguide_ignore').length) {
                $welcome.on('click', '.asrpageguide_ignore', function () {
                    self.close_welcome();
                    self.track_event('PG.ignoreWelcome');
                });
            }
            if ($welcome.find('.asrpageguide_dismiss').length) {
                $welcome.on('click', '.asrpageguide_dismiss', function () {
                    self.close_welcome();
                    self.preferences.dismiss_welcome();
                    self.track_event('PG.dismissWelcome');
                });
            }
            $welcome.on('click', '.asrpageguide_start', function () {
                self.open();
                self.track_event('PG.startFromWelcome');
            });

            if (self.preferences.show_welcome) {
                self.pop_welcome();
            }
        }
    };

    /**
     * timer function. will poll the DOM at 250ms intervals until the user-defined
     * self.preferences.loading_selector becomes visible, at which point it will
     * execute the given callback. useful in cases where the DOM elements pageguide
     * depends on are loaded asynchronously.
     * callback (function): executes when loading selector is visible
     **/
    asr.pg.PageGuide.prototype.ready = function(callback) {
        var self = this;
        asr.pg.interval[self.uuid] = window.setInterval(function() {
                if (!$(self.preferences.loading_selector).is(':visible')) {
                    callback();
                    clearInterval(asr.pg.interval[self.uuid]);
                }
            }, 250);
        return this;
    };

    /**
     * grab any pageguide steps on the page that have not yet been added
     * to the pg object. for each one, append a shadow element and corresponding
     * index bubble to #asrPageGuideContent.
     **/
    asr.pg.PageGuide.prototype.addSteps = function () {
        var self = this;
        self.$steps.find('li').each(function (i, el) {
            var $el = $(el);
            var tourTarget = $el.data('tourtarget');
            var positionClass = $el.attr('class');
            if (self.targetData[tourTarget] == null) {
                self.targetData[tourTarget] = {
                    targetStyle: {},
                    content: $el.html()
                };
                var hashCode = asr.pg.hashCode(tourTarget) + '';
                self.hashTable[hashCode] = tourTarget;
                self.$content.append(
                    '<div class="asrpageguide_shadow asrpageguide_shadow' + hashCode +
                    '" data-selectorhash="' + hashCode + '">' +
                        '<span class="asrPageGuideStepIndex ' + positionClass +'"></span>' +
                    '</div>'
                );
            }
        });
    };

    /**
     * go through all the current targets and check whether the elements are
     * on the page and visible. if so, record all appropriate css data in self.targetData.
     * any changes in each self.targetData element get pushed to self.changeQueue.
     **/
    asr.pg.PageGuide.prototype.checkTargets = function () {
        var self = this;
        var visibleIndex = 0;
        var newVisibleTargets = [];
        for (var target in self.targetData) {
            var $elements = $(target);
            var $el;
            // assume all invisible
            var newTargetData = {
                targetStyle: {
                    display: 'none'
                }
            };
            // find first visible instance of target selector per issue #4798
            for(var i = 0; i < $elements.length; i++){
                if($($elements[i]).is(':visible') ){
                    $el = $($elements[i]); // is it weird to '$($x)'?
                    newTargetData.targetStyle.display = 'block';
                    var offset = $el.offset();
                    $.extend(newTargetData.targetStyle, {
                        top: offset.top,
                        left: offset.left,
                        width: $el.outerWidth(),
                        height: $el.outerHeight(),
                        'z-index': $el.css('z-index')
                    });
                    visibleIndex++;
                    newTargetData.index = visibleIndex;
                    newVisibleTargets.push(target);
                    break;
                }
            }
            var diff = {
                target: target
            };
            // compare new styles with existing ones
            for (var prop in newTargetData.targetStyle) {
                if (newTargetData.targetStyle[prop] !== self.targetData[target][prop]) {
                    if (diff.targetStyle == null) {
                        diff.targetStyle = {};
                    }
                    diff.targetStyle[prop] = newTargetData.targetStyle[prop];
                }
            }
            // compare index with existing index
            if (newTargetData.index !== self.targetData[target].index) {
                diff.index = newTargetData.index;
            }
            // push diff onto changequeue if changes have been made
            if (diff.targetStyle != null || diff.index != null) {
                self.changeQueue.push(diff);
            }
            $.extend(self.targetData[target], newTargetData);
        }
        self.visibleTargets = newVisibleTargets;
    };

    /**
     * position the shadow elements (and their attached index bubbles) in their
     * appropriate places over the visible targets. executes by iterating through
     * all the changes that have been pushed to changeQueue
     **/
    asr.pg.PageGuide.prototype.positionOverlays = function () {
        for (var i=0; i<this.changeQueue.length; i++) {
            var changes = this.changeQueue[i];
            var selector = '.asrpageguide_shadow' + asr.pg.hashCode(changes.target);
            var $el = this.$content.find(selector);
            if (changes.targetStyle != null) {
                var style = $.extend({}, changes.targetStyle);
                for (var prop in style) {
                    // fix this
                    if (prop === 'z-index') {
                        style[prop] = (typeof style[prop] === 'number') ?
                            style[prop] + 1 : this.preferences.default_zindex;
                    }
                }
                $el.css(style);
            }
            if (changes.index != null) {
                $el.find('.asrPageGuideStepIndex').text(changes.index);
            }
        }
        this.changeQueue = [];
    };

    /**
     * find all pageguide steps and appropriately position their corresponding pageguide
     * elements. ideal to run on its own whenever pageguide is opened, or when a DOM
     * change takes place that will not affect the visibility of the target elements
     * (e.g. resize)
     **/
    asr.pg.PageGuide.prototype.refreshVisibleSteps = function () {
        this.addSteps();
        this.checkTargets();
        this.positionOverlays();
    };

    /**
     * update visible steps on page, and also navigate to the next available step if
     * necessary. this is especially useful when DOM changes take place while the
     * pageguide is open, meaning its target elements may be affected.
     **/
    asr.pg.PageGuide.prototype.updateVisible = function () {
        this.refreshVisibleSteps();
        if (this.cur_selector != null && this.cur_selector !== this.visibleTargets[this.cur_idx]) {
            // mod by target length in case user was viewing last target and it got removed
            var newIndex = this.cur_idx % this.visibleTargets.length;
            this.show_message(newIndex);
        }
    };

    /**
     * show the step specified by either a numeric index or a selector.
     * index (number): index of the currently visible step to show.
     **/
    asr.pg.PageGuide.prototype.show_message = function (index) {
        var targetKey = this.visibleTargets[index];
        var target = this.targetData[targetKey];
        if (target != null) {
            var selector = '.asrpageguide_shadow' + asr.pg.hashCode(targetKey);

            if (this.handle_doc_switch) {
                var len = this.visibleTargets.length;
                var prevTargetKey = this.visibleTargets[(index - 1 + len) % len];
                this.handle_doc_switch(targetKey, prevTargetKey);
            }

            this.$content.find('.asrpageguide-active').removeClass('asrpageguide-active');
            this.$content.find(selector).addClass('asrpageguide-active');

            this.$message.find('.asrpageguide_text').html(target.content);
            this.cur_idx = index;
            this.cur_selector = targetKey;

            // DOM stuff
            var defaultHeight = 70;
            var oldHeight = parseFloat(this.$message.css("height"));
            this.$message.css("height", "auto");
            var height = parseFloat(this.$message.outerHeight());
            this.$message.css("height", oldHeight);
            if (height < defaultHeight) {
                height = defaultHeight;
            }
            if (height > $(window).height()/2) {
                height = $(window).height()/2;
            }

            this.$message.show().animate({'height': height}, 500);
            this.$message.css('z-index',this.preferences.default_zindex +1);
            if (!asr.pg.isScrolledIntoView($(targetKey), this.$message.outerHeight())) {
                $('html,body').animate({scrollTop: target.targetStyle.top - 155}, 500);
            }
            this.roll_number(this.$message.find('span'), target.index);
        }
    };

    /**
     * navigate to the previous step. if at the first step, loop around to the last.
     **/
    asr.pg.PageGuide.prototype.navigateBack = function () {
        /*
         * If -n < x < 0, then the result of x % n will be x, which is
         * negative. To get a positive remainder, compute (x + n) % n.
         */
        var new_index = (this.cur_idx + this.visibleTargets.length - 1) % this.visibleTargets.length;

        this.track_event('PG.back');
        this.show_message(new_index, true);
        return false;
    };
    
    /**
     * navigate to the next step. if at last step, loop back to the first.
     **/
    asr.pg.PageGuide.prototype.navigateForward = function () {
        if (this.is_open) {
            var new_index = (this.cur_idx + 1) % this.visibleTargets.length;
    
            this.track_event('PG.fwd');
            this.show_message(new_index, true);
        }
        return false;
    };

    /**
     * open the pageguide! can be fired at any time, though it's usually done via
     * the toggle element (either boilerplate or user-specified) or the welcome
     * modal.
     **/
    asr.pg.PageGuide.prototype.open = function() {
        if (this.is_open) {
            return;
        } else {
            asr.pg.closeOpenGuides(this.uuid);
            this._open();
        }
    };

    asr.pg.PageGuide.prototype._open = function () {
        if (this.preferences.show_welcome) {
            this.preferences.dismiss_welcome();
            this.close_welcome();
        }
        this.is_open = true;
        this.track_event('PG.open');

        this.refreshVisibleSteps();

        if (this.preferences.auto_show_first && this.visibleTargets.length) {
            this.show_message(0);
        }
        $('body').addClass('asrpageguide-open');
        this.$toggle.addClass('asrPageGuideToggleActive');

        var self = this;
        if (self.preferences.auto_refresh) {
            self.updateTimer(function () {
                self.updateVisible();
            }, 'overlay');
        }
    };

    asr.pg.PageGuide.prototype.updateTimer = function (cb, prop) {
        var self = this;
        cb();
        self.timer[prop] = setTimeout(function () {
            self.updateTimer(cb, prop);
        }, self.preferences.refresh_interval);
    };

    /**
     * close the pageguide. can also be fired at any time, though usually done via
     * the toggle or the close button.
     **/
    asr.pg.PageGuide.prototype.close = function() {
        if (!this.is_open) {
            return;
        } else {
            this._close();
        }
    };

    asr.pg.PageGuide.prototype._close = function () {
        this.is_open = false;
        this.track_event('PG.close');
        if (this.preferences.auto_refresh) {
            clearTimeout(this.timer.overlay);
            
        }

        this.$content.find('.asrpageguide_shadow').css('display', 'none');
        this.$content.find('.asrpageguide-active').removeClass('asrpageguide-active');
        this.$message.animate({ height: "0" }, 500, function() {
            $(this).hide();
        });

        $('body').removeClass('asrpageguide-open');
        this.$toggle.removeClass('asrPageGuideToggleActive');
    };

    /**
     * bind all relevant event handlers within the document.
     **/
    asr.pg.PageGuide.prototype.setup_handlers = function () {
        var self = this;

        /* interaction: open/close PG interface */
        var interactor = (self.custom_open_button == null) ?
                        self.$base.find('#asrPageGuideToggle' + self.uuid) :
                        $(self.custom_open_button);
        interactor.off();
        interactor.on('click', function() {
            if (self.is_open) {
                self.close();
            } else if (self.preferences.show_welcome &&
                      !self.preferences.check_welcome_dismissed() &&
                      !$('body').hasClass('asrPageGuideWelcomeOpen')) {
                self.pop_welcome();
            } else {
                self.open();
            }
        });

        /* close guide */
        $('.asrpageguide_close', self.$message.add($('.asrpageguide_toggle')))
            .on('click', function() {
                self.close();
                return false;
        });

        /* interaction: item click */
        self.$base.on('click', '.asrPageGuideStepIndex', function () {
            var selector = self.hashTable[$(this).parent().data('selectorhash')];
            var target = self.targetData[selector];
            var index = (target) ? target.index : 1;
            self.track_event('PG.specific_elt');
            self.show_message(index - 1);
        });
        
        /* interaction: paly/fwd/back click */
        self.$play.on('click', function (){
            if (self.is_open) {
                if (this.playStatus==null){
                    /* play */
                    self.navigateForward();
                    this.playInterval = setInterval(function(){ self.navigateForward(); }, 5000);
                    this.playStatus = 1;
                    self.$play.removeClass('fa-play').addClass('fa-pause');
                }else{
                    /* pause */
                    this.playStatus = null;
                    self.$play.removeClass('fa-pause').addClass('fa-play');
                    clearInterval(this.playInterval);
                }
            }
            return false;
        });
        /* next */
        self.$fwd.on('click', function() {
            if (self.is_open) {
                self.navigateForward();
            }
            return false;
        });
        /* back */
        self.$back.on('click', function() {
            if (self.is_open) {
                self.navigateBack();
            }
            return false;
        });

        // pass through click events on overlays if necessary
        if (self.preferences.pointer_fallback) {
            self.$base.on('click', '.asrpageguide_shadow', function (e) {
                $(this).hide();
                var $bottomElement = $(document.elementFromPoint(e.clientX, e.clientY));
                if ($bottomElement.is('a')) {
                    $bottomElement.get(0).click(); // required for anchor click
                } else {
                    $bottomElement.trigger(e.type);
                }
                $(this).show();
            });
        }

        /* register resize callback */
        $(window).resize(function() {
            if (self.is_open) {
                self.refreshVisibleSteps();
            }
        });
    };

    /**
     * animate a given number to roll to the side.
     * num_wrapper (jQuery element): the element whose number to roll
     * new_text (string): the new text to roll across the element
     * left (boolean): whether or not to roll to the left-hand side
     **/
    asr.pg.PageGuide.prototype.roll_number = function (num_wrapper, new_text, left) {
        num_wrapper.animate({ 'text-indent': (left ? '' : '-') + '50px' }, 'fast', function() {
            num_wrapper.html(new_text);
            num_wrapper.css({ 'text-indent': (left ? '-' : '') + '50px' }, 'fast').animate({ 'text-indent': "0" }, 'fast');
        });
    };

    /**
     * pop up the welcome modal.
     **/
    asr.pg.PageGuide.prototype.pop_welcome = function () {
        $('body').addClass('asrPageGuideWelcomeOpen');
        this.track_event('PG.welcomeShown');
    };

    /**
     * close the welcome modal.
     **/
    asr.pg.PageGuide.prototype.close_welcome = function () {
        $('body').removeClass('asrPageGuideWelcomeOpen');
    };
}(jQuery));
