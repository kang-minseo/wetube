import passport from 'passport';
import GithubStrategy from 'passport-github';
import FaceBookStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';
import User from './models/User';
import {
	githubLoginCallback,
	facebookLoginCallback,
	kakaoLoginCallback,
} from './controller/userController';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GH_ID,
			clientSecret: process.env.GH_SECRET,
			callbackURL: process.env.PRODUCTION
				? `https://vast-castle-43127.herokuapp.com${routes.githubCallback}`
				: `http://localhost:4000${routes.githubCallback}`,
		},
		githubLoginCallback,
	),
);
passport.use(
	new FaceBookStrategy(
		{
			clientID: process.env.FB_ID,
			clientSecret: process.env.FB_SECRET,
			callbackURL: process.env.PRODUCTION
				? `https://vast-castle-43127.herokuapp.com${routes.facebookCallback}`
				: `http://localhost:4000${routes.facebookCallback}`,
			profileFields: ['id', 'displayName', 'photos', 'email'],
			scope: ['public_profile', 'email'],
		},
		facebookLoginCallback,
	),
);
passport.use(
	new KakaoStrategy(
		{
			clientID: process.env.KAKAO_ID,
			clientSecret: '', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
			callbackURL: process.env.PRODUCTION
				? `https://vast-castle-43127.herokuapp.com${routes.kakaoCallback}`
				: `http://localhost:4000${routes.kakaoCallback}`,
		},
		kakaoLoginCallback,
	),
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
