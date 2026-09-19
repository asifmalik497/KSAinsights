import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Quota and Resilient Offline State Management
let quotaExceededCache = false;

export function isQuotaError(error: any): boolean {
  if (!error) return false;
  const msg = typeof error === 'string' ? error : (error.message || String(error));
  return (
    msg.includes('Quota limit exceeded') ||
    msg.includes('Quota exceeded') ||
    msg.includes('resource-exhausted') ||
    error.code === 'resource-exhausted'
  );
}

export function setQuotaExceeded(exceeded: boolean = true) {
  quotaExceededCache = exceeded;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('firestore_quota_exceeded', exceeded ? 'true' : 'false');
    }
  } catch (_) {}
}

export function isQuotaExceeded(): boolean {
  if (quotaExceededCache) return true;
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('firestore_quota_exceeded') === 'true') {
      quotaExceededCache = true;
      return true;
    }
  } catch (_) {}
  return false;
}

// Validate Connection to Firestore
async function testConnection() {
  if (isQuotaExceeded()) {
    console.info("[Firebase] Running in resilient offline mode (daily quota reached).");
    return;
  }
  try {
    // We use a dummy doc to test connection
    await getDocFromServer(doc(db, '_internal_', 'connection_test'));
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    if (isQuotaError(error)) {
      setQuotaExceeded(true);
      console.warn("[Firebase] Free daily read quota has been reached for today. Running in resilient cached mode.");
      return;
    }
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration. The client appears to be offline.");
    }
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  if (isQuotaError(error)) {
    setQuotaExceeded(true);
    console.warn(`[Firestore Quota] Free tier daily limit reached during ${operationType} on ${path}. Falling back to cached/fallback state.`);
    return;
  }
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
