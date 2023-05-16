import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function Create({navigation}) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('AddAnime')}>
        <Text>Criar Anime</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddSeason')}>
        <Text>Criar Temporada</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <Text>Criar Noticia</Text>
      </TouchableOpacity>
    </View>
  );
}
