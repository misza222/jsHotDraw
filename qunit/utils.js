module("utils");

test("ArrayFind", function() {
    var arr = [];

    var elem1 = 'Ala';
    var elem2 = 44;
    var elem3 = 'Ela';

    arr.add(elem1);
    arr.add(elem2);
    arr.add(elem3);

    ok(arr.find(elem1) === 0);
    ok(arr.find(elem2) === 1);
    ok(arr.find(elem3) === 2);

    ok(! arr.find('Michal'));
    ok(! arr.find(345));
});

test("ArrayAdd", function() {
    var arr = [];

    var elem1 = 'Ala';
    var elem2 = 34;
    
    arr.add(elem1);
    arr.add(elem2);

    ok(arr.find(elem1) >= 0);
    ok(arr.find(elem2) >= 0);
});

test("ArrayRemove", function() {
    var arr = [];

    var elem1 = 'Ala';
    var elem2 = 234;
    var elem3 = 'Ela';

    arr.add(elem1);
    arr.add(elem2);
    arr.add(elem3);

    arr.remove(elem2);

    ok(arr.find(elem1) >= 0);
    ok(! arr.find(elem2));
    ok(arr.find(elem3) >= 0);

    arr.remove(elem1);

    ok(! arr.find(elem1));
    ok(! arr.find(elem2));
    ok(arr.find(elem3) >= 0);

    arr.remove(elem3);

    ok(! arr.find(elem1));
    ok(! arr.find(elem2));
    ok(! arr.find(elem3));

});

test("ObservableConstructor", function() {
    var observable = new Observable();

    equal(observable.observers.length, 0);
});

test("ObservableNotify", function(){
    mc1 = new MockControl();
    mc2 = new MockControl();

    var observable = new Observable();
    var obs1 = mc1.createMock({
				  update: function() {}
			      });
    obs1.expects().update(observable);
    var obs2 = mc1.createMock({
				  update: function() {}
			      });
    obs2.expects().update(observable);
    observable.attach(obs1);
    observable.attach(obs2);

    observable.notify();

    mc1.verify();
    mc2.verify();
});


test("PointConstructor", function() {
    var x = 10;
    var y = 20;
    var point = new Point(x, y);

    equal(point.getX(), x);
    equal(point.getY(), y);
});

test("PointConstructorWrongArguments", function() {
    var constructorError = null;
    try {
        new Point();
    } catch (error) {
        constructorError = error;
    }

    equal(new Error('ArgumentError').toString(), constructorError.toString());
});

test("PointEquals", function() {
    var point = new Point(0,0);

    ok(point.equals(new Point(0,0)));
    ok(! point.equals(new Point(0,1)));
    ok(! point.equals(new Point(1,0)));
});

test("PointTranslate", function() {
    var xdiff = 10;
    var ydiff = 20;
    var startx= 20;
    var starty= 10;

    var point = new Point(startx, starty);
    var returnedPoint = point.translate(xdiff, ydiff);

    equal(returnedPoint, point);
    equal(point.getX(), startx + xdiff);
    equal(point.getY(), starty + ydiff);
});

test("RectangleConstructor", function() {
    var centre = new Point(110,120);
    var width = 100;
    var height= 200;

    var rect = new Rectangle(centre,width, height);

    equal(rect.getX(), centre.getX() - width / 2);
    equal(rect.getY(), centre.getY() - height / 2);
    equal(rect.getWidth(), width);
    equal(rect.getHeight(), height);
});

test("RectangleConstructorWrongArguments", function() {
    var constructorError = null;
    try {
        new Rectangle();
    } catch (error) {
        constructorError = error;
    }

    equal(new Error('ArgumentError').toString(), constructorError.toString());
});

test("GeometryScalar", function() {
    var w = 2;
    var x = 3;
    var y = 4;
    var z = 5;

    equal(Geometry.scalar(w,x,y,z), 2*4 + 3*5);
});

test("GeometryCross", function() {
    var w = 2;
    var x = 3;
    var y = 4;
    var z = 5;

    equal(Geometry.cross(w,x,y,z), w*z - x*y);
});

test("GeometryPythagoras", function() {
    var x = 5;
    var y = 7;

    equal(Geometry.pythagoras(x,y), x*x + y*y);
});

test("GeometrySquare", function() {
    var x = 3;

    equal(Geometry.square(x), x*x);
});

test("GeometryGetLineMidPoint", function() {
    // test if the line is vertical
    var start = new Point(10,10);
    var end   = new Point(10,30);

    var middle = Geometry.getLineMidPoint(start,end);

    equal(middle.getX(), 10);
    equal(middle.getY(), 20);

    // test if the line is horizontal
    var end2 = new Point(30,10);

    var middle2 = Geometry.getLineMidPoint(start,end2);

    equal(middle2.getX(), 20);
    equal(middle2.getY(), 10);

    // test if the line is horizontal
    var end3 = new Point(30,30);

    var middle3 = Geometry.getLineMidPoint(start,end3);

    equal(middle3.getX(), 20);
    equal(middle3.getY(), 20);
});

test("GeometryGetRectangleCenterPoint", function() {
    var center = new Point(10,10);
    var rect = new Rectangle(center, 10, 10);

    equal(center.toString(), Geometry.getRectangleCenterPoint(rect).toString());
});

test("GeometryLinePointIntersect", function() {
    // horizontal line
    var start = new Point(10,10);
    var end   = new Point(10,30);

    var testPoint1 = new Point(11,10);
    var testPoint2 = new Point(11,31);
    var testPoint3 = new Point(9, 14);

    ok(Geometry.linePointIntersect(start, end, testPoint1, 1));
    ok(Geometry.linePointIntersect(start, end, testPoint2, Math.sqrt(2)));
    ok(Geometry.linePointIntersect(start, end, testPoint3, 3));
    ok(! Geometry.linePointIntersect(start, end, testPoint1, 0.5));
    ok(! Geometry.linePointIntersect(start, end, testPoint2, 1));
    ok(! Geometry.linePointIntersect(start, end, testPoint3, 0.5));

    // vertical line
    var start = new Point(10,10);
    var end   = new Point(30,10);

    var testPoint1 = new Point(10,11);
    var testPoint2 = new Point(31,11);
    var testPoint3 = new Point(14, 9);

    ok(Geometry.linePointIntersect(start, end, testPoint1, 1));
    ok(Geometry.linePointIntersect(start, end, testPoint2, Math.sqrt(2)));
    ok(Geometry.linePointIntersect(start, end, testPoint3, 3));
    ok(! Geometry.linePointIntersect(start, end, testPoint1, 0.5));
    ok(! Geometry.linePointIntersect(start, end, testPoint2, 1));
    ok(! Geometry.linePointIntersect(start, end, testPoint3, 0.5));

    // some angle
    var start = new Point(10,10);
    var end   = new Point(30,30);

    var testPoint1 = new Point(10,11);
    var testPoint2 = new Point(31,31);
    var testPoint3 = new Point(19,21);

    ok(Geometry.linePointIntersect(start, end, testPoint1, 1));
    ok(Geometry.linePointIntersect(start, end, testPoint2, Math.sqrt(2)));
    ok(Geometry.linePointIntersect(start, end, testPoint3, Math.sqrt(2)));
    ok(! Geometry.linePointIntersect(start, end, testPoint1, 0.2));
    ok(! Geometry.linePointIntersect(start, end, testPoint2, 1));
    ok(! Geometry.linePointIntersect(start, end, testPoint3, 0.5));
});
