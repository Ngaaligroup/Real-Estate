const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.database();


exports.average = functions.database
  .ref('Rates/{userId}/{pushId}')
  .onWrite((change, context) => {
    const userId = context.params.userId;
    const usersRef = db.ref('Rates/' + userId);

    const userAverageRef = db.ref('Rates/' + userId + '/average');

    let totalSum = 0;
    let nbrOfElem = 0;

    return usersRef
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().rating) {
            //console.log(childSnapshot.val());
            totalSum += childSnapshot.val().rating;
            
          }
          nbrOfElem=snapshot.numChildren();
        });
      })
      .then(() => {
        //console.log('totalSum: ' + totalSum);
        //console.log('nbrOfElem: ' + nbrOfElem);
         return userAverageRef.transaction((average) => {
          if (nbrOfElem > 0) {
            return { val: totalSum / nbrOfElem };
          } else {
            return 0;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  });

  // return admin.database().ref('/User/tsetUser/monthQuit/{pushId}').once('value')
  // .then(function(snapshot) {
  //     let sum=0;
  //     snapshot.forEach(child => {
  //         sum = sum + child.val();
  //     })
  //     let avg = sum / snapshot.numChildren();

  //     return admin.database().ref('/User/tsetUser/inform/standardQuit').set(avg);
  // });
