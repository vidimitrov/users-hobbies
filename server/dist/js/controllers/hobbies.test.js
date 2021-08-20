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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe("Hobbies Tests", () => {
    it("fetching all hobbies should succeed with given user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersResponse = yield supertest_1.default(app_1.app).get("/users");
        expect(usersResponse.status).toBe(200);
        expect(usersResponse.body).toBeDefined();
        expect(usersResponse.body.users).toBeDefined();
        expect(Array.isArray(usersResponse.body.users)).toBe(true);
        expect(usersResponse.body.users.length).toBeGreaterThan(0);
        const user = usersResponse.body.users[0];
        const hobbiesResponse = yield supertest_1.default(app_1.app).get(`/users/${user._id}/hobbies`);
        expect(hobbiesResponse.status).toBe(200);
        expect(hobbiesResponse.body).toBeDefined();
        expect(hobbiesResponse.body.hobbies).toBeDefined();
        expect(Array.isArray(hobbiesResponse.body.hobbies)).toBe(true);
        expect(hobbiesResponse.body.hobbies.length).toBeGreaterThan(0);
    }));
    it("fetching all hobbies should fail for non-existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const hobbiesResponse = yield supertest_1.default(app_1.app).get(`/users/611e3ccf0abd408180b80aa1/hobbies`);
        expect(hobbiesResponse.status).toBe(401);
    }));
});
