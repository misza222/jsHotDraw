module("figure");

test("constructor", function() {
  var figure = new Figure();
  equal(figure.isSelected(), false);
});

test("paint", function() {
  var mockControl = new MockControl();
  var handleMock = mockControl.createMock(LocatorHandle.prototype);
  var figure = new Figure();
  // we need to override doPaint to avoid throwing 'AbstractMethod' error
  // TODO: test that paint actually calls doPaint
  figure.doPaint = function() {};
  figure.addHandle(handleMock);

  // this mock should register one call to paint()
  handleMock.expects().paint();

  // this time it should not call paint() - call cound is 0
  figure.setSelected(false);
  figure.paint();
  // now it should be called
  figure.setSelected(true);
  figure.paint();

  mockControl.verify();
});

test("set/getColor", function() {
  var figure = new Figure();
  var color1  = '#000000';
  var color2  = '#000001';
  figure.setColor(color1);
  strictEqual(figure.getColor(), color1);
  figure.setColor(color2);
  strictEqual(figure.getColor(), color2);
});

