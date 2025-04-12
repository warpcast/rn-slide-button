import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SlideButtonThumbProps } from './SlideButtonThumb';
import { SlideButtonTextProps } from './SlideButtonText';
import Animated from 'react-native-reanimated';
export declare type SlideButtonPropsExtends = Omit<SlideButtonCommonProps, 'translateX' | 'scrollDistance' | 'endReached' | 'isRTL'> & Omit<SlideButtonThumbProps, 'opacity' | 'gestureHandler' | 'translateX' | 'scrollDistance' | 'endReached' | 'isRTL'> & Omit<SlideButtonTextProps, 'translateX' | 'scrollDistance' | 'endReached' | 'isRTL'>;
interface SlideButtonProps extends SlideButtonPropsExtends {
    width?: number;
    disabled?: boolean;
    completeThreshold?: number;
    onSlideStart?: () => void;
    onSlideEnd?: (complete: boolean) => void;
    onReachedToStart?: () => void;
    onReachedToEnd?: () => void;
    underlayStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    autoReset?: boolean;
    autoResetDelay?: number;
}
export declare type SlideButtonCommonProps = {
    height?: number;
    borderRadius?: number;
    padding?: number;
    translateX: Animated.SharedValue<number>;
    endReached: boolean;
    scrollDistance: number;
    reverseSlideEnabled?: boolean;
    animation?: boolean;
    animationDuration?: number;
    dynamicResetEnabled?: boolean;
    dynamicResetDelaying?: boolean;
};
declare const _default: React.MemoExoticComponent<{
    ({ width, height, borderRadius, completeThreshold, disabled, padding, title, titleContainerStyle, titleStyle, icon, thumbStyle, containerStyle, underlayStyle, onReachedToStart, onReachedToEnd, onSlideEnd, onSlideStart, reverseSlideEnabled, autoReset, autoResetDelay, animation, animationDuration, dynamicResetEnabled, dynamicResetDelaying, }: SlideButtonProps): JSX.Element;
    defaultProps: {
        height: number;
        borderRadius: number;
        padding: number;
        title: string;
        completeThreshold: number;
        disabled: boolean;
        reverseSlideEnabled: boolean;
        autoReset: boolean;
        autoResetDelay: number;
        animation: boolean;
        animationDuration: number;
        dynamicResetEnabled: boolean;
        dynamicResetDelaying: boolean;
        onSlideStart: () => void;
        onSlideEnd: () => void;
        onReachedToStart: () => void;
        onReachedToEnd: () => void;
    };
}>;
export default _default;
