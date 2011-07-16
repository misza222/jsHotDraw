module("lineFigure", {
  teardown: function() {
    var canvas = document.getElementById('canvas');
    if (canvas) {
        document.body.removeChild(canvas);
    }

    sl = null;
  }
});

test("ConstructorWrongArguments", function() {
    var constructorError = null;
    try {
        new LineFigure();
    } catch (error) {
        constructorError = error;
    }

    equal(new Error('ArgumentError').toString(), constructorError.toString());
});

test("Constructor", function() {
    var canvas = new Canvas(document);
    var startPoint = new Point(10,10);
    var endPoint   = new Point(40,50);

    var line = new LineFigure(canvas, startPoint, endPoint);

    equal(line.canvas, canvas);
    equal(line.start, startPoint);
    equal(line.end,   endPoint);
    ok(line.getHandles().length > 0);
});

test("DoPaint", function() {
    var mc = new MockControl();
    var canvasMock = mc.createMock(Canvas.prototype);
    var start = new Point(10,20);
    var end   = new Point(30,40);
    var line = new LineFigure(canvasMock, start, end);
    
    canvasMock.expects().setColor(line.getColor());
    canvasMock.expects().drawLine(start.getX(), start.getY(), end.getX(), end.getY());

    line.doPaint();

    mc.verify();
});

test("SetLocation", function() {
    var canvas = new Canvas(document);
    var start  = new Point(10,10);
    var end    = new Point(30,30);
    var targetLocation = new Point(110,110);
    
    var line = new LineFigure(canvas, start, end);

    line.setLocation(targetLocation);

    // Line location is considered to be the middle point of the line
    equal(targetLocation.toString(), Geometry.getLineMidPoint(line.start, line.end).toString());
});

test("GetLocation", function() {
    var canvas = new Canvas(document);
    var start = new Point(10,10);
    var end   = new Point(45,33);
    
    var line  = new LineFigure(canvas, start, end);

    equal(line.getLocation().toString(), Geometry.getLineMidPoint(start, end).toString());
});

test("GetBounds", function() {
    var canvas = new Canvas(document);
    var start  = new Point(10,20);
    var end    = new Point(40,50);

    var line = new LineFigure(canvas, start, end);
    var expectedBounds = new Rectangle(
        Geometry.getLineMidPoint(start, end),
        end.getX() - start.getX(), end.getY() - start.getY());
    equal(line.getBounds().toString(), expectedBounds.toString());
});
