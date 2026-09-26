const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const feeRoutes = require("./routes/fee.routes");
const resultRoutes = require("./routes/result.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const financeRoutes = require("./routes/finance.routes");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

// Middleware
app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error(`Origin ${origin} is not allowed by CORS`));
		},
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/finance", financeRoutes);

module.exports = app;