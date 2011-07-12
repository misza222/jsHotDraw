/*
 * LineFigure class
 *
 * Used to draw lines on the canvas
 */

function LineFigure(canvas, startPoint, endPoint) {
    if (!canvas || !startPoint || !endPoint) {
        throw new Error('ArgumentError');
    }
    Figure.call(this);
    this.canvas = canvas;
    this.start  = startPoint;
    this.end    = endPoint;
    this.mid    = Geometry.getLineMidPoint(startPoint, endPoint);
    this.addHandle(new LocatorHandle(this.canvas, this, this.mid));
}

LineFigure.prototype = new Figure();

/**
 * For documentation see Figure::doPaint
 */
LineFigure.prototype.doPaint = function() {
    this.canvas.setColor(this.getColor());
    this.canvas.drawLine(this.start.getX(), this.start.getY(), this.end.getX(), this.end.getY());
};

LineFigure.prototype.touches = function(testPoint) {

    return Geometry.linePointAppxIntersect(this.start, this.end, testPoint);
};

/*
 * Line location is considered to be the middle of the line
 */
LineFigure.prototype.setLocation = function(point) {
    var xdiff = point.getX() - this.mid.getX();
    var ydiff = point.getY() - this.mid.getY();

    this.start.translate(xdiff, ydiff);
    this.end.translate(xdiff, ydiff);
    this.mid.translate(xdiff, ydiff);
};

LineFigure.prototype.getLocation = function() {
    return this.mid;
};

LineFigure.prototype.getBounds = function() {
    return new Rectangle(this.mid, this.end.getX() - this.start.getX(), this.end.getY() - this.start.getY());
};

LineFigure.prototype.toString = function() {
    return 'LineFigure:' + this.start + '@' + this.end;
};

