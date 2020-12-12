var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};
/** @class */
armyc2.c2sd.renderer.utilities.TGSVGTable = (function () {

    var map = null, 
        //mapO = null,
        mapC = null,
        mapCO = null,
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
            
            if(map===null  && armyc2.c2sd.renderer.xml.TacticalGraphicsSVG !== undefined)
            {
                symbols = armyc2.c2sd.renderer.xml.TacticalGraphicsSVG.svg.glyph;
                armyc2.c2sd.renderer.xml.TacticalGraphicsSVG = null;
                map = {};
                //mapO = {};
                mapC = {};
                mapCO = {};
                count = symbols.length;
                for (i = 0; i < count; i += 1) {
                    symbol = symbols[i];
                    
                    if (symbol && symbol._unicode && symbol._d) 
                    {
                        data = {};
                        data.ID = parseInt("0x" + symbol._unicode);
                        data.d = symbol._d;
                        map[data.ID] = data.d;
                        /* if (symbol._dOp) {
                            data.dOp = symbol._dOp;
                            mapO[data.ID] = data.dOp;
                        } */
                        if (symbol._d1) {
                            data.d1 = symbol._d1;
                            mapC[data.ID] = data.d1;
                        }
                        if (symbol._d1 && symbol._d1Op ) {
                            data.d1Op = symbol._d1Op;
                            mapCO[data.ID] = data.d1Op;
                        }
                    } 
                }
            }           
        },
      
        
        /**
         * 
         * @param {Integer} ID
         * @returns {unitDef} has symbolID, description, drawCategory,
         * hierarchy, alphahierarchy, path.  drawCategory is a Number.
         */
        getSVGPath: function (ID) 
        {
           
            if(map[ID] !== undefined)
            {
                return map[ID];
            }
            else
            {
                return null;
            }
            
        },
        /**
         * 
         * @param {Integer} ID
         * @returns {unitDef} has symbolID, description, drawCategory,
         * hierarchy, alphahierarchy, path.  drawCategory is a Number.
         */
        /* getSVGPathO: function (ID) 
        {
           
            if(mapO[ID] !== undefined)
            {
                return mapO[ID];
            }
            else
            {
                return "";
            }
            
        }, */
        /**
         * 
         * @param {Integer} ID
         * @returns {unitDef} has symbolID, description, drawCategory,
         * hierarchy, alphahierarchy, path.  drawCategory is a Number.
         */
        getSVGPathC: function (ID) 
        {
           
            if(mapC[ID] !== undefined)
            {
                var se = '<path d="';
                se += mapC[ID] + '"';
                if(mapCO[ID] !== undefined)
                    se += ' ' + mapCO[ID];
                se += ' />';
                return se;
            }
            else
            {
                return "";
            }
            
        },
        /**
         * 
         * @param {Integer} basic ID
         * @param {Number} symStd
         * @returns {Boolean}
         */
        hasSVGPath: function (ID) 
        {
            if(map[ID] !== undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    };
}());