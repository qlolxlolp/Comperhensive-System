
/**
 * Created by MORTEZA SADEGHI on 1/22/2015.
 */
 
 
 
 
 
/* -----------------------------------------------------------------------------
 public variable ---------------------------------------------------------------
----------------------------------------------------------------------------- */

var menuBarHeight = 45;            /* public template menubar height variable */
var varScrollSticky = false;                    /* panelbox sticky true/false */
var userMenuTimeout = 0;                        /* template user menu varible */
var userMenuHovering = false;                   /* template user menu varible */
var timeOutFadakRemove;                     /* Fadak Toolbar message variable */
var zoomScale = 1.2;                    /* carousel Zoom scale Image variable */









        
/* -----------------------------------------------------------------------------
 main functions ----------------------------------------------------------------
----------------------------------------------------------------------------- */

$(document).ready(function() {


    /*--------------- move FADAK TOOLBAR message on top page func --------------
    ------------------------------------------------------------------------- */
    $(".fadak-message").initialize(function(){
        $('.message-bar .fadak-message').remove();
        $('.fadak-message').prependTo('.message-bar').addClass("animated fadeInRight");
        
        //$("#asrPageGuideToggle471517755").prependTo(window.parent.$('.message-bar'));
        
        clearTimeout(window.timeOutFadakRemove);
        window.timeOutFadakRemove = setTimeout(function(){$('.fadak-message').removeClass("animated fadeInRight").fadeOut(5000);}, 2000);
    });
    
    
    

    /*-------------- cartable -- panel splitter(task) resize func --------------
    ------------------------------------------------------------------------- */
    $(".cartable").initialize(function(){
        resizeCartable();
    });
    
    
    

    /*-------------- Template Guide -- panel splitter resize func --------------
    ------------------------------------------------------------------------- */
    $(".template-guide").initialize(function(){
        resizeTemplateGuide();
    });
    
    
    
    
    /*-------------- Template Guide -- fix table scroll horizontal in chrome ---
    ------------------------------------------------------------------------- */
    
    $(".af_table").initialize(function(){
        setTimeout(function() {
            //console.log("initialize scroll");
            $("div.af_table>div:last-child").scrollLeft(10000);
        },1000);
    });
    
    
    
    /*-------------- All form --  Copy Text Double Click func ------------------
    ------------------------------------------------------------------------- */
   $(document).dblclick(function(event) {
        if (
                (event.target.nodeName.toLowerCase()=='td' && $(event.target).hasClass('af_column_data-cell') && $(event.target).hasClass('copy')) || 
                (event.target.nodeName.toLowerCase()=='span' && event.target.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode).hasClass('copy')) ||
                (event.target.nodeName.toLowerCase()=='span' && event.target.parentNode.nodeName.toLowerCase()=='span' && event.target.parentNode.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode.parentNode).hasClass('copy')) ||
                (event.target.nodeName.toLowerCase()=='span' && $(event.target).hasClass('af_inputListOfValues_content') && event.target.parentNode.nodeName.toLowerCase()=='span' && $(event.target.parentNode).hasClass('af_inputListOfValues') && $(event.target.parentNode).hasClass('p_AFReadOnly') && event.target.parentNode.parentNode.nodeName.toLowerCase()=='span' && event.target.parentNode.parentNode.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode.parentNode.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode.parentNode.parentNode).hasClass('copy')) ||
                (event.target.nodeName.toLowerCase()=='input' && $(event.target).hasClass('af_inputText_content') && event.target.parentNode.nodeName.toLowerCase()=='span' && $(event.target.parentNode).hasClass('af_inputText') && $(event.target.parentNode).hasClass('p_AFDisabled') && event.target.parentNode.parentNode.nodeName.toLowerCase()=='span' && event.target.parentNode.parentNode.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode.parentNode.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode.parentNode.parentNode).hasClass('copy')) ||
                (event.target.nodeName.toLowerCase()=='span' && $(event.target).hasClass('af_inputText_content') && event.target.parentNode.nodeName.toLowerCase()=='span' && $(event.target.parentNode).hasClass('af_inputText') && $(event.target.parentNode).hasClass('p_AFReadOnly') && event.target.parentNode.parentNode.nodeName.toLowerCase()=='span' && event.target.parentNode.parentNode.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode.parentNode.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode.parentNode.parentNode).hasClass('copy')) ||
                (event.target.nodeName.toLowerCase()=='span' && $(event.target).hasClass('af_selectOneChoice_content') && event.target.parentNode.nodeName.toLowerCase()=='span' && $(event.target.parentNode).hasClass('af_selectOneChoice') && $(event.target.parentNode).hasClass('p_AFReadOnly') && event.target.parentNode.parentNode.nodeName.toLowerCase()=='span' && event.target.parentNode.parentNode.parentNode.nodeName.toLowerCase()=='td' && $(event.target.parentNode.parentNode.parentNode).hasClass('af_column_data-cell') && $(event.target.parentNode.parentNode.parentNode).hasClass('copy'))
           )
        {
                var $temp = $("<input>");
                $("body").append($temp);
                var text = $(event.target).text();
                $temp.val(text).select();
                document.execCommand("copy");
                $temp.remove();
                $(event.target).addClass("copied");
                setTimeout(function() {$(event.target).removeClass("copied");},1200);
        }
    });
    
    
    
    
    /*-------------------- resize page -- call resize func ---------------------
    ------------------------------------------------------------------------- */
    $(window).resize(function() {
        /* call resize template main menu func */
        resizeContentMenu();

        /*refresh page guide func */
        asr.pg.init();
        
        /*resize cartable panel-Spliter func */
        resizeCartable();
        
        /*resize templateGuide panel-Spliter func */
        resizeTemplateGuide();
        
        /*resize panel-Form Column func */
        resizeColumn();
                
        /*refresh panel tab func */
        panelTabbedAutoHeight();
    });
    
    resizeContentMenu();


    
    /*----------------------- page intro animation funcs -----------------------
    ------------------------------------------------------------------------- */
    setTimeout(function() {$('.menu-bar').css("opacity","1").addClass("animated fadeInDown");}, 500);
    setTimeout(function() {$('.bread-crumb').prependTo('.bread-crumb-panel').css("opacity","1").addClass("animated fadeInDown");}, 1100);
    setTimeout(function() {$('.main-content').css("opacity","1").addClass("animated fadeIn");}, 1600);
    setTimeout(function() {
        $('.menu-bar').removeClass("fadeInDown");
        $('.bread-crumb').removeClass("fadeInDown");
        $('.main-content').removeClass("fadeIn");
    }, 4000);

    $(".form").initialize(function(){
        $('.form').addClass("animated fadeIn");
    });
    
    
    
    
    /*-------------------------------------------------- call page guide func */
    asr.pg.init();
    $(".asrPageGuide").initialize(function(){
        asr.pg.init();
    }); 
    
    
    
    
    /*-------------------------------- jd -- call panelTabbed AutoHeight func */
    $(".panelTabbedAutoHeight").initialize(function(){
        //console.log("--initialize panelTabbedAutoHeight");
        resizeColumn();
        panelTabbedAutoHeight();
    });  
    
    
    
    
    /*-------------------------------- jd -- call panelTabbed AutoHeight func */
    /* panelbox open and close */
    $(".panelBoxAutoHeight").initialize(function(){
        //console.log("--initialize panelBoxAutoHeight");
        panelTabbedAutoHeight();
    });  
    
    
    
    
    /*-------------------------------------- jd -- call table AutoHeight func */
    $(".full-height-table").initialize(function(){
        resizeFullHeight();
    });  
    
    
    
    
    /*------------------------------ jd -- call requiredIcon panelTabbed func */
    $(".required").initialize(function(){
        requiredPanelTabbed();
    });

    
    

    /*-------------------------------- carousel -- call & set move image func */
    $(".perspective").initialize(function(){
        $('.image-scroll-area').kinetic();
    });
    



    /*------------------------------------------ panel-form resizeColumn func */
    $(".column").initialize(function(){
        resizeColumn();
    }); 




    /*---------------------------- template main-menu -- call open/close func */
    $(".menu-bar .btn-logo").click(function () {
        openCloseMenu();
    });




    /*---------- template main-menu -- call open/close func (link-menu click) */
    $('.page-menu .tab-content .panel .panel-body a').click(function(){
        openCloseMenu();
    });




    /*---------------------- template main-menu -- set & call change tab func */
    $('.tabs > ul').addClass("tab-links");
    $('.tab-links > li:first').addClass('active');
    $(".tabs .tab-links a").click(function () {
        changeTab($(this));
    });




    /*---------------- template main-menu -- call change panel accordion func */
    $(".page-menu .tab-content .panel-title a").click(function () {
        openCloseAccordion($(this));
    });




    /*----------------------------------------- call template user menu funcs */
    $('.dropdown-toggle')
        .on("click", function () {
            //console.log("---dropdown-toggle--mouseenter");
            window.userMenuHovering = true;
            $(".dropdown-user-menu").width($(".menu-bar .dropdown-toggle").width() + 30);
            $('.dropdown-user-menu').stop(true, true).slideDown(400);
        }).on("mouseleave", function () {
            //console.log("---dropdown-toggle--mouseleave");
            userMenuResetHover();
        });

    $(".dropdown-user-menu")
        .on("mouseenter", function () {
            //console.log("---dropdown-user-menu--mouseenter");
            window.userMenuHovering = true;
            userMenuStartTimeout();
        }).on("mouseleave", function () {
            //console.log("---dropdown-user-menu--mouseleave");
            userMenuResetHover();
        });
    
});








/* -----------------------------------------------------------------------------
 General Functions -------------------------------------------------------------
----------------------------------------------------------------------------- */
     function queueCommandAction(event){
         var component = AdfPage.PAGE.findComponent(event);
         var actionEvent = new AdfActionEvent(component);
         actionEvent.queue();
     }




    /*------------------------------------- template main-menu -- resize func */
    function resizeContentMenu() { 
        var height = $(window).height() - (298 + window.menuBarHeight);
        //page-menu
        $('.page-menu .tab-content .panel .panel-body').css('min-height', height);
        $('.page-menu .tab-content').css('min-height', $(window).height() - (110 + window.menuBarHeight) );
        $('.full-height-table').css('min-height',($(window).height() - 160 ));
    }
    
    


    /*-------------------------- Template Guide -- panel splitter resize func */
    function resizeTemplateGuide(){
        $('.template-guide').css('min-height', $(window).height() - 28 );
    };
    
    
    
    
    /*-------------------------- cartable -- panel splitter(task) resize func */
    function resizeCartable(){
        $('.cartable').css('min-height', $(window).height() - (20 + window.menuBarHeight));
    };




    /*-------------------------------------- Other Pages -- table resize func */
    function resizeFullHeight(){
        $('.full-height-table').css('min-height',($(window).height() - 160 ));
    };




    /*--------------------------------- template main-menu -- open/close func */
    function openCloseMenu() {
        if ($(".page-menu").hasClass("fadeInDownBig")) {
            //close
            $(".page-menu").addClass("fadeOutUpBig").removeClass("fadeInDownBig");
            $(".menu-bar .btn-logo").removeClass("open");
            $(".menu-bar .btn-logo span img").removeClass("flipInX").addClass("pulse");
            $(".menu-bar .btn-logo .text1").addClass("fadeInUp").removeClass("fadeOutDown");
            $(".menu-bar .btn-logo .text2").addClass("fadeOutUp").removeClass("fadeInDown");
            $(".overlay").addClass("fadeOut");
            setTimeout(function() {$(".overlay").removeClass("open");}, 1000);
        }else{
            //open
            $(".overlay").removeClass("fadeOut").addClass("open fadeIn");
            $(".page-menu").removeClass("fadeOutUpBig").addClass("open fadeInDownBig");
            $(".menu-bar .btn-logo").addClass("open");
            $(".menu-bar .btn-logo span img").removeClass("pulse").addClass("animated flipInX");
            $(".menu-bar .btn-logo .text1").addClass("fadeOutDown").removeClass("fadeInUp");
            $(".menu-bar .btn-logo .text2").addClass("fadeInDown").removeClass("fadeOutUp");
        }
    }
    



    /*--------------------------------- template main-menu -- change tab func */
    function changeTab($address) {
        // active/deactive tab-link
        $address.parent('li').addClass('active').siblings().removeClass('active');
    
        // Show/Hide Tab-content
        var currentAttrValue = $address.attr('href');
        $('.tab-content .tab').removeClass('active');
        $("div[id$=" + currentAttrValue.substring(1) + "]" ).addClass('active'); 
        //console.log("div[id$=" + currentAttrValue.substring(1) + "]");
    }
    
    
    

    /*--------------------- template main-menu -- change panel accordion func */
    function openCloseAccordion($address) {
        
        $panelGroup = $address.parent().parent().parent().parent().parent().parent();
        $panelBody = $panelGroup.children().children().children().children(".panel-body");
        $panelTitle = $panelGroup.children().children().children().children(".panel-title").children().children("a");
    
        //open
        if ($address.hasClass("fa-chevron-left")) {
            //others
            $panelTitle.removeClass("fa-chevron-down active").addClass("fa-chevron-left");
            $panelBody.removeClass('open');
            //this
            $address.removeClass("fa-chevron-left").addClass("fa-chevron-down");
            $address.addClass("active");
            var currentAttrValue = $address.attr('href');
            $("div[id$=" + currentAttrValue.substring(1) + "]" ).addClass('open'); 
            //console.log("div[id$=" + currentAttrValue.substring(1) + "]");
        //close
        }else if ($address.hasClass("fa-chevron-down")) {
    
            $address.removeClass("fa-chevron-down").addClass("fa-chevron-left");
            $address.removeClass("active");
            $panelBody.removeClass('open');
        }
    }
    



    /*------------------------------------- jd -- panelTabbed AutoHeight func */
    function panelTabbedAutoHeight() { 
        var panelTabbed = $("[class*='panelTabbedAutoHeight']");
        //console.log("--call panelTabbedAutoHeight");
        //console.log(panelTabbed.length);
        for (var i=(panelTabbed.length-1); i>=0; i--){
            //console.log(panelTabbed.eq(i));
            $autoHeight = panelTabbed.eq(i).children().children().children().children(".af_showDetailItem").children();
            panelTabbed.eq(i).css('height', $autoHeight.height() + 50);
            //console.log($autoHeight.height());
        }
    }




    /*----------------------------------- jd -- requiredIcon panelTabbed func */
    function requiredPanelTabbed() { 
        var panelTabbedRequired =$(".required");
        //console.log("--panelTabbedRequired");
        //console.log(panelTabbedRequired.length);
        for (var i=0; i<panelTabbedRequired.length; i++){
            //console.log(panelTabbedRequired.eq(i).attr('id'));
            var vRequired = $("[_afrptkey='" + panelTabbedRequired.eq(i).attr('id') + "']");
            vRequired.addClass("panelTabbedRequired");
        }
    }
    
    

    /*------------------------------------------ panel-form resizeColumn func */
    function resizeColumn() {
        var columnPanelForm =$(".column");
//        console.log(columnPanelForm.length);
//        console.log($(window).width());
        for (var i=(columnPanelForm.length-1); i>=0; i--){
//            console.log(columnPanelForm.eq(i).children().length);
            var objectHeight = columnPanelForm.eq(i).children().eq(0).height();
            var classList = columnPanelForm.eq(i).children().eq(0).attr("class");
            
            for (var iii=(columnPanelForm.eq(i).children().length -1); iii>=0; iii--){
                columnPanelForm.eq(i).children().eq(iii).css( "max-height",objectHeight+ "px" );
            }
            
            //medium
            var a = "col-md-";
            var b = 1199;
            if ($(window).width() <= (b-17)  && classList.toLowerCase().indexOf(a) >= 0){
                var x = classList.substring((classList.toLowerCase().indexOf(a)+7),(classList.toLowerCase().indexOf(a)+9));
                var y = 24/x;
                var z = (columnPanelForm.eq(i).children().length + (y-1))/y;
                var k = Math.floor(z);
                var m = objectHeight * k;
                //console.log(a+m);
                columnPanelForm.eq(i).height(m);
            }
            
            
            //small
            var a = "col-sm-";
            var b = 991;
             //console.log(a);
            if ($(window).width() <= (b-17)  && classList.toLowerCase().indexOf(a) >= 0){
                var x = classList.substring((classList.toLowerCase().indexOf(a)+7),(classList.toLowerCase().indexOf(a)+9));
                //console.log("x"+x);
                var y = 24/x;
                //console.log("y"+y);
                var z = (columnPanelForm.eq(i).children().length + (y-1))/y;
                //console.log("z"+z);
                var k = Math.floor(z);
                //console.log("k"+k);
                var m = objectHeight * k;
                //console.log("m"+m);
                columnPanelForm.eq(i).height(m);
            }           
            
            //x-small
            var a = "col-xs-";
            var b = 768;
            if ($(window).width() <= (b-17)  && classList.toLowerCase().indexOf(a) >= 0){
                var x = classList.substring((classList.toLowerCase().indexOf(a)+7),(classList.toLowerCase().indexOf(a)+9));
                var y = 24/x;
                var z = (columnPanelForm.eq(i).children().length + (y-1))/y;
                var k = Math.floor(z);
                var m = objectHeight * k;
                //console.log(a+m);
                columnPanelForm.eq(i).height(m);
            } 
            
            //large
            var a = "col-lg-";
            var b = 1200;
            if ($(window).width() >= (b-17)  && classList.toLowerCase().indexOf(a) >= 0){
                var x = classList.substring((classList.toLowerCase().indexOf(a)+7),(classList.toLowerCase().indexOf(a)+9));
                var y = 24/x;
                var z = (columnPanelForm.eq(i).children().length + (y-1))/y;
                var k = Math.floor(z);
                var m = objectHeight * k;
                //console.log(a+m);
                columnPanelForm.eq(i).height(m);
            }
            
        }
    }
    
    

    /*---------------------------------------------- template user menu funcs */
    function userMenuStartTimeout() {
        //console.log("--2-userMenuStartTimeout");
        window.userMenuTimeout = setTimeout(function () {
            userMenuCloseMenu();
        }, 400);
    };
    function userMenuCloseMenu() {
        //console.log("--3-userMenuCloseMenu");
        //console.log("--timer: " + window.userMenuTimeout);
        if (!window.userMenuHovering) {
            $('.dropdown-user-menu').slideUp(400);
        }
    };
    function userMenuResetHover() {
        //console.log("--1-userMenuResetHover");
        window.userMenuHovering = false;
        clearTimeout(window.userMenuTimeout);
        userMenuStartTimeout();
    };
    
    
    
    
    /*------------------------------------------- Carousel -- Image FullScreen func */
    function imgFull() {
        console.log("--- FullScreen ---");
        $(".af_carousel_item.p_AFCircular").toggleClass("full");
    };
        /*------------------------------------------- Carousel -- Image FullScreen func */
    function imgRotate() {
        console.log("--- imgRotate ---");
        var image = $('.af_carousel_item.p_AFCircular.p_AFSelected .af_carouselItem .image-scroll-area img.image');

        if(image.hasClass( "rotate90"))
            image.addClass("rotate180").removeClass("rotate90");
        else if(image.hasClass( "rotate180"))
            image.addClass("rotate270").removeClass("rotate180");
        else if(image.hasClass( "rotate270"))
            image.removeClass("rotate270");
        else
            image.addClass("rotate90");
    };
        /*------------------------------------------- Carousel -- Image FullScreen func */
    function imgRotateRev() {
        console.log("--- imgRotateRev ---");
        var image = $('.af_carousel_item.p_AFCircular.p_AFSelected .af_carouselItem .image-scroll-area img.image');

        if(image.hasClass( "rotate90"))
            image.removeClass("rotate90");
        else if(image.hasClass( "rotate180"))
            image.addClass("rotate90").removeClass("rotate180");
        else if(image.hasClass( "rotate270"))
            image.addClass("rotate180").removeClass("rotate270");
        else
            image.addClass("rotate270");
    };
    /*------------------------------------------- Carousel -- Image 100% func */
    function imgFix() {
        $image = $(".af_carousel_item.p_AFCircular.p_AFSelected .af_carouselItem img.image");
        $image.width("auto");
        $image.height("auto");
    };
    /*----------------------------------------- Carousel -- Image ZoomIn func */
    function imgZoomIn() {
        $image = $(".af_carousel_item.p_AFCircular.p_AFSelected .af_carouselItem img.image");
        widthNew = Math.round($image.width() * window.zoomScale);
        heightNew = Math.round($image.height() * window.zoomScale);
        $image.width(widthNew);
        $image.height(heightNew);
    };
    /*---------------------------------------- Carousel -- Image ZoomOut func */
    function imgZoomOut() {
        $image = $(".af_carousel_item.p_AFCircular.p_AFSelected .af_carouselItem img.image");
        widthNew = Math.round($image.width() / window.zoomScale);
        heightNew = Math.round($image.height() / window.zoomScale);
        $image.width(widthNew);
        $image.height(heightNew);
    };




/* -----------------------------------------------------------------------------
 scroll functions --------------------------------------------------------------
----------------------------------------------------------------------------- */

    /*-------------------------------------------------------- panelbox stiky */
    $(window).scroll(function() {
      if ( $(window).scrollTop() > 33 && window.varScrollSticky == false ){
        if ($('div').hasClass('sticky') ){
            $('.starter.sticky').addClass("fixed");
            $('.starter.sticky>table').removeClass("fadeIn").addClass("animated fadeInDown");
            setTimeout(function() {$('.starter.sticky>table').removeClass("fadeInDown");}, 800);
            $('.menu-bar').addClass("fixed");
            $('.button-toolbar-home').removeClass("fadeIn").addClass("animated fadeInDown fixed");
            $('.toolbar-toolbar-home').removeClass("fadeIn").addClass("animated fadeInDown fixed");
            $(".dropdown-user-menu").css('top', 85).css('z-index', 999);
            window.varScrollSticky = true;
        }
      }
      else if ($(window).scrollTop() < 4  && window.varScrollSticky == true ){
        if ($('div').hasClass('sticky')){
            $('.starter.sticky').removeClass("fixed");
            $('.starter.sticky>table').removeClass("fadeInDown").addClass("fadeIn");
            $('.menu-bar').removeClass("fixed");
            $('.button-toolbar-home').removeClass("fadeInDown fixed").addClass("fadeIn");
            $('.toolbar-toolbar-home').removeClass("fadeInDown fixed").addClass("fadeIn");
            setTimeout(function() {$('.starter.sticky>table').removeClass("fadeIn");}, 800);
            $(".dropdown-user-menu").css('top', 45).css('z-index', 1003);
            window.varScrollSticky = false;
        }
      }
    });