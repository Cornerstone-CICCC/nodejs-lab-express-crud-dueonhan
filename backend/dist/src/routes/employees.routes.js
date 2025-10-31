"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeesRouter = (0, express_1.Router)();
const employees = [];
employeesRouter.get("/search", (req, res) => {
    var _a;
    try {
        const keyword = ((_a = req.query.keyword) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
        const results = employees.filter((t) => t.firstname.toLowerCase().includes(keyword) ||
            t.lastname.toLowerCase().includes(keyword));
        if (results.length === 0) {
            return res.status(404).json({ message: "No employee items found." });
        }
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Internal server error during search." });
    }
});
employeesRouter.get("/", (req, res) => {
    try {
        res.status(200).json(employees);
    }
    catch (error) {
        console.error("Get all error:", error);
        res
            .status(500)
            .json({ message: "Internal server error retrieving employees." });
    }
});
employeesRouter.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const found = employees.find((u) => u.id === id);
        if (!found) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json(found);
    }
    catch (error) {
        console.error("Get by ID error:", error);
        res
            .status(500)
            .json({ message: "Internal server error retrieving employee." });
    }
});
employeesRouter.post("/", (req, res) => {
    try {
        const { firstname, lastname, age, isMarried } = req.body;
        const newEmployee = {
            id: (0, uuid_1.v4)(),
            firstname,
            lastname,
            age,
            isMarried,
        };
        employees.push(newEmployee);
        res.status(201).json(newEmployee);
    }
    catch (error) {
        console.error("Add employee error:", error);
        res
            .status(500)
            .json({ message: "Internal server error adding employee." });
    }
});
employeesRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    try {
        const { id } = req.params;
        const foundIndex = employees.findIndex((u) => u.id === id);
        if (foundIndex === -1) {
            return res.status(404).json({ message: "Employee not found." });
        }
        const updatedEmployee = Object.assign(Object.assign({}, employees[foundIndex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[foundIndex].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[foundIndex].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[foundIndex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[foundIndex].isMarried });
        employees[foundIndex] = updatedEmployee;
        res.status(200).json(updatedEmployee);
    }
    catch (error) {
        console.error("Update employee error:", error);
        res
            .status(500)
            .json({ message: "Internal server error updating employee." });
    }
});
employeesRouter.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const index = employees.findIndex((u) => u.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Employee not found." });
        }
        employees.splice(index, 1);
        res.status(200).json({ message: "Employee deleted." });
    }
    catch (error) {
        console.error("Delete employee error:", error);
        res
            .status(500)
            .json({ message: "Internal server error deleting employee." });
    }
});
exports.default = employeesRouter;
