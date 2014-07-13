
(function() {

L.Control.Compass = L.Control.extend({

	includes: L.Mixin.Events, 
	//
	//Managed Events:
	//	Event				Data passed		Description
	//
	//	compass_loaded		{angle}			fired after compass data is loaded
	//	compass_activated					fired when compass is activated
	//	compass_deactivated					fired when compass is deactivated
	//
	//Methods exposed:
	//	Method 			Description
	//
	//  getAngle		return Azimut angle
	//  activate		active tracking on runtime
	//  deactivate		deactive tracking on runtime
	//
	options: {
		autoActive: true,		//activate control at startup
		textErr: null,			//error message on alert notification
		callErr: null,			//function that run on compass error activating
		position: 'topright'
		//TODO timeout autoActive
	},

	initialize: function(options) {
		if(options && options.style)
			options.style = L.Util.extend({}, this.options.style, options.style); 
		L.Util.setOptions(this, options);
		this._errorFunc = this.options.callErr || this.showAlert;
		this._isActive = false;//global state of compass
		this._firstMoved = false;//global state of compass
		this._currentAngle = null;	//store last angle
	},

	onAdd: function (map) {

		this._map = map;	
			
		var container = L.DomUtil.create('div', 'leaflet-compass');

		this._button = L.DomUtil.create('a', 'compass-button', container);
		this._button.href = '#';

		this._divcompass = L.DomUtil.create('div', 'compass-icon', this._button);
		this._divcompass.src = 'images/compass-icon.png';
		//TODO change button from rotating image

		L.DomEvent
			.on(this._button, 'click', L.DomEvent.stop, this)
			.on(this._button, 'click', this._switchCompass, this);

		this._alert = L.DomUtil.create('div', 'compass-alert', container);
		this._alert.style.display = 'none';

		this._map
			.on('anglefound', this._rotateCompass, this)
			.on('angleerror', this._errorCompass, this);	
			
		if(this.options.autoActive)
			this.activate();

		return container;
	},

	onRemove: function(map) {
		this.deactivate();
	},

	_switchCompass: function() {
		if(this._isActive)
			this.deactivate();
		else
			this.activate();
	},

	getAngle: function() {	//get last angle loaded
		return this._currentAngle;
	},

	activate: function() {
		this._isActive = true;

		this._divcompass.style.display = 'block';

		//API DOC
		//	http://goo.gl/5wfxN2
		//
		var self = this;
		window.addEventListener('deviceorientation', function(e) {
			
			self._rotateCompass(e.webkitCompassHeading);

		}, false);

		this.fire('compass_activated');
	},

	_rotateCompass: function(angle) {

//L.DomUtil.get('copy').innerHTML = angle;

		angle = 360 - angle;

		this._divcompass.style.webkitTransform = "rotate(" + angle + "deg)";

		this._currentAngle = angle;

		this.fire('compasslocated', {angle: angle});
		
		L.DomUtil.addClass(this._button, 'active');	
	},

	_errorCompass: function(e) {
		this.deactivate();
		this._errorFunc.call(this, this.options.textErr || e.message);
	},

	deactivate: function() {
			this._isActive = false;    
		this._firstMoved = false;
		
		//TODO STOP COMPASS ENGINE this._map.stopLocate();

		L.DomUtil.removeClass(this._button, 'active');
		this.fire('compass_deactivated');
	},

	showAlert: function(text) {
		this._alert.style.display = 'block';
		this._alert.innerHTML = text;
		var that = this;
		clearTimeout(this.timerAlert);
		this.timerAlert = setTimeout(function() {
			that._alert.style.display = 'none';
		}, 2000);
	}
});

L.control.compass = function (options) {
	return new L.Control.Compass(options);
};

}).call(this);