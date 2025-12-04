/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "file4177663291",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "sealpic",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3643163317")

  // remove field
  collection.fields.removeById("file4177663291")

  return app.save(collection)
})
