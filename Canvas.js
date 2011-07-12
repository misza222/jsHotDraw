/*
 *  Canvas class
 *
 *  Among it's (many) responsibilities is:
 *   - to hide and manage HTMLCanvasElement
 *   - add helper methods for drwaing basic figures that wraps specific calls
 *     the context
 *   - keep track of all the figures and help to identify them on the canvas
 *   - manage the way of using event handlers
 */

function Canvas(document) {
    if (!document) {
        throw new Error('ArgumentError');
    }
    
    if (!(this.htmlCanvas = document.getElementById("canvas"))) {
        this.htmlCanvas = this.createCanvas();
    }
    this.ctx    = this.getContext();
    this.figures = [];
    this.tool = null;

    this.activateEventHandlers();
}

/*
 * This method is simply to be able to mock context
 * For example see testRectangle::testPaint()
 */
Canvas.prototype.getContext = function() {
    return this.htmlCanvas.getContext("2d");
};

Canvas.prototype.createCanvas = function() {
    var htmlCanvas = document.createElement("canvas");
    htmlCanvas.id = 'canvas';
    htmlCanvas.width = '550';
    htmlCanvas.height= '400';
    htmlCanvas.style.border ='2px solid red';
    document.body.appendChild(htmlCanvas);

    return htmlCanvas;
};

Canvas.prototype.addFigure = function(figure) {
    this.figures.add(figure);
};

Canvas.prototype.removeFigure = function(figure) {
    this.figures.remove(figure);
}

// WARNING: returns refecence to the array and not clonned array
Canvas.prototype.getFigures = function() {
    return this.figures;
};

Canvas.prototype.getSelectedFigures = function() {
    var selectedFigures = [];
    for (var i = 0; this.figures[i]; i++) {
        if (this.figures[i].isSelected()) {
            selectedFigures.add(this.figures[i]);
        }
    }

    return selectedFigures;
};

Canvas.prototype.figureAtPoint = function(point) {
    for (var i = 0; this.figures[i]; i++) {
        if (this.figures[i].touches(point)) {
            return this.figures[i];
        }
    }
};

Canvas.prototype.setColor = function(color) {
    this.ctx.fillStyle   = color;
    this.ctx.strokeStyle = color;
};

Canvas.prototype.strokeRect = function(x,y,width,height) {
    this.ctx.strokeRect(x,y,width,height);
};

Canvas.prototype.fillRect = function(x,y,width,height) {
    this.ctx.fillRect(x,y,width,height);
};

Canvas.prototype.drawLine = function(startX, startY, endX, endY) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
};

Canvas.prototype.repaint = function() {
    this.clearAll();
    var figures = this.getFigures();
    for(var i = 0; figures[i]; i++) {
        figures[i].paint();
    }
};

Canvas.prototype.clear = function(startPoint, endPoint) {
    this.ctx.clearRect(startPoint.getX(),startPoint.getY(),endPoint.getX(),endPoint.getY());
};

Canvas.prototype.clearAll = function() {
    this.clear(new Point(0,0),new Point(this.htmlCanvas.width,this.htmlCanvas.height));
};

Canvas.prototype.setTool = function(tool) {
    this.tool = tool;
};

Canvas.prototype.getTool = function() {
    return this.tool;
};

/*
 * Some event handlers are registered here but others may be registered within
 * specifig tool when particular event takes place. A good example is mousemove
 * event handler which for performance reasons is registered in SelectionTool
 * in mousedown event and unregistered (removed) in mouseup event.
 */
Canvas.prototype.activateEventHandlers = function()
{
    this.htmlCanvas.addEventListener('mousedown', this.eventHandler, false);
    this.htmlCanvas.addEventListener('mouseup', this.eventHandler, false);
};

/*
 * This method is called from outside of the context of the canvas object
 * so we have to use service locator to locate canvas.
 */
Canvas.prototype.eventHandler = function(oEvent)
{
    var func = oEvent.type;
    var tool = sl.canvas.getTool();
    if(tool && tool[func]) {
        tool[func](oEvent);
    }
};
