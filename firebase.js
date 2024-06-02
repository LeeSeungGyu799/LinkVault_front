import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAuj2QsHE_Bvsbv36NQsm0YZc_FNzZGcUU",
  authDomain: "alarmtest-884f5.firebaseapp.com",
  projectId: "alarmtest-884f5",
  storageBucket: "alarmtest-884f5.appspot.com",
  messagingSenderId: "740473980017",
  appId: "1:740473980017:android:3e1d3c9258d9e917fc47d0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

export { firebase, messaging };