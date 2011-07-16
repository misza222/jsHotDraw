/*
 * SelectionTool
 *
 */

function SelectionTool(canvas) {
    if (canvas) {
        this.canvas = canvas;
    } else {
        throw new Error('ArgumentError');
    }

    this.selectedHandle = null;
}

SelectionTool.prototype = new Tool();

SelectionTool.prototype.mousedown = function(oEvent) {
    var selectedFigures = this.canvas.getSelectedFigures();
    this.selectedHandle = null;
    
    for (var i = 0; selectedFigures[i]; i++) {
        if((this.selectedHandle = selectedFigures[i].handleAtPoint(this.mouseOffset(oEvent)))) {
            break;
        }
    }
    if (this.selectedHandle) {
        this.canvas.htmlCanvas.addEventListener('mousemove', this.mousemove, false);
    } else {
        var doRepaint = false;
        
        for (var i = 0; selectedFigures[i]; i++) {
            selectedFigures[i].setSelected(false);
            doRepaint = true;
        }
        figure = this.canvas.figureAtPoint(this.mouseOffset(oEvent));
        if (figure) {
            figure.setSelected(true);
            doRepaint = true;
        }
        if (doRepaint) {
            this.canvas.repaint();
        }
    }
};

SelectionTool.prototype.mouseup = function(oEvent) {
    if (this.selectedHandle) {
        this.selectedHandle = null;
        this.canvas.htmlCanvas.removeEventListener('mousemove', this.mousemove, false);
    }
};

// this is messy and needs to be refactored
SelectionTool.prototype.mousemove = function(oEvent) {
    // if method called from utside of the object context then
    // get selection tool and recall method on a object
    if (! this.canvas) {
        tool = sl.canvas.getTool();
        tool.mousemove(oEvent);
    } else {
        if (this.selectedHandle) {
            this.selectedHandle.setLocation(this.mouseOffset(oEvent));
            this.canvas.repaint();
        }
    }
};
