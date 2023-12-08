 import firebase from 'firebase';
 
 var firebaseConfig = {
  apiKey: "AIzaSyA28k7KOAQYCn9zmiY_e3LTUuvhsYYuGAg",
  authDomain: "movie-booking-system-77c15.firebaseapp.com",
  projectId: "movie-booking-system-77c15",
  storageBucket: "movie-booking-system-77c15.appspot.com",
  messagingSenderId: "20805665827",
  appId: "1:20805665827:web:ee8ce3b268739971c05d96",
  measurementId: "G-8HFNBJCYX8"
  };
  // Initialize Firebase
   var fire = firebase.initializeApp(firebaseConfig);

   export default fire;