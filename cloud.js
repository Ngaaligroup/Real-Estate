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


exports.taverage = functions.database.ref('/User/tsetUser/monthQuit/{pushId}')
.onCreate((snapshot, context) => {
  return admin.database().ref('/User/tsetUser/inform/standardQuit').transaction(function(avg) {
    if (!avg) avg = 0;
    return (15.0 * avg + snapshot.val()) / 16.0;
  });
});

exports.taverage = functions.database.ref('/User/tsetUser/monthQuit/{pushId}')
.onCreate((snapshot, context) => {
    return admin.database().ref('/User/tsetUser/monthQuit/{pushId}').once('value')
    .then(function(snapshot) {
        let sum=0;
        snapshot.forEach(child => {
            sum = sum + child.val();
        })
        let avg = sum / snapshot.numChildren();

        return admin.database().ref('/User/tsetUser/inform/standardQuit').set(avg);
    });
});