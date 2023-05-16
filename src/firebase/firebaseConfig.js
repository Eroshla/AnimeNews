import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyAXZfTq_LCpPCW5lfAYk2oT8-ar6FdFC-0',
  authDomain: 'appanime-635a6.firebaseapp.com',
  projectId: 'appanime-635a6',
  storageBucket: 'appanime-635a6.appspot.com',
  messagingSenderId: '273522934678',
  appId: '1:273522934678:web:caa666ca3b7c47b58ad3b7',
  measurementId: 'G-FCZEHC31PQ',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .settings({experimentalForceLongPolling: true, merge: true});

}
export default firebase;

