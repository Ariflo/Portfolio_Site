var express = require('express');
var router = express.Router();
var locus = require("locus");
var project = require('../models/projects');
var  knex = require('../../db/knex');

router.post('/', function(req,res) {

	project.allProjects().insert({
		project_title: req.body.title,
		project_description: req.body.description,
		project_img: req.body.image,
		project_vid: req.body.vid,
		build_time: req.body.buildTime,
		duties: req.body.duties

	}).returning('id').then(function(id){
		req.body.tech.forEach(function(tech){
			knex('tech').insert({
				tech: tech,
				project_id: id[0]
			}).then(function(done){
				return done;
			})
		})	

		if(Object.keys(req.body.team).length !== 0 && req.body.team.constructor === Object){
			
			for(var member in req.body.team ){
				
				knex('team').insert({
					name: req.body.team[member][0],
					link: req.body.team[member][1],
					project_id: id[0]
				}).then(function(done){
					return done;
				})
			}

		}else{
			return done;	
		}
	})

});

module.exports = router;