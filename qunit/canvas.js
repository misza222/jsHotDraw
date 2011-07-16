module('canvas', {
  setup: function() {
    sl = new ServiceLocator();
    sl.logger = new Logger();
  },
  teardown: function() {
    var canvas = document.getElementById('canvas');
    if (canvas) {
        document.body.removeChild(canvas);
    }
    var logger = document.getElementById('logger');
    if (logger) {
	document.body.removeChild(logger);
    }
    sl = null;
  }
});

test("ConstructorWrongArguments", function() {
    try {
        new Canvas();
    } catch (error) {
        equal(new Error('ArgumentError').toString(), error.toString());
    }
});

test("ConstructorCreatesCanvasElementIfNecessary", function() {
    // precondition - canvas does not exist
    equal(document.getElementById('canvas'), null);

    var canvas = new Canvas(document);
    // postcondition canvas element exists and is of a correct type
    notEqual(document_canvas = document.getElementById('canvas'), null);
    ok(document_canvas instanceof HTMLCanvasElement);
});

test("ConstructorMakesUseOfExistingCanvasElement", function() {
    var existing_htmlCanvas;
    
    if(! (existing_htmlCanvas = document.getElementById('canvas'))) {
        existing_htmlCanvas = document.createElement('canvas');
        existing_htmlCanvas.id = 'canvas';
        document.body.appendChild(existing_htmlCanvas);
    }

    var canvas = new Canvas(document);

    deepEqual(canvas.htmlCanvas, existing_htmlCanvas);
});

test("AddFigure", function() {
    var figure1 = new Figure();
    var figure2 = new Figure();

    var canvas = new Canvas(document);

    canvas.addFigure(figure1);
    canvas.addFigure(figure2);

    var figures = canvas.getFigures();

    ok(figures.find(figure1) >= 0);
    ok(figures.find(figure2) >= 0);
});

test("RemoveFigure", function() {
    var figure1 = new Figure();
    var figure2 = new Figure();

    var canvas = new Canvas(document);

    canvas.addFigure(figure1);
    canvas.addFigure(figure2);

    canvas.removeFigure(figure1);

    var figures = canvas.getFigures();

    strictEqual(figures.find(figure1), false);
    strictEqual(figures.find(figure2) >= 0, true);
});

test("GetSelectedFigures", function() {
    var canvas  = new Canvas(document);
    var figure1 = new Figure();
    var figure2 = new Figure();

    figure1.setSelected(false);
    figure2.setSelected(true);
    canvas.addFigure(figure1);
    canvas.addFigure(figure2);

    equal(canvas.getSelectedFigures()[0], figure2);
});

test("FigureAtPoint", function() {
    var mc = new MockControl();
    var testPoint = new Point(10,10);
    
    var canvas = new Canvas(document);
    var figureOverThePoint = mc.createMock(Figure.prototype);
    figureOverThePoint.expects().touches(testPoint).andReturn(true);
    var figureNotOverThePoint = mc.createMock(Figure.prototype);
    figureNotOverThePoint.expects().touches(testPoint).andReturn(false);

    canvas.addFigure(figureNotOverThePoint);
    canvas.addFigure(figureOverThePoint);

    equal(figureOverThePoint, canvas.figureAtPoint(testPoint));
});

test("SetColor", function() {
    var canvas = new Canvas(document);
    var color  = '#123456';

    canvas.setColor(color);

    equal(canvas.ctx.fillStyle, color);
    equal(canvas.ctx.strokeStyle, color);
});

test("Line", function() {
    var canvas = new Canvas(document);
    var mc = new MockControl();
    var start = new Point(10,20);
    var end   = new Point(30,40);
    
    canvas.ctx = mc.createMock({
				   beginPath: function() {},
				   moveTo:    function() {},
				   lineTo:    function() {},
				   stroke:    function() {}
			       });
    canvas.ctx.expects().beginPath();
    canvas.ctx.expects().moveTo(start.getX(), start.getY());
    canvas.ctx.expects().lineTo(end.getX(), end.getY());
    canvas.ctx.expects().stroke();

    canvas.drawLine(start.getX(), start.getY(), end.getX(), end.getY());

    mc.verify();
});

test("Repaint", function() {
    var mockControl = new MockControl();
    var figureMock1 = mockControl.createMock(Figure.prototype);
    var figureMock2 = mockControl.createMock(Figure.prototype);

    var canvas = new Canvas(document);

    canvas.addFigure(figureMock1);
    canvas.addFigure(figureMock2);

    figureMock1.expects().paint();
    figureMock2.expects().paint();

    canvas.repaint();

    mockControl.verify();
});

test("Clear", function() {
    var startPoint = new Point(10,20);
    var endPoint   = new Point(50,60);

    var mc = new MockControl();
    var ctxMock = mc.createMock({
				    clearRect: function() {}
				});
    ctxMock.expects().clearRect(startPoint.getX(), startPoint.getY(),
                                endPoint.getX(), endPoint.getY());


    Canvas.prototype.getContext = function() {return ctxMock;};
    var canvas = new Canvas(document);
    // make getContext() to return ctxMock

    canvas.clear(startPoint, endPoint);

    mc.verify();
});

test("ClearAll", function() {
    var canvas = new Canvas(document);

    var mc = new MockControl();
    var canvasMock = mc.createMock(Canvas.prototype);
    canvasMock.htmlCanvas = new Object();
    canvasMock.htmlCanvas.width  = 100;
    canvasMock.htmlCanvas.height = 200;
    canvasMock.clearAll = canvas.clearAll;
    point1 = new Point(0,0);
    point2 = new Point(canvasMock.htmlCanvas.width, canvasMock.htmlCanvas.height);
    canvasMock.expects().clear(point1, point2);
    canvasMock.clearAll();

    mc.verify();
});

test("ActivateEventHandlers", function() {
    var mc = new MockControl();

    var htmlCanvasMock = mc.createMock({
					   addEventListener: function() {}
				       });

    var canvas = new Canvas(document);
    canvas.htmlCanvas = htmlCanvasMock;

    htmlCanvasMock.expects().addEventListener('mousedown',canvas.eventHandler, false);
    htmlCanvasMock.expects().addEventListener('mouseup',canvas.eventHandler, false);

    canvas.activateEventHandlers();

    mc.verify();
});

test("EventHandler", function() {
    sl.canvas = new Canvas(document);

    sl.canvas.tool = null;

    var eventHandler = sl.canvas.eventHandler;
    
    // test that it does not throw an error if tool is null
    var oEvent = new Object();
    eventHandler(oEvent);

    // test that it does not throw an error if tool method for current
    // event does not exist
    oEvent.type = 'click';
    sl.canvas.tool = new Object();
    eventHandler(oEvent);

    // test that correct event method in the tool is called
    var mc = new MockControl();
    oEvent.type = 'mousedown';
    sl.canvas.tool = mc.createMock({
				       mousedown: function() {}
				   });
    sl.canvas.tool.expects().mousedown(oEvent);
    eventHandler(oEvent);
    mc.verify();
});
