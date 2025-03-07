"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./config/db.config");
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = require("./routes/user.routes");
const admin_routes_1 = require("./routes/admin.routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(0, db_config_1.connectDB)();
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4000",
    // "https://www.learngrow.live",
    // "https://api.learngrow.live",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/user-service', user_routes_1.userRouter);
app.use('/api/admin-service', admin_routes_1.adminRouter);
app.listen(PORT, (error) => {
    if (error)
        throw error;
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
});
