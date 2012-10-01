//
//  getMacAddress.h
//  IQuestionMobile
//
//  Created by completemr on 10/1/12.
//
//

#import <Cordova/CDV.h>

@interface getMacAddress : CDVPlugin

- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
