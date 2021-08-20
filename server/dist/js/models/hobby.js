"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hobbySchema = new mongoose_1.Schema({
    passionLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Very-High'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
exports.default = mongoose_1.model('Hobby', hobbySchema);
