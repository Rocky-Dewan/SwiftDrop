import admin from "firebase-admin";

export const initFirebaseAdmin = () => {
  try {
    if (admin.apps.length) return admin.app();
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) privateKey = privateKey.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
      console.warn("Firebase admin not configured (missing env).");
      return null;
    }
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    return app;
  } catch (err) {
    console.warn("Firebase init error:", err.message);
    return null;
  }
};
