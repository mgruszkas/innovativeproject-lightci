/**
 * Created by michal on 17.11.14.
 */
var svn = require("../server/components/scm/svn/svn");
var git = require("../server/components/scm/git/git");
var db = require("../server/components/db/db");
var exec = require('child-process-promise').exec;
var should = require("should");
var fs = require("fs");

exec("rm -r ./repos")
  .then(function() {
    fs.unlink("database.sqlite", function() {
      db.createTables('./database.sqlite', function() {
      });
    });
  });



describe('add_new_project', function() {

  var project1 = {
    "projectName": "svn_test_mocha",
    "repositoryUrl": "https://subversion.assembla.com/svn/mp-svntest/",
    "repositoryType": "svn",
    "cronePattern": "* * * * *",
    "scriptPath": "echo.sh"
  };

  project2 = {
    "projectName": "git_test_mocha",
    "repositoryUrl": "git://github.com/test1git/test",
    "repositoryType": "git",
    "cronePattern": "* * * * *",
    "scriptPath": "echo.sh"
  };

  before(function(done) {

    svn.checkout(db, project1, './repos/');
    git.gitClone(db,project2,'./repos');
    done();

  });


  it('should add new SVN project to database and create dir', function(done) {

    this.timeout(10000);

    var dbProject = db.findInstance('Project', {where: {project_name: project1.projectName}});
    dbProject.then(function (projects) {
      projects.should.not.equal(0);

      fs.exists("repos/" + project1.projectName, function (exists) {
        exists.should.be.ok;
        done();
      });

    });
  });



  it('should add new GIT project to database and create dir', function(done) {

    this.timeout(10000);

    var dbProject = db.findInstance('Project', {where: {project_name: project2.projectName}});
    dbProject.then(function (projects) {
      projects.should.not.equal(0);

      fs.exists("repos/" + project2.projectName, function (exists) {
        exists.should.be.ok;
        done();
      });

    });
  });

});
