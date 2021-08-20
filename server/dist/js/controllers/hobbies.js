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
exports.deleteHobby = exports.updateHobby = exports.addHobby = exports.getHobbies = void 0;
const hobby_1 = __importDefault(require("../models/hobby"));
const user_1 = __importDefault(require("../models/user"));
const getHobbies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (userId) {
            const user = yield user_1.default.findById(userId);
            if (user) {
                const hobbies = yield hobby_1.default.find().where({ user: user === null || user === void 0 ? void 0 : user._id });
                res.status(200).json({ hobbies });
            }
            else {
                res.sendStatus(401);
            }
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getHobbies = getHobbies;
const addHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield user_1.default.findById(req.params.userId);
        if (user) {
            const hobby = new hobby_1.default({
                name: body.name,
                passionLevel: body.passionLevel,
                year: body.year,
                user: user._id
            });
            const newHobby = yield hobby.save();
            yield user.updateOne({ hobbies: [...user.hobbies, newHobby._id] });
            res.status(201).json({ hobby: newHobby });
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addHobby = addHobby;
const updateHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatedHobby = yield hobby_1.default.findByIdAndUpdate({ _id: id }, body);
        res.status(200).json({ hobby: updatedHobby });
    }
    catch (error) {
        throw error;
    }
});
exports.updateHobby = updateHobby;
const deleteHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHobby = yield hobby_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ hobby: deletedHobby });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteHobby = deleteHobby;
