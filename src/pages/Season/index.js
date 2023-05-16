import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import SeasonModal from '../../componentes/SeasonModal';

export default function Season() {
  const [season, setSeason] = useState('');
  const [Modal, setModal] = useState(false);
  const [seasonDate, setSeasonDate] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    ref = firebase.firestore().collection('Seasons');
    ref.onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setSeason(data);
    });
  }, []);

  const onClosePress = () => {
    setModal(false);
  };

  return (
    <View>
      <FlatList
        data={season}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setSeasonDate(item.season);
                  setUid(item.uid);
                }}>
                <Text>{item.season}</Text>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: 300, height: 150}}
                />
              </TouchableOpacity>
              <SeasonModal
                isVisible={Modal}
                onExit={onClosePress}
                season={seasonDate}
                uid={uid}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
