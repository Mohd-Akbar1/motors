import express from "express";
import userRoutes from "./user.js";
import authRoutes from "./auth.js";
import adminRoutes from "./admin.js";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/users",
        route: userRoutes,
    },
    {
        path: "/admin",
        route: adminRoutes,
    },
    {
        path: "/auth",
        route: authRoutes,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
