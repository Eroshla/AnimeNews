import React, {useState, useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import RedLine from '../../componentes/RedLine';

export default function ItemPage({title, synopsis, uid, isVisible, onExit}) {
  const [following, setFollowing] = useState(false);

  const [ref] = useState(
    firebase
      .firestore()
      .collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .collection('Following'),
  );
  const onFollow = () => {
    ref.doc(String(' ' + uid)).set({
      uid: ' ' + uid,
    });
    console.log('FOLLOW');
  };
  const onUnFollow = () => {
    ref.doc(String(' ' + uid)).delete();
    console.log('unFOLLOW');
  };

  useEffect(() => {
    ref.onSnapshot(() => {
      ref
        .doc(String(' ' + uid))
        .get()
        .then(doc => {
          if (doc.exists) {
            setFollowing(false);
          } else {
            setFollowing(true);
          }
        });
    });
  });

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View>
        <Text>{title}</Text>
        <Text>{synopsis}</Text>

        {following ? (
          <TouchableOpacity onPress={onFollow}>
            <Text>Seguir</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onUnFollow}>
            <Text>Deixar de seguir</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            onExit();
          }}>
          <Text>sair</Text>
        </TouchableOpacity>

        <RedLine anime={title} />
      </View>
    </Modal>
  );
}
