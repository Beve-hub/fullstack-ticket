
const express = require('express');

const setNotificationCookie = (message, res) => {
    res.cookie('notification', message, {maxAge: 10000, httpOnly: true});
};