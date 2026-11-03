import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-2soslzi-shard-00-00.w0rm344.mongodb.net:27017,ac-2soslzi-shard-00-01.w0rm344.mongodb.net:27017,ac-2soslzi-shard-00-02.w0rm344.mongodb.net:27017/?ssl=true&replicaSet=atlas-13wds7-shard-0&authSource=admin`);
const db = client.db('BooksForBooknook');

/**
 * TEMPORARY: the `jwt()` plugin was removed, so Better Auth no longer issues
 * JWTs for the Express API. Login/session cookies still work normally.
 * Restore with: plugins: [jwt({ sessionCookieCache: true })]  (import from "better-auth/plugins")
 */
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 60 * 60 * 24, // 7 days
      strategy: "jwt", // "compact" (default) | "jwt" | "jwe" — internal cookie signing, no JWT plugin needed
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
