'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const fixtures = require('../fixtures/game_names_fields.json');
const prepareField = (field) => `"${JSON.stringify(field).replace(/"/g, '\\"')}"`;

class Import_game_names_fields_data_Schema extends Schema {
  up () {
    fixtures.forEach((fixture) => {
      this.raw(`insert into game_name_fields (game_names_id,in_game_fields,in_game_field_placeholders,in_game_field_profile_placeholders,in_game_field_types,in_game_field_labels,in_game_field_values,created_at,updated_at) values (${fixture.gameId}, ${prepareField(fixture.fields)}, ${prepareField(fixture.placeholders)}, ${prepareField(fixture.profile_placeholders)}, ${prepareField(fixture.types)},${prepareField(fixture.labels)},${prepareField(fixture.values)},'1988-08-08','1988-08-08');`)
    });
  }

  down () {

  }
}

module.exports = Import_game_names_fields_data_Schema
