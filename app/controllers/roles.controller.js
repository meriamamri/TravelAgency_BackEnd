const config = require('config.json');
const db = require('app/config/dbConnection');
const Role = require("../models/Role.model");
const express = require('express');
var app = express();

// 1=Role super_admin
module.exports.addRole1 = (req, res, next) => {
    var role = new Role();
    role.code = 1;
    role.name = 'superAdmin';
    role.save();
};

// 2=Role admin_agency qui représente client pour indafri
module.exports.addRole2 = (req, res, next) => {
    var role = new Role();
    role.code = 2;
    role.name = 'admin_agency';
    role.save();
};

// 3=Role client_api
module.exports.addRole3 = (req, res, next) => {
    var role = new Role();
    role.code = 3;
    role.name = 'client_api';
    role.save();
};

// 4=Role agent_agency
module.exports.addRole4 = (req, res, next) => {
    var role = new Role();
    role.code = 4;
    role.name = 'agent_agency';
    role.save();
};

// 5=Role client :Client de l'agence de voyage
module.exports.addRole5 = (req, res, next) => {
    var role = new Role();
    role.code = 5;
    role.name = 'client';
    role.save();
};
