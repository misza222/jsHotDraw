module("rectangleFigure", {
  teardown: function() {
    var canvas = document.getElementById('canvas');
    if (canvas) {
        document.body.removeChild(canvas);
    }

    sl = null;
  }
});

test("Constructor", function() {
    var canvas = new Canvas(document);
    var centre = new Point(50,60);
    var width   = 100;
    var height  = 200;
    var rect = new RectangleFigure(canvas, centre, width, height);

    equal(rect.canvas, canvas);
    equal(rect.x, centre.getX() - width / 2 );
    equal(rect.y, centre.getY() - height / 2);
    equal(rect.width, width);
    equal(rect.height, height);
});

test("ConstructorWrongArguments", function()
{
    var constructorError = null;
    try {
        new RectangleFigure();
    } catch (error) {
        constructorError = error;
    }

    equal(new Error('ArgumentError').toString(), constructorError.toString());
});

test("DoPaint", function() {
    var mockControl = new MockControl();
    var canvasMock = mockControl.createMock(Canvas.prototype);
    var centre = new Point(10, 20);
    var width = 100;
    var height= 200;
    var rect = new RectangleFigure(canvasMock, centre, width, height);

    canvasMock.expects().setColor(rect.getColor());
    canvasMock.expects().strokeRect(rect.x,rect.y,width,height);

    rect.doPaint();

    mockControl.verify();
});

test("Touches", function() {
    var canvas = new Canvas(document);
    var rect = new RectangleFigure(canvas, new Point(0, 0), 100, 100);

    var callCount = 0;
    Geometry.linePointIntersect = function() {
        callCount++;
        return false;
    };

    ok(! rect.touches(new Point(10,0)));

    // TODO: Tests what is passed to the Geometry.linePointIntersect not
    // only the callCount
    equal(callCount, 4);
});

test("SetLocation", function() {
    var canvas = new Canvas(document);
    var rect   = new RectangleFigure(canvas,new Point(0,0),10,10);
    rect.setLocation(new Point(20,20));

    equal(rect.x, 15);
    equal(rect.y, 15);
});

test("GetLocation", function() {
    var canvas = new Canvas(document);
    var centre = new Point(100,150);
    var rect = new RectangleFigure(canvas, centre, 40, 40);

    equal(rect.getLocation().toString(), centre.toString());
});

test("GetBounds", function() {
    var canvas = new Canvas(document);
    var centre = new Point(100, 150);
    var width  = 40;
    var height = 50;
    var rect = new RectangleFigure(canvas, centre, width, height);

    var expectedBounds = new Rectangle(centre, width, height);

    equal(rect.getBounds().toString(), expectedBounds.toString());
});
