var raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true
})

    const map = new ol.Map({
        layers: [raster],
        target: 'mapdiv',
         view: new ol.View({
            projection: 'EPSG:3857',
             center: [-8495906.908036437,-1165289.7741472162],
             zoom: 7,
             maxZoom: 10,
             minZoom:4,
             rotation: 0.5
         })
         
    });

    var features= new ol.Collection();
    var featureOverlay= new ol.layer.Vector({
        soure: new ol.source.Vector({features: features}),
        style: new ol.style.Style({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius:7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
featureOverlay.setMap(map);

var modify = new ol.interaction.Modify({
    features: features,
    // the SHIFT key must be pressed to delete vertices, so
    // that new vertices can be drawn at the same position
    // of existing vertices
    deleteCondition: function(event) {
      return ol.events.condition.shiftKeyOnly(event) &&
          ol.events.condition.singleClick(event);
    }
  });
  map.addInteraction(modify);
  
  var typeselect= document.getElementById('geometry');
   var draw;
   function addInteraction(){
       draw= new ol.interaction.Draw({
           features: features,
           type: (typeselect.value)
       });
       map.addInteraction(draw);
    //    if( value== 'None') {
    //        var geometryFunction;
    //        if (value== 'Square') {
    //            value= Circle;
    //            geometryFunction= CreateRegularPolygon(4);
    //        }
    //        else if (value== 'Box'){
    //            value = 'Circle';
    //            geometryFunction = createBox();
    //        } 
    //        else if (value === 'Star') {
    //           value = 'Circle';
    //    }
    //    }
    }
    typeselect.onchange = function(e) {
        map.removeInteraction(draw);
        addInteraction();
      };
      
      addInteraction();


var coordinate= document.getElementById('footer');
map.on('click', function(e){
    console.log(e.coordinate);
//     var str= e.coordinate;
//     coordinate.innerHTML(str);
})
// map.on('click', function(evt){
//     var lonlat = new ol.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
//     var lon = lonlat[0];
//     var lat = lonlat[1];
//     alert("You clicked near lat lon: "+ lon.toFixed(6) + "  " + lat.toFixed(6));
//   }); 
