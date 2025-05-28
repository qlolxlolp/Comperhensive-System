
window.onkeydown = function (event) {
    //disable F5 and Ctrl + r
    if (((event.which || event.keyCode) == AdfKeyStroke.F5_KEY) || (event.ctrlKey && !event.shiftKey && (event.keyCode == 114 || event.keyCode == 82))) {
        event.stopPropagation();
        event.preventDefault();
        //alert("F5 Pressed/clicked, code :"+event.charCode);
    }
}

function refreshPage() {
    console.log("hello refresh");
    $.ajax( {
        url : "", context : document.body, success : function (s, x) {
            $('html').attr('content', ' ');
            $(this).html(s);
        }
    });
};

function setScroll() {
    //console.log('auto');
    $('body').css( {
        "overflow" : "auto"
    });
};

function removeScroll() {
    //console.log('hidden');
    $('body').css( {
        "overflow" : "hidden"
    });
};

function setHTable() {
    var ht = $(window).height();
    $('.table').css( {
        "height" : ht - 330
    });
};

function setHeight() {
    var he = $(window).height();
    $('#panel-asr-process').css( {
        "height" : he - 270
    });
};