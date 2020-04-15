const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findSteps(id) {
  return db("schemes as sc")
    .join("steps as st", "st.scheme_id", "sc.id")
    .select("sc.scheme_name", "st.step_number", "st.instructions")
    .where({ "sc.id": id })
    .orderBy("st.step_number");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(([id]) => findById(id));
}

function update(stepData, id) {
  return db("schemes")
    .where({ id })
    .update(stepData)
    .then(() => findById(id));
}

function remove() {}
