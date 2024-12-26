# MERN Stack Filter Application

This project is a simple MERN stack application that allows users to create custom queries with a drag-and-drop interface.

## Deployment

This project is deployed on Google Cloud.

https://filter-mern-stack.wl.r.appspot.com/

## Prerequisites

- Node.js v18 or higher
- Internet connection for MongoDB
- A browser on a computer (drag and drop not implemented for phones)

## Application Structure Overview

### Stages and Boxes

Stage:
- A stage in the application represents a stage in a MongoDB aggregation query.
- In MongoDB, aggregation queries are structured in stages, where each stage performs a specific operation, such as filtering, grouping, sorting.  This application only has the $match filtering stage implemented.
- In this application, each stage corresponds to a specific step in the aggregation pipeline.  Stage 1 would be the first $match query and the second stage will perform a second $match from the results queried from the first stage.  Each subsequent stage will perform a filter on the data queried from the previous stage.

Box:
- Each box within a stage represents an OR statement in the MongoDB aggregation query.
- Within the same box, there can be multiple conditions that are combined representing AND statements.
- In MongoDB aggregation, an $or operator is used to combine multiple conditions, and an $and operator to combine conditions.
  
## Installation

### 1. Clone the repository:

git clone https://github.com/leunp/mern-filter.git

### 2. Install dependencies:

<br/>cd mern-filter
<br/>cd frontend
<br/>npm install
<br/>cd backend
<br/>npm install

### 3. Start up the frontend (http://localhost:5000) and backend (http://localhost:8000):

<br/>cd frontend
<br/>npm start

<br/>cd backend
<br/>npm start

## Usage

### Build a query to fetch data from MongoDB
1. In browser open up to http://localhost:5000.
2. Drag and drop the light blue box in the top left corner to a container.
3. Select the fields in the draggable element.
4. Click "Run".
5. Results should be populated on the bottom of the page.

### Discard a single draggable element
1. Drag the element to the red "Trash" section in the top.

### Clear all elements
1. Click "Clear Items" button.

## Example

### Data stored in MongoDB
{
  "_id": "675caa8a1d53ba13fe1cbc58",
  "rb": 0.9,
  "drb": 0.8,
  "galactic_latitude": 30,
  "jd": 2460318.5,
  "jdstarthist": 2460314.5
}

{
  "_id": "675caa8a1d53ba13fe1cbc55",
  "rb": 0.5,
  "drb": 0.2,
  "galactic_latitude": 5,
  "jd": 2460318.5,
  "jdstarthist": 2460314.5
}

{
  "_id": "675caa8a1d53ba13fe1cbc56",
  "rb": 0.5,
  "drb": 0.99,
  "galactic_latitude": -5,
  "jd": 2460318.5,
  "jdstarthist": 2460314.5
}

{
  "_id": "675caa8a1d53ba13fe1cbc57",
  "rb": 0.5,
  "drb": 0.99,
  "galactic_latitude": 30,
  "jd": 2460318.5,
  "jdstarthist": 2460300.5
}

### Conditions queried from MongoDB with stored data
- Stage 1 - The rb OR the drb is superior to or equal to 0.8 (i.e. It is a real detection)
- Stage 2 - The absolute value of galactic latitude > 10 (i.e. It's not too close from the plane of the milky way, meaning it's likely extragalactic and could be an object in another galaxy)
- Stage 3 - The age (jd - jdstarthist) < 7 (i.e. it's somewhat young, we haven't been detecting this for a long time).
![image](https://github.com/user-attachments/assets/df2855ea-6bf4-414f-8cb3-5fcdb4948a32)
![image](https://github.com/user-attachments/assets/84772cb5-1839-4077-98b5-2608ef9070b9)

