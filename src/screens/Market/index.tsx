import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {setPouInventory, setPouStatus} from '../../redux/actions';
import {InventoryAttrs} from '../../redux/interfaces';
import axios from 'axios';

function MarketScreen({
  inventory,
  dispatchPouInventory,
}: {
  inventory: InventoryAttrs;
  dispatchPouInventory: any;
}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      await axios
        .get('http://localhost:3000/market/inventory')
        .then((res: any) => {
          console.log('inventory res: ', res);
          dispatchPouInventory(res.data);
        })
        .catch(e => {
          console.log('error: ', e.response.data);
        });
    })();
  }, []);

  const [uniqueInventories, setUniqueInventories] = useState<{
    [key: string]: {quantity: number; feedCapacity: number};
  }>({});

  useEffect(() => {
    const _uniqueInventories: any = {};

    inventory.foodInventory.forEach(item => {
      const {name, feedCapacity} = item;
      if (_uniqueInventories[name] === undefined) {
        Object.assign(_uniqueInventories, {
          [name]: {
            quantity: 1,
            feedCapacity,
          },
        });
      } else {
        const last = _uniqueInventories[name];

        Object.assign(_uniqueInventories, {
          [name]: {
            quantity: last.quantity + 1,
            feedCapacity,
          },
        });
      }
    });

    setUniqueInventories(_uniqueInventories);
  }, [inventory.foodInventory]);

  const [errors, setErrors] = useState<any>([]);

  const buyCherry = async (item = 'cherry') => {
    await axios
      .post('http://localhost:3000/market/buy', {item: 'cherry'})
      .then((res: any) => {
        console.log(res.data);
        const data = res.data;
        const inventory = data;
        dispatchPouInventory(inventory);
      })
      .catch((e: any) => {
        setErrors(e.response.data.errors);
        console.log(JSON.stringify(e.response.data.errors));
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <Text>Markets</Text>
        <Text>coins: {inventory.coins}</Text>
        <Text>Inventory:</Text>
        {Object.keys(uniqueInventories)?.map(item => {
          return (
            <View style={{paddingLeft: 20, paddingVertical: 5}}>
              <Text>
                {item}: {uniqueInventories[item].quantity}
              </Text>
              <Text>
                - feed capacity: {uniqueInventories[item].feedCapacity}
              </Text>
            </View>
          );
        })}
        <Button title="buy cherry" onPress={buyCherry}></Button>
        {errors?.map((error: any, index: number) => {
          return <Text key={index}>{error.message}</Text>;
        })}
      </View>
    </SafeAreaView>
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

const mapStateToProps = (state: any) => {
  const {inventory} = state;
  return {inventory};
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPouStatus: (status: any) => {
    dispatch(setPouStatus(status));
  },
  dispatchPouInventory: (inventory: any) => {
    dispatch(setPouInventory(inventory));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
