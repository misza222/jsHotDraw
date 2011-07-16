module("tool");

test("testMouseOffset", function() {
	 // as mouseOffset has no side effects we can invoke it as many times we
	 // want without it's behaviour being affected by it's the state
	 var tool = new Tool();

	 // test if the event happend on a top element
	 var oEvent = new Object();
	 oEvent.target = new Object();
	 oEvent.target.offsetParent = null;
	 oEvent.pageX = 100;
	 oEvent.pageY = 100;

	 var point = tool.mouseOffset(oEvent);

	 equal(point.getX(), oEvent.pageX);
	 equal(point.getY(), oEvent.pageY);

	 // test if the event occcured on a 3th element in the subtree
	 var oEvent = new Object();
	 oEvent.target = new Object();
	 var target = oEvent.target;
	 oEvent.pageX = 100;
	 oEvent.pageY = 100;
         
	 var offsetLeftEach   = 10;
	 var offsetTopEach  = 20;
	 var offsetLeftTotal  = 0;
	 var offsetTopTotal = 0;

	 for (var i = 0; i < 3; i++) {
	     target.offsetLeft = offsetLeftEach;
	     offsetLeftTotal += offsetLeftEach;
	     target.offsetTop = offsetTopEach;
	     offsetTopTotal += offsetTopEach;
	     target.offsetParent = new Object();
	     target = target.offsetParent;
	 }

	 var point = tool.mouseOffset(oEvent);
	 equal(point.getX(), oEvent.pageX - offsetLeftTotal);
	 equal(point.getY(), oEvent.pageY - offsetTopTotal);
         
     });
