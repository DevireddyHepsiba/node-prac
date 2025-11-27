const Employee = require('../models/Employee');

// Create employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, age, city } = req.body;

        const employee = new Employee({
            name,
            email,
            phone,
            age,
            city
        });

        await employee.save();
        res.status(201).json(employee);

    } catch (error) {
        console.error('There is an error saving employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all employees
const getall = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('There is an error getting employees:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get one employee by ID
const singleemp = async (req, res) => {
    try {
        const empId = req.params.id;
        const employee = await Employee.findById(empId); // FIXED

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json(employee);

    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete employee
const deleteemp = async (req, res) => {
    try {
        const empId = req.params.id;
        const employee = await Employee.findByIdAndDelete(empId); // FIXED

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully' });

    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const updateemp = async (req,res)=>{
    try {
        const empId = req.params.id;
        const { name, email, phone, age, city} = req.body;
        const employee = await Employee.findByIdAndUpdate(empId, {
            name,
            email,  
            phone,
            age,
            city
        }, { new: true });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });


    }
}

module.exports = { createEmployee, getall, singleemp, deleteemp , updateemp };
