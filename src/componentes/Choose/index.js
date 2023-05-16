import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

const ref = firebase.firestore().collection('Animes').orderBy('title', 'asc');

export default function ChooseModal({isVisible, onExit, SelectedAnime, id}) {
  const [anime, setAnime] = useState('');
  const [pressedAnime, setPressedAnime] = useState('');
  const [uid, setUid] = useState('');

  const onAnimePress = () => {
    SelectedAnime(pressedAnime);
    id(uid)
    console.log(SelectedAnime);
    onExit();
  };

  useEffect(() => {
    ref.onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setAnime(data);
    });
  }, []);
  return (
    <Modal visible={isVisible} transparent={false}>
      <View>
        <Text>ANIMES</Text>
        <FlatList
          data={anime}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setPressedAnime(item.title);
                    setUid(item.uid)
                    onAnimePress();
                    }}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <TouchableOpacity onPress={onExit}>
          <Text>sair</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
