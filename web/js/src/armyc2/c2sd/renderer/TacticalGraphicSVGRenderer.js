var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
/** @class */
armyc2.c2sd.renderer.TacticalGraphicSVGRenderer = (function () {
    
    var TGSVGTable = armyc2.c2sd.renderer.utilities.TGSVGTable;
    var MilStdAttributes = armyc2.c2sd.renderer.utilities.MilStdAttributes;//20200310
    
    /* 20200310 old source comment 
    function processSVGPath(path, fillColor, lineColor, strokeWidth)
    {
        var se = '<path d="';
        se += path + '"';
        if(fillColor)
            se += ' fill="' + fillColor + '"';
        if(lineColor)
            se += ' stroke="' + lineColor + '"';
        if(strokeWidth)
            se += ' stroke-width="' + strokeWidth + '"';
        se += ' />';
        return se;
    } */

    //20200310 modifiers add 
    //fillColor, lineColor, stroke-width => Behave differently than intended
    //To solve the problem you have to redraw svg.
    //(_d of open source only matched the shape.).
    function processSVGPath(path, fillColor, lineColor, modifiers)
    {
        var se = '<path d="';
        se += path + '"';
        if(fillColor)
            se += ' fill="' + fillColor + '"';
        if(lineColor)
            se += ' stroke="' + lineColor + '"';
        if(modifiers[MilStdAttributes.LineWidth] !== undefined )
            se += ' stroke-width="' + modifiers[MilStdAttributes.LineWidth] + '"';
        if(modifiers[MilStdAttributes.Alpha] !== undefined )
            se += ' opacity="' + (modifiers[MilStdAttributes.Alpha]/255.0) + '"';
        se += ' />';
        return se;
    }

    /* function processSVGPath1(path, lineColor, option)
    {
        var se = '<path d="';
        se += path + '"';
        if(lineColor)
            se += ' stroke="' + lineColor + '"';
        if(option)
            se += option;
        se += ' />';
        return se;
    } */
    
return{    
    //20200310 modifiers add
    getSVG: function(symbolID, size, color, alpha, symStd, modifiers){
        var symbolBounds = new armyc2.c2sd.renderer.so.Rectangle(-600,-600,1200,1200);
        var width = 1200;
        var height = 1200;
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

        var charSymbolIndex = armyc2.c2sd.renderer.utilities.TacticalGraphicLookup.getCharCodeFromSymbol(id, symStd);

        if(color.toHexString)
            color = color.toHexString(false);

        if(charSymbolIndex >= 0)
        {
            var ratio = size/1200;

            var path = TGSVGTable.getSVGPath(charSymbolIndex);            
            var pathC = TGSVGTable.getSVGPathC(charSymbolIndex);//2.3.4.4; 2.3.4.5; 2.3.4.6;

            path = processSVGPath(path,color, null, modifiers); //20200310 modifiers add   
            
            var pixel = new armyc2.c2sd.renderer.so.Point(0,0);


            /*ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 5;
            ctx.fillStyle = color;
            ctx.font = fontSize + "pt TacticalGraphics";
            if(alpha < 1.0)
                ctx.globalAlpha = alpha;//*/
            
            var x = Math.round(size/2),
                y = Math.round(size/2);
            
            

            var centerPoint = new armyc2.c2sd.renderer.so.Point(x,y),
                symbolBounds = new armyc2.c2sd.renderer.so.Rectangle(0,0,size,size),
                imageBounds = symbolBounds.clone();
                
            var svg = '<svg width="' + size + 'px" height="' + size + 'px" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" version="1.1">'
                      + '<g transform="translate(' + (x) + ',' + (y) +') scale(' + ratio + ',-' + ratio +')" >';
            svg += pathC;                                  
            svg += path;            
            svg += '</g></svg>'; 

            var si = new armyc2.c2sd.renderer.utilities.SVGInfo(svg,centerPoint,symbolBounds,imageBounds);
            //test
            //ii.SaveImageToFile("C:\\icon.png", ImageInfo.FormatPNG);
            
 
        }
        return si;
    }

};
}());