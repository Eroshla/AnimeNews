import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import firebase from '../../firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

export default function NewUser({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        let user = userCredential.user;
        firebase.firestore().collection('Users').doc(user.uid).set({
          email,
          isAdmin: false,
        })
      })
      .catch(error => {
        setErrorRegister(true);
        let errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <KeyboardAvoidingView
      behavio={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={styles.title}>TELA DE CADASTRO</Text>
      <TextInput
        style={styles.Textinput}
        placeholder="Email"
        type="text"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.Textinput}
        secureTextEntry={true}
        placeholder="Senha"
        type="text"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      {errorRegister === true ? (
        <View style={styles.alert}>
          <Icon name="error" size={30} color={Colors.black} />
          <Text style={styles.warnAlert}>Email ou senha inválido</Text>
        </View>
      ) : (
        <View />
      )}
      {email === '' || password === '' ? (
        <TouchableOpacity disabled={true} style={styles.buttonRegister}>
          <Text style={styles.buttonRegisterText}>Registrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={register} style={styles.buttonRegister}>
          <Text style={styles.buttonRegisterText}>Registrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Ja possui cadastro? Va para a tela de login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
});
