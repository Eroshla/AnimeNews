import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [userUid, setUserUid] = useState('');

  const loginFirebase = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userData = userCredential.user;
        setUserUid(userData.uid);
        navigation.navigate('Inicio');
        console.log(userData);
      })
      .catch(error => {
        setErrorLogin(true);
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate('Inicio');
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavio={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={styles.title}>TELA DE LOGIN</Text>
      <TextInput
        style={styles.Textinput}
        placeholder="Email"
        type="text"
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        style={styles.Textinput}
        secureTextEntry={true}
        placeholder="Senha"
        type="text"
        onChangeText={password => setPassword(password)}
        value={password}
      />
      {errorLogin === true ? (
        <View style={styles.alert}>
          <Icon name="error" size={30} color={Colors.black} />
          <Text style={styles.warnAlert}>Email ou senha inválido</Text>
        </View>
      ) : (
        <View />
      )}
      {email === '' || password === '' ? (
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={loginFirebase} style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('NewUser')}>
        <Text>Cadastrar-se</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  title: {
    alignSelf: 'center',
  },
  Textinput: {
    backgroundColor: Colors.grey,
  },
  alert: {},
  warnAlert: {},
  buttonLogin: {},
  buttonLoginText: {},
});
