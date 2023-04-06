/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PouActions from './src/screens/Pou/PouActions';
import PouStats from './src/PouStats';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesom5Icons from 'react-native-vector-icons/FontAwesome5';
import {createStore} from 'redux';
import reducers from './src/redux/reducers';
import {Provider} from 'react-redux';
import PouScreen from './src/screens/Pou';
import MarketScreen from './src/screens/Market';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const store = createStore(reducers);
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'orange',
            tabBarInactiveTintColor: '#c2c0c0',
          }}>
          <Tab.Screen
            name="Pou"
            component={PouScreen}
            options={{
              tabBarBadge: 2,

              tabBarIcon: ({focused, color, size}) => {
                const iconName = 'meh';
                return (
                  <AntDesignIcons name={iconName} size={size} color={color} />
                );
              },
            }}
          />
          <Tab.Screen
            name="Market"
            component={MarketScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                const iconName = 'dolly';
                return (
                  <FontAwesom5Icons name={iconName} size={size} color={color} />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
