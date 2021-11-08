import firebase from "./firebase";
import uuid from "uuid";
export default (file) => (onSuccess) => async (onError) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      onError();
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", file, true);
    xhr.send(null);
  });
  const ref = firebase.storage().ref().child("rncontacts").child(uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();
  const url = await snapshot.ref.getDownloadURL();
  onSuccess(url);
};
