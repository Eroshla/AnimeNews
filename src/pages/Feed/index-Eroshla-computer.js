import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import RedLine from '../../componentes/RedLine';

export default function Feed({isVisible, onExit}) {
  const [follows, setFollows] = useState(' ');

  useEffect(() => {
    const data = [];
    firebase
      .firestore()
      .collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .collection('Following')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const currentID = doc.id;
          data.push(currentID);
          console.log('a:' + data);
        });
        setFollows(data);
        console.log('b:' + follows);
      });
  }, []);

  return (
    <Modal visible={isVisible} transparent={false}>
      <View>
        <TouchableOpacity
          onPress={() => {
            onExit();
          }}>
          <Text>Follow</Text>
        </TouchableOpacity>
        <Text>Seguidos</Text>
        <RedLine Feed={true} uid={follows} />
      </View>
    </Modal>
  );
}
