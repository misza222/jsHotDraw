/*
 * LocatorHandle class
 *
 * Located in the centre of the figure for moving it around
 */

function LocatorHandle(canvas, figure, locationPoint) {
    if (!canvas || !figure || !locationPoint) {
        throw new Error('ArgumentError');
    }
    Handle.call(this);
    Figure.call(this);
    this.canvas = canvas;
    this.figure = figure;
    this.style = Handle.COLOR_IF_NOT_SELECTED;
    this.x = locationPoint.getX() - Handle.WIDTH / 2;
    this.y = locationPoint.getY() - Handle.HEIGHT / 2;
}

LocatorHandle.prototype = new Handle();

LocatorHandle.prototype.paint = function() {
   this.canvas.setColor(this.getColor());
   this.canvas.fillRect(this.x, this.y, Handle.WIDTH, Handle.HEIGHT);
};

LocatorHandle.prototype.superSetSelected = LocatorHandle.prototype.setSelected;
LocatorHandle.prototype.setSelected = function(selected) {
    this.superSetSelected(selected);
    
    if (selected === false) {
        this.setColor(Handle.COLOR_IF_NOT_SELECTED);
    } else {
        this.setColor(Handle.COLOR_IF_SELECTED);
    }
};

LocatorHandle.prototype.touches = function(testPoint) {
    return this.x <= testPoint.getX() &&
           this.x + Handle.WIDTH  >= testPoint.getX() &&
           this.y <= testPoint.getY() &&
           this.y + Handle.HEIGHT >= testPoint.getY();
};

LocatorHandle.prototype.setLocation = function(point) {
    this.x = point.getX() - Handle.WIDTH / 2; // REMOVE
    this.y = point.getY() - Handle.HEIGHT / 2; // REMOVE
    this.figure.setLocation(point); // this.locator.setLocation(point)
};

// LocatorHandle.prototype.update = function(point)
/**
 * LocatorHandle should be observing the locator as sometimes (as in the case
 * of proportional resizing) the coordinate of the mouse does not necesary
 * mean that the locator should be in there
 */