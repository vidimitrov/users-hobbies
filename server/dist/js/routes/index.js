"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const hobbies_1 = require("../controllers/hobbies");
const router = express_1.Router();
// Users
router.get('/users', users_1.getUsers);
router.post('/users', users_1.addUser);
router.put('/users/:id', users_1.updateUser);
router.delete('/users/:id', users_1.deleteUser);
// Hobbies
router.get('/users/:userId/hobbies', hobbies_1.getHobbies);
router.post('/users/:userId/hobbies', hobbies_1.addHobby);
router.put('/users/:userId/hobbies/:id', hobbies_1.updateHobby);
router.delete('/users/:userId/hobbies/:id', hobbies_1.deleteHobby);
exports.default = router;
