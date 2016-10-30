Leaflet.Control.Compass
============

A leaflet control plugin to make simple rotating compass

Tested in Leaflet 0.7.7

require only HTML5 API

**Tested platforms:**
* Chrome on Android
* Safari on iOS

**Demo online:**  
[labs.easyblog.it/maps/leaflet-compass](http://labs.easyblog.it/maps/leaflet-compass/)

![Image](https://raw.githubusercontent.com/stefanocudini/leaflet-compass/master/images/leaflet-compass.png)

#How to use

Adding the Compass Control to the map:

```
map.addControl( new L.Control.Compass() );

```

#Settings

* **position** position of control inside map
* **autoActive** activate control at startup
* **showDigit** show angle value bottom compass
* **textErr** error message on alert notification
* **callErr** function that run on compass error activating
* **angleOffset** min angle deviation before rotate, big angleOffset is need for device have noise in orientation sensor

#Methods

* **getAngle** return Azimut angle
* **setAngle** set rotation compass
* **activate** active tracking on runtime
* **deactivate** deactive tracking on runtime

#Events

* **compass:rotated** fired after compass data is rotated
* **compass:disabled** fired when compass is disabled


#Where

**Source code:**

[Github](https://github.com/stefanocudini/leaflet-compass)  
[Bitbucket](https://bitbucket.org/stefanocudini/leaflet-compass)  
[Atmosphere](https://atmospherejs.com/package/leaflet-compass)
[NPM](https://npmjs.org/package/leaflet-compass)
