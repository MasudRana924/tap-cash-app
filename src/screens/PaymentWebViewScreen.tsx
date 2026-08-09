// PaymentWebViewScreen.tsx
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentWebViewScreen = ({ route, navigation }: any) => {
  const { paymentUrl} = route.params || {};
  const webViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webViewRef.current && typeof webViewRef.current.goBack === 'function') {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>


      {/* WebView Container */}
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: paymentUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          originWhitelist={['*']}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onShouldStartLoadWithRequest={(request) => {
            const url = request.url;
            console.log('onShouldStartLoadWithRequest URL:', url);

            if (
              url.startsWith('tapcash://') ||
              url.startsWith('app.tapcash://') ||
              url.includes('payment-success') ||
              url.includes('sslcommerz/success')
            ) {
              navigation.replace('Success', {
                amount: 'Payment Successful',
                receiverPhone: '',
                receiverName: 'Add Money',
              });
              return false;
            }

            if (url.includes('cancel') || url.includes('fail')) {
              navigation.goBack();
              return false;
            }

            return true;
          }}
          onNavigationStateChange={(navState: any) => {
            const url = navState.url;
            console.log('WebView URL Change:', url);
            if (
              url.startsWith('tapcash://') ||
              url.startsWith('app.tapcash://') ||
              url.includes('payment-success') ||
              url.includes('sslcommerz/success')
            ) {
              navigation.replace('Success', {
                amount: 'Payment Successful',
                receiverPhone: '',
                receiverName: 'Add Money',
              });
            } else if (url.includes('cancel') || url.includes('fail')) {
              navigation.goBack();
            }
          }}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#F8623F" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  browserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  browserButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#11182e',
    marginLeft: 4,
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentWebViewScreen;