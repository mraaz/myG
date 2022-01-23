"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = '67566B597033733676397924423F4528482B4D6251655468576D5A7134743777217A25432A46294A404E635266556A586E3272357538782F413F4428472B4B61';
const server = (0, fastify_1.default)();
function generateAccessToken(payload) {
    // 86400 seconds = 1 day
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '86400s' });
}
server.get('/get', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const token = generateAccessToken({
        data: {
            client: 'myG'
        },
        aud: 'myG_webserver'
    });
    return token;
}));
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
