/*
 * Tool class
 *
 * Base class for all the different tools
 */

function Tool() {}

Tool.prototype.mouseOffset = function(oEvent)
{
    var elem = oEvent.target;
    var CalculatedTotalOffsetLeft = 0;
    var CalculatedTotalOffsetTop  = 0;

    while (elem.offsetParent)
    {
        CalculatedTotalOffsetLeft += elem.offsetLeft;
        CalculatedTotalOffsetTop  += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return new Point(oEvent.pageX - CalculatedTotalOffsetLeft, oEvent.pageY - CalculatedTotalOffsetTop);
};