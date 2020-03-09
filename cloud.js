const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();

exports.average = functions.database
  .ref('/ratings/{blueId}/{greenId}')
  .onWrite((change, context) => {
    const blueId = context.params.blueId;
    const blueRef = db.ref('ratings/' + blueId);

    const blueAverageRef = db.ref('ratings/' + blueId + '/average');

    let totalSum = 0;
    let nbrOfElem = 0;

    return blueRef
      .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if (childSnapshot.val().val) {
            //console.log(childSnapshot.val());
            totalSum += childSnapshot.val().val;
            nbrOfElem++;
          }
        });
      })
      .then(() => {
        //console.log('totalSum: ' + totalSum);
        //console.log('nbrOfElem: ' + nbrOfElem);
         return blueAverageRef.transaction(function(average) {
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