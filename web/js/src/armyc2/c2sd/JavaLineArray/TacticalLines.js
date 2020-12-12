var army = army || {};
army.c2sd = army.c2sd || {};
army.c2sd = army.c2sd.JavaLineArray || {};
armyc2.c2sd.JavaLineArray.TacticalLines = function()
{
    this.BS_LINE = 10000000;
    this.BS_AREA = 11000000;
    this.BS_CROSS = 12000000;
    this.BS_ELLIPSE = 13000000;
    this.PBS_ELLIPSE = 13000001;
    this.PBS_CIRCLE = 13000002;
    this.BS_RECTANGLE = 14000000;
    this.PBS_RECTANGLE = 14000001;
    this.PBS_SQUARE = 14000002;
    this.BBS_LINE = 15000000;
    this.BBS_AREA = 15000001;
    this.BBS_POINT = 15000002;
    this.BBS_RECTANGLE = 15000003;
    this.BS_BBOX = 15000004;
    this.PZ = 22138000;
    this.LZ = 22137000;
    this.DZ = 22135000;
    this.FAADZ = 22232000;
    this.MEZ = 22234000;
    this.LOMEZ = 22234100;
    this.HIMEZ = 22234200;
    this.ROZ = 22231000;
    this.WFZ = 22235000;
    this.EZ = 22136000;
    this.AIRFIELD = 221311000;
    this.HIDACZ = 22233000;
    this.FPF = 24260000;
    this.DMA = 22340000;
    this.DMAF = 22350000;
    this.ENCIRCLE = 22624000;
    this.LAA = 221310000;
    this.DRCL = 23490000;
    this.BYPASS = 21300000;
    this.BYDIF = 23212000;
    this.BYIMP = 23213000;
    this.LINTGT = 24250000;
    this.BLOCK = 21100000;
    this.LINTGTS = 24211000;
    this.BREACH = 21200000;
    this.CANALIZE = 21400000;
    this.MNFLDDIS = 23174000;
    this.DISRUPT = 211000000;
    this.EASY = 23211000;
    this.CONTAIN = 21600000;
    this.CLEAR = 21500000;
    this.ISOLATE = 211400000;
    this.OCCUPY = 211600000;
    this.PENETRATE = 211700000;
    this.RETAIN = 211900000;
    this.SECURE = 212100000;
    this.SEIZE = 212300000;
    this.SEIZE_REVC = 212300001;
    this.ASLTXING = 23221000;
    this.BRIDGE = 23222000;
    this.GAP = 23163000;
    this.COVER = 212230000;
    this.COVER_REVC = 212230001;
    this.PROTECTION = 212240000;
    this.PROTECTION_REVC = 212240001;
    this.SCREEN = 212210000;
    this.CREEN_REVC = 212210001;
    this.GUARD = 212220000;
    this.GUARD_REVC = 212220001;
    this.SARA = 22139000;
    this.DECEIVE = 22310000;
    this.FIX = 211100000;
    this.PDF = 22422000;
    this.ATKBYFIRE = 22533000;
    this.SPTBYFIRE = 22534000;
    this.CLUSTER = 23157000;
    this.TURN = 23173000;
    this.PLANNED = 23191000;
    this.ESR1 = 23192000;
    this.ESR2 = 23193000;
    this.ROADBLK = 23194000;
    this.FOXHOLE = 23340000;
    this.PAA = 243100000;
    this.CONVOY = 25211000;
    this.HCONVOY = 25212000;
    this.FORDIF = 23225000;
    this.MSDZ = 23410000;
    this.RETIRE = 212000000;
    this.RIP = 211800000;
    this.TRIP = 231100000;
    this.NAVIGATION = 26220000;
    this.NEUTRALIZE = 211500000;
    this.DESTROY = 21900000;
    this.INTERDICT = 211300000;
    this.TRP = 22411000;
    this.FORTP = 23320000;
    this.MSR = 25221000;
    this.ASR = 25222000;
    this.LL = 22125000;
    this.S22182000 = 22128000;
    this.S22122900 = 22122900;
    this.S22123000 = 22123000;
    this.FERRY = 23223000;
    this.FORDSITE = 23224000;
    this.MFLANE = 23226000;
    this.RAFT = 23227000;
    this.FOLSP = 211210000;
    this.ATDITCH = 23131100;
    this.ATDITCHC = 23131200;
    this.ATWALL = 23134000;
    this.ATDITCHM = 23132000;
    this.DELAY = 21800000;
    this.DIRATKAIR = 22522100;
    this.DIRATKFNT = 22330000;
    this.DIRATKGND = 22522210;
    this.DIRATKSPT = 22522220;
    this.WITHDRAW = 212400000;
    this.CORDONSEARCH = 212500000;
    this.CORDONKNOCK = 212600000;
    this.WDRAWUP = 212410000;
    this.TEST = 0;
    this.MIN_POINTS = -1;
    this.CFL = 24222000;
    this.LOD = 22526000;
    this.PL = 22124000;
    this.FSCL = 24221000;
    this.RFL = 24224000;
    this.FCL = 22523000;
    this.LOA = 22525000;
    this.BRDGHD = 22623000;
    this.BRDGHD_GE = 22623001;
    this.PLD = 22528000;
    this.FLOT = 22122000;
    this.FLOT2 = 22122001;
    this.FEBA = 22421000;
    this.AMBUSH = 22611000;
    this.LLTR = 22225000;
    this.SAAFR = 22223000;
    this.AC = 22221000;
    this.AC_WIDTH = 22221001;
    this.MRR = 22222000;
    this.UAV = 22224000;
    this.MRR_USAS = 22222001;
    this.UAV_USAS = 22224001;
    this.MNFLDFIX = 23172000;
    this.MNFLDBLK = 23171000;
    this.ONEWAY = 25223000;
    this.ALT = 25224000;
    this.TWOWAY = 25225000;
    this.BEARING = 26400000;
    this.ELECTRO = 26410000;
    this.ACOUSTIC = 26420000;
    this.TORPEDO = 26430000;
    this.OPTICAL = 26440000;
    this.BOUNDARY = 22121000;
    this.MMR = 221231710;
    this.AMR = 221231720;
    this.HOLD = 22612000;
    this.HOLD_GE = 22612001;
    this.RELEASE = 22613000;
    this.ABATIS = 23120000;
    this.LINE = 23112000;
    this.FOLLA = 211200000;
    this.AXAD = 22521100;
    this.AIRAOA = 22521200;
    this.AAAAA = 22521300;
    this.MAIN = 22521410;
    this.MAIN_STRAIGHT = 22521411;
    this.AAFNT = 22320000;
    this.AAFNT_STRAIGHT = 22320001;
    this.LC = 22123000;
    this.LC2 = 22123001;
    this.LC_HOSTILE = 22123002;
    this.IL = 22524000;
    this.LDLC = 22527000;
    this.SPT = 22521420;
    this.SPT_STRAIGHT = 22521421;
    this.CATK = 21700000;
    this.BELT = 23111000;
    this.BELT1 = 23111001;
    this.CATKBYFIRE = 21710000;
    this.TRIPLE = 231117300;
    this.TRIPLE2 = 231117301;
    this.DOUBLEC = 231117200;
    this.DOUBLEC2 = 231117201;
    this.SINGLEC = 231117100;
    this.SINGLEC2 = 231117101;
    this.HWFENCE = 231116000;
    this.LWFENCE = 231115000;
    this.UNSP = 231111000;
    this.DOUBLEA = 231114000;
    this.SFENCE = 231112000;
    this.DFENCE = 231113000;
    this.CHANNEL = 231113001;
    this.CHANNEL_FLARED = 231113002;
    this.CHANNEL_DASHED = 231113003;
    this.OVERHEAD_WIRE = 23200000;
    this.OVERHEAD_WIRE_LS = 23200001;
    this.PAA_RECTANGULAR = 24326100;
    this.PAA_RECTANGULAR_REVC = 24326101;
    this.BATTLE = 22431000;
    this.STRONG = 23350000;
    this.ASSY = 22132000;
    this.FFA = 24323100;
    this.FFA_RECTANGULAR = 24323200;
    this.FFA_CIRCULAR = 24323300;
    this.FSA = 24321100;
    this.FSA_RECTANGULAR = 24321200;
    this.FSA_CIRCULAR = 24321300;
    this.RFA = 24325100;
    this.RFA_RECTANGULAR = 24325200;
    this.RFA_CIRCULAR = 24325300;
    this.PAA_CIRCULAR = 24326200;
    this.ATI = 24331100;
    this.ATI_RECTANGULAR = 24331200;
    this.ATI_CIRCULAR = 24331300;
    this.CFFZ = 24332100;
    this.CFFZ_RECTANGULAR = 24332200;
    this.CFFZ_CIRCULAR = 24332300;
    this.SENSOR = 24333100;
    this.SENSOR_RECTANGULAR = 24333200;
    this.SENSOR_CIRCULAR = 24333300;
    this.CENSOR = 24334100;
    this.CENSOR_RECTANGULAR = 24334200;
    this.CENSOR_CIRCULAR = 24334300;
    this.DA = 24335100;
    this.DA_RECTANGULAR = 24335200;
    this.DA_CIRCULAR = 24335300;
    this.CFZ = 24336100;
    this.CFZ_RECTANGULAR = 24336200;
    this.CFZ_CIRCULAR = 24336300;
    this.ZOR = 24337100;
    this.ZOR_RECTANGULAR = 24337200;
    this.ZOR_CIRCULAR = 24337300;
    this.TBA = 24338100;
    this.TBA_RECTANGULAR = 24338200;
    this.TBA_CIRCULAR = 24338300;
    this.TVAR = 24339100;
    this.TVAR_RECTANGULAR = 24339200;
    this.TVAR_CIRCULAR = 24339300;
    this.TAI = 22626000;
    this.OBJ = 22535000;
    this.BSA = 25351000;
    this.DSA = 25352000;
    this.EA = 22133000;
    this.EA1 = 22432000;
    this.NAI = 22625000;
    this.FARP = 25330000;
    this.FORT = 22134000;
    this.ACA = 24322100;
    this.ACA_RECTANGULAR = 24322200;
    this.ACA_CIRCULAR = 24322300;
    this.AT = 24330000;
    this.SMOKE = 24314000;
    this.SERIES = 24313000;
    this.BOMB = 24315000;
    this.DHA = 25310000;
    this.EPW = 25320000;
    this.RHA = 25340000;
    this.RSA = 25353000;
    this.S25354000 = 25354000;
    this.GENERAL = 22131000;
    this.GENERIC = 22131001;
    this.DUMMY_STATIC = 22360000;
    this.DUMMY = 2237000;
    this.PNO = 22431100;
    this.ASSAULT = 22531000;
    this.ATKPOS = 22532000;
    this.AO = 22621000;
    this.AIRHEAD = 22622000;
    this.PEN = 22536000;
    this.DEPICT = 23162000;
    this.MINED = 23164000;
    this.UXO = 23180000;
    this.FORTL = 23330000;
    this.OBSAREA = 23115000;
    this.ZONE = 23113000;
    this.OBSFAREA = 23114000;
    this.NFA = 24324100;
    this.NFA_RECTANGULAR = 24324200;
    this.NFA_CIRCULAR = 24324300;
    this.CHEM = 23460000;
    this.BIO = 23450000;
    this.RAD = 23440000;
    this.NFL = 24223000;
    this.MFP = 24225000;
    this.TGMF = 24226000;
    this.RECTANGULAR = 24311000;
    this.CIRCULAR = 24312000;
    this.KILLBOXBLUE = 24351000;
    this.KILLBOXBLUE_RECTANGULAR = 24352000;
    this.KILLBOXBLUE_CIRCULAR = 24353000;
    this.KILLBOXPURPLE = 24361000;
    this.KILLBOXPURPLE_RECTANGULAR = 24362000;
    this.KILLBOXPURPLE_CIRCULAR = 24363000;
    this.RANGE_FAN = 243111000;
    this.RANGE_FAN_FILL = 243111001;
    this.RANGE_FAN_SECTOR = 243112000;

    //rev D new line types
    this.LAUNCH_AREA = 25200101;

    
    this.CF = 31131000;
    this.UCF = 31131100;
    this.CFG = 31131200;
    this.CFY = 31131300;
    this.WF = 31132000;
    this.WFG = 31132200;
    this.WFY = 31132300;
    this.UWF = 31132100;
    this.OCCLUDED = 31133000;
    this.UOF = 31133100;
    this.OFY = 31133200;
    this.SF = 31134000;
    this.USF = 31134100;
    this.SFG = 31134200;
    this.SFY = 31134300;
    this.TROUGH = 31141000;
    this.INSTABILITY = 31144000;
    this.SHEAR = 31145000;
    this.ITC = 31146000;
    this.CONVERGANCE = 31147000;
    this.ITD = 31148000;
    this.RIDGE = 31142000;
    this.SQUALL = 31143000;
    this.JET = 31430000;
    this.JET_GE = 31430001;
    this.STREAM = 31440000;
    this.STREAM_GE = 31440001;
    this.IFR = 31710000;
    this.MVFR = 31720000;
    this.TURBULENCE = 31730000;
    this.ICING = 31740000;
    this.NON_CONVECTIVE = 31750000;
    this.CONVECTIVE = 31751000;
    this.FROZEN = 31760000;
    this.THUNDERSTORMS = 31770000;
    this.FOG = 31780000;
    this.SAND = 31790000;
    this.FREEFORM = 317100000;
    this.ISOBAR = 31810000;
    this.ISOBAR_GE = 31810001;
    this.UPPER_AIR = 31820000;
    this.UPPER_AIR_GE = 31820001;
    this.ISOTHERM = 31830000;
    this.ISOTHERM_GE = 31830001;
    this.ISOTACH = 31840000;
    this.ISOTACH_GE = 31840001;
    this.ISODROSOTHERM = 31850000;
    this.ISODROSOTHERM_GE = 31850001;
    this.ISOPLETHS = 31860000;
    this.ISOPLETHS_GE = 31860001;
    this.OPERATOR_FREEFORM = 31870000;
    this.ICE_DRIFT = 32134000;
    this.LVO = 32151000;
    this.UNDERCAST = 32152000;
    this.LRO = 32153000;
    this.ICE_EDGE = 32154000;
    this.ICE_EDGE_GE = 32154001;
    this.ESTIMATED_ICE_EDGE = 32155000;
    this.ESTIMATED_ICE_EDGE_GE = 32155001;
    this.ICE_EDGE_RADAR = 32156000;
    this.ICE_EDGE_RADAR_GE = 32156001;
    this.CRACKS = 32161000;
    this.CRACKS_GE = 32161001;
    this.CRACKS_SPECIFIC_LOCATION = 32162000;
    this.CRACKS_SPECIFIC_LOCATION_GE = 32162001;
    this.ICE_OPENINGS_LEAD = 32163000;
    this.ICE_OPENINGS_LEAD_GE = 32163001;
    this.ICE_OPENINGS_FROZEN = 32164000;
    this.ICE_OPENINGS_FROZEN_GE = 32164001;
    this.DEPTH_CURVE = 32212000;
    this.DEPTH_CURVE_GE = 32212001;
    this.DEPTH_CONTOUR = 32213000;
    this.DEPTH_CONTOUR_GE = 32213001;
    this.DEPTH_AREA = 32214000;
    this.COASTLINE = 32221000;
    this.COASTLINE_GE = 32221001;
    this.ISLAND = 32222000;
    this.BEACH = 32223000;
    this.WATER = 32224000;
    this.FORESHORE_LINE = 32225100;
    this.FORESHORE_AREA = 32225200;
    this.ANCHORAGE_LINE = 32231400;
    this.ANCHORAGE_AREA = 32231500;
    this.PIER = 32231700;
    this.PIER_GE = 32231701;
    this.WEIRS = 32232400;
    this.DRYDOCK = 32233100;
    this.LOADING_FACILITY_LINE = 32233400;
    this.LOADING_FACILITY_AREA = 32233500;
    this.RAMP_ABOVE_WATER = 32233600;
    this.RAMP_ABOVE_WATER_GE = 32233601;
    this.RAMP_BELOW_WATER = 32233700;
    this.RAMP_BELOW_WATER_GE = 32233701;
    this.JETTY_ABOVE_WATER = 32234100;
    this.JETTY_ABOVE_WATER_GE = 32234101;
    this.JETTY_BELOW_WATER = 32234200;
    this.JETTY_BELOW_WATER_GE = 32234201;
    this.SEAWALL = 32234300;
    this.SEAWALL_GE = 32234301;
    this.PERCHES = 32244200;
    this.LEADING_LINE = 32246000;
    this.UNDERWATER_HAZARD = 32253000;
    this.FOUL_GROUND = 32254200;
    this.KELP = 32255200;
    this.BREAKERS = 32259000;
    this.REEF = 322510000;
    this.DISCOLORED_WATER = 322512000;
    this.EBB_TIDE = 32272000;
    this.EBB_TIDE_GE = 32272001;
    this.FLOOD_TIDE = 32273000;
    this.FLOOD_TIDE_GE = 32273001;
    this.RESTRICTED_AREA = 32530000;
    this.PIPE = 32680000;
    this.TRAINING_AREA = 32550000;
    this.VDR_LEVEL_12 = 32311000;
    this.VDR_LEVEL_23 = 32312000;
    this.VDR_LEVEL_34 = 32313000;
    this.VDR_LEVEL_45 = 32314000;
    this.VDR_LEVEL_56 = 32315000;
    this.VDR_LEVEL_67 = 32316000;
    this.VDR_LEVEL_78 = 32317000;
    this.VDR_LEVEL_89 = 32318000;
    this.VDR_LEVEL_910 = 32319000;
    this.BEACH_SLOPE_FLAT = 32321000;
    this.BEACH_SLOPE_GENTLE = 32322000;
    this.BEACH_SLOPE_MODERATE = 32323000;
    this.BEACH_SLOPE_STEEP = 32324000;
    this.SOLID_ROCK = 32411100;
    this.CLAY = 32411200;
    this.VERY_COARSE_SAND = 32411300;
    this.COARSE_SAND = 32411400;
    this.MEDIUM_SAND = 32411500;
    this.FINE_SAND = 32411600;
    this.VERY_FINE_SAND = 32411700;
    this.VERY_FINE_SILT = 32411800;
    this.FINE_SILT = 32411900;
    this.MEDIUM_SILT = 324111000;
    this.COARSE_SILT = 324111100;
    this.BOULDERS = 324111200;
    this.OYSTER_SHELLS = 324111300;
    this.PEBBLES = 324111400;
    this.SAND_AND_SHELLS = 324111500;
    this.BOTTOM_SEDIMENTS_LAND = 324111600;
    this.BOTTOM_SEDIMENTS_NO_DATA = 324111700;
    this.BOTTOM_ROUGHNESS_SMOOTH = 32412100;
    this.BOTTOM_ROUGHNESS_MODERATE = 32412200;
    this.BOTTOM_ROUGHNESS_ROUGH = 32412300;
    this.CLUTTER_LOW = 32413100;
    this.CLUTTER_MEDIUM = 32413200;
    this.CLUTTER_HIGH = 32413300;
    this.IMPACT_BURIAL_0 = 32414100;
    this.IMPACT_BURIAL_10 = 32414200;
    this.IMPACT_BURIAL_20 = 32414300;
    this.IMPACT_BURIAL_75 = 32414400;
    this.IMPACT_BURIAL_100 = 32414500;
    this.BOTTOM_CATEGORY_A = 32415100;
    this.BOTTOM_CATEGORY_B = 32415200;
    this.BOTTOM_CATEGORY_C = 32415300;
    this.BOTTOM_TYPE_A1 = 32416100;
    this.BOTTOM_TYPE_A2 = 32416200;
    this.BOTTOM_TYPE_A3 = 32416300;
    this.BOTTOM_TYPE_B1 = 32416400;
    this.BOTTOM_TYPE_B2 = 32416500;
    this.BOTTOM_TYPE_B3 = 32416600;
    this.BOTTOM_TYPE_C1 = 32416700;
    this.BOTTOM_TYPE_C2 = 32416800;
    this.BOTTOM_TYPE_C3 = 32416900;
    this.SWEPT_AREA = 32540000;
    this.OIL_RIG_FIELD = 32670000;
    this.SUBMERGED_CRIB = 32620000;
    this.CABLE = 32610000;
    this.CABLE_GE = 32610001;
    this.MARITIME_LIMIT = 32510000;
    this.MARITIME_AREA = 32520000;
    this.CANAL = 32630000;
    this.OPERATOR_DEFINED = 32560000;
};