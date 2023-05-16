import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

import firebase from '../../firebase/firebaseConfig';
import moment from '../Vendors/moment';

export default function NewsModal({
  isVisible,
  onExit,
  text,
  subTitle,
  image,
  imageName,
  id,
  author,
  title,
  date,
}) {
  function removeNews() {
    firebase.firestore().collection('News').doc(id).delete();
    firebase.storage().ref().child('imagens/', imageName).delete;
  }

  return (
    <Modal transparent={false} visible={isVisible}>
      <View>
        <TouchableOpacity onPress={onExit}>
          <Text> sair </Text>
        </TouchableOpacity>
        <Text>
          {moment
            .unix(date)
            .subtract(1969, 'years')
            .subtract(3, 'hours')
            .calendar()}
        </Text>
        <Text> {title} </Text>
        <Text> {subTitle}</Text>
        <Text> {text}</Text>
        <Text> autor: {author} </Text>
        <Image source={{uri: image}} style={{width: 300, height: 300}} />
        <TouchableOpacity
          onPress={() => {
            removeNews(id);
            onExit();
          }}>
          <Icon name="highlight-remove" size={30} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
