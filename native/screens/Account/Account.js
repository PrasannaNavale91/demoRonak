import { View, Text } from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import MyOrders from './MyOrders';
import Notifications from './Notifications';

const CheckoutScreen = (props) => {
  return (
    <Layout>
      <View style={{
        display: "flex"
      }}>
        <MyOrders></MyOrders>
        <Notifications></Notifications>
      </View>
    </Layout>
  );
};

export default CheckoutScreen;