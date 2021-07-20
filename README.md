Leaflet.Control.Compass
============

[![npm version](https://badge.fury.io/js/leaflet-compass.svg)](https://badge.fury.io/js/leaflet-compass)


A leaflet control plugin to make simple rotating compass

Tested in Leaflet 0.7 and 1.2

require HTML5 API on mobile device!

**Tested platforms:**
* Chrome on Android
* Safari on iOS

**Demo online:**  
[opengeo.tech/maps/leaflet-compass](https://opengeo.tech/maps/leaflet-compass/)

![Image](./images/leaflet-compass.png)

# Usage

Adding the Compass Control to the map:

```
map.addControl( new L.Control.Compass() );

```

# Options

| Option	  | Default  | Description                   |
| ----------- | -------- | ----------------------------- |
| autoActive  | false | activate control at startup |
| showDigit	  | false | show angle value bottom compass |
| textErr	  | ''   | error message on alert notification |
| callErr	  | null | function that run on compass error activating |
| angleOffset | 2 | min angle deviation before rotate, big angleOffset is need for device have noise in orientation sensor |
| position	  | 'topright' | position of control inside map |

# Methods

| Method	  | Arguments      | Description                   |
| ----------- | -------------- | ----------------------------- |
| autoActive  | false          | activate control at startup   |
| getAngle    |                | return Azimut angle           |
| setAngle    | angle          | set rotation compass          |
| activate    |                | active tracking on runtime    |
| deactivate  |                | deactive tracking on runtime  |

# Events

| Event	            | Data           | Description                         |
| ----------------- | -------------- | ----------------------------------- |
| 'compass:rotated' | angle          | fired after compass data is rotated |
| 'compass:disabled'|                | fired when compass is disabled      |


# Where

**Source code:**

[Github](https://github.com/stefanocudini/leaflet-compass)  
[Bitbucket](https://bitbucket.org/stefanocudini/leaflet-compass)  
[Atmosphere](https://atmospherejs.com/package/leaflet-compass)
[NPM](https://npmjs.org/package/leaflet-compass)
