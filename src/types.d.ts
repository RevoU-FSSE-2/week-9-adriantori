import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  username?: string | JwtPayload // or any other type
}