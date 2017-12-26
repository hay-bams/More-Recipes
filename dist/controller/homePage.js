'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class homePage
 */
var homePage = function () {
  function homePage() {
    _classCallCheck(this, homePage);
  }

  _createClass(homePage, null, [{
    key: 'homePage',

    /**
       *@returns {obj} addRecipe
       * @param {obj} req
       * @param {obj} res
    */
    value: function homePage(req, res) {
      res.status(200).send({
        uccess: 'true',
        message: 'Welcome to More Recipes'
      });
    }
  }]);

  return homePage;
}();

exports.default = homePage;