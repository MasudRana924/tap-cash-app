import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { height: screenHeight } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
  const panY = useRef(new Animated.Value(0)).current;
  const maxTravel = -98; // Track height (170) - padding (12) - handle height (60) = 98 up
  const [done, setDone] = useState(false);

  // For the pulse animations
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !done,
      onMoveShouldSetPanResponder: () => !done,
      onPanResponderMove: (e, gestureState) => {
        if (done) return;
        let newY = gestureState.dy;
        if (newY > 0) newY = 0;
        if (newY < maxTravel) newY = maxTravel;
        panY.setValue(newY);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (done) return;
        if (gestureState.dy < maxTravel * 0.62) {
          // Complete the swipe
          setDone(true);
          Animated.timing(panY, {
            toValue: maxTravel,
            duration: 180,
            useNativeDriver: false,
          }).start(() => {
            setTimeout(() => {
              navigation.replace('Login');
            }, 180);
          });
        } else {
          // Reset
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const fillHeight = panY.interpolate({
    inputRange: [maxTravel, 0],
    outputRange: [158, 60],
    extrapolate: 'clamp',
  });

  const rScale = pulseAnim.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0.85, 0.95, 1.08],
  });
  const rOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <Icon name="zap" size={15} color="#FFFFFF" />
          </View>
          <Text style={styles.brandName}>TapCash</Text>
        </View>

        <View style={styles.illustration}>
          <Animated.View
            style={[
              styles.ring,
              styles.r1,
              { transform: [{ scale: rScale }], opacity: rOpacity },
            ]}
          />
          <Animated.View
            style={[
              styles.ring,
              styles.r2,
              { transform: [{ scale: rScale }], opacity: rOpacity },
            ]}
          />
          <View style={[styles.speedLine, styles.sl1]} />
          <View style={[styles.speedLine, styles.sl2]} />
          <View style={[styles.speedLine, styles.sl3]} />
          
          <View style={styles.tapCore}>
            <Icon name="navigation" size={32} color="#FFFFFF" style={{ transform: [{ rotate: '45deg' }] }} />
          </View>
          <View style={styles.coinBadge}>
            <Text style={styles.coinText}>৳</Text>
          </View>
        </View>

        <Text style={styles.headline}>Send money in one tap</Text>
        <Text style={styles.subtext}>
          No branch, no long forms. Just tap and your money is sent.
        </Text>

        <View style={styles.badges}>
          <View style={[styles.badge, styles.costBadge]}>
            <Icon name="arrow-down" size={13} color="#E0432E" />
            <Text style={styles.costBadgeText}>Low cost</Text>
          </View>
          <View style={[styles.badge, styles.speedBadge]}>
            <Icon name="zap" size={13} color="#9A6B15" />
            <Text style={styles.speedBadgeText}>Fast transfer</Text>
          </View>
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.swipeWrap}>
          <View style={styles.chevrons}>
            <Icon name="chevron-up" size={16} color="#0C7A52" style={styles.chevronIcon} />
            <Icon name="chevron-up" size={16} color="#0C7A52" style={styles.chevronIcon} />
            <Icon name="chevron-up" size={16} color="#0C7A52" style={styles.chevronIcon} />
          </View>
          
          <View style={styles.track}>
            <Animated.View style={[styles.trackFill, { height: fillHeight }]} />
            <Animated.View
              style={[styles.handle, { transform: [{ translateY: panY }] }]}
              {...panResponder.panHandlers}
            >
              <Icon name="arrow-up" size={24} color="#FFFFFF" />
            </Animated.View>
          </View>
          <Text style={styles.swipeLabel}>Swipe up to start</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  brand: {
    marginTop: Platform.OS === 'android' ? 54 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#0C7A52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1B2320',
  },
  illustration: {
    width: 200,
    height: 200,
    marginTop: 26,
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#E4F4EC',
  },
  r1: { width: 200, height: 200 },
  r2: { width: 160, height: 160 },
  speedLine: {
    position: 'absolute',
    backgroundColor: '#F4A93C',
    borderRadius: 2,
    opacity: 0.9,
  },
  sl1: { width: 26, height: 3, top: 38, left: 18, transform: [{ rotate: '-14deg' }] },
  sl2: { width: 18, height: 3, top: 60, left: 6, transform: [{ rotate: '-14deg' }] },
  sl3: { width: 20, height: 3, top: 20, left: 34, transform: [{ rotate: '-14deg' }] },
  tapCore: {
    zIndex: 2,
    width: 104,
    height: 104,
    borderRadius: 28,
    backgroundColor: '#0C7A52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinBadge: {
    position: 'absolute',
    zIndex: 3,
    right: 14,
    bottom: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4A93C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  coinText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#075C3D',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#1B2320',
    textAlign: 'center',
    lineHeight: 31,
    paddingHorizontal: 30,
  },
  subtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#5C6864',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 44,
  },
  badges: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    gap: 5,
  },
  costBadge: {
    backgroundColor: '#FCE7E3',
  },
  costBadgeText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#E0432E',
  },
  speedBadge: {
    backgroundColor: '#FDF0DC',
  },
  speedBadgeText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#9A6B15',
  },
  dots: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E9E6DC',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#0C7A52',
  },
  swipeWrap: {
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 10 : 28,
    alignItems: 'center',
    gap: 10,
  },
  chevrons: {
    alignItems: 'center',
    height: 24,
    overflow: 'hidden',
  },
  chevronIcon: {
    marginBottom: -8,
  },
  track: {
    width: 76,
    height: 170,
    borderRadius: 38,
    backgroundColor: '#FBFAF6',
    borderColor: '#E9E6DC',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 6,
  },
  trackFill: {
    position: 'absolute',
    bottom: 6,
    width: 62,
    borderRadius: 31,
    backgroundColor: '#E4F4EC', 
  },
  handle: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0C7A52',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0C7A52',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.30,
    shadowRadius: 20,
    elevation: 8,
  },
  swipeLabel: {
    fontSize: 12.5,
    color: '#5C6864',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 4,
  },
});

export default OnboardingScreen;
