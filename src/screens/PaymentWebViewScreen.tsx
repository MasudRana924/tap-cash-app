import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Alert,
  Platform,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

import ScreenHeader from '../components/ScreenHeader';
import {RootStackParamList} from '../navigation/RootNavigator';

type PaymentWebViewRouteProp = RouteProp<
  RootStackParamList,
  'PaymentWebView'
>;

const PaymentWebViewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<PaymentWebViewRouteProp>();

  const {paymentUrl} = route.params;

  const [loading, setLoading] = useState(true);

  console.log('Payment URL:', paymentUrl);

  if (!paymentUrl) {
    Alert.alert('Error', 'No payment URL provided');
    navigation.goBack();
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <ScreenHeader
        title="Payment"
        onBackPress={() => navigation.goBack()}
      />

      {/* WebView */}
      <View style={styles.webViewContainer}>
        <WebView
  source={{uri: paymentUrl}}
  style={styles.webview}

  javaScriptEnabled={true}
  domStorageEnabled={true}
  thirdPartyCookiesEnabled={true}
  sharedCookiesEnabled={true}

  startInLoadingState={true}
  cacheEnabled={false}

  onLoadStart={({nativeEvent}) => {
    console.log('🔥 WEBVIEW LOAD START:', nativeEvent.url);
  }}

  onLoad={({nativeEvent}) => {
    console.log('✅ WEBVIEW LOADED:', nativeEvent.url);
  }}

  onLoadEnd={({nativeEvent}) => {
    console.log('🏁 WEBVIEW LOAD END:', nativeEvent.url);
    setLoading(false);
  }}

  onNavigationStateChange={navState => {
    console.log('🌐 WEBVIEW NAVIGATION:', navState.url);
  }}

  onError={({nativeEvent}) => {
    console.log('❌ WEBVIEW ERROR:', JSON.stringify(nativeEvent, null, 2));

    Alert.alert(
      'WebView Error',
      `${nativeEvent.code}\n${nativeEvent.description}`,
    );
  }}

  onHttpError={({nativeEvent}) => {
    console.log('❌ HTTP ERROR:', JSON.stringify(nativeEvent, null, 2));

    Alert.alert(
      'HTTP Error',
      `Status: ${nativeEvent.statusCode}\n${nativeEvent.url}`,
    );
  }}

  onShouldStartLoadWithRequest={request => {
    console.log('➡️ REQUEST:', request.url);
    return true;
  }}
/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  webViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },

  loading: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});

export default PaymentWebViewScreen;