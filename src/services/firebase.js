import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCChVdSPffwcKWd4sGKg5AdqOtJBzcahnE",
  authDomain: "fir-chat-app-e664e.firebaseapp.com",
  databaseURL: "https://fir-chat-app-e664e.firebaseio.com",
  projectId: "fir-chat-app-e664e",
  storageBucket: "fir-chat-app-e664e.appspot.com",
  messagingSenderId: "893223935677",
  appId: "1:893223935677:web:7c834f2ae873fccf1661d4",
  measurementId: "G-KC9TQ1P8C3"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
  