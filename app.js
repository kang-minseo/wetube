import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import apiRouter from './routers/apiRouter';

import './passport';

const app = express();

const CokieStore = MongoStore(session);

// middleware
app.use(helmet()); // 보안
app.set('view engine', 'pug'); // 뷰 엔진 설정
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser()); // session을 다루기 위해 cookie에 사용자 정보 저장
app.use(bodyParser.json()); // form 데이터 가진 request object에 접근
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // 로그
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: false,
		store: new CokieStore({ mongooseConnection: mongoose.connection }),
	}),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // 미들웨어에 로컬 변수 설정

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
export default app;
