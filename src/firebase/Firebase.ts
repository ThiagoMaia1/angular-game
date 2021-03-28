// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/app';
import 'firebase/analytics'
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDk_D3iZPyE9lEA6yZ1velPZoLiXEwthd8",
    authDomain: "ball-game-5d409.firebaseapp.com",
    projectId: "ball-game-5d409",
    storageBucket: "ball-game-5d409.appspot.com",
    messagingSenderId: "1022234520187",
    appId: "1:1022234520187:web:d40e6d88e297db4b4a50de",
    measurementId: "G-29TBKL5ZXE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const firestore = firebase.firestore();

export enum FirebaseCollections {
  scores = 'scores',
};

type FirebaseDoc = firebase.firestore.DocumentData;
type FirebaseSnapshot = firebase.firestore.DocumentSnapshot<FirebaseDoc>;

export const createNewRecord = async (collection : FirebaseCollections, data : any, gerarcreationTimestamp = false) => {
  let dataObj = JSON.parse(JSON.stringify(data));  
  let refRegistro = firestore.collection(FirebaseCollections[collection]).doc(); 
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    dataObj.timestamp = timestamp;
    if (gerarcreationTimestamp) dataObj.creationTimestamp = timestamp;
    try {
      await refRegistro.set(dataObj);
    } catch (error) {
      console.error("Erro ao adicionar registro à coleção: '" + collection + "'.", error);
    }
    let doc = await refRegistro.get();
    return getRecordObject(doc);
  };

  export const getRecord = async (collection : FirebaseCollections, id : string) => {
    var docRegistro = await firestore.doc(collection + '/' + id).get();
    return getRecordObject(docRegistro);
  }
  
  export async function getQueryRecords<T>(collection : FirebaseCollections, datum ?: keyof T, valor ?: any) {
    var collectionBD = await firestore.collection(FirebaseCollections[collection])
                      //  .where(datum as string, '==', valor)
                       .orderBy('timestamp', 'desc')
                       .get();
    return collectionBD.docs.reduce((resultado : T[], doc) => {
      let record = getRecordObject(doc);
      if (record) resultado.push(record as T);
      return resultado;
    }, []);
  }
  
  const getRecordObject = (doc : FirebaseSnapshot) => {
    if (!('data' in doc)) return null;
    let data = doc.data({serverTimestamps: "estimate"});
    if (data !== undefined) {
      data.strDate = formattedDate(data.timestamp.toDate());
      if (data.creationTimestamp)
        data.strCreationDate = formattedDate(data.creationTimestamp.toDate());
      data.id = doc.id;
    }
    return data;
  }
  
  export const deleteRecord = async (recordId : string, collection : FirebaseCollections) => {
    return firestore.collection(FirebaseCollections[collection]).doc(recordId).delete().then(function() {
      console.log("Registro excluído com sucesso.");
    }).catch(function(error : any) {
        console.error("Erro ao excluir registro: ", error);
    });
  }
  
  function formattedDate(date : Date) {
    return String(date.getDate()).padStart(2,'0') + '/' +
           String((date.getMonth()+1)).padStart(2,'0') + '/' +
           date.getFullYear() + ' ' +
           String(date.getHours()).padStart(2,'0') + ":" +   
           String(date.getMinutes()).padStart(2,'0')
  }
  