
var sl = new ServiceLocator();

// Invoke init only after the whole document has been loaded
window.addEventListener('load', function() {init();}, false);

// function to initialize the application
function init() {
    sl.logger = new Logger();
    sl.logger.log("init loaded");

    // we need to put canvas in the global context to be able to access it from
    // Canvas::eventHandler (see the reason there)
    sl.canvas = new Canvas(document);
    var rect = new RectangleFigure(sl.canvas, new Point(110, 110), 100, 100);
    var line = new LineFigure(sl.canvas, new Point(10,10), new Point(200,300));
    
    sl.canvas.addFigure(line);
    sl.canvas.addFigure(rect);
    sl.canvas.repaint()

    var st = new SelectionTool(sl.canvas);
    sl.canvas.setTool(st);
}

