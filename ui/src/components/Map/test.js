// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";
// import firebaseConfig from '../firebase'
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const city = [{
//     "court":"Aaniin","area":"Markham","latitude":43.85195211602877,"longitude":-79.26603714962228,"description": "A brand new facility for Markham community.",
//     "id": 1, "indoor": "yes", "headcount": 4
// },{
//     "court":"Milliken Mills High School","area":"Markham","latitude":43.83715934387034,"longitude":-79.30439642637315,"description": "A Highschool with painted outdoor court.",
//     "id": 2, "indoor": "no"
// }
// ]
// function writeUserData(userId, name, email, imageUrl) {
//     set(ref(database, 'users/' + userId), {
//         username: name,
//         email: email,
//         profile_picture : imageUrl
//     });
// }
//
// for (let court in city){
//     for (let [key, value] in court.entries()){
//         console.log(key, value)
//     }
// }