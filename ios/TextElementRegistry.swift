//
//  TextElementRegistry.swift
//  AwesomeProject
//
//  Created by Brian Gonzalez on 5/10/23.
//

import Foundation
import BasisTheoryElements

class TextElementRegistry {
  private static var registeredTextElements: [String:TextElementUITextField] = [:]
  
  private init() {}
  
  static func registerTextElement(id: String, ssnElement: TextElementUITextField) {
    registeredTextElements[id] = ssnElement
  }
  
  static func getRegisteredTextElement(id: String) -> TextElementUITextField? {
    return registeredTextElements[id]
  }
}
