import express, { NextFunction, Request, Response } from "express";
const app = express();

// parsers
app.use(express.json());
app.use(express.text());

// Routing
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

const logger = (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.url, req.method, req.hostname);
	next();
};

courseRouter.post("/create-course", (req: Request, res: Response) => {
	const user = req.body;
	console.log(user);

	res.json({
		success: true,
		message: "User created successfully!",
		data: user,
	});
});

userRouter.get("/", logger, async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.send(something);
	} catch (error) {
		next(error);
	}
});

app.post("/", logger, (req: Request, res: Response) => {
	const user = req.body;
	res.json({
		success: true,
		message: "User is created successfully!",
		data: user,
	});
});

// global error handler
app.all("*", (req: Request, res: Response) => {
	res.status(400).json({
		success: false,
		message: "Route not found",
	});
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	if (error) {
		res.status(400).json({
			success: false,
			message: "Something went wrong!",
		});
	}
});

export default app;
