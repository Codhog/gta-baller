// import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// const GoogleLogin = (authProps) => {
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth();
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const res = {'user':result.user, 'res': result};
//             console.log(`user:${user} `)
//             return res
//         })
//         .then(({user,res})=>{
//
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             // const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             // const email = error.email;
//             console.log(`出错了${errorMessage}`)
//             // The AuthCredential type that was used.
//             // const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
// }
//
// export default GoogleLogin