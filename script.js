$(document).ready(function() {

$("input[type='checkbox']").checkboxradio();

const data = [
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 12600,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 9000,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 24200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 7168,
        "price": 38000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 300,
        "price": 7400,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 21500,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 15360,
        "price": 83500,
        "duration": 120,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 10240,
        "price": 48500,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 10240,
        "price": 12060,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 30720,
        "price": 12060,
        "duration": 30,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 3350,
        "duration": 7,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 6030,
        "duration": 7,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 7168,
        "price": 10050,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "irancell",
        "volume": 2048,
        "price": 2010,
        "duration": 7,
        "timeframe": "2AM-7AM"
    },
    {
        "operator": "irancell",
        "volume": 500,
        "price": 670,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1024,
        "price": 14100,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2048,
        "price": 18800,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 3072,
        "price": 25500,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 4096,
        "price": 28600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 31700,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 6144,
        "price": 37000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 9400,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 12100,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 15500,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 19500,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 3584,
        "price": 22200,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 5120,
        "price": 24800,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 200,
        "price": 5900,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 500,
        "price": 9400,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 11200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 14700,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 17500,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 60,
        "price": 2150,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 100,
        "price": 2950,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 200,
        "price": 4300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 300,
        "price": 5230,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 6030,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 750,
        "price": 7640,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 9900,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 150,
        "price": 4700,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 250,
        "price": 5900,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 400,
        "price": 7110,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 1536,
        "price": 12100,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "irancell",
        "volume": 2560,
        "price": 14800,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 60,
        "price": 2150,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 150,
        "price": 3640,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 250,
        "price": 4850,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 500,
        "price": 6590,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 750,
        "price": 7940,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1024,
        "price": 8600,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2048,
        "price": 11300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 200,
        "price": 5900,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 300,
        "price": 7400,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 500,
        "price": 9400,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 750,
        "price": 11200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1536,
        "price": 14700,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2548,
        "price": 17500,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 4096,
        "price": 21500,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 1024,
        "price": 14100,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 2048,
        "price": 18800,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 3072,
        "price": 25500,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 4096,
        "price": 28600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 5120,
        "price": 31700,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 6144,
        "price": 37000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 12288,
        "price": 13400,
        "duration": 30,
        "timeframe": "6AM-12PM"
    },
    {
        "operator": "mci",
        "volume": 460800,
        "price": 26600,
        "duration": 30,
        "timeframe": "1AM-11AM"
    },
    {
        "operator": "mci",
        "volume": 3072,
        "price": 13300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 6144,
        "price": 26300,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 12288,
        "price": 61900,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "mci",
        "volume": 15360,
        "price": 83500,
        "duration": 120,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 100,
        "price": 2600,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 300,
        "price": 4900,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 500,
        "price": 6200,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 8300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 12700,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 150,
        "price": 4400,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 10900,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 15900,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 500,
        "price": 9200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 12700,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 18600,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 6144,
        "price": 25300,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 14700,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 21300,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 23900,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": "40960,5120",
        "price": 120600,
        "duration": 15,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": 1024,
        "price": 13200,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 2048,
        "price": 18000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 3072,
        "price": 23900,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 4096,
        "price": 26600,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 5120,
        "price": 29300,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": "7168,7168",
        "price": 34700,
        "duration": 30,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": 10240,
        "price": 40000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 10240,
        "price": 40000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": "15360,15360",
        "price": 66800,
        "duration": 30,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "22528,22528",
        "price": 76200,
        "duration": 30,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "15360,10240",
        "price": 72200,
        "duration": 60,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "20480,12288",
        "price": 91100,
        "duration": 60,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "18432,12288",
        "price": 89600,
        "duration": 90,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "25600,15360",
        "price": 100500,
        "duration": 90,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "40960,20480",
        "price": 150000,
        "duration": 180,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "56320,22528",
        "price": 186200,
        "duration": 180,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "61440,30720",
        "price": 216900,
        "duration": 365,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": "102400,51200",
        "price": 333600,
        "duration": 365,
        "timeframe": "24H,2AM-7AM"
    },
    {
        "operator": "rightel",
        "volume": 215040,
        "price": 668600,
        "duration": 365,
        "timeframe": "24H"
    },
    {
        "operator": "rightel",
        "volume": 70000,
        "price": 50000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 18500,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 10240,
        "price": 36500,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 40960,
        "price": 136000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 4096,
        "price": 12000,
        "duration": 1,
        "timeframe": "2H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 29500,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 22600,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 11300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 7700,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 7300,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 650,
        "price": 7200,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 400,
        "price": 4200,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 250,
        "price": 3800,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 100,
        "price": 2400,
        "duration": 1,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 14500,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 8000,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 7800,
        "duration": 3,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 86000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 21500,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 3584,
        "price": 18800,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 16000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "2560,5120",
        "price": 26000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1536,
        "price": 13200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "800,3072",
        "price": 14300,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 800,
        "price": 10100,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 550,
        "price": 8400,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 300,
        "price": 6000,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 200,
        "price": 5200,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 100,
        "price": 2600,
        "duration": 7,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 5120,
        "price": 24700,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 17400,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1536,
        "price": 13600,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 750,
        "price": 10700,
        "duration": 15,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 71680,
        "price": 318900,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 51200,
        "price": 227500,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "51200,51200",
        "price": 290000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 91100,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 45500,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "10240,30720",
        "price": 119000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 7168,
        "price": 37000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "4096,20480",
        "price": 70000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 4096,
        "price": 34100,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 4690,
        "price": 25700,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 3690,
        "price": 22700,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2560,
        "price": 21000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2048,
        "price": 21400,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 2840,
        "price": 16900,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 16000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 1024,
        "price": 12700,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 850,
        "price": 11900,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 500,
        "price": 7000,
        "duration": 30,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 93800,
        "duration": 60,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 100500,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "17408,40960",
        "price": 170000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 79000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 12288,
        "price": 64400,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "10240,30720",
        "price": 129000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 10240,
        "price": 48000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 8192,
        "price": 44000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "6144,30720",
        "price": 112000,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 6144,
        "price": 53400,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 6144,
        "price": 42800,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 3072,
        "price": 44200,
        "duration": 90,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 61440,
        "price": 324000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 28672,
        "price": 168800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile_adsl",
        "volume": "28672,61440",
        "price": 270000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 24576,
        "price": 105800,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 20480,
        "price": 120000,
        "duration": 180,
        "timeframe": "24H"
    },
    {
        "operator": "shatelmobile",
        "volume": 15360,
        "price": 91000,
        "duration": 180,
        "timeframe": "24H"
    }
]


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
