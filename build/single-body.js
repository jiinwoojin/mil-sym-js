var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};
/**
 * Support Objects
 * @type armyc2.c2sd.renderer.so
 */
armyc2.c2sd.renderer.so.ShapeTypes ={};
    
    armyc2.c2sd.renderer.so.ShapeTypes.RECTANGLE = "RECTANGLE";
    armyc2.c2sd.renderer.so.ShapeTypes.POINT = "POINT";
    armyc2.c2sd.renderer.so.ShapeTypes.ELLIPSE = "ELLIPSE";
    armyc2.c2sd.renderer.so.ShapeTypes.ROUNDED_RECTANGLE = "ROUNDED_RECTANGLE";
    armyc2.c2sd.renderer.so.ShapeTypes.LINE = "LINE";
    armyc2.c2sd.renderer.so.ShapeTypes.BCURVE = "BCURVE";
    armyc2.c2sd.renderer.so.ShapeTypes.ARC = "ARC";
    armyc2.c2sd.renderer.so.ShapeTypes.PATH = "PATH";

armyc2.c2sd.renderer.so.ActionTypes ={};
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_MOVE_TO = 0;
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_LINE_TO = 1;
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_CURVE_TO = 2;//cubic bezier cirve
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_QUAD_TO = 3;//quadratic bezier curve
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_ARC_TO = 4;
    armyc2.c2sd.renderer.so.ActionTypes.ACTION_ARC = 5;
	armyc2.c2sd.renderer.so.ActionTypes.ACTION_DASHED_LINE_TO = 6;

   
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};
armyc2.c2sd.renderer.so.utilities = armyc2.c2sd.renderer.so.utilities || {};

/**
* Returns an indicator of where the specified point 
* {@code (px,py)} lies with respect to the line segment from 
* {@code (x1,y1)} to {@code (x2,y2)}.
* The return value can be either 1, -1, or 0 and indicates
* in which direction the specified line must pivot around its
* first end point, {@code (x1,y1)}, in order to point at the
* specified point {@code (px,py)}.
* <p>A return value of 1 indicates that the line segment must
* turn in the direction that takes the positive X axis towards
* the negative Y axis.  In the default coordinate system used by
* Java 2D, this direction is counterclockwise.  
* <p>A return value of -1 indicates that the line segment must
* turn in the direction that takes the positive X axis towards
* the positive Y axis.  In the default coordinate system, this 
* direction is clockwise.
* <p>A return value of 0 indicates that the point lies
* exactly on the line segment.  Note that an indicator value 
* of 0 is rare and not useful for determining colinearity 
* because of floating point rounding issues. 
* <p>If the point is colinear with the line segment, but 
* not between the end points, then the value will be -1 if the point
* lies "beyond {@code (x1,y1)}" or 1 if the point lies 
* "beyond {@code (x2,y2)}".
*
* @param x1 the X coordinate of the start point of the
*           specified line segment
* @param y1 the Y coordinate of the start point of the
*           specified line segment
* @param x2 the X coordinate of the end point of the
*           specified line segment
* @param y2 the Y coordinate of the end point of the
*           specified line segment
* @param px the X coordinate of the specified point to be
*           compared with the specified line segment
* @param py the Y coordinate of the specified point to be
*           compared with the specified line segment
* @return an integer that indicates the position of the third specified
*			coordinates with respect to the line segment formed
*			by the first two specified coordinates.
* @since 1.2
*/
armyc2.c2sd.renderer.so.utilities.relativeCCW = function(x1, y1,  x2, y2,  px, py)
{
    x2 -= x1;
    y2 -= y1;
    px -= x1;
    py -= y1;
    var ccw = px * y2 - py * x2;
    if (ccw === 0.0) {
        // The point is colinear, classify based on which side of
        // the segment the point falls on.  We can calculate a
        // relative value using the projection of px,py onto the
        // segment - a negative value indicates the point projects
        // outside of the segment in the direction of the particular
        // endpoint used as the origin for the projection.
        ccw = px * x2 + py * y2;
        if (ccw > 0.0) {
            // Reverse the projection to be relative to the original x2,y2
            // x2 and y2 are simply negated.
            // px and py need to have (x2 - x1) or (y2 - y1) subtracted
            //    from them (based on the original values)
            // Since we really want to get a positive answer when the
            //    point is "beyond (x2,y2)", then we want to calculate
            //    the inverse anyway - thus we leave x2 & y2 negated.
            px -= x2;
            py -= y2;
            ccw = px * x2 + py * y2;
            if (ccw < 0.0) {
                ccw = 0.0;
            }
        }
    }
    return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
};

/**
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {Number} x4
 * @param {Number} y4
 * @returns {Boolean}
 */
armyc2.c2sd.renderer.so.utilities.linesIntersect = function(x1,y1,x2,y2,x3,y3,x4,y4)   
{
    var rCCW1 = this.relativeCCW(x1,y1,
                x2,y2,
                x3,y3),

        rCCW2 = this.relativeCCW(x1,y1,
                x2,y2,
                x4,y4),

        rCCW3 = this.relativeCCW(x3,y3,
                x4,y4,
                x1,y1),

        rCCW4 = this.relativeCCW(x3,y3,
                x4,y4,
                x2,y2);

    return (((rCCW1 * rCCW2) <= 0) && ((rCCW3 * rCCW4) <= 0));  
};

/**
* Intersects the pair of specified source <code>Rectangle</code>
* objects and puts the result into the specified destination
* <code>Rectangle</code> object.  One of the source rectangles
* can also be the destination to avoid creating a third Rectangle2D
* object, but in this case the original points of this source
* rectangle will be overwritten by this method. 
* @param src1 the first of a pair of <code>Rectangle</code> 
* objects to be intersected with each other
* @param src2 the second of a pair of <code>Rectangle</code>
* objects to be intersected with each other
* @return the <code>Rectangle</code> that holds the
* results of the intersection of <code>src1</code> and
* <code>src2</code>
* @since 1.2
*/    
armyc2.c2sd.renderer.so.utilities.intersectRects = function(src1,src2)
{
    var x1 = Math.max(src1.getMinX(), src2.getMinX()),
	y1 = Math.max(src1.getMinY(), src2.getMinY()),
	x2 = Math.min(src1.getMaxX(), src2.getMaxX()),
	y2 = Math.min(src1.getMaxY(), src2.getMaxY());
    
    return new armyc2.c2sd.renderer.so.Rectangle(x1, y1, x2-x1, y2-y1);
};

 /**
* Unions the pair of source <code>Rectangle</code> objects 
* and puts the result into the specified destination 
* <code>Rectangle</code> object.  One of the source rectangles
* can also be the destination to avoid creating a third Rectangle
* object, but in this case the original points of this source
* rectangle will be overwritten by this method.
* @param src1 the first of a pair of <code>Rectangle</code>
* objects to be combined with each other
* @param src2 the second of a pair of <code>Rectangle</code>
* objects to be combined with each other
* @return the <code>Rectangle</code> that holds the
* results of the union of <code>src1</code> and  
* <code>src2</code>
* @since 1.2
*/
armyc2.c2sd.renderer.so.utilities.unionRects = function(src1,src2)
{
    var x1 = Math.min(src1.getMinX(), src2.getMinX()),
        y1 = Math.min(src1.getMinY(), src2.getMinY()),
        x2 = Math.max(src1.getMaxX(), src2.getMaxX()),
        y2 = Math.max(src1.getMaxY(), src2.getMaxY());
    return new armyc2.c2sd.renderer.so.Rectangle(x1, y1, x2, y2);
};

if(typeof CanvasRenderingContext2D !== 'undefined' && CanvasRenderingContext2D.prototype.dashedLineTo !== 'undefined')
{	//public function from:
	//https://davidowens.wordpress.com/2010/09/07/html-5-canvas-dashed-lines/
	CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) 
	{
		// Our growth rate for our line can be one of the following:
		//   (+,+), (+,-), (-,+), (-,-)
		// Because of this, our algorithm needs to understand if the x-coord and
		// y-coord should be getting smaller or larger and properly cap the values
		// based on (x,y).
		var lt = function (a, b) { return a <= b; };
		var gt = function (a, b) { return a >= b; };
		var capmin = function (a, b) { return Math.min(a, b); };
		var capmax = function (a, b) { return Math.max(a, b); };

		var checkX = { thereYet: gt, cap: capmin };
		var checkY = { thereYet: gt, cap: capmin };

		if (fromY - toY > 0) {
			checkY.thereYet = lt;
			checkY.cap = capmax;
		}
		if (fromX - toX > 0) 
		{
			checkX.thereYet = lt;
			checkX.cap = capmax;
		}

		this.moveTo(fromX, fromY);
		var offsetX = fromX;
		var offsetY = fromY;
		var idx = 0, dash = true;
		while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) 
		{
			var ang = Math.atan2(toY - fromY, toX - fromX);
			var len = pattern[idx];

			offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
			offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

			if (dash) this.lineTo(offsetX, offsetY);
			else this.moveTo(offsetX, offsetY);

			idx = (idx + 1) % pattern.length;
			dash = !dash;
		}
	};
}var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};


/**
 * @class Point
 * @param {Number} x
 * @param {Number} y
 * @returns {Point}
 */
armyc2.c2sd.renderer.so.Point = function (x,y) {
    this.x = x,
    this.y = y;
};
    /**
     * Returns a string representing one of the shape types
     * from "armyc2.c2sd.renderer.so.ShapeTypes"
     * @returns {String} 
     */
    armyc2.c2sd.renderer.so.Point.prototype.getShapeType = function(){
        return "POINT";//armyc2.c2sd.renderer.so.ShapeTypes.POINT;
    };
    /**
     * 
     * @returns {Number}
     */
    armyc2.c2sd.renderer.so.Point.prototype.getX = function(){
        return this.x;
    };
    /**
     * 
     * @returns {Number}
     */
    armyc2.c2sd.renderer.so.Point.prototype.getY = function(){
        return this.y;
    };
    /**
     * Reset the x & y of this point object.
     * @param {Number} x
     * @param {Number} y
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Point.prototype.setLocation = function (x,y){
        this.x = x;
        this.y = y;
    };
    /**
     * move x & y by specified amounts.
     * @param {Number} x shift x point by this value
     * @param {Number} y shift y point by this value
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Point.prototype.shift = function (x,y){
        this.x += x;
        this.y += y;
    };
    /**
     * @returns {String} like "{x:#,y:#}"
     */
    armyc2.c2sd.renderer.so.Point.prototype.toStringFormatted = function(){
        return "{x:" + this.x + ", y:" + this.y + "}";
    };
    /**
     * Makes a copy of this point object.
     * @returns {armyc2.c2sd.renderer.so.Point} Copy of original point.
     */
    armyc2.c2sd.renderer.so.Point.prototype.clone = function(){
        return new armyc2.c2sd.renderer.so.Point(this.x,this.y);
    };
    /**
     * @param {context} context object from html5 canvas
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Point.prototype.setPath = function(context){
        var x = this.x,
            y = this.y;

        //context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 1,y);
        context.lineTo(x + 1,y + 1);
        context.lineTo(x,y + 1);
        context.closePath();

    };
    /**
     * @param {context} context object from html5 canvas
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Point.prototype.stroke = function(context){
        context.beginPath();
        this.setPath(context);
        context.stroke();
    };
    /**
     * @param {context} context object from html5 canvas
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Point.prototype.fill = function(context){
        context.beginPath();
        this.setPath(context);
        context.fill();
    };


var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};


/**
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {Rectangle}
 */
armyc2.c2sd.renderer.so.Rectangle = function (x,y,width,height) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.bottom = y + height,
        this.right = x + width;
};      
        // <editor-fold defaultstate="collapsed" desc="Public Property Functions">

        armyc2.c2sd.renderer.so.Rectangle.prototype.getShapeType = function(){
            return "RECTANGLE";//armyc2.c2sd.renderer.so.ShapeTypes.RECTANGLE;
        };
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.getBounds = function(){
            return new armyc2.c2sd.renderer.so.Rectangle(this.x-1,
                                    this.y-1,
                                    this.width+2,
                                    this.height+2);
        };

        armyc2.c2sd.renderer.so.Rectangle.prototype.getX = function(){
            return this.x;
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getY = function(){
            return this.y;
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getWidth = function(){
            return this.width;
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getHeight = function(){
            return this.height;
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getBottom = function(){
            return this.bottom;
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getRight = function(){
            return this.right;
        };
                /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getCenterX = function(){
            return this.x + (this.width/2);
        };
        /**
         * 
         * @returns {Number}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.getCenterY = function(){
            return this.y + (this.height/2);
        };
        /**
         * setLocation x,y (top,left) while maintaining the width and height.
         * @param {type} x
         * @param {type} y
         * @returns {_L7.Anonym$0.Rectangle.setLocation}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.setLocation = function(x,y){
            this.x = x;
            this.y = y;
            this.bottom = y + this.height;
            this.right = x + this.width;
        };
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.isEmpty = function()
        {
            return (this.width <= 0.0) || (this.height <= 0.0);
        };
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Public Utility Functions">
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.shift = function(x,y){
            this.x += x;
            this.y += y;
            this.right += x;
            this.bottom +=y;
            //height & width shouldn't change in a full shift of the rectangle.
            //this.height = this.bottom - this.y;
            //this.width = this.right - this.x;
        };
        /**
         * moves top,left points leaving bottom,right intact.
         * adjusts the height & width values as necessary
         * @param {type} x the amount to move the x point by
         * @param {type} y the amount to move the y point by
         * @returns {_L7.Anonym$0.Rectangle.shiftTL}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.shiftTL = function(x,y){
            this.x += x;
            this.y += y;
            this.height = this.bottom - this.y;
            this.width = this.right - this.x;
        };
        /**
         * moves bottom,right points leaving top,left intact.
         * adjusts the height & width values as necessary
         * @param {type} x the amount to move the right point by
         * @param {type} y the amount to move the bottom point by
         * @returns {_L7.Anonym$0.Rectangle.shiftTL}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.shiftBR = function(x,y){
            this.right += x;
            this.bottom += y;
            this.height = this.bottom - this.y;
            this.width = this.right - this.x;
        };
        /**
         * Grow the rectangle by this many pixels in every direction
         * @param {Number} pixel
         * @returns {void}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.grow = function (pixel){
            this.shiftTL(-pixel,-pixel);
            this.shiftBR(pixel,pixel);
        };
        /**
         * Will merge the bounds of two rectangle.
         * @param {Rectangle} rect
         * @returns {void}
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.union = function(rect){
            if(rect)
            {
                if(rect.y < this.y)
                    this.y = rect.y;
                if(rect.x < this.x)
                    this.x = rect.x;
                if(rect.bottom > this.bottom)
                    this.bottom = rect.bottom;
                if(rect.right > this.right)
                    this.right = rect.right;
                this.width = this.right - this.x;
                this.height = this.bottom - this.y;
            }
                
        };
        armyc2.c2sd.renderer.so.Rectangle.prototype.unionPoint = function(point){
            if(point)
            {
                if(point.y < this.y)
                    this.y = point.y;
                if(point.x < this.x)
                    this.x = point.x;
                if(point.y > this.bottom)
                    this.bottom = point.y;
                if(point.x > this.right)
                    this.right = point.x;
                this.width = this.right - this.x;
                this.height = this.bottom - this.y;
            }
                
        };
        /**
         * if 2 values passed in, they are assumed to be the x,y of a point.
         * if 4 values passed in, they are assumed to be the x,y,w,h values
         * of a Rectangle.
         * @param {Number} x x value of a point or rectangle
         * @param {Number} y y value of a point or rectangle
         * @param {Number} w width of a rectangle
         * @param {Number} h height of a rectangle
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.contains = function(x,y,w,h)
        {
            if(x && y && w && h)
            {
                if (this.isEmpty() || w <= 0 || h <= 0) {
                    return false;
                }
                var x0 = this.getX(),
                    y0 = this.getY();
                return (x >= x0 &&
                        y >= y0 &&
		(x + w) <= x0 + this.getWidth() &&
		(y + h) <= y0 + this.getHeight());
            }
            else if(x && y)
            {
                var x0 = this.getX(),
                    y0 = this.getY();
                return (x >= x0 &&
                    y >= y0 &&
                    x < x0 + this.getWidth() &&
                    y < y0 + this.getHeight());
            }
            else
                return false;
        };
        
        /**
         * 
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.containsPoint = function(point)
        {
            if(point)
            {
                var x = point.getX();
                var y = point.getY();
                var x0 = this.getX(),
                    y0 = this.getY();
                return (x >= x0 &&
                    y >= y0 &&
                    x < x0 + this.getWidth() &&
                    y < y0 + this.getHeight());
            }
            else
                return false;
        };
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.containsRectangle = function(rect)
        {
            if(rect)
            {
                var x = rect.getX();
                var y = rect.getY();
                var w = rect.getWidth();
                var h = rect.getHeight();
                if (this.isEmpty() || w <= 0 || h <= 0) 
                {
                    return false;
                }
                var x0 = this.getX(),
                    y0 = this.getY();
                return (x >= x0 &&
                    y >= y0 &&
                    (x + w) <= x0 + this.getWidth() &&
                    (y + h) <= y0 + this.getHeight());
            }
            else
                return false;
        };
        
        /**
         * Ported from Java
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.outcode = function(x, y) 
        {
            var out = 0;
            if (this.width <= 0) {
            out |= this.OUT_LEFT | this.OUT_RIGHT;
            } else if (x < this.x) {
            out |= this.OUT_LEFT;
            } else if (x > this.x + this.width) {
            out |= this.OUT_RIGHT;
            }
            if (this.height <= 0) {
            out |= this.OUT_TOP | this.OUT_BOTTOM;
            } else if (y < this.y) {
            out |= this.OUT_TOP;
            } else if (y > this.y + this.height) {
            out |= this.OUT_BOTTOM;
            }
            return out;
        };
        
        /**
        * Tests if the specified line segment intersects the interior of this
        * <code>Rectangle</code>. Ported from java.
        *
        * @param x1 the X coordinate of the start point of the specified
        *           line segment
        * @param y1 the Y coordinate of the start point of the specified
        *           line segment
        * @param x2 the X coordinate of the end point of the specified
        *           line segment
        * @param y2 the Y coordinate of the end point of the specified
        *           line segment
        * @return <code>true</code> if the specified line segment intersects
        * the interior of this <code>Rectangle</code>; <code>false</code>
        * otherwise.
        */
        armyc2.c2sd.renderer.so.Rectangle.prototype.intersectsLine = function(x1, y1, x2, y2) 
        {
            var out1, out2;
            if ((out2 = outcode(x2, y2)) === 0) {
                return true;
            }
            while ((out1 = outcode(x1, y1)) !== 0) {
                if ((out1 & out2) !== 0) {
                    return false;
                }
                if ((out1 & (this.OUT_LEFT | this.OUT_RIGHT)) !== 0) {
                    var x = this.getX();
                    if ((out1 & this.OUT_RIGHT) !== 0) {
                        x += getWidth();
                    }
                    y1 = y1 + (x - x1) * (y2 - y1) / (x2 - x1);
                    x1 = x;
                } else {
                    var y = this.getY();
                    if ((out1 & this.OUT_BOTTOM) !== 0) {
                        y += getHeight();
                    }
                    x1 = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
                    y1 = y;
                }
            }
            return true;
        };
        
        // </editor-fold>
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.setPath = function(context){
            var x = this.getX(),
                y = this.getY(),
                w = this.getWidth(),
                h = this.getHeight();
            
            //context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + w,y);
            context.lineTo(x + w,y + h);
            context.lineTo(x,y + h);
            context.closePath();
            
        };
        armyc2.c2sd.renderer.so.Rectangle.prototype.stroke = function(context){
            context.strokeRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
        };
        armyc2.c2sd.renderer.so.Rectangle.prototype.fill = function(context){
            context.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
        };
        armyc2.c2sd.renderer.so.Rectangle.prototype.clone = function(){
            return new armyc2.c2sd.renderer.so.Rectangle(this.x,this.y,this.width,this.height);
        };
        
        /**
         * ported from java
         */
        armyc2.c2sd.renderer.so.Rectangle.prototype.intersects = function(r)
        {
            if(r)
            {
                var tw = this.width;
                var th = this.height;
                var rw = r.width;
                var rh = r.height;
                if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
                    return false;
                }
                var tx = this.x;
                var ty = this.y;
                var rx = r.x;
                var ry = r.y;
                rw += rx;
                rh += ry;
                tw += tx;
                th += ty;
                //      overflow || intersect
                return ((rw < rx || rw > tx) &&
                        (rh < ry || rh > ty) &&
                        (tw < tx || tw > rx) &&
                        (th < ty || th > ry));    
            }
            else
                return false;
            
        };//*/
        
        armyc2.c2sd.renderer.so.Rectangle.prototype.toSVGElement = function(stroke, strokeWidth, fill)
        {
            var line = '<rect x="' + this.x + '" y="' + this.y;
            line += '" width="' + this.width + '" height="' + this.height + '"';
            
            if(strokeWidth)
                line += ' stroke-width="' + strokeWidth + '"';
            else if(stroke) 
                line += ' stroke-width="2"';
            
            if(stroke)
                line += ' stroke="' + stroke + '"';
                
            if(fill)
                line += ' fill="' + fill + '"';
            else
                line += ' fill="none"';
            
            line += '/>';
            return line;
        };
    
        armyc2.c2sd.renderer.so.Rectangle.prototype.OUT_LEFT = 1;
        armyc2.c2sd.renderer.so.Rectangle.prototype.OUT_TOP = 2;
        armyc2.c2sd.renderer.so.Rectangle.prototype.OUT_RIGHT = 4;
        armyc2.c2sd.renderer.so.Rectangle.prototype.OUT_BOTTOM = 8;
    
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};


/**
 * RoundedRectangle
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} radius
 * @returns {RoundedRectangle}
 */
armyc2.c2sd.renderer.so.RoundedRectangle = function (x,y,w,h,radius) {

    this.radius = radius;

    this.rectangle = new armyc2.c2sd.renderer.so.Rectangle(x,y,w,h);
	
};

    /**
     * 
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.getShapeType = function(){
        return "ROUNDED_RECTANGLE";//armyc2.c2sd.renderer.so.ShapeTypes.ROUNDED_RECTANGLE;
    };

    /**
     * 
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX()-1,
                                this.rectangle.getY()-1,
                                this.rectangle.getWidth()+2,
                                this.rectangle.getHeight()+2);
    };

    /**
     * @param {Number} x 
     * @param {Number} y
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.shift = function(x,y){
        this.rectangle.shift(x,y);
    };

    /**
     * @param {HTML5 Canvas Context} context
     * @return {void}  
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.setPath = function(context){
        var x = this.rectangle.getX(),
            y = this.rectangle.getY(),
            w = this.rectangle.getWidth(),
            h = this.rectangle.getHeight();
        if(w < (2 * this.radius))
            this.radius = w/2;
        if(h < (2 * this.radius))
            this.radius = h/2;
        var r = this.radius;

        //context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w -r,y);
        context.arcTo(x + w, y, x + w, y+r, r);
        context.lineTo(x + w,y + h - r);
        context.arcTo(x + w, y+h, x+w-r, y + h, r);
        context.lineTo(x + r,y + h);
        context.arcTo(x, y+h, x, y+h-r, r);
        context.lineTo(x,y + r);
        context.arcTo(x, y, x + r, y, r);

    };
    /**
     * @param {HTML5 Canvas Context} context 
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.stroke = function(context){
        context.beginPath();
        this.setPath(context);
        context.stroke();
    };
    /**
     * @param {HTML5 Canvas Context} context 
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.fill = function(context){
        context.beginPath();
        this.setPath(context);
        context.fill();
    };
    
    armyc2.c2sd.renderer.so.RoundedRectangle.prototype.toSVGElement = function(stroke, strokeWidth, fill)
    {  
        var line = '<rect x="' + this.rectangle.getX() + '" y="' + this.rectangle.getY();
        line += '" rx="' + this.radius + '" ry="' + this.radius;
        line += '" width="' + this.rectangle.getWidth() + '" height="' + this.rectangle.getHeight() + '"';
        
        if(strokeWidth)
            line += ' stroke-width="' + strokeWidth + '"';
        else if(stroke) 
            line += ' stroke-width="2"';
        
        if(stroke)
            line += ' stroke="' + stroke + '"';
            
        if(fill)
            line += ' fill="' + fill + '"';
        else
            line += ' fill="none"';
        
        line += '/>';
        return line;
    };

var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};

/**
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @returns {Ellipse}
 */
armyc2.c2sd.renderer.so.Ellipse = function (x,y,w,h) {
    this.rectangle = new armyc2.c2sd.renderer.so.Rectangle(x,y,w,h);
};
    armyc2.c2sd.renderer.so.Ellipse.prototype.getShapeType = function(){
        return "ELLIPSE";//armyc2.c2sd.renderer.so.ShapeTypes.ELLIPSE;
    };

    armyc2.c2sd.renderer.so.Ellipse.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX()-1,
                                this.rectangle.getY()-1,
                                this.rectangle.getWidth()+2,
                                this.rectangle.getHeight()+2);
    };

    armyc2.c2sd.renderer.so.Ellipse.prototype.shift = function(x,y){
        this.rectangle.shift(x,y);
    };

    armyc2.c2sd.renderer.so.Ellipse.prototype.setPath = function(context){
        var x = this.rectangle.getX(),
            y = this.rectangle.getY(),
            w = this.rectangle.getWidth(),
            h = this.rectangle.getHeight();

        var kappa = 0.5522848,
            ox = (w/2)*kappa,//control point offset horizontal
            oy = (h/2)*kappa,//control point offset vertical
            xe = x + w,      //x-end
            ye = y + h,      //y-end
            xm = x + w / 2,  //x-middle
            ym = y + h / 2;  //y-middle

        //context.beginPath();
        context.moveTo(x,ym);
        context.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y);
        context.bezierCurveTo(xm + ox,y,xe,ym - oy,xe,ym);
        context.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);
        context.bezierCurveTo(xm-ox,ye,x,ym+oy,x,ym);
        context.closePath();
    };
    armyc2.c2sd.renderer.so.Ellipse.prototype.stroke = function(context){
        context.beginPath();
        this.setPath(context);
        context.stroke();
    };
    armyc2.c2sd.renderer.so.Ellipse.prototype.fill = function(context){
        context.beginPath();
        this.setPath(context);
        context.fill();
    };
    armyc2.c2sd.renderer.so.Ellipse.prototype.toSVGElement = function(stroke, strokeWidth, fill)
    {
        var cx = this.rectangle.getCenterX();
        var cy = this.rectangle.getCenterY();
        var rx = this.rectangle.getWidth()/2;
        var ry = this.rectangle.getHeight()/2;
        var line = '<ellipse cx="' + cx + '" cy="' + cy;
        line += '" rx="' + rx + '" ry="' + ry + '"';
        
        if(strokeWidth)
            line += ' stroke-width="' + strokeWidth + '"';
        else if(stroke)
            line += ' stroke-width="2"';
        
        if(stroke)
            line += ' stroke="' + stroke + '"';
            
        if(fill)
            line += ' fill="' + fill + '"';
        else
            line += ' fill="none"';    
        
        line += '/>';
        return line;
    };
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};



/**
 * 
 * @param {Number} x centerX
 * @param {Number} y centerY
 * @param {Number} r radius
 * @param {Number} sa start angle
 * @param {Number} ea end angle
 * @returns {armyc2.c2sd.renderer.so.Arc}
    */
armyc2.c2sd.renderer.so.Arc = function (x,y,r,sa,ea) {

    this.x = x,
    this.y = y,
    this.r = r,
    this.sa = sa * (Math.PI / 180),
    this.ea = ea * (Math.PI / 180);
    //not accurate, covers the whole circle, not just the arc.
    this.rectangle = new armyc2.c2sd.renderer.so.Rectangle(x-r,y-r,r*2,r*2);
};
    armyc2.c2sd.renderer.so.Arc.prototype.getShapeType = function(){
        return "ARC";//armyc2.c2sd.renderer.so.ShapeTypes.ARC;
    };

    armyc2.c2sd.renderer.so.Arc.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX(),
                                this.rectangle.getY(),
                                this.rectangle.getWidth(),
                                this.rectangle.getHeight());
    };

    armyc2.c2sd.renderer.so.Arc.prototype.shift = function(x,y){
        this.x +=x;
        this.y +=y;
        this.rectangle.shift(x,y);
    };

    armyc2.c2sd.renderer.so.Arc.prototype.setPath = function(context){

        //context.beginPath();
        context.arc(this.x,this.y,this.r,this.sa,this.ea,false);//counter-clockwise=false

    };
    armyc2.c2sd.renderer.so.Arc.prototype.stroke = function(context){
        context.beginPath();
        this.setPath(context);
        context.stroke();
    };
    armyc2.c2sd.renderer.so.Arc.prototype.fill = function(context){
        context.beginPath();
        this.setPath(context);
        context.fill();
    };
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};



/**
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {Number} x4
 * @param {Number} y4
 * @returns {BCurve}
 */
armyc2.c2sd.renderer.so.BCurve = function (x1,y1,x2,y2,x3,y3,x4,y4) {

    var so = armyc2.c2sd.renderer.so;

    this.x1 = x1,
    this.y1 = y1,
    this.x2 = x2,
    this.y2 = y2,
    this.x3 = x3,
    this.y3 = y3,
    this.x4 = x4,
    this.y4 = y4;

    //will be larger than the actual curve.
    this.rectangle = new so.Rectangle(x1,y1,1,1);
    this.rectangle.unionPoint(new so.Point(x2,y2));
    this.rectangle.unionPoint(new so.Point(x3,y3));
    this.rectangle.unionPoint(new so.Point(x4,y4));

};
	
    armyc2.c2sd.renderer.so.BCurve.prototype.getShapeType = function(){
        return "BCURVE";//armyc2.c2sd.renderer.so.ShapeTypes.BCURVE;
    };

    armyc2.c2sd.renderer.so.BCurve.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX()-1,
                                this.rectangle.getY()-1,
                                this.rectangle.getWidth()+2,
                                this.rectangle.getHeight()+2);
    };

    armyc2.c2sd.renderer.so.BCurve.prototype.shift = function(x,y){
        this.x1 += x;
        this.y1 += y;
        this.x2 += x;
        this.y2 += y;
        this.x3 += x;
        this.y3 += y;
        this.x4 += x;
        this.y4 += y;
        this.rectangle.shift(x,y);
    };

    armyc2.c2sd.renderer.so.BCurve.prototype.setPath = function(context){

        //context.beginPath();
        context.moveTo(this.x1,this.y1);
        context.bezierCurveTo(this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);//counter-clockwise=false

    };
    armyc2.c2sd.renderer.so.BCurve.prototype.stroke = function(context){
        context.beginPath();
        this.setPath(context);
        context.stroke();
    };
    armyc2.c2sd.renderer.so.BCurve.prototype.fill = function(context){
        context.beginPath();
        this.setPath(context);
        context.fill();
    };
    
    armyc2.c2sd.renderer.so.BCurve.prototype.toSVGElement = function(stroke, strokeWidth, fill)
    {
        // Q400,50 600,300
        var path = '<path d="M' + this.x1 + ' ' + this.y1;
        path += "C" + this.x2 + " " + this.y2 + " " + this.x3 + " " + this.y3 + " " + this.x4 + " " + this.y4 + '"';
                
        if(stroke)
            path += ' stroke="' + stroke + '"';
        
        if(strokeWidth)
            path += ' stroke-width="' + (strokeWidth) + '"';
        else if(stroke) 
            path += ' stroke-width="2"';
        
                    
        if(fill)
            path += ' fill="' + fill + '"';
        else
            path += ' fill="none"';
        
        path += '/>';
        return path;
    };
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};


/**
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns {Line}
 */
armyc2.c2sd.renderer.so.Line = function (x1,y1,x2,y2) {

    //contructor
    var so = armyc2.c2sd.renderer.so;

    this.pt1 = new so.Point(x1,y1);
    this.pt2 = new so.Point(x2,y2);

    this.rectangle = new so.Rectangle(x1,y1,1,1);
    this.rectangle.unionPoint(new so.Point(x2,y2));            

};
     
    // <editor-fold defaultstate="collapsed" desc="Public Functions">
    armyc2.c2sd.renderer.so.Line.prototype.getShapeType = function(){
        return "LINE";//armyc2.c2sd.renderer.so.ShapeTypes.LINE;
    };

    armyc2.c2sd.renderer.so.Line.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX(),
                                this.rectangle.getY(),
                                this.rectangle.getWidth(),
                                this.rectangle.getHeight());
    };
    armyc2.c2sd.renderer.so.Line.prototype.getP1 = function()
    {
        return this.pt1;
    };
    armyc2.c2sd.renderer.so.Line.prototype.getP2 = function()
    {
        return this.pt2;
    };
    
    armyc2.c2sd.renderer.so.Line.prototype.shift = function(x,y){

        this.rectangle.shift(x,y);
        
        this.pt1.shift(x,y);
        this.pt2.shift(x,y);

    };
        /**
     * Tests if the specified line segment intersects this line segment.
     * @param line the specified <code>Line</code>
     * @return <code>true</code> if this line segment and the specified line
     *			segment intersect each other; 
     *			<code>false</code> otherwise.
     */
    armyc2.c2sd.renderer.so.Line.prototype.intersectsLine = function(line)
    {
        return armyc2.c2sd.renderer.so.utilities.linesIntersect(
                    this.getP1().getX(),this.getP1().getY(),
                    this.getP2().getX(),this.getP2().getY(),
                    line.getP1().getX(),line.getP1().getY(),
                    line.getP2().getX(),line.getP2().getY());
        
    };


    armyc2.c2sd.renderer.so.Line.prototype.setPath = function(context){

        //context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());

    };
    armyc2.c2sd.renderer.so.Line.prototype.stroke = function(context){
        context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());
        context.stroke();
    };
    armyc2.c2sd.renderer.so.Line.prototype.fill = function(context){
        context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());
        context.fill();
    };
    
    armyc2.c2sd.renderer.so.Line.prototype.toSVGElement = function(stroke, strokeWidth, fill)
    {
        var line = '<line x1="' + this.pt1.getX() + '" y1="' + this.pt1.getY();
        line += '" x2="' + this.pt2.getX() + '" y2="' + this.pt2.getY() + '"';
        
        if(strokeWidth)
            line += ' stroke-width="' + strokeWidth + '"';
        else if(stroke) 
            line += ' stroke-width="2"';
        
        if(stroke)
            line += ' stroke="' + stroke + '"';
            
        if(fill)
            line += ' fill="' + fill + '"';
        else
            line += ' fill="none"';
        
        line += '/>';
        return line;
    };
    
	// </editor-fold>var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};

/**
 * 
 * @returns {Path}
 */
armyc2.c2sd.renderer.so.Path = function () {
    
    this._actions = [],
    this._dashArray = null,
    this._startPoint=null,
    this._endPoint=null,
    this._lastMoveTo = null,
    this._rectangle = null,
    this._method = null;//stroke,fill,fillPattern
	
};


    /**
     * @return {SO.ShapeTypes} ShapeTypes.Path
     */
    armyc2.c2sd.renderer.so.Path.prototype.getShapeType = function(){
        return armyc2.c2sd.renderer.so.ShapeTypes.PATH;
    };
    
    armyc2.c2sd.renderer.so.Path.prototype.setLineDash = function(dashArray)
    {
        this._dashArray = dashArray;
    }

    /**
     * @return {SO.Rectangle} description
     */
    armyc2.c2sd.renderer.so.Path.prototype.getBounds = function(){
        if(this._rectangle)
        {
            return new armyc2.c2sd.renderer.so.Rectangle(this._rectangle.getX(),
                this._rectangle.getY(),
                this._rectangle.getWidth(),
                this._rectangle.getHeight());
        }
        else
        {
            return null;
        }
    };
    /**
     * @param {Number} x 
     * @param {Number} y
     * @return {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.shift = function(x,y){
        var size = this._actions.length;
        var temp = null;
        this._rectangle.shift(x,y);

        for(var i=0; i<size;i++)
        {
            temp = this._actions[i];
            if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_MOVE_TO)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
            }
            else if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_LINE_TO)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
            }
            else if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_CURVE_TO)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
                temp[3] = temp[3] + x;
                temp[4] = temp[4] + y;
                temp[5] = temp[5] + x;
                temp[6] = temp[6] + y;
            }
            else if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_QUAD_TO)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
                temp[3] = temp[3] + x;
                temp[4] = temp[4] + y;
            }
            else if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_ARC_TO)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
                temp[3] = temp[3] + x;
                temp[4] = temp[4] + y;
            }
            else if(temp[0]===armyc2.c2sd.renderer.so.ActionTypes.ACTION_ARC)
            {
                temp[1] = temp[1] + x;
                temp[2] = temp[2] + y;
            }
        }
        this._startPoint.shift(x,y);
        this._endPoint.shift(x,y);
        this._lastMoveTo.shift(x,y);
    };

    /**
     * @return {Number} The number of this._actions on the path
     */
    armyc2.c2sd.renderer.so.Path.prototype.getLength = function(){
        this._actions.length;
    };

    /**
     * Adds a point to the path by moving to the specified coordinates specified
     * @param {type} x
     * @param {type} y
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.moveTo = function(x,y){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this._rectangle = new so.Rectangle(x,y,1,1);
            this._startPoint = new so.Point(x,y);
            this._endPoint = new so.Point(x,y);
            //curr_startPoint = new armyc2.c2sd.renderer.so.Point(x,y);
            //curr_endPoint = new armyc2.c2sd.renderer.so.Point(x,y);
        }
        this._rectangle.unionPoint(new so.Point(x,y));
        this._actions.push([so.ActionTypes.ACTION_MOVE_TO,x,y]);
        this._lastMoveTo = new so.Point(x,y);
		this._endPoint = new so.Point(x,y);
    };
    /**
     * Adds a point to the path by drawing a straight line from the current 
     * coordinates to the new specified coordinates specified
     * @param {type} x
     * @param {type} y
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.lineTo = function(x,y){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this.moveTo(0,0);
        }
        this._actions.push([so.ActionTypes.ACTION_LINE_TO,x,y]);
        this._rectangle.unionPoint(new so.Point(x,y));
        this._endPoint = new so.Point(x,y);
    };
	
	/**
     * Adds a point to the path by drawing a straight line from the current 
     * coordinates to the new specified coordinates specified
     * @param {type} x
     * @param {type} y
	 * @param {array} pattern 
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.dashedLineTo = function(x,y,pattern){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this.moveTo(0,0);
        }
		var start = this.getCurrentPoint();
        this._actions.push([so.ActionTypes.ACTION_DASHED_LINE_TO,start.getX(),start.getY(), x, y, pattern]);
        this._rectangle.unionPoint(new so.Point(x,y));
        this._endPoint = new so.Point(x,y);
    };
	
    /**
     * Adds a curved segment, defined by three new points, to the path by 
     * drawing a Bézier curve that intersects both the current coordinates 
     * and the specified coordinates (x,y), using the specified points 
     * (cp1x,xp1y) and (cp2x,cp2y) as Bézier control points.
     * @param {type} cp1x
     * @param {type} cp1y
     * @param {type} cp2x
     * @param {type} cp2y
     * @param {type} x
     * @param {type} y
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y,x,y){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this.moveTo(0,0);
        }
        this._actions.push([so.ActionTypes.ACTION_CURVE_TO,cp1x,cp1y,cp2x,cp2y,x,y]);
        this._rectangle.unionPoint(new so.Point(cp1x,cp1y));
        this._rectangle.unionPoint(new so.Point(cp2x,cp2y));
        this._rectangle.unionPoint(new so.Point(x,y));
        this._endPoint = new so.Point(x,y);
    };
    /**
     * Adds a curved segment, defined by two new points, to the path by 
     * drawing a Quadratic curve that intersects both the current 
     * coordinates and the specified coordinates (x,y), using the 
     * specified point (cpx,cpy) as a quadratic parametric control point.
     * @param {type} cpx
     * @param {type} cpy
     * @param {type} x
     * @param {type} y
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.quadraticCurveTo = function(cpx,cpy,x,y){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this.moveTo(0,0);
        }
        this._actions.push([so.ActionTypes.ACTION_QUAD_TO,cpx,cpy,x,y]);
        this._rectangle.unionPoint(new so.Point(cpx,cpy));
        this._rectangle.unionPoint(new so.Point(x,y));
        this._endPoint = new so.Point(x,y);
    };
    /**
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     * @param {type} x1 The x-coordinate of the beginning of the arc
     * @param {type} y1 The y-coordinate of the beginning of the arc
     * @param {type} x2 The x-coordinate of the end of the arc
     * @param {type} y2 The y-coordinate of the end of the arc
     * @param {type} r The radius of the arc
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.arcTo = function(x1,y1,x2,y2,r){
        var so = armyc2.c2sd.renderer.so;
        if(this._actions.length === 0)
        {
            this.moveTo(0,0);
        }
        this._actions.push([so.ActionTypes.ACTION_ARC_TO,x1,y1,x2,y2]);
        this._rectangle.unionPoint(new so.Point(x1,y1));
        this._rectangle.unionPoint(new so.Point(x2,y2));
        this._endPoint = new so.Point(x2,y2);
    };
    /**
     * The arc() method creates an arc/curve 
     * (use to create circles. or parts of circles).
     * @param {type} x The x-coordinate of the center of the circle
     * @param {type} y The y-coordinate of the center of the circle
     * @param {type} r The radius of the circle
     * @param {type} sAngle The starting angle, in degrees 
     * (0 is at the 3 -'clock position of the arc's circle)
     * @param {type} eAngle The ending angle, in degrees
     * @param {type} counterclockwise Optional. Specifies wheter the drawing 
     * should be counterclockwise or clockwise.  False=clockwise, 
     * true=counter-clockwise;
     * @returns {void}
     */
    armyc2.c2sd.renderer.so.Path.prototype.arc = function(x,y,r,sAngle,eAngle,counterclockwise){
        
        var so = armyc2.c2sd.renderer.so;
        
        if(counterclockwise !== true)
        {
            counterclockwise = false;
        }
        
        //degrees to radians
        var sa = sAngle * (Math.PI / 180),
            ea = eAngle * (Math.PI / 180);
    

        if(this._startPoint===null)
        {
            var sX = r * Math.cos(sa) + x;
            var sY = r * Math.sin(sa) + y;
            this._startPoint = new so.Point(sX,sY);
            this._rectangle = new so.Rectangle(sX,sY,1,1);
        }
        

        this._actions.push([so.ActionTypes.ACTION_ARC,x,y,r,sa,ea,counterclockwise]);
        this._rectangle.union(new so.Rectangle(x-r,y-r,r*2,r*2));
        
        var newX = r * Math.cos(ea) + x;
        var newY = r * Math.sin(ea) + y;
        this._endPoint = new so.Point(newX,newY);
        this.moveTo(newX,newY);
        
    };
    /**
     * Closes the current subpath by drawing a straight line back to the coordinates of the last moveTo.
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.Path.prototype.closePath = function(){
        this.lineTo(this._lastMoveTo.getX(),this._lastMoveTo.getY());
        this._endPoint = this._lastMoveTo.clone();
    };
    /**
     * @return Point
     */
    armyc2.c2sd.renderer.so.Path.prototype.getCurrentPoint = function()
    {
        return this._endPoint.clone();
    };
    /**
     * @return PathIterator
     */
    armyc2.c2sd.renderer.so.Path.prototype.getPathIterator = function()
    {
        return new armyc2.c2sd.renderer.so.PathIterator(this._actions);
    };
    /**
     * Apply the path to the passed context (doesn't draw)
     * @param {canvas.getContext()} context
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.Path.prototype.setPath = function(context){

        var ActionTypes = armyc2.c2sd.renderer.so.ActionTypes;
        //context.beginPath();
        var size = this._actions.length;
        var temp = null;
        
        for(var i=0; i<size;i++)
        {
            temp = this._actions[i];
			

            if(temp[0]===ActionTypes.ACTION_MOVE_TO)
            {
                //context.moveTo(temp[1],temp[2]);
                
                if(i === 0 || this._method !== "fillPattern")
                {
                    context.moveTo(temp[1],temp[2]);
                }
                else//no moves in a fill shape except maybe for the first one
                {
                    context.lineTo(temp[1],temp[2]);
                }//*/
            }
            else if(temp[0]===ActionTypes.ACTION_LINE_TO)
            {
                context.lineTo(temp[1],temp[2]);
            }
            else if(temp[0]===ActionTypes.ACTION_DASHED_LINE_TO)
            {
                if(this._method === "stroke")
                {
                    context.dashedLineTo(temp[1],temp[2],temp[3],temp[4],temp[5]);    
                }
                else //you don't dash a fill shape
                {
                    context.lineTo(temp[3],temp[4]);
                }
            }
            else if(temp[0]===ActionTypes.ACTION_CURVE_TO)
            {
                context.bezierCurveTo(temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]);
            }
            else if(temp[0]===ActionTypes.ACTION_QUAD_TO)
            {
                context.quadraticCurveTo(temp[1],temp[2],temp[3],temp[4]);
            }
            else if(temp[0]===ActionTypes.ACTION_ARC_TO)
            {
                context.arcTo(temp[1],temp[2],temp[3],temp[4],temp[5]);
            }
            else if(temp[0]===ActionTypes.ACTION_ARC)
            {
                context.arc(temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]);
            }//*/
        }
        
    };
    /**
     * Draws the path to the passed context
     * @param {canvas.getContext()} context
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.Path.prototype.stroke = function(context){
        this._method = "stroke";
        if(this._dashArray)
        {
            context.setLineDash(this._dashArray);
        }
        context.beginPath();
        this.setPath(context);
        context.stroke();
        context.setLineDash([]);
    };
    /**
     * Fills the path on the passed context
     * @param {canvas.getContext()} context
     * @return {void} 
     */
    armyc2.c2sd.renderer.so.Path.prototype.fill = function(context){
        this._method = "fill";
        context.beginPath();
        this.setPath(context);
        context.fill();
    };
    
    armyc2.c2sd.renderer.so.Path.prototype.fillPattern = function(context,fillPattern){
        this._method = "fillPattern";
        context.beginPath();
        this.setPath(context);
        var pattern = context.createPattern(fillPattern, "repeat");   
        context.fillStyle = pattern;
        context.fill();
    };
    
    /**
     * Arc and ArcTo do not covert currently
     */
    armyc2.c2sd.renderer.so.Path.prototype.toSVGElement = function(stroke, strokeWidth, fill, strokeOpacity, fillOpacity, svgFormat)
    {
        var format = 1;
        if(svgFormat)
        {
            format = svgFormat;
        }
        
        var ActionTypes = armyc2.c2sd.renderer.so.ActionTypes;
        //context.beginPath();
        var size = this._actions.length;
        var temp = null;
        var path = "";
        
        for(var i=0; i<size;i++)
        {
            temp = this._actions[i];
			
            /*if(path !== "")
                path += " ";*/

            if(temp[0]===ActionTypes.ACTION_LINE_TO)
            {
                path += "L" + temp[1] + " " + temp[2];
                //context.lineTo(temp[1],temp[2]);
            }
            else if(temp[0]===ActionTypes.ACTION_MOVE_TO)
            {
                //context.moveTo(temp[1],temp[2]);
                
                if(i === 0 || this._method !== "fillPattern")
                {
                    path += "M" + temp[1] + " " + temp[2];
                    //context.moveTo(temp[1],temp[2]);
                }
                else//no moves in a fill shape except maybe for the first one
                {
                    path += "L" + temp[1] + " " + temp[2];
                    //context.lineTo(temp[1],temp[2]);
                }//*/
            }
            else if(temp[0]===ActionTypes.ACTION_DASHED_LINE_TO)
            {
                path += "L" + temp[3] + " " + temp[4];
                /*if(this._method === "stroke")
                {
                    context.dashedLineTo(temp[1],temp[2],temp[3],temp[4],temp[5]);    
                }
                else //you don't dash a fill shape
                {
                    context.lineTo(temp[3],temp[4]);
                }//*/
            }
            else if(temp[0]===ActionTypes.ACTION_CURVE_TO)
            {
                //C100 100 250 100 250 200
                path += "C" + temp[1] + " " + temp[2] + " " + temp[3] + " " + temp[4] + " " + temp[5] + " " + temp[6]; 
                //context.bezierCurveTo(temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]);
            }
            else if(temp[0]===ActionTypes.ACTION_QUAD_TO)
            {
                path += "Q" + temp[1] + " " + temp[2] + " " + temp[3] + " " + temp[4];
                context.quadraticCurveTo(temp[1],temp[2],temp[3],temp[4]);
            }
            else if(temp[0]===ActionTypes.ACTION_ARC_TO)
            {
                //path += "C" + temp[1] + " " + temp[2] + " " + temp[3] + " " + temp[4] + " " + temp[5];
                //context.arcTo(temp[1],temp[2],temp[3],temp[4],temp[5]);
            }
            else if(temp[0]===ActionTypes.ACTION_ARC)
            {
                //context.arc(temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]);
            }//*/
        }
        //TODO: generate path svg element
        var line = '<path d="' + path + '"';

        if(stroke)
        {
            //line += ' stroke="' + stroke + '"';
            if(format === 2)
                line += ' stroke="' + stroke.replace(/#/g,"%23") + '"';//.replace(/#/g,"%23")
            else
                line += ' stroke="' + stroke + '"';
            /*else
                line += ' stroke="' + stroke.replace(/#/g,"&#35;") + '"';*/
            
            if(strokeWidth)
                line += ' stroke-width="' + strokeWidth + '"';
            else
                line += ' stroke-width="2"';
        
            if(strokeOpacity !== 1.0)
            {
                //stroke-opacity="0.4"
                line += ' stroke-opacity="' + strokeOpacity + '"';
            }
            
            //line += ' stroke-linejoin="round"';
            line += ' stroke-linecap="round"';
            //line += ' stroke-linecap="square"';
        }
            
        if(this._dashArray !== null)
            line += ' stroke-dasharray="' + this._dashArray.toString() + '"';
            
        if(fill)
        {
            if(fill.indexOf("url") === 0)
            {
                line += ' fill="url(#fillPattern)"';
                //line += ' fill="url(&#35;fillPattern)"';
            }
            else
            {
                //line += ' fill="' + fill + '"';
                if(format === 2)
                    line += ' fill="' + fill.replace(/#/g,"%23") + '"';//text = text.replace(/\</g,"&gt;");
                else
                    line += ' fill="' + fill + '"';//text = text.replace(/\</g,"&gt;");
                /*else
                    line += ' fill="' + fill.replace(/#/g,"&#35;") + '"';//text = text.replace(/\</g,"&gt;");*/
                    
                if(fillOpacity !== 1.0)
                {
                    //fill-opacity="0.4"
                    line += ' fill-opacity="' + fillOpacity + '"';
                }    
            }
            
        }
        else
            line += ' fill="none"';
        
        line += ' />';
        return line;
        
    };var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/**
 * 
 * @param {Number} R
 * @param {Number} G
 * @param {Number} B
 * @param {Number} A
 * @returns {armyc2.c2sd.renderer.utilities.Color}
 */
armyc2.c2sd.renderer.utilities.Color = function (R,G,B,A) {

    //private vars
    this.A = 255;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    
    //constructor code
    this.R = R;
    this.G = G;
    this.B = B;
    if(A !== undefined)
        this.A = A;
};        
        
    
    
    armyc2.c2sd.renderer.utilities.Color.prototype.convert = function(integer)
    {
        //Simpler
        //var str = integer.toString(16);
        //return str.length === 1 ? "0" + str : str;
        
        //Much Faster
        var hexAlphabet = "0123456789ABCDEF";
        return isNaN(integer) ? "00" : hexAlphabet.charAt((integer - integer % 16)/16) + hexAlphabet.charAt(integer % 16);
    };
    
    
    
    armyc2.c2sd.renderer.utilities.Color.prototype.getAlpha = function()
    {
        return this.A;
    };
    
    armyc2.c2sd.renderer.utilities.Color.prototype.getRed = function()
    {
        return this.R;
    };
    
    armyc2.c2sd.renderer.utilities.Color.prototype.getGreen = function()
    {
        return this.G;
    };
    
    armyc2.c2sd.renderer.utilities.Color.prototype.getBlue = function()
    {
        return this.B;
    };
    
    armyc2.c2sd.renderer.utilities.Color.prototype.toRGB = function()
    {
        return (this.R*65536) + (this.G*256) + this.B;
    };
    
    armyc2.c2sd.renderer.utilities.Color.prototype.toARGB = function()
    {
        return (this.A << 24) + ((this.R & 0xFF) << 16) + ((this.G & 0xFF) << 8) + (this.B & 0xFF);
    };
    /**
     * A hex string in the format of AARRGGBB
	 * @param {Boolean} withAlpha Optional, default is true. If set to false, 
	 * will return a hex string without alpha values.
     */
    armyc2.c2sd.renderer.utilities.Color.prototype.toHexString = function(withAlpha)
    {
        if(withAlpha === false)
        {
            return "#" + this.convert(this.R) + 
                            this.convert(this.G) + 
                            this.convert(this.B);
        }
        else
        {
            return "#" + this.convert(this.A) + 
                            this.convert(this.R) + 
                            this.convert(this.G) + 
                            this.convert(this.B);
        }    
    };
    /**
     * A KML Formatted hex string is in the format of AABBGGRR
     */
    armyc2.c2sd.renderer.utilities.Color.prototype.toKMLHexString = function()
    {
        return "#" + 
                this.convert(this.A) + 
                this.convert(this.B) + 
                this.convert(this.G) + 
                this.convert(this.R);
    };
    

    

//static public vars/functions
//milstd.renderer.ClassName.MY_CONSTANT = "constant_value";
//milstd.renderer.ClassName.myStaticFunction = function(){};

/**
 * @param {Number} color int value of a color
 * @return {Number} 0 - 255, alpha value
 */
armyc2.c2sd.renderer.utilities.Color.getAlphaFromColor = function(color)
{
	var alpha = 255;
	if (color > 16777215) alpha = (color >>> 24);
	return alpha;
};

/**
 * @param {Number} color int value of a color
 * @return {Number} 0 - 255, Red value
 */
armyc2.c2sd.renderer.utilities.Color.getRedFromColor = function(color)
{
	var red = 255;
	red = (color >> 16) & 0xFF;
	return red;
};

/**
 * @param {Number} color int value of a color
 * @return {Number} 0 - 255, Green value
 */
armyc2.c2sd.renderer.utilities.Color.getGreenFromColor = function(color)
{
	var green = 255;
	green = (color >> 8) & 0xFF;
	return green;
};

/**
 * @param {Number} color int value of a color
 * @return {Number} 0 - 255, Blue value
 */
armyc2.c2sd.renderer.utilities.Color.getBlueFromColor = function(color)
{
	var blue = 255;
	if (color > 16777215) 
		blue = color & 0x000000FF;
	else 
		blue = color & 0x0000FF;
	return blue;
};

/**
*
* @param hexValue - String representing hex value
* (formatted "0xRRGGBB" i.e. "0xFFFFFF")
* OR
* formatted "0xAARRGGBB" i.e. "0x00FFFFFF" for a color with an alpha value
* I will also put up with "RRGGBB" and "AARRGGBB" without the starting "0x"
* @return
*/
armyc2.c2sd.renderer.utilities.Color.getColorFromHexString = function(hexValue)
{
    //var hexOriginal = new String(hexValue);

    var hexAlphabet = "0123456789ABCDEF";

    if(hexValue.charAt(0)==='#')
        hexValue = hexValue.substring(1);
    if(hexValue.substring(0,2)===("0x") || hexValue.substring(0,2)===("0X"))
        hexValue = hexValue.substring(2);

    hexValue = hexValue.toUpperCase();

    var count = hexValue.length,
        value = null,
        k = 0,
        int1 = 0,
        int2 = 0;

    if(count === 8 || count === 6)
    {
        value = [];//int[(count / 2)];
        for(var i=0; i<count;i+=2)
        {
                int1 = hexAlphabet.indexOf(hexValue.charAt(i));
                int2 = hexAlphabet.indexOf(hexValue.charAt(i+1));
                value[k]=(int1 * 16) + int2;
                k++;
        }

        if(count === 8)
        {
                return new armyc2.c2sd.renderer.utilities.Color(value[1],value[2],value[3],value[0]);
        }
        else if(count === 6)
        {
                return new armyc2.c2sd.renderer.utilities.Color(value[0],value[1],value[2]);
        }
    }
    else
    {       
            //ErrorLogger.LogMessage("SymbolUtilties", "getColorFromHexString", "Bad hex value: " + hexOriginal, Level.WARNING);
    }
    return null;
};

armyc2.c2sd.renderer.utilities.Color.rgbToHexString = function(r,g,b,a)
{
    var temp = new armyc2.c2sd.renderer.utilities.Color(r,g,b,a);
    return temp.toHexString(true);
};

armyc2.c2sd.renderer.utilities.Color.white =  new armyc2.c2sd.renderer.utilities.Color (255, 255, 255);
armyc2.c2sd.renderer.utilities.Color.WHITE = armyc2.c2sd.renderer.utilities.Color.white;
armyc2.c2sd.renderer.utilities.Color.lightGray =  new armyc2.c2sd.renderer.utilities.Color (192, 192, 192);
armyc2.c2sd.renderer.utilities.Color.LIGHT_GRAY = armyc2.c2sd.renderer.utilities.Color.lightGray;
armyc2.c2sd.renderer.utilities.Color.gray =  new armyc2.c2sd.renderer.utilities.Color (128, 128, 128);
armyc2.c2sd.renderer.utilities.Color.GRAY = armyc2.c2sd.renderer.utilities.Color.gray;
armyc2.c2sd.renderer.utilities.Color.darkGray =  new armyc2.c2sd.renderer.utilities.Color (64, 64, 64);
armyc2.c2sd.renderer.utilities.Color.DARK_GRAY = armyc2.c2sd.renderer.utilities.Color.darkGray;
armyc2.c2sd.renderer.utilities.Color.black =  new armyc2.c2sd.renderer.utilities.Color (0, 0, 0);
armyc2.c2sd.renderer.utilities.Color.BLACK = armyc2.c2sd.renderer.utilities.Color.black;
armyc2.c2sd.renderer.utilities.Color.red =  new armyc2.c2sd.renderer.utilities.Color (255, 0, 0);
armyc2.c2sd.renderer.utilities.Color.RED = armyc2.c2sd.renderer.utilities.Color.red;
armyc2.c2sd.renderer.utilities.Color.pink =  new armyc2.c2sd.renderer.utilities.Color (255, 175, 175);
armyc2.c2sd.renderer.utilities.Color.PINK = armyc2.c2sd.renderer.utilities.Color.pink;
armyc2.c2sd.renderer.utilities.Color.orange =  new armyc2.c2sd.renderer.utilities.Color (255, 200, 0);
armyc2.c2sd.renderer.utilities.Color.ORANGE = armyc2.c2sd.renderer.utilities.Color.orange;
armyc2.c2sd.renderer.utilities.Color.yellow =  new armyc2.c2sd.renderer.utilities.Color (255, 255, 0);
armyc2.c2sd.renderer.utilities.Color.YELLOW = armyc2.c2sd.renderer.utilities.Color.yellow;
armyc2.c2sd.renderer.utilities.Color.green =  new armyc2.c2sd.renderer.utilities.Color (0, 255, 0);
armyc2.c2sd.renderer.utilities.Color.GREEN = armyc2.c2sd.renderer.utilities.Color.green;
armyc2.c2sd.renderer.utilities.Color.magenta =  new armyc2.c2sd.renderer.utilities.Color (255, 0, 255);
armyc2.c2sd.renderer.utilities.Color.MAGENTA = armyc2.c2sd.renderer.utilities.Color.magenta;
armyc2.c2sd.renderer.utilities.Color.cyan =  new armyc2.c2sd.renderer.utilities.Color (0, 255, 255);
armyc2.c2sd.renderer.utilities.Color.CYAN = armyc2.c2sd.renderer.utilities.Color.cyan;
armyc2.c2sd.renderer.utilities.Color.blue =  new armyc2.c2sd.renderer.utilities.Color (0, 0, 255);
armyc2.c2sd.renderer.utilities.Color.BLUE = armyc2.c2sd.renderer.utilities.Color.blue;
armyc2.c2sd.renderer.utilities.Color.navyblue =  new armyc2.c2sd.renderer.utilities.Color (0, 102, 255);
armyc2.c2sd.renderer.utilities.Color.NAVY_BLUE = armyc2.c2sd.renderer.utilities.Color.navyblue;

var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
armyc2.c2sd.renderer.utilities.AffiliationColors = armyc2.c2sd.renderer.utilities.AffiliationColors || {};


armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyUnitFillColor = new armyc2.c2sd.renderer.utilities.Color (128, 224, 255);
armyc2.c2sd.renderer.utilities.AffiliationColors.HostileUnitFillColor = new armyc2.c2sd.renderer.utilities.Color (255, 128, 128);
armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralUnitFillColor = new armyc2.c2sd.renderer.utilities.Color (170, 255, 170);
armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownUnitFillColor = new armyc2.c2sd.renderer.utilities.Color (255, 255, 128);

armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyGraphicFillColor =  new armyc2.c2sd.renderer.utilities.Color (128, 224, 255);
armyc2.c2sd.renderer.utilities.AffiliationColors.HostileGraphicFillColor =  new armyc2.c2sd.renderer.utilities.Color (255, 128, 128);
armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralGraphicFillColor =  new armyc2.c2sd.renderer.utilities.Color (170, 255, 170);
armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownGraphicFillColor =  new armyc2.c2sd.renderer.utilities.Color (255, 255, 128);

armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyUnitLineColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
armyc2.c2sd.renderer.utilities.AffiliationColors.HostileUnitLineColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralUnitLineColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownUnitLineColor = armyc2.c2sd.renderer.utilities.Color.BLACK;

armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyGraphicLineColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
armyc2.c2sd.renderer.utilities.AffiliationColors.HostileGraphicLineColor = armyc2.c2sd.renderer.utilities.Color.RED;
armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralGraphicLineColor = armyc2.c2sd.renderer.utilities.Color.GREEN;
armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownGraphicLineColor = armyc2.c2sd.renderer.utilities.Color.YELLOW;

armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherRed =  new armyc2.c2sd.renderer.utilities.Color (198, 16, 33);
armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherBlue =  new armyc2.c2sd.renderer.utilities.Color (0, 0, 255);
armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherPurpleDark =  new armyc2.c2sd.renderer.utilities.Color (128, 0, 128);
armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherPurpleLight =  new armyc2.c2sd.renderer.utilities.Color (226, 159, 255);
armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherBrownDark =  new armyc2.c2sd.renderer.utilities.Color (128, 98, 16);
armyc2.c2sd.renderer.utilities.AffiliationColors.WeatherBrownLight =  new armyc2.c2sd.renderer.utilities.Color (210, 176, 106);
//Check for IE9 which doesn't have a console object until dev tools are open.
if(!(window && window.console)){
    this.console = {
        log: function(){},
        debug: function(){},
        info: function(){},
        warn: function(){},
        error: function(){},
        dir: function(){}
    };
}

//Singleton template, unfortunately, cannot be parsed by netbeans//////////////
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

armyc2.c2sd.renderer.utilities.ErrorLogger = (function () {
    //private vars
    var _level = "800";
    
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    //constructor code
    //for IE8
    if(typeof String.prototype.trim !== 'function')
    {
        String.prototype.trim = function()
        {
           return this.replace(/^\s+|\s+$/g, '');
        };
    }
    
    //private functions
    function getDateString(date)
    {
        var strDate = "";
        
        try
        {
            strDate += months[date.getMonth()] + " " +
                        date.getDate() + ", " +
                        date.getFullYear() + " " +
                        date.getHours() + ":" +
                        date.getMinutes() + ":" +
                        date.getSeconds() + "." +
                        date.getMilliseconds();
        }
        catch(err)
        {
            strDate = date.toString();
        }
        
        return strDate;
    }
    
return{    

    //public vars
    OFF : Number.MAX_VALUE,
    SEVERE : 1000,
    WARNING : 900,
    INFO : 800,
    CONFIG : 700,
    FINE : 500,
    FINER : 400,
    FINEST : 300,
    ALL : Number.MIN_VALUE,
    //publicFunction: function(){return "I'm a public function";}
    
    getLevelName: function(level)
    {
        var name = "unknown";
        switch(level)
        {
            case Number.MAX_VALUE:
                name = "OFF";
                break;
            case 1000:
                name = "Severe";
                break;
            case 900:
                name = "Warning";
                break;
            case 800:
                name = "Info";
                break;
            case 700:
                name = "Config";
                break;
            case 500:
                name = "Fine";
                break;
            case 400:
                name = "Finer";
                break;
            case 300:
                name = "Finest";
                break;
            case Number.MIN_VALUE:
                name = "ALL";
                break;
            default:
                name = "Unknown Error Level";
                break;
        }
        return name;
    },
    /**
     * Logger will only log messages at the set level or higher
     * @param {Number} level like:
     * OFF : Number.MAX_VALUE,
     *  SEVERE : 1000,
     *  WARNING : 900,
     *  INFO : 800,
     *  CONFIG : 700,
     *  FINE : 500,
     *  FINER : 400,
     *  FINEST : 300,
     *  ALL : Number.MIN_VALUE,
     */
    setLevel: function(level)
    {
        _level = level;
    },
    getLevel: function()
    {
        return _level;
    },
    /**
     * 
     * @param {String} sourceClass
     * @param {String} sourceMethod
     * @param {type} param1
     */
    Entering: function(sourceClass, sourceMethod, param1)
    {
        if(_level <= this.FINER)
        {
            if(console !== undefined)
            {
                console.log("Entering: " + sourceClass + "." + sourceMethod + "()");
            }
        }
    },
    /**
     * 
     * @param {String} sourceClass
     * @param {String} sourceMethod
     * @param {type} param1
     */        
    Exiting: function(sourceClass, sourceMethod, param1)
    {
        if(_level <= this.FINER)
        {
            if(console !== undefined)
            {
                console.log("Exiting: " + sourceClass + "." + sourceMethod + "()");
            }
        }
    },
    /**
     * 
     * @param {String} sourceClass
     * @param {String} sourceMethod
     * @param {String} message
     * @param {Number} level optional, default 800 (INFO)
     */        
    LogMessage: function(sourceClass, sourceMethod, message, level)
    {
        if(level === undefined || level === null)
            level = 800;
        if(level >= _level)
        {
            if(console !== undefined)
            {
                message = getDateString(new Date()) + " " + sourceClass + " " + sourceMethod + "\n" +
                        this.getLevelName(level) + ": " + message;
                
                //message = "Info: " + sourceClass + "." + sourceMethod + "()" +
                //            "\n" + this.getLevelName(level) + ": " + message;

                console.info(message);
            }
        }
    },
    /**
     * 
     * @param {String} sourceClass
     * @param {String} sourceMethod
     * @param {String} message
     * @param {Number} level optional, default 900 (WARNING)
     */
    LogWarning: function(sourceClass, sourceMethod, message, level)
    {
        if(level === undefined || level === null)
            level = 900;
        if(level >= _level)
        {
            if(console !== undefined)
            {
                message = getDateString(new Date()) + " " + sourceClass + " " + sourceMethod + "\n" +
                        this.getLevelName(level) + ": " + message;
//                message = "Warning: " + sourceClass + "." + sourceMethod + "()" +
//                        "\n" + message;

                console.warn(message);
            }
        }
    },
    /**
     * 
     * @param {String} sourceClass
     * @param {String} sourceMethod
     * @param {String} err
     * @param {Object} param optional, an object to send to the log
     * @param {Number} level optional, default 1000 (SEVERE)
     */
    LogException: function(sourceClass, sourceMethod, err, param, level)
    {
        if(level === undefined || level === null)
            level = 1000;
        if(level >= _level)
        {
            if(console !== undefined)
            {
                var message = getDateString(new Date()) + " " + sourceClass + " " + sourceMethod + "\n" +
                        this.getLevelName(level) + ": ";
//                var message = "Error: " + sourceClass + "." + sourceMethod + "()\n";

                message += err.name + ": " + err.message;
                
                //get stack trace
                var stack = null;
                if(err.stack)
                {
                    stack = err.stack;
                }
                
                if(!(stack))
                {
                    if(err.filename && err.lineno)
                    {
                        stack = err.filename + " at line# " + err.lineno;
                    }
                }

                //group stack trace if possible so it doesn't take up too
                //much space in the console log.
                if(console.groupCollapsed)
                {
                    console.error(message);
                    if(stack !== null)
                    {
                        console.groupCollapsed("Stack Trace:");// for: " + err.message);
                        console.error(stack);
                        if(console.dir && param)
                        {
                            console.dir(param);
                        }
                        console.groupEnd();
                    }
                }
                else
                {
                    if(stack !== null)
                    {
                       message += "\n" + stack;
                    }
                    console.error(message);
                    if(console.dir && param)
                    {
                        console.info(param);
                    }
                }
            }
        }
    }
            
    
};
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
armyc2.c2sd.renderer.utilities.MilStdAttributes = armyc2.c2sd.renderer.utilities.MilStdAttributes || {};


armyc2.c2sd.renderer.utilities.MilStdAttributes.LineColor = "LINECOLOR";
armyc2.c2sd.renderer.utilities.MilStdAttributes.FillColor = "FILLCOLOR";
armyc2.c2sd.renderer.utilities.MilStdAttributes.IconColor = "ICONCOLOR";
armyc2.c2sd.renderer.utilities.MilStdAttributes.TextColor = "TEXTCOLOR";
armyc2.c2sd.renderer.utilities.MilStdAttributes.TextBackgroundColor = "TEXTBACKGROUNDCOLOR";
armyc2.c2sd.renderer.utilities.MilStdAttributes.Alpha = "ALPHA";
armyc2.c2sd.renderer.utilities.MilStdAttributes.LineWidth = "LINEWIDTH";
armyc2.c2sd.renderer.utilities.MilStdAttributes.PixelSize = "SIZE";
armyc2.c2sd.renderer.utilities.MilStdAttributes.KeepUnitRatio = "KEEPUNITRATIO";
armyc2.c2sd.renderer.utilities.MilStdAttributes.SymbologyStandard = "SYMSTD";
armyc2.c2sd.renderer.utilities.MilStdAttributes.Icon = "ICON";
armyc2.c2sd.renderer.utilities.MilStdAttributes.LookAtTag = "LOOKAT";
armyc2.c2sd.renderer.utilities.MilStdAttributes.AltitudeMode = "ALTMODE";
armyc2.c2sd.renderer.utilities.MilStdAttributes.UseDashArray = "USEDASHARRAY";
armyc2.c2sd.renderer.utilities.MilStdAttributes.UsePatternFill = "USEPATTERNFILL";
armyc2.c2sd.renderer.utilities.MilStdAttributes.PatternFillType = "PATTERNFILLTYPE";
armyc2.c2sd.renderer.utilities.MilStdAttributes.HideOptionalLabels = "HIDEOPTIONALLABELS";//azimuth and range labels for range fans.
armyc2.c2sd.renderer.utilities.MilStdAttributes.SVGFormat = "SVGFORMAT";//0 plain SVG, 1 base64 (default), 2 % notation
armyc2.c2sd.renderer.utilities.MilStdAttributes.GeoJSONFormat = "GJFORMAT";//0 JSON formatted String (default), 1 Object

var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.RendererUtilities = (function () {
    //private vars
    var pastTextMeasurements = {};
    var fullFontMeasurements = {};
    var pastIdealOutlineColors = {};
    var FillPatterns = armyc2.c2sd.renderer.utilities.FillPatterns || null;
    
    //constructor code
    var _canvas = null;
    var _ctx = null;
    if(document && document.createElement)
    {
        _canvas = document.createElement("canvas");
        _canvas.width = 100;
        _canvas.height = 100;
    }

    
    if(_canvas && _canvas.getContext)
    {
        _ctx = _canvas.getContext('2d');
        _ctx.textBaseline = 'top';
    }
    else
    {
        //typcial renderer defaults
        pastTextMeasurements["bold 9pt Arial, sans-serif"] = {width:0,height:10,descent:2,fullHeight:12};
        pastTextMeasurements["bold 10pt Arial, sans-serif"] = {width:0,height:11,descent:3,fullHeight:14};
        pastTextMeasurements["bold 12pt Arial, sans-serif"] = {width:0,height:13,descent:3,fullHeight:16};
        pastTextMeasurements["bold 9pt Arial, serif"] = {width:0,height:10,descent:2,fullHeight:12};
        pastTextMeasurements["bold 10pt Arial, serif"] = {width:0,height:11,descent:3,fullHeight:14};
        pastTextMeasurements["bold 12pt Arial, serif"] = {width:0,height:13,descent:3,fullHeight:16};        
        //GE default font
        pastTextMeasurements["normal 16pt Arial"] = {width:0,height:16,descent:4,fullHeight:20};        
    }
    
    //private functions
    function scanForCharTopAndBottom(pixels,width,height,widthLimit)
    {
        var top = -1,
            bottom = -1;
               
        var row = 0,
            col = 0;
    
        var hit = false;
        for(row = 0; row < height; row++)
        {
            if(hit === true || top === -1)
            {
                hit = false;
                for(col = 0; col < widthLimit; col++)
                {

                    var index = ((row * width) + col) * 4;

                    if(top === -1 && pixels[index] !== 0)
                    {
                        top = row - 1;
                        col = width-1;
                        hit = true;
                    }
                    else if(pixels[index] !== 0)
                    {
                        hit = true;
                        bottom = row+1;
                        col = width-1;
                    }
                }
            }
        }
        
        return {top:top,bottom:bottom};
    };

    /**
     * 
     * @param {type} font like "bold 9pt Arial, sans-serif"
     * @param {string} text include if you want a width value
     * @returns {armyc2.c2sd.renderer.utilities.RendererUtilities.getFontHeightAndDescent.end|Number|armyc2.c2sd.renderer.utilities.RendererUtilities.getFontHeightAndDescent.row|armyc2.c2sd.renderer.utilities.RendererUtilities.getFontHeightAndDescent.height|armyc2.c2sd.renderer.utilities.RendererUtilities.getFontHeightAndDescent.start}
     */
    function getFontWidthHeightAndDescent(font,text)
    {

        var width = 100,
            height = 100;

        _ctx.font = font;

        _ctx.fillStyle = 'black';
        _ctx.fillRect(0,0,width,height);
        _ctx.fillStyle = 'white';
        
        _ctx.fillText("M",0,0);
        

        var mWidth = Math.ceil(_ctx.measureText("M").width);
        var gWidth = Math.ceil(_ctx.measureText("g").width);
        
        var pixels = _ctx.getImageData(0,0,width,height).data;
        
        var mtb = scanForCharTopAndBottom(pixels,width,height, mWidth);

        _ctx.fillStyle = 'black';
        _ctx.fillRect(0,0,width,height);
        _ctx.fillStyle = 'white';
        
        _ctx.fillText("g",0,0);
        pixels = _ctx.getImageData(0,0,width,height).data;
        
        var gtb = scanForCharTopAndBottom(pixels,width,height, gWidth);

        var height = mtb.bottom - mtb.top;
        var descent = gtb.bottom - mtb.bottom;
        var fullHeight = gtb.bottom - mtb.top;
        
        var textWidth = 0;
        if(text)
            textWidth = _ctx.measureText(text).width;
        
        return {width:textWidth,height:height,descent:descent,fullHeight:fullHeight};
            
    };
    

	/**
     * Clients should use getTextBounds
     * Not accurate but good to check if the rendering fonts have been loaded
     * @param {String} fontName like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} fontSize like 12
     * @param {String} fontStyle like "bold"
     * @param {String} text
     * @returns {Array[width,height]}
     */
     function measureTextQuick(fontName, fontSize, fontStyle, text){
        var doc = document;
        var div = doc.createElement('DIV');
            div.innerHTML = text;
            div.style.position = 'absolute';
            div.style.top = '-999px';
            //div.style.left = '-999px';
            div.style.fontFamily = fontName;
            div.style.fontWeight = fontStyle ? 'bold' : 'normal';
            div.style.fontSize = fontSize + 'pt';
            doc.body.appendChild(div);
            var size = [div.offsetWidth, div.offsetHeight];
            
            doc.body.removeChild(div);
            div = null;
            return size;//*/
    };

    /**
     * Made with the intent to use in a web worker.
     * @param {type} font like "bold 9pt Arial, sans-serif"
     * @param {string} text include if you want a width value
     */
    function measureStringSansDOM(text, measurements)
    {
        //get font measurements
        var widths = measurements.widths; 
        var width = 0;
        text = "" + text;
        var length = text.length;
        for (var i=0; i < length; i++) 
        {
            var character = text.charAt(i);
            width += widths[character] ? (widths[character] + 1) : (widths["W"] + 1);
        } 
        var bounds = new armyc2.c2sd.renderer.so.Rectangle(0,0 - measurements.height,
                                Math.round(width), measurements.fullHeight); 
        return bounds;
    };
    
    
    function measureTextIE8(fontName, fontSize, fontStyle, text){
        var doc = document;
		var div = null;
		var textWidth = 0;
		var size = null;
		
        var font = fontStyle + " " + fontSize + "pt " + fontName;
        if(pastTextMeasurements[font])
        {
            size = pastTextMeasurements[font];
            fullHeight = size.fullHeight;
            height = size.height;
            descent = size.descent;
			
            if(text)
            {
                if(_ctx)
                {
                    textWidth = _ctx.measureText(text).width;
                }
                else if(fullFontMeasurements[font])
                {
                    textWidth = measureStringSansDOM(text, fullFontMeasurements[font]).getWidth();
                }
                else//use an approximation
                {
                    textWidth = Math.floor(parseFloat(fontSize) / 2.0) * text.length;
                }
            }
        }

        else if(doc.createElement)
        {

            div = doc.createElement('DIV');
            div.innerHTML = text;
            div.style.position = 'absolute';
            div.style.top = '-999px';
            //div.style.left = '-999px';
            div.style.fontFamily = fontName;
            div.style.fontWeight = fontStyle ? 'bold' : 'normal';
            div.style.fontSize = fontSize + 'pt';
            doc.body.appendChild(div);
            size = [div.offsetWidth, div.offsetHeight];

            doc.body.removeChild(div);
            div = null;

            textWidth = size[0];
            var fullHeight = size[1],
                height = 0,
                descent =  0;

            size = pastTextMeasurements[font];
            fullHeight = Math.round(fullHeight * 0.9);
            height = Math.round(fullHeight * 0.7);
            descent = Math.round(fullHeight * 0.2);
        }
        else// estimate
        {
            textWidth = Math.floor(parseFloat(fontSize) / 2.0) * text.length;
            fullHeight = Math.floor(parseFloat(fontSize) * 1.35);
            height = Math.round(parseFloat(fontSize) + 1);
            descent = Math.floor(parseFloat(fontSize) / 0.25);
        }
            
        return {width:textWidth,height:height,descent:descent,fullHeight:fullHeight};
    };
    
    function splitFontString(font)
    {
        if(!(font))
        {
            font = armyc2.c2sd.renderer.utilities.RendererSettings.getModifierFont();
        }
        var arrFont = font.split(" "),
        fontStyle = arrFont[0],//style
        fontSize = arrFont[1].replace("pt",""),//size
        fontName = arrFont[2];//name

        if(arrFont.length > 3)
        {
            var backupFonts = arrFont.slice(3);

            for(var i = 0; i < backupFonts.length; i++)
            {
                fontName += " " + backupFonts[i];
            }
        }
        
        return {fontName:fontName, fontSize:fontSize, fontStyle:fontStyle};
    }
    
return{    
    
	/**
     * 
     * @param {String} color like "#FFFFFF"
     * @param {Boolean} forceRGB, return value drops any alpha value
     * and is formatted like "#RRGGBB"
     * @returns {String}
     */
    getIdealOutlineColor: function(color, forceRGB){
        var idealColor = null;
        
        if(pastIdealOutlineColors[color])
        {
            return pastIdealOutlineColors[color];
        }//*/
        
        if(color !== null && color !==""){
			
            var tempColor = color;
            
			if(tempColor.charAt(0) !== '#')
				tempColor = "#" + tempColor;
			
			var len = tempColor.length;
			
			var alpha = "FF";
            if(len === 9)
			{
				alpha = tempColor.substring(1,3)
				tempColor = "#" + tempColor.substring(3);
			}
            var threshold = armyc2.c2sd.renderer.utilities.RendererSettings.getTextBackgroundAutoColorThreshold();
            
            //hex to rgb
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(tempColor);
            
            var r = parseInt(result[1],16),
                g = parseInt(result[2],16),
                b = parseInt(result[3],16);
        
            var delta = ((r * 0.299) + (g * 0.587) + (b * 0.114));
            
			if((255 - delta < threshold))
			{
				if(len === 9 && forceRGB !== true)
					idealColor = "#" + alpha  + "000000";
				else
					idealColor = "#000000";
			}
			else
			{
				if(len === 9 && forceRGB !== true)
					idealColor = "#" + alpha  + "FFFFFF";
				else
					idealColor = "#FFFFFF";
			}
        }
        pastIdealOutlineColors[color] = idealColor;
        return idealColor;
    },
    
    
    
    /**
     * Clients should use getTextBounds
     * @param {String} fontName like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} fontSize like 12
     * @param {String} fontStyle like "bold"
     * @param {String} text include if you want a width value.
     * @param {HTML5 context}
     * @returns {Object} {width:Number,height:Number,descent:Number,fullHeight:Number}
     */
     measureText: function(fontName, fontSize, fontStyle, text,ctx){
        
            var font = fontStyle + " " + fontSize + "pt " + fontName;
            var size;
            size = this.measureTextWithFontString(font, text, ctx);
            //console.log("metrics for " + text);
            //console.dir(size);
            return size;
    },
    
    /**
     * Clients should use getTextBounds
     * @param {String} font like "bold 10pt Arial, sans-serif"
     * @param {String} text include if you want a width value
     * @param {HTML5 context} ctx
     * @returns {Object} {width:Number,height:Number,descent:Number,fullHeight:Number}
     */
     measureTextWithFontString: function(font, text, ctx){
        var size;
        var objFont;
        if(pastTextMeasurements[font])
        {
            size = pastTextMeasurements[font];

            if(text && _ctx)
            {
                if(!(ctx))
                {
                    var canvas = document.createElement("canvas");
                    /*var width = 100,
                    height = 100;
                    canvas.width = width;
                    canvas.height = height;//*/
                    var ctx = canvas.getContext('2d');
                    ctx.font = font;
                    
                }

                size.width = ctx.measureText(text).width;
            }
            else if(text)
            {
                objFont = splitFontString(font);
                size.width = measureTextIE8(objFont.fontName, objFont.fontSize, objFont.fontStyle, text).width;
            }
            else
            {
                size.width = 0;
            }
        }
        else
        {
            if(_ctx)
            {
                size = getFontWidthHeightAndDescent(font,text,ctx);
            }
            else
            {
                objFont = splitFontString(font);
                size.width = measureTextIE8(objFont.fontName, objFont.fontSize, objFont.fontStyle, text).width;
            }
            pastTextMeasurements[font] = {height:size.height,fullHeight:size.fullHeight,descent:size.descent};
        }
        return size;
    },
    
    /**
     * 
     * @param {String} fontName like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} fontSize like 12
     * @param {String} fontStyle like "bold"
     * @returns {Object} {height:Number,descent:Number,fullHeight:Number}
     */
    measureTextHeight: function(fontName, fontSize, fontStyle)
    {
            var fontString = fontStyle + " " + fontSize + "pt " + fontName;
            var size = this.measureTextHeightWithFontString(fontString);
            return size;
    },
    
    /**
     * 
     * @param {type} fontString like "bold 10pt Arial, sans-serif"
     * @returns {Object} {height:Number,descent:Number,fullHeight:Number}
     */
    measureTextHeightWithFontString: function(fontString){
        var size;
        
        if(pastTextMeasurements[fontString])
        {
            return pastTextMeasurements[fontString];
        }
        
        if(_ctx)
        {
            size = getFontWidthHeightAndDescent(fontString);
            pastTextMeasurements[fontString] = {height:size.height,fullHeight:size.fullHeight,descent:size.descent};
        }
        else
        {   var objFont = splitFontString(fontString);
            size = measureTextIE8(objFont.fontName, objFont.fontSize, objFont.fontStyle, "text");
            pastTextMeasurements[fontString] = {height:size.height,fullHeight:size.fullHeight,descent:size.descent};
        }
        return size;
    },

    /**
     * 
     * @param {String} text
     * @param {HTML5 canvas context} context optional but faster if one is provided
     * @param {String} fontString like "bold 10pt Arial, sans-serif"
     * @returns {Number}
     */
    measureTextWidthWithFontString: function(text, context,fontString){
        var width;
        
        if(_ctx)
        {
            if(context !== null)
            {
                width = context.measureText(text).width;
            }
            else
            {
                _ctx.font = fontString;
                width = _ctx.measureText(text).width;
            }
        }
        else
        {
            var objFont = splitFontString(fontString);
            width = measureTextIE8(objFont.fontName, objFont.fontSize, objFont.fontStyle, "text").width;
        }
        return width;
    },
    
    /**
     * 
     * @param {String} text
     * @param {HTML5 canvas context} context optional but faster if one is provided
     * @param {String} fontName like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} fontSize like 12
     * @param {String} fontStyle like "bold"
     * @returns {Number}
     */
    measureTextWidth: function(text, context, fontName, fontSize, fontStyle)
    {

        if(context)
        {
            var width = context.measureText(text).width;
            return width;
        }
        else
        {
            var fontString = fontStyle + " " + fontSize + "pt " + fontName;
            return this.measureTextWidthWithFontString(text, context, fontString);
        }

    },
	
    /**
     * Assumes the font set on the passed context
     * @param {HTML5 canvas context} context can be null but runs faster with a context
     * @param {String} text
     * @param {armyc2.c2sd.renderer.so.Point} location can be 0,0 if you're only concerned about the width & height
     * @param {String} font like "bold 10pt Arial, sans-serif", required if context not set.
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    getTextBounds: function(context, text, location, font){

        var size;
            
        var height,
            fullHeight,
            descent,
            width,
            bounds;

        if(_ctx)
        {
            if(font)
            {
                size = this.measureTextWithFontString(font,text,context);
            }
            else
            {
                size = this.measureTextWithFontString(context.font,text,context);
            }

            height = size.height;
            fullHeight = size.fullHeight;
            descent = size.descent;
            width = size.width;

            

            bounds = new armyc2.c2sd.renderer.so.Rectangle(location.getX(),location.getY() - height,
                                Math.round(width), fullHeight);  
        }
        else // most likely for IE8
        {
            var objFont = splitFontString(font);
            
            size = measureTextIE8(objFont.fontName, objFont.fontSize, objFont.fontStyle, text);
            bounds = new armyc2.c2sd.renderer.so.Rectangle(location.getX(),location.getY() - size.height,
                                size.width, size.fullHeight);  
        }
        
        /*if(text && 
                (text.indexOf('g') > -1) || 
                (text.indexOf('j') > -1) || 
                (text.indexOf('p') > -1) || 
                (text.indexOf('q') > -1) || 
                (text.indexOf('y') > -1))
        {
            bounds.shiftBR(0,-descent);
        }//*/

        return bounds;
    },
    
    

    
    /**
     * There is no accurate way for getting the descent in JavaScript currently.
     * This should be close for renderer's default modifier font.
     * @param {String} fontName like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} fontSize like 12
     * @param {String} fontStyle like "bold"
     * @returns {Number}
     */
    getFontDescent: function(fontName, fontSize, fontStyle){
        //return Math.ceil(fontSize * 0.26074218888888888888888888888889);
        //return (fontSize * 0.26074218888888888888888888888889);
        var fontString = fontStyle + " " + fontSize + "pt " + fontName;
        var size;
        if(pastTextMeasurements[fontString])
        {
            return pastTextMeasurements[fontString].descent;
        }
        
        if(_ctx)
        {
            size = this.measureText(fontName, fontSize, fontStyle);
        }
        else
        {
            size = measureTextIE8(fontName, fontSize, fontStyle,"");
        }
        pastTextMeasurements[fontString] = {height:size.height,fullHeight:size.fullHeight,descent:size.descent};//size[1];
        return size.descent;//size[1];
    },
    
    /**
     * 
     * @param {type} font
     * @returns {size.descent|Number|pastTextMeasurements.descent}
     */
    getFontDescentWithFontString: function(font){
        //return Math.ceil(fontSize * 0.26074218888888888888888888888889);
        //return (fontSize * 0.26074218888888888888888888888889);
        var objFont = splitFontString(font);
        var fontStyle = objFont.fontStyle,
            fontName = objFont.fontName,
            fontSize = objFont.fontSize;
            
                
        var fontString = fontStyle + " " + fontSize + "pt " + fontName;
        var size;
        if(pastTextMeasurements[fontString])
        {
            return pastTextMeasurements[fontString].descent;
        }
        
        if(_ctx)
        {
            size = this.measureText(fontName, fontSize, fontStyle);
        }
        else
        {
            size = measureTextIE8(fontName, fontSize, fontStyle,"");
        }
        pastTextMeasurements[fontString] = {height:size.height,fullHeight:size.fullHeight,descent:size.descent};//size[1];
        return size.descent;//size[1];
    },
    
    /**
     * Measures chars 33 to 127 of a font for use in measureStringNoDOM.
     * Or, if used in web worker, applies passed in measurment values
     */
    measureFont: function(font, fontInfo)
    {     
        if(fullFontMeasurements[font])
        {
            return fullFontMeasurements[font];
        }   
        else if(_ctx)
        {
            var width = 100,
            height = 100;

            _ctx.textBaseline = "top";
            _ctx.font = font;

            _ctx.fillStyle = 'black';
            _ctx.fillRect(0,0,width,height);
            _ctx.fillStyle = 'white';
            
            _ctx.fillText("M",0,0);
            

            var mWidth = Math.ceil(_ctx.measureText("M").width);//highest character
            var gWidth = Math.ceil(_ctx.measureText("g").width);//lowest character
            
            var pixels = _ctx.getImageData(0,0,width,height).data;
            
            var mtb = scanForCharTopAndBottom(pixels,width,height, mWidth);

            _ctx.fillStyle = 'black';
            _ctx.fillRect(0,0,width,height);
            _ctx.fillStyle = 'white';
            
            _ctx.fillText("g",0,0);
            pixels = _ctx.getImageData(0,0,width,height).data;
            
            var gtb = scanForCharTopAndBottom(pixels,width,height, gWidth);

            var height = mtb.bottom - mtb.top;
            var descent = gtb.bottom - mtb.bottom;
            var fullHeight = gtb.bottom - mtb.top;
            
            var textWidth = 0;
                
            //measure letter widths
            var widths = {};
            var letter = null;
            for(var i = 32; i < 127; i++)
            {
                letter = String.fromCharCode(i);
                widths[letter] = _ctx.measureText(letter).width;
            }
            //fromCharCode(177)
            letter = String.fromCharCode(177);//RD
            widths[letter] = _ctx.measureText(letter).width;
            letter = String.fromCharCode(216);//Ø
            widths[letter] = _ctx.measureText(letter).width;
            letter = String.fromCharCode(8226);//dot
            widths[letter] = _ctx.measureText(letter).width;
            
            fullFontMeasurements[font] = {widths:widths,height:height,descent:descent,fullHeight:fullHeight}; 
            pastTextMeasurements[font] = {height:height,fullHeight:fullHeight,descent:descent};
            return fullFontMeasurements[font];
        }
        else if(fontInfo)
        {
            if(!fullFontMeasurements[font])
            {
                pastTextMeasurements[font] = {height:fontInfo.measurements.height,fullHeight:fontInfo.measurements.fullHeight,descent:fontInfo.measurements.descent};
                fullFontMeasurements[font] = fontInfo.measurements;
            }
            return fullFontMeasurements[font];                 
        }
        /*else
        {
            var objFont = splitFontString(font);
            var fontStyle = objFont.fontStyle,
            fontName = objFont.fontName,
            fontSize = objFont.fontSize;
            size = measureTextIE8(fontName, fontSize, fontStyle,"");
        }//*/
        return null;
        
    },
    
    /**
     * Made with the intent to use in a web worker.
     * @param {type} font like "bold 9pt Arial, sans-serif"
     * @param {string} text include if you want a width value
     */
    measureStringNoDOM: function(text, measurements)
    {
        return measureStringSansDOM(text, measurements);
        //get font measurements
        /*var widths = measurements.widths; 
        var width = 0;
        var length = text.length;
        for (var i=0; i < length; i++) 
        {
            var character = text.charAt(i);
            widths[character] ? width += (widths[character] + 1) : widths["W"]; 
        } 
        var bounds = new armyc2.c2sd.renderer.so.Rectangle(0,0 - measurements.height,
                                Math.round(width), measurements.fullHeight); 
        return bounds;//*/
    },
    
    
    /**
     * Checks if the fonts required for single point rendering have finished loading.
     * @returns {Boolean}
     */
    fontsLoaded: function(){
        var returnVal = false;
        
        var arialWidth = measureTextQuick("Arial",12,"normal","A")[0] * 2;
        var unitWidth = measureTextQuick("UnitFont",12,"normal","A")[0];
        var spWidth = measureTextQuick("SinglePoint",12,"normal","A")[0];
        var tgWidth = measureTextQuick("TacticalGraphics",12,"normal","A")[0];
        
        //character index 65 (the letter 'A') was modified to be extra wide (3x)
        //so if the fonts were loaded, their 'A' character should be at least
        //greater than double the width of the Arial 'A' character.
        
        if(unitWidth > arialWidth && spWidth > arialWidth && tgWidth > arialWidth)
            returnVal = true;
        
        //console.log("font 'A' widths: " + unitWidth + ", " + spWidth + ", " + tgWidth + ", " + arialWidth);
        
        return returnVal;
    },
    
    
    /**
     * 
     * @param {type} pattern (back, forward, vertical, horizontal, cross, symbolID)
     * @param {type} lineColor
     * @param {type} fillColor
     * @param {type} lineWidth
     * @returns {html5 canvas}
     */
    getCanvasFillStylePattern: function (pattern, lineColor, fillColor, lineWidth)
    {
        if(FillPatterns)
        {
            return FillPatterns.getCanvasFillStylePattern(pattern, lineColor, fillColor, lineWidth);
        }
        else
        {
            return null;
        }
        
    }
};
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/**
 * 
 * @param {HTML5 Canvas} image
 * @param {SO.Point} centerPoint
 * @param {SO.Rectangle} symbolBounds
 * @param {SO.Rectangle} bounds
 * @returns {ImageInfo}
 */
armyc2.c2sd.renderer.utilities.ImageInfo = function (image, centerPoint, symbolBounds, bounds) {
    this._canvas = image;
    this._center = centerPoint;
    this._symbolBounds = symbolBounds;
    this._bounds = bounds;
};
    /**
     * 
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.toDataUrl = function(){
        return this._canvas.toDataURL();
    };
    /**
     * 
     * @returns {String} An SVG formatted string with the icon embedded as an image in dataURI format
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.toSVG = function(){
        var width = this.getImageBounds().getWidth();
        var height = this.getImageBounds().getHeight();
        var dataUri = this.toDataUrl();
        var svgTxt = [];
        // SVG supports embedded raster images.  
        // Using the png dataURI embedded in the SVG element creates a valid svg text file
        // This can be embedded on as aDOM element on an html page or saved as a .svg file
        svgTxt.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" xmlns:xlink="http://www.w3.org/1999/xlink">');
        svgTxt.push('<image x="0" y="0" width="' + width + '" height="' + height + '" xlink:href="');
        svgTxt.push(dataUri);
        svgTxt.push('" /></svg>');
        return svgTxt.join("");
    };
    /**
     * 
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getImage = function(){
        return this._canvas;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Point}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getCenterPoint = function(){
        return this._center;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getSymbolBounds = function (){
        return this._symbolBounds;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getImageBounds = function(){
        return this._bounds;
    };
    
    /**
     * Returns an image icon.  It is a square image which may contain some empty
     * space but is ideal for tree node images so that the look is consistent.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getSquareIcon = function(){
        var iwidth, iheight, x, y;
        var width = this._bounds.getWidth();
        var height = this._bounds.getHeight();
        if(this._bounds.getWidth() > this._bounds.getHeight())
        {
            iwidth = this._bounds.getWidth();
            iheight = this._bounds.getWidth();
            x=0;
            y=(iheight - height)/2;
        }
        else if(this._bounds.getWidth() < this._bounds.getHeight())
        {
            iwidth = this._bounds.getHeight();
            iheight = this._bounds.getHeight();
            x = (iwidth - width)/2;
            y = 0;
        }
        else
        {
            iwidth = this._bounds.getWidth();
            iheight = this._bounds.getHeight();
            x=0;
            y=0;
        }

        var buffer = document.createElement('canvas');
        buffer.width = iwidth;
        buffer.height = iheight;
        
        var ctx = buffer.getContext('2d');
        
        ctx.drawImage(this.getImage(),x,y);
        
        //test
        /*ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0,0,buffer.width,buffer.height);//*/
        
        return buffer;
        
    };

    /**
     * Fits the symbol in the image such that when the image is centerd on the 
     * destination point, the symbol will be in the correct place.  
     * Will make some images larger with dead space so that the symbol is 
     * centered properly.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getCenteredImage = function(){
        var image = this._canvas,
            bi = null,
            x = 0,
            y = 0,
            height = image.height,
            width = image.width,
            point = this._center;
        
        
        try
        {
            if(point.getY() > height - point.getY())
            {
                height = (point.getY() * 2.0);
                y=0;
            }
            else
            {
                height = ((height - point.getY()) * 2);
                y = ((height / 2) - point.getY());
            }

            if(point.getX() > width - point.getX())
            {
                width = (point.getX() * 2.0);
                x=0;
            }
            else
            {
                width = ((width - point.getX()) * 2);
                x = ((width / 2) - point.getX());
            }


            bi = document.createElement('canvas');
            bi.width = width;
            bi.height = height;
            var ctx = bi.getContext('2d');
            ctx.drawImage(image,x,y);
            
            //test
            /*ctx.lineWidth = 1;
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(0,0,bi.width,bi.height);//*/
        }
        catch(err)
        {
            armyc2.c2sd.renderer.utilities.ErrorLogger.LogException("ImageInfo","getCenteredImage",err);
        }
        
        return bi;
    };
    
    /**
     * Fits the symbol in the image such that when the image is centerd on the 
     * destination point, the symbol will be in the correct place.  
     * Will make some images larger with dead space so that the symbol is 
     * centered properly.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getCenteredImageInfo = function(){
        var image = this._canvas,
            bi = null,
            ii = null,
            x = 0,
            y = 0,
            height = image.height,
            width = image.width,
            point = this._center;
        
        
        try
        {
            if(point.getY() > height - point.getY())
            {
                height = (point.getY() * 2.0);
                y=0;
            }
            else
            {
                height = ((height - point.getY()) * 2);
                y = ((height / 2) - point.getY());
            }

            if(point.getX() > width - point.getX())
            {
                width = (point.getX() * 2.0);
                x=0;
            }
            else
            {
                width = ((width - point.getX()) * 2);
                x = ((width / 2) - point.getX());
            }


            bi = document.createElement('canvas');
            bi.width = width;
            bi.height = height;
            var ctx = bi.getContext('2d');
            ctx.drawImage(image,x,y);
            
            //create new ImageInfo
            var center = point.clone();
            center.shift(x,y);
            var symbolBounds = this._symbolBounds.clone();
            symbolBounds.shift(x,y);
            var bounds = new armyc2.s2sd.renderer.so.Rectangle(0,0,width,height);
            ii = new armyc2.c2sd.renderer.utilities.ImageInfo(bi,center, symbolBounds, bounds);
            
            //test
            /*ctx.lineWidth = 1;
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(0,0,bi.width,bi.height);//*/
        }
        catch(err)
        {
            armyc2.c2sd.renderer.utilities.ErrorLogger.LogException("ImageInfo","getCenteredImage",err);
        }
        
        return ii;
    };
    
        /**
     * Returns an image icon.  It is a square image which may contain some empty
     * space but is ideal for tree node images so that the look is consistent.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getSquareImageInfo = function(){
        var iwidth, iheight, x, y;
        var width = this._bounds.getWidth();
        var height = this._bounds.getHeight();
        var ii = null;
        if(this._bounds.getWidth() > this._bounds.getHeight())
        {
            iwidth = this._bounds.getWidth();
            iheight = this._bounds.getWidth();
            x=0;
            y=(iheight - height)/2;
        }
        else if(this._bounds.getWidth() < this._bounds.getHeight())
        {
            iwidth = this._bounds.getHeight();
            iheight = this._bounds.getHeight();
            x = (iwidth - width)/2;
            y = 0;
        }
        else
        {
            iwidth = this._bounds.getWidth();
            iheight = this._bounds.getHeight();
            x=0;
            y=0;
        }

        var buffer = document.createElement('canvas');
        buffer.width = iwidth;
        buffer.height = iheight;
        
        var ctx = buffer.getContext('2d');
        
        ctx.drawImage(this.getImage(),x,y);
        
        //create new ImageInfo
        var center = this._center.clone();
        center.shift(x,y);
        var symbolBounds = this._symbolBounds.clone();
        symbolBounds.shift(x,y);
        var bounds = new armyc2.c2sd.renderer.so.Rectangle(0,0,iwidth,iheight);
        ii = new armyc2.c2sd.renderer.utilities.ImageInfo(buffer,center, symbolBounds, bounds);
        
        //test
        /*ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0,0,buffer.width,buffer.height);//*/
        
        return ii;
        
    };var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};


/**
 * 
 * @param {type} text
 * @param {type} x
 * @param {type} y
 * @param {type} context
 * @param {type} fontString optional, like "bold 10pt Arial, sans-serif".  
 * Must be the same string used on context.font.  Not required but faster than 
 * checking the context for the font.
 * @returns {undefined}
 */
armyc2.c2sd.renderer.utilities.TextInfo = function (text, x,y, context, font) {
    this.text = text;
    this.location = new armyc2.c2sd.renderer.so.Point(x,y);
    
    if(context === undefined)
    {
        var buffer = createBuffer(1,1);
        context = buffer.getContext('2d');
    }

    
    
    this.bounds = armyc2.c2sd.renderer.utilities.RendererUtilities.getTextBounds(context, text, this.location, font);
    if(context.textAlign==="right")
        this.bounds.shift(-this.bounds.getWidth(),0);
    else if(context.textAlign==="center")
        this.bounds.shift(-(this.bounds.getWidth()/2),0);

};
	
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.setLocation = function(x,y){
       
        var x1 = this.location.getX(),
            y1 = this.location.getY(),
            x2 = x,
            y2 = y;

        this.location.setLocation(x,y);    

        var shiftX = 0,
            shiftY = 0;

        if(x2<x1)
        {
            shiftX = (x1 - x2) * -1;
        }
        else
        {
            shiftX = (x2 - x1);
        }
        if(y2<y1)
        {
            shiftY = (y1 - y2) * -1;
        }
        else
        {
            shiftY = (y2 - y1);
        }

        this.bounds.shift(shiftX,shiftY);

    };//
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.shift = function(x,y){
        this.location.shift(x,y);
        this.bounds.shift(x,y);

    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.getTextBounds = function(){
        return this.bounds;
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.getTextOutlineBounds = function(){
        var outlineOffset = armyc2.c2sd.renderer.utilities.RendererSettings.getTextOutlineWidth();

        if(outlineOffset > 0)
        {//adjust bounds if an outline value is set.
            var bounds = new armyc2.c2sd.renderer.so.Rectangle(
            this.bounds.x - outlineOffset,
            this.bounds.y - outlineOffset,
            this.bounds.width + outlineOffset*2,
            this.bounds.height + outlineOffset*2);

            return bounds;
        }
        else
        {
            return this.bounds;
        }
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.getText = function(){
        return this.text;
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.getLocation = function(){
        return this.location;
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.outlineText = function(context){
        var thickness = armyc2.c2sd.renderer.utilities.RendererSettings.getTextOutlineWidth();
        
        for(var i = 1; i <= thickness; i++)
        {
            if(i%2 !== 0)
            {
                context.fillText(this.text,this.location.getX()-i,this.location.getY()-i);
                context.fillText(this.text,this.location.getX()+i,this.location.getY()-i);
                context.fillText(this.text,this.location.getX()-i,this.location.getY()+i);
                context.fillText(this.text,this.location.getX()+i,this.location.getY()+i);
            }
            else
            {
                context.fillText(this.text,this.location.getX()-i,this.location.getY());
                context.fillText(this.text,this.location.getX()+i,this.location.getY());
                context.fillText(this.text,this.location.getX(),this.location.getY()+i);
                context.fillText(this.text,this.location.getX(),this.location.getY()-i);
            }
        }
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.strokeText = function(context){
        context.strokeText(this.text,this.location.getX(),this.location.getY());
    };
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.fillText = function(context){
        context.fillText(this.text,this.location.getX(),this.location.getY());
    };
    
    armyc2.c2sd.renderer.utilities.TextInfo.prototype.createBuffer = function(width, height)
    {
	var buffer = document.createElement('canvas');
	buffer.width = width;
	buffer.height = height;
	return buffer;
	
    };
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.ModifiersUnits = {
    
    /**
     * The innermost part of a symbol that represents a warfighting object
     * Here for completeness, not actually used as this comes from the
     * symbol code.
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: G
     */
    A_SYMBOL_ICON : "A",
    /**
     * A graphic modifier in a unit symbol that identifies command level
     * We feed off of the symbol code so this isn't used
     * Type: U,SO
     * Length: G
     */
    B_ECHELON : "B",
    /**
     * A text modifier in an equipment symbol that identifies the number of items present.
     * Type: E,EEI
     * Length: 9
     */
    C_QUANTITY : "C",
    /**
     * A graphic modifier that identifies a unit or SO symbol as a task force (see 5.3.4.6
     * and figures 2 and 3).
     * Type: U,SO
     * Length: G
     */
    D_TASK_FORCE_INDICATOR : "D",
    /**
     * A graphic modifier that displays standard identity, battle dimension, or exercise
     * amplifying descriptors of an object (see 5.3.1 and table II).
     * Type: U,E,I,SO,EU,EEI,EI
     * Length: G
     */
    E_FRAME_SHAPE_MODIFIER : "E",
    /**
     * A text modifier in a unit symbol that displays (+) for reinforced, (-) for reduced,(+) reinforced and reduced.
     * R : reinforced,D : reduced,RD : reinforced and reduced
     * Type: U,SO
     * Length: 23
     */
    F_REINFORCED_REDUCED : "F",
    /**
     * A text modifier for units, equipment and installations, content is implementation specific.
     * Type: U,E,I,SI,SO
     * Length: 20
     */
    G_STAFF_COMMENTS : "G",
    /**
     * Text modifier for amplifying free text
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 20
     */
    H_ADDITIONAL_INFO_1 : "H",
    /**
     * Text modifier for amplifying free text
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 20
     */
    H1_ADDITIONAL_INFO_2 : "H1",
    /**
     * Text modifier for amplifying free text
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 20
     */
    H2_ADDITIONAL_INFO_3 : "H2",
    /**
     * A text modifier for units, equipment, and installations that consists of 
     * a one letter reliability rating and a one-number credibility rating.
        Reliability Ratings: A-completely reliable, B-usually reliable, 
        C-fairly reliable, D-not usually reliable, E-unreliable, 
        F-reliability cannot be judged.
        Credibility Ratings: 1-confirmed by other sources,
        2-probably true, 3-possibly true, 4-doubtfully true,
        5-improbable, 6-truth cannot be judged.
        Type: U,E,I,SI,SO,EU,EEI,EI
        Length: 2
     */
    J_EVALUATION_RATING : "J",
    /**
     * A text modifier for units and installations that indicates unit effectiveness or
     * installation capability.
     * Type: U,I,SO
     * Length: 5,5,3
     */
    K_COMBAT_EFFECTIVENESS : "K",
    /**
     * A text modifier for hostile equipment, “!” indicates detectable electronic
     * signatures.
     * Type: E,SI
     * Length: 1
     */
    L_SIGNATURE_EQUIP : "L",
    /**
     * A text modifier for units that indicates number or title of higher echelon
     * command (corps are designated by Roman numerals).
     * Type: U,SI
     * Length: 21
     */
    M_HIGHER_FORMATION : "M",
    /**
     * A text modifier for equipment, letters "ENY" denote hostile symbols.
     * Type: E
     * Length: 3
     */
    N_HOSTILE : "N",
    /**
     * A text modifier displaying IFF/SIF Identification modes and codes.
     * Type: U,E,SO
     * Length: 5
     */
    P_IFF_SIF : "P",
    /**
     * A graphic modifier for units and equipment that identifies the direction of
     * movement or intended movement of an object (see 5.3.4.1 and figures 2 and 3).
     * Type: U,E,SO,EU,EEI
     * Length: G
     */
    Q_DIRECTION_OF_MOVEMENT : "Q",
    /**
     * A graphic modifier for equipment that depicts the mobility of an object (see
     *   5.3.4.3, figures 2 and 3, and table VI).
     * We feed off of the symbol code for mobility so this isn't used
     * Type: E,EEI
     * Length: G
     */
    R_MOBILITY_INDICATOR : "R",
    /**
     * M : Mobile, S : Static, or U : Uncertain.
     * Type: SI
     * Length: 1
     */
    R2_SIGNIT_MOBILITY_INDICATOR : "R2",
    /**
     * Headquarters staff indicator: A graphic modifier for units, equipment, and
     * installations that identifies a unit as a headquarters (see 5.3.4.8 and figures 2 and
     * 3).
     * Offset location indicator: A graphic modifier for units, equipment, and
     * installations used when placing an object away from its actual location (see
     * 5.3.4.9 and figures 2 and 3).
     * Type: U,E,I,SO,EU,EEI,EI
     * Length: G
     */
    S_HQ_STAFF_OR_OFFSET_INDICATOR : "S",
    /**
     * A text modifier for units, equipment, and installations that uniquely identifies a
     * particular symbol or track number. Identifies acquisitions number when used
     * with SIGINT symbology.
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 21
     */
    T_UNIQUE_DESIGNATION_1 : "T",
    /**
     * A text modifier for units, equipment, and installations that uniquely identifies a
     * particular symbol or track number. Identifies acquisitions number when used
     * with SIGINT symbology.
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 21
     */
    T1_UNIQUE_DESIGNATION_2 : "T1",
    /**
     * A text modifier for equipment that indicates types of equipment.
     * For Tactical Graphics:
     * A text modifier that indicates nuclear weapon type.
     * Type: E,SI,EEI
     * Length: 24
     */
    V_EQUIP_TYPE : "V",
    /**
     * A text modifier for units, equipment, and installations that displays DTG format:
     * DDHHMMSSZMONYYYY or “O/O” for on order (see 5.5.2.6).
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 16
     */
    W_DTG_1 : "W",
    /**
     * A text modifier for units, equipment, and installations that displays DTG format:
     * DDHHMMSSZMONYYYY or “O/O” for on order (see 5.5.2.6).
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 16
     */
    W1_DTG_2 : "W1",
    /**
     * A text modifier for units, equipment, and installations, that displays either
     * altitude flight level, depth for submerged objects, or height of equipment or
     * structures on the ground. See 5.5.2.5 for content.
     * Type: U,E,I,SO,EU,EEI,EI
     * Length: 14
     */
    X_ALTITUDE_DEPTH : "X",
    /**
     * A text modifier for units, equipment, and installations that displays a symbol’s
     * location in degrees, minutes, and seconds (or in UTM or other applicable display
     * format).
     * Conforms to decimal
     *  degrees format:
     *  xx.dddddhyyy.dddddh
     *  where
     *  xx : degrees latitude
     *  yyy : degrees longitude
     *  .ddddd : decimal degrees
     *  h : direction (N, E, S, W)
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 19
     */
    X1_ALTITUDE_DEPTH : "X1",
    /**
     * A text modifier for units, equipment, and installations that displays a symbol’s
     * location in degrees, minutes, and seconds (or in UTM or other applicable display
     * format).
     * Conforms to decimal
     *  degrees format:
     *  xx.dddddhyyy.dddddh
     *  where
     *  xx : degrees latitude
     *  yyy : degrees longitude
     *  .ddddd : decimal degrees
     *  h : direction (N, E, S, W)
     * Type: U,E,I,SI,SO,EU,EEI,EI
     * Length: 19
     */
    Y_LOCATION : "Y",
    /**
     * A text modifier for units and equipment that displays velocity as set forth in
     * MIL-STD-6040.
     * Type: U,E,SO,EU,EEI
     * Length: 8
     */
    Z_SPEED : "Z",
    /**
     * A text modifier for units, indicator is contained inside the frame (see figures 2
     * and 3), contains the name of the special C2 Headquarters.
     * Type: U,SO
     * Length: 9
     */
    AA_SPECIAL_C2_HQ : "AA",
    /**
     * Feint or dummy indicator: A graphic modifier for units, equipment, and
     * installations that identifies an offensive or defensive unit intended to draw the
     * enemy’s attention away from the area of the main attack (see 5.3.4.7 and figures
     * 2 and 3).
     * Type: U,E,I,SO
     * Length: G
     */
    AB_FEINT_DUMMY_INDICATOR : "AB",
    /**
     * Installation: A graphic modifier for units, equipment, and installations used to
     * show that a particular symbol denotes an installation (see 5.3.4.5 and figures 2
     * and 3).
     * Not used, we feed off of symbol code for this
     * Type: U,E,I,SO,EU,EEI,EI
     * Length: G
     */
    AC_INSTALLATION : "AC",
    /**
     * ELNOT or CENOT
     * Type: SI
     * Length: 6
     */
    AD_PLATFORM_TYPE : "AD",
    /**
     * Equipment teardown time in minutes.
     * Type: SI
     * Length: 3
     */
    AE_EQUIPMENT_TEARDOWN_TIME : "AE",
    /**
     * Example: “Hawk” for Hawk SAM system.
     * Type: SI
     * Length: 12
     */
    AF_COMMON_IDENTIFIER : "AF",
    /**
     * Towed sonar array indicator: A graphic modifier for equipment that indicates the
     * presence of a towed sonar array (see 5.3.4.4, figures 2 and 3, and table VII).
     * Type: E
     * Length: G
     */
    AG_AUX_EQUIP_INDICATOR : "AG",
    /**
     * A graphic modifier for units and equipment that indicates the area where an
     * object is most likely to be, based on the object’s last report and the reporting
     * accuracy of the sensor that detected the object (see 5.3.4.11.1 and figure 4).
     * Type: E,U,SO,EU,EEI
     * Length: G
     */
    AH_AREA_OF_UNCERTAINTY : "AH",
    /**
     * A graphic modifier for units and equipment that identifies where an object
     * should be located at present, given its last reported course and speed (see
     * 5.3.4.11.2 and figure 4).
     * Type: E,U,SO,EU,EEI
     * Length: G
     */
    AI_DEAD_RECKONING_TRAILER : "AI",
    /**
     * A graphic modifier for units and equipment that depicts the speed and direction
     * of movement of an object (see 5.3.4.11.3 and figure 4).
     * Type: E,U,SO,EU,EEI
     * Length: G
     */
    AJ_SPEED_LEADER : "AJ",
    /**
     * A graphic modifier for units and equipment that connects two objects and is
     * updated dynamically as the positions of the objects change (see 5.3.4.11.4 and
     * figure 4).
     * Type: U,E,SO
     * Length: G
     */
    AK_PAIRING_LINE : "AK",
    /**
     * An optional graphic modifier for equipment or installations that indicates
     * operational condition or capacity.
     * Type: E,I,SI,SO,EU,EEI,EI
     * Length: G
     */
    AL_OPERATIONAL_CONDITION : "AL",

    /**
     * A graphic amplifier placed immediately atop the symbol. May denote, 1)
     * local/remote status, 2) engagement status, and 3) weapon type.
     *
     * Type: U,E,I
     * Length: G/8
     */
    AO_ENGAGEMENT_BAR : "AO",
    
        /**
     * Used internally by the renderer.  This value is set via the 13th & 14th
     * characters in the symbol id.  There is no formal definition of how
     * this should be indicated on the symbol in the MilStd or USAS.  
     * The renderer will place it to the right of the 'H' label.
     */
    CC_COUNTRY_CODE : "CC",

    /**
     * A generic name label that goes to the right of the symbol and
     * any existing labels.  If there are no existing labels, it goes right
     * next to the right side of the symbol.  This is a CPOF label that applies
     * to all force elements.  This IS NOT a MilStd or USAS Label.  
     */
    CN_CPOF_NAME_LABEL : "CN",
    
    /**
     * Sonar Classification Confidence level. valid values are 1-5.
     * Only applies to the 4 subsurface MILCO sea mines
     */
    SCC_SONAR_CLASSIFICATION_CONFIDENCE : "SCC",
    
    
    getModifierName : function(modifier)
    {
        switch(modifier)
        {
            //case this.A_SYMBOL_ICON:
            //    return "Symbol Icon";
            case this.B_ECHELON:
                return "Echelon";
            case this.C_QUANTITY:
                return "Quantity";
            //case this.D_TASK_FORCE_INDICATOR:
            //    return "Task Force Indicator";
            //case this.E_FRAME_SHAPE_MODIFIER:
            //    return "Frame Shape Modifier";
            case this.F_REINFORCED_REDUCED:
                return "Reinforce Reduced";
            case this.G_STAFF_COMMENTS:
                return "Staff Comments";
            case this.H_ADDITIONAL_INFO_1:
                return "Additional Info 1";
            case this.H1_ADDITIONAL_INFO_2:
                return "Additional Info 2";
            case this.H2_ADDITIONAL_INFO_3:
                return "Additional Info 3";
            case this.J_EVALUATION_RATING:
                return "Evaluation Rating";
            case this.K_COMBAT_EFFECTIVENESS:
                return "Combat Effectiveness";
            case this.L_SIGNATURE_EQUIP:
                return "Signature Equipment";
            case this.M_HIGHER_FORMATION:
                return "Higher Formation";
            case this.N_HOSTILE:
                return "Hostile";
            case this.P_IFF_SIF:
                return "IFF SIF";
            case this.Q_DIRECTION_OF_MOVEMENT:
                return "Direction of Movement";
            case this.R_MOBILITY_INDICATOR:
                return "Mobility Indicator";
            case this.R2_SIGNIT_MOBILITY_INDICATOR:
                return "Signals Intelligence Mobility Indicator";
            //case this.S_HQ_STAFF_OR_OFFSET_INDICATOR:
            //    return "HQ Staff / Offset Indicator";
            //case this.S_OFFSET_INDICATOR:
            //    return "Offset Indicator";
            case this.T_UNIQUE_DESIGNATION_1:
                return "Unique Designation 1";
            case this.T1_UNIQUE_DESIGNATION_2:
                return "Unique Designation 2";
            case this.V_EQUIP_TYPE:
                return "Equipment Type";
            case this.W_DTG_1:
                return "Date Time Group 1";
            case this.W1_DTG_2:
                return "Date Time Group 2";
            case this.X_ALTITUDE_DEPTH:
                return "Altitude Depth";
            case this.Y_LOCATION:
                return "Location";
            case this.Z_SPEED:
                return "Speed";
            case this.AA_SPECIAL_C2_HQ:
                return "Special C2 HQ";
            //case this.AB_FEINT_DUMMY_INDICATOR:
            //    return "Feint Dummy Indicator";
            //case this.AC_INSTALLATION:
            //    return "Installation";
            case this.AD_PLATFORM_TYPE:
                return "Platform Type";
            case this.AE_EQUIPMENT_TEARDOWN_TIME:
                return "Equipment Teardown Time";
            case this.AF_COMMON_IDENTIFIER:
                return "Common Identifier";
            //case this.AG_AUX_EQUIP_INDICATOR:
            //    return "Auxiliary Equipment Indicator";
            /*case this.AH_AREA_OF_UNCERTAINTY:
                return "Area of Uncertainty";
            case this.AI_DEAD_RECKONING_TRAILER:
                return "Dead Reckoning Trailer";
            case this.AJ_SPEED_LEADER:
                return "Speed Leader";
            case this.AK_PAIRING_LINE:
                return "Pairing Line";
            case this.AL_OPERATIONAL_CONDITION:
                return "Operational Condition";
            case this.AO_ENGAGEMENT_BAR:
                return "Engagement Bar";//*/
            case this.SCC_SONAR_CLASSIFICATION_CONFIDENCE:
                return "Sonar Classification Confidence";
            default:
                return "";

        }
    }

    
};
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.ModifiersTG = {
    
     /**
     * The innermost part of a symbol that represents a warfighting object
     * Here for completeness, not actually used as this comes from the
     * symbol code.
     * SIDC positions 3, 5-104
     * TG: P,L,A,BL,N,B/C
     * Length: G
     */
    A_SYMBOL_ICON : "A",
    /**
     * The basic graphic (see 5.5.1).
     * We feed off of the symbol code so this isn't used
     * SIDC positions 11 and 12
     * TG: L,A,BL
     * Length: G
     */
    B_ECHELON : "B",
    /**
     * A graphic modifier in a boundary graphic that
     * identifies command level (see 5.5.2.2, table V, and
     * figures 10 and 12).
     * TG: N
     * Length: 6
     */
    C_QUANTITY : "C",
    /**
     * A text modifier for tactical graphics, content is
     * implementation specific.
     * TG: P,L,A,N,B/C
     * Length: 20
     */
    H_ADDITIONAL_INFO_1 : "H",
    /**
     * A text modifier for tactical graphics, content is
     * implementation specific.
     * TG: P,L,A,N,B/C
     * Length: 20
     */
    H1_ADDITIONAL_INFO_2 : "H1",
    /**
     * A text modifier for tactical graphics, content is
     * implementation specific.
     * TG: P,L,A,N,B/C
     * Length: 20
     */
    H2_ADDITIONAL_INFO_3 : "H2",
    /**
     * A text modifier for tactical graphics, letters "ENY" denote hostile symbols.
     * TG: P,L,A,BL,N,B/C
     * Length: 3
     */
    N_HOSTILE : "N",
    /**
     * A graphic modifier for CBRN events that
     * identifies the direction of movement (see 5.5.2.1
     * and figure 11).
     * TG: N,B/C
     * Length: G
     */
    Q_DIRECTION_OF_MOVEMENT : "Q",
    /**
     * A graphic modifier for points and CBRN events
     * used when placing an object away from its actual
     * location (see 5.5.2.3 and figures 10, 11, and 12).
     * TG: P,N,B/C
     * Length: G
     */
    S_OFFSET_INDICATOR : "S",
    /**
     * A text modifier that uniquely identifies a particular
     * tactical graphic, track number.
     * Nuclear: delivery unit (missile, aircraft, satellite,
     * etc.)
     * TG:P,L,A,BL,N,B/C
     * Length: 15 (35 for BL)
     */
    T_UNIQUE_DESIGNATION_1 : "T",
    /**
     * A text modifier that uniquely identifies a particular
     * tactical graphic, track number.
     * Nuclear: delivery unit (missile, aircraft, satellite,
     * etc.)
     * TG:P,L,A,BL,N,B/C
     * Length: 15 (35 for BL)
     */
    T1_UNIQUE_DESIGNATION_2 : "T1",
    /**
     * A text modifier that indicates nuclear weapon type.
     * TG: N
     * Length: 20
     */
    V_EQUIP_TYPE : "V",
    /**
     * A text modifier for units, equipment, and installations that displays DTG format:
     * DDHHMMSSZMONYYYY or “O/O” for on order (see 5.5.2.6).
     * TG:P,L,A,N,B/C
     * Length: 16
     */
    W_DTG_1 : "W",
    /**
     * A text modifier for units, equipment, and installations that displays DTG format:
     * DDHHMMSSZMONYYYY or “O/O” for on order (see 5.5.2.6).
     * TG:P,L,A,N,B/C
     * Length: 16
     */
    W1_DTG_2 : "W1",
    /**
     * A text modifier that displays the minimum,
     * maximum, and/or specific altitude (in feet or
     * meters in relation to a reference datum), flight
     * level, or depth (for submerged objects in feet
     * below sea level). See 5.5.2.5 for content.
     * TG:P,L,A,N,B/C
     * Length: 14
     */
    X_ALTITUDE_DEPTH : "X",
    /**
     * A text modifier that displays the minimum,
     * maximum, and/or specific altitude (in feet or
     * meters in relation to a reference datum), flight
     * level, or depth (for submerged objects in feet
     * below sea level). See 5.5.2.5 for content.
     * TG:P,L,A,N,B/C
     * Length: 14
     */
    X1_ALTITUDE_DEPTH : "X1",
    /**
     * 2.4.3.4.1, 2.4.3.4.2 XN add NOT X, X1
     */
    XN_ALTITUDE_DEPTH : "XN",
    /**
     * A text modifier that displays a graphic’s location
     * in degrees, minutes, and seconds (or in UTM or
     * other applicable display format).
     *  Conforms to decimal
     *  degrees format:
     *  xx.dddddhyyy.dddddh
     *  where
     *  xx : degrees latitude
     *  yyy : degrees longitude
     *  .ddddd : decimal degrees
     *  h : direction (N, E, S, W)
     * TG:P,L,A,BL,N,B/C
     * Length: 19
     */
    Y_LOCATION : "Y",

    /**
     * For Tactical Graphics
     * A numeric modifier that displays a minimum,
     * maximum, or a specific distance (range, radius,
     * width, length, etc.), in meters.
     * 0 - 999,999 meters
     * TG: P.L.A
     * Length: 6
     */
    AM_DISTANCE : "AM",
    /**
     * For Tactical Graphics
     * A numeric modifier that displays an angle
     * measured from true north to any other line in
     * degrees.
     * 0 - 359 degrees
     * TG: P.L.A
     * Length: 3
     */
    AN_AZIMUTH : "AN",




    LENGTH : "Length",
    WIDTH : "Width",
    RADIUS : "Radius",
    ANGLE : "Angle",
    //SEGMENT_DATA : "Segment Data",
    
    getModifierName : function(modifier)
    {
        /* switch(modifier)
        {
            //case A_SYMBOL_ICON:
            //    return "Symbol Icon";
            case this.B_ECHELON:
                return "Echelon";
            case this.C_QUANTITY:
                return "Quantity";
            case this.H_ADDITIONAL_INFO_1:
                return "Additional Info 1";
            case this.H1_ADDITIONAL_INFO_2:
                return "Additional Info 2";
            case this.H2_ADDITIONAL_INFO_3:
                return "Additional Info 3";
            case this.N_HOSTILE:
                return "Hostile";
            case this.Q_DIRECTION_OF_MOVEMENT:
                return "Direction of Movement";
            //case this.S_OFFSET_INDICATOR:
            //    return "Offset Indicator";
            case this.T_UNIQUE_DESIGNATION_1:
                return "Unique Designation 1";
            case this.T1_UNIQUE_DESIGNATION_2:
                return "Unique Designation 2";
            case this.V_EQUIP_TYPE:
                return "Equipment Type";
            case this.W_DTG_1:
                return "Date Time Group 1";
            case this.W1_DTG_2:
                return "Date Time Group 2";
            case this.X_ALTITUDE_DEPTH:
                return "Altitude Depth";
            case this.Y_LOCATION:
                return "Location";
            case this.AM_DISTANCE:
                return "Distance";
            case this.AN_AZIMUTH:
                return "Azimuth";
            default:
                return "";

        } */

        //20200220 
        return modifier;
    }
    
};

var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.RendererSettings = (function () {

    var _Version = "0.3.37";
    //outline approach.  none, filled rectangle, outline (default),
    //outline quick (outline will not exceed 1 pixels).
    var _SymbologyStandard = 0,
    _UseLineInterpolation = true,
    _AutoCollapseModifiers = true,
    /**
     * Value from 0 to 255. The closer to 0 the lighter the text color has to be
     * to have the outline be black. Default value is 160.
     */
    _TextBackgroundAutoColorThreshold = 160,

    //if TextBackgroundMethod_OUTLINE is set, This value determines the width of that outline.
    _TextOutlineWidth = 1,

    //outline approach.  none, filled rectangle, outline (default),
    //outline quick (outline should not exceed 1 pixel).
    _TextBackgroundMethod = 2,

    //label foreground color, uses line color of symbol if null.
    _ColorLabelForeground = null,//armyc2.c2sd.renderer.utilities.Color.BLACK;//"000000", //Color.BLACK;
    //label background color, used if TextBackGroundMethod = TextBackgroundMethod_COLORFILL && not null
    _ColorLabelBackground = null,//armyc2.c2sd.renderer.utilities.Color.BLACK;//null,//"#FFFFFF",

    _SymbolOutlineWidth = 3,

    _UseCesium2DScaleModifiers = false,

    //modifier the scale returned from getReasonableScale()
    _3DMinScaleMultiplier = 1.0,
    _3DMaxScaleMultiplier = 1.0,

    /**
     * If true (default), when HQ Staff is present, location will be indicated by the free
     * end of the staff
     */
    _CenterOnHQStaff = true,

    _OCMType = 1,//alternate operational condition modifier is default


    _ModifierFontName = "Arial, sans-serif",
    _ModifierFontSize = 10,
    _ModifierFontStyle = "bold",
    _ModifierFont = "bold 10pt Arial, sans-serif",
    _MPModifierFont = "bold 12pt Arial, sans-serif",
    _MPModifierFontName = "Arial, sans-serif",
    _MPModifierFontSize = 12,
    _MPModifierFontStyle = "bold",
	   _KMLLabelScale = 1.0,

    _scaleEchelon = false,
    _DrawAffiliationModifierAsLabel = true,
    _DrawCountryCode = true,
    _SPFontSize = 60,
    _UnitFontSize = 50,
    _PixelSize = 35,
    _DPI = 90;
    //acevedo - 11/29/2017 - adding option to render only 2  labels.
	   _TwoLabelOnly = true,

     //acevedo - 12/8/17 - allow the setting of affiliation colors.
    _friendlyUnitFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyUnitFillColor,
    /// <summary>
    /// Friendly Unit Fill Color.
    /// </summary>
    _hostileUnitFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.HostileUnitFillColor,//new Color(255,130,132);//Color.RED;
    /// <summary>
    /// Hostile Unit Fill Color.
    /// </summary>
    _neutralUnitFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralUnitFillColor,//new Color(144,238,144);//Color.GREEN;//new Color(0,255,0);//new Color(144,238,144);//light green//Color.GREEN;new Color(0,226,0);
    /// <summary>
    /// Neutral Unit Fill Color.
    /// </summary>
   _unknownUnitFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownUnitFillColor,// new Color(255,255,128);//Color.YELLOW;
    /// <summary>
    /// UnknownUn Graphic Fill Color.
    /// </summary>
    _friendlyGraphicFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyGraphicFillColor,//Crystal Blue //Color.CYAN;
    /// <summary>
    /// Friendly Graphic Fill Color.
    /// </summary>
     _hostileGraphicFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.HostileGraphicFillColor,//salmon
    /// <summary>
    /// Hostile Graphic Fill Color.
    /// </summary>
     _neutralGraphicFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralGraphicFillColor,//Bamboo Green //new Color(144,238,144);//light green
    /// <summary>
    /// Neutral Graphic Fill Color.
    /// </summary>
     _unknownGraphicFillColor = armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownGraphicFillColor,//light yellow  new Color(255,255,224);//light yellow
    /// <summary>
    /// Unknown Unit Line Color.
    /// </summary>
     _friendlyUnitLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyUnitLineColor,
    /// <summary>
    /// Friendly Unit Line Color.
    /// </summary>
     _hostileUnitLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.HostileUnitLineColor,
    /// <summary>
    /// Hostile Unit Line Color.
    /// </summary>
     _neutralUnitLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralUnitLineColor,
    /// <summary>
    /// Neutral Unit Line Color.
    /// </summary>
     _unknownUnitLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownUnitLineColor,
    /// <summary>
    /// Unknown Graphic Line Color.
    /// </summary>
     _friendlyGraphicLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.FriendlyGraphicLineColor,
    /// <summary>
    /// Friend Graphic Line Color.
    /// </summary>
     _hostileGraphicLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.HostileGraphicLineColor,
    /// <summary>
    /// Hostile Graphic Line Color.
    /// </summary>
     _neutralGraphicLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.NeutralGraphicLineColor,
    /// <summary>
    /// Neutral Graphic Line Color.
    /// </summary>
     _unknownGraphicLineColor = armyc2.c2sd.renderer.utilities.AffiliationColors.UnknownGraphicLineColor;

    /*private   Color WeatherRed = new Color(198,16,33);//0xC61021;// 198,16,33
    private   Color WeatherBlue = new Color(0,0,255);//0x0000FF;// 0,0,255

    private   Color WeatherPurpleDark = new Color(128,0,128);//0x800080;// 128,0,128 Plum Red
    private   Color WeatherPurpleLight = new Color(226,159,255);//0xE29FFF;// 226,159,255 Light Orchid

    private   Color WeatherBrownDark = new Color(128,98,16);//0x806210;// 128,98,16 Safari
    private   Color WeatherBrownLight = new Color(210,176,106);//0xD2B06A;// 210,176,106 Khaki
    */



    try
    {
        if(document)
        {
            armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_ModifierFont);
            armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_MPModifierFont);
        }
    }
    catch(err)
    {

    }

return{


    /**
     * There will be no background for text
     * NOTE: not supported
     */
    TextBackgroundMethod_NONE : 0,

    /**
     * There will be a colored box behind the text
     * NOTE: not implemented
     */
    TextBackgroundMethod_COLORFILL : 1,

    /**
     * There will be an adjustable outline around the text (expensive)
     * Outline width of 4 is recommended.
     */
    TextBackgroundMethod_OUTLINE : 2,

     /**
     * Was quick in Java.  Some gains in IE 10+ if outline width is set to 1.
     * NOTE: only implemented for Units
     */
    TextBackgroundMethod_OUTLINE_QUICK : 3,

    /**
     * 2525Bch2 and USAS 11-12 symbology
     */
    Symbology_2525B : 0,
    /**
     * 2525Bch2 and USAS 13-14 symbology
     * @deprecated use Symbology_2525B
     */
    Symbology_2525Bch2_USAS_13_14 : 0,
    /**
     * 2525C, which includes 2525Bch2 & USAS 13/14
     */
    Symbology_2525C : 1,

    OperationalConditionModifierType_SLASH : 0,
    OperationalConditionModifierType_BAR : 1,

    getVersion: function()
    {
        return _Version;
    },

    /**
     * Set operational condition modifiers to be rendered as bars(1) or slashes(0)
     * @param {Number} operationalConditionModifierType like RendererSettings.OperationalConditionModifierType_BAR
     */
    setOperationalConditionModifierType: function(operationalConditionModifierType)
    {
        _OCMType = operationalConditionModifierType;
    },

    /**
     * @return {Number}
     */
    getOperationalConditionModifierType: function()
    {
        return _OCMType;
    },

    /**
     * None, outline (default), or filled background.
     * If set to OUTLINE, TextOutlineWidth changed to default of 4.
     * If set to OUTLINE_QUICK, TextOutlineWidth changed to default of 2.
     * Use setTextOutlineWidth if you'd like a different value.
     * @param textBackgroundMethod like RenderSettings.TextBackgroundMethod_NONE
     */
    setTextBackgroundMethod: function(textBackgroundMethod)
    {
        _TextBackgroundMethod = textBackgroundMethod;
    },

    /**
     * None, outline (default), or filled background.
     * @return method like RenderSettings.TextBackgroundMethod_NONE
     */
    getTextBackgroundMethod: function()
    {
        return _TextBackgroundMethod;
    },

    /**
     * Controls what symbols are supported.
     * Set this before loading the renderer.
     * @param {Number} standard like RendererSettings.Symbology_2525B
     * @returns {undefined}
     */
    setSymbologyStandard: function (standard){
        _SymbologyStandard = standard;
    },
    /**
     * Current symbology standard
     * @returns {Number}
     */
    getSymbologyStandard: function (){
        return _SymbologyStandard;
    },
    /**
     * For lines symbols with "decorations" like FLOT or LOC, when points are
     * too close together, we will start dropping points until we get enough
     * space between 2 points to draw the decoration.  Without this, when points
     * are too close together, you run the chance that the decorated line will
     * look like a plain line because there was no room between points to
     * draw the decoration.
     * @param {Boolean} value
     * @returns {undefined}
     */
    setUseLineInterpolation: function (value){
        _UseLineInterpolation = value;
    },
    /**
     * Returns the current setting for Line Interpolation.
     * @returns {Boolean}
     */
    getUseLineInterpolation: function (){
        return _UseLineInterpolation;
    },
    /**
     * set device DPI (default 90)
     * @param {Number} value
     */
    setDeviceDPI: function (value){
        _DPI = value;
    },
    /**
     * returns user defined device DPI (default 90)
     * @returns {Number}
     */
    getDeviceDPI: function (){
        return _DPI;
    },
    /**
     * Collapse Modifiers for fire support areas when the symbol isn't large enough to show all
     * the labels.  Identifying label will always be visible.  Zooming in, to make the symbol larger,
     * will make more modifiers visible.  Resizing the symbol can also make more modifiers visible.
     * @param {boolean} value
     */
    setAutoCollapseModifiers: function (value){
        _AutoCollapseModifiers = value;
    },
    /**
     * Returns the current setting for Line Interpolation.
     * @returns {Boolean}
     */
    getAutoCollapseModifiers: function (){
        return _AutoCollapseModifiers;
    },
    /**
     * Cesium users calling RenderSymbol2D should set this to true
     * @param {boolean} value
     */
    setUseCesium2DScaleModifiers: function (value){
        _UseCesium2DScaleModifiers = value;
    },
    /**
     * @returns {Boolean}
     */
    getUseCesium2DScaleModifiers: function (){
        return _UseCesium2DScaleModifiers;
    },
    /**
     * for SVG and Canvas output, if your images look stretched or scaled down,
     * try altering there values.  Smaller values will result in a bigger image.
     * Larger values will result in a smaller image.  For example, if you're
     * getting images half the size of the space that they take on the map and are
     * getting stretched to fill it, try 0.5 as a starting point.
     * @param {Number} value (default 1.0)
     */
    set3DMinScaleMultiplier: function (value){
        _3DMinScaleMultiplier = value;
    },
    /**
     * @returns {Number}
     */
    get3DMinScaleMultiplier: function (){
        return _3DMinScaleMultiplier;
    },
    /**
     * for SVG and Canvas output, if your images look stretched or scaled down,
     * try altering there values.  Smaller values will result in a bigger image.
     * Larger values will result in a smaller image.  For example, if you're
     * getting images half the size of the space that they take on the map and are
     * getting stretched to fill it, try 0.5 as a starting point.
     * @param {Number} value (default 1.0)
     */
    set3DMaxScaleMultiplier: function (value){
        _3DMaxScaleMultiplier = value;
    },
    /**
     * @returns {Number}
     */
    get3DMaxScaleMultiplier: function (){
        return _3DMaxScaleMultiplier;
    },
    /**
     * if true (default), when HQ Staff is present, location will be indicated by the free
     * end of the staff.
     * @param {Boolean} value
     * @returns {undefined}
     */
    setCenterOnHQStaff: function (value){
        _CenterOnHQStaff = value;
    },
    getCenterOnHQStaff: function (){
        return _CenterOnHQStaff;
    },
    /**
     * if RenderSettings.TextBackgroundMethod_OUTLINE is used,
     * the outline will be this many pixels wide.
     * @param {Number} width
     * @returns {undefined}
     */
    setTextOutlineWidth: function (width){
        /*if(width > 0)
            _TextOutlineWidth = (width*2) + 1;
        else
            _TextOutlineWidth = 0;*/
        _TextOutlineWidth = width;
    },
    /**
     * if RenderSettings.TextBackgroundMethod_OUTLINE is used,
     * the outline will be this many pixels wide.
     * @returns {unresolved}
     */
    getTextOutlineWidth: function (){
        return _TextOutlineWidth;
    },
     /**
     * Sets the default pixel size for symbology.
     * Default value is 35.
     * @param {Number} size
     * @returns {undefined}
     */
    setDefaultPixelSize: function (size){
        _PixelSize = size;
    },
    /**
     * Gets the default pixel size for symbology.
     * Default value is 35.
     * @returns {Number}
     */
    getDefaultPixelSize: function (){
        return _PixelSize;
    },
    /**
     * Refers to text color of modifier labels
     * Default Color is Black.  If NULL, uses line color of symbol
     * @param {String} value like #FFFFFF
     * @returns {undefined}
     */
    setLabelForegroundColor: function (value){
        _ColorLabelForeground = value;
    },
    /**
     * Refers to text color of modifier labels
     * @returns {String} like #FFFFFF
     */
    getLabelForegroundColor: function (){
        return _ColorLabelForeground;
    },
    /**
     * Refers to text color of modifier labels
     * Default Color is White.
     * Null value means the optimal background color (black or white)
     * will be chose based on the color of the text.
     * @param {String} value like #FFFFFF
     * @returns {undefined}
     */
    setLabelBackgroundColor: function (value){
        _ColorLabelBackground= value;
    },
    /**
     * Refers to background color of modifier labels
     * @returns {String} like #FFFFFF
     */
    getLabelBackgroundColor: function (){
        return _ColorLabelBackground;
    },
    /**
     * Value from 0 to 255. The closer to 0 the lighter the text color has to be
     * to have the outline be black. Default value is 160.
     * @param {Number} value
     * @returns {undefined}
     */
    setTextBackgroundAutoColorThreshold: function (value){
        _TextBackgroundAutoColorThreshold = value;
    },
    /**
     * Value from 0 to 255. The closer to 0 the lighter the text color has to be
     * to have the outline be black. Default value is 160.
     * @returns {Number}
     */
    getTextBackgroundAutoColorThreshold: function (){
        return _TextBackgroundAutoColorThreshold;
    },
    /**
     * This applies to Single Point Tactical Graphics.
     * Setting this will determine the default value for milStdSymbols when created.
     * 0 for no outline,
     * 1 for outline thickness of 1 pixel,
     * 2 for outline thickness of 2 pixels,
     * greater than 2 is not currently recommended.
     * @param {type} width
     * @returns {undefined}
     */
    setSinglePointSymbolOutlineWidth: function (width){
        _SymbolOutlineWidth = width;

        if(width > 0)
            _SymbolOutlineWidth = (width*2) + 1;
        else
            _SymbolOutlineWidth = 0;
    },
    /**
     * This only applies to single point tactical graphics.
     * @returns {unresolved}
     */
    getSinglePointSymbolOutlineWidth: function (){
        return _SymbolOutlineWidth;
    },
    /**
     * false to use label font size
     * true to scale it using symbolPixelBounds / 3.5
     * @param {Boolean} value
     * @returns {undefined}
     */
    setScaleEchelon: function (value){
        _scaleEchelon = value;
    },
    /**
     * Returns the value determining if we scale the echelon font size or
     * just match the font size specified by the label font.
     * @returns {Boolean}
     */
    getScaleEchelon: function (){
        return _scaleEchelon;
    },
    /**
     * Determines how to draw the Affiliation modifier.
     * True to draw as modifier label in the "E/F" location.
     * False to draw at the top right corner of the symbol
     * @param {Boolean} value
     * @returns {undefined}
     */
    setDrawAffiliationModifierAsLabel: function (value){
            _DrawAffiliationModifierAsLabel = value;
    },
    /**
     * True to draw as modifier label in the "E/F" location.
     * False to draw at the top right corner of the symbol
     * @returns {Boolean}
     */
    getDrawAffiliationModifierAsLabel: function (){
            return _DrawAffiliationModifierAsLabel;
    },
    /**
     * If present, append the Country Code to the 'M' Label
     * @param {Boolean} value
     */
    setDrawCountryCode: function (value){
            _DrawCountryCode = value;
    },
    /**
     * If present, append the Country Code to the 'M' Label
     * @returns {Boolean}
     */
    getDrawCountryCode: function (){
            return _DrawCountryCode;
    },
    /**
     *
     * @param {String} name like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} size like 12
     * @param {String} style like "bold"
     * @returns {undefined}
     */
    setModifierFont: function(name, size, style, fontInfo){
        _ModifierFontName = name;
        _ModifierFontSize = size;
        if(style !== 'bold' || style !== 'normal')
        {
            _ModifierFontStyle = style;
        }
        else
        {
            _ModifierFontStyle = 'bold';
        }
        _ModifierFont = style + " " + size + "pt " + name;

        armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_ModifierFont, fontInfo);
    },
    /**
     *
     * @returns {String} like "bold 12pt Arial"
     */
    getModifierFont: function(){
        return _ModifierFont;
    },
    /**
     *
     * @returns {String}
     */
    getModifierFontName: function(){
        return _ModifierFontName;
    },
    /**
     *
     * @returns {Number}
     */
    getModifierFontSize: function(){
        return _ModifierFontSize;
    },
    /**
     *
     * @returns {String}
     */
    getModifierFontStyle: function(){
        return _ModifierFontStyle;
    },

        /**
     *
     * @param {String} name like "Arial" or "Arial, sans-serif" so a backup is
     * available in case 'Arial' is not present.
     * @param {Number} size like 12
     * @param {String} style like "bold"
	 * @param {Number} Only set if you want to scale the KML label font. (default 1.0)
     * @returns {undefined}
     */
    setMPModifierFont: function(name, size, style, kmlLabelScale, fontInfo){
        _MPModifierFontName = name;
        _MPModifierFontSize = size;
        if(style !== 'bold' || style !== 'normal')
        {
            _MPModifierFontStyle = style;
        }
        else
        {
            _MPModifierFontStyle = 'bold';
        }
		if(kmlLabelScale)
		{
			_KMLLabelScale = kmlLabelScale;
		}
		else
		{
			_KMLLabelScale = 1.0;
		}
		var tempSize = Math.round(size * _KMLLabelScale);
        _MPModifierFont = style + " " + tempSize + "pt " + name;
        armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_MPModifierFont, fontInfo);
    },
    /**
     *
     * @returns {String} like "bold 12pt Arial"
     */
    getMPModifierFont: function(){
        return _MPModifierFont;
    },
    /**
     *
     * @returns {String}
     */
    getMPModifierFontName: function(){
        return _MPModifierFontName;
    },
    /**
     *
     * @returns {Number}
     */
    getMPModifierFontSize: function(){
        return _MPModifierFontSize;
    },
    /**
     *
     * @returns {String}
     */
    getMPModifierFontStyle: function(){
        return _MPModifierFontStyle;
    },

	getKMLLabelScale: function(){
		return _KMLLabelScale;
	},

    getFontInfo: function (){
        return {name: _ModifierFontName, size:_ModifierFontSize, style:_ModifierFontStyle, measurements:armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_ModifierFont)};
    },

    getMPFontInfo: function (){
        return {name: _MPModifierFontName, size:_MPModifierFontSize, style:_MPModifierFontStyle, measurements:armyc2.c2sd.renderer.utilities.RendererUtilities.measureFont(_MPModifierFont)};
    },

    /**
	   *
     * Get a boolean indicating between the use of ENY labels in all segments (false) or
 	   * to only set 2 labels one at the north and the other one at the south of the graphic (true).
     * @returns {boolean}
   */
	getTwoLabelOnly: function(){
			return _TwoLabelOnly;
	},

  /**
 	 * Set a boolean indicating between the use of ENY labels in all segments (false) or
 	 * to only set 2 labels one at the north and the other one at the south of the graphic (true).
 	 * @param {boolean} TwoENYLabelOnly
 	 */
    setTwoLabelOnly: function ( TwoLabelOnly )
 	{
 		_TwoLabelOnly = TwoLabelOnly;
 	},

   /**
    * get the preferred fill affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getFriendlyUnitFillColor: function ()
    {
      return _friendlyUnitFillColor;
   },
   /**
    * Set the preferred fill affiliation color for units
    *
    * @param friendlyUnitFillColor Color like  Color(255, 255, 255)
    *
    * */
    setFriendlyUnitFillColor: function(friendlyUnitFillColor)
    {
      if (friendlyUnitFillColor != null)
      _friendlyUnitFillColor = friendlyUnitFillColor;
   },
   /**
    * get the preferred fill affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getHostileUnitFillColor: function() {
      return _hostileUnitFillColor;
   },
   /**
    * Set the preferred fill affiliation color for units
    *
    * @param hostileUnitFillColor Color like  Color(255, 255, 255)
    *
    * */
    setHostileUnitFillColor:function (  hostileUnitFillColor) {
      if (hostileUnitFillColor != null)
      _hostileUnitFillColor = hostileUnitFillColor;
   },
   /**
    * get the preferred fill affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
     getNeutralUnitFillColor:function () {
      return _neutralUnitFillColor;
   },
   /**
    * Set the preferred line affiliation color for units
    *
    * @param neutralUnitFillColor Color like  Color(255, 255, 255)
    *
    * */
     setNeutralUnitFillColor:function ( neutralUnitFillColor) {
      if (neutralUnitFillColor != null)
      _neutralUnitFillColor = neutralUnitFillColor;
   },
   /**
    * get the preferred fill affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
     getUnknownUnitFillColor:function () {
      return _unknownUnitFillColor;
   },
   /**
    * Set the preferred fill affiliation color for units
    *
    * @param unknownUnitFillColor Color like  Color(255, 255, 255)
    *
    * */
     setUnknownUnitFillColor:function ( unknownUnitFillColor) {
      if (unknownUnitFillColor != null)
      _unknownUnitFillColor = unknownUnitFillColor;
   },
   /**
    * get the preferred fill affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
     getHostileGraphicFillColor:function () {
      return _hostileGraphicFillColor;
   },
   /**
    * Set the preferred fill affiliation color for graphics
    *
    * @param hostileGraphicFillColor Color like  Color(255, 255, 255)
    *
    * */
    setHostileGraphicFillColor:function ( hostileGraphicFillColor) {
      if (hostileGraphicFillColor != null)
      _hostileGraphicFillColor = hostileGraphicFillColor;
   },
   /**
    * get the preferred fill affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
     getFriendlyGraphicFillColor:function () {
      return _friendlyGraphicFillColor;
   },
   /**
    * Set the preferred fill affiliation color for graphics
    *
    * @param friendlyGraphicFillColor Color like  Color(255, 255, 255)
    *
    * */
     setFriendlyGraphicFillColor:function ( friendlyGraphicFillColor) {
      if (friendlyGraphicFillColor != null)
      _friendlyGraphicFillColor = friendlyGraphicFillColor;
   },
   /**
    * get the preferred fill affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
     getNeutralGraphicFillColor:function () {
      return _neutralGraphicFillColor;
   },
   /**
    * Set the preferred fill affiliation color for graphics
    *
    * @param neutralGraphicFillColor Color like  Color(255, 255, 255)
    *
    * */
    setNeutralGraphicFillColor:function ( neutralGraphicFillColor) {
      if (neutralGraphicFillColor != null)
      _neutralGraphicFillColor = neutralGraphicFillColor;
   },
   /**
    * get the preferred fill affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getUnknownGraphicFillColor:function () {
      return _unknownGraphicFillColor;
   },
   /**
    * Set the preferred fill affiliation color for graphics
    *
    * @param unknownGraphicFillColor Color like  Color(255, 255, 255)
    *
    * */
    setUnknownGraphicFillColor:function ( unknownGraphicFillColor) {
      if (unknownGraphicFillColor != null)
      _unknownGraphicFillColor = unknownGraphicFillColor;
   },
   /**
    * get the preferred line affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getFriendlyUnitLineColor:function () {
      return _friendlyUnitLineColor;
   },
   /**
    * Set the preferred line affiliation color for units
    *
    * @param friendlyUnitLineColor Color like  Color(255, 255, 255)
    *
    * */
    setFriendlyUnitLineColor:function ( friendlyUnitLineColor) {
      if (friendlyUnitLineColor != null)
      this._friendlyUnitLineColor = friendlyUnitLineColor;
   },
   /**
    * get the preferred line   affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getHostileUnitLineColor:function () {
      return _hostileUnitLineColor;
   },
   /**
    * Set the preferred line affiliation color for units
    *
    * @param hostileUnitLineColor Color like  Color(255, 255, 255)
    *
    * */
    setHostileUnitLineColor:function ( hostileUnitLineColor) {
      if (hostileUnitLineColor != null)
      this._hostileUnitLineColor = hostileUnitLineColor;
   },
   /**
    * get the preferred line affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getNeutralUnitLineColor:function () {
      return _neutralUnitLineColor;
   },
   /**
    * Set the preferred line affiliation color for units
    *
    * @param neutralUnitLineColor Color like  Color(255, 255, 255)
    *
    * */
    setNeutralUnitLineColor:function ( neutralUnitLineColor) {
      if (neutralUnitLineColor != null)
      this._neutralUnitLineColor = neutralUnitLineColor;
   },
   /**
    * get the preferred line affiliation color for units.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getUnknownUnitLineColor:function () {
      return _unknownUnitLineColor;
   },
   /**
    * Set the preferred line affiliation color for units
    *
    * @param unknownUnitLineColor Color like  Color(255, 255, 255)
    *
    * */
    setUnknownUnitLineColor:function ( unknownUnitLineColor) {
      if (unknownUnitLineColor != null)
      this._unknownUnitLineColor = unknownUnitLineColor;
   },
   /**
    * get the preferred line affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getFriendlyGraphicLineColor:function () {
      return _friendlyGraphicLineColor;
   },
   /**
    * Set the preferred line affiliation color for graphics
    *
    * @param friendlyGraphicLineColor Color like  Color(255, 255, 255)
    *
    * */
    setFriendlyGraphicLineColor:function ( friendlyGraphicLineColor) {
      if (friendlyGraphicLineColor != null)
      this._friendlyGraphicLineColor = friendlyGraphicLineColor;
   },
   /**
    * get the preferred line affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getHostileGraphicLineColor:function () {
      return _hostileGraphicLineColor;
   },
   /**
    * Set the preferred line affiliation color for graphics
    *
    * @param hostileGraphicLineColor Color like  Color(255, 255, 255)
    *
    * */
    setHostileGraphicLineColor:function ( hostileGraphicLineColor) {
      if (hostileGraphicLineColor != null)
      this._hostileGraphicLineColor = hostileGraphicLineColor;
   },
   /**
    * get the preferred line affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getNeutralGraphicLineColor:function () {
      return _neutralGraphicLineColor;
   },
   /**
    * Set the preferred line affiliation color for graphics
    *
    * @param neutralGraphicLineColor Color like  Color(255, 255, 255)
    *
    * */
    setNeutralGraphicLineColor:function ( neutralGraphicLineColor) {
      if (neutralGraphicLineColor != null)
      this._neutralGraphicLineColor = neutralGraphicLineColor;
   },
   /**
    * get the preferred line affiliation color for graphics.
    *
    * @return Color like  Color(255, 255, 255)
    *
    * */
    getUnknownGraphicLineColor:function () {
      return _unknownGraphicLineColor;
   },
   /**
    * Set the preferred line affiliation color for graphics
    *
    * @param unknownGraphicLineColor Color like  Color(255, 255, 255)
    *
    * */
    setUnknownGraphicLineColor:function ( unknownGraphicLineColor) {
      if (unknownGraphicLineColor != null)
      this._unknownGraphicLineColor = unknownGraphicLineColor;
   },

   /**
    * Set the preferred line and fill affiliation color for tactical graphics.
    *
    * @param friendlyGraphicLineColor Color
    * @param hostileGraphicLineColor Color
    * @param neutralGraphicLineColor Color
    * @param unknownGraphicLineColor Color
    * @param friendlyGraphicFillColor Color
    * @param hostileGraphicFillColor Color
    * @param neutralGraphicFillColor Color
    * @param unknownGraphicFillColor Color
    */
    setGraphicPreferredAffiliationColors: function (  friendlyGraphicLineColor,
                                                      hostileGraphicLineColor,
                                                      neutralGraphicLineColor,
                                                      unknownGraphicLineColor,
                                                      friendlyGraphicFillColor,
                                                      hostileGraphicFillColor,
                                                      neutralGraphicFillColor,
                                                      unknownGraphicFillColor) {


         setFriendlyGraphicLineColor(friendlyGraphicLineColor);
         setHostileGraphicLineColor(hostileGraphicLineColor);
         setNeutralGraphicLineColor(neutralGraphicLineColor);
         setUnknownGraphicLineColor(unknownGraphicLineColor);
         setFriendlyGraphicFillColor(friendlyGraphicFillColor);
         setHostileGraphicFillColor(hostileGraphicFillColor);
         setNeutralGraphicFillColor(neutralGraphicFillColor);
         setUnknownGraphicFillColor(unknownGraphicFillColor);
   },

   /**
    * Set the preferred line and fill affiliation color for units and tactical graphics.
    *
    * @param friendlyUnitLineColor Color like  Color(255, 255, 255). Set to null to ignore setting
    * @param hostileUnitLineColor Color
    * @param neutralUnitLineColor Color
    * @param unknownUnitLineColor Color
    * @param friendlyUnitFillColor Color
    * @param hostileUnitFillColor Color
    * @param neutralUnitFillColor Color
    * @param unknownUnitFillColor Color
    */
    setUnitPreferredAffiliationColors: function (     friendlyUnitLineColor,
                                                      hostileUnitLineColor,
                                                      neutralUnitLineColor,
                                                      unknownUnitLineColor,
                                                      friendlyUnitFillColor,
                                                      hostileUnitFillColor,
                                                      neutralUnitFillColor,
                                                      unknownUnitFillColor) {

      setFriendlyUnitLineColor(friendlyUnitLineColor);
      setHostileUnitLineColor(hostileUnitLineColor);
      setNeutralUnitLineColor(neutralUnitLineColor);
      setUnknownUnitLineColor(unknownUnitLineColor);
      setFriendlyUnitFillColor(friendlyUnitFillColor);
      setHostileUnitFillColor(hostileUnitFillColor);
      setNeutralUnitFillColor(neutralUnitFillColor);
      setUnknownUnitFillColor(unknownUnitFillColor);
   },

  getInstance: function(){
          return armyc2.c2sd.renderer.utilities.RendererSettings;
  }

};
}());
/**
 * @fileOverview Mil Symbology Renderer.  Generate MIL-STD-2525 B Change II +USAS 13-14 and C +USAS 13-14 icon and area based symbology in KML, JSON, and PNG formats
 * @version 1.0.0
 */
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.SymbolUtilities = {};

armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings.getInstance();

    /**
     *
     * @param {String} symbolID 15 character code
     * @returns {String} basic symbolID
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolID = function (symbolID, symStd) {
        //try {

            var basic = symbolID;
            if(symbolID && symbolID.length === 15)
            {
                var scheme = symbolID.charAt(0);
                if(scheme === 'S' || scheme === 'O' || scheme === 'E')
                {
                    basic = scheme + '*' + basic.charAt(2) + '*' + basic.substring(4, 10) + "*****";

                    var std = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
                    if(symStd !== undefined)
                        std = symStd;

                    var has = armyc2.c2sd.renderer.utilities.UnitDefTable.hasUnitDef(basic, std);
                    var temp = null;
                    if(!has)
                    {
                        temp = basic.substr(0,10) + "H****";
                        has = armyc2.c2sd.renderer.utilities.UnitDefTable.hasUnitDef(temp, std);
                        if(has)
                        {
                            basic = temp;
                        }
                        else
                        {
                            temp = basic.substr(0,10) + "MO***";
                            has = armyc2.c2sd.renderer.utilities.UnitDefTable.hasUnitDef(temp, std);
                            if(has)
                            {
                                basic = temp;
                            }
                        }
                    }
                    
                }
                else if (scheme === 'G') //tactical graphic
                {
                    basic = scheme + '*' + basic.charAt(2) + '*' + basic.substring(4, 10) + "****X";
                }
                else if(scheme === 'I')
                {
                    basic = scheme + '*' + basic.charAt(2) + '*' + basic.substring(4, 10) + "--***";
                }
                else// if (scheme === 'W' || scheme === 'B')//weather or basic/buffered shape
                {
                    basic = symbolID;
                }
            }
            return basic;
        //} catch (error) {}
        //return symbolID;
    };
    /**
     * Swaps status and affiliation for '*' and appends "****X" or "*****" to the end.
     * Only used for font character lookups.  Not for general use. Use getBasicSymbolID.
     * @param {String} symbolID 15 character code
     * @returns {String} basic symbolID
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolIDStrict = function (symbolID) {
        //try {

            var basic = symbolID;
            if(symbolID && symbolID.length === 15)
            {
                var scheme = symbolID.charAt(0);
                if (scheme === 'G') //tactical graphic
                {
                    basic = scheme + '*' + basic.charAt(2) + '*' + basic.substring(4, 10) + "****X";
                }
                else if (scheme !== 'W' && scheme !== 'B' && scheme !== 'P')//weather or basic/buffered shape/parametered basic shape
                {
                    basic = scheme + '*' + basic.charAt(2) + '*' + basic.substring(4, 10) + "*****";
                }
            }
            return basic;
        //} catch (error) {}
        //return symbolID;
    };
    /**
     * @param {String} symbolID
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.reconcileSymbolID = function(symbolID, isMultiPoint)
    {

        if(isMultiPoint !== true)
            isMultiPoint = false;
        var sb = "";
        var codingScheme = symbolID.charAt(0);

        if(symbolID.indexOf("BS_") === 0 || symbolID.indexOf("BBS_") === 0 || symbolID.indexOf("PBS_") === 0 )
        {
            return symbolID;
        }

        if(symbolID.length < 15)
        {
            while (symbolID.length < 15)
            {
                symbolID += "-";
            }
        }
        if(symbolID.length > 15)
        {
            symbolID = symbolID.substring(0, 15);
        }

        if(symbolID !== null && symbolID.length===15)
        {
            if(codingScheme==='S' || //warfighting
                    codingScheme==='I' ||//sigint
                    codingScheme==='O' ||//stability operation
                    codingScheme==='E')//emergency management
            {
                sb += (codingScheme);

                if(this.hasValidAffiliation(symbolID)===false)
                    sb += ('U');
                else
                    sb += (symbolID.charAt(1));

                if(this.hasValidBattleDimension(symbolID)===false)
                {
                    sb = "S" + sb.substring(1);
                    sb += ('Z');
                }
                else
                    sb += (symbolID.charAt(2));

                if(this.hasValidStatus(symbolID)===false)
                    sb += ('P');
                else
                    sb += (symbolID.charAt(3));

                sb += ("------");
                sb += (symbolID.substring(10, 15));

            }
            else if(codingScheme==='G')//tactical
            {
                sb += (codingScheme);

                if(this.hasValidAffiliation(symbolID)===false)
                    sb += ('U');
                else
                    sb += (symbolID.charAt(1));

                //if(this.hasValidBattleDimension(SymbolID)==false)
                    sb += ('G');
                //else
                //    sb += (SymbolID.charAt(2));

                if(this.hasValidStatus(symbolID)===false)
                    sb += ('P');
                else
                    sb += (symbolID.charAt(3));

                if(isMultiPoint)
                    sb += ("GAG---");//return a boundary
                else
                    sb += ("GPP---");//return an action point

                sb += (symbolID.substring(10, 15));

            }
            else if(codingScheme==='W')//weather
            {//no default weather graphic
                return "SUZP-----------";//unknown
            }
            else//bad codingScheme
            {
                sb += ('S');
                if(this.hasValidAffiliation(symbolID)===false)
                    sb += ('U');
                else
                    sb += (symbolID.charAt(1));

                if(this.hasValidBattleDimension(symbolID)===false)
                {
                    sb += ('Z');
                    //sb.replace(0, 1, "S");
                }
                else
                    sb += (symbolID.charAt(2));

                if(this.hasValidStatus(symbolID)===false)
                    sb += ('P');
                else
                    sb += (symbolID.charAt(3));

                sb += ("------");
                sb += (symbolID.substring(10, 15));
            }
        }
        else
        {
            return "SUZP-----------";//unknown
        }
        return sb;
    };
    /**
     * Returns true if the SymbolID has a valid Status (4th character)
     * @param {String} SymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasValidStatus = function (SymbolID){
        if(SymbolID !== null && SymbolID.length>=10)
        {
            var status = SymbolID.charAt(3),
            codingScheme = SymbolID.charAt(0);

            if(codingScheme==='S' || //warfighting
                 codingScheme==='I' ||//sigint
                 codingScheme==='O' ||//stability operation
                 codingScheme==='E')//emergency management
            {
                if(status === 'A' ||
                    status === 'P' ||
                    status === 'C' ||
                    status === 'D' ||
                    status === 'X' ||
                    status === 'F')
                {
                    return true;
                }
                else
                    return false;
            }
            else if(codingScheme==='G')
            {
                if(status === 'A' ||
                    status === 'S' ||
                    status === 'P' ||
                    status === 'K')
                {
                    return true;
                }
                else
                    return false;
            }
            else if(codingScheme==='W')
            {
                return true;//doesn't apply
            }

            return false;
        }
        else
            return false;
    };
    /**
     * Returns true if the SymbolID has a valid Affiliation (2nd character)
     * @param {String} SymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasValidAffiliation = function (SymbolID){
        if(SymbolID !== null && SymbolID.length>=10)
        {
            var affiliation = SymbolID.charAt(1);
            if(affiliation === 'P' ||
                    affiliation === 'U' ||
                    affiliation === 'A' ||
                    affiliation === 'F' ||
                    affiliation === 'N' ||
                    affiliation === 'S' ||
                    affiliation === 'H' ||
                    affiliation === 'G' ||
                    affiliation === 'W' ||
                    affiliation === 'M' ||
                    affiliation === 'D' ||
                    affiliation === 'L' ||
                    affiliation === 'J' ||
                    affiliation === 'K')
                return true;
            else
                return false;
        }
        else
            return false;
    };
    /**
     * Returns true if the SymbolID has a valid Coding Scheme (1st character)
     * @param {type} symbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasValidCodingScheme = function (symbolID){
        if(symbolID !== null && symbolID.length>0)
           {
               var codingScheme = symbolID.charAt(0);
               if(codingScheme==='S'||
                       codingScheme==='G'||
                       codingScheme==='W'||
                       codingScheme==='I'||
                       codingScheme==='O'||
                       codingScheme==='E')
               {
                   return true;
               }
               else
               {
                   return false;
               }
           }
           else
           {
               return false;
           }
    };
    /**
     * Returns true if the SymbolID has a valid BattleDimension (3rd character)
     * "Category" for tactical graphics
     * @param {String} SymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasValidBattleDimension = function (SymbolID){
        if(SymbolID !== null && SymbolID.length>=10)
        {
            var codingScheme = SymbolID.charAt(0),
            bd = SymbolID.charAt(2);

            if(codingScheme==='S')//warfighting
            {
                if(bd === 'P' ||
                    bd === 'A' ||
                    bd === 'G' ||
                    bd === 'S' ||
                    bd === 'U' ||
                    bd === 'F' ||
                    //status == 'X' ||//doesn't seem to be a valid use for this one
                    bd === 'Z')
                    return true;
                else
                    return false;
            }
            else if(codingScheme==='O')//stability operation
            {
                if(bd === 'V' ||
                    bd === 'L' ||
                    bd === 'O' ||
                    bd === 'I' ||
                    bd === 'P' ||
                    bd === 'G' ||
                    bd === 'R')
                    return true;
                else
                    return false;
            }
            else if(codingScheme==='E')//emergency management
            {
                if(bd === 'I' ||
                    bd === 'N' ||
                    bd === 'O' ||
                    bd === 'F')
                    return true;
                else
                    return false;
            }
            else if(codingScheme==='G')//tactical grahpic
            {
                if(bd === 'T' ||
                    bd === 'G' ||
                    bd === 'M' ||
                    bd === 'F' ||
                    bd === 'S' ||
                    bd === 'O')
                {
                    return true;
                }
                else
                    return false;
            }
            else if(codingScheme==='W')//weather
            {
                return true;//doesn't apply
            }
            else if(codingScheme==='I')//sigint
            {
                if(bd === 'P' ||
                    bd === 'A' ||
                    bd === 'G' ||
                    bd === 'S' ||
                    bd === 'U' ||
                    //status === 'X' ||//doesn't seem to be a valid use for this one
                    bd === 'Z')
                    return true;
                else
                    return false;
            }
            else//bad codingScheme, can't confirm battle dimension
                 return false;
        }
        else
            return false;
    };

    /**
     * Takes a single character or a string and will test for non-letter characters.
     * @param {type} str
     * @returns {armyc2.c2sd.renderer.utilities.SymbolUtilities.isLetter.returnVal|Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isLetter = function (str)
    {
        var returnVal = true,
            len = str.length,
            code = 0;
        for(var i = 0; i < len; i++)
        {
            code = str.charCodeAt(i);
            if(!(code >= 65 && code <= 90) || (code>= 97 && code <= 122))
            {
                returnVal = false;
                break;
            }
        }
        return returnVal;
    };

    /**
     * Returns true if the characters in the country code positions of the
     * SymbolID are letters.
     * @param {String} symbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasValidCountryCode = function (symbolID)
    {
        if(this.isLetter(symbolID.substring(12,14)))
            return true;
        else
            return false;
    };

    /**
     * converts a Javascript Date object into a properly formated String for
     * W or W1
     * @param {Date} date
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getDateLabel = function (date) {
        var strDate = null, //ddHHmmssZMMMyy
        day, //##
        hour, //##
        min, //##
        sec, //##
        zulu, //Z
        month, //###, (APR)
        strMonth, //###, (APR)
        year,
        strYear, //##
        months;

        if(date instanceof Date)
        {
            day = date.getDate();
            hour = date.getHours();
            min = date.getMinutes();
            sec = date.getSeconds();
            zulu = date.getTimezoneOffset();
            if (zulu !== 0) {
                zulu = zulu / -60;
            }
            month = date.getMonth();
            year = date.getFullYear();
            months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            strMonth = months[month];
            strYear = year.toString();
            strYear = strYear.substr(2, 2);
            strDate = this.formatNumberLength(day, 2) + this.formatNumberLength(hour, 2) + this.formatNumberLength(min, 2) + this.formatNumberLength(sec, 2) + this.getZuluCharacter(zulu) + strMonth + strYear;
        }
        return strDate;
    };

    /**
     * usage: formatNumberLength(30,4);
     * returns: "0030"
     * @param {Number} number
     * @param {Number} length
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.formatNumberLength = function (number, length) {
        var r = "";
        r = r + number;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    };
    /**
     * Takes the timezone offset and returns the apropriate
     * time zone letter string.
     * @param {Number} hour hour,time zone offset (int, -12 to 12)
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getZuluCharacter = function (hour) {
        if (hour === 0) {
            return "Z";
        } else if (hour === -1) {
            return "N";
        } else if (hour === -2) {
            return "O";
        } else if (hour === -3) {
            return "P";
        } else if (hour === -4) {
            return "Q";
        } else if (hour === -5) {
            return "R";
        } else if (hour === -6) {
            return "S";
        } else if (hour === -7) {
            return "T";
        } else if (hour === -8) {
            return "U";
        } else if (hour === -9) {
            return "V";
        } else if (hour === -10) {
            return "W";
        } else if (hour === -11) {
            return "X";
        } else if (hour === -12) {
            return "Y";
        } else if (hour === 1) {
            return "A";
        } else if (hour === 2) {
            return "B";
        } else if (hour === 3) {
            return "C";
        } else if (hour === 4) {
            return "D";
        } else if (hour === 5) {
            return "E";
        } else if (hour === 6) {
            return "F";
        } else if (hour === 7) {
            return "G";
        } else if (hour === 8) {
            return "H";
        } else if (hour === 9) {
            return "I";
        } else if (hour === 10) {
            return "K";
        } else if (hour === 11) {
            return "L";
        } else if (hour === 12) {
            return "M";
        } else {
            return "-";
        }
    };

    /**
     *
     * @param {String} symbolID
     * @param {String} modifier from the constants ModifiersUnits or ModifiersTG
     * @param {int} symStd 0=2525B, 1=2525C.  Constants available in RendererSettings.
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.hasModifier = function (symbolID, modifier, symStd){
        var returnVal = false;
        if(symStd === undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }
        if(this.isTacticalGraphic(symbolID)===true)
        {
            returnVal = this.canSymbolHaveModifier(symbolID, modifier, symStd);
        }
        else
        {
            returnVal = this.canUnitHaveModifier(symbolID, modifier);
        }
        return returnVal;
    };
    /**
     *
     * @param {String} symbolID
     * @param {String} unitModifier
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.canUnitHaveModifier = function (symbolID, unitModifier){

        var ModifiersUnits = armyc2.c2sd.renderer.utilities.ModifiersUnits;
        if(unitModifier===(ModifiersUnits.B_ECHELON))
        {
            return (this.isUnit(symbolID) || this.isSTBOPS(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.C_QUANTITY))
        {
            return (this.isEquipment(symbolID) ||
                    this.isEMSEquipment(symbolID) ||
                    this.isEMSIncident(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.D_TASK_FORCE_INDICATOR))
        {
            return (this.isUnit(symbolID) ||
                    this.isSTBOPS(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.F_REINFORCED_REDUCED))
        {
            return (this.isUnit(symbolID) ||
                    this.isSTBOPS(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.G_STAFF_COMMENTS))
        {
            return (this.isEMS(symbolID) === false);
        }
        else if(unitModifier===(ModifiersUnits.H_ADDITIONAL_INFO_1))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.J_EVALUATION_RATING))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.K_COMBAT_EFFECTIVENESS))
        {
            return (this.isUnit(symbolID) ||
                    this.isSTBOPS(symbolID) ||
                    (this.hasInstallationModifier(symbolID) && this.isEMS(symbolID)===false));
        }
        else if(unitModifier===(ModifiersUnits.L_SIGNATURE_EQUIP))
        {
            return (this.isEquipment(symbolID) ||
                    this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.M_HIGHER_FORMATION))
        {
            return (this.isUnit(symbolID) ||
                    this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.N_HOSTILE))
        {
            return (this.isEquipment(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.P_IFF_SIF))
        {
            return (this.isUnit(symbolID) ||
                    this.isEquipment(symbolID) ||
                    (this.hasInstallationModifier(symbolID) && this.isEMS(symbolID)===false) ||
                    this.isSTBOPS(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.Q_DIRECTION_OF_MOVEMENT))
        {
            return ((this.hasInstallationModifier(symbolID) === false) &&
                    (this.isSIGINT(symbolID) === false));
        }
        else if(unitModifier===(ModifiersUnits.R_MOBILITY_INDICATOR))
        {
            return (this.isEquipment(symbolID) ||
                    this.isEMSEquipment(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.R2_SIGNIT_MOBILITY_INDICATOR))
        {
            return (this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.S_HQ_STAFF_OR_OFFSET_INDICATOR))
        {
            return (this.isSIGINT(symbolID)===false);
        }
        else if(unitModifier===(ModifiersUnits.T_UNIQUE_DESIGNATION_1))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.V_EQUIP_TYPE))
        {
            return (this.isEquipment(symbolID) ||
                    this.isSIGINT(symbolID) ||
                    this.isEMSEquipment(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.W_DTG_1))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.X_ALTITUDE_DEPTH))
        {
            return (this.isSIGINT(symbolID)===false);
        }
        else if(unitModifier===(ModifiersUnits.Y_LOCATION))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.Z_SPEED))
        {
            return ((this.hasInstallationModifier(symbolID)===false) &&
                    (this.isSIGINT(symbolID)===false));
        }
        else if(unitModifier===(ModifiersUnits.AA_SPECIAL_C2_HQ))
        {
            return (this.isUnit(symbolID) ||
                    this.isSTBOPS(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.AB_FEINT_DUMMY_INDICATOR))
        {
            return ((this.isSIGINT(symbolID)===false) &&
                    (this.isEMS(symbolID)===false));
        }
        else if(unitModifier===(ModifiersUnits.AC_INSTALLATION))
        {
            return (this.isSIGINT(symbolID)===false);
        }
        else if(unitModifier===(ModifiersUnits.AD_PLATFORM_TYPE))
        {
            return (this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.AE_EQUIPMENT_TEARDOWN_TIME))
        {
            return (this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.AF_COMMON_IDENTIFIER))
        {
            return (this.isSIGINT(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.AG_AUX_EQUIP_INDICATOR))
        {
            return (this.isEquipment(symbolID));
        }
        else if(unitModifier===(ModifiersUnits.AH_AREA_OF_UNCERTAINTY) ||
                unitModifier===(ModifiersUnits.AI_DEAD_RECKONING_TRAILER) ||
                unitModifier===(ModifiersUnits.AJ_SPEED_LEADER))
        {
            return ((this.isSIGINT(symbolID)===false) &&
                    (this.hasInstallationModifier(symbolID)===false));
        }
        else if(unitModifier===(ModifiersUnits.AK_PAIRING_LINE))
        {
            return ((this.isSIGINT(symbolID)===false) &&
                    (this.isEMS(symbolID)===false) &&
                    (this.hasInstallationModifier(symbolID)===false));
        }
        else if(unitModifier===(ModifiersUnits.AL_OPERATIONAL_CONDITION))
        {
            return (this.isUnit(symbolID)===false);
        }
        else if(unitModifier===(ModifiersUnits.AO_ENGAGEMENT_BAR))
        {
            return ((this.isEquipment(symbolID) ||
                    this.isUnit(symbolID) ||
                    this.hasInstallationModifier(symbolID)) &&
                    this.isEMS(symbolID)===false);
        }
        //out of order because used less often
        else if(unitModifier===(ModifiersUnits.A_SYMBOL_ICON))
        {
            return true;
        }
        else if(unitModifier===(ModifiersUnits.E_FRAME_SHAPE_MODIFIER))
        {
            //return (this.isSIGINT(symbolID)==false);
            //not sure why milstd say sigint don't have it.
            //they clearly do.
            return true;
        }
        else if(unitModifier === (ModifiersUnits.SCC_SONAR_CLASSIFICATION_CONFIDENCE))
        {
           if(this.isSubSurface(symbolID))
           {
               //these symbols only exist in 2525C
               var temp = symbolID.substring(4, 10);
               if(temp === ("WMGC--") ||
                       temp === ("WMMC--") ||
                       temp === ("WMFC--") ||
                       temp === ("WMC---"))
               {
                   return true;
               }
           }

           return false;
        }
        else
            return false;
    };
    /**
     *
     * @param {String} symbolID
     * @param {String} tgModifier like armyc2.c2sd.renderer.utilities.ModifiersTG.AN_AZIMUTH
     * @param {Number} symStd like armyc2.c2sd.renderer.utilities.RendererSettings.Symbology_2525C
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.canSymbolHaveModifier = function(symbolID, tgModifier, symStd){
        if(symStd === undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }
        var basic = null,
        sd = null,//symbolDef
        returnVal = false;


        var ModifiersTG = armyc2.c2sd.renderer.utilities.ModifiersTG;
        var SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable;
        basic = this.getBasicSymbolIDStrict(symbolID);
        sd = SymbolDefTable.getSymbolDef(basic, symStd);
        if(sd !== null)
        {
            var dc = sd.drawCategory;
            if(tgModifier===(ModifiersTG.AM_DISTANCE))
            {
                switch(dc)
                {
                    case SymbolDefTable.DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE:
                    case SymbolDefTable.DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE:
                    case SymbolDefTable.DRAW_CATEGORY_TWO_POINT_RECT_PARAMETERED_AUTOSHAPE:
                        returnVal = true;
                        break;
                    case SymbolDefTable.DRAW_CATEGORY_CIRCULAR_PARAMETERED_AUTOSHAPE:
                    case SymbolDefTable.DRAW_CATEGORY_CIRCULAR_RANGEFAN_AUTOSHAPE:
                        returnVal = true;
                        break;
					case SymbolDefTable.DRAW_CATEGORY_LINE:
						if(sd.modifiers.indexOf(tgModifier + ".") > -1)
							returnVal = true;
						break;
                    default:
                        returnVal = false;
                }
            }
            else if(tgModifier===(ModifiersTG.AN_AZIMUTH))
            {
                switch(dc)
                {
                    case SymbolDefTable.DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE:
                    case SymbolDefTable.DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE:
                        returnVal = true;
                        break;
                    default:
                        returnVal = false;
                }
            }
            else
            {
                if(sd.modifiers.indexOf(tgModifier + ".")>-1)
                    returnVal = true;
            }
        }

        return returnVal;

    };
    /**
     * Gets line color used if no line color has been set. The color is specified based on the affiliation of
     * the symbol and whether it is a unit or not.
     * @param {String} symbolID
     * @returns {armyc2.c2sd.renderer.utilities.Color} hex color like #FFFFFF
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getLineColorOfAffiliation = function(symbolID){
        var retColor = null,
        basicSymbolID = this.getBasicSymbolIDStrict(symbolID);
        //var AffiliationColors = armyc2.c2sd.renderer.utilities.AffiliationColors;

        // We can't get the fill color if there is no symbol id, since that also means there is no affiliation
        if((symbolID === null) || (symbolID===("")))
        {
                return retColor;
        }

        if (this.isTacticalGraphic(symbolID))// && !this.isTGWithFill(symbolID))
        {
            if (this.isWeather(symbolID))
            {
                retColor = this.getLineColorOfWeather(symbolID);
            }
            else if(this.isObstacle(symbolID))
            {
                //retColor = armyc2.c2sd.renderer.utilities.Color.GREEN;	// Green
                retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getNeutralGraphicLineColor();
            }
            else if(this.isEMSNaturalEvent(symbolID))
            {
                //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;	// Black
                retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicLineColor();
            }
            else if ((this.isNBC(symbolID)) &&
                    (basicSymbolID===("G*M*NR----****X") || //Radioactive Area
                    basicSymbolID===("G*M*NC----****X") || //Chemically Contaminated Area
                    basicSymbolID===("G*M*NB----****X"))) //Biologically Contaminated Area
            {
                //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//0xffff00;
                retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicLineColor();
            }
            else if (symbolID.charAt(0) === "G" && symbolID.charAt(2) === "G" 
                    && ( symbolID.substring(4, 6).equals("PN")      //Dummy minefield (Static)
                        || symbolID.substring(4, 6).equals("PC") )) //Dummy minefield (Dynamic)
            {   //20200302 add 
                //retColor = armyc2.c2sd.renderer.utilities.Color.GREEN;	// Green
                retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getNeutralGraphicLineColor();
            }
            else
            {
                    var switchChar = symbolID.charAt(1);
                    if(switchChar===("F") ||
                        switchChar===("A") ||
                        switchChar===("D") ||
                        switchChar===("M"))
                    {
                        //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//0x000000;	// Black
                        retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicLineColor();
                    }
                    else if(switchChar===("H") ||
                        switchChar===("S") ||
                        switchChar===("J") ||
                        switchChar===("K"))
                    {

                        if (this.getBasicSymbolIDStrict(symbolID)===("G*G*GLC---****X"))	// Line of Contact
                        {
                            //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//0x000000;	// Black
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicLineColor();
                        }
                        else
                        {
                            //retColor = armyc2.c2sd.renderer.utilities.Color.RED;//0xff0000;	// Red
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getHostileGraphicLineColor();
                        }

                    }
                    else if(switchChar===("N") ||
                            switchChar===("L"))	// Neutral:
                    {
                            //retColor = armyc2.c2sd.renderer.utilities.Color.GREEN;//0x00ff00;	// Green
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getNeutralGraphicLineColor();
                    }
                    else if(switchChar===("U") ||
                        switchChar===("P") ||
                        switchChar===("O") ||
                        switchChar===("G") ||
                        switchChar===("W"))
                    {
                        if (symbolID.substring(0, 8).equals("WOS-HDS-"))
                        {
                            retColor =  armyc2.c2sd.renderer.utilities.Color.GRAY;//0x808080;	// Gray
                        }
                        else
                        {
                            //retColor = Color.YELLOW;//0xffff00;	// Yellow
                            retColor =  armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownGraphicLineColor();
                        }
                        //retColor = armyc2.c2sd.renderer.utilities.Color.YELLOW;//0xffff00;	// Yellow
                    }
                    else
                    {
                        //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//null;//0;//Color.Empty;
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicLineColor();
                    }	// End default

            }	// End else
        }// End if (SymbolUtilities.IsTacticalGraphic(this.SymbolID))
        else
        {
            //stopped doing check because all warfighting
            //should have black for line color.
            //retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyUnitLineColor();

        }	// End else

        return retColor;
    };
    /**
     * Is the fill color used if no fill color has been set. The color is specified based on the affiliation
     * of the symbol and whether it is a unit or not.
     * @param {String} symbolID
     * @returns {armyc2.c2sd.renderer.utilities.Color} hex color like #FFFFFF
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getFillColorOfAffiliation = function(symbolID) {
        var retColor = null,
        basicSymbolID = this.getBasicSymbolIDStrict(symbolID);
        var AffiliationColors = armyc2.c2sd.renderer.utilities.AffiliationColors;

        var switchChar;
        // We can't get the fill color if there is no symbol id, since that also means there is no affiliation
        if((symbolID === null) || (symbolID===("")))
        {
                return retColor;
        }

        if(basicSymbolID===("G*M*NZ----****X") ||//ground zero
            //basicSymbolID===("G*M*NF----****X") || //fallout producing
            basicSymbolID===("G*M*NEB---****X") ||//biological
            basicSymbolID===("G*M*NEC---****X"))//chemical
        {
                retColor = AffiliationColors.UnknownUnitFillColor;//  Color.yellow;
                retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownUnitFillColor();
        }
        else if(this.isTacticalGraphic(symbolID) && !this.isTGSPWithFill(symbolID))
        {
                if(basicSymbolID===("G*M*NZ----****X") ||//ground zero
                //basicSymbolID===("G*M*NF----****X") || //fallout producing
                basicSymbolID===("G*M*NEB---****X") ||//biological
                basicSymbolID===("G*M*NEC---****X"))//chemical
                {
                    //retColor = armyc2.c2sd.renderer.utilities.Color.yellow;
                    retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownUnitFillColor();
                }
                else
                {
                    switchChar = symbolID.charAt(1);
                    if(switchChar===("F") ||
                        switchChar===("A") ||
                        switchChar===("D") ||
                        switchChar===("M"))
                    {
                            //retColor = AffiliationColors.FriendlyGraphicFillColor;//0x00ffff;	// Cyan
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyGraphicFillColor();

                    }
                    else if(switchChar===("H") ||
                        switchChar===("S") ||
                        switchChar===("J") ||
                        switchChar===("K"))
                    {
                            //retColor = AffiliationColors.HostileGraphicFillColor;//0xfa8072;	// Salmon
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getHostileGraphicFillColor();

                    }
                    else if(switchChar===("N") ||
                            switchChar===("L"))
                    {
                            //retColor = AffiliationColors.NeutralGraphicFillColor;//0x7fff00;	// Light Green
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getNeutralGraphicFillColor();

                    }
                    else if(switchChar===("U") ||
                        switchChar===("P") ||
                        switchChar===("O") ||
                        switchChar===("G") ||
                        switchChar===("W"))
                    {
                            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#FFFACD");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(255,250, 205); //0xfffacd;	// LemonChiffon 255 250 205
                    }
                    else
                    {
                            //retColor = AffiliationColors.UnknownGraphicFillColor;
                            retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownGraphicFillColor();
                    }
                }
        }	// End if(this.IsTacticalGraphic(this._strSymbolID))
        else if (basicSymbolID.substring(0,8)===("G*G*GPDB") )//Beach control station series     //20200218 add 
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.RED;
        }
        else if (basicSymbolID.substring(0,8)===("G*G*GPDL") )//Landing Sign series     //20200218 add 
        {
            if ( basicSymbolID === "G*G*GPDLC-****X" || basicSymbolID === "G*G*GPDLW-****X" ) {
                retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;
            }else{
                retColor = armyc2.c2sd.renderer.utilities.Color.NAVY_BLUE;
            }
        }
        else
        {
                switchChar = symbolID.charAt(1);
                if(switchChar===("F") ||
                    switchChar===("A") ||
                    switchChar===("D") ||
                    switchChar===("M"))
                {
                        //retColor = AffiliationColors.FriendlyUnitFillColor;//0x00ffff;	// Cyan
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getFriendlyUnitFillColor();

                }
                else if(switchChar===("H") ||
                    switchChar===("S") ||
                    switchChar===("J") ||
                    switchChar===("K"))
                {
                        //retColor = AffiliationColors.HostileUnitFillColor;//0xfa8072;	// Salmon
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getHostileUnitFillColor();

                }
                else if(switchChar===("N") ||
                        switchChar===("L"))
                {
                        //retColor = AffiliationColors.NeutralUnitFillColor;//0x7fff00;	// Light Green
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getNeutralUnitFillColor();
                }
                else if(switchChar===("U") ||
                    switchChar===("P") ||
                    switchChar===("O") ||
                    switchChar===("G") ||
                    switchChar===("W"))
                {
                        //retColor = AffiliationColors.UnknownUnitFillColor;//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(255,250, 205); //0xfffacd;	// LemonChiffon 255 250 205
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownUnitFillColor();
                }
                else
                {
                        //retColor = AffiliationColors.UnknownUnitFillColor;//null;
                        retColor = armyc2.c2sd.renderer.utilities.SymbolUtilities.rendererSettings.getUnknownUnitFillColor();
                }


        }	// End else


        return retColor;
    };
    /**
     *
     * @param {String} symbolID
     * @returns {armyc2.c2sd.renderer.utilities.Color} hex color like #FFFFFF
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getLineColorOfWeather = function(symbolID){
        var retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//Color.BLACK;
        // Get the basic id
        //String symbolID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);

        if(symbolID === ("WAS-WSGRL-P----") || // Hail - Light not Associated With Thunder
            symbolID === ("WAS-WSGRMHP----") || // Hail - Moderate/Heavy not Associated with Thunder
            symbolID === ("WAS-PL----P----") || // Low Pressure Center - Pressure Systems
            symbolID === ("WAS-PC----P----") || // Cyclone Center - Pressure Systems
            symbolID === ("WAS-WSIC--P----") || // Ice Crystals (Diamond Dust)
            symbolID === ("WAS-WSPLL-P----") || // Ice Pellets - Light
            symbolID === ("WAS-WSPLM-P----") || // Ice Pellets - Moderate
            symbolID === ("WAS-WSPLH-P----") || // Ice Pellets - Heavy
            symbolID === ("WAS-WST-NPP----") || // Thunderstorm - No Precipication
            symbolID === ("WAS-WSTMR-P----") || // Thunderstorm Light to Moderate with Rain/Snow - No Hail
            symbolID === ("WAS-WSTHR-P----") || // Thunderstorm Heavy with Rain/Snow - No Hail
            symbolID === ("WAS-WSTMH-P----") || // Thunderstorm Light to Moderate - With Hail
            symbolID === ("WAS-WSTHH-P----") || // Thunderstorm Heavy - With Hail
            symbolID === ("WAS-WST-FCP----") || // Funnel Cloud (Tornado/Waterspout)
            symbolID === ("WAS-WST-SQP----") || // Squall
            symbolID === ("WAS-WST-LGP----") || // Lightning
            symbolID === ("WAS-WSFGFVP----") || // Fog - Freezing, Sky Visible
            symbolID === ("WAS-WSFGFOP----") || // Fog - Freezing, Sky not Visible
            symbolID === ("WAS-WSTSD-P----") || // Tropical Depression
            symbolID === ("WAS-WSTSS-P----") || // Tropical Storm
            symbolID === ("WAS-WSTSH-P----") || // Hurricane/Typhoon
            symbolID === ("WAS-WSRFL-P----") || // Freezing Rain - Light
            symbolID === ("WAS-WSRFMHP----") || // Freezing Rain - Moderate/Heavy
            symbolID === ("WAS-WSDFL-P----") || // Freezing Drizzle - Light
            symbolID === ("WAS-WSDFMHP----") || // Freezing Drizzle - Moderate/Heavy
            symbolID === ("WOS-HHDMDBP----") || //mine-naval (doubtful)
            symbolID === ("WOS-HHDMDFP----") || // mine-naval (definited)
            symbolID.substring(0,7) === ("WA-DPFW")  ||//warm front
            //symbolID.substring(0,7) === ("WA-DPFS")//stationary front (actually, it's red & blue)
            symbolID === ("WA-DBAIF----A--") || // INSTRUMENT FLIGHT RULE (IFR)
            symbolID === ("WA-DBAFP----A--") || //
            symbolID === ("WA-DBAT-----A--") || //
            symbolID === ("WA-DIPIS---L---") || //
            symbolID === ("WA-DIPTH---L---") || //
            symbolID === ("WA-DWJ-----L---") || // Jet Stream
            symbolID === ("WO-DGMSB----A--") || //
            symbolID === ("WO-DGMRR----A--") ||
            symbolID === ("WO-DGMCH----A--") ||
            symbolID === ("WO-DGMIBE---A--") ||
            symbolID === ("WO-DGMBCC---A--") ||
            symbolID === ("WA--FI---------") )

        {
            retColor = armyc2.c2sd.renderer.utilities.Color.RED;//0xff0000;	// Red
        }
        else if(symbolID === ("WAS-PH----P----") || // High Pressure Center - Pressure Systems
                symbolID === ("WAS-PA----P----")  ||// Anticyclone Center - Pressure Systems
                symbolID === ("WA-DBAMV----A--")  ||// MARGINAL VISUAL FLIGHT RULE (MVFR)
                symbolID === ("WA-DBATB----A--")  ||// BOUNDED AREAS OF WEATHER / TURBULENCE
                symbolID.substring(0,5) === ("WAS-T")  ||// Turbulence
                symbolID.substring(0,7) === ("WA-DPFC") || //cold front
                symbolID === ("WO-DGMIBA---A--") || 
                symbolID === ("WA--FV---------") )
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.BLUE;
        }
        else if(
        symbolID === ("WAS-WSFGPSP----") || // Fog - Shallow Patches
        symbolID === ("WAS-WSFGCSP----") || // Fog - Shallow Continuous
        symbolID === ("WAS-WSFGP-P----") || // Fog - Patchy
        symbolID === ("WAS-WSFGSVP----") || // Fog - Sky Visible
        symbolID === ("WAS-WSFGSOP----") || // Fog - Sky Obscured
        symbolID === ("WA-DBAFG----A--") || // Fog
        symbolID === ("WO-DGMRM----A--") ||
        symbolID === ("WO-DGMCM----A--") ||
        symbolID === ("WO-DGMIBC---A--") ||
        symbolID === ("WO-DGMBCB---A--") ||
        symbolID === ("WO-DGMBTE---A--") ||
        symbolID === ("WAS-WSBR--P----")) // Mist
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.YELLOW;//0xffff00;	// Yellow
        }
        else if(
        symbolID === ("WAS-WSFU--P----") || // Smoke
        symbolID === ("WAS-WSHZ--P----") || // Haze
        symbolID === ("WAS-WSDSLMP----") || // Dust/Sand Storm - Light to Moderate
        symbolID === ("WAS-WSDSS-P----") || // Dust/Sand Storm - Severe
        symbolID === ("WAS-WSDD--P----") || // Dust Devil
        symbolID === ("WA-DBAD-----A--") || // Dust or Sand
        symbolID === ("WAS-WSDB--P----")) // Blowing Dust or Sand
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#A52A2A");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(165,42,42);  //165 42 42 //0xa52a2a;	// Brown
        }
        else if(
        symbolID === ("WA-DBAD-----A--")) // Dust or Sand
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#D6C083");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(214.192.131);  //214 192 131 //0xd6c083;	// Brown
        }
        else if(
        symbolID === ("WA-DBALPNC--A--") || //
        symbolID === ("WA-DBALPC---A--") || //
        symbolID === ("WA-DIPID---L---") || //
        symbolID === ("WO-DGMSIM---A--") || //
        symbolID === ("WO-DGMRS----A--") ||
        symbolID === ("WO-DGMCL----A--") ||
        symbolID === ("WO-DGMIBB---A--") ||
        symbolID === ("WO-DGMBCA---A--") ||
        symbolID === ("WAS-WSR-LIP----") || // Rain - Intermittent Light
        symbolID === ("WAS-WSR-LCP----") || // Rain - Continuous Light
        symbolID === ("WAS-WSR-MIP----") || // Rain - Intermittent Moderate
        symbolID === ("WAS-WSR-MCP----") || // Rain - Continuous Moderate
        symbolID === ("WAS-WSR-HIP----") || // Rain - Intermittent Heavy
        symbolID === ("WAS-WSR-HCP----") || // Rain - Continuous Heavy
        symbolID === ("WAS-WSRSL-P----") || // Rain Showers - Light
        symbolID === ("WAS-WSRSMHP----") || // Rain Showers - Moderate/Heavy
        symbolID === ("WAS-WSRST-P----") || // Rain Showers - Torrential
        symbolID === ("WAS-WSD-LIP----") || // Drizzle - Intermittent Light
        symbolID === ("WAS-WSD-LCP----") || // Drizzle - Continuous Light
        symbolID === ("WAS-WSD-MIP----") || // Drizzle - Intermittent Moderate
        symbolID === ("WAS-WSD-MCP----") || // Drizzle - Continuous Moderate
        symbolID === ("WAS-WSD-HIP----") || // Drizzle - Intermittent Heavy
        symbolID === ("WAS-WSD-HCP----") || // Drizzle - Continuous Heavy
        symbolID === ("WAS-WSM-L-P----") || // Rain or Drizzle and Snow - Light
        symbolID === ("WAS-WSM-MHP----") || // Rain or Drizzle and Snow - Moderate/Heavy
        symbolID === ("WAS-WSMSL-P----") || // Rain and Snow Showers - Light
        symbolID === ("WAS-WSMSMHP----") || // Rain and Snow Showers - Moderate/Heavy
        symbolID === ("WAS-WSS-LIP----") || // Snow - Intermittent Light
        symbolID === ("WAS-WSS-LCP----") || // Snow - Continuous Light
        symbolID === ("WAS-WSS-MIP----") || // Snow - Intermittent Moderate
        symbolID === ("WAS-WSS-MCP----") || // Snow - Continuous Moderate
        symbolID === ("WAS-WSS-HIP----") || // Snow - Intermittent Heavy
        symbolID === ("WAS-WSS-HCP----") || // Snow - Continuous Heavy
        symbolID === ("WAS-WSSBLMP----") || // Blowing Snow - Light/Moderate
        symbolID === ("WAS-WSSBH-P----") || // Blowing Snow - Heavy
        symbolID === ("WAS-WSSG--P----") || // Snow Grains
        symbolID === ("WAS-WSSSL-P----") || // Snow Showers - Light
        symbolID === ("WAS-WSSSMHP----") || // Snow Showers - Moderate/Heavy
        symbolID === ("WAS-WSUKP-P----")) // PRECIPITATION OF UNKNOWN TYPE AND INTENSITY
        {
            //Color.GREEN;// 0x00ff00;	// Green
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#00FF00");
        }
        else if(symbolID === ("WO-DHCF----L---") || // FORESHORE LINE
            symbolID === ("WO-DHCF-----A--")) // FORESHORE AREA
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#ADFF2F");
        }
        else if(symbolID === ("WOS-HDS---P----")|| // Soundings
            symbolID === ("WOS-HHDF--P----")||//foul ground
            symbolID === ("WO-DHHDF----A--")||//foul ground
            symbolID === ("WOS-HPFS--P----")||//fish stakes/traps/weirs
            symbolID === ("WOS-HPFS---L---")||//fish stakes
            symbolID === ("WOS-HPFF----A--")||//fish stakes/traps/weirs
            symbolID === ("WOS-HHDWA-P----")||//Wreck (Uncovers)
            symbolID === ("WOS-HHDE--P----")||//Eddies/Overfalls/Tide rips     
            symbolID === ("WOS-TCCW--P----")||//Water turbulence
            symbolID === ("WO-DHDDL---L---")||//depth curve
            symbolID===("WO-DHDDC---L---")||//depth contour
            symbolID===("WO-DHCC----L---")||//coastline
            symbolID===("WO-DHPBP---L---")||//ports
            symbolID===("WO-DHPMO---L---")||//offshore loading
            symbolID===("WO-DHPSPA--L---")||//sp above water
            symbolID===("WO-DHPSPB--L---")||//sp below water
            symbolID===("WO-DHPSPS--L---")||//sp sea wall
            symbolID===("WO-DHHDK--P----")||//kelp seaweed
            symbolID===("WO-DHHDK----A--")||//kelp seaweed
            symbolID===("WO-DHHDB---L---")||//breakers
            symbolID===("WO-DTCCCFE-L---")||//current flow - ebb
            symbolID===("WO-DTCCCFF-L---")||//current flow - flood
            symbolID===("WOS-TCCTD-P----")||//tide data point
            symbolID === ("WO-DHCW-----A--") ||
            symbolID === ("WO-DMOA-----A--") ||
            symbolID === ("WO-DMPA----L---") ||
            symbolID === ("WO-DHCW-----A--"))//water
            retColor = armyc2.c2sd.renderer.utilities.Color.GRAY;//0x808080;	// Gray
        else if(
                    symbolID === ("WO-DBSM-----A--") ||
                    symbolID === ("WO-DBSF-----A--") ||
                    symbolID === ("WO-DGMN-----A--")) //
        {
                retColor = new armyc2.c2sd.renderer.utilities.Color(230,230,230);//230,230,230;	// light gray
        }
        else if(
                    symbolID === ("WO-DBSG-----A--") ||
                    symbolID === "WO-DBST-----A--") //
        {
                retColor = new armyc2.c2sd.renderer.utilities.Color(169,169,169);//169,169,169;	// dark gray
        }
        else if(
        symbolID === ("WAS-WSVE--P----") || // Volcanic Eruption
        symbolID === ("WAS-WSVA--P----") || // Volcanic Ash
        symbolID === ("WAS-WST-LVP----") || // Tropopause Level
        symbolID === ("WAS-WSF-LVP----")) // Freezing Level

        {
                retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//0x000000;	// Black
        }
        else if(
            symbolID === ("WO-DMCC-----A--") ) // Submerged crib
        {
        retColor = new armyc2.c2sd.renderer.utilities.Color(255,255,255);//255,255,255;	// black
        }
        else if(
        symbolID === ("WOS-HPB-O-P----") || // Berths (Onshore)
        symbolID === ("WOS-HPB-A-P----") || // Berths (Anchor)
        symbolID === ("WOS-HPBA--P----") || // anchorage
        symbolID === ("WOS-HPBA---L---") || // anchorage
        symbolID === ("WOS-HPBA----A--") || // anchorage
        symbolID === ("WOS-HPCP--P----") || // call in point
        symbolID === ("WOS-HPFH--P----") || // fishing harbor
        symbolID === ("WOS-HPML--P----") || // Landing place
        symbolID === ("WOS-HPM-FC-L---") ||//ferry crossing
        symbolID === ("WOS-HABM--P----") ||//marker
        symbolID === ("WOS-HAL---P----") ||//light
        symbolID === ("WA-DIPIT---L---") ||//ISOTACH
        symbolID === ("WOS-TCCTG-P----") || // Tide gauge
        symbolID === ("WO-DL-ML---L---") ||
        symbolID === ("WOS-HPM-FC-L---") ||
        symbolID === ("WO-DL-RA---L---") ||
        symbolID === ("WO-DHPBA---L---") ||
        symbolID === ("WO-DMCA----L---") ||
        symbolID === ("WO-DHPBA----A--") ||
        symbolID === ("WO-DL-MA----A--") ||
        symbolID === ("WO-DL-SA----A--") ||
        symbolID === ("WO-DL-TA----A--") ||
        symbolID === ("WO-DGMSR----A--"))
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#FF00FF");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(255,0,255);//magenta
        }
        else if(symbolID.substring(0,7) === ("WA-DPFO")//occluded front
        )
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#E29FFF");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(226,159,255);//light purple
        }
        else if(
        symbolID === ("WA-DPXITCZ-L---") || // inter-tropical convergance zone oragne?
        symbolID === ("WO-DL-O-----A--") ||
        symbolID === ("WA-DPXCV---L---")) //
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#FF7F00");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(255,127,0);//bright orange
        }
        else if(symbolID ===("WA-DBAI-----A--") || //BOUNDED AREAS OF WEATHER / ICING
                symbolID.indexOf("WAS-IC") === 0 || // Clear Icing
                symbolID.indexOf("WAS-IR") === 0  ||// Rime Icing
                symbolID.indexOf("WAS-IM") === 0) // Mixed Icing
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#806010");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(128,96,16);//mud?
        }
        else if(
        symbolID===("WO-DHCI-----A--") || //Island
        symbolID===("WO-DHCB-----A--") || //Beach
        symbolID===("WO-DHPMO----A--")||//offshore loading"
        symbolID===("WO-DHCI-----A--")) // mixed icing
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString("#D2B06A");//armyc2.c2sd.renderer.utilities.Color.rgbToHexString(210,176,106);//light/soft brown
        }
        else if(symbolID === ("WO-DOBVA----A--")
        )
        {
            retColor = new armyc2.c2sd.renderer.utilities.Color(26,153,77);//dark green
        }
        else if(symbolID === ("WO-DOBVB----A--")
        )
        {
            retColor = new armyc2.c2sd.renderer.utilities.Color(26,204,77);//dark green
        }
        else if(symbolID === ("WO-DGMBTI---A--")
        )
        {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255,48,0);//orange red
        }
        else if(symbolID === ("WO-DGMBTH---A--")
        )
        {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255,80,0);//dark orange
        }
        //255,127,0
        //WO-DGMBTG---A--
        else if (symbolID === ("WO-DGMBTG---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 127, 0);
        }
        //255,207,0
        //WO-DGMBTF---A--
        else if (symbolID === ("WO-DGMBTF---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 207, 0);
        }
        //048,255,0
        //WO-DGMBTA---A--
        else if (symbolID === ("WO-DGMBTA---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(48, 255, 0);
        }
        //220,220,220
        //WO-DGML-----A--
        else if (symbolID === ("WO-DGML-----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(220, 220, 220);
        }
        //255,220,220
        //WO-DGMS-SH--A--
        else if (symbolID === ("WO-DGMS-SH--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 220, 220);
        }
        //255,190,190
        //WO-DGMS-PH--A--
        else if (symbolID === ("WO-DGMS-PH--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 190, 190);
        }
        //lime green 128,255,51
        //WO-DOBVC----A--
        else if (symbolID === ("WO-DOBVC----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(128, 255, 51);
        }
        //255,255,0
        //WO-DOBVE----A--
        else if (symbolID === ("WO-DOBVE----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 255, 0);
        }
        //255,150,150
        //WO-DGMS-CO--A--
        else if (symbolID === ("WO-DGMS-CO--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 150, 150);
        }
        //175,255,0
        //WO-DGMBTC---A--
        else if (symbolID === ("WO-DGMBTC---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(175, 255, 0);
        }
        //207,255,0
        //WO-DGMBTD---A--
        else if (symbolID === ("WO-DGMBTD---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(207, 255, 0);
        }
        //127,255,0
        //WO-DGMBTB---A--
        else if (symbolID === ("WO-DGMBTB---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(127, 255, 0);
        }
        //255,127,0
        //WO-DGMIBD---A--
        else if (symbolID === ("WO-DGMIBD---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 127, 0);
        }
        else if (symbolID === ("WO-DGMSIF---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(25, 255, 230);
        }
        //0,215,255
        //WO-DGMSIVF--A--
        else if (symbolID === ("WO-DGMSIVF--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(0, 215, 255);
        }
        //255,255,220
        //WO-DGMSSVF--A--
        else if (symbolID === ("WO-DGMSSVF--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 255, 220);
        }
        //255,255,140
        //WO-DGMSSF---A--
        else if (symbolID === ("WO-DGMSSF---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 255, 140);
        }
        //255,235,0
        //WO-DGMSSM---A--
        else if (symbolID === ("WO-DGMSSM---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 235, 0);
        }
        //255,215,0
        //WO-DGMSSC---A--
        else if (symbolID === ("WO-DGMSSC---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 215, 0);
        }
        //255,180,0
        //WO-DGMSSVS--A--
        else if (symbolID === ("WO-DGMSSVS--A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 180, 0);
        }
        //200,255,105
        //WO-DGMSIC---A--
        else if (symbolID === ("WO-DGMSIC---A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(200, 255, 105);
        }
        //100,130,255
        //WO-DGMSC----A--
        else if (symbolID === ("WO-DGMSC----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(100, 130, 255);
        }
        //255,77,0
        //WO-DOBVH----A--
        else if (symbolID === ("WO-DOBVH----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 77, 0);
        }
        //255,128,0
        //WO-DOBVG----A--
        else if (symbolID === ("WO-DOBVG----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 128, 0);
        }
        //255,204,0
        //WO-DOBVF----A--
        else if (symbolID === ("WO-DOBVF----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(255, 204, 0);
        }
        //204,255,26
        //WO-DOBVD----A--
        else if (symbolID === ("WO-DOBVD----A--")) {
            retColor = new armyc2.c2sd.renderer.utilities.Color(204, 255, 26);
        }
        else
        {
            retColor = armyc2.c2sd.renderer.utilities.Color.BLACK;//0x000000;	// Black
        }

        return retColor;
    };
    /**
     *
     * @param {String} symbolID
     * @returns {armyc2.c2sd.renderer.utilities.Color} hex color like #FFFFFF
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getFillColorOfWeather = function(symbolID){
        if(symbolID === ("WOS-HPM-R-P----"))//landing ring - brown 148,48,0
            return new armyc2.c2sd.renderer.utilities.Color(148,48,0);
        else if(symbolID === ("WOS-HPD---P----"))//dolphin facilities - brown
            return new armyc2.c2sd.renderer.utilities.Color(148,48,0);
        else if(symbolID === ("WO-DHCB-----A--"))//
            return new armyc2.c2sd.renderer.utilities.Color(249,243,241);
        else if(symbolID === ("WOS-HABB--P----"))//buoy default - 255,0,255
            return new armyc2.c2sd.renderer.utilities.Color(255,0,255);//magenta
        else if(symbolID === ("WOS-HHRS--P----"))//rock submerged - 0,204,255
            return new armyc2.c2sd.renderer.utilities.Color(0,204,255);//a type of blue
        else if(symbolID === ("WOS-HHDS--P----"))//snags/stumps - 0,204,255
            return new armyc2.c2sd.renderer.utilities.Color(0,204,255);
        else if(symbolID === ("WOS-HHDWB-P----"))//wreck - 0,204,255
            return new armyc2.c2sd.renderer.utilities.Color(0,204,255);
        else if(symbolID === ("WOS-TCCTG-P----"))//tide gauge - 210, 176, 106
            return new armyc2.c2sd.renderer.utilities.Color(210,176,106);
        else if(symbolID === ("WO-DHCW-----A--"))//water
            return new armyc2.c2sd.renderer.utilities.Color(188,188,188);
        else if (symbolID === ("WO-DHABP----A--") ||//blue
            symbolID === ("WO-DMCC-----A--")) //SUBMERGED CRIB (blue)
        {
            return new armyc2.c2sd.renderer.utilities.Color(0,0,255);
        }
        else if ((symbolID === "WO-DHHD-----A--") ||//DeepSkyBlue
            symbolID === "WO-DHHDD----A--"  ||//discolored water (DeepSkyBlue)
            symbolID === "WO-DHDDA----A--")//Depth Area
        {
            return new armyc2.c2sd.renderer.utilities.Color(0,191,255);
        }
        else if(symbolID === ("WO-DHPMD----A--"))//drydock
            return new armyc2.c2sd.renderer.utilities.Color(188,153,58);
        else if(symbolID === ("WO-DHCF----L---") || // FORESHORE LINE
            symbolID === ("WO-DHCF-----A--")) // FORESHORE AREA
        {
            return new armyc2.c2sd.renderer.utilities.Color(173,255,47);
        }
        else if(symbolID === ("WA-DPFS----L---") || // Stationary front
            symbolID === ("WA-DPFSU---L---") || // Upper stationary front
            symbolID === ("WA-DPFS-FG-L---") || // Stationary frontogenesis
            symbolID === ("WA-DPFS-FY-L---") || // Stationary frontolysis
            symbolID === ("WA-DPXITD--L---") || // Inter-tropical discontinuity
            symbolID === ("WA-DWSTSWA--A--") )//Tropical storm wind areas and date/Time labels            
        {
            return new armyc2.c2sd.renderer.utilities.Color(255,0,0);
        }
        else if(symbolID === ("WA-DPXITCZ-L---"))// Inter-tropical convergance zone
            return new armyc2.c2sd.renderer.utilities.Color(255,127,0);
        else return null;
    };

    /**
    *
    * @param hexValue - String representing hex value
    * (formatted "0xRRGGBB" i.e. "0xFFFFFF")
    * OR
    * formatted "0xAARRGGBB" i.e. "0x00FFFFFF" for a color with an alpha value
    * I will also put up with "RRGGBB" and "AARRGGBB" without the starting "0x"
    * @return
    */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getColorFromHexString = function(hexValue)
    {
        //var hexOriginal = new String(hexValue);

        var hexAlphabet = "0123456789ABCDEF";

        if(hexValue.charAt(0)==='#')
            hexValue = hexValue.substring(1);
        if(hexValue.substring(0,2)===("0x") || hexValue.substring(0,2)===("0X"))
            hexValue = hexValue.substring(2);

        hexValue = hexValue.toUpperCase();

        var count = hexValue.length,
            value = null,
            k = 0,
            int1 = 0,
            int2 = 0;

        if(count === 8 || count === 6)
        {
            value = [];//int[(count / 2)];
            for(var i=0; i<count;i+=2)
            {
                    int1 = hexAlphabet.indexOf(hexValue.charAt(i));
                    int2 = hexAlphabet.indexOf(hexValue.charAt(i+1));
                    value[k]=(int1 * 16) + int2;
                    k++;
            }

            if(count === 8)
            {
                    return new armyc2.c2sd.renderer.utilities.Color(value[1],value[2],value[3],value[0]);
            }
            else if(count === 6)
            {
                    return new armyc2.c2sd.renderer.utilities.Color(value[0],value[1],value[2]);
            }
        }
        else if (count===11 && hexValue==="TRANSPARENT")
        {
				return new armyc2.c2sd.renderer.utilities.Color(0,0,0,0);
        }
        else
        {
                //ErrorLogger.LogMessage("SymbolUtilties", "getColorFromHexString", "Bad hex value: " + hexOriginal, Level.WARNING);
        }
        return null;
    };



    armyc2.c2sd.renderer.utilities.SymbolUtilities.isBasicShape = function (strSymbolID){
        //var scheme = symbolID.charAt(0);
        var scheme = strSymbolID.charAt(0);
        if(scheme === 'B' || scheme === 'P')
            return true;
        else
            return false
    }

    /**
     * Determines if the symbol is a tactical graphic
     * @param {String} strSymbolID
     * @returns {Boolean} true if symbol starts with "G", or is a weather graphic, or an EMS natural event
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isTacticalGraphic = function (strSymbolID){

        if(strSymbolID &&
                ((strSymbolID.charAt(0)===('G')) || (strSymbolID.charAt(0)===('W'))
                || this.isEMSNaturalEvent(strSymbolID)))
        {
          return true;
        }

        return false;
    };
    /**
     * Determines if symbols is a warfighting symbol.
     * @param {String} strSymbolID
     * @returns {Boolean} True if code starts with "O", "S", or "I". (or "E" in 2525C)
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isWarfighting = function (strSymbolID){

        if(!strSymbolID) // Error handling
        {
          return false;
        }
        var scheme = strSymbolID.charAt(0);
        if((scheme===('O')) || (scheme===('S')) ||
                (scheme===('I')) || (scheme===('E') && strSymbolID[2] !== 'N'))
        {
          return true;
        }

        return false;
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isWeather = function (strSymbolID){

        if(strSymbolID.charAt(0) === ('W'))
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    /**
     *
     * @param {String} text
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isNumber = function (text){
        var n = parseFloat(text);
        if(Number.isNaN)
        {
            return !Number.isNaN(n) && Number.isFinite(n);
        }
        else
        {
            return !isNaN(n) && isFinite(n);
        }
    };
    /**
     * Symbols that don't exist outside of MCS
     * @param {symbolDef} sd
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isMCSSpecificTacticalGraphic = function (sd){


        if(sd !== undefined && sd !== null &&
                sd.hierarchy !== undefined && sd.basicSymbolID !== undefined)
        {
            var hierarchy = sd.hierarchy;
            var basicSymbolID = sd.symbolID;

            if(hierarchy.substring(0,5)===("2.X.7") || //Engineering Overlay graphics (ESRI----)
                hierarchy.substring(0,9)===("2.X.5.2.3") || //Route Critical Points
                basicSymbolID.substring(0,4)===("G*R*") || //Route Critical Points
                hierarchy.substring(0,4)===("21.X") || //JCID (21.X)
                basicSymbolID.substring(0,4)("G*E*"))//MCS Eng (20.X)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    };
    /**
     * Symbols that don't exist outside of MCS
     * or units that are no longer supported like
     * those from the SASO Proposal.
     * @param {unitDef} ud
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isMCSSpecificForceElement = function (ud){
        if(this.isSASO(ud))
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    /**
     * Just checks the symbolID if it could be rendered in 3D.  Does not check
     * for needed modifiers.
     * @param {String} symbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.is3dGraphic = function(symbolID)  {
        var symbolId = symbolID.substring(4, 10);

        if (symbolId === "ACAI--" || // Airspace Coordination Area Irregular
            symbolId === "ACAR--" || // Airspace Coordination Area Rectangular
            symbolId === "ACAC--" || // Airspace Coordination Area Circular
            symbolId === "AKPC--" || // Kill box circular
            symbolId === "AKPR--" || // Kill box rectangular
            symbolId === "AKPI--" || // Kill box irregular
            symbolId === "ALC---" || // Air corridor
            symbolId === "ALM---" || //
            symbolId === "ALS---" || // SAAFR
            symbolId === "ALU---" || // UAV
            symbolId === "ALL---" || // Low level transit route
            symbolId === "AAR---" ||
            symbolId === "AAF---" ||
            symbolId === "AAH---" ||
            symbolId === "AAM---" || // MEZ
            symbolId === "AAML--" || // LOMEZ
            symbolId === "AAMH--")
        {
            return true;
        }
        else
        {
           return false;
        }
    };
    /**
     *
     * @param {String} symbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.is3dAirspace = function(symbolID)  {

        if(symbolID===("CYLINDER-------") ||
            symbolID===("ORBIT----------") ||
            symbolID===("ROUTE----------") ||
            symbolID===("POLYGON--------") ||
            symbolID===("RADARC---------") ||
            symbolID===("POLYARC--------") ||
            symbolID===("CAKE-----------") ||
            symbolID===("TRACK----------") ||
            symbolID===("CURTAIN--------"))
        {
            return true;
        }
        else
        {
           return false;
        }
    };
    /**
     *
     * @param {symbolDef} sd
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isSASO = function (sd){
        var hierarchy = sd.hierarchy;
        if(hierarchy.length >5 &&
                (hierarchy.indexOf("5.X.10") === 0 || //SASOP Individuals
                hierarchy.indexOf("5.X.11") === 0 || //SASOP Organization/groups
                hierarchy.indexOf("5.X.12") === 0 ||//SASOP //replaced by USAS 13-14 update
                hierarchy.indexOf("5.X.13") === 0 || //SASOP Structures
                hierarchy.indexOf("5.X.14") === 0)) //SASOP Equipment/Weapons
         {
             return true;
         }
         else
             return false;
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isMOOTW = function (strSymbolID){

        if(strSymbolID.charAt(0) === ('O'))
        {
          return true;
        }
        else
        {
          return false;
        }
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isSTBOPS = function (strSymbolID){

        if(strSymbolID.substring(0, 1) === ('O'))
        {
          return true;
        }
        else
        {
          return false;
        }
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isEvent = function(strSymbolID)
    {

        var arr = null;
        var category = strSymbolID.charAt(2);
        var strBasicSymbolID = this.getBasicSymbolIDStrict(strSymbolID);
        if(this.isMOOTW(strSymbolID) ||
                (this.isEMS(strSymbolID) &&
                      (category === 'I' || category === 'N' || category === 'O')))
            return true;
        else
        {
            arr = ["S*G*EXI---*****","S*G*EXI---MO***"];
            var arrLength = arr.length;
            for(var i = 0; i < arrLength; i++)
            {
                if(arr[i] === (strBasicSymbolID))
                {
                  return true;
                }
            }
        }

        return false;
    };

    /**
     * Determines if the symbol id passed in contains a flag for one of the
     * various HQ options Pos 11 of the symbol code
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isHQ = function (strSymbolID){

        var hq = strSymbolID.charAt(10);
        var blRetVal = false;
        if(hq !== '-' && hq !== '*')
        {
            blRetVal = (hq===('A')
                        || hq===('B')
                            || hq===('C') || hq===('D'));
        }
        else
        {
            blRetVal = (strSymbolID.charAt(0) === 'S' && strSymbolID.substring(4,6) === "UH");
        }

        return blRetVal;
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
   armyc2.c2sd.renderer.utilities.SymbolUtilities.isTaskForce = function(strSymbolID){

        var tf = strSymbolID.charAt(10);
        // Return whether or not task force is included in the symbol id.
        var blRetVal = (tf===('B')
                            || tf===('D')
                                || tf===('E') || tf===('G'));
        return blRetVal;
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isFeintDummy = function(strSymbolID){

        var fd = strSymbolID.charAt(10);
        // Return whether or not task force is included in the symbol id.
        var blRetVal = (fd===('C')
                            || fd===('D')
                                || fd===('F') || fd===('G'));
        return blRetVal;
    };

    armyc2.c2sd.renderer.utilities.SymbolUtilities.isMobility = function(strSymbolID){

        var mobility = strSymbolID.substring(10, 12);
        if(mobility===("MO") ||
              mobility===("MP") ||
              mobility===("MQ") ||
              mobility===("MR") ||
              mobility===("MS") ||
              mobility===("MT") ||
              mobility===("MU") ||
              mobility===("MV") ||
              mobility===("MW") ||
              mobility===("MX") ||
              mobility===("MY") ||
              mobility===("NS") ||
              mobility===("NL"))
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isObstacle = function(strSymbolID){

          // An Obstacle is denoted by the symbol code "G*M*O"
          // So see if it is a tactical graphic then check to see
          // if we have the M and then the O in the correct position.
          var blRetVal = ((strSymbolID.charAt(0) === ('G')) && ((strSymbolID.charAt(2) === ('M')) && (strSymbolID.charAt(4) === ('O'))));
          return blRetVal;
    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isNBC = function (strSymbolID){

        //var temp = this.getBasicSymbolIDStrict(strSymbolID),
        //var blRetVal = (temp.substring(0, 5) === ("G*M*N"));
        var blRetVal = ((strSymbolID.charAt(0) === ('G')) && ((strSymbolID.charAt(2) === ('M')) && (strSymbolID.charAt(4) === ('N'))));
        return blRetVal;

    };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isDeconPoint = function (strSymbolID){

          var blRetVal = ((this.isNBC(strSymbolID)) && (strSymbolID.substring(4, 6) === ("ND")));
          return blRetVal;
     };
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isCheckPoint = function (strSymbolID){
        var basicID = this.getBasicSymbolIDStrict(strSymbolID);
        var blRetVal = false;
        if(basicID===("G*G*GPPE--****X")//release point
          || basicID===("G*G*GPPK--****X")//check point
          || basicID===("G*G*GPPS--****X"))//start point
        {
          blRetVal = true;
        }
        return blRetVal;
     };
    /**
    * Reads the Symbol ID string and returns the text that represents the echelon
    * code.
    * @param {String} echelon
    * @returns {String}
    */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getEchelonText = function(echelon){

        var text = null;
        if(echelon === ("A"))
        {
            text = String.fromCharCode(216);//Ø
        }
        else if(echelon === ("B"))
        {
            text = String.fromCharCode(8226);//8226
        }
        else if(echelon === ("C"))
        {
            text = String.fromCharCode(8226,8226);//8226
        }
        else if(echelon === ("D"))
        {
            text = String.fromCharCode(8226,8226,8226);//8226
        }
        else if(echelon === ("E"))
        {
            text = "|";
        }
        else if(echelon === ("F"))
        {
            text = "||";
        }
        else if(echelon === ("G"))
        {
            text = "|||";
        }
        else if(echelon === ("H"))
        {
            text = "X";
        }
        else if(echelon === ("I"))
        {
            text = "XX";
        }
        else if(echelon === ("J"))
        {
            text = "XXX";
        }
        else if(echelon === ("K"))
        {
            text = "XXXX";
        }
        else if(echelon === ("L"))
        {
            text = "XXXXX";
        }
        else if(echelon === ("M"))
        {
            text = "XXXXXX";
        }
        else if(echelon === ("N"))
        {
            text = "++";
        }
        return text;
    };
    /**
     *
     * @param {string} strSymbolID
     * @returns {boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isUnit = function (strSymbolID){

          var blRetVal = (((strSymbolID.charAt(0) === ('S')) &&
                                (strSymbolID.charAt(2) === ('G')) &&
                                (strSymbolID.charAt(4) === ('U'))) ||
                                this.isSOF(strSymbolID));
          return blRetVal;

    };
    /**
     *
     *
     * @param {string} strSymbolID
     * @param {number} symStd
     * @returns {boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isTGWithControlPoints = function (strSymbolID, symStd){

        if(symStd!==undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }

        var temp = this.getBasicSymbolIDStrict(strSymbolID);
        var sd = armyc2.c2sd.renderer.utilities.SymbolDefTable.GetSymbolDef(temp,symStd);

        if (sd !== null &&
                sd.getDrawCategory() === armyc2.c2sd.renderer.utilities.SymbolDefTable.DRAW_CATEGORY_ROUTE)
        {
            return true;
        }
        else
        {
          return false;//blRetVal;
        }

    };
    /**
     * There's a handful of single point tactical graphics with unique
     * modifier positions.
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isTGSPWithSpecialModifierLayout = function (strSymbolID){
        var temp = this.getBasicSymbolIDStrict(strSymbolID);

        var blRetVal = (temp === ("G*G*GPH---****X"))//Harbor(General) - center
        || (temp === ("G*G*GPPC--****X")) //Contact Point - center
        || (temp === ("G*G*GPPD--****X"))//Decisions Point - center
        || (temp === ("G*G*GPPW--****X")) //Waypoint - right of center
        || (temp === ("G*G*APP---****X"))//ACP - circle, just below center
        || (temp === ("G*G*APC---****X"))//CCP - circle, just below center
        || (temp === ("G*G*DPT---****X")) //Target Reference - target special
        || (temp === ("G*F*PTS---****X"))//Point/Single Target - target special
        || (temp === ("G*F*PTN---****X"))//Nuclear Target - target special
        || (temp === ("G*F*PCF---****X")) //Fire Support Station - right of center
        || (temp === ("G*M*NZ----****X")) //NUCLEAR DETINATIONS GROUND ZERO
        || (temp === ("G*M*NEB---****X"))//BIOLOGICAL
        || (temp === ("G*M*NEC---****X"))//CHEMICAL
        || (temp === ("G*G*GPRI--****X"))//Point of Interest
        || (temp === ("G*M*OFS---****X"))//Minefield
        || (temp === ("WAS-WSF-LVP----"))//Freezing Level
        || (temp === ("WAS-PLT---P----"))//Tropopause Low
        || (temp === ("WAS-PHT---P----"))//Tropopause High
        || (temp === ("WAS-WST-LVP----"))//Tropopause Level
        //|| (temp === ("WAS-WP----P----"))//Wind plot
        || (temp === ("WA-DWSTSWA--A--"))//Tropical storm wind areas and date/Time labels
        || (temp === ("WA--FI---------"))//Instrument ceiling
        || (temp === ("WA--FV---------"))//Visual ceiling
        || (temp === ("WOS-HDS---P----"));//Soundings
      return blRetVal;
    };
    /**
     * Is a single point tactical graphic that has integral text (like the NBC
     * single points)
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isTGSPWithIntegralText = function (strSymbolID){
         var temp = this.getBasicSymbolIDStrict(strSymbolID);

        // ErrorLogger.LogMessage("SU", "integraltext?", temp);

         var blRetVal = (temp === ("G*G*GPRD--****X"))//DLRP (D)
           || (temp === ("G*G*APU---****X")) //pull-up point (PUP)
           || (temp === ("G*M*NZ----****X")) //Nuclear Detonation Ground Zero (N)
           || (temp === ("G*M*NF----****X"))//Fallout Producing (N)
           || (temp === ("G*M*NEB---****X"))//Release Events Chemical (BIO, B)
           || (temp === ("G*M*NEC---****X"));//Release Events Chemical (CML, C)

         //if(temp === ("G*G*GPRD--****X"))
         //    ErrorLogger.LogMessage("DLRP");

         return blRetVal;//blRetVal;
     };
    /**
     * Is a single point tactical graphic that has integral text (like the NBC
     * single points)
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isTGSPWithFill = function (strSymbolID){
         var temp = this.getBasicSymbolIDStrict(strSymbolID),
         blRetVal = this.isDeconPoint(temp)//Decon Points
          || temp.substring(0,5)===("G*S*P")//TG/combat service support/points
          ||(temp === ("G*G*GPP---****X"))//Action points (general)
          || (temp === ("G*G*GPPK--****X"))//Check Point
          || (temp === ("G*G*GPPL--****X"))//Linkup Point
          || (temp === ("G*G*GPPP--****X"))//Passage Point
          || (temp === ("G*G*GPPR--****X"))//Rally Point
          || (temp === ("G*G*GPPE--****X"))//Release Point
          || (temp === ("G*G*GPPS--****X"))//Start Point
          || (temp === ("G*G*GPPA--****X"))//Amnesty Point
          || (temp === ("G*G*GPPN--****X"))//Entry Control Point
          || (temp === ("G*G*APD---****X"))//Down Aircrew Pickup Point
          || (temp === ("G*G*OPP---****X"))//Point of Departure
          || (temp === ("G*F*PCS---****X"))//Survey Control Point
          || (temp === ("G*F*PCB---****X"))//Firing Point
          || (temp === ("G*F*PCR---****X"))//Reload Point
          || (temp === ("G*F*PCH---****X"))//Hide Point
          || (temp === ("G*F*PCL---****X"))//Launch Point
          || (temp === ("G*M*BCP---****X"))//Engineer Regulating Point
          || (temp === ("G*O*ES----****X"))//Emergency Distress Call
          || (temp === ("G*M*BCC---****X"))//

          //20200116 add  
          || (temp === ("G*G*ASG---****X"))//Cities and landmarks
          || (temp === ("G*O*O-----****X"))//Blasting Point
          //20200123 add 
          || (temp === ("WAS-WP----P----"))//Wind plot

          //20200218 add   
          || (temp.substring(0,8)===("G*G*GPDB"))//Beach control station series     
          || (temp.substring(0,8)===("G*G*GPDL")) //Landing Sign series 
          
          //star
          || (temp.substring(0,9)===("G*G*GPPD-"))//Decision Point

          //circle
          || (temp === ("G*G*GPPO--****X"))//Coordination Point
          || (temp === ("G*G*APP---****X"))//ACP
          || (temp === ("G*G*APC---****X"))//CCP
          || (temp === ("G*G*APU---****X"))//PUP

          //circle with squiggly
          || (temp.substring(0,8)===("G*G*GPUY"))//SONOBUOY and those that fall under it

          //reference point
          || ((temp.substring(0,7)===("G*G*GPR") && temp.charAt(7) !== 'I'))

          //NBC
          || (temp === ("G*M*NEB---****X"))//BIO
          || (temp === ("G*M*NEC---****X")) //CHEM
          || (temp === ("G*M*NF----****X")) //fallout producing
          || (temp === ("G*M*NZ----****X"));//NUC

        return blRetVal;
     };
    /**
     *
     * @param {String} strSymbolID
     * @returns {Boolean}
     */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.hasDefaultFill = function(strSymbolID){
        if(this.isTacticalGraphic(strSymbolID))
        {
                var temp = this.getBasicSymbolIDStrict(strSymbolID);
                //SymbolDef sd = SymbolDefTable.getInstance().getSymbolDef(temp);
                if((temp === ("G*M*NEB---****X"))//BIO
                    || (temp === ("G*M*NEC---****X")) //CHEM
                   // || (temp === ("G*M*NF----****X")) //fallout producing
                    || (temp === ("G*M*NZ----****X"))//NUC)
                    || temp.substring(0,8)===("G*G*GPDB")//Beach control station series
                    || temp.substring(0,8)===("G*G*GPDL"))//Landing Sign series
                {
                    return true;
                }
                else
                    return false;
        }
        else
            return true;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {String}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.getTGFillSymbolCode = function (strSymbolID){
        var temp = this.getBasicSymbolIDStrict(strSymbolID);
        if(temp === ("G*M*NEB---****X"))
            return "NBCBIOFILL****X";
        if(temp === ("G*M*NEC---****X"))
            return "NBCCMLFILL****X";
        if(temp === ("G*M*NZ----****X") || temp === ("G*M*NF----****X"))
            return "NBCNUCFILL****X";
        if(temp.substring(0,8)===("G*G*GPUY"))
            return "SONOBYFILL****X";
        if((temp === ("G*G*GPPO--****X"))//Coordination Point
            || (temp === ("G*G*APP---****X"))//ACP
            || (temp === ("G*G*APC---****X"))//CCP
            || (temp === ("G*G*APU---****X")))//PUP)
        {
            return "CPOINTFILL****X";
        }
        if(this.isDeconPoint(temp)//Decon Points
            || temp.substring(0,5)===("G*S*P")//TG/combat service support/points
            || (temp === ("G*G*GPP---****X"))//Action points (general)
            || (temp === ("G*G*GPPK--****X"))//Check Point
            || (temp === ("G*G*GPPL--****X"))//Linkup Point
            || (temp === ("G*G*GPPP--****X"))//Passage Point
            || (temp === ("G*G*GPPR--****X"))//Rally Point
            || (temp === ("G*G*GPPE--****X"))//Release Point
            || (temp === ("G*G*GPPS--****X"))//Start Point
            || (temp === ("G*G*GPPA--****X"))//Amnesty Point
            || (temp === ("G*G*APD---****X"))//Down Aircrew Pickup Point
            || (temp === ("G*G*OPP---****X"))//Point of Departure
            || (temp === ("G*F*PCS---****X"))//Survey Control Point
            || (temp === ("G*F*PCB---****X"))//Firing Point
            || (temp === ("G*F*PCR---****X"))//Reload Point
            || (temp === ("G*F*PCH---****X"))//Hide Point
            || (temp === ("G*F*PCL---****X"))//Launch Point
            || (temp === ("G*G*GPPN--****X"))//Entry Control Point
            || (temp === ("G*O*ES----****X"))//Emergency Distress Call
            || (temp === ("G*M*BCC---****X"))//  
            || (temp === ("G*M*BCP---****X")))//Engineer Regulating Point
        {
            return "CHKPNTFILL****X";
        }
        if(temp.substring(0,7)===("G*G*GPR") && temp.charAt(7) !== 'I')
        {
            return "REFPNTFILL****X";
        }
        if(temp.substring(0,8)===("G*G*GPPD"))
        {
            return "DECPNTFILL****X";
        }
        //20200116 add  
        if (temp === ("G*G*ASG---****X")) {//Cities and landmarks
            return "RCTNGLFILL****X";    
        }
        if (temp === ("G*O*O-----****X")) {//Blasting Point
            return "BLSTNGFILL****X";
        }
        //20200123 add  
        if (temp === ("WAS-WP----P----")) {//Wind plot
            return "WINDFILL****X";
        }

        //20200218 add  
        if (temp === ("G*G*GPDBL-****X")) {//Beach Sign(left) 
            return "BEACHSIGNLFILL****X";
        }
        //20200218 add  
        if (temp === ("G*G*GPDBC-****X")) {//Beach Sign(center) 
            return "BEACHSIGNCFILL****X";
        }
        //20200218 add  
        if (temp === ("G*G*GPDBR-****X")) {//Beach Sign(right) 
            return "BEACHSIGNRFILL****X";
        }
        //20200218 add  
        if (temp === ("G*G*GPDLA-****X")) {//Landing Sign(Class 1)
            return "LANDINGSIGNC10FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLC-****X")) {//Landing Sign(Class 3)
            return "LANDINGSIGNC30FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLE-****X")) {//Landing Sign(Class 5)
            return "LANDINGSIGNC50FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLH-****X")) {//Landing Sign(Class 8)
            return "LANDINGSIGNC80FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLW-****X")) {//Landing Sign(Drinking Water)
            return "LANDINGSIGNDW0FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLM-****X")) {//Landing Sign(Motor)
            return "LANDINGSIGNMO0FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLO-****X")) {//Landing Sign(Orbit)
            return "LANDINGSIGNOR0FILL****X";
        }
        //20200219 add  
        if (temp === ("G*G*GPDLJ-****X")) {//Landing Sign(Class 10)
            return "LANDINGSIGNC100FILL****X";
        }
        
        return null;
     };
     /**
      * // 20200219 multi color
      * @param {String} strSymbolID
      * @param {String} idx
      * @returns {String}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.getTGFillSymbolCodeN = function (strSymbolID, idx){
        var temp = this.getBasicSymbolIDStrict(strSymbolID);
        if(temp === ("G*G*GPDLA-****X"))    // 2.2.1.1.11.2.1
            return "LANDINGSIGNC11FILL****X";
        if(temp === ("G*G*GPDLC-****X"))    // 2.2.1.1.11.2.2
            return "LANDINGSIGNC31FILL****X";
        if(temp === ("G*G*GPDLE-****X"))    // 2.2.1.1.11.2.3
            return "LANDINGSIGNC51FILL****X";
        if(temp === ("G*G*GPDLH-****X"))    // 2.2.1.1.11.2.4
            return "LANDINGSIGNC81FILL****X";
        if(temp === ("G*G*GPDLW-****X"))    // 2.2.1.1.11.2.5
            return "LANDINGSIGNDW1FILL****X";
        if(temp === ("G*G*GPDLO-****X"))    // 2.2.1.1.11.2.7
            return "LANDINGSIGNOR1FILL****X";
        if(temp === ("G*G*GPDLJ-****X")) {    // 2.2.1.1.11.2.8
            if ( idx === 1 ) {
                return "LANDINGSIGNC101FILL****X";
            }else if ( idx === 2 ) {
                return "LANDINGSIGNC102FILL****X";
            }else {
                return "LANDINGSIGNC103FILL****X";
            }
        }        
        return null;
     };
     /**
      *
      * @param {String} symbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isWeatherSPWithFill = function (symbolID){
        if(symbolID===("WOS-HPM-R-P----") ||//landing ring - brown 148,48,0
            symbolID===("WOS-HPD---P----")||//dolphin facilities - brown
            symbolID===("WOS-HABB--P----")||//buoy default - 255,0,255
            symbolID===("WOS-HHRS--P----")||//rock submerged - 0,204,255
            symbolID===("WOS-HHDS--P----")||//snags/stumps - 0,204,255
            symbolID===("WOS-HHDWB-P----")||//wreck - 0,204,255
            symbolID===("WOS-TCCTG-P----"))//tide gauge - 210, 176, 106
             return true;
         else
             return false;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isSOF = function (strSymbolID){
       try
       {
         var blRetVal = ((strSymbolID.charAt(0)===('S')) && (strSymbolID.charAt(2)===('F')));
         return blRetVal;
       }
       catch(t)
       {
         //System.out.println(t);
       }
       return false;
     };
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isSonobuoy = function (strSymbolID){

        var basic = this.getBasicSymbolIDStrict(strSymbolID);
        var blRetVal = (basic.substring(0, 8)==="G*G*GPUY");
        return blRetVal;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isSeaSurface = function (strSymbolID){

        var blRetVal = ((strSymbolID.charAt(0)===('S')) && (strSymbolID.charAt(2)===('S')));
        return blRetVal;

     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isSubSurface = function (strSymbolID){
            var blRetVal = ((strSymbolID.charAt(0)===('S')) && (strSymbolID.charAt(2)===('U')));
            return blRetVal;
     };
     /**
      * Returns true if the symbol id is an Equipment Id (S*G*E).
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEquipment = function (strSymbolID){

        var blRetVal = ((strSymbolID.charAt(0) === ('S')) &&
        (strSymbolID.charAt(2) === ('G')) &&
        (strSymbolID.charAt(4) === ('E')));
         // || isEMSEquipment(strSymbolID); //uncomment when supporting 2525C
         return blRetVal;

     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEMSEquipment = function (strSymbolID){
        var basicCode = this.getBasicSymbolIDStrict(strSymbolID),
        blRetVal = false;

        if(strSymbolID.charAt(0)==='E')
        {
            if(basicCode === ("E*O*AB----*****") || //equipment
                    basicCode === ("E*O*AE----*****") ||//ambulance
                    basicCode === ("E*O*AF----*****") ||//medivac helicopter
                    basicCode === ("E*O*BB----*****") ||//emergency operation equipment
                    basicCode === ("E*O*CB----*****") ||//fire fighting operation equipment
                    basicCode === ("E*O*CC----*****") ||//fire hydrant
                    basicCode === ("E*O*DB----*****") ||//law enforcement operation equipment
                    //equipment for different service departments
                    (basicCode.substring(0,5) === ("E*O*D") && basicCode.indexOf("B---*****")>0) ||
                    //different sensor types
                    (basicCode.substring(0,5) === ("E*O*E") && basicCode.indexOf("----*****")>0) ||
                    basicCode === ("E*F*BA----*****") ||//ATM
                    basicCode === ("E*F*LF----*****") ||//Heli Landing site
                    basicCode === ("E*F*MA----*****") ||//control valve
                    basicCode === ("E*F*MC----*****"))// ||//discharge outfall
            {
                blRetVal = true;
            }
        }
        return blRetVal;

     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEMS = function (strSymbolID){
          return (strSymbolID[0]==='E');
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEMSNaturalEvent = function (strSymbolID){
          return (strSymbolID.charAt(0)==='E' && strSymbolID.charAt(2)==='N');
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEMSIncident = function (strSymbolID){
          return (strSymbolID.charAt(0)==='E' && strSymbolID.charAt(2)==='I');
     };
          /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isEMSInstallation = function (strSymbolID){
         var blRetVal = false;
        if(strSymbolID.charAt(0)==='E')
        {
            if(strSymbolID.charAt(2)==='O' &&
                    strSymbolID.charAt(4)==='D' && (strSymbolID.charAt(6)==='C' || strSymbolID.charAt(5)==='K'))
            {
                blRetVal = true;
            }
            else if(strSymbolID.charAt(2)==='F' &&
                    strSymbolID.substring(4, 6) !== "BA")
            {
                blRetVal = true;
            }
            else if(strSymbolID.charAt(2)==='O')
            {
                if(strSymbolID.charAt(4)==='A')
                {
                    switch(strSymbolID.charAt(5))
                    {
                        case 'C':
                        case 'D':
                        case 'G':
                        case 'J':
                        case 'K':
                        case 'L':
                        case 'M':
                            blRetVal = true;
                            break;
                        default:
                            break;
                    }
                }
                else if(strSymbolID.charAt(4)=='B')
                {
                    switch(strSymbolID.charAt(5))
                    {
                        case 'C':
                        case 'E':
                        case 'F':
                        case 'G':
                        case 'H':
                        case 'I':
                        case 'K':
                        case 'L':
                            blRetVal = true;
                            break;
                        default:
                            break;
                    }
                }
                else if(strSymbolID.charAt(4)=='C')
                {
                    switch(strSymbolID.charAt(5))
                    {
                        case 'D':
                        case 'E':
                            blRetVal = true;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        return blRetVal;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isInstallation = function (strSymbolID){
        var blRetVal = false;
        if(strSymbolID.charAt(0)==='S')
        {
            blRetVal = (strSymbolID.charAt(2)==='G') && (strSymbolID.charAt(4)==='I');
        }
        else if(strSymbolID.charAt(0)===('E'))
        {
            blRetVal = this.isEMSInstallation(strSymbolID);
        }
        return blRetVal;
    };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isSIGINT = function (strSymbolID){
          var blRetVal = ((strSymbolID.charAt(0)===('I')));
          return blRetVal;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.isFeintDummyInstallation = function (strSymbolID){

        var blRetVal = (strSymbolID.charAt(10)===('H') && strSymbolID.charAt(11)===('B'));
        return blRetVal;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.hasInstallationModifier = function (strSymbolID){

          var blRetVal = (strSymbolID.charAt(10)===('H'));
          return blRetVal;
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {String}
      */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getAffiliation = function (strSymbolID){

            return strSymbolID.charAt(1);
     };
     /**
      *
      * @param {String} strSymbolID
      * @returns {String}
      */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.getStatus = function (strSymbolID){
            return strSymbolID.charAt(3);
     };
     /**
      * Gets the Echelon character from the symbolID string
      * @param {String} strSymbolID
      * @returns {String} the echelon character.
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.getEchelon = function (strSymbolID){
            return strSymbolID.charAt(11);
     };
     /**
      *
      * @param {String} symbolID
      * @param {Number} symStd
      * @returns {String}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.getUnitAffiliationModifier = function (symbolID, symStd){
        var textChar = null,
        affiliation = null;

        if(symStd===undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }
        affiliation = symbolID.charAt(1);

        if(affiliation===('F') ||
            affiliation===('H') ||
            affiliation===('U') ||
            affiliation===('N') ||
            affiliation===('P'))
        {
                //return null;
                textChar=null;
        }
        else if(affiliation===('A') ||
                affiliation===('S'))
        {
            if(symStd===armyc2.c2sd.renderer.utilities.RendererSettings.Symbology_2525B)
                textChar = "?";
            else
                textChar=null;
        }
        else if(affiliation===('J'))
            textChar = "J";
        else if(affiliation===('K'))
            textChar = "K";
        else if(affiliation===('D') ||
                affiliation===('L') ||
                affiliation===('G') ||
                affiliation===('W'))
            textChar = "X";
        else if(affiliation===('M'))
        {
            if(symStd===armyc2.c2sd.renderer.utilities.RendererSettings.Symbology_2525B)
                textChar = "X?";
            else
                textChar = "X";
        }

        //check sea mine symbols
        if(symStd===armyc2.c2sd.renderer.utilities.RendererSettings.Symbology_2525C)
        {
            if(symbolID.charAt(4)==='W' && symbolID.charAt(0)==='S' && symbolID.charAt(5)==='M')//&& symbolID.substring(4,6)=="WM")
            {//various sea mine exercises
                var temp = symbolID.substring(6,8);
                if(temp==="GX" ||
                        temp==="MX" ||
                        temp==="FX" ||
                        temp==="SX" ||
                        temp.charAt(0)==="X")
                    textChar = "X";
                else
                    textChar=null;
            }
        }

        return textChar;
     };

     /**
      *
      * @param {String} symbolID
      * @param {Number} symStd
      * @returns {Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.hasAMmodifierWidth = function (symbolID, symStd){
        var sd = null,
            returnVal = false,
            basic = this.getBasicSymbolIDStrict(symbolID);

        if(symStd === undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }

        var SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable;
        basic = this.getBasicSymbolIDStrict(symbolID);
        sd = SymbolDefTable.getSymbolDef(basic, symStd);
        if(sd !== null)
        {
            var dc = sd.drawCategory;

            switch(dc)
            {
                case SymbolDefTable.DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE:  //width
                case SymbolDefTable.DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE:
                case SymbolDefTable.DRAW_CATEGORY_TWO_POINT_RECT_PARAMETERED_AUTOSHAPE:
                    returnVal = true;
                    break;
				case SymbolDefTable.DRAW_CATEGORY_LINE:
						if(sd.modifiers.indexOf(armyc2.c2sd.renderer.utilities.ModifiersTG.AM_DISTANCE + ".") > -1)
							returnVal = true;
						break;
                default:
                    returnVal = false;
            }
        }

        return returnVal;
     };
     /**
      *
      * @param {type} symbolID
      * @param {type} symStd
      * @returns {armyc2.c2sd.renderer.utilities.SymbolUtilities.hasAMmodifierRadius.returnVal|Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.hasAMmodifierRadius = function (symbolID, symStd){
        var sd = null,
            returnVal = false,
            basic = this.getBasicSymbolIDStrict(symbolID);

        if(symStd === undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }

        var SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable;
        basic = this.getBasicSymbolIDStrict(symbolID);
        sd = SymbolDefTable.getSymbolDef(basic, symStd);
        if(sd !== null)
        {
            var dc = sd.drawCategory;

            switch(dc)
            {
                case SymbolDefTable.DRAW_CATEGORY_CIRCULAR_PARAMETERED_AUTOSHAPE://radius
                case SymbolDefTable.DRAW_CATEGORY_CIRCULAR_RANGEFAN_AUTOSHAPE:
                    returnVal = true;
                    break;
                default:
                    returnVal = false;
            }
        }

        return returnVal;
     };
     /**
      *
      * @param {type} symbolID
      * @param {type} symStd
      * @returns {armyc2.c2sd.renderer.utilities.SymbolUtilities.hasANmodifier.returnVal|Boolean}
      */
     armyc2.c2sd.renderer.utilities.SymbolUtilities.hasANmodifier = function (symbolID, symStd){
        var sd = null,
            returnVal = false,
            basic = this.getBasicSymbolIDStrict(symbolID);

        if(symStd === undefined)
        {
            symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
        }

        var SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable;
        basic = this.getBasicSymbolIDStrict(symbolID);
        sd = SymbolDefTable.getSymbolDef(basic, symStd);
        if(sd !== null)
        {
            var dc = sd.drawCategory;

            switch(dc)
            {
                case SymbolDefTable.DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE:
                case SymbolDefTable.DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE:
                    returnVal = true;
                    break;
                default:
                    returnVal = false;
            }
        }

        return returnVal;
     };


    /**
     * Checks if symbol is a multipoint symbol
     * @param {type} symbolID
     * @param {type} symStd
     * @returns {Boolean}
     * @deprecated use armyc2.c2sd.renderer.utilities.SymbolDefTable.isMultiPoint
     */
    armyc2.c2sd.renderer.utilities.SymbolUtilities.isMultiPoint = function (symbolID, symStd) {

        return armyc2.c2sd.renderer.utilities.SymbolDefTable.isMultiPoint(symbolID, symStd);

    };
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/**
 * 
 * @param {String} basicSymbolID
 * @param {String} description
 * @param {Number} mappingP
 * @param {Number} mappingA
 * @param {Number} width
 * @param {Number} height
 * @returns {SinglePointLookupInfo}
 */
armyc2.c2sd.renderer.utilities.SinglePointLookupInfo = function (basicSymbolID, description, 
                            mappingP, mappingA,width,height){
    var _SymbolID = basicSymbolID,
        _Description = description,
        _mappingP = mappingP,
        _mappingA = mappingA,
        _width = width,
        _height = height;


    /**
    * 
    * @returns {String}
    */
   this.getBasicSymbolIDStrict = function(){
       return _SymbolID;
   };
   /**
    * 
    * @returns {String}
    */
   this.getDescription = function(){
       return _Description;
   };
   /**
    * 
    * @returns {Number}
    */
   this.getMappingA = function(){
       return _mappingA;
   };
   /**
    * 
    * @returns {Number}
    */
   this.getMappingP = function(){
       return _mappingP;
   };
   /**
    * 
    * @returns {Number}
    */
   this.getWidth = function(){
       return _width;
   };
   /**
    * 
    * @returns {Number}
    */
   this.getHeight = function(){
       return _height;
   };
};var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/**
 * 
 * @param {String} basicSymbolID
 * @param {String} description
 * @param {Number} mapping1U
 * @param {Number} mapping1F
 * @param {Number} mapping1N
 * @param {Number} mapping1H
 * @param {String} mapping1Color like "#0000FF" for blue
 * @param {Number} mapping2
 * @param {String} mapping2Color like "#FF0000" for red
 * @returns {undefined}
 */
armyc2.c2sd.renderer.utilities.UnitFontLookupInfo = function (basicSymbolID, description, 
                                    mapping1U, mapping1F,mapping1N, mapping1H,
                                    mapping1Color, mapping2, mapping2Color){
                                        
    var _SymbolID = basicSymbolID,
        _Description = description,
        _mapping1U = mapping1U,
        _mapping1F = mapping1F,
        _mapping1N = mapping1N,
        _mapping1H = mapping1H,
        _mapping1Color = mapping1Color,
        _mapping2 = mapping2,
        _mapping2Color = mapping2Color;

    /**
    * 
    * @returns {String}
    */
   this.getBasicSymbolID = function(){
       return _SymbolID;
   };
   /**
    * 
    * @returns {String}
    */
   this.getDescription = function(){
       return _Description;
   };
   /**
    * 
    * @param {String} symbolID
    * @returns {Number}
    */
   this.getMapping1 = function(symbolID){
         var affiliation = symbolID.charAt(1);
         if(affiliation === 'F' ||
                           affiliation === 'A' ||
                           affiliation === 'D' ||
                           affiliation === 'M' ||
                           affiliation === 'J' ||
                           affiliation === 'K')
             return _mapping1F;
         else if(affiliation === 'H' || affiliation === 'S')
             return _mapping1H;
         if(affiliation === 'N' || affiliation === 'L')
             return _mapping1N;
         else /*(affiliation == 'P' ||
                      affiliation == 'U' ||
                      affiliation == 'G' ||
                      affiliation == 'W')*/
            return _mapping1U;
   };
   /**
    * 
    * @returns {Number}
    */
   this.getMapping2 = function(){
       return _mapping2;
   };
   /**
    * 
    * @returns {String}
    */
   this.getColor1 = function(){
       return _mapping1Color;
   };
   /**
    * 
    * @returns {String}
    */
   this.getColor2 = function(){
       return _mapping2Color;
   };
};
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.TacticalGraphicLookup = (function () {
    var symbols = null,
    symbolMap = null,
    parser,
    spMappingXml = {
  "TACTICALGRAPHICS": {
    "SYMBOL": [
      {
        "ID": "G*T*B-----****X",
        "M": "2001",
      },
      {
        "ID": "G*T*H-----****X",
        "M": "2002",
      },
      {
        "ID": "G*T*Y-----****X",
        "M": "2003",
      },
      {
        "ID": "G*T*C-----****X",
        "M": "2004",
      },
      {
        "ID": "G*T*X-----****X",
        "M": "2005",
      },
      {
        "ID": "G*T*J-----****X",
        "M": "2006",
      },
      {
        "ID": "G*T*K-----****X",
        "M": "2007",
      },
      {
        "ID": "G*T*KF----****X",
        "M": "2008",
      },
      {
        "ID": "G*T*L-----****X",
        "M": "2009",
      },
      {
        "ID": "G*T*T-----****X",
        "M": "2011",
      },
      {
        "ID": "G*T*F-----****X",
        "M": "2012",
      },
      {
        "ID": "G*T*A-----****X",
        "M": "2013",
      },
      {
        "ID": "G*T*AS----****X",
        "M": "2014",
      },
      {
        "ID": "G*T*E-----****X",
        "M": "2016",
      },
      {
        "ID": "G*T*O-----****X",
        "M": "2018",
      },
      {
        "ID": "G*T*P-----****X",
        "M": "2019",
      },
      {
        "ID": "G*T*R-----****X",
        "M": "2020",
      },
      {
        "ID": "G*T*Q-----****X",
        "M": "2021",
      },
      {
        "ID": "G*T*M-----****X",
        "M": "2022",
      },
      {
        "ID": "G*T*S-----****X",
        "M": "2023",
      },
      {
        "ID": "G*T*US----****X",
        "M": "2024",
      },
      {
        "ID": "G*T*UG----****X",
        "M": "2025",
      },
      {
        "ID": "G*T*UC----****X",
        "M": "2026",
      },
      {
        "ID": "G*T*Z-----****X",
        "M": "2027",
      },
      {
        "ID": "G*T*W-----****X",
        "M": "2028",
      },
      {
        "ID": "G*T*WP----****X",
        "M": "2029",
      },
      {
        "ID": "G*T*V-----****X",
        "M": "2016",
      },
      {
        "ID": "G*T*2-----****X",
        "M": "2016",
      },
      {
        "ID": "G*G*GLB---****X",
        "M": "2030",
      },
      {
        "ID": "G*G*GLF---****X",
        "M": "2031",
      },
      {
        "ID": "G*G*GLC---****X",
        "M": "2032",
      },
      {
        "ID": "G*G*GLP---****X",
        "M": "2033",
      },
      {
        "ID": "G*G*GLL---****X",
        "M": "2034",
      },
      {
        "ID": "G*G*GAG---****X",
        "M": "2035",
      },
      {
        "ID": "G*G*GAA---****X",
        "M": "2036",
      },
      {
        "ID": "G*G*GAE---****X",
        "M": "2037",
      },
      {
        "ID": "G*G*GAF---****X",
        "M": "2038",
      },
      {
        "ID": "G*G*GAD---****X",
        "M": "2039",
      },
      {
        "ID": "G*G*GAX---****X",
        "M": "2040",
      },
      {
        "ID": "G*G*GAL---****X",
        "M": "2041",
      },
      {
        "ID": "G*G*GAP---****X",
        "M": "2042",
      },
      {
        "ID": "G*G*GAS---****X",
        "M": "2043",
      },
      {
        "ID": "G*G*GAY---****X",
        "M": "2044",
      },
      {
        "ID": "G*G*GAZ---****X",
        "M": "2045",
      },
      {
        "ID": "G*G*ALC---****X",
        "M": "2046",
      },
      {
        "ID": "G*G*ALM---****X",
        "M": "2047",
      },
      {
        "ID": "G*G*ALS---****X",
        "M": "2048",
      },
      {
        "ID": "G*G*ALU---****X",
        "M": "2049",
      },
      {
        "ID": "G*G*ALL---****X",
        "M": "2050",
      },
      {
        "ID": "G*G*AAR---****X",
        "M": "2051",
      },
      {
        "ID": "G*G*AAF---2525C",
        "M": "2052",
      },
      {
        "ID": "G*G*AAF---****X",
        "M": "2053",
      },
      {
        "ID": "G*G*AAH---****X",
        "M": "2054",
      },
      {
        "ID": "G*G*AAM---****X",
        "M": "2055",
      },
      {
        "ID": "G*G*AAML--****X",
        "M": "2056",
      },
      {
        "ID": "G*G*AAMH--****X",
        "M": "2057",
      },
      {
        "ID": "G*G*AAW---****X",
        "M": "2058",
      },
      {
        "ID": "G*G*PD----****X",
        "M": "2059",
      },
      {
        "ID": "G*G*PA----****X",
        "M": "2060",
      },
      {
        "ID": "G*G*PF----****X",
        "M": "2061",
      },
      {
        "ID": "G*G*PM----****X",
        "M": "2062",
      },
      {
        "ID": "G*G*PY----****X",
        "M": "2063",
      },
      {
        "ID": "G*G*PC----****X",
        "M": "2064",
      },
      {
        "ID": "G*G*DLF---****X",
        "M": "2065",
      },
      {
        "ID": "G*G*DLP---****X",
        "M": "2066",
      },
      {
        "ID": "G*G*DAB---****X",
        "M": "2067",
      },
      {
        "ID": "G*G*DABP--****X",
        "M": "2068",
      },
      {
        "ID": "G*G*DAE---****X",
        "M": "2069",
      },
      {
        "ID": "G*G*OLAV--****X",
        "M": "2070",
      },
      {
        "ID": "G*G*OLAA--****X",
        "M": "2071",
      },
      {
        "ID": "G*G*OLAR--****X",
        "M": "2072",
      },
      {
        "ID": "G*G*OLAGM-****X",
        "M": "2073",
      },
      {
        "ID": "G*G*OLAGS-****X",
        "M": "2074",
      },
      {
        "ID": "G*G*OLKA--****X",
        "M": "2075",
      },
      {
        "ID": "G*G*OLKGM-****X",
        "M": "2076",
      },
      {
        "ID": "G*G*OLKGS-****X",
        "M": "2077",
      },
      {
        "ID": "G*G*OLF---****X",
        "M": "2078",
      },
      {
        "ID": "G*G*OLI---****X",
        "M": "2079",
      },
      {
        "ID": "G*G*OLL---****X",
        "M": "2080",
      },
      {
        "ID": "G*G*OLT---****X",
        "M": "2081",
      },
      {
        "ID": "G*G*OLC---****X",
        "M": "2082",
      },
      {
        "ID": "G*G*OLP---****X",
        "M": "2083",
      },
      {
        "ID": "G*G*OAA---****X",
        "M": "2084",
      },
      {
        "ID": "G*G*OAK---****X",
        "M": "2085",
      },
      {
        "ID": "G*G*OAF---****X",
        "M": "2086",
      },
      {
        "ID": "G*G*OAS---****X",
        "M": "2087",
      },
      {
        "ID": "G*G*OAO---****X",
        "M": "2088",
      },
      {
        "ID": "G*G*OAP---****X",
        "M": "2089",
      },
      {
        "ID": "G*G*SLA---****X",
        "M": "2090",
      },
      {
        "ID": "G*G*SLH---****X",
        "M": "2091",
      },
      {
        "ID": "G*G*SLR---****X",
        "M": "2092",
      },
      {
        "ID": "G*G*SLB---****X",
        "M": "2093",
      },
      {
        "ID": "G*G*SAO---****X",
        "M": "2094",
      },
      {
        "ID": "G*G*SAA---****X",
        "M": "2095",
      },
      {
        "ID": "G*G*SAE---****X",
        "M": "2096",
      },
      {
        "ID": "G*G*SAN---****X",
        "M": "2097",
      },
      {
        "ID": "G*G*SAT---****X",
        "M": "2098",
      },
      {
        "ID": "G*M*OGB---****X",
        "M": "2099",
      },
      {
        "ID": "G*M*OGL---****X",
        "M": "2100",
      },
      {
        "ID": "G*M*OGZ---****X",
        "M": "2101",
      },
      {
        "ID": "G*M*OGF---****X",
        "M": "2102",
      },
      {
        "ID": "G*M*OGR---****X",
        "M": "2103",
      },
      {
        "ID": "G*M*OS----****X",
        "M": "2104",
      },
      {
        "ID": "G*M*OADU--****X",
        "M": "2105",
      },
      {
        "ID": "G*M*OADC--****X",
        "M": "2106",
      },
      {
        "ID": "G*M*OAR---****X",
        "M": "2107",
      },
      {
        "ID": "G*M*OAW---****X",
        "M": "2108",
      },
      {
        "ID": "G*M*OMC---****X",
        "M": "2109",
      },
      {
        "ID": "G*M*OFD---****X",
        "M": "2110",
      },
      {
        "ID": "G*M*OFG---****X",
        "M": "2111",
      },
      {
        "ID": "G*M*OFA---****X",
        "M": "2112",
      },
      {
        "ID": "G*M*OEB---****X",
        "M": "2113",
      },
      {
        "ID": "G*M*OEF---****X",
        "M": "2114",
      },
      {
        "ID": "G*M*OET---****X",
        "M": "2115",
      },
      {
        "ID": "G*M*OED---****X",
        "M": "2116",
      },
      {
        "ID": "G*M*OU----****X",
        "M": "2117",
      },
      {
        "ID": "G*M*ORP---****X",
        "M": "2118",
      },
      {
        "ID": "G*M*ORS---****X",
        "M": "2119",
      },
      {
        "ID": "G*M*ORA---****X",
        "M": "2120",
      },
      {
        "ID": "G*M*ORC---****X",
        "M": "2121",
      },
      {
        "ID": "G*M*OT----****X",
        "M": "2122",
      },
      {
        "ID": "G*M*OWU---****X",
        "M": "2123",
      },
      {
        "ID": "G*M*OWS---****X",
        "M": "2124",
      },
      {
        "ID": "G*M*OWD---****X",
        "M": "2125",
      },
      {
        "ID": "G*M*OWA---****X",
        "M": "2126",
      },
      {
        "ID": "G*M*OWL---****X",
        "M": "2127",
      },
      {
        "ID": "G*M*OWH---****X",
        "M": "2128",
      },
      {
        "ID": "G*M*OWCS--****X",
        "M": "2129",
      },
      {
        "ID": "G*M*OWCD--****X",
        "M": "2130",
      },
      {
        "ID": "G*M*OWCT--****X",
        "M": "2131",
      },
      {
        "ID": "G*M*OHO---****X",
        "M": "2133",
      },
      {
        "ID": "G*M*BDE---****X",
        "M": "2134",
      },
      {
        "ID": "G*M*BDD---****X",
        "M": "2135",
      },
      {
        "ID": "G*M*BDI---****X",
        "M": "2136",
      },
      {
        "ID": "G*M*BCA---****X",
        "M": "2137",
      },
      {
        "ID": "G*M*BCB---****X",
        "M": "2138",
      },
      {
        "ID": "G*M*BCF---****X",
        "M": "2139",
      },
      {
        "ID": "G*M*BCE---****X",
        "M": "2140",
      },
      {
        "ID": "G*M*BCD---****X",
        "M": "2141",
      },
      {
        "ID": "G*M*BCL---****X",
        "M": "2142",
      },
      {
        "ID": "G*M*BCR---****X",
        "M": "2143",
      },
      {
        "ID": "G*M*SL----****X",
        "M": "2144",
      },
      {
        "ID": "G*M*SW----****X",
        "M": "2145",
      },
      {
        "ID": "G*M*SP----****X",
        "M": "2146",
      },
      {
        "ID": "G*M*NM----****X",
        "M": "2147",
      },
      {
        "ID": "G*M*NR----****X",
        "M": "2148",
      },
      {
        "ID": "G*M*NB----****X",
        "M": "2149",
      },
      {
        "ID": "G*M*NC----****X",
        "M": "2150",
      },
      {
        "ID": "G*M*NL----****X",
        "M": "2151",
      },
      {
        "ID": "G*F*LT----****X",
        "M": "2152",
      },
      {
        "ID": "G*F*LTS---****X",
        "M": "2153",
      },
      {
        "ID": "G*F*LTF---****X",
        "M": "2154",
      },
      {
        "ID": "G*F*LCF---****X",
        "M": "2155",
      },
      {
        "ID": "G*F*LCC---****X",
        "M": "2156",
      },
      {
        "ID": "G*F*LCN---****X",
        "M": "2157",
      },
      {
        "ID": "G*F*LCR---****X",
        "M": "2158",
      },
      {
        "ID": "G*F*LCM---****X",
        "M": "2159",
      },
      {
        "ID": "G*F*AT----****X",
        "M": "2160",
      },
      {
        "ID": "G*F*ATR---****X",
        "M": "2161",
      },
      {
        "ID": "G*F*ATC---****X",
        "M": "2162",
      },
      {
        "ID": "G*F*ATG---****X",
        "M": "2163",
      },
      {
        "ID": "G*F*ATS---****X",
        "M": "2164",
      },
      {
        "ID": "G*F*ATB---****X",
        "M": "2165",
      },
      {
        "ID": "G*F*ACSI--****X",
        "M": "2166",
      },
      {
        "ID": "G*F*ACSR--****X",
        "M": "2167",
      },
      {
        "ID": "G*F*ACSC--****X",
        "M": "2168",
      },
      {
        "ID": "G*F*ACAI--****X",
        "M": "2169",
      },
      {
        "ID": "G*F*ACAR--****X",
        "M": "2170",
      },
      {
        "ID": "G*F*ACAC--****X",
        "M": "2171",
      },
      {
        "ID": "G*F*ACFI--****X",
        "M": "2172",
      },
      {
        "ID": "G*F*ACFR--****X",
        "M": "2173",
      },
      {
        "ID": "G*F*ACFC--****X",
        "M": "2174",
      },
      {
        "ID": "G*F*ACNI--****X",
        "M": "2175",
      },
      {
        "ID": "G*F*ACNR--****X",
        "M": "2176",
      },
      {
        "ID": "G*F*ACNC--****X",
        "M": "2177",
      },
      {
        "ID": "G*F*ACRI--****X",
        "M": "2178",
      },
      {
        "ID": "G*F*ACRR--****X",
        "M": "2179",
      },
      {
        "ID": "G*F*ACRC--****X",
        "M": "2180",
      },
      {
        "ID": "G*F*ACPR--****X",
        "M": "2181",
      },
      {
        "ID": "G*F*ACPC--****X",
        "M": "2182",
      },
      {
        "ID": "G*F*AZII--****X",
        "M": "2183",
      },
      {
        "ID": "G*F*AZIR--****X",
        "M": "2184",
      },
      {
        "ID": "G*F*AZIC--****X",
        "M": "2185",
      },
      {
        "ID": "G*F*AZXI--****X",
        "M": "2186",
      },
      {
        "ID": "G*F*AZXR--****X",
        "M": "2187",
      },
      {
        "ID": "G*F*AZXC--****X",
        "M": "2188",
      },
      {
        "ID": "G*F*AZSI--****X",
        "M": "2189",
      },
      {
        "ID": "G*F*ACEI--****X",
        "M": "2189",
      },
      {
        "ID": "G*F*AZSR--****X",
        "M": "2190",
      },
      {
        "ID": "G*F*ACER--****X",
        "M": "2190",
      },
      {
        "ID": "G*F*AZSC--****X",
        "M": "2191",
      },
      {
        "ID": "G*F*ACEC--****X",
        "M": "2191",
      },
      {
        "ID": "G*F*AZCI--****X",
        "M": "2192",
      },
      {
        "ID": "G*F*AZCR--****X",
        "M": "2193",
      },
      {
        "ID": "G*F*AZCC--****X",
        "M": "2194",
      },
      {
        "ID": "G*F*AZDI--****X",
        "M": "2195",
      },
      {
        "ID": "G*F*ACDI--****X",
        "M": "2195",
      },
      {
        "ID": "G*F*AZDR--****X",
        "M": "2196",
      },
      {
        "ID": "G*F*ACDR--****X",
        "M": "2196",
      },
      {
        "ID": "G*F*AZDC--****X",
        "M": "2197",
      },
      {
        "ID": "G*F*ACDC--****X",
        "M": "2197",
      },
      {
        "ID": "G*F*AZFI--****X",
        "M": "2217",
      },
      {
        "ID": "G*F*AZFR--****X",
        "M": "2218",
      },
      {
        "ID": "G*F*AZFC--****X",
        "M": "1052",
      },
      {
        "ID": "G*F*AZZI--****X",
        "M": "2198",
      },
      {
        "ID": "G*F*ACZI--****X",
        "M": "2198",
      },
      {
        "ID": "G*F*AZZR--****X",
        "M": "2199",
      },
      {
        "ID": "G*F*ACZR--****X",
        "M": "2199",
      },
      {
        "ID": "G*F*AZZC--****X",
        "M": "2200",
      },
      {
        "ID": "G*F*ACZC--****X",
        "M": "2200",
      },
      {
        "ID": "G*F*AZBI--****X",
        "M": "2201",
      },
      {
        "ID": "G*F*ACBI--****X",
        "M": "2201",
      },
      {
        "ID": "G*F*AZBR--****X",
        "M": "2202",
      },
      {
        "ID": "G*F*ACBR--****X",
        "M": "2202",
      },
      {
        "ID": "G*F*AZBC--****X",
        "M": "2203",
      },
      {
        "ID": "G*F*ACBC--****X",
        "M": "2203",
      },
      {
        "ID": "G*F*AZVI--****X",
        "M": "2204",
      },
      {
        "ID": "G*F*ACVI--****X",
        "M": "2204",
      },
      {
        "ID": "G*F*AZVR--****X",
        "M": "2205",
      },
      {
        "ID": "G*F*ACVR--****X",
        "M": "2205",
      },
      {
        "ID": "G*F*AZVC--****X",
        "M": "2206",
      },
      {
        "ID": "G*F*ACVC--****X",
        "M": "2206",
      },
      {
        "ID": "G*F*ACT---****X",
        "M": "2210",
      },
      {
        "ID": "G*F*AXC---****X",
        "M": "2207",
      },
      {
        "ID": "G*F*AXS---****X",
        "M": "2208",
      },
      {
        "ID": "G*F*AKBC--****X",
        "M": "2219",
      },
      {
        "ID": "G*F*AKBI--****X",
        "M": "2220",
      },
      {
        "ID": "G*F*AKBR--****X",
        "M": "2221",
      },
      {
        "ID": "G*F*AKPC--****X",
        "M": "2222",
      },
      {
        "ID": "G*F*AKPI--****X",
        "M": "2223",
      },
      {
        "ID": "G*F*AKPR--****X",
        "M": "2224",
      },
      {
        "ID": "G*S*LCM---****X",
        "M": "2226",
      },
      {
        "ID": "G*S*LCH---****X",
        "M": "2227",
      },
      {
        "ID": "G*S*LRM---****X",
        "M": "2228",
      },
      {
        "ID": "G*S*LRA---****X",
        "M": "2229",
      },
      {
        "ID": "G*S*LRO---****X",
        "M": "2230",
      },
      {
        "ID": "G*S*LRT---****X",
        "M": "2231",
      },
      {
        "ID": "G*S*LRW---****X",
        "M": "2232",
      },
      {
        "ID": "G*S*AD----****X",
        "M": "2233",
      },
      {
        "ID": "G*S*AE----****X",
        "M": "2234",
      },
      {
        "ID": "G*S*AR----****X",
        "M": "2235",
      },
      {
        "ID": "G*S*AH----****X",
        "M": "2236",
      },
      {
        "ID": "G*S*ASB---****X",
        "M": "2237",
      },
      {
        "ID": "G*S*ASD---****X",
        "M": "2238",
      },
      {
        "ID": "G*S*ASR---****X",
        "M": "2239",
      },
      {
        "ID": "G*O*HN----****X",
        "M": "2240",
      },
      {
        "ID": "G*O*B-----****X",
        "M": "2241",
      },
      {
        "ID": "G*O*BE----****X",
        "M": "2242",
      },
      {
        "ID": "G*O*BA----****X",
        "M": "2243",
      },
      {
        "ID": "G*O*BT----****X",
        "M": "2244",
      },
      {
        "ID": "G*O*BO----****X",
        "M": "2245",
      },
      {
        "ID": "WA-DPFC----L---",
        "M": "3000",
      },
      {
        "ID": "WA-DPFCU---L---",
        "M": "3001",
      },
      {
        "ID": "WA-DPFC-FG-L---",
        "M": "3002",
      },
      {
        "ID": "WA-DPFC-FY-L---",
        "M": "3003",
      },
      {
        "ID": "WA-DPFW----L---",
        "M": "3004",
      },
      {
        "ID": "WA-DPFWU---L---",
        "M": "3005",
      },
      {
        "ID": "WA-DPFW-FG-L---",
        "M": "3006",
      },
      {
        "ID": "WA-DPFW-FY-L---",
        "M": "3007",
      },
      {
        "ID": "WA-DPFO----L---",
        "M": "3008",
      },
      {
        "ID": "WA-DPFOU---L---",
        "M": "3009",
      },
      {
        "ID": "WA-DPFO-FY-L---",
        "M": "3010",
      },
      {
        "ID": "WA-DPFS----L---",
        "M": "3011",
      },
      {
        "ID": "WA-DPFSU---L---",
        "M": "3012",
      },
      {
        "ID": "WA-DPFS-FG-L---",
        "M": "3013",
      },
      {
        "ID": "WA-DPFS-FY-L---",
        "M": "3014",
      },
      {
        "ID": "WA-DPXT----L---",
        "M": "3015",
      },
      {
        "ID": "WA-DPXR----L---",
        "M": "3016",
      },
      {
        "ID": "WA-DPXSQ---L---",
        "M": "3017",
      },
      {
        "ID": "WA-DPXIL---L---",
        "M": "3018",
      },
      {
        "ID": "WA-DPXSH---L---",
        "M": "3019",
      },
      {
        "ID": "WA-DPXITCZ-L---",
        "M": "3020",
      },
      {
        "ID": "WA-DPXCV---L---",
        "M": "3021",
      },
      {
        "ID": "WA-DPXITD--L---",
        "M": "3022",
      },
      /* {
        "ID": "WAS-WP----P----",
        "M": "3023",
      }, */
      {
        "ID": "WA-DWJ-----L---",
        "M": "3030",
      },
      {
        "ID": "WA-DWS-----L---",
        "M": "3031",
      },
      {
        "ID": "WA-DWSTSWA--A--",
        "M": "3032",
      },
      {
        "ID": "WA-DBAIF----A--",
        "M": "3034",
      },
      {
        "ID": "WA-DBAMV----A--",
        "M": "3035",
      },
      {
        "ID": "WA-DBATB----A--",
        "M": "3036",
      },
      {
        "ID": "WA-DBAI-----A--",
        "M": "3037",
      },
      {
        "ID": "WA-DBALPNC--A--",
        "M": "3038",
      },
      {
        "ID": "WA-DBALPC---A--",
        "M": "3039",
      },
      {
        "ID": "WA-DBAFP----A--",
        "M": "3040",
      },
      {
        "ID": "WA-DBAT-----A--",
        "M": "3041",
      },
      {
        "ID": "WA-DBAFG----A--",
        "M": "3042",
      },
      {
        "ID": "WA-DBAD-----A--",
        "M": "3043",
      },
      {
        "ID": "WA-DBAFF----A--",
        "M": "3044",
      },
      {
        "ID": "WA-DIPIB---L---",
        "M": "3045",
      },
      {
        "ID": "WA-DIPCO---L---",
        "M": "3046",
      },
      {
        "ID": "WA-DIPIS---L---",
        "M": "3047",
      },
      {
        "ID": "WA-DIPIT---L---",
        "M": "3048",
      },
      {
        "ID": "WA-DIPID---L---",
        "M": "3049",
      },
      {
        "ID": "WA-DIPTH---L---",
        "M": "3050",
      },
      {
        "ID": "WA-DIPFF---L---",
        "M": "3051",
      },
      {
        "ID": "WO-DILOV---L---",
        "M": "3052",
      },
      {
        "ID": "WO-DILUC---L---",
        "M": "3053",
      },
      {
        "ID": "WO-DILOR---L---",
        "M": "3054",
      },
      {
        "ID": "WO-DILIEO--L---",
        "M": "3055",
      },
      {
        "ID": "WO-DILIEE--L---",
        "M": "3056",
      },
      {
        "ID": "WO-DILIER--L---",
        "M": "3057",
      },
      {
        "ID": "WO-DIOC----L---",
        "M": "3058",
      },
      {
        "ID": "WO-DIOCS---L---",
        "M": "3059",
      },
      {
        "ID": "WO-DIOL----L---",
        "M": "3060",
      },
      {
        "ID": "WO-DIOLF---L---",
        "M": "3061",
      },
      {
        "ID": "WO-DHDDL---L---",
        "M": "3062",
      },
      {
        "ID": "WO-DHDDC---L---",
        "M": "3063",
      },
      {
        "ID": "WO-DHDDA----A--",
        "M": "3064",
      },
      {
        "ID": "WO-DHCC----L---",
        "M": "3065",
      },
      {
        "ID": "WO-DHCI-----A--",
        "M": "3066",
      },
      {
        "ID": "WO-DHCB-----A--",
        "M": "3067",
      },
      {
        "ID": "WO-DHCW-----A--",
        "M": "3068",
      },
      {
        "ID": "WO-DHCF----L---",
        "M": "3069",
      },
      {
        "ID": "WO-DHCF-----A--",
        "M": "3070",
      },
      {
        "ID": "WO-DHPBA---L---",
        "M": "3071",
      },
      {
        "ID": "WO-DHPBA----A--",
        "M": "3072",
      },
      {
        "ID": "WO-DHPBP---L---",
        "M": "3073",
      },
      {
        "ID": "WOS-HPFF----A--",
        "M": "3074",
      },
      {
        "ID": "WO-DHPMD----A--",
        "M": "3075",
      },
      {
        "ID": "WO-DHPMO---L---",
        "M": "3076",
      },
      {
        "ID": "WO-DHPMO----A--",
        "M": "3077",
      },
      {
        "ID": "WO-DHPMRA--L---",
        "M": "3078",
      },
      {
        "ID": "WO-DHPMRB--L---",
        "M": "3079",
      },
      {
        "ID": "WO-DHPSPA--L---",
        "M": "3080",
      },
      {
        "ID": "WO-DHPSPB--L---",
        "M": "3081",
      },
      {
        "ID": "WO-DHPSPS--L---",
        "M": "3082",
      },
      {
        "ID": "WO-DHABP----A--",
        "M": "3083",
      },
      {
        "ID": "WO-DHALLA--L---",
        "M": "3084",
      },
      {
        "ID": "WO-DHHD-----A--",
        "M": "3085",
      },
      {
        "ID": "WO-DHHDF----A--",
        "M": "3200",
      },
      {
        "ID": "WO-DHHDK----A--",
        "M": "3201",
      },
      {
        "ID": "WO-DHHDB---L---",
        "M": "3086",
      },
      {
        "ID": "WOS-HHDR---L---",
        "M": "3087",
      },
      {
        "ID": "WO-DHHDD----A--",
        "M": "3089",
      },
      {
        "ID": "WO-DTCCCFE-L---",
        "M": "3090",
      },
      {
        "ID": "WO-DTCCCFF-L---",
        "M": "3091",
      },
      {
        "ID": "WO-DOBVA----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVB----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVC----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVD----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVE----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVF----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVG----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVH----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DOBVI----A--",
        "M": "3092",
      },
      {
        "ID": "WO-DBSF-----A--",
        "M": "3093",
      },
      {
        "ID": "WO-DBSG-----A--",
        "M": "3094",
      },
      {
        "ID": "WO-DBSM-----A--",
        "M": "3095",
      },
      {
        "ID": "WO-DBST-----A--",
        "M": "3096",
      },
      {
        "ID": "WO-DGMSR----A--",
        "M": "3097",
      },
      {
        "ID": "WO-DGMSC----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSSVS--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSSC---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSSM---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSSF---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSSVF--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSIVF--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSIF---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSIM---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSIC---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMSB----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMS-CO--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMS-PH--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMS-SH--A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGML-----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMN-----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMRS----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMRM----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMRR----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMCL----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMCM----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMCH----A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMIBA---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMIBB---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMIBC---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMIBD---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMIBE---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBCA---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBCB---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBCC---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTA---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTB---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTC---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTD---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTE---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTF---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTG---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTH---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DGMBTI---A--",
        "M": "3098",
      },
      {
        "ID": "WO-DL-ML---L---",
        "M": "3099",
      },
      {
        "ID": "WO-DL-MA----A--",
        "M": "3100",
      },
      {
        "ID": "WO-DL-RA---L---",
        "M": "3101",
      },
      {
        "ID": "WO-DL-SA----A--",
        "M": "3102",
      },
      {
        "ID": "WO-DL-TA----A--",
        "M": "3103",
      },
      {
        "ID": "WO-DL-O-----A--",
        "M": "3104",
      },
      {
        "ID": "WO-DMCA----L---",
        "M": "3105",
      },
      {
        "ID": "WO-DMCC-----A--",
        "M": "3106",
      },
      {
        "ID": "WO-DMCD----L---",
        "M": "3107",
      },
      {
        "ID": "WO-DMOA-----A--",
        "M": "3108",
      },
      {
        "ID": "WO-DMPA----L---",
        "M": "3109",
      },
      {
        "ID": "CYLINDER-------",
        "M": "900",
      },
      {
        "ID": "ORBIT----------",
        "M": "900",
      },
      {
        "ID": "ROUTE----------",
        "M": "900",
      },
      {
        "ID": "POLYGON--------",
        "M": "900",
      },
      {
        "ID": "RADARC---------",
        "M": "900",
      },
      {
        "ID": "POLYARC--------",
        "M": "900",
      },
      {
        "ID": "CAKE-----------",
        "M": "900",
      },
      {
        "ID": "TRACK----------",
        "M": "900",
      },
      {
        "ID": "CURTAIN--------",
        "M": "900",
      },//20200110 add start
      {
        "ID": "G*T*UP----****X",
        "M": "2246",
      },
      {
        "ID": "G*G*GLA---****X",
        "M": "2247",
      },
      {
        "ID": "G*G*GLE---****X",
        "M": "2248",
      },
      {
        "ID": "G*G*GL2---****X",
        "M": "2249",
      },
      {
        "ID": "G*G*GL3---****X",
        "M": "2250",
      },
      {
        "ID": "G*G*GL4---****X",
        "M": "2251",
      },
      {
        "ID": "G*G*GL5L--****X",
        "M": "2252",
      },
      {
        "ID": "G*G*GL5W--****X",
        "M": "2253",
      },
      {
        "ID": "G*G*GL6---****X",
        "M": "2254",
      },
      {
        "ID": "G*G*AAP---****X",
        "M": "2255",
      },
      {
        "ID": "G*G*AAA---****X",
        "M": "2256",
      },
      {
        "ID": "G*G*AAT---****X",
        "M": "2257",
      },
      {
        "ID": "G*G*AAO---****X",
        "M": "2258",
      },
      {
        "ID": "G*G*DLA---****X",
        "M": "2259",
      },
      {
        "ID": "G*G*DLB---****X",
        "M": "2260",
      },
      {
        "ID": "G*G*DLC---****X",
        "M": "2261",
      },
      {
        "ID": "G*G*DAF---****X",
        "M": "2262",
      },
      {
        "ID": "G*G*SLAA--****X",
        "M": "2263",
      },
      {
        "ID": "G*G*SLAB--****X",
        "M": "2264",
      },
      {
        "ID": "G*G*SLAD--****X",
        "M": "2265",
      },
      /* {
        "ID": "G*G*SAE---****X",
        "M": "2266",
      },
      {
        "ID": "G*G*SAN---****X",
        "M": "2267",
      },
      {
        "ID": "G*G*SAT---****X",
        "M": "2268",
      }, */
      {
        "ID": "G*M*OMTA--****X",
        "M": "2269",
      },
      {
        "ID": "G*M*OMPA--****X",
        "M": "2270",
      },
      {
        "ID": "G*M*OWCA--****X",
        "M": "2271",
      },
      {
        "ID": "G*F*ACCI--****X",
        "M": "2272",
      },
      {
        "ID": "G*F*ACGI--****X",
        "M": "2273",
      },
      {
        "ID": "G*S*LRB---****X",
        "M": "2274",
      },
      {
        "ID": "G*S*ASA---****X",
        "M": "2275",
      },
      {
        "ID": "WA--FI---------",
        "M": "3110",
      },
      {
        "ID": "WA--FV---------",
        "M": "3111",
      },//20200218 add start
      {
        "ID": "G*G*GL5C--****X",
        "M": "2276",
      },
      {
        "ID": "G*G*GL5D--****X",
        "M": "2277",
      },
      {
        "ID": "G*G*GL5EM-****X",
        "M": "2278",
      },
      {
        "ID": "G*G*GL5EA-****X",
        "M": "2279",
      },
      {
        "ID": "G*G*GABB--****X",
        "M": "2280",
      },
      {
        "ID": "G*G*GABH--****X",
        "M": "2281",
      }
    ]
  }
};


return{    
    
    init: function ()
    {
        var i,
        data = null,
        symbol = null,
        count;

        //symbolDefTable
        if(symbolMap===null)
        {
            symbols = spMappingXml.TACTICALGRAPHICS.SYMBOL;
            spMappingXml = null;
            symbolMap = {};
            this.parser = null;
            count = symbols.length;
            for (i = 0; i < count; i += 1) {
                symbol = symbols[i];
                //Firefox and IE parsers handle things differently
                if (symbol !== null) {

                    data = {};
                    data.symbolID = symbol["ID"] || ""; //SYMBOLID
                    data.mapping = symbol["M"] || ""; //MAPPING
					
					if(data.mapping !== "")
							data.mapping = (parseInt(data.mapping) + 57000) + "";
                    
                } 
                if((symbolMap[data.symbolID])===undefined)
                {
                    symbolMap[data.symbolID] = data;
                }
            }
        }

    },
    getCharCodeFromSymbol: function (symbolID, symStd) 
    {
        try
        {
            var basicID = symbolID;
            var returnVal = null;
            if(armyc2.c2sd.renderer.utilities.SymbolUtilities.is3dAirspace(symbolID)===false)
            {
                basicID = armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolIDStrict(symbolID);
            }   
            if(basicID in symbolMap)
            {
                returnVal = symbolMap[basicID].mapping;
                if(returnVal === "59053")
                {
                  if(symStd === null || symStd === undefined)
                    symStd = armyc2.c2sd.renderer.utilities.RendererSettings.getSymbologyStandard();
                  if(symStd === 1)
                    returnVal = "59052";//2052 is SHORADEZ(2525C), 2053 is FAADEZ 2525B.  
                  //Both share the same symbolID G*G*AAF--------

                }
                
                  
            }
            
            return returnVal;
        }
        catch(err)
        {
            armyc2.c2sd.renderer.utilities.ErrorLogger.LogException("TacticalGraphicLookup",
                "getCharCodeFromSymbol",err);
        }

    }
    
};
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.SymbolDefTable = (function () {

    var symbolMapB = null,
        symbolMapC = null,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings,
        SymbolUtilities = armyc2.c2sd.renderer.utilities.SymbolUtilities;


    return {
    /**
    * Just a category in the milstd hierarchy.
    * Not something we draw.
    * WILL NOT RENDER
    */
    DRAW_CATEGORY_DONOTDRAW: 0,
    /**
    * A polyline, a line with n number of points.
    * 0 control points
    */
    DRAW_CATEGORY_LINE: 1,
    /**
    * An animated shape, uses the animate function to draw.
    * 0 control points (every point shapes symbol)
    */
    DRAW_CATEGORY_AUTOSHAPE: 2,
    /**
    * An enclosed polygon with n points
    * 0 control points
    */
    DRAW_CATEGORY_POLYGON: 3,
    /**
    * A polyline with n points (entered in reverse order)
    * 0 control points
    */
    DRAW_CATEGORY_ARROW: 4,
    /**
    * A graphic with n points whose last point defines the width of the graphic.
    * 1 control point
    */
    DRAW_CATEGORY_ROUTE: 5,
    /**
    * A line defined only by 2 points, and cannot have more.
    * 0 control points
    */
    DRAW_CATEGORY_TWOPOINTLINE: 6,
    /**
    * Shape is defined by a single point
    * 0 control points
    */
    DRAW_CATEGORY_POINT: 8,
    /**
    * A polyline with 2 points (entered in reverse order).
    * 0 control points
    */
    DRAW_CATEGORY_TWOPOINTARROW: 9,
    /**
    * An animated shape, uses the animate function to draw. Super Autoshape draw
    * in 2 phases, usually one to define length, and one to define width.
    * 0 control points (every point shapes symbol)
    *
    */
    DRAW_CATEGORY_SUPERAUTOSHAPE: 15,
    /**
     * Circle that requires 1 AM modifier value.
     * See ModifiersTG.js for modifier descriptions and constant key strings.
     */
    DRAW_CATEGORY_CIRCULAR_PARAMETERED_AUTOSHAPE: 16,
    /**
     * Rectangle that requires 2 AM modifier values and 1 AN value.";
     * See ModifiersTG.js for modifier descriptions and constant key strings.
     */
    DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE: 17,
    /**
     * Requires 2 AM values and 2 AN values per sector.  
     * The first sector can have just one AM value although it is recommended 
     * to always use 2 values for each sector.  X values are not required
     * as our rendering is only 2D for the Sector Range Fan symbol.
     * See ModifiersTG.js for modifier descriptions and constant key strings.
     */
    DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE: 18,
    /**
     *  Requires at least 1 distance/AM value"
     *  See ModifiersTG.js for modifier descriptions and constant key strings.
     */
    DRAW_CATEGORY_CIRCULAR_RANGEFAN_AUTOSHAPE: 19,
    /**
     * Requires 1 AM value.
     * See ModifiersTG.js for modifier descriptions and constant key strings.
     */
    DRAW_CATEGORY_TWO_POINT_RECT_PARAMETERED_AUTOSHAPE: 20,
    
    /**
     * 3D airspace, not a milstd graphic.
     */
    DRAW_CATEGORY_3D_AIRSPACE: 40,
    
    /**
    * UNKNOWN.
    */
    DRAW_CATEGORY_UNKNOWN: 99,
        xmlDoc: null,
        /**
         * 
         * @returns {undefined}
         */
        init: function ()
        {
            var i,
            data = null,
            symbol = null,
            symbols,
            count;
            
            
            //symbolDefTable
            if(symbolMapB===null  && armyc2.c2sd.renderer.xml.SymbolConstantsB !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.SymbolConstantsB.SYMBOLCONSTANTS.SYMBOL;
                armyc2.c2sd.renderer.xml.SymbolConstantsB = null;
                symbolMapB = {};
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        //data.geometry = symbol["G"] || ""; //GEOMETRY
                        data.minPoints = parseInt(symbol["MNP"] || "", 10); //MINPOINTS
                        data.maxPoints = parseInt(symbol["MXP"] || "", 10); //MAXPOINTS
                        data.drawCategory = parseInt(symbol["DC"] || "", 10); //DRAWCATEGORY
                        data.modifiers = symbol["M"] || ""; //MODIFIERS
                        data.description = symbol["D"] || ""; //DESCRIPTION
                    } 
                    if((symbolMapB[data.symbolID])===undefined)
                    {
                        symbolMapB[data.symbolID] = data;
                    }
                }
            }
            
            if(symbolMapC===null  && armyc2.c2sd.renderer.xml.SymbolConstantsC !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.SymbolConstantsC.SYMBOLCONSTANTS.SYMBOL;
                armyc2.c2sd.renderer.xml.SymbolConstantsC = null;
                symbolMapC = {};
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    //Firefox and IE parsers handle things differently
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        //data.geometry = symbol["GEOMETRY"] || ""; //GEOMETRY
                        data.minPoints = parseInt(symbol["MNP"] || "", 10); //MINPOINTS
                        data.maxPoints = parseInt(symbol["MXP"] || "", 10); //MAXPOINTS
                        data.drawCategory = parseInt(symbol["DC"] || "", 10); //DRAWCATEGORY
                        data.modifiers = symbol["M"] || ""; //MODIFIERS
                        data.description = symbol["D"] || ""; //DESCRIPTION
                    } 
                    if((symbolMapC[data.symbolID])===undefined)
                    {
                        symbolMapC[data.symbolID] = data;
                    }
                }
            }
            
        },
        
        /**
         * 
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {Boolean}
         */
        hasSymbolMap: function(symStd)
        {
            if(symStd === 0 && symbolMapB !== null)//2525B
            {
                return true;
            }
            else if(symStd === 1 && symbolMapC !== null)//2525C
            {
                return true;
            }
            else
                return false;
        },
        
        /**
         * 
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {Boolean}
         */
        getSymbolMap: function(symStd)
        {
            if(symStd === 0 && symbolMapB !== null)//2525B
            {
                return symbolMapB;
            }
            else if(symStd === 1 && symbolMapC !== null)//2525C
            {
                return symbolMapC;
            }
            else
                return null;
        },
        
        /**
         * 
         * @param {type} symbolID
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {SymbolDef} has symbolID, minPoints, maxPoints, 
         * drawCategory, hasWidth, modifiers.  drawCategory is a number, the
         * rest are strings
         */
        getSymbolDef: function (symbolID, symStd) {
            
            if(!(symStd))
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap && symbolMap[symbolID] !== undefined)
            {
                return symbolMap[symbolID];
            }
            else
            {
                return null;
            }
            
        },
        /**
         * 
         * @param {String} symbolID
         * @param {type} symStd
         * @returns {Boolean}
         */
        hasSymbolDef: function (symbolID, symStd) {
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap && symbolMap[symbolID] !== undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        
        /**
        * Checks if symbol is a multipoint symbol
        * @param {type} symbolID
        * @param {type} symStd
        * @returns {Boolean}
        */
        isMultiPoint:function (symbolID, symStd) {
        
            if(symStd === undefined)
            {
                symStd = RendererSettings.getSymbologyStandard();
            }

            var codingScheme = symbolID.charAt(0);
            var returnVal = false;
            if (codingScheme === 'G' || codingScheme === 'W') 
            {
                var sd = this.getSymbolDef(SymbolUtilities.getBasicSymbolIDStrict(symbolID),symStd);
                if (sd) 
                {
                    if(sd.maxPoints > 1)
                    {
                        returnVal = true;
                    }
                    else
                    {
                        switch(sd.drawCategory)
                        {
                            case this.DRAW_CATEGORY_RECTANGULAR_PARAMETERED_AUTOSHAPE:
                            case this.DRAW_CATEGORY_SECTOR_PARAMETERED_AUTOSHAPE:
                            case this.DRAW_CATEGORY_TWO_POINT_RECT_PARAMETERED_AUTOSHAPE: 
                            case this.DRAW_CATEGORY_CIRCULAR_PARAMETERED_AUTOSHAPE:
                            case this.DRAW_CATEGORY_CIRCULAR_RANGEFAN_AUTOSHAPE:
                            case this.DRAW_CATEGORY_ROUTE:
                                returnVal = true;
                                break;
                            default:
                                returnVal = false;
                        }
                    }
                    return returnVal;
                } else {
                    return false;
                }
            }
            else if(symbolID.substring(0,3) === "BS_" || symbolID.substring(0,4) === "BBS_" || symbolID.substring(0,4) === "PBS_")
            {
                return true;
            }
            else 
            {
                return false;
            }
        }
    };
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/** @class */
armyc2.c2sd.renderer.utilities.SinglePointLookup = (function () {

    function SinglePointLookupInfo(basicSymbolID, description, 
                                    mappingP, mappingA,width,height){
        this._SymbolID = basicSymbolID;
        this._Description = description;
        this._mappingP = mappingP;
        this._mappingA = mappingA;
        this._width = width;
        this._height = height;
        this.getBasicSymbolIDStrict = function(){
            return this._SymbolID;
        };
        this.getDescription = function(){
            return this._Description;
        };
        this.getMappingA = function(){
            return this._mappingA;
        };
        this.getMappingP = function(){
            return this._mappingP;
        };
        this.getWidth = function(){
            return this._width;
        };
        this.getHeight = function(){
            return this._height;
        };
        
    }

    var symbolMapB = null,
        symbolMapC = null,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings;


    return {

        xmlDoc: null,
        /**
         * 
         * @returns {undefined}
         */
        init: function ()
        {
            var i,
            data = null,
            symbol = null,
            symbols = null,
            count;
            
            //symbolDefTable
            if(symbolMapB===null  && armyc2.c2sd.renderer.xml.SinglePointMappingsB !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.SinglePointMappingsB.SINGLEPOINTMAPPINGS.SYMBOL;
                armyc2.c2sd.renderer.xml.SinglePointMappingsB = null;
                symbolMapB = {};

                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.mappingP = symbol["MP"] || ""; //MAPPINGP
                        data.mappingA = symbol["MA"] || ""; //MAPPINGA
                        data.description = "";//symbol["D"] || ""; //DESCRIPTION
                        data.width = parseInt(symbol["W"] || ""); //WIDTH
                        data.height = parseInt(symbol["H"] || ""); //HEIGHT
						
						if(data.mappingP !== "")
							data.mappingP = (parseInt(data.mappingP) + 57000);
						if(data.mappingA !== "")
							data.mappingA = (parseInt(data.mappingA) + 57000);
                    } 
                    if((symbolMapB[data.symbolID])===undefined)
                    {
                        symbolMapB[data.symbolID] = data;
                    }
                }
            }
            
            if(symbolMapC===null  && armyc2.c2sd.renderer.xml.SinglePointMappingsC !== undefined)
            {
                symbols = symbols = armyc2.c2sd.renderer.xml.SinglePointMappingsC.SINGLEPOINTMAPPINGS.SYMBOL;
                armyc2.c2sd.renderer.xml.SinglePointMappingsC = null;
                symbolMapC = {};
                
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.mappingP = symbol["MP"] || ""; //MAPPINGP
                        data.mappingA = symbol["MA"] || ""; //MAPPINGA
                        data.description = "";//symbol["D"] || ""; //DESCRIPTION
                        data.width = parseInt(symbol["W"] || ""); //WIDTH
                        data.height = parseInt(symbol["H"] || ""); //HEIGHT
						
						if(data.mappingP !== "")
							data.mappingP = (parseInt(data.mappingP) + 57000);
						if(data.mappingA !== "")
							data.mappingA = (parseInt(data.mappingA) + 57000);
                    } 
                    
                    if((symbolMapC[data.symbolID])===undefined)
                    {
                        symbolMapC[data.symbolID] = data;
                    }
                }
            }
            
        },
        /**
         * 
         * @param {String} symbolID
         * @param {Number} symStd 0=2525B, 1=2525C
         * @returns {unitLookup} has symbolID, description, mapping1U, mapping1F,
         * mapping1N, mapping1H, mapping1color, mapping2, mapping2color
         */
        getSPLookupInfo: function (symbolID, symStd) {
            var basicID = armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolIDStrict(symbolID);
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap[basicID] !== undefined)
            {
                return symbolMap[basicID];
            }
            else
            {
                return null;
            }
            
        },
        /**
         * 
         * @param {String} symbolID
         * @returns {Boolean}
         */
        hasSPLookupInfo: function (symbolID,symStd) {
            
            var basicID = armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolIDStrict(symbolID);
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap[basicID] !== undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        },
        /**
         * 
         * @param {type} symbolCode
         * @param {type} symStd
         * @returns {Number|@exp;spli@call;mappingP|@exp;spli@call;mappingA}
         */
        getCharCodeFromSymbol: function(symbolCode, symStd){
            try
            {
                var strSymbolLookup = null;
                
                if(symbolCode.indexOf("FILL")=== -1)
                    strSymbolLookup = armyc2.c2sd.renderer.utilities.SymbolUtilities.getBasicSymbolIDStrict(symbolCode);
                else
                    strSymbolLookup = symbolCode;

               // Map<String, SinglePointLookupInfo> hashMap = null;
               var symbolMap = null;
               if(symStd === undefined)
                    symStd = RendererSettings.getSymbologyStandard();
               
                if(symStd===RendererSettings.Symbology_2525B)
                    symbolMap=symbolMapB;
                else if(symStd===RendererSettings.Symbology_2525C)
                    symbolMap=symbolMapC;

                var spli = null;
                if(armyc2.c2sd.renderer.utilities.SymbolUtilities.isWeather(strSymbolLookup) || symbolCode.indexOf("FILL")!== -1)
                {
                    spli = symbolMap[strSymbolLookup];// hashMap.get(strSymbolLookup);
                    if(spli !== null)
                        return spli.mappingP;
                    else
                        return -1;

                }
                else
                {
                    spli = symbolMap[strSymbolLookup];//hashMap.get(strSymbolLookup);
                    if(spli !== null)
                    {
                        if(armyc2.c2sd.renderer.utilities.SymbolUtilities.getStatus(symbolCode)===("A"))
                            return spli.mappingA;
                        else
                            return spli.mappingP;
                    }    
                    else
                    {
                        return -1;
                    }
                }
            }
            catch(exc)
            {
                //ErrorLogger.LogException("SinglePointLookup", "getCharCodeFromSymbol", exc, Level.WARNING);
            }
          return -1;
        }

    };
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.UnitDefTable = (function () {

    var symbolMapB = null,
        symbolMapC = null,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings;
        


    return {

        xmlDoc: null,
        /**
         * 
         * @returns {undefined}
         */
        init: function ()
        {
            var i,
            data = null,
            symbol = null,
            symbols,
            count;
            
            //symbolDefTable
            if(symbolMapB===null  && armyc2.c2sd.renderer.xml.UnitConstantsB !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.UnitConstantsB.UNITCONSTANTS.SYMBOL;
                armyc2.c2sd.renderer.xml.UnitConstantsB = null;
                symbolMapB = {};
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.description = symbol["D"] || ""; //DESCRIPTION
                        data.drawCategory = parseInt(symbol["DC"] || "", 10); //DRAWCATEGORY
                        data.hierarchy = symbol["H"] || ""; //HIERARCHY
                        //data.alphahierarchy = symbols[i].children[4].textContent; //ALPHAHIERARCHY
                        //data.path = symbols[i].children[5].textContent; //PATH

                    } 
                    if((symbolMapB[data.symbolID])===undefined)
                    {
                        symbolMapB[data.symbolID] = data;
                    }
                }
            }
            
            if(symbolMapC===null  && armyc2.c2sd.renderer.xml.UnitConstantsC !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.UnitConstantsC.UNITCONSTANTS.SYMBOL;
                armyc2.c2sd.renderer.xml.UnitConstantsC = null;
                symbolMapC = {};
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    //Firefox and IE parsers handle things differently
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.description = symbol["D"] || ""; //DESCRIPTION
                        data.drawCategory = parseInt(symbol["DC"] || "", 10); //DRAWCATEGORY
                        data.hierarchy = symbol["H"] || ""; //HIERARCHY
                        //data.alphahierarchy = symbols[i].children[4].textContent; //ALPHAHIERARCHY
                        //data.path = symbols[i].children[5].textContent; //PATH

                    } 
                    if((symbolMapC[data.symbolID])===undefined)
                    {
                        symbolMapC[data.symbolID] = data;
                    }
                }
            }
            
        },
        
        /**
         * 
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {Boolean}
         */
        hasSymbolMap: function(symStd)
        {
            if(symStd === 0 && symbolMapB !== null)//2525B
            {
                return true;
            }
            else if(symStd === 1 && symbolMapC !== null)//2525C
            {
                return true;
            }
            else
                return false;
        },
        
        /**
         * 
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {Boolean}
         */
        getSymbolMap: function(symStd)
        {
            if(symStd === 0 && symbolMapB !== null)//2525B
            {
                return symbolMapB;
            }
            else if(symStd === 1 && symbolMapC !== null)//2525C
            {
                return symbolMapC;
            }
            else
                return null;
        },
        
        /**
         * 
         * @param {String} symbolID
         * @param {Number} symStd 2525b=0,2525c=1
         * @returns {unitDef} has symbolID, description, drawCategory,
         * hierarchy, alphahierarchy, path.  drawCategory is a Number.
         */
        getUnitDef: function (symbolID, symStd) {
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap && symbolMap[symbolID] !== undefined)
            {
                return symbolMap[symbolID];
            }
            else
            {
                return null;
            }
            
        },
        /**
         * 
         * @param {String} basic symbolID
         * @param {Number} symStd
         * @returns {Boolean}
         */
        hasUnitDef: function (symbolID, symStd) {
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var symbolMap = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                symbolMap = symbolMapB;
            else
                symbolMap = symbolMapC;
            
            if(symbolMap && symbolMap[symbolID] !== undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }

    };
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.UnitFontLookup = (function () {

//UNKNOWN FILL Indexes
  var FillIndexUZ = 800,//Unknown
  FillIndexUP = 849,//Space
  FillIndexUA = 825,//Air
  FillIndexUG = 800,//Ground
  FillIndexUGE = 800,//Ground Equipment
  FillIndexUS = 800,//Sea Surface
  FillIndexUU = 837,//Subsurface
  FillIndexUF = 800,//SOF
   //FRIENDLY FILL Indexes
  FillIndexFZ = 812,
  FillIndexFP = 843,
  FillIndexFA = 819,
  FillIndexFG = 803,
  FillIndexFGE = 812,
  FillIndexFS = 812,
  FillIndexFU = 831,
  FillIndexFF = 803,
   //NEUTRAL FILL Indexes
  FillIndexNZ = 809,
  FillIndexNP = 846,
  FillIndexNA = 822,
  FillIndexNG = 809,
  FillIndexNGE = 809,
  FillIndexNS = 809,
  FillIndexNU = 834,
  FillIndexNF = 809,
   //HOSTILE FILL Indexes
  FillIndexHZ = 806,
  FillIndexHP = 840,
  FillIndexHA = 816,
  FillIndexHG = 806,
  FillIndexHGE = 806,
  FillIndexHS = 806,
  FillIndexHU = 828,
  FillIndexHF = 806;
  
  //imports
    var SymbolUtilities = armyc2.c2sd.renderer.utilities.SymbolUtilities,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings;

    var symbolMapB = null,
        symbolMapC = null,
        symbolsLoaded = false;


    return {

        
        /**
         * 
         * @returns {undefined}
         */
        init: function ()
        {
            var i,
            symbols = null,
            data = null,
            symbol = null,
            count;
            
            //symbolDefTable
            if(symbolMapB===null && armyc2.c2sd.renderer.xml.UnitFontMappingsB !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.UnitFontMappingsB.UNITFONTMAPPINGS.SYMBOL;
                armyc2.c2sd.renderer.xml.UnitFontMappingsB = null;
                symbolMapB = {};
                this.parser = null;
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    //Firefox and IE parsers handle things differently
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.description = "";//symbol["D"] || ""; //DESCRIPTION
                        data.mapping1U = symbol["M1U"] || null; //MAPPING1U
                        data.mapping1F = symbol["M1F"] || null; //MAPPING1F
                        data.mapping1N = symbol["M1N"] || null; //MAPPING1N
                        data.mapping1H = symbol["M1H"] || null; //MAPPING1H
                        data.mapping1color = symbol["M1C"] || "#000000"; //MAPPING1COLOR
                        data.mapping2 = symbol["M2"] || null; //MAPPING2
                        data.mapping2color = symbol["M2C"] || null; //MAPPING2COLOR
                        
                        
                        if(data.mapping1color !== null && data.mapping1color.length === 6)
                            data.mapping1color = "#" + data.mapping1color;
                        
                        if(data.mapping2color !== null && data.mapping2color.length === 6)
                            data.mapping2color = "#" + data.mapping2color;
						
						 //Check for bad font locations and remap
						  data.mapping1U = this.checkMappingIndex(data.mapping1U);
						  data.mapping1F = this.checkMappingIndex(data.mapping1F);
						  data.mapping1N = this.checkMappingIndex(data.mapping1N);
						  data.mapping1H = this.checkMappingIndex(data.mapping1H);
						  data.mapping2 = this.checkMappingIndex(data.mapping2);
						  ////////////////////////////////////////

                    } 
                    if((symbolMapB[data.symbolID])===undefined)
                    {
                        var ufli = new armyc2.c2sd.renderer.utilities.UnitFontLookupInfo(data.symbolID,
                                    data.description,data.mapping1U,data.mapping1F,
                                    data.mapping1N,data.mapping1H,
                                    data.mapping1color, data.mapping2,
                                    data.mapping2color);
                        symbolMapB[data.symbolID] = ufli;
                    }
                }
            }
            
            if(symbolMapC===null && armyc2.c2sd.renderer.xml.UnitFontMappingsC !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.UnitFontMappingsC.UNITFONTMAPPINGS.SYMBOL;
                armyc2.c2sd.renderer.xml.UnitFontMappingsC = null;
                symbolMapC = {};
                this.parser = null;
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    //Firefox and IE parsers handle things differently
                    if (symbol !== null) {

                        data = {};
                        data.symbolID = symbol["ID"] || ""; //SYMBOLID
                        data.description = "";//symbol["D"] || ""; //DESCRIPTION
                        data.mapping1U = symbol["M1U"] || null; //MAPPING1U
                        data.mapping1F = symbol["M1F"] || null; //MAPPING1F
                        data.mapping1N = symbol["M1N"] || null; //MAPPING1N
                        data.mapping1H = symbol["M1H"] || null; //MAPPING1H
                        data.mapping1color = symbol["M1C"] || "#000000"; //MAPPING1COLOR
                        data.mapping2 = symbol["M2"] || null; //MAPPING2
                        data.mapping2color = symbol["M2C"] || null; //MAPPING2COLOR
                        
                        
                        if(data.mapping1color !== null && data.mapping1color.length === 6)
                            data.mapping1color = "#" + data.mapping1color;
                        
                        if(data.mapping2color !== null && data.mapping2color.length === 6)
                            data.mapping2color = "#" + data.mapping2color;
						
						//Check for bad font locations and remap
						  data.mapping1U = this.checkMappingIndex(data.mapping1U);
						  data.mapping1F = this.checkMappingIndex(data.mapping1F);
						  data.mapping1N = this.checkMappingIndex(data.mapping1N);
						  data.mapping1H = this.checkMappingIndex(data.mapping1H);
						  data.mapping2 = this.checkMappingIndex(data.mapping2);
						  ////////////////////////////////////////

                    } 
                    if((symbolMapC[data.symbolID])===undefined)
                    {
                        var ufli = new armyc2.c2sd.renderer.utilities.UnitFontLookupInfo(data.symbolID,
                                    data.description,data.mapping1U,data.mapping1F,
                                    data.mapping1N,data.mapping1H,
                                    data.mapping1color, data.mapping2,
                                    data.mapping2color);
                        symbolMapC[data.symbolID] = ufli;
                    }
                }
            }
            if(symbolMapB !== null || symbolMapC !== null)
                symbolsLoaded = true;
        },
		
	   /**
	    * Until XML files are updated, we need to shift the index
	    * @param index
	    * @return 
	    */  
		checkMappingIndex: function (index)
		{
			var i = -1;
			if(index)
			{
				i = parseInt(index);

				if(i < 9000)
				  return (i + 57000);
				else
				  return (i + 54000);
			}
			else
				return index;
		  
		},
        /**
         * 
         * @param {String} symbolID
         * @param {Number} symStd 0=2525B, 1=2525C
         * @returns {unitFontLookupInfo} has symbolID, description, mapping1U, mapping1F,
         * mapping1N, mapping1H, mapping1color, mapping2, mapping2color
         */
        getUnitLookup: function (symbolID, symStd) {
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var map = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                map = symbolMapB;
            else
                map = symbolMapC;
            
            if(map[symbolID] !== undefined)
            {
                return map[symbolID];
            }
            else
            {
                return null;
            }
            
        },
        /**
         * 
         * @param {String} symbolID
         * @returns {Boolean}
         */
        hasUnitLookup: function (symbolID, symStd) {
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            var map = null;
            
            if(symStd === RendererSettings.Symbology_2525B)
                map = symbolMapB;
            else
                map = symbolMapC;
            
            if(map[symbolID] !== undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        },
        /**
         * we only have font lookups for F,H,N,U.  But the shapes match one of these
         * four for the remaining affiliations.  So we convert the string to a base
         * affiliation before we do the lookup.
         * @param {String} symbolID
         * @returns {String}
         */        
        resolveAffiliation: function (symbolID) {
            var code = symbolID.substring(0);
            var affiliation = symbolID.charAt(1);

            if(affiliation === "F" ||//friendly
                    affiliation === "H" ||//hostile
                    affiliation === "U" ||//unknown
                    affiliation === "N" )//neutral
                return code;
            else if(affiliation === "S")//suspect
                code = code.charAt(0) + "H" + code.substring(2, 15);
            else if(affiliation === "L")//exercise neutral
                code = code.charAt(0) + "N" + code.substring(2, 15);
            else if(affiliation === "A" ||//assumed friend
                    affiliation === "D" ||//exercise friend
                    affiliation === "M" ||//exercise assumed friend
                    affiliation === "K" ||//faker
                    affiliation === "J")//joker
                code = code.charAt(0) + "F" + code.substring(2, 15);
            else if(affiliation === "P" ||//pending
                    affiliation === "G" ||//exercise pending
                    affiliation === "O" ||//? brought it over from mitch's code
                    affiliation === "W")//exercise unknown
                code = code.charAt(0) + "U" + code.substring(2, 15);
            else
                code = code.charAt(0) + "U" + code.substring(2, 15);

            return code;
        },
        /**
         * 2525C
         * returns the character index for the fill frame based on the symbol code.
         * @param {String} SymbolID
         * @returns {Number}
         */
        getFillCode: function (SymbolID, symStd){
            
            var returnVal = -1,
            scheme = "",
            battleDimension = "",
            status = "",
            affiliation = "",
            grdtrkSubset = "";
    
            if(SymbolID !== null && SymbolID.length >= 10)
          {
              scheme = SymbolID.charAt(0);//S,O,E,I,etc...
              affiliation = SymbolID.charAt(1);//F,H,N,U,etc...
              battleDimension = SymbolID.charAt(2);//P,A,G,S,U,F,X,Z
              status = SymbolID.charAt(3);//A,P,C,D,X,F
              grdtrkSubset = SymbolID.charAt(4);
              
              if(symStd === undefined)
                {
                    symStd = RendererSettings.getSymbologyStandard();
                }

              if(scheme === 'S')//Warfighting symbols
              {
                  if(affiliation === 'F' ||
                          affiliation === 'A' ||
                          affiliation === 'D' ||
                          affiliation === 'M' ||
                          affiliation === 'J' ||
                          affiliation === 'K')
                  {
                      
                      if(battleDimension==='F' || battleDimension==='G')//ground & SOF
                      {
                          if(battleDimension==='F' ||
                                  (battleDimension==='G' &&
                                    (grdtrkSubset==='U' || grdtrkSubset==='I' || grdtrkSubset==='0'|| grdtrkSubset==='-')))
                          {
                              returnVal = 803;
                          }
                          else if(battleDimension==='G' && grdtrkSubset==='E')
                          {
                              returnVal = 812;
                          }
                          else
                              returnVal = 803;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 819;
                      }
                      else if(battleDimension==='S')//SeaSurface
                      {
                          returnVal = this.getSeaSurfaceFill(SymbolID);
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = this.getSubSurfaceFill(SymbolID,symStd);
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 819;
                          else
                            returnVal = 843; 
                      }
                      else//if(battleDimension==='Z')//unknown
                      {
                          returnVal = 812;//index in font file
                      }
                  }
                  else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                  {
                      if(battleDimension==='F' || battleDimension==='G')//ground & SOF
                      {
                          returnVal = 806;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 816;
                      }
                      else if(battleDimension==='S')//SeaSurface
                      {
                          returnVal = this.getSeaSurfaceFill(SymbolID);
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = this.getSubSurfaceFill(SymbolID,symStd);
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 816;
                          else
                            returnVal = 840; 
                      }
                      else//if(battleDimension==='Z')//unknown
                      {
                          returnVal = 806;//index in font file
                      }
                  }
                  else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                  {
                      if(battleDimension==='F' || battleDimension==='G')//ground & SOF
                      {
                          returnVal = 809;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 822;
                      }
                      else if(battleDimension==='S')//SeaSurface
                      {
                          returnVal = this.getSeaSurfaceFill(SymbolID);
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = this.getSubSurfaceFill(SymbolID,symStd);
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 822;
                          else
                            returnVal = 846; 
                      }
                      else//if(battleDimension==='Z')//unknown
                      {
                          returnVal = 809;//index in font file
                      }
                  }
                  else /*if(affiliation === 'P' ||
                     affiliation === 'U' ||
                     affiliation === 'G' ||
                     affiliation === 'W')*/ //these or bad affiliation codes.
                  {

                      if(battleDimension==='Z' ||//unknown
                            battleDimension==='G' ||//ground
                            battleDimension==='F')//SOF
                      {
                          returnVal = 800;//index in font file
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 825;
                      }
                      else if(battleDimension==='S')//SeaSurface
                      {
                          returnVal = this.getSeaSurfaceFill(SymbolID);
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = this.getSubSurfaceFill(SymbolID,symStd);
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 825;
                          else
                            returnVal = 849;
                      }
                      else
                          returnVal = FillIndexUG;
                  }

              }//end if scheme === 's'
              else if(scheme === 'E')//Emergency Management Symbols
              {
                  if(battleDimension !== 'N')//if not EMS natural event
                  {
                      if(affiliation === 'F' ||
                              affiliation === 'A' ||
                              affiliation === 'D' ||
                              affiliation === 'M' ||
                              affiliation === 'J' ||
                              affiliation === 'K')
                      {

                          //EMS symbols break some rules about symbol codes
                          if(SymbolUtilities.isEMSEquipment(SymbolID))
                              returnVal = 812;
                          else
                            returnVal = 803;
                      }
                      else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                      {
                          returnVal = 806;//index in font file

                      }
                      else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                      {
                          returnVal = 809;
                      }
                      else /*if(affiliation === 'P' ||
                         affiliation === 'U' ||
                         affiliation === 'G' ||
                         affiliation === 'W')*/
                      {
                          returnVal = 800;//index in font file
                      }
                  }
                  else //natural events do not have a fill/frame
                  {
                      returnVal = -1;
                  }
              }//end if scheme === 'E'
              else if(scheme === 'I')//Also default behavior
              {
                  if(affiliation === 'F' ||
                          affiliation === 'A' ||
                          affiliation === 'D' ||
                          affiliation === 'M' ||
                          affiliation === 'J' ||
                          affiliation === 'K')
                  {
                      if(battleDimension==='Z')//unknown
                      {
                          returnVal = 812;//index in font file
                      }
                      else if(battleDimension==='F' || battleDimension==='G' || battleDimension==='S')//ground & SOF & sea surface
                      {
                          if(scheme==='I')
                            returnVal = 812;
                          else
                            returnVal = 803;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 819;
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = 831;
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 819;
                          else
                            returnVal = 843;
                      }
                      else
                      {
                          if(scheme==='I')
                            returnVal = 812;
                          else
                            returnVal = 803;
                      }
                  }
                  if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                  {
                      if(battleDimension==='Z')//unknown
                      {
                          returnVal = 806;//index in font file
                      }
                      else if(battleDimension==='F' || battleDimension==='G' || battleDimension==='S')//ground & SOF & sea surface
                      {
                          returnVal = 806;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 816;
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = 828;
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 816;
                          else
                            returnVal = 840;
                      }
                      else
                      {
                          returnVal = 806;
                      }
                  }
                  if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                  {
                      if(battleDimension==='Z')//unknown
                      {
                          returnVal = 809;//index in font file
                      }
                      else if(battleDimension==='F' || battleDimension==='G' || battleDimension==='S')//ground & SOF & sea surface
                      {
                          returnVal = 809;
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 822;
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = 834;
                      }
                      else if(battleDimension==='P')//space
                      {
                          if(symStd === 0)
                            returnVal = 822;
                          else
                            returnVal = 846;
                      }
                      else
                      {
                          returnVal = 809;
                      }
                  }
                  else if(affiliation === 'P' ||
                     affiliation === 'U' ||
                     affiliation === 'G' ||
                     affiliation === 'W')
                  {

                      if(battleDimension==='Z' ||//unknown
                            battleDimension==='G' ||//ground
                            battleDimension==='S' ||//sea surface
                            battleDimension==='F')//SOF
                      {
                          returnVal = 800;//index in font file
                      }
                      else if(battleDimension==='A')//Air
                      {
                          returnVal = 825;
                      }
                      else if(battleDimension==='U')//Subsurface
                      {
                          returnVal = 837;
                      }
                      else if(battleDimension==='P')//Space
                      {
                          if(symStd === 0)
                            returnVal = 825;
                          else
                            returnVal = 849;
                      }
                      else
                      {
                          returnVal = 800;
                      }
                  }
              }//end if scheme === 'I'
              else//scheme = 'O' and anything else
              {
                  if(affiliation === 'F' ||
                          affiliation === 'A' ||
                          affiliation === 'D' ||
                          affiliation === 'M' ||
                          affiliation === 'J' ||
                          affiliation === 'K')
                  {
                      if(SymbolID.substring(0,3)==="OFI" && SymbolID.substring(4,10)===("T-----"))
                      {
                          //friendly tent is the ONE STBOPS that draws like equipment.
                          returnVal = FillIndexFGE;
                      }
                      else
                      {
                          returnVal = 803;
                      }
                  }
                  else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                  {
                      returnVal = 806;//index in font file
                  }
                  else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                  {
                      returnVal = 809;
                  }
                  else /*if(affiliation === 'P' ||
                     affiliation == 'U' ||
                     affiliation == 'G' ||
                     affiliation == 'W')*/
                  {
                      returnVal = 800;//index in font file
                  }
              }//end default

          }
          else
          {
              returnVal = 800;
          }
          
          return returnVal + 57000;
    
        },
        /**
         * 
         * @param {String} SymbolID
         * @param {Number} fillCode
         * @returns {Number}
         */        
        getFrameCode: function(SymbolID, fillCode, symStd){
            var returnVal = 0,
            status = SymbolID.charAt(3);

            if(status === 'A')
                returnVal = fillCode + 2;
            else//P, C, D, X, F
                returnVal = fillCode + 1;
            
            
            if(symStd === undefined)
                symStd = RendererSettings.getSymbologyStandard();
            if(symStd > RendererSettings.Symbology_2525B && status === 'A')
            {
                var affiliation = SymbolID.charAt(1);
                switch(affiliation)
                {
                    case 'P':
                    case 'A':
                    case 'S':
                    case 'G':
                    case 'M':
                        returnVal--;
                        break;
                }
            }//*/
            
            if(returnVal === 847)//847 seems to be reserved in FF & IE.
                returnVal = 852;

            if(SymbolUtilities.isSeaSurface(SymbolID))
            {
                returnVal = this.getSeaSurfaceFrame(SymbolID, fillCode);
            }
            if(SymbolUtilities.isSubSurface(SymbolID))
            {
                returnVal = this.getSubSurfaceFrame(SymbolID, fillCode);
            }

            return returnVal;
        },
        /**
         * 
         * @param {String} SymbolID
         * @returns {Number}
         */
        getSeaSurfaceFill: function (SymbolID) {
            var affiliation = "U",
    
            affiliation = SymbolID.charAt(1);//F,H,N,U,etc...
            

            if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID)===("S*S*O-----*****"))
            {
              return 2016;  
            }
            else
            {
                if(affiliation === 'F' ||
                            affiliation === 'A' ||
                            affiliation === 'D' ||
                            affiliation === 'M' ||
                            affiliation === 'J' ||
                            affiliation === 'K')
                {
                    return FillIndexFS;
                }
                else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                {
                    return FillIndexHS;
                }
                else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                {
                    return FillIndexNS;
                }
                else if(affiliation === 'P' ||
                         affiliation === 'U' ||
                         affiliation === 'G' ||
                         affiliation === 'W')
                {
                    return FillIndexUS;
                }
                else
                {
                    return FillIndexUG;
                }
            }
        },
        /**
         * 
         * @param {String} SymbolID
         * @returns {Number}
         */
        getSubSurfaceFill: function (SymbolID, symStd){
    
            var affiliation = 0,
            status = 0,
            returnVal = 831;
            try
            {
                if(symStd === undefined)
                {
                    symStd = RendererSettings.getSymbologyStandard();
                }
                affiliation = SymbolID.charAt(1);//F,H,N,U,etc...
                status = SymbolID.charAt(3);//A,P,C,D,X,F

                if(affiliation === 'F' ||
                        affiliation === 'A' ||
                        affiliation === 'D' ||
                        affiliation === 'M' ||
                        affiliation === 'J' ||
                        affiliation === 'K')
                {
                      returnVal = 831;//
                }
               else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                {
                    returnVal = 828;//index in font file

                }
               else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                {
                    returnVal = 834;
                }
                else if(affiliation === 'P' ||
                   affiliation === 'U' ||
                   affiliation === 'G' ||
                   affiliation === 'W')
                {
                    returnVal = 837;//index in font file
                }

                //appears in USAS so we check in both standards
                if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*X-----*****"))
                {
                    if(status==='A')
                        returnVal = returnVal+2;
                    else
                        returnVal++;
                }

                //Special check for sea mine graphics
                //2525C///////////////////////////////////////////////////////////////
                if(symStd === RendererSettings.Symbology_2525C)
                {
                    if(SymbolID.indexOf("WM")===4 || //Sea Mine
                            SymbolID.indexOf("WDM")===4 ||//Sea Mine Decoy
                            SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*E-----*****") ||
                            SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*V-----*****"))
                    {
                        returnVal++;

                        if(status === 'A')
                            returnVal++;

                    }
                    else if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*ND----*****"))
                    {
                        returnVal = 2121;
                    }
                }
                else//2525Bch2////////////////////////////////////////////////////////
                {
                    if(SymbolID.indexOf("WM")===4)//Sea Mine
                    {
                        if(SymbolID.indexOf("----", 6)===6 || SymbolID.indexOf("D---", 6)===6)
                            returnVal = 2059;//
                        else if(SymbolID.indexOf("G---", 6)===6)
                            returnVal = 2062;
                        else if(SymbolID.indexOf("GD--", 6)===6)
                            returnVal = 2064;
                        else if(SymbolID.indexOf("M---", 6)===6)
                            returnVal = 2073;
                        else if(SymbolID.indexOf("MD--", 6)===6)
                            returnVal = 2075;
                        else if(SymbolID.indexOf("F---", 6)===6)
                            returnVal = 2084;
                        else if(SymbolID.indexOf("FD--", 6)===6)
                            returnVal = 2086;
                        else if(SymbolID.indexOf("O---", 6)===6 ||
                                SymbolID.indexOf("OD--", 6)===6)
                            returnVal = 2094;

                    }
                    else if(SymbolID.indexOf("WDM")===4)//Sea Mine Decoy
                    {
                          returnVal = 2115;
                    }
                    else if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*ND----*****"))
                    {
                          returnVal = 2121;
                    }//
                }
            }
            catch(exc)
            {
                //ErrorLogger.LogException("UnitFontLookupC", "getSubSurfaceFill", exc);
                return FillIndexUU;
            }

            return returnVal;
    
        },
        /**
         * 
         * @param {String} SymbolID
         * @param {Number} fillCode
         * @returns {Number}
         */
        getSeaSurfaceFrame: function(SymbolID, fillCode){
            var returnVal = fillCode+1;

            if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*S*O-----*****"))
                returnVal = -1;
            else
            {
                if(SymbolID.charAt(3)==='A' || SymbolID.charAt(3)==='a')
                            return fillCode + 2;
                        else
                            return fillCode + 1;
            }

            return returnVal;
        },
        /**
         * 
         * @param {String} SymbolID
         * @param {Number} fillCode
         * @returns {Number}
         */        
        getSubSurfaceFrame: function(SymbolID, fillCode){
              var returnVal = fillCode+1;

              try
              {
                  //Special check for sea mine graphics
                  //2525C///////////////////////////////////////////////////////////////
                  if(RendererSettings.getSymbologyStandard() === 
                          RendererSettings.Symbology_2525C)
                  {
                      if(SymbolID.indexOf("WM")===4 || //Sea Mine
                              SymbolID.indexOf("WDM")===4 ||//Sea Mine Decoy
                              SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*E-----*****") ||
                              SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*V-----*****") ||
                              SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*X-----*****"))
                      {
                          returnVal = -1;
                      }
                      else if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*ND----*****"))
                      {
                          returnVal = -1;
                      }
                      else
                      {
                          if(SymbolID.charAt(3)==='A' || SymbolID.charAt(3)==='a')
                              return fillCode + 2;
                          else
                              return fillCode + 1;
                      }//
                  }
                  else//2525Bch2////////////////////////////////////////////////////////
                  {
                      if(SymbolID.indexOf("WM")===4)//Sea Mine
                      {
                          returnVal = -1;

                      }
                      else if(SymbolID.indexOf("WDM")===4)//Sea Mine Decoy
                      {
                            returnVal = -1;
                      }
                      else if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*ND----*****"))
                      {
                            returnVal = -1;
                      }//
                      else if(SymbolUtilities.getBasicSymbolIDStrict(SymbolID) === ("S*U*X-----*****"))
                      {
                          returnVal = -1;
                      }
                      else
                      {
                          if(SymbolID.charAt(3)==='A' || SymbolID.charAt(3)==='a')
                              return fillCode + 2;
                          else
                              return fillCode + 1;
                      }
                  }
              }
              catch(exc)
              {
                  //ErrorLogger.LogException("UnitFontLookupC", "getSubSurfaceFrame", exc);
                  return fillCode;
              }

              return returnVal;
        },
        /**
         * Until XML files are updated, we need to shift the index
         * @param {Number} characterIndex
         * @returns {Number}
         */        
        getUnitRatioHeight: function(charIndex){
            var characterIndex = charIndex - 57000;
            if(characterIndex === FillIndexHP ||
              characterIndex === FillIndexHA ||
              characterIndex === FillIndexHU ||
              characterIndex === (FillIndexHU+1) ||
              characterIndex === (FillIndexHU+2) ||
              characterIndex === FillIndexUP ||
              characterIndex === FillIndexUA ||
              characterIndex === FillIndexUU ||
              characterIndex === (FillIndexUU+1) ||
              characterIndex === (FillIndexUU+2))
            {
                return 1.3;
            }
            else if(characterIndex === FillIndexHZ ||
                    characterIndex === FillIndexHG ||
                    characterIndex === FillIndexHGE ||
                    characterIndex === FillIndexHS ||
                    characterIndex === FillIndexHF ||
                    characterIndex === FillIndexUZ ||
                    characterIndex === FillIndexUG ||
                    characterIndex === FillIndexUGE ||
                    characterIndex === FillIndexUS ||
                    characterIndex === FillIndexUF)
            {
                return 1.44;
            }
            else if(characterIndex === FillIndexFGE ||
                    characterIndex === FillIndexFP ||
                    characterIndex === FillIndexFA ||
                    characterIndex === FillIndexFU ||
                    characterIndex === (FillIndexFU+1) ||
                    characterIndex === (FillIndexFU+2) ||
                    characterIndex === FillIndexFZ ||
                    characterIndex === FillIndexFS ||
                    characterIndex === FillIndexNP ||
                    characterIndex === FillIndexNA ||
                    characterIndex === FillIndexNU ||
                    characterIndex === (FillIndexNU+1) ||
                    characterIndex === (FillIndexNU+2))
            {
                return 1.2;
            }
            else if(characterIndex === FillIndexNZ ||
                    characterIndex === FillIndexNG ||
                    characterIndex === FillIndexNGE ||
                    characterIndex === FillIndexNS ||
                    characterIndex === FillIndexNF)
            {
                return 1.1;
            }
            else if(characterIndex === FillIndexFG ||
                    characterIndex === FillIndexFGE)
            {
                return 1.0;
            }
            else
            {
                return 1.2;
            }
        },
        /**
         * 
         * @param {Number} charIndex
         * @returns {Number}
         */               
        getUnitRatioWidth: function (charIndex) {
            var characterIndex = charIndex - 57000;
              if(characterIndex === FillIndexUP ||
                      characterIndex === FillIndexUA ||
                      characterIndex === FillIndexUU ||
                      characterIndex === FillIndexUU+1 ||
                      characterIndex === FillIndexUU+2 ||
                      characterIndex === FillIndexFG ||
                      characterIndex === FillIndexFF)
              {
                  return 1.5;
              }
              else if(characterIndex === FillIndexHZ ||
                      characterIndex === FillIndexHG ||
                      characterIndex === FillIndexHGE ||
                      characterIndex === FillIndexHS ||
                      characterIndex === FillIndexHF ||
                      characterIndex === FillIndexUZ ||
                      characterIndex === FillIndexUG ||
                      characterIndex === FillIndexUGE ||
                      characterIndex === FillIndexUS ||
                      characterIndex === FillIndexUF)
              {
                  return 1.44;
              }
              else if(characterIndex === FillIndexFZ ||
                      characterIndex === FillIndexFGE ||
                      characterIndex === FillIndexFS)
              {
                  return 1.2;
              }
              else
              {
                  return 1.1;
              }
        }

    };
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/** @class */
armyc2.c2sd.renderer.utilities.SymbolDimensions = {};
    
      
    /**
     * 
     * @param {Number} charIndex
     * @param {Number} fontSize
     * @return {armyc2.c2sd.renderer.so.Rectangle} 
     */
    armyc2.c2sd.renderer.utilities.SymbolDimensions.getUnitBounds = function(charIndex, fontSize){
        var Rectangle = armyc2.c2sd.renderer.so.Rectangle,
            index = charIndex - 57000;
        var rect = null;

        switch(index)
        {
            case 800://unknown ground
            case 801:
            case 802:
                    rect = new Rectangle(0,0,60.8,60.8);
                    break;
            case 803://FG
            case 804:
            case 805:
                    rect = new Rectangle(0,0,62.547,44.52632);//
                    break;
            case 806://HG
            case 807:
            case 808:
                    rect = new Rectangle(0,0,62.5,62.5);
                    break;
            case 809://NG
            case 810:
            case 811:
                    rect = new Rectangle(0,0,47.6085,47.6085);
                    break;
            case 812://FE
            case 813:
            case 814:
                    rect = new Rectangle(0,0,51.0625,51.0625);
                    break;
            case 816://HA/S
            case 817:
            case 818:
            case 840:
            case 841:
            case 842:
                    rect = new Rectangle(0,8,47.8463,53);//
                    break;
            case 819://FA/S
            case 820:
            case 821:
            case 843:
            case 844:
            case 845:
                    rect = new Rectangle(0,7,46.6,48);//y=7
                    break;
            case 822://NA/S
            case 823:
            case 824:
            case 846:
            case 847:
            case 848:
                    rect = new Rectangle(0,6,47,48);//y=6
                    break;
            case 825://UA/S
            case 826:
            case 827:
            case 849:
            case 850:
            case 851:
                    rect = new Rectangle(0,5,64.7,56);//
                    break;
            case 828://HSub
            case 829:
            case 830:
                    rect = new Rectangle(0,-8,47.8463,53);//{x : 0, y:-7, width:50.3,height:53}
                    break;
            case 831://FSub
            case 832:
            case 833:
                    rect = new Rectangle(0,-5,46.6,49);//y=-5
                    break;
            case 834://NSub
            case 835:
            case 836:
                    rect = new Rectangle(0,-5,46.5,48);//y=-5
                    break;
            case 837://USub
            case 838:
            case 839:
                    rect = new Rectangle(0,-5,64.7,58);//y=-10
                    break;
                case 2059:
                case 2062:
                case 2064:
                case 2073:
                case 2075:
                case 2084:
                case 2086:
                case 2094:
                case 2115:
                case 2121:
                    rect = new Rectangle(0,-5,35,43);//y=-10
                    break;			
            default:
                    rect = new Rectangle(0,0,65,65);
                    break;
        }

        var ratio = 1;
        if(fontSize !== 50)
        {
                ratio = fontSize / 50;
                //I only measured for a font size of 50.  if we get the ratio and multiply the values
                //by it, we in theory should have a correct adjusted rectangle.
                rect = new Rectangle(0,Math.ceil(rect.y*ratio), Math.ceil(rect.width*ratio), Math.ceil(rect.height*ratio));
        }

        return rect;
    };
    /**
     * 
     * @param {String} symbolID
     * @param {Number} symStd 0=2525B,1=2525C
     * @param {Number} fontSize
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    armyc2.c2sd.renderer.utilities.SymbolDimensions.getSymbolBounds = function (symbolID, symStd, fontSize){
        var spli = armyc2.c2sd.renderer.utilities.SinglePointLookup.getSPLookupInfo(symbolID, symStd);

        var Rectangle = armyc2.c2sd.renderer.so.Rectangle;

        var rect = new Rectangle(0,0,spli.width, spli.height);//new Rectangle(0,0,spli.width, spli.height);

        if(fontSize !== 60)//adjust boundaries ratio if font size is not at the default setting.
        {
                var ratio = fontSize/60;
                
                rect = new Rectangle(0,0,Math.round(rect.width*ratio), Math.round(rect.height*ratio));
                //rect = new Rectangle(0,0,Math.ceil(rect.width*ratio), Math.ceil(rect.height*ratio));
        }

        return rect; 
    };

    /**
     * 
     * @param {String} symbolID
     * @param {armyc2.c2sd.renderer.so.Rectangle} bounds
     * @returns {armyc2.c2sd.renderer.so.Point}
     */
    armyc2.c2sd.renderer.utilities.SymbolDimensions.getSymbolCenter = function (symbolID, bounds){
        
        var SymbolUtilities = armyc2.c2sd.renderer.utilities.SymbolUtilities;
        var basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID),
            center = new armyc2.c2sd.renderer.so.Point(bounds.width/2,bounds.height/2);

        if(basicID === "G*G*GPUUB-****X" ||
                basicID === "G*G*GPUUL-****X" ||
                basicID === "G*G*GPUUS-****X" ||
                basicID === "G*G*GPRI--****X" ||
                basicID === "G*G*GPWE--****X" ||
                basicID === "G*G*GPWG--****X" ||
                basicID === "G*G*GPWM--****X" ||
                basicID === "G*G*GPP---****X" ||
                basicID === "G*G*GPPC--****X" ||
                basicID === "G*G*GPPL--****X" ||
                basicID === "G*G*GPPP--****X" ||
                basicID === "G*G*GPPR--****X" ||
                basicID === "G*G*GPPA--****X" ||
                basicID === "G*G*APD---****X" ||
                basicID === "G*G*OPP---****X" ||
                basicID.substring(0,7) === "G*M*OAO" ||//antitank obstacles
                basicID === "G*M*BCP---****X" ||
                basicID === "G*M*BCC---****X" ||
                basicID === "G*F*PCS---****X" ||
                basicID === "G*F*PCB---****X" ||
                basicID === "G*F*PCR---****X" ||
                basicID === "G*F*PCH---****X" ||
                basicID === "G*F*PCL---****X" ||
                basicID.substring(0,5) === "G*S*P" ||//combat service suppport/points
                basicID === "G*O*ED----****X" ||
                basicID === "G*O*EP----****X" ||
                basicID === "G*O*EV----****X" ||
                basicID === "G*O*SB----****X" ||
                basicID === "G*O*SBM---****X" ||
                basicID === "G*O*SBN---****X" ||
                basicID === "G*G*GPPN--****X" || //entry control point
                basicID === "G*S*PX----****X" || //ambulance exchange point
                basicID === "G*O*ES----****X" || //emergency distress call
                basicID === "G*G*GPRE--****X" || //Node Signal Unit
                basicID === "G*O*D-----****X" || //Dam
                SymbolUtilities.isNBC(basicID) ||
                SymbolUtilities.isDeconPoint(basicID) ||
                SymbolUtilities.isCheckPoint(basicID))
        {
                //center on bottom middle
                center.x = bounds.width/2;
                center.y = bounds.height;
        }
        else if(SymbolUtilities.isSonobuoy(basicID))
        {
                //bottom third
                center.x = bounds.width/2;
                center.y = Math.round(bounds.height * 0.75);
        }
        else if((basicID.substring(0,7)==="G*G*GPO" && basicID.substring(7,8)!=="-"))//antitank mine w/ handling device
        {
                //upper third
                center.x = bounds.width/2;
                center.y = Math.round(bounds.height * 0.33);
        }
        else if(basicID==="G*M*OMD---****X")
        {
                //upper third
                center.x = bounds.width/2;
                center.y = Math.round(bounds.height * 0.28);
        }
        else if(basicID.substring(0,7)==="G*G*DPO")//OBSERVATION POST/OUTPOST
        {
                if(basicID.substring(7,8)==="C")//combat outpost
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.55);
                }
                else//everything else under OBSERVATION POST/OUTPOST
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.65);
                }
        }
        else if(basicID === "G*G*GPWD--****X"||//drop point
                basicID === "G*G*PN----****X" ||//dummy minefield static
                basicID === "G*M*OB----****X" ||//booby trap
                basicID === "G*M*OME---****X" ||//antitank mine directional
                basicID === "G*M*OMW---****X" ||//wide area mines
                basicID === "G*M*OMP---****X" ||//anti-personnel mines
                basicID === "G*M*OHTL--****X" ||//Aviation/tower/low
                basicID === "G*M*OHTH--****X" ||//Aviation/tower/high
                basicID === "G*O*HM----****X" ||//
                basicID === "G*O*HI----****X" ||//
                basicID === "G*O*SM----****X")
        {
                if(basicID === "G*G*GPWD--****X")//drop point
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.87);
                }
                if(basicID === "G*G*PN----****X")//dummy minefield static
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.69);
                }
                if(basicID === "G*M*OB----****X")//booby trap
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.79);
                }
                if(basicID === "G*M*OME---****X")//antitank mine directional
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.77);
                }
                if(basicID === "G*M*OMW---****X")//wide area mines
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.3);
                }
                if(basicID === "G*M*OMP---****X")//anti personnel mines
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.64);
                }
                if(basicID === "G*M*OHTL--****X")//Aviation/tower/low//2525C
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.88);
                }
                if(basicID === "G*M*OHTH--****X")//Aviation/tower/high//2525C
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.90);
                }
                if(basicID === "G*O*HM----****X")//sea mine-like
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.65);
                }
                if(basicID === "G*O*HI----****X")
                {
                        center.x = bounds.width/2;
                        center.y = Math.round(bounds.height * 0.58);
                }
                if(basicID === "G*O*SM----****X")
                {
                        center.x = 0;
                        center.y = Math.round(bounds.height * 0.5);
                }
        }
        else if(basicID === "G*O*SS----****X")//sea anomaly
        {
            center.x = bounds.width/2;
            center.y = Math.round(bounds.height * 0.45);
        }
        else
        {
                //center on center
                center.x = bounds.width/2;
                center.y = bounds.height/2;
                //var foo = new armyc2.c2sd.renderer.utilities.Point(0,0);
                
        }

        return center;
    };
    
var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
/** @class */
armyc2.c2sd.renderer.TacticalGraphicIconRenderer = (function () {
    
    //font size of 60 produces a 40x40 pixel image.
    var fontSizeForTGIcons = 60;
    
return{    
    
    getIcon: function(symbolID, size, color, alpha, symStd){
        
        var id = symbolID;
        if(armyc2.c2sd.renderer.utilities.SymbolUtilities.isWeather(symbolID)===true)
        {
            color = armyc2.c2sd.renderer.utilities.SymbolUtilities.getFillColorOfWeather(symbolID);
            if(color)
                color = color.toHexString(false);
            if(color === null)
                color = armyc2.c2sd.renderer.utilities.SymbolUtilities.getLineColorOfWeather(symbolID).toHexString(false);
        }//*/
        else if(color===null)
        {
            color = armyc2.c2sd.renderer.utilities.SymbolUtilities.getLineColorOfAffiliation(symbolID).toHexString(false);
        }

        if(color.toHexString)
            color = color.toHexString(false);

        var charSymbolIndex = armyc2.c2sd.renderer.utilities.TacticalGraphicLookup.getCharCodeFromSymbol(id,symStd);

        if(charSymbolIndex >= 0)
        {
            var fontSize = fontSizeForTGIcons;//60
            //font size of 60 produces a 40x40 pixel image.
            var ratio = size/40.0;

            var strSymbol = String.fromCharCode(charSymbolIndex);


            var pixel = new armyc2.c2sd.renderer.so.Point(0,0);


            //resize to pixels
            if(ratio > 0)
            {
                fontSize = fontSize * ratio;
            }

            fontSize = (fontSize/96 * 72);

            var buffer = this.createBuffer(size,size),
                ctx = buffer.getContext('2d');
            
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 5;
            ctx.fillStyle = color;
            ctx.font = fontSize + "pt TacticalGraphics";
            if(alpha < 1.0)
                ctx.globalAlpha = alpha;
            
            var x = Math.round(size/2),
                y = Math.round(size/2);
            
            ctx.fillText(strSymbol,x,y);

            var centerPoint = new armyc2.c2sd.renderer.so.Point(x,y),
                symbolBounds = new armyc2.c2sd.renderer.so.Rectangle(0,0,size,size),
                imageBounds = symbolBounds.clone();

            var ii = new armyc2.c2sd.renderer.utilities.ImageInfo(buffer,centerPoint,symbolBounds,imageBounds);
            //test
            //ii.SaveImageToFile("C:\\icon.png", ImageInfo.FormatPNG);
            return ii;

        }
    },
    createBuffer: function(width, height)
    {
	var buffer = document.createElement('canvas');
	buffer.width = width;
	buffer.height = height;
	return buffer;
	
    }
};
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
/** @class */
armyc2.c2sd.renderer.SinglePointRenderer = (function () {
    
    var SymbolUtilities = armyc2.c2sd.renderer.utilities.SymbolUtilities,
        UnitFontLookup = armyc2.c2sd.renderer.utilities.UnitFontLookup,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings,
        SO = armyc2.c2sd.renderer.so,
        RendererUtilities = armyc2.c2sd.renderer.utilities.RendererUtilities,
        TextInfo = armyc2.c2sd.renderer.utilities.TextInfo,
        ImageInfo = armyc2.c2sd.renderer.utilities.ImageInfo,
        MilStdAttributes = armyc2.c2sd.renderer.utilities.MilStdAttributes,
        SymbolDimensions = armyc2.c2sd.renderer.utilities.SymbolDimensions,
        ModifiersUnits = armyc2.c2sd.renderer.utilities.ModifiersUnits,
        ModifiersTG = armyc2.c2sd.renderer.utilities.ModifiersTG,
        SinglePointLookup = armyc2.c2sd.renderer.utilities.SinglePointLookup,
        SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable;
    //var UDT = armyc2.c2sd.renderer.utilities.UnitDefTable;
    
    var textInfoBuffer = null,
        textInfoContext = null,
        textInfoContextFont = null,
        _bufferUnit = null,
        _bufferUnitSize = 150,
        _bufferSymbol = null,
        _bufferSymbolSize = 150,
        _bufferDisplayModifiers = null,
        _document = document;
		
                
    var _statusColorMap = {"C":"#00FF00","D":"#FFFF00","X":"#FF0000","F":"#0000FF"},
        //_unitTextModifierKeys = {"B":"B","C":"C","F":"F","G":"G","H":"H","H1":"H1","H2":"H2","J":"J","K":"K","L":"L","M":"M","N":"N","P":"P","R2":"R2","T":"T","T1":"T1","V":"V","W":"W","W1":"W1","X":"X","Y":"Y","Z":"Z","AC":"AC","AD":"AD","AE":"AE","AF":"AF","CN":"CN"},
        //_tgTextModifierKeys = {"B":"B","C":"C","F":"F","G":"G","H":"H","H1":"H1","H2":"H2","N":"N","T":"T","T1":"T1","V":"V","W":"W","W1":"W1","X":"X","Y":"Y","AM":"AM","AN":"AN","Length":"Length","Width":"Width","Radius":"Radius","Angle":"Angle"};
        _unitTextModifierKeys = ["B","C","F","G","H","H1","H2","J","K","L","M","N","P","R2","T","T1","V","W","W1","X","Y","Z","AC","AD","AE","AF","CN"],
        _tgTextModifierKeys = ["B","C","F","G","H","H1","H2","N","T","T1","V","W","W1","X","Y","AM","AN","Length","Width","Radius","Angle"];
    
return{    
    
    
    checkModifierFont: function()
    {
        if(textInfoBuffer===null)
            textInfoBuffer = this.createBuffer(1,1);
        if(textInfoContext===null && textInfoBuffer.getContext !== undefined)
        {
            textInfoContext = textInfoBuffer.getContext('2d');
            textInfoContext.lineCap = "butt";
            textInfoContext.lineJoin = "miter";
            textInfoContext.miterLimit = 3;
        }
        else if(!(textInfoContext))
        {
            textInfoContext = {};//for IE8
        }
        if(textInfoContextFont !== RendererSettings.getModifierFont())
        {
            textInfoContextFont = RendererSettings.getModifierFont();
            textInfoContext.font = textInfoContextFont;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Unit Functions">
    /**
     * 
     * @param {type} symbolID
     * @param {type} modifiers
     * @returns {armyc2.c2sd.renderer.armyc2.c2sd.renderer.utilities.ImageInfo}
     */
    renderUnit: function (symbolID, modifiers)
    {
        // <editor-fold defaultstate="collapsed" desc="Variables">
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
        
        var buffer = null,
            ctx = null;
        
        if(render && _bufferUnit === null)
        {
            _bufferUnit = this.createBuffer(_bufferUnitSize,_bufferUnitSize);
            ctx = _bufferUnit.getContext('2d');
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 3;
            ctx = null;
        }
        
        
        if(modifiers === undefined || modifiers === null)
            modifiers = {};
	
        var pixel = null,//point to center symbol on.
            basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID),
            symStd = modifiers[MilStdAttributes.SymbologyStandard],
            ufli = UnitFontLookup.getUnitLookup(basicID, symStd),
            strUnitFont = "";
            
        
        var intFill = UnitFontLookup.getFillCode(symbolID, symStd),
            intFrame = UnitFontLookup.getFrameCode(symbolID, intFill, symStd),
            fillColor = SymbolUtilities.getFillColorOfAffiliation(symbolID).toHexString(false),
            lineColor = SymbolUtilities.getLineColorOfAffiliation(symbolID).toHexString(false),
            fill = (intFill > 0) ? String.fromCharCode(intFill): null,
            frame = (intFrame > 0) ? String.fromCharCode(intFrame): null,
            mapping1 = ufli.getMapping1(symbolID),
            mapping2 = ufli.getMapping2(),
            symbol1 = (mapping1 !==null) ? String.fromCharCode(mapping1) : null,
            symbol2 = (mapping2 !==null) ? String.fromCharCode(mapping2) : null,
            color1 = ufli.getColor1(),
            color2 = ufli.getColor2(),
            alpha = 1.0,
            lineAlpha = 1.0,
            fillAlpha = 1.0;
    
        var hasDisplayModifiers = false;
        var hasTextModifiers = false;
        
        var intFrameAssume = -1,
            frameAssume = null;
        
        if(render===false)
            ctx={};
        
        if(symStd > RendererSettings.Symbology_2525B)
        {
            var affiliation = symbolID.charAt(1);
            switch(affiliation)
            {
                case 'P':
                case 'A':
                case 'S':
                case 'G':
                case 'M':
                    if(symbolID.charAt(2) === 'U' && 
							(symbolID.substring(4, 6) === "WM" ||
                            symbolID.substring(4, 7) === "WDM"))
					{
						if(symbolID.charAt(3) !== 'A')
						{
							intFill++;
							fill = String.fromCharCode(intFill);
						}
						intFrameAssume = intFill - 1;
						intFrame = -1;
						frame = null;
					}
					else
					{
						intFrame = intFill + 2;
						intFrameAssume = intFill + 1;
						frame = String.fromCharCode(intFrame);
					}
					
					break;
            }
            if(intFrameAssume > 0)
                frameAssume = String.fromCharCode(intFrameAssume);
        }
            
        this.checkModifierFont();
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Parse Modifiers">
        if(modifiers === undefined || modifiers === null)
            modifiers = {};
        //determine font size necessary to match desired pixel size/////////////
        var pixelSize = -1;
        if(modifiers[MilStdAttributes.PixelSize])
        {
            pixelSize = modifiers[MilStdAttributes.PixelSize];
        }
        else
        {
            pixelSize = RendererSettings.getDefaultPixelSize();
        }
        
        var keepUnitRatio = true;
        
        if(modifiers[MilStdAttributes.KeepUnitRatio] !== undefined)
        {
            keepUnitRatio = modifiers[MilStdAttributes.KeepUnitRatio];
        }
        
        var icon = false;
        if(modifiers[MilStdAttributes.Icon] !== undefined)
        {
            icon = modifiers[MilStdAttributes.Icon];
        }
        
        if(icon)//icon won't show modifiers or display icons
        {
            keepUnitRatio = false;
            hasDisplayModifiers = false;
            hasTextModifiers = false;
            symbolID = symbolID.substring(0,10) + "-----";
        }
        else
        {
            hasDisplayModifiers = this.hasDisplayModifiers(symbolID, modifiers);
            hasTextModifiers = this.hasTextModifiers(symbolID, modifiers);
        }
        
        if(modifiers[MilStdAttributes.LineColor] !== undefined)
        {
            lineColor = modifiers[MilStdAttributes.LineColor];
			if (lineColor !== "transparent")	{//20200313				
	            lineColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString(lineColor);
                lineAlpha = lineColor.getAlpha() / 255.0;
	            lineColor = lineColor.toHexString(false);
			}else{
				lineAlpha = 0;
			}
        }
        if(modifiers[MilStdAttributes.FillColor] !== undefined)
        {
            fillColor = modifiers[MilStdAttributes.FillColor];
			if (fillColor !== "transparent")	{//20200313	
				fillColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString(fillColor);
				fillAlpha = fillColor.getAlpha() / 255.0;
	            fillColor = fillColor.toHexString(false);
			}else{
				fillAlpha = 0;
			}
        }
        if(modifiers[MilStdAttributes.Alpha] !== undefined)
        {
            alpha = modifiers[MilStdAttributes.Alpha] / 255.0;
            if(alpha !== 1)
            {
                if (lineAlpha !== 0) { //20200313 not transparent
                    lineAlpha = alpha;
                }
                if (fillAlpha !== 0) { //20200313 not transparent
                    fillAlpha = alpha;
                }
            }
        } 
        if(modifiers[MilStdAttributes.IconColor] !== undefined)
        {
            color1 = modifiers[MilStdAttributes.IconColor];
        }

		//Just for sea mines
		if(symbolID.charAt(2) === 'U' &&
						symbolID.substring(4, 6) === "WM")
		{
			if(symStd === RendererSettings.Symbology_2525B)
			{
				if(modifiers[MilStdAttributes.LineColor] !== undefined)
				{
					color1 = lineColor;
				}
				//color2 = fillColor;
			}
			else if(symStd === RendererSettings.Symbology_2525C)
			{
				if(modifiers[MilStdAttributes.LineColor] !== undefined)
				{
					fillColor = lineColor;
				}
			}
			
		}
		else if(symbolID.charAt(2) === 'S' &&
			symbolID.charAt(4) === 'O')//own track, //SUSPO
		{
			if(modifiers[MilStdAttributes.LineColor] !== undefined)
			{
				fillColor = modifiers[MilStdAttributes.LineColor];
			}
		}	//*/	
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Determine font size">
        
        var symbolBounds = SymbolDimensions.getUnitBounds(intFill, 50);
        var rect = SymbolDimensions.getUnitBounds(intFill, 50);
        if(pixelSize > 0 && keepUnitRatio ===true)
        {
            var heightRatio = UnitFontLookup.getUnitRatioHeight(intFill),
                widthRatio = UnitFontLookup.getUnitRatioWidth(intFill);
            var ratio = -1;
            if(heightRatio > widthRatio)
            {
                pixelSize = (pixelSize / 1.5) * heightRatio;
            }
            else
            {
                pixelSize = (pixelSize / 1.5) * widthRatio;
            }
        }
        if(pixelSize > 0)
        {
            ratio = Math.min((pixelSize / rect.getHeight()), (pixelSize / rect.getWidth()));

            //ctx.font="37.5pt UnitFontsC"; //50 / 96 * 72
            
            var fontsize = 50;
            //ratio = ratio / 72 * 96;
            //fontsize = (((fontsize * ratio) ));
            fontsize = (((fontsize * ratio) / 96) * 72);

            strUnitFont = fontsize + "pt UnitFont";
            //ctx.font= "75pt UnitFontsC";
            symbolBounds = SymbolDimensions.getUnitBounds(intFill, (50 * ratio));
        }
        else
        {
            strUnitFont = 150 + "pt UnitFont";
        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Draw Core Symbol">

        var symbolWidth = Math.round(symbolBounds.getWidth()),
            symbolHeight = Math.round(symbolBounds.getHeight());
        if(render === true)
        {
            if((hasDisplayModifiers === true || hasTextModifiers === true) &&
                    symbolWidth < _bufferUnitSize && symbolHeight < _bufferUnitSize)
            {
                buffer = _bufferUnit;//
                ctx = buffer.getContext('2d');
                ctx.clearRect(0,0,_bufferUnitSize,_bufferUnitSize);
                if(ctx.globalAlpha < 1.0)
                    ctx.globalAlpha = 1.0;
            }
            else
            {//*/
                buffer = this.createBuffer(symbolWidth,symbolHeight);
                ctx = buffer.getContext('2d');
                ctx.lineCap = "butt";
                ctx.lineJoin = "miter";
                ctx.miterLimit = 3;
            }
            ctx.font = strUnitFont;
        
        }
        
        var x = Math.round(symbolBounds.getWidth()/2),
            y = Math.round((symbolBounds.getHeight()/2) + symbolBounds.getY());
	
        if(render === true)
        {
            if(color1 === "")
            {
                color1 = "#000000";
            }
            
            /*if(alpha < 1.0)
            {
                ctx.globalAlpha = alpha;
            }//*/
			var currentAlpha = 1;
			if(frameAssume !== null && frameAssume !== ""  && intFrame === -1)
            {
                if(lineAlpha !== 1)
                {
                    ctx.globalAlpha = lineAlpha;
                    currentAlpha = lineAlpha;
                }
                ctx.fillStyle = "#ffffff";
                ctx.fillText(frameAssume, x, y);
				frameAssume = null;
            }

            if(fill !== null && fill !== "")
            {
                if(currentAlpha !== fillAlpha)
                {
                    ctx.globalAlpha = fillAlpha;
                    currentAlpha = fillAlpha;   
                }
                
                ctx.fillStyle=fillColor;
                ctx.fillText(fill,x,y);
            }

            if(currentAlpha !== lineAlpha)
            {
                ctx.globalAlpha = lineAlpha;
                currentAlpha = lineAlpha;   
            }
            
			if(frameAssume !== null && frameAssume !== "")
            {
                if(lineAlpha !== fillAlpha)
                    ctx.globalAlpha = lineAlpha;
                    
                ctx.fillStyle = "#ffffff";
                ctx.fillText(frameAssume, x, y);
            }
			
            if(frame !== null && frame !== "")
            {
                ctx.fillStyle = lineColor;
                ctx.fillText(frame, x, y);
            }

            if(alpha !== 1 && currentAlpha !== alpha)
            {
                ctx.globalAlpha = alpha;
                currentAlpha = alpha;   
            }
            else if(alpha === 1 && currentAlpha !== 1)
            {
                ctx.globalAlpha = 1;
                currentAlpha = 1;
            }

            if(symbol2 !== null && symbol2 !== "")
            {
                ctx.fillStyle = color2;
                ctx.fillText(symbol2, x, y);
            }

            if(symbol1 !== null && symbol1 !== "")
            {
                ctx.fillStyle = color1;
                ctx.fillText(symbol1, x, y);
            }
        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Build Core Symbol ImageInfo">
        //no good on glyhps
        //var tmFrameWidth = ctx.measureText(frame);
        
        //sometimes there's a y offset to help center the symbol
        //need to remove that before creating the imageInfo object.
        symbolBounds.setLocation(0,0);
        
        
        var imageBounds = new SO.Rectangle(0,0,symbolWidth,symbolHeight);
        
        var centerPoint = new SO.Point(x,y);
        
        var ii = new ImageInfo(buffer,centerPoint,symbolBounds,imageBounds);
        
        // </editor-fold>
	
        // <editor-fold defaultstate="collapsed" desc="Process Display Modifiers">
        var iinew = null;
        
        if(hasDisplayModifiers===true)
            iinew = this.processUnitDisplayModifiers(ii, symbolID, modifiers,hasTextModifiers);
        
        if(iinew !== null)
            ii = iinew;
        iinew = null;
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Process Text Modifiers">
        
        if(hasTextModifiers===true)
            iinew = this.processUnitModifiers(ii,symbolID,modifiers);
        
        if(iinew !== null)
            ii = iinew;
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Cleanup">
        ctx = null;
        buffer = null;
        // </editor-fold>
        
        if(icon)
            return ii.getSquareImageInfo();
        else
            return ii;
    },
    /**
     * 
     * @param {ImageInfo} ii
     * @param {String} symbolID
     * @param {type} modifiers
     * @returns {ImageInfo}
     */
    processUnitDisplayModifiers: function(ii, symbolID, modifiers){
        
//        if(_bufferDisplayModifiers===null)
//                    _bufferDisplayModifiers = this.createBuffer(250,250);
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
                
        var newii = null,
            symbolBounds = ii.getSymbolBounds(),
            imageBounds = ii.getImageBounds(),
            centerPoint = ii.getCenterPoint(),
            tiEchelon = null,
            echelonBounds = null,
            amBounds = null,
            buffer = null,
            ctx = null,
            offsetX = 0,
            offsetY = 0,
            hasOCMSlash = false,
            symStd = modifiers[MilStdAttributes.SymbologyStandard],
            lineColor = SymbolUtilities.getLineColorOfAffiliation(symbolID).toHexString(false);
            if(modifiers[MilStdAttributes.LineColor] !== undefined)
                lineColor = modifiers[MilStdAttributes.LineColor];

            
            // <editor-fold defaultstate="collapsed" desc="Build Mobility Modifiers">
            var mobilityBounds = null;
            var shapes = new Array();
            if(symbolID.charAt(10)===("M") || symbolID.charAt(10)===("N"))
            {
                
                //Draw Mobility
                
                var x = 0,
                    y = 0,
                    centerX = 0,
                    bottomY = 0,
                    height = 0,
                    width = 0,
                    middleY = 0,
                    wheelOffset = 1,
                    wheelSize = 5,
                    rrHeight = 5,
                    rrArcWidth = 8;
            
                var mobility = symbolID.substring(10, 12);
                    x = symbolBounds.getX()+1;
                    y = symbolBounds.getY();
                    height = Math.round(symbolBounds.getHeight());
                    width = Math.round(symbolBounds.getWidth())-1;
                    bottomY = y+height+2;
            
                if(symbolID.charAt(10)===("M") && 
                    SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.R_MOBILITY_INDICATOR)){
                
                    wheelSize = width / 7;
                    rrHeight = width / 7;
                    //rrArcWidth = width / 7;
                    
                    switch(mobility)
                    {
                        case "MO":
                            //line
                            shapes.push(new SO.Line(x,bottomY,x+width,bottomY));
                            //left circle
                            shapes.push(new SO.Ellipse(x,bottomY + wheelOffset,wheelSize,wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //right circle
                            shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            break;
                            
                        case "MP":
                            //line
                            var line = new SO.Line(x,bottomY,x+width,bottomY);
                            shapes.push(line);
                            //shapeMobility.append(new Line2D.Double(x,bottomY,x + width, bottomY), false);
                            //left circle
                            shapes.push(new SO.Ellipse(x, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //right circle
                            shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //center wheel
                            shapes.push(new SO.Ellipse(x + (width/2)-(wheelSize/2), bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + (width/2)-(wheelSize/2), bottomY + wheelOffset, wheelSize, wheelSize), false);

                            break;
                            
                        case "MQ":
                            //round rectangle
                            shapes.push(new SO.RoundedRectangle(x, bottomY, width, rrHeight,rrArcWidth));
                            //shapeMobility.append(new RoundRectangle2D.Double(x, bottomY, width, rrHeight, rrArcWidth, rrHeight),false);
                            break;
                            
                        case "MR":
                            //round rectangle
                            shapes.push(new SO.RoundedRectangle(x, bottomY, width, rrHeight,rrArcWidth));
                            //shapeMobility.append(new RoundRectangle2D.Double(x, bottomY, width, rrHeight, rrArcWidth, rrHeight),false);
                            //left circle
                            shapes.push(new SO.Ellipse(x - wheelSize - wheelSize, bottomY, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x - wheelSize - wheelSize, bottomY, wheelSize, wheelSize), false);
                            break;
                            
                        case "MS":
                            //line
                            var line = new SO.Line(x + wheelSize,bottomY + (wheelSize/2),
                                                    x + width - wheelSize, bottomY + (wheelSize/2));
                            shapes.push(line);
                            //shapeMobility.append(new Line2D.Double(x + wheelSize,bottomY + (wheelSize/2),x + width - wheelSize, bottomY + (wheelSize/2)), false);
                            //left circle
                            shapes.push(new SO.Ellipse(x, bottomY, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x, bottomY, wheelSize, wheelSize), false);
                            //right circle
                            shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY, wheelSize, wheelSize), false);
                            break;
                            
                        case "MT":
                            //line
                            var line = new SO.Line(x,bottomY,x + width, bottomY);
                            shapes.push(line);
                            //shapeMobility.append(new Line2D.Double(x,bottomY,x + width, bottomY), false);
                            //left circle
                            shapes.push(new SO.Ellipse(x + wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //left circle2
                            shapes.push(new SO.Ellipse(x, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //right circle
                            shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            //right circle2
                            shapes.push(new SO.Ellipse(x + width - wheelSize - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                            //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                            break;
                            
                        case "MU":
                            var muPath = new SO.Path();
                            muPath.moveTo(x,bottomY);
                            muPath.lineTo(x + 5, bottomY + 5);
                            muPath.lineTo(x + width, bottomY + 5);
                            shapes.push(muPath);

                            break;
                            
                        case "MV":
                            var path = new SO.Path();
                        
                            path.moveTo(x,bottomY);
                            path.bezierCurveTo(x, bottomY, x-rrArcWidth, bottomY+3, x, bottomY+rrHeight);
                            path.lineTo(x + width, bottomY + rrHeight);
                            shapes.push(path);
                            break;
                            
                        case "MW":
                            centerX = Math.round(symbolBounds.getCenterX());
                        
                            var mwPath = new SO.Path();
                            mwPath.moveTo(centerX, bottomY + rrHeight+2);
                            mwPath.lineTo(centerX - 3, bottomY);
                            mwPath.lineTo(centerX - 6, bottomY + rrHeight+2);

                            mwPath.moveTo(centerX, bottomY + rrHeight+2);
                            mwPath.lineTo(centerX + 3, bottomY);
                            mwPath.lineTo(centerX + 6, bottomY + rrHeight+2);
                            shapes.push(mwPath);

                            break;
                            
                        case "MX":
                            centerX = Math.round(symbolBounds.getCenterX());
                        
                            var line = new SO.Line(x + width, bottomY,x, bottomY);
                            shapes.push(line);

                            var quarterX = (centerX - x)/2;
                            //var quarterY = (((bottomY + rrHeight) - bottomY)/2);
                            shapes.push(new SO.BCurve(x, bottomY,x+quarterX, bottomY+rrHeight, centerX + quarterX, bottomY + rrHeight, x + width, bottomY));
                            break;
                            
                        case "MY":
                            var incrementX = width / 7,
                            middleY = (bottomY + (rrHeight/2));

                            var x = Math.round(x + (incrementX/2));
                            var r = Math.round(incrementX/2);

                            var path = new SO.Path();
                            path.arc(x,middleY,r,180,0);
                            path.arc(x + incrementX,middleY,r,180,0, true);
                            path.arc(x + incrementX*2,middleY,r,180,0);
                            path.arc(x + incrementX*3,middleY,r,180,0,true);
                            path.arc(x + incrementX*4,middleY,r,180,0);
                            path.arc(x + incrementX*5,middleY,r,180,0,true);
                            path.arc(x + incrementX*6,middleY,r,180,0);
                            shapes.push(path);
                            break;
                            
                        default:
                            break;
                    }
                    // <editor-fold defaultstate="collapsed" desc="if else... Build Mobility Modifiers">
                    /*
                    if(mobility === ("MO"))//mobility wheeled (limited cross country)
                    {

                        //line
                        shapes.push(new SO.Line(x,bottomY,x+width,bottomY));
                        //left circle
                        shapes.push(new SO.Ellipse(x,bottomY + wheelOffset,wheelSize,wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //right circle
                        shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);

                    }
                    else if(mobility === ("MP"))//mobility wheeled (cross country)
                    {
                        //line
                        var line = new SO.Line(x,bottomY,x+width,bottomY);
                        shapes.push(line);
                        //shapeMobility.append(new Line2D.Double(x,bottomY,x + width, bottomY), false);
                        //left circle
                        shapes.push(new SO.Ellipse(x, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //right circle
                        shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //center wheel
                        shapes.push(new SO.Ellipse(x + (width/2)-(wheelSize/2), bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + (width/2)-(wheelSize/2), bottomY + wheelOffset, wheelSize, wheelSize), false);

                    }
                    else if(mobility === ("MQ"))//mobility tracked
                    {
                        //round rectangle
                        shapes.push(new SO.RoundedRectangle(x, bottomY, width, rrHeight,rrArcWidth));
                        //shapeMobility.append(new RoundRectangle2D.Double(x, bottomY, width, rrHeight, rrArcWidth, rrHeight),false);
                    }
                    else if(mobility === ("MR"))//mobility wheeled and tracked combination
                    {
                        //round rectangle
                        shapes.push(new SO.RoundedRectangle(x, bottomY, width, rrHeight,rrArcWidth));
                        //shapeMobility.append(new RoundRectangle2D.Double(x, bottomY, width, rrHeight, rrArcWidth, rrHeight),false);
                        //left circle
                        shapes.push(new SO.Ellipse(x - wheelSize - wheelSize, bottomY, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x - wheelSize - wheelSize, bottomY, wheelSize, wheelSize), false);

                    }
                    else if(mobility === ("MS"))//mobility towed
                    {
                        //line
                        var line = new SO.Line(x + wheelSize,bottomY + (wheelSize/2),
                                                x + width - wheelSize, bottomY + (wheelSize/2));
                        shapes.push(line);
                        //shapeMobility.append(new Line2D.Double(x + wheelSize,bottomY + (wheelSize/2),x + width - wheelSize, bottomY + (wheelSize/2)), false);
                        //left circle
                        shapes.push(new SO.Ellipse(x, bottomY, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x, bottomY, wheelSize, wheelSize), false);
                        //right circle
                        shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY, wheelSize, wheelSize), false);
                    }
                    else if(mobility === ("MT"))//mobility rail
                    {
                        //line
                        var line = new SO.Line(x,bottomY,x + width, bottomY);
                        shapes.push(line);
                        //shapeMobility.append(new Line2D.Double(x,bottomY,x + width, bottomY), false);
                        //left circle
                        shapes.push(new SO.Ellipse(x + wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //left circle2
                        shapes.push(new SO.Ellipse(x, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //right circle
                        shapes.push(new SO.Ellipse(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                        //right circle2
                        shapes.push(new SO.Ellipse(x + width - wheelSize - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize));
                        //shapeMobility.append(new Ellipse2D.Double(x + width - wheelSize - wheelSize, bottomY + wheelOffset, wheelSize, wheelSize), false);
                    }
                    else if(mobility === ("MU"))//mobility over the snow
                    {
                        
                        var muPath = new SO.Path();
                        muPath.moveTo(x,bottomY);
                        muPath.lineTo(x + 5, bottomY + 5);
                        muPath.lineTo(x + width, bottomY + 5);
                        shapes.push(muPath);
//                        shapeMobility.moveTo(x, bottomY);
//                        shapeMobility.lineTo(x + 5, bottomY + 5);
//                        shapeMobility.lineTo(x + width, bottomY + 5);
                    }
                    else if(mobility === ("MV"))//mobility sled
                    {
                        var path = new SO.Path();
                        
                        path.moveTo(x,bottomY);
                        path.bezierCurveTo(x, bottomY, x-rrArcWidth, bottomY+3, x, bottomY+rrHeight);
                        path.lineTo(x + width, bottomY + rrHeight);
                        shapes.push(path);
                    
                    }
                    else if(mobility === ("MW"))//mobility pack animals
                    {
                        centerX = Math.round(symbolBounds.getCenterX());
                        
                        var mwPath = new SO.Path();
                        mwPath.moveTo(centerX, bottomY + rrHeight+2);
                        mwPath.lineTo(centerX - 3, bottomY);
                        mwPath.lineTo(centerX - 6, bottomY + rrHeight+2);
                                                
                        mwPath.moveTo(centerX, bottomY + rrHeight+2);
                        mwPath.lineTo(centerX + 3, bottomY);
                        mwPath.lineTo(centerX + 6, bottomY + rrHeight+2);
                        shapes.push(mwPath);
                        
//                        centerX = Math.round(symbolBounds.getCenterX());
//                        shapeMobility.moveTo(centerX, bottomY + rrHeight+2);
//                        shapeMobility.lineTo(centerX - 3, bottomY);
//                        shapeMobility.lineTo(centerX - 6, bottomY + rrHeight+2);
//                        shapeMobility.moveTo(centerX, bottomY + rrHeight+2);
//                        shapeMobility.lineTo(centerX + 3, bottomY);
//                        shapeMobility.lineTo(centerX + 6, bottomY + rrHeight+2);

                    }
                    else if(mobility === ("MX"))//mobility barge
                    {
                        centerX = Math.round(symbolBounds.getCenterX());
                        
                        var line = new SO.Line(x + width, bottomY,x, bottomY);
                        shapes.push(line);
                        
                        var quarterX = (centerX - x)/2;
                        //var quarterY = (((bottomY + rrHeight) - bottomY)/2);
                        shapes.push(new SO.BCurve(x, bottomY,x+quarterX, bottomY+rrHeight, centerX + quarterX, bottomY + rrHeight, x + width, bottomY));
                        
//                        centerX = bounds.getCenterX();
//                        shapeMobility.moveTo(x+width, bottomY);
//                        shapeMobility.lineTo(x, bottomY);
//                        var quarterX = (centerX - x)/2;
//                        var quarterY = (((bottomY + rrHeight) - bottomY)/2);
//                        shapeMobility.curveTo(x+quarterX, bottomY+rrHeight, centerX + quarterX, bottomY + rrHeight, x + width, bottomY);
                    }
                    else if(mobility === ("MY"))//mobility amphibious
                    {
                        var incrementX = width / 7,
                        middleY = (bottomY + (rrHeight/2));

                        var x = Math.round(x + (incrementX/2));
                        var r = Math.round(incrementX/2);
                        
                        var path = new SO.Path();
                        path.arc(x,middleY,r,180,0);
                        path.arc(x + incrementX,middleY,r,180,0, true);
                        path.arc(x + incrementX*2,middleY,r,180,0);
                        path.arc(x + incrementX*3,middleY,r,180,0,true);
                        path.arc(x + incrementX*4,middleY,r,180,0);
                        path.arc(x + incrementX*5,middleY,r,180,0,true);
                        path.arc(x + incrementX*6,middleY,r,180,0);
                        shapes.push(path);

                    }//*/
                    // </editor-fold>
                    
                }
                //Draw Towed Array Sonar
                else if(symbolID.charAt(10)===("N") && 
                        SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AG_AUX_EQUIP_INDICATOR)){
                    var offsetY = 1;
                    centerX = symbolBounds.getCenterX();
                    var squareOffset = Math.round(wheelSize/2);
                    middleY = ((rrHeight/2)+bottomY) + offsetY;//+1 for offset from symbol
                    if(symbolID.substring(10, 12) === ("NS"))
                    {
                        //subtract 0.5 becase lines 1 pixel thick get aliased into
                        //a line two pixels wide.
                        //line
                        shapes.push(new SO.Line(centerX-1,bottomY-1,centerX-1, bottomY + rrHeight + 3));
                        //shapeLines.append(new Line2D.Double(centerX,bottomY - 2,centerX, bottomY + rrHeight + 1), false);
                        //line
                        shapes.push(new SO.Line(x,middleY,x + width, middleY));
                        //shapeLines.append(new Line2D.Double(x,middleY,x + width, middleY), false);
                        //square
                        shapes.push(new SO.Rectangle(x-squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(x-squareOffset, bottomY, 5, 5), false);
                        //square
                        shapes.push(new SO.Rectangle(Math.round(centerX-squareOffset), bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(centerX-squareOffset, bottomY, 5, 5), false);
                        //square
                        shapes.push(new SO.Rectangle(x + width - squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(x + width - squareOffset, bottomY, 5, 5), false);
                    }
                    else if(symbolID.substring(10, 12) === ("NL"))
                    {
                        var leftX = x+(centerX - x)/2,
                            rightX = centerX + (x + width - centerX)/2;
                    
                        //line vertical left
                        shapes.push(new SO.Line(leftX,bottomY - 1,leftX, bottomY + rrHeight + 3));
                        //shapeLines.append(new Line2D.Double(leftX,bottomY - 2,leftX, bottomY + rrHeight + 1), false);
                        //line vertical right
                        shapes.push(new SO.Line(rightX,bottomY - 1,rightX, bottomY + rrHeight + 3));
                        //shapeLines.append(new Line2D.Double(rightX,bottomY - 2,rightX, bottomY + rrHeight + 1), false);
                        //line horizontal
                        shapes.push(new SO.Line(x,middleY,x + width, middleY));
                        //shapeLines.append(new Line2D.Double(x,middleY,x + width, middleY), false);
                        //square left
                        shapes.push(new SO.Rectangle(x-squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(x-squareOffset, bottomY, 5, 5), false);
                        //square middle
                        shapes.push(new SO.Rectangle(centerX-squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(centerX-squareOffset, bottomY, 5, 5), false);
                        //square right
                        shapes.push(new SO.Rectangle(x + width - squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(x + width - squareOffset, bottomY, 5, 5), false);
                        //square middle left
                        shapes.push(new SO.Rectangle(leftX - squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(leftX - squareOffset, bottomY, 5, 5), false);
                        //square middle right
                        shapes.push(new SO.Rectangle(rightX - squareOffset, bottomY+offsetY, 5, 5));
                        //shapeSquares.append(new Rectangle2D.Double(rightX - squareOffset, bottomY, 5, 5), false);

                    }
                }
                
                //get mobility bounds
                if(shapes !== null && shapes.length > 0)
                {

                    //build mobility bounds
                    mobilityBounds = shapes[0].getBounds();
                    var size = shapes.length;
                    var tempShape = null;
                    for(var i=1; i<size;i++)
                    {
                        tempShape = shapes[i];
                        mobilityBounds.union(tempShape.getBounds());
                    }
                    
                    //grow by one because we use a line thickness of 2.
                    mobilityBounds.grow(1);

                    imageBounds.union(mobilityBounds);
                }
            }
            // </editor-fold>
            
            // <editor-fold defaultstate="collapsed" desc="Build Echelon">
            //Draw Echelon
            var strEchelon = SymbolUtilities.getEchelon(symbolID);//symbolID.substring(11, 12);
            strEchelon = SymbolUtilities.getEchelonText(strEchelon);
            if(strEchelon !== null && SymbolUtilities.hasInstallationModifier(symbolID)===false
                    && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.B_ECHELON))
            {

                if(strEchelon!==null)
                {
                    var echelonOffset = 2,
                        outlineOffset = RendererSettings.getTextOutlineWidth();

                    var tiEchelon = new TextInfo(strEchelon,0,0,textInfoContext,textInfoContextFont);
                    echelonBounds = tiEchelon.getTextBounds();

                    var y = Math.round(symbolBounds.getY() - echelonOffset),
                        x = Math.round(symbolBounds.getX() + (symbolBounds.getWidth()/2) - 
                                (echelonBounds.getWidth()/2));
                    tiEchelon.setLocation(x,y);

                    //There will never be lowercase characters in an echelon so trim that fat.    
                    //Remove the descent from the bounding box.
                    //tiEchelon.getTextBounds().shiftBR(0,Math.round(-(echelonBounds.getHeight()*0.3)));                         


                    //adjust for outline.
                    echelonBounds = tiEchelon.getTextOutlineBounds();
                    echelonBounds.shift(0,-outlineOffset);// - Math.round(echelonOffset/2));
                    tiEchelon.setLocation(x,y-outlineOffset);

                    imageBounds.union(echelonBounds);
                }
            }
            // </editor-fold>
            
            // <editor-fold defaultstate="collapsed" desc="Build Affiliation Modifier">
            //Draw Echelon
            var affiliationModifier = null;
            if(RendererSettings.getDrawAffiliationModifierAsLabel()===false)
            {
                affiliationModifier = SymbolUtilities.getUnitAffiliationModifier(symbolID, symStd);
            }
            if(affiliationModifier !== null)
            {

                var amOffset = 2,
                    outlineOffset = RendererSettings.getTextOutlineWidth();

                var tiAM = new TextInfo(affiliationModifier,0,0,textInfoContext,textInfoContextFont);
                amBounds = tiAM.getTextBounds();

                var x,y;
                
                if(echelonBounds !== null && 
                        ((echelonBounds.getX() + echelonBounds.getWidth() > symbolBounds.getX() + symbolBounds.getWidth())))
                {
                    y = Math.round(symbolBounds.getY() - amOffset),
                    x = echelonBounds.getX() + echelonBounds.getWidth();
                }
                else
                {
                    y = Math.round(symbolBounds.getY() - amOffset),
                    x = Math.round(symbolBounds.getX() + symbolBounds.getWidth());
                }
                tiAM.setLocation(x,y);

                //There will never be lowercase characters in an echelon so trim that fat.    
                //Remove the descent from the bounding box.
                //tiAM.getTextBounds().shiftBR(0+outlineOffset,Math.round(-(amBounds.getHeight()*0.3)));                         


                //adjust for outline.
                amBounds = tiAM.getTextOutlineBounds();
                amBounds.shift(0,-outlineOffset);// - Math.round(echelonOffset/2));
                tiAM.setLocation(x,y-outlineOffset);

                imageBounds.union(amBounds);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Build Task Force">
            var tfBounds = null,
                tfRectangle = null;
            if(SymbolUtilities.isTaskForce(symbolID) && 
                SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.D_TASK_FORCE_INDICATOR))
            {
                if(echelonBounds !== null)
                {
                    tfRectangle = new SO.Rectangle(echelonBounds.getX()-1,
                                echelonBounds.getY()-1,// + outlineOffset,
                                echelonBounds.getWidth()+3,
                                symbolBounds.getY() - (echelonBounds.getY() - 1));//echelonBounds.getHeight()+3);
                    tfBounds = new SO.Rectangle(echelonBounds.getX()-2,
                                echelonBounds.getY()-2,
                                echelonBounds.getWidth()+5,
                                echelonBounds.getHeight()+4);
                }
                else
                {
                    var height = Math.round(symbolBounds.getHeight() / 4),
                        width = Math.round(symbolBounds.getWidth() / 3);

                    tfRectangle = new SO.Rectangle(symbolBounds.getX() + width,
                    symbolBounds.getY() - height,
                    width,
                    height);

                    tfBounds = new SO.Rectangle(tfRectangle.getX() + -1,
                    tfRectangle.getY() - 1,
                    tfRectangle.getWidth() + 2,
                    tfRectangle.getHeight() + 2);

                }
                imageBounds.union(tfBounds);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Build Feint Dummy Indicator">
            var fdiBounds = null,
                fdiTop = null,
                fdiLeft = null,
                fdiRight = null;
            if((SymbolUtilities.isFeintDummy(symbolID) ||
                    SymbolUtilities.isFeintDummyInstallation(symbolID)) && 
                        SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AB_FEINT_DUMMY_INDICATOR))
            {
                //create feint indicator /\
                fdiLeft = new SO.Point(symbolBounds.getX(),symbolBounds.getY());
                fdiRight = new SO.Point(symbolBounds.getX() + symbolBounds.getWidth(),symbolBounds.getY());

                var affiliation = symbolID.charAt(1);
                if(affiliation===("F") ||
                        affiliation===("A") ||
                        affiliation===("D") ||
                        affiliation===("M") ||
                        affiliation===("J") ||
                        affiliation===("K"))
                {
                    fdiTop = new SO.Point(Math.round(symbolBounds.getCenterX()), Math.round(symbolBounds.getY() - (symbolBounds.getHeight() * .75)));
                }
                else
                {
                    fdiTop = new SO.Point(Math.round(symbolBounds.getCenterX()), Math.round(symbolBounds.getY() - (symbolBounds.getHeight() * .54)));
                }

                fdiBounds = new SO.Rectangle(fdiLeft.getX(),fdiLeft.getY(),1,1);
                fdiBounds.unionPoint(fdiTop);
                fdiBounds.unionPoint(fdiRight);

                if(echelonBounds !== null)
                {
                    var shiftY = (symbolBounds.getY() - echelonBounds.getHeight() - 2);
                    fdiLeft.shift(0,shiftY);
                    fdiTop.shift(0,shiftY);
                    fdiRight.shift(0,shiftY);
                    fdiBounds.shift(0,shiftY);
                }

                imageBounds.union(fdiBounds);

            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Build Installation">
            var instRectangle = null,
                instBounds = null;
            if(SymbolUtilities.hasInstallationModifier(symbolID) && 
                SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AC_INSTALLATION))
            {//the actual installation symbols have the modifier
                //built in.  everything else, we have to draw it.
                //
                ////get indicator dimensions////////////////////////////////
                var affiliation = SymbolUtilities.getAffiliation(symbolID);
                if(affiliation === 'F' ||
                              affiliation === 'A' ||
                              affiliation === 'D' ||
                              affiliation === 'M' ||
                              affiliation === 'J' ||
                              affiliation === 'K')
                {
                    //4th height, 3rd width
                    height = Math.round(symbolBounds.getHeight() / 4);
                    width = Math.round(symbolBounds.getWidth() / 3);
                }
                else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                {
                    //6th height, 3rd width
                    height = Math.round(symbolBounds.getHeight() / 6);
                    width = Math.round(symbolBounds.getWidth() / 3 * 0.9);  
                }
                else if(affiliation === 'N' || affiliation === 'L')//neutral,exercise neutral
                {
                    //6th height, 3rd width
                    height = Math.round(symbolBounds.getHeight() / 6);
                    width = Math.round(symbolBounds.getWidth() / 3);  
                }
                else if(affiliation === 'P' ||
                         affiliation === 'U' ||
                         affiliation === 'G' ||
                         affiliation === 'W')
                {
                    //6th height, 3rd width
                    height = Math.round(symbolBounds.getHeight() / 6);
                    width = Math.round(symbolBounds.getWidth() / 3);  
                }
                else
                {
                    //6th height, 3rd width
                    height = Math.round(symbolBounds.getHeight() / 6);
                    width = Math.round(symbolBounds.getWidth() / 3);   
                }

    //                    if(width * 3 < symbolBounds.getWidth())
    //                        width++;

                //set installation position/////////////////////////////////
                //set position of indicator
                if(affiliation === 'F' ||
                              affiliation === 'A' ||
                              affiliation === 'D' ||
                              affiliation === 'M' ||
                              affiliation === 'J' ||
                              affiliation === 'K' ||
                              affiliation === 'N' ||
                              affiliation === 'L')
                {
                    instRectangle = new SO.Rectangle(symbolBounds.getX() + width,
                        symbolBounds.getY() - height,
                        width,
                        height);
                }
                else if(affiliation === 'H' || affiliation === 'S')//hostile,suspect
                {
                    instRectangle = new SO.Rectangle(symbolBounds.getCenterX() - width/2,
                        Math.round(symbolBounds.getY() - (height * 0.15)),
                        width,
                        height);
                }
                else if(affiliation === 'P' ||
                         affiliation === 'U' ||
                         affiliation === 'G' ||
                         affiliation === 'W')
                {
                    instRectangle = new SO.Rectangle(symbolBounds.getX() + width,
                        Math.round(symbolBounds.getY() - (height * 0.3)),
                        width,
                        height);
                }
                else
                {
                   instRectangle = new SO.Rectangle(symbolBounds.getX() + width,
                        Math.round(symbolBounds.getY() - (height * 0.3)),
                        width,
                        height);     
                }

                /*instRectangle = new SO.Rectangle(symbolBounds.getX() + width,
                symbolBounds.getY() - height,
                width,
                height);//*/

                //generate installation bounds//////////////////////////////
                instBounds = new SO.Rectangle(instRectangle.getX() + -1,
                instRectangle.getY() - 1,
                instRectangle.getWidth() + 2,
                instRectangle.getWidth() + 2);

                imageBounds.union(instBounds);

            }
            // </editor-fold>

            

            // <editor-fold defaultstate="collapsed" desc="Build HQ Staff">
            var hqBounds = null;
            //Draw HQ Staff
            if(SymbolUtilities.isHQ(symbolID) && 
                SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.S_HQ_STAFF_OR_OFFSET_INDICATOR))
            {
                var pt1HQ = null,
                    pt2HQ = null,
                    affiliation = symbolID.charAt(1);
                //get points for the HQ staff
                if(affiliation===("F") ||
                        affiliation===("A") ||
                        affiliation===("D") ||
                        affiliation===("M") ||
                        affiliation===("J") ||
                        affiliation===("K") ||
                        affiliation===("N") ||
                        affiliation===("L"))
                {
                    pt1HQ = new SO.Point(symbolBounds.getX()+1,
                        symbolBounds.getY() + symbolBounds.getHeight());
                    pt2HQ = new SO.Point(pt1HQ.getX(), pt1HQ.getY() + symbolBounds.getHeight());
                }
                else
                {
                    pt1HQ = new SO.Point(symbolBounds.getX()+1,
                        symbolBounds.getY() + (symbolBounds.getHeight()/2));
                    pt2HQ = new SO.Point(pt1HQ.getX(), pt1HQ.getY() + symbolBounds.getHeight());
                }

                //create bounding rectangle for HQ staff.
                hqBounds = new SO.Rectangle(pt1HQ.getX(),pt1HQ.getY(),2,pt2HQ.getY()-pt1HQ.getY());
				
                //adjust the image bounds accordingly.
                //imageBounds.union(hqBounds);
				imageBounds.shiftBR(0,pt2HQ.getY()-imageBounds.getBottom());
				
                //adjust symbol center
                centerPoint.setLocation(pt2HQ.getX(),pt2HQ.getY());
            }

            // </editor-fold>  
			
			// <editor-fold defaultstate="collapsed" desc="Build DOM Arrow">
            var domPoints = null,
                domBounds = null;
            if(modifiers[ModifiersUnits.Q_DIRECTION_OF_MOVEMENT] &&
                SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.Q_DIRECTION_OF_MOVEMENT))
            {
                var q = modifiers[ModifiersUnits.Q_DIRECTION_OF_MOVEMENT];

                var isY = (modifiers[ModifiersUnits.Y_LOCATION] !== undefined);

                domPoints = this.createDOMArrowPoints(symbolID, symbolBounds,centerPoint, q, isY);

                domBounds = new SO.Rectangle(domPoints[0].getX(),domPoints[0].getY(),1,1);

                var temp = null;
                for(var i = 1; i < 6; i++)
                {
                    temp = domPoints[i];
                    if(temp !== null)
                        domBounds.unionPoint(temp);
                }
                imageBounds.union(domBounds);
            }

            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Build Operational Condition Indicator">
            var ociBounds = null;
            var ociOffset = 2;
            if(mobilityBounds !== null)
            {
                ociOffset = Math.round(mobilityBounds.bottom - symbolBounds.bottom)+2;
            }
            var ociShape = this.processOperationalConditionIndicator(symbolID, symbolBounds, ociOffset);
            if(ociShape !== null)
            {
                ociBounds = ociShape.getBounds();
            }
            
            imageBounds.union(ociBounds);

            // </editor-fold>
            // 
            // <editor-fold defaultstate="collapsed" desc="Shift Modifiers">
            //adjust points if necessary
            if(imageBounds.getX() < 0 || imageBounds.getY() < 0)
            {
                var shiftX = Math.abs(imageBounds.getX()),
                    shiftY = Math.abs(imageBounds.getY());

                if(hqBounds !== null)
                {
                    pt1HQ.shift(shiftX,shiftY);
                    pt2HQ.shift(shiftX,shiftY);
                }
                if(echelonBounds !== null)
                {
                    tiEchelon.setLocation(tiEchelon.getLocation().getX() + shiftX, tiEchelon.getLocation().getY() + shiftY);
                }
                if(amBounds)
                {
                    tiAM.setLocation(tiAM.getLocation().getX() + shiftX, tiAM.getLocation().getY() + shiftY);
                }
                if(tfBounds !== null)
                {
                    tfRectangle.shift(shiftX, shiftY);
                    tfBounds.shift(shiftX, shiftY);
                }
                if(instBounds !== null)
                {
                    instRectangle.shift(shiftX, shiftY);
                    instBounds.shift(shiftX, shiftY);
                }
                if(fdiBounds !== null)
                {
                    fdiBounds.shift(shiftX, shiftY);
                    fdiLeft.shift(shiftX, shiftY);
                    fdiTop.shift(shiftX, shiftY);
                    fdiRight.shift(shiftX, shiftY);
                }
                if(ociBounds !== null)
                {
                    ociBounds.shift(shiftX,shiftY);
                    ociShape.shift(shiftX,shiftY);
                }
                if(domBounds !== null)
                {
                    for(var i = 0; i < 6; i++)
                    {
                        temp = domPoints[i];
                        if(temp !== null)
                            temp.shift(shiftX, shiftY);
                    }
                    domBounds.shift(shiftX, shiftY);
                }
                if(mobilityBounds !== null)
                {
                    //shift mobility points
                    var size = shapes.length;
                    var tempShape = null;
                    for(var i=0; i<size;i++)
                    {
                        tempShape = shapes[i];
                        tempShape.shift(shiftX,shiftY);
                    }
                    mobilityBounds.shift(shiftX,shiftY);
                }

                centerPoint.shift(shiftX, shiftY);
                symbolBounds.shift(shiftX, shiftY);
                imageBounds.shift(shiftX, shiftY);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Draw Modifiers">
            /*if(useBuffer===true)
            {
                buffer = _bufferDisplayModifiers;
                ctx = buffer.getContext('2d');
                ctx.clearRect(0,0,250,250);
            }
            else
            {
                buffer = this.createBuffer(imageBounds.getWidth(),imageBounds.getHeight());
                ctx = buffer.getContext('2d');
            //}*/
            
            if(render === true)
            {
                buffer = this.createBuffer(imageBounds.getWidth(),imageBounds.getHeight());
                ctx = buffer.getContext('2d');
                if(echelonBounds || amBounds)
                {
                    ctx.font = RendererSettings.getModifierFont();
                }
            
            
            
                //render////////////////////////////////////////////////////////
                if(hqBounds !== null)
                {
                    ctx.beginPath();
                    ctx.moveTo(pt1HQ.getX(),pt1HQ.getY());
                    ctx.lineTo(pt2HQ.getX(),pt2HQ.getY());
                    ctx.lineWidth = 2;
                    ctx.strokStyle = lineColor;
                    ctx.stroke();
                }

                if(tfBounds !== null)
                {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = lineColor;

                    ctx.strokeRect(tfRectangle.getX(), tfRectangle.getY(),
                                    tfRectangle.getWidth(), tfRectangle.getHeight());

                    /*ctx.beginPath();
                    ctx.moveTo(tfRectangle.getX(), tfRectangle.getY());
                    ctx.lineTo(tfRectangle.right, tfRectangle.y);
                    ctx.lineTo(tfRectangle.right, tfRectangle.bottom);
                    ctx.lineTo(tfRectangle.x, tfRectangle.bottom);
                    //ctx.lineTo(tfRectangle.x, tfRectangle.y);
                    ctx.closePath();
                    ctx.stroke();*/
                }

                if(instBounds !== null)
                {
                    ctx.lineWidth = 2;
                    ctx.fillStyle = lineColor;
                    ctx.fillRect(instRectangle.getX(), instRectangle.getY(),
                                    instRectangle.getWidth(), instRectangle.getHeight());
                    /*ctx.beginPath();
                    ctx.moveTo(instRectangle.getX(), instRectangle.getY());
                    ctx.lineTo(instRectangle.right, instRectangle.y);
                    ctx.lineTo(instRectangle.right, instRectangle.bottom);
                    ctx.lineTo(instRectangle.x, instRectangle.bottom);
                    //ctx.lineTo(tfRectangle.x, tfRectangle.y);
                    ctx.closePath();
                    ctx.fill();*/
                }

                if(echelonBounds !== null)
                {
                    this.renderText(ctx,[tiEchelon]);
                    echelonBounds = null;
                    tiEchelon = null;
                }   
                
                if(amBounds !== null)
                {
                    this.renderText(ctx,[tiAM]);
                    /*
                    var textOutlineWidth = RendererSettings.getTextOutlineWidth();
                    if(textOutlineWidth > 0)
                    {
                        ctx.lineWidth = textOutlineWidth;
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.strokeText(tiAM.getText(), tiAM.getLocation().getX(), tiAM.getLocation().getY());
                    }

                    if(modifiers[MilStdAttributes.LineColor] !== undefined)
                        ctx.style = modifiers[MilStdAttributes.LineColor];
                    else
                        ctx.style = "#000000";

                    ctx.fillText(tiAM.getText(), tiAM.getLocation().getX(), tiAM.getLocation().getY());
                    //*/
                    amBounds = null;
                    tiAM = null;
                }   

                if(fdiBounds !== null)
                {
                    var oldDash = null;
                    if(!ctx.setLineDash){//not yet supported but it's coming for html5
                        ctx.setLineDash = function () {};
                    }
                    if(!ctx.getLineDash){//not yet supported but it's coming for html5
                        ctx.getLineDash = function () {};
                    }

                    oldDash = ctx.getLineDash();
                    if(symbolBounds.getWidth()>19)
                    {
                        ctx.setLineDash([6,4]);
                    }
                    else
                    {
                        ctx.setLineDash([5,3]);
                    }
                    ctx.lineCap = "butt";
                    ctx.lineJoin = "miter";
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(fdiLeft.getX(),fdiLeft.getY());
                    ctx.lineTo(fdiTop.getX(),fdiTop.getY());
                    ctx.lineTo(fdiRight.getX(),fdiRight.getY());
                    ctx.stroke();
                    ctx.setLineDash(oldDash);

                    fdiBounds = null;

                }

                if(mobilityBounds !== null)
                {
                                        //ctx.lineCap = "butt";
                    //ctx.lineJoin = "miter";
                    if(symbolID.charAt(10)===("M"))
                    {
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = lineColor;
                        ctx.fillStyle = lineColor;
                    }
                    else //NS or NL
                    {
                        //disable anti-aliasing
                        /*if(ctx.webkitImageSmoothingEnabled)
                            ctx.webkitImageSmoothingEnabled = false;//*/
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = lineColor;
                        ctx.fillStyle = lineColor;
                    }

                    var size = shapes.length;
                    var tempShape = null;
                    for(var i=0; i<size;i++)
                    {
                        tempShape = shapes[i];
                        if(tempShape.getShapeType()!==SO.ShapeTypes.RECTANGLE)
                        {
                            tempShape.stroke(ctx);
                        }
                        else
                        {
                            tempShape.fill(ctx);
                        }
                    }
                    mobilityBounds = null;
                    shapes = null;
                    tempShape = null;
                }

                //if bar, draw below direction of movement
                if(ociBounds !== null && RendererSettings.getOperationalConditionModifierType() === RendererSettings.OperationalConditionModifierType_BAR)
                {
                    var statusColor = null;
                    var status = symbolID.charAt(3);
                    if(status===("C"))//Fully Capable
                        statusColor = '#00FF00';
                    else if(status===("D"))//Damage
                        statusColor = '#FFFF00';
                    else if(status===("X"))
                        statusColor = '#FF0000';
                    else if(status===("F"))//full to capacity(hospital)
                        statusColor = '#0000FF';

                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#000000';
                    ociShape.stroke(ctx);
                    ctx.fillStyle = statusColor;
                    ociShape.fill(ctx);

                    ociBounds = null;
                    ociShape = null;
                }

                //draw original icon.        
                //ctx.drawImage(ii.getImage(),symbolBounds.getX(), symbolBounds.getY());                                               
                ctx.drawImage(ii.getImage(),0,0,
                                symbolBounds.getWidth(), symbolBounds.getHeight(),
                                symbolBounds.getX(),symbolBounds.getY(),
                                symbolBounds.getWidth(), symbolBounds.getHeight());

                if(domBounds !== null)
                {
                    ctx.lineWidth = 2;
                    ctx.lineCap = "butt";
                    ctx.lineJoin = "miter";
                    ctx.strokeStyle = lineColor;
                    ctx.beginPath();
                    ctx.moveTo(domPoints[0].getX(),domPoints[0].getY());
                    if(domPoints[1] !== null)
                        ctx.lineTo(domPoints[1].getX(),domPoints[1].getY());
                    if(domPoints[2] !== null)
                        ctx.lineTo(domPoints[2].getX(),domPoints[2].getY());
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = lineColor;
                    ctx.moveTo(domPoints[3].getX(),domPoints[3].getY());
                    ctx.lineTo(domPoints[4].getX(),domPoints[4].getY());
                    ctx.lineTo(domPoints[5].getX(),domPoints[5].getY());
                    ctx.closePath();
                    ctx.fill();

                    domBounds = null;
                    domPoints = null;
                }

                //if slash, draw above direction of movement
                if(ociBounds !== null && RendererSettings.getOperationalConditionModifierType() === RendererSettings.OperationalConditionModifierType_SLASH)
                {
                    hasOCMSlash = true;
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = lineColor;
                    ociShape.stroke(ctx);

                    ociBounds = null;
                    ociShape = null;
                }
            }
            // </editor-fold>
            
            newii = new ImageInfo(buffer, centerPoint, symbolBounds, imageBounds);
            
            // <editor-fold defaultstate="collapsed" desc="Cleanup">
                shapes = null;
                ctx = null;
                buffer = null;
            // </editor-fold>
            
            //return newii;    
            if(newii !== null)
            {
                return newii;
            }
            else
            {
                return null;
            }
            
    },
            
    processOperationalConditionIndicator: function(symbolID, symbolBounds, offsetY){
            // <editor-fold defaultstate="collapsed" desc="Operational Condition Indicator">
            //create Operational Condition Indicator
            //set color
            var bar = null,
                status, 
                statusColor, 
                barSize = 0, 
                pixelSize = symbolBounds.getHeight();

            status = symbolID.charAt(3);
            if(RendererSettings.getOperationalConditionModifierType() === RendererSettings.OperationalConditionModifierType_BAR)
            {
                if(_statusColorMap[status] !== undefined)
                    statusColor = _statusColorMap[status];
                else
                    statusColor = null;

                if(statusColor !== null)
                {
                    if(pixelSize > 0)
                    barSize = Math.round(pixelSize/5);

                    if(barSize < 2)
                        barSize = 2;
                    
                    offsetY += Math.round(symbolBounds.getY() + symbolBounds.getHeight());
                            
                    bar = new SO.Rectangle(symbolBounds.getX()+1, offsetY, Math.round(symbolBounds.getWidth())-2,barSize);
                    /*ctx.lineColor = '#000000';
                    ctx.lineWidth = 1;
                    ctx.fillColor = statusColor;
                    bar.fill(ctx);
                    bar.grow(1);
                    bar.stroke(ctx);
                    
                    imageBounds.union(bar.getBounds());//*/
                }
                
                return bar;
            }
            else if(status === 'D' || status === 'X')//slashes
            {
                var fillCode = UnitFontLookup.getFillCode(symbolID,RendererSettings.Symbology_2525C)
                var widthRatio = UnitFontLookup.getUnitRatioWidth(fillCode);
                var heightRatio = UnitFontLookup.getUnitRatioHeight(fillCode);
                
                var slashHeight = symbolBounds.getHeight() / heightRatio * 1.47;
                var slashWidth = symbolBounds.getWidth() / widthRatio * 0.85;
                var centerX = symbolBounds.getCenterX();
                var centerY = symbolBounds.getCenterY();

                var path = new SO.Path();
                if(status === 'D')//Damaged /
                {
                    path.moveTo(centerX - (slashWidth/2),centerY+(slashHeight/2));
                    path.lineTo(centerX + (slashWidth/2),centerY-(slashHeight/2));
                }
                else if(status === 'X')//Destroyed X
                {
                    path.moveTo(centerX - (slashWidth/2),centerY+(slashHeight/2));
                    path.lineTo(centerX + (slashWidth/2),centerY-(slashHeight/2));
                    path.moveTo(centerX - (slashWidth/2),centerY-(slashHeight/2));
                    path.lineTo(centerX + (slashWidth/2),centerY+(slashHeight/2));
                }
                return path;
            }	

            return null;
            // </editor-fold>
    },
    
    /**
     * 
     * @param {ImageInfo} ii
     * @param {String} symbolID
     * @param {type} modifiers
     * @returns {ImageInfo}
     */
    processUnitModifiers: function(ii, symbolID, modifiers){
        
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
        
        var bufferXL = 5,
        bufferXR = 5,
        bufferY = 2,
        bufferText = 2,
        x = 0,
        y = 0,//best y
        cpofNameX = 0,
        newii = null;
        
        /*var outlineSize = 0;
        if(RendererSettings.getTextOutlineWidth()>2);
        {
            outlineSize = (RendererSettings.getTextOutlineWidth()-1)/2;
        }
        
        if(outlineSize > 0)
        {
            bufferXL += outlineSize;
            bufferXR += outlineSize;
            bufferY += outlineSize;
            bufferText += outlineSize;
        }//*/
        
        var tiArray = new Array(),
        
            descent = RendererUtilities.getFontDescent(RendererSettings.getModifierFontName(),RendererSettings.getModifierFontSize(),RendererSettings.getModifierFontStyle(),"TQgj"),
        
            bounds = null,
            labelBounds = null,
            labelWidth, labelHeight;
        
        var bounds = ii.getSymbolBounds().clone(),
            symbolBounds = ii.getSymbolBounds().clone(),
            centerPoint = ii.getCenterPoint(),
            imageBounds = ii.getImageBounds().clone(),
            imageBoundsOld = ii.getImageBounds().clone();
    
        var echelon = SymbolUtilities.getEchelon(symbolID),
            echelonText = SymbolUtilities.getEchelonText(echelon),
            amText = SymbolUtilities.getUnitAffiliationModifier(symbolID, symStd);
    
	
		var textColor = null,
			textBackgroundColor = null;
    
        //make room for echelon & mobility.
        if(modifiers[ModifiersUnits.Q_DIRECTION_OF_MOVEMENT] &&
            SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.Q_DIRECTION_OF_MOVEMENT))
        {
            //if no DOM, we can just use the image bounds
            bounds = new SO.Rectangle(imageBounds.getX(), symbolBounds.getY(),
                                imageBounds.getWidth(), symbolBounds.getHeight());
        }
        else //dom exists so we need to change our math
        {
            if(echelonText !== null || amText !== null)
            { 
                bounds = new SO.Rectangle(imageBounds.getX(), bounds.getY(),
                                            imageBounds.getWidth(), bounds.getHeight());
            }
            else if(symbolID.substring(10, 12)==="MR")
            {
                x = -(Math.round((symbolBounds.getWidth()-1)/7)*2);
                if(x < bounds.x)
                    bounds.shiftTL(x,0);
            }    
        }
            
            
        this.checkModifierFont();
        
        
        cpofNameX = bounds.x + bounds.width + bufferXR;
        
        //check if text is too tall:
        var byLabelHeight = false;
        labelHeight = RendererUtilities.measureTextHeight(RendererSettings.getModifierFontName(),
                                RendererSettings.getModifierFontSize(),
                                RendererSettings.getModifierFontStyle()).fullHeight;
        var maxHeight = (bounds.height);
        if((labelHeight * 3) > maxHeight)
            byLabelHeight = true;
        
        var symStd = modifiers[MilStdAttributes.SymbologyStandard];
        
        //Affiliation Modifier being drawn as a display modifier
        var affiliationModifier = null;
        if(RendererSettings.getDrawAffiliationModifierAsLabel())
        {
            affiliationModifier = SymbolUtilities.getUnitAffiliationModifier(symbolID, symStd);
        }
        if(affiliationModifier !== null)
        {   //Set affiliation modifier
            modifiers[ModifiersUnits.E_FRAME_SHAPE_MODIFIER] = affiliationModifier;
        }//*/
        
        //Check for Valid Country Code
        if(RendererSettings.getDrawCountryCode() && SymbolUtilities.hasValidCountryCode(symbolID))
        {
            modifiers[ModifiersUnits.CC_COUNTRY_CODE] = symbolID.substring(12,14);
        }
        
        //            int y0 = 0;//W    E/F
        //            int y1 = 0;//X/Y  G
        //            int y2 = 0;//V/AD/AE    H/AF
        //            int y3 = 0;//T    M CC
        //            int y4 = 0;//Z    J/K/L/N/P
        //
        //            y0 = bounds.y - 0;
        //            y1 = bounds.y - labelHeight;
        //            y2 = bounds.y - (labelHeight + (int)bufferText) * 2;
        //            y3 = bounds.y - (labelHeight + (int)bufferText) * 3;
        //            y4 = bounds.y - (labelHeight + (int)bufferText) * 4;
        // <editor-fold defaultstate="collapsed" desc="Build Modifiers">
        var modifierValue = null;
        var tiTemp = null;
        //if(ModifiersUnits.C_QUANTITY in modifiers 
        if(modifiers.C 
                && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.C_QUANTITY))
        {
            var text = modifiers[ModifiersUnits.C_QUANTITY];
            //bounds = armyc2.c2sd.renderer.utilities.RendererUtilities.getTextOutlineBounds(textInfoContext, text, new SO.Point(0,0));
            tiTemp = new TextInfo(text,0,0,textInfoContext,textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            x = Math.round((symbolBounds.x + (symbolBounds.width * 0.5)) - (labelWidth * 0.5));
            y = Math.round(symbolBounds.y - bufferY - descent);
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        //if(ModifiersUnits.X_ALTITUDE_DEPTH in modifiers || ModifiersUnits.Y_LOCATION in modifiers)
        if(modifiers.X || modifiers.Y)
        {
            modifierValue = null;
            
            var xm = null,
                ym = null;
                    
            if(modifiers.X && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.X_ALTITUDE_DEPTH)) 
                xm = modifiers.X;
            else
                xm = null;
            if(modifiers.Y) 
                ym = modifiers.Y;

            if(xm === null && ym !== null)
                modifierValue = ym;
            else if(xm !== null && ym === null)
                modifierValue = xm;
            else if(xm !== null && ym !== null)
                modifierValue = xm + "  " + ym;
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            if(!byLabelHeight)
            {
                x = bounds.x - labelBounds.width - bufferXL;
                y = bounds.y + labelHeight - descent;
            }
            else
            {
                x = bounds.x - labelBounds.width - bufferXL;

                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y - ((labelHeight + bufferText));
                //y = bounds.y + y;
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.G && 
            SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.G_STAFF_COMMENTS))
        {
            modifierValue = modifiers.G;
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            if(!byLabelHeight)
            {
                x = bounds.x + bounds.width + bufferXR;
                y = bounds.y + labelHeight - descent;
            }
            else
            {
                x = bounds.x + bounds.width + bufferXR;
                    
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y - ((labelHeight + bufferText));
                //y = bounds.y + y;
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
            
            //Concession for cpof name label
            if((x + labelWidth + 3) > cpofNameX)
                cpofNameX = x + labelWidth + 3;
        }
        
        if(modifiers.V || modifiers.AD || modifiers.AE)
        {
            var vm = "";
            var adm = "";
            var aem = "";

            if(modifiers.V && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.V_EQUIP_TYPE))
                vm = modifiers.V;
            if(modifiers.AD && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AD_PLATFORM_TYPE))
                adm = modifiers.AD;
            if(modifiers.AE && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AE_EQUIPMENT_TEARDOWN_TIME))
                aem = modifiers.AE;

            modifierValue = vm + " " + adm + " " + aem;
            modifierValue = modifierValue.trim();
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
          
            x = bounds.x - labelBounds.width - bufferXL;

            y = (bounds.height );//checkpoint, get box above the point
            y = ((y * 0.5) + ((labelHeight - descent) * 0.5));
            y = bounds.y + y;
            
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.H || modifiers.AF)
        {
            var hm = "";
            var afm = "";
            if(modifiers.H)
                hm = modifiers.H;
            if(modifiers.AF && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AF_COMMON_IDENTIFIER))
                afm = modifiers.AF;

            modifierValue = hm + " " + afm;
            modifierValue = modifierValue.trim();

            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = bounds.x + bounds.width + bufferXR;
                
            y = (bounds.height );
            y = ((y * 0.5) + ((labelHeight - descent) * 0.5));
            y = bounds.y + y;
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
            
            //Concession for cpof name label
            if((x + labelWidth + 3) > cpofNameX)
                cpofNameX = x + labelWidth + 3;
        }
        
        if(modifiers.T)
        {
            modifierValue = modifiers[ModifiersUnits.T_UNIQUE_DESIGNATION_1];
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            if(!byLabelHeight)
            {
                x = bounds.x - labelWidth - bufferXL;
                y = bounds.y + bounds.height;
            }
            else
            {
                x = bounds.x - labelWidth - bufferXL;
                    
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y =  y + ((labelHeight + bufferText));
                y = bounds.y + y;
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.M || modifiers.CC)
        {
            modifierValue = "";
            
            if(modifiers[ModifiersUnits.M_HIGHER_FORMATION] && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.M_HIGHER_FORMATION))
                modifierValue += modifiers[ModifiersUnits.M_HIGHER_FORMATION];
            if(modifiers[ModifiersUnits.CC_COUNTRY_CODE])
            {
                if(modifiers[ModifiersUnits.M_HIGHER_FORMATION])
                    modifierValue += " ";
                modifierValue += modifiers[ModifiersUnits.CC_COUNTRY_CODE];
            }
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = bounds.x + bounds.width + bufferXR;
            if(!byLabelHeight)
                y = bounds.y + bounds.height;
            else
            {
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y =  y + ((labelHeight + bufferText));
                y = bounds.y + y;
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
            
            //Concession for cpof name label
            if((x + labelWidth + 3) > cpofNameX)
                cpofNameX = x + labelWidth + 3;
        }
        
        if(modifiers.Z && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.Z_SPEED))
        {
            modifierValue = modifiers[ModifiersUnits.Z_SPEED];
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = bounds.x - labelWidth - bufferXL;
            if(!byLabelHeight)
                y = Math.round(bounds.y + bounds.height + labelHeight + bufferText);
            else
            {
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y + ((labelHeight + bufferText)*2);
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.J ||
            modifiers.K ||
            modifiers.L ||
            modifiers.N ||
            modifiers.P)
        {
            modifierValue = null;
            
            var jm = null,
                km = null,
                lm = null,
                nm = null,
                pm = null;
        
            if(modifiers.J) 
                jm = modifiers[ModifiersUnits.J_EVALUATION_RATING];
            if(modifiers.K && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.K_COMBAT_EFFECTIVENESS)) 
                km = modifiers[ModifiersUnits.K_COMBAT_EFFECTIVENESS];
            if(modifiers.L && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.L_SIGNATURE_EQUIP)) 
                lm = modifiers[ModifiersUnits.L_SIGNATURE_EQUIP];
            if(modifiers.N && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.N_HOSTILE)) 
                nm = modifiers[ModifiersUnits.N_HOSTILE];
            if(modifiers.P && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.P_IFF_SIF)) 
                pm = modifiers[ModifiersUnits.P_IFF_SIF];
            
            modifierValue = "";
            if(jm !== null && jm!==(""))
                modifierValue = modifierValue + jm;
            if(km !== null && km!==(""))
                modifierValue = modifierValue + " " + km;
            if(lm !== null && lm!==(""))
                modifierValue = modifierValue + " " + lm;
            if(nm !== null && nm!==(""))
                modifierValue = modifierValue + " " + nm;
            if(pm !== null && pm!==(""))
                modifierValue = modifierValue + " " + pm;

            if(modifierValue.charAt(0)===" ")
                modifierValue = modifierValue.substring(1);
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = bounds.x + bounds.width + bufferXR;
            if(!byLabelHeight)
                y = Math.round(bounds.y + bounds.height + labelHeight + bufferText);
            else
            {
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y + ((labelHeight + bufferText)*2);
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
            
            //Concession for cpof name label
            if((x + labelWidth + 3) > cpofNameX)
                cpofNameX = x + labelWidth + 3;
        }
        
        if(modifiers.W)
        {
            modifierValue = modifiers[ModifiersUnits.W_DTG_1];
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            if(!byLabelHeight)
            {
                x = bounds.x - labelWidth - bufferXL;
                y = bounds.y - bufferY - descent;
            }
            else
            {
                x = bounds.x - labelWidth - bufferXL;

                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y - ((labelHeight + bufferText)*2);
                //y = bounds.y + y;
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if((modifiers.F && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.F_REINFORCED_REDUCED)) || modifiers.E)
        {
            modifierValue = null;
            var E = null,
                F = null;
        
            if(modifiers.E) 
                E = modifiers[ModifiersUnits.E_FRAME_SHAPE_MODIFIER];
            if(modifiers.F && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.F_REINFORCED_REDUCED)) 
                F = modifiers[ModifiersUnits.F_REINFORCED_REDUCED];

            if(E !== null && E!==(""))
                    modifierValue = E;

            if(F !== null && F!==(""))
            {
                if(F.toUpperCase()===("R"))
                    F = "(+)";
                else if(F.toUpperCase()===("D"))
                    F = "(-)";
                else if(F.toUpperCase()===("RD"))
                    F = "(" + String.fromCharCode(177) + ")";
                //else, just treat it like a regular string.
                /*else
                    F = null;//*/
            }

            if(F !== null && F!==(""))
            {
                if(modifierValue !== null && modifierValue!==(""))
                    modifierValue = modifierValue + " " + F;
                else
                    modifierValue = F;
            }
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            if(!byLabelHeight)
            {
                x = bounds.x + bounds.width + bufferXR;               
                y = bounds.y - bufferY - descent;
            }
            else
            {
                x = bounds.x + bounds.width + bufferXR;
                
                y = (bounds.height );
                y = ((y * 0.5) + (labelHeight * 0.5));

                y = y - ((labelHeight + bufferText)*2);
                //y = bounds.y + y;
                y = Math.round(bounds.y + y);
            }
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
            
            //Concession for cpof name label
            if((x + labelWidth + 3) > cpofNameX)
                cpofNameX = x + labelWidth + 3;
        }
        
        if(modifiers.AA && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.AA_SPECIAL_C2_HQ))
        {
            modifierValue = modifiers[ModifiersUnits.AA_SPECIAL_C2_HQ];
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = (symbolBounds.x + (symbolBounds.width * 0.5)) - (labelWidth * 0.5);
                
            y = (symbolBounds.height );//checkpoint, get box above the point
            y = ((y * 0.5) + ((labelHeight - descent) * 0.5));
            y = symbolBounds.y + y;
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.CN)
        {
            modifierValue = modifiers[ModifiersUnits.CN_CPOF_NAME_LABEL];
            
            tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
            labelBounds = tiTemp.getTextBounds();
            labelWidth = labelBounds.getWidth();
            
            x = cpofNameX;
                
            y = (bounds.height );//checkpoint, get box above the point
            y = ((y * 0.5) + (labelHeight * 0.5));
            y = bounds.y + y;
            
            tiTemp.setLocation(x,y);
            tiArray.push(tiTemp);
        }
        
        if(modifiers.SCC && SymbolUtilities.canUnitHaveModifier(symbolID, ModifiersUnits.SCC_SONAR_CLASSIFICATION_CONFIDENCE))
        {
            modifierValue = modifiers[ModifiersUnits.SCC_SONAR_CLASSIFICATION_CONFIDENCE];
            
            var scc = 0;
            if(SymbolUtilities.isNumber(modifierValue) && SymbolUtilities.hasModifier(symbolID, ModifiersUnits.SCC_SONAR_CLASSIFICATION_CONFIDENCE))
            {
                scc = parseInt(modifierValue);
                if(scc > 0 && scc < 6)
                {
                    
                    var yPosition = this.getYPositionForSCC(symbolID);
                     
                    tiTemp = new TextInfo(modifierValue,0,0,textInfoContext, textInfoContextFont);
                    labelBounds = tiTemp.getTextBounds();
                    labelWidth = labelBounds.getWidth();
                    
                    x = (bounds.x + (bounds.width * 0.5)) - (labelWidth * 0.5);

                    y = (bounds.height );//checkpoint, get box above the point
                    y = ((y * yPosition) + ((labelHeight - descent) * 0.5));
                    y = bounds.y + y;
                    
                    tiTemp.setLocation(x,y);
                    tiArray.push(tiTemp);
                    
                }
            }

        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Shift Points and Draw">
            var modifierBounds = null;
            if(tiArray !== null && tiArray.length > 0)
            {

                //build modifier bounds/////////////////////////////////////////
                modifierBounds = tiArray[0].getTextOutlineBounds();
                var size = tiArray.length;
                var tempShape = null;
                for(var i=1; i<size;i++)
                {
                    tempShape = tiArray[i];
                    modifierBounds.union(tempShape.getTextOutlineBounds());
                }
                
            }

            
            if(modifierBounds !== null){

                imageBounds.union(modifierBounds);

                //shift points if needed////////////////////////////////////////
                if(imageBounds.getX() < 0 || imageBounds.getY() < 0)
                {
                    var shiftX = Math.round(Math.abs(imageBounds.getX())),
                        shiftY = Math.round(Math.abs(imageBounds.getY()));

                    //shift mobility points
                    var size = tiArray.length;
                    var tempShape = null;
                    for(var i=0; i<size;i++)
                    {
                        tempShape = tiArray[i];
                        tempShape.shift(shiftX,shiftY);
                    }
                    modifierBounds.shift(shiftX,shiftY);

                    //shift image points
                    centerPoint.shift(shiftX, shiftY);
                    symbolBounds.shift(shiftX, shiftY);
                    imageBounds.shift(shiftX, shiftY);
                    imageBoundsOld.shift(shiftX, shiftY);
                }

                if(render === true)
                {
					if(modifiers[MilStdAttributes.TextColor])
						textColor = modifiers[MilStdAttributes.TextColor];
					if(modifiers[MilStdAttributes.TextBackgroundColor])
						textBackgroundColor = modifiers[MilStdAttributes.TextBackgroundColor];
					
                    var buffer = this.createBuffer(imageBounds.getWidth(),imageBounds.getHeight());
                    var ctx = buffer.getContext('2d');

                    //draw original icon with potential modifiers.
                    ctx.drawImage(ii.getImage(),imageBoundsOld.getX(),imageBoundsOld.getY());

                    this.renderText(ctx,tiArray,textColor,textBackgroundColor);
                    
                }

                newii = new ImageInfo(buffer, centerPoint, symbolBounds, imageBounds);
                
            }
            // </editor-fold>
            
        // <editor-fold defaultstate="collapsed" desc="Cleanup">
        tiArray = null;
        tiTemp = null;
        tempShape = null;
        imageBoundsOld = null;
        ctx = null;
        buffer = null;
        // </editor-fold>
            
            return newii;
    },
            
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="SPTG functions">
    /**
     * 
     * @param {type} symbolID
     * @param {type} modifiers
     * @returns {armyc2.c2sd.renderer.armyc2.c2sd.renderer.utilities.ImageInfo}
     */
    renderSPTG: function (symbolID, modifiers){
        // <editor-fold defaultstate="collapsed" desc="Variables">
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
        
        var buffer = null,
            ctx = null;
        
        if(_bufferSymbol === null)
        {
            _bufferSymbol = this.createBuffer(_bufferSymbolSize,_bufferSymbolSize);
            var ctx = _bufferSymbol.getContext('2d');
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 3;
            ctx = null;
        }

        var fontSize = 60;
	//ctx.font="37.5pt UnitFontsC"; //50 / 96 * 72
	//ctx.font="150pt UnitFontsC"; // * 4 (because font file is 25% of original)
        var pixel = null;//point to center symbol on.
        var basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
        var strSPFont = "";
        var symStd = modifiers[MilStdAttributes.SymbologyStandard];
        var keepUnitRatio = true;
        var intFill = -1;
        var intFrame = -1;
        var fillColor = null;
        var lineColor = SymbolUtilities.getLineColorOfAffiliation(symbolID).toHexString(false);
        var alpha = 1.0;
        var lineAlpha = 1.0;
        var fillAlpha = 1.0;
        var fill = null;
        var frame = null;
        var scale = -999;
        
        var hasDisplayModifiers = false;
        var hasTextModifiers = false;
        var symbolOutlineWidth = RendererSettings.getSinglePointSymbolOutlineWidth();
        
        
        
        // <editor-fold defaultstate="collapsed" desc="Parse Modifiers">
        //determine font size necessary to match desired pixel size/////////////
        var pixelSize = -1;
        if(modifiers[MilStdAttributes.PixelSize])
        {
            pixelSize = modifiers[MilStdAttributes.PixelSize];
        }
        else
        {
            pixelSize = RendererSettings.getDefaultPixelSize();
        }
        if(modifiers[MilStdAttributes.KeepUnitRatio] !== undefined)
        {
            keepUnitRatio = modifiers[MilStdAttributes.KeepUnitRatio];
        }
        
        //Check if we need to set 'N' to "ENY"
        if(symbolID.charAt(1).toUpperCase()==="H")
        {
            //modifiers[ModifiersTG.N_HOSTILE] = "ENY";  //20200116 annotation processing
        }
        
        var icon = false;
        if(modifiers[MilStdAttributes.Icon] !== undefined)
        {
            icon = modifiers[MilStdAttributes.Icon];
        }
        
        if(icon)//icon won't show modifiers or display icons
        {
            keepUnitRatio = false;
            hasDisplayModifiers = false;
            hasTextModifiers = false;
            symbolOutlineWidth = 0;
        }
        else
        {
            hasDisplayModifiers = this.hasDisplayModifiers(symbolID, modifiers);
            hasTextModifiers = this.hasTextModifiers(symbolID, modifiers);
        }
        
        if(modifiers[MilStdAttributes.LineColor] !== undefined)
        {
            lineColor = modifiers[MilStdAttributes.LineColor];
			if (lineColor !== "transparent")	{//20200313				
	            lineColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString(lineColor);
                lineAlpha = lineColor.getAlpha() / 255.0;
	            lineColor = lineColor.toHexString(false);
			}else{
				lineAlpha = 0;
			}
        }
        if(modifiers[MilStdAttributes.FillColor] !== undefined)
        {
            fillColor = modifiers[MilStdAttributes.FillColor];
			if (fillColor !== "transparent")	{//20200313	
				fillColor = armyc2.c2sd.renderer.utilities.Color.getColorFromHexString(fillColor);
				fillAlpha = fillColor.getAlpha() / 255.0;
	            fillColor = fillColor.toHexString(false);
			}else{
				fillAlpha = 0;
			}
        }
        if(modifiers[MilStdAttributes.Alpha] !== undefined)
        {
            alpha = modifiers[MilStdAttributes.Alpha] / 255.0;
            if(alpha !== 1)
            {
                if (lineAlpha !== 0) { //20200313 not transparent
                    lineAlpha = alpha;
                }
                if (fillAlpha !== 0) { //20200313 not transparent
                    fillAlpha = alpha;
                }
            }
        }
        
        var outlineOffset = symbolOutlineWidth;
        if(outlineOffset > 2)
            outlineOffset = (outlineOffset-1)/2;
        else
            outlineOffset = 0;

        
        
        // </editor-fold>
        
        var spli = SinglePointLookup.getSPLookupInfo(symbolID,symStd);

        if(spli === null)//default to action point on bad symbolID
        {
                if(modifiers===null)
                        modifiers = {};
                if(modifiers.H !== undefined)
                        modifiers[ModifiersTG.H1_ADDITIONAL_INFO_2] = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                modifiers[ModifiersTG.H_ADDITIONAL_INFO_1] = symbolID.substring(0,10);

                symbolID = "G" + SymbolUtilities.getAffiliation(symbolID) + 
                        "G" + SymbolUtilities.getStatus(symbolID) + "GPP---****X";
                spli = SinglePointLookup.getSPLookupInfo(symbolID,symStd);
        }
        
        // <editor-fold defaultstate="collapsed" desc="Determine font size">
        
        var symbolBounds = null,
            rect = null;
        
        var ratio = 1;

        if(pixelSize > 0)
        {
            symbolBounds = SymbolDimensions.getSymbolBounds(symbolID, symStd, fontSize);
            rect = SymbolDimensions.getSymbolBounds(symbolID, symStd, fontSize);

            if(keepUnitRatio===true)
            {
               //scale it somehow for consistency with units.

               //when SymbolSizeMedium = 80;
               //a pixel size of 35 = scale value of 1.0
               
                if(fontSize===80)//medium
                {
                 scale = pixelSize / 35.0;
                }//TODO: need to adjust multiplier for other scales
                else if(fontSize===60)//small
                {
                 scale = pixelSize / 35.0;
                }
                else if(fontSize===100)//large
                {
                 scale = pixelSize / 35.0;
                }
                else if(fontSize===120)//XL
                {
                 scale = pixelSize / 35.0;
                }
                else
                {
                    scale = pixelSize / 35.0;
                }
               
            }

            //adjust size
            ratio = Math.min((pixelSize / rect.getHeight()), (pixelSize / rect.getWidth()));

        }
        
        //scale overrides pixel size.
        if(scale !== -999)
        {
            ratio = scale;
        }
        
        if(ratio > 0)
        {
            fontSize = fontSize * ratio;
        }
        
        //TODO: if else block does the same thing either way.  probably remove
        /*
        if(pixelSize > 0)
        {
            symbolBounds = SymbolDimensions.getSymbolBounds(symbolID, symStd, fontSize);

            fontSize = (((fontSize) / 96) * 72);
          
            strSPFont = fontSize + "pt SinglePoint";
        }
        else
        {
            symbolBounds = SymbolDimensions.getSymbolBounds(symbolID, symStd, fontSize);
            fontSize = ((fontSize / 96) * 72);
            //ctx.font= "45pt SinglePoint";
            strSPFont = fontSize + "pt SinglePoint";
        }//*/
        symbolBounds = SymbolDimensions.getSymbolBounds(symbolID, symStd, fontSize);
        fontSize = (((fontSize) / 96) * 72);
        strSPFont = fontSize + "pt SinglePoint";
        
        
        // </editor-fold>
        
        this.checkModifierFont();
        
        // </editor-fold>
        
        
        intFrame = SinglePointLookup.getCharCodeFromSymbol(symbolID,symStd);
            

        
        var fillID = null;
        if(SymbolUtilities.hasDefaultFill(symbolID) && fillColor === null)
        {
            fillColor = SymbolUtilities.getFillColorOfAffiliation(symbolID).toHexString(false);
        }
        if(SymbolUtilities.isTGSPWithFill(symbolID))
        {
            fillID = SymbolUtilities.getTGFillSymbolCode(symbolID);
            if(fillID !== null)
                intFill = SinglePointLookup.getCharCodeFromSymbol(fillID,symStd);
        }
        else if(SymbolUtilities.isWeatherSPWithFill(symbolID))
        {
            intFill = intFrame + 1;
            fillColor = SymbolUtilities.getFillColorOfWeather(symbolID).toHexString(false);

        }
        
        if(intFill > 0)
            fill = String.fromCharCode(intFill);
	    frame = String.fromCharCode(intFrame);
        
        var symbolWidth = Math.round(symbolBounds.getWidth()) + (outlineOffset*2),
            symbolHeight = Math.round(symbolBounds.getHeight()) + (outlineOffset*2);
    
        var imageBounds = new SO.Rectangle(0,0,symbolWidth,symbolHeight);
    
        if(render === true)
        {
            if((hasDisplayModifiers === true || hasTextModifiers === true) &&
                    symbolWidth < _bufferSymbolSize && 
                    symbolHeight < _bufferSymbolSize)
            {
                buffer = _bufferSymbol;//
                ctx = buffer.getContext('2d');
                ctx.clearRect(0,0,_bufferSymbolSize,_bufferSymbolSize);
                if(ctx.globalAlpha < 1.0)
                    ctx.globalAlpha = 1.0;
            }
            else
            {//*/
                buffer = this.createBuffer(symbolWidth,symbolHeight);
                ctx = buffer.getContext('2d');
                ctx.lineCap = "butt";
                ctx.lineJoin = "miter";
                ctx.miterLimit = 3;
            }

            ctx.font = strSPFont;
        }
        var x = Math.round(symbolBounds.getWidth()/2),
            y = Math.round(symbolBounds.getHeight()/2);
    
        var centerPoint = SymbolDimensions.getSymbolCenter(symbolID, symbolBounds);
        
        x = centerPoint.getX();
        y = centerPoint.getY();
        
        
        if(outlineOffset>0)
        {
            centerPoint.shift(outlineOffset,outlineOffset);
            x += outlineOffset;
            y += outlineOffset;
            symbolBounds.shift(outlineOffset,outlineOffset);
            symbolBounds.grow(outlineOffset);
        }
        
        
        if(render === true)
        {
            var currentAlpha = 1;

            //do fill if present
            if(fill !== null && fill !== "" && fillColor !== null)
            {
                if(fillAlpha !== currentAlpha)
                {
                    ctx.globalAlpha = fillAlpha;
                    currentAlpha = fillAlpha;
                }
                ctx.fillStyle=fillColor;
                ctx.fillText(fill,x,y);
            }

            //do outline if present    
            if(frame !== null && frame !== "")
            {
                if(outlineOffset > 0)
                {
                    if(lineAlpha !== currentAlpha)
                    {
                        ctx.globalAlpha = lineAlpha;
                        currentAlpha = lineAlpha;
                    }
                    ctx.lineWidth = symbolOutlineWidth;
                    ctx.strokeStyle = RendererUtilities.getIdealOutlineColor(lineColor,true);
                    ctx.strokeText(frame, x, y);
                }
            }

            //then draw frame
            if(frame !== null && frame !== "")
            {
                if(lineAlpha !== currentAlpha)
                {
                    ctx.globalAlpha = lineAlpha;
                    currentAlpha = lineAlpha;
                }
                ctx.fillStyle = lineColor;
                ctx.fillText(frame, x, y);
            }
        }

                
        var ii = new ImageInfo(buffer,centerPoint,symbolBounds,imageBounds);
        
        //Process Modifiers
        var iiNew = null;
        if(icon === false && (hasTextModifiers || hasDisplayModifiers || SymbolUtilities.isTGSPWithIntegralText(symbolID)))
        {
            if(SymbolUtilities.isTGSPWithSpecialModifierLayout(symbolID) || 
                SymbolUtilities.isTGSPWithIntegralText(symbolID))
            {
                iiNew = this.ProcessTGSPWithSpecialModifierLayout(ii,symbolID,modifiers, lineColor);
            }
            else 
            {
                iiNew = this.ProcessTGSPModifiers(ii,symbolID,modifiers, lineColor);
            }

        }
        
        if(iiNew)
            ii = iiNew;
        
        // <editor-fold defaultstate="collapsed" desc="Cleanup">
        ctx = null;
        buffer = null;
        // </editor-fold>
        
        if(icon)
            return ii.getSquareImageInfo();
        else
            return ii;
    },
    /**
     * 
     * @param {ImageInfo} ii
     * @param {String} symbolID
     * @param {Object} modifiers
     * @param {String} overrideColor like "#000000"
     * @returns {ImageInfo}
     */        
    ProcessTGSPWithSpecialModifierLayout: function(ii,symbolID,modifiers, overrideColor){
    
        // <editor-fold defaultstate="collapsed" desc="Variables">
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
        
        var bufferXL = 6,
            bufferXR = 4,
            bufferY = 2,
            bufferText = 2,
            centerOffset = 1, //getCenterX/Y function seems to go over by a pixel
            x = 0,
            y = 0,
            x2 = 0,
            y2 = 0,
            symStd = modifiers[MilStdAttributes.SymbologyStandard],
            outlineOffset = RendererSettings.getTextOutlineWidth(),
            labelHeight = 0,
            labelWidth = 0,
            newii = null;
    
        var arrMods = new Array();
        var duplicate = false;
        
        var symbolBounds = ii.getSymbolBounds().clone(),
            bounds = ii.getSymbolBounds().clone(),
            imageBounds = ii.getImageBounds().clone(),
            centerPoint = ii.getCenterPoint().clone();
			
		var textColor = overrideColor,
			textBackgroundColor = null;
    
        centerPoint = new SO.Point(Math.round(ii.getCenterPoint().getX()),Math.round(ii.getCenterPoint().getY()));
    
        var byLabelHeight = false;
        labelHeight = RendererUtilities.measureTextHeight(RendererSettings.getModifierFontName(),
                                RendererSettings.getModifierFontSize(),
                                RendererSettings.getModifierFontStyle()).fullHeight;
        labelHeight = Math.round(labelHeight);
        var maxHeight = (symbolBounds.getHeight());
        if((labelHeight * 3) > maxHeight)
            byLabelHeight = true;
        
        var descent = RendererUtilities.getFontDescent(RendererSettings.getModifierFontName(),RendererSettings.getModifierFontSize(),RendererSettings.getModifierFontStyle(),"TQgj");
        var yForY = -1;
        
        var labelBounds1 = null,//text.getPixelBounds(null, 0, 0);
            labelBounds2 = null,
            strText = "",
            strText1 = "",
            strText2 = "",
            text1 = null,
            text2 = null;

        var basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
        
        if(outlineOffset > 2)
            outlineOffset = ((outlineOffset - 1) /2);
        else
            outlineOffset = 0;
        
        /*bufferXL += outlineOffset;
        bufferXR += outlineOffset;
        bufferY += outlineOffset;
        bufferText += outlineOffset;//*/
                
        // </editor-fold>
    
        // <editor-fold defaultstate="collapsed" desc="Process Integral Text">
        if(basicID===("G*G*GPRD--****X"))//DLRP (D)
        {

            strText1 = "D";
            
            text1 = new TextInfo(strText1,0,0,textInfoContext);
            
            labelBounds1 = text1.getTextBounds();
            if(symStd === RendererSettings.Symbology_2525B)
            {
                y = symbolBounds.getY() + symbolBounds.getHeight();
                x = symbolBounds.getX() - labelBounds1.getWidth() - bufferXL;
                text1.setLocation(Math.round(x),Math.round(y));
            }
            else//2525C built in
            {
                text1=null;
                //y = symbolBounds.getY() + symbolBounds.getHeight() - bufferY;
                //x = symbolBounds.getX() + symbolBounds.getWidth()/2 - labelBounds1.getWidth()/2;
            }
            
            //ErrorLogger.LogMessage("D: " + String.valueOf(x)+ ", " + String.valueOf(y));
        }
        else if (basicID===("G*G*APU---****X")) //pull-up point (PUP)
        {
            strText1 = "PUP";
            text1 = new TextInfo(strText1,0,0,textInfoContext);
            
            labelBounds1 = text1.getTextBounds();
            y = symbolBounds.getCenterY() + ((labelBounds1.getHeight() - descent)/2);
            x = symbolBounds.getX() + symbolBounds.getWidth() + bufferXR;
            
            text1.setLocation(Math.round(x),Math.round(y));
        }
        else if(basicID===("G*M*NZ----****X")) //Nuclear Detonation Ground Zero (N)
        {
//                strText1 = "N";
//                text1 = new TextLayout(strText1, labelFont, frc);
//                labelBounds1 = text1.getPixelBounds(null, 0, 0);
//                y = symbolBounds.getY() + (symbolBounds.getHeight() * 0.8) - centerOffset;
//                x = symbolBounds.getCenterX() - centerOffset - (labelBounds1.getWidth()/2);
        }
        else if(basicID===("G*M*NF----****X"))//Fallout Producing (N)
        {
//                strText1 = "N";
//                text1 = new TextLayout(strText1, labelFont, frc);
//                descent = text1.getDescent();
//                labelBounds1 = text1.getPixelBounds(null, 0, 0);
//                y = symbolBounds.getY() + (symbolBounds.getHeight() * 0.8) - centerOffset;
//                x = symbolBounds.getCenterX() - centerOffset - (labelBounds1.getWidth()/2);
        }
        else if(basicID===("G*M*NEB---****X"))//Release Events Biological (BIO, B)
        {
            //strText1 = "B";
            //text1 = new TextLayout(strText1, labelFont, frc);
            var offset = 1;
            strText2 = "BIO";
            text2 = new TextInfo(strText2,0,0,textInfoContext);

            labelBounds2 = text2.getTextBounds();
            //y = symbolBounds.getY() + (symbolBounds.getHeight() * 0.9);
            //x = symbolBounds.getCenterX() - centerOffset - (labelBounds1.getWidth()/2);
            
            y2 = symbolBounds.getCenterY() + ((labelBounds2.getHeight() - descent)*0.5);
            
            x2 = symbolBounds.getX() - labelBounds2.getWidth() - bufferXL;

            text2.setLocation(Math.round(x2),Math.round(y2-offset));
            //ErrorLogger.LogMessage("BIO: " + String.valueOf(x2)+ ", " + String.valueOf(y2));
        }
        else if(basicID===("G*M*NEC---****X"))//Release Events Chemical (CML, C)
        {
            //strText1 = "C";
            //text1 = new TextLayout(strText1, labelFont, frc);
            var offset = 1;
            strText2 = "CML";
            text2 = new TextInfo(strText2,0,0,textInfoContext);
            
            labelBounds2 = text2.getTextBounds();
            //y = symbolBounds.getY() + (symbolBounds.getHeight() * 0.9);
            //x = symbolBounds.getCenterX() - centerOffset - (labelBounds1.getWidth()/2);

            y2 = symbolBounds.getCenterY() + ((labelBounds2.getHeight() - descent)/2);

            x2 = symbolBounds.getX() - labelBounds2.getWidth() - bufferXL;
            
            text2.setLocation(Math.round(x2),Math.round(y2-offset));
        }
        if(text1 !== null)
        {
            arrMods.push(text1);
        }
        if(text2 !== null)
        {
            arrMods.push(text2);
        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Process Special Modifiers">
        var ti = null;
        if(basicID ===("G*M*NZ----****X") ||//ground zero
                basicID ===("G*M*NEB---****X") ||//biological
                basicID ===("G*M*NEC---****X"))//chemical
        {
            if((labelHeight * 3) > bounds.getHeight())
                    byLabelHeight = true;
        }

        if(basicID ===("G*G*GPPC--****X") ||
                basicID ===("G*G*GPPD--****X"))
        {
            if(modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1] !== undefined)
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols and modifier goes in center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.4);
                y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
        }
		else if(basicID === "G*G*GPH---****X")       
        {
            if(modifiers[ModifiersTG.H_ADDITIONAL_INFO_1] !== undefined)
            {
                strText = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols and modifier goes in center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.5);
                y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
        }
        else if(basicID ===("G*G*GPRI--****X"))
        {
            if(modifiers.T !== undefined)
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols, top third & center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.25);
                y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
        }
        else if(basicID ===("G*G*GPPW--****X") ||
                basicID ===("G*F*PCF---****X"))
        {
            if(modifiers.T !== undefined)
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                //One modifier symbols and modifier goes right of center
                x = bounds.x + (bounds.width * 0.75);
                y = bounds.y + (bounds.height * 0.5);
                y = y + ((labelHeight-descent) * 0.5);

                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
        }
        else if(basicID ===("G*G*APP---****X") ||
                basicID ===("G*G*APC---****X"))
        {
            if(modifiers.T !== undefined)
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                var labelWidth = ti.getTextBounds().getWidth();
                //One modifier symbols and modifier goes just below of center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.5);
                y = y + (((bounds.height * 0.5) - labelHeight)/2) + labelHeight - descent;
                
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
        }
        else if(basicID ===("G*G*DPT---****X") || //T (target reference point)
                basicID ===("G*F*PTS---****X") || //t,h,h1 (Point/Single Target)
                basicID ===("G*F*PTN---****X")) //T (nuclear target)
        { //Targets with special modifier positions
            if(modifiers.H !== undefined &&
                    basicID ===("G*F*PTS---****X"))//H
            {
                strText = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                x = bounds.getCenterX() + (bounds.width * 0.15);
                y = bounds.y + (bounds.height * 0.75);
                y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.H1 !== undefined &&
                    basicID ===("G*F*PTS---****X"))//H1
            {
                strText = modifiers[ModifiersTG.H1_ADDITIONAL_INFO_2];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.getCenterX() - (bounds.width * 0.15);
                x = x - (labelWidth);
                y = bounds.y + (bounds.height * 0.75);
                y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.T !== undefined)//T
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);

                x = bounds.getCenterX() + (bounds.width * 0.15);
//                    x = x - (labelBounds.width * 0.5);
                y = bounds.y + (bounds.height * 0.25);
                y = y + (labelHeight * 0.5);

                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }

        }
        else if(basicID ===("G*M*NZ----****X") ||//ground zero
                basicID ===("G*M*NEB---****X") ||//biological
                basicID ===("G*M*NEC---****X"))//chemical
        {//NBC
            if(modifiers.N !== undefined)
            {
                strText = modifiers[ModifiersTG.N_HOSTILE];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                x = bounds.x + bounds.width + bufferXR;

                if(!byLabelHeight)
                {
                    y = bounds.y + bounds.height;
                }
                else
                {
                    y = bounds.y + ((bounds.height * 0.5) + ((labelHeight-descent) * 0.5) + (labelHeight - descent + bufferText));
                }
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);

            }
            if(modifiers.H !== undefined)//H
            {
                strText = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                x = bounds.x + bounds.width + bufferXR;
                if(!byLabelHeight)
                {
                    y = bounds.y + labelHeight - descent;
                }
                else
                {
                    //y = bounds.y + ((bounds.height * 0.5) + (labelHeight * 0.5) - (labelHeight + bufferText));
                    y = bounds.y + ((bounds.height * 0.5) - ((labelHeight-descent) * 0.5) + ( - descent - bufferText));
                }
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.W !== undefined)//W
            {
                strText = modifiers[ModifiersTG.W_DTG_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                x = bounds.x - labelWidth - bufferXL;
                if(!byLabelHeight)
                {
                    y = bounds.y + labelHeight - descent;
                }
                else
                {
                    //y = bounds.y + ((bounds.height * 0.5) + (labelHeight * 0.5) - (labelHeight + bufferText));
                    y = bounds.y + ((bounds.height * 0.5) - ((labelHeight-descent) * 0.5) + ( - descent - bufferText));
                }
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.V !== undefined && basicID ===("G*M*NZ----****X"))//V
            {
                strText = modifiers[ModifiersTG.V_EQUIP_TYPE];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                //subset of nbc, just nuclear
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.x - labelWidth - bufferXL;
                y = bounds.y + ((bounds.height * 0.5) + ((labelHeight - descent) * 0.5));//((bounds.height / 2) - (labelHeight/2));
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.T !== undefined)//T
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.x - labelWidth - bufferXL;
                if(!byLabelHeight)
                {
                    y = bounds.y + bounds.height;
                }
                else
                {
                    //y = bounds.y + ((bounds.height * 0.5) + ((labelHeight-descent) * 0.5) + (labelHeight + bufferText));
                    y = bounds.y + ((bounds.height * 0.5) + ((labelHeight-descent) * 0.5) + (labelHeight - descent + bufferText));
                }
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.Y !== undefined)//Y
            {
                strText = modifiers[ModifiersTG.Y_LOCATION];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //just NBC
                //x = bounds.getX() + (bounds.getWidth() * 0.5);
                //x = x - (labelWidth * 0.5);
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);

                if(!byLabelHeight)
                {
                    y = bounds.y + bounds.height + labelHeight - descent + bufferY;
                }
                else
                {
                    y = bounds.y + ((bounds.height * 0.5) + ((labelHeight-descent) * 0.5) + ((labelHeight + bufferText)*2) - descent);
                    
                }
                yForY = y + descent; //so we know where to start the DOM arrow.
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);

            }
            if(modifiers.C !== undefined)//C
            {
                strText = modifiers[ModifiersTG.C_QUANTITY];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //subset of NBC, just nuclear
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y - descent;
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);

            }
        }
        else if(basicID ===("G*M*OFS---****X"))
        {
            if(modifiers.H !== undefined)//H
            {
                strText = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y - descent;// + (bounds.height * 0.5);
                //y = y + (labelHeight * 0.5);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);

            }
            if(modifiers.W !== undefined)//W
            {
                strText = modifiers[ModifiersTG.W_DTG_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height);
                y = y + (labelHeight);
                
                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            if(modifiers.N !== undefined)
            {
                strText = modifiers[ModifiersTG.N_HOSTILE];
                ti = new TextInfo(strText,0,0,textInfoContext);
                var ti2 = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                x = bounds.x + (bounds.width) + bufferXR;//right
                //x = x + labelWidth;//- (labelBounds.width * 0.75);

                duplicate = true;

                x2 = bounds.x;//left
                x2 = x2 - labelWidth - bufferXL;// - (labelBounds.width * 0.25);

                y = bounds.y + (bounds.height * 0.5);//center
                y = y + ((labelHeight - descent) * 0.5);

                y2 = y;
                
                ti.setLocation(Math.round(x),Math.round(y));
                ti2.setLocation(Math.round(x2),Math.round(y2));
                arrMods.push(ti);
                arrMods.push(ti2);
            }

        }
        else if(basicID.charAt(0) === 'W')
        {
            if(basicID ===("WAS-WSF-LVP----"))//Freezing Level
            {
                strText = "0" + String.fromCharCode(176) + ":";
                if(modifiers.X !== undefined)
                    strText += modifiers[ModifiersTG.X_ALTITUDE_DEPTH];
                else
                    strText += ""; //strText += "X?";

                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols and modifier goes in center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.4);
                y = y + (labelHeight * 0.5);

                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            else if(basicID ===("WAS-WST-LVP----"))//tropopause Level
            {
                strText = ""; //strText = "X?";
                if(modifiers.X !== undefined)
                    strText = modifiers[ModifiersTG.X_ALTITUDE_DEPTH];

                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols and modifier goes in center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.4);
                y = y + (labelHeight * 0.5);

                ti.setLocation(Math.round(x),Math.round(y));
                arrMods.push(ti);
            }
            else if(basicID ===("WAS-PLT---P----"))//tropopause Low
            {
                strText = ""; //strText = "X?";
                if(modifiers.X)
                    strText = modifiers[ModifiersTG.X_ALTITUDE_DEPTH];

                ti = new TextInfo(strText,0,0,textInfoContext);
                //var ti2 = new TextInfo("L",0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                //One modifier symbols and modifier goes just above center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.5);
                //y = y - descent;
                y = (y + bounds.height*0.5)/2 - descent;
                ti.setLocation(Math.round(x),Math.round(y));

                /*//One modifier symbols and modifier goes just below of center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.5);
                y = y + (((bounds.height * 0.5) - labelHeight)/2) + labelHeight - descent;
                ti2.setLocation(Math.round(x),Math.round(y));//*/

                arrMods.push(ti);
                //arrMods.push(ti2);
            }
            else if(basicID ===("WAS-PHT---P----"))//tropopause High
            {
                strText = ""; //strText = "X?";
                if(modifiers.X)
                    strText = modifiers[ModifiersTG.X_ALTITUDE_DEPTH];

                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());

                //One modifier symbols and modifier goes just below of center
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + (bounds.height * 0.5);
                y = y + (((bounds.height * 0.5) - labelHeight)/2) + labelHeight - descent;
                ti.setLocation(Math.round(x),Math.round(y));
                
                arrMods.push(ti);
            }
        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="DOM Arrow">
        var domPoints = null,
            domBounds = null;
        if(modifiers[ModifiersTG.Q_DIRECTION_OF_MOVEMENT] &&
            (basicID ===("G*M*NZ----****X") ||//ground zero
                basicID ===("G*M*NEB---****X") ||//biological
                basicID ===("G*M*NEC---****X")))//chemical)
        {
            var q = modifiers[ModifiersTG.Q_DIRECTION_OF_MOVEMENT];
            var tempBounds = bounds.clone();
            tempBounds.unionPoint(new SO.Point(bounds.getCenterX(),yForY));
            
            domPoints = this.createDOMArrowPoints(symbolID, tempBounds,ii.getCenterPoint(), q, false);

            domBounds = new SO.Rectangle(domPoints[0].getX(),domPoints[0].getY(),1,1);

            var temp = null;
            for(var i = 1; i < 6; i++)
            {
                temp = domPoints[i];
                if(temp !== null)
                    domBounds.unionPoint(temp);
            }
            imageBounds.union(domBounds);
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Shift Points and Draw">
        var modifierBounds = null;
        if(arrMods !== null && arrMods.length > 0)
        {

            //build modifier bounds/////////////////////////////////////////
            modifierBounds = arrMods[0].getTextOutlineBounds();
            var size = arrMods.length;
            var tempShape = null;
            for(var i=1; i<size;i++)
            {
                tempShape = arrMods[i];
                modifierBounds.union(tempShape.getTextOutlineBounds());
            }

        }


        if(modifierBounds !== null || domBounds !== null){

            imageBounds.union(modifierBounds);
            imageBounds.union(domBounds);

            //shift points if needed////////////////////////////////////////
            if(imageBounds.getX() < 0 || imageBounds.getY() < 0)
            {
                var shiftX = Math.abs(imageBounds.getX()),
                    shiftY = Math.abs(imageBounds.getY());

                //shift mobility points
                var size = arrMods.length;
                var tempShape = null;
                for(var i=0; i<size;i++)
                {
                    tempShape = arrMods[i];
                    tempShape.shift(shiftX,shiftY);
                }
                modifierBounds.shift(shiftX,shiftY);
                
                if(domBounds !== null)
                {
                    for(var i = 0; i < 6; i++)
                    {
                        temp = domPoints[i];
                        if(temp !== null)
                            temp.shift(shiftX, shiftY);
                    }
                    domBounds.shift(shiftX, shiftY);
                }

                //shift image points
                centerPoint.shift(shiftX, shiftY);
                symbolBounds.shift(shiftX, shiftY);
                imageBounds.shift(shiftX, shiftY);
            }

            if(render === true)
            {
                var buffer = this.createBuffer(imageBounds.getWidth(),imageBounds.getHeight());
                var ctx = buffer.getContext('2d');

                //draw original icon
                //ctx.drawImage(ii.getImage(),symbolBounds.getX(),symbolBounds.getY());
                ctx.drawImage(ii.getImage(),0,0,
                                symbolBounds.getWidth(), symbolBounds.getHeight(),
                                symbolBounds.getX(),symbolBounds.getY(),
                                symbolBounds.getWidth(), symbolBounds.getHeight());
								
				if(modifiers[MilStdAttributes.TextColor])
					textColor = modifiers[MilStdAttributes.TextColor];
				if(modifiers[MilStdAttributes.TextBackgroundColor])
					textBackgroundColor = modifiers[MilStdAttributes.TextBackgroundColor];

                this.renderText(ctx,arrMods, textColor, textBackgroundColor);

                //draw DOM arrow
                if(domBounds !== null)
                {
                    var lineColor = SymbolUtilities.getLineColorOfAffiliation(symbolID).toHexString(false);
                    if(modifiers[MilStdAttributes.LineColor] !== undefined)
                        lineColor = modifiers[MilStdAttributes.LineColor];

                    ctx.lineWidth = 2;
                    ctx.lineCap = "butt";
                    ctx.lineJoin = "miter";
                    ctx.strokeStyle = lineColor;
                    ctx.beginPath();
                    ctx.moveTo(domPoints[0].getX(),domPoints[0].getY());
                    if(domPoints[1] !== null)
                        ctx.lineTo(domPoints[1].getX(),domPoints[1].getY());
                    if(domPoints[2] !== null)
                        ctx.lineTo(domPoints[2].getX(),domPoints[2].getY());
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = lineColor;
                    ctx.moveTo(domPoints[3].getX(),domPoints[3].getY());
                    ctx.lineTo(domPoints[4].getX(),domPoints[4].getY());
                    ctx.lineTo(domPoints[5].getX(),domPoints[5].getY());
                    ctx.closePath();
                    ctx.fill();
                }
            }
            newii = new ImageInfo(buffer, centerPoint, symbolBounds, imageBounds);
            
            // <editor-fold defaultstate="collapsed" desc="Cleanup">
            ctx = null;
            buffer = null;
            // </editor-fold>

            if(newii !== undefined && newii !== null)
                return newii;
        }
        else 
            return null;
        // </editor-fold>

    },
    /**
     * 
     * @param {ImageInfo} ii
     * @param {String} symbolID
     * @param {Object} modifiers
     * @param {String} overrideColor like "#000000"
     * @returns {ImageInfo}
     */        
    ProcessTGSPModifiers: function(ii,symbolID,modifiers, overrideColor){
    
        // <editor-fold defaultstate="collapsed" desc="Variables">
        var render = true;
        if(modifiers["RENDER"] !== undefined)
            render = modifiers["RENDER"];
        
        var bufferXL = 6,
            bufferXR = 4,
            bufferY = 2,
            bufferText = 2,
            centerOffset = 1, //getCenterX/Y function seems to go over by a pixel
            x = 0,
            y = 0,
            x2 = 0,
            y2 = 0,
            symStd = modifiers[MilStdAttributes.SymbologyStandard],
            outlineOffset = RendererSettings.getTextOutlineWidth(),
            labelHeight = 0,
            labelWidth = 0,
            newii = null;
    
        var arrMods = new Array();
        var duplicate = false;
        
        var symbolBounds = ii.getSymbolBounds().clone(),
            bounds = ii.getSymbolBounds().clone(),
            imageBounds = ii.getImageBounds().clone(),
            centerPoint = ii.getCenterPoint().clone();
			
		var textColor = overrideColor,
			textBackgroundColor = null;
    
        centerPoint = new SO.Point(Math.round(ii.getCenterPoint().getX()),Math.round(ii.getCenterPoint().getY()));
    
        var byLabelHeight = false;
        labelHeight = RendererUtilities.measureTextHeight(RendererSettings.getModifierFontName(),
                                RendererSettings.getModifierFontSize(),
                                RendererSettings.getModifierFontStyle()).fullHeight;
        labelHeight = Math.round(labelHeight);
        var maxHeight = (symbolBounds.getHeight());
        if((labelHeight * 3) > maxHeight)
            byLabelHeight = true;
        
        var descent = RendererUtilities.getFontDescent(RendererSettings.getModifierFontName(),RendererSettings.getModifierFontSize(),RendererSettings.getModifierFontStyle(),"TQgj");
        var yForY = -1;
        
        var labelBounds1 = null,//text.getPixelBounds(null, 0, 0);
            labelBounds2 = null,
            strText = "",
            strText1 = "",
            strText2 = "",
            text1 = null,
            text2 = null;

        var basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
        
        if(outlineOffset > 2)
            outlineOffset = ((outlineOffset - 1) /2);
        else
            outlineOffset = 0;
        
        /*bufferXL += outlineOffset;
        bufferXR += outlineOffset;
        bufferY += outlineOffset;
        bufferText += outlineOffset;*/
        
        
        // </editor-fold>
            
        // <editor-fold defaultstate="collapsed" desc="Process Modifiers">
        var ti = null;
        
        {
            if(modifiers.N)
            {
                strText = modifiers[ModifiersTG.N_HOSTILE];
                ti = new TextInfo(strText,0,0,textInfoContext);
                
                x = bounds.x + bounds.width + bufferXR;

                if(!byLabelHeight)
                {
                    y = ((bounds.height / 3) * 2);//checkpoint, get box above the point
                    y = bounds.y + y;
                }
                else
                {
                    //y = ((labelHeight + bufferText) * 3);
                    //y = bounds.y + y - descent;
                    y = bounds.y + bounds.height;
                }
                
                ti.setLocation(x,y);
                arrMods.push(ti);

            }
            if(modifiers.H !== undefined)//H
            {
                strText = modifiers[ModifiersTG.H_ADDITIONAL_INFO_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y - descent;
                
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
            if(modifiers.H1 !== undefined)//H1
            {//pretty much just for Action Point
                strText = modifiers[ModifiersTG.H1_ADDITIONAL_INFO_2];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);
                y = bounds.y + labelHeight + (bounds.height*0.2);
                
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
            if(modifiers.W !== undefined)//W
            {
                strText = modifiers[ModifiersTG.W_DTG_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                x = bounds.x - labelWidth - bufferXL;
                y = bounds.y + labelHeight - descent;
                           
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
            if(modifiers.W1 !== undefined)//W1
            {
                strText = modifiers[ModifiersTG.W1_DTG_2];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                x = bounds.x - labelWidth - bufferXL;
                
                y = ((labelHeight - descent + bufferText) * 2);
                y = bounds.y + y;
                                
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
            if(modifiers.T !== undefined)//T
            {
                strText = modifiers[ModifiersTG.T_UNIQUE_DESIGNATION_1];
                ti = new TextInfo(strText,0,0,textInfoContext);
                if (basicID===("G*G*GPRE--****X")) {
                    labelWidth = Math.round(ti.getTextBounds().getWidth());
                    //points
                    x = bounds.x + (bounds.width * 0.5);
                    x = x - (labelWidth * 0.5);

                    y = ((bounds.height * 0.20));
                    y = bounds.y + y;
                }else{
                    x = bounds.x + bounds.width + bufferXR;
                    y = bounds.y + labelHeight - descent;
                }
                
                
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
            if((modifiers.T1 !== undefined) &&//T1
                    (basicID===("G*O*ES----****X") || //emergency distress call
                    basicID===("G*S*PP----****X") || //medevac pick-up point
                    basicID===("G*S*PX----****X")||//ambulance exchange point
                    basicID===("G*G*GPRE--****X")))//Node Signal Unit
            {
                strText = modifiers[ModifiersTG.T1_UNIQUE_DESIGNATION_2];
                ti = new TextInfo(strText,0,0,textInfoContext);
                labelWidth = Math.round(ti.getTextBounds().getWidth());
                
                //points
                x = bounds.x + (bounds.width * 0.5);
                x = x - (labelWidth * 0.5);

                if (basicID===("G*G*GPRE--****X")) {
                    y = ((bounds.height * 0.70));
                    y = bounds.y + y;    
                }else{
                    //y = bounds.y + (bounds.height * 0.5);

                    y = ((bounds.height * 0.60));//633333333
                    y = bounds.y + y;
                }               
                    
                ti.setLocation(x,y);
                arrMods.push(ti);
            }
          
        }
        
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Shift Points and Draw">
        var modifierBounds = null;
        if(arrMods !== null && arrMods.length > 0)
        {

            //build modifier bounds/////////////////////////////////////////
            modifierBounds = arrMods[0].getTextOutlineBounds();
            var size = arrMods.length;
            var tempShape = null;
            for(var i=1; i<size;i++)
            {
                tempShape = arrMods[i];
                modifierBounds.union(tempShape.getTextOutlineBounds());
            }

        }


        if(modifierBounds !== null){

            imageBounds.union(modifierBounds);

            //shift points if needed////////////////////////////////////////
            if(imageBounds.getX() < 0 || imageBounds.getY() < 0)
            {
                var shiftX = Math.abs(imageBounds.getX()),
                    shiftY = Math.abs(imageBounds.getY());

                //shift mobility points
                var size = arrMods.length;
                var tempShape = null;
                for(var i=0; i<size;i++)
                {
                    tempShape = arrMods[i];
                    tempShape.shift(shiftX,shiftY);
                }
                modifierBounds.shift(shiftX,shiftY);

                //shift image points
                centerPoint.shift(shiftX, shiftY);
                symbolBounds.shift(shiftX, shiftY);
                imageBounds.shift(shiftX, shiftY);
            }

            if(render === true)
            {
                var buffer = this.createBuffer(imageBounds.getWidth(),imageBounds.getHeight());
                var ctx = buffer.getContext('2d');

                //draw original icon
                //ctx.drawImage(ii.getImage(),symbolBounds.getX(),symbolBounds.getY());
                ctx.drawImage(ii.getImage(),0,0,
                                symbolBounds.getWidth(), symbolBounds.getHeight(),
                                symbolBounds.getX(),symbolBounds.getY(),
                                symbolBounds.getWidth(), symbolBounds.getHeight());

				if(modifiers[MilStdAttributes.TextColor])
					textColor = modifiers[MilStdAttributes.TextColor];
				if(modifiers[MilStdAttributes.TextBackgroundColor])
					textBackgroundColor = modifiers[MilStdAttributes.TextBackgroundColor];
					
                this.renderText(ctx,arrMods, textColor, textBackgroundColor);
            }
            newii = new ImageInfo(buffer, centerPoint, symbolBounds, imageBounds);
            
            // <editor-fold defaultstate="collapsed" desc="Cleanup">
            ctx = null;
            buffer = null;
            // </editor-fold>
            
            return newii;
        }
        // </editor-fold>

    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Support functions">
    createBuffer: function(width, height)
    {
	var buffer = _document.createElement('canvas');
	buffer.width = width;
	buffer.height = height;
        
	return buffer;
	
    },
    getYPositionForSCC: function(symbolID)
    {
        var yPosition = 0.32;
        var temp = symbolID.substring(4, 10);
        var affiliation = symbolID.charAt(1);

        if(temp === ("WMGC--"))//GROUND (BOTTOM) MILCO
        {
            if(affiliation === 'H' || 
                    affiliation === 'S')//suspect
                yPosition = 0.29;
            else if(affiliation === 'N' ||
                    affiliation === 'L')//exercise neutral
                yPosition = 0.32;
            else if(affiliation === 'F' ||
                    affiliation === 'A' ||//assumed friend
                    affiliation === 'D' ||//exercise friend
                    affiliation === 'M' ||//exercise assumed friend
                    affiliation === 'K' ||//faker
                    affiliation === 'J')//joker
                yPosition = 0.32;
            else
                yPosition = 0.34;
        }
        else if(temp === ("WMMC--"))//MOORED MILCO
        {
            if(affiliation === 'H' || 
                    affiliation === 'S')//suspect
                yPosition = 0.29;
            else if(affiliation === 'N' ||
                    affiliation === 'L')//exercise neutral
                yPosition = 0.32;
            else if(affiliation === 'F' ||
                    affiliation === 'A' ||//assumed friend
                    affiliation === 'D' ||//exercise friend
                    affiliation === 'M' ||//exercise assumed friend
                    affiliation === 'K' ||//faker
                    affiliation === 'J')//joker
                yPosition = 0.32;
            else
                yPosition = 0.34;
        }
        else if(temp === ("WMFC--"))//FLOATING MILCO
        {
            if(affiliation === 'H' || 
                    affiliation === 'S')//suspect
                yPosition = 0.29;
            else if(affiliation === 'N' ||
                    affiliation === 'L')//exercise neutral
                yPosition = 0.32;
            else if(affiliation === 'F' ||
                    affiliation === 'A' ||//assumed friend
                    affiliation === 'D' ||//exercise friend
                    affiliation === 'M' ||//exercise assumed friend
                    affiliation === 'K' ||//faker
                    affiliation === 'J')//joker
                yPosition = 0.32;
            else
                yPosition = 0.34;
        }
        else if(temp === ("WMC---"))//GENERAL MILCO
        {
            if(affiliation === 'H' || 
                    affiliation === 'S')//suspect
                yPosition = 0.35;
            else if(affiliation === 'N' ||
                    affiliation === 'L')//exercise neutral
                yPosition = 0.39;
            else if(affiliation === 'F' ||
                    affiliation === 'A' ||//assumed friend
                    affiliation === 'D' ||//exercise friend
                    affiliation === 'M' ||//exercise assumed friend
                    affiliation === 'K' ||//faker
                    affiliation === 'J')//joker
                yPosition = 0.39;
            else
                yPosition = 0.39;
        }
        
        return yPosition;
    },
    /**
     * 
     * @param {type} symbolID
     * @param {type} bounds symbolBounds SO.Rectangle
     * @param {type} center SO.Point Location where symbol is centered.
     * @param {type} angle in degrees
     * @param {Boolean} isY Boolean.
     * @returns {Array} of SO.Point.  First 3 items are the line.  Last three
     * are the arrowhead.
     */
    createDOMArrowPoints: function(symbolID, bounds, center, angle, isY){
        var arrowPoints = new Array();
        var pt1 = null,
            pt2 = null,
            pt3 = null;
        
		var affiliation = symbolID.charAt(1);
        var length = 40;
        if(SymbolUtilities.isNBC(symbolID))
            length = Math.round(bounds.getHeight() / 2);
        else if((SymbolUtilities.isHQ(symbolID)) && 
					(affiliation===("F") ||
					affiliation===("A") ||
					affiliation===("D") ||
					affiliation===("M") ||
					affiliation===("J") ||
					affiliation===("K") ||
					affiliation===("N") ||
					affiliation===("L"))===false)
			length = Math.round(bounds.getHeight() * 0.7);
        else
            length = bounds.getHeight();
        
        //get endpoint
        var dx2, dy2,
            x1, y1,
            x2, y2;
    
        x1 = Math.round(center.getX());
        y1 = Math.round(center.getY());
        
        pt1 = new SO.Point(x1,y1);
        var scheme = symbolID.charAt(0);
        if(SymbolUtilities.isHQ(symbolID)==false && (SymbolUtilities.isNBC(symbolID) ||
            (scheme === 'S' && symbolID.charAt(2)===("G")) || 
            scheme === 'O' || scheme === 'E'))
        {
            y1 = bounds.getY() + bounds.getHeight();
            pt1 = new SO.Point(x1,y1);
            
            if(isY === true && SymbolUtilities.isNBC(symbolID))//make room for y modifier
            {
                var yModifierOffset = RendererUtilities.measureTextHeight(RendererSettings.getModifierFontName(),
                    RendererSettings.getModifierFontSize(),
                    RendererSettings.getModifierFontStyle()).fullHeight;

                yModifierOffset += RendererSettings.getTextOutlineWidth();
                
                pt1.shift(0,yModifierOffset);
            }
            
            y1 = y1 + length;
            pt2 = new SO.Point(x1,y1);
        }
        
        //get endpoint given start point and an angle
        //x2 = x1 + (length * Math.cos(radians)));
        //y2 = y1 + (length * Math.sin(radians)));
        angle = angle - 90;//in java, east is zero, we want north to be zero
        var radians = 0;
        radians = angle * (Math.PI / 180);//convert degrees to radians
        
        dx2 = x1 + (length * Math.cos(radians));
        dy2 = (y1 + (length * Math.sin(radians)));
        x2 = Math.round(dx2);
        y2 = Math.round(dy2);
        
        //create arrowhead//////////////////////////////////////////////////////
        var arrowWidth = 8.0,//6.5f;//7.0f;//6.5f;//10.0f//default
            theta = 0.7,//0.423,//higher value == shorter arrow head
            xPoints = new Array(),//3
            yPoints = new Array(),//3
            vecLine = new Array(),//2
            vecLeft = new Array(),//2
            fLength,
            th,
            ta,
            baseX, baseY;
        
        xPoints[0] = x2;
        yPoints[0] = y2;

        //build the line vector
        vecLine[0] = (xPoints[0] - x1);
        vecLine[1] = (yPoints[0] - y1);

        //build the arrow base vector - normal to the line
        vecLeft[0] = -vecLine[1];
        vecLeft[1] = vecLine[0];

        //setup length parameters
        fLength = Math.sqrt(vecLine[0] * vecLine[0] + vecLine[1] * vecLine[1]);
        th = arrowWidth / (2.0 * fLength);
        ta = arrowWidth / (2.0 * (Math.tan(theta)/2.0)*fLength);

        //find base of the arrow
        baseX = (xPoints[0] - ta * vecLine[0]);
        baseY = (yPoints[0] - ta * vecLine[1]);

        //build the points on the sides of the arrow
        xPoints[1] = Math.round(baseX + th * vecLeft[0]);
        yPoints[1] = Math.round(baseY + th * vecLeft[1]);
        xPoints[2] = Math.round(baseX - th * vecLeft[0]);
        yPoints[2] = Math.round(baseY - th * vecLeft[1]);

        
        //line.lineTo((int)baseX, (int)baseY);
        pt3 = new SO.Point(Math.round(baseX),Math.round(baseY));
        
        //arrowHead = new Polygon(xPoints, yPoints, 3);
        arrowPoints[0] = pt1;
        arrowPoints[1] = pt2;
        arrowPoints[2] = pt3;
        arrowPoints[3] = new SO.Point(xPoints[0],yPoints[0]);
        arrowPoints[4] = new SO.Point(xPoints[1],yPoints[1]);
        arrowPoints[5] = new SO.Point(xPoints[2],yPoints[2]);
        
        return arrowPoints;
        
    },
            
    hasDisplayModifiers: function(symbolID, modifiers)
    {
        var scheme = symbolID.charAt(0);
        var status = symbolID.charAt(3);
        var affiliation = symbolID.charAt(1);
        if(scheme !== "W")
        {
            if(scheme !== "G" && SymbolUtilities.isEMSNaturalEvent(symbolID) === false)
            {
                switch (status)
                {
                    case "C":
                    case "D":
                    case "X":
                    case "F":
                        return true;
                        break;  
                }

                if((symbolID.substring(10,12)!=="--" && symbolID.substring(10,12)!=="**") || modifiers[ModifiersUnits.Q_DIRECTION_OF_MOVEMENT])
                {
                    return true;
                }

                if(SymbolUtilities.isHQ(symbolID))
                    return true;
            }   
            else 
            {
                if(SymbolUtilities.isNBC(symbolID) === true && modifiers[ModifiersUnits.Q_DIRECTION_OF_MOVEMENT])
                {
                    return true;
                }
            }
            
            return false;
        }
        else
            return false;
        
    },
            
    hasTextModifiers: function(symbolID, modifiers)
    {
        var symStd  = modifiers[MilStdAttributes.SymbologyStandard] || RendererSettings.getSymbologyStandard();
        var scheme = symbolID.charAt(0);
        if(scheme==="W")
        {
            if(symbolID === "WAS-WSF-LVP----" || //freezing level
                symbolID === "WAS-PHT---P----" || //tropopause high
                symbolID === "WAS-PLT---P----" || //tropopause low
                symbolID === "WAS-WST-LVP----" || //tropopause level
                symbolID === "WAS-WP----P----" || //Wind plot
                symbolID === "WA-DWSTSWA--A--" || //Tropical storm wind areas and date/Time labels
                symbolID === "WA--FI---------" || //Instrument ceiling
                symbolID === "WA--FV---------" || //Visual ceiling
                symbolID === "WOS-HDS---P----") //Soundings
                return true;
            else
                return false;
        }
        if(scheme==="G")
        {
            var basic = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
            
            var sd = SymbolDefTable.getSymbolDef(basic, symStd);
            
            //var len = _tgTextModifierKeys.length;
            if(sd.modifiers && sd.modifiers !== "")
            {
                var tgSpecificKeys = sd.modifiers.split(".");//modifiers for this specific symbol
                var len = tgSpecificKeys.length;
            
                for(var i=0; i<len; i++)
                {
                    if(modifiers[tgSpecificKeys[i]])
                        return true;
                }
            }
        }
        else if(SymbolUtilities.isEMSNaturalEvent(symbolID) === false)
        {
            
            if(SymbolUtilities.getUnitAffiliationModifier(symbolID,symStd) !== null)
                return true;
            
            if(RendererSettings.getDrawCountryCode() && SymbolUtilities.hasValidCountryCode(symbolID))
                return true;
            
            if(SymbolUtilities.isEMSNaturalEvent(symbolID))
                return false;

            var len = _unitTextModifierKeys.length;
            for(var j=0; j<len; j++)
            {
                if(modifiers[_unitTextModifierKeys[j]])
                    return true;
            }
        }
        return false;
    },
    
    /**
     * renders modifier text to a canvas
     * @param {type} ctx html5 canvas context object
     * @param {type} tiArray array of TextInfo.js objects
     * @param {type} color a hex string "#000000"
     * @returns {void}
     */
    renderText: function(ctx, tiArray, color, backgroundColor)
    {
        ctx.lineCap = "butt";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 3;
        /*ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.miterLimit = 3;*/

        
        ctx.font = RendererSettings.getModifierFont();

        var size = tiArray.length,
            tempShape = null,
            fillStyle = "#000000",
			outlineStyle = null,
            tbm = RendererSettings.getTextBackgroundMethod(),
            outlineWidth = RendererSettings.getTextOutlineWidth();
    
        if(color)
        {
            fillStyle = color;
        }
        else if(RendererSettings.getLabelForegroundColor() !== null)
        {
            fillStyle = RendererSettings.getLabelForegroundColor().toHexString(false);
        }   

		if(backgroundColor)
		{
			outlineStyle = backgroundColor;
		}
		else
		{
			outlineStyle = RendererUtilities.getIdealOutlineColor(fillStyle,true);
		}
        

        if(tbm === RendererSettings.TextBackgroundMethod_OUTLINE_QUICK)
        {    
            //draw text outline
            if(outlineWidth > 0)
            {
                ctx.lineWidth = RendererSettings.getTextOutlineWidth();
                ctx.fillStyle = outlineStyle;
                ctx.strokeStyle = outlineStyle;
                for(var i=0; i<size;i++)
                {
                    tempShape = tiArray[i];
                    tempShape.outlineText(ctx);
                }
            }
            //draw text
            ctx.fillStyle = fillStyle;
            for(var j=0; j<size;j++)
            {
                tempShape = tiArray[j];
                tempShape.fillText(ctx);
            }
        }
		else if(tbm === RendererSettings.TextBackgroundMethod_COLORFILL)
		{
			//draw text outline
            if(outlineWidth > 0)
            {
                ctx.fillStyle = outlineStyle;
                for(var i=0; i<size;i++)
                {
                    tempShape = tiArray[i];
					tempShape.getTextOutlineBounds().fill(ctx);
                }
            }
            //draw text
            ctx.fillStyle = fillStyle;
            for(var j=0; j<size;j++)
            {
                tempShape = tiArray[j];
                tempShape.fillText(ctx);
            }
		}
		else if(tbm === RendererSettings.TextBackgroundMethod_NONE)
		{
			//draw text
            ctx.fillStyle = fillStyle;
            for(var j=0; j<size;j++)
            {
                tempShape = tiArray[j];
                tempShape.fillText(ctx);
            }
		}
		else// if(tbm === RendererSettings.TextBackgroundMethod_OUTLINE)
        {
            if(outlineWidth > 0)
                ctx.lineWidth = (outlineWidth * 2) + 1;
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = outlineStyle;
            for(var i=0; i<size;i++)
            {
                tempShape = tiArray[i];
                if(outlineWidth>0)
                {
                    tempShape.strokeText(ctx);
                }
                tempShape.fillText(ctx);
            }
        }     
    },
    /**
     * 
     * @param {armyc2.c2sd.renderer.utilities.ImageInfo} ii
     * @param {String} symbolID
     * @param {object} modifiers
     * @returns {armyc2.c2sd.renderer.utilities.ImageInfo}
     */
    renderImage: function(ii, symbolID, modifiers)
    {
        var iinew = null;

        var hasTextModifiers = true;
        
        iinew = this.processUnitDisplayModifiers(ii, symbolID, modifiers,hasTextModifiers);

        if(iinew !== null)
            ii = iinew;

        iinew = null;

        iinew = this.processUnitModifiers(ii,symbolID,modifiers);

        if(iinew !== null)
                ii = iinew;
        
        return ii;
    }
    
    // </editor-fold>
};
}());var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};

armyc2.c2sd.renderer.MilStdIconRenderer = (function () {
    
    var MilStdAttributes = armyc2.c2sd.renderer.utilities.MilStdAttributes,
        SO = armyc2.c2sd.renderer.so,
        ImageInfo = armyc2.c2sd.renderer.utilities.ImageInfo,
        SymbolUtilities = armyc2.c2sd.renderer.utilities.SymbolUtilities,
        UnitDefTable = armyc2.c2sd.renderer.utilities.UnitDefTable,
        UnitFontLookup = armyc2.c2sd.renderer.utilities.UnitFontLookup,
        SymbolDefTable = armyc2.c2sd.renderer.utilities.SymbolDefTable,
        RendererSettings = armyc2.c2sd.renderer.utilities.RendererSettings,
        RendererUtilities = armyc2.c2sd.renderer.utilities.RendererUtilities,
        SinglePointRenderer = armyc2.c2sd.renderer.SinglePointRenderer,
        TacticalGraphicIconRenderer = armyc2.c2sd.renderer.TacticalGraphicIconRenderer,
        initialized = false;
        
    try
    {
        if(initialized === false)
        {
            //load in xml files
            UnitDefTable.init();  
            SymbolDefTable.init();
            armyc2.c2sd.renderer.utilities.SinglePointLookup.init();
            armyc2.c2sd.renderer.utilities.UnitFontLookup.init();
            armyc2.c2sd.renderer.utilities.TacticalGraphicLookup.init();
            
            if(UnitDefTable.hasSymbolMap(RendererSettings.Symbology_2525B)===false)
            {//if 2525B info isn't loaded, make C the rendering default.
                RendererSettings.setSymbologyStandard(RendererSettings.Symbology_2525C);
            }

            initialized = true;
        }
    }
    catch(err)
    {
        err.message += " - MilStdIconRenderer failed to initialize";
        armyc2.c2sd.renderer.utilities.ErrorLogger.LogException("MilStdIconRenderer","Init",err);
    }
    
    function renderTacticalMultipointIcon(symbolID, modifiers)
    {
        var lineColor = SymbolUtilities.getLineColorOfAffiliation(symbolID);
        if(modifiers[MilStdAttributes.LineColor] !== undefined )
        {
            lineColor = modifiers[MilStdAttributes.LineColor];
        }
        var size = RendererSettings.getDefaultPixelSize();//40;
        if(modifiers[MilStdAttributes.PixelSize] !== undefined )
        {
            size = modifiers[MilStdAttributes.PixelSize];
        }
        var alpha = 1.0;
        if(modifiers[MilStdAttributes.Alpha] !== undefined )
        {
            alpha = modifiers[MilStdAttributes.Alpha] / 255.0;
        }
        var symStd = RendererSettings.getSymbologyStandard();
        if(modifiers[MilStdAttributes.SymbologyStandard] !== undefined )
        {
            symStd = modifiers[MilStdAttributes.SymbologyStandard];
        }

        var ii = TacticalGraphicIconRenderer.getIcon(symbolID, size, lineColor, alpha, symStd);
        return ii;
    }
    
return{    

    CanRender: function(){
        
    },
    Render: function(symbolID, modifiers){
        if(!(modifiers))
        {
            modifiers = {};
        }
        var symStd = 0;
        if(modifiers[MilStdAttributes.SymbologyStandard] !== null && modifiers[MilStdAttributes.SymbologyStandard] !== undefined)
        {
            symStd = modifiers[MilStdAttributes.SymbologyStandard];
        }
        else
        {
            symStd = RendererSettings.getSymbologyStandard();
            modifiers[MilStdAttributes.SymbologyStandard] = symStd;
        }
        
        var basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
        
        if(SymbolUtilities.isTacticalGraphic(symbolID))
        {
            var sd = SymbolDefTable.getSymbolDef(basicID,symStd);
            if(sd === null)
            {
                symbolID = SymbolUtilities.reconcileSymbolID(symbolID);
                basicID = SymbolUtilities.getBasicSymbolIDStrict(symbolID);
                sd = SymbolDefTable.getSymbolDef(basicID);
            }
            
            if(sd !== null && sd.drawCategory === SymbolDefTable.DRAW_CATEGORY_POINT)
            {
                return armyc2.c2sd.renderer.SinglePointRenderer.renderSPTG(symbolID, modifiers);
            }
            else
            {
                return renderTacticalMultipointIcon(symbolID,modifiers);
            }
        }
        else if(UnitFontLookup.hasUnitLookup(basicID,symStd))
        {
            return SinglePointRenderer.renderUnit(symbolID, modifiers);
        }
        else if(SymbolUtilities.is3dAirspace(symbolID))
        {
            return renderTacticalMultipointIcon(symbolID, modifiers);
        }
        else
        {
            symbolID = SymbolUtilities.reconcileSymbolID(symbolID,false);
            return SinglePointRenderer.renderUnit(symbolID, modifiers);
        }
    },
    /**
     * 
     * @param {armyc2.c2sd.renderer.utilities.ImageInfo} imageInfo
     * @param {String} symbolID
     * @param {object} modifiers
     * @returns {armyc2.c2sd.renderer.utilities.ImageInfo}
     */
    RenderImageInfoWithLabels: function(imageInfo, symbolID, modifiers)
    {
        var ii = SinglePointRenderer.renderImage(imageInfo, symbolID, modifiers);
        return ii;
    },
    /**
     * 
     * @param {HTML5 canvas} canvas
     * @param {String} symbolID
     * @param {Object} modifiers
     * @param {armyc2.c2sd.renderer.so.Point} centerPoint optional, default is center of the image.
     * @param {armyc2.c2sd.renderer.so.Rectangle} symbolBounds optional, default is size of the entire image.
     * @returns {armyc2.c2sd.renderer.utilities.ImageInfo}
     */
    RenderCanvasWithLabels:  function(canvas, symbolID, modifiers, centerPoint, symbolBounds)
    {
        var ib = null,
            cp = null,
            sb = null;

        var width = canvas.width;
        var height = canvas.height;

        ib = new SO.Rectangle(0,0,width,height);//should be the same or larger than symbol bounds
        if(centerPoint)
            cp = centerPoint;
        else
            cp = cp = new SO.Point(width/2,height/2);//where image should be centered
        if(symbolBounds)
            sb = symbolBounds;
        else
            sb = new SO.Rectangle(0,0,width,height);//bounds of the core symbol
            
        var ii = new ImageInfo(canvas,cp,sb,ib);
        ii = SinglePointRenderer.renderImage(ii, symbolID, modifiers);
        return ii;
        
    },
    /**
     * 
     * @param {String} url
     * @param {String} symbolID
     * @param {Object} modifiers
     * @param {function} callback that takes an ImageInfo object
     */
    RenderImageUrlWithLabels: function(url, symbolID, modifiers, callback)
    {
        //load image into canvas
        var buffer = null;
        var ctx = null;
        var image = new Image();
        var rcwl = this.RenderCanvasWithLabels;

        image.onload = function()
        {
            buffer = document.createElement('canvas');
            ctx = buffer.getContext('2d');
            buffer.width = image.width;
            buffer.height = image.height;
            ctx.drawImage(image,0,0);

            var ii = rcwl(buffer, symbolID, modifiers);
            callback(ii);
        };
        image.src = url;
    }
};
}());
(function($) {
    $.fn.render2525 = function() {
        var msa = armyc2.c2sd.renderer.utilities.MilStdAttributes;
        
        var RS = armyc2.c2sd.renderer.utilities.RendererSettings;
        
        RS.setSinglePointSymbolOutlineWidth(0);
        
        /**
         * we only have font lookups for F,H,N,U.  But the shapes match one of these
         * four for the remaining affiliations.  So we convert the string to a base
         * affiliation before we do the lookup.
         * @param {String} symbolID
         * @returns {String}
         */        
        function sanitize(symbolID) {
            var code = symbolID.substring(0);
            var affiliation = symbolID.charAt(1);

            if(affiliation === "F" ||//friendly
                    affiliation === "H" ||//hostile
                    affiliation === "U" ||//unknown
                    affiliation === "N" )//neutral
            {
                //code = code;
            }
            else if(affiliation === "S")//suspect
                code = code.charAt(0) + "H" + code.substring(2, 15);
            else if(affiliation === "L")//exercise neutral
                code = code.charAt(0) + "N" + code.substring(2, 15);
            else if(affiliation === "A" ||//assumed friend
                    affiliation === "D" ||//exercise friend
                    affiliation === "M" ||//exercise assumed friend
                    affiliation === "K" ||//faker
                    affiliation === "J")//joker
                code = code.charAt(0) + "F" + code.substring(2, 15);
            else if(affiliation === "P" ||//pending
                    affiliation === "G" ||//exercise pending
                    affiliation === "O" ||//? brought it over from mitch's code
                    affiliation === "W")//exercise unknown
                code = code.charAt(0) + "U" + code.substring(2, 15);
            else
                code = code.charAt(0) + "U" + code.substring(2, 15);

            code = code.substring(0,10) + "-----";

            return code;
        };
        
        return this.filter("canvas").each(function() {
            // The only required data attribute is the symbol code, only
            // continue if it's there
            if ($(this).data("symbol-code") !== undefined) {
                // Create an empty modifiers object
                var modifiers = {},
                        ii;

                var symbolID = $(this).data("symbol-code");

                // Determine the pixel size of the icon to draw
                if ($(this).data("pixel-size") === undefined) {
                    // Use 32 as the default size
                    modifiers[msa.PixelSize] = 32;
                }
                else {
                    modifiers[msa.PixelSize] = $(this).data("pixel-size");
                }
				
                modifiers[msa.Icon] = true;
                if ($(this).data("icon") !== undefined) {
                    modifiers[msa.Icon] = $(this).data("keep-unit-ratio");
                }
				
                if(modifiers[msa.Icon] !== true)
                {
                    //if false, will fill the space. if true, will size with respect to other symbols.
                    if ($(this).data("keep-unit-ratio") === undefined) {
                        // Use 32 as the default size
                        modifiers[msa.KeepUnitRatio] = false;
                    }
                    else {
                        modifiers[msa.KeepUnitRatio] = $(this).data("keep-unit-ratio");
                    }

                    if ($(this).data("sanitize") === true) {   
                        if(symbolID.charAt(1) === 'J' || symbolID.charAt(1) === 'K'){
                                modifiers[msa.FillColor] = "#FF0000";
                        }
                        symbolID = sanitize(symbolID, modifiers);   
                    }
                }
                
                if($(this).data("fill-color") !== undefined)
                    {modifiers[msa.FillColor] = $(this).data("fill-color");}
                
                if($(this).data("line-color") !== undefined)
                    {modifiers[msa.LineColor] = $(this).data("line-color");}
                    
                if($(this).data("sym-std") !== undefined)
                    {modifiers[msa.SymbologyStandard] = $(this).data("sym-std");}

                ii = armyc2.c2sd.renderer.MilStdIconRenderer.Render(symbolID, modifiers);
                if (ii)
                {
                    var canvasObject = $(this).get(0);
                    var ctx = canvasObject.getContext('2d');
                    
                    // Clear the canvas
                    ctx.clearRect(0, 0, canvasObject.width, canvasObject.height);

                    var image = ii.getImage();
                    // Adjust the size of the canvas to match the size of the symbol
                    $(canvasObject).attr("width", ii.getImageBounds().width);
                    $(canvasObject).attr("height", ii.getImageBounds().height);
                    ctx.drawImage(image, Math.round((canvasObject.width - ii.getImageBounds().width) / 2),
                            Math.round((canvasObject.height - ii.getImageBounds().height) / 2));

                }
            }
        });
    };
}(jQuery));


