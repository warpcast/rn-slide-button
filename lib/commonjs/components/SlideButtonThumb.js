"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_ICON_CONTAINER_COLOR = '#FFFFFF';

const SlideButtonThumb = ({
  icon,
  gestureHandler,
  translateX,
  height,
  padding,
  endReached,
  borderRadius,
  thumbStyle,
  animStarted,
  animEnded,
  isRTL,
  animation,
  animationDuration,
  dynamicResetEnabled,
  dynamicResetDelaying
}) => {
  const opacityValue = (0, _reactNativeReanimated.useSharedValue)(1);

  const play = () => {
    const repeatCount = dynamicResetEnabled ? -1 : 6;
    opacityValue.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withTiming)(0.4, {
      duration: animationDuration,
      easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease)
    }), repeatCount, true, () => {
      (0, _reactNativeReanimated.runOnJS)(animFinished)();
    });
  };

  const stop = () => {
    (0, _reactNativeReanimated.cancelAnimation)(opacityValue);
    (0, _reactNativeReanimated.runOnJS)(animFinished)();
  };

  const animFinished = () => {
    animEnded && animEnded();
  };

  const thumbAnimStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: endReached ? opacityValue.value : 1,
      transform: [{
        translateX: translateX.value
      }]
    };
  }); //const KEY = isRTL ? 'right' : 'left';

  const thumbDynamicStyle = {
    left: padding,
    width: height,
    height,
    borderRadius
  };
  const iconContainerDynamicStyle = {
    width: height,
    height,
    borderRadius,
    transform: [{
      scaleX: isRTL ? -1 : 1
    }]
  };

  _react.default.useEffect(() => {
    if (endReached) {
      if (animation) {
        animStarted && animStarted();
        play();
      }
    }
  }, [endReached]);

  _react.default.useEffect(() => {
    if (dynamicResetEnabled) {
      if (!dynamicResetDelaying) {
        stop();
      }
    }
  }, [dynamicResetDelaying]);

  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    testID: "ThumbContainer",
    style: [styles.thumbContainer, thumbAnimStyle, thumbDynamicStyle, thumbStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    testID: "IconContainer",
    style: [styles.iconContainer, iconContainerDynamicStyle]
  }, icon)));
};

var _default = /*#__PURE__*/_react.default.memo(SlideButtonThumb);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  thumbContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_ICON_CONTAINER_COLOR,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    elevation: 3
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=SlideButtonThumb.js.map