Package.describe({
	summary: "Leaflet Control Compass"
});

Package.on_use(function (api, where) {
	api.add_files('dist/leaflet-compass.min.js', 'client');
	api.add_files('dist/leaflet-compass.min.css', 'client');
	api.add_files('images/compass-icon.png', 'client');
});
