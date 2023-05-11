/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  HostComponent,
  NativeModules,
  Pressable,
  requireNativeComponent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { addElementEventListener, ElementEvent } from './ElementEventEmitter';

// SsnTextElement: TextElementUITextField component instantiation and function definition
interface SsnTextElementProps {
  style: Record<string, unknown>;
}

const SsnTextElement: HostComponent<SsnTextElementProps> =
  requireNativeComponent('SsnTextElement');

const { SsnTextElement: SsnTextElementModule } = NativeModules;

const tokenize = () => SsnTextElementModule.tokenize() as Promise<string>;

const dismissSsnKeyboard = () => SsnTextElementModule.dismissKeyboard() as void;

const getSsnTextElementId = (callback: (id: string) => void) => SsnTextElementModule.getId(callback) as string;

// Main React Native app view
function App(): JSX.Element {
  const [text, setText] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>();
  const [isComplete, setIsComplete] = useState<boolean>();
  const [isMaskSatisified, setIsMaskSatisfied] = useState<boolean>();
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    addElementEventListener(getSsnTextElementId, (elementEvent: ElementEvent) => {
      setIsComplete(elementEvent.complete as boolean);
      setIsValid(elementEvent.valid as boolean);
      setIsMaskSatisfied(elementEvent.maskSatisfied as boolean);
      setIsEmpty(elementEvent.empty as boolean);
    });
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar />
      <TouchableWithoutFeedback onPress={dismissSsnKeyboard}>
        <View style={styles.container}>
          <TouchableWithoutFeedback style={styles.ssnTextElement}>
            <SsnTextElement style={styles.ssnTextElement} />
          </TouchableWithoutFeedback>
          <Pressable
            style={styles.tokenize}
            onPress={async () => {
              try {
                setText(await tokenize());
              } catch (e: any) {
                setText(e.toString());
              }
            }}>
            <Text style={styles.tokenizeText}>{'Tokenize'}</Text>
          </Pressable>
          <Text style={styles.elementEventText}>{`SSN is ${isValid ? 'valid' : 'invalid'
            }`}</Text>
          <Text style={styles.elementEventText}>{`SSN is ${isComplete ? 'complete' : 'incomplete'
            }`}</Text>
          <Text style={styles.elementEventText}>{`SSN mask is ${isMaskSatisified ? 'satisfied' : 'not satisfied'
            }`}</Text>
          <Text style={styles.elementEventText}>{`SSN is ${isEmpty ? 'empty' : 'not empty'
            }`}</Text>
          <Text style={styles.tokenText}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f2f8',
  },
  container: {
    paddingHorizontal: 25,
    paddingTop: 75,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ssnTextElement: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  tokenize: {
    display: 'flex',
    width: 125,
    height: 50,
    border: 'none',
    backgroundColor: '#007aff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  tokenizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  elementEventText: {
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 10
  },
  tokenText: {
    marginTop: 25,
  },
});

export default App;
