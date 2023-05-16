import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import NewsModal from '../../componentes/NewsModal';

import RedLine from '../../componentes/RedLine';

export default function Feed({navigation}) {
  const [follows, setFollows] = useState('a', 'b');
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

  const onClosePress = () => {
    setNewsModal(false);
  };

  function itFollow() {
    const data = [];
    firebase
      .firestore()
      .collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .collection('Following')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const currentID = doc.id;
          data.push(currentID);
        });
        setFollows(data);
        console.log('a:' + follows);
      });
  }

  useEffect(() => {
    itFollow();
    //order();
    const ref = firebase
      .firestore()
      .collection('News')
      .where('anId', 'in', [...follows]);
    ref.onSnapshot(query => {
      const data = [];
      query.forEach(doc => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setNews(data);
      //console.log(news);
    });
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Follow')}>
        <Text>Follow</Text>
      </TouchableOpacity>
      <Text>Seguidos</Text>

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
