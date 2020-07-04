const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.database();


exports.average = functions.database
// 'Rates/'+param+ "/rate" +newKey
  .ref('Rates/{userId}/rate/{pushId}')
  .onWrite((change, context) => {
    const userId = context.params.userId;
    const usersRef = db.ref('Rates/' + userId + "/rate");

    const userAverageRef = db.ref('Rates/' + userId + '/average');

    let totalSum = 0;
    let val1=0;
    let nbrOfElem = 0;
    let avg;

    return usersRef
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val()) {
            //console.log(childSnapshot.val());
            totalSum += parseFloat(childSnapshot.child('rating').val());
            nbrOfElem=snapshot.numChildren();
            avg = totalSum / snapshot.numChildren();

            db.ref().child('users/' + userId ).update({average:totalSum / nbrOfElem});
            
          }
          
          
        });
      })
      .then(() => {
        // console.log('totalSum: ' + totalSum);
        // console.log('nbrOfElem: ' + avg);
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
