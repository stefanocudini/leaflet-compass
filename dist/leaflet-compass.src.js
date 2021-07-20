/* 
 * Leaflet Control Compass v1.5.3 - 2018-11-23 
 * 
 * Copyright 2014 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * https://opengeo.tech/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demos: 
 * https://opengeo.tech/maps/leaflet-compass/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-compass.git 
 * 
 */
(function (factory) {
    if(typeof define === 'function' && define.amd) {
    //AMD
        define(['leaflet'], factory);
    } else if(typeof module !== 'undefined') {
    // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
    // Browser globals
        if(typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {

L.Control.Compass = L.Control.extend({

	includes: L.version[0] =='1' ? L.Evented.prototype : L.Mixin.Events,
	//
	//Managed Events:
	//	Event				Data passed		Description
	//
	//	compass:rotated		{angle}			fired after compass data is rotated
	//	compass:disabled					fired when compass is disabled
	//
	//Methods exposed:
	//	Method 			Description
	//
	//  getAngle		return Azimut angle
	//  setAngle		set rotation compass
	//  activate		active tracking on runtime
	//  deactivate		deactive tracking on runtime
	//
	options: {
		position: 'topright',	//position of control inside map
		autoActive: false,		//activate control at startup
		showDigit: false,		//show angle value bottom compass
		textErr: '',			//error message on alert notification
		callErr: null,			//function that run on compass error activating
		angleOffset: 2			//min angle deviation before rotate
		/* big angleOffset is need for device have noise in orientation sensor */
	},

	initialize: function(options) {
		if(options && options.style)
			options.style = L.Util.extend({}, this.options.style, options.style); 
		L.Util.setOptions(this, options);
		this._errorFunc = this.options.callErr || this.showAlert;
		this._isActive = false;//global state of compass
		this._currentAngle = null;	//store last angle
	},

	onAdd: function (map) {

		var self = this;

		this._map = map;	
			
		var container = L.DomUtil.create('div', 'leaflet-compass');

		this._button = L.DomUtil.create('span', 'compass-button', container);
		this._button.href = '#';

		this._icon = L.DomUtil.create('div', 'compass-icon', this._button);
		this._digit = L.DomUtil.create('span', 'compass-digit', this._button);

		this._alert = L.DomUtil.create('div', 'compass-alert', container);
		this._alert.style.display = 'none';

		L.DomEvent
			.on(this._button, 'click', L.DomEvent.stop, this)
			.on(this._button, 'click', this._switchCompass, this);

		L.DomEvent.on(window, 'compassneedscalibration', function(e) {
			self.showAlert('Your compass needs calibrating! Wave your device in a figure-eight motion');
		}, this);

		if(this.options.autoActive)
			this.activate();

		return container;
	},

	onRemove: function(map) {
		
		this.deactivate();
		
		L.DomEvent
			.off(this._button, 'click', L.DomEvent.stop, this)
			.off(this._button, 'click', this._switchCompass, this);
	},

	_switchCompass: function() {
		if(this._isActive)
			this.deactivate();
		else
			this.activate();
	},

	_rotateHandler: function(e) {

		var self = this, angle;

		if(!this._isActive) return false;

		if(e.webkitCompassHeading)	//iphone
			angle = 360 - e.webkitCompassHeading;

		else if(e.alpha)			//android
			angle = e.alpha;
		else {
			this._errorCompass({message: 'Orientation angle not found'});
		}
		
		angle = Math.round(angle);

		if(angle % this.options.angleOffset === 0)
			self.setAngle(angle);
	},

	_errorCompass: function(e) {
		this.deactivate();
		this._errorFunc.call(this, this.options.textErr || e.message);
	},

	_rotateElement: function(el) {
		el.style.webkitTransform = "rotate("+ this._currentAngle +"deg)";
		el.style.MozTransform = "rotate("+ this._currentAngle +"deg)";
		el.style.transform = "rotate("+ this._currentAngle +"deg)";
	},

	setAngle: function(angle) {
		
		if(this.options.showDigit && !isNaN(parseFloat(angle)) && isFinite(angle))
			this._digit.innerHTML = angle+'°';

		this._currentAngle = angle;
		this._rotateElement( this._icon );

		this.fire('compass:rotated', {angle: angle});
	},
	
	getAngle: function() {	//get last angle
		return this._currentAngle;
	},

	activate: function() {

		this._isActive = true;

		L.DomEvent.on(window, 'deviceorientation', this._rotateHandler, this);
		
		L.DomUtil.addClass(this._button, 'active');
	},

	deactivate: function() {
		
		this.setAngle(0);

		this._isActive = false;

		L.DomEvent.off(window, 'deviceorientation', this._rotateHandler, this);

		L.DomUtil.removeClass(this._button, 'active');

		this.fire('compass:disabled');
	},

	showAlert: function(text) {
		this._alert.style.display = 'block';
		this._alert.innerHTML = text;
		var that = this;
		clearTimeout(this.timerAlert);
		this.timerAlert = setTimeout(function() {
			that._alert.style.display = 'none';
		}, 5000);
	}
});

L.control.compass = function (options) {
	return new L.Control.Compass(options);
};

return L.Control.Compass;

});
