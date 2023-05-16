import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import firebase from '../../firebase/firebaseConfig';

import ItemPage from '../ItemPage';

import Feed from '../Feed';

export default function Follow({navigation}) {
  const [anime, setAnime] = useState('');
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [newsModal, setNewsModal] = useState(false);
  const [uid, setUid] = useState('');
  const [feedModal, setFeedModal] = useState(false);

  const onClosePress = () => {
    setNewsModal(false);
  };

  const onClose = () => {
    setFeedModal(false);
  };

  const ref = firebase.firestore().collection('Animes');

  const searchUser = search => {
    ref.where('title', '>=', search).onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setAnime(data);
    });
  };

  return (
    <View>
      <Text>Follow</Text>
      <TouchableOpacity onPress={() => setFeedModal(true)}>
        <Text>Seguidos</Text>
      </TouchableOpacity>
      <Feed isVisible={feedModal} onExit={onClose} />
      <TextInput
        placeholder="anime"
        onChangeText={search => searchUser(search)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={anime}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setTitle(item.title);
              setSynopsis(item.synopsis);
              setUid(item.uid);
              setNewsModal(true);
            }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <ItemPage
        title={title}
        synopsis={synopsis}
        uid={uid}
        isVisible={newsModal}
        onExit={onClosePress}
      />
    </View>
  );
}
