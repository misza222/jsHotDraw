/*
 * Figure class
 *
 * Figure is observable so it has a attach method
 */

function Figure()
{
    Observable.call(this);
    this.selected  = false;
    this.style = "#FFA500";
    this.handles = [];
}

Figure.prototype = new Observable();

Figure.prototype.isSelected = function() {
    return this.selected;
};

Figure.prototype.setSelected = function(selected) {
    this.selected = selected;
};

Figure.prototype.addHandle = function(handle) {
    this.handles.add(handle);
};

Figure.prototype.getHandles = function() {
    return this.handles;
};

/**
 * Returns handle that happens to be selected
 * Currently it is not possible for figure to have more than one handle selected
 */
Figure.prototype.getSelectedHandle = function() {
    for (var i = 0; this.handles[i]; i++) {
        if (this.handles[i].isSelected()) {
            return this.handles[i];
        }
    }

    return null;
};

/**
 * Returns handle (from handles defined by this figure) existing
 * at the point or null
 */
Figure.prototype.handleAtPoint = function(point) {
    for (var i = 0; this.handles[i]; i++) {
        if (this.handles[i].touches(point)) {
            return this.handles[i];
        }
    }

    return null;
};

/**
 * Returns true if figure is at the point or false otherwise
 * 
 * Should be redefined by subclasses
 */
Figure.prototype.touches = function(point) {
    return false;
};

/**
 * Method to paint the figure on the canvas
 * If subclasses want to use drawing handles functionality from Figure they
 * should not override it but redefine doPaint method instead
 */
Figure.prototype.paint = function() {
    this.doPaint();

    if (this.isSelected()) {
        var handles = this.getHandles();
        for (var i = 0; handles[i]; i++) {
            handles[i].paint();
        }
    }
};

/**
 * doPaint is a template method called in Figure::paint
 *
 * It allows for common functionality to be reused and should be overriden
 * in the subclasses instead of pain.
 */
Figure.prototype.doPaint = function() {
    throw new Error('AbstractMethod');
};

Figure.prototype.setColor = function(color) {
    this.style = color;
};

Figure.prototype.getColor = function() {
    return this.style;
};

/**
 * Sets location (usually centre) of the figure
 *
 * Should be redefined by subclasses
 */
Figure.prototype.setLocation = function(point) {
    throw new Error('AbstractMethod');
};

/**
 * Returns location (usually centre) of the figure
 *
 * Should be redefined by subclasses
 */
Figure.prototype.getLocation = function() {
    throw new Error('AbstractMethod');
};

/**
 * This should return Rectangle object is the smallest rectangle enclosing
 * given object
 */
Figure.prototype.getBounds = function() {
    throw new Error('AbstractMethod');
}

Figure.prototype.update = function(observable) {
    throw new Error('AbstractMethod');
};