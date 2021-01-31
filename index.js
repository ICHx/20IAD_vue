var tofu = new Vue({
  el: '#tofu',
  data: {
    title: 'You are here',
    messages: [
      { text: 'Not drinking enough water.' },
      { text: 'Eyes looking at computer.' },
    ],
    map: null,
    lat: 22.312284428948406,
    lng: 114.16854858398438,
    clickedThing: null,
    placeInfo: {
      name: null,
      address: null,
    },
  },
  methods: {
    drinkWater: function () {
      // this.messages.forEach(element => {
      //   element.text = element.text.split('').reverse().join('')
      // });
      this.messages[0].text = 'Remember!';
    },
    initMap: function () {
      // https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 14,
        mapTypeControl: true,
        streetViewControl: true,


      });
      this.placesService = new google.maps.places.PlacesService(this.map);
      this.map.addListener("click", (e) => {
        this.clicked(e);
      });
    },
    clicked: function (e) {
      this.map.panTo(e.latLng);
      this.clickedThing = e;

      if (e.hasOwnProperty('placeId')) {
        this.resolvePlace(e.placeId);
      }
    },
    resolvePlace: function (placeId) {
      const me = this;
      this.placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (status === "OK") {
          this.placeInfo.name = place.name;
          this.placeInfo.address = place.formatted_address;
        }
      });

    },
    locateMe: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.savePos);
      } else {
        alert("Geolocation is not supported/denied by this browser.");
      }

      marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map: this.map
      });
    },
    savePos: function (position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    },
    panTo: function () {
      this.map.panTo(new google.maps.LatLng(this.lat, this.lng));
    }
  },
  mounted() {
    this.initMap();
  },

}
)

