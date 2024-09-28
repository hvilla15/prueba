/*const mapa = document.querySelector('#mapa')

let map = L.map('mapa').setView([10.50300, -66.91000],13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

var markerOrigen;
var markerDestino;
var rutaLayer;

function buscarLugar(inputId, marker) {
    var consulta = document.getElementById(inputId).value;
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lugar = data[0];
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker([lugar.lat, lugar.lon]).addTo(map)
                    .bindPopup(lugar.display_name)
                    .openPopup();
            } else {
                alert('Lugar no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al buscar el lugar:', error);
        });
}

function trazarRuta() {
    buscarLugar('origen', markerOrigen);
    buscarLugar('destino', markerDestino);

    setTimeout(() => {
        if (markerOrigen && markerDestino) {
            var origen = markerOrigen.getLatLng();
            var destino = markerDestino.getLatLng();

            var url = `http://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=full`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (rutaLayer) {
                        map.removeLayer(rutaLayer);
                    }
                    rutaLayer = L.geoJson(data.routes[0]).addTo(map);
                    map.fitBounds(rutaLayer.getBounds());
                })
                .catch(error => {
                    console.error('Error al obtener la ruta:', error);
                });
        }
    }, 3000);
}*/

/*const mapa = document.querySelector('#mapa');

let map = L.map('mapa').setView([10.50300, -66.91000], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'   

}).addTo(map);

var markerOrigen;
var markerDestino;
var rutaLayer;

function buscarLugar(inputId, marker) {
  var consulta = document.getElementById(inputId).value;
  var url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
      if (data.length > 0) {
        var lugar = data[0];
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker([lugar.lat, lugar.lon]).addTo(map)
          .bindPopup(lugar.display_name)
          .openPopup();
        return marker; // Resolve with the marker object
      } else {
        alert('Lugar no encontrado');
        return null; // Resolve with null if not found
      }
    })
    .catch(error => {
      console.error('Error al buscar el lugar:', error);
      return null; // Resolve with null in case of error
    });
}

function trazarRuta() {
  Promise.all([buscarLugar('origen'), buscarLugar('destino')])
    .then(markers => {
      markerOrigen = markers[0];
      markerDestino = markers[1];

      if (markerOrigen && markerDestino) {
        var origen = markerOrigen.getLatLng();
        var destino = markerDestino.getLatLng();

        var url = `http://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=full`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data); // Inspecciona la respuesta completa para verificar la estructura

        if (data.routes && data.routes.length > 0) {
          // Crea un elemento para mostrar los resultados (puedes personalizar esto)
          const resultsDiv = document.createElement('div');

          data.routes.forEach(route => {
          const distance = route.distance/1000;
          const duration = parseInt(route.duration/60);

          // Crea un párrafo para cada ruta con la distancia y duración
          const paragraph = document.createElement('p');
          paragraph.textContent = `Distancia: ${distance} km, Duración: ${duration} minutos`;
          resultsDiv.appendChild(paragraph);
        });

        // Agrega los resultados al DOM (puedes cambiar el selector)
        document.body.appendChild(resultsDiv);
        } else {
          console.error('No se encontraron rutas');
          alert('No se encontraron rutas entre los puntos seleccionados.');
        }
      })
      .catch(error => {
      console.error('Error al obtener la ruta:', error);
    });
  }
})
.catch(error => console.error('Error al buscar ubicaciones:', error));
}*/

const mapa = document.querySelector('#mapa');

    let map = L.map('mapa').setView([10.50300, -66.91000], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markerOrigen;
    var markerDestino;
    var rutaLayer;

    function buscarLugar(inputId, marker) {
      var consulta = document.getElementById(inputId).value;
      var url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`;

      return fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.length > 0) {
            var lugar = data[0];
            if (marker) {
              map.removeLayer(marker);
            }
            marker = L.marker([lugar.lat, lugar.lon]).addTo(map)
              .bindPopup(lugar.display_name)
              .openPopup();
            return marker; // Resolve with the marker object
          } else {
            alert('Lugar no encontrado');
            return null; // Resolve with null if not found
          }
        })
        .catch(error => {
          console.error('Error al buscar el lugar:', error);
          return null; // Resolve with null in case of error
        });
    }

    function trazarRuta() {
      if (rutaLayer) {
        map.removeLayer(rutaLayer);
      }

      Promise.all([buscarLugar('origen', markerOrigen), buscarLugar('destino', markerDestino)])
        .then(markers => {
          markerOrigen = markers[0];
          markerDestino = markers[1];

          if (markerOrigen && markerDestino) {
            var origen = markerOrigen.getLatLng();
            var destino = markerDestino.getLatLng();

            var url = `http://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=full`;

            fetch(url)
              .then(response => response.json())
              .then(data => {
                console.log(data); // Inspecciona la respuesta completa para verificar la estructura

                if (data.routes && data.routes.length > 0) {
                  // Limpia el contenedor de resultados antes de agregar nuevos
                  const resultsDiv = document.getElementById('resultados');
                  resultsDiv.innerHTML = '';

                  data.routes.forEach(route => {
                    const distance = route.distance / 1000;
                    const duration = parseInt(route.duration / 60);

                    // Crea un párrafo para cada ruta con la distancia y duración
                    const paragraph = document.createElement('p');
                    paragraph.textContent = `Distancia: ${distance} km, Duración: ${duration} minutos`;
                    resultsDiv.appendChild(paragraph);
                  });

                  // Verifica que geometry y coordinates existen antes de usarlos
                  if (data.routes[0].geometry) {
                    var coordinates = polyline.decode(data.routes[0].geometry);
                    rutaLayer = L.polyline(coordinates, { color: 'blue' }).addTo(map);
                  } else {
                    console.error('La geometría de la ruta no está disponible');
                    alert('La geometría de la ruta no está disponible.');
                  }
                } else {
                  console.error('No se encontraron rutas');
                  alert('No se encontraron rutas entre los puntos seleccionados.');
                }
              })
              .catch(error => {
                console.error('Error al obtener la ruta:', error);
              });
          }
        })
        .catch(error => console.error('Error al buscar ubicaciones:', error));
    }

    function sugerirLugares(inputId, suggestionsId) {
      const input = document.getElementById(inputId);
      const suggestions = document.getElementById(suggestionsId);

      input.addEventListener('input', () => {
        const consulta = input.value;
        if (consulta.length < 3) {
          suggestions.innerHTML = '';
          return;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            suggestions.innerHTML = '';
            data.forEach(lugar => {
              const item = document.createElement('div');
              item.className = 'suggestion-item';
              item.textContent = lugar.display_name;
              item.addEventListener('click', () => {
                input.value = lugar.display_name;
                suggestions.innerHTML = '';
              });
              suggestions.appendChild(item);
            });
          })
          .catch(error => {
            console.error('Error al sugerir lugares:', error);
          });
      });
    }

    sugerirLugares('origen', 'origen-suggestions');
    sugerirLugares('destino', 'destino-suggestions');