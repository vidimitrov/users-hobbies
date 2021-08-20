"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const routes_1 = __importDefault(require("./routes"));
exports.app = express_1.default();
const PORT = process.env.PORT || 4000;
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
exports.app.use(routes_1.default);
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const uri = `mongodb+srv://admin:SyxDGZst4uf51aOh@cluster0.xnapz.mongodb.net/userHobbies?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(uri, options)
    .then(() => {
    if (process.env.NODE_ENV !== 'test') {
        exports.app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    }
})
    .catch((error) => {
    throw error;
});
