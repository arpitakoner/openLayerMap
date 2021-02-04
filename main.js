// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import {Circle as Circlestyle, Fill, Stroke, Style} from 'ol/style';
// import {Draw, Modify, Snap} from 'ol/interaction';
// import {OSM, Vector as VectorSource} from 'ol/source';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'



var raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true
})
    const map = new ol.Map({
        layers: [raster],
        target: 'mapdiv',
         view: new ol.View({
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



map.on('click', function(e){
    var str;
})
   
