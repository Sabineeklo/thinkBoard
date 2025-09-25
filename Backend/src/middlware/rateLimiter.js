import { ratelimit } from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
    try {
        
        const { success } = await ratelimit.limit("theUserID")
        if(!success) {
            return res.status(429).json({message: "Too many requests, please try again later."})
        }
        next()
    } catch (error) {
        console.log("Error in rate limiter middleware:", error)
        next(error)
    }
};

export default ratelimiter;