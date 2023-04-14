const { Strategy, ExtractJwt } = require('passport-jwt');
const { PassportStatic } = require('passport');

interface IPayload {
  userId: string;
}
export const applyPassportStrategy = (passport: typeof PassportStatic) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET!,
  };
  passport.use(
    new Strategy(
      options,
      async (data: IPayload, done: (a: null, b: IPayload | boolean) => any) => {
        try {
          if (data.userId) {
            return done(null, data);
          }
          return done(null, false);
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    )
  );
};
