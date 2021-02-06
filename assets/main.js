var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
})
var source = new ol.source.Vector({wrapX: false});

var vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol.style.Stroke({
      color: '#daa520',
      width: 2,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#daa520',
      }),
    }),
  }),
});

var map = new ol.Map({
    layers: [raster, vector],
    target: 'mapdiv',
    view: new ol.View({
      center:[8207110.248920325, 2098638.864573062],
      zoom: 5,
    }),
  });

var modify = new ol.interaction.Modify({source: source});
map.addInteraction(modify);
    
var typeSelect = document.getElementById('geometry');
var draw, snap; 
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
      console.log(value)
        var geometryFunction;
        if (value === 'Square') 
        {
            console.log('its a square')
          value = 'Circle';
          geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        } else if (value === 'Box') {
          value = 'Circle';
          geometryFunction = ol.interaction.Draw.createBox();
        }  else if (value === 'Star') {
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
                geometry = new ol.geom.Polygon([newCoordinates]);
              } else {
                geometry.setCoordinates([newCoordinates]);
              }
              return geometry;
            };
          }
    draw = new ol.interaction.Draw({
      source: source,
      type: value,
      geometryFunction: geometryFunction,
    });
    map.addInteraction(draw);
    snap = new ol.interaction.Snap({source: source});
    map.addInteraction(snap);
  
  }
}


typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

document.getElementById('undo').addEventListener('click', function () {
  draw.removeLastPoint();
});

addInteraction();

map.on('click', function(e){
  console.log(e.coordinate)
});