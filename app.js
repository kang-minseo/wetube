import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import { userRouter} from "./router";
const app = express();

const handleHome = (req, res) => res.send('Hello from my ass');

const handleProfile = (req, res) => res.send('You are on my profile');

app.use(cookieParser()); // session을 다루기 위해 cookie에 사용자 정보 저장
app.use(bodyParser.json()); // form 데이터 가진 request object에 접근
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet()); // 보안
app.use(morgan("dev")); // 로그


app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;