INPUT: 79-93, 55-68
SEED TO SOIL
50 98 2 // no overlap, ignore
52 50 48 // any values between 50 and 98 gets adjusted up 2

79-93 >  81-95
55-68 >  57-70

SOIL TO FERT
INPUT: 81-95, 57-70
0 15 37 // 15-52 reduce by 15, no overlap ignore
37 52 2  // 52-54, no overlap, ignore
39 0 15 // no overlap ignore

FERT TO WATER
INPUT: 81-95, 57-70
49 53 8 // 53 - 61, reduce by 4 
0 11 42 // 11-53 // no overlap ignore
42 0 7 // 0-7 // no overlap ignore
57 7 4 // no overlap ignore

57-70 > 53-57, 62-70

WATER TO LIGHT
INPUT: 81-95, 53-57, 62-70
88 18 7 // 18-25 // no overlap ignore
18 25 70 // 25-95, reduce by 7

81-95 > 74-88
53-57 > 46-50
62-70 > 55-63

LIGHT TO TEMP
INPUT: 74-88, 46-50, 55-63

45 77 23 // 77-100, reduce by 32
81 45 19 // 45-64, increase by 36
68 64 13 // 64-77, increase by 4

74-88 > 74 - 76, 45-56 
46-50 > 45, 82-86 
55-63 > 91-99







TODO: 


DONE:
1. if a range splits, write both splits
2. move the "no change logic" to per input