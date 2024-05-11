import { Request } from "express";
import * as dotenv from 'dotenv';
dotenv.config();

export default function ipRequest(req: Request<{}, any>) {
    const ipInfo = req['ipInfo'];

    const country = ipInfo.country || process.env.IP_COUNTRY;
    const lastIP = ipInfo.ip || process.env.IP_ADDRESS;
    const countryCode = ipInfo.countryCode || process.env.IP_COUNTRY_CODE;
    const city = ipInfo.city || process.env.IP_CITY;

    const timeZone = ipInfo.timezone || process.env.TIMEZONE;
    const lastLogin = new Date().toLocaleString('en-UK', { timeZone: timeZone });

    return {
        country,
        lastIP,
        countryCode,
        city,
        lastLogin,
    }
}
