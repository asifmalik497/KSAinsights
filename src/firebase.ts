import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK with modern persistent offline cache
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Quota, Unavailable Backend & Resilient Offline State Management
let quotaExceededCache = false;

export function isQuotaError(error: any): boolean {
  if (!error) return false;
  const msg = typeof error === 'string' ? error : (error.message || String(error));
  return (
    msg.includes('Quota limit exceeded') ||
    msg.includes('Quota exceeded') ||
    msg.includes('resource-exhausted') ||
    msg.includes('Could not reach Cloud Firestore backend') ||
    msg.includes('client is offline') ||
    msg.includes('unavailable') ||
    error.code === 'resource-exhausted' ||
    error.code === 'unavailable'
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

// Validate Connection to Firestore safely without throwing unhandled exceptions
async function testConnection() {
  if (isQuotaExceeded()) {
    return;
  }
  try {
    // We use a dummy doc to test connection
    await getDocFromServer(doc(db, '_internal_', 'connection_test'));
  } catch (error: any) {
    if (isQuotaError(error)) {
      setQuotaExceeded(true);
      console.info("[Firebase] Running in resilient offline mode (network/backend unavailable).");
      return;
    }
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.info("[Firebase] Client is currently operating in offline mode.");
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
