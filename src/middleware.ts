// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  console.log("req: ", req);
  console.log("res: ", res);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

// function logErrors(err, req, res, next) {
//   console.error(err);
//   next(err);
// }

// function errorHandler(err, req, res, next) {
//   res.status(500).json({
//     message: err.message,
//     stack: err.stack,
//   });

//   const valid = false;
//   valid ? next() : "";
// }

// module.exports = { logErrors, errorHandler };
