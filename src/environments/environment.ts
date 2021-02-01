// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  forumUrl:"http://localhost:3000/forum",
  commentsUrl:"http://localhost:3000/comments",
  wantedUrl:"http://localhost:3000/wanted",
  menuUrl:"http://localhost:3000/menu",
  orderUrl:"http://localhost:3000/order",
  usersUrl:"http://localhost:3000/users",
  menuOrderingPricesUrl:"http://localhost:3000/menuOrderingPrices",

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig : {
  apiKey: "AIzaSyCU3EPuxNV-UYLHDQYWmVkhDOrCX63J1OQ",
  authDomain: "mycoffeeshop-a2c4d.firebaseapp.com",
  projectId: "mycoffeeshop-a2c4d",
  storageBucket: "mycoffeeshop-a2c4d.appspot.com",
  messagingSenderId: "849225357089",
  appId: "1:849225357089:web:dd41e5e3db8867de87d060",
  measurementId: "G-YGKZ611MGK"
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
