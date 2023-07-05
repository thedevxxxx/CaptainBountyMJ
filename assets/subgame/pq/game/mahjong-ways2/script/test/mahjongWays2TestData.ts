import proto from "../../../../script/network/proto/PQproto_msg.js";


export class mahjongWays2TestData {
    static instance: mahjongWays2TestData;
    static get inst(): mahjongWays2TestData {
        if (!this.instance) {
            this.instance = new mahjongWays2TestData();
        }
        return this.instance;
    }

    usingTestData = false;

    freespinCounter = 0;

    testDataOption = '';

    getTestData(): proto.ILotteryInfo {
        if(!this.usingTestData){
            console.log("Not using testData");
            return null;
        }
        switch (this.testDataOption) {
            case 'normalBaseGame':
                this.freespinCounter = 0
                return mahjongWays2TestData.testData00;
            case 'freeGameX10':
                this.freespinCounter++;
                return mahjongWays2TestData.testDataFree[this.freespinCounter - 1 % mahjongWays2TestData.testDataFree.length];
        }

    }

    public static testData00 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16862905524240091783",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 102837.45,
        "finalFreeCount":0,
        "offsetToPlayer":6.4,
        "lotteryInfoList": [
        {
            "betId": "16862905524240091783",
            "winMultiplier": 2,
            "allSymbols": [
            {
                "reelSymbols": [
                {
                    "symbolId": 6,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 9,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 6,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 5,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 10,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": true,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            }
            ],
            "winMoney": 6.4,
            "balance": 102837.45,
            "getFreeCount":0,
            "isFree":false,
            "winInfoList": [
            {
                "symbolId": 4,
                "lineList": [2, 2, 1]
            }
            ]
        }
        ]
    }



    public static testData : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16862905524240091783",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 102837.45,
        "finalFreeCount":0,
        "offsetToPlayer":6.4,
        "lotteryInfoList": [
        {
            "betId": "16862905524240091783",
            "winMultiplier": 2,
            "allSymbols": [
            {
                "reelSymbols": [
                {
                    "symbolId": 6,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 9,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 6,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": true
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 5,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 8,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 10,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 3,
                    "isGold": true,
                    "isLucky": false
                }
                ]
            },
            {
                "reelSymbols": [
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 7,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 4,
                    "isGold": false,
                    "isLucky": false
                },
                {
                    "symbolId": 11,
                    "isGold": false,
                    "isLucky": false
                }
                ]
            }
            ],
            "winMoney": 6.4,
            "balance": 102837.45,
            "getFreeCount":0,
            "isFree":false,
            "winInfoList": [
            {
                "symbolId": 4,
                "lineList": [2, 2, 1]
            }
            ]
        }
        ]
    }
  
    public static testDataFree00 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863527570477665274",
        "betSize": 0.01,
        "betMoney":2,
        "betLevel": 10,
        "baseBet": 20,
        "finalFreeCount":10,
        "balance": 103079.13,
        "offsetToPlayer":0,
        "lotteryInfoList": [
          {
            "betId": "16863527570477665274",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  { "symbolId": 3, "isLucky": false, "isGold": false },
                  { "symbolId": 10, "isLucky": false, "isGold": false },
                  { "symbolId": 6, "isLucky": false, "isGold": false },
                  { "symbolId": 2, "isLucky": false, "isGold": false },
                  { "symbolId": 7, "isLucky": false, "isGold": false }
                ]
              },
              {
                "reelSymbols": [
                  { "symbolId": 7, "isLucky": false, "isGold": false },
                  { "symbolId": 3, "isLucky": false, "isGold": false },
                  { "symbolId": 8, "isLucky": false, "isGold": false },
                  { "symbolId": 8, "isLucky": false, "isGold": true },
                  { "symbolId": 10, "isLucky": false, "isGold": false }
                ]
              },
              {
                "reelSymbols": [
                  { "symbolId": 8, "isLucky": false, "isGold": false },
                  { "symbolId": 2, "isLucky": false, "isGold": false },
                  { "symbolId": 4, "isLucky": false, "isGold": false },
                  { "symbolId": 11, "isLucky": false, "isGold": false },
                  { "symbolId": 8, "isLucky": false, "isGold": false }
                ]
              },
              {
                "reelSymbols": [
                  { "symbolId": 4, "isLucky": false, "isGold": false },
                  { "symbolId": 7, "isLucky": false, "isGold": false },
                  { "symbolId": 5, "isLucky": false, "isGold": false },
                  { "symbolId": 8, "isLucky": false, "isGold": false },
                  { "symbolId": 6, "isLucky": false, "isGold": false }
                ]
              },
              {
                "reelSymbols": [
                  { "symbolId": 2, "isLucky": false, "isGold": false },
                  { "symbolId": 9, "isLucky": false, "isGold": false },
                  { "symbolId": 6, "isLucky": false, "isGold": false },
                  { "symbolId": 7, "isLucky": false, "isGold": false },
                  { "symbolId": 3, "isLucky": false, "isGold": false }
                ]
              }
            ],
            "isFree": true,
            "getFreeCount": 12,
            "balance": 103079.13,
            "winMoney": 0
          }
        ],
        "betTime": 1686352757575,
        "packageId": 1
    }

    public static testDataFree01: proto.ILotteryInfo = {
  //1
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863527831564850446",
        "betSize": 0.01,
        "betMoney":2,
        "betLevel": 9,
        "baseBet": 20,
        // "winMoney":0,
        "balance": 103088.73,
        "finalFreeCount": 9,
        "betTime": 1686352783314,
        "offsetToPlayer": 4.8,
        "packageId": 1,
        "lotteryInfoList": [
            {
            "betId": "16863527831564850446",
            "winMultiplier": 2,
            "allSymbols": [
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 5, "isLucky": false, "isGold":false },
                    { "symbolId": 9, "isLucky": false, "isGold":false },
                    { "symbolId": 7, "isLucky": false, "isGold":false },
                    { "symbolId": 4, "isLucky": true, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 4, "isLucky": true, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 9, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 6, "isLucky": false, "isGold": true }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 4, "isLucky": true , "isGold":false},
                    { "symbolId": 6, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold": true },
                    { "symbolId": 8, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 10, "isLucky": false, "isGold":false },
                    { "symbolId": 10, "isLucky": false , "isGold":false},
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 4, "isLucky": true, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 7, "isLucky": false, "isGold":false },
                    { "symbolId": 11, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 2, "isLucky": false , "isGold":false},
                    { "symbolId": 7, "isLucky": false, "isGold":false }
                ]
                }
            ],
            "winMoney": 4,
            "balance": 103087.93,
            "getFreeCount":0,
            "isFree":false,
            "winInfoList": [
                { "symbolId": 4, "lineList": [1, 1, 1, 1] }
            ]
            },
            {
            "betId": "16863527830290994373",
            "winMultiplier": 4,
            "allSymbols": [
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 5, "isLucky": false, "isGold":false },
                    { "symbolId": 9, "isLucky": true, "isGold":false },
                    { "symbolId": 7, "isLucky": false, "isGold":false },
                    { "symbolId": 5, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 9, "isLucky": true, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 6, "isLucky": false, "isGold": true },
                    { "symbolId": 11, "isLucky": false , "isGold":false}
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 6, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold": true },
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 9, "isLucky": true, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 10, "isLucky": false, "isGold":false },
                    { "symbolId": 10, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 4, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 7, "isLucky": false, "isGold":false },
                    { "symbolId": 11, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false , "isGold":false},
                    { "symbolId": 2, "isLucky": false , "isGold":false},
                    { "symbolId": 7, "isLucky": false, "isGold":false }
                ]
                }
            ],
            "winMoney": 0.8,
            "balance": 103088.73,
            "getFreeCount":0,
            "isFree":false,
            "winInfoList": [
                { "symbolId": 9, "lineList": [1, 1, 1] }
            ]
            },
            {
            "betId": "16863527830823114372",
            "winMultiplier": 6,
            "allSymbols": [
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 5, "isLucky": false, "isGold":false },
                    { "symbolId": 7, "isLucky": false , "isGold":false},
                    { "symbolId": 5, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 6, "isLucky": false, "isGold": true },
                    { "symbolId": 11, "isLucky": false, "isGold":false },
                    { "symbolId": 7, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 6, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold": true },
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 10, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 10, "isLucky": false, "isGold":false },
                    { "symbolId": 10, "isLucky": false, "isGold":false },
                    { "symbolId": 3, "isLucky": false, "isGold":false },
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 4, "isLucky": false, "isGold":false }
                ]
                },
                {
                "reelSymbols": [
                    { "symbolId": 7, "isLucky": false, "isGold":false },
                    { "symbolId": 11, "isLucky": false , "isGold":false},
                    { "symbolId": 8, "isLucky": false, "isGold":false },
                    { "symbolId": 2, "isLucky": false , "isGold":false},
                    { "symbolId": 7, "isLucky": false, "isGold":false }
                ]
                }
            ],
            "winMoney": 0,
            "balance": 103088.73,
            "getFreeCount":0,
            "isFree":false
            }
        ], 
    }
  //2
    public static testDataFree02 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863527984000435850",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103088.73,
        "finalFreeCount": 8,
        "offsetToPlayer":0,
        "lotteryInfoList": [
        {
          "betId": "16863527984000435850",
          "winMultiplier": 2,
          "allSymbols": [
            {
              "reelSymbols": [
                { "symbolId": 9, "isLucky": false, "isGold":false },
                { "symbolId": 10, "isLucky": false, "isGold":false },
                { "symbolId": 7, "isLucky": false, "isGold":false },
                { "symbolId": 11, "isLucky": false , "isGold":false},
                { "symbolId": 4, "isLucky": false, "isGold":false }
              ]
            },
            {
              "reelSymbols": [
                { "symbolId": 11, "isLucky": false, "isGold":false },
                { "symbolId": 11, "isLucky": false, "isGold":false },
                { "symbolId": 5, "isLucky": false, "isGold":false },
                { "symbolId": 8, "isLucky": false, "isGold":false },
                { "symbolId": 5, "isLucky": false, "isGold":false }
              ]
            },
            {
              "reelSymbols": [
                { "symbolId": 8, "isLucky": false, "isGold":false },
                { "symbolId": 10, "isLucky": false, "isGold":false },
                { "symbolId": 8, "isLucky": false , "isGold":false},
                { "symbolId": 7, "isLucky": false, "isGold":false },
                { "symbolId": 8, "isLucky": false, "isGold":false }
              ]
            },
            {
              "reelSymbols": [
                { "symbolId": 2, "isLucky": false, "isGold":false },
                { "symbolId": 6, "isLucky": false, "isGold":false },
                { "symbolId": 5, "isLucky": false, "isGold":false },
                { "symbolId": 3, "isLucky": false, "isGold":false },
                { "symbolId": 3, "isLucky": false, "isGold":false }
              ]
            },
            {
              "reelSymbols": [
                { "symbolId": 4, "isLucky": false, "isGold":false },
                { "symbolId": 4, "isLucky": false, "isGold":false },
                { "symbolId": 6, "isLucky": false , "isGold":false},
                { "symbolId": 8, "isLucky": false, "isGold":false },
                { "symbolId": 6, "isLucky": false , "isGold":false}
              ]
            }
          ],
          "winMoney": 0,
                "balance": 103088.73,
                "getFreeCount":0,
                "isFree":false,
              }
            ],
            "betTime": 1686352798172,
            "packageId": 1
    }

    public static testDataFree03  : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528032520296865",
        "betSize": 0.01,
        "betMoney":2,
        "betLevel": 7,
        "baseBet": 20,
        "offsetToPlayer": 1.2000000000000002,
        "finalFreeCount": 7,
        "lotteryInfoList": [
        {
          "betId": "16863528032520296865",
          "winMultiplier": 2,
          "allSymbols": [
          {
            "reelSymbols": [
              { "symbolId": 4, "isLucky": false, "isGold":false },
              { "symbolId": 11, "isLucky": false, "isGold":false },
              { "symbolId": 9, "isLucky": true, "isGold":false },
              { "symbolId": 9, "isLucky": true, "isGold":false },
              { "symbolId": 9, "isLucky": true, "isGold":false }
            ]
          },
          {
            "reelSymbols": [
              { "symbolId": 6, "isLucky": false, "isGold":false },
              { "symbolId": 9, "isLucky": true, "isGold":false },
              { "symbolId": 11, "isLucky": false, "isGold":false },
              { "symbolId": 6, "isLucky": false, "isGold":false },
              { "symbolId": 11, "isLucky": false, "isGold": true }
            ]
          },
          {
          "reelSymbols": [
          { "symbolId": 7, "isLucky": false, "isGold":false },
          { "symbolId": 4, "isLucky": false, "isGold":false },
          { "symbolId": 9, "isLucky": true, "isGold":false },
          { "symbolId": 7, "isLucky": false, "isGold":false },
          { "symbolId": 10, "isLucky": false, "isGold":false }
          ]
          },
          {
          "reelSymbols": [
          { "symbolId": 11, "isLucky": false , "isGold":false},
          { "symbolId": 5, "isLucky": false, "isGold":false },
          { "symbolId": 7, "isLucky": false, "isGold":false },
          { "symbolId": 6, "isLucky": false, "isGold":false },
          { "symbolId": 8, "isLucky": false, "isGold":false }
          ]
          },
          {
          "reelSymbols": [
          { "symbolId": 8, "isLucky": false, "isGold":false },
          { "symbolId": 3, "isLucky": false, "isGold":false },
          { "symbolId": 3, "isLucky": false, "isGold":false },
          { "symbolId": 5, "isLucky": false, "isGold":false },
          { "symbolId": 7, "isLucky": false, "isGold":false }
          ]
          }
          ],
          "winMoney": 1.2000000000000002,
          "balance": 103089.93,
          "winInfoList": [
          { "symbolId": 9, "lineList": [3, 1, 1] }
          ]
        }
        ],
        "balance": 103089.93,
        "betTime": 1686352803340,
        "packageId": 1
    }
    
  
    public static testDataFree04 : proto.ILotteryInfo = {
         "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528132695994285",
        "betSize": 0.01,
        "betMoney":2,
        "betLevel": 10,
        "baseBet": 20,
        "balance": 103099.13,
        "offsetToPlayer": 9.2,
        "finalFreeCount": 6,
        "lotteryInfoList": [
        {
        "betId": "16863528132695994285",
        "winMultiplier": 2,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": true, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": true, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": true, "isGold": false},
        {"symbolId": 10, "isLucky": true, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": true, "isGold": true}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "winMoney": 1.2000000000000002,
        "balance": 103091.12999999999,
        "getFreeCount":0,
        "isFree":false,
        "winInfoList": [
        {"symbolId": 10, "lineList": [1, 1, 2, 1]}
        ]
        },
        {
        "betId": "16863528134116047541",
        "winMultiplier": 4,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": true, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": true, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": true, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": true, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 1, "isLucky": true, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 9, "isLucky": true, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "winMoney": 8,
        "balance": 103099.12999999999,
        "getFreeCount":0,
        "isFree":false,
        "winInfoList": [
        {"symbolId": 9, "lineList": [1, 1, 1, 2, 1]}
        ]
        },
        {
        "betId": "16863528131697100495",
        "winMultiplier": 6,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "balance": 103099.12999999999,
        "getFreeCount":0,
        "isFree":false,
        }
        ],
        
        "betTime": 1686352813846,
        "packageId": 1
    }
    
    
    public static testDataFree05 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528291619455454",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103099.13,
        "finalFreeCount": 6,
        "lotteryInfoList": [
          {
          "betId": "16863528291619455454",
          "winMultiplier": 2,
          "allSymbols": [
            {
              "reelSymbols": [
              {"symbolId": 9, "isLucky": false, "isGold": false},
              {"symbolId": 3, "isLucky": false, "isGold": false},
              {"symbolId": 6, "isLucky": false, "isGold": false},
              {"symbolId": 5, "isLucky": false, "isGold": false},
              {"symbolId": 5, "isLucky": false, "isGold": false}
              ]
              },
              {
              "reelSymbols": [
              {"symbolId": 9, "isLucky": false, "isGold": true},
              {"symbolId": 7, "isLucky": false, "isGold": false},
              {"symbolId": 5, "isLucky": false, "isGold": false},
              {"symbolId": 10, "isLucky": false, "isGold": false},
              {"symbolId": 3, "isLucky": false, "isGold": false}
              ]
              },
              {
              "reelSymbols": [
              {"symbolId": 11, "isLucky": false, "isGold": false},
              {"symbolId": 7, "isLucky": false, "isGold": false},
              {"symbolId": 4, "isLucky": false, "isGold": false},
              {"symbolId": 11, "isLucky": false, "isGold": true},
              {"symbolId": 11, "isLucky": false, "isGold": false}
              ]
              },
              {
              "reelSymbols": [
              {"symbolId": 4, "isLucky": false, "isGold": false},
              {"symbolId": 8, "isLucky": false, "isGold": true},
              {"symbolId": 5, "isLucky": false, "isGold": false},
              {"symbolId": 7, "isLucky": false, "isGold": false},
              {"symbolId": 9, "isLucky": false, "isGold": false}
              ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isLucky": false, "isGold": false},
                  {"symbolId": 4, "isLucky": false, "isGold": false},
                  {"symbolId": 6, "isLucky": false, "isGold": false},
                  {"symbolId": 6, "isLucky": false, "isGold": false},
                  {"symbolId": 10, "isLucky": false, "isGold": false}
              ]
            }
          ],
          "balance": 103099.13,
          "getFreeCount":0,
          "isFree":false,
        }
        ],
        "betTime": 1686352829022,
        "packageId": 1
    }
    
    
    public static testDataFree06 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528342370202672",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103099.13,
        "finalFreeCount": 5,
        "lotteryInfoList": [
        {
        "betId": "16863528342370202672",
        "winMultiplier": 2,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": true},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": true}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "balance": 103099.13,
        "getFreeCount":0,
        "isFree":false,
        }
        ],
      
        "betTime": 1686352834181,
        "packageId": 1
    }
    
    
    public static testDataFree07 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528391516393004",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103099.13,
        "finalFreeCount": 4,
        "lotteryInfoList": [
        {
        "betId": "16863528391516393004",
        "winMultiplier": 2,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 7, "isLucky": false, "isGold": true},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "balance": 103099.13,
        "getFreeCount":0,
        "isFree":false,
        }
        ],
        "betTime": 1686352839312,
        "packageId": 1
        }
    
  
    public static testDataFree08 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528440434081672",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103099.13,
        "finalFreeCount": 3,
        "lotteryInfoList": [
        {
        "betId": "16863528440434081672",
        "winMultiplier": 2,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 2, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 7, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 11, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "balance": 103099.13,
        "getFreeCount":0,
        "isFree":false,
        }
        ],
        "betTime": 1686352844496,
        "packageId": 1
    }
    
  
    public static testDataFree09 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528493398467881",
        "betSize": 0.01,
        "betMoney":2,
        "betLevel": 10,
        "baseBet": 20,
        "balance": 103099.13,
        "finalFreeCount": 2,
        "lotteryInfoList": [
        {
        "betId": "16863528493398467881",
        "winMultiplier": 2,
        "allSymbols": [
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 2, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": true}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 10, "isLucky": false, "isGold": true},
        {"symbolId": 10, "isLucky": false, "isGold": false},
        {"symbolId": 8, "isLucky": false, "isGold": true},
        {"symbolId": 4, "isLucky": false, "isGold": false},
        {"symbolId": 10, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 3, "isLucky": false, "isGold": true},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false},
        {"symbolId": 11, "isLucky": false, "isGold": false}
        ]
        },
        {
        "reelSymbols": [
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 9, "isLucky": false, "isGold": false},
        {"symbolId": 6, "isLucky": false, "isGold": false},
        {"symbolId": 5, "isLucky": false, "isGold": false},
        {"symbolId": 3, "isLucky": false, "isGold": false}
        ]
        }
        ],
        "balance": 103099.13,
        "getFreeCount":0,
        "isFree":false,
        }
        ],
        "betTime": 1686352849649,
        "packageId": 1
    }
  
    public static testDataFree10 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways2",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16863528541602712075",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":2,
        "baseBet": 20,
        "balance": 103113.93,
        "finalFreeCount": 1,
        "offsetToPlayer":14.8,
        "lotteryInfoList": [
          {
            "betId": "16863528541602712075",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 10, "isLucky": false, "isGold": false},
                {"symbolId": 9, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 3, "isLucky": false, "isGold": false},
                {"symbolId": 6, "isLucky": false, "isGold": false},
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 9, "isLucky": true, "isGold": false},
                {"symbolId": 9, "isLucky": true, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 10, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 9, "isLucky": true, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 9, "isLucky": true, "isGold": false},
                {"symbolId": 7, "isLucky": false, "isGold": true},
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false}
                ]
                }
                ],
                "balance": 103100.73,
                "getFreeCount":0,
                "isFree":false,
                "winInfoList": [
                {"symbolId": 9, "lineList": [1, 2, 1, 1]},
                {"symbolId": 10, "lineList": [2, 1, 1]},
                {"symbolId": 4, "lineList": [1, 1, 2]}
                ]
              },
              {
                "betId": "16863528541848851543",
                "winMultiplier": 4,
                "allSymbols": [
                {
                "reelSymbols": [
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 10, "isLucky": true, "isGold": false},
                {"symbolId": 4, "isLucky": true, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false},
                {"symbolId": 10, "isLucky": true, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 3, "isLucky": false, "isGold": false},
                {"symbolId": 6, "isLucky": false, "isGold": false},
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 1, "isLucky": true, "isGold": false},
                {"symbolId": 9, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 10, "isLucky": true, "isGold": false},
                {"symbolId": 4, "isLucky": true, "isGold": false},
                {"symbolId": 4, "isLucky": true, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 7, "isLucky": false, "isGold": true},
                {"symbolId": 7, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 2, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false}
                ]
                }
                ],
                "balance": 103107.93,
                "getFreeCount":0,
                "isFree":false,
                "winInfoList": [
                {"symbolId": 10, "lineList": [2, 1, 1]},
                {"symbolId": 4, "lineList": [1, 1, 2]}
                ]
              },
              {
                "betId": "16863528540948415269",
                "winMultiplier": 6,
                "allSymbols": [
                {
                "reelSymbols": [
                {"symbolId": 7, "isLucky": true, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false},
                {"symbolId": 9, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 3, "isLucky": false, "isGold": false},
                {"symbolId": 6, "isLucky": false, "isGold": false},
                {"symbolId": 7, "isLucky": true, "isGold": false},
                {"symbolId": 9, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 3, "isLucky": true, "isGold": false},
                {"symbolId": 10, "isLucky": false, "isGold": false},
                {"symbolId": 7, "isLucky": true, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 7, "isLucky": true, "isGold": true},
                {"symbolId": 7, "isLucky": true, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 8, "isLucky": false, "isGold": false},
                {"symbolId": 2, "isLucky": false, "isGold": false}
                ]
                },
                {
                "reelSymbols": [
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 4, "isLucky": false, "isGold": false},
                {"symbolId": 11, "isLucky": false, "isGold": false},
                {"symbolId": 5, "isLucky": false, "isGold": false}
                ]
                }
                ],
                "balance": 103113.93,
                "getFreeCount":0,
                "isFree":false,
                "winInfoList": [
                {"symbolId": 7, "lineList": [1, 1, 1, 2]}
                ]
              }
        ]
      }
    
      
    public static testDataFree : proto.ILotteryInfo[] = [
        mahjongWays2TestData.testDataFree00,mahjongWays2TestData.testDataFree01,mahjongWays2TestData.testDataFree02,
        mahjongWays2TestData.testDataFree03,mahjongWays2TestData.testDataFree04,mahjongWays2TestData.testDataFree05,
        mahjongWays2TestData.testDataFree06,mahjongWays2TestData.testDataFree07,mahjongWays2TestData.testDataFree08,
        mahjongWays2TestData.testDataFree09,mahjongWays2TestData.testDataFree10
    ]

}