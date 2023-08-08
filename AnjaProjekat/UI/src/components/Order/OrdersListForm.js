import styles from './OrdersListForm.module.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import Navigation from 'components/Navigation/Navigation';
import { cancelOrder, getAllOrdersAction } from 'slices/orderSlice';

const OrdersListForm = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const user = useSelector((state) => state.user.user);

  // @ts-ignore
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {

    // @ts-ignore
    dispatch(getAllOrdersAction(user.id));
  }, []);

  const handleCancelOrder = (event) => {
    // @ts-ignore
    dispatch(cancelOrder(user.id));
    // @ts-ignore
    dispatch(getAllOrdersAction(user.id));
  };

  return (
    <>
    <Navigation/>
    <Container className={styles.container}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.created}</TableCell>
              <TableCell>{order.deliveryTime}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary" onClick={() => handleCancelOrder(order.id)}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
};

export default OrdersListForm;
