import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import ItemPage from '../../pages/ItemPage';

export default function Function({uid}) {
  const [animes, setAnimes] = useState('');

  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [anId, setAnId] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log(uid);
    ref = firebase
      .firestore()
      .collection('Seasons')
      .doc(' ' + uid)
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

  const onClosePress = () => {
    setModal(false);
  };

  return (
    <View>
      <FlatList
        data={animes}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setTitle(item.title);
                  setSynopsis(item.synopsis);
                  setAnId(item.uid);
                  setModal(true);
                }}>
                <Text>{item.title}</Text>
              </TouchableOpacity>

              <ItemPage
                title={title}
                synopsis={synopsis}
                uid={anId}
                isVisible={modal}
                onExit={onClosePress}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
