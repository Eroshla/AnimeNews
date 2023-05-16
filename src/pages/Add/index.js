import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import firebase from '../../firebase/firebaseConfig';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ChooseModal from '../../componentes/Choose';

import DateTimePicker from 'react-native-modal-datetime-picker';

import Colors from '../../styles/Colors';

export default function Add({navigation}) {
  const [title, setTitle] = useState(null); //organizar aq
  const [subTitle, setSubTitle] = useState(null);
  const [text, setText] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [upload, setUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [postedAt, setPostedAt] = useState(new Date());
  const [dateVisible, setDateVisible] = useState(false);
  const [author, setAuthor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [anime, setAnime] = useState('');
  const [anId, setAnId] = useState('');

  const onClosePress = () => {
    setModalVisible(false);
  };

  const onCancel = () => {
    setDateVisible(false);
  };

  const onChangeValue = date => {
    setPostedAt(date);
    onCancel();
  };

  function addNews() {
    uploadImageAsync();
    firebase
      .firestore()
      .collection('News')
      .add({
        //organizar aq
        title,
        subTitle,
        text,
        imageUrl,
        imageName,
        postedAt,
        author,
        anime,
        anId: ' ' + anId,
      });
  }

  const uploadImageAsync = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('Get', imageUri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child('Imagens')
      .child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUpload(true);
      },
      error => {
        setUpload(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then(url => {
          setImageUrl(url);
          console.log('download url:', url);
          blob.close();
          return url;
        });
      },
    );
  };

  function imagePicker() {
    const options = {
      title: 'Escolha uma foto',
      mediaType: 'mixed',
    };
    launchImageLibrary(options, res => {
      console.log('Resposta= ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('eRROR:', res.errorMessage);
      } else {
        setImageUri(res.uri);
        setImageName(res.fileName);
      }
    });
  }

  return (
    <View>
      <TextInput
        style={styles.Textinput}
        placeholder="Titulo"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.Textinput}
        placeholder="Subtitulo"
        onChangeText={setSubTitle}
        value={subTitle}
      />
      <TextInput
        style={styles.Textinput}
        placeholder="Texto"
        onChangeText={setText}
        value={text}
        multiline={true}
        numberOfLines={10}
      />
      <TextInput
        style={styles.Textinput}
        placeholder="Autor"
        onChangeText={setAuthor}
        value={author}
      />
      {imageUri === null ? (
        <View />
      ) : (
        <Image source={{uri: imageUri}} style={{width: 150, height: 300}} />
      )}

      <TouchableOpacity
        onPress={() => {
          // organizar aq
          addNews();
          setTitle('');
          setSubTitle('');
          setText('');
          setImageUri(null);
          setAuthor('');
          navigation.navigate('Inicio');
        }}>
        <Text>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={imagePicker}>
        <Text>Colocar imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setDateVisible(true)}>
        <Icon name="today" size={30} color={Colors.white} />
      </TouchableOpacity>

      <DateTimePicker
        mode="date"
        datePickerModeAndroid="calendar"
        titleIOS="Data de vencimento"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Ok"
        date={postedAt}
        isVisible={dateVisible}
        onConfirm={onChangeValue}
        onCancel={onCancel}
      />

      {anime === '' ? (
        <View style={styles.alert}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>Anime?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>{anime}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ChooseModal
        isVisible={modalVisible}
        onExit={onClosePress}
        SelectedAnime={setAnime}
        id={setAnId}
      />

      <TouchableOpacity
        onPress={() => {
          //organizar aq
          navigation.navigate('Main');
          setTitle('');
          setSubTitle('');
          setText('');
          setImageUri(null);
        }}>
        <Text>sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Textinput: {
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.asphalt,
    width: 59,
    height: 59,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
});
