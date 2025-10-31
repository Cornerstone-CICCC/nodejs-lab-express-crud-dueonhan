import { Router, Request, Response } from "express";
import { Employee } from "../type/employees";
import { v4 as uuidv4 } from "uuid";

const employeesRouter = Router();
const employees: Employee[] = [];

employeesRouter.get(
  "/search",
  (req: Request<{}, {}, {}, { keyword?: string }>, res: Response) => {
    try {
      const keyword = req.query.keyword?.toLowerCase() || "";
      const results = employees.filter(
        (t) =>
          t.firstname.toLowerCase().includes(keyword) ||
          t.lastname.toLowerCase().includes(keyword)
      );
      if (results.length === 0) {
        return res.status(404).json({ message: "No employee items found." });
      }
      res.status(200).json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Internal server error during search." });
    }
  }
);

employeesRouter.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json(employees);
  } catch (error) {
    console.error("Get all error:", error);
    res
      .status(500)
      .json({ message: "Internal server error retrieving employees." });
  }
});

employeesRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const found = employees.find((u) => u.id === id);
    if (!found) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json(found);
  } catch (error) {
    console.error("Get by ID error:", error);
    res
      .status(500)
      .json({ message: "Internal server error retrieving employee." });
  }
});

employeesRouter.post(
  "/",
  (req: Request<{}, {}, Omit<Employee, "id">>, res: Response) => {
    try {
      const { firstname, lastname, age, isMarried } = req.body;
      const newEmployee: Employee = {
        id: uuidv4(),
        firstname,
        lastname,
        age,
        isMarried,
      };
      employees.push(newEmployee);
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error("Add employee error:", error);
      res
        .status(500)
        .json({ message: "Internal server error adding employee." });
    }
  }
);

employeesRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
    try {
      const { id } = req.params;
      const foundIndex = employees.findIndex((u) => u.id === id);
      if (foundIndex === -1) {
        return res.status(404).json({ message: "Employee not found." });
      }

      const updatedEmployee: Employee = {
        ...employees[foundIndex],
        firstname: req.body.firstname ?? employees[foundIndex].firstname,
        lastname: req.body.lastname ?? employees[foundIndex].lastname,
        age: req.body.age ?? employees[foundIndex].age,
        isMarried: req.body.isMarried ?? employees[foundIndex].isMarried,
      };

      employees[foundIndex] = updatedEmployee;
      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error("Update employee error:", error);
      res
        .status(500)
        .json({ message: "Internal server error updating employee." });
    }
  }
);

employeesRouter.delete(
  "/:id",
  (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const index = employees.findIndex((u) => u.id === id);
      if (index === -1) {
        return res.status(404).json({ message: "Employee not found." });
      }
      employees.splice(index, 1);
      res.status(200).json({ message: "Employee deleted." });
    } catch (error) {
      console.error("Delete employee error:", error);
      res
        .status(500)
        .json({ message: "Internal server error deleting employee." });
    }
  }
);

export default employeesRouter;
