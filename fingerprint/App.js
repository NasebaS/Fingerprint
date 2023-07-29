import { BackHandler, Modal, StyleSheet, Text, View, TouchableWithoutFeedback,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import TouchID from 'react-native-touch-id';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const optionalConfigObject = {
    title: 'Authentication Required',
    imageColor: isAuth ? '#38E54D' : '#A1C298',
    imageErrorColor: '#ff0000',
    sensorDescription: 'Touch sensor',
    sensorErrorDescription:isAuth ?'Authentication Success':'Authentication Failed',
    cancelText: 'Cancel',
    fallbackLabel: 'Show Passcode',
    unifiedErrors: false,
    passcodeFallback: false,
  };

  useEffect(() => {
    handleBiometric();
  }, []);

  const handleBiometric = () => {
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          if (isAuth) {
            return null;
          }
          TouchID.authenticate('', optionalConfigObject)
            .then((success) => {
              console.log('success', success);
              setIsAuth(success);
            
            })
            .catch((error) => {
              console.log('Error', error);
            });
        }
      })
      .catch((error) => {
        BackHandler.exitApp();
      });
  };

  return (
    <View>
      <Text>Hello World</Text>
      <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={{ color: '#000',fontSize:24,fontWeight:'bold',marginBottom:30,textAlign:'center' }}>Authentication Success</Text>
              <Image
                style={[styles.fingerprintImage, { tintColor: '#38E54D' }]}
                source={require('./android/app/src/assets/download.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fingerprintImage: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default App;
