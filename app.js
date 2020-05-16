import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import  userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

// middleware
app.use(cookieParser()); // session을 다루기 위해 cookie에 사용자 정보 저장
app.use(bodyParser.json()); // form 데이터 가진 request object에 접근
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet()); // 보안
app.use(morgan("dev")); // 로그

app.use(routes.home , globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;