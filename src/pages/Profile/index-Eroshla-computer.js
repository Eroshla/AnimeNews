import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

export default function Profile({navigation}) {

  const [logged, setLogged] = useState(false);
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {logged === true ? (
        <View>
          <TouchableOpacity onPress={logout} style={styles.buttonLogin}>
            <Text style={styles.buttonLoginText}>Deslogar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Icon name="add" size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Logar-se</Text>
        </TouchableOpacity>
      )}

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
});
