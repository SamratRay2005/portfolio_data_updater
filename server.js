import 'dotenv/config';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { adminOptions } from './admin-options.js';

AdminJS.registerAdapter({
  Database: AdminJSMongoose.Database,
  Resource: AdminJSMongoose.Resource
});

const app = express();
let adminRouter; // Cache the router to prevent re-building on every request

const setupAdminPanel = async () => {
  // 1. Connect to MongoDB (Cached connection)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // 2. Build AdminJS only if not already built
  if (!adminRouter) {
    const admin = new AdminJS(adminOptions);
    
    adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
      {
        authenticate: async (email, password) => {
          if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return { email, role: 'admin' };
          }
          return null;
        },
        cookieName: 'adminjs',
        cookiePassword: process.env.COOKIE_PASSWORD || 'local-secret',
      },
      null,
      {
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'local-secret',
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Important for Vercel cookies
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        },
      }
    );
    
    app.use(admin.options.rootPath, adminRouter);
  }
};

// 3. Vercel Handler (Exported)
export default async function handler(req, res) {
  await setupAdminPanel();
  return app(req, res);
}

// 4. Local Handler (For 'npm start')
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const PORT = process.env.PORT || 3000;
  setupAdminPanel().then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 Admin Panel live at: http://localhost:${PORT}/admin`);
    });
  });
}