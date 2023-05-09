/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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

interface SsnTextElementProps {
  style: Record<string, unknown>;
}

const SsnTextElement: HostComponent<SsnTextElementProps> =
  requireNativeComponent('SsnTextElement');

const {SsnTextElement: SsnTextElementModule} = NativeModules;

const tokenize = () => SsnTextElementModule.tokenize() as Promise<string>;

const dismissSsnKeyboard = () => SsnTextElementModule.dismissKeyboard() as void;

function App(): JSX.Element {
  const [text, setText] = useState<string>();

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
  tokenText: {
    marginTop: 25,
  },
});

export default App;
