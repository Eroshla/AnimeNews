import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';

import firebase from '../../firebase/firebaseConfig';
import NewsModal from '../NewsModal';

export default function RedLine({anime, Feed, uid}) {
  const [news, setNews] = useState([]); //organizar aq
  const [textModal, setTextModal] = useState();
  const [subTitleModal, setsubTitleModal] = useState();
  const [image, setImage] = useState();
  const [author, setAuthor] = useState();
  const [date, setDate] = useState(new Date());
  const [imageName, setImageName] = useState();
  const [id, setId] = useState();
  const [newsModal, setNewsModal] = useState(false);
  const [title, setTitle] = useState();

  const order = () => {
    if (anime === '') {
      ref = firebase.firestore().collection('News').orderBy('postedAt', 'desc');
    } else if (Feed === true) {
      ref = firebase
        .firestore()
        .collection('News')
        .where('anId', 'in', [...uid]);
        console.log('C:'+uid)
    } else {
      ref = firebase
        .firestore()
        .collection('News')
        .where('anId', '==', ' ' + anime);
    }
  };

  useEffect(() => {
    order();
    ref.onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setNews(data);
    });
  }, []);

  const onClosePress = () => {
    setNewsModal(false);
  };

  return (
    <View>
      <FlatList
        data={news}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setNewsModal(true); //organizar aq
                  setTitle(item.title);
                  setTextModal(item.text);
                  setsubTitleModal(item.subTitle);
                  setImage(item.imageUrl);
                  setAuthor(item.author);
                  setDate(item.postedAt);
                  setImageName(item.imageName);
                  setId(item.key);
                }}>
                <Text>{item.title}</Text>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: 100, height: 100}}
                />
              </TouchableOpacity>

              <NewsModal
                isVisible={newsModal} //organizar aq
                onExit={onClosePress}
                title={title}
                text={textModal}
                subTitle={subTitleModal}
                image={image}
                imageName={imageName}
                id={id}
                author={author}
                date={date}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
