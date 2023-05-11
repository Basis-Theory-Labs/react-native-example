import {NativeModules, NativeEventEmitter, Platform} from 'react-native';

type ElementEventCallback = (elementEvent: ElementEvent) => void;

type GetSsnTextElementId = (callback: (id: string) => void) => void;

interface ElementEvent {
  complete: boolean;
  valid: boolean;
  maskSatisfied: boolean;
  empty: boolean;
}

export const addElementEventChangeListener = (
  getSsnTextElementId: GetSsnTextElementId,
  elementEventCallback: ElementEventCallback,
) => {
  if (Platform.OS === 'ios') {
    const {TextElementEvents: TextElementEventsModuleForIos} = NativeModules;

    const startListeningToElementEventsForIos = (id: string) =>
      TextElementEventsModuleForIos.startListening(id) as void;

    const TextElementEventsEmitterForIos = new NativeEventEmitter(
      TextElementEventsModuleForIos,
    );

    TextElementEventsEmitterForIos.addListener(
      'ElementEvents',
      iosElementEvent => {
        if (iosElementEvent) {
          elementEventCallback(iosElementEvent);
        }
      },
    );

    getSsnTextElementId(id => {
      startListeningToElementEventsForIos(id);
    });
  } else if (Platform.OS === 'android') {
    const TextElementEventsEmitterForAndroid = new NativeEventEmitter(
      NativeModules.SsnTextElementModule,
    );

    TextElementEventsEmitterForAndroid.addListener(
      'change_event',
      elementEvent => elementEventCallback(elementEvent),
    );
  }
};

export type {ElementEvent};
