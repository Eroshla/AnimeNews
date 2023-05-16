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

import DateTimePicker from 'react-native-modal-datetime-picker';

import Colors from '../../styles/Colors';

export default function AddSeason({navigation}) {
  const [season, setSeason] = useState(null); //organizar aq
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [upload, setUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [postedAt, setPostedAt] = useState(new Date());
  const [dateVisible, setDateVisible] = useState(false);

  const onCancel = () => {
    setDateVisible(false);
  };

  const onChangeValue = date => {
    setPostedAt(date);
    onCancel();
  };

  function addNews() {
    uploadImageAsync();
    firebase.firestore().collection('Seasons').add({
      //organizar aq
      season,
      imageUrl,
      imageName,
      postedAt,
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
      season: 'Escolha uma foto',
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
        onChangeText={setSeason}
        value={season}
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
          setImageUri(null);
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

      <TouchableOpacity
        onPress={() => {
          //organizar aq
          navigation.navigate('Main');
          setSeason('');
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
