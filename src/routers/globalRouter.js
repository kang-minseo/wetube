import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import {
	getJoin,
	logout,
	postJoin,
	getLogin,
	postLogin,
	githubLogin,
	postGithubLogin,
	getMe,
	facebookLogin,
	postFacebookLogin,
	kakaoLogin,
	postKakaoLogin,
} from '../controller/userController';
import { onlyPublic, onlyPrivate } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.search, search);
globalRouter.get(routes.home, home);

globalRouter.get(routes.logout, onlyPrivate, logout);

// ===== github login =====
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
	routes.githubCallback,
	passport.authenticate('github', { failureRedirect: '/login' }),
	postGithubLogin,
);
// ===== github login =====

globalRouter.get(routes.me, getMe);

// ===== facebook login =====
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
	routes.facebookCallback,
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	postFacebookLogin,
);
// ===== facebook login =====

// ===== kakao login =====
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
	routes.kakaoCallback,
	passport.authenticate('kakao', { failureRedirect: '/login' }),
	postKakaoLogin,
);
// ===== kakao login =====
export default globalRouter;
