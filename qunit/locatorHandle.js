module("locatorHandle", {
  teardown: function() {
    var canvas = document.getElementById('canvas');
    if (canvas) {
        document.body.removeChild(canvas);
    }

    sl = null;
  }
});

test("Constructor", function() {
    var location = new Point(100,100);
    var canvas = new Canvas(document);
    var figure = new Figure();
    var lh = new LocatorHandle(canvas, figure, location);
    
    //test that top left corner coordinates are set correctly
    equal(lh.x, location.getX() - Handle.WIDTH / 2);
    equal(lh.y, location.getY() - Handle.HEIGHT / 2);
});

test("ConstructorWrongArguments", function() {
    var constructorError = null;
    try {
        new LocatorHandle();
    } catch (error) {
        constructorError = error;
    }
    equal(new Error('ArgumentError').toString(), constructorError.toString());
    
});

test("Paint", function() {
    var mockControl = new MockControl();
    var canvasMock = mockControl.createMock(Canvas.prototype);
    var figure     = new Figure();
    var location = new Point(10,20);
    var lh = new LocatorHandle(canvasMock, figure, location);

    canvasMock.expects().setColor(lh.getColor());
    canvasMock.expects().fillRect(lh.x, lh.y, Handle.WIDTH, Handle.HEIGHT);

    lh.paint();

    mockControl.verify();
});

test("SetSelected", function() {
    var canvas = new Canvas(document);
    var figure = new Figure();
    var lh = new LocatorHandle(canvas, figure, new Point(10,10));

    lh.setSelected(false);
    equal(lh.getColor(), Handle.COLOR_IF_NOT_SELECTED);

    lh.setSelected(true);
    equal(lh.getColor(), Handle.COLOR_IF_SELECTED);
});

test("Touches", function() {
    var canvas = new Canvas(document);
    var figure = new Figure();
    var lh = new LocatorHandle(canvas,figure,new Point(10,10));

    var testPoint1 = new Point(10,10);
    var testPoint2 = new Point(10 - Handle.WIDTH / 2, 10 - Handle.HEIGHT / 2);
    var testPoint3 = new Point(10 + Handle.WIDTH / 2, 10 + Handle.HEIGHT / 2);

    ok(lh.touches(testPoint1));
    ok(lh.touches(testPoint2));
    ok(lh.touches(testPoint3));
});

test("SetLocation", function() {
    var mc = new MockControl();
    var canvas = new Canvas(document);
    var figureMock = mc.createMock(Figure.prototype);
    var point = new Point(20,20);
    figureMock.expects().setLocation(point);
    var lh     = new LocatorHandle(canvas, figureMock, new Point(10,10));

    lh.setLocation(point);

    equal(lh.x, 20 - Handle.WIDTH / 2);
    equal(lh.y, 20 - Handle.HEIGHT / 2);

    mc.verify();
});
