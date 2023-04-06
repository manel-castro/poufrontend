import axios from 'axios';

import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {setPouInventory, setPouStatus} from '../../redux/actions';
import {connect} from 'react-redux';

const PouActions = ({dispatchPouStatus, dispatchPouInventory}: any) => {
  const [errors, setErrors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const feedPou = async (item = 'cherry') => {
    setIsLoading(true);
    await axios
      .post('http://localhost:3000/pou/feed', {item})
      .then((res: any) => {
        const data = res.data;
        const {pou, inventory} = data;
        dispatchPouStatus(pou);
        dispatchPouInventory(inventory);

        setIsLoading(false);
      })
      .catch((e: any) => {
        setErrors(e.response.data.errors);

        setIsLoading(false);
      });
  };
  const pettingPou = async (item = 'cherry') => {
    await axios
      .post('http://localhost:3000/pou/petting')
      .then((res: any) => {
        console.log(res.data);
        const data = res.data;
        const {pou, inventory} = data;
        dispatchPouStatus(pou);
        dispatchPouInventory(inventory);
      })
      .catch((e: any) => {
        setErrors(e.response.data.errors);
        console.log(JSON.stringify(e.response.data.errors));
      });
  };

  return (
    <View style={styles.sectionContainer}>
      <Button title="feedPou" onPress={() => !isLoading && feedPou()}></Button>
      <Button title="petPou" onPress={() => pettingPou()}></Button>
      {errors?.map((error: any, index: number) => {
        return <Text key={index}>{error.message}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPouStatus: (status: any) => {
    dispatch(setPouStatus(status));
  },
  dispatchPouInventory: (inventory: any) => {
    dispatch(setPouInventory(inventory));
  },
});

export default connect(null, mapDispatchToProps)(PouActions);
