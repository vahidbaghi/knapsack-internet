$(document).ready(function() {

$("input[type='checkbox']").checkboxradio();


const data = [
    // --- IRANCELL ---
    {
        "operator": "irancell",
        "volume": 500,
        "price": 800,
        "duration": 1,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 2048,
        "price": 2412,
        "duration": 7,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 4020,
        "duration": 7,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 7230,
        "duration": 7,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 10240,
        "price": 14470,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 7168,
        "price": 12060,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 30720,
        "price": 14470,
        "duration": 30,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 102400,
        "price": 31800,
        "duration": 30,
        "timeframe": "1AM-11AM"
    },
    {
        "operator": "irancell",
        "volume": 15360,
        "price": 99690,
        "duration": 120,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 10240,
        "price": 57880,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 7168,
        "price": 45600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 28940,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 25800,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 300,
        "price": 8840,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 10770,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 15110,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1024,
        "price": 16880,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2048,
        "price": 22510,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 3072,
        "price": 30550,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 34250,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 37940,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 6144,
        "price": 44400,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 11250,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 14470,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 18490,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 23310,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 3584,
        "price": 26530,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 29740,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 200,
        "price": 7070,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 500,
        "price": 11250,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 13340,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 17520,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 20900,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 60,
        "price": 2457,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 100,
        "price": 3530,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 200,
        "price": 5140,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 300,
        "price": 6270,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 7230,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 9160,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 11890,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 150,
        "price": 5620,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 250,
        "price": 7070,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 8520,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 14470,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 17680,
        "duration": 3,
        "timeframe": "24H"
    },

    // --- MCI (HAMRAH AVAL) ---
    {
        "operator": "mci",
        "volume": 60,
        "price": 2450,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 150,
        "price": 4330,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 250,
        "price": 5780,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 500,
        "price": 7870,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 750,
        "price": 9480,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1024,
        "price": 10280,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2048,
        "price": 13500,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 200,
        "price": 7060,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 300,
        "price": 8840,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 500,
        "price": 11250,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 750,
        "price": 13340,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1536,
        "price": 17520,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2548,
        "price": 20900,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 4096,
        "price": 25720,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1024,
        "price": 16880,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2048,
        "price": 22510,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 3072,
        "price": 30550,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 4096,
        "price": 34240,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 5120,
        "price": 37940,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 6144,
        "price": 44400,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 12288,
        "price": 16080,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "mci",
        "volume": 460800,
        "price": 31990,
        "duration": 30,
        "timeframe": "1AM-11AM"
    },
    {
        "operator": "mci",
        "volume": 3072,
        "price": 15900,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 6144,
        "price": 31350,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 8192,
        "price": 45600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 12288,
        "price": 73900,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 15360,
        "price": 99690,
        "duration": 120,
        "timeframe": "24H"
    },

    // --- RIGHTEL ---
    {
        "operator": "rightel",
        "volume": 100,
        "price": 3240,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 15360,
        "price": 65000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 35840,
        "price": 121000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 300,
        "price": 5880,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 56320,
        "price": 158000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 500,
        "price": 7440,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 81920,
        "price": 219000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 102400,
        "price": 231000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 102400,
        "price": 324000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 9960,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 153600,
        "price": 448000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 256000,
        "price": 630000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 15240,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 184320,
        "price": 504000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 368640,
        "price": 793000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 150,
        "price": 5280,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 512000,
        "price": 1310000,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 13080,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 737280,
        "price": 1570000,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 19080,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 500,
        "price": 11040,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 15240,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 22320,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 6144,
        "price": 30360,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 3600,
        "duration": 7,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": 1536,
        "price": 17640,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 25560,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 28680,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 21504,
        "price": 104400,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 15840,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 2048,
        "price": 21600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 28680,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 4096,
        "price": 31920,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 35160,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 7168,
        "price": 43080,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 8192,
        "price": 47880,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 10240,
        "price": 57480,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 14336,
        "price": 78000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 18432,
        "price": 95880,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 24576,
        "price": 119880,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 40960,
        "price": 192000,
        "duration": 30,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": 15360,
        "price": 180000,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "rightel",
        "volume": 15360,
        "price": 88800,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 20480,
        "price": 112800,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 18432,
        "price": 110400,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 30720,
        "price": 168000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 40960,
        "price": 214800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 61440,
        "price": 310800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 102400,
        "price": 474000,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 215040,
        "price": 957600,
        "duration": 365,
        "timeframe": "24H"
    },

    // --- SHATEL MOBILE ---
    {
        "operator": "shatelmobile",
        "volume": 30720,
        "price": 154000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 58000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 9216,
        "price": 44000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 358400,
        "price": 3024000,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 153600,
        "price": 1412000,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 378880,
        "price": 2664000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 189440,
        "price": 1554000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 102400,
        "price": 882000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 76800,
        "price": 670800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 61440,
        "price": 388800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 35840,
        "price": 322800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 28672,
        "price": 202500,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 24576,
        "price": 126900,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 144000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 15360,
        "price": 109200,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 363520,
        "price": 2388000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 102400,
        "price": 718800,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 66560,
        "price": 477600,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 35840,
        "price": 262800,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 120600,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 77280,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 8192,
        "price": 52800,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 6144,
        "price": 51360,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 40960,
        "price": 235200,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 112500,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 71680,
        "price": 382600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 56320,
        "price": 306000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 51200,
        "price": 273000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 109300,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 68280,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 10240,
        "price": 54600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 44400,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 4096,
        "price": 32280,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 3072,
        "price": 28680,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 25200,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2048,
        "price": 20280,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 15240,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 500,
        "price": 8400,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 15360,
        "price": 90000,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 43200,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 29640,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 20880,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1536,
        "price": 16320,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 12800,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 103200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 42000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 4096,
        "price": 25800,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 3584,
        "price": 22560,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 19200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1536,
        "price": 15840,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 800,
        "price": 12120,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 550,
        "price": 10080,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 30000,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 17400,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 12200,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 9360,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 35400,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 26400,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 13560,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 9240,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 8760,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 400,
        "price": 6240,
        "duration": 1,
        "timeframe": "24H"
    }
];


function knapsack(weights, values, capacity) {
const n = weights.length;
const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= capacity; j++) {
    if (weights[i - 1] <= j) {
      dp[i][j] = Math.max(dp[i - 1][j], values[i - 1] + dp[i - 1][j - weights[i - 1]]);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

let selectedItems = [];
let j = capacity;
for (let i = n; i > 0 && j > 0; i--) {
  if (dp[i][j] !== dp[i - 1][j]) {
    selectedItems.push(i - 1);
    j -= weights[i - 1];
  }
}

return {
  maxValue: dp[n][capacity],
  selectedItems: selectedItems.reverse()
};


}

function handleSubmit() {
const capacityInput = document.getElementById('capacity');
const capacity = parseInt(capacityInput.value);
if (!isNaN(capacity)) {
renderPackages(capacity);
} else {
alert("Please enter a valid number for the capacity.");
}
}

function renderPackages(capacity) {
const operatorFilter = Array.from(document.querySelectorAll('input[name="operator"]:checked')).map(checkbox => checkbox.value);
const durationFilter = Array.from(document.querySelectorAll('input[name="duration"]:checked')).map(checkbox => checkbox.value);
const timeframeFilter = Array.from(document.querySelectorAll('input[name="timeframe"]:checked')).map(checkbox => checkbox.value);

const filteredPackages = data.filter(pack =>
  (operatorFilter.length === 0 || operatorFilter.includes(pack.operator)) &&
  (durationFilter.length === 0 || durationFilter.includes(pack.duration.toString())) &&
  (timeframeFilter.length === 0 || timeframeFilter.some(val => pack.timeframe.toString() === val || val.split('|').some(timeVal => pack.timeframe.toString() === timeVal)))
);

const packagesList = document.getElementById('packages');
packagesList.innerHTML = '';

const weights = [];
const values = [];
const details = [];
filteredPackages.forEach(pack => {
  weights.push(pack.price);
  if (typeof pack.volume === 'string') {
    var sum = pack.volume.split(",").map(Number).reduce((acc, val) => acc + val, 0);
    values.push(sum);
  } else {
    values.push(pack.volume);
  }
  details.push(pack);
});

const result = knapsack(weights, values, capacity);
let finalPrice = 0;
result.selectedItems.forEach(item => {
  const li = document.createElement('li');

  let volume;
  if (typeof details[item].volume === 'string') {
    volume = details[item].volume.replace(/,/g, " + ");
	timeframe = details[item].timeframe.replace(/,/g, " و ");
  } 
  else {
    volume = details[item].volume;
	timeframe = details[item].timeframe;
  }
  
  if(volume >= 1024){
    li.textContent = `اپراتور: ${details[item].operator} - ترافیک: ${volume} مگابایت معادل با ${volume/1024} گیگابایت - قیمت: ${details[item].price} تومان - مدت زمان: ${details[item].duration} روز - محدوده ساعت: ${timeframe}`;
  }else{
    li.textContent = `اپراتور: ${details[item].operator} - ترافیک: ${volume} مگابایت - قیمت: ${details[item].price} تومان - مدت زمان: ${details[item].duration} روز - محدوده ساعت: ${timeframe}`;
  }
  packagesList.appendChild(li);
  finalPrice += details[item].price;
});

const liPrice = document.createElement('li');
liPrice.textContent = `مجموع هزینه : ${finalPrice} تومان`;
packagesList.appendChild(liPrice);


const liTraffic = document.createElement('li');
if(result.maxValue >= 1024){
    liTraffic.textContent = `مجموع ترافیک : ${result.maxValue} مگابایت معادل با ${result.maxValue/1024} گیگابایت`;
}else{
    liTraffic.textContent = `مجموع ترافیک : ${result.maxValue} مگابایت`;
}
packagesList.appendChild(liTraffic);


}

const operatorCheckboxes = document.querySelectorAll('input[name="operator"]');
const durationCheckboxes = document.querySelectorAll('input[name="duration"]');
const timeframeCheckboxes = document.querySelectorAll('input[name="timeframe"]');

operatorCheckboxes.forEach(checkbox => {
checkbox.addEventListener('change', handleSubmit);
});

durationCheckboxes.forEach(checkbox => {
checkbox.addEventListener('change', handleSubmit);
});

timeframeCheckboxes.forEach(checkbox => {
checkbox.addEventListener('change', handleSubmit);
});

const calculateBtn = document.getElementById('calculateBtn');
calculateBtn.addEventListener('click', handleSubmit);



});
