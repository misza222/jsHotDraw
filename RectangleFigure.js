/*
 * RectangleFigure class
 *
 * Used to draw rectangles on the canvas
 */

function RectangleFigure(canvas, centre, width, height) {
    if (!canvas || !centre || width === undefined || height === undefined) {
            throw new Error('ArgumentError');
    }
    Figure.call(this);
    this.canvas = canvas;
    this.width  = width;
    this.height = height;
    //this.x and this.y are identifying top left corner of the rectangle
    this.x = centre.getX() - this.width / 2;
    this.y = centre.getY() - this.height / 2;
    this.addHandle(new LocatorHandle(this.canvas, this, centre));
}

RectangleFigure.prototype = new Figure();

/**
 * For documentation see Figure::doPaint
 */
RectangleFigure.prototype.doPaint = function()
{
   this.canvas.setColor(this.getColor());
   this.canvas.strokeRect(this.x, this.y, this.width, this.height);
};

RectangleFigure.prototype.touches = function(testPoint)
{
    var tlPoint   = new Point(this.x, this.y);
    var trPoint   = new Point(this.x + this.width, this.y);
    var blPoint   = new Point(this.x, this.y + this.height);
    var brPoint   = new Point(this.x + this.width, this.y + this.height);

    return Geometry.linePointAppxIntersect(tlPoint, trPoint, testPoint) ||
           Geometry.linePointAppxIntersect(trPoint, brPoint, testPoint) ||
           Geometry.linePointAppxIntersect(brPoint, blPoint, testPoint) ||
           Geometry.linePointAppxIntersect(blPoint, tlPoint, testPoint);
};

RectangleFigure.prototype.setLocation = function(point) {
    this.x = point.getX() - this.width / 2;
    this.y = point.getY() - this.height / 2;
};

RectangleFigure.prototype.getLocation = function() {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
};

RectangleFigure.prototype.getBounds = function() {
    var centre = new Point(this.x - this.width / 2,
                           this.y - this.height / 2);
    return new Rectangle(centre, this.width, this.height);
};

RectangleFigure.prototype.toString = function() {
    return 'RectangleFigure:' + new Point(this.x, this.y) + '@' + new Point(this.x + this.width, this.y + this.height);
};