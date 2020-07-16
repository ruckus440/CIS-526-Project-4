const fs = require('fs');
const db = require('./database');
const templates = require('./templates');

const query = 'SELECT\
  standards.identifier AS identifier,\
  standards.description AS description,\
  standards.summary AS summary,\
  concepts.name AS concept,\
  concepts.abbr AS conceptAbbr,\
  subconcepts.name AS subconcept,\
  subconcepts.abbr AS subconceptAbbr,\
  grade_levels.name AS gradeLevel,\
  grade_levels.abbr AS gradeLevelAbbr,\
  (  SELECT group_concat(practices.id || \'. \' || practices.name, \', \')\
     FROM practices\
     INNER JOIN standards_practices ON practices.id = standards_practices.practice_id\
   WHERE standards_practices.standard_id = standards.id\
  ) AS practices\
  FROM standards\
  INNER JOIN concepts on standards.concept_id = concepts.id\
  INNER JOIN subconcepts on standards.subconcept_id = subconcepts.id\
  INNER JOIN grade_levels on standards.grade_level_id = grade_levels.id;';



/** @function standards
 * Serves the standards page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveStandards(req, res) {
  var standards = db.prepare(query).all();
  var html = templates['standards.html']({standards})  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveStandards;