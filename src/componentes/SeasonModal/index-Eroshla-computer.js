import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

import Function from './function';

export default function SeasonModal({isVisible, onExit, season, uid}) {

  return (
    <Modal transparent={false} visible={isVisible}>
      <View>
        <TouchableOpacity onPress={onExit}>
          <Text> sair </Text>
        </TouchableOpacity>
        <Text>{season}</Text>
        <Function uid={uid} />
      </View>
    </Modal>
  );
}
