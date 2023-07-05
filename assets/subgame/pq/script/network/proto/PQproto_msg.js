/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/

var $protobuf =  require("protobufjs");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pqMsg = (function() {

    /**
     * Namespace pqMsg.
     * @exports pqMsg
     * @namespace
     */
    var pqMsg = {};

    /**
     * SubCommand enum.
     * @name pqMsg.SubCommand
     * @enum {number}
     * @property {number} EnumSubLoginReq=0 EnumSubLoginReq value
     * @property {number} EnumSubLoginResp=1 EnumSubLoginResp value
     * @property {number} EnumSubLogoutReq=2 EnumSubLogoutReq value
     * @property {number} EnumSubLogoutResp=3 EnumSubLogoutResp value
     * @property {number} EnumSubEnterGameReq=4 EnumSubEnterGameReq value
     * @property {number} EnumSubEnterGameResp=5 EnumSubEnterGameResp value
     * @property {number} EnumSubSpinReq=6 EnumSubSpinReq value
     * @property {number} EnumSubSpinResp=7 EnumSubSpinResp value
     * @property {number} EnumSubAuthErrorResp=8 EnumSubAuthErrorResp value
     * @property {number} EnumSubUserRefreshTokenReq=9 EnumSubUserRefreshTokenReq value
     * @property {number} EnumSubUserRefreshTokenResp=10 EnumSubUserRefreshTokenResp value
     * @property {number} EnumSubGetUserGameDataReq=11 EnumSubGetUserGameDataReq value
     * @property {number} EnumSubGetUserGameDataResp=12 EnumSubGetUserGameDataResp value
     */
    pqMsg.SubCommand = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumSubLoginReq"] = 0;
        values[valuesById[1] = "EnumSubLoginResp"] = 1;
        values[valuesById[2] = "EnumSubLogoutReq"] = 2;
        values[valuesById[3] = "EnumSubLogoutResp"] = 3;
        values[valuesById[4] = "EnumSubEnterGameReq"] = 4;
        values[valuesById[5] = "EnumSubEnterGameResp"] = 5;
        values[valuesById[6] = "EnumSubSpinReq"] = 6;
        values[valuesById[7] = "EnumSubSpinResp"] = 7;
        values[valuesById[8] = "EnumSubAuthErrorResp"] = 8;
        values[valuesById[9] = "EnumSubUserRefreshTokenReq"] = 9;
        values[valuesById[10] = "EnumSubUserRefreshTokenResp"] = 10;
        values[valuesById[11] = "EnumSubGetUserGameDataReq"] = 11;
        values[valuesById[12] = "EnumSubGetUserGameDataResp"] = 12;
        return values;
    })();

    pqMsg.UserLoginReq = (function() {

        /**
         * Properties of a UserLoginReq.
         * @memberof pqMsg
         * @interface IUserLoginReq
         * @property {number|null} [userId] UserLoginReq userId
         * @property {string|null} [gameId] UserLoginReq gameId
         * @property {string|null} [password] UserLoginReq password
         * @property {string|null} [token] UserLoginReq token
         */

        /**
         * Constructs a new UserLoginReq.
         * @memberof pqMsg
         * @classdesc Represents a UserLoginReq.
         * @implements IUserLoginReq
         * @constructor
         * @param {pqMsg.IUserLoginReq=} [properties] Properties to set
         */
        function UserLoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLoginReq userId.
         * @member {number} userId
         * @memberof pqMsg.UserLoginReq
         * @instance
         */
        UserLoginReq.prototype.userId = 0;

        /**
         * UserLoginReq gameId.
         * @member {string} gameId
         * @memberof pqMsg.UserLoginReq
         * @instance
         */
        UserLoginReq.prototype.gameId = "";

        /**
         * UserLoginReq password.
         * @member {string} password
         * @memberof pqMsg.UserLoginReq
         * @instance
         */
        UserLoginReq.prototype.password = "";

        /**
         * UserLoginReq token.
         * @member {string} token
         * @memberof pqMsg.UserLoginReq
         * @instance
         */
        UserLoginReq.prototype.token = "";

        /**
         * Creates a new UserLoginReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {pqMsg.IUserLoginReq=} [properties] Properties to set
         * @returns {pqMsg.UserLoginReq} UserLoginReq instance
         */
        UserLoginReq.create = function create(properties) {
            return new UserLoginReq(properties);
        };

        /**
         * Encodes the specified UserLoginReq message. Does not implicitly {@link pqMsg.UserLoginReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {pqMsg.IUserLoginReq} message UserLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameId);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified UserLoginReq message, length delimited. Does not implicitly {@link pqMsg.UserLoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {pqMsg.IUserLoginReq} message UserLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserLoginReq} UserLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserLoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                case 2:
                    message.gameId = reader.string();
                    break;
                case 3:
                    message.password = reader.string();
                    break;
                case 4:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserLoginReq} UserLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLoginReq message.
         * @function verify
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a UserLoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserLoginReq} UserLoginReq
         */
        UserLoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserLoginReq)
                return object;
            var message = new $root.pqMsg.UserLoginReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            if (object.password != null)
                message.password = String(object.password);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a UserLoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserLoginReq
         * @static
         * @param {pqMsg.UserLoginReq} message UserLoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.gameId = "";
                object.password = "";
                object.token = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this UserLoginReq to JSON.
         * @function toJSON
         * @memberof pqMsg.UserLoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLoginReq;
    })();

    pqMsg.UserLoginResp = (function() {

        /**
         * Properties of a UserLoginResp.
         * @memberof pqMsg
         * @interface IUserLoginResp
         * @property {pqMsg.ICommandResult|null} [result] UserLoginResp result
         * @property {pqMsg.IUserInfo|null} [userInfo] UserLoginResp userInfo
         * @property {Array.<pqMsg.UserLoginResp.IGameFreeCount>|null} [allGameFreeCount] UserLoginResp allGameFreeCount
         * @property {string|null} [version] UserLoginResp version
         */

        /**
         * Constructs a new UserLoginResp.
         * @memberof pqMsg
         * @classdesc Represents a UserLoginResp.
         * @implements IUserLoginResp
         * @constructor
         * @param {pqMsg.IUserLoginResp=} [properties] Properties to set
         */
        function UserLoginResp(properties) {
            this.allGameFreeCount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLoginResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.UserLoginResp
         * @instance
         */
        UserLoginResp.prototype.result = null;

        /**
         * UserLoginResp userInfo.
         * @member {pqMsg.IUserInfo|null|undefined} userInfo
         * @memberof pqMsg.UserLoginResp
         * @instance
         */
        UserLoginResp.prototype.userInfo = null;

        /**
         * UserLoginResp allGameFreeCount.
         * @member {Array.<pqMsg.UserLoginResp.IGameFreeCount>} allGameFreeCount
         * @memberof pqMsg.UserLoginResp
         * @instance
         */
        UserLoginResp.prototype.allGameFreeCount = $util.emptyArray;

        /**
         * UserLoginResp version.
         * @member {string} version
         * @memberof pqMsg.UserLoginResp
         * @instance
         */
        UserLoginResp.prototype.version = "";

        /**
         * Creates a new UserLoginResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {pqMsg.IUserLoginResp=} [properties] Properties to set
         * @returns {pqMsg.UserLoginResp} UserLoginResp instance
         */
        UserLoginResp.create = function create(properties) {
            return new UserLoginResp(properties);
        };

        /**
         * Encodes the specified UserLoginResp message. Does not implicitly {@link pqMsg.UserLoginResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {pqMsg.IUserLoginResp} message UserLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.userInfo != null && Object.hasOwnProperty.call(message, "userInfo"))
                $root.pqMsg.UserInfo.encode(message.userInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.allGameFreeCount != null && message.allGameFreeCount.length)
                for (var i = 0; i < message.allGameFreeCount.length; ++i)
                    $root.pqMsg.UserLoginResp.GameFreeCount.encode(message.allGameFreeCount[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.version);
            return writer;
        };

        /**
         * Encodes the specified UserLoginResp message, length delimited. Does not implicitly {@link pqMsg.UserLoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {pqMsg.IUserLoginResp} message UserLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserLoginResp} UserLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserLoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.userInfo = $root.pqMsg.UserInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.allGameFreeCount && message.allGameFreeCount.length))
                        message.allGameFreeCount = [];
                    message.allGameFreeCount.push($root.pqMsg.UserLoginResp.GameFreeCount.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserLoginResp} UserLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLoginResp message.
         * @function verify
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.pqMsg.UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
            }
            if (message.allGameFreeCount != null && message.hasOwnProperty("allGameFreeCount")) {
                if (!Array.isArray(message.allGameFreeCount))
                    return "allGameFreeCount: array expected";
                for (var i = 0; i < message.allGameFreeCount.length; ++i) {
                    var error = $root.pqMsg.UserLoginResp.GameFreeCount.verify(message.allGameFreeCount[i]);
                    if (error)
                        return "allGameFreeCount." + error;
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            return null;
        };

        /**
         * Creates a UserLoginResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserLoginResp} UserLoginResp
         */
        UserLoginResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserLoginResp)
                return object;
            var message = new $root.pqMsg.UserLoginResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.UserLoginResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".pqMsg.UserLoginResp.userInfo: object expected");
                message.userInfo = $root.pqMsg.UserInfo.fromObject(object.userInfo);
            }
            if (object.allGameFreeCount) {
                if (!Array.isArray(object.allGameFreeCount))
                    throw TypeError(".pqMsg.UserLoginResp.allGameFreeCount: array expected");
                message.allGameFreeCount = [];
                for (var i = 0; i < object.allGameFreeCount.length; ++i) {
                    if (typeof object.allGameFreeCount[i] !== "object")
                        throw TypeError(".pqMsg.UserLoginResp.allGameFreeCount: object expected");
                    message.allGameFreeCount[i] = $root.pqMsg.UserLoginResp.GameFreeCount.fromObject(object.allGameFreeCount[i]);
                }
            }
            if (object.version != null)
                message.version = String(object.version);
            return message;
        };

        /**
         * Creates a plain object from a UserLoginResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserLoginResp
         * @static
         * @param {pqMsg.UserLoginResp} message UserLoginResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLoginResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.allGameFreeCount = [];
            if (options.defaults) {
                object.result = null;
                object.userInfo = null;
                object.version = "";
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.pqMsg.UserInfo.toObject(message.userInfo, options);
            if (message.allGameFreeCount && message.allGameFreeCount.length) {
                object.allGameFreeCount = [];
                for (var j = 0; j < message.allGameFreeCount.length; ++j)
                    object.allGameFreeCount[j] = $root.pqMsg.UserLoginResp.GameFreeCount.toObject(message.allGameFreeCount[j], options);
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            return object;
        };

        /**
         * Converts this UserLoginResp to JSON.
         * @function toJSON
         * @memberof pqMsg.UserLoginResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLoginResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        UserLoginResp.GameFreeCount = (function() {

            /**
             * Properties of a GameFreeCount.
             * @memberof pqMsg.UserLoginResp
             * @interface IGameFreeCount
             * @property {string|null} [gameCode] GameFreeCount gameCode
             * @property {number|null} [freeCount] GameFreeCount freeCount
             */

            /**
             * Constructs a new GameFreeCount.
             * @memberof pqMsg.UserLoginResp
             * @classdesc Represents a GameFreeCount.
             * @implements IGameFreeCount
             * @constructor
             * @param {pqMsg.UserLoginResp.IGameFreeCount=} [properties] Properties to set
             */
            function GameFreeCount(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameFreeCount gameCode.
             * @member {string} gameCode
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @instance
             */
            GameFreeCount.prototype.gameCode = "";

            /**
             * GameFreeCount freeCount.
             * @member {number} freeCount
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @instance
             */
            GameFreeCount.prototype.freeCount = 0;

            /**
             * Creates a new GameFreeCount instance using the specified properties.
             * @function create
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {pqMsg.UserLoginResp.IGameFreeCount=} [properties] Properties to set
             * @returns {pqMsg.UserLoginResp.GameFreeCount} GameFreeCount instance
             */
            GameFreeCount.create = function create(properties) {
                return new GameFreeCount(properties);
            };

            /**
             * Encodes the specified GameFreeCount message. Does not implicitly {@link pqMsg.UserLoginResp.GameFreeCount.verify|verify} messages.
             * @function encode
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {pqMsg.UserLoginResp.IGameFreeCount} message GameFreeCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameFreeCount.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
                if (message.freeCount != null && Object.hasOwnProperty.call(message, "freeCount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.freeCount);
                return writer;
            };

            /**
             * Encodes the specified GameFreeCount message, length delimited. Does not implicitly {@link pqMsg.UserLoginResp.GameFreeCount.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {pqMsg.UserLoginResp.IGameFreeCount} message GameFreeCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameFreeCount.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GameFreeCount message from the specified reader or buffer.
             * @function decode
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pqMsg.UserLoginResp.GameFreeCount} GameFreeCount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameFreeCount.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserLoginResp.GameFreeCount();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.gameCode = reader.string();
                        break;
                    case 2:
                        message.freeCount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameFreeCount message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pqMsg.UserLoginResp.GameFreeCount} GameFreeCount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameFreeCount.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameFreeCount message.
             * @function verify
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameFreeCount.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                    if (!$util.isString(message.gameCode))
                        return "gameCode: string expected";
                if (message.freeCount != null && message.hasOwnProperty("freeCount"))
                    if (!$util.isInteger(message.freeCount))
                        return "freeCount: integer expected";
                return null;
            };

            /**
             * Creates a GameFreeCount message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pqMsg.UserLoginResp.GameFreeCount} GameFreeCount
             */
            GameFreeCount.fromObject = function fromObject(object) {
                if (object instanceof $root.pqMsg.UserLoginResp.GameFreeCount)
                    return object;
                var message = new $root.pqMsg.UserLoginResp.GameFreeCount();
                if (object.gameCode != null)
                    message.gameCode = String(object.gameCode);
                if (object.freeCount != null)
                    message.freeCount = object.freeCount >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a GameFreeCount message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @static
             * @param {pqMsg.UserLoginResp.GameFreeCount} message GameFreeCount
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameFreeCount.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.gameCode = "";
                    object.freeCount = 0;
                }
                if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                    object.gameCode = message.gameCode;
                if (message.freeCount != null && message.hasOwnProperty("freeCount"))
                    object.freeCount = message.freeCount;
                return object;
            };

            /**
             * Converts this GameFreeCount to JSON.
             * @function toJSON
             * @memberof pqMsg.UserLoginResp.GameFreeCount
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameFreeCount.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GameFreeCount;
        })();

        return UserLoginResp;
    })();

    pqMsg.UserLogoutReq = (function() {

        /**
         * Properties of a UserLogoutReq.
         * @memberof pqMsg
         * @interface IUserLogoutReq
         * @property {number|null} [userId] UserLogoutReq userId
         */

        /**
         * Constructs a new UserLogoutReq.
         * @memberof pqMsg
         * @classdesc Represents a UserLogoutReq.
         * @implements IUserLogoutReq
         * @constructor
         * @param {pqMsg.IUserLogoutReq=} [properties] Properties to set
         */
        function UserLogoutReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLogoutReq userId.
         * @member {number} userId
         * @memberof pqMsg.UserLogoutReq
         * @instance
         */
        UserLogoutReq.prototype.userId = 0;

        /**
         * Creates a new UserLogoutReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {pqMsg.IUserLogoutReq=} [properties] Properties to set
         * @returns {pqMsg.UserLogoutReq} UserLogoutReq instance
         */
        UserLogoutReq.create = function create(properties) {
            return new UserLogoutReq(properties);
        };

        /**
         * Encodes the specified UserLogoutReq message. Does not implicitly {@link pqMsg.UserLogoutReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {pqMsg.IUserLogoutReq} message UserLogoutReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogoutReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified UserLogoutReq message, length delimited. Does not implicitly {@link pqMsg.UserLogoutReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {pqMsg.IUserLogoutReq} message UserLogoutReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogoutReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLogoutReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserLogoutReq} UserLogoutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogoutReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserLogoutReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLogoutReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserLogoutReq} UserLogoutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogoutReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLogoutReq message.
         * @function verify
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLogoutReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a UserLogoutReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserLogoutReq} UserLogoutReq
         */
        UserLogoutReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserLogoutReq)
                return object;
            var message = new $root.pqMsg.UserLogoutReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a UserLogoutReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserLogoutReq
         * @static
         * @param {pqMsg.UserLogoutReq} message UserLogoutReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLogoutReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this UserLogoutReq to JSON.
         * @function toJSON
         * @memberof pqMsg.UserLogoutReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLogoutReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLogoutReq;
    })();

    pqMsg.UserLogoutResp = (function() {

        /**
         * Properties of a UserLogoutResp.
         * @memberof pqMsg
         * @interface IUserLogoutResp
         * @property {pqMsg.ICommandResult|null} [result] UserLogoutResp result
         */

        /**
         * Constructs a new UserLogoutResp.
         * @memberof pqMsg
         * @classdesc Represents a UserLogoutResp.
         * @implements IUserLogoutResp
         * @constructor
         * @param {pqMsg.IUserLogoutResp=} [properties] Properties to set
         */
        function UserLogoutResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLogoutResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.UserLogoutResp
         * @instance
         */
        UserLogoutResp.prototype.result = null;

        /**
         * Creates a new UserLogoutResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {pqMsg.IUserLogoutResp=} [properties] Properties to set
         * @returns {pqMsg.UserLogoutResp} UserLogoutResp instance
         */
        UserLogoutResp.create = function create(properties) {
            return new UserLogoutResp(properties);
        };

        /**
         * Encodes the specified UserLogoutResp message. Does not implicitly {@link pqMsg.UserLogoutResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {pqMsg.IUserLogoutResp} message UserLogoutResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogoutResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserLogoutResp message, length delimited. Does not implicitly {@link pqMsg.UserLogoutResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {pqMsg.IUserLogoutResp} message UserLogoutResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogoutResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLogoutResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserLogoutResp} UserLogoutResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogoutResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserLogoutResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLogoutResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserLogoutResp} UserLogoutResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogoutResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLogoutResp message.
         * @function verify
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLogoutResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            return null;
        };

        /**
         * Creates a UserLogoutResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserLogoutResp} UserLogoutResp
         */
        UserLogoutResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserLogoutResp)
                return object;
            var message = new $root.pqMsg.UserLogoutResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.UserLogoutResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserLogoutResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserLogoutResp
         * @static
         * @param {pqMsg.UserLogoutResp} message UserLogoutResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLogoutResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.result = null;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            return object;
        };

        /**
         * Converts this UserLogoutResp to JSON.
         * @function toJSON
         * @memberof pqMsg.UserLogoutResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLogoutResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLogoutResp;
    })();

    pqMsg.UserEnterGameReq = (function() {

        /**
         * Properties of a UserEnterGameReq.
         * @memberof pqMsg
         * @interface IUserEnterGameReq
         * @property {number|null} [userId] UserEnterGameReq userId
         * @property {string|null} [gameCode] UserEnterGameReq gameCode
         */

        /**
         * Constructs a new UserEnterGameReq.
         * @memberof pqMsg
         * @classdesc Represents a UserEnterGameReq.
         * @implements IUserEnterGameReq
         * @constructor
         * @param {pqMsg.IUserEnterGameReq=} [properties] Properties to set
         */
        function UserEnterGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserEnterGameReq userId.
         * @member {number} userId
         * @memberof pqMsg.UserEnterGameReq
         * @instance
         */
        UserEnterGameReq.prototype.userId = 0;

        /**
         * UserEnterGameReq gameCode.
         * @member {string} gameCode
         * @memberof pqMsg.UserEnterGameReq
         * @instance
         */
        UserEnterGameReq.prototype.gameCode = "";

        /**
         * Creates a new UserEnterGameReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {pqMsg.IUserEnterGameReq=} [properties] Properties to set
         * @returns {pqMsg.UserEnterGameReq} UserEnterGameReq instance
         */
        UserEnterGameReq.create = function create(properties) {
            return new UserEnterGameReq(properties);
        };

        /**
         * Encodes the specified UserEnterGameReq message. Does not implicitly {@link pqMsg.UserEnterGameReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {pqMsg.IUserEnterGameReq} message UserEnterGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserEnterGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameCode);
            return writer;
        };

        /**
         * Encodes the specified UserEnterGameReq message, length delimited. Does not implicitly {@link pqMsg.UserEnterGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {pqMsg.IUserEnterGameReq} message UserEnterGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserEnterGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserEnterGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserEnterGameReq} UserEnterGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserEnterGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserEnterGameReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                case 2:
                    message.gameCode = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserEnterGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserEnterGameReq} UserEnterGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserEnterGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserEnterGameReq message.
         * @function verify
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserEnterGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            return null;
        };

        /**
         * Creates a UserEnterGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserEnterGameReq} UserEnterGameReq
         */
        UserEnterGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserEnterGameReq)
                return object;
            var message = new $root.pqMsg.UserEnterGameReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            return message;
        };

        /**
         * Creates a plain object from a UserEnterGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserEnterGameReq
         * @static
         * @param {pqMsg.UserEnterGameReq} message UserEnterGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserEnterGameReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.gameCode = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            return object;
        };

        /**
         * Converts this UserEnterGameReq to JSON.
         * @function toJSON
         * @memberof pqMsg.UserEnterGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserEnterGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserEnterGameReq;
    })();

    pqMsg.UserEnterGameResp = (function() {

        /**
         * Properties of a UserEnterGameResp.
         * @memberof pqMsg
         * @interface IUserEnterGameResp
         * @property {Array.<pqMsg.ILotteryInfo>|null} [lastLotteryInfo] UserEnterGameResp lastLotteryInfo
         * @property {pqMsg.ICommandResult|null} [result] UserEnterGameResp result
         */

        /**
         * Constructs a new UserEnterGameResp.
         * @memberof pqMsg
         * @classdesc Represents a UserEnterGameResp.
         * @implements IUserEnterGameResp
         * @constructor
         * @param {pqMsg.IUserEnterGameResp=} [properties] Properties to set
         */
        function UserEnterGameResp(properties) {
            this.lastLotteryInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserEnterGameResp lastLotteryInfo.
         * @member {Array.<pqMsg.ILotteryInfo>} lastLotteryInfo
         * @memberof pqMsg.UserEnterGameResp
         * @instance
         */
        UserEnterGameResp.prototype.lastLotteryInfo = $util.emptyArray;

        /**
         * UserEnterGameResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.UserEnterGameResp
         * @instance
         */
        UserEnterGameResp.prototype.result = null;

        /**
         * Creates a new UserEnterGameResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {pqMsg.IUserEnterGameResp=} [properties] Properties to set
         * @returns {pqMsg.UserEnterGameResp} UserEnterGameResp instance
         */
        UserEnterGameResp.create = function create(properties) {
            return new UserEnterGameResp(properties);
        };

        /**
         * Encodes the specified UserEnterGameResp message. Does not implicitly {@link pqMsg.UserEnterGameResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {pqMsg.IUserEnterGameResp} message UserEnterGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserEnterGameResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lastLotteryInfo != null && message.lastLotteryInfo.length)
                for (var i = 0; i < message.lastLotteryInfo.length; ++i)
                    $root.pqMsg.LotteryInfo.encode(message.lastLotteryInfo[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserEnterGameResp message, length delimited. Does not implicitly {@link pqMsg.UserEnterGameResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {pqMsg.IUserEnterGameResp} message UserEnterGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserEnterGameResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserEnterGameResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserEnterGameResp} UserEnterGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserEnterGameResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserEnterGameResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.lastLotteryInfo && message.lastLotteryInfo.length))
                        message.lastLotteryInfo = [];
                    message.lastLotteryInfo.push($root.pqMsg.LotteryInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserEnterGameResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserEnterGameResp} UserEnterGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserEnterGameResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserEnterGameResp message.
         * @function verify
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserEnterGameResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lastLotteryInfo != null && message.hasOwnProperty("lastLotteryInfo")) {
                if (!Array.isArray(message.lastLotteryInfo))
                    return "lastLotteryInfo: array expected";
                for (var i = 0; i < message.lastLotteryInfo.length; ++i) {
                    var error = $root.pqMsg.LotteryInfo.verify(message.lastLotteryInfo[i]);
                    if (error)
                        return "lastLotteryInfo." + error;
                }
            }
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            return null;
        };

        /**
         * Creates a UserEnterGameResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserEnterGameResp} UserEnterGameResp
         */
        UserEnterGameResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserEnterGameResp)
                return object;
            var message = new $root.pqMsg.UserEnterGameResp();
            if (object.lastLotteryInfo) {
                if (!Array.isArray(object.lastLotteryInfo))
                    throw TypeError(".pqMsg.UserEnterGameResp.lastLotteryInfo: array expected");
                message.lastLotteryInfo = [];
                for (var i = 0; i < object.lastLotteryInfo.length; ++i) {
                    if (typeof object.lastLotteryInfo[i] !== "object")
                        throw TypeError(".pqMsg.UserEnterGameResp.lastLotteryInfo: object expected");
                    message.lastLotteryInfo[i] = $root.pqMsg.LotteryInfo.fromObject(object.lastLotteryInfo[i]);
                }
            }
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.UserEnterGameResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserEnterGameResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserEnterGameResp
         * @static
         * @param {pqMsg.UserEnterGameResp} message UserEnterGameResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserEnterGameResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.lastLotteryInfo = [];
            if (options.defaults)
                object.result = null;
            if (message.lastLotteryInfo && message.lastLotteryInfo.length) {
                object.lastLotteryInfo = [];
                for (var j = 0; j < message.lastLotteryInfo.length; ++j)
                    object.lastLotteryInfo[j] = $root.pqMsg.LotteryInfo.toObject(message.lastLotteryInfo[j], options);
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            return object;
        };

        /**
         * Converts this UserEnterGameResp to JSON.
         * @function toJSON
         * @memberof pqMsg.UserEnterGameResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserEnterGameResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserEnterGameResp;
    })();

    pqMsg.UserSpinReq = (function() {

        /**
         * Properties of a UserSpinReq.
         * @memberof pqMsg
         * @interface IUserSpinReq
         * @property {number|null} [userId] UserSpinReq userId
         * @property {string|null} [gameCode] UserSpinReq gameCode
         * @property {number|null} [betSize] UserSpinReq betSize
         * @property {number|null} [betLevel] UserSpinReq betLevel
         * @property {number|null} [baseBet] UserSpinReq baseBet
         */

        /**
         * Constructs a new UserSpinReq.
         * @memberof pqMsg
         * @classdesc Represents a UserSpinReq.
         * @implements IUserSpinReq
         * @constructor
         * @param {pqMsg.IUserSpinReq=} [properties] Properties to set
         */
        function UserSpinReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserSpinReq userId.
         * @member {number} userId
         * @memberof pqMsg.UserSpinReq
         * @instance
         */
        UserSpinReq.prototype.userId = 0;

        /**
         * UserSpinReq gameCode.
         * @member {string} gameCode
         * @memberof pqMsg.UserSpinReq
         * @instance
         */
        UserSpinReq.prototype.gameCode = "";

        /**
         * UserSpinReq betSize.
         * @member {number} betSize
         * @memberof pqMsg.UserSpinReq
         * @instance
         */
        UserSpinReq.prototype.betSize = 0;

        /**
         * UserSpinReq betLevel.
         * @member {number} betLevel
         * @memberof pqMsg.UserSpinReq
         * @instance
         */
        UserSpinReq.prototype.betLevel = 0;

        /**
         * UserSpinReq baseBet.
         * @member {number} baseBet
         * @memberof pqMsg.UserSpinReq
         * @instance
         */
        UserSpinReq.prototype.baseBet = 0;

        /**
         * Creates a new UserSpinReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {pqMsg.IUserSpinReq=} [properties] Properties to set
         * @returns {pqMsg.UserSpinReq} UserSpinReq instance
         */
        UserSpinReq.create = function create(properties) {
            return new UserSpinReq(properties);
        };

        /**
         * Encodes the specified UserSpinReq message. Does not implicitly {@link pqMsg.UserSpinReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {pqMsg.IUserSpinReq} message UserSpinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSpinReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameCode);
            if (message.betSize != null && Object.hasOwnProperty.call(message, "betSize"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.betSize);
            if (message.betLevel != null && Object.hasOwnProperty.call(message, "betLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.betLevel);
            if (message.baseBet != null && Object.hasOwnProperty.call(message, "baseBet"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.baseBet);
            return writer;
        };

        /**
         * Encodes the specified UserSpinReq message, length delimited. Does not implicitly {@link pqMsg.UserSpinReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {pqMsg.IUserSpinReq} message UserSpinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSpinReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserSpinReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserSpinReq} UserSpinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSpinReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserSpinReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                case 2:
                    message.gameCode = reader.string();
                    break;
                case 3:
                    message.betSize = reader.double();
                    break;
                case 4:
                    message.betLevel = reader.uint32();
                    break;
                case 5:
                    message.baseBet = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserSpinReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserSpinReq} UserSpinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSpinReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserSpinReq message.
         * @function verify
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserSpinReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.betSize != null && message.hasOwnProperty("betSize"))
                if (typeof message.betSize !== "number")
                    return "betSize: number expected";
            if (message.betLevel != null && message.hasOwnProperty("betLevel"))
                if (!$util.isInteger(message.betLevel))
                    return "betLevel: integer expected";
            if (message.baseBet != null && message.hasOwnProperty("baseBet"))
                if (!$util.isInteger(message.baseBet))
                    return "baseBet: integer expected";
            return null;
        };

        /**
         * Creates a UserSpinReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserSpinReq} UserSpinReq
         */
        UserSpinReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserSpinReq)
                return object;
            var message = new $root.pqMsg.UserSpinReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.betSize != null)
                message.betSize = Number(object.betSize);
            if (object.betLevel != null)
                message.betLevel = object.betLevel >>> 0;
            if (object.baseBet != null)
                message.baseBet = object.baseBet >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a UserSpinReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserSpinReq
         * @static
         * @param {pqMsg.UserSpinReq} message UserSpinReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserSpinReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.gameCode = "";
                object.betSize = 0;
                object.betLevel = 0;
                object.baseBet = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.betSize != null && message.hasOwnProperty("betSize"))
                object.betSize = options.json && !isFinite(message.betSize) ? String(message.betSize) : message.betSize;
            if (message.betLevel != null && message.hasOwnProperty("betLevel"))
                object.betLevel = message.betLevel;
            if (message.baseBet != null && message.hasOwnProperty("baseBet"))
                object.baseBet = message.baseBet;
            return object;
        };

        /**
         * Converts this UserSpinReq to JSON.
         * @function toJSON
         * @memberof pqMsg.UserSpinReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserSpinReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserSpinReq;
    })();

    pqMsg.UserSpinResp = (function() {

        /**
         * Properties of a UserSpinResp.
         * @memberof pqMsg
         * @interface IUserSpinResp
         * @property {pqMsg.ICommandResult|null} [result] UserSpinResp result
         * @property {pqMsg.ILotteryInfo|null} [lotteryInfo] UserSpinResp lotteryInfo
         */

        /**
         * Constructs a new UserSpinResp.
         * @memberof pqMsg
         * @classdesc Represents a UserSpinResp.
         * @implements IUserSpinResp
         * @constructor
         * @param {pqMsg.IUserSpinResp=} [properties] Properties to set
         */
        function UserSpinResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserSpinResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.UserSpinResp
         * @instance
         */
        UserSpinResp.prototype.result = null;

        /**
         * UserSpinResp lotteryInfo.
         * @member {pqMsg.ILotteryInfo|null|undefined} lotteryInfo
         * @memberof pqMsg.UserSpinResp
         * @instance
         */
        UserSpinResp.prototype.lotteryInfo = null;

        /**
         * Creates a new UserSpinResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {pqMsg.IUserSpinResp=} [properties] Properties to set
         * @returns {pqMsg.UserSpinResp} UserSpinResp instance
         */
        UserSpinResp.create = function create(properties) {
            return new UserSpinResp(properties);
        };

        /**
         * Encodes the specified UserSpinResp message. Does not implicitly {@link pqMsg.UserSpinResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {pqMsg.IUserSpinResp} message UserSpinResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSpinResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.lotteryInfo != null && Object.hasOwnProperty.call(message, "lotteryInfo"))
                $root.pqMsg.LotteryInfo.encode(message.lotteryInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserSpinResp message, length delimited. Does not implicitly {@link pqMsg.UserSpinResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {pqMsg.IUserSpinResp} message UserSpinResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSpinResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserSpinResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserSpinResp} UserSpinResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSpinResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserSpinResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.lotteryInfo = $root.pqMsg.LotteryInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserSpinResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserSpinResp} UserSpinResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSpinResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserSpinResp message.
         * @function verify
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserSpinResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.lotteryInfo != null && message.hasOwnProperty("lotteryInfo")) {
                var error = $root.pqMsg.LotteryInfo.verify(message.lotteryInfo);
                if (error)
                    return "lotteryInfo." + error;
            }
            return null;
        };

        /**
         * Creates a UserSpinResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserSpinResp} UserSpinResp
         */
        UserSpinResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserSpinResp)
                return object;
            var message = new $root.pqMsg.UserSpinResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.UserSpinResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            if (object.lotteryInfo != null) {
                if (typeof object.lotteryInfo !== "object")
                    throw TypeError(".pqMsg.UserSpinResp.lotteryInfo: object expected");
                message.lotteryInfo = $root.pqMsg.LotteryInfo.fromObject(object.lotteryInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserSpinResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserSpinResp
         * @static
         * @param {pqMsg.UserSpinResp} message UserSpinResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserSpinResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.result = null;
                object.lotteryInfo = null;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            if (message.lotteryInfo != null && message.hasOwnProperty("lotteryInfo"))
                object.lotteryInfo = $root.pqMsg.LotteryInfo.toObject(message.lotteryInfo, options);
            return object;
        };

        /**
         * Converts this UserSpinResp to JSON.
         * @function toJSON
         * @memberof pqMsg.UserSpinResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserSpinResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserSpinResp;
    })();

    pqMsg.AuthErrorResponse = (function() {

        /**
         * Properties of an AuthErrorResponse.
         * @memberof pqMsg
         * @interface IAuthErrorResponse
         * @property {pqMsg.ICommandResult|null} [result] AuthErrorResponse result
         */

        /**
         * Constructs a new AuthErrorResponse.
         * @memberof pqMsg
         * @classdesc Represents an AuthErrorResponse.
         * @implements IAuthErrorResponse
         * @constructor
         * @param {pqMsg.IAuthErrorResponse=} [properties] Properties to set
         */
        function AuthErrorResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthErrorResponse result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.AuthErrorResponse
         * @instance
         */
        AuthErrorResponse.prototype.result = null;

        /**
         * Creates a new AuthErrorResponse instance using the specified properties.
         * @function create
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {pqMsg.IAuthErrorResponse=} [properties] Properties to set
         * @returns {pqMsg.AuthErrorResponse} AuthErrorResponse instance
         */
        AuthErrorResponse.create = function create(properties) {
            return new AuthErrorResponse(properties);
        };

        /**
         * Encodes the specified AuthErrorResponse message. Does not implicitly {@link pqMsg.AuthErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {pqMsg.IAuthErrorResponse} message AuthErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthErrorResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AuthErrorResponse message, length delimited. Does not implicitly {@link pqMsg.AuthErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {pqMsg.IAuthErrorResponse} message AuthErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.AuthErrorResponse} AuthErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthErrorResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.AuthErrorResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AuthErrorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.AuthErrorResponse} AuthErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthErrorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthErrorResponse message.
         * @function verify
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthErrorResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            return null;
        };

        /**
         * Creates an AuthErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.AuthErrorResponse} AuthErrorResponse
         */
        AuthErrorResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.AuthErrorResponse)
                return object;
            var message = new $root.pqMsg.AuthErrorResponse();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.AuthErrorResponse.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            return message;
        };

        /**
         * Creates a plain object from an AuthErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.AuthErrorResponse
         * @static
         * @param {pqMsg.AuthErrorResponse} message AuthErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthErrorResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.result = null;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            return object;
        };

        /**
         * Converts this AuthErrorResponse to JSON.
         * @function toJSON
         * @memberof pqMsg.AuthErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthErrorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AuthErrorResponse;
    })();

    pqMsg.UserRefreshTokenReq = (function() {

        /**
         * Properties of a UserRefreshTokenReq.
         * @memberof pqMsg
         * @interface IUserRefreshTokenReq
         * @property {number|null} [userId] UserRefreshTokenReq userId
         */

        /**
         * Constructs a new UserRefreshTokenReq.
         * @memberof pqMsg
         * @classdesc Represents a UserRefreshTokenReq.
         * @implements IUserRefreshTokenReq
         * @constructor
         * @param {pqMsg.IUserRefreshTokenReq=} [properties] Properties to set
         */
        function UserRefreshTokenReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRefreshTokenReq userId.
         * @member {number} userId
         * @memberof pqMsg.UserRefreshTokenReq
         * @instance
         */
        UserRefreshTokenReq.prototype.userId = 0;

        /**
         * Creates a new UserRefreshTokenReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {pqMsg.IUserRefreshTokenReq=} [properties] Properties to set
         * @returns {pqMsg.UserRefreshTokenReq} UserRefreshTokenReq instance
         */
        UserRefreshTokenReq.create = function create(properties) {
            return new UserRefreshTokenReq(properties);
        };

        /**
         * Encodes the specified UserRefreshTokenReq message. Does not implicitly {@link pqMsg.UserRefreshTokenReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {pqMsg.IUserRefreshTokenReq} message UserRefreshTokenReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRefreshTokenReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified UserRefreshTokenReq message, length delimited. Does not implicitly {@link pqMsg.UserRefreshTokenReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {pqMsg.IUserRefreshTokenReq} message UserRefreshTokenReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRefreshTokenReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRefreshTokenReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserRefreshTokenReq} UserRefreshTokenReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRefreshTokenReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserRefreshTokenReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRefreshTokenReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserRefreshTokenReq} UserRefreshTokenReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRefreshTokenReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRefreshTokenReq message.
         * @function verify
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRefreshTokenReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a UserRefreshTokenReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserRefreshTokenReq} UserRefreshTokenReq
         */
        UserRefreshTokenReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserRefreshTokenReq)
                return object;
            var message = new $root.pqMsg.UserRefreshTokenReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a UserRefreshTokenReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserRefreshTokenReq
         * @static
         * @param {pqMsg.UserRefreshTokenReq} message UserRefreshTokenReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRefreshTokenReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this UserRefreshTokenReq to JSON.
         * @function toJSON
         * @memberof pqMsg.UserRefreshTokenReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRefreshTokenReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRefreshTokenReq;
    })();

    pqMsg.UserRefreshTokenResp = (function() {

        /**
         * Properties of a UserRefreshTokenResp.
         * @memberof pqMsg
         * @interface IUserRefreshTokenResp
         * @property {pqMsg.ICommandResult|null} [result] UserRefreshTokenResp result
         * @property {string|null} [pqToken] UserRefreshTokenResp pqToken
         */

        /**
         * Constructs a new UserRefreshTokenResp.
         * @memberof pqMsg
         * @classdesc Represents a UserRefreshTokenResp.
         * @implements IUserRefreshTokenResp
         * @constructor
         * @param {pqMsg.IUserRefreshTokenResp=} [properties] Properties to set
         */
        function UserRefreshTokenResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRefreshTokenResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.UserRefreshTokenResp
         * @instance
         */
        UserRefreshTokenResp.prototype.result = null;

        /**
         * UserRefreshTokenResp pqToken.
         * @member {string} pqToken
         * @memberof pqMsg.UserRefreshTokenResp
         * @instance
         */
        UserRefreshTokenResp.prototype.pqToken = "";

        /**
         * Creates a new UserRefreshTokenResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {pqMsg.IUserRefreshTokenResp=} [properties] Properties to set
         * @returns {pqMsg.UserRefreshTokenResp} UserRefreshTokenResp instance
         */
        UserRefreshTokenResp.create = function create(properties) {
            return new UserRefreshTokenResp(properties);
        };

        /**
         * Encodes the specified UserRefreshTokenResp message. Does not implicitly {@link pqMsg.UserRefreshTokenResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {pqMsg.IUserRefreshTokenResp} message UserRefreshTokenResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRefreshTokenResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.pqToken != null && Object.hasOwnProperty.call(message, "pqToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pqToken);
            return writer;
        };

        /**
         * Encodes the specified UserRefreshTokenResp message, length delimited. Does not implicitly {@link pqMsg.UserRefreshTokenResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {pqMsg.IUserRefreshTokenResp} message UserRefreshTokenResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRefreshTokenResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRefreshTokenResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserRefreshTokenResp} UserRefreshTokenResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRefreshTokenResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserRefreshTokenResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pqToken = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRefreshTokenResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserRefreshTokenResp} UserRefreshTokenResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRefreshTokenResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRefreshTokenResp message.
         * @function verify
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRefreshTokenResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.pqToken != null && message.hasOwnProperty("pqToken"))
                if (!$util.isString(message.pqToken))
                    return "pqToken: string expected";
            return null;
        };

        /**
         * Creates a UserRefreshTokenResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserRefreshTokenResp} UserRefreshTokenResp
         */
        UserRefreshTokenResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserRefreshTokenResp)
                return object;
            var message = new $root.pqMsg.UserRefreshTokenResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.UserRefreshTokenResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            if (object.pqToken != null)
                message.pqToken = String(object.pqToken);
            return message;
        };

        /**
         * Creates a plain object from a UserRefreshTokenResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserRefreshTokenResp
         * @static
         * @param {pqMsg.UserRefreshTokenResp} message UserRefreshTokenResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRefreshTokenResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.result = null;
                object.pqToken = "";
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            if (message.pqToken != null && message.hasOwnProperty("pqToken"))
                object.pqToken = message.pqToken;
            return object;
        };

        /**
         * Converts this UserRefreshTokenResp to JSON.
         * @function toJSON
         * @memberof pqMsg.UserRefreshTokenResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRefreshTokenResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRefreshTokenResp;
    })();

    pqMsg.GetUserGameDataReq = (function() {

        /**
         * Properties of a GetUserGameDataReq.
         * @memberof pqMsg
         * @interface IGetUserGameDataReq
         * @property {number|null} [userId] GetUserGameDataReq userId
         * @property {string|null} [gameCode] GetUserGameDataReq gameCode
         * @property {number|Long|null} [startTime] GetUserGameDataReq startTime
         * @property {number|Long|null} [endTime] GetUserGameDataReq endTime
         * @property {number|Long|null} [page] GetUserGameDataReq page
         * @property {number|Long|null} [limit] GetUserGameDataReq limit
         */

        /**
         * Constructs a new GetUserGameDataReq.
         * @memberof pqMsg
         * @classdesc Represents a GetUserGameDataReq.
         * @implements IGetUserGameDataReq
         * @constructor
         * @param {pqMsg.IGetUserGameDataReq=} [properties] Properties to set
         */
        function GetUserGameDataReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetUserGameDataReq userId.
         * @member {number} userId
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.userId = 0;

        /**
         * GetUserGameDataReq gameCode.
         * @member {string} gameCode
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.gameCode = "";

        /**
         * GetUserGameDataReq startTime.
         * @member {number|Long} startTime
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GetUserGameDataReq endTime.
         * @member {number|Long} endTime
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GetUserGameDataReq page.
         * @member {number|Long} page
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.page = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GetUserGameDataReq limit.
         * @member {number|Long} limit
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         */
        GetUserGameDataReq.prototype.limit = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GetUserGameDataReq instance using the specified properties.
         * @function create
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {pqMsg.IGetUserGameDataReq=} [properties] Properties to set
         * @returns {pqMsg.GetUserGameDataReq} GetUserGameDataReq instance
         */
        GetUserGameDataReq.create = function create(properties) {
            return new GetUserGameDataReq(properties);
        };

        /**
         * Encodes the specified GetUserGameDataReq message. Does not implicitly {@link pqMsg.GetUserGameDataReq.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {pqMsg.IGetUserGameDataReq} message GetUserGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUserGameDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameCode);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.endTime);
            if (message.page != null && Object.hasOwnProperty.call(message, "page"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.page);
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.limit);
            return writer;
        };

        /**
         * Encodes the specified GetUserGameDataReq message, length delimited. Does not implicitly {@link pqMsg.GetUserGameDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {pqMsg.IGetUserGameDataReq} message GetUserGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUserGameDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetUserGameDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.GetUserGameDataReq} GetUserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUserGameDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.GetUserGameDataReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                case 2:
                    message.gameCode = reader.string();
                    break;
                case 3:
                    message.startTime = reader.int64();
                    break;
                case 4:
                    message.endTime = reader.int64();
                    break;
                case 5:
                    message.page = reader.int64();
                    break;
                case 6:
                    message.limit = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetUserGameDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.GetUserGameDataReq} GetUserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUserGameDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetUserGameDataReq message.
         * @function verify
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetUserGameDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.page != null && message.hasOwnProperty("page"))
                if (!$util.isInteger(message.page) && !(message.page && $util.isInteger(message.page.low) && $util.isInteger(message.page.high)))
                    return "page: integer|Long expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit) && !(message.limit && $util.isInteger(message.limit.low) && $util.isInteger(message.limit.high)))
                    return "limit: integer|Long expected";
            return null;
        };

        /**
         * Creates a GetUserGameDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.GetUserGameDataReq} GetUserGameDataReq
         */
        GetUserGameDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.GetUserGameDataReq)
                return object;
            var message = new $root.pqMsg.GetUserGameDataReq();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = false;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            if (object.page != null)
                if ($util.Long)
                    (message.page = $util.Long.fromValue(object.page)).unsigned = false;
                else if (typeof object.page === "string")
                    message.page = parseInt(object.page, 10);
                else if (typeof object.page === "number")
                    message.page = object.page;
                else if (typeof object.page === "object")
                    message.page = new $util.LongBits(object.page.low >>> 0, object.page.high >>> 0).toNumber();
            if (object.limit != null)
                if ($util.Long)
                    (message.limit = $util.Long.fromValue(object.limit)).unsigned = false;
                else if (typeof object.limit === "string")
                    message.limit = parseInt(object.limit, 10);
                else if (typeof object.limit === "number")
                    message.limit = object.limit;
                else if (typeof object.limit === "object")
                    message.limit = new $util.LongBits(object.limit.low >>> 0, object.limit.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GetUserGameDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.GetUserGameDataReq
         * @static
         * @param {pqMsg.GetUserGameDataReq} message GetUserGameDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetUserGameDataReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.gameCode = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.page = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.page = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.limit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.limit = options.longs === String ? "0" : 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            if (message.page != null && message.hasOwnProperty("page"))
                if (typeof message.page === "number")
                    object.page = options.longs === String ? String(message.page) : message.page;
                else
                    object.page = options.longs === String ? $util.Long.prototype.toString.call(message.page) : options.longs === Number ? new $util.LongBits(message.page.low >>> 0, message.page.high >>> 0).toNumber() : message.page;
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (typeof message.limit === "number")
                    object.limit = options.longs === String ? String(message.limit) : message.limit;
                else
                    object.limit = options.longs === String ? $util.Long.prototype.toString.call(message.limit) : options.longs === Number ? new $util.LongBits(message.limit.low >>> 0, message.limit.high >>> 0).toNumber() : message.limit;
            return object;
        };

        /**
         * Converts this GetUserGameDataReq to JSON.
         * @function toJSON
         * @memberof pqMsg.GetUserGameDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetUserGameDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetUserGameDataReq;
    })();

    pqMsg.GetUserGameDataResp = (function() {

        /**
         * Properties of a GetUserGameDataResp.
         * @memberof pqMsg
         * @interface IGetUserGameDataResp
         * @property {pqMsg.ICommandResult|null} [result] GetUserGameDataResp result
         * @property {Array.<pqMsg.ILotteryInfo>|null} [history] GetUserGameDataResp history
         */

        /**
         * Constructs a new GetUserGameDataResp.
         * @memberof pqMsg
         * @classdesc Represents a GetUserGameDataResp.
         * @implements IGetUserGameDataResp
         * @constructor
         * @param {pqMsg.IGetUserGameDataResp=} [properties] Properties to set
         */
        function GetUserGameDataResp(properties) {
            this.history = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetUserGameDataResp result.
         * @member {pqMsg.ICommandResult|null|undefined} result
         * @memberof pqMsg.GetUserGameDataResp
         * @instance
         */
        GetUserGameDataResp.prototype.result = null;

        /**
         * GetUserGameDataResp history.
         * @member {Array.<pqMsg.ILotteryInfo>} history
         * @memberof pqMsg.GetUserGameDataResp
         * @instance
         */
        GetUserGameDataResp.prototype.history = $util.emptyArray;

        /**
         * Creates a new GetUserGameDataResp instance using the specified properties.
         * @function create
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {pqMsg.IGetUserGameDataResp=} [properties] Properties to set
         * @returns {pqMsg.GetUserGameDataResp} GetUserGameDataResp instance
         */
        GetUserGameDataResp.create = function create(properties) {
            return new GetUserGameDataResp(properties);
        };

        /**
         * Encodes the specified GetUserGameDataResp message. Does not implicitly {@link pqMsg.GetUserGameDataResp.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {pqMsg.IGetUserGameDataResp} message GetUserGameDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUserGameDataResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pqMsg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.history != null && message.history.length)
                for (var i = 0; i < message.history.length; ++i)
                    $root.pqMsg.LotteryInfo.encode(message.history[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetUserGameDataResp message, length delimited. Does not implicitly {@link pqMsg.GetUserGameDataResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {pqMsg.IGetUserGameDataResp} message GetUserGameDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUserGameDataResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetUserGameDataResp message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.GetUserGameDataResp} GetUserGameDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUserGameDataResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.GetUserGameDataResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.pqMsg.CommandResult.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.history && message.history.length))
                        message.history = [];
                    message.history.push($root.pqMsg.LotteryInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetUserGameDataResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.GetUserGameDataResp} GetUserGameDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUserGameDataResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetUserGameDataResp message.
         * @function verify
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetUserGameDataResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pqMsg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.history != null && message.hasOwnProperty("history")) {
                if (!Array.isArray(message.history))
                    return "history: array expected";
                for (var i = 0; i < message.history.length; ++i) {
                    var error = $root.pqMsg.LotteryInfo.verify(message.history[i]);
                    if (error)
                        return "history." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetUserGameDataResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.GetUserGameDataResp} GetUserGameDataResp
         */
        GetUserGameDataResp.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.GetUserGameDataResp)
                return object;
            var message = new $root.pqMsg.GetUserGameDataResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pqMsg.GetUserGameDataResp.result: object expected");
                message.result = $root.pqMsg.CommandResult.fromObject(object.result);
            }
            if (object.history) {
                if (!Array.isArray(object.history))
                    throw TypeError(".pqMsg.GetUserGameDataResp.history: array expected");
                message.history = [];
                for (var i = 0; i < object.history.length; ++i) {
                    if (typeof object.history[i] !== "object")
                        throw TypeError(".pqMsg.GetUserGameDataResp.history: object expected");
                    message.history[i] = $root.pqMsg.LotteryInfo.fromObject(object.history[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetUserGameDataResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.GetUserGameDataResp
         * @static
         * @param {pqMsg.GetUserGameDataResp} message GetUserGameDataResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetUserGameDataResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.history = [];
            if (options.defaults)
                object.result = null;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pqMsg.CommandResult.toObject(message.result, options);
            if (message.history && message.history.length) {
                object.history = [];
                for (var j = 0; j < message.history.length; ++j)
                    object.history[j] = $root.pqMsg.LotteryInfo.toObject(message.history[j], options);
            }
            return object;
        };

        /**
         * Converts this GetUserGameDataResp to JSON.
         * @function toJSON
         * @memberof pqMsg.GetUserGameDataResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetUserGameDataResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetUserGameDataResp;
    })();

    pqMsg.CommandResult = (function() {

        /**
         * Properties of a CommandResult.
         * @memberof pqMsg
         * @interface ICommandResult
         * @property {pqMsg.CommandResult.ResultCode|null} [resultCode] CommandResult resultCode
         * @property {string|null} [message] CommandResult message
         * @property {number|Long|null} [serverTime] CommandResult serverTime
         */

        /**
         * Constructs a new CommandResult.
         * @memberof pqMsg
         * @classdesc Represents a CommandResult.
         * @implements ICommandResult
         * @constructor
         * @param {pqMsg.ICommandResult=} [properties] Properties to set
         */
        function CommandResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommandResult resultCode.
         * @member {pqMsg.CommandResult.ResultCode} resultCode
         * @memberof pqMsg.CommandResult
         * @instance
         */
        CommandResult.prototype.resultCode = 0;

        /**
         * CommandResult message.
         * @member {string} message
         * @memberof pqMsg.CommandResult
         * @instance
         */
        CommandResult.prototype.message = "";

        /**
         * CommandResult serverTime.
         * @member {number|Long} serverTime
         * @memberof pqMsg.CommandResult
         * @instance
         */
        CommandResult.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new CommandResult instance using the specified properties.
         * @function create
         * @memberof pqMsg.CommandResult
         * @static
         * @param {pqMsg.ICommandResult=} [properties] Properties to set
         * @returns {pqMsg.CommandResult} CommandResult instance
         */
        CommandResult.create = function create(properties) {
            return new CommandResult(properties);
        };

        /**
         * Encodes the specified CommandResult message. Does not implicitly {@link pqMsg.CommandResult.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.CommandResult
         * @static
         * @param {pqMsg.ICommandResult} message CommandResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.resultCode);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.serverTime);
            return writer;
        };

        /**
         * Encodes the specified CommandResult message, length delimited. Does not implicitly {@link pqMsg.CommandResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.CommandResult
         * @static
         * @param {pqMsg.ICommandResult} message CommandResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommandResult message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.CommandResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.CommandResult} CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.CommandResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.resultCode = reader.int32();
                    break;
                case 3:
                    message.message = reader.string();
                    break;
                case 4:
                    message.serverTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommandResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.CommandResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.CommandResult} CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommandResult message.
         * @function verify
         * @memberof pqMsg.CommandResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommandResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                switch (message.resultCode) {
                default:
                    return "resultCode: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a CommandResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.CommandResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.CommandResult} CommandResult
         */
        CommandResult.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.CommandResult)
                return object;
            var message = new $root.pqMsg.CommandResult();
            switch (object.resultCode) {
            case "Success":
            case 0:
                message.resultCode = 0;
                break;
            case "DataIllegal":
            case 1:
                message.resultCode = 1;
                break;
            case "InvalidUser":
            case 2:
                message.resultCode = 2;
                break;
            case "CenterServerDisconnect":
            case 3:
                message.resultCode = 3;
                break;
            case "Unauthorized":
            case 4:
                message.resultCode = 4;
                break;
            case "NotEnoughMinEntryAmount":
            case 5:
                message.resultCode = 5;
                break;
            case "ChipDoesNotExist":
            case 6:
                message.resultCode = 6;
                break;
            case "BalanceNotEnough":
            case 7:
                message.resultCode = 7;
                break;
            case "GameDoesNotExist":
            case 8:
                message.resultCode = 8;
                break;
            case "TokenDoesNotExist":
            case 9:
                message.resultCode = 9;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CommandResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.CommandResult
         * @static
         * @param {pqMsg.CommandResult} message CommandResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommandResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.resultCode = options.enums === String ? "Success" : 0;
                object.message = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
            }
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                object.resultCode = options.enums === String ? $root.pqMsg.CommandResult.ResultCode[message.resultCode] : message.resultCode;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            return object;
        };

        /**
         * Converts this CommandResult to JSON.
         * @function toJSON
         * @memberof pqMsg.CommandResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommandResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * ResultCode enum.
         * @name pqMsg.CommandResult.ResultCode
         * @enum {number}
         * @property {number} Success=0 Success value
         * @property {number} DataIllegal=1 DataIllegal value
         * @property {number} InvalidUser=2 InvalidUser value
         * @property {number} CenterServerDisconnect=3 CenterServerDisconnect value
         * @property {number} Unauthorized=4 Unauthorized value
         * @property {number} NotEnoughMinEntryAmount=5 NotEnoughMinEntryAmount value
         * @property {number} ChipDoesNotExist=6 ChipDoesNotExist value
         * @property {number} BalanceNotEnough=7 BalanceNotEnough value
         * @property {number} GameDoesNotExist=8 GameDoesNotExist value
         * @property {number} TokenDoesNotExist=9 TokenDoesNotExist value
         */
        CommandResult.ResultCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "DataIllegal"] = 1;
            values[valuesById[2] = "InvalidUser"] = 2;
            values[valuesById[3] = "CenterServerDisconnect"] = 3;
            values[valuesById[4] = "Unauthorized"] = 4;
            values[valuesById[5] = "NotEnoughMinEntryAmount"] = 5;
            values[valuesById[6] = "ChipDoesNotExist"] = 6;
            values[valuesById[7] = "BalanceNotEnough"] = 7;
            values[valuesById[8] = "GameDoesNotExist"] = 8;
            values[valuesById[9] = "TokenDoesNotExist"] = 9;
            return values;
        })();

        return CommandResult;
    })();

    pqMsg.UserInfo = (function() {

        /**
         * Properties of a UserInfo.
         * @memberof pqMsg
         * @interface IUserInfo
         * @property {number|null} [userId] UserInfo userId
         * @property {string|null} [userName] UserInfo userName
         * @property {string|null} [headUrl] UserInfo headUrl
         * @property {number|null} [balance] UserInfo balance
         * @property {number|null} [lockBalance] UserInfo lockBalance
         * @property {string|null} [pqToken] UserInfo pqToken
         */

        /**
         * Constructs a new UserInfo.
         * @memberof pqMsg
         * @classdesc Represents a UserInfo.
         * @implements IUserInfo
         * @constructor
         * @param {pqMsg.IUserInfo=} [properties] Properties to set
         */
        function UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfo userId.
         * @member {number} userId
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.userId = 0;

        /**
         * UserInfo userName.
         * @member {string} userName
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.userName = "";

        /**
         * UserInfo headUrl.
         * @member {string} headUrl
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.headUrl = "";

        /**
         * UserInfo balance.
         * @member {number} balance
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.balance = 0;

        /**
         * UserInfo lockBalance.
         * @member {number} lockBalance
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.lockBalance = 0;

        /**
         * UserInfo pqToken.
         * @member {string} pqToken
         * @memberof pqMsg.UserInfo
         * @instance
         */
        UserInfo.prototype.pqToken = "";

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @function create
         * @memberof pqMsg.UserInfo
         * @static
         * @param {pqMsg.IUserInfo=} [properties] Properties to set
         * @returns {pqMsg.UserInfo} UserInfo instance
         */
        UserInfo.create = function create(properties) {
            return new UserInfo(properties);
        };

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link pqMsg.UserInfo.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.UserInfo
         * @static
         * @param {pqMsg.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
            if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.headUrl);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.balance);
            if (message.lockBalance != null && Object.hasOwnProperty.call(message, "lockBalance"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.lockBalance);
            if (message.pqToken != null && Object.hasOwnProperty.call(message, "pqToken"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.pqToken);
            return writer;
        };

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link pqMsg.UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.UserInfo
         * @static
         * @param {pqMsg.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.uint32();
                    break;
                case 2:
                    message.userName = reader.string();
                    break;
                case 3:
                    message.headUrl = reader.string();
                    break;
                case 4:
                    message.balance = reader.double();
                    break;
                case 5:
                    message.lockBalance = reader.double();
                    break;
                case 6:
                    message.pqToken = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfo message.
         * @function verify
         * @memberof pqMsg.UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.userName != null && message.hasOwnProperty("userName"))
                if (!$util.isString(message.userName))
                    return "userName: string expected";
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                if (!$util.isString(message.headUrl))
                    return "headUrl: string expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockBalance != null && message.hasOwnProperty("lockBalance"))
                if (typeof message.lockBalance !== "number")
                    return "lockBalance: number expected";
            if (message.pqToken != null && message.hasOwnProperty("pqToken"))
                if (!$util.isString(message.pqToken))
                    return "pqToken: string expected";
            return null;
        };

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.UserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.UserInfo} UserInfo
         */
        UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.UserInfo)
                return object;
            var message = new $root.pqMsg.UserInfo();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockBalance != null)
                message.lockBalance = Number(object.lockBalance);
            if (object.pqToken != null)
                message.pqToken = String(object.pqToken);
            return message;
        };

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.UserInfo
         * @static
         * @param {pqMsg.UserInfo} message UserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.userName = "";
                object.headUrl = "";
                object.balance = 0;
                object.lockBalance = 0;
                object.pqToken = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userName != null && message.hasOwnProperty("userName"))
                object.userName = message.userName;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockBalance != null && message.hasOwnProperty("lockBalance"))
                object.lockBalance = options.json && !isFinite(message.lockBalance) ? String(message.lockBalance) : message.lockBalance;
            if (message.pqToken != null && message.hasOwnProperty("pqToken"))
                object.pqToken = message.pqToken;
            return object;
        };

        /**
         * Converts this UserInfo to JSON.
         * @function toJSON
         * @memberof pqMsg.UserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfo;
    })();

    pqMsg.OneLotteryInfo = (function() {

        /**
         * Properties of an OneLotteryInfo.
         * @memberof pqMsg
         * @interface IOneLotteryInfo
         * @property {string|null} [betId] OneLotteryInfo betId
         * @property {number|null} [winMultiplier] OneLotteryInfo winMultiplier
         * @property {Array.<pqMsg.OneLotteryInfo.ISymbolList>|null} [allSymbols] OneLotteryInfo allSymbols
         * @property {boolean|null} [isFree] OneLotteryInfo isFree
         * @property {number|null} [getFreeCount] OneLotteryInfo getFreeCount
         * @property {number|null} [winMoney] OneLotteryInfo winMoney
         * @property {number|null} [balance] OneLotteryInfo balance
         * @property {Array.<pqMsg.OneLotteryInfo.IWinInfo>|null} [winInfoList] OneLotteryInfo winInfoList
         */

        /**
         * Constructs a new OneLotteryInfo.
         * @memberof pqMsg
         * @classdesc Represents an OneLotteryInfo.
         * @implements IOneLotteryInfo
         * @constructor
         * @param {pqMsg.IOneLotteryInfo=} [properties] Properties to set
         */
        function OneLotteryInfo(properties) {
            this.allSymbols = [];
            this.winInfoList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OneLotteryInfo betId.
         * @member {string} betId
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.betId = "";

        /**
         * OneLotteryInfo winMultiplier.
         * @member {number} winMultiplier
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.winMultiplier = 0;

        /**
         * OneLotteryInfo allSymbols.
         * @member {Array.<pqMsg.OneLotteryInfo.ISymbolList>} allSymbols
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.allSymbols = $util.emptyArray;

        /**
         * OneLotteryInfo isFree.
         * @member {boolean} isFree
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.isFree = false;

        /**
         * OneLotteryInfo getFreeCount.
         * @member {number} getFreeCount
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.getFreeCount = 0;

        /**
         * OneLotteryInfo winMoney.
         * @member {number} winMoney
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.winMoney = 0;

        /**
         * OneLotteryInfo balance.
         * @member {number} balance
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.balance = 0;

        /**
         * OneLotteryInfo winInfoList.
         * @member {Array.<pqMsg.OneLotteryInfo.IWinInfo>} winInfoList
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         */
        OneLotteryInfo.prototype.winInfoList = $util.emptyArray;

        /**
         * Creates a new OneLotteryInfo instance using the specified properties.
         * @function create
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {pqMsg.IOneLotteryInfo=} [properties] Properties to set
         * @returns {pqMsg.OneLotteryInfo} OneLotteryInfo instance
         */
        OneLotteryInfo.create = function create(properties) {
            return new OneLotteryInfo(properties);
        };

        /**
         * Encodes the specified OneLotteryInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {pqMsg.IOneLotteryInfo} message OneLotteryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneLotteryInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.betId != null && Object.hasOwnProperty.call(message, "betId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.betId);
            if (message.winMultiplier != null && Object.hasOwnProperty.call(message, "winMultiplier"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.winMultiplier);
            if (message.allSymbols != null && message.allSymbols.length)
                for (var i = 0; i < message.allSymbols.length; ++i)
                    $root.pqMsg.OneLotteryInfo.SymbolList.encode(message.allSymbols[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.isFree != null && Object.hasOwnProperty.call(message, "isFree"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isFree);
            if (message.getFreeCount != null && Object.hasOwnProperty.call(message, "getFreeCount"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.getFreeCount);
            if (message.winMoney != null && Object.hasOwnProperty.call(message, "winMoney"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.winMoney);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.balance);
            if (message.winInfoList != null && message.winInfoList.length)
                for (var i = 0; i < message.winInfoList.length; ++i)
                    $root.pqMsg.OneLotteryInfo.WinInfo.encode(message.winInfoList[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OneLotteryInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {pqMsg.IOneLotteryInfo} message OneLotteryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneLotteryInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OneLotteryInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.OneLotteryInfo} OneLotteryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneLotteryInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.OneLotteryInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.betId = reader.string();
                    break;
                case 2:
                    message.winMultiplier = reader.uint32();
                    break;
                case 3:
                    if (!(message.allSymbols && message.allSymbols.length))
                        message.allSymbols = [];
                    message.allSymbols.push($root.pqMsg.OneLotteryInfo.SymbolList.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.isFree = reader.bool();
                    break;
                case 5:
                    message.getFreeCount = reader.uint32();
                    break;
                case 6:
                    message.winMoney = reader.double();
                    break;
                case 7:
                    message.balance = reader.double();
                    break;
                case 8:
                    if (!(message.winInfoList && message.winInfoList.length))
                        message.winInfoList = [];
                    message.winInfoList.push($root.pqMsg.OneLotteryInfo.WinInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OneLotteryInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.OneLotteryInfo} OneLotteryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneLotteryInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OneLotteryInfo message.
         * @function verify
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OneLotteryInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.betId != null && message.hasOwnProperty("betId"))
                if (!$util.isString(message.betId))
                    return "betId: string expected";
            if (message.winMultiplier != null && message.hasOwnProperty("winMultiplier"))
                if (!$util.isInteger(message.winMultiplier))
                    return "winMultiplier: integer expected";
            if (message.allSymbols != null && message.hasOwnProperty("allSymbols")) {
                if (!Array.isArray(message.allSymbols))
                    return "allSymbols: array expected";
                for (var i = 0; i < message.allSymbols.length; ++i) {
                    var error = $root.pqMsg.OneLotteryInfo.SymbolList.verify(message.allSymbols[i]);
                    if (error)
                        return "allSymbols." + error;
                }
            }
            if (message.isFree != null && message.hasOwnProperty("isFree"))
                if (typeof message.isFree !== "boolean")
                    return "isFree: boolean expected";
            if (message.getFreeCount != null && message.hasOwnProperty("getFreeCount"))
                if (!$util.isInteger(message.getFreeCount))
                    return "getFreeCount: integer expected";
            if (message.winMoney != null && message.hasOwnProperty("winMoney"))
                if (typeof message.winMoney !== "number")
                    return "winMoney: number expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.winInfoList != null && message.hasOwnProperty("winInfoList")) {
                if (!Array.isArray(message.winInfoList))
                    return "winInfoList: array expected";
                for (var i = 0; i < message.winInfoList.length; ++i) {
                    var error = $root.pqMsg.OneLotteryInfo.WinInfo.verify(message.winInfoList[i]);
                    if (error)
                        return "winInfoList." + error;
                }
            }
            return null;
        };

        /**
         * Creates an OneLotteryInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.OneLotteryInfo} OneLotteryInfo
         */
        OneLotteryInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.OneLotteryInfo)
                return object;
            var message = new $root.pqMsg.OneLotteryInfo();
            if (object.betId != null)
                message.betId = String(object.betId);
            if (object.winMultiplier != null)
                message.winMultiplier = object.winMultiplier >>> 0;
            if (object.allSymbols) {
                if (!Array.isArray(object.allSymbols))
                    throw TypeError(".pqMsg.OneLotteryInfo.allSymbols: array expected");
                message.allSymbols = [];
                for (var i = 0; i < object.allSymbols.length; ++i) {
                    if (typeof object.allSymbols[i] !== "object")
                        throw TypeError(".pqMsg.OneLotteryInfo.allSymbols: object expected");
                    message.allSymbols[i] = $root.pqMsg.OneLotteryInfo.SymbolList.fromObject(object.allSymbols[i]);
                }
            }
            if (object.isFree != null)
                message.isFree = Boolean(object.isFree);
            if (object.getFreeCount != null)
                message.getFreeCount = object.getFreeCount >>> 0;
            if (object.winMoney != null)
                message.winMoney = Number(object.winMoney);
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.winInfoList) {
                if (!Array.isArray(object.winInfoList))
                    throw TypeError(".pqMsg.OneLotteryInfo.winInfoList: array expected");
                message.winInfoList = [];
                for (var i = 0; i < object.winInfoList.length; ++i) {
                    if (typeof object.winInfoList[i] !== "object")
                        throw TypeError(".pqMsg.OneLotteryInfo.winInfoList: object expected");
                    message.winInfoList[i] = $root.pqMsg.OneLotteryInfo.WinInfo.fromObject(object.winInfoList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an OneLotteryInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.OneLotteryInfo
         * @static
         * @param {pqMsg.OneLotteryInfo} message OneLotteryInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OneLotteryInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.allSymbols = [];
                object.winInfoList = [];
            }
            if (options.defaults) {
                object.betId = "";
                object.winMultiplier = 0;
                object.isFree = false;
                object.getFreeCount = 0;
                object.winMoney = 0;
                object.balance = 0;
            }
            if (message.betId != null && message.hasOwnProperty("betId"))
                object.betId = message.betId;
            if (message.winMultiplier != null && message.hasOwnProperty("winMultiplier"))
                object.winMultiplier = message.winMultiplier;
            if (message.allSymbols && message.allSymbols.length) {
                object.allSymbols = [];
                for (var j = 0; j < message.allSymbols.length; ++j)
                    object.allSymbols[j] = $root.pqMsg.OneLotteryInfo.SymbolList.toObject(message.allSymbols[j], options);
            }
            if (message.isFree != null && message.hasOwnProperty("isFree"))
                object.isFree = message.isFree;
            if (message.getFreeCount != null && message.hasOwnProperty("getFreeCount"))
                object.getFreeCount = message.getFreeCount;
            if (message.winMoney != null && message.hasOwnProperty("winMoney"))
                object.winMoney = options.json && !isFinite(message.winMoney) ? String(message.winMoney) : message.winMoney;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.winInfoList && message.winInfoList.length) {
                object.winInfoList = [];
                for (var j = 0; j < message.winInfoList.length; ++j)
                    object.winInfoList[j] = $root.pqMsg.OneLotteryInfo.WinInfo.toObject(message.winInfoList[j], options);
            }
            return object;
        };

        /**
         * Converts this OneLotteryInfo to JSON.
         * @function toJSON
         * @memberof pqMsg.OneLotteryInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OneLotteryInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        OneLotteryInfo.SymbolInfo = (function() {

            /**
             * Properties of a SymbolInfo.
             * @memberof pqMsg.OneLotteryInfo
             * @interface ISymbolInfo
             * @property {number|null} [symbolId] SymbolInfo symbolId
             * @property {boolean|null} [isGold] SymbolInfo isGold
             * @property {boolean|null} [isLucky] SymbolInfo isLucky
             */

            /**
             * Constructs a new SymbolInfo.
             * @memberof pqMsg.OneLotteryInfo
             * @classdesc Represents a SymbolInfo.
             * @implements ISymbolInfo
             * @constructor
             * @param {pqMsg.OneLotteryInfo.ISymbolInfo=} [properties] Properties to set
             */
            function SymbolInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SymbolInfo symbolId.
             * @member {number} symbolId
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @instance
             */
            SymbolInfo.prototype.symbolId = 0;

            /**
             * SymbolInfo isGold.
             * @member {boolean} isGold
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @instance
             */
            SymbolInfo.prototype.isGold = false;

            /**
             * SymbolInfo isLucky.
             * @member {boolean} isLucky
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @instance
             */
            SymbolInfo.prototype.isLucky = false;

            /**
             * Creates a new SymbolInfo instance using the specified properties.
             * @function create
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolInfo=} [properties] Properties to set
             * @returns {pqMsg.OneLotteryInfo.SymbolInfo} SymbolInfo instance
             */
            SymbolInfo.create = function create(properties) {
                return new SymbolInfo(properties);
            };

            /**
             * Encodes the specified SymbolInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolInfo.verify|verify} messages.
             * @function encode
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolInfo} message SymbolInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SymbolInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.symbolId != null && Object.hasOwnProperty.call(message, "symbolId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.symbolId);
                if (message.isGold != null && Object.hasOwnProperty.call(message, "isGold"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isGold);
                if (message.isLucky != null && Object.hasOwnProperty.call(message, "isLucky"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isLucky);
                return writer;
            };

            /**
             * Encodes the specified SymbolInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolInfo} message SymbolInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SymbolInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SymbolInfo message from the specified reader or buffer.
             * @function decode
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pqMsg.OneLotteryInfo.SymbolInfo} SymbolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SymbolInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.OneLotteryInfo.SymbolInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.symbolId = reader.uint32();
                        break;
                    case 2:
                        message.isGold = reader.bool();
                        break;
                    case 3:
                        message.isLucky = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SymbolInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pqMsg.OneLotteryInfo.SymbolInfo} SymbolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SymbolInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SymbolInfo message.
             * @function verify
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SymbolInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.symbolId != null && message.hasOwnProperty("symbolId"))
                    if (!$util.isInteger(message.symbolId))
                        return "symbolId: integer expected";
                if (message.isGold != null && message.hasOwnProperty("isGold"))
                    if (typeof message.isGold !== "boolean")
                        return "isGold: boolean expected";
                if (message.isLucky != null && message.hasOwnProperty("isLucky"))
                    if (typeof message.isLucky !== "boolean")
                        return "isLucky: boolean expected";
                return null;
            };

            /**
             * Creates a SymbolInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pqMsg.OneLotteryInfo.SymbolInfo} SymbolInfo
             */
            SymbolInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.pqMsg.OneLotteryInfo.SymbolInfo)
                    return object;
                var message = new $root.pqMsg.OneLotteryInfo.SymbolInfo();
                if (object.symbolId != null)
                    message.symbolId = object.symbolId >>> 0;
                if (object.isGold != null)
                    message.isGold = Boolean(object.isGold);
                if (object.isLucky != null)
                    message.isLucky = Boolean(object.isLucky);
                return message;
            };

            /**
             * Creates a plain object from a SymbolInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.SymbolInfo} message SymbolInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SymbolInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.symbolId = 0;
                    object.isGold = false;
                    object.isLucky = false;
                }
                if (message.symbolId != null && message.hasOwnProperty("symbolId"))
                    object.symbolId = message.symbolId;
                if (message.isGold != null && message.hasOwnProperty("isGold"))
                    object.isGold = message.isGold;
                if (message.isLucky != null && message.hasOwnProperty("isLucky"))
                    object.isLucky = message.isLucky;
                return object;
            };

            /**
             * Converts this SymbolInfo to JSON.
             * @function toJSON
             * @memberof pqMsg.OneLotteryInfo.SymbolInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SymbolInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SymbolInfo;
        })();

        OneLotteryInfo.SymbolList = (function() {

            /**
             * Properties of a SymbolList.
             * @memberof pqMsg.OneLotteryInfo
             * @interface ISymbolList
             * @property {Array.<pqMsg.OneLotteryInfo.ISymbolInfo>|null} [reelSymbols] SymbolList reelSymbols
             */

            /**
             * Constructs a new SymbolList.
             * @memberof pqMsg.OneLotteryInfo
             * @classdesc Represents a SymbolList.
             * @implements ISymbolList
             * @constructor
             * @param {pqMsg.OneLotteryInfo.ISymbolList=} [properties] Properties to set
             */
            function SymbolList(properties) {
                this.reelSymbols = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SymbolList reelSymbols.
             * @member {Array.<pqMsg.OneLotteryInfo.ISymbolInfo>} reelSymbols
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @instance
             */
            SymbolList.prototype.reelSymbols = $util.emptyArray;

            /**
             * Creates a new SymbolList instance using the specified properties.
             * @function create
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolList=} [properties] Properties to set
             * @returns {pqMsg.OneLotteryInfo.SymbolList} SymbolList instance
             */
            SymbolList.create = function create(properties) {
                return new SymbolList(properties);
            };

            /**
             * Encodes the specified SymbolList message. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolList.verify|verify} messages.
             * @function encode
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolList} message SymbolList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SymbolList.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.reelSymbols != null && message.reelSymbols.length)
                    for (var i = 0; i < message.reelSymbols.length; ++i)
                        $root.pqMsg.OneLotteryInfo.SymbolInfo.encode(message.reelSymbols[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SymbolList message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.SymbolList.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {pqMsg.OneLotteryInfo.ISymbolList} message SymbolList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SymbolList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SymbolList message from the specified reader or buffer.
             * @function decode
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pqMsg.OneLotteryInfo.SymbolList} SymbolList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SymbolList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.OneLotteryInfo.SymbolList();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.reelSymbols && message.reelSymbols.length))
                            message.reelSymbols = [];
                        message.reelSymbols.push($root.pqMsg.OneLotteryInfo.SymbolInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SymbolList message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pqMsg.OneLotteryInfo.SymbolList} SymbolList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SymbolList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SymbolList message.
             * @function verify
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SymbolList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.reelSymbols != null && message.hasOwnProperty("reelSymbols")) {
                    if (!Array.isArray(message.reelSymbols))
                        return "reelSymbols: array expected";
                    for (var i = 0; i < message.reelSymbols.length; ++i) {
                        var error = $root.pqMsg.OneLotteryInfo.SymbolInfo.verify(message.reelSymbols[i]);
                        if (error)
                            return "reelSymbols." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a SymbolList message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pqMsg.OneLotteryInfo.SymbolList} SymbolList
             */
            SymbolList.fromObject = function fromObject(object) {
                if (object instanceof $root.pqMsg.OneLotteryInfo.SymbolList)
                    return object;
                var message = new $root.pqMsg.OneLotteryInfo.SymbolList();
                if (object.reelSymbols) {
                    if (!Array.isArray(object.reelSymbols))
                        throw TypeError(".pqMsg.OneLotteryInfo.SymbolList.reelSymbols: array expected");
                    message.reelSymbols = [];
                    for (var i = 0; i < object.reelSymbols.length; ++i) {
                        if (typeof object.reelSymbols[i] !== "object")
                            throw TypeError(".pqMsg.OneLotteryInfo.SymbolList.reelSymbols: object expected");
                        message.reelSymbols[i] = $root.pqMsg.OneLotteryInfo.SymbolInfo.fromObject(object.reelSymbols[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a SymbolList message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @static
             * @param {pqMsg.OneLotteryInfo.SymbolList} message SymbolList
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SymbolList.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.reelSymbols = [];
                if (message.reelSymbols && message.reelSymbols.length) {
                    object.reelSymbols = [];
                    for (var j = 0; j < message.reelSymbols.length; ++j)
                        object.reelSymbols[j] = $root.pqMsg.OneLotteryInfo.SymbolInfo.toObject(message.reelSymbols[j], options);
                }
                return object;
            };

            /**
             * Converts this SymbolList to JSON.
             * @function toJSON
             * @memberof pqMsg.OneLotteryInfo.SymbolList
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SymbolList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SymbolList;
        })();

        OneLotteryInfo.WinInfo = (function() {

            /**
             * Properties of a WinInfo.
             * @memberof pqMsg.OneLotteryInfo
             * @interface IWinInfo
             * @property {number|null} [symbolId] WinInfo symbolId
             * @property {Array.<number>|null} [lineList] WinInfo lineList
             */

            /**
             * Constructs a new WinInfo.
             * @memberof pqMsg.OneLotteryInfo
             * @classdesc Represents a WinInfo.
             * @implements IWinInfo
             * @constructor
             * @param {pqMsg.OneLotteryInfo.IWinInfo=} [properties] Properties to set
             */
            function WinInfo(properties) {
                this.lineList = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WinInfo symbolId.
             * @member {number} symbolId
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @instance
             */
            WinInfo.prototype.symbolId = 0;

            /**
             * WinInfo lineList.
             * @member {Array.<number>} lineList
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @instance
             */
            WinInfo.prototype.lineList = $util.emptyArray;

            /**
             * Creates a new WinInfo instance using the specified properties.
             * @function create
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.IWinInfo=} [properties] Properties to set
             * @returns {pqMsg.OneLotteryInfo.WinInfo} WinInfo instance
             */
            WinInfo.create = function create(properties) {
                return new WinInfo(properties);
            };

            /**
             * Encodes the specified WinInfo message. Does not implicitly {@link pqMsg.OneLotteryInfo.WinInfo.verify|verify} messages.
             * @function encode
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.IWinInfo} message WinInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WinInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.symbolId != null && Object.hasOwnProperty.call(message, "symbolId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.symbolId);
                if (message.lineList != null && message.lineList.length) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork();
                    for (var i = 0; i < message.lineList.length; ++i)
                        writer.uint32(message.lineList[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified WinInfo message, length delimited. Does not implicitly {@link pqMsg.OneLotteryInfo.WinInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.IWinInfo} message WinInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WinInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WinInfo message from the specified reader or buffer.
             * @function decode
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pqMsg.OneLotteryInfo.WinInfo} WinInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WinInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.OneLotteryInfo.WinInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.symbolId = reader.uint32();
                        break;
                    case 2:
                        if (!(message.lineList && message.lineList.length))
                            message.lineList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.lineList.push(reader.uint32());
                        } else
                            message.lineList.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WinInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pqMsg.OneLotteryInfo.WinInfo} WinInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WinInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WinInfo message.
             * @function verify
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WinInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.symbolId != null && message.hasOwnProperty("symbolId"))
                    if (!$util.isInteger(message.symbolId))
                        return "symbolId: integer expected";
                if (message.lineList != null && message.hasOwnProperty("lineList")) {
                    if (!Array.isArray(message.lineList))
                        return "lineList: array expected";
                    for (var i = 0; i < message.lineList.length; ++i)
                        if (!$util.isInteger(message.lineList[i]))
                            return "lineList: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a WinInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pqMsg.OneLotteryInfo.WinInfo} WinInfo
             */
            WinInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.pqMsg.OneLotteryInfo.WinInfo)
                    return object;
                var message = new $root.pqMsg.OneLotteryInfo.WinInfo();
                if (object.symbolId != null)
                    message.symbolId = object.symbolId >>> 0;
                if (object.lineList) {
                    if (!Array.isArray(object.lineList))
                        throw TypeError(".pqMsg.OneLotteryInfo.WinInfo.lineList: array expected");
                    message.lineList = [];
                    for (var i = 0; i < object.lineList.length; ++i)
                        message.lineList[i] = object.lineList[i] >>> 0;
                }
                return message;
            };

            /**
             * Creates a plain object from a WinInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @static
             * @param {pqMsg.OneLotteryInfo.WinInfo} message WinInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WinInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.lineList = [];
                if (options.defaults)
                    object.symbolId = 0;
                if (message.symbolId != null && message.hasOwnProperty("symbolId"))
                    object.symbolId = message.symbolId;
                if (message.lineList && message.lineList.length) {
                    object.lineList = [];
                    for (var j = 0; j < message.lineList.length; ++j)
                        object.lineList[j] = message.lineList[j];
                }
                return object;
            };

            /**
             * Converts this WinInfo to JSON.
             * @function toJSON
             * @memberof pqMsg.OneLotteryInfo.WinInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WinInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return WinInfo;
        })();

        return OneLotteryInfo;
    })();

    pqMsg.LotteryInfo = (function() {

        /**
         * Properties of a LotteryInfo.
         * @memberof pqMsg
         * @interface ILotteryInfo
         * @property {string|null} [gameCode] LotteryInfo gameCode
         * @property {number|null} [userId] LotteryInfo userId
         * @property {string|null} [parentBetId] LotteryInfo parentBetId
         * @property {string|null} [roundBetId] LotteryInfo roundBetId
         * @property {number|null} [betSize] LotteryInfo betSize
         * @property {number|null} [betLevel] LotteryInfo betLevel
         * @property {number|null} [baseBet] LotteryInfo baseBet
         * @property {number|null} [betMoney] LotteryInfo betMoney
         * @property {Array.<pqMsg.IOneLotteryInfo>|null} [lotteryInfoList] LotteryInfo lotteryInfoList
         * @property {number|null} [balance] LotteryInfo balance
         * @property {number|null} [finalFreeCount] LotteryInfo finalFreeCount
         * @property {number|Long|null} [betTime] LotteryInfo betTime
         * @property {number|null} [offsetToPlayer] LotteryInfo offsetToPlayer
         * @property {number|null} [packageId] LotteryInfo packageId
         */

        /**
         * Constructs a new LotteryInfo.
         * @memberof pqMsg
         * @classdesc Represents a LotteryInfo.
         * @implements ILotteryInfo
         * @constructor
         * @param {pqMsg.ILotteryInfo=} [properties] Properties to set
         */
        function LotteryInfo(properties) {
            this.lotteryInfoList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LotteryInfo gameCode.
         * @member {string} gameCode
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.gameCode = "";

        /**
         * LotteryInfo userId.
         * @member {number} userId
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.userId = 0;

        /**
         * LotteryInfo parentBetId.
         * @member {string} parentBetId
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.parentBetId = "";

        /**
         * LotteryInfo roundBetId.
         * @member {string} roundBetId
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.roundBetId = "";

        /**
         * LotteryInfo betSize.
         * @member {number} betSize
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.betSize = 0;

        /**
         * LotteryInfo betLevel.
         * @member {number} betLevel
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.betLevel = 0;

        /**
         * LotteryInfo baseBet.
         * @member {number} baseBet
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.baseBet = 0;

        /**
         * LotteryInfo betMoney.
         * @member {number} betMoney
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.betMoney = 0;

        /**
         * LotteryInfo lotteryInfoList.
         * @member {Array.<pqMsg.IOneLotteryInfo>} lotteryInfoList
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.lotteryInfoList = $util.emptyArray;

        /**
         * LotteryInfo balance.
         * @member {number} balance
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.balance = 0;

        /**
         * LotteryInfo finalFreeCount.
         * @member {number} finalFreeCount
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.finalFreeCount = 0;

        /**
         * LotteryInfo betTime.
         * @member {number|Long} betTime
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.betTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LotteryInfo offsetToPlayer.
         * @member {number} offsetToPlayer
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.offsetToPlayer = 0;

        /**
         * LotteryInfo packageId.
         * @member {number} packageId
         * @memberof pqMsg.LotteryInfo
         * @instance
         */
        LotteryInfo.prototype.packageId = 0;

        /**
         * Creates a new LotteryInfo instance using the specified properties.
         * @function create
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {pqMsg.ILotteryInfo=} [properties] Properties to set
         * @returns {pqMsg.LotteryInfo} LotteryInfo instance
         */
        LotteryInfo.create = function create(properties) {
            return new LotteryInfo(properties);
        };

        /**
         * Encodes the specified LotteryInfo message. Does not implicitly {@link pqMsg.LotteryInfo.verify|verify} messages.
         * @function encode
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {pqMsg.ILotteryInfo} message LotteryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LotteryInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.userId);
            if (message.parentBetId != null && Object.hasOwnProperty.call(message, "parentBetId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.parentBetId);
            if (message.roundBetId != null && Object.hasOwnProperty.call(message, "roundBetId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.roundBetId);
            if (message.betSize != null && Object.hasOwnProperty.call(message, "betSize"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.betSize);
            if (message.betLevel != null && Object.hasOwnProperty.call(message, "betLevel"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.betLevel);
            if (message.baseBet != null && Object.hasOwnProperty.call(message, "baseBet"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.baseBet);
            if (message.betMoney != null && Object.hasOwnProperty.call(message, "betMoney"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.betMoney);
            if (message.lotteryInfoList != null && message.lotteryInfoList.length)
                for (var i = 0; i < message.lotteryInfoList.length; ++i)
                    $root.pqMsg.OneLotteryInfo.encode(message.lotteryInfoList[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.balance);
            if (message.finalFreeCount != null && Object.hasOwnProperty.call(message, "finalFreeCount"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.finalFreeCount);
            if (message.betTime != null && Object.hasOwnProperty.call(message, "betTime"))
                writer.uint32(/* id 12, wireType 0 =*/96).int64(message.betTime);
            if (message.offsetToPlayer != null && Object.hasOwnProperty.call(message, "offsetToPlayer"))
                writer.uint32(/* id 13, wireType 1 =*/105).double(message.offsetToPlayer);
            if (message.packageId != null && Object.hasOwnProperty.call(message, "packageId"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.packageId);
            return writer;
        };

        /**
         * Encodes the specified LotteryInfo message, length delimited. Does not implicitly {@link pqMsg.LotteryInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {pqMsg.ILotteryInfo} message LotteryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LotteryInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LotteryInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pqMsg.LotteryInfo} LotteryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LotteryInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pqMsg.LotteryInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.userId = reader.uint32();
                    break;
                case 3:
                    message.parentBetId = reader.string();
                    break;
                case 4:
                    message.roundBetId = reader.string();
                    break;
                case 5:
                    message.betSize = reader.double();
                    break;
                case 6:
                    message.betLevel = reader.uint32();
                    break;
                case 7:
                    message.baseBet = reader.uint32();
                    break;
                case 8:
                    message.betMoney = reader.double();
                    break;
                case 9:
                    if (!(message.lotteryInfoList && message.lotteryInfoList.length))
                        message.lotteryInfoList = [];
                    message.lotteryInfoList.push($root.pqMsg.OneLotteryInfo.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.balance = reader.double();
                    break;
                case 11:
                    message.finalFreeCount = reader.uint32();
                    break;
                case 12:
                    message.betTime = reader.int64();
                    break;
                case 13:
                    message.offsetToPlayer = reader.double();
                    break;
                case 14:
                    message.packageId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LotteryInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pqMsg.LotteryInfo} LotteryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LotteryInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LotteryInfo message.
         * @function verify
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LotteryInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.parentBetId != null && message.hasOwnProperty("parentBetId"))
                if (!$util.isString(message.parentBetId))
                    return "parentBetId: string expected";
            if (message.roundBetId != null && message.hasOwnProperty("roundBetId"))
                if (!$util.isString(message.roundBetId))
                    return "roundBetId: string expected";
            if (message.betSize != null && message.hasOwnProperty("betSize"))
                if (typeof message.betSize !== "number")
                    return "betSize: number expected";
            if (message.betLevel != null && message.hasOwnProperty("betLevel"))
                if (!$util.isInteger(message.betLevel))
                    return "betLevel: integer expected";
            if (message.baseBet != null && message.hasOwnProperty("baseBet"))
                if (!$util.isInteger(message.baseBet))
                    return "baseBet: integer expected";
            if (message.betMoney != null && message.hasOwnProperty("betMoney"))
                if (typeof message.betMoney !== "number")
                    return "betMoney: number expected";
            if (message.lotteryInfoList != null && message.hasOwnProperty("lotteryInfoList")) {
                if (!Array.isArray(message.lotteryInfoList))
                    return "lotteryInfoList: array expected";
                for (var i = 0; i < message.lotteryInfoList.length; ++i) {
                    var error = $root.pqMsg.OneLotteryInfo.verify(message.lotteryInfoList[i]);
                    if (error)
                        return "lotteryInfoList." + error;
                }
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.finalFreeCount != null && message.hasOwnProperty("finalFreeCount"))
                if (!$util.isInteger(message.finalFreeCount))
                    return "finalFreeCount: integer expected";
            if (message.betTime != null && message.hasOwnProperty("betTime"))
                if (!$util.isInteger(message.betTime) && !(message.betTime && $util.isInteger(message.betTime.low) && $util.isInteger(message.betTime.high)))
                    return "betTime: integer|Long expected";
            if (message.offsetToPlayer != null && message.hasOwnProperty("offsetToPlayer"))
                if (typeof message.offsetToPlayer !== "number")
                    return "offsetToPlayer: number expected";
            if (message.packageId != null && message.hasOwnProperty("packageId"))
                if (!$util.isInteger(message.packageId))
                    return "packageId: integer expected";
            return null;
        };

        /**
         * Creates a LotteryInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pqMsg.LotteryInfo} LotteryInfo
         */
        LotteryInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pqMsg.LotteryInfo)
                return object;
            var message = new $root.pqMsg.LotteryInfo();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.parentBetId != null)
                message.parentBetId = String(object.parentBetId);
            if (object.roundBetId != null)
                message.roundBetId = String(object.roundBetId);
            if (object.betSize != null)
                message.betSize = Number(object.betSize);
            if (object.betLevel != null)
                message.betLevel = object.betLevel >>> 0;
            if (object.baseBet != null)
                message.baseBet = object.baseBet >>> 0;
            if (object.betMoney != null)
                message.betMoney = Number(object.betMoney);
            if (object.lotteryInfoList) {
                if (!Array.isArray(object.lotteryInfoList))
                    throw TypeError(".pqMsg.LotteryInfo.lotteryInfoList: array expected");
                message.lotteryInfoList = [];
                for (var i = 0; i < object.lotteryInfoList.length; ++i) {
                    if (typeof object.lotteryInfoList[i] !== "object")
                        throw TypeError(".pqMsg.LotteryInfo.lotteryInfoList: object expected");
                    message.lotteryInfoList[i] = $root.pqMsg.OneLotteryInfo.fromObject(object.lotteryInfoList[i]);
                }
            }
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.finalFreeCount != null)
                message.finalFreeCount = object.finalFreeCount >>> 0;
            if (object.betTime != null)
                if ($util.Long)
                    (message.betTime = $util.Long.fromValue(object.betTime)).unsigned = false;
                else if (typeof object.betTime === "string")
                    message.betTime = parseInt(object.betTime, 10);
                else if (typeof object.betTime === "number")
                    message.betTime = object.betTime;
                else if (typeof object.betTime === "object")
                    message.betTime = new $util.LongBits(object.betTime.low >>> 0, object.betTime.high >>> 0).toNumber();
            if (object.offsetToPlayer != null)
                message.offsetToPlayer = Number(object.offsetToPlayer);
            if (object.packageId != null)
                message.packageId = object.packageId | 0;
            return message;
        };

        /**
         * Creates a plain object from a LotteryInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pqMsg.LotteryInfo
         * @static
         * @param {pqMsg.LotteryInfo} message LotteryInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LotteryInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.lotteryInfoList = [];
            if (options.defaults) {
                object.gameCode = "";
                object.userId = 0;
                object.parentBetId = "";
                object.roundBetId = "";
                object.betSize = 0;
                object.betLevel = 0;
                object.baseBet = 0;
                object.betMoney = 0;
                object.balance = 0;
                object.finalFreeCount = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.betTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.betTime = options.longs === String ? "0" : 0;
                object.offsetToPlayer = 0;
                object.packageId = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.parentBetId != null && message.hasOwnProperty("parentBetId"))
                object.parentBetId = message.parentBetId;
            if (message.roundBetId != null && message.hasOwnProperty("roundBetId"))
                object.roundBetId = message.roundBetId;
            if (message.betSize != null && message.hasOwnProperty("betSize"))
                object.betSize = options.json && !isFinite(message.betSize) ? String(message.betSize) : message.betSize;
            if (message.betLevel != null && message.hasOwnProperty("betLevel"))
                object.betLevel = message.betLevel;
            if (message.baseBet != null && message.hasOwnProperty("baseBet"))
                object.baseBet = message.baseBet;
            if (message.betMoney != null && message.hasOwnProperty("betMoney"))
                object.betMoney = options.json && !isFinite(message.betMoney) ? String(message.betMoney) : message.betMoney;
            if (message.lotteryInfoList && message.lotteryInfoList.length) {
                object.lotteryInfoList = [];
                for (var j = 0; j < message.lotteryInfoList.length; ++j)
                    object.lotteryInfoList[j] = $root.pqMsg.OneLotteryInfo.toObject(message.lotteryInfoList[j], options);
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.finalFreeCount != null && message.hasOwnProperty("finalFreeCount"))
                object.finalFreeCount = message.finalFreeCount;
            if (message.betTime != null && message.hasOwnProperty("betTime"))
                if (typeof message.betTime === "number")
                    object.betTime = options.longs === String ? String(message.betTime) : message.betTime;
                else
                    object.betTime = options.longs === String ? $util.Long.prototype.toString.call(message.betTime) : options.longs === Number ? new $util.LongBits(message.betTime.low >>> 0, message.betTime.high >>> 0).toNumber() : message.betTime;
            if (message.offsetToPlayer != null && message.hasOwnProperty("offsetToPlayer"))
                object.offsetToPlayer = options.json && !isFinite(message.offsetToPlayer) ? String(message.offsetToPlayer) : message.offsetToPlayer;
            if (message.packageId != null && message.hasOwnProperty("packageId"))
                object.packageId = message.packageId;
            return object;
        };

        /**
         * Converts this LotteryInfo to JSON.
         * @function toJSON
         * @memberof pqMsg.LotteryInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LotteryInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LotteryInfo;
    })();

    return pqMsg;
})();

module.exports = $root.pqMsg;
