'use strict';

const Hoek = require('hoek');
var MongooseConnector = require('./MongooseConnector');

const internals = {};

internals.defaults = {
  uri: 'mongodb://126.0.0.1:27017',
  async: false
};

exports.register = (server, options, next) => {
  const settings = Hoek.applyToDefaults(internals.defaults, options);
  let connector = new MongooseConnector(settings);
  let connection = connector.connection;

  connector.on('ready', () => {
    let getConnection = () => connection;

    server.method('mongoose', getConnection, {});

    next();
  });

  connector.on('error', err => next(err));
};

exports.register.attributes = {
  pkg: require('../package.json')
};