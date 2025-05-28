/**
 * Created by Hossein Gholami on 9/27/2023.
 * 
 */
var map;

function initMap(DscoCode, MapUrl) {
    console.log("******Call initMap**********");
    console.log("DscoCode: ", DscoCode);
    console.log("MapUrl: ", MapUrl);

    switch (DscoCode) {
        case 101:
        //kermanshah
            map = L.map('map-user').setView([34.327692, 47.077769], 14);
            L.tileLayer(MapUrl, 
            {
                attribution : 'نقشه OSM کرمانشاه'
            }).addTo(map);
            break;
        case 103:
        //ilam
            map = L.map('map-user').setView([33.634974, 46.415281], 14);
            L.tileLayer(MapUrl, 
            {
                attribution : 'نقشه OSM ایلام'
            }).addTo(map);
            break;
        case 111:
        //shiraz
            map = L.map('map-user').setView([29.591768, 52.583698], 14);
            L.tileLayer(MapUrl, 
            {
                attribution : 'نقشه GIS توزیع برق شیراز'
            }).addTo(map);
            break;
        case 112:
        //fars
            map = L.map('map-user').setView([29.585624, 52.543402], 12);
            L.tileLayer(MapUrl, 
            {
                attribution : 'نقشه OSM استان فارس'
            }).addTo(map);
            break;
        default :
            map = L.map('map-user').setView([29.591768, 52.583698], 10);
            break;
    }

    //    L.tileLayer('https:tile.openstreetmap.org/{z}/{x}/{y}.png', 
    //    {
    //        attribution : 'نقشه OSM ایران'
    //    }).addTo(map);
};//end initMap
function clearMap() {
    map.eachLayer((layer) => 
    {
        if (layer['_latlng'] != undefined)
        layer.remove();
    });
}


//format: ["lat:24.2536 , lon:52.365 , color:'red' , comment:'توضیحات' "]
//color: {{red | black | blue | gold | green | grey | violet | yellow | orange}}
function showAllMarkers(allCordString) {
    console.log(allCordString);
    var layerGroup = L.layerGroup().addTo(map);    
    // remove all the markers in one go
    clearMap();
    var img_red = document.getElementsByClassName('img_red')[0];
    var img_black = document.getElementsByClassName('img_black')[0];
    var img_blue = document.getElementsByClassName('img_blue')[0];
    var img_gold = document.getElementsByClassName('img_gold')[0];
    var img_green = document.getElementsByClassName('img_green')[0];
    var img_grey = document.getElementsByClassName('img_grey')[0];
    var img_violet = document.getElementsByClassName('img_violet')[0];
    var img_yellow = document.getElementsByClassName('img_yellow')[0];
    var img_orange = document.getElementsByClassName('img_orange')[0];

    var img_shadow = document.getElementsByClassName('img_shadow')[0];

    var Icon_red = new L.Icon( {
        iconUrl : img_red.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_black = new L.Icon( {
        iconUrl : img_black.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_blue = new L.Icon( {
        iconUrl : img_blue.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_gold = new L.Icon( {
        iconUrl : img_gold.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_green = new L.Icon( {
        iconUrl : img_green.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_grey = new L.Icon( {
        iconUrl : img_grey.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_violet = new L.Icon( {
        iconUrl : img_violet.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_yellow = new L.Icon( {
        iconUrl : img_yellow.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var Icon_orange = new L.Icon( {
        iconUrl : img_orange.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    for (var i = 0;i < allCordString.length;i++) {
        var lat = allCordString[i]["lat"];
        var lon = allCordString[i]["lon"];
        var color = allCordString[i]["color"];
        var comment = allCordString[i]["comment"];
        var var_icon;
        switch (color) {
            case 'red':
            var_icon = {
                icon : Icon_red
            };
            break;
            case 'black':
            var_icon = {
                icon : Icon_black
            };
            break;
            case 'blue':
            var_icon = {
                icon : Icon_blue
            };
            break;
            case 'gold':
            var_icon = {
                icon : Icon_gold
            };
            break;
            case 'green':
            var_icon = {
                icon : Icon_green
            };
            break;
            case 'grey':
            var_icon = {
                icon : Icon_grey
            };
            break;
            case 'violet':
            var_icon = {
                icon : Icon_violet
            };
            break;
            case 'yellow':
            var_icon = {
                icon : Icon_yellow
            };
            break;
            case 'orange':
            var_icon = {
                icon : Icon_orange
            };
            break;

            default :
            var_icon = {
                icon : redIcon
            };
            break;
        }

        console.log("{ lat: ",lat,
        " , lon: ",lon,
        " , color: ",color,
        " , comment: ",comment,
        " } "
        );
        console.log("var_icon: ", var_icon);
        L.marker(L.latLng(lat, lon), var_icon).bindPopup(comment).addTo(layerGroup);
    }
    //end loop for
    if(allCordString.length!=0){
        map.setView([allCordString[0]["lat"], allCordString[0]["lon"]], 13);
    }
}
//end showAllMarkers
function addMarkToMap(it_cxlive, it_cylive, it_cxout, it_cyout) {
    console.log("******Call addMarkToMap in ArdCrntMapUtil**********");
    var imgred = document.getElementById('img_red');
    var imgshadow = document.getElementById('img_shadow');
    //console.log("imgred: ", imgred);
    //console.log("imgshadow: ", imgshadow);
    var redIcon = new L.Icon( {
        iconUrl : imgred.getAttribute('src'), shadowUrl : imgshadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });

    var lat_live = it_cxlive;
    var lon_live = it_cylive;

    var lat_out = it_cxout;
    var lon_out = it_cyout;

    var content_live = "<h5>موقعیت مکانی مشترک(" + lat_live + " , " + lon_live + ") </h5>";
    var content_out = "<h5>موقعیت مکانی برداشتی(" + lat_out + " , " + lon_out + ") </h5>";
    map.setView([lat_live, lon_live], 15);

    L.marker(L.latLng(lat_live, lon_live)).bindPopup(content_live).bindTooltip("موقعیت مکانی مشترک").openTooltip().addTo(map);

    L.marker(L.latLng(lat_out, lon_out), 
    {
        icon : redIcon
    }).bindPopup(content_out).bindTooltip("موقعیت مکانی برداشتی").openTooltip().addTo(map);

};//end addMarkToMap