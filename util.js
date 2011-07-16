/*
 * Serach array for an element.
 *
 * Returns index of the element in the array or false if not found
 */
Array.prototype.find = function(element) {
    for (var i = 0; this[i]; i++) {
        if (this[i] === element)
            return i;
    }

    return false;
};
Array.prototype.add = function(element) {
    this[this.length] = element;
};
Array.prototype.remove = function(element) {
    var i = this.find(element);

    if (i !== false) {
        for (var j = i; this[j]; j++) {
            if (this[j+1]) {
                this[j] = this[j+1];
            } else {
                delete this[j];
            }
        }
    }
};

function Observable() {
    this.observers = [];
}/**
 * Attaches observer
 */
Observable.prototype.attach = function(observer) {
  this.observers.add(observer);
};

/**
 * Detaches observer
 */
Observable.prototype.detach = function(observer) {
   this.observers.remove(observer);
};
/**
 * Function notifys all the observers
 * Use if something in the object has changed
 *
 * It sends update to the observers with itself as an argument so that observer
 * knows who sends update request
 */
Observable.prototype.notify = function() {
    for (var i = 0; this.observers[i]; i++) {
        this.observers[i].update(this);
    }
};

function Point(x,y) {
    if (x === undefined || y === undefined) {
        throw new Error('ArgumentError');
    }
    this.x = x;
    this.y = y;
}
Point.prototype.getX = function() {
    return this.x;
};
Point.prototype.getY = function() {
    return this.y;
};
Point.prototype.translate = function(xdiff, ydiff) {
    this.x += xdiff;
    this.y += ydiff;

    return this; // return itself to allow method chaining
};
Point.prototype.equals = function(point) {
    return this.x === point.getX() && this.y === point.getY();
};
Point.prototype.toString = function() {
    return "Point:(" + this.getX() + "," + this.getY() + ")";
};





function Rectangle(centre, width, height) {
    if (!centre || width === undefined || height === undefined) {
        throw new Error('ArgumentError');
    }
    this.x = centre.getX() - width / 2;
    this.y = centre.getY() - height / 2;
    this.width  = width;
    this.height = height;
}
Rectangle.prototype.getX = Point.prototype.getX;
Rectangle.prototype.getY = Point.prototype.getY;
Rectangle.prototype.getWidth = function() {
    return this.width;
};
Rectangle.prototype.getHeight = function() {
    return this.height;
};
Rectangle.prototype.grow = function(x,y) {
    this.x -= x;
    this.y -= y;
    this.width  += x;
    this.height += y;
};
Rectangle.prototype.toString = function() {
    return "Rectangle:(" + this.getX() + "," + this.getY() + ")@(" + this.getX() + this.width + "," + this.getY() + this.height + ")";
};


/**
 * Geometry class (acting as a namespace) with static methods in it
 */
Geometry = {};
Geometry.scalar = function(w,x,y,z) {
    return w * y + x * z;
};
Geometry.cross = function(w,x,y,z) {
    return w * z - x * y;
};
Geometry.pythagoras = function(x,y) {
    return x * x + y * y;
};
Geometry.square = function(x) {
    return x * x;
};
Geometry.getLineMidPoint = function(startPoint, endPoint) {
    return new Point(Math.min(startPoint.getX(), endPoint.getX()) + Math.abs(endPoint.getX() - startPoint.getX()) / 2,
                     Math.min(startPoint.getY(), endPoint.getY()) + Math.abs(endPoint.getY() - startPoint.getY()) / 2);
};
Geometry.getRectangleCenterPoint = function(rectangle) {
    return new Point(rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2);
};
Geometry.linePointIntersect = function(startPoint, endPoint, testPoint, radius) {
    var x0 = testPoint.getX();
    var y0 = testPoint.getY();
    var x1 = startPoint.getX();
    var y1 = startPoint.getY();
    var x2 = endPoint.getX();
    var y2 = endPoint.getY();
    // 0.3 is just to make it work due to some unidentified js computation error
    radius += 0.3;

    var p = Geometry.scalar(x1 - x2, y1 - y2, x0 - x1, y0 - y1);
    var q = Geometry.scalar(x2 - x1, y2 - y1, x0 - x2, y0 - y2);

    if (p > 0) {
        return Geometry.square(radius) > Geometry.pythagoras(x1 - x0, y1 - y0);
    } else if (q > 0) {
        return Geometry.square(radius) > Geometry.pythagoras(x2 - x0, y2 - y0);
    } else {
        return Geometry.square(radius) * Geometry.pythagoras(x1 - x2, y1 - y2) > Geometry.square(Geometry.cross(x1 - x0, y1 - y0, x2 - x1, y2 - y1));
    }
};
Geometry.linePointAppxIntersect = function(startPoint, endPoint, testPoint) {
    return Geometry.linePointIntersect(startPoint, endPoint, testPoint, 3);
};
