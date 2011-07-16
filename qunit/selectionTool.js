module("selectionTool", {
  teardown: function() {
    var canvas = document.getElementById('canvas');
    if (canvas) {
        document.body.removeChild(canvas);
    }

    sl = null;
  }
});

var sl = null;

test("constructor", function() {
    try {
        new SelectionTool();
    } catch (error) {
        equal(new Error('ArgumentError').toString(), error.toString());
    }

    new SelectionTool(new Object());
});

test("mouseDown", function() {
    // test that it clears already selected figures
    // test that it selects figures which are at the point(method in canvas)
    var mc1 = new MockControl();
    var mc2 = new MockControl();
    var mc3 = new MockControl();
    var testPoint = new Point(10,10);
    
    var canvasMock = mc1.createMock(Canvas.prototype);
    var figure1 = mc2.createMock(Figure.prototype);
    figure1.expects().handleAtPoint(testPoint).andReturn(null);
    figure1.expects().setSelected(false);
    var figure2 = mc3.createMock(Figure.prototype);
    figure2.expects().setSelected(true);

    canvasMock.expects().getSelectedFigures().andReturn([figure1]);
    canvasMock.expects().figureAtPoint(testPoint).andReturn(figure2);
    canvasMock.expects().repaint();

    var st = new SelectionTool(canvasMock);
    st.mouseOffset = function() {return testPoint;};
    var oEvent = new Object();
    
    st.mousedown(oEvent);

    mc1.verify();
    mc2.verify();
    mc3.verify();
});

test("mouseUp", function() {
    var canvas = new Canvas(document);
    var st = new SelectionTool(canvas);
    st.selectedHandle = new Object();

    st.mouseup(new Object());

    equal(st.selectedHandle, null);
});

test("mouseMove", function() {
    // if method called from outside of the object
    // We need to create selection tool mock to test if mousemove on that
    // object has been called
    // To do this canvas acuired from service locator object should return
    // this tool when getTool called

    var mousemove = SelectionTool.prototype.mousemove;
    var mc1 = new MockControl();
    var mc2 = new MockControl();
    var oEvent = new Object();
    var selectionToolMock = mc1.createMock(SelectionTool.prototype);
    selectionToolMock.expects().mousemove(oEvent);
    sl = new ServiceLocator();
    var canvasMock = mc2.createMock(Canvas.prototype);
    canvasMock.expects().getTool().andReturn(selectionToolMock);
    sl.canvas = canvasMock;
    
    mousemove(oEvent);

    mc1.verify();
    mc2.verify();
});
