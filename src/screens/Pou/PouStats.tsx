import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {setPouStatus} from '../../redux/actions';

interface ConsumableInterface {
  date: number;
  increase: number;
  consumable: number;
}
interface PouStatsInterface {
  name: string;
  userId: string;
  clean: ConsumableInterface[];
  cleanCapacity: ConsumableInterface[];
  food: ConsumableInterface[];
  foodCapacity: ConsumableInterface[];
}

const PouStats = ({pou, dispatchPouStatus}: any) => {
  // const [pouStatus, setPouStatus] = useState<PouStatsInterface>();
  useEffect(() => {
    (async () => {
      await axios
        .post('http://localhost:3000/api/users/signin', {
          email: 'ma@m3a.te',
          password: 'testing',
        })
        .catch(e => {
          console.log('error: ', e);
        });
      await axios
        .get('http://localhost:3000/pou/stats')
        .then((res: any) => {
          dispatchPouStatus(res.data);
        })
        .catch(e => {
          console.log('error: ', e);
        });

      // setPouStatus(_pouStatus);
    })();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>{pou?.name}</Text>
      <Text style={styles.header}>
        Food: {pou?.food[pou.food.length - 1]?.consumable}
      </Text>
      <Text style={styles.header}>
        Clean: {pou?.clean[pou.clean.length - 1]?.consumable}
      </Text>
      {/* <Text style={styles.header}>Inventory: {JSON.stringify(pou)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    // height: '100%',
    // width: '100%',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
});

const mapStateToProps = (state: any) => {
  const {pou} = state;
  return {pou};
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPouStatus: (status: any) => {
    dispatch(setPouStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PouStats);
