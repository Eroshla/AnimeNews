import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

export default function SeasonModal({isVisible, onExit, season, uid}) {

  const [animes, setAnimes] = useState('');

  useEffect(() => {
    console.log(uid)
    ref = firebase
      .firestore()
      .collection('Seasons')
      .doc(" "+uid)
      .collection('Animes');
    ref.onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setAnimes(data);
    });
  }, []);

  return (
    <Modal transparent={false} visible={isVisible}>
      <View>
        <TouchableOpacity onPress={onExit}>
          <Text> sair </Text>
        </TouchableOpacity>
        <Text>{season}</Text>
        <FlatList
        data={animes}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      </View>
    </Modal>
  );
}
