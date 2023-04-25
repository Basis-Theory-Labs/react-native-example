//
//  SsnTextElement.m
//  AwesomeProject
//
//  Created by Brian Gonzalez on 2/23/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(SsnTextElement, RCTViewManager)

RCT_EXTERN_METHOD(
                  tokenize: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject
                  )

@end

