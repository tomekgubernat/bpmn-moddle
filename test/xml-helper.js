'use strict';

var SchemaValidator = require('xsd-schema-validator');

var BPMN_XSD = 'test/fixtures/xsd/BPMN20.xsd';

var Helper = require('./helper');


module.exports.fromFile = function(moddle, file, done) {
  var fileContents = Helper.readFile(file);

  moddle.fromXML(fileContents, 'bpmn:Definitions', done);
};


module.exports.fromValidFile = function(moddle, file, done) {
  var fileContents = Helper.readFile(file);

  validate(null, fileContents, function(err) {

    if (err) {
      return done(err);
    }

    moddle.fromXML(fileContents, 'bpmn:Definitions', done);
  });

};

module.exports.toXML = function(element, opts, done) {
  element.$model.toXML(element, opts, done);
};

function validate(err, xml, done) {

  if (err) {
    return done(err);
  }

  if (!xml) {
    return done(new Error('XML is not defined'));
  }

  SchemaValidator.validateXML(xml, BPMN_XSD, function(err, result) {

    if (err) {
      return done(err);
    }

    expect(result.valid).to.be.true;
    done();
  });
}

module.exports.validate = validate;