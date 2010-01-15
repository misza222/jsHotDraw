/*
 * LocatorHandle class
 *
 * Located in the centre of the figure for moving it around
 */

function CenterLocator(figure) {
    if (!figure) {
        throw new Error('ArgumentError');
    }
    Observable.call(this);
    this.figure = figure;
    this.location = Geometry.getRectangleCenterPoint(figure.getBounds());
}

CenterLocator.prototype = new Observable();

CenterLocator.prototype.getLocation = function() {
    return this.location;
};

CenterLocator.prototype.setLocation = function(point) {
    if (!this.location.equals(point)) {
        this.location = point;
        this.notify();
    }
};

CenterLocator.prototype.translate = function(xdiff, ydiff) {
    if (xdiff !== 0 || ydiff != 0) {
        this.location.translate(xdiff, ydiff);
        this.notify();
    }
};