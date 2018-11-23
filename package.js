Package.describe({
	summary: "Leaflet Control Compass",
	name: "stefcud:leaflet-compass",
	version: "1.5.3",
	git: "https://github.com/stefanocudini/leaflet-compass.git"
});

Package.on_use(function (api, where) {
	api.addFiles('dist/leaflet-compass.src.js', 'client');
	api.addFiles('dist/leaflet-compass.src.css', 'client');
	api.addAssets('images/compass-icon.png', 'client');
});
