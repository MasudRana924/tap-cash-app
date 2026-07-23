import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  PanResponder,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Svg, {
  Rect,
  Circle,
  Line,
  Path,
  Text as SvgText,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#fff',
  card: '#E8E8E8',
  black: '#5b6161',
  dark: '#CFCFCF',
  gray: '#777777',
  lightGray: '#CFCFCF',
  lighter: '#E2E2E2',
  white: '#FFFFFF',
};

const slides = [
  {
    id: 0,
    eyebrow: 'MOBILE FINANCIAL SERVICE',
    title: 'Send Money\nAnywhere',
    description:
      'Transfer cash to any number instantly — 24/7, no bank account needed. Your family receives it in seconds.',
  },
  {
    id: 1,
    eyebrow: 'PAYMENTS & RECHARGE',
    title: 'Pay, Scan &\nRecharge',
    description:
      'Scan QR to pay merchants, pay your utility bills, or top up any mobile — all from one place.',
  },
];

// ============================================================
// SLIDE 1 ILLUSTRATION
// ============================================================

function SendMoneyIllustration() {
  return (
    <View style={styles.svgContainer}>
      <Svg width="340" height="310" viewBox="0 0 340 310">
        {/* Background circles */}
        <Circle cx="170" cy="155" r="135" fill="none" stroke="#DDDDDD" strokeWidth="1" />
        <Circle cx="170" cy="155" r="112" fill="none" stroke="#E3E3E3" strokeWidth="1" />

        {/* ================================================= */}
        {/* MAIN PHONE */}
        {/* ================================================= */}
        <Rect x="75" y="15" width="190" height="285" rx="27" fill="#D3D3DD" />
        <Rect x="82" y="43" width="176" height="248" rx="19" fill="#D3D3DD" />

        {/* Header */}
        <Rect x="82" y="43" width="176" height="70" rx="19" fill="#D3D3DD" />
        <Rect x="82" y="88" width="176" height="25" fill="#D3D3DD" />

        {/* Greeting */}
        <SvgText x="96" y="68" fill="#999999" fontSize="8">
          {'Good morning,'}
        </SvgText>
        <SvgText x="96" y="84" fill="#FFFFFF" fontSize="11" fontWeight="700">
          {'Rahim Ahmed'}
        </SvgText>

        {/* Balance */}
        <Rect x="195" y="58" width="52" height="32" rx="8" fill="#383838" />
        <SvgText x="221" y="70" fill="#999999" fontSize="6" textAnchor="middle">
          {'BALANCE'}
        </SvgText>
        <SvgText x="221" y="83" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
          {'৳1,240'}
        </SvgText>

        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        {/* Send Money */}
        <Rect x="92" y="122" width="32" height="32" rx="9" fill="#E4E4E4" />
        <Circle cx="108" cy="138" r="8" fill="#252828" />
        <Path
          d="M104 138 L112 138 M109 134 L112 138 L109 142"
          stroke="#EEEEEE"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <SvgText x="108" y="166" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Send'}
        </SvgText>
        <SvgText x="108" y="174" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Money'}
        </SvgText>

        {/* Cash Out */}
        <Rect x="136" y="122" width="32" height="32" rx="9" fill="#E4E4E4" />
        <Circle cx="152" cy="138" r="8" fill="#444444" />
        <Path
          d="M152 133 L152 143 M148 140 L152 143 L156 140"
          stroke="#EEEEEE"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <SvgText x="152" y="166" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Cash'}
        </SvgText>
        <SvgText x="152" y="174" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Out'}
        </SvgText>

        {/* Payment */}
        <Rect x="180" y="122" width="32" height="32" rx="9" fill="#E4E4E4" />
        <Rect x="187" y="131" width="18" height="14" rx="3" fill="#D3D3DD" />
        <Line x1="187" y1="135" x2="205" y2="135" stroke="#252828" strokeWidth="2" />
        <SvgText x="196" y="166" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Payment'}
        </SvgText>

        {/* Recharge */}
        <Rect x="224" y="122" width="32" height="32" rx="9" fill="#E4E4E4" />
        <Circle cx="240" cy="138" r="8" fill="#444444" />
        <Path d="M240 131 L236 139 L240 139 L239 145 L244 137 L240 137 Z" fill="#DDDDDD" />
        <SvgText x="240" y="166" fill="#555555" fontSize="6.5" textAnchor="middle">
          {'Recharge'}
        </SvgText>

        {/* ================================================= */}
        {/* SECOND ROW */}
        {/* ================================================= */}
        <Rect x="92" y="184" width="32" height="30" rx="9" fill="#EAEAEA" />
        <Circle cx="108" cy="199" r="7" fill="#252828" />
        <SvgText x="108" y="224" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Bill Pay'}
        </SvgText>

        <Rect x="136" y="184" width="32" height="30" rx="9" fill="#EAEAEA" />
        <Circle cx="152" cy="199" r="7" fill="#252828" />
        <SvgText x="152" y="224" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Savings'}
        </SvgText>

        <Rect x="180" y="184" width="32" height="30" rx="9" fill="#EAEAEA" />
        <Circle cx="196" cy="199" r="7" fill="#252828" />
        <SvgText x="196" y="224" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'Loan'}
        </SvgText>

        <Rect x="224" y="184" width="32" height="30" rx="9" fill="#EAEAEA" />
        <Circle cx="240" cy="199" r="7" fill="#252828" />
        <SvgText x="240" y="224" fill="#252828" fontSize="6.5" textAnchor="middle">
          {'More'}
        </SvgText>

        {/* ================================================= */}
        {/* RECENT TRANSACTIONS */}
        {/* ================================================= */}
        <SvgText x="96" y="242" fill="#D3D3DD" fontSize="7.5" fontWeight="700">
          {'Recent Transactions'}
        </SvgText>
        <Circle cx="101" cy="257" r="7" fill="#D3D3DD" />
        <SvgText x="101" y="260" fill="#FFFFFF" fontSize="5.5" textAnchor="middle">
          {'SK'}
        </SvgText>
        <SvgText x="114" y="255" fill="#D3D3DD" fontSize="6.8" fontWeight="700">
          {'Shahin Khan'}
        </SvgText>
        <SvgText x="114" y="264" fill="#999999" fontSize="6">
          {'Send Money'}
        </SvgText>
        <SvgText x="247" y="255" fill="#D3D3DD" fontSize="7" fontWeight="700" textAnchor="end">
          {'- ৳500'}
        </SvgText>
        <SvgText x="247" y="264" fill="#AAAAAA" fontSize="6" textAnchor="end">
          {'Today'}
        </SvgText>
        <Line x1="96" y1="271" x2="247" y2="271" stroke="#DDDDDD" strokeWidth="1" />

        {/* ================================================= */}
        {/* FLOATING SUCCESS CARD */}
        {/* ================================================= */}
        <Rect x="195" y="5" width="132" height="50" rx="14" fill="#3a3e3e" />
        <Circle cx="214" cy="30" r="10" fill="#383838" />
        <Path
          d="M209 30 L213 34 L219 27"
          stroke="#DDDDDD"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <SvgText x="229" y="27" fill="#999999" fontSize="7.5">
          {'Transfer sent!'}
        </SvgText>
        <SvgText x="229" y="41" fill="#FFFFFF" fontSize="11" fontWeight="700">
          {'৳500'}
        </SvgText>

        {/* ================================================= */}
        {/* AGENT CARD */}
        {/* ================================================= */}
        <Rect x="8" y="220" width="74" height="60" rx="14" fill="#F7F7F7" />
        <Rect x="18" y="230" width="26" height="17" rx="4" fill="#D3D3DD" />
        <SvgText x="48" y="238" fill="#D3D3DD" fontSize="7.5" fontWeight="700">
          {'Agent'}
        </SvgText>
        <SvgText x="48" y="248" fill="#999999" fontSize="6.5">
          {'Nearby'}
        </SvgText>
        <SvgText x="45" y="269" fill="#666666" fontSize="7" fontWeight="600" textAnchor="middle">
          {'0.3 km away'}
        </SvgText>
      </Svg>
    </View>
  );
}

// ============================================================
// SLIDE 2 ILLUSTRATION
// ============================================================

function PayIllustration() {
  return (
    <View style={styles.svgContainer}>
      <Svg width="340" height="310" viewBox="0 0 340 310">
        {/* Background */}
        <Circle cx="170" cy="155" r="135" fill="none" stroke="#DDDDDD" strokeWidth="1" />

        {/* ================================================= */}
        {/* MAIN PHONE */}
        {/* ================================================= */}
        <Rect x="72" y="12" width="196" height="292" rx="28" fill="#D3D3DD" />
        <Rect x="79" y="42" width="182" height="255" rx="20" fill="#D3D3DD" />

        {/* Title */}
        <SvgText x="170" y="67" fill="#EEEEEE" fontSize="11" fontWeight="700" textAnchor="middle">
          {'Scan to Pay'}
        </SvgText>
        <SvgText x="170" y="80" fill="#777777" fontSize="7" textAnchor="middle">
          {'Scan any Paylo QR code'}
        </SvgText>

        {/* QR BOX */}
        <Rect x="98" y="90" width="144" height="140" rx="16" fill="#D3D3DD" />

        {/* QR Finder 1 */}
        <Rect x="110" y="102" width="29" height="29" rx="4" fill="#444444" />
        <Rect x="115" y="107" width="19" height="19" rx="2" fill="#D3D3DD" />
        <Rect x="119" y="111" width="11" height="11" fill="#999999" />

        {/* QR Finder 2 */}
        <Rect x="201" y="102" width="29" height="29" rx="4" fill="#444444" />
        <Rect x="206" y="107" width="19" height="19" rx="2" fill="#D3D3DD" />
        <Rect x="210" y="111" width="11" height="11" fill="#999999" />

        {/* QR Finder 3 */}
        <Rect x="110" y="189" width="29" height="29" rx="4" fill="#444444" />
        <Rect x="115" y="194" width="19" height="19" rx="2" fill="#D3D3DD" />
        <Rect x="119" y="198" width="11" height="11" fill="#999999" />

        {/* QR dots */}
        <Rect x="151" y="105" width="5" height="5" fill="#252828" />
        <Rect x="160" y="105" width="5" height="5" fill="#777777" />
        <Rect x="169" y="105" width="5" height="5" fill="#999999" />
        <Rect x="151" y="115" width="5" height="5" fill="#777777" />
        <Rect x="169" y="115" width="5" height="5" fill="#252828" />
        <Rect x="180" y="115" width="5" height="5" fill="#999999" />
        <Rect x="151" y="126" width="5" height="5" fill="#999999" />
        <Rect x="162" y="126" width="5" height="5" fill="#777777" />
        <Rect x="180" y="126" width="5" height="5" fill="#252828" />
        <Rect x="151" y="140" width="5" height="5" fill="#777777" />
        <Rect x="169" y="140" width="5" height="5" fill="#999999" />
        <Rect x="180" y="140" width="5" height="5" fill="#777777" />
        <Rect x="151" y="154" width="5" height="5" fill="#999999" />
        <Rect x="162" y="154" width="5" height="5" fill="#777777" />
        <Rect x="180" y="154" width="5" height="5" fill="#252828" />
        <Rect x="151" y="168" width="5" height="5" fill="#252828" />
        <Rect x="169" y="168" width="5" height="5" fill="#999999" />
        <Rect x="180" y="168" width="5" height="5" fill="#777777" />
        <Rect x="151" y="181" width="5" height="5" fill="#777777" />
        <Rect x="162" y="181" width="5" height="5" fill="#252828" />
        <Rect x="180" y="181" width="5" height="5" fill="#999999" />

        {/* Scan line */}
        <Line x1="105" y1="159" x2="235" y2="159" stroke="#AAAAAA" strokeWidth="1.5" />

        {/* Merchant card */}
        <Rect x="98" y="239" width="144" height="48" rx="12" fill="#3a3e3e" />
        <Circle cx="119" cy="263" r="12" fill="#3A3A3A" />
        <SvgText x="119" y="267" fill="#252828" fontSize="7" fontWeight="700" textAnchor="middle">
          {'AG'}
        </SvgText>
        <SvgText x="136" y="257" fill="#EEEEEE" fontSize="8" fontWeight="700">
          {'Agora Supershop'}
        </SvgText>
        <SvgText x="136" y="269" fill="#777777" fontSize="6.5">
          {'Merchant · Dhaka'}
        </SvgText>

        {/* ================================================= */}
        {/* BILL PAY CARD */}
        {/* ================================================= */}
        <Rect x="5" y="80" width="82" height="100" rx="16" fill="#F7F7F7" />
        <Rect x="17" y="92" width="28" height="28" rx="8" fill="#252828" />
        <SvgText x="50" y="104" fill="#252828" fontSize="7" fontWeight="700">
          {'Bill Pay'}
        </SvgText>
        <SvgText x="50" y="114" fill="#999999" fontSize="6.5">
          {'Auto-pay'}
        </SvgText>
        <Line x1="17" y1="127" x2="75" y2="127" stroke="#DDDDDD" strokeWidth="1" />
        <SvgText x="17" y="140" fill="#999999" fontSize="6.5">
          {'WASA Bill'}
        </SvgText>
        <SvgText x="75" y="140" fill="#D3D3DD" fontSize="7" fontWeight="700" textAnchor="end">
          {'৳380'}
        </SvgText>
        <SvgText x="17" y="153" fill="#999999" fontSize="6.5">
          {'Electricity'}
        </SvgText>
        <SvgText x="75" y="153" fill="#D3D3DD" fontSize="7" fontWeight="700" textAnchor="end">
          {'৳620'}
        </SvgText>

        {/* ================================================= */}
        {/* RECHARGE CARD */}
        {/* ================================================= */}
        <Rect x="258" y="60" width="78" height="96" rx="16" fill="#3a3e3e" />
        <Rect x="270" y="72" width="24" height="28" rx="5" fill="#363636" />
        <SvgText x="298" y="82" fill="#252828" fontSize="6.5">
          {'Mobile'}
        </SvgText>
        <SvgText x="298" y="93" fill="#EEEEEE" fontSize="7.5" fontWeight="700">
          {'Recharge'}
        </SvgText>
        <Line x1="270" y1="107" x2="326" y2="107" stroke="#D3D3DD" strokeWidth="1" />
        <SvgText x="270" y="120" fill="#777777" fontSize="6.5">
          {'Amount'}
        </SvgText>
        <SvgText x="326" y="120" fill="#EEEEEE" fontSize="9" fontWeight="700" textAnchor="end">
          {'৳99'}
        </SvgText>

        {/* ================================================= */}
        {/* SUCCESS TOAST */}
        {/* ================================================= */}
        <Rect x="70" y="270" width="200" height="40" rx="14" fill="#3a3e3e" />
        <Circle cx="92" cy="290" r="10" fill="#383838" />
        <Path
          d="M87 290 L91 294 L97 287"
          stroke="#DDDDDD"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <SvgText x="108" y="286" fill="#999999" fontSize="7.5">
          {'Payment Successful'}
        </SvgText>
        <SvgText x="108" y="300" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
          {'৳1,250 paid'}
        </SvgText>
      </Svg>
    </View>
  );
}

// ============================================================
// MAIN APP
// ============================================================

const OnboardingScreen = ({ navigation }: any) => {
  const [active, setActive] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // ==========================================================
  // CHANGE SLIDE
  // ==========================================================

  const changeSlide = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= slides.length || newIndex === active) {
      return;
    }

    const direction = newIndex > active ? 1 : -1;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: direction * -30,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActive(newIndex);
      translateX.setValue(direction * 30);
      translateY.setValue(10);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // ==========================================================
  // NEXT
  // ==========================================================

  const nextSlide = () => {
    if (active < slides.length - 1) {
      changeSlide(active + 1);
    }
  };

  // ==========================================================
  // PREVIOUS
  // ==========================================================

  const previousSlide = () => {
    if (active > 0) {
      changeSlide(active - 1);
    }
  };

  // ==========================================================
  // SWIPE
  // ==========================================================

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx < -50) {
          nextSlide();
        }
        if (gestureState.dx > 50) {
          previousSlide();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* ================================================== */}
        {/* LOGO */}
        {/* ================================================== */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            Pay
            <Text style={styles.logoGray}>lo</Text>
          </Text>
          <Text style={styles.logoMfs}>MFS</Text>
        </View>

        {/* ================================================== */}
        {/* ILLUSTRATION */}
        {/* ================================================== */}
        <Animated.View
          style={[
            styles.illustration,
            {
              opacity: opacity,
              transform: [{ translateX: translateX }],
            },
          ]}
        >
          {active === 0 ? <SendMoneyIllustration /> : <PayIllustration />}
        </Animated.View>

        {/* ================================================== */}
        {/* BOTTOM CONTENT */}
        {/* ================================================== */}
        <Animated.View
          style={[
            styles.bottomCard,
            {
              opacity: opacity,
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Eyebrow */}
          <Text style={styles.eyebrow}>{slides[active].eyebrow}</Text>

          {/* Title */}
          <Text style={styles.title}>{slides[active].title}</Text>

          {/* Description */}
          <Text style={styles.description}>{slides[active].description}</Text>

          <View style={styles.flexSpace} />

          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}
          <View style={styles.navigation}>
            <View style={styles.dots}>
              {slides.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => changeSlide(index)}
                  style={[styles.dot, index === active ? styles.activeDot : styles.inactiveDot]}
                />
              ))}
            </View>

            {/* Next Button */}
            <Pressable
              onPress={() => {
                if (active === slides.length - 1) {
                  navigation.replace('Login');
                } else {
                  nextSlide();
                }
              }}
              style={[
                styles.nextButton,
                active === slides.length - 1 && { backgroundColor: '#6b7280' }
              ]}
            >
              <Text style={[styles.arrow, active === slides.length - 1 && { color: '#ffffff' }]}>Go</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    overflow: 'hidden',
  },
  // ==========================================================
  // HEADER
  // ==========================================================
  header: {
    height: 58,
    paddingHorizontal: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#5b6161',
    letterSpacing: -1.5,
  },
  logoGray: {
    color: '#5b6161',
  },
  logoMfs: {
    marginLeft: 8,
    fontSize: 9,
    fontWeight: '700',
    color: '#AAAAAA',
    letterSpacing: 1,
  },
  // ==========================================================
  // ILLUSTRATION
  // ==========================================================
  illustration: {
    height: 310,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    width: 340,
    height: 310,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ==========================================================
  // BOTTOM CARD
  // ==========================================================
  bottomCard: {
    flex: 1,
    marginTop: -12,
    paddingTop: 20,
    paddingHorizontal: 34,
    paddingBottom: 18,
    // backgroundColor: COLORS.card,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#C8C8C8',
    alignSelf: 'center',
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: '#999999',
  },
  title: {
    marginTop: 7,
    fontSize: 34,
    lineHeight: 37,
    fontWeight: '900',
    letterSpacing: -1.5,
    color: COLORS.black,
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: '#5F5F5F',
    maxWidth: 300,
  },
  flexSpace: {
    flex: 1,
  },
  // ==========================================================
  // NAVIGATION
  // ==========================================================
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 7,
    borderRadius: 5,
    marginRight: 7,
  },
  activeDot: {
    width: 28,
    backgroundColor: '#252828',
  },
  inactiveDot: {
    width: 7,
    backgroundColor: '#C8C8C8',
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1D1D1',
  },
  disabledButton: {
    opacity: 0.35,
  },
  arrow: {
    fontSize: 27,
    color: '#777777',
    marginTop: -3,
  },
  // ==========================================================
  // ACCOUNT BUTTON
  // ==========================================================
  accountButton: {
    width: '100%',
    height: 56,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0D0D0',
    marginBottom: 4,
  },
  accountButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#666666',
  },
  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  // ==========================================================
  // LOGIN
  // ==========================================================
  loginText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 13,
    color: '#A5A5A5',
  },
  loginLink: {
    color: '#777777',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
