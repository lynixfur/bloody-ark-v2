// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IronSessionOptions } from "iron-session";
import { User } from "../../types/User";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET ?? "",
  cookieName: "sessionName",
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}