"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    hobbies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Hobby' }]
}, { timestamps: true });
exports.default = mongoose_1.model('User', userSchema);
