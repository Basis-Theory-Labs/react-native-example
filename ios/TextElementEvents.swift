//
//  TextElementEvents.swift
//  AwesomeProject
//
//  Created by Brian Gonzalez on 5/10/23.
//

import Combine

@objc(TextElementEvents) class TextElementEvents: RCTEventEmitter {
  let ELEMENT_EVENTS: String = "ElementEvents";
  private var cancellables = Set<AnyCancellable>()
  
  override func supportedEvents() -> [String]! {
    return [ELEMENT_EVENTS]
  }
    
  @objc public func startListening(_ id: String) {
    let textElement = TextElementRegistry.getRegisteredTextElement(id: id)
    
    guard textElement != nil else {
      return;
    }
    
    textElement!.subject.sink { completion in
      self.sendEvent(withName: self.ELEMENT_EVENTS, body: ["completion": ""])
    } receiveValue: { message in
      self.sendEvent(withName: self.ELEMENT_EVENTS, body: [
        "valid": message.valid,
        "complete": message.complete,
        "maskSatisfied": message.maskSatisfied,
        "empty": message.empty,
      ])
    }.store(in: &cancellables)
  }
  
  @objc public func stopListening() {
    for cancellable in cancellables {
      cancellable.cancel()
    }
  }
  
  override static func requiresMainQueueSetup() -> Bool { return true }
}
