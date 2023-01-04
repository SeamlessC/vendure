"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlInitializer = void 0;
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
class MysqlInitializer {
    async init(testFileName, connectionOptions) {
        const dbName = this.getDbNameFromFilename(testFileName);
        this.conn = await this.getMysqlConnection(connectionOptions);
        connectionOptions.database = dbName;
        connectionOptions.synchronize = true;
        const query = util_1.promisify(this.conn.query).bind(this.conn);
        await query(`DROP DATABASE IF EXISTS ${dbName}`);
        await query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        return connectionOptions;
    }
    async populate(populateFn) {
        await populateFn();
    }
    async destroy() {
        await util_1.promisify(this.conn.end).bind(this.conn)();
    }
    async getMysqlConnection(connectionOptions) {
        const { createConnection } = await Promise.resolve().then(() => __importStar(require('mysql')));
        const conn = createConnection({
            host: connectionOptions.host,
            port: connectionOptions.port,
            user: connectionOptions.username,
            password: connectionOptions.password,
        });
        const connect = util_1.promisify(conn.connect).bind(conn);
        await connect();
        return conn;
    }
    getDbNameFromFilename(filename) {
        return 'e2e_' + path_1.default.basename(filename).replace(/[^a-z0-9_]/gi, '_');
    }
}
exports.MysqlInitializer = MysqlInitializer;
//# sourceMappingURL=mysql-initializer.js.map