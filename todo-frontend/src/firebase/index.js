// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyATRWLFsvHG6gVx7ETYpVNoC06vQ--kBEE',
  authDomain: 'erp4-bb307.firebaseapp.com',
  projectId: 'erp4-bb307',
  storageBucket: 'erp4-bb307.appspot.com',
  messagingSenderId: '367618741186',
  appId: '1:367618741186:web:f93c723832fcfd4b2d3c5b',
  measurementId: 'G-TVZZQQTRDL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
