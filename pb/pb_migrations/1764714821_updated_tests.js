/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2786851539",
    "max": null,
    "min": null,
    "name": "timeInSeconds",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // remove field
  collection.fields.removeById("number2786851539")

  return app.save(collection)
})
