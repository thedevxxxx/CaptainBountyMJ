import * as $protobuf from "protobufjs";
import {Long} from "protobufjs";
/** Namespace pqMsg. */
declare global{
    export namespace pqMsg {
    
        /** SubCommand enum. */
        enum SubCommand {
            EnumSubLoginReq = 0,
            EnumSubLoginResp = 1,
            EnumSubLogoutReq = 2,
            EnumSubLogoutResp = 3,
            EnumSubEnterGameReq = 4,
            EnumSubEnterGameResp = 5,
            EnumSubSpinReq = 6,
            EnumSubSpinResp = 7,
            EnumSubAuthErrorResp = 8,
            EnumSubUserRefreshTokenReq = 9,
            EnumSubUserRefreshTokenResp = 10,
            EnumSubGetUserGameDataReq = 11,
            EnumSubGetUserGameDataResp = 12
        }
    
        /** Properties of a UserLoginReq. */
        interface IUserLoginReq {
    
            /** UserLoginReq userId */
            userId?: (number|null);
    
            /** UserLoginReq gameId */
            gameId?: (string|null);
    
            /** UserLoginReq password */
            password?: (string|null);
    
            /** UserLoginReq token */
            token?: (string|null);
        }
    
        /** Represents a UserLoginReq. */
        class UserLoginReq implements IUserLoginReq {
    
            /**
             * Constructs a new UserLoginReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserLoginReq);
    
            /** UserLoginReq userId. */
            public userId: number;
    
            /** UserLoginReq gameId. */
            public gameId: string;
    
            /** UserLoginReq password. */
            public password: string;
    
            /** UserLoginReq token. */
            public token: string;
    
            /**
             * Creates a new UserLoginReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserLoginReq instance
             */
            public static create(properties?: pqMsg.IUserLoginReq): pqMsg.UserLoginReq;
    
            /**
             * Encodes the specified UserLoginReq message. Does not implicitly {@link pqMsg.UserLoginReq.verify|verify} messages.
             * @param message UserLoginReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserLoginReq message, length delimited. Does not implicitly {@link pqMsg.UserLoginReq.verify|verify} messages.
             * @param message UserLoginReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserLoginReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserLoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserLoginReq;
    
            /**
             * Decodes a UserLoginReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserLoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserLoginReq;
    
            /**
             * Verifies a UserLoginReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserLoginReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserLoginReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserLoginReq;
    
            /**
             * Creates a plain object from a UserLoginReq message. Also converts values to other types if specified.
             * @param message UserLoginReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserLoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserLoginReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserLoginResp. */
        interface IUserLoginResp {
    
            /** UserLoginResp result */
            result?: (pqMsg.ICommandResult|null);
    
            /** UserLoginResp userInfo */
            userInfo?: (pqMsg.IUserInfo|null);
    
            /** UserLoginResp allGameFreeCount */
            allGameFreeCount?: (pqMsg.UserLoginResp.IGameFreeCount[]|null);
    
            /** UserLoginResp version */
            version?: (string|null);
        }
    
        /** Represents a UserLoginResp. */
        class UserLoginResp implements IUserLoginResp {
    
            /**
             * Constructs a new UserLoginResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserLoginResp);
    
            /** UserLoginResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /** UserLoginResp userInfo. */
            public userInfo?: (pqMsg.IUserInfo|null);
    
            /** UserLoginResp allGameFreeCount. */
            public allGameFreeCount: pqMsg.UserLoginResp.IGameFreeCount[];
    
            /** UserLoginResp version. */
            public version: string;
    
            /**
             * Creates a new UserLoginResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserLoginResp instance
             */
            public static create(properties?: pqMsg.IUserLoginResp): pqMsg.UserLoginResp;
    
            /**
             * Encodes the specified UserLoginResp message. Does not implicitly {@link pqMsg.UserLoginResp.verify|verify} messages.
             * @param message UserLoginResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserLoginResp message, length delimited. Does not implicitly {@link pqMsg.UserLoginResp.verify|verify} messages.
             * @param message UserLoginResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserLoginResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserLoginResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserLoginResp;
    
            /**
             * Decodes a UserLoginResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserLoginResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserLoginResp;
    
            /**
             * Verifies a UserLoginResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserLoginResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserLoginResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserLoginResp;
    
            /**
             * Creates a plain object from a UserLoginResp message. Also converts values to other types if specified.
             * @param message UserLoginResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserLoginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserLoginResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        namespace UserLoginResp {
    
            /** Properties of a GameFreeCount. */
            interface IGameFreeCount {
    
                /** GameFreeCount gameCode */
                gameCode?: (string|null);
    
                /** GameFreeCount freeCount */
                freeCount?: (number|null);
            }
    
            /** Represents a GameFreeCount. */
            class GameFreeCount implements IGameFreeCount {
    
                /**
                 * Constructs a new GameFreeCount.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: pqMsg.UserLoginResp.IGameFreeCount);
    
                /** GameFreeCount gameCode. */
                public gameCode: string;
    
                /** GameFreeCount freeCount. */
                public freeCount: number;
    
                /**
                 * Creates a new GameFreeCount instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameFreeCount instance
                 */
                public static create(properties?: pqMsg.UserLoginResp.IGameFreeCount): pqMsg.UserLoginResp.GameFreeCount;
    
                /**
                 * Encodes the specified GameFreeCount message. Does not implicitly {@link pqMsg.UserLoginResp.GameFreeCount.verify|verify} messages.
                 * @param message GameFreeCount message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: pqMsg.UserLoginResp.IGameFreeCount, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Encodes the specified GameFreeCount message, length delimited. Does not implicitly {@link pqMsg.UserLoginResp.GameFreeCount.verify|verify} messages.
                 * @param message GameFreeCount message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: pqMsg.UserLoginResp.IGameFreeCount, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Decodes a GameFreeCount message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameFreeCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserLoginResp.GameFreeCount;
    
                /**
                 * Decodes a GameFreeCount message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameFreeCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserLoginResp.GameFreeCount;
    
                /**
                 * Verifies a GameFreeCount message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
    
                /**
                 * Creates a GameFreeCount message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameFreeCount
                 */
                public static fromObject(object: { [k: string]: any }): pqMsg.UserLoginResp.GameFreeCount;
    
                /**
                 * Creates a plain object from a GameFreeCount message. Also converts values to other types if specified.
                 * @param message GameFreeCount
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: pqMsg.UserLoginResp.GameFreeCount, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                /**
                 * Converts this GameFreeCount to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    
        /** Properties of a UserLogoutReq. */
        interface IUserLogoutReq {
    
            /** UserLogoutReq userId */
            userId?: (number|null);
        }
    
        /** Represents a UserLogoutReq. */
        class UserLogoutReq implements IUserLogoutReq {
    
            /**
             * Constructs a new UserLogoutReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserLogoutReq);
    
            /** UserLogoutReq userId. */
            public userId: number;
    
            /**
             * Creates a new UserLogoutReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserLogoutReq instance
             */
            public static create(properties?: pqMsg.IUserLogoutReq): pqMsg.UserLogoutReq;
    
            /**
             * Encodes the specified UserLogoutReq message. Does not implicitly {@link pqMsg.UserLogoutReq.verify|verify} messages.
             * @param message UserLogoutReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserLogoutReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserLogoutReq message, length delimited. Does not implicitly {@link pqMsg.UserLogoutReq.verify|verify} messages.
             * @param message UserLogoutReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserLogoutReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserLogoutReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserLogoutReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserLogoutReq;
    
            /**
             * Decodes a UserLogoutReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserLogoutReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserLogoutReq;
    
            /**
             * Verifies a UserLogoutReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserLogoutReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserLogoutReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserLogoutReq;
    
            /**
             * Creates a plain object from a UserLogoutReq message. Also converts values to other types if specified.
             * @param message UserLogoutReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserLogoutReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserLogoutReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserLogoutResp. */
        interface IUserLogoutResp {
    
            /** UserLogoutResp result */
            result?: (pqMsg.ICommandResult|null);
        }
    
        /** Represents a UserLogoutResp. */
        class UserLogoutResp implements IUserLogoutResp {
    
            /**
             * Constructs a new UserLogoutResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserLogoutResp);
    
            /** UserLogoutResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /**
             * Creates a new UserLogoutResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserLogoutResp instance
             */
            public static create(properties?: pqMsg.IUserLogoutResp): pqMsg.UserLogoutResp;
    
            /**
             * Encodes the specified UserLogoutResp message. Does not implicitly {@link pqMsg.UserLogoutResp.verify|verify} messages.
             * @param message UserLogoutResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserLogoutResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserLogoutResp message, length delimited. Does not implicitly {@link pqMsg.UserLogoutResp.verify|verify} messages.
             * @param message UserLogoutResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserLogoutResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserLogoutResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserLogoutResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserLogoutResp;
    
            /**
             * Decodes a UserLogoutResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserLogoutResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserLogoutResp;
    
            /**
             * Verifies a UserLogoutResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserLogoutResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserLogoutResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserLogoutResp;
    
            /**
             * Creates a plain object from a UserLogoutResp message. Also converts values to other types if specified.
             * @param message UserLogoutResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserLogoutResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserLogoutResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserEnterGameReq. */
        interface IUserEnterGameReq {
    
            /** UserEnterGameReq userId */
            userId?: (number|null);
    
            /** UserEnterGameReq gameCode */
            gameCode?: (string|null);
        }
    
        /** Represents a UserEnterGameReq. */
        class UserEnterGameReq implements IUserEnterGameReq {
    
            /**
             * Constructs a new UserEnterGameReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserEnterGameReq);
    
            /** UserEnterGameReq userId. */
            public userId: number;
    
            /** UserEnterGameReq gameCode. */
            public gameCode: string;
    
            /**
             * Creates a new UserEnterGameReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserEnterGameReq instance
             */
            public static create(properties?: pqMsg.IUserEnterGameReq): pqMsg.UserEnterGameReq;
    
            /**
             * Encodes the specified UserEnterGameReq message. Does not implicitly {@link pqMsg.UserEnterGameReq.verify|verify} messages.
             * @param message UserEnterGameReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserEnterGameReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserEnterGameReq message, length delimited. Does not implicitly {@link pqMsg.UserEnterGameReq.verify|verify} messages.
             * @param message UserEnterGameReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserEnterGameReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserEnterGameReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserEnterGameReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserEnterGameReq;
    
            /**
             * Decodes a UserEnterGameReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserEnterGameReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserEnterGameReq;
    
            /**
             * Verifies a UserEnterGameReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserEnterGameReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserEnterGameReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserEnterGameReq;
    
            /**
             * Creates a plain object from a UserEnterGameReq message. Also converts values to other types if specified.
             * @param message UserEnterGameReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserEnterGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserEnterGameReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserEnterGameResp. */
        interface IUserEnterGameResp {
    
            /** UserEnterGameResp lastLotteryInfo */
            lastLotteryInfo?: (pqMsg.ILotteryInfo[]|null);
    
            /** UserEnterGameResp result */
            result?: (pqMsg.ICommandResult|null);
        }
    
        /** Represents a UserEnterGameResp. */
        class UserEnterGameResp implements IUserEnterGameResp {
    
            /**
             * Constructs a new UserEnterGameResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserEnterGameResp);
    
            /** UserEnterGameResp lastLotteryInfo. */
            public lastLotteryInfo: pqMsg.ILotteryInfo[];
    
            /** UserEnterGameResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /**
             * Creates a new UserEnterGameResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserEnterGameResp instance
             */
            public static create(properties?: pqMsg.IUserEnterGameResp): pqMsg.UserEnterGameResp;
    
            /**
             * Encodes the specified UserEnterGameResp message. Does not implicitly {@link pqMsg.UserEnterGameResp.verify|verify} messages.
             * @param message UserEnterGameResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserEnterGameResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserEnterGameResp message, length delimited. Does not implicitly {@link pqMsg.UserEnterGameResp.verify|verify} messages.
             * @param message UserEnterGameResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserEnterGameResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserEnterGameResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserEnterGameResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserEnterGameResp;
    
            /**
             * Decodes a UserEnterGameResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserEnterGameResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserEnterGameResp;
    
            /**
             * Verifies a UserEnterGameResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserEnterGameResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserEnterGameResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserEnterGameResp;
    
            /**
             * Creates a plain object from a UserEnterGameResp message. Also converts values to other types if specified.
             * @param message UserEnterGameResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserEnterGameResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserEnterGameResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserSpinReq. */
        interface IUserSpinReq {
    
            /** UserSpinReq userId */
            userId?: (number|null);
    
            /** UserSpinReq gameCode */
            gameCode?: (string|null);
    
            /** UserSpinReq betSize */
            betSize?: (number|null);
    
            /** UserSpinReq betLevel */
            betLevel?: (number|null);
    
            /** UserSpinReq baseBet */
            baseBet?: (number|null);
        }
    
        /** Represents a UserSpinReq. */
        class UserSpinReq implements IUserSpinReq {
    
            /**
             * Constructs a new UserSpinReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserSpinReq);
    
            /** UserSpinReq userId. */
            public userId: number;
    
            /** UserSpinReq gameCode. */
            public gameCode: string;
    
            /** UserSpinReq betSize. */
            public betSize: number;
    
            /** UserSpinReq betLevel. */
            public betLevel: number;
    
            /** UserSpinReq baseBet. */
            public baseBet: number;
    
            /**
             * Creates a new UserSpinReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserSpinReq instance
             */
            public static create(properties?: pqMsg.IUserSpinReq): pqMsg.UserSpinReq;
    
            /**
             * Encodes the specified UserSpinReq message. Does not implicitly {@link pqMsg.UserSpinReq.verify|verify} messages.
             * @param message UserSpinReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserSpinReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserSpinReq message, length delimited. Does not implicitly {@link pqMsg.UserSpinReq.verify|verify} messages.
             * @param message UserSpinReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserSpinReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserSpinReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserSpinReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserSpinReq;
    
            /**
             * Decodes a UserSpinReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserSpinReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserSpinReq;
    
            /**
             * Verifies a UserSpinReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserSpinReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserSpinReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserSpinReq;
    
            /**
             * Creates a plain object from a UserSpinReq message. Also converts values to other types if specified.
             * @param message UserSpinReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserSpinReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserSpinReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserSpinResp. */
        interface IUserSpinResp {
    
            /** UserSpinResp result */
            result?: (pqMsg.ICommandResult|null);
    
            /** UserSpinResp lotteryInfo */
            lotteryInfo?: (pqMsg.ILotteryInfo|null);
        }
    
        /** Represents a UserSpinResp. */
        class UserSpinResp implements IUserSpinResp {
    
            /**
             * Constructs a new UserSpinResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserSpinResp);
    
            /** UserSpinResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /** UserSpinResp lotteryInfo. */
            public lotteryInfo?: (pqMsg.ILotteryInfo|null);
    
            /**
             * Creates a new UserSpinResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserSpinResp instance
             */
            public static create(properties?: pqMsg.IUserSpinResp): pqMsg.UserSpinResp;
    
            /**
             * Encodes the specified UserSpinResp message. Does not implicitly {@link pqMsg.UserSpinResp.verify|verify} messages.
             * @param message UserSpinResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserSpinResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserSpinResp message, length delimited. Does not implicitly {@link pqMsg.UserSpinResp.verify|verify} messages.
             * @param message UserSpinResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserSpinResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserSpinResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserSpinResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserSpinResp;
    
            /**
             * Decodes a UserSpinResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserSpinResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserSpinResp;
    
            /**
             * Verifies a UserSpinResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserSpinResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserSpinResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserSpinResp;
    
            /**
             * Creates a plain object from a UserSpinResp message. Also converts values to other types if specified.
             * @param message UserSpinResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserSpinResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserSpinResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of an AuthErrorResponse. */
        interface IAuthErrorResponse {
    
            /** AuthErrorResponse result */
            result?: (pqMsg.ICommandResult|null);
        }
    
        /** Represents an AuthErrorResponse. */
        class AuthErrorResponse implements IAuthErrorResponse {
    
            /**
             * Constructs a new AuthErrorResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IAuthErrorResponse);
    
            /** AuthErrorResponse result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /**
             * Creates a new AuthErrorResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthErrorResponse instance
             */
            public static create(properties?: pqMsg.IAuthErrorResponse): pqMsg.AuthErrorResponse;
    
            /**
             * Encodes the specified AuthErrorResponse message. Does not implicitly {@link pqMsg.AuthErrorResponse.verify|verify} messages.
             * @param message AuthErrorResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IAuthErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified AuthErrorResponse message, length delimited. Does not implicitly {@link pqMsg.AuthErrorResponse.verify|verify} messages.
             * @param message AuthErrorResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IAuthErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes an AuthErrorResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AuthErrorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.AuthErrorResponse;
    
            /**
             * Decodes an AuthErrorResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AuthErrorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.AuthErrorResponse;
    
            /**
             * Verifies an AuthErrorResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates an AuthErrorResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthErrorResponse
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.AuthErrorResponse;
    
            /**
             * Creates a plain object from an AuthErrorResponse message. Also converts values to other types if specified.
             * @param message AuthErrorResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.AuthErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this AuthErrorResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserRefreshTokenReq. */
        interface IUserRefreshTokenReq {
    
            /** UserRefreshTokenReq userId */
            userId?: (number|null);
        }
    
        /** Represents a UserRefreshTokenReq. */
        class UserRefreshTokenReq implements IUserRefreshTokenReq {
    
            /**
             * Constructs a new UserRefreshTokenReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserRefreshTokenReq);
    
            /** UserRefreshTokenReq userId. */
            public userId: number;
    
            /**
             * Creates a new UserRefreshTokenReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserRefreshTokenReq instance
             */
            public static create(properties?: pqMsg.IUserRefreshTokenReq): pqMsg.UserRefreshTokenReq;
    
            /**
             * Encodes the specified UserRefreshTokenReq message. Does not implicitly {@link pqMsg.UserRefreshTokenReq.verify|verify} messages.
             * @param message UserRefreshTokenReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserRefreshTokenReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserRefreshTokenReq message, length delimited. Does not implicitly {@link pqMsg.UserRefreshTokenReq.verify|verify} messages.
             * @param message UserRefreshTokenReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserRefreshTokenReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserRefreshTokenReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserRefreshTokenReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserRefreshTokenReq;
    
            /**
             * Decodes a UserRefreshTokenReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserRefreshTokenReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserRefreshTokenReq;
    
            /**
             * Verifies a UserRefreshTokenReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserRefreshTokenReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserRefreshTokenReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserRefreshTokenReq;
    
            /**
             * Creates a plain object from a UserRefreshTokenReq message. Also converts values to other types if specified.
             * @param message UserRefreshTokenReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserRefreshTokenReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserRefreshTokenReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a UserRefreshTokenResp. */
        interface IUserRefreshTokenResp {
    
            /** UserRefreshTokenResp result */
            result?: (pqMsg.ICommandResult|null);
    
            /** UserRefreshTokenResp pqToken */
            pqToken?: (string|null);
        }
    
        /** Represents a UserRefreshTokenResp. */
        class UserRefreshTokenResp implements IUserRefreshTokenResp {
    
            /**
             * Constructs a new UserRefreshTokenResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserRefreshTokenResp);
    
            /** UserRefreshTokenResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /** UserRefreshTokenResp pqToken. */
            public pqToken: string;
    
            /**
             * Creates a new UserRefreshTokenResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserRefreshTokenResp instance
             */
            public static create(properties?: pqMsg.IUserRefreshTokenResp): pqMsg.UserRefreshTokenResp;
    
            /**
             * Encodes the specified UserRefreshTokenResp message. Does not implicitly {@link pqMsg.UserRefreshTokenResp.verify|verify} messages.
             * @param message UserRefreshTokenResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserRefreshTokenResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserRefreshTokenResp message, length delimited. Does not implicitly {@link pqMsg.UserRefreshTokenResp.verify|verify} messages.
             * @param message UserRefreshTokenResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserRefreshTokenResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserRefreshTokenResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserRefreshTokenResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserRefreshTokenResp;
    
            /**
             * Decodes a UserRefreshTokenResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserRefreshTokenResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserRefreshTokenResp;
    
            /**
             * Verifies a UserRefreshTokenResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserRefreshTokenResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserRefreshTokenResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserRefreshTokenResp;
    
            /**
             * Creates a plain object from a UserRefreshTokenResp message. Also converts values to other types if specified.
             * @param message UserRefreshTokenResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserRefreshTokenResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserRefreshTokenResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a GetUserGameDataReq. */
        interface IGetUserGameDataReq {
    
            /** GetUserGameDataReq userId */
            userId?: (number|null);
    
            /** GetUserGameDataReq gameCode */
            gameCode?: (string|null);
    
            /** GetUserGameDataReq startTime */
            startTime?: (number|Long|null);
    
            /** GetUserGameDataReq endTime */
            endTime?: (number|Long|null);
    
            /** GetUserGameDataReq page */
            page?: (number|Long|null);
    
            /** GetUserGameDataReq limit */
            limit?: (number|Long|null);
        }
    
        /** Represents a GetUserGameDataReq. */
        class GetUserGameDataReq implements IGetUserGameDataReq {
    
            /**
             * Constructs a new GetUserGameDataReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IGetUserGameDataReq);
    
            /** GetUserGameDataReq userId. */
            public userId: number;
    
            /** GetUserGameDataReq gameCode. */
            public gameCode: string;
    
            /** GetUserGameDataReq startTime. */
            public startTime: (number|Long);
    
            /** GetUserGameDataReq endTime. */
            public endTime: (number|Long);
    
            /** GetUserGameDataReq page. */
            public page: (number|Long);
    
            /** GetUserGameDataReq limit. */
            public limit: (number|Long);
    
            /**
             * Creates a new GetUserGameDataReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetUserGameDataReq instance
             */
            public static create(properties?: pqMsg.IGetUserGameDataReq): pqMsg.GetUserGameDataReq;
    
            /**
             * Encodes the specified GetUserGameDataReq message. Does not implicitly {@link pqMsg.GetUserGameDataReq.verify|verify} messages.
             * @param message GetUserGameDataReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IGetUserGameDataReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified GetUserGameDataReq message, length delimited. Does not implicitly {@link pqMsg.GetUserGameDataReq.verify|verify} messages.
             * @param message GetUserGameDataReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IGetUserGameDataReq, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a GetUserGameDataReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetUserGameDataReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.GetUserGameDataReq;
    
            /**
             * Decodes a GetUserGameDataReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetUserGameDataReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.GetUserGameDataReq;
    
            /**
             * Verifies a GetUserGameDataReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a GetUserGameDataReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetUserGameDataReq
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.GetUserGameDataReq;
    
            /**
             * Creates a plain object from a GetUserGameDataReq message. Also converts values to other types if specified.
             * @param message GetUserGameDataReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.GetUserGameDataReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this GetUserGameDataReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a GetUserGameDataResp. */
        interface IGetUserGameDataResp {
    
            /** GetUserGameDataResp result */
            result?: (pqMsg.ICommandResult|null);
    
            /** GetUserGameDataResp history */
            history?: (pqMsg.ILotteryInfo[]|null);
        }
    
        /** Represents a GetUserGameDataResp. */
        class GetUserGameDataResp implements IGetUserGameDataResp {
    
            /**
             * Constructs a new GetUserGameDataResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IGetUserGameDataResp);
    
            /** GetUserGameDataResp result. */
            public result?: (pqMsg.ICommandResult|null);
    
            /** GetUserGameDataResp history. */
            public history: pqMsg.ILotteryInfo[];
    
            /**
             * Creates a new GetUserGameDataResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetUserGameDataResp instance
             */
            public static create(properties?: pqMsg.IGetUserGameDataResp): pqMsg.GetUserGameDataResp;
    
            /**
             * Encodes the specified GetUserGameDataResp message. Does not implicitly {@link pqMsg.GetUserGameDataResp.verify|verify} messages.
             * @param message GetUserGameDataResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IGetUserGameDataResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified GetUserGameDataResp message, length delimited. Does not implicitly {@link pqMsg.GetUserGameDataResp.verify|verify} messages.
             * @param message GetUserGameDataResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IGetUserGameDataResp, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a GetUserGameDataResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetUserGameDataResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.GetUserGameDataResp;
    
            /**
             * Decodes a GetUserGameDataResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetUserGameDataResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.GetUserGameDataResp;
    
            /**
             * Verifies a GetUserGameDataResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a GetUserGameDataResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetUserGameDataResp
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.GetUserGameDataResp;
    
            /**
             * Creates a plain object from a GetUserGameDataResp message. Also converts values to other types if specified.
             * @param message GetUserGameDataResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.GetUserGameDataResp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this GetUserGameDataResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of a CommandResult. */
        interface ICommandResult {
    
            /** CommandResult resultCode */
            resultCode?: (pqMsg.CommandResult.ResultCode|null);
    
            /** CommandResult message */
            message?: (string|null);
    
            /** CommandResult serverTime */
            serverTime?: (number|Long|null);
        }
    
        /** Represents a CommandResult. */
        class CommandResult implements ICommandResult {
    
            /**
             * Constructs a new CommandResult.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.ICommandResult);
    
            /** CommandResult resultCode. */
            public resultCode: pqMsg.CommandResult.ResultCode;
    
            /** CommandResult message. */
            public message: string;
    
            /** CommandResult serverTime. */
            public serverTime: (number|Long);
    
            /**
             * Creates a new CommandResult instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CommandResult instance
             */
            public static create(properties?: pqMsg.ICommandResult): pqMsg.CommandResult;
    
            /**
             * Encodes the specified CommandResult message. Does not implicitly {@link pqMsg.CommandResult.verify|verify} messages.
             * @param message CommandResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.ICommandResult, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified CommandResult message, length delimited. Does not implicitly {@link pqMsg.CommandResult.verify|verify} messages.
             * @param message CommandResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.ICommandResult, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a CommandResult message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommandResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.CommandResult;
    
            /**
             * Decodes a CommandResult message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CommandResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.CommandResult;
    
            /**
             * Verifies a CommandResult message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a CommandResult message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommandResult
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.CommandResult;
    
            /**
             * Creates a plain object from a CommandResult message. Also converts values to other types if specified.
             * @param message CommandResult
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.CommandResult, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this CommandResult to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        namespace CommandResult {
    
            /** ResultCode enum. */
            enum ResultCode {
                Success = 0,
                DataIllegal = 1,
                InvalidUser = 2,
                CenterServerDisconnect = 3,
                Unauthorized = 4,
                NotEnoughMinEntryAmount = 5,
                ChipDoesNotExist = 6,
                BalanceNotEnough = 7,
                GameDoesNotExist = 8,
                TokenDoesNotExist = 9
            }
        }
    
        /** Properties of a UserInfo. */
        interface IUserInfo {
    
            /** UserInfo userId */
            userId?: (number|null);
    
            /** UserInfo userName */
            userName?: (string|null);
    
            /** UserInfo headUrl */
            headUrl?: (string|null);
    
            /** UserInfo balance */
            balance?: (number|null);
    
            /** UserInfo lockBalance */
            lockBalance?: (number|null);
    
            /** UserInfo pqToken */
            pqToken?: (string|null);
        }
    
        /** Represents a UserInfo. */
        class UserInfo implements IUserInfo {
    
            /**
             * Constructs a new UserInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IUserInfo);
    
            /** UserInfo userId. */
            public userId: number;
    
            /** UserInfo userName. */
            public userName: string;
    
            /** UserInfo headUrl. */
            public headUrl: string;
    
            /** UserInfo balance. */
            public balance: number;
    
            /** UserInfo lockBalance. */
            public lockBalance: number;
    
            /** UserInfo pqToken. */
            public pqToken: string;
    
            /**
             * Creates a new UserInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserInfo instance
             */
            public static create(properties?: pqMsg.IUserInfo): pqMsg.UserInfo;
    
            /**
             * Encodes the specified UserInfo message. Does not implicitly {@link pqMsg.UserInfo.verify|verify} messages.
             * @param message UserInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link pqMsg.UserInfo.verify|verify} messages.
             * @param message UserInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a UserInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.UserInfo;
    
            /**
             * Decodes a UserInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.UserInfo;
    
            /**
             * Verifies a UserInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserInfo
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.UserInfo;
    
            /**
             * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
             * @param message UserInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this UserInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        /** Properties of an OneLotteryInfo. */
        interface IOneLotteryInfo {
    
            /** OneLotteryInfo betId */
            betId?: (string|null);
    
            /** OneLotteryInfo winMultiplier */
            winMultiplier?: (number|null);
    
            /** OneLotteryInfo allSymbols */
            allSymbols?: (pqMsg.OneLotteryInfo.ISymbolList[]|null);
    
            /** OneLotteryInfo isFree */
            isFree?: (boolean|null);
    
            /** OneLotteryInfo getFreeCount */
            getFreeCount?: (number|null);
    
            /** OneLotteryInfo winMoney */
            winMoney?: (number|null);
    
            /** OneLotteryInfo balance */
            balance?: (number|null);
    
            /** OneLotteryInfo winInfoList */
            winInfoList?: (pqMsg.OneLotteryInfo.IWinInfo[]|null);
        }
    
        /** Represents an OneLotteryInfo. */
        class OneLotteryInfo implements IOneLotteryInfo {
    
            /**
             * Constructs a new OneLotteryInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.IOneLotteryInfo);
    
            /** OneLotteryInfo betId. */
            public betId: string;
    
            /** OneLotteryInfo winMultiplier. */
            public winMultiplier: number;
    
            /** OneLotteryInfo allSymbols. */
            public allSymbols: pqMsg.OneLotteryInfo.ISymbolList[];
    
            /** OneLotteryInfo isFree. */
            public isFree: boolean;
    
            /** OneLotteryInfo getFreeCount. */
            public getFreeCount: number;
    
            /** OneLotteryInfo winMoney. */
            public winMoney: number;
    
            /** OneLotteryInfo balance. */
            public balance: number;
    
            /** OneLotteryInfo winInfoList. */
            public winInfoList: pqMsg.OneLotteryInfo.IWinInfo[];
    
            /**
             * Creates a new OneLotteryInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneLotteryInfo instance
             */
            public static create(properties?: pqMsg.IOneLotteryInfo): pqMsg.OneLotteryInfo;
    
            /**
             * Encodes the specified OneLotteryInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.verify|verify} messages.
             * @param message OneLotteryInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.IOneLotteryInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified OneLotteryInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.verify|verify} messages.
             * @param message OneLotteryInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.IOneLotteryInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes an OneLotteryInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneLotteryInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.OneLotteryInfo;
    
            /**
             * Decodes an OneLotteryInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneLotteryInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.OneLotteryInfo;
    
            /**
             * Verifies an OneLotteryInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates an OneLotteryInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneLotteryInfo
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.OneLotteryInfo;
    
            /**
             * Creates a plain object from an OneLotteryInfo message. Also converts values to other types if specified.
             * @param message OneLotteryInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.OneLotteryInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this OneLotteryInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    
        namespace OneLotteryInfo {
    
            /** Properties of a SymbolInfo. */
            interface ISymbolInfo {
    
                /** SymbolInfo symbolId */
                symbolId?: (number|null);
    
                /** SymbolInfo isGold */
                isGold?: (boolean|null);
    
                /** SymbolInfo isLucky */
                isLucky?: (boolean|null);
            }
    
            /** Represents a SymbolInfo. */
            class SymbolInfo implements ISymbolInfo {
    
                /**
                 * Constructs a new SymbolInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: pqMsg.OneLotteryInfo.ISymbolInfo);
    
                /** SymbolInfo symbolId. */
                public symbolId: number;
    
                /** SymbolInfo isGold. */
                public isGold: boolean;
    
                /** SymbolInfo isLucky. */
                public isLucky: boolean;
    
                /**
                 * Creates a new SymbolInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SymbolInfo instance
                 */
                public static create(properties?: pqMsg.OneLotteryInfo.ISymbolInfo): pqMsg.OneLotteryInfo.SymbolInfo;
    
                /**
                 * Encodes the specified SymbolInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolInfo.verify|verify} messages.
                 * @param message SymbolInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: pqMsg.OneLotteryInfo.ISymbolInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Encodes the specified SymbolInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolInfo.verify|verify} messages.
                 * @param message SymbolInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: pqMsg.OneLotteryInfo.ISymbolInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Decodes a SymbolInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SymbolInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.OneLotteryInfo.SymbolInfo;
    
                /**
                 * Decodes a SymbolInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SymbolInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.OneLotteryInfo.SymbolInfo;
    
                /**
                 * Verifies a SymbolInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
    
                /**
                 * Creates a SymbolInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SymbolInfo
                 */
                public static fromObject(object: { [k: string]: any }): pqMsg.OneLotteryInfo.SymbolInfo;
    
                /**
                 * Creates a plain object from a SymbolInfo message. Also converts values to other types if specified.
                 * @param message SymbolInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: pqMsg.OneLotteryInfo.SymbolInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                /**
                 * Converts this SymbolInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
    
            /** Properties of a SymbolList. */
            interface ISymbolList {
    
                /** SymbolList reelSymbols */
                reelSymbols?: (pqMsg.OneLotteryInfo.ISymbolInfo[]|null);
            }
    
            /** Represents a SymbolList. */
            class SymbolList implements ISymbolList {
    
                /**
                 * Constructs a new SymbolList.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: pqMsg.OneLotteryInfo.ISymbolList);
    
                /** SymbolList reelSymbols. */
                public reelSymbols: pqMsg.OneLotteryInfo.ISymbolInfo[];
    
                /**
                 * Creates a new SymbolList instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SymbolList instance
                 */
                public static create(properties?: pqMsg.OneLotteryInfo.ISymbolList): pqMsg.OneLotteryInfo.SymbolList;
    
                /**
                 * Encodes the specified SymbolList message. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolList.verify|verify} messages.
                 * @param message SymbolList message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: pqMsg.OneLotteryInfo.ISymbolList, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Encodes the specified SymbolList message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolList.verify|verify} messages.
                 * @param message SymbolList message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: pqMsg.OneLotteryInfo.ISymbolList, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Decodes a SymbolList message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SymbolList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.OneLotteryInfo.SymbolList;
    
                /**
                 * Decodes a SymbolList message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SymbolList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.OneLotteryInfo.SymbolList;
    
                /**
                 * Verifies a SymbolList message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
    
                /**
                 * Creates a SymbolList message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SymbolList
                 */
                public static fromObject(object: { [k: string]: any }): pqMsg.OneLotteryInfo.SymbolList;
    
                /**
                 * Creates a plain object from a SymbolList message. Also converts values to other types if specified.
                 * @param message SymbolList
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: pqMsg.OneLotteryInfo.SymbolList, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                /**
                 * Converts this SymbolList to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
    
            /** Properties of a WinInfo. */
            interface IWinInfo {
    
                /** WinInfo symbolId */
                symbolId?: (number|null);
    
                /** WinInfo lineList */
                lineList?: (number[]|null);
            }
    
            /** Represents a WinInfo. */
            class WinInfo implements IWinInfo {
    
                /**
                 * Constructs a new WinInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: pqMsg.OneLotteryInfo.IWinInfo);
    
                /** WinInfo symbolId. */
                public symbolId: number;
    
                /** WinInfo lineList. */
                public lineList: number[];
    
                /**
                 * Creates a new WinInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WinInfo instance
                 */
                public static create(properties?: pqMsg.OneLotteryInfo.IWinInfo): pqMsg.OneLotteryInfo.WinInfo;
    
                /**
                 * Encodes the specified WinInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.WinInfo.verify|verify} messages.
                 * @param message WinInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: pqMsg.OneLotteryInfo.IWinInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Encodes the specified WinInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.WinInfo.verify|verify} messages.
                 * @param message WinInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: pqMsg.OneLotteryInfo.IWinInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
                /**
                 * Decodes a WinInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WinInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.OneLotteryInfo.WinInfo;
    
                /**
                 * Decodes a WinInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WinInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.OneLotteryInfo.WinInfo;
    
                /**
                 * Verifies a WinInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
    
                /**
                 * Creates a WinInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WinInfo
                 */
                public static fromObject(object: { [k: string]: any }): pqMsg.OneLotteryInfo.WinInfo;
    
                /**
                 * Creates a plain object from a WinInfo message. Also converts values to other types if specified.
                 * @param message WinInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: pqMsg.OneLotteryInfo.WinInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                /**
                 * Converts this WinInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    
        /** Properties of a LotteryInfo. */
        interface ILotteryInfo {
    
            /** LotteryInfo gameCode */
            gameCode?: (string|null);
    
            /** LotteryInfo userId */
            userId?: (number|null);
    
            /** LotteryInfo parentBetId */
            parentBetId?: (string|null);
    
            /** LotteryInfo roundBetId */
            roundBetId?: (string|null);
    
            /** LotteryInfo betSize */
            betSize?: (number|null);
    
            /** LotteryInfo betLevel */
            betLevel?: (number|null);
    
            /** LotteryInfo baseBet */
            baseBet?: (number|null);
    
            /** LotteryInfo betMoney */
            betMoney?: (number|null);
    
            /** LotteryInfo lotteryInfoList */
            lotteryInfoList?: (pqMsg.IOneLotteryInfo[]|null);
    
            /** LotteryInfo balance */
            balance?: (number|null);
    
            /** LotteryInfo finalFreeCount */
            finalFreeCount?: (number|null);
    
            /** LotteryInfo betTime */
            betTime?: (number|Long|null);
    
            /** LotteryInfo offsetToPlayer */
            offsetToPlayer?: (number|null);
    
            /** LotteryInfo packageId */
            packageId?: (number|null);
        }
    
        /** Represents a LotteryInfo. */
        class LotteryInfo implements ILotteryInfo {
    
            /**
             * Constructs a new LotteryInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: pqMsg.ILotteryInfo);
    
            /** LotteryInfo gameCode. */
            public gameCode: string;
    
            /** LotteryInfo userId. */
            public userId: number;
    
            /** LotteryInfo parentBetId. */
            public parentBetId: string;
    
            /** LotteryInfo roundBetId. */
            public roundBetId: string;
    
            /** LotteryInfo betSize. */
            public betSize: number;
    
            /** LotteryInfo betLevel. */
            public betLevel: number;
    
            /** LotteryInfo baseBet. */
            public baseBet: number;
    
            /** LotteryInfo betMoney. */
            public betMoney: number;
    
            /** LotteryInfo lotteryInfoList. */
            public lotteryInfoList: pqMsg.IOneLotteryInfo[];
    
            /** LotteryInfo balance. */
            public balance: number;
    
            /** LotteryInfo finalFreeCount. */
            public finalFreeCount: number;
    
            /** LotteryInfo betTime. */
            public betTime: (number|Long);
    
            /** LotteryInfo offsetToPlayer. */
            public offsetToPlayer: number;
    
            /** LotteryInfo packageId. */
            public packageId: number;
    
            /**
             * Creates a new LotteryInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LotteryInfo instance
             */
            public static create(properties?: pqMsg.ILotteryInfo): pqMsg.LotteryInfo;
    
            /**
             * Encodes the specified LotteryInfo message. Does not implicitly {@link pqMsg.LotteryInfo.verify|verify} messages.
             * @param message LotteryInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pqMsg.ILotteryInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Encodes the specified LotteryInfo message, length delimited. Does not implicitly {@link pqMsg.LotteryInfo.verify|verify} messages.
             * @param message LotteryInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pqMsg.ILotteryInfo, writer?: $protobuf.Writer): $protobuf.Writer;
    
            /**
             * Decodes a LotteryInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LotteryInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pqMsg.LotteryInfo;
    
            /**
             * Decodes a LotteryInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LotteryInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pqMsg.LotteryInfo;
    
            /**
             * Verifies a LotteryInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
    
            /**
             * Creates a LotteryInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LotteryInfo
             */
            public static fromObject(object: { [k: string]: any }): pqMsg.LotteryInfo;
    
            /**
             * Creates a plain object from a LotteryInfo message. Also converts values to other types if specified.
             * @param message LotteryInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pqMsg.LotteryInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
            /**
             * Converts this LotteryInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

export {pqMsg as default}