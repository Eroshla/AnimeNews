import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import firebase from '../../firebase/firebaseConfig';

import RedLine from '../../componentes/RedLine';

import Colors from '../../styles/Colors';

export default function Main() {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (userData) {
      if (userData) {
        userData.getIdTokenResult().then(IdTokenResult => {
          console.log(IdTokenResult.claims.isAdmin);
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultimas Noticias</Text>

      <View style={styles.redline}>
        <RedLine anime={''} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
  },
  redline: {
    flex: 1,
  },
});
