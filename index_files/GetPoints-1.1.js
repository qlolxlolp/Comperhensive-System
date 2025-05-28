var map;

function initMapForGetPoints(DscoCode, MapUrl) {
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
    map.on('click', onMapClick);
};//end initMap
function clearMap() {
    map.eachLayer((layer)=> 
    {
        if (layer['_latlng'] != undefined)
        layer.remove();
    });
}

function onMapClick(e) {    
    clearMap();
    console.log("latlng --> : ", e.latlng);
    var img_red = document.getElementsByClassName('img_red')[0];
    var img_shadow = document.getElementsByClassName('img_shadow')[0];    
    var it_lat = document.querySelector(".lat-input input");    
    var it_lon = document.querySelector(".lon-input input");
    console.log("it_lat: ", it_lat);
    console.log("it_lon: ", it_lon);
    var Icon_red = new L.Icon( {
        iconUrl : img_red.getAttribute('src'), shadowUrl : img_shadow.getAttribute('src'), iconSize : [25, 41], iconAnchor : [12, 41], popupAnchor : [1,  - 34], shadowSize : [41, 41]
    });
    var_icon = {
        icon : Icon_red
    };    
    console.log("e.latlng.lat: ", e.latlng.lat);
    console.log("e.latlng.lng: ", e.latlng.lng);
    //it_lat.setValue(e.latlng.lat);
    //it_lon.setValue(e.latlng.lng);
    it_lat.value = e.latlng.lat;
    it_lon.value = e.latlng.lng;
    L.marker(e.latlng, var_icon).bindPopup(it_lat.getValue +','+ it_lon.getValue).addTo(map);    
}
