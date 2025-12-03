/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "autodate3029767898",
    "name": "started",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "autodate3029767898",
    "name": "started",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
})
