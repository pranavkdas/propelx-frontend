import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

console.log("Middleware loaded"); // Add this line at the top of app/middleware.ts

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", 
  "/sign-up(.*)",
//   "/api/webhooks(.*)" // Add other public routes if needed
]);

export default clerkMiddleware(async (auth, req) => {
    console.log("Request URL:", req.url); // Log the requested URL
    if (!isPublicRoute(req)) {
        console.log("Protecting route:", req.url); // Log when protecting a route
        await auth.protect();
    } else {
        console.log("Public route accessed:", req.url); // Log when accessing a public route
    }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
