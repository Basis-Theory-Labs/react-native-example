//
//  SsnTextElementEvents.m
//  AwesomeProject
//
//  Created by Brian Gonzalez on 5/10/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(TextElementEvents, RCTEventEmitter)

RCT_EXTERN_METHOD(startListening: (NSString *) id)

@end
