const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeeController");


// Correct route
router.post('/add-emp', employeeController.createEmployee);
router.get('/all', employeeController.getall);
router.put('/updateemp/:id',employeeController.updateemp);
router.delete('/deleteemp/:id',employeeController.deleteemp);
router.get('/singleemp/:id',employeeController.singleemp);

module.exports = router;
