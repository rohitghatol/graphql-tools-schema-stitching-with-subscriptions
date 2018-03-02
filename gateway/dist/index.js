"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var graphql_tools_1 = require("graphql-tools");
var _1 = require("./remote-schema/");
var start = function () { return __awaiter(_this, void 0, void 0, function () {
    var actorSchema, movieSchema, genreSchema, extendedSchema, schema, server, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Starting...');
                return [4 /*yield*/, _1.getRemoteSchema('http://localhost:4001/', 'ws://localhost:4001/')];
            case 1:
                actorSchema = _a.sent();
                return [4 /*yield*/, _1.getRemoteSchema('http://localhost:4002/', 'ws://localhost:4002/')];
            case 2:
                movieSchema = _a.sent();
                return [4 /*yield*/, _1.getRemoteSchema('http://localhost:4003/', 'ws://localhost:4003/')];
            case 3:
                genreSchema = _a.sent();
                extendedSchema = "\n        extend type Movie {\n            actors: [Actor!]!\n            genre: [Genre!]!\n        }\n        extend type Genre {\n            movies: [Movie!]!\n        }\n    ";
                schema = graphql_tools_1.mergeSchemas({
                    schemas: [actorSchema, movieSchema, genreSchema, extendedSchema],
                    resolvers: function (mergeInfo) { return ({
                        Genre: {
                            movies: {
                                fragment: "fragment GenreFragment on Genre { movieIds }",
                                resolve: function (parent, args, context, info) {
                                    var movieIds = parent.movieIds;
                                    var whereClause = {
                                        where: { movieId_in: movieIds }
                                    };
                                    if (movieIds && movieIds.length > 0) {
                                        return mergeInfo.delegate('query', 'movies', whereClause, context, info);
                                    }
                                    else {
                                        return [];
                                    }
                                },
                            },
                        },
                        Movie: {
                            actors: {
                                fragment: "fragment MovieFragment on Movie { actorIds }",
                                resolve: function (parent, args, context, info) {
                                    var actorIds = parent.actorIds;
                                    var whereClause = {
                                        where: { actorId_in: actorIds }
                                    };
                                    if (actorIds && actorIds.length > 0) {
                                        return mergeInfo.delegate('query', 'actors', whereClause, context, info);
                                    }
                                    else {
                                        return [];
                                    }
                                },
                            },
                            genre: {
                                fragment: "fragment MovieFragment on Movie { genreId }",
                                resolve: function (parent, args, context, info) {
                                    var genreId = parent.genreId;
                                    var whereClause = {
                                        where: { genreId: genreId }
                                    };
                                    if (genreId) {
                                        return mergeInfo.delegate('query', 'genres', whereClause, context, info);
                                    }
                                    else {
                                        return null;
                                    }
                                },
                            }
                        }
                    }); }
                });
                server = new graphql_yoga_1.GraphQLServer({
                    schema: schema
                });
                options = {
                    port: 4000
                };
                server.start(function (options) { return console.log('Server is running on http://localhost:4000'); });
                return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=index.js.map