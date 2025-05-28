$(document).ready(function () {
    //App.init();
    $('.btn-primary').click(function(){
         console.log('click2  '); 
    });
    
    
    $(window).on('load', function () {
        $("#panelSecond").css( {
            "overflow-y" : "auto", "height" : ($("#mySidenav").height() / 2) - 7
        });
        //($("#mySidenav").height() / 2)-7
        $('#panel-asr-process').css( {
            "height" : "500px"
        });
    });

    $('body').removeClass();
    $('body').addClass("page-header-fixed page-sidebar-fixed page-sidebar-closed");
    //    $('body').css( {
    //        "overflow" : "hidden"
    //    });
    $("button.btnASearch").removeClass("x7j p_AFTextOnly af_commandButton p_AFTextOnly");
    $("button.modalClose").removeClass("x7j p_AFTextOnly");
    $('button.modalClose').removeClass("af_commandButton p_AFTextOnly");

    $("table.FromSdatetime input").persianDatepicker( {
        altFormat : "YYYY MM DD HH:mm:ss",autoClose:true, format : 'YYYY/MM/DD', observer : true
    });

    $("table.FromSdatetime input").val(' ');

    $("table.ToSdatetime input").persianDatepicker( {
        altFormat : "YYYY MM DD HH:mm:ss",autoClose:true, format : 'YYYY/MM/DD', observer : true
    });

    $("table.ToSdatetime input").val(' ');

    $("table.Fromdatetime input").persianDatepicker( {
        altFormat : "YYYY MM DD HH:mm:ss",autoClose:true, format : 'YYYY/MM/DD', observer : true
    });

    $("table.Fromdatetime input").val(' ');

    $("table.Todatetime input").persianDatepicker( {
        altFormat : "YYYY MM DD HH:mm:ss",autoClose:true, format : 'YYYY/MM/DD', observer : true
    });

    $("table.Todatetime input").val(' ');

    //$("table.datetime input").val(" ");
    $("table.Fromdatetime input").change(function () {
//        var currentdate = persianDate().year() + "/" + persianDate().month() + "/" + persianDate().date();
//        console.log(currentdate);
//        console.log($("table.Fromdatetime input").val());
//        if (currentdate.length == 10) {
//            if (currentdate < $("table.Fromdatetime input").val()) {
//                console.log("in-date");
//                $(this).css( {
//                    "border" : " 2px #C70000 solid"
//                });
//            }
//            else if (currentdate >= $("table.Fromdatetime input").val()) {
//                console.log('less');
//                $(this).removeAttr("style");
//            }
//        }
    });

    $("table.Todatetime input").change(function () {
//        var currentdate = persianDate().year() + "/" + persianDate().month() + "/" + persianDate().date();
//        if (currentdate.length == 10) {
//            if (currentdate < $("table.Todatetime input").val()) {
//                $(this).css( {
//                    "border" : " 2px #C70000 solid"
//                });
//            }
//            else if (currentdate >= $("table.Todatetime input").val()) {
//                console.log('less');
//                $(this).removeAttr("style");
//            }
//        }
    });

    $("table.FromSdatetime input").change(function () {
//        var currentdate = persianDate().year() + "/" + persianDate().month() + "/" + persianDate().date();
//        if (currentdate.length == 10) {
//            if (currentdate < $("table.FromSdatetime input").val()) {
//                $(this).css( {
//                    "border" : " 2px #C70000 solid"
//                });
//            }
//            else if (currentdate >= $("table.FromSdatetime input").val()) {
//                console.log('less');
//                $(this).removeAttr("style");
//            }
//        }
    });

    $("table.ToSdatetime input").change(function () {
//        var currentdate = persianDate().year() + "/" + persianDate().month() + "/" + persianDate().date();
//        if (currentdate.length == 10) {
//            if (currentdate < $("table.ToSdatetime input").val()) {
//                $(this).css( {
//                    "border" : " 2px #C70000 solid"
//                });
//            }
//            else if (currentdate >= $("table.ToSdatetime input").val()) {
//                console.log('less');
//                $(this).removeAttr("style");
//            }
//        }
    });

//    $('.modalClose').click(function () {
//        $('#myModal').modal('toggle');
//    });

    $('table.userRef label').css( {
        "color" : "#cfcfcf"
    });

    $('table.countRefAction label').css( {
        "color" : "#cfcfcf"
    });

    $('#btnHelp').css( {
        "left" : "10%"
    });

    //    $('.P_lstBpm').css( {
    //        "height" : ($(window).height() - 210)
    //    });    
    $('.P_lstBpm').css( {
        "height" : ($("#mySidenav").height() - 93)
    });

    $('.w3-container').css( {
        "height" : ($("#mySidenav").height() - 142)
    });

    //console.log("menuH:" + $("#mySidenav").height());
    $(window).resize(function () {
        var h = $(window).height();
        //        $('.P_lstBpm').css( {
        //           "height" : (h - 380)
        //        });
        //        $('#panel-asr-process').css( {
        //            "height" : (h - 270)
        //        });
        //        $('.iframeAsr').css( {
        //            "height" : h - 290
        //        });
    });

    //console.log("h:" + $('.tblC').height());
    $('#mainSection').removeClass();
    $('#mainSection').addClass('row');
    $('#mainSection').css( {
        "width" : ""
    });

    var menu = [
    {
        "name" : "#bil"
    },
    {
        "name" : "#ene"
    },
    {
        "name" : "#eansheab"
    },
    {
        "name" : "#service"
    }
];

    var menuP = [
    {
        "name" : "#admLink"
    },
    {
        "name" : "#sasLink"
    },
    {
        "name" : "#bilLink"
    },
    {
        "name" : "#allLink"
    },
    {
        "name" : "#webLink"
    }
];
    //SetActiveMenu();
    //SetActiveMenuP();

    //    $.each(menu, function (index, value) {
    //        $(value.name).click(function () {
    //            //$(value.name).addClass("active");
    //            RemoveSelected(value.name);
    //            //console.log(value.name);
    //        });
    //    });
    //RemoveSelected();
    //function RemoveSelected(name) {
    //        $.each(menu, function (index, value) {
    //            if (value.name != name) {
    //                $(value.name).removeClass();
    //                console.log("remove active");
    //            }
    //        });
    $('#ene').on('click', function () {
        var bilClass = $('#ene').attr('class');
        if (bilClass === 'start') {
            // $('#ene').addClass("active");
        }
        else if (bilClass === 'start open active') {
            // $('#ene').removeClass("active");
        }
        console.log(bilClass);
        //$('#ene').addClass("start active");
    });
    $('#eansheab').click(function () {
        //$('#eansheab').addClass("open active");
    });
    $('#bil').click(function () {
        //$('#bil').addClass("open active");
    });
    $('#service').click(function () {
        //$('#service').addClass("open active");
    });
    //};
    function SetActiveMenu() {

    };

    function RemoveSelectedP(name) {
        $.each(menuP, function (index, value) {
            if (value.name != name) {
                $(value.name).removeClass();
                $(value.name).addClass("list-group-item");
                $(value.name).children().css("color", "");
            }
        });
    };

    function SetActiveMenuP() {
        $.each(menuP, function (index, value) {
            $(value.name).click(function () {
                $(value.name).addClass("active");
                RemoveSelectedP(value.name);
                $(value.name).children().css("color", "#fff");
            });
        })
    };
});

function closeNavRef() {
    document.getElementById("refrenceSidenav").style.width = "0";
}

function openNav(inputEvent) {
    console.log("open navigation subsys");    
//    var inputTextField = inputEvent.getSource();
//    var defaultButton = inputTextField.findComponent('MenuSubSystem');
//    var partialSubmit = true;
//    AdfActionEvent.queue(defaultButton, partialSubmit);
//    inputEvent.cancel();
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}