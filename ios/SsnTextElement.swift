//
//  SsnTextElement.swift
//  AwesomeProject
//
//  Created by Brian Gonzalez on 2/23/23.
//

import Foundation
import UIKit
import BasisTheoryElements

@objc(SsnTextElement) class SsnTextElement: RCTViewManager {
  let ssnTextElement = TextElementUITextField()
  let id = UUID().uuidString
  
  override func view() -> UIView! {
    let regexDigit = try! NSRegularExpression(pattern: "\\d")
    let ssnMask: [Any] = [
      regexDigit,
      regexDigit,
      regexDigit,
      "-",
      regexDigit,
      regexDigit,
      "-",
      regexDigit,
      regexDigit,
      regexDigit,
      regexDigit,
    ]
    let ssnRegex = try! NSRegularExpression(pattern: "^\\d{3}-\\d{2}-\\d{4}$")
    
    try! ssnTextElement.setConfig(options: TextElementOptions(mask: ssnMask, validation: ssnRegex))
    
    ssnTextElement.layer.cornerRadius = 16.0
    ssnTextElement.layer.borderWidth = 1.0
    ssnTextElement.layer.borderColor = UIColor( red: 209/255, green: 209/255, blue: 214/255, alpha: 1.0 ).cgColor
    ssnTextElement.layer.masksToBounds = true
    ssnTextElement.backgroundColor = .white
    ssnTextElement.placeholder = "Enter SSN"
    ssnTextElement.leftView = UIView(frame: CGRect(x: 0, y: 0, width: 20, height: 20))
    ssnTextElement.leftViewMode = .always
    
    TextElementRegistry.registerTextElement(id: id, textElement: ssnTextElement)
    
    return ssnTextElement
  }
  
  @objc public func tokenize(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    let body = CreateToken(type: "token", data: [
      "ssn": self.ssnTextElement,
    ])
    
    BasisTheoryElements.createToken(body: body, apiKey: "test_1234567890") {
      data, error in
      guard error == nil else {
        resolve(String(describing: error))
        return
      }
      
      let encoder = JSONEncoder()
      let json = try! encoder.encode(data)
      resolve(String(data: json, encoding: .utf8)!)
    }
  }
  
  @objc public func dismissKeyboard() {
    DispatchQueue.main.async {
      self.ssnTextElement.endEditing(true)
    }
  }
  
  @objc public func getId(_ callback: RCTResponseSenderBlock) {
    callback([id])
  }
  
  @objc static override func requiresMainQueueSetup() -> Bool { return true }
}
