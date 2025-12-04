/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // remove field
  collection.fields.removeById("json2029248493")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json3231841078",
    "maxSize": 0,
    "name": "TestData",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json2029248493",
    "maxSize": 0,
    "name": "testingdata",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("json3231841078")

  return app.save(collection)
})
