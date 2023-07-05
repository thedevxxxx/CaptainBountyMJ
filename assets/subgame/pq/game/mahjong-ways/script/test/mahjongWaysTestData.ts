import proto from "../../../../script/network/proto/PQproto_msg.js";


export class mahjongWaysTestData {
    static instance: mahjongWaysTestData;
    static get inst(): mahjongWaysTestData {
        if (!this.instance) {
            this.instance = new mahjongWaysTestData();
        }
        return this.instance;
    }

    usingTestData = false;

    freespinCounter = 0;
    baseNfreespinCounter = 0;
    normalCounter = 0;

    testDataOption = '';

    getTestData(): proto.ILotteryInfo {
        if(!this.usingTestData){
            console.log("Not using testData");
            return null;
        }
        switch (this.testDataOption) {
            case 'normalBaseGame':
                this.freespinCounter = 0    
                this.normalCounter++;
                return this.normalCounter%2 ==0? mahjongWaysTestData.testData00:mahjongWaysTestData.testData00;
            case 'freeGameX10':
                this.freespinCounter++;
                let counter = (this.freespinCounter - 1) % (mahjongWaysTestData.testDataFree.length);
                console.log("freespinCounter"+counter);
                return mahjongWaysTestData.testDataFree[counter];
            case 'baseNFreeGameX10':
                this.baseNfreespinCounter++;
                let counter2 = (this.baseNfreespinCounter - 1) % (mahjongWaysTestData.testDataBaseNFree.length);
                console.log("freespinCounter"+counter2);
                return mahjongWaysTestData.testDataBaseNFree[counter2];
        }

    }

    public static testData00 : proto.ILotteryInfo = {
        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16868305352632992896",
        "roundBetId": "16868305352632992896",
        "betSize": 0.01,
        "betLevel": 9,
        "baseBet": 20,
        "betMoney": 1.8,
        "lotteryInfoList": [
            {
                "betId": "16868305352632992896",
                "winMultiplier": 1,
                "allSymbols": [
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 7,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 5,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 8,
                                "isGold": false,
                                "isLucky": true
                            },
                            {
                                "symbolId": 8,
                                "isGold": false,
                                "isLucky": true
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 3,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 10,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 8,
                                "isGold": false,
                                "isLucky": true
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 3,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 9,
                                "isGold": true,
                                "isLucky": false
                            },
                            {
                                "symbolId": 8,
                                "isGold": true,
                                "isLucky": true
                            },
                            {
                                "symbolId": 3,
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
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 3,
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
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    }
                ],
                "isFree": false,
                "getFreeCount": 0,
                "winMoney": 0.72,
                "balance": 103382.94,
                "winInfoList": [
                    {
                        "symbolId": 8,
                        "lineList": [
                            2,
                            1,
                            1
                        ]
                    }
                ]
            },
            {
                "betId": "16868305350147617400",
                "winMultiplier": 2,
                "allSymbols": [
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 7,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 5,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 8,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 7,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 3,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 10,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 6,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 3,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 9,
                                "isGold": true,
                                "isLucky": false
                            },
                            {
                                "symbolId": 1,
                                "isGold": false,
                                "isLucky": false
                            },
                            {
                                "symbolId": 3,
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
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    },
                    {
                        "reelSymbols": [
                            {
                                "symbolId": 3,
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
                                "symbolId": 9,
                                "isGold": false,
                                "isLucky": false
                            }
                        ]
                    }
                ],
                "isFree": false,
                "getFreeCount": 0,
                "winMoney": 0,
                "balance": 103382.94,
                "winInfoList": []
            }
        ],
        "balance": 103382.94,
        "finalFreeCount": 0,
        "betTime": 1686830535501,
        "offsetToPlayer": -1.08,
        "packageId": 1
    }

 
  
    // public static testDataFree00 : proto.ILotteryInfo = {
    //     "gameCode": "mahjong-ways",
    //     "userId": 405579016,
    //     "parentBetId": "16858638412587064683",
    //     "roundBetId": "16863527570477665274",
    //     "betSize": 0.01,
    //     "betMoney":2,
    //     "betLevel": 10,
    //     "baseBet": 20,
    //     "finalFreeCount":10,
    //     "balance": 103079.13,
    //     "offsetToPlayer":0,
    //     "lotteryInfoList": [
    //       {
    //         "betId": "16863527570477665274",
    //         "winMultiplier": 2,
    //         "allSymbols": [
    //           {
    //             "reelSymbols": [
    //               { "symbolId": 3, "isLucky": false, "isGold": false },
    //               { "symbolId": 10, "isLucky": false, "isGold": false },
    //               { "symbolId": 6, "isLucky": false, "isGold": false },
    //               { "symbolId": 2, "isLucky": false, "isGold": false },
    //               { "symbolId": 7, "isLucky": false, "isGold": false }
    //             ]
    //           },
    //           {
    //             "reelSymbols": [
    //               { "symbolId": 7, "isLucky": false, "isGold": false },
    //               { "symbolId": 3, "isLucky": false, "isGold": false },
    //               { "symbolId": 8, "isLucky": false, "isGold": false },
    //               { "symbolId": 8, "isLucky": false, "isGold": true },
    //               { "symbolId": 10, "isLucky": false, "isGold": false }
    //             ]
    //           },
    //           {
    //             "reelSymbols": [
    //               { "symbolId": 8, "isLucky": false, "isGold": false },
    //               { "symbolId": 2, "isLucky": false, "isGold": false },
    //               { "symbolId": 4, "isLucky": false, "isGold": false },
    //               { "symbolId": 11, "isLucky": false, "isGold": false },
    //               { "symbolId": 8, "isLucky": false, "isGold": false }
    //             ]
    //           },
    //           {
    //             "reelSymbols": [
    //               { "symbolId": 4, "isLucky": false, "isGold": false },
    //               { "symbolId": 7, "isLucky": false, "isGold": false },
    //               { "symbolId": 5, "isLucky": false, "isGold": false },
    //               { "symbolId": 8, "isLucky": false, "isGold": false },
    //               { "symbolId": 6, "isLucky": false, "isGold": false }
    //             ]
    //           },
    //           {
    //             "reelSymbols": [
    //               { "symbolId": 2, "isLucky": false, "isGold": false },
    //               { "symbolId": 9, "isLucky": false, "isGold": false },
    //               { "symbolId": 6, "isLucky": false, "isGold": false },
    //               { "symbolId": 7, "isLucky": false, "isGold": false },
    //               { "symbolId": 3, "isLucky": false, "isGold": false }
    //             ]
    //           }
    //         ],
    //         "isFree": true,
    //         "getFreeCount": 12,
    //         "balance": 103079.13,
    //         "winMoney": 0
    //       }
    //     ],
    //     "betTime": 1686352757575,
    //     "packageId": 1
    // }

// freespin
    public static testDataFree00 : proto.ILotteryInfo = {

      "gameCode": "mahjong-ways",
      "userId": 405579016,
      "parentBetId": "16858638412587064683",
      "roundBetId": "16870945280944174777",
      "betSize": 0.01,
      "betLevel": 10,
      "baseBet": 20,
      "betMoney":2,
      "lotteryInfoList": [{
        "betId": "16870945280944174777",
        "winMultiplier": 2,
        "allSymbols": [
          {
            "reelSymbols": [
              {"symbolId": 9, "isGold": false, "isLucky": false},
              {"symbolId": 5, "isGold": false, "isLucky": false},
              {"symbolId": 4, "isGold": false, "isLucky": false},
              {"symbolId": 9, "isGold": false, "isLucky": false}
            ]
          },
          {
            "reelSymbols": [
              {"symbolId": 7, "isGold": false, "isLucky": false},
              {"symbolId": 5, "isGold": false, "isLucky": false},
              {"symbolId": 6, "isGold": true, "isLucky": false},
              {"symbolId": 5, "isGold": true, "isLucky": false}
            ]
          },
          {
            "reelSymbols": [
              {"symbolId": 2, "isGold": false, "isLucky": false},
              {"symbolId": 6, "isGold": true, "isLucky": false},
              {"symbolId": 6, "isGold": true, "isLucky": false},
              {"symbolId": 2, "isGold": false, "isLucky": false}
            ]
          },
          {
            "reelSymbols": [
              {"symbolId": 3, "isGold": true, "isLucky": false},
              {"symbolId": 8, "isGold": false, "isLucky": false},
              {"symbolId": 10, "isGold": false, "isLucky": false},
              {"symbolId": 3, "isGold": false, "isLucky": false}
            ]
          },
          {
            "reelSymbols": [
              {"symbolId": 9, "isGold": false, "isLucky": false},
              {"symbolId": 5, "isGold": false, "isLucky": false},
              {"symbolId": 8, "isGold": false, "isLucky": false},
              {"symbolId": 2, "isGold": false, "isLucky": false}
            ]
          }
        ],
        "isFree": false,
        "getFreeCount": 12,
        "balance": 103430.04
      }],
      "balance": 103430.04,
      "finalFreeCount": 12,
      "betTime": 1687094320,
      "packageId": 1
    }

  
  //1
  public static testDataFree01 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943323441920240",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943323441920240",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": true},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": true},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": true},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": true, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "winMoney": 3,
            "balance": 103430.04,
            "winInfoList": [
              {"symbolId": 3, "lineList": [1, 1, 1]}
            ]
          },
          {
            "betId": "16870943324292487911",
            "winMultiplier": 4,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": true, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree": true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 11,
        "betTime": 1687094332766,
        "offsetToPlayer": 3,
        "packageId": 1
      }
    
  
    
  //2
  public static testDataFree02 : proto.ILotteryInfo = {

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943432643879706",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943432643879706",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": true, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree": true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 10,
        "offsetToPlayer": 0,
        "betTime": 1687094343398,
        "packageId": 1
      }
    

  
  //3
  public static testDataFree03 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943533718727676",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943533718727676",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 9,
        "offsetToPlayer":0,
        "betTime": 1687094353763,
        "packageId": 1
      }
    
  
  //4
  public static testDataFree04 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943581033600743",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943581033600743",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 8,
        "offsetToPlayer":0,
        "betTime": 1687094358901,
        "packageId": 1
      }
    
  
  //5
  public static testDataFree05 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943744024219488",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943744024219488",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 7,
        "offsetToPlayer":0,
        "betTime": 1687094374046,
        "packageId": 1
      }

  
  //6
  public static testDataFree06 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943793861568803",
        "betSize": 0.01,
        "betMoney":0,
        "betLevel": 10,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943793861568803",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 6,
        "offsetToPlayer":0,
        "betTime": 1687094379227,
        "packageId": 1
      }

  
  
  //7
  public static testDataFree07 : proto.ILotteryInfo ={
        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943840205392354",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943840205392354",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": true, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 4,
        "offsetToPlayer": 0,
        "betTime": 1687094384409,
        "packageId": 1
      }
    
  
  //8
  public static testDataFree08 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943890224348157",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943890224348157",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 4,
        "offsetToPlayer": 0,
        "betTime": 1687094389614,
        "packageId": 1
      }
  
  
  //9   
  public static testDataFree09 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870943950738246399",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870943950738246399",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 3,
        "offsetToPlayer": 0,
        "betTime": 1687094394763,
        "packageId": 1
      }

  //10   
  public static testDataFree10 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870944001395405004",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870944001395405004",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 2,
        "offsetToPlayer": 0,
        "betTime": 1687094400196,
        "packageId": 1
      }
    
  
  //11  
  public static testDataFree11 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870944051959315155",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870944051959315155",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 2, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":true,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 1,
        "offsetToPlayer": 0,
        "betTime": 1687094405410,
        "packageId": 1
      }

  
  //12
  public static testDataFree12 : proto.ILotteryInfo ={

        "gameCode": "mahjong-ways",
        "userId": 405579016,
        "parentBetId": "16858638412587064683",
        "roundBetId": "16870944202203527958",
        "betSize": 0.01,
        "betLevel": 10,
        "betMoney":0,
        "baseBet": 20,
        "lotteryInfoList": [
          {
            "betId": "16870944202203527958",
            "winMultiplier": 2,
            "allSymbols": [
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 10, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 5, "isGold": false, "isLucky": false},
                  {"symbolId": 8, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 7, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 9, "isGold": false, "isLucky": false},
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false}
                ]
              },
              {
                "reelSymbols": [
                  {"symbolId": 6, "isGold": false, "isLucky": false},
                  {"symbolId": 4, "isGold": false, "isLucky": false},
                  {"symbolId": 3, "isGold": false, "isLucky": false},
                  {"symbolId": 10, "isGold": false, "isLucky": false}
                ]
              }
            ],
            "isFree":false,
            "balance": 103430.04
          }
        ],
        "balance": 103430.04,
        "finalFreeCount": 0,
        "offsetToPlayer": 0,
        "betTime": 1687094420521,
        "packageId": 1
      }
    
  
    
      
    public static testDataFree : proto.ILotteryInfo[] = [
        mahjongWaysTestData.testDataFree00,mahjongWaysTestData.testDataFree01,mahjongWaysTestData.testDataFree02,
        mahjongWaysTestData.testDataFree03,mahjongWaysTestData.testDataFree04,mahjongWaysTestData.testDataFree05,
        mahjongWaysTestData.testDataFree06,mahjongWaysTestData.testDataFree07,mahjongWaysTestData.testDataFree08,
        mahjongWaysTestData.testDataFree09,mahjongWaysTestData.testDataFree10,mahjongWaysTestData.testDataFree11,
        mahjongWaysTestData.testDataFree12
    ]
    public static testDataBaseNFree : proto.ILotteryInfo[] = [
        mahjongWaysTestData.testData00,
        mahjongWaysTestData.testDataFree00,mahjongWaysTestData.testDataFree01,mahjongWaysTestData.testDataFree02,
        mahjongWaysTestData.testDataFree03,mahjongWaysTestData.testDataFree04,mahjongWaysTestData.testDataFree05,
        mahjongWaysTestData.testDataFree06,mahjongWaysTestData.testDataFree07,mahjongWaysTestData.testDataFree08,
        mahjongWaysTestData.testDataFree09,mahjongWaysTestData.testDataFree10,mahjongWaysTestData.testDataFree11,
        mahjongWaysTestData.testDataFree12
    ]

}