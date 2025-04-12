"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _SlideButtonThumb = _interopRequireDefault(require("./SlideButtonThumb"));

var _SlideButtonText = _interopRequireDefault(require("./SlideButtonText"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_HEIGHT = 56;
const DEFAULT_BORDER_RADIUS = DEFAULT_HEIGHT / 2;
const DEFAULT_CONTAINER_PADDING = 5;
const DEFAULT_COMPLETE_THRESHOLD = 70;
const DEFAULT_CONTAINER_COLOR = '#0095FF';
const DEFAULT_UNDERLAY_COLOR = '#42AAFF';
const DEFAULT_TITLE = 'Slide to confirm';
const DEFAULT_AUTO_RESET = false;
const DEFAULT_AUTO_RESET_DELAY = 1080;
const DEFAULT_ANIMATION = false;
const DEFAULT_ANIMATION_DURATION = 180;

const SlideButton = ({
  width,
  height,
  borderRadius,
  completeThreshold,
  disabled,
  padding,
  title,
  titleContainerStyle,
  titleStyle,
  icon,
  thumbStyle,
  containerStyle,
  underlayStyle,
  onReachedToStart,
  onReachedToEnd,
  onSlideEnd,
  onSlideStart,
  reverseSlideEnabled,
  autoReset,
  autoResetDelay,
  animation,
  animationDuration,
  dynamicResetEnabled,
  dynamicResetDelaying
}) => {
  const [dimensions, setDimensions] = _react.default.useState({
    width: 0,
    height: 0
  });

  const [endReached, setEndReached] = _react.default.useState(false);

  const timeoutRef = _react.default.useRef();

  const gestureDisabled = (0, _reactNativeReanimated.useSharedValue)(disabled);
  const dragX = (0, _reactNativeReanimated.useSharedValue)(0);
  const isRTL = _reactNative.I18nManager.isRTL;
  const rtlMultiplier = isRTL ? -1 : 1;
  const opacity = disabled ? 0.55 : 1;
  let borderWidth = 0;
  let thumbWidth = height - padding * 2;
  let childHeight = height - padding * 2;

  if (thumbStyle !== undefined) {
    let tWidth = _reactNative.StyleSheet.flatten(thumbStyle).width;

    if (tWidth !== undefined) {
      thumbWidth = Number(tWidth);
    }
  }

  if (containerStyle !== undefined) {
    let bWidth = _reactNative.StyleSheet.flatten(containerStyle).borderWidth;

    if (bWidth !== undefined) {
      borderWidth = Number(bWidth);
    }
  }

  const radius = borderRadius - padding;
  const scrollDistance = (dimensions.width - padding * 2 - thumbWidth - borderWidth * 2) * rtlMultiplier;
  const slideThreshold = scrollDistance * (completeThreshold / 100);

  const onLayoutContainer = async e => {
    const {
      width,
      height
    } = e.nativeEvent.layout;
    const {
      width: w,
      height: h
    } = dimensions;

    if (w !== width || h !== height) {
      setDimensions({
        width,
        height
      });
    }
  };

  _react.default.useEffect(() => {
    gestureDisabled.value = disabled;
  }, [disabled]);

  _react.default.useEffect(() => {
    if (dynamicResetEnabled && !dynamicResetDelaying) {
      reset();
    }
  }, [dynamicResetDelaying]);

  _react.default.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const underlayAnimStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      width: thumbWidth - borderWidth * 2 + dragX.value * rtlMultiplier
    };
  }); //let KEY = isRTL ? 'right' : 'left';

  const underlayDynamicStyle = {
    left: padding,
    height: childHeight - borderWidth * 2,
    borderRadius: radius
  };

  const handleComplete = reached => {
    // console.log(`handleComplete: ${reached}`);
    if (reached) {
      setEndReached(true);
      onReachedToEnd && onReachedToEnd();

      if (!dynamicResetEnabled) {
        if (autoReset) {
          gestureDisabled.value = true;
          timeoutRef.current = setTimeout(() => {
            reset();
          }, autoResetDelay);
        }
      }

      if (!reverseSlideEnabled) {
        gestureDisabled.value = true;
      }
    } else {
      setEndReached(false);
      onReachedToStart && onReachedToStart();
    }
  };

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';

    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const reset = () => {
    'worklet';

    dragX.value = (0, _reactNativeReanimated.withSpring)(0, {
      damping: 20,
      stiffness: 100
    }, () => {
      (0, _reactNativeReanimated.runOnJS)(handleComplete)(false);
    });
    gestureDisabled.value = false;
  };

  const moveTo = (value, complete) => {
    'worklet';

    dragX.value = (0, _reactNativeReanimated.withSpring)(value, {
      damping: 20,
      stiffness: 100
    }, () => {
      (0, _reactNativeReanimated.runOnJS)(handleComplete)(complete);
    });
  };

  const animatedGestureHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, context) => {
      context.startX = dragX.value;
      (0, _reactNativeReanimated.runOnJS)(onSlideStart)();
    },
    onActive: (event, context) => {
      if (gestureDisabled.value) {
        return;
      }

      const translationX = context.startX + event.translationX;

      if (isRTL) {
        dragX.value = clamp(translationX, scrollDistance, 0);
      } else {
        dragX.value = clamp(translationX, 0, scrollDistance);
      }
    },
    onEnd: () => {
      // console.log(`onEnd: dragX : ${dragX.value}`);
      if (gestureDisabled.value) {
        return;
      }

      (0, _reactNativeReanimated.runOnJS)(onSlideEnd)(dragX.value > slideThreshold);

      if (isRTL) {
        if (dragX.value > slideThreshold) {
          if (dragX.value === 0) {
            (0, _reactNativeReanimated.runOnJS)(handleComplete)(false);
            return;
          }

          moveTo(0, false);
        } else {
          if (dragX.value === scrollDistance) {
            (0, _reactNativeReanimated.runOnJS)(handleComplete)(true);
            return;
          }

          moveTo(scrollDistance, true);
        }
      } else {
        if (dragX.value < slideThreshold) {
          if (dragX.value === 0) {
            (0, _reactNativeReanimated.runOnJS)(handleComplete)(false);
            return;
          }

          moveTo(0, false);
        } else {
          if (dragX.value === scrollDistance) {
            (0, _reactNativeReanimated.runOnJS)(handleComplete)(true);
            return;
          }

          moveTo(scrollDistance, true);
        }
      }
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      opacity
    }, containerStyle, {
      height,
      borderRadius,
      ...(width ? {
        width
      } : {})
    }],
    onLayout: onLayoutContainer
  }, /*#__PURE__*/_react.default.createElement(_SlideButtonText.default, {
    title: title,
    titleStyle: titleStyle,
    titleContainerStyle: titleContainerStyle,
    height: childHeight,
    padding: padding,
    borderRadius: radius,
    translateX: dragX,
    scrollDistance: scrollDistance
  }), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    testID: "Underlay",
    style: [styles.underlayContainer, underlayStyle, underlayAnimStyle, underlayDynamicStyle]
  }), /*#__PURE__*/_react.default.createElement(_SlideButtonThumb.default, {
    gestureHandler: animatedGestureHandler,
    translateX: dragX,
    icon: icon,
    borderRadius: radius,
    height: childHeight,
    padding: padding,
    endReached: endReached,
    scrollDistance: scrollDistance,
    thumbStyle: thumbStyle,
    isRTL: isRTL,
    animation: animation,
    animationDuration: animationDuration,
    dynamicResetEnabled: dynamicResetEnabled,
    dynamicResetDelaying: dynamicResetDelaying,
    animStarted: () => {
      if (reverseSlideEnabled) {
        gestureDisabled.value = true;
      }
    },
    animEnded: () => {
      if (reverseSlideEnabled) {
        gestureDisabled.value = false;
      }
    }
  }));
};

var _default = /*#__PURE__*/_react.default.memo(SlideButton);

exports.default = _default;
SlideButton.defaultProps = {
  height: DEFAULT_HEIGHT,
  borderRadius: DEFAULT_BORDER_RADIUS,
  padding: DEFAULT_CONTAINER_PADDING,
  title: DEFAULT_TITLE,
  completeThreshold: DEFAULT_COMPLETE_THRESHOLD,
  disabled: false,
  reverseSlideEnabled: true,
  autoReset: DEFAULT_AUTO_RESET,
  autoResetDelay: DEFAULT_AUTO_RESET_DELAY,
  animation: DEFAULT_ANIMATION,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  dynamicResetEnabled: false,
  dynamicResetDelaying: false,
  onSlideStart: () => {},
  onSlideEnd: () => {},
  onReachedToStart: () => {},
  onReachedToEnd: () => {}
};

const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: DEFAULT_CONTAINER_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    height: DEFAULT_HEIGHT,
    borderRadius: DEFAULT_BORDER_RADIUS // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,

  },
  underlayContainer: {
    position: 'absolute',
    backgroundColor: DEFAULT_UNDERLAY_COLOR
  }
});
//# sourceMappingURL=SlideButton.js.map