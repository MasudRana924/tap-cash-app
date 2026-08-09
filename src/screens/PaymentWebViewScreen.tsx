// PaymentWebViewScreen.tsx
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentWebViewScreen = ({ route, navigation }: any) => {
  const { paymentUrl, title = 'Payment' } = route.params || {};
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

  const handleOpenBrowser = () => {
    if (paymentUrl) {
      Linking.openURL(paymentUrl).catch((err) =>
        console.error('Error opening URL in browser:', err)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#11182e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity style={styles.browserButton} onPress={handleOpenBrowser}>
          <Icon name="open-outline" size={20} color="#11182e" />
          <Text style={styles.browserButtonText}>Browser</Text>
        </TouchableOpacity>
      </View>

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
          onNavigationStateChange={(navState: any) => {
            const url = navState.url;
            console.log('WebView URL Change:', url);
            if (url.includes('tapcash://payment-success') || url.includes('payment-success')) {
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
            <ActivityIndicator size="large" color="#11182e" />
            <Text style={styles.loadingText}>Loading Payment Gateway...</Text>
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
    ...StyleSheet.absoluteFillObject,
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