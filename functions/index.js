const functions = require("firebase-functions");
var fetch = require("node-fetch");

const admin = require("firebase-admin");

exports.sendPushNotification = functions.database
  .ref("tips/{id}")
  .onCreate((event) => {
    const root = event.database.ref.root;
    var messages = [];

    return root
      .child("/users")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var expoToken = childSnapshot.val().token;
          if (expoToken) {
            messages.push({
              to: expoToken,
              body: "New Tips Added",
            });
          }
        });
        return Promise.all(messages);
      })
      .then((messages) => {
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        });
      });
  });

