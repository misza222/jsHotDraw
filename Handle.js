/*
 * Superclass of all the handles
 *
 * Handle is an element, usually drawn within a figure boundary, which makes
 * figure to change it's state in some way. It may be moving the figure just
 * like location handle, changing size of the figure or connecting with another
 * figure.
 *
 * This is a figure itself but it is not intended to create handles for the
 * handles :)
 */

function Handle() {}

Handle.prototype = new Figure();

Handle.WIDTH  = 8;
Handle.HEIGHT = 8;

Handle.COLOR_IF_SELECTED = '#FF0000';
Handle.COLOR_IF_NOT_SELECTED = '#0000FF';