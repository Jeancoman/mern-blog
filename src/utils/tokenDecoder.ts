import jwt_decode from "jwt-decode";
import { JwtPayload } from "../types";

const decodeAndReturnUser = (token: string) => {
    const decoded = jwt_decode<JwtPayload>(token);
    return decoded.user;
};

const findTokenInUrl = (url: string) => {
    let cleaned = url.substring(1)
    const token = new URLSearchParams(cleaned).get('auth_token');
    return token;
}

const TokenDecoder = { decodeAndReturnUser, findTokenInUrl };

export default TokenDecoder;
