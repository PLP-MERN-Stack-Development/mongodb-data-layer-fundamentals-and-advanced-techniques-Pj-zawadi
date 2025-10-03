# 🗄️ Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques

This repository contains the required files for the Week 1 MongoDB assignment, demonstrating core MongoDB operations, advanced querying, aggregation pipelines, and indexing.

## 🚀 Setup and Requirements

To run these scripts, you must have **MongoDB Community Edition** or access to a **MongoDB Atlas Cluster**. You will also need the **MongoDB Shell (`mongosh`)** installed and configured.

1.  **MongoDB Instance:** Ensure your local MongoDB server is running or that you have the connection string for your Atlas cluster.
2.  **Database:** The scripts assume the use of a database named `plp_bookstore`.
3.  **Collection:** The target collection for all operations is `books`.

## 📂 File Contents

* **`insert_books.js`**: Contains the `db.books.insertMany()` command to populate the `books` collection with sample data (at least 10 book documents).
* **`queries.js`**: Contains all the required MongoDB shell commands for Tasks 2, 3, 4, and 5, including CRUD operations, advanced finds, aggregation pipelines, and index creation/analysis.
* **`README.md`**: This file, explaining the setup and execution.
* **`screenshot.png/jpg`**: A screenshot showing the database and collection structure in MongoDB Compass or Atlas.

## 🛠️ How to Run the Scripts

### Step 1: Connect to MongoDB

Open your terminal or command prompt and connect to your MongoDB instance using `mongosh`.

**A. Local Connection (Default):**

```bash
mongosh

## B. Atlas Connection (Using Connection String):

Bash

mongosh "mongodb+srv://<username>:<password>@<cluster-url>/plp_bookstore?retryWrites=true&w=majority"
Step 2: Use the Target Database
Once connected to mongosh, switch to the project database:

## JavaScript

use plp_bookstore
Step 3: Insert Initial Data (insert_books.js)
You must run the data insertion script first to create the collection and populate it.

From the shell, load the insert_books.js file:

# JavaScript

load('insert_books.js')
(Note: If you are using MongoDB Compass, you can execute the insert commands directly within the shell tab.)

Step 4: Run the Main Queries (queries.js)
Execute the file containing all the assignment queries. This will run the CRUD operations, advanced finds, the data aggregation pipelines, and the indexing commands (including the explain() calls).

From the shell, load the queries.js file:

## JavaScript

load('queries.js')
The output in the console will show the results for all the find, aggregate, updateOne, and explain operations.