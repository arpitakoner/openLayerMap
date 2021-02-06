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
             
         })
         
    });

//     var features = new ol.Collection();
//     var featureOverlay = new ol.layer.Vector({
//   source: new ol.source.Vector({features: features}),
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({
//       color: 'rgba(255, 255, 255, 0.2)'
//     }),
//     stroke: new ol.style.Stroke({
//       color: '#ffcc33',
//       width: 2
//     }),
//     image: new ol.style.Circle({
//       radius: 7,
//       fill: new ol.style.Fill({
//         color: '#ffcc33'
//       })
//     })
//   })
// });
// featureOverlay.setMap(map);

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

var typeSelect = document.getElementById('geometry');

var draw; 
var value = typeSelect.value;
var geometryFunction;
function addInteraction() { 
if (value== 'Point') {
    value= 'point'
} else if (value== 'LineString') {
    value= 'LineString'
} else if (value== 'Polygon') {
    value= 'point'
} else if (value== 'Point') {
    value= 'Polygon'
} else if (value== 'Circle') {
    value= 'Circle'
} else if (value === 'Square') {
    value = 'Circle';
    geometryFunction = new ol.interaction.Draw.createRegularPolygon(type= 'circle');
  } else if (value === 'Box') {
    value = 'Circle';
    geometryFunction = new ol.interaction.Draw.createBox();
  } else if (value === 'Star') {
    value = 'Circle';
    geometryFunction = function (coordinates, geometry) {
      var center = coordinates[0];
      var last = coordinates[coordinates.length - 1];
      var dx = center[0] - last[0];
      var dy = center[1] - last[1];
      var radius = Math.sqrt(dx * dx + dy * dy);
      var rotation = Math.atan2(dy, dx);
      var newCoordinates = [];
      var numPoints = 12;
      for (var i = 0; i < numPoints; ++i) {
        var angle = rotation + (i * 2 * Math.PI) / numPoints;
        var fraction = i % 2 === 0 ? 1 : 0.5;
        var offsetX = radius * fraction * Math.cos(angle);
        var offsetY = radius * fraction * Math.sin(angle);
        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
      }
      newCoordinates.push(newCoordinates[0].slice());
      if (!geometry) {
        geometry = new Polygon([newCoordinates]);
      } else {
        geometry.setCoordinates([newCoordinates]);
      }
      return geometry;
    };
  }
  console.log(typeof(typeSelect.value))
  draw = new ol.interaction.Draw({
    features: features,
    type: typeSelect.value,
    geometryFunction: geometryFunction
  });
  map.addInteraction(draw);
}



//change the geometry type
typeSelect.onchange = function(e) {
  map.removeInteraction(draw);
  addInteraction();
};
document.getElementById('undo').addEventListener('click', function () {
    draw.removeLastPoint();
  });

addInteraction();
