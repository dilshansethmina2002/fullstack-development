import express from "express";
import Order from '../models/order.js';


 export function createOrder(req, res) {
    if (req.user == null) {
        res.json({ message: "Unauthorized" });
        return;
    }

    const body = req.body;
    const orderData = {
        orderId : "",
        email : body.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItem : [],
        total : 0
    }
    
      Order.find().sort({
        Date : -1
      }).limit(1).then((lastBills)=>{
        if(lastBills.length==0){
          orderData.orderId = "ORD0001"
        }else{
          const lastOrderId = lastBills[0].orderId;
          const lastOderIdNumber = lastOrderId.replace("ORD","");
          const newOrderIdNumber = parseInt(lastOderIdNumber)+1;
          const newOrderIdString = newOrderIdNumber.toString().padStart(4,"0");
          orderData.orderId = "ORD"+newOrderIdString;
        }

      const order = new Order(orderData);
      order.save().then(()=>{
        res.json({
          message : "Order created successfully"
        })
      }).catch((err)=>{
        res.json({
          message : "Order creation failed",
          error : err
        })
      })
    })

      

      
}

export function getOrders(req, res) {
    if (req.user == null) {
        res.json({ message: "Unauthorized" });
        return;
    }
    if (req.user.role == "admin") {
        Order.find().then((orders) => {
            res.json(orders);
        }).catch((err) => {
            res.json({
                message: "Error fetching orders",
                error: err
            });
        })
    }
    else {
        Order.find({ email: req.user.email }).then((orders) => {
            res.json(orders);
        }).catch((err) => {
            res.json({
                message: "Error fetching orders",
                error: err
            });
        })
      }
  }
