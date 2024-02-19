const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const {updateLeaderboard} = require('./routes/leaderBoard');
// const Leaderboard = require('../models/leaderBoardModel');

const app = express();
const PORT = process.env.PORT || 3005;
const MONGODB_URI = 'mongodb+srv://NodeProject:newpassword@cluster0.vtynf8i.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json());


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Load the protobuf definition
const protoDefinition = protoLoader.loadSync('leaderboard.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Load the protobuf package
const leaderboardProto = grpc.loadPackageDefinition(protoDefinition).leaderboard;

// Create gRPC server
const server = new grpc.Server();
server.addService(leaderboardProto.LeaderboardService.service, { updateLeaderboard });

// Start the server
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
    console.log(`Server is listening on port ${port}`);
    server.start(); 
  });


console.log('Leaderboard gRPC server started');

