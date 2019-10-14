webpackJsonp([0],{

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _PostFileModal = __webpack_require__(150);

var _PostFileModal2 = _interopRequireDefault(_PostFileModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComposeSection = function (_Component) {
  (0, _inherits3.default)(ComposeSection, _Component);

  function ComposeSection() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ComposeSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComposeSection.__proto__ || Object.getPrototypeOf(ComposeSection)).call(this));

    _this.callbackPostFileModalConfirm = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var url, post;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  bFileModalOpen: false
                });

                url = '';


                if (_this.state.fileType == 'photo') {
                  url = '/api/postphoto';
                } else if (_this.state.fileType == 'video') {
                  url = '/api/postvideo';
                } else {
                  url = '/api/postphoto';
                }

                if (!(data.media_url.length == 0 && data.content == '')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return _axios2.default.post(url, {
                  media_url: JSON.stringify(data.media_url),
                  content: data.content
                });

              case 8:
                post = _context.sent;


                _this.setState({
                  myPosts: undefined
                });
                _context.next = 12;
                return _this.get_posts();

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](5);

                console.log(_context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[5, 14]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var post;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.post_content.trim() == "")) {
                _context2.next = 3;
                break;
              }

              _this.setState({
                post_content: ""
              });
              return _context2.abrupt("return");

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return _axios2.default.post('/api/post', {
                content: _this.state.post_content.trim(),
                user_id: _this.props.initialData.userInfo.id,
                type: 'text'
              });

            case 6:
              post = _context2.sent;

              _this.setState({
                myPosts: undefined
              });
              _context2.next = 10;
              return _this.get_posts();

            case 10:

              _this.setState({
                show_post: true,
                post_content: ""
              });
              _this.forceUpdate();
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](3);

              console.log(_context2.t0);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 14]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
      _this.setState((0, _defineProperty3.default)({}, name, value));
    };

    _this.handleChange_txtArea = function (event) {
      _this.setState({ post_content: event.target.value });
    };

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, { post: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.get_posts = function () {
      var self = _this;

      var getPosts = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var myPosts, i, myLikes;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get("/api/mypost/" + self.state.myDate);

                case 3:
                  myPosts = _context3.sent;
                  i = 0;

                case 5:
                  if (!(i < myPosts.data.myPosts.length)) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 8;
                  return _axios2.default.get("/api/likes/" + myPosts.data.myPosts[i].id);

                case 8:
                  myLikes = _context3.sent;

                  myPosts.data.myPosts[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts[i].admirer_first_name = "";
                    myPosts.data.myPosts[i].admirer_last_name = "";
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPosts.data.myPosts[i].do_I_like_it = true;
                  } else {
                    myPosts.data.myPosts[i].do_I_like_it = false;
                  }

                case 13:
                  i++;
                  _context3.next = 5;
                  break;

                case 16:

                  self.setState({
                    myPosts: myPosts.data.myPosts
                  });
                  _context3.next = 22;
                  break;

                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 22:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 19]]);
        }));

        return function getPosts() {
          return _ref3.apply(this, arguments);
        };
      }();
      getPosts();
    };

    _this.detectKey = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Escape') {
        _this.setState({
          edit_post: false,
          value2: ""
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.submitForm();
      }
    };

    _this.state = {
      show_post: false,
      myDate: (0, _moment2.default)(),
      profile_img: "",
      post_content: "",
      bFileModalOpen: false,
      fileType: 'photo'
    };

    _this.openPhotoPost = _this.openPhotoPost.bind(_this);

    _this.openVideoPost = _this.openVideoPost.bind(_this);
    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ComposeSection, [{
    key: "callbackPostFileModalClose",
    value: function callbackPostFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: "openPhotoPost",
    value: function openPhotoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'photo'
      });
    }
  }, {
    key: "openVideoPost",
    value: function openVideoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'video'
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {

      //const now = moment.utc()
      var now = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss');
      this.setState({
        myDate: now
      });
      if (this.props != undefined) {
        if (this.props.initialData.userInfo != undefined) {
          this.setState({
            profile_img: this.props.initialData.userInfo.profile_img,
            user_id: this.props.initialData.userInfo.id
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "section",
        { className: "compose-area" },
        _react2.default.createElement(
          "div",
          { className: "compose-section" },
          _react2.default.createElement("textarea", { rows: 8, cols: 80, defaultValue: '', onChange: this.handleChange_txtArea, value: this.state.post_content, onKeyUp: this.detectKey, maxLength: "254", placeholder: "What's up..." }),
          _react2.default.createElement("div", { className: "user-img" }),
          _react2.default.createElement("a", { href: "/profile/" + this.state.user_id, className: "user-img", style: {
              backgroundImage: "url('" + this.state.profile_img + "')"
            } }),
          _react2.default.createElement(_PostFileModal2.default, {
            bOpen: this.state.bFileModalOpen,
            fileType: this.state.fileType,
            callbackClose: this.callbackPostFileModalClose,
            callbackConfirm: this.callbackPostFileModalConfirm
          }),
          _react2.default.createElement(
            "div",
            { className: "buttons" },
            _react2.default.createElement(
              "div",
              { className: " button photo-btn", onClick: function onClick() {
                  return _this3.openPhotoPost();
                } },
              _react2.default.createElement("i", { className: "fas fa-camera" })
            ),
            _react2.default.createElement(
              "div",
              { className: "button video-btn", onClick: function onClick() {
                  return _this3.openVideoPost();
                } },
              _react2.default.createElement("i", { className: "fas fa-video" })
            ),
            _react2.default.createElement(
              "div",
              { className: "button send-btn", onClick: this.submitForm },
              _react2.default.createElement("i", { className: "fas fa-scroll" })
            )
          )
        ),
        _react2.default.createElement(
          "section",
          { id: "posts" },
          this.state.show_post && this.showLatestPosts()
        )
      );
    }
  }]);
  return ComposeSection;
}(_react.Component);

exports.default = ComposeSection;


var app = document.getElementById("app");

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualEsportsExperience = function (_Component) {
  (0, _inherits3.default)(IndividualEsportsExperience, _Component);

  function IndividualEsportsExperience() {
    (0, _classCallCheck3.default)(this, IndividualEsportsExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualEsportsExperience.__proto__ || Object.getPrototypeOf(IndividualEsportsExperience)).call(this));

    _this.showAllTags = function (arrTags) {
      if (arrTags !== undefined) {
        return arrTags.map(function (tag, index) {
          var calcIndex = index % 4;
          switch (calcIndex) {
            case 0:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 1:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-blue", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 2:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-red", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 3:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-yellow", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            default:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
          }
        });
      }
    };

    _this.edit_lnk = function (id) {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id + "/edit/esportsExp/" + id;
    };

    _this.state = {
      myPage: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualEsportsExperience, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var match = this.props.routeProps.match;
      var initialData = this.props.initialData;


      if (initialData != 'loading') {
        if (initialData.userInfo.id == match.params.id) {
          this.setState({ myPage: true });
        }
      }
    }
  }, {
    key: "find_tag",
    value: function find_tag(tag) {
      window.location.href = "/advancedSearch/" + tag + "/Esports Experience";
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          item = _props.item,
          rowLen = _props.rowLen,
          row = _props.row;

      var show_lines = true;

      var id = item.id,
          achievements = item.achievements,
          duration = item.duration,
          game_name = item.game_name,
          role_title = item.role_title,
          skills = item.skills,
          team_name = item.team_name;


      var arrTags = "";
      var show_team_name = false;
      var show_achievements = false;
      var show_tags = false;
      var duration_converted = "Less than 3 months";

      if (achievements != null && achievements != "") {
        show_achievements = true;
      }

      if (team_name != null && team_name != "") {
        show_team_name = true;
      }

      if (skills != null && skills != "") {
        arrTags = skills.split(',');
        show_tags = true;
      }

      switch (duration) {
        case 1:
          duration_converted = "Less than 3 months";
          break;
        case 2:
          duration_converted = "Less than 6 months";
          break;
        case 3:
          duration_converted = "Less than 1 year";
          break;
        case 4:
          duration_converted = "Less than 2 years";
          break;
        case 5:
          duration_converted = "Less than 3 years";
          break;
        case 42:
          duration_converted = "3+ years";
          break;
        default:
          duration_converted = "Less than 3 months";
      }

      if (rowLen === row + 1) {
        show_lines = false;
      }
      return _react2.default.createElement(
        "div",
        { className: "game-info" },
        _react2.default.createElement(
          "div",
          { className: "game-name" },
          "" + game_name
        ),
        _react2.default.createElement(
          "div",
          { className: "game-infos" },
          this.state.myPage && _react2.default.createElement("i", { className: "fas fa-pen", onClick: function onClick() {
              return _this2.edit_lnk(id);
            } })
        ),
        _react2.default.createElement(
          "div",
          { className: "role-title" },
          _react2.default.createElement("i", { className: "fas fa-angle-double-down" }),
          "\xA0 ",
          "" + role_title
        ),
        show_team_name && _react2.default.createElement(
          "div",
          { className: "team-name" },
          _react2.default.createElement("i", { className: "fas fa-users" }),
          "\xA0 ",
          "" + team_name
        ),
        _react2.default.createElement(
          "div",
          { className: "game-stuff" },
          _react2.default.createElement("i", { className: "fas fa-gamepad" }),
          "\xA0 ",
          "" + duration_converted
        ),
        show_achievements && _react2.default.createElement(
          "div",
          { className: "game-comments" },
          _react2.default.createElement("i", { className: "fas fa-trophy" }),
          "\xA0",
          "" + achievements
        ),
        show_tags && _react2.default.createElement(
          "div",
          { className: "tags" },
          this.showAllTags(arrTags)
        ),
        show_lines && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        show_lines && _react2.default.createElement(
          "div",
          { className: "line-break2" },
          _react2.default.createElement("hr", null)
        )
      );
    }
  }]);
  return IndividualEsportsExperience;
}(_react.Component);

exports.default = IndividualEsportsExperience;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualFriend = function (_Component) {
  (0, _inherits3.default)(IndividualFriend, _Component);

  function IndividualFriend() {
    (0, _classCallCheck3.default)(this, IndividualFriend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualFriend.__proto__ || Object.getPrototypeOf(IndividualFriend)).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(IndividualFriend, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          friend = _props.friend,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (friend.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        "div",
        { className: "invitation-info" },
        show_profile_img && _react2.default.createElement("a", { href: "/profile/" + friend.friend_id, className: "user-img", style: {
            backgroundImage: "url('" + friend.profile_img + "')" } }),
        !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + friend.friend_id, className: "user-img", style: {
            backgroundImage: "url('https://image.flaticon.com/icons/svg/149/149071.svg')"
          } }),
        _react2.default.createElement(
          "div",
          { className: "user-info" },
          "" + friend.first_name,
          " ",
          "" + friend.last_name
        ),
        !lastRow && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        lastRow && _react2.default.createElement("div", { className: "last-row" })
      );
    }
  }]);
  return IndividualFriend;
}(_react.Component);

exports.default = IndividualFriend;

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualGamingExperience = function (_Component) {
  (0, _inherits3.default)(IndividualGamingExperience, _Component);

  function IndividualGamingExperience() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IndividualGamingExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualGamingExperience.__proto__ || Object.getPrototypeOf(IndividualGamingExperience)).call(this));

    _this.showRating = function (rating) {
      if (rating !== undefined) {
        switch (rating) {
          case 0:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 1:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 2:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 3:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
          case 4:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
          case 5:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" })
            );
            break;
          default:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
        }
      }
    };

    _this.commend_me = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var commendTitle, getCommend, addCommend, getCommendTitle, oldTitle, addCommendTitle;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({ showCommends: false });
                _context.prev = 1;
                commendTitle = "";
                _context.next = 5;
                return _axios2.default.get("/api/commendations/" + id);

              case 5:
                getCommend = _context.sent;

                if (getCommend.data.getAllCommend[0].no_of_commends < 49) {
                  commendTitle = "Apprentice";
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 99) {
                  commendTitle = "Elite";
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 149) {
                  commendTitle = "Expert";
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 199) {
                  commendTitle = "Hero";
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 249) {
                  commendTitle = "Master";
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 999) {
                  commendTitle = "Grand Master";
                } else if (getCommend.data.getAllCommend[0].no_of_commends > 1000) {
                  commendTitle = "Pro";
                }

                addCommend = _axios2.default.post('/api/commendations', {
                  game_experiences_id: id
                });
                _context.next = 10;
                return _axios2.default.get("/api/GameExperiences/exp/" + id);

              case 10:
                getCommendTitle = _context.sent;
                oldTitle = "";

                oldTitle = getCommendTitle.data.myGameExperience[0].commendation;

                if (oldTitle != commendTitle) {
                  addCommendTitle = _axios2.default.post("/api/GameExperiences/commend/" + id, {
                    commendation: commendTitle
                  });
                }

                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);

                console.log(_context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 16]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.showAllTags = function (arrTags) {
      if (arrTags !== undefined) {
        return arrTags.map(function (tag, index) {
          var calcIndex = index % 4;
          switch (calcIndex) {
            case 0:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 1:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-blue", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 2:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-red", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            case 3:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-yellow", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
            default:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green", onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                "\xA0"
              );
              break;
          }
        });
      }
    };

    _this.edit_lnk = function (id) {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id + "/edit/gamingexp/" + id;
    };

    _this.state = {
      myPage: false,
      showCommends: true
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualGamingExperience, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var match = this.props.routeProps.match;
      var initialData = this.props.initialData;
      var item = this.props.item;

      var self = this;

      if (initialData != 'loading') {
        if (initialData.userInfo.id == match.params.id) {
          this.setState({ myPage: true, showCommends: false });
        }
      }

      var getCommend = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getCommend;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get("/api/commendations/user/" + item.id);

                case 3:
                  _getCommend = _context2.sent;

                  if (_getCommend.data.getCommend[0].no_of_commends != 0) {
                    self.setState({ showCommends: false });
                  }

                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getCommend() {
          return _ref2.apply(this, arguments);
        };
      }();
      getCommend();
    }
  }, {
    key: "find_tag",
    value: function find_tag(tag) {
      window.location.href = "/advancedSearch/" + tag + "/Gaming Experience";
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          item = _props.item,
          rowLen = _props.rowLen,
          row = _props.row;

      var show_lines = true;

      var id = item.id,
          game_name = item.game_name,
          experience = item.experience,
          status = item.status,
          comments = item.comments,
          played = item.played,
          commendation = item.commendation,
          link = item.link,
          tags = item.tags,
          ratings = item.ratings;

      var arrTags = "";
      var show_tags = false;
      var show_link = false;
      var show_comments = false;
      var show_ratings = false;
      var played_converted = "Less than 1 year";

      if (tags != null && tags != "") {
        arrTags = tags.split(',');
        show_tags = true;
      }

      if (link != null && link != "") {
        show_link = true;
      }

      if (comments != null && comments != "") {
        show_comments = true;
      }

      if (ratings != 0 && ratings != "") {
        show_ratings = true;
      }

      if (experience == null) {
        experience = "";
      }

      switch (played) {
        case 1:
          played_converted = "Less than 1 year";
          break;
        case 2:
          played_converted = "Less than 2 years";
          break;
        case 3:
          played_converted = "Less than 3 years";
          break;
        case 4:
          played_converted = "Less than 4 years";
          break;
        case 5:
          played_converted = "Less than 5 years";
          break;
        case 42:
          played_converted = "More than 5 years";
          break;
        default:
          played_converted = "Less than 1 year";
      }

      if (rowLen === row + 1) {
        show_lines = false;
      }
      return _react2.default.createElement(
        "div",
        { className: "game-info" },
        _react2.default.createElement(
          "div",
          { className: "game-name" },
          "" + game_name
        ),
        _react2.default.createElement(
          "div",
          { className: "game-infos" },
          this.state.myPage && _react2.default.createElement("i", { className: "fas fa-pen", onClick: function onClick() {
              return _this3.edit_lnk(id);
            } })
        ),
        show_ratings && _react2.default.createElement(
          "div",
          { className: "game-rating" },
          this.showRating(ratings)
        ),
        _react2.default.createElement(
          "div",
          { className: "game-stuff" },
          _react2.default.createElement("i", { className: "fas fa-gamepad" }),
          "\xA0",
          "" + experience,
          ", ",
          "" + played_converted
        ),
        _react2.default.createElement(
          "div",
          { className: "game-status" },
          _react2.default.createElement("i", { className: "fab fa-d-and-d" }),
          "\xA0",
          "" + status
        ),
        _react2.default.createElement(
          "div",
          { className: "game-commendation" },
          _react2.default.createElement("i", { className: "fas fa-dragon" }),
          "\xA0",
          "" + commendation,
          "\xA0",
          this.state.showCommends && _react2.default.createElement(
            "div",
            { className: "commendation" },
            _react2.default.createElement(
              "button",
              { className: "commend", type: "button", onClick: function onClick() {
                  return _this3.commend_me(id);
                } },
              "Commend!"
            )
          )
        ),
        show_comments && _react2.default.createElement(
          "div",
          { className: "game-comments" },
          _react2.default.createElement("i", { className: "fas fa-trophy" }),
          "\xA0",
          "" + comments
        ),
        show_link && _react2.default.createElement(
          "div",
          { className: "game-misc" },
          _react2.default.createElement("i", { className: "fas fa-broadcast-tower" }),
          "\xA0Link:",
          "" + link
        ),
        show_tags && _react2.default.createElement(
          "div",
          { className: "tags" },
          this.showAllTags(arrTags)
        ),
        show_lines && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        show_lines && _react2.default.createElement(
          "div",
          { className: "line-break2" },
          _react2.default.createElement("hr", null)
        )
      );
    }
  }]);
  return IndividualGamingExperience;
}(_react.Component);

exports.default = IndividualGamingExperience;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualInvitation = function (_Component) {
  (0, _inherits3.default)(IndividualInvitation, _Component);

  function IndividualInvitation() {
    (0, _classCallCheck3.default)(this, IndividualInvitation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualInvitation.__proto__ || Object.getPrototypeOf(IndividualInvitation)).call(this));

    _this.clickedAccept = function () {
      var invitation = _this.props.invitation;

      try {
        var deleteNoti = _axios2.default.get("/api/notifications/delete/" + invitation.id);
      } catch (error) {
        console.log(error);
      }

      try {
        var createFriend = _axios2.default.post('/api/friends/create', {
          friend_id: invitation.user_id
        });
        console.log(createFriend);
      } catch (error) {
        console.log(error);
      }

      _this.setState({
        actionClicked: false,
        actionClickedAccept: true
      });
    };

    _this.clickedDenied = function () {
      var invitation = _this.props.invitation;

      try {
        var deleteNoti = _axios2.default.get("/api/notifications/delete/" + invitation.id);
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        actionClicked: false,
        actionClickedDeny: true
      });
    };

    _this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualInvitation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          invitation = _props.invitation,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (invitation.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        "div",
        { className: "invitation-info" },
        show_profile_img && _react2.default.createElement("a", { href: "/profile/" + invitation.user_id, className: "user-img", style: {
            backgroundImage: "url('" + invitation.profile_img + "')" } }),
        !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + invitation.user_id, className: "user-img", style: {
            backgroundImage: "url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')"
          } }),
        _react2.default.createElement(
          "div",
          { className: "user-info" },
          "" + invitation.first_name,
          " ",
          "" + invitation.last_name
        ),
        _react2.default.createElement(
          "div",
          { className: "invitiation-options" },
          this.state.actionClicked && _react2.default.createElement(
            "div",
            { className: "invitation-accept", onClick: this.clickedAccept },
            "Accept \xA0\xA0"
          ),
          this.state.actionClicked && _react2.default.createElement(
            "div",
            { className: "invitation-deny", onClick: this.clickedDenied },
            "Deny\xA0\xA0"
          ),
          this.state.actionClickedAccept && _react2.default.createElement(
            "div",
            { className: "invitation-accepted" },
            "Accepted! \xA0\xA0"
          ),
          this.state.actionClickedDeny && _react2.default.createElement(
            "div",
            { className: "invitation-denied" },
            "Denied! \xA0\xA0"
          )
        ),
        !lastRow && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        lastRow && _react2.default.createElement("div", { className: "last-row" })
      );
    }
  }]);
  return IndividualInvitation;
}(_react.Component);

exports.default = IndividualInvitation;

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualNotification = function (_Component) {
  (0, _inherits3.default)(IndividualNotification, _Component);

  function IndividualNotification() {
    (0, _classCallCheck3.default)(this, IndividualNotification);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualNotification.__proto__ || Object.getPrototypeOf(IndividualNotification)).call(this));

    _this.clickedAccept = function () {
      var notification = _this.props.notification;

      try {
        var deleteNoti = _axios2.default.get("/api/notifications/delete/" + notification.id);
      } catch (error) {
        console.log(error);
      }

      try {
        var createFriend = _axios2.default.post('/api/friends/create', {
          friend_id: notification.user_id
        });
      } catch (error) {
        console.log(error);
      }

      _this.setState({
        actionClicked: false,
        actionClickedAccept: true
      });
    };

    _this.clickedDenied = function () {
      var notification = _this.props.notification;

      try {
        var deleteNoti = _axios2.default.get("/api/notifications/delete/" + notification.id);
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        actionClicked: false,
        actionClickedDeny: true
      });
    };

    _this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      notification_str: "",
      unread: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualNotification, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var notification = this.props.notification;

      var activity_type;
      var tmpStr = "";

      var getMoreNoti = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var getLikePost, getLikeComment, getLikeReply, getComment, getReply;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.t0 = notification.activity_type;
                  _context.next = _context.t0 === 2 ? 4 : _context.t0 === 3 ? 20 : _context.t0 === 4 ? 36 : _context.t0 === 5 ? 52 : _context.t0 === 6 ? 68 : 84;
                  break;

                case 4:
                  _context.next = 6;
                  return _axios2.default.get("/api/notifications/getAllNotiLike_post/" + notification.post_id);

                case 6:
                  getLikePost = _context.sent;

                  if (getLikePost.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t1 = getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis;
                  _context.next = _context.t1 === 1 ? 11 : _context.t1 === 2 ? 13 : _context.t1 === 3 ? 15 : 17;
                  break;

                case 11:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " liked your post";
                  return _context.abrupt("break", 18);

                case 13:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " and " + getLikePost.data.getAllNotiLike_post[1].first_name + " " + getLikePost.data.getAllNotiLike_post[1].last_name + " liked your post";
                  return _context.abrupt("break", 18);

                case 15:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + ",  " + getLikePost.data.getAllNotiLike_post[1].first_name + " " + getLikePost.data.getAllNotiLike_post[1].last_name + " and " + getLikePost.data.getAllNotiLike_post[2].first_name + " " + getLikePost.data.getAllNotiLike_post[2].last_name + " liked your post";
                  return _context.abrupt("break", 18);

                case 17:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " and " + getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis + " other people liked your post";

                case 18:
                  self.props.notification.profile_img = getLikePost.data.getAllNotiLike_post[0].profile_img;
                  return _context.abrupt("break", 84);

                case 20:
                  _context.next = 22;
                  return _axios2.default.get("/api/notifications/getAllNotiLike_comment/" + notification.post_id);

                case 22:
                  getLikeComment = _context.sent;

                  if (getLikeComment.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t2 = getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis;
                  _context.next = _context.t2 === 1 ? 27 : _context.t2 === 2 ? 29 : _context.t2 === 3 ? 31 : 33;
                  break;

                case 27:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " liked your comment";
                  return _context.abrupt("break", 34);

                case 29:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " and " + getLikeComment.data.getAllNotiLike_comment[1].first_name + " " + getLikeComment.data.getAllNotiLike_comment[1].last_name + " liked your comment";
                  return _context.abrupt("break", 34);

                case 31:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + ",  " + getLikeComment.data.getAllNotiLike_comment[1].first_name + " " + getLikeComment.data.getAllNotiLike_comment[1].last_name + " and " + getLikeComment.data.getAllNotiLike_comment[2].first_name + " " + getLikeComment.data.getAllNotiLike_comment[2].last_name + " liked your comment";
                  return _context.abrupt("break", 34);

                case 33:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " and " + getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis + " other people liked your comment";

                case 34:
                  self.props.notification.profile_img = getLikeComment.data.getAllNotiLike_comment[0].profile_img;
                  return _context.abrupt("break", 84);

                case 36:
                  _context.next = 38;
                  return _axios2.default.get("/api/notifications/getAllNotiLike_reply/" + notification.post_id);

                case 38:
                  getLikeReply = _context.sent;

                  if (getLikeReply.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t3 = getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis;
                  _context.next = _context.t3 === 1 ? 43 : _context.t3 === 2 ? 45 : _context.t3 === 3 ? 47 : 49;
                  break;

                case 43:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " liked your reply";
                  return _context.abrupt("break", 50);

                case 45:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " and " + getLikeReply.data.getAllNotiLike_reply[1].first_name + " " + getLikeReply.data.getAllNotiLike_reply[1].last_name + " liked your reply";
                  return _context.abrupt("break", 50);

                case 47:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + ",  " + getLikeReply.data.getAllNotiLike_reply[1].first_name + " " + getLikeReply.data.getAllNotiLike_reply[1].last_name + " and " + getLikeReply.data.getAllNotiLike_reply[2].first_name + " " + getLikeReply.data.getAllNotiLike_reply[2].last_name + " liked your reply";
                  return _context.abrupt("break", 50);

                case 49:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " and " + getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis + " other people liked your reply";

                case 50:
                  self.props.notification.profile_img = getLikeReply.data.getAllNotiLike_reply[0].profile_img;
                  return _context.abrupt("break", 84);

                case 52:
                  _context.next = 54;
                  return _axios2.default.get("/api/notifications/getAllNotiComment/" + notification.post_id);

                case 54:
                  getComment = _context.sent;

                  if (getComment.data.getAllNotiCommentCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t4 = getComment.data.getAllNotiCommentCount[0].no_of_my_notis;
                  _context.next = _context.t4 === 1 ? 59 : _context.t4 === 2 ? 61 : _context.t4 === 3 ? 63 : 65;
                  break;

                case 59:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " commented on your post";
                  return _context.abrupt("break", 66);

                case 61:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " and " + getComment.data.getAllNotiComment[1].first_name + " " + getComment.data.getAllNotiComment[1].last_name + " commented on your post";
                  return _context.abrupt("break", 66);

                case 63:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + ",  " + getComment.data.getAllNotiComment[1].first_name + " " + getComment.data.getAllNotiComment[1].last_name + " and " + getComment.data.getAllNotiComment[2].first_name + " " + getComment.data.getAllNotiComment[2].last_name + " commented on your post";
                  return _context.abrupt("break", 66);

                case 65:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " and " + getComment.data.getAllNotiCommentCount[0].no_of_my_notis + " other people commented on your post";

                case 66:
                  self.props.notification.profile_img = getComment.data.getAllNotiComment[0].profile_img;
                  return _context.abrupt("break", 84);

                case 68:
                  _context.next = 70;
                  return _axios2.default.get("/api/notifications/getAllNotiReply/" + notification.post_id);

                case 70:
                  getReply = _context.sent;

                  if (getReply.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t5 = getReply.data.getAllNotiReplyCount[0].no_of_my_notis;
                  _context.next = _context.t5 === 1 ? 75 : _context.t5 === 2 ? 77 : _context.t5 === 3 ? 79 : 81;
                  break;

                case 75:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " replied to your comment";
                  return _context.abrupt("break", 82);

                case 77:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " and " + getReply.data.getAllNotiReply[1].first_name + " " + getReply.data.getAllNotiReply[1].last_name + " replied to your comment";
                  return _context.abrupt("break", 82);

                case 79:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + ",  " + getReply.data.getAllNotiReply[1].first_name + " " + getReply.data.getAllNotiReply[1].last_name + " and " + getReply.data.getAllNotiReply[2].first_name + " " + getReply.data.getAllNotiReply[2].last_name + " replied to your comment";
                  return _context.abrupt("break", 82);

                case 81:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " and " + getReply.data.getAllNotiReplyCount[0].no_of_my_notis + " other people replied to your comment";

                case 82:
                  self.props.notification.profile_img = getReply.data.getAllNotiReply[0].profile_img;
                  return _context.abrupt("break", 84);

                case 84:
                  _context.next = 89;
                  break;

                case 86:
                  _context.prev = 86;
                  _context.t6 = _context["catch"](0);

                  console.log(_context.t6);

                case 89:
                  self.forceUpdate();

                case 90:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 86]]);
        }));

        return function getMoreNoti() {
          return _ref.apply(this, arguments);
        };
      }();

      var getinitialData = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var getunread;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(notification.no_of_my_notis == 1)) {
                    _context2.next = 27;
                    break;
                  }

                  _context2.prev = 1;
                  _context2.next = 4;
                  return _axios2.default.get("/api/notifications/getunread/" + notification.post_id + "/" + notification.activity_type);

                case 4:
                  getunread = _context2.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context2.next = 11;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](1);

                  console.log(_context2.t0);

                case 11:
                  _context2.t1 = notification.activity_type;
                  _context2.next = _context2.t1 === 2 ? 14 : _context2.t1 === 3 ? 16 : _context2.t1 === 4 ? 18 : _context2.t1 === 5 ? 20 : _context2.t1 === 6 ? 22 : 24;
                  break;

                case 14:
                  activity_type = "liked your post";
                  return _context2.abrupt("break", 24);

                case 16:
                  activity_type = "liked your comment";
                  return _context2.abrupt("break", 24);

                case 18:
                  activity_type = "liked your reply";
                  return _context2.abrupt("break", 24);

                case 20:
                  activity_type = "commented on your post";
                  return _context2.abrupt("break", 24);

                case 22:
                  activity_type = "replied to your comment";
                  return _context2.abrupt("break", 24);

                case 24:
                  self.setState({
                    notification_str: notification.first_name + " " + notification.last_name + " " + activity_type
                  });
                  _context2.next = 28;
                  break;

                case 27:
                  getMoreNoti();

                case 28:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[1, 8]]);
        }));

        return function getinitialData() {
          return _ref2.apply(this, arguments);
        };
      }();

      getinitialData();
    }
  }, {
    key: "updateRead_Status",
    value: function updateRead_Status() {
      try {
        var updateRead_Status = _axios2.default.post("/api/notifications/updateRead_Status/" + this.props.notification.post_id + "/" + this.props.notification.activity_type);
      } catch (error) {
        console.log(error);
      }
      window.location.href = "/post/" + this.props.notification.post_id;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          notification = _props.notification,
          lastRow = _props.lastRow;


      var show_profile_img = false;
      if (notification.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        "div",
        { className: "notification-info" },
        show_profile_img && _react2.default.createElement("a", { href: "/profile/" + notification.id, className: "user-img", style: {
            backgroundImage: "url('" + notification.profile_img + "')" } }),
        !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + notification.id, className: "user-img", style: {
            backgroundImage: "url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')"
          } }),
        !this.state.unread && _react2.default.createElement(
          "div",
          { className: "user-info-read" },
          _react2.default.createElement(
            "a",
            { href: "/post/" + notification.post_id },
            this.state.notification_str
          )
        ),
        this.state.unread && _react2.default.createElement(
          "div",
          { className: "user-info-unread", onClick: function onClick() {
              return _this2.updateRead_Status();
            } },
          this.state.notification_str
        ),
        !lastRow && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        lastRow && _react2.default.createElement("div", { className: "last-row" })
      );
    }
  }]);
  return IndividualNotification;
}(_react.Component);

exports.default = IndividualNotification;

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualPlayer = function (_Component) {
  (0, _inherits3.default)(IndividualPlayer, _Component);

  function IndividualPlayer() {
    (0, _classCallCheck3.default)(this, IndividualPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualPlayer.__proto__ || Object.getPrototypeOf(IndividualPlayer)).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(IndividualPlayer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          friend = _props.friend,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (friend.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        "div",
        { className: "invitation-info" },
        show_profile_img && _react2.default.createElement("a", { href: "/profile/" + friend.friend_id, className: "user-img", style: {
            backgroundImage: "url('" + friend.profile_img + "')" } }),
        !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + friend.friend_id, className: "user-img", style: {
            backgroundImage: "url('https://image.flaticon.com/icons/svg/149/149071.svg')"
          } }),
        _react2.default.createElement(
          "div",
          { className: "user-info" },
          "" + friend.first_name,
          " ",
          "" + friend.last_name
        ),
        !lastRow && _react2.default.createElement(
          "div",
          { className: "line-break" },
          _react2.default.createElement("hr", null)
        ),
        lastRow && _react2.default.createElement("div", { className: "last-row" })
      );
    }
  }]);
  return IndividualPlayer;
}(_react.Component);

exports.default = IndividualPlayer;

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualReply = function (_Component) {
  (0, _inherits3.default)(IndividualReply, _Component);

  function IndividualReply() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IndividualReply);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualReply.__proto__ || Object.getPrototypeOf(IndividualReply)).call(this));

    _this.click_reply_like_btn = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(reply_id) {
        var replyLike, _this$props, comment_user_id, post_id, reply, user, addReplyLike;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _axios2.default.post('/api/likes', {
                  reply_id: reply_id
                });

              case 3:
                replyLike = _context.sent;
                _this$props = _this.props, comment_user_id = _this$props.comment_user_id, post_id = _this$props.post_id, reply = _this$props.reply, user = _this$props.user;

                if (reply.user_id != user.userInfo.id) {
                  addReplyLike = _axios2.default.post('/api/notifications/addReplyLike', {
                    other_user_id: comment_user_id,
                    post_id: post_id,
                    reply_id: reply_id
                  });
                }
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                console.log(_context.t0);

              case 11:

                _this.setState({
                  reply_like_total: _this.state.reply_like_total + 1
                });

                _this.setState({
                  show_reply_like: true,
                  reply_like: !_this.state.reply_like
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.click_reply_unlike_btn = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(reply_id) {
        var post_id, reply_unlike, deleteReplyLike;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                post_id = _this.props.post_id;
                _context2.prev = 1;
                _context2.next = 4;
                return _axios2.default.get("/api/likes/delete/reply/" + reply_id);

              case 4:
                reply_unlike = _context2.sent;
                _context2.next = 7;
                return _axios2.default.get("/api/notifications/deleteReplyLike/" + reply_id);

              case 7:
                deleteReplyLike = _context2.sent;
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);

                console.log(_context2.t0);

              case 13:

                if (_this.state.reply_like_total == 1) {
                  _this.setState({
                    show_reply_like: false
                  });
                }

                _this.setState({
                  reply_like_total: _this.state.reply_like_total - 1
                });

                _this.setState({
                  reply_like: !_this.state.reply_like
                });

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[1, 10]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var reply_id, myReply_delete;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              reply_id = _this.props.reply.id;


              try {
                myReply_delete = _axios2.default.get("/api/replies/delete/" + reply_id);

                _this.setState({
                  reply_deleted: true
                });
              } catch (error) {
                console.log(error);
              }
              _this.setState({
                dropdown: false
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));
    _this.clickedEdit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var reply_id, myReply_content;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              reply_id = _this.props.reply.id;
              _context4.prev = 1;
              _context4.next = 4;
              return _axios2.default.get("/api/replies/show_reply/" + reply_id);

            case 4:
              myReply_content = _context4.sent;


              _this.setState({
                show_edit_reply: true,
                dropdown: false,
                value: myReply_content.data.this_reply[0].content
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);

              console.log(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[1, 8]]);
    }));

    _this.handleChange = function (e) {
      _this.setState({ value: e.target.value });
    };

    _this.detectKey = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Escape') {
        _this.setState({
          show_edit_reply: false,
          dropdown: false,
          value: ""
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_reply();
      }
    };

    _this.insert_reply = function () {
      if (_this.state.value == "") {
        return;
      }
      if (_this.state.value.trim() == "") {
        _this.setState({
          value: ""
        });
        return;
      }
      var self = _this;
      var reply_id = _this.props.reply.id;

      var saveReply = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var mysaveReply;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.post("/api/replies/update/" + reply_id, {
                    content: self.state.value
                  });

                case 3:
                  mysaveReply = _context5.sent;


                  self.setState({
                    show_edit_reply: false,
                    dropdown: false,
                    content: self.state.value,
                    value: ""
                  });
                  _context5.next = 10;
                  break;

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5["catch"](0);

                  console.log(_context5.t0);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 7]]);
        }));

        return function saveReply() {
          return _ref5.apply(this, arguments);
        };
      }();
      saveReply();
    };

    _this.state = {
      show_reply_like: false,
      show_reply_reply: false,
      reply_like: false,
      show_profile_img: false,
      reply_like_total: 0,
      show_add_reply: false,
      dropdown: false,
      reply_deleted: false,
      show_reply_options: false,
      show_edit_reply: false,
      value: "",
      content: "",
      reply_time: ""
    };
    _this.textInput = null;

    _this.setTextInputRef = function (element) {
      _this.textInput = element;
    };

    _this.focusTextInput = function () {
      // Focus the text input using the raw DOM API
      if (_this.textInput) _this.textInput.focus();
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualReply, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.reply.profile_img != null) {
        this.setState({ show_profile_img: true });
      }

      this.setState({
        content: this.props.reply.content
      });

      var reply_timestamp = (0, _moment2.default)(this.props.reply.updated_at, "YYYY-MM-DD HH:mm:ssZ");
      this.setState({ reply_time: reply_timestamp.local().fromNow() });

      var self = this;
      var reply = this.props;

      var getCommentReplies = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var i, myReplyLikes;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get("/api/likes/reply/" + reply.reply.id);

                case 3:
                  myReplyLikes = _context6.sent;


                  if (myReplyLikes.data.do_I_like_this_reply[0].myOpinion != 0) {
                    self.setState({
                      reply_like: true
                    });
                  }

                  if (myReplyLikes.data.no_of_likes[0].no_of_likes != 0) {
                    self.setState({
                      show_reply_like: true,
                      reply_like_total: myReplyLikes.data.no_of_likes[0].no_of_likes
                    });
                  }
                  _context6.next = 11;
                  break;

                case 8:
                  _context6.prev = 8;
                  _context6.t0 = _context6["catch"](0);

                  console.log(_context6.t0);

                case 11:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 8]]);
        }));

        return function getCommentReplies() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getmyRepliesCount = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var i, myRepliesCount;
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _axios2.default.get("/api/replies/my_count/" + reply.reply.id);

                case 3:
                  myRepliesCount = _context7.sent;


                  if (myRepliesCount.data.no_of_my_replies[0].no_of_my_replies != 0) {
                    self.setState({
                      show_reply_options: true
                    });
                  }

                  _context7.next = 10;
                  break;

                case 7:
                  _context7.prev = 7;
                  _context7.t0 = _context7["catch"](0);

                  console.log(_context7.t0);

                case 10:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 7]]);
        }));

        return function getmyRepliesCount() {
          return _ref7.apply(this, arguments);
        };
      }();
      getCommentReplies();
      getmyRepliesCount();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var reply = this.props.reply;
      //console.log(reply);

      if (this.state.reply_deleted != true) {
        return _react2.default.createElement(
          "div",
          { className: "comment-replies" },
          this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + reply.user_id, className: "user-img-reply", style: {
              backgroundImage: "url('" + reply.profile_img + "')" } }),
          !this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + reply.user_id, className: "user-img-reply", style: {
              backgroundImage: "url('https://image.flaticon.com/icons/svg/149/149071.svg')"
            } }),
          _react2.default.createElement(
            "div",
            { className: "reply-author-info" },
            reply.first_name,
            " ",
            reply.last_name,
            this.state.show_reply_options && _react2.default.createElement(
              "div",
              { className: "reply-options" },
              _react2.default.createElement("i", { className: "fas fa-ellipsis-h", onClick: this.clickedDropdown })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "reply-dropdown " + (this.state.dropdown ? 'active' : '') },
            _react2.default.createElement(
              "nav",
              null,
              _react2.default.createElement(
                "div",
                { className: "edit", onClick: this.clickedEdit },
                "Edit \xA0"
              ),
              _react2.default.createElement(
                "div",
                { className: "delete", onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to delete this reply?')) _this3.delete_exp();
                  } },
                "Delete"
              ),
              "\xA0"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "reply-comment-content" },
            this.state.content
          ),
          _react2.default.createElement(
            "div",
            { className: "replies-panel" },
            _react2.default.createElement(
              "div",
              { className: "comment-panel" },
              this.state.reply_like && _react2.default.createElement(
                "div",
                { className: "comment-panel-liked", onClick: function onClick() {
                    return _this3.click_reply_unlike_btn(reply.id);
                  } },
                "Like"
              ),
              !this.state.reply_like && _react2.default.createElement(
                "div",
                { className: "comment-panel-like", onClick: function onClick() {
                    return _this3.click_reply_like_btn(reply.id);
                  } },
                "Like"
              ),
              (this.state.show_reply_like || this.state.show_reply) && _react2.default.createElement(
                "div",
                { className: "divider" },
                "|"
              ),
              this.state.show_reply_like && _react2.default.createElement(
                "div",
                { className: "no-likes" },
                this.state.reply_like_total,
                " ",
                this.state.reply_like_total > 1 ? "Likes" : "Like",
                " "
              ),
              _react2.default.createElement(
                "div",
                { className: "comment-time" },
                _react2.default.createElement("i", { className: "fas fa-circle" }),
                " ",
                this.state.reply_time
              )
            )
          ),
          this.state.show_edit_reply && _react2.default.createElement(
            "div",
            { className: "add-reply" },
            _react2.default.createElement("input", { type: "text", id: "reply_name_box", className: "reply-name-box", onKeyUp: this.detectKey, ref: this.setTextInputRef, onChange: this.handleChange, value: this.state.value })
          )
        );
      } else {
        return _react2.default.createElement("div", { className: "comment-replies" });
      }
    }
  }]);
  return IndividualReply;
}(_react.Component);

exports.default = IndividualReply;


var app = document.getElementById("app");

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _PostFileModal = __webpack_require__(150);

var _PostFileModal2 = _interopRequireDefault(_PostFileModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyComposeSection = function (_Component) {
  (0, _inherits3.default)(MyComposeSection, _Component);

  function MyComposeSection() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, MyComposeSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyComposeSection.__proto__ || Object.getPrototypeOf(MyComposeSection)).call(this));

    _this.callbackPostFileModalConfirm = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var url, post;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  bFileModalOpen: false
                });

                url = '';


                if (_this.state.fileType == 'photo') {
                  url = '/api/postphoto';
                } else if (_this.state.fileType == 'video') {
                  url = '/api/postvideo';
                } else {
                  url = '/api/postphoto';
                }

                console.log('data:', data);

                if (!(data.media_url.length == 0 && data.content == '')) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                _context.prev = 6;
                _context.next = 9;
                return _axios2.default.post(url, {
                  media_url: JSON.stringify(data.media_url),
                  content: data.content
                });

              case 9:
                post = _context.sent;


                _this.setState({
                  myPosts: undefined
                });
                _context.next = 13;
                return _this.get_posts();

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](6);

                console.log(_context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[6, 15]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var post;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.post_content.trim() == "")) {
                _context2.next = 3;
                break;
              }

              _this.setState({
                post_content: ""
              });
              return _context2.abrupt("return");

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return _axios2.default.post('/api/post', {
                content: _this.state.post_content.trim(),
                user_id: _this.props.initialData.userInfo.id,
                type: 'text'
              });

            case 6:
              post = _context2.sent;

              _this.setState({
                myPosts: undefined
              });
              _context2.next = 10;
              return _this.get_posts();

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](3);

              console.log(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 12]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
      _this.setState((0, _defineProperty3.default)({}, name, value));
    };

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, { post: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.get_posts = function () {
      var self = _this;

      var getPosts = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var myPosts, i, myLikes;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get("/api/mypost/" + self.state.myDate);

                case 3:
                  myPosts = _context3.sent;
                  i = 0;

                case 5:
                  if (!(i < myPosts.data.myPosts.length)) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 8;
                  return _axios2.default.get("/api/likes/" + myPosts.data.myPosts[i].id);

                case 8:
                  myLikes = _context3.sent;

                  myPosts.data.myPosts[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts[i].admirer_first_name = "";
                    myPosts.data.myPosts[i].admirer_last_name = "";
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPosts.data.myPosts[i].do_I_like_it = true;
                  } else {
                    myPosts.data.myPosts[i].do_I_like_it = false;
                  }

                case 13:
                  i++;
                  _context3.next = 5;
                  break;

                case 16:

                  self.setState({
                    myPosts: myPosts.data.myPosts,
                    show_post: true,
                    post_content: ""
                  });
                  self.forceUpdate();
                  _context3.next = 23;
                  break;

                case 20:
                  _context3.prev = 20;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 23:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 20]]);
        }));

        return function getPosts() {
          return _ref3.apply(this, arguments);
        };
      }();
      getPosts();
    };

    _this.detectKey = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Escape') {
        _this.setState({
          edit_post: false,
          value2: ""
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.submitForm();
      }
    };

    _this.state = {
      show_post: false,
      myDate: (0, _moment2.default)(),
      profile_img: "",
      post_content: "",
      bFileModalOpen: false,
      fileType: 'photo'
    };

    _this.openPhotoPost = _this.openPhotoPost.bind(_this);

    _this.openVideoPost = _this.openVideoPost.bind(_this);
    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MyComposeSection, [{
    key: "callbackPostFileModalClose",
    value: function callbackPostFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: "openPhotoPost",
    value: function openPhotoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'photo'
      });
    }
  }, {
    key: "openVideoPost",
    value: function openVideoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'video'
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {

      //const now = moment.utc()
      //var now = moment().utc().format('YYYY-MM-DDTHH:mm:ss')
      var now = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss');
      this.setState({
        myDate: now
      });
      if (this.props != undefined) {
        if (this.props.initialData.userInfo != undefined) {
          this.setState({
            profile_img: this.props.initialData.userInfo.profile_img,
            user_id: this.props.initialData.userInfo.id
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "section",
        { className: "compose-area" },
        _react2.default.createElement(
          "div",
          { className: "compose-section" },
          _react2.default.createElement("textarea", { name: "post_content", rows: 8, cols: 80, defaultValue: '', onChange: this.handleChange, value: this.state.post_content, onKeyUp: this.detectKey, maxLength: "254", placeholder: "What's up..." }),
          _react2.default.createElement("div", { className: "user-img" }),
          _react2.default.createElement("a", { href: "/profile/" + this.state.user_id, className: "user-img", style: {
              backgroundImage: "url('" + this.state.profile_img + "')"
            } }),
          _react2.default.createElement(_PostFileModal2.default, {
            bOpen: this.state.bFileModalOpen,
            fileType: this.state.fileType,
            callbackClose: this.callbackPostFileModalClose,
            callbackConfirm: this.callbackPostFileModalConfirm
          }),
          _react2.default.createElement(
            "div",
            { className: "buttons" },
            _react2.default.createElement(
              "div",
              { className: "button photo-btn", onClick: function onClick() {
                  return _this3.openPhotoPost();
                } },
              _react2.default.createElement("i", { className: "fas fa-camera" })
            ),
            _react2.default.createElement(
              "div",
              { className: "button video-btn", onClick: function onClick() {
                  return _this3.openVideoPost();
                } },
              _react2.default.createElement("i", { className: "fas fa-video" })
            ),
            _react2.default.createElement(
              "div",
              { className: "button send-btn", onClick: this.submitForm },
              _react2.default.createElement("i", { className: "fas fa-scroll" })
            )
          )
        ),
        _react2.default.createElement(
          "section",
          { id: "posts" },
          this.state.show_post && this.showLatestPosts()
        )
      );
    }
  }]);
  return MyComposeSection;
}(_react.Component);

exports.default = MyComposeSection;


var app = document.getElementById("app");

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactInfiniteScrollComponent = __webpack_require__(329);

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyPosts = function (_Component) {
  (0, _inherits3.default)(MyPosts, _Component);

  function MyPosts() {
    (0, _classCallCheck3.default)(this, MyPosts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyPosts.__proto__ || Object.getPrototypeOf(MyPosts)).call(this));

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, { post: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.fetchMoreData = function () {
      var myCounter = _this.state.counter;
      _this.setState({
        counter: _this.state.counter + 1
      });
      if (myCounter != 1) {
        _this.setState({
          show_top_btn: true
        });
      }

      var self = _this;
      var getPosts = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myPosts, i, myLikes;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/getmypost/" + myCounter);

                case 3:
                  myPosts = _context.sent;

                  if (!(myPosts.data.myPosts.data.length == 0)) {
                    _context.next = 7;
                    break;
                  }

                  self.setState({
                    moreplease: false
                  });
                  return _context.abrupt("return");

                case 7:
                  i = 0;

                case 8:
                  if (!(i < myPosts.data.myPosts.data.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 11;
                  return _axios2.default.get("/api/likes/" + myPosts.data.myPosts.data[i].id);

                case 11:
                  myLikes = _context.sent;

                  myPosts.data.myPosts.data[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts.data[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts.data[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts.data[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts.data[i].admirer_first_name = "";
                    myPosts.data.myPosts.data[i].admirer_last_name = "";
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPosts.data.myPosts.data[i].do_I_like_it = true;
                  } else {
                    myPosts.data.myPosts.data[i].do_I_like_it = false;
                  }

                case 16:
                  i++;
                  _context.next = 8;
                  break;

                case 19:

                  self.setState({
                    myPosts: self.state.myPosts.concat(myPosts.data.myPosts.data)
                  });
                  _context.next = 25;
                  break;

                case 22:
                  _context.prev = 22;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 25:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 22]]);
        }));

        return function getPosts() {
          return _ref.apply(this, arguments);
        };
      }();
      getPosts();
    };

    _this.state = {
      counter: 1,
      myPosts: [],
      moreplease: true
    };
    return _this;
  }

  (0, _createClass3.default)(MyPosts, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchMoreData();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.myPosts != undefined) {
        return _react2.default.createElement(
          "section",
          { id: "posts" },
          _react2.default.createElement(
            _reactInfiniteScrollComponent2.default,
            {
              dataLength: this.state.myPosts.length,
              next: this.fetchMoreData,
              hasMore: this.state.moreplease },
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement("section", { id: "posts" });
      }
    }
  }]);
  return MyPosts;
}(_react.Component);

exports.default = MyPosts;

var app = document.getElementById("app");

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactInfiniteScrollComponent = __webpack_require__(329);

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Posts = function (_Component) {
  (0, _inherits3.default)(Posts, _Component);

  function Posts() {
    (0, _classCallCheck3.default)(this, Posts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Posts.__proto__ || Object.getPrototypeOf(Posts)).call(this));

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, { post: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.fetchMoreData = function () {
      var myCounter = _this.state.counter;
      _this.setState({
        counter: _this.state.counter + 1
      });

      var self = _this;
      var getPosts = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myPosts, i, myLikes;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/post/" + myCounter);

                case 3:
                  myPosts = _context.sent;

                  if (!(myPosts.data.myPosts.data.length == 0)) {
                    _context.next = 7;
                    break;
                  }

                  self.setState({
                    moreplease: false
                  });
                  return _context.abrupt("return");

                case 7:
                  i = 0;

                case 8:
                  if (!(i < myPosts.data.myPosts.data.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 11;
                  return _axios2.default.get("/api/likes/" + myPosts.data.myPosts.data[i].id);

                case 11:
                  myLikes = _context.sent;

                  myPosts.data.myPosts.data[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts.data[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts.data[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts.data[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts.data[i].admirer_first_name = "";
                    myPosts.data.myPosts.data[i].admirer_last_name = "";
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPosts.data.myPosts.data[i].do_I_like_it = true;
                  } else {
                    myPosts.data.myPosts.data[i].do_I_like_it = false;
                  }

                case 16:
                  i++;
                  _context.next = 8;
                  break;

                case 19:

                  self.setState({
                    myPosts: self.state.myPosts.concat(myPosts.data.myPosts.data)
                  });
                  _context.next = 25;
                  break;

                case 22:
                  _context.prev = 22;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 25:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 22]]);
        }));

        return function getPosts() {
          return _ref.apply(this, arguments);
        };
      }();
      getPosts();
    };

    _this.state = {
      counter: 1,
      myPosts: [],
      moreplease: true
    };
    return _this;
  }

  (0, _createClass3.default)(Posts, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchMoreData();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.myPosts != undefined) {
        return _react2.default.createElement(
          "section",
          { id: "posts" },
          _react2.default.createElement(
            _reactInfiniteScrollComponent2.default,
            {
              dataLength: this.state.myPosts.length,
              next: this.fetchMoreData,
              hasMore: this.state.moreplease
            },
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement("section", { id: "posts" });
      }
    }
  }]);
  return Posts;
}(_react.Component);

exports.default = Posts;

var app = document.getElementById("app");

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilePreview = function (_Component) {
  (0, _inherits3.default)(FilePreview, _Component);

  function FilePreview(props) {
    (0, _classCallCheck3.default)(this, FilePreview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FilePreview.__proto__ || Object.getPrototypeOf(FilePreview)).call(this, props));

    _this.clickDelete = _this.clickDelete.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(FilePreview, [{
    key: "clickDelete",
    value: function clickDelete() {
      if (typeof this.props.callbackDelete != 'undefined') {
        this.props.callbackDelete(this.props.srcKey);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.fileType == 'video') {
        return _react2.default.createElement(
          "div",
          { className: "file-preview-wrap" },
          _react2.default.createElement(
            "div",
            { className: "file-preview-overlay" },
            _react2.default.createElement(
              "span",
              { className: "file-preview-delete", onClick: function onClick() {
                  return _this2.clickDelete();
                } },
              _react2.default.createElement("i", { className: "fas fa-times" })
            )
          ),
          _react2.default.createElement(
            "video",
            { controls: true },
            _react2.default.createElement("source", { src: this.props.src })
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "file-preview-wrap" },
          _react2.default.createElement(
            "div",
            { className: "file-preview-overlay" },
            _react2.default.createElement(
              "span",
              { className: "file-preview-delete", onClick: function onClick() {
                  return _this2.clickDelete();
                } },
              _react2.default.createElement("i", { className: "fas fa-times" })
            )
          ),
          _react2.default.createElement("img", { src: this.props.src })
        );
      }
    }
  }]);
  return FilePreview;
}(_react.Component);

var PostFileModal = function (_Component2) {
  (0, _inherits3.default)(PostFileModal, _Component2);

  function PostFileModal() {
    (0, _classCallCheck3.default)(this, PostFileModal);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (PostFileModal.__proto__ || Object.getPrototypeOf(PostFileModal)).call(this));

    _this3.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
      _this3.setState((0, _defineProperty3.default)({}, name, value));
    };

    _this3.state = {
      file: null,
      file_preview: '',
      preview_files: [
        // {
        //   src: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556592223564-lg.jpg',
        //   key: '1556592223564-lg.jpg'
        // },
        // {
        //   src: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556630834362-lg.png',
        //   key: '1556630834362-lg.png'
        // },
        // {
        //   src: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1557052734263_7KtWM6_SampleVideo_1280x720_1mb.mp4',
        //   key: ''
        // }
        // {
        //   src: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1557106454637_KnDFzf_Amazing+Video.avi',
        //   key: '1557106707224_WvK0ly_Meek+Mill+-+Going+Bad+feat.+Drake+(Official+Video).mp4'
        // }
      ],
      uploading: false,
      file_src: '',
      file_key: '',
      post_content: ''
    };

    _this3.closeModal = _this3.closeModal.bind(_this3);
    _this3.doUploadS3 = _this3.doUploadS3.bind(_this3);
    _this3.clickSave = _this3.clickSave.bind(_this3);

    _this3.callbackDeletePreview = _this3.callbackDeletePreview.bind(_this3);
    return _this3;
  }

  (0, _createClass3.default)(PostFileModal, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "callbackDeletePreview",
    value: function callbackDeletePreview(key) {
      var instance = this;

      var formData = new FormData();
      formData.append('key', key);

      _axios2.default.post('/api/deleteFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (resp) {
        var preview_files = instance.state.preview_files;
        for (var index = 0; index < preview_files.length; index++) {
          if (instance.state.preview_files[index].key == key) {
            preview_files.splice(index, 1);
          }
        }

        instance.setState({
          preview_files: preview_files
        });
      }).catch(function (error) {});
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      if (this.state.uploading) {
        return;
      }

      this.props.callbackClose();

      if (this.state.preview_files.length != 0) {
        _axios2.default.post('/api/deleteFiles', {
          files: this.state.preview_files
        }).then(function (resp) {
          instance.setState({
            file_src: resp.data.Location
          });
        }).catch(function (error) {});
      }

      this.setState({
        preview_files: [],
        post_content: ''
      });
    }
  }, {
    key: "clickSave",
    value: function clickSave() {
      if (this.state.uploading) {
        return;
      }

      this.props.callbackConfirm({
        media_url: this.state.preview_files,
        content: this.state.post_content
      });

      this.setState({
        preview_files: [],
        post_content: ''
      });
    }
  }, {
    key: "doUploadS3",
    value: function doUploadS3(file) {
      var instance = this;
      this.setState({
        uploading: true
      });
      var formData = new FormData();
      formData.append('upload_file', file);
      formData.append('filename', file.name);

      _axios2.default.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (resp) {

        var new_preview_files = instance.state.preview_files;
        new_preview_files.push({
          src: resp.data.Location,
          key: resp.data.Key
        });
        instance.setState({
          uploading: false,
          preview_files: new_preview_files
        });
      }).catch(function (error) {
        // handle your error
        alert('Opps, something went wrong. Unable to upload your file. Max file size is 100MB.');
        instance.setState({
          uploading: false
        });
      });
    }
  }, {
    key: "onChangeFile",
    value: function onChangeFile(event) {
      event.stopPropagation();
      event.preventDefault();

      var instance = this;
      var file = event.target.files[0];

      var reader = new FileReader();

      reader.onload = function (e) {
        instance.setState({
          file_preview: e.target.result
        });
      };

      reader.readAsDataURL(file);

      this.doUploadS3(file);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var class_modal_status = '';

      if (this.props.bOpen) {
        class_modal_status = 'modal--show';
      }

      var accept = '';

      if (this.props.fileType == 'photo') {
        accept = 'image/*';
      } else {
        accept = '.ogv, .mp4, .m4v, .mpeg, .wmv, .mov, .ogm, .webm, .asx, .mpg';
      }

      var filepath = "https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png";
      var instance = this;
      return _react2.default.createElement(
        "div",
        { className: "modal-container " + class_modal_status },
        _react2.default.createElement(
          "div",
          { className: "modal-wrap" },
          _react2.default.createElement(
            "div",
            { className: "modal-header" },
            this.props.fileType == 'photo' ? 'Upload Photos' : 'Upload Videos'
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-close-btn", onClick: function onClick() {
                return _this4.closeModal();
              } },
            _react2.default.createElement("i", { className: "fas fa-times" })
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-content" },
            _react2.default.createElement("textarea", { name: "post_content", rows: 8, cols: 80, defaultValue: '', onChange: this.handleChange, value: this.state.post_content, maxLength: "254", placeholder: "What's up..." }),
            _react2.default.createElement("input", { id: "myInput",
              type: "file",
              ref: function ref(_ref) {
                return _this4.ref_upload = _ref;
              },
              style: { display: 'none' },
              accept: accept,
              onClick: function onClick() {
                return _this4.ref_upload.value = null;
              },
              onChange: this.onChangeFile.bind(this)
            }),
            _react2.default.createElement(
              "div",
              { className: "open-btn", onClick: function onClick() {
                  return _this4.ref_upload.click();
                } },
              _react2.default.createElement("i", { className: "fas fa-upload" }),
              " Upload File"
            ),
            _react2.default.createElement(
              "div",
              { className: this.state.uploading ? "uploading-container" : "uploading-container uploading--hide" },
              _react2.default.createElement("div", { className: "uploading" })
            ),
            _react2.default.createElement(
              "div",
              { className: "modal-text" },
              "Previews"
            ),
            _react2.default.createElement(
              "div",
              { className: "uploaded-files-content" },
              _react2.default.createElement(
                "div",
                { className: "uploaded-file-preview" },
                this.state.preview_files.map(function (data, index) {
                  console.log(data, index);
                  return _react2.default.createElement(FilePreview, {
                    key: data.key,
                    src: data.src,
                    srcKey: data.key,
                    fileType: instance.props.fileType,
                    callbackDelete: instance.callbackDeletePreview
                  });
                })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: this.state.uploading ? "save-btn btn--disable" : "save-btn", onClick: function onClick() {
                  return _this4.clickSave();
                } },
              _react2.default.createElement("i", { className: "fas fa-save" }),
              " Save"
            )
          )
        )
      );
    }
  }]);
  return PostFileModal;
}(_react.Component);

exports.default = PostFileModal;

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(52);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(64);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var email_options = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];

var played_options = [{ value: 1, label: 'Less than 3 months' }, { value: 2, label: 'Less than 6 months' }, { value: 3, label: 'Less than 1 year' }, { value: 4, label: 'Less than 2 years' }, { value: 5, label: 'Less than 3 years' }, { value: 42, label: '3+ years' }];

var status_options = [{ value: 'Actively looking for a team', label: 'Actively looking for a team' }, { value: 'Maybe looking for a team', label: 'Maybe looking for a team' }, { value: 'Do not disturb please!', label: 'Do not disturb please!' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var AddEsportsExp = function (_Component) {
  (0, _inherits3.default)(AddEsportsExp, _Component);

  function AddEsportsExp() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, AddEsportsExp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddEsportsExp.__proto__ || Object.getPrototypeOf(AddEsportsExp)).call(this));

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_email = function (email_box) {
      _this.setState({ email_box: email_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Status = function (status_box) {
      _this.setState({ status_box: status_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Played = function (played_box) {
      _this.setState({ played_box: played_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Ratings = function (ratings_box) {
      _this.setState({ ratings_box: ratings_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_comments = function () {
      _this.setState({
        comments_chkbox: !_this.state.comments_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_link = function () {
      _this.setState({
        link_chkbox: !_this.state.link_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_ardour = function (value_ardour) {
      self.setState({ value_ardour: value_ardour });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_game_name = function (value_game_name) {
      _this.setState({ value_game_name: value_game_name });
      _this.onBlur_game_name(value_game_name);
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange3 = function (value_tags) {
      _this.setState({ value_tags: value_tags });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var myardour, myPlayed, myTags, _OGstatus, uShallNotPass, ardourNgame_name_same_same, name_trigger, i, j, post, newGame_name, newGameID, _post, tmpnewGameID, _post2, post_bio, _post_bio, post_role;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myardour = "";
              myPlayed = 1;
              myTags = "";
              _OGstatus = true;
              uShallNotPass = false;
              ardourNgame_name_same_same = false;
              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.status_box.label == "" || _this.state.status_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_status_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (_this.state.email_box.label == "" || _this.state.email_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_email_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_email_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 12;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt("return");

            case 12:

              if (_this.state.played_box.value != "" && _this.state.played_box.value != undefined) {
                myPlayed = _this.state.played_box.value;
              }

              if (_this.state.team_name_box.trim() != "") {
                uShallNotPass = true;
              } else if (_this.state.achievements_box.trim() != "") {
                uShallNotPass = true;
              } else if (myTags != "") {
                uShallNotPass = true;
              } else if (_this.state.role_title_box != "") {
                uShallNotPass = true;
              } else if (_this.state.value_game_name.length != 0) {
                uShallNotPass = true;
              }

              if (_this.state.value_game_name == null) {
                _this.state.value_game_name = [];
              }

              if ((_this.state.role_title_box == "" || _this.state.role_title_box == null) && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else if (_this.state.value_game_name.length == 0 && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 19;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt("return");

            case 19:

              if (_this.state.value_ardour !== null && _this.state.value_ardour.length !== 0) {
                for (i = 0; i < _this.state.value_ardour.length; i++) {
                  myardour += _this.state.value_ardour[i].label + "; ";
                }
                myardour = myardour.trim().replace(/; /g, ",").trim();
                myardour = myardour.replace(/;/g, "");
                myardour = myardour.replace(/,/g, ", ");
              }

              //If you created a new game and you have selected it then and only then will we save this to the DB

              if (!(_this.state.newValueCreated_ardour != "")) {
                _context.next = 43;
                break;
              }

              i = 0;

            case 22:
              if (!(i < _this.state.newValueCreated_ardour.length)) {
                _context.next = 43;
                break;
              }

              j = 0;

            case 24:
              if (!(j < _this.state.value_ardour.length)) {
                _context.next = 40;
                break;
              }

              if (!(_this.state.value_ardour[j].label == _this.state.newValueCreated_ardour[i])) {
                _context.next = 37;
                break;
              }

              _context.prev = 26;
              _context.next = 29;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.newValueCreated_ardour[i]
              });

            case 29:
              post = _context.sent;

              if (_this.state.newValueCreated_ardour[i] == _this.state.value_game_name.label) {
                ardourNgame_name_same_same = true;
                newGame_name = post.data.game_name;
                newGameID = post.data.id;
              }
              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](26);

              console.log(_context.t0);

            case 36:
              return _context.abrupt("break", 40);

            case 37:
              j++;
              _context.next = 24;
              break;

            case 40:
              i++;
              _context.next = 22;
              break;

            case 43:

              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGame_name = "";
              newGameID = "";

              if (!(_this.state.newValueCreated_game_name != "" && ardourNgame_name_same_same == false)) {
                _context.next = 64;
                break;
              }

              i = 0;

            case 47:
              if (!(i < _this.state.newValueCreated_game_name.length)) {
                _context.next = 64;
                break;
              }

              if (!(_this.state.value_game_name.label == _this.state.newValueCreated_game_name[i])) {
                _context.next = 61;
                break;
              }

              _context.prev = 49;
              _context.next = 52;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value_game_name.label
              });

            case 52:
              _post = _context.sent;

              newGame_name = _post.data.game_name;
              newGameID = _post.data.id;
              _context.next = 60;
              break;

            case 57:
              _context.prev = 57;
              _context.t1 = _context["catch"](49);

              console.log(_context.t1);

            case 60:
              return _context.abrupt("break", 64);

            case 61:
              i++;
              _context.next = 47;
              break;

            case 64:
              if (!(_this.state.newValueCreated_tags != "")) {
                _context.next = 89;
                break;
              }

              tmpnewGameID = "";

              if (_this.state.value_game_name.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value_game_name.game_names_id;
              }
              i = 0;

            case 68:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context.next = 89;
                break;
              }

              j = 0;

            case 70:
              if (!(j < _this.state.value_tags.length)) {
                _context.next = 86;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context.next = 83;
                break;
              }

              _context.prev = 72;

              if (!(tmpnewGameID != "")) {
                _context.next = 77;
                break;
              }

              _context.next = 76;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 76:
              _post2 = _context.sent;

            case 77:
              _context.next = 82;
              break;

            case 79:
              _context.prev = 79;
              _context.t2 = _context["catch"](72);

              console.log(_context.t2);

            case 82:
              return _context.abrupt("break", 86);

            case 83:
              j++;
              _context.next = 70;
              break;

            case 86:
              i++;
              _context.next = 68;
              break;

            case 89:

              if (_this.state.value_tags !== null && _this.state.value_tags.length !== 0) {
                for (i = 0; i < _this.state.value_tags.length; i++) {
                  myTags += _this.state.value_tags[i].label + "; ";
                }
                myTags = myTags.trim().replace(/; /g, ",").trim();
                myTags = myTags.replace(/;/g, "");
                myTags = myTags.replace(/,/g, ", ");
              }

              if (_this.state.status_box_OG != _this.state.status_box.label) {
                _OGstatus = false;
              } else if (_this.state.email_box_OG != _this.state.email_box.label) {
                _OGstatus = false;
              } else if (_this.state.career_highlights_box_OG != _this.state.career_highlights_box) {
                _OGstatus = false;
              } else if (_this.state.games_of_ardour_OG != myardour) {
                _OGstatus = false;
              }

              _this.state.career_highlights_box == undefined ? undefined : _this.state.career_highlights_box = _this.state.career_highlights_box.trim();
              _this.state.achievements_box == undefined ? undefined : _this.state.achievements_box = _this.state.achievements_box.trim();
              _this.state.team_name_box == undefined ? undefined : _this.state.team_name_box = _this.state.team_name_box.trim();
              _this.state.role_title_box == undefined ? undefined : _this.state.role_title_box = _this.state.role_title_box.trim();

              if (!(_this.state.createEsportsPost == true)) {
                _context.next = 107;
                break;
              }

              _context.prev = 96;
              _context.next = 99;
              return _axios2.default.post('/api/esports_bio/create', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == "Yes" ? "Yes" : "No",
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 99:
              post_bio = _context.sent;
              _context.next = 105;
              break;

            case 102:
              _context.prev = 102;
              _context.t3 = _context["catch"](96);

              console.log(_context.t3);

            case 105:
              _context.next = 117;
              break;

            case 107:
              if (!(_OGstatus == false)) {
                _context.next = 117;
                break;
              }

              _context.prev = 108;
              _context.next = 111;
              return _axios2.default.post('/api/esports_bio/update/', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == "Yes" ? "Yes" : "No",
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 111:
              _post_bio = _context.sent;
              _context.next = 117;
              break;

            case 114:
              _context.prev = 114;
              _context.t4 = _context["catch"](108);

              console.log(_context.t4);

            case 117:
              if (!uShallNotPass) {
                _context.next = 127;
                break;
              }

              _context.prev = 118;
              _context.next = 121;
              return _axios2.default.post('/api/esports_experiences/create', {
                role_title: _this.state.role_title_box,
                game_name: newGame_name == "" ? _this.state.value_game_name.label : newGame_name,
                team_name: _this.state.team_name_box,
                duration: myPlayed,
                achievements: _this.state.achievements_box,
                skills: myTags
              });

            case 121:
              post_role = _context.sent;
              _context.next = 127;
              break;

            case 124:
              _context.prev = 124;
              _context.t5 = _context["catch"](118);

              console.log(_context.t5);

            case 127:
              _this.handleCloseModal();

            case 128:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[26, 33], [49, 57], [72, 79], [96, 102], [108, 114], [118, 124]]);
    }));

    _this.handleCreate_ardour = function (inputValue) {
      _this.setState({ isLoading_ardour: true });
      setTimeout(function () {
        var _this$state = _this.state,
            options_ardour = _this$state.options_ardour,
            value_ardour = _this$state.value_ardour,
            newValueCreated_ardour = _this$state.newValueCreated_ardour;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_ardour: false });
        _this.setState({ options_ardour: [].concat((0, _toConsumableArray3.default)(options_ardour), [newOption]) });
        _this.setState({ value_ardour: newOption });
        _this.setState({ value_ardour: [].concat((0, _toConsumableArray3.default)(value_ardour), [newOption]) });
        _this.setState({ newValueCreated_ardour: [].concat((0, _toConsumableArray3.default)(newValueCreated_ardour), [newOption.label]) });
      }, 300);
    };

    _this.handleCreate_game_name = function (inputValue) {
      setTimeout(function () {
        var _this$state2 = _this.state,
            options_game_name = _this$state2.options_game_name,
            value_game_name = _this$state2.value_game_name,
            newValueCreated_game_name = _this$state2.newValueCreated_game_name;

        var newOption = createOption(inputValue, null);
        _this.setState({ options_game_name: [].concat((0, _toConsumableArray3.default)(options_game_name), [newOption]) });
        _this.setState({ value_game_name: newOption });
        _this.setState({ value_tags: "" });
        _this.setState({ newValueCreated_game_name: [].concat((0, _toConsumableArray3.default)(newValueCreated_game_name), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: "" });
      }, 300);
    };

    _this.handleCreate3 = function (inputValue) {
      _this.setState({ isLoading_tags: true });
      setTimeout(function () {
        var _this$state3 = _this.state,
            options_tags = _this$state3.options_tags,
            value_tags = _this$state3.value_tags,
            newValueCreated_tags = _this$state3.newValueCreated_tags;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_tags: false });
        _this.setState({ options_tags: [].concat((0, _toConsumableArray3.default)(options_tags), [newOption]) });
        _this.setState({ value_tags: [].concat((0, _toConsumableArray3.default)(value_tags), [newOption]) });
        _this.setState({ newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label]) });
      }, 300);
    };

    _this.onBlur_game_name = function (value) {
      var getInitialData = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;

                  self.setState({ options_tags: "" });
                  self.setState({ value_tags: "" });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get("/api/Tags/" + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt("return");

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt("return");

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = "";
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 20:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 17]]);
        }));

        return function getInitialData() {
          return _ref2.apply(this, arguments);
        };
      }();
      getInitialData();
    };

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_email_info_box: false,
      show_status_info_box: false,
      show_role_title_info_box: false,
      show_game_name_info_box: false,
      status_box: [{ label: "", value: "" }],
      email_box: [{ label: "", value: "" }],
      played_box: "",
      career_highlights_box: "",
      team_name_box: "",
      role_title_box: "",
      achievements_box: "",
      isLoading_tags: false,
      isLoading_ardour: false,
      isLoading_game_name: false,
      options_tags: "",
      options_ardour: "",
      options_game_name: "",
      value_tags: [],
      value_game_name: [],
      value_ardour: [],
      newValueCreated_ardour: [],
      newValueCreated_game_name: [],
      newValueCreated_tags: [],
      name_trigger: false,
      createEsportsPost: true,
      intial_trigger: true
    };
    return _this;
  }

  (0, _createClass3.default)(AddEsportsExp, [{
    key: "handleCloseModal",
    value: function handleCloseModal() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getEsports_bio = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _getEsports_bio, arrTags, games_of_ardour, tmp, i, newOption;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/esports_bio/show');

                case 3:
                  _getEsports_bio = _context3.sent;


                  if (_getEsports_bio.data.myProfile.length != 0) {
                    self.state.createEsportsPost = false;
                    self.setState({
                      myEsports_bio: _getEsports_bio.data.myProfile[0]
                    });
                    arrTags = "";
                    games_of_ardour = _getEsports_bio.data.myProfile[0].games_of_ardour;
                    tmp = [];


                    if (games_of_ardour != null && games_of_ardour != "") {
                      arrTags = games_of_ardour.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.setState({ value_ardour: tmp });
                    }
                  } else {
                    self.setState({
                      myEsports_bio: ""
                    });
                  }
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getEsports_bio() {
          return _ref3.apply(this, arguments);
        };
      }();
      getEsports_bio();
    }
  }, {
    key: "getOptions",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", []);

              case 2:
                _context4.prev = 2;

                inputValue = inputValue.trimStart();
                _context4.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context4.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context4.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context4.next = 14;
                break;

              case 13:
                return _context4.abrupt("return", []);

              case 14:
                return _context4.abrupt("return", newArr);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);

                console.log(_context4.t0);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref4.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.myEsports_bio !== undefined) {
        var _state = this.state,
            isLoading_ardour = _state.isLoading_ardour,
            _options_ardour = _state.options_ardour,
            _value_ardour = _state.value_ardour,
            isLoading_tags = _state.isLoading_tags,
            _options_tags2 = _state.options_tags,
            _value_tags = _state.value_tags,
            _value_game_name = _state.value_game_name,
            _options_game_name = _state.options_game_name,
            isLoading_game_name = _state.isLoading_game_name;
        var _state$myEsports_bio = this.state.myEsports_bio,
            email_visibility = _state$myEsports_bio.email_visibility,
            games_of_ardour = _state$myEsports_bio.games_of_ardour,
            career_highlights = _state$myEsports_bio.career_highlights,
            status = _state$myEsports_bio.status;


        if (this.state.intial_trigger) {
          this.state.status_box.label = status;
          this.state.email_box.label = email_visibility;
          this.state.career_highlights_box = career_highlights;
          this.state.intial_trigger = false;

          this.state.status_box_OG = status;
          this.state.email_box_OG = email_visibility;
          this.state.career_highlights_box_OG = career_highlights;
          this.state.games_of_ardour_OG = games_of_ardour;
        }

        return _react2.default.createElement(
          "div",
          { className: "content-area addEsportsExp-page" },
          _react2.default.createElement(
            _reactModal2.default,
            {
              isOpen: true,
              onRequestClose: function onRequestClose(event) {
                // Ignore react-modal esc-close handling
                if (event.type === 'keydown' && event.keyCode === 27 && _this3.state.shouldCloseOnOverlayClick_ === false) {
                  return;
                } else {
                  _this3.handleCloseModal();
                }
              },
              shouldCloseOnOverlayClick: this.state.shouldCloseOnOverlayClick_,
              className: "addEsportsModal",
              overlayClassName: "Overlay"
            },
            "Esports Experience:",
            _react2.default.createElement("i", { className: "fas fa-times", onClick: this.handleCloseModal }),
            _react2.default.createElement(
              "div",
              { className: "status" },
              _react2.default.createElement(
                "p",
                null,
                "Status ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Status,
                options: status_options,
                placeholder: "Set your job status",
                className: "status_box",
                defaultValue: [{ label: status, value: status }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "email" },
              _react2.default.createElement(
                "p",
                null,
                "Email Visible? ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_email,
                options: email_options,
                placeholder: "Show/Don't show email?",
                className: "email_box",
                defaultValue: [{ label: email_visibility, value: email_visibility }]

              })
            ),
            _react2.default.createElement(
              "div",
              { className: "games_ardour_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                "Games of ardour"
              ),
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                loadOptions: this.getOptions,
                onChange: this.handleChange_ardour,
                onCreateOption: this.handleCreate_ardour,
                isClearable: true,
                value: _value_ardour,
                className: "games_ardour_box",
                placeholder: "Games your passionate about",
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                }
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "career-highlights" },
              _react2.default.createElement(
                "p",
                null,
                "Career Highlights"
              ),
              _react2.default.createElement("textarea", { id: "career_highlights_box", className: "career_highlights_box", rows: 8, cols: 80, defaultValue: career_highlights, maxLength: "254", onBlur: this.onBlur_bio_box, onFocus: this.onFocus_bio_box, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "line-break" },
              _react2.default.createElement("hr", null)
            ),
            _react2.default.createElement(
              "div",
              { className: "line-break" },
              _react2.default.createElement("hr", null)
            ),
            "Add Role Info:",
            _react2.default.createElement("div", null),
            _react2.default.createElement(
              "div",
              { className: "role-title" },
              _react2.default.createElement(
                "p",
                null,
                "Role Title ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement("input", { type: "text", id: "role_title_box", className: "role_title_box", maxLength: "120", onBlur: this.onBlur_slogan_box, onFocus: this.onFocus_slogan_box, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "gName_txtBox2" },
              _react2.default.createElement(
                "p",
                null,
                "Game Name ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                loadOptions: this.getOptions,
                onChange: this.handleChange_game_name,
                onCreateOption: this.handleCreate_game_name,
                isClearable: true,
                value: _value_game_name,
                className: "game_name_box2",
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                }
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "team-name" },
              _react2.default.createElement(
                "p",
                null,
                "Team name"
              ),
              _react2.default.createElement("input", { type: "text", id: "team_name_box", className: "team_name_box", maxLength: "120", onBlur: this.onBlur_slogan_box, onFocus: this.onFocus_slogan_box, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "played" },
              _react2.default.createElement(
                "p",
                null,
                "Time in Role: ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Played,
                options: played_options,
                placeholder: "Select time in role",
                className: "played_box",
                defaultValue: [{ label: "Less than 3 months", value: 1 }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "achievements" },
              _react2.default.createElement(
                "p",
                null,
                "Achievements in this role"
              ),
              _react2.default.createElement("textarea", { id: "achievements_box", className: "achievements_box", rows: 8, cols: 80, defaultValue: '', maxLength: "254", onBlur: this.onBlur_bio_box, onFocus: this.onFocus_bio_box, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "tag_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "span",
                  { style: { color: "green" } },
                  "S"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "dodgerblue" } },
                  "k"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "i"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "gold" } },
                  "l"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "green" } },
                  "l"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "dodgerblue" } },
                  "s"
                ),
                " (Keywords that identify ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "green" } },
                  "y"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "dodgerblue" } },
                  "o"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "u"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "gold" } },
                  "r"
                ),
                " expertise with this role. Max 250 chars)"
              ),
              _react2.default.createElement(_Creatable2.default, {
                onChange: this.handleChange3,
                options: _options_tags2,
                onCreateOption: this.handleCreate3,
                isClearable: true,
                isDisabled: isLoading_tags,
                isLoading: isLoading_tags,
                value: _value_tags,
                className: "tag_name_box",
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                }
              })
            ),
            _react2.default.createElement("div", null),
            !this.state.show_info_box && _react2.default.createElement("div", null),
            this.state.show_info_box && _react2.default.createElement(
              "div",
              { className: "info_box" },
              this.state.show_email_info_box && _react2.default.createElement(
                "div",
                { className: "email_error" },
                "Error: Email field can't be empty"
              ),
              this.state.show_status_info_box && _react2.default.createElement(
                "div",
                { className: "status_name_error" },
                "Error: Status can't be empty"
              ),
              this.state.show_role_title_info_box && _react2.default.createElement(
                "div",
                { className: "role_name_error" },
                "Error: Role or Game Name can't be empty"
              )
            ),
            _react2.default.createElement("div", null),
            _react2.default.createElement(
              "div",
              { className: "save-btn" },
              _react2.default.createElement(
                "button",
                { className: "save", onClick: this.submitForm },
                "Save"
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area addEsportsExp-page" },
          "Loading"
        );
      }
    }
  }]);
  return AddEsportsExp;
}(_react.Component);

exports.default = AddEsportsExp;

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(52);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(64);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var played_options = [{ value: 1, label: 'Less than 1 year' }, { value: 2, label: 'Less than 2 years' }, { value: 3, label: 'Less than 3 years' }, { value: 4, label: 'Less than 4 years' }, { value: 5, label: 'Less than 5 years' }, { value: 42, label: '5+ years' }];

var rating_options = [{ value: 1, label: '1 star' }, { value: 2, label: '2 stars' }, { value: 3, label: '3 stars' }, { value: 4, label: '4 stars' }, { value: 5, label: '5 stars' }];

var status_options = [{ value: 'Actively Gaming', label: 'Actively Gaming' }, { value: 'Sometimes...', label: 'Sometimes...' }, { value: 'Moved On', label: 'Moved On' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var AddGamingExp = function (_Component) {
  (0, _inherits3.default)(AddGamingExp, _Component);

  function AddGamingExp() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, AddGamingExp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddGamingExp.__proto__ || Object.getPrototypeOf(AddGamingExp)).call(this));

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Experience = function (experience_box) {
      _this.setState({ experience_box: experience_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Status = function (status_box) {
      _this.setState({ status_box: status_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Played = function (played_box) {
      _this.setState({ played_box: played_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Ratings = function (ratings_box) {
      _this.setState({ ratings_box: ratings_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_comments = function () {
      _this.setState({
        comments_chkbox: !_this.state.comments_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_link = function () {
      _this.setState({
        link_chkbox: !_this.state.link_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange2 = function (value) {
      self.setState({ value: value });
      _this.onBlur_game_name(value);
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange3 = function (value_tags) {
      _this.setState({ value_tags: value_tags });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var myExperience, myPlayed, myRatings, myTags, name_trigger, newGameID, i, post, j, tmpnewGameID, _post, _post2;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myExperience = "";
              myPlayed = "";
              myRatings = "";
              myTags = "";
              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.value == "" || _this.state.value == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_game_name_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_game_name_info_box: false });
              }

              if (_this.state.status_box == "" || _this.state.status_box == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_status_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 10;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt("return");

            case 10:

              if (_this.state.experience_box != null || _this.state.experience_box != undefined) {
                myExperience = _this.state.experience_box.value;
              }
              if (_this.state.played_box != null || _this.state.played_box != undefined) {
                myPlayed = _this.state.played_box.value;
              }

              if (_this.state.ratings_box != null || _this.state.ratings_box != undefined) {
                myRatings = _this.state.ratings_box.value;
              }
              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGameID = "";

              if (!(_this.state.newValueCreated != "")) {
                _context.next = 32;
                break;
              }

              i = 0;

            case 16:
              if (!(i < _this.state.newValueCreated.length)) {
                _context.next = 32;
                break;
              }

              if (!(_this.state.value.label == _this.state.newValueCreated[i])) {
                _context.next = 29;
                break;
              }

              _context.prev = 18;
              _context.next = 21;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value.label
              });

            case 21:
              post = _context.sent;

              newGameID = post.data.id;
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](18);

              console.log(_context.t0);

            case 28:
              return _context.abrupt("break", 32);

            case 29:
              i++;
              _context.next = 16;
              break;

            case 32:
              if (!(_this.state.newValueCreated_tags != "")) {
                _context.next = 57;
                break;
              }

              tmpnewGameID = "";

              if (_this.state.value.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value.game_names_id;
              }
              i = 0;

            case 36:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context.next = 57;
                break;
              }

              j = 0;

            case 38:
              if (!(j < _this.state.value_tags.length)) {
                _context.next = 54;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context.next = 51;
                break;
              }

              _context.prev = 40;

              if (!(tmpnewGameID != "")) {
                _context.next = 45;
                break;
              }

              _context.next = 44;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 44:
              _post = _context.sent;

            case 45:
              _context.next = 50;
              break;

            case 47:
              _context.prev = 47;
              _context.t1 = _context["catch"](40);

              console.log(_context.t1);

            case 50:
              return _context.abrupt("break", 54);

            case 51:
              j++;
              _context.next = 38;
              break;

            case 54:
              i++;
              _context.next = 36;
              break;

            case 57:

              if (self.state.value_tags !== null && self.state.value_tags.length !== 0) {
                for (i = 0; i < self.state.value_tags.length; i++) {
                  myTags += self.state.value_tags[i].label + "; ";
                }
                myTags = myTags.trim().replace(/; /g, ",").trim();
                myTags = myTags.replace(/;/g, "");
                myTags = myTags.replace(/,/g, ", ");
              }

              _this.state.comments_box == undefined ? undefined : _this.state.comments_box = _this.state.comments_box.trim();
              _this.state.link_box == undefined ? undefined : _this.state.link_box = _this.state.link_box.trim();

              _context.prev = 60;
              _context.next = 63;
              return _axios2.default.post('/api/GameExperiences', {
                game_name: _this.state.value.label,
                experience: myExperience,
                comments: _this.state.comments_box,
                status: _this.state.status_box.label,
                played: myPlayed,
                link: _this.state.link_box,
                ratings: myRatings,
                tags: myTags
              });

            case 63:
              _post2 = _context.sent;

              _this.handleCloseModal();
              _context.next = 70;
              break;

            case 67:
              _context.prev = 67;
              _context.t2 = _context["catch"](60);

              console.log(_context.t2);

            case 70:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[18, 25], [40, 47], [60, 67]]);
    }));

    _this.handleCreate = function (inputValue) {
      setTimeout(function () {
        var _this$state = _this.state,
            value = _this$state.value,
            newValueCreated = _this$state.newValueCreated;

        var newOption = createOption(inputValue, null);
        _this.setState({ value: newOption });
        _this.setState({ value_tags: "" });
        _this.setState({ newValueCreated: [].concat((0, _toConsumableArray3.default)(newValueCreated), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
      }, 300);
    };

    _this.handleCreate2 = function (inputValue) {
      _this.setState({ isLoading_tags: true });
      setTimeout(function () {
        var _this$state2 = _this.state,
            options_tags = _this$state2.options_tags,
            value_tags = _this$state2.value_tags,
            newValueCreated_tags = _this$state2.newValueCreated_tags;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_tags: false });
        _this.setState({ options_tags: [].concat((0, _toConsumableArray3.default)(options_tags), [newOption]) });
        _this.setState({ value_tags: [].concat((0, _toConsumableArray3.default)(value_tags), [newOption]) });
        _this.setState({ newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label]) });
      }, 300);
    };

    _this.onBlur_game_name = function (value) {
      var getInitialData = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;

                  self.setState({ options_tags: "" });
                  self.setState({ value_tags: "" });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get("/api/Tags/" + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt("return");

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt("return");

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = "";
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 20:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 17]]);
        }));

        return function getInitialData() {
          return _ref2.apply(this, arguments);
        };
      }();
      getInitialData();
    };

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_game_name_info_box: false,
      show_status_info_box: false,
      game_name_box: "",
      status_box: "",
      experience_box: "",
      played_box: "",
      ratings_box: "",
      comments_box: "",
      link_box: "",
      isLoading_tags: false,
      options_tags: "",
      value_tags: [],
      newValueCreated_tags: [],
      isLoading: false,
      options: "",
      value: [],
      newValueCreated: [],
      comments_chkbox: false,
      link_chkbox: false,
      name_trigger: false
    };
    return _this;
  }

  (0, _createClass3.default)(AddGamingExp, [{
    key: "handleCloseModal",
    value: function handleCloseModal() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }

    // input: HTMLDivElement | null = null;
    // onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    //   // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    //   if (event.key === 'Enter') {
    //     event.preventDefault()
    //     event.stopPropagation()
    //     console.log("asdfasdf");
    //   }
    // }

    // componentWillMount(){
    //   // const self = this
    //   //
    //   // const getInitialData = async function(){
    //   //   try{
    //   //     const allGameNames = await axios.get('/api/GameNames')
    //   //
    //   //     var i
    //   //     for (i = 0; i < allGameNames.data.allGameNames.length; i++){
    //   //       const newOption = createOption(allGameNames.data.allGameNames[i].game_name, allGameNames.data.allGameNames[i].id )
    //   //       const { options } = self.state
    //   //
    //   //       self.setState({
    //   //         options: [...options, newOption],
    //   //       })
    //   //     }
    //   //   } catch (error){
    //   //     console.log(error)
    //   //   }
    //   // }
    //   //getInitialData()
    // }

  }, {
    key: "getOptions",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", []);

              case 2:
                _context3.prev = 2;

                inputValue = inputValue.trimStart();
                _context3.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context3.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context3.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context3.next = 14;
                break;

              case 13:
                return _context3.abrupt("return", []);

              case 14:
                return _context3.abrupt("return", newArr);

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](2);

                console.log(_context3.t0);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref3.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          isLoading = _state.isLoading,
          options = _state.options,
          value = _state.value,
          isLoading_tags = _state.isLoading_tags,
          options_tags = _state.options_tags,
          value_tags = _state.value_tags;

      return _react2.default.createElement(
        "div",
        { className: "content-area addGamingExp-page" },
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: true,
            onRequestClose: function onRequestClose(event) {
              // Ignore react-modal esc-close handling
              if (event.type === 'keydown' && event.keyCode === 27 && _this3.state.shouldCloseOnOverlayClick_ === false) {
                return;
              } else {
                _this3.handleCloseModal();
              }
            },
            shouldCloseOnOverlayClick: this.state.shouldCloseOnOverlayClick_,
            className: "addGamingModal",
            overlayClassName: "Overlay"
          },
          "Add Gaming Experience:",
          _react2.default.createElement("i", { className: "fas fa-times", onClick: this.handleCloseModal }),
          _react2.default.createElement(
            "div",
            { className: "gName_txtBox" },
            _react2.default.createElement(
              "p",
              null,
              "Game Name ",
              _react2.default.createElement(
                "span",
                { style: { color: "red" } },
                "*"
              )
            ),
            _react2.default.createElement(_AsyncCreatable2.default, {
              cacheOptions: true,
              defaultOptions: true,
              loadOptions: this.getOptions,
              isClearable: true,
              onChange: this.handleChange2,
              value: value,
              className: "game_name_box",
              onCreateOption: this.handleCreate,
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
              }
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "status" },
            _react2.default.createElement(
              "p",
              null,
              "Status ",
              _react2.default.createElement(
                "span",
                { style: { color: "red" } },
                "*"
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Status,
              options: status_options,
              placeholder: "Set your status",
              className: "status_box"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "experience" },
            _react2.default.createElement(
              "p",
              null,
              "Experience:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              placeholder: "Select experience level",
              className: "experience_box"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "played" },
            _react2.default.createElement(
              "p",
              null,
              "Time Played:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Played,
              options: played_options,
              placeholder: "Select time played",
              className: "played_box",
              defaultValue: [{ label: 'Less than 1 year', value: 1 }]
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "ratings" },
            _react2.default.createElement(
              "p",
              null,
              "Ratings:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Ratings,
              options: rating_options,
              placeholder: "Select game ratings",
              className: "ratings_box"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "options_checkbox" },
            _react2.default.createElement(
              "p",
              null,
              "Show Link box and/or Comments box"
            ),
            _react2.default.createElement("input", { id: "link_ChkBox", type: "checkbox", defaultChecked: this.state.link_chkbox, onChange: this.toggleChange_link }),
            " Link",
            _react2.default.createElement("input", { id: "comments_ChkBox", type: "checkbox", defaultChecked: this.state.comments_chkbox, onChange: this.toggleChange_comments }),
            " Comments"
          ),
          _react2.default.createElement(
            "div",
            { className: "tag_txtBox" },
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(
                "span",
                { style: { color: "green" } },
                "T"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "dodgerblue" } },
                "a"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "red" } },
                "g"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "gold" } },
                "s"
              ),
              " (Keywords that identify ",
              _react2.default.createElement(
                "span",
                { style: { color: "green" } },
                "y"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "dodgerblue" } },
                "o"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "red" } },
                "u"
              ),
              _react2.default.createElement(
                "span",
                { style: { color: "gold" } },
                "r"
              ),
              " unique experience with this game. Max 250 chars)"
            ),
            _react2.default.createElement(_Creatable2.default, {
              onChange: this.handleChange3,
              options: options_tags,
              onCreateOption: this.handleCreate2,
              isClearable: true,
              isDisabled: isLoading_tags,
              isLoading: isLoading_tags,
              value: value_tags,
              className: "tag_name_box",
              isMulti: true,
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
              }
            })
          ),
          this.state.link_chkbox == false ? _react2.default.createElement("div", { className: "link_txtBox" }) : _react2.default.createElement(
            "div",
            { className: "link_txtBox" },
            _react2.default.createElement(
              "p",
              null,
              "Link"
            ),
            _react2.default.createElement("input", { type: "text", id: "link_box", className: "link_box", maxLength: "50", onChange: this.handleChange })
          ),
          this.state.comments_chkbox == false ? _react2.default.createElement("div", { className: "comments" }) : _react2.default.createElement(
            "div",
            { className: "comments" },
            _react2.default.createElement(
              "p",
              null,
              "Comments"
            ),
            _react2.default.createElement("textarea", { id: "comments_box", className: "comments_box", rows: 8, cols: 80, defaultValue: '', maxLength: "254", onChange: this.handleChange })
          ),
          this.state.show_info_box && _react2.default.createElement(
            "div",
            { className: "info_box" },
            this.state.show_game_name_info_box && _react2.default.createElement(
              "div",
              { className: "game_name_error" },
              "Error: Game Name can't be empty"
            ),
            this.state.show_status_info_box && _react2.default.createElement(
              "div",
              { className: "status_name_error" },
              "Error: Status can't be empty"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "save-btn" },
            _react2.default.createElement(
              "button",
              { className: "save", onClick: this.submitForm },
              "Save"
            )
          )
        )
      );
    }
  }]);
  return AddGamingExp;
}(_react.Component);

exports.default = AddGamingExp;

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(344);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactDatepicker = __webpack_require__(513);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(664);

var _AsyncCreatable = __webpack_require__(64);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region_options = [{ value: 'North America', label: 'North America' }, { value: 'Europe', label: 'Europe' }, { value: 'Asia', label: 'Asia' }, { value: 'Russia', label: 'Russia' }, { value: 'South America', label: 'South America' }, { value: 'Oceania', label: 'Oceania' }, { value: 'Middle East', label: 'Middle East' }, { value: 'Africa', label: 'Africa' }, { value: 'Central America', label: 'Central America' }, { value: 'Earth', label: 'Earth' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var platform_options = [{ value: 'Any', label: 'Any' }, { value: 'PC', label: 'PC' }, { value: 'XB', label: 'XB' }, { value: 'PS', label: 'PS' }, { value: 'Nintendo', label: 'Nintendo' }, { value: 'Mobile', label: 'Mobile' }, { value: 'Analog', label: 'Analog' }];
var expiry_options = [{ value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }, { value: '1 month', label: '1 month' }];
var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }, { value: 4, label: 'Hidden' }];
var limit_options = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }, { value: 25, label: '25' }, { value: 30, label: '30' }, { value: 40, label: '40' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 42, label: 'Unlimited' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var AddScheduleGames = function (_Component) {
  (0, _inherits3.default)(AddScheduleGames, _Component);

  function AddScheduleGames() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, AddScheduleGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddScheduleGames.__proto__ || Object.getPrototypeOf(AddScheduleGames)).call(this));

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.state.game_name_box == "")) {
                _context.next = 4;
                break;
              }

              _this.setState({ show_info_box: true });
              _this.setState({ show_game_name_error: true });
              return _context.abrupt("return");

            case 4:
              if (!_this.state.startDate.isSameOrAfter(_this.state.endDate)) {
                _context.next = 8;
                break;
              }

              _this.setState({ show_info_box: true });
              _this.setState({ show_date_error: true });
              return _context.abrupt("return");

            case 8:
              _this.submitData();
              _this.setState({ refresh_addscheduleGames: true });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));
    _this.submitForm_moveaway = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.game_name_box.label == "")) {
                _context2.next = 4;
                break;
              }

              _this.setState({ show_info_box: true });
              _this.setState({ show_game_name_error: true });
              return _context2.abrupt("return");

            case 4:
              if (!_this.state.startDate.isSameOrAfter(_this.state.endDate)) {
                _context2.next = 8;
                break;
              }

              _this.setState({ show_info_box: true });
              _this.setState({ show_date_error: true });
              return _context2.abrupt("return");

            case 8:
              _this.submitData();
              _this.setState({ redirect_scheduleGames: true });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    _this.handleChange_Region = function (selected_region) {
      _this.setState({ selected_region: selected_region });
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({ selected_experience: selected_experience });
    };

    _this.handleChange_Platform = function (selected_platform) {
      _this.setState({ selected_platform: selected_platform });
    };

    _this.handleChange_Expiry = function (selected_expiry) {
      _this.setState({ selected_expiry: selected_expiry });
    };

    _this.handleChange_Visibility = function (selected_visibility) {
      _this.setState({ selected_visibility: selected_visibility });
    };

    _this.handleChange_Limit = function (selected_limit) {
      _this.setState({ selected_limit: selected_limit });
    };

    _this.handleChange_forStartdate = function (date) {
      _this.setState({ startDate: date });
    };

    _this.handleChange_forEnddate = function (date) {
      _this.setState({ endDate: date });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
    };

    _this.onFocus_game_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_game_info_box: true });
    };

    _this.onBlur_game_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_game_info_box: false });
    };

    _this.onFocus_date_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_date_info_box: true });
    };

    _this.onBlur_date_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_date_info_box: false });
    };

    _this.onFocus_region_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_region_info_box: true });
    };

    _this.onBlur_region_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_region_info_box: false });
    };

    _this.onFocus_experience_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_experience_info_box: true });
    };

    _this.onBlur_experience_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_experience_info_box: false });
    };

    _this.onFocus_platform_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_platform_info_box: true });
    };

    _this.onBlur_platform_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_platform_info_box: false });
    };

    _this.onFocus_description_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_description_info_box: true });
    };

    _this.onBlur_description_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_description_info_box: false });
    };

    _this.onFocus_other_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_other_info_box: true });
    };

    _this.onBlur_other_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_other_info_box: false });
    };

    _this.onFocus_expiry_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_expiry_info_box: true });
    };

    _this.onBlur_expiry_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_expiry_info_box: false });
    };

    _this.onFocus_visibility_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_visibility_info_box: true });
    };

    _this.onBlur_visibility_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_visibility_info_box: false });
    };

    _this.onFocus_limit_name = function () {
      _this.setState({ show_game_name_error: false });
      _this.setState({ show_date_error: false });
      _this.setState({ show_info_box: true });
      _this.setState({ show_limit_info_box: true });
    };

    _this.onBlur_limit_name = function () {
      _this.setState({ show_info_box: false });
      _this.setState({ show_limit_info_box: false });
    };

    _this.handleCreate_game_name = function (inputValue) {
      setTimeout(function () {
        var newOption = createOption(inputValue, null);
        _this.setState({ game_name_box: newOption });
      }, 300);
    };

    _this.handleChange_for_gameName = function (entered_name) {
      _this.setState({ game_name_box: entered_name });
    };

    _this.handleChange_txtArea = function (e) {
      _this.setState({ txtAreaValue: e.target.value });
    };

    _this.state = {
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      selected_expiry: null,
      selected_visibility: [{ label: "Public", value: 1 }],
      selected_limit: [{ label: "Unlimited", value: 42 }],
      startDate: (0, _moment2.default)(),
      endDate: (0, _moment2.default)(),
      game_name_box: "",
      description_box: "",
      other_box: "",
      tmp_expiry: "2 days",
      show_info_box: false,
      show_game_info_box: false,
      show_date_info_box: false,
      show_region_info_box: false,
      show_experience_info_box: false,
      show_platform_info_box: false,
      show_description_info_box: false,
      show_other_info_box: false,
      show_expiry_info_box: false,
      redirect_scheduleGames: false,
      refresh_addscheduleGames: false,
      show_game_name_error: false,
      show_date_error: false,
      show_visibility_info_box: false,
      show_limit_info_box: false,
      txtAreaValue: ""
    };
    return _this;
  }

  (0, _createClass3.default)(AddScheduleGames, [{
    key: "submitData",
    value: function submitData() {
      try {
        var myRegion = "";
        var myExperience = "";
        var myPlatform = "";
        var myVisibility = "";
        var myLimit = "";

        if (this.state.selected_region !== null && this.state.selected_region.length !== 0) {
          for (var i = 0; i < this.state.selected_region.length; i++) {
            myRegion += this.state.selected_region[i].value + "; ";
          }
          myRegion = myRegion.trim().replace(/; /g, ",").trim();
          myRegion = myRegion.replace(/;/g, "");
          myRegion = myRegion.replace(/,/g, ", ");
        }

        if (this.state.selected_experience !== null && this.state.selected_experience.length !== 0) {
          for (var i = 0; i < this.state.selected_experience.length; i++) {
            myExperience += this.state.selected_experience[i].value + "; ";
          }
          myExperience = myExperience.trim().replace(/; /g, ",").trim();
          myExperience = myExperience.replace(/;/g, "");
          myExperience = myExperience.replace(/,/g, ", ");
        }
        if (this.state.selected_platform !== null && this.state.selected_platform.length !== 0) {
          for (var i = 0; i < this.state.selected_platform.length; i++) {
            myPlatform += this.state.selected_platform[i].value + "; ";
          }
          myPlatform = myPlatform.trim().replace(/; /g, ",").trim();
          myPlatform = myPlatform.replace(/;/g, "");
          myPlatform = myPlatform.replace(/,/g, ", ");
        }
        if (this.state.selected_expiry != null || this.state.selected_expiry != undefined) {
          this.state.tmp_expiry = this.state.selected_expiry.value;
        }
        if (this.state.selected_visibility != null || this.state.selected_visibility != undefined) {
          myVisibility = this.state.selected_visibility.value;
        }
        if (this.state.selected_limit != null || this.state.selected_limit != undefined) {
          myLimit = this.state.selected_limit.value;
        }

        var now = (0, _moment2.default)();
        switch (this.state.tmp_expiry) {
          case '8 hours':
            now.add(8, 'hour');
            break;
          case '2 days':
            now.add(2, 'day');
            break;
          case '7 days':
            now.add(7, 'day');
            break;
          case '14 days':
            now.add(14, 'day');
            break;
          case '1 month':
            now.add(1, 'month');
            break;
          default:
            now.add(2, 'day');
        }
        var post = _axios2.default.post('/api/ScheduleGame', {
          game_name_box: this.state.game_name_box.label,
          user_id: this.props.initialData.userInfo.id,
          selected_region: myRegion,
          selected_experience: myExperience,
          start_date_time: this.state.startDate,
          end_date_time: this.state.endDate,
          selected_platform: myPlatform,
          description_box: this.state.description_box,
          other_box: this.state.other_box,
          selected_expiry: now,
          visibility: myVisibility,
          limit: myLimit,
          accept_msg: this.state.txtAreaValue.trim()
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "getOptions",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", []);

              case 2:
                _context3.prev = 2;

                inputValue = inputValue.trimStart();
                _context3.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context3.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context3.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context3.next = 14;
                break;

              case 13:
                return _context3.abrupt("return", []);

              case 14:
                return _context3.abrupt("return", newArr);

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](2);

                console.log(_context3.t0);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref3.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      if (this.state.redirect_scheduleGames === true) {
        window.location.href = '/scheduledGames';
      }
      if (this.state.refresh_addscheduleGames === true) {
        window.location.reload();
      }
      return _react2.default.createElement(
        "div",
        { className: "content-area addscheduleGames-page" },
        _react2.default.createElement(
          "div",
          { className: "content" },
          _react2.default.createElement(
            "h1",
            null,
            "Universal Matchmaking. Create a match and find players just like you!"
          ),
          _react2.default.createElement(
            "div",
            { className: "game-name" },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "label",
                null,
                "Game Name: ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              )
            ),
            _react2.default.createElement(_AsyncCreatable2.default, {
              cacheOptions: true,
              defaultOptions: true,
              loadOptions: this.getOptions,
              onChange: this.handleChange_for_gameName,
              onCreateOption: this.handleCreate_game_name,
              isClearable: true,
              value: this.state.game_name_box,
              onBlur: this.onBlur_game_name,
              onFocus: this.onFocus_game_name,
              className: "game_name_box",
              placeholder: "Enter Game name",
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
              }
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "date-time" },
            _react2.default.createElement(
              "div",
              { className: "date-time-label" },
              _react2.default.createElement(
                "label",
                null,
                "Date and Time: ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              )
            ),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.startDate,
              onChange: this.handleChange_forStartdate,
              showTimeSelect: true,
              timeFormat: "HH:mm",
              timeIntervals: 15,
              dateFormat: "lll",
              timeCaption: "time",
              className: "start-date-box",
              todayButton: "Today",
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name
            }),
            _react2.default.createElement(
              "p",
              null,
              "to"
            ),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.endDate,
              onChange: this.handleChange_forEnddate,
              showTimeSelect: true,
              timeFormat: "HH:mm",
              timeIntervals: 15,
              dateFormat: "lll",
              timeCaption: "time",
              className: "end-date-box",
              todayButton: "Today",
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "region" },
            _react2.default.createElement(
              "label",
              null,
              "Region:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Region,
              options: region_options,
              isMulti: true,
              placeholder: "Select your region/s",
              className: "region-box",
              onBlur: this.onBlur_region_name,
              onFocus: this.onFocus_region_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "experience" },
            _react2.default.createElement(
              "label",
              null,
              "Experience:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              isMulti: true,
              placeholder: "Select experience level/s",
              className: "experience-box",
              onBlur: this.onBlur_experience_name,
              onFocus: this.onFocus_experience_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "platform" },
            _react2.default.createElement(
              "label",
              null,
              "Platform:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Platform,
              options: platform_options,
              isMulti: true,
              placeholder: "Select which platform/s",
              className: "platform-box",
              onBlur: this.onBlur_platform_name,
              onFocus: this.onFocus_platform_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "description" },
            _react2.default.createElement(
              "label",
              null,
              "Description:"
            ),
            _react2.default.createElement("input", { type: "text", id: "description_box", className: "description-box", placeholder: "Any details for this game?", onBlur: this.onBlur_description_name, onFocus: this.onFocus_description_name, onChange: this.handleChange, value: this.state.post_description_box })
          ),
          _react2.default.createElement(
            "div",
            { className: "other" },
            _react2.default.createElement(
              "label",
              null,
              "Other Info:"
            ),
            _react2.default.createElement("input", { type: "text", id: "other_box", className: "other-box", placeholder: "Additional comments?", onBlur: this.onBlur_other_name, onFocus: this.onFocus_other_name, onChange: this.handleChange, value: this.state.other_box })
          ),
          _react2.default.createElement(
            "div",
            { className: "limit" },
            _react2.default.createElement(
              "label",
              null,
              "Limit:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Limit,
              options: limit_options,
              className: "limit-box",
              defaultValue: [limit_options[8]],
              isClearable: false,
              onBlur: this.onBlur_limit_name,
              onFocus: this.onFocus_limit_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "visibility" },
            _react2.default.createElement(
              "label",
              null,
              "Visibility:"
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Visibility,
              options: visibility_options,
              className: "visibility-box",
              defaultValue: [visibility_options[0]],
              isClearable: false,
              onBlur: this.onBlur_expiry_name,
              onFocus: this.onFocus_expiry_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "expiry" },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "label",
                null,
                "Post Expiry: ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Expiry,
              options: expiry_options,
              className: "expiry-box",
              defaultValue: [expiry_options[1]],
              isClearable: false,
              onBlur: this.onBlur_expiry_name,
              onFocus: this.onFocus_expiry_name
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "accept-msg" },
            _react2.default.createElement(
              "label",
              null,
              "Accept Message:"
            ),
            _react2.default.createElement("textarea", {
              className: "txtarea-accept",
              rows: 8,
              cols: 80,
              placeholder: "Msg that will be sent when they accept the schedule game",
              value: this.state.txtAreaValue,
              onChange: this.handleChange_txtArea,
              maxLength: "254"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "buttons" },
            _react2.default.createElement(
              "button",
              { className: "save", type: "button", onClick: this.submitForm_moveaway },
              "\xA0\xA0Save\xA0\xA0"
            ),
            "\xA0",
            _react2.default.createElement(
              "button",
              { className: "save-create", type: "button", onClick: this.submitForm },
              "Save & Create Another"
            )
          ),
          this.state.show_info_box && _react2.default.createElement(
            "div",
            { className: "info_box" },
            this.state.show_game_info_box && _react2.default.createElement(
              "div",
              { className: "game_info" },
              "What game did you wanna play? eg. Dota, LOL, Fortnite..."
            ),
            this.state.show_date_info_box && _react2.default.createElement(
              "div",
              { className: "date_info" },
              "From when to when are you around?"
            ),
            this.state.show_region_info_box && _react2.default.createElement(
              "div",
              { className: "region_info" },
              "Select which region/s you wanna play, chose Earth or leave blank if it does not matter."
            ),
            this.state.show_experience_info_box && _react2.default.createElement(
              "div",
              { className: "experience_info" },
              "What calibre of skill were you after? Leave blank for any."
            ),
            this.state.show_platform_info_box && _react2.default.createElement(
              "div",
              { className: "platform_info" },
              "Any or leave blank to include all."
            ),
            this.state.show_description_info_box && _react2.default.createElement(
              "div",
              { className: "description_info" },
              "Any special description for this game. ie 5v5, LF Tank...etc"
            ),
            this.state.show_other_info_box && _react2.default.createElement(
              "div",
              { className: "other_info" },
              "Extra field for any other info"
            ),
            this.state.show_expiry_info_box && _react2.default.createElement(
              "div",
              { className: "expiry_info" },
              "All good things must come to an end, all posts have an expiry date. Longest a post can live is 1 month. Once a post expires, it will be deleted."
            ),
            this.state.show_visibility_info_box && _react2.default.createElement(
              "div",
              { className: "visibility_info" },
              "Now you see me, now you don't....the decision is yours to make. Hidden is only viewable to you."
            ),
            this.state.show_limit_info_box && _react2.default.createElement(
              "div",
              { className: "limit_info" },
              "How many attendees?"
            ),
            this.state.show_game_name_error && _react2.default.createElement(
              "div",
              { className: "game_name_error" },
              "Opps! Unable to save this as Game Name is empty. All fields with a Red asterix needs to be filled in."
            ),
            this.state.show_date_error && _react2.default.createElement(
              "div",
              { className: "date_error" },
              "Opps! Unable to save this as End date is before Start Date."
            )
          ) //info_box

        )
      );
    }
  }]);
  return AddScheduleGames;
}(_react.Component);

exports.default = AddScheduleGames;

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _Async = __webpack_require__(347);

var _Async2 = _interopRequireDefault(_Async);

var _Creatable = __webpack_require__(52);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AdvancedSearchPost = __webpack_require__(415);

var _AdvancedSearchPost2 = _interopRequireDefault(_AdvancedSearchPost);

var _reactCountryRegionSelector = __webpack_require__(306);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var table_options = [{ value: 'Gaming Experience', label: 'Gaming Experience' }, { value: 'Esports Experience', label: 'Esports Experience' }];
var status_options = [{ value: 'Actively Gaming', label: 'Actively Gaming' }, { value: 'Sometimes...', label: 'Sometimes...' }, { value: 'Moved On', label: 'Moved On' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var played_options = [{ value: 1, label: 'Less than 1 year' }, { value: 2, label: 'Less than 2 years' }, { value: 3, label: 'Less than 3 years' }, { value: 4, label: 'Less than 4 years' }, { value: 5, label: 'Less than 5 years' }, { value: 42, label: '5+ years' }];
var commendation_options = [{ value: 'Apprentice', label: 'Apprentice' }, { value: 'Elite', label: 'Elite' }, { value: 'Expert', label: 'Expert' }, { value: 'Hero', label: 'Hero' }, { value: 'Master', label: 'Master' }, { value: 'Grand Master', label: 'Grand Master' }];
var rating_options = [{ value: 1, label: '1 star' }, { value: 2, label: '2 stars' }, { value: 3, label: '3 stars' }, { value: 4, label: '4 stars' }, { value: 5, label: '5 stars' }];

var e_played_options = [{ value: 1, label: 'Less than 3 months' }, { value: 2, label: 'Less than 6 months' }, { value: 3, label: 'Less than 1 year' }, { value: 4, label: 'Less than 2 years' }, { value: 5, label: 'Less than 3 years' }, { value: 42, label: '3+ years' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var AdvancedSearch = function (_Component) {
  (0, _inherits3.default)(AdvancedSearch, _Component);

  function AdvancedSearch() {
    (0, _classCallCheck3.default)(this, AdvancedSearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AdvancedSearch.__proto__ || Object.getPrototypeOf(AdvancedSearch)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.handleChange_GameName = function (value) {
      _this.setState({
        value: value
      }, function () {
        _this.pullData();
      });
      _this.onBlur_game_name(value);
    };

    _this.handleChange3 = function (value_tags) {
      _this.setState({
        value_tags: value_tags
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_table = function (selected_table) {
      _this.setState({
        selected_table: selected_table,
        value_tags: ""
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({
        selected_experience: selected_experience
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Status = function (status_box) {
      _this.setState({
        status_box: status_box
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Played = function (played_box) {
      _this.setState({
        played_box: played_box
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Ratings = function (ratings_box) {
      _this.setState({
        ratings_box: ratings_box
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Commendation = function (commendation_box) {
      _this.setState({
        commendation_box: commendation_box
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_e_status = function (eStatus_box) {
      _this.setState({
        eStatus_box: eStatus_box
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_role_title = function (e) {
      _this.setState({
        role_title_box: e.target.value
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_team_name = function (e) {
      _this.setState({
        team_name_box: e.target.value
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Time_role = function (time_role_box) {
      _this.setState({
        time_role_box: time_role_box
      }, function () {
        _this.pullData();
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allGameExperiences != undefined) {
        return _this.state.allGameExperiences.map(function (item, index) {
          var table = true;
          if (_this.state.selected_table.value != "Gaming Experience") {
            table = false;
          }
          return _react2.default.createElement(_AdvancedSearchPost2.default, { game_experience: item, key: index, table: table, user: _this.props.initialData });
        });
      }
    };

    _this.handleCreate2 = function (inputValue) {
      setTimeout(function () {
        var _this$state = _this.state,
            options_tags = _this$state.options_tags,
            value_tags = _this$state.value_tags,
            newValueCreated_tags = _this$state.newValueCreated_tags;

        var newOption = createOption(inputValue, null);
        _this.setState({ options_tags: [].concat((0, _toConsumableArray3.default)(options_tags), [newOption]) });
        _this.setState({ value_tags: [].concat((0, _toConsumableArray3.default)(value_tags), [newOption]) });
        _this.setState({ newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label]) });
        _this.pullData();
      }, 300);
    };

    _this.onBlur_game_name = function (value) {
      var self = _this;

      var getInitialData = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  self.setState({ options_tags: "" });
                  self.setState({ value_tags: "" });

                  if (!(value != null)) {
                    _context.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context.next = 10;
                    break;
                  }

                  _context.next = 7;
                  return _axios2.default.get("/api/Tags/" + value.game_names_id);

                case 7:
                  allTags = _context.sent;
                  _context.next = 11;
                  break;

                case 10:
                  return _context.abrupt("return");

                case 11:
                  _context.next = 14;
                  break;

                case 13:
                  return _context.abrupt("return");

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = "";
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context.next = 20;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 17]]);
        }));

        return function getInitialData() {
          return _ref.apply(this, arguments);
        };
      }();
      getInitialData();
    };

    _this.state = {
      selected_table: "",
      selected_experience: null,
      selected_platform: null,
      role_title_box: "",
      team_name_box: "",
      other_box: "",
      when: null,
      tmp_time: "",
      value: "",
      status_box: "",
      played_box: "",
      ratings_box: "",
      commendation_box: "",
      options_tags: "",
      value_tags: [],
      newValueCreated_tags: [],
      country_: "",
      time_role_box: ""
    };
    return _this;
  }

  (0, _createClass3.default)(AdvancedSearch, [{
    key: "componentWillMount",
    value: function componentWillMount() {

      var self = this;

      var myGame_name_box = "1981`^";
      var myStatus = "1981`^";
      var myExperience = "1981`^";
      var myPlayed = "1981`^";
      var myRatings = "1981`^";
      var myCommendation = "1981`^";
      var myTags = "1981`^";
      var myCountry = "1981`^";

      var match = this.props.routeProps.match;


      this.state.selected_table = { label: "Gaming Experience", value: "Gaming Experience" };

      if (match.params.id != undefined && match.params.id != "") {
        this.handleCreate2(match.params.id);
        if (match.params.table == "Esports Experience") {
          this.state.selected_table = { label: "Esports Experience", value: "Esports Experience" };
        }
      }

      var getInitialData = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var allGameExperiences;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get("/api/GameExperiences/filtered/" + myGame_name_box + "/" + myStatus + "/" + myExperience + "/" + myPlayed + "/" + myRatings + "/" + myCommendation + "/" + myTags + "/" + myCountry);

                case 3:
                  allGameExperiences = _context2.sent;

                  self.setState({
                    allGameExperiences: allGameExperiences.data.latestGameExperiences[0]
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getInitialData() {
          return _ref2.apply(this, arguments);
        };
      }();
      getInitialData();
    }
  }, {
    key: "selectCountry",
    value: function selectCountry(val) {
      var _this2 = this;

      this.setState({
        country_: val
      }, function () {
        _this2.pullData();
      });
    }
  }, {
    key: "pullData",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var myTable, myGame_name_box, myStatus, myExperience, myPlayed, myRatings, myTags, myCommendation, myCountry, myRole_title, myTeam_name, myTime_role, i, allGameExperiences, alleSportsExperiences;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                myTable = "";
                myGame_name_box = "1981`^";
                myStatus = "1981`^";
                myExperience = "1981`^";
                myPlayed = "1981`^";
                myRatings = "1981`^";
                myTags = "1981`^";
                myCommendation = "1981`^";
                myCountry = "1981`^";
                myRole_title = "1981`^";
                myTeam_name = "1981`^";
                myTime_role = "1981`^";


                if (this.state.selected_table != "" && this.state.selected_table != undefined && this.state.selected_table.length != 0) {
                  myTable = this.state.selected_table.label;
                }

                if (this.state.selected_experience != null && this.state.selected_experience != undefined && this.state.selected_experience.length != 0) {
                  myExperience = this.state.selected_experience.label;
                }

                if (this.state.value != null && this.state.value != "" && this.state.value.length != 0) {
                  myGame_name_box = this.state.value.label.trim();
                }

                if (this.state.status_box != "" && this.state.status_box != null && this.state.status_box.length != 0) {
                  myStatus = this.state.status_box.label;
                }

                if (this.state.played_box != "" && this.state.played_box != null && this.state.played_box.length != 0) {
                  myPlayed = this.state.played_box.value;
                }

                if (this.state.ratings_box != "" && this.state.ratings_box != null && this.state.ratings_box.length != 0) {
                  myRatings = this.state.ratings_box.value;
                }

                if (this.state.commendation_box != "" && this.state.commendation_box != null && this.state.commendation_box.length != 0) {
                  myCommendation = this.state.commendation_box.value;
                }

                if (this.state.country_ != "" && this.state.country_ != null && this.state.country_.length != 0) {
                  myCountry = this.state.country_;
                }

                if (this.state.value_tags !== null && this.state.value_tags.length !== 0) {
                  for (i = 0; i < this.state.value_tags.length; i++) {
                    myTags += this.state.value_tags[i].label + "; ";
                  }
                  myTags = myTags.trim().replace(/; /g, ",").trim();
                  myTags = myTags.replace(/;/g, "");
                  myTags = myTags.replace(/,/g, ", ");
                }

                if (this.state.role_title_box != "" && this.state.role_title_box != undefined) {
                  myRole_title = this.state.role_title_box;
                }

                if (this.state.team_name_box != "" && this.state.team_name_box != undefined) {
                  myTeam_name = this.state.team_name_box;
                }

                if (this.state.time_role_box != "" && this.state.time_role_box != null && this.state.time_role_box.length != 0) {
                  myTime_role = this.state.time_role_box.value;
                }

                if (!(myTable == "Gaming Experience")) {
                  _context3.next = 37;
                  break;
                }

                _context3.prev = 25;
                _context3.next = 28;
                return _axios2.default.get("/api/GameExperiences/filtered/" + myGame_name_box + "/" + myStatus + "/" + myExperience + "/" + myPlayed + "/" + myRatings + "/" + myCommendation + "/" + myTags + "/" + myCountry);

              case 28:
                allGameExperiences = _context3.sent;


                this.setState({
                  allGameExperiences: allGameExperiences.data.latestGameExperiences[0]
                });
                _context3.next = 35;
                break;

              case 32:
                _context3.prev = 32;
                _context3.t0 = _context3["catch"](25);

                console.log(_context3.t0);

              case 35:
                _context3.next = 42;
                break;

              case 37:
                if (!(myTable == "Esports Experience")) {
                  _context3.next = 42;
                  break;
                }

                _context3.next = 40;
                return _axios2.default.get("/api/esports_experiences/filtered/" + myGame_name_box + "/" + myRole_title + "/" + myTeam_name + "/" + myTime_role + "/" + myTags + "/" + myCountry);

              case 40:
                alleSportsExperiences = _context3.sent;


                this.setState({
                  allGameExperiences: alleSportsExperiences.data.latestGameExperiences[0]
                });

              case 42:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[25, 32]]);
      }));

      function pullData() {
        return _ref3.apply(this, arguments);
      }

      return pullData;
    }()
  }, {
    key: "getOptions",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", []);

              case 2:
                _context4.prev = 2;

                inputValue = inputValue.trimStart();
                _context4.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context4.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context4.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context4.next = 14;
                break;

              case 13:
                return _context4.abrupt("return", []);

              case 14:
                return _context4.abrupt("return", newArr);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);

                console.log(_context4.t0);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref4.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.allGameExperiences !== undefined) {
        var show_gaming_exp = true;

        if (this.state.selected_table.label == "Esports Experience") {
          show_gaming_exp = false;
        }
        return _react2.default.createElement(
          "section",
          { id: "posts" },
          _react2.default.createElement(
            "div",
            { className: "content-area advancedSearch-page" },
            _react2.default.createElement(
              "div",
              { className: "filterMenu" },
              _react2.default.createElement(
                "div",
                { className: "table-name" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_table,
                  options: table_options,
                  placeholder: "Select which table",
                  name: "table-box",
                  defaultValue: this.state.selected_table
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "game-name" },
                _react2.default.createElement(_Async2.default, {
                  cacheOptions: true,
                  defaultOptions: true,
                  loadOptions: this.getOptions,
                  isClearable: true,
                  onChange: this.handleChange_GameName,
                  value: this.state.value,
                  className: "game-name-box",
                  placeholder: "Game name",
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                  }
                })
              ),
              show_gaming_exp && _react2.default.createElement(
                "div",
                { className: "gaming-experience" },
                _react2.default.createElement(
                  "div",
                  { className: "status" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Status,
                    options: status_options,
                    placeholder: "Select status",
                    name: "status-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "experience" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Experience,
                    options: experience_options,
                    placeholder: "Select experience level",
                    name: "experience-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "played" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Played,
                    options: played_options,
                    placeholder: "Select time played",
                    className: "played-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "ratings" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Ratings,
                    options: rating_options,
                    placeholder: "Select game ratings",
                    className: "ratings-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "commendation" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Commendation,
                    options: commendation_options,
                    placeholder: "Select commendation",
                    className: "commendation-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "tag_txtBox" },
                  _react2.default.createElement(_Creatable2.default, {
                    onChange: this.handleChange3,
                    options: this.state.options_tags,
                    onCreateOption: this.handleCreate2,
                    isClearable: true,
                    value: this.state.value_tags,
                    className: "tag-name-box",
                    placeholder: "Tags",
                    isMulti: true,
                    defaultValue: this.state.value_tags,
                    onInputChange: function onInputChange(inputValue) {
                      return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                    }
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "location" },
                  _react2.default.createElement(_reactCountryRegionSelector.CountryDropdown, {
                    value: this.state.country_,
                    onChange: function onChange(val) {
                      return _this3.selectCountry(val);
                    },
                    valueType: "full",
                    style: {
                      fontSize: 15.2, width: "88%"
                    }
                  })
                )
              ),
              !show_gaming_exp && _react2.default.createElement(
                "div",
                { className: "esports-experience" },
                _react2.default.createElement(
                  "div",
                  { className: "role-title" },
                  _react2.default.createElement("input", { type: "text", className: "role-title-box", onChange: this.handleChange_role_title, value: this.state.role_title_box, placeholder: "Role Title" })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "team-name" },
                  _react2.default.createElement("input", { type: "text", className: "team-name-box", onChange: this.handleChange_team_name, value: this.state.team_name_box, placeholder: "Team Name" })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "e-played" },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_Time_role,
                    options: e_played_options,
                    placeholder: "Time in Role",
                    className: "e-played-box",
                    isClearable: true
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "skill-txtBox" },
                  _react2.default.createElement(_Creatable2.default, {
                    onChange: this.handleChange3,
                    options: this.state.options_tags,
                    onCreateOption: this.handleCreate2,
                    isClearable: true,
                    value: this.state.value_tags,
                    className: "skill-name-box",
                    placeholder: "Skills",
                    isMulti: true,
                    onInputChange: function onInputChange(inputValue) {
                      return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                    }
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "location" },
                  _react2.default.createElement(_reactCountryRegionSelector.CountryDropdown, {
                    value: this.state.country_,
                    onChange: function onChange(val) {
                      return _this3.selectCountry(val);
                    },
                    valueType: "full",
                    style: {
                      fontSize: 15.2, width: "88%"
                    }
                  })
                )
              )
            ),
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area scheduleGames-page" },
          "Loading"
        );
      }
    }
  }]);
  return AdvancedSearch;
}(_react.Component);

exports.default = AdvancedSearch;

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactCountryRegionSelector = __webpack_require__(306);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var Dossier = function (_Component) {
  (0, _inherits3.default)(Dossier, _Component);

  function Dossier() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Dossier);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dossier.__proto__ || Object.getPrototypeOf(Dossier)).call(this));

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: true });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var name_trigger, post;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.first_name_box == "" || _this.state.first_name_box == undefined) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_first_name_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_first_name_info_box: false });
              }
              if (_this.state.last_name_box == "" || _this.state.last_name_box == undefined) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_last_name_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_last_name_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 6;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt("return");

            case 6:
              _context.prev = 6;
              _context.next = 9;
              return _axios2.default.post('/api/user', {
                first_name_box: _this.state.first_name_box,
                last_name_box: _this.state.last_name_box,
                slogan: _this.state.slogan_box,
                bio: _this.state.bio_box,
                country: _this.state.country_,
                region: _this.state.region_,
                contact_info: _this.state.contact_info_box
              });

            case 9:
              post = _context.sent;

              _this.handleCloseModal();
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);

              console.log(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[6, 13]]);
    }));

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_first_name_info_box: false,
      show_last_name_info_box: false,
      name_trigger: false,
      intial_trigger: true,
      first_name_box: "",
      last_name_box: "",
      country_: "",
      region_: "",
      slogan_box: "",
      bio_box: "",
      contact_info_box: ""
    };
    return _this;
  }

  (0, _createClass3.default)(Dossier, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var match = this.props.routeProps.match;

      var self = this;

      var getUser = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var userProfile;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get("/api/user/" + match.params.id);

                case 3:
                  userProfile = _context2.sent;

                  self.setState({
                    userProfile: userProfile.data.user[0]

                  }, function () {
                    console.log();
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getUser() {
          return _ref2.apply(this, arguments);
        };
      }();
      getUser();
    }
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }
  }, {
    key: "selectCountry",
    value: function selectCountry(val) {
      this.setState({ country_: val });
      this.setState({ shouldCloseOnOverlayClick_: false });
    }
  }, {
    key: "selectRegion",
    value: function selectRegion(val) {
      this.setState({ region_: val });
      this.setState({ shouldCloseOnOverlayClick_: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.userProfile !== undefined) {
        var _state = this.state,
            country_ = _state.country_,
            region_ = _state.region_;
        var _state$userProfile = this.state.userProfile,
            first_name = _state$userProfile.first_name,
            last_name = _state$userProfile.last_name,
            country = _state$userProfile.country,
            region = _state$userProfile.region,
            profile_img = _state$userProfile.profile_img,
            profile_bg = _state$userProfile.profile_bg,
            slogan = _state$userProfile.slogan,
            bio = _state$userProfile.bio,
            contact_info = _state$userProfile.contact_info;

        if (this.state.intial_trigger) {
          this.setState({ first_name_box: first_name });
          this.setState({ last_name_box: last_name });
          this.setState({ country_: country });
          this.setState({ region_: region });
          this.setState({ slogan_box: slogan });
          this.setState({ bio_box: bio });
          this.setState({ intial_trigger: false });
        }
        return _react2.default.createElement(
          "div",
          { className: "content-area dossier-page" },
          _react2.default.createElement(
            _reactModal2.default,
            {
              isOpen: true,
              onRequestClose: function onRequestClose(event) {
                // Ignore react-modal esc-close handling
                if (event.type === 'keydown' && event.keyCode === 27 && _this3.state.shouldCloseOnOverlayClick_ === false) {
                  return;
                } else {
                  _this3.handleCloseModal();
                }
              },
              shouldCloseOnOverlayClick: this.state.shouldCloseOnOverlayClick_,
              className: "Modal",
              overlayClassName: "Overlay"
            },
            "Edit intro:",
            _react2.default.createElement("i", { className: "fas fa-times", onClick: this.handleCloseModal }),
            _react2.default.createElement(
              "div",
              { className: "fName_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                "First Name ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement("input", { type: "text", id: "first_name_box", className: "first_name_box", maxLength: "50", defaultValue: "" + first_name, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "lName_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                "Last Name ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement("input", { type: "text", id: "last_name_box", className: "last_name_box", maxLength: "50", defaultValue: "" + last_name, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "location" },
              _react2.default.createElement(
                "p",
                null,
                "Location ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_reactCountryRegionSelector.CountryDropdown, {
                value: country_,
                defaultOptionLabel: country,
                onChange: function onChange(val) {
                  return _this3.selectCountry(val);
                },
                valueType: "full",
                style: {
                  fontSize: 15.2
                }
              }),
              "\xA0",
              _react2.default.createElement(_reactCountryRegionSelector.RegionDropdown, {
                country: country_,
                value: region_,
                blankOptionLabel: region,
                onChange: function onChange(val) {
                  return _this3.selectRegion(val);
                },
                style: {
                  fontSize: 15.2
                }
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "contact-info" },
              _react2.default.createElement(
                "p",
                null,
                "Contact Info (visible to friends ONLY)"
              ),
              _react2.default.createElement("textarea", { id: "contact_info_box", className: "contact_info_box", rows: 8, cols: 80, maxLength: "254", defaultValue: "" + contact_info, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "slogan" },
              _react2.default.createElement(
                "p",
                null,
                "Slogan"
              ),
              _react2.default.createElement("input", { type: "text", id: "slogan_box", className: "slogan_box", maxLength: "120", defaultValue: "" + slogan, onBlur: this.onBlur_slogan_box, onFocus: this.onFocus_slogan_box, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              { className: "bio" },
              _react2.default.createElement(
                "p",
                null,
                "Brief Bio"
              ),
              _react2.default.createElement("textarea", { id: "bio_box", className: "bio_box", rows: 8, cols: 80, maxLength: "254", defaultValue: "" + bio, onChange: this.handleChange })
            ),
            _react2.default.createElement(
              "div",
              null,
              " "
            ),
            _react2.default.createElement(
              "div",
              { className: "save-btn" },
              _react2.default.createElement(
                "button",
                { className: "save", onClick: this.submitForm },
                "Save"
              )
            ),
            this.state.show_info_box && _react2.default.createElement(
              "div",
              { className: "info_box" },
              this.state.show_first_name_info_box && _react2.default.createElement(
                "div",
                { className: "first_name_error" },
                "Error: First Name can't be blank"
              ),
              this.state.show_last_name_info_box && _react2.default.createElement(
                "div",
                { className: "last_name_error" },
                "Error: Last Name can't be blank"
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area dossier-page" },
          "Loading"
        );
      }
    }
  }]);
  return Dossier;
}(_react.Component);

exports.default = Dossier;

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(52);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(64);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var email_options = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];

var played_options = [{ value: 1, label: 'Less than 3 months' }, { value: 2, label: 'Less than 6 months' }, { value: 3, label: 'Less than 1 year' }, { value: 4, label: 'Less than 2 years' }, { value: 5, label: 'Less than 3 years' }, { value: 42, label: '3+ years' }];

var status_options = [{ value: 'Actively looking for a team', label: 'Actively looking for a team' }, { value: 'Maybe looking for a team', label: 'Maybe looking for a team' }, { value: 'Do not disturb please!', label: 'Do not disturb please!' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var createOptionDifValue = function createOptionDifValue(value, label) {
  return {
    value: value, label: label
  };
};

var EditEsportsExp = function (_Component) {
  (0, _inherits3.default)(EditEsportsExp, _Component);

  function EditEsportsExp() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, EditEsportsExp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditEsportsExp.__proto__ || Object.getPrototypeOf(EditEsportsExp)).call(this));

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_email = function (email_box) {
      _this.setState({ email_box: email_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Status = function (status_box) {
      _this.setState({ status_box: status_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Played = function (played_box) {
      _this.setState({ played_box: played_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Ratings = function (ratings_box) {
      _this.setState({ ratings_box: ratings_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_comments = function () {
      _this.setState({
        comments_chkbox: !_this.state.comments_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_link = function () {
      _this.setState({
        link_chkbox: !_this.state.link_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_ardour = function (value_ardour) {
      self.setState({ value_ardour: value_ardour });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_game_name = function (value_game_name) {
      _this.setState({ value_game_name: value_game_name });
      _this.onBlur_game_name(value_game_name);
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange3 = function (value_tags) {
      _this.setState({ value_tags: value_tags });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var match, myesportsexp;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              match = _this.props.routeProps.match;
              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get("/api/esports_experiences/delete/" + match.params.esportsExp_id);

            case 4:
              myesportsexp = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);

              console.log(_context.t0);

            case 10:
              _this.handleCloseModal();

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 7]]);
    }));
    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var myardour, myPlayed, myTags, _OGstatus, _OGstatus_exp, uShallNotPass, ardourNgame_name_same_same, newOption, name_trigger, i, j, post, newGame_name, newGameID, _post, tmpnewGameID, _post2, post_bio, _post_bio, match, update_exp;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              myardour = "";
              myPlayed = "";
              myTags = "";
              _OGstatus = true;
              _OGstatus_exp = true;
              uShallNotPass = false;
              ardourNgame_name_same_same = false;


              if (_this.state.value_game_name == null || _this.state.value_game_name == "") {
                newOption = createOption("");

                _this.state.value_game_name = newOption;
                _this.state.value_game_name.game_names_id = null;
              }

              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.status_box.label == "" || _this.state.status_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_status_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (_this.state.email_box.label == "" || _this.state.email_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_email_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_email_info_box: false });
              }

              if (!name_trigger) {
                _context2.next = 14;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context2.abrupt("return");

            case 14:

              if (_this.state.played_box.label != "" && _this.state.played_box.label != undefined) {
                myPlayed = _this.state.played_box.value;
              }

              if (_this.state.team_name_box.trim() != "") {
                uShallNotPass = true;
              } else if (myPlayed != "") {
                uShallNotPass = true;
              } else if (_this.state.achievements_box.trim() != "") {
                uShallNotPass = true;
              } else if (myTags != "") {
                uShallNotPass = true;
              } else if (_this.state.role_title_box != "") {
                uShallNotPass = true;
              } else if (_this.state.value_game_name.length != 0) {
                uShallNotPass = true;
              }

              if ((_this.state.role_title_box == "" || _this.state.role_title_box == null) && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else if (_this.state.value_game_name.label == "" && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (!name_trigger) {
                _context2.next = 20;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context2.abrupt("return");

            case 20:

              if (_this.state.value_ardour !== null && _this.state.value_ardour.length !== 0) {
                for (i = 0; i < _this.state.value_ardour.length; i++) {
                  myardour += _this.state.value_ardour[i].label + "; ";
                }
                myardour = myardour.trim().replace(/; /g, ",").trim();
                myardour = myardour.replace(/;/g, "");
                myardour = myardour.replace(/,/g, ", ");
              }

              //If you created a new game and you have selected it then and only then will we save this to the DB

              if (!(_this.state.newValueCreated_ardour != "")) {
                _context2.next = 44;
                break;
              }

              i = 0;

            case 23:
              if (!(i < _this.state.newValueCreated_ardour.length)) {
                _context2.next = 44;
                break;
              }

              j = 0;

            case 25:
              if (!(j < _this.state.value_ardour.length)) {
                _context2.next = 41;
                break;
              }

              if (!(_this.state.value_ardour[j].label == _this.state.newValueCreated_ardour[i])) {
                _context2.next = 38;
                break;
              }

              _context2.prev = 27;
              _context2.next = 30;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.newValueCreated_ardour[i]
              });

            case 30:
              post = _context2.sent;


              if (_this.state.newValueCreated_ardour[i] == _this.state.value_game_name.label) {
                ardourNgame_name_same_same = true;
                newGame_name = post.data.game_name;
                newGameID = post.data.id;
              }
              _context2.next = 37;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t0 = _context2["catch"](27);

              consoleg(_context2.t0);

            case 37:
              return _context2.abrupt("break", 41);

            case 38:
              j++;
              _context2.next = 25;
              break;

            case 41:
              i++;
              _context2.next = 23;
              break;

            case 44:

              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGame_name = "";
              newGameID = "";

              if (!(_this.state.newValueCreated_game_name != "" && ardourNgame_name_same_same == false)) {
                _context2.next = 65;
                break;
              }

              i = 0;

            case 48:
              if (!(i < _this.state.newValueCreated_game_name.length)) {
                _context2.next = 65;
                break;
              }

              if (!(_this.state.value_game_name.label == _this.state.newValueCreated_game_name[i])) {
                _context2.next = 62;
                break;
              }

              _context2.prev = 50;
              _context2.next = 53;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value_game_name.label
              });

            case 53:
              _post = _context2.sent;

              newGame_name = _post.data.game_name;
              newGameID = _post.data.id;
              _context2.next = 61;
              break;

            case 58:
              _context2.prev = 58;
              _context2.t1 = _context2["catch"](50);

              console.log(_context2.t1);

            case 61:
              return _context2.abrupt("break", 65);

            case 62:
              i++;
              _context2.next = 48;
              break;

            case 65:
              if (!(_this.state.newValueCreated_tags != "")) {
                _context2.next = 90;
                break;
              }

              tmpnewGameID = "";

              if (_this.state.value_game_name.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value_game_name.game_names_id;
              }
              i = 0;

            case 69:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context2.next = 90;
                break;
              }

              j = 0;

            case 71:
              if (!(j < _this.state.value_tags.length)) {
                _context2.next = 87;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context2.next = 84;
                break;
              }

              _context2.prev = 73;

              if (!(tmpnewGameID != "")) {
                _context2.next = 78;
                break;
              }

              _context2.next = 77;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 77:
              _post2 = _context2.sent;

            case 78:
              _context2.next = 83;
              break;

            case 80:
              _context2.prev = 80;
              _context2.t2 = _context2["catch"](73);

              console.log(_context2.t2);

            case 83:
              return _context2.abrupt("break", 87);

            case 84:
              j++;
              _context2.next = 71;
              break;

            case 87:
              i++;
              _context2.next = 69;
              break;

            case 90:

              if (_this.state.value_tags !== null && _this.state.value_tags.length !== 0) {
                for (i = 0; i < _this.state.value_tags.length; i++) {
                  myTags += _this.state.value_tags[i].label + "; ";
                }
                myTags = myTags.trim().replace(/; /g, ",").trim();
                myTags = myTags.replace(/;/g, "");
                myTags = myTags.replace(/,/g, ", ");
                _OGstatus_exp = false;
              }

              if (_this.state.status_box_OG != _this.state.status_box.label) {
                _OGstatus = false;
              } else if (_this.state.email_box_OG != _this.state.email_box.label) {
                _OGstatus = false;
              } else if (_this.state.career_highlights_box_OG != _this.state.career_highlights_box) {
                _OGstatus = false;
              } else if (_this.state.games_of_ardour_OG != myardour) {
                _OGstatus = false;
              }

              if (_this.state.role_title_box_OG != _this.state.role_title_box) {
                _OGstatus_exp = false;
              } else if (_this.state.value_game_name_OG != _this.state.value_game_name.label) {
                _OGstatus_exp = false;
              } else if (_this.state.team_name_box_OG != _this.state.team_name_box) {
                _OGstatus_exp = false;
              } else if (_this.state.played_box_OG.label != _this.state.played_box.label) {
                _OGstatus_exp = false;
              } else if (_this.state.achievements_box_OG != _this.state.achievements_box) {
                _OGstatus_exp = false;
              } else if (_this.state.value_tags_OG != myTags) {
                _OGstatus_exp = false;
              }

              _this.state.career_highlights_box == undefined ? undefined : _this.state.career_highlights_box = _this.state.career_highlights_box.trim();
              _this.state.achievements_box == undefined ? undefined : _this.state.achievements_box = _this.state.achievements_box.trim();
              _this.state.team_name_box == undefined ? undefined : _this.state.team_name_box = _this.state.team_name_box.trim();
              _this.state.role_title_box == undefined ? undefined : _this.state.role_title_box = _this.state.role_title_box.trim();

              if (!(_this.state.createEsportsPost == true)) {
                _context2.next = 109;
                break;
              }

              _context2.prev = 98;
              _context2.next = 101;
              return _axios2.default.post('/api/esports_bio/create', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == "Yes" ? "Yes" : "No",
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 101:
              post_bio = _context2.sent;
              _context2.next = 107;
              break;

            case 104:
              _context2.prev = 104;
              _context2.t3 = _context2["catch"](98);

              console.log(_context2.t3);

            case 107:
              _context2.next = 119;
              break;

            case 109:
              if (!(_OGstatus == false)) {
                _context2.next = 119;
                break;
              }

              _context2.prev = 110;
              _context2.next = 113;
              return _axios2.default.post('/api/esports_bio/update/', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == "Yes" ? "Yes" : "No",
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 113:
              _post_bio = _context2.sent;
              _context2.next = 119;
              break;

            case 116:
              _context2.prev = 116;
              _context2.t4 = _context2["catch"](110);

              console.log(_context2.t4);

            case 119:
              if (!uShallNotPass) {
                _context2.next = 131;
                break;
              }

              if (!(_OGstatus_exp == false)) {
                _context2.next = 131;
                break;
              }

              _context2.prev = 121;
              match = _this.props.routeProps.match;
              _context2.next = 125;
              return _axios2.default.post("/api/esports_experiences/update/" + match.params.esportsExp_id, {
                role_title: _this.state.role_title_box,
                game_name: newGame_name == "" ? _this.state.value_game_name.label : newGame_name,
                team_name: _this.state.team_name_box,
                duration: myPlayed,
                achievements: _this.state.achievements_box,
                skills: myTags
              });

            case 125:
              update_exp = _context2.sent;
              _context2.next = 131;
              break;

            case 128:
              _context2.prev = 128;
              _context2.t5 = _context2["catch"](121);

              console.log(_context2.t5);

            case 131:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[27, 34], [50, 58], [73, 80], [98, 104], [110, 116], [121, 128]]);
    }));

    _this.handleCreate_ardour = function (inputValue) {
      _this.setState({ isLoading_ardour: true });
      setTimeout(function () {
        var _this$state = _this.state,
            options_ardour = _this$state.options_ardour,
            value_ardour = _this$state.value_ardour,
            newValueCreated_ardour = _this$state.newValueCreated_ardour;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_ardour: false });
        _this.setState({ options_ardour: [].concat((0, _toConsumableArray3.default)(options_ardour), [newOption]) });
        _this.setState({ value_ardour: newOption });
        _this.setState({ value_ardour: [].concat((0, _toConsumableArray3.default)(value_ardour), [newOption]) });
        _this.setState({ newValueCreated_ardour: [].concat((0, _toConsumableArray3.default)(newValueCreated_ardour), [newOption.label]) });
      }, 1000);
    };

    _this.handleCreate_game_name = function (inputValue) {
      _this.setState({ isLoading_game_name: true });
      setTimeout(function () {
        var _this$state2 = _this.state,
            options_game_name = _this$state2.options_game_name,
            value_game_name = _this$state2.value_game_name,
            newValueCreated_game_name = _this$state2.newValueCreated_game_name;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_game_name: false });
        _this.setState({ options_game_name: [].concat((0, _toConsumableArray3.default)(options_game_name), [newOption]) });
        _this.setState({ value_game_name: newOption });
        _this.setState({ value_tags: "" });
        _this.setState({ newValueCreated_game_name: [].concat((0, _toConsumableArray3.default)(newValueCreated_game_name), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: "" });
      }, 1000);
    };

    _this.handleCreate3 = function (inputValue) {
      _this.setState({ isLoading_tags: true });
      setTimeout(function () {
        var _this$state3 = _this.state,
            options_tags = _this$state3.options_tags,
            value_tags = _this$state3.value_tags,
            newValueCreated_tags = _this$state3.newValueCreated_tags;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_tags: false });
        _this.setState({ options_tags: [].concat((0, _toConsumableArray3.default)(options_tags), [newOption]) });
        _this.setState({ value_tags: [].concat((0, _toConsumableArray3.default)(value_tags), [newOption]) });
        _this.setState({ newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label]) });
      }, 1000);
    };

    _this.onBlur_game_name = function (value) {
      var getInitialData = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;

                  self.setState({ options_tags: "" });
                  self.setState({ value_tags: "" });

                  if (!(value != null)) {
                    _context3.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context3.next = 10;
                    break;
                  }

                  _context3.next = 7;
                  return _axios2.default.get("/api/Tags/" + value.game_names_id);

                case 7:
                  allTags = _context3.sent;
                  _context3.next = 11;
                  break;

                case 10:
                  return _context3.abrupt("return");

                case 11:
                  _context3.next = 14;
                  break;

                case 13:
                  return _context3.abrupt("return");

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = "";
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context3.next = 20;
                  break;

                case 17:
                  _context3.prev = 17;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 20:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 17]]);
        }));

        return function getInitialData() {
          return _ref3.apply(this, arguments);
        };
      }();
      getInitialData();
    };

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_email_info_box: false,
      show_status_info_box: false,
      show_role_title_info_box: false,
      show_game_name_info_box: false,
      status_box: [{ label: "", value: "" }],
      email_box: [{ label: "", value: "" }],
      played_box: "",
      career_highlights_box: "",
      team_name_box: "",
      role_title_box: "",
      achievements_box: "",
      isLoading_tags: false,
      isLoading_ardour: false,
      isLoading_game_name: false,
      options_tags: "",
      options_ardour: "",
      options_game_name: "",
      value_tags: [],
      value_game_name: [],
      value_ardour: [],
      newValueCreated_ardour: [],
      newValueCreated_game_name: [],
      newValueCreated_tags: [],
      name_trigger: false,
      createEsportsPost: true,
      intial_trigger: true
    };
    return _this;
  }

  (0, _createClass3.default)(EditEsportsExp, [{
    key: "handleCloseModal",
    value: function handleCloseModal() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;


      var getEsports_bio = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var _getEsports_bio, arrTags, games_of_ardour, tmp, i, newOption;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get('/api/esports_bio/show');

                case 3:
                  _getEsports_bio = _context4.sent;


                  if (_getEsports_bio.data.myProfile.length != 0) {
                    self.state.createEsportsPost = false;
                    self.setState({
                      myEsports_bio: _getEsports_bio.data.myProfile[0]
                    });
                    arrTags = "";
                    games_of_ardour = _getEsports_bio.data.myProfile[0].games_of_ardour;
                    tmp = [];


                    if (games_of_ardour != null && games_of_ardour != "") {
                      arrTags = games_of_ardour.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.setState({ value_ardour: tmp });
                    }
                  } else {
                    self.setState({
                      myEsports_bio: ""
                    });
                  }
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4["catch"](0);

                  console.log(_context4.t0);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 7]]);
        }));

        return function getEsports_bio() {
          return _ref4.apply(this, arguments);
        };
      }();

      var getEsports_exp = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var _getEsports_exp, gameName, game_newOption, allTags, x, anotherOption, _options_tags2, newOption, arrTags, skills, tmp, i, _newOption;

          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.get("/api/esports_experiences/show/" + match.params.esportsExp_id);

                case 3:
                  _getEsports_exp = _context5.sent;
                  _context5.next = 6;
                  return _axios2.default.get("/api/GameName/" + _getEsports_exp.data.myesportsExperience[0].game_name);

                case 6:
                  gameName = _context5.sent;
                  game_newOption = createOption(_getEsports_exp.data.myesportsExperience[0].game_name, gameName.data.getOne[0].id);
                  _context5.next = 10;
                  return _axios2.default.get("/api/Tags/" + gameName.data.getOne[0].id);

                case 10:
                  allTags = _context5.sent;

                  for (x = 0; x < allTags.data.allTags.length; x++) {
                    anotherOption = createOption(allTags.data.allTags[x].tag);
                    _options_tags2 = self.state.options_tags;

                    if (x == 0) {
                      _options_tags2 = "";
                    }
                    self.state.options_tags = [].concat((0, _toConsumableArray3.default)(_options_tags2), [anotherOption]);
                  }

                  self.state.myEsports_exp = _getEsports_exp.data.myesportsExperience[0];

                  _context5.t0 = _getEsports_exp.data.myesportsExperience[0].duration;
                  _context5.next = _context5.t0 === 1 ? 16 : _context5.t0 === 2 ? 20 : _context5.t0 === 3 ? 24 : _context5.t0 === 4 ? 28 : _context5.t0 === 5 ? 32 : _context5.t0 === 42 ? 36 : 40;
                  break;

                case 16:
                  newOption = createOptionDifValue(1, "Less than 3 months");
                  self.state.myEsports_exp.duration_label = "Less than 3 months";
                  self.state.myEsports_exp.duration_value = 1;
                  return _context5.abrupt("break", 43);

                case 20:
                  newOption = createOptionDifValue(2, "Less than 6 months");
                  self.state.myEsports_exp.duration_label = "Less than 6 months";
                  self.state.myEsports_exp.duration_value = 2;
                  return _context5.abrupt("break", 43);

                case 24:
                  newOption = createOptionDifValue(3, "Less than 1 year");
                  self.state.myEsports_exp.duration_label = "Less than 1 year";
                  self.state.myEsports_exp.duration_value = 3;
                  return _context5.abrupt("break", 43);

                case 28:
                  newOption = createOptionDifValue(4, "Less than 2 years");
                  self.state.myEsports_exp.duration_label = "Less than 2 years";
                  self.state.myEsports_exp.duration_value = 4;
                  return _context5.abrupt("break", 43);

                case 32:
                  newOption = createOptionDifValue(5, "Less than 3 years");
                  self.state.myEsports_exp.duration_label = "Less than 4 years";
                  self.state.myEsports_exp.duration_value = 5;
                  return _context5.abrupt("break", 43);

                case 36:
                  newOption = createOptionDifValue(42, "3+ years");
                  self.state.myEsports_exp.duration_label = "3+ years";
                  self.state.myEsports_exp.duration_value = 42;
                  return _context5.abrupt("break", 43);

                case 40:
                  newOption = createOptionDifValue(1, "Less than 3 months");
                  self.state.myEsports_exp.duration_label = "Less than 3 months";
                  self.state.myEsports_exp.duration_value = 1;

                case 43:

                  self.state.played_box = newOption;
                  self.state.played_box_OG = newOption;

                  if (self.state.myEsports_exp !== undefined) {
                    arrTags = "";
                    skills = self.state.myEsports_exp.skills;
                    tmp = [];


                    if (skills != null && skills != "") {
                      arrTags = skills.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        _newOption = createOption(arrTags[i]);

                        tmp.push(_newOption);
                      }
                      self.state.value_tags = tmp;
                      self.state.value_tags_OG = skills;
                    }
                  }
                  self.setState({ value_game_name: game_newOption });

                  _context5.next = 52;
                  break;

                case 49:
                  _context5.prev = 49;
                  _context5.t1 = _context5["catch"](0);

                  console.log(_context5.t1);

                case 52:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 49]]);
        }));

        return function getEsports_exp() {
          return _ref5.apply(this, arguments);
        };
      }();

      getEsports_exp();
      getEsports_bio();
    }
  }, {
    key: "getOptions",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", []);

              case 2:
                _context6.prev = 2;

                inputValue = inputValue.trimStart();
                _context6.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context6.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context6.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context6.next = 14;
                break;

              case 13:
                return _context6.abrupt("return", []);

              case 14:
                return _context6.abrupt("return", newArr);

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6["catch"](2);

                console.log(_context6.t0);

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref6.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.myEsports_bio !== undefined) {
        if (this.state.myEsports_exp !== undefined) {
          var _state = this.state,
              isLoading_ardour = _state.isLoading_ardour,
              _options_ardour = _state.options_ardour,
              _value_ardour = _state.value_ardour,
              isLoading_tags = _state.isLoading_tags,
              _options_tags3 = _state.options_tags,
              _value_tags = _state.value_tags,
              _value_game_name = _state.value_game_name,
              _options_game_name = _state.options_game_name,
              isLoading_game_name = _state.isLoading_game_name;
          var _state$myEsports_bio = this.state.myEsports_bio,
              email_visibility = _state$myEsports_bio.email_visibility,
              games_of_ardour = _state$myEsports_bio.games_of_ardour,
              career_highlights = _state$myEsports_bio.career_highlights,
              status = _state$myEsports_bio.status;
          var _state$myEsports_exp = this.state.myEsports_exp,
              achievements = _state$myEsports_exp.achievements,
              team_name = _state$myEsports_exp.team_name,
              game_name = _state$myEsports_exp.game_name,
              role_title = _state$myEsports_exp.role_title,
              duration_label = _state$myEsports_exp.duration_label,
              duration_value = _state$myEsports_exp.duration_value;


          if (this.state.intial_trigger) {
            this.state.status_box.label = status;
            this.state.email_box.label = email_visibility;
            this.state.career_highlights_box = career_highlights;
            this.state.intial_trigger = false;

            this.state.status_box_OG = status;
            this.state.email_box_OG = email_visibility;
            this.state.career_highlights_box_OG = career_highlights;
            this.state.games_of_ardour_OG = games_of_ardour;

            this.state.role_title_box = role_title, this.state.value_game_name.label = game_name, this.state.team_name_box = team_name, this.state.achievements_box = achievements;

            this.state.role_title_box_OG = role_title, this.state.value_game_name_OG = game_name, this.state.team_name_box_OG = team_name, this.state.achievements_box_OG = achievements;
          }

          return _react2.default.createElement(
            "div",
            { className: "content-area addEsportsExp-page" },
            _react2.default.createElement(
              _reactModal2.default,
              {
                isOpen: true,
                onRequestClose: function onRequestClose(event) {
                  // Ignore react-modal esc-close handling
                  if (event.type === 'keydown' && event.keyCode === 27 && _this3.state.shouldCloseOnOverlayClick_ === false) {
                    return;
                  } else {
                    _this3.handleCloseModal();
                  }
                },
                shouldCloseOnOverlayClick: this.state.shouldCloseOnOverlayClick_,
                className: "addEsportsModal",
                overlayClassName: "Overlay"
              },
              "Esports Experience:",
              _react2.default.createElement("i", { className: "fas fa-times", onClick: this.handleCloseModal }),
              _react2.default.createElement(
                "div",
                { className: "status" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Status ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "*"
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Status,
                  options: status_options,
                  placeholder: "Set your job status",
                  className: "status_box",
                  defaultValue: [{ label: status, value: status }]
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "email" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Email Visible? ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "*"
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_email,
                  options: email_options,
                  placeholder: "Show/Don't show email?",
                  className: "email_box",
                  defaultValue: [{ label: email_visibility, value: email_visibility }]

                })
              ),
              _react2.default.createElement(
                "div",
                { className: "games_ardour_txtBox" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Games of ardour"
                ),
                _react2.default.createElement(_AsyncCreatable2.default, {
                  cacheOptions: true,
                  defaultOptions: true,
                  loadOptions: this.getOptions,
                  onChange: this.handleChange_ardour,
                  onCreateOption: this.handleCreate_ardour,
                  isClearable: true,
                  value: _value_ardour,
                  className: "games_ardour_box",
                  placeholder: "Games your passionate about",
                  isMulti: true,
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "career-highlights" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Career Highlights"
                ),
                _react2.default.createElement("textarea", { id: "career_highlights_box", className: "career_highlights_box", rows: 8, cols: 80, defaultValue: career_highlights, maxLength: "254", onChange: this.handleChange })
              ),
              _react2.default.createElement(
                "div",
                { className: "line-break" },
                _react2.default.createElement("hr", null)
              ),
              _react2.default.createElement(
                "div",
                { className: "line-break" },
                _react2.default.createElement("hr", null)
              ),
              "Add Role Info:",
              _react2.default.createElement("div", null),
              _react2.default.createElement(
                "div",
                { className: "role-title" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Role Title ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "*"
                  )
                ),
                _react2.default.createElement("input", { type: "text", id: "role_title_box", className: "role_title_box", maxLength: "120", onChange: this.handleChange, defaultValue: "" + role_title })
              ),
              _react2.default.createElement(
                "div",
                { className: "gName_txtBox2" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Game Name ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "*"
                  )
                ),
                _react2.default.createElement(_AsyncCreatable2.default, {
                  onChange: this.handleChange_game_name,
                  cacheOptions: true,
                  defaultOptions: true,
                  loadOptions: this.getOptions,
                  onCreateOption: this.handleCreate_game_name,
                  isClearable: true,
                  value: _value_game_name,
                  className: "game_name_box2",
                  placeholder: "Your Game",
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "team-name" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Team name"
                ),
                _react2.default.createElement("input", { type: "text", id: "team_name_box", className: "team_name_box", maxLength: "120", onChange: this.handleChange, defaultValue: "" + team_name })
              ),
              _react2.default.createElement(
                "div",
                { className: "played" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Time in Role: ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "*"
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Played,
                  options: played_options,
                  placeholder: "Select time in role",
                  className: "played_box",
                  defaultValue: [{ label: duration_label, value: duration_value }]
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "achievements" },
                _react2.default.createElement(
                  "p",
                  null,
                  "Achievements in this role"
                ),
                _react2.default.createElement("textarea", { id: "achievements_box", className: "achievements_box", rows: 8, cols: 80, defaultValue: "" + achievements, maxLength: "254", onChange: this.handleChange })
              ),
              _react2.default.createElement(
                "div",
                { className: "tag_txtBox" },
                _react2.default.createElement(
                  "p",
                  null,
                  _react2.default.createElement(
                    "span",
                    { style: { color: "green" } },
                    "S"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "dodgerblue" } },
                    "k"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "i"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "gold" } },
                    "l"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "green" } },
                    "l"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "dodgerblue" } },
                    "s"
                  ),
                  " (Keywords that identify ",
                  _react2.default.createElement(
                    "span",
                    { style: { color: "green" } },
                    "y"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "dodgerblue" } },
                    "o"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    "u"
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "gold" } },
                    "r"
                  ),
                  " expertise with this role. Max 250 chars)"
                ),
                _react2.default.createElement(_Creatable2.default, {
                  onChange: this.handleChange3,
                  options: _options_tags3,
                  onCreateOption: this.handleCreate3,
                  isClearable: true,
                  isDisabled: isLoading_tags,
                  isLoading: isLoading_tags,
                  value: _value_tags,
                  className: "tag_name_box",
                  isMulti: true,
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                  }
                })
              ),
              _react2.default.createElement("div", null),
              !this.state.show_info_box && _react2.default.createElement("div", null),
              this.state.show_info_box && _react2.default.createElement(
                "div",
                { className: "info_box" },
                this.state.show_email_info_box && _react2.default.createElement(
                  "div",
                  { className: "email_error" },
                  "Error: Email field can't be empty"
                ),
                this.state.show_status_info_box && _react2.default.createElement(
                  "div",
                  { className: "status_name_error" },
                  "Error: Status can't be empty"
                ),
                this.state.show_role_title_info_box && _react2.default.createElement(
                  "div",
                  { className: "role_name_error" },
                  "Error: Role or Game Name can't be empty"
                )
              ),
              _react2.default.createElement("div", null),
              _react2.default.createElement(
                "div",
                { className: "save-btn" },
                _react2.default.createElement(
                  "button",
                  { className: "delete", onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to delete this Esports Experience?')) _this3.delete_exp();
                    } },
                  "Delete"
                ),
                _react2.default.createElement(
                  "button",
                  { className: "save", onClick: this.submitForm },
                  "Save"
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            "div",
            { className: "content-area addEsportsExp-page" },
            "Loading"
          );
        }
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area addEsportsExp-page" },
          "Loading"
        );
      }
    }
  }]);
  return EditEsportsExp;
}(_react.Component);

exports.default = EditEsportsExp;

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(52);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(64);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var played_options = [{ value: 1, label: 'Less than 1 year' }, { value: 2, label: 'Less than 2 years' }, { value: 3, label: 'Less than 3 years' }, { value: 4, label: 'Less than 4 years' }, { value: 5, label: 'Less than 5 years' }, { value: 42, label: '5+ years' }];

var rating_options = [{ value: 1, label: '1 star' }, { value: 2, label: '2 stars' }, { value: 3, label: '3 stars' }, { value: 4, label: '4 stars' }, { value: 5, label: '5 stars' }];

var status_options = [{ value: 'Actively Gaming', label: 'Actively Gaming' }, { value: 'Sometimes...', label: 'Sometimes...' }, { value: 'Moved On', label: 'Moved On' }];

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label.toLowerCase().replace(/\W/g, ''),
    game_names_id: game_names_id
  };
};

var EditGamingExp = function (_Component) {
  (0, _inherits3.default)(EditGamingExp, _Component);

  function EditGamingExp() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, EditGamingExp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditGamingExp.__proto__ || Object.getPrototypeOf(EditGamingExp)).call(this));

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Experience = function (experience_box) {
      _this.setState({ experience_box: experience_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Status = function (status_box) {
      _this.setState({ status_box: status_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Played = function (played_box) {
      _this.setState({ played_box: played_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Ratings = function (ratings_box) {
      _this.setState({ ratings_box: ratings_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_comments = function () {
      _this.setState({
        comments_chkbox: !_this.state.comments_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.toggleChange_link = function () {
      _this.setState({
        link_chkbox: !_this.state.link_chkbox
      });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange2 = function (value) {
      self.setState({ value: value });
      _this.onBlur_game_name(value);
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange3 = function (value_tags) {
      _this.setState({ value_tags: value_tags });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var match, myGame;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              match = _this.props.routeProps.match;


              try {
                myGame = _axios2.default.get("/api/GameExperiences/delete/" + match.params.game_id);
              } catch (error) {
                console.log(error);
              }
              _this.handleCloseModal();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));
    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var myExperience, myPlayed, myRatings, myTags, myGame_name, myStatus, name_trigger, newGameID, i, post, j, tmpnewGameID, _post, match, _post2;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              myExperience = "";
              myPlayed = "";
              myRatings = "";
              myTags = "";
              myGame_name = "";
              myStatus = "";
              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.value == "" || _this.state.value == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_game_name_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_game_name_info_box: false });
                if (_this.state.value.label != null) {
                  myGame_name = _this.state.value.label;
                } else {
                  myGame_name = _this.state.value;
                }
              }

              if (_this.state.status_box == "" || _this.state.status_box == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_status_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
                if (_this.state.status_box.label != null) {
                  myStatus = _this.state.status_box.label;
                } else {
                  myStatus = _this.state.status_box;
                }
              }

              if (!name_trigger) {
                _context2.next = 12;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context2.abrupt("return");

            case 12:

              if (_this.state.experience_box != null || _this.state.experience_box != undefined) {
                if (_this.state.experience_box.value != null) {
                  myExperience = _this.state.experience_box.value;
                } else {
                  myExperience = _this.state.experience_box;
                }
              }

              if (_this.state.played_box != null || _this.state.played_box != undefined) {
                myPlayed = _this.state.played_box.value;
              }
              if (_this.state.ratings_box != null || _this.state.ratings_box != undefined) {
                if (_this.state.ratings_box.value != null) {
                  myRatings = _this.state.ratings_box.value;
                } else {
                  myRatings = _this.state.ratings_box;
                }
              }
              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGameID = "";

              if (!(_this.state.newValueCreated != "")) {
                _context2.next = 34;
                break;
              }

              i = 0;

            case 18:
              if (!(i < _this.state.newValueCreated.length)) {
                _context2.next = 34;
                break;
              }

              if (!(_this.state.value.label == _this.state.newValueCreated[i])) {
                _context2.next = 31;
                break;
              }

              _context2.prev = 20;
              _context2.next = 23;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value.label
              });

            case 23:
              post = _context2.sent;

              newGameID = post.data.id;
              _context2.next = 30;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](20);

              console.log(_context2.t0);

            case 30:
              return _context2.abrupt("break", 34);

            case 31:
              i++;
              _context2.next = 18;
              break;

            case 34:
              if (!(_this.state.newValueCreated_tags != "")) {
                _context2.next = 60;
                break;
              }

              tmpnewGameID = "";

              console.log(_this.state.value);
              if (_this.state.value.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value.game_names_id;
              }
              i = 0;

            case 39:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context2.next = 60;
                break;
              }

              j = 0;

            case 41:
              if (!(j < _this.state.value_tags.length)) {
                _context2.next = 57;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context2.next = 54;
                break;
              }

              _context2.prev = 43;

              if (!(tmpnewGameID != "")) {
                _context2.next = 48;
                break;
              }

              _context2.next = 47;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 47:
              _post = _context2.sent;

            case 48:
              _context2.next = 53;
              break;

            case 50:
              _context2.prev = 50;
              _context2.t1 = _context2["catch"](43);

              console.log(_context2.t1);

            case 53:
              return _context2.abrupt("break", 57);

            case 54:
              j++;
              _context2.next = 41;
              break;

            case 57:
              i++;
              _context2.next = 39;
              break;

            case 60:

              if (self.state.value_tags !== null && self.state.value_tags.length !== 0) {
                for (i = 0; i < self.state.value_tags.length; i++) {
                  myTags += self.state.value_tags[i].label + "; ";
                }
                myTags = myTags.trim().replace(/; /g, ",").trim();
                myTags = myTags.replace(/;/g, "");
                myTags = myTags.replace(/,/g, ", ");
              }

              _this.state.comments_box == undefined ? undefined : _this.state.comments_box = _this.state.comments_box.trim();
              _this.state.link_box == undefined ? undefined : _this.state.link_box = _this.state.link_box.trim();

              _context2.prev = 63;
              match = _this.props.routeProps.match;
              _context2.next = 67;
              return _axios2.default.post("/api/GameExperiences/" + match.params.id + "/" + match.params.game_id, {
                game_name: myGame_name,
                experience: myExperience,
                comments: _this.state.comments_box,
                status: myStatus,
                played: myPlayed,
                link: _this.state.link_box,
                ratings: myRatings,
                tags: myTags
              });

            case 67:
              _post2 = _context2.sent;

              _this.handleCloseModal();
              _context2.next = 74;
              break;

            case 71:
              _context2.prev = 71;
              _context2.t2 = _context2["catch"](63);

              console.log(_context2.t2);

            case 74:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[20, 27], [43, 50], [63, 71]]);
    }));

    _this.handleCreate = function (inputValue) {
      _this.setState({ isLoading: true });
      setTimeout(function () {
        var _this$state = _this.state,
            options = _this$state.options,
            value = _this$state.value,
            newValueCreated = _this$state.newValueCreated;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading: false });
        _this.setState({ options: [].concat((0, _toConsumableArray3.default)(options), [newOption]) });
        _this.setState({ value: newOption });
        _this.setState({ value_tags: "" });
        _this.setState({ newValueCreated: [].concat((0, _toConsumableArray3.default)(newValueCreated), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: "" });
      }, 1000);
    };

    _this.handleCreate2 = function (inputValue) {
      _this.setState({ isLoading_tags: true });
      setTimeout(function () {
        var _this$state2 = _this.state,
            options_tags = _this$state2.options_tags,
            value_tags = _this$state2.value_tags,
            newValueCreated_tags = _this$state2.newValueCreated_tags;

        var newOption = createOption(inputValue, null);
        _this.setState({ isLoading_tags: false });
        _this.setState({ options_tags: [].concat((0, _toConsumableArray3.default)(options_tags), [newOption]) });
        _this.setState({ value_tags: [].concat((0, _toConsumableArray3.default)(value_tags), [newOption]) });
        _this.setState({ newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label]) });
      }, 1000);
    };

    _this.onBlur_game_name = function (value) {
      var getInitialData = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;

                  self.setState({ options_tags: "" });
                  self.setState({ value_tags: "" });

                  if (!(value != null)) {
                    _context3.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context3.next = 10;
                    break;
                  }

                  _context3.next = 7;
                  return _axios2.default.get("/api/Tags/" + value.game_names_id);

                case 7:
                  allTags = _context3.sent;
                  _context3.next = 11;
                  break;

                case 10:
                  return _context3.abrupt("return");

                case 11:
                  _context3.next = 14;
                  break;

                case 13:
                  return _context3.abrupt("return");

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = "";
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context3.next = 20;
                  break;

                case 17:
                  _context3.prev = 17;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 20:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 17]]);
        }));

        return function getInitialData() {
          return _ref3.apply(this, arguments);
        };
      }();
      getInitialData();
    };

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_game_name_info_box: false,
      show_status_info_box: false,
      game_name_box: "",
      status_box: "",
      experience_box: "",
      played_box: "",
      ratings_box: "",
      comments_box: "",
      link_box: "",
      isLoading_tags: false,
      options_tags: "",
      value_tags: [],
      newValueCreated_tags: [],
      isLoading: false,
      options: "",
      value: [],
      newValueCreated: [],
      comments_chkbox: false,
      link_chkbox: false,
      name_trigger: false,
      intial_trigger: true,
      edit_game_name: ""
    };
    return _this;
  }

  (0, _createClass3.default)(EditGamingExp, [{
    key: "handleCloseModal",
    value: function handleCloseModal() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var match = this.props.routeProps.match;

      var self = this;

      var getGamingExp = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var myGame, gameName, game_newOption, allTags, x, anotherOption, _options_tags2, arrTags, tags, tmp, i, newOption;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get("/api/GameExperiences/" + match.params.id + "/" + match.params.game_id);

                case 3:
                  myGame = _context4.sent;


                  self.state.edit_game_name = myGame.data.myGameExperience[0].game_name;

                  _context4.next = 7;
                  return _axios2.default.get("/api/GameName/" + self.state.edit_game_name);

                case 7:
                  gameName = _context4.sent;
                  game_newOption = createOption(myGame.data.myGameExperience[0].game_name, gameName.data.getOne[0].id);
                  _context4.next = 11;
                  return _axios2.default.get("/api/Tags/" + gameName.data.getOne[0].id);

                case 11:
                  allTags = _context4.sent;

                  for (x = 0; x < allTags.data.allTags.length; x++) {
                    anotherOption = createOption(allTags.data.allTags[x].tag);
                    _options_tags2 = self.state.options_tags;

                    if (x == 0) {
                      _options_tags2 = "";
                    }
                    self.state.options_tags = [].concat((0, _toConsumableArray3.default)(_options_tags2), [anotherOption]);
                  }

                  self.state.myGame = myGame.data.myGameExperience[0];

                  _context4.t0 = myGame.data.myGameExperience[0].played;
                  _context4.next = _context4.t0 === 1 ? 17 : _context4.t0 === 2 ? 20 : _context4.t0 === 3 ? 23 : _context4.t0 === 4 ? 26 : _context4.t0 === 5 ? 29 : _context4.t0 === 42 ? 32 : 35;
                  break;

                case 17:
                  self.state.myGame.played_label = "Less than 1 year";
                  self.state.myGame.played_value = 1;
                  return _context4.abrupt("break", 37);

                case 20:
                  self.state.myGame.played_label = "Less than 2 years";
                  self.state.myGame.played_value = 2;
                  return _context4.abrupt("break", 37);

                case 23:
                  self.state.myGame.played_label = "Less than 3 years";
                  self.state.myGame.played_value = 3;
                  return _context4.abrupt("break", 37);

                case 26:
                  self.state.myGame.played_label = "Less than 4 years";
                  self.state.myGame.played_value = 4;
                  return _context4.abrupt("break", 37);

                case 29:
                  self.state.myGame.played_label = "Less than 5 years";
                  self.state.myGame.played_value = 5;
                  return _context4.abrupt("break", 37);

                case 32:
                  self.state.myGame.played_label = "5+ years";
                  self.state.myGame.played_value = 42;
                  return _context4.abrupt("break", 37);

                case 35:
                  self.state.myGame.played_label = "Less than 1 year";
                  self.state.myGame.played_value = 1;

                case 37:

                  if (self.state.myGame !== undefined) {
                    arrTags = "";
                    tags = self.state.myGame.tags;
                    tmp = [];


                    if (tags != null && tags != "") {
                      arrTags = tags.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.state.value_tags = tmp;
                    }
                  }
                  self.setState({ value: game_newOption });
                  _context4.next = 44;
                  break;

                case 41:
                  _context4.prev = 41;
                  _context4.t1 = _context4["catch"](0);

                  console.log(_context4.t1);

                case 44:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 41]]);
        }));

        return function getGamingExp() {
          return _ref4.apply(this, arguments);
        };
      }();
      // const getGameNameTags = async function(){
      //   try{
      //     console.log(self.state.edit_game_name);
      //     const gameName = await axios.get(`/api/GameName/${self.state.edit_game_name}`)
      //     console.log(gameName);
      //     return
      //
      //     var i
      //     for (i = 0; i < allGameNames.data.allGameNames.length; i++){
      //       const newOption = createOption(allGameNames.data.allGameNames[i].game_name, allGameNames.data.allGameNames[i].id )
      //       const { options } = self.state
      //       self.state.options = [...options, newOption]
      //
      //       if (self.state.edit_game_name == allGameNames.data.allGameNames[i].game_name){
      //         var allTags
      //         allTags = await axios.get(`/api/Tags/${allGameNames.data.allGameNames[i].id}`)
      //
      //         var x
      //         for (x = 0; x < allTags.data.allTags.length; x++){
      //           const anotherOption = createOption(allTags.data.allTags[x].tag)
      //           let { options_tags } = self.state
      //           if (x == 0){
      //             options_tags=""
      //           }
      //           // self.setState({
      //           //     options_tags: [...options_tags, anotherOption],
      //           // })
      //           self.state.options_tags = [...options_tags, anotherOption]
      //         }
      //       }
      //     }
      //   } catch (error){
      //     console.log(error)
      //   }
      // }
      getGamingExp();
      //getGameNameTags()
    }
  }, {
    key: "getOptions",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(inputValue == "" || inputValue == undefined)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", []);

              case 2:
                _context5.prev = 2;

                inputValue = inputValue.trimStart();
                _context5.next = 6;
                return _axios2.default.get("/api/GameNames/" + inputValue + "/gameSearchResults");

              case 6:
                getGameName = _context5.sent;
                results = getGameName.data.gameSearchResults[0].filter(function (i) {
                  return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
                });
                newArr = [];

                if (!(results.length != 0)) {
                  _context5.next = 13;
                  break;
                }

                for (i = 0; i < results.length; i++) {
                  newOption = createOption(results[i].game_name, results[i].id);
                  newArr.push(newOption);
                }
                _context5.next = 14;
                break;

              case 13:
                return _context5.abrupt("return", []);

              case 14:
                return _context5.abrupt("return", newArr);

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](2);

                console.log(_context5.t0);

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 17]]);
      }));

      function getOptions(_x) {
        return _ref5.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.myGame !== undefined) {
        var _state = this.state,
            isLoading = _state.isLoading,
            _options = _state.options,
            _value = _state.value,
            isLoading_tags = _state.isLoading_tags,
            _options_tags3 = _state.options_tags,
            _value_tags = _state.value_tags,
            edit_game_name = _state.edit_game_name;
        var _state$myGame = this.state.myGame,
            game_name = _state$myGame.game_name,
            experience = _state$myGame.experience,
            comments = _state$myGame.comments,
            played_label = _state$myGame.played_label,
            played_value = _state$myGame.played_value,
            status = _state$myGame.status,
            link = _state$myGame.link,
            tags = _state$myGame.tags,
            ratings = _state$myGame.ratings;

        var comments_chkbox_state = false;
        var link_chkbox_state = false;

        if (this.state.intial_trigger) {
          this.setState({ game_name_box: game_name });
          this.setState({ experience_box: experience });
          this.setState({ comments_box: comments });
          this.setState({ played_box: played_value });
          this.setState({ status_box: status });
          this.setState({ link_box: link });
          this.setState({ ratings_box: ratings });
          this.setState({ intial_trigger: false });

          if (comments != "" && comments != null) {
            this.setState({ comments_chkbox: true });
            comments_chkbox_state = true;
          }
          if (link != "" && link != null) {
            this.setState({ link_chkbox: true });
            link_chkbox_state = true;
          }
        }
        return _react2.default.createElement(
          "div",
          { className: "content-area addGamingExp-page" },
          _react2.default.createElement(
            _reactModal2.default,
            {
              isOpen: true,
              onRequestClose: function onRequestClose(event) {
                // Ignore react-modal esc-close handling
                if (event.type === 'keydown' && event.keyCode === 27 && _this3.state.shouldCloseOnOverlayClick_ === false) {
                  return;
                } else {
                  _this3.handleCloseModal();
                }
              },
              shouldCloseOnOverlayClick: this.state.shouldCloseOnOverlayClick_,
              className: "addGamingModal",
              overlayClassName: "Overlay"
            },
            "Edit Gaming Experience:",
            _react2.default.createElement("i", { className: "fas fa-times", onClick: this.handleCloseModal }),
            _react2.default.createElement(
              "div",
              { className: "gName_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                "Game Name ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                loadOptions: this.getOptions,
                isClearable: true,
                onChange: this.handleChange2,
                className: "game_name_box",
                onCreateOption: this.handleCreate,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                },
                defaultValue: [{ label: game_name, value: game_name }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "status" },
              _react2.default.createElement(
                "p",
                null,
                "Status ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "*"
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Status,
                options: status_options,
                placeholder: "Set your status",
                className: "status_box",
                defaultValue: [{ label: status, value: status }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "experience" },
              _react2.default.createElement(
                "p",
                null,
                "Experience:"
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Experience,
                options: experience_options,
                placeholder: "Select experience level",
                className: "experience_box",
                defaultValue: [{ label: experience, value: experience }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "played" },
              _react2.default.createElement(
                "p",
                null,
                "Time Played:"
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Played,
                options: played_options,
                placeholder: "Select time played",
                className: "played_box",
                defaultValue: [{ label: played_label, value: played_value }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "ratings" },
              _react2.default.createElement(
                "p",
                null,
                "Ratings:"
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Ratings,
                options: rating_options,
                placeholder: "Select game ratings",
                className: "ratings_box",
                defaultValue: [{ label: ratings, value: ratings }]
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "options_checkbox" },
              _react2.default.createElement(
                "p",
                null,
                "Show Link box and/or Comments box"
              ),
              _react2.default.createElement("input", { id: "link_ChkBox", type: "checkbox", defaultChecked: link_chkbox_state, onChange: this.toggleChange_link }),
              " Link",
              _react2.default.createElement("input", { id: "comments_ChkBox", type: "checkbox", defaultChecked: comments_chkbox_state, onChange: this.toggleChange_comments }),
              " Comments"
            ),
            _react2.default.createElement(
              "div",
              { className: "tag_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "span",
                  { style: { color: "green" } },
                  "T"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "dodgerblue" } },
                  "a"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "g"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "gold" } },
                  "s"
                ),
                " (Keywords that identify ",
                _react2.default.createElement(
                  "span",
                  { style: { color: "green" } },
                  "y"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "dodgerblue" } },
                  "o"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "red" } },
                  "u"
                ),
                _react2.default.createElement(
                  "span",
                  { style: { color: "gold" } },
                  "r"
                ),
                " unique experience with this game. Max 250 chars)"
              ),
              _react2.default.createElement(_Creatable2.default, {
                onChange: this.handleChange3,
                options: _options_tags3,
                onCreateOption: this.handleCreate2,
                isClearable: true,
                isDisabled: isLoading_tags,
                isLoading: isLoading_tags,
                className: "tag_name_box",
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                },
                value: _value_tags
              })
            ),
            this.state.link_chkbox == false ? _react2.default.createElement("div", { className: "link_txtBox" }) : _react2.default.createElement(
              "div",
              { className: "link_txtBox" },
              _react2.default.createElement(
                "p",
                null,
                "Link"
              ),
              _react2.default.createElement("input", { type: "text", id: "link_box", className: "link_box", maxLength: "50", defaultValue: "" + link, onChange: this.handleChange })
            ),
            this.state.comments_chkbox == false ? _react2.default.createElement("div", { className: "comments" }) : _react2.default.createElement(
              "div",
              { className: "comments" },
              _react2.default.createElement(
                "p",
                null,
                "Comments"
              ),
              _react2.default.createElement("textarea", { id: "comments_box", className: "comments_box", rows: 8, cols: 80, defaultValue: "" + comments, maxLength: "254", onChange: this.handleChange })
            ),
            _react2.default.createElement("div", null),
            !this.state.show_info_box && _react2.default.createElement("div", null),
            this.state.show_info_box && _react2.default.createElement(
              "div",
              { className: "info_box" },
              this.state.show_game_name_info_box && _react2.default.createElement(
                "div",
                { className: "game_name_error" },
                "Error: Game Name can't be empty"
              ),
              this.state.show_status_info_box && _react2.default.createElement(
                "div",
                { className: "status_name_error" },
                "Error: Status can't be empty"
              )
            ),
            _react2.default.createElement("div", null),
            _react2.default.createElement(
              "div",
              { className: "save-btn" },
              _react2.default.createElement(
                "button",
                { className: "delete", onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to delete this Gaming Experience?')) _this3.delete_exp();
                  } },
                "Delete"
              ),
              "\xA0",
              _react2.default.createElement(
                "button",
                { className: "save", onClick: this.submitForm },
                "Save"
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area addGamingExp-page" },
          "Loading"
        );
      }
    }
  }]);
  return EditGamingExp;
}(_react.Component);

exports.default = EditGamingExp;

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _ComposeSection = __webpack_require__(133);

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

var _Posts = __webpack_require__(143);

var _Posts2 = _interopRequireDefault(_Posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this.state = {
      name: "Raaz"
    };
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      }, function () {
        console.log(self.state);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "content-area" },
        _react2.default.createElement(_ComposeSection2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
        _react2.default.createElement(_Posts2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData })
      );
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualInvitation = __webpack_require__(137);

var _IndividualInvitation2 = _interopRequireDefault(_IndividualInvitation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Invitation = function (_Component) {
  (0, _inherits3.default)(Invitation, _Component);

  function Invitation() {
    (0, _classCallCheck3.default)(this, Invitation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Invitation.__proto__ || Object.getPrototypeOf(Invitation)).call(this));

    _this.showInvitations = function () {
      if (_this.state.myFriendRequests != undefined) {
        var rowLen = _this.state.myFriendRequests.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            "div",
            { className: "invitation-info" },
            "No pending invitations"
          );
        }
        return _this.state.myFriendRequests.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualInvitation2.default, { invitation: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Invitation, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getFriendnoti = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getFriendnoti;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/notifications/allmyFriendRequests');

                case 3:
                  _getFriendnoti = _context.sent;

                  self.setState({
                    myFriendRequests: _getFriendnoti.data.allMyFriends
                  });

                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getFriendnoti() {
          return _ref.apply(this, arguments);
        };
      }();
      getFriendnoti();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "invitation-page" },
        _react2.default.createElement(
          "div",
          { className: "content-area invitation-page" },
          _react2.default.createElement(
            "div",
            { className: "padding-container" },
            _react2.default.createElement(
              "div",
              { className: "invitation-grey-container" },
              _react2.default.createElement(
                "h3",
                null,
                "myInvitations"
              ),
              _react2.default.createElement("div", { className: "padding-container" }),
              _react2.default.createElement(
                "div",
                { className: "invitation-container" },
                this.showInvitations()
              )
            )
          )
        )
      );
    }
  }]);
  return Invitation;
}(_react.Component);

exports.default = Invitation;

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftMenu = function (_Component) {
  (0, _inherits3.default)(LeftMenu, _Component);

  function LeftMenu() {
    (0, _classCallCheck3.default)(this, LeftMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LeftMenu.__proto__ || Object.getPrototypeOf(LeftMenu)).call(this));

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.handleScroll = function (event) {
      var scrollTop = event.srcElement.body.scrollTop,
          itemTranslate = Math.min(0, scrollTop / 3 - 60);

      _this.setState({
        show_top_btn: true
      });
    };

    _this.moveTop = function () {
      window.scrollTo(0, 0);
    };

    _this.redirect = function () {
      window.location.href = "/";
    };

    _this.state = {
      dropdown: false,
      show_top_btn: false
    };
    return _this;
  }

  (0, _createClass3.default)(LeftMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('scroll', this.handleScroll);

      window.onscroll = function (event) {
        if (window.pageYOffset < 1) {
          _this2.setState({
            show_top_btn: false
          });
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.onscroll = null;
    }
  }, {
    key: "render",
    value: function render() {
      var test = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/footer-logo.png';
      if (this.props.initialData.userInfo == undefined) {
        return _react2.default.createElement(
          "div",
          null,
          "Loading"
        );
      } else {
        var _props$initialData$us = this.props.initialData.userInfo,
            first_name = _props$initialData$us.first_name,
            last_name = _props$initialData$us.last_name,
            id = _props$initialData$us.id;

        return _react2.default.createElement(
          "section",
          { id: "left-menu" },
          _react2.default.createElement(
            "div",
            { className: "account-dropdown" },
            _react2.default.createElement(
              "div",
              { className: "logo", onClick: this.redirect },
              _react2.default.createElement("div", { className: "logo-img", style: {
                  backgroundImage: "url('" + test + "')"
                } })
            ),
            _react2.default.createElement(
              "div",
              { className: "name", onClick: this.clickedDropdown },
              first_name + " " + last_name
            ),
            _react2.default.createElement(
              "div",
              { className: "icon", onClick: this.clickedDropdown },
              _react2.default.createElement("i", { className: "fas fa-chevron-down" })
            ),
            _react2.default.createElement(
              "div",
              { className: "dropdown " + (this.state.dropdown ? 'active' : '') },
              _react2.default.createElement(
                "nav",
                null,
                _react2.default.createElement(
                  "a",
                  { href: "/mySettings" },
                  "mySettings"
                ),
                _react2.default.createElement(
                  "a",
                  { href: "/logout" },
                  "Logout"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "groups" },
            _react2.default.createElement(
              "div",
              { className: "myMenu" },
              _react2.default.createElement(
                "div",
                { className: "title" },
                "myMenu"
              ),
              _react2.default.createElement(
                "ul",
                null,
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/profile/" + this.props.initialData.userInfo.id, style: { color: '#99AAB5' } },
                    "myProfile"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/myPosts", style: { color: '#99AAB5' } },
                    "myPosts"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/myScheduledGames", style: { color: '#99AAB5' } },
                    "myScheduled Games"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/myFriends", style: { color: '#99AAB5' } },
                    "myFriends"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/logout", style: { color: '#99AAB5' } },
                    "Logout"
                  )
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "menu" },
              _react2.default.createElement(
                "div",
                { className: "title" },
                "Menu"
              ),
              _react2.default.createElement(
                "ul",
                null,
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/addScheduleGames", style: { color: '#99AAB5' } },
                    "Add Schedule Game"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/scheduledGames", style: { color: '#99AAB5' } },
                    "View Scheduled Game"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/", style: { color: '#99AAB5' } },
                    "News Feed"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "/advancedSearch", style: { color: '#99AAB5' } },
                    "Advanced Search"
                  )
                )
              )
            )
          ),
          this.state.show_top_btn && _react2.default.createElement(
            "div",
            { className: "top-btn" },
            _react2.default.createElement(
              "button",
              { className: "top", type: "button", onClick: this.moveTop },
              "Top"
            )
          )
        );
      }
    }
  }]);
  return LeftMenu;
}(_react.Component);

exports.default = LeftMenu;


var app = document.getElementById("app");

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingComp = function (_Component) {
  (0, _inherits3.default)(LoadingComp, _Component);

  function LoadingComp() {
    (0, _classCallCheck3.default)(this, LoadingComp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoadingComp.__proto__ || Object.getPrototypeOf(LoadingComp)).call(this));

    _this.state = {
      dropdown: false
    };
    return _this;
  }

  (0, _createClass3.default)(LoadingComp, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "loading-comp", className: this.props.initialData == 'loading' ? 'active' : '' },
        _react2.default.createElement(
          "div",
          { className: "loading-icon" },
          _react2.default.createElement(
            "div",
            { className: "lds-css ng-scope" },
            _react2.default.createElement(
              "div",
              { style: { width: '100%', height: '100%' }, className: "lds-pacman" },
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("div", null),
                _react2.default.createElement("div", null),
                _react2.default.createElement("div", null)
              ),
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("div", null),
                _react2.default.createElement("div", null)
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "loading-text" },
          "Loading!"
        )
      );
    }
  }]);
  return LoadingComp;
}(_react.Component);

exports.default = LoadingComp;


var app = document.getElementById("app");

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messenger = function (_Component) {
  (0, _inherits3.default)(Messenger, _Component);

  function Messenger() {
    (0, _classCallCheck3.default)(this, Messenger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

    _this.state = {
      name: "Raaz"
    };
    return _this;
  }

  (0, _createClass3.default)(Messenger, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "messenger" },
        _react2.default.createElement(
          "div",
          { className: "messenger-header" },
          _react2.default.createElement(
            "div",
            { className: "messenger-icon" },
            _react2.default.createElement("i", { className: "fas fa-user-friends" })
          ),
          _react2.default.createElement(
            "div",
            { className: "title" },
            "Chat (Coming Soon)"
          ),
          _react2.default.createElement(
            "div",
            { className: "options-icon" },
            _react2.default.createElement("i", { className: "fas fa-ellipsis-v" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "search" },
          _react2.default.createElement("input", { type: "text", placeholder: "Search" })
        ),
        _react2.default.createElement(
          "div",
          { className: "users" },
          _react2.default.createElement(
            "div",
            { className: "users-container" },
            _react2.default.createElement(
              "div",
              { className: "user" },
              _react2.default.createElement("div", {
                className: "user-img",
                style: {
                  background: 'url("https://i.ytimg.com/vi/EDzLx3hkli0/maxresdefault.jpg")',
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                  height: 30,
                  width: 30
                }
              }),
              _react2.default.createElement(
                "div",
                { className: "username" },
                "Player 1"
              ),
              _react2.default.createElement(
                "div",
                { className: "icon-chat" },
                _react2.default.createElement("i", { className: "fas fa-comment-dots" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "user" },
              _react2.default.createElement("div", {
                className: "user-img",
                style: {
                  background: 'url("https://i.ytimg.com/vi/EDzLx3hkli0/maxresdefault.jpg")',
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                  height: 30,
                  width: 30
                }
              }),
              _react2.default.createElement(
                "div",
                { className: "username" },
                "Player 2"
              ),
              _react2.default.createElement(
                "div",
                { className: "icon-chat" },
                _react2.default.createElement("i", { className: "fas fa-comment-dots" })
              )
            )
          )
        )
      );
    }
  }]);
  return Messenger;
}(_react.Component);

exports.default = Messenger;


var app = document.getElementById("app");

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualFriend = __webpack_require__(135);

var _IndividualFriend2 = _interopRequireDefault(_IndividualFriend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyFriends = function (_Component) {
  (0, _inherits3.default)(MyFriends, _Component);

  function MyFriends() {
    (0, _classCallCheck3.default)(this, MyFriends);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyFriends.__proto__ || Object.getPrototypeOf(MyFriends)).call(this));

    _this.showFriends = function () {
      if (_this.state.allMyFriends != undefined) {
        var rowLen = _this.state.allMyFriends.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            "div",
            { className: "invitation-info" },
            "No friends :("
          );
        }
        return _this.state.allMyFriends.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualFriend2.default, { friend: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(MyFriends, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getFriends = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getFriends;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/friends/allmyFriends');

                case 3:
                  _getFriends = _context.sent;

                  self.setState({
                    allMyFriends: _getFriends.data.showallMyFriends
                  });

                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getFriends() {
          return _ref.apply(this, arguments);
        };
      }();
      getFriends();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.allMyFriends !== undefined) {
        return _react2.default.createElement(
          "section",
          { id: "invitation-page" },
          _react2.default.createElement(
            "div",
            { className: "content-area invitation-page" },
            _react2.default.createElement(
              "div",
              { className: "padding-container" },
              _react2.default.createElement(
                "div",
                { className: "invitation-grey-container" },
                _react2.default.createElement(
                  "h3",
                  null,
                  "myFriends - (",
                  this.state.allMyFriends.length == 1 ? this.state.allMyFriends.length + ' friend' : this.state.allMyFriends.length + ' friends',
                  ")"
                ),
                _react2.default.createElement("div", { className: "padding-container" }),
                _react2.default.createElement(
                  "div",
                  { className: "invitation-container" },
                  this.showFriends()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area invitation-page" },
          "Loading"
        );
      }
    }
  }]);
  return MyFriends;
}(_react.Component);

exports.default = MyFriends;

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _MyComposeSection = __webpack_require__(141);

var _MyComposeSection2 = _interopRequireDefault(_MyComposeSection);

var _MyPosts = __webpack_require__(142);

var _MyPosts2 = _interopRequireDefault(_MyPosts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyHome = function (_Component) {
  (0, _inherits3.default)(MyHome, _Component);

  function MyHome() {
    (0, _classCallCheck3.default)(this, MyHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyHome.__proto__ || Object.getPrototypeOf(MyHome)).call(this));

    _this.state = {
      name: "Raaz"
    };
    return _this;
  }

  (0, _createClass3.default)(MyHome, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "content-area" },
        _react2.default.createElement(_MyComposeSection2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
        _react2.default.createElement(_MyPosts2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData })
      );
    }
  }]);
  return MyHome;
}(_react.Component);

exports.default = MyHome;

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _ScheduledGamePost = __webpack_require__(84);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region_options = [{ value: 'North America', label: 'North America' }, { value: 'Europe', label: 'Europe' }, { value: 'Asia', label: 'Asia' }, { value: 'Russia', label: 'Russia' }, { value: 'South America', label: 'South America' }, { value: 'Oceania', label: 'Oceania' }, { value: 'Middle East', label: 'Middle East' }, { value: 'Africa', label: 'Africa' }, { value: 'Central America', label: 'Central America' }, { value: '', label: 'Earth' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var platform_options = [{ value: 'Any', label: 'Any' }, { value: 'PC', label: 'PC' }, { value: 'XB', label: 'XB' }, { value: 'PS', label: 'PS' }, { value: 'Nintendo', label: 'Nintendo' }, { value: 'Mobile', label: 'Mobile' }, { value: 'Analog', label: 'Analog' }];
var date_options = [{ value: 'Now-ish', label: 'Now-ish' }, { value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }];

var MyScheduledGames = function (_Component) {
  (0, _inherits3.default)(MyScheduledGames, _Component);

  function MyScheduledGames() {
    (0, _classCallCheck3.default)(this, MyScheduledGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyScheduledGames.__proto__ || Object.getPrototypeOf(MyScheduledGames)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.handleChange_Region = function (selected_region) {
      _this.setState({ selected_region: selected_region });
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({ selected_experience: selected_experience });
    };

    _this.handleChange_Platform = function (selected_platform) {
      _this.setState({ selected_platform: selected_platform });
    };

    _this.handleChange_time = function (when) {
      _this.setState({ when: when });
    };

    _this.handleChange_game_name = function (e) {
      _this.setState({ game_name_box: e.target.value });
    };

    _this.handleChange_description = function (e) {
      _this.setState({ description_box: e.target.value });
    };

    _this.handleChange_other = function (e) {
      _this.setState({ other_box: e.target.value });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allscheduledGames != undefined) {
        if (_this.state.allscheduledGames.myScheduledGames != undefined) {
          var filteredResults = _this.state.allscheduledGames.myScheduledGames.filter(function (result) {
            var myRegion = "";
            var myExperience = "";
            var myPlatform = "";

            //**** As per bug: https://github.com/mraaz/myGame/issues/9 I have changed the filters to be single, as a result, I've commented out this code
            // Once the bug is fixed we can uncomment the code     ****

            // if (this.state.selected_region !== null && this.state.selected_region.length !== 0){
            //   for (var i = 0; i < this.state.selected_region.length; i++){
            //    myRegion += this.state.selected_region[i].value + "; "
            //   }
            //   myRegion = myRegion.trim().replace(/; /g, ",").trim()
            //   myRegion = myRegion.replace(/;/g, "")
            //   myRegion = myRegion.replace(/,/g, ", ")
            // }
            if (_this.state.selected_region != null || _this.state.selected_region != undefined) {
              myRegion = _this.state.selected_region.value;
            }
            if (_this.state.selected_experience != null || _this.state.selected_experience != undefined) {
              myExperience = _this.state.selected_experience.value;
            }
            if (_this.state.selected_platform != null || _this.state.selected_platform != undefined) {
              myPlatform = _this.state.selected_platform.value;
            }

            // if (this.state.selected_experience !== null && this.state.selected_experience.length !== 0){
            //   for (var i = 0; i < this.state.selected_experience.length; i++){
            //    myExperience += this.state.selected_experience[i].value + "; "
            //   }
            //   myExperience = myExperience.trim().replace(/; /g, ",").trim()
            //   myExperience = myExperience.replace(/;/g, "")
            //   myExperience = myExperience.replace(/,/g, ", ")
            // }
            // if (this.state.selected_platform !== null && this.state.selected_platform.length !== 0){
            //   for (var i = 0; i < this.state.selected_platform.length; i++){
            //    myPlatform += this.state.selected_platform[i].value + "; "
            //   }
            //   myPlatform = myPlatform.trim().replace(/; /g, ",").trim()
            //   myPlatform = myPlatform.replace(/;/g, "")
            //   myPlatform = myPlatform.replace(/,/g, ", ")
            // }
            if (_this.state.when != null || _this.state.when != undefined) {
              _this.state.tmp_time = _this.state.when.value;
            }
            var now = (0, _moment2.default)();
            switch (_this.state.tmp_time) {
              case 'Now-ish':
                now.add(4, 'hour');
                break;
              case '8 hours':
                now.add(8, 'hour');
                break;
              case '2 days':
                now.add(2, 'day');
                break;
              case '7 days':
                now.add(7, 'day');
                break;
              case '14 days':
                now.add(14, 'day');
                break;
              default:
                now.add(2000, 'years');
            }
            var myDate = (0, _moment2.default)(result.schedule_games.end_date_time);

            return result.schedule_games.game_name.toLowerCase().indexOf(_this.state.game_name_box.toLowerCase()) !== -1 && result.schedule_games.description.toLowerCase().indexOf(_this.state.description_box.toLowerCase()) !== -1 && result.schedule_games.other.toLowerCase().indexOf(_this.state.other_box.toLowerCase()) !== -1 && result.schedule_games.region.indexOf(myRegion) !== -1 && result.schedule_games.experience.indexOf(myExperience) !== -1 && result.schedule_games.platform.indexOf(myPlatform) !== -1 && myDate.isSameOrBefore(now);
          });
          return filteredResults.map(function (item, index) {
            var schedule_game = item.schedule_games;
            var user = item.users;

            return _react2.default.createElement(_ScheduledGamePost2.default, { schedule_game: schedule_game, key: index, user: user });
          });
        }
      }
    };

    _this.state = {
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      game_name_box: "",
      description_box: "",
      other_box: "",
      when: null,
      tmp_time: "",
      show_more_comments: true,
      pull_once: true,
      value: ""
    };
    return _this;
  }

  (0, _createClass3.default)(MyScheduledGames, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getInitialData = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var allscheduledGames;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/myScheduledGames');

                case 3:
                  allscheduledGames = _context.sent;

                  self.setState({
                    allscheduledGames: allscheduledGames.data
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getInitialData() {
          return _ref.apply(this, arguments);
        };
      }();
      getInitialData();
    }
  }, {
    key: "render",
    value: function render() {
      var selectedOption = this.state.selectedOption;

      return _react2.default.createElement(
        "section",
        { id: "posts" },
        _react2.default.createElement(
          "div",
          { className: "content-area scheduleGames-page" },
          _react2.default.createElement(
            "div",
            { className: "filterMenu" },
            _react2.default.createElement(
              "div",
              { className: "game-name" },
              _react2.default.createElement("input", { type: "text", className: "game-name-box", onChange: this.handleChange_game_name, value: this.state.game_name_box, placeholder: "Game name" })
            ),
            _react2.default.createElement(
              "div",
              { className: "region" },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Region,
                options: region_options,
                placeholder: "Select your region",
                name: "region-box",
                isClearable: true
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "experience" },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Experience,
                options: experience_options,
                placeholder: "Select experience level",
                name: "experience-box",
                isClearable: true

              })
            ),
            _react2.default.createElement(
              "div",
              { className: "date-time" },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_time,
                options: date_options,
                placeholder: "When?",
                name: "date-time-box",
                isClearable: true
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "platform" },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Platform,
                options: platform_options,
                placeholder: "Select which platform",
                name: "platform-box",
                isClearable: true
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "description" },
              _react2.default.createElement("input", { type: "text", className: "description-box", onChange: this.handleChange_description, value: this.state.description_box, placeholder: "Description" })
            ),
            _react2.default.createElement(
              "div",
              { className: "other" },
              _react2.default.createElement("input", { type: "text", className: "other-box", onChange: this.handleChange_other, value: this.state.other_box, placeholder: "Any Other stuff" })
            ),
            _react2.default.createElement(
              "div",
              { className: "button" },
              _react2.default.createElement(
                "div",
                { className: "plus-button", onClick: this.moveaway },
                _react2.default.createElement("i", { className: "fas fa-plus" })
              )
            )
          ),
          this.showLatestPosts()
        )
      );
    }
  }]);
  return MyScheduledGames;
}(_react.Component);

exports.default = MyScheduledGames;

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactToggleButton = __webpack_require__(636);

var _reactToggleButton2 = _interopRequireDefault(_reactToggleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MySettings = function (_Component) {
  (0, _inherits3.default)(MySettings, _Component);

  function MySettings() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, MySettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MySettings.__proto__ || Object.getPrototypeOf(MySettings)).call(this));

    _this.confirm_delete_exp = function () {
      if (window.confirm('Are you REALLY sure you wish to delete your Account? Once gone, its gone, we wont be able to recover this!!!')) _this.delete_exp();
    };

    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var byebyebye;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios2.default.get("/api/user/delete");

            case 3:
              byebyebye = _context.sent;
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);

              console.log(_context.t0);

            case 9:
              window.location.href = "/logout";

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 6]]);
    }));
    _this.update_email = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var post;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({
                value_email: !_this.state.value_email
              });

              _context2.prev = 1;
              _context2.next = 4;
              return _axios2.default.post('/api/settings', {
                email_notification: _this.state.value_email ? 0 : 1
              });

            case 4:
              post = _context2.sent;
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](1);

              console.log(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 7]]);
    }));

    _this.state = {
      value_email: false,
      value_password: false,
      value_delete: false
    };
    return _this;
  }

  (0, _createClass3.default)(MySettings, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getSettings = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _getSettings;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get("/api/settings");

                case 3:
                  _getSettings = _context3.sent;

                  self.setState({
                    value_email: _getSettings.data.mySettings[0].email_notification
                  });

                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getSettings() {
          return _ref3.apply(this, arguments);
        };
      }();

      getSettings();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var self = this;
      return _react2.default.createElement(
        "section",
        { id: "mySettings-page" },
        _react2.default.createElement(
          "div",
          { className: "content-area mySettings-page" },
          _react2.default.createElement(
            "div",
            { className: "padding-container" },
            _react2.default.createElement(
              "div",
              { className: "invitation-grey-container" },
              _react2.default.createElement(
                "h3",
                null,
                "mySettings"
              ),
              _react2.default.createElement("div", { className: "padding-container" }),
              _react2.default.createElement(
                "div",
                { className: "mySettings-container" },
                _react2.default.createElement(
                  "div",
                  { className: "email-notification" },
                  "Email notifications:",
                  _react2.default.createElement(
                    "div",
                    { className: "email-toggle" },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_email || false,
                      onToggle: function onToggle(value_email) {
                        _this3.update_email();
                      }
                    })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "delete-account" },
                  "Delete Account:",
                  _react2.default.createElement(
                    "div",
                    { className: "delete-toggle" },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_delete || false,
                      onToggle: function onToggle(value_delete) {
                        {
                          if (window.confirm('Are you sure you wish to delete your Account???')) _this3.confirm_delete_exp();
                        }
                      }
                    })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "change-password" },
                  "Change Password:",
                  _react2.default.createElement(
                    "div",
                    { className: "change-toggle" },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_password || false,
                      onToggle: function onToggle(value_password) {
                        window.location.href = "/changepwd";
                      }
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return MySettings;
}(_react.Component);

exports.default = MySettings;

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualNotification = __webpack_require__(138);

var _IndividualNotification2 = _interopRequireDefault(_IndividualNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notifications = function (_Component) {
  (0, _inherits3.default)(Notifications, _Component);

  function Notifications() {
    (0, _classCallCheck3.default)(this, Notifications);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).call(this));

    _this.mergeSort = function (arr) {
      if (arr.length === 1) {
        // return once we hit an array with a single item
        return arr;
      }

      var middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
      var left = arr.slice(0, middle); // items on the left side
      var right = arr.slice(middle); // items on the right side

      return this.merge(this.mergeSort(left), this.mergeSort(right));
    };

    _this.merge = function (left, right) {
      var result = [];
      var indexLeft = 0;
      var indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft].updated_at > right[indexRight].updated_at) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
      }

      return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    };

    _this.showNotifications = function () {
      if (_this.state.myNoti != undefined) {
        var rowLen = _this.state.myNoti.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            "div",
            { className: "notifications-info" },
            "No notifications"
          );
        }
        return _this.state.myNoti.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualNotification2.default, { notification: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.mark_all = function () {
      try {
        var mark_all = _axios2.default.get('/api/notifications/markAllNoti');
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };

    _this.delete_all = function () {
      try {
        var delete_all = _axios2.default.get('/api/notifications/deleteAllNoti');
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };

    _this.state = {};
    return _this;
  }

  // Split the array into halves and merge them recursively


  // compare the arrays item by item and return the concatenated result


  (0, _createClass3.default)(Notifications, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getNoti = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var getnoti, singleArr;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/notifications/getAllNoti');

                case 3:
                  getnoti = _context.sent;
                  singleArr = [].concat((0, _toConsumableArray3.default)(getnoti.data.allMylike_posts), (0, _toConsumableArray3.default)(getnoti.data.allMylike_comments), (0, _toConsumableArray3.default)(getnoti.data.allMylike_replies), (0, _toConsumableArray3.default)(getnoti.data.allMycomments), (0, _toConsumableArray3.default)(getnoti.data.allMyreplies));

                  self.setState({
                    myNoti: singleArr.length == 0 ? "" : self.mergeSort(singleArr)
                  });

                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function getNoti() {
          return _ref.apply(this, arguments);
        };
      }();
      getNoti();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.myNoti != undefined) {
        var show_buttons = false;

        if (this.state.myNoti.length > 0) {
          show_buttons = true;
        }

        return _react2.default.createElement(
          "section",
          { id: "notifications-page" },
          _react2.default.createElement(
            "div",
            { className: "content-area notifications-page" },
            _react2.default.createElement(
              "div",
              { className: "padding-container" },
              _react2.default.createElement(
                "div",
                { className: "notifications-grey-container" },
                _react2.default.createElement(
                  "h3",
                  null,
                  "myNotifications"
                ),
                show_buttons && _react2.default.createElement(
                  "div",
                  { className: "noti-buttons" },
                  _react2.default.createElement(
                    "button",
                    { className: "allread", onClick: function onClick() {
                        if (window.confirm('Are you sure you wish to Mark ALL as Read?')) _this2.mark_all();
                      } },
                    "Mark all as read"
                  ),
                  _react2.default.createElement(
                    "button",
                    { className: "deleteall", onClick: function onClick() {
                        if (window.confirm('Are you sure you wish to Delete ALL notifications?')) _this2.delete_all();
                      } },
                    "Delete All"
                  )
                ),
                _react2.default.createElement("div", { className: "padding-container" }),
                _react2.default.createElement(
                  "div",
                  { className: "notifications-container" },
                  this.showNotifications()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area notifications-page" },
          "Loading"
        );
      }
    }
  }]);
  return Notifications;
}(_react.Component);

exports.default = Notifications;

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPlayer = __webpack_require__(139);

var _IndividualPlayer2 = _interopRequireDefault(_IndividualPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerList = function (_Component) {
  (0, _inherits3.default)(PlayerList, _Component);

  function PlayerList() {
    (0, _classCallCheck3.default)(this, PlayerList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerList.__proto__ || Object.getPrototypeOf(PlayerList)).call(this));

    _this.showFriends = function () {
      if (_this.state.allMyFriends != undefined) {
        var rowLen = _this.state.allMyFriends.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            "div",
            { className: "invitation-info" },
            "No friends :("
          );
        }
        return _this.state.allMyFriends.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(IndividualFriend, { friend: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(PlayerList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;


      var getAttendees = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getAttendees;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/attendees/role_call_ALL/" + match.params.id);

                case 3:
                  _getAttendees = _context.sent;

                  self.setState({
                    allMyFriends: _getAttendees.data.role_call_ALL
                  });

                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getAttendees() {
          return _ref.apply(this, arguments);
        };
      }();
      getAttendees();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.allMyFriends !== undefined) {
        return _react2.default.createElement(
          "section",
          { id: "invitation-page" },
          _react2.default.createElement(
            "div",
            { className: "content-area invitation-page" },
            _react2.default.createElement(
              "div",
              { className: "padding-container" },
              _react2.default.createElement(
                "div",
                { className: "invitation-grey-container" },
                _react2.default.createElement(
                  "h3",
                  null,
                  this.state.allMyFriends.length == 1 ? this.state.allMyFriends.length + ' attendee' : this.state.allMyFriends.length + ' attendees',
                  ")"
                ),
                _react2.default.createElement("div", { className: "padding-container" }),
                _react2.default.createElement(
                  "div",
                  { className: "invitation-container" },
                  this.showFriends()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area invitation-page" },
          "Loading"
        );
      }
    }
  }]);
  return PlayerList;
}(_react.Component);

exports.default = PlayerList;

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualGamingExperience = __webpack_require__(136);

var _IndividualGamingExperience2 = _interopRequireDefault(_IndividualGamingExperience);

var _IndividualEsportsExperience = __webpack_require__(134);

var _IndividualEsportsExperience2 = _interopRequireDefault(_IndividualEsportsExperience);

var _FileOpenModal = __webpack_require__(416);

var _FileOpenModal2 = _interopRequireDefault(_FileOpenModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Profile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

    _this.addFriend = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var match, self, userProfile, addFriend;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              match = _this.props.routeProps.match;
              self = _this;

              if (!(_this.state.friendStatus === 2)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              if (!_this.state.friendStatus) {
                _context.next = 18;
                break;
              }

              if (!window.confirm('Are you sure you wish to unfriend?')) {
                _context.next = 16;
                break;
              }

              _context.prev = 6;
              _context.next = 9;
              return _axios2.default.get("/api/user/" + match.params.id + "/unfriend");

            case 9:
              userProfile = _context.sent;

              self.setState({
                friendTxt: "Add Friend",
                friendStatus: 0
              });
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);

              console.log(_context.t0);

            case 16:
              _context.next = 28;
              break;

            case 18:
              _context.prev = 18;
              _context.next = 21;
              return _axios2.default.post('/api/notifications/addFriend', {
                other_user_id: match.params.id
              });

            case 21:
              addFriend = _context.sent;

              self.setState({
                friendTxt: "Request Pending",
                friendStatus: 2
              });
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t1 = _context["catch"](18);

              console.log(_context.t1);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[6, 13], [18, 25]]);
    }));

    _this.showAllGamingExperiences = function () {
      if (_this.state.gameData !== undefined) {
        var rowLen = _this.state.gameData.allGameExperiences.length;
        return _this.state.gameData.allGameExperiences.map(function (item, index) {
          return _react2.default.createElement(_IndividualGamingExperience2.default, { item: item, key: index, row: index, rowLen: rowLen, routeProps: _this.props.routeProps, initialData: _this.props.initialData });
        });
      }
    };

    _this.showAllesportsExperiences = function () {
      if (_this.state.esportsExpData !== undefined) {
        var rowLen = _this.state.esportsExpData.esportsExperience.length;
        return _this.state.esportsExpData.esportsExperience.map(function (item, index) {
          return _react2.default.createElement(_IndividualEsportsExperience2.default, { item: item, key: index, row: index, rowLen: rowLen, routeProps: _this.props.routeProps, initialData: _this.props.initialData });
        });
      }
    };

    _this.clickedDropdown = function () {
      _this.setState({
        collapse: !_this.state.collapse
      });
    };

    _this.clickedDropdownesports = function () {
      _this.setState({
        collapseesports: !_this.state.collapseesports
      });
    };

    self = _this;
    _this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: "",
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false
    };

    _this.callbackFileModalClose = _this.callbackFileModalClose.bind(_this);
    _this.callbackFileModalConfirm = _this.callbackFileModalConfirm.bind(_this);

    _this.clickUpdateProfile = _this.clickUpdateProfile.bind(_this);
    _this.clickUpdateProfileBack = _this.clickUpdateProfileBack.bind(_this);

    return _this;
  }

  (0, _createClass3.default)(Profile, [{
    key: "callbackFileModalClose",
    value: function callbackFileModalClose() {
      this.setState({
        bFileModalOpen: false,
        profile_attr: ''
      });
    }
  }, {
    key: "callbackFileModalConfirm",
    value: function callbackFileModalConfirm(src) {
      var profile = this.state.userProfile;
      if (profile.hasOwnProperty(this.state.profile_attr)) {
        profile[this.state.profile_attr] = src;
      }

      this.setState({
        bFileModalOpen: false,
        profile: profile
      });

      //update user profile image

      if (this.state.profile_attr != '') {
        var data = {};
        data[this.state.profile_attr] = src;

        var url = '/api/userprofile';
        if (this.state.profile_attr == 'profile_bg') {
          url = '/api/userprofilebg';
        }
        _axios2.default.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (resp) {}).catch(function (error) {
          // handle your error
        });
      }
    }
  }, {
    key: "clickUpdateProfileBack",
    value: function clickUpdateProfileBack() {
      this.setState({
        bFileModalOpen: true,
        profile_attr: 'profile_bg'
      });
    }
  }, {
    key: "clickUpdateProfile",
    value: function clickUpdateProfile() {
      this.setState({
        bFileModalOpen: true,
        profile_attr: 'profile_img'
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var match = this.props.routeProps.match;
      var initialData = this.props.initialData;


      if (initialData != 'loading') {
        if (initialData.userInfo.id == match.params.id) {
          this.setState({ myPage: true });
        }
      }
      var getUser = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var userProfile, checkFriend;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get("/api/user/" + match.params.id);

                case 3:
                  userProfile = _context2.sent;

                  self.setState({
                    initialData: self.props.initialData,
                    userProfile: userProfile.data.user[0]
                  });

                  if (!userProfile.data.friend) {
                    _context2.next = 9;
                    break;
                  }

                  self.setState({
                    friendTxt: "Remove Friend",
                    friendStatus: 1
                  });
                  _context2.next = 13;
                  break;

                case 9:
                  _context2.next = 11;
                  return _axios2.default.get("/api/notifications/friend/" + match.params.id);

                case 11:
                  checkFriend = _context2.sent;

                  if (checkFriend.data.checkedFriend) {
                    self.setState({
                      friendTxt: "Request Pending",
                      friendStatus: 2
                    });
                  } else {
                    self.setState({
                      friendTxt: "Add Friend",
                      friendStatus: 0
                    });
                  }

                case 13:
                  _context2.next = 18;
                  break;

                case 15:
                  _context2.prev = 15;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 18:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 15]]);
        }));

        return function getUser() {
          return _ref2.apply(this, arguments);
        };
      }();
      var getGameExperiences = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var gameExperience;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get("/api/GameExperiences/" + match.params.id);

                case 3:
                  gameExperience = _context3.sent;

                  self.setState({
                    gameData: gameExperience.data
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getGameExperiences() {
          return _ref3.apply(this, arguments);
        };
      }();

      var getEsportsExperiences = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var esportsExperience;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get("/api/esports_experiences/" + match.params.id);

                case 3:
                  esportsExperience = _context4.sent;

                  self.setState({
                    esportsExpData: esportsExperience.data
                  });
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4["catch"](0);

                  console.log(_context4.t0);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 7]]);
        }));

        return function getEsportsExperiences() {
          return _ref4.apply(this, arguments);
        };
      }();

      var getEsportsBio = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var esportsBio;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.get("/api/esports_bio/show_bio/" + match.params.id);

                case 3:
                  esportsBio = _context5.sent;

                  self.setState({
                    esportsBioData: esportsBio.data
                  });
                  if (esportsBio.data.myProfile.length != 0) {
                    if (esportsBio.data.myProfile[0].games_of_ardour != "") {
                      self.setState({
                        show_bio: true
                      });
                    } else if (esportsBio.data.myProfile[0].career_highlights != "" && esportsBio.data.myProfile[0].career_highlights != null) {
                      self.setState({
                        show_bio: true
                      });
                    }
                  }
                  _context5.next = 11;
                  break;

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5["catch"](0);

                  console.log(_context5.t0);

                case 11:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 8]]);
        }));

        return function getEsportsBio() {
          return _ref5.apply(this, arguments);
        };
      }();

      getUser();
      getGameExperiences();
      getEsportsExperiences();
      getEsportsBio();
    }
  }, {
    key: "editDossier",
    value: function editDossier() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id + "/edit/dossier";
    }
  }, {
    key: "addGamingExp",
    value: function addGamingExp() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id + "/add/gamingexp";
    }
  }, {
    key: "addEsportsExp",
    value: function addEsportsExp() {
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id + "/add/esportsExp";
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.userProfile !== undefined) {
        if (this.state.esportsBioData !== undefined) {
          var _state$userProfile = this.state.userProfile,
              first_name = _state$userProfile.first_name,
              last_name = _state$userProfile.last_name,
              country = _state$userProfile.country,
              region = _state$userProfile.region,
              profile_img = _state$userProfile.profile_img,
              profile_bg = _state$userProfile.profile_bg,
              slogan = _state$userProfile.slogan,
              bio = _state$userProfile.bio,
              contact_info = _state$userProfile.contact_info;

          var games_of_ardour,
              show_ardour = false;
          var career_highlights,
              show_highlights = false;
          var show_contact_info = false;
          var show_location = false;

          if (this.state.friendStatus == 1 || this.state.myPage) {
            show_contact_info = true;
          }

          if (country != null && country.trim() != "") {
            show_location = true;
          }

          if (this.state.show_bio) {
            if (this.state.esportsBioData.myProfile[0].games_of_ardour != "" && this.state.esportsBioData.myProfile[0].games_of_ardour != undefined) {
              games_of_ardour = this.state.esportsBioData.myProfile[0].games_of_ardour;
              show_ardour = true;
            }

            if (this.state.esportsBioData.myProfile[0].career_highlights != "" && this.state.esportsBioData.myProfile[0].career_highlights != undefined) {
              career_highlights = this.state.esportsBioData.myProfile[0].career_highlights;
              show_highlights = true;
            }
          }

          return _react2.default.createElement(
            "section",
            { id: "profile-page" },
            _react2.default.createElement(_FileOpenModal2.default, {
              bOpen: this.state.bFileModalOpen,
              callbackClose: this.callbackFileModalClose,
              callbackConfirm: this.callbackFileModalConfirm
            }),
            _react2.default.createElement(
              "div",
              { className: "content-area profile-page" },
              _react2.default.createElement(
                "div",
                { className: "header-grey-container" },
                _react2.default.createElement(
                  "div",
                  { className: "top-container" },
                  _react2.default.createElement(
                    "div",
                    { className: "userbackground-img", style: {
                        backgroundImage: "url('" + profile_bg + "')"
                      } },
                    this.state.myPage && _react2.default.createElement(
                      "div",
                      { className: "header-background-uploader", onClick: function onClick() {
                          return _this3.clickUpdateProfileBack();
                        } },
                      "Update"
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "user-img-upload-container" },
                    _react2.default.createElement("div", { className: "user-img", style: {
                        backgroundImage: "url('" + profile_img + "')"
                      } }),
                    _react2.default.createElement("img", { className: "user-profile-img", src: profile_img }),
                    this.state.myPage && _react2.default.createElement(
                      "div",
                      { className: "user-img-upload", onClick: function onClick() {
                          return _this3.clickUpdateProfile();
                        } },
                      "Update "
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "bottom-container" },
                  _react2.default.createElement(
                    "div",
                    { className: "follow_btn" },
                    !this.state.myPage && _react2.default.createElement(
                      "div",
                      { className: "follow-btn", onClick: this.addFriend },
                      " ",
                      this.state.friendTxt,
                      " "
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "personal-container" },
                _react2.default.createElement(
                  "div",
                  { className: "info" },
                  _react2.default.createElement(
                    "h1",
                    null,
                    first_name + " " + last_name
                  ),
                  show_location && _react2.default.createElement(
                    "div",
                    { className: "location" },
                    _react2.default.createElement("i", { className: "fas fa-circle" }),
                    "\xA0",
                    "" + region,
                    ",\xA0",
                    "" + country
                  ),
                  this.state.myPage && _react2.default.createElement(
                    "div",
                    { className: "edit_btn" },
                    _react2.default.createElement("i", { className: "fas fa-pencil-alt", onClick: this.editDossier })
                  ),
                  _react2.default.createElement(
                    "h4",
                    null,
                    "" + slogan
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "table" },
                  _react2.default.createElement(
                    "div",
                    { className: "myBio" },
                    "" + bio
                  ),
                  show_contact_info && _react2.default.createElement(
                    "div",
                    { className: "contact-info" },
                    "" + contact_info
                  )
                )
              ),
              this.state.show_bio && _react2.default.createElement(
                "div",
                { className: "padding-container" },
                _react2.default.createElement(
                  "div",
                  { className: "esports-bio-grey-container" },
                  _react2.default.createElement(
                    "h3",
                    null,
                    " myEsports Profile"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "esports-bio-container" },
                    show_ardour && _react2.default.createElement(
                      "div",
                      { className: "esports-bio-ardour" },
                      _react2.default.createElement("i", { className: "fas fa-user-shield" }),
                      "\xA0",
                      "" + games_of_ardour
                    ),
                    show_highlights && _react2.default.createElement(
                      "div",
                      { className: "esports-bio-highlights" },
                      _react2.default.createElement("i", { className: "fas fa-crown" }),
                      "\xA0 ",
                      "" + career_highlights
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "padding-container" },
                _react2.default.createElement(
                  "div",
                  { className: "esports-experience-grey-container" },
                  _react2.default.createElement(
                    "h3",
                    null,
                    " myEsports Experience"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "add-esports-experience" },
                    this.state.myPage && _react2.default.createElement("i", { className: "fas fa-plus-circle", onClick: this.addEsportsExp })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "icon", onClick: this.clickedDropdownesports },
                    _react2.default.createElement("i", { className: "fas fa-chevron-down" })
                  ),
                  _react2.default.createElement("div", { className: "padding-container" }),
                  this.state.collapseesports && _react2.default.createElement(
                    "div",
                    { className: "esports-container" },
                    this.showAllesportsExperiences()
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "padding-container" },
                _react2.default.createElement(
                  "div",
                  { className: "game-experience-grey-container" },
                  _react2.default.createElement(
                    "h3",
                    null,
                    " myGaming Experience"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "add-gaming-experience" },
                    this.state.myPage && _react2.default.createElement("i", { className: "fas fa-plus-circle", onClick: this.addGamingExp })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "icon", onClick: this.clickedDropdown },
                    _react2.default.createElement("i", { className: "fas fa-chevron-down" })
                  ),
                  _react2.default.createElement("div", { className: "padding-container" }),
                  this.state.collapse && _react2.default.createElement(
                    "div",
                    { className: "experience-container" },
                    this.showAllGamingExperiences()
                  )
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            "div",
            { className: "content-area profile-page" },
            "Loading"
          );
        }
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area profile-page" },
          "Loading"
        );
      }
    }
  }]);
  return Profile;
}(_react.Component);

exports.default = Profile;

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _ScheduledGamePost = __webpack_require__(84);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region_options = [{ value: 'North America', label: 'North America' }, { value: 'Europe', label: 'Europe' }, { value: 'Asia', label: 'Asia' }, { value: 'Russia', label: 'Russia' }, { value: 'South America', label: 'South America' }, { value: 'Oceania', label: 'Oceania' }, { value: 'Middle East', label: 'Middle East' }, { value: 'Africa', label: 'Africa' }, { value: 'Central America', label: 'Central America' }, { value: '', label: 'Earth' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var platform_options = [{ value: 'Any', label: 'Any' }, { value: 'PC', label: 'PC' }, { value: 'XB', label: 'XB' }, { value: 'PS', label: 'PS' }, { value: 'Nintendo', label: 'Nintendo' }, { value: 'Mobile', label: 'Mobile' }, { value: 'Analog', label: 'Analog' }];
var date_options = [{ value: 'Now-ish', label: 'Now-ish' }, { value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }];
var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }];

var ScheduleGames = function (_Component) {
  (0, _inherits3.default)(ScheduleGames, _Component);

  function ScheduleGames() {
    (0, _classCallCheck3.default)(this, ScheduleGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduleGames.__proto__ || Object.getPrototypeOf(ScheduleGames)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.handleChange_Region = function (selected_region) {
      _this.setState({
        selected_region: selected_region
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({
        selected_experience: selected_experience
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Platform = function (selected_platform) {
      _this.setState({
        selected_platform: selected_platform
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_time = function (when) {
      _this.setState({
        when: when
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_game_name = function (e) {
      _this.setState({
        game_name_box: e.target.value
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_description = function (e) {
      _this.setState({
        description_box: e.target.value
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_other = function (e) {
      _this.setState({
        other_box: e.target.value
      }, function () {
        _this.pullData();
      });
    };

    _this.handleChange_Visibility = function (visibility_box) {
      _this.setState({
        visibility_box: visibility_box
      }, function () {
        _this.pullData();
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allscheduledGames != undefined) {
        // let filteredResults = this.state.allscheduledGames.filter(
        //   (result) => {
        //     var myRegion = ""
        //     var myExperience = ""
        //     var myPlatform = ""
        //
        //     //**** As per bug: https://github.com/mraaz/myGame/issues/9 I have changed the filters to be single, as a result, I've commented out this code
        //     // Once the bug is fixed we can uncomment the code     ****
        //
        //     // if (this.state.selected_region !== null && this.state.selected_region.length !== 0){
        //     //   for (var i = 0; i < this.state.selected_region.length; i++){
        //     //    myRegion += this.state.selected_region[i].value + "; "
        //     //   }
        //     //   myRegion = myRegion.trim().replace(/; /g, ",").trim()
        //     //   myRegion = myRegion.replace(/;/g, "")
        //     //   myRegion = myRegion.replace(/,/g, ", ")
        //     // }
        //     if (this.state.selected_region != null || this.state.selected_region != undefined){
        //       myRegion = this.state.selected_region.value
        //     }
        //     if (this.state.selected_experience != null || this.state.selected_experience != undefined){
        //       myExperience = this.state.selected_experience.value
        //     }
        //     if (this.state.selected_platform != null || this.state.selected_platform != undefined){
        //       myPlatform = this.state.selected_platform.value
        //     }
        //
        //     // if (this.state.selected_experience !== null && this.state.selected_experience.length !== 0){
        //     //   for (var i = 0; i < this.state.selected_experience.length; i++){
        //     //    myExperience += this.state.selected_experience[i].value + "; "
        //     //   }
        //     //   myExperience = myExperience.trim().replace(/; /g, ",").trim()
        //     //   myExperience = myExperience.replace(/;/g, "")
        //     //   myExperience = myExperience.replace(/,/g, ", ")
        //     // }
        //     // if (this.state.selected_platform !== null && this.state.selected_platform.length !== 0){
        //     //   for (var i = 0; i < this.state.selected_platform.length; i++){
        //     //    myPlatform += this.state.selected_platform[i].value + "; "
        //     //   }
        //     //   myPlatform = myPlatform.trim().replace(/; /g, ",").trim()
        //     //   myPlatform = myPlatform.replace(/;/g, "")
        //     //   myPlatform = myPlatform.replace(/,/g, ", ")
        //     // }
        //     if (this.state.when != null || this.state.when != undefined){
        //       this.state.tmp_time = this.state.when.value
        //     }
        //     const now = moment()
        //     switch(this.state.tmp_time) {
        //       case 'Now-ish':
        //         now.add(4,'hour')
        //         break
        //       case '8 hours':
        //         now.add(8,'hour')
        //         break
        //       case '2 days':
        //         now.add(2,'day')
        //         break
        //       case '7 days':
        //         now.add(7,'day')
        //         break
        //       case '14 days':
        //         now.add(14,'day')
        //         break
        //       default:
        //         now.add(2000,'years')
        //     }
        //     const myDate = moment(result.end_date_time)
        //
        //     return result.game_name.toLowerCase().indexOf(this.state.game_name_box.toLowerCase()) !== -1
        //      && result.description.toLowerCase().indexOf(this.state.description_box.toLowerCase()) !== -1
        //      && result.other.toLowerCase().indexOf(this.state.other_box.toLowerCase()) !== -1
        //      && result.region.indexOf(myRegion) !== -1
        //      && result.experience.indexOf(myExperience) !== -1
        //      && result.platform.indexOf(myPlatform) !== -1
        //      && myDate.isSameOrBefore(now)
        //   }
        // )
        return _this.state.allscheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ScheduledGamePost2.default, { schedule_game: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.state = {
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      game_name_box: "",
      description_box: "",
      other_box: "",
      visibility_box: null,
      when: null,
      tmp_time: ""
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduleGames, [{
    key: "componentWillMount",
    value: function componentWillMount() {

      var self = this;

      var myGame_name_box = "1981`^";
      var myRegion = "1981`^";
      var myExperience = "1981`^";
      var myPlatform = "1981`^";
      var myDescription_box = "1981`^";
      var myOther_box = "1981`^";
      var myWhenDate = "1981`^";
      var startDate = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss');
      var tmp_endDate = (0, _moment2.default)().utc();
      var endDate = tmp_endDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss');
      var myVisibility = 1;

      var getInitialData = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var allscheduledGames;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/ScheduleGame/filtered/" + myGame_name_box + "/" + myRegion + "/" + myExperience + "/" + myPlatform + "/" + myDescription_box + "/" + myOther_box + "/" + startDate + "/" + endDate + "/" + myWhenDate + "/" + myVisibility);

                case 3:
                  allscheduledGames = _context.sent;

                  //self.state.allscheduledGames = allscheduledGames.data.latestScheduledGames[0]
                  self.setState({
                    allscheduledGames: allscheduledGames.data.latestScheduledGames[0]
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getInitialData() {
          return _ref.apply(this, arguments);
        };
      }();
      getInitialData();
    }
  }, {
    key: "pullData",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var myGame_name_box, myRegion, myExperience, myPlatform, myDescription_box, myOther_box, myWhenDate, startDate, tmp_endDate, endDate, myVisibility, allscheduledGames;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //create SQL Statement and send it through
                //At the server end construct the statement and execute

                myGame_name_box = "1981`^";
                myRegion = "1981`^";
                myExperience = "1981`^";
                myPlatform = "1981`^";
                myDescription_box = "1981`^";
                myOther_box = "1981`^";
                myWhenDate = "1981`^";
                startDate = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss');
                tmp_endDate = (0, _moment2.default)().utc();
                myVisibility = 1;


                if (this.state.visibility_box != undefined && this.state.visibility_box != null) {
                  myVisibility = this.state.visibility_box.value;
                }

                if (this.state.selected_region != undefined && this.state.selected_region != null) {
                  myRegion = this.state.selected_region.value;
                }
                if (this.state.selected_experience != undefined && this.state.selected_experience != null) {
                  myExperience = this.state.selected_experience.value;
                }
                if (this.state.selected_platform != undefined && this.state.selected_platform != null) {
                  myPlatform = this.state.selected_platform.value;
                }

                if (!(this.state.when != undefined && this.state.when != null)) {
                  _context2.next = 32;
                  break;
                }

                _context2.t0 = this.state.when.value;
                _context2.next = _context2.t0 === 'Now-ish' ? 18 : _context2.t0 === '8 hours' ? 20 : _context2.t0 === '2 days' ? 22 : _context2.t0 === '7 days' ? 24 : _context2.t0 === '14 days' ? 26 : 28;
                break;

              case 18:
                endDate = tmp_endDate.add(4, 'hour').format('YYYY-MM-DDTHH:mm:ss');
                return _context2.abrupt("break", 29);

              case 20:
                endDate = tmp_endDate.add(8, 'hour').format('YYYY-MM-DDTHH:mm:ss');
                return _context2.abrupt("break", 29);

              case 22:
                endDate = tmp_endDate.add(2, 'day').format('YYYY-MM-DDTHH:mm:ss');
                return _context2.abrupt("break", 29);

              case 24:
                endDate = tmp_endDate.add(7, 'day').format('YYYY-MM-DDTHH:mm:ss');
                return _context2.abrupt("break", 29);

              case 26:
                endDate = tmp_endDate.add(14, 'day').format('YYYY-MM-DDTHH:mm:ss');
                return _context2.abrupt("break", 29);

              case 28:
                endDate = tmp_endDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss');

              case 29:
                myWhenDate = endDate;
                _context2.next = 33;
                break;

              case 32:
                endDate = tmp_endDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss');

              case 33:

                if (this.state.game_name_box.trim() != "" && this.state.game_name_box != undefined) {
                  myGame_name_box = this.state.game_name_box;
                }

                if (this.state.description_box != "" && this.state.description_box != undefined) {
                  myDescription_box = this.state.description_box;
                }

                if (this.state.other_box != "" && this.state.other_box != undefined) {
                  myOther_box = this.state.other_box;
                }

                _context2.prev = 36;
                _context2.next = 39;
                return _axios2.default.get("/api/ScheduleGame/filtered/" + myGame_name_box + "/" + myRegion + "/" + myExperience + "/" + myPlatform + "/" + myDescription_box + "/" + myOther_box + "/" + startDate + "/" + endDate + "/" + myWhenDate + "/" + myVisibility);

              case 39:
                allscheduledGames = _context2.sent;


                this.setState({
                  allscheduledGames: allscheduledGames.data.latestScheduledGames[0]
                });
                _context2.next = 46;
                break;

              case 43:
                _context2.prev = 43;
                _context2.t1 = _context2["catch"](36);

                console.log(_context2.t1);

              case 46:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[36, 43]]);
      }));

      function pullData() {
        return _ref2.apply(this, arguments);
      }

      return pullData;
    }()
  }, {
    key: "render",
    value: function render() {
      if (this.state.allscheduledGames !== undefined) {
        var selectedOption = this.state.selectedOption;


        return _react2.default.createElement(
          "section",
          { id: "posts" },
          _react2.default.createElement(
            "div",
            { className: "content-area scheduleGames-page" },
            _react2.default.createElement(
              "div",
              { className: "filterMenu" },
              _react2.default.createElement(
                "div",
                { className: "game-name" },
                _react2.default.createElement("input", { type: "text", className: "game-name-box", onChange: this.handleChange_game_name, value: this.state.game_name_box, placeholder: "Game name" })
              ),
              _react2.default.createElement(
                "div",
                { className: "region" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Region,
                  options: region_options,
                  placeholder: "Select your region",
                  name: "region-box",
                  isClearable: true
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "experience" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Experience,
                  options: experience_options,
                  placeholder: "Select experience level",
                  name: "experience-box",
                  isClearable: true

                })
              ),
              _react2.default.createElement(
                "div",
                { className: "date-time" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_time,
                  options: date_options,
                  placeholder: "When?",
                  name: "date-time-box",
                  isClearable: true
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "platform" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Platform,
                  options: platform_options,
                  placeholder: "Select which platform",
                  name: "platform-box",
                  isClearable: true
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "description" },
                _react2.default.createElement("input", { type: "text", className: "description-box", onChange: this.handleChange_description, value: this.state.description_box, placeholder: "Description" })
              ),
              _react2.default.createElement(
                "div",
                { className: "other" },
                _react2.default.createElement("input", { type: "text", className: "other-box", onChange: this.handleChange_other, value: this.state.other_box, placeholder: "Any Other stuff" })
              ),
              _react2.default.createElement(
                "div",
                { className: "visibility" },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Visibility,
                  options: visibility_options,
                  placeholder: "Select visibility",
                  name: "visibility-box",
                  isClearable: true
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "button" },
                _react2.default.createElement(
                  "div",
                  { className: "plus-button", onClick: this.moveaway },
                  _react2.default.createElement("i", { className: "fas fa-plus" })
                )
              )
            ),
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area scheduleGames-page" },
          "Loading"
        );
      }
    }
  }]);
  return ScheduleGames;
}(_react.Component);

exports.default = ScheduleGames;

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(40);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = __webpack_require__(344);

var _reactAutosuggest = __webpack_require__(506);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _match = __webpack_require__(396);

var _match2 = _interopRequireDefault(_match);

var _parse = __webpack_require__(397);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playersDB = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  var escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  var regex = new RegExp('\\b' + escapedValue, 'i');

  return playersDB.filter(function (person) {
    return regex.test(getSuggestionValue(person));
  });
}

function getSuggestionValue(suggestion) {
  return suggestion.first + " " + suggestion.last;
}

function renderSuggestion(suggestion, _ref) {
  var query = _ref.query;

  var suggestionText = suggestion.first + " " + suggestion.last;
  var matches = (0, _match2.default)(suggestionText, query);
  var parts = (0, _parse2.default)(suggestionText, matches);

  return _react2.default.createElement(
    "span",
    { className: "suggestion-content" },
    _react2.default.createElement("span", { className: "suggestion-user-img", style: {
        backgroundImage: "url('" + suggestion.profile_img + "')"
      } }),
    _react2.default.createElement(
      "span",
      { className: "name" },
      parts.map(function (part, index) {
        var className = part.highlight ? 'highlight' : null;

        return _react2.default.createElement(
          "span",
          { className: className, key: index },
          part.text
        );
      })
    )
  );
}

var SearchHeader = function (_Component) {
  (0, _inherits3.default)(SearchHeader, _Component);

  function SearchHeader() {
    (0, _classCallCheck3.default)(this, SearchHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchHeader.__proto__ || Object.getPrototypeOf(SearchHeader)).call(this));

    _this.redirectToInvitation = function () {
      window.location.href = '/invitation';
    };

    _this.redirectToNotifications = function () {
      window.location.href = '/notifications';
    };

    _this.onChange = function (event, _ref2) {
      var newValue = _ref2.newValue;


      if (newValue == "") {
        if (_this.timeout) clearTimeout(_this.timeout);
        playersDB = [];
        _this.setState({
          suggestions: [],
          value: ""
        });
      } else {
        _this.setState({
          value: newValue
        });
      }
    };

    _this.onSuggestionsFetchRequested = function (_ref3) {
      var value = _ref3.value;

      var self = _this;

      if (_this.timeout) clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        getPlayerInfo();
      }, 300);

      var getPlayerInfo = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getPlayerInfo;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/user/" + value + "/playerSearchResults");

                case 3:
                  _getPlayerInfo = _context.sent;

                  playersDB = _getPlayerInfo.data.playerSearchResults;
                  self.setState({
                    suggestions: getSuggestions(value)
                  });

                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function getPlayerInfo() {
          return _ref4.apply(this, arguments);
        };
      }();
    };

    _this.onSuggestionsClearRequested = function () {
      _this.setState({
        suggestions: []
      });
    };

    _this.onSuggestionSelected = function (event, _ref5) {
      var suggestion = _ref5.suggestion,
          suggestionValue = _ref5.suggestionValue,
          suggestionIndex = _ref5.suggestionIndex,
          sectionIndex = _ref5.sectionIndex,
          method = _ref5.method;

      //return <Redirect to={`/profile/${suggestion.id}`}/>
      window.location.href = "/profile/" + suggestion.id;
    };

    _this.timeout = 0;
    _this.state = {
      myFriendRequestNo: 0,
      value: '',
      suggestions: []
    };
    return _this;
  }

  (0, _createClass3.default)(SearchHeader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getFriendnoti = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getFriendnoti, myRequests, singleArr;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/notifications/myFriendRequests');

                case 3:
                  _getFriendnoti = _context2.sent;

                  self.setState({
                    myFriendRequestNo: _getFriendnoti.data.checkMyFriends[0].no_of_my_notiFriends
                  });

                  _context2.next = 7;
                  return _axios2.default.get('/api/notifications/myRequests');

                case 7:
                  myRequests = _context2.sent;
                  singleArr = [].concat((0, _toConsumableArray3.default)(myRequests.data.allMylike_posts), (0, _toConsumableArray3.default)(myRequests.data.allMylike_comments), (0, _toConsumableArray3.default)(myRequests.data.allMylike_replies), (0, _toConsumableArray3.default)(myRequests.data.allMycomments), (0, _toConsumableArray3.default)(myRequests.data.allMyreplies));

                  self.setState({
                    myRequests: singleArr.length
                  });

                  _context2.next = 15;
                  break;

                case 12:
                  _context2.prev = 12;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 15:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 12]]);
        }));

        return function getFriendnoti() {
          return _ref6.apply(this, arguments);
        };
      }();
      getFriendnoti();
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    //Timeout ensures we query the DB when the user pauses typing, not querying every stroke


    // Autosuggest will call this function every time you need to clear suggestions.

  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      // Autosuggest will pass through all these props to the input.

      var inputProps = {
        placeholder: 'Search for players',
        value: value,
        onChange: this.onChange
      };
      return _react2.default.createElement(
        "div",
        { className: "search-header" },
        _react2.default.createElement(
          "div",
          { className: "search-box" },
          _react2.default.createElement(_reactAutosuggest2.default, {
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: getSuggestionValue,
            renderSuggestion: renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected,
            inputProps: inputProps
          }),
          _react2.default.createElement(
            "div",
            { className: "icon-section" },
            _react2.default.createElement(
              "div",
              { className: "noti" },
              _react2.default.createElement("i", { className: "fas fa-bell", onClick: this.redirectToNotifications }),
              _react2.default.createElement(
                "div",
                { className: "noti-number " + (this.state.myRequests > 0 ? 'active' : '') },
                " ",
                this.state.myRequests
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "comments" },
              _react2.default.createElement("i", { className: "fas fa-comment" }),
              _react2.default.createElement(
                "div",
                { className: "noti-number" },
                "3"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "user" },
              _react2.default.createElement("i", { className: "fas fa-user", onClick: this.redirectToInvitation }),
              _react2.default.createElement(
                "div",
                { className: "noti-number " + (this.state.myFriendRequestNo > 0 ? 'active' : '') },
                " ",
                this.state.myFriendRequestNo
              )
            )
          )
        )
      );
    }
  }]);
  return SearchHeader;
}(_react.Component);

exports.default = SearchHeader;


var app = document.getElementById("app");

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SinglePost = function (_Component) {
  (0, _inherits3.default)(SinglePost, _Component);

  function SinglePost() {
    (0, _classCallCheck3.default)(this, SinglePost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SinglePost.__proto__ || Object.getPrototypeOf(SinglePost)).call(this));

    _this.showLatestPost = function () {
      if (_this.state.myPost != undefined) {
        return _this.state.myPost.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, { post: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.state = {
      myPost: []
    };
    return _this;
  }

  (0, _createClass3.default)(SinglePost, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;

      var i;
      var myLikes;

      var getPost = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myPost;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/getpost/" + match.params.id);

                case 3:
                  myPost = _context.sent;
                  i = 0;

                case 5:
                  if (!(i < myPost.data.myPost.length)) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 8;
                  return _axios2.default.get("/api/likes/" + myPost.data.myPost[i].id);

                case 8:
                  myLikes = _context.sent;

                  myPost.data.myPost[i].total = myLikes.data.number_of_likes[0].total;
                  myPost.data.myPost[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPost.data.myPost[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPost.data.myPost[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPost.data.myPost[i].admirer_first_name = "";
                    myPost.data.myPost[i].admirer_last_name = "";
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPost.data.myPost[i].do_I_like_it = true;
                  } else {
                    myPost.data.myPost[i].do_I_like_it = false;
                  }

                case 13:
                  i++;
                  _context.next = 5;
                  break;

                case 16:

                  self.setState({
                    myPost: self.state.myPost.concat(myPost.data.myPost)
                  });

                  _context.next = 22;
                  break;

                case 19:
                  _context.prev = 19;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 19]]);
        }));

        return function getPost() {
          return _ref.apply(this, arguments);
        };
      }();
      getPost();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.myPost != undefined) {
        return _react2.default.createElement(
          "section",
          { id: "posts" },
          _react2.default.createElement("div", { className: "startofSinglePage" }),
          this.showLatestPost()
        );
      } else {
        return _react2.default.createElement("section", { id: "posts" });
      }
    }
  }]);
  return SinglePost;
}(_react.Component);

exports.default = SinglePost;

var app = document.getElementById("app");

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _reactModal = __webpack_require__(51);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var UploadPic = function (_Component) {
  (0, _inherits3.default)(UploadPic, _Component);

  function UploadPic() {
    (0, _classCallCheck3.default)(this, UploadPic);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UploadPic.__proto__ || Object.getPrototypeOf(UploadPic)).call(this));

    self = _this;
    _this.state = {
      shouldCloseOnOverlayClick_: true,
      files: [],
      showModal: true
    };
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(UploadPic, [{
    key: "componentWillMount",
    value: function componentWillMount() {

      //const {match} = this.props.routeProps
      var self = this;
      console.log(this.props.routeProps);
      console.log("this.props.routeProps");
      //
      // const getUser = async function(){
      //   try{
      //     const userProfile = await axios.get(`/api/user/${match.params.id}`)
      self.setState({
        userProfile: 1
      });
      //   } catch(error){
      //     console.log(error)
      //   }
      // }
      //getUser()
    }
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setState({ showModal: false });
      var match = self.props.routeProps.match;

      window.location.href = "/profile/" + match.params.id;
    }

    // testModal = (e) => {
    //   this.setState({shouldCloseOnOverlayClick_: true})
    // }

    // submitForm = async () => {
    //   try {
    //     const post = await axios.post('/api/user',{
    //       first_name_box: this.state.first_name_box,
    //       last_name_box: this.state.last_name_box,
    //       slogan: this.state.slogan_box,
    //       bio: this.state.bio_box,
    //       country: this.state.country_,
    //       region: this.state.region_
    //     })
    //     this.handleCloseModal()
    //   } catch(error){
    //     console.log(error)
    //   }
    // }


  }, {
    key: "render",
    value: function render() {
      if (this.state.userProfile !== undefined) {
        var previewStyle = {
          display: 'inline',
          width: 100,
          height: 100
        };
        return _react2.default.createElement(
          "div",
          { className: "content-area uploadPic-page" },
          _react2.default.createElement(_reactModal2.default, {
            isOpen: this.state.showModal,
            onRequestClose: this.handleCloseModal,
            shouldCloseOnOverlayClick: true,
            className: "Modal",
            overlayClassName: "Overlay"
          })
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "content-area uploadPic-page" },
          "Loading"
        );
      }
    }
  }]);
  return UploadPic;
}(_react.Component);

exports.default = UploadPic;

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdvancedSearchPost = function (_Component) {
  (0, _inherits3.default)(AdvancedSearchPost, _Component);

  function AdvancedSearchPost() {
    (0, _classCallCheck3.default)(this, AdvancedSearchPost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AdvancedSearchPost.__proto__ || Object.getPrototypeOf(AdvancedSearchPost)).call(this));

    _this.showRating = function (rating) {
      if (rating !== undefined) {
        switch (rating) {
          case 0:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 1:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 2:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
          case 3:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
          case 4:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
          case 5:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" }),
              _react2.default.createElement("i", { className: "fas fa-star" })
            );
            break;
          default:
            return _react2.default.createElement(
              "div",
              { className: "stars" },
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" }),
              _react2.default.createElement("i", { className: "far fa-star" })
            );
            break;
        }
      }
    };

    _this.showAllTags = function (arrTags) {
      if (arrTags !== undefined) {
        return arrTags.map(function (tag, index) {
          var calcIndex = index % 4;
          switch (calcIndex) {
            case 0:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green" },
                  tag
                ),
                "\xA0"
              );
              break;
            case 1:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-blue" },
                  tag
                ),
                "\xA0"
              );
              break;
            case 2:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-red" },
                  tag
                ),
                "\xA0"
              );
              break;
            case 3:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-yellow" },
                  tag
                ),
                "\xA0"
              );
              break;
            default:
              return _react2.default.createElement(
                "div",
                { className: "tag", key: index },
                _react2.default.createElement(
                  "button",
                  { className: "btn-green" },
                  tag
                ),
                "\xA0"
              );
              break;
          }
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(AdvancedSearchPost, [{
    key: "render",
    value: function render() {
      var game_experience = this.props.game_experience;

      var show_profile_img = false;
      var arrTags = "";

      if (this.props.table) {
        var experience = false;
        var status = false;
        var ratings = false;
        var tags = false;
        var commendation = false;
        var played_converted = "Less than 1 year";

        if (game_experience.played != "" && game_experience.played != null) {
          switch (game_experience.played) {
            case 1:
              played_converted = "Less than 1 year";
              break;
            case 2:
              played_converted = "Less than 2 years";
              break;
            case 3:
              played_converted = "Less than 3 years";
              break;
            case 4:
              played_converted = "Less than 4 years";
              break;
            case 5:
              played_converted = "Less than 5 years";
              break;
            case 42:
              played_converted = "More than 5 years";
              break;
            default:
              played_converted = "Less than 1 year";
          }
        }
        if (game_experience.experience == "" || game_experience.experience == null) {
          game_experience.experience = "";
        }
        if (game_experience.status != "" && game_experience.status != null) {
          status = true;
        }
        if (game_experience.ratings != "" && game_experience.ratings != null) {
          ratings = true;
        }
        if (game_experience.commendation != "" && game_experience.commendation != null) {
          commendation = true;
        }
        if (game_experience.tags != "" && game_experience.tags != null) {
          tags = true;
          arrTags = game_experience.tags.split(',');
        }
      } else {
        var show_team_name = false;
        var show_tags = false;
        var duration_converted = "Less than 3 months";

        if (game_experience.team_name != null && game_experience.team_name != "") {
          show_team_name = true;
        }

        if (game_experience.skills != null && game_experience.skills != "") {
          arrTags = game_experience.skills.split(',');
          show_tags = true;
        }

        switch (game_experience.duration) {
          case 1:
            duration_converted = "Less than 3 months";
            break;
          case 2:
            duration_converted = "Less than 6 months";
            break;
          case 3:
            duration_converted = "Less than 1 year";
            break;
          case 4:
            duration_converted = "Less than 2 years";
            break;
          case 5:
            duration_converted = "Less than 3 years";
            break;
          case 42:
            duration_converted = "3+ years";
            break;
          default:
            duration_converted = "Less than 3 months";
        }
      }

      if (game_experience.profile_img != null) {
        show_profile_img = true;
      }

      return _react2.default.createElement(
        "div",
        { className: "gamesPosts" },
        _react2.default.createElement(
          "div",
          { className: "padding-container" },
          _react2.default.createElement(
            "div",
            { className: "grey-container" },
            this.props.table && _react2.default.createElement(
              "div",
              { className: "update-info" },
              _react2.default.createElement(
                "div",
                { className: "author-info" },
                show_profile_img && _react2.default.createElement("a", { href: "/profile/" + game_experience.user_id, className: "user-img", style: {
                    backgroundImage: "url('" + game_experience.profile_img + "')"
                  } }),
                !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + game_experience.user_id, className: "user-img", style: {
                    backgroundImage: "url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')"
                  } }),
                _react2.default.createElement(
                  "div",
                  { className: "info" },
                  _react2.default.createElement(
                    "a",
                    { href: "/profile/" + game_experience.user_id },
                    game_experience.alias
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "game-name" },
                " ",
                game_experience.game_name,
                " "
              ),
              ratings && _react2.default.createElement(
                "div",
                { className: "game-rating" },
                " ",
                this.showRating(game_experience.ratings),
                " "
              ),
              status && _react2.default.createElement(
                "div",
                { className: "game-status" },
                " ",
                _react2.default.createElement("i", { className: "fab fa-d-and-d" }),
                "\xA0",
                game_experience.status,
                " "
              ),
              _react2.default.createElement(
                "div",
                { className: "game-stuff" },
                " ",
                _react2.default.createElement("i", { className: "fas fa-gamepad" }),
                "\xA0",
                "" + played_converted,
                ", ",
                "" + game_experience.experience,
                " "
              ),
              commendation && _react2.default.createElement(
                "div",
                { className: "game-commendation" },
                " ",
                _react2.default.createElement("i", { className: "fas fa-dragon" }),
                "\xA0",
                "" + game_experience.commendation,
                "\xA0 "
              ),
              tags && _react2.default.createElement(
                "div",
                { className: "tags" },
                " ",
                this.showAllTags(arrTags),
                " "
              )
            ),
            !this.props.table && _react2.default.createElement(
              "div",
              { className: "update-info" },
              _react2.default.createElement(
                "div",
                { className: "author-info" },
                show_profile_img && _react2.default.createElement("a", { href: "/profile/" + game_experience.user_id, className: "user-img", style: {
                    backgroundImage: "url('" + game_experience.profile_img + "')"
                  } }),
                !show_profile_img && _react2.default.createElement("a", { href: "/profile/" + game_experience.user_id, className: "user-img", style: {
                    backgroundImage: "url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')"
                  } }),
                _react2.default.createElement(
                  "div",
                  { className: "info" },
                  _react2.default.createElement(
                    "a",
                    { href: "/profile/" + game_experience.user_id },
                    game_experience.alias
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "game-name" },
                " ",
                game_experience.game_name,
                " "
              ),
              _react2.default.createElement(
                "div",
                { className: "role-title" },
                " ",
                _react2.default.createElement("i", { className: "fas fa-angle-double-down" }),
                "\xA0 ",
                game_experience.role_title
              ),
              show_team_name && _react2.default.createElement(
                "div",
                { className: "team-name" },
                _react2.default.createElement("i", { className: "fas fa-users" }),
                "\xA0 ",
                game_experience.team_name
              ),
              _react2.default.createElement(
                "div",
                { className: "game-stuff" },
                _react2.default.createElement("i", { className: "fas fa-gamepad" }),
                "\xA0 ",
                "" + duration_converted
              ),
              show_tags && _react2.default.createElement(
                "div",
                { className: "tags" },
                " ",
                this.showAllTags(arrTags),
                " "
              )
            )
          )
        )
      );
    }
  }]);
  return AdvancedSearchPost;
}(_react.Component);

exports.default = AdvancedSearchPost;

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilePreview = function (_Component) {
    (0, _inherits3.default)(FilePreview, _Component);

    function FilePreview(props) {
        (0, _classCallCheck3.default)(this, FilePreview);
        return (0, _possibleConstructorReturn3.default)(this, (FilePreview.__proto__ || Object.getPrototypeOf(FilePreview)).call(this, props));
    }

    (0, _createClass3.default)(FilePreview, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "file-preview-wrap", onClick: function onClick() {
                        return _this2.props.callbackClick(_this2.props.src);
                    } },
                _react2.default.createElement("img", { src: this.props.src })
            );
        }
    }]);
    return FilePreview;
}(_react.Component);

var FileOpenModal = function (_Component2) {
    (0, _inherits3.default)(FileOpenModal, _Component2);

    function FileOpenModal() {
        (0, _classCallCheck3.default)(this, FileOpenModal);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (FileOpenModal.__proto__ || Object.getPrototypeOf(FileOpenModal)).call(this));

        _this3.state = {
            file: null,
            file_preview: '',
            preview_files: ['https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556592223564-lg.jpg', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556630834362-lg.png'],
            uploading: false,
            file_src: '',
            file_key: ''
        };

        _this3.closeModal = _this3.closeModal.bind(_this3);
        _this3.doUploadS3 = _this3.doUploadS3.bind(_this3);
        _this3.clickSave = _this3.clickSave.bind(_this3);
        return _this3;
    }

    (0, _createClass3.default)(FileOpenModal, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "closeModal",
        value: function closeModal() {
            if (this.state.uploading) {
                return;
            }

            this.props.callbackClose();

            if (this.state.file_key != '') {
                var formData = new FormData();
                formData.append('key', this.state.file_key);

                _axios2.default.post('/api/deleteFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (resp) {
                    instance.setState({
                        file_src: resp.data.Location
                    });
                }).catch(function (error) {});
            }

            this.setState({
                file_preview: '',
                file_key: '',
                file_src: ''
            });
        }
    }, {
        key: "clickSave",
        value: function clickSave() {
            if (this.state.uploading) {
                return;
            }

            this.setState({
                file_preview: '',
                file_key: '',
                file_src: ''
            });
            this.props.callbackConfirm(this.state.file_src);
        }
    }, {
        key: "doUploadS3",
        value: function doUploadS3(file) {
            var instance = this;
            this.setState({
                uploading: true
            });
            var formData = new FormData();
            formData.append('upload_file', file);
            formData.append('filename', file.name);

            _axios2.default.post('/api/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (resp) {

                instance.setState({
                    uploading: false,
                    file_src: resp.data.Location,
                    file_key: resp.data.Key
                });
            }).catch(function (error) {
                // handle your error
                instance.setState({
                    uploading: false
                });
            });
        }
    }, {
        key: "onChangeFile",
        value: function onChangeFile(event) {
            event.stopPropagation();
            event.preventDefault();

            var instance = this;
            var file = event.target.files[0];

            var reader = new FileReader();

            reader.onload = function (e) {
                instance.setState({
                    file_preview: e.target.result
                });
            };

            if (this.state.file_key != '') {
                //delete file
                var formData = new FormData();
                formData.append('key', this.state.file_key);
                _axios2.default.post('/api/deleteFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (resp) {}).catch(function (error) {});
            }
            reader.readAsDataURL(file);

            this.doUploadS3(file);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var class_modal_status = '';

            if (this.props.bOpen) {
                class_modal_status = 'modal--show';
            }

            var filepath = "https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png";
            var instance = this;
            return _react2.default.createElement(
                "div",
                { className: "modal-container " + class_modal_status },
                _react2.default.createElement(
                    "div",
                    { className: "modal-wrap" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-header" },
                        "Update Picture"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "modal-close-btn", onClick: function onClick() {
                                return _this4.closeModal();
                            } },
                        _react2.default.createElement("i", { className: "fas fa-times" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement("input", { id: "myInput",
                            type: "file",
                            ref: function ref(_ref) {
                                return _this4.ref_upload = _ref;
                            },
                            style: { display: 'none' },
                            accept: "image/*",
                            onClick: function onClick() {
                                return _this4.ref_upload.value = null;
                            },
                            onChange: this.onChangeFile.bind(this)
                        }),
                        _react2.default.createElement(
                            "div",
                            { className: "open-btn", onClick: function onClick() {
                                    return _this4.ref_upload.click();
                                } },
                            _react2.default.createElement("i", { className: "fas fa-upload" }),
                            " Upload File"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: this.state.uploading ? "uploading-container" : "uploading-container uploading--hide" },
                            _react2.default.createElement("div", { className: "uploading" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-text" },
                            "Image Preview"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: this.state.file_preview == '' ? 'upload-image-preview' : 'upload-image-preview open' },
                            _react2.default.createElement("img", { src: this.state.file_preview })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: this.state.uploading ? "save-btn btn--disable" : "save-btn", onClick: function onClick() {
                                    return _this4.clickSave();
                                } },
                            _react2.default.createElement("i", { className: "fas fa-save" }),
                            " Save"
                        )
                    )
                )
            );
        }
    }]);
    return FileOpenModal;
}(_react.Component);

exports.default = FileOpenModal;

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(374);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(385);

var _Profile2 = _interopRequireDefault(_Profile);

var _ScheduleGames = __webpack_require__(386);

var _ScheduleGames2 = _interopRequireDefault(_ScheduleGames);

var _MyScheduledGames = __webpack_require__(381);

var _MyScheduledGames2 = _interopRequireDefault(_MyScheduledGames);

var _LeftMenu = __webpack_require__(376);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(378);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(387);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _ComposeSection = __webpack_require__(133);

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

var _Posts = __webpack_require__(143);

var _Posts2 = _interopRequireDefault(_Posts);

var _LoadingComp = __webpack_require__(377);

var _LoadingComp2 = _interopRequireDefault(_LoadingComp);

var _AddScheduleGames = __webpack_require__(369);

var _AddScheduleGames2 = _interopRequireDefault(_AddScheduleGames);

var _Dossier = __webpack_require__(371);

var _Dossier2 = _interopRequireDefault(_Dossier);

var _AddGamingExp = __webpack_require__(368);

var _AddGamingExp2 = _interopRequireDefault(_AddGamingExp);

var _EditGamingExp = __webpack_require__(373);

var _EditGamingExp2 = _interopRequireDefault(_EditGamingExp);

var _IndividualPost = __webpack_require__(45);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _IndividualComment = __webpack_require__(83);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _IndividualReply = __webpack_require__(140);

var _IndividualReply2 = _interopRequireDefault(_IndividualReply);

var _MyPosts = __webpack_require__(142);

var _MyPosts2 = _interopRequireDefault(_MyPosts);

var _MyHome = __webpack_require__(380);

var _MyHome2 = _interopRequireDefault(_MyHome);

var _MyComposeSection = __webpack_require__(141);

var _MyComposeSection2 = _interopRequireDefault(_MyComposeSection);

var _Invitation = __webpack_require__(375);

var _Invitation2 = _interopRequireDefault(_Invitation);

var _IndividualInvitation = __webpack_require__(137);

var _IndividualInvitation2 = _interopRequireDefault(_IndividualInvitation);

var _MyFriends = __webpack_require__(379);

var _MyFriends2 = _interopRequireDefault(_MyFriends);

var _IndividualFriend = __webpack_require__(135);

var _IndividualFriend2 = _interopRequireDefault(_IndividualFriend);

var _ScheduledGamePost = __webpack_require__(84);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

var _MySettings = __webpack_require__(382);

var _MySettings2 = _interopRequireDefault(_MySettings);

var _IndividualGamingExperience = __webpack_require__(136);

var _IndividualGamingExperience2 = _interopRequireDefault(_IndividualGamingExperience);

var _UploadPic = __webpack_require__(389);

var _UploadPic2 = _interopRequireDefault(_UploadPic);

var _Notifications = __webpack_require__(383);

var _Notifications2 = _interopRequireDefault(_Notifications);

var _IndividualNotification = __webpack_require__(138);

var _IndividualNotification2 = _interopRequireDefault(_IndividualNotification);

var _SinglePost = __webpack_require__(388);

var _SinglePost2 = _interopRequireDefault(_SinglePost);

var _IndividualEsportsExperience = __webpack_require__(134);

var _IndividualEsportsExperience2 = _interopRequireDefault(_IndividualEsportsExperience);

var _AddEsportsExp = __webpack_require__(367);

var _AddEsportsExp2 = _interopRequireDefault(_AddEsportsExp);

var _EditEsportsExp = __webpack_require__(372);

var _EditEsportsExp2 = _interopRequireDefault(_EditEsportsExp);

var _AdvancedSearch = __webpack_require__(370);

var _AdvancedSearch2 = _interopRequireDefault(_AdvancedSearch);

var _IndividualPlayer = __webpack_require__(139);

var _IndividualPlayer2 = _interopRequireDefault(_IndividualPlayer);

var _PlayerList = __webpack_require__(384);

var _PlayerList2 = _interopRequireDefault(_PlayerList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.state = {
      name: "Raaz"
    };
    return _this;
  }

  (0, _createClass3.default)(Layout, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var getInitialData = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var initialData;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/initialApp');

                case 3:
                  initialData = _context.sent;


                  if (initialData.data.userInfo == 1981) {
                    window.location.href = "/";
                  }

                  self.setState({
                    initialData: initialData.data
                  }, function () {
                    console.log(self.state);
                  });
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function getInitialData() {
          return _ref.apply(this, arguments);
        };
      }();
      getInitialData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          "div",
          { className: "app-container home-page" },
          _react2.default.createElement(_LoadingComp2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
          _react2.default.createElement(_LeftMenu2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
          _react2.default.createElement(
            "section",
            { id: "content-container" },
            _react2.default.createElement(_SearchHeader2.default, null),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: function component(props) {
                return _react2.default.createElement(_Home2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id", component: function component(props) {
                return _react2.default.createElement(_Profile2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/myPosts/", component: function component(props) {
                return _react2.default.createElement(_MyHome2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/post/:id", component: function component(props) {
                return _react2.default.createElement(_SinglePost2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/edit/dossier", component: function component(props) {
                return _react2.default.createElement(_Dossier2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/upload/profile", component: function component(props) {
                return _react2.default.createElement(_UploadPic2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/upload/bg_profile", component: function component(props) {
                return _react2.default.createElement(_UploadPic2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/upload/img_profile", component: function component(props) {
                return _react2.default.createElement(_UploadPic2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/add/gamingexp", component: function component(props) {
                return _react2.default.createElement(_AddGamingExp2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/edit/gamingexp/:game_id", component: function component(props) {
                return _react2.default.createElement(_EditGamingExp2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/add/esportsExp", component: function component(props) {
                return _react2.default.createElement(_AddEsportsExp2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/profile/:id/edit/esportsExp/:esportsExp_id", component: function component(props) {
                return _react2.default.createElement(_EditEsportsExp2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/scheduledGames", component: function component(props) {
                return _react2.default.createElement(_ScheduleGames2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/myScheduledGames", component: function component(props) {
                return _react2.default.createElement(_MyScheduledGames2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/addScheduleGames", component: function component(props) {
                return _react2.default.createElement(_AddScheduleGames2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/invitation", component: function component(props) {
                return _react2.default.createElement(_Invitation2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/notifications", component: function component(props) {
                return _react2.default.createElement(_Notifications2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/myFriends", component: function component(props) {
                return _react2.default.createElement(_MyFriends2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/mySettings", component: function component(props) {
                return _react2.default.createElement(_MySettings2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/advancedSearch", component: function component(props) {
                return _react2.default.createElement(_AdvancedSearch2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/advancedSearch/:id/:table", component: function component(props) {
                return _react2.default.createElement(_AdvancedSearch2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/playerList/:id", component: function component(props) {
                return _react2.default.createElement(_PlayerList2.default, { routeProps: props,
                  initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
              } })
          ),
          _react2.default.createElement(_Messenger2.default, null)
        )
      );
    }
  }]);
  return Layout;
}(_react.Component);

var app = document.getElementById("app");

_reactDom2.default.render(_react2.default.createElement(Layout, null), app);

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualComment = __webpack_require__(83);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualPost = function (_Component) {
  (0, _inherits3.default)(IndividualPost, _Component);

  function IndividualPost() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IndividualPost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualPost.__proto__ || Object.getPrototypeOf(IndividualPost)).call(this));

    _this.click_like_btn = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(post_id) {
        var mylike, _this$props, post, user, addPostLike;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _axios2.default.post('/api/likes', {
                  post_id: post_id
                });

              case 3:
                mylike = _context.sent;
                _this$props = _this.props, post = _this$props.post, user = _this$props.user;

                if (_this.props != undefined) {
                  if (user.userInfo != undefined) {
                    if (post.user_id != user.userInfo.id) {
                      addPostLike = _axios2.default.post('/api/notifications/addPostLike', {
                        other_user_id: post.user_id,
                        post_id: post_id
                      });
                    }
                  }
                }
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                console.log(_context.t0);

              case 11:
                if (_this.state.total == 0) {
                  _this.setState({
                    admirer_first_name: _this.props.user.userInfo.first_name
                  });

                  _this.setState({
                    admirer_last_name: _this.props.user.userInfo.last_name
                  });
                }
                _this.setState({
                  total: _this.state.total + 1
                });

                _this.setState({
                  show_like: true
                });

                _this.setState({
                  like: !_this.state.like
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.click_unlike_btn = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(post_id) {
        var unlike, deletePostLike;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _axios2.default.get("/api/likes/delete/" + post_id);

              case 3:
                unlike = _context2.sent;
                deletePostLike = _axios2.default.get("/api/notifications/deletePostLike/" + post_id);
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);

                console.log(_context2.t0);

              case 10:

                _this.setState({
                  total: _this.state.total - 1
                });
                if (_this.state.total == 0) {
                  _this.setState({
                    show_like: false
                  });
                }

                _this.setState({
                  like: !_this.state.like
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 7]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.pullComments = function () {
      var post_id = _this.props.post.id;
      var self = _this;

      var getComments = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var myComments;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get("/api/comments/" + post_id);

                case 3:
                  myComments = _context3.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: "",
                    comment_total: myComments.data.allComments.length
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);

                  console.log(_context3.t0);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref3.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.handleChange = function (e) {
      _this.setState({ value: e.target.value });
    };

    _this.handleChange2 = function (e) {
      _this.setState({ value2: e.target.value });
    };

    _this.onChange = function () {
      var tmpState = _this.state.show_more_comments;

      if (!_this.state.show_more_comments) {
        _this.pullComments();
      }
      // this.setState({
      //   pull_once: false
      // })
      _this.setState({
        show_more_comments: !_this.state.show_more_comments
      });
      if (!tmpState) {
        _this.focusTextInput();
      }
    };

    _this.onFocus = function () {
      if (_this.state.pull_once) {
        _this.pullComments();
      }
      _this.setState({
        pull_once: false,
        show_more_comments: true
      });
    };

    _this.insert_comment = function () {
      if (_this.state.value == "") {
        return;
      }
      if (_this.state.value.trim() == "") {
        _this.setState({
          value: ""
        });
        return;
      }

      _this.onFocus();
      var self = _this;

      var saveComment = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var postComment, _self$props, post, user, addPostLike;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.post('/api/comments', {
                    content: self.state.value.trim(),
                    post_id: self.props.post.id
                  });

                case 3:
                  postComment = _context4.sent;
                  _self$props = self.props, post = _self$props.post, user = _self$props.user;

                  if (!(post.user_id != user.userInfo.id)) {
                    _context4.next = 9;
                    break;
                  }

                  _context4.next = 8;
                  return _axios2.default.post('/api/notifications/addComment', {
                    other_user_id: post.user_id,
                    post_id: self.props.post.id,
                    comment_id: postComment.data.id
                  });

                case 8:
                  addPostLike = _context4.sent;

                case 9:
                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });

                  _context4.next = 17;
                  break;

                case 14:
                  _context4.prev = 14;
                  _context4.t0 = _context4["catch"](0);

                  console.log(_context4.t0);

                case 17:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 14]]);
        }));

        return function saveComment() {
          return _ref4.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.update_post = function (e) {
      if (_this.state.value2 == "") {
        return;
      }
      if (_this.state.value2.trim() == "") {
        _this.setState({
          value: ""
        });
        return;
      }
      var self = _this;
      var post_id = _this.props.post.id;

      var editPost = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var myEditPost;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.post("/api/post/update/" + post_id, {
                    content: self.state.value2
                  });

                case 3:
                  myEditPost = _context5.sent;

                  self.setState({
                    content: self.state.value2,
                    edit_post: false,
                    value2: ""
                  });
                  _context5.next = 10;
                  break;

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5["catch"](0);

                  console.log(_context5.t0);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 7]]);
        }));

        return function editPost() {
          return _ref5.apply(this, arguments);
        };
      }();
      editPost();
    };

    _this.detectKey = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_comment();
      }
    };

    _this.detectKey2 = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Escape') {
        _this.setState({
          edit_post: false,
          value2: ""
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.update_post();
      }
    };

    _this.showComment = function () {
      if (_this.state.myComments != undefined) {
        return _this.state.myComments.map(function (item, index) {
          return _react2.default.createElement(_IndividualComment2.default, { comment: item, key: index, user: _this.props.user });
        });
      }
    };

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.clickedEdit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.setState({
                edit_post: true,
                value2: _this.state.content.trim(),
                dropdown: false
              });
              setTimeout(function () {
                //Start the timer
                this.focusTextInput2();
              }.bind(_this), 100);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this2);
    }));
    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var post_id, myPost_delete;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              post_id = _this.props.post.id;


              try {
                myPost_delete = _axios2.default.get("/api/post/delete/" + post_id);

                _this.setState({
                  post_deleted: true
                });
              } catch (error) {
                console.log(error);
              }
              _this.setState({
                dropdown: false
              });

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this2);
    }));

    _this.state = {
      like: false,
      total: 0,
      comment_total: 0,
      show_like: true,
      show_more_comments: false,
      show_profile_img: false,
      admirer_first_name: "",
      admirer_last_name: "",
      pull_once: true,
      value: "",
      value2: "",
      zero_comments: false,
      dropdown: false,
      show_post_options: false,
      post_deleted: false,
      edit_post: false,
      content: "",
      post_time: ""
    };
    _this.textInput = null;

    _this.setTextInputRef = function (element) {
      _this.textInput = element;
    };

    _this.focusTextInput = function () {
      // Focus the text input using the raw DOM API
      if (_this.textInput) _this.textInput.focus();
    };

    _this.textInput2 = null;

    _this.setTextInputRef2 = function (element) {
      _this.textInput2 = element;
    };

    _this.focusTextInput2 = function () {
      // Focus the text input using the raw DOM API
      if (_this.textInput2) _this.textInput2.focus();
    };

    return _this;
  }

  (0, _createClass3.default)(IndividualPost, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({ like: this.props.post.do_I_like_it });
      this.setState({ total: this.props.post.total });
      this.setState({ admirer_first_name: this.props.post.admirer_first_name });
      this.setState({ admirer_last_name: this.props.post.admirer_last_name });

      var post_timestamp = (0, _moment2.default)(this.props.post.updated_at, "YYYY-MM-DD HH:mm:ssZ");
      this.setState({ post_time: post_timestamp.local().fromNow() });

      if (this.props.post.total == 0) {
        this.setState({ show_like: false });
      }
      if (this.props.post.profile_img != null) {
        this.setState({ show_profile_img: true });
      }

      this.setState({
        content: this.props.post.content
      });

      if (this.props.post.no_of_comments != 0) {
        this.setState({
          zero_comments: true,
          comment_total: this.props.post.no_of_comments
        });
      }

      var post_id = this.props.post.id;
      var self = this;

      var getmyPostCount = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
          var i, myPostCount;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _axios2.default.get("/api/post/my_count/" + post_id);

                case 3:
                  myPostCount = _context8.sent;


                  if (myPostCount.data.no_of_my_posts[0].no_of_my_posts != 0) {
                    self.setState({
                      show_post_options: true
                    });
                  }
                  _context8.next = 10;
                  break;

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8["catch"](0);

                  console.log(_context8.t0);

                case 10:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 7]]);
        }));

        return function getmyPostCount() {
          return _ref8.apply(this, arguments);
        };
      }();
      getmyPostCount();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.post_deleted != true) {
        var post = this.props.post; //destructing of object

        var media_urls = [];
        if (post.type == 'photo' || post.type == 'video') {
          media_urls = JSON.parse(post.media_url);
        }

        return _react2.default.createElement(
          "div",
          { className: "update-container" },
          _react2.default.createElement(
            "div",
            { className: "padding-container" },
            _react2.default.createElement(
              "div",
              { className: "grey-container" },
              _react2.default.createElement(
                "div",
                { className: "author-info" },
                this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + post.user_id, className: "user-img", style: {
                    backgroundImage: "url('" + post.profile_img + "')"
                  } }),
                !this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + post.user_id, className: "user-img", style: {
                    backgroundImage: "url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')"
                  } }),
                _react2.default.createElement(
                  "div",
                  { className: "info" },
                  _react2.default.createElement(
                    "a",
                    { href: "/profile/" + post.user_id },
                    post.first_name + " " + post.last_name
                  ),
                  " shared a ",
                  _react2.default.createElement(
                    "a",
                    { href: "/profile/" + post.user_id },
                    post.type == 'text' ? 'story' : 'image'
                  )
                ),
                this.state.show_post_options && _react2.default.createElement(
                  "div",
                  { className: "post-options" },
                  _react2.default.createElement("i", { className: "fas fa-ellipsis-h", onClick: this.clickedDropdown })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "post-dropdown " + (this.state.dropdown ? 'active' : '') },
                  _react2.default.createElement(
                    "nav",
                    null,
                    _react2.default.createElement(
                      "div",
                      { className: "edit", onClick: this.clickedEdit },
                      "Edit \xA0"
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "delete", onClick: function onClick() {
                          if (window.confirm('Are you sure you wish to delete this post?')) _this3.delete_exp();
                        } },
                      "Delete"
                    ),
                    "\xA0"
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "media" },
                !this.state.edit_post && _react2.default.createElement(
                  "div",
                  { className: "update-info" },
                  _react2.default.createElement(
                    "p",
                    null,
                    this.state.content
                  )
                ),
                this.state.edit_post && _react2.default.createElement(
                  "div",
                  { className: "update-info" },
                  _react2.default.createElement(
                    "div",
                    { className: "compose-comment" },
                    _react2.default.createElement("textarea", {
                      name: "name2",
                      rows: 8,
                      cols: 80,
                      value: this.state.value2,
                      onChange: this.handleChange2,
                      maxLength: "254",
                      onKeyUp: this.detectKey2,
                      ref: this.setTextInputRef2
                    })
                  )
                ),
                media_urls.map(function (data, index) {
                  if (post.type == 'photo') {
                    return _react2.default.createElement("img", { className: "post-photo", src: data.src, key: data.key });
                  } else if (post.type == 'video') {
                    return _react2.default.createElement(
                      "video",
                      { className: "post-video", key: data.key, controls: true },
                      _react2.default.createElement("source", { src: data.src, key: data.key })
                    );
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "update-stats" },
                _react2.default.createElement(
                  "div",
                  { className: "icon-section" },
                  _react2.default.createElement(
                    "div",
                    { className: "like-circle" },
                    _react2.default.createElement("i", { className: "fas fa-thumbs-up" })
                  )
                ),
                this.state.show_like && _react2.default.createElement(
                  "div",
                  { className: "other-users" },
                  this.state.total > 1 ? post.admirer_first_name + " " + post.admirer_last_name + " and " + this.state.total + " others liked this update" : this.state.admirer_first_name + " " + this.state.admirer_last_name + " liked this update"
                ),
                !this.state.show_like && _react2.default.createElement(
                  "div",
                  { className: "other-users" },
                  "Be the first to like this!"
                ),
                _react2.default.createElement(
                  "div",
                  { className: "post-time" },
                  this.state.post_time
                ),
                this.state.like && _react2.default.createElement(
                  "div",
                  { className: "like-btn", onClick: function onClick() {
                      return _this3.click_unlike_btn(post.id);
                    } },
                  _react2.default.createElement("i", { className: "fas fa-thumbs-up" }),
                  "\xA0Like"
                ),
                !this.state.like && _react2.default.createElement(
                  "div",
                  { className: "like-btn", onClick: function onClick() {
                      return _this3.click_like_btn(post.id);
                    } },
                  _react2.default.createElement("i", { className: "far fa-thumbs-up" }),
                  "\xA0Like"
                ),
                this.state.zero_comments && _react2.default.createElement(
                  "div",
                  { className: "comments-stats", onClick: this.onChange },
                  " ",
                  this.state.comment_total > 1 ? this.state.comment_total + " comments" : this.state.comment_total + " comment",
                  " "
                ),
                !this.state.zero_comments && _react2.default.createElement(
                  "div",
                  { className: "comments-stats", onClick: this.focusTextInput },
                  " No comments"
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "compose-comment" },
                _react2.default.createElement("textarea", {
                  name: "name",
                  rows: 8,
                  cols: 80,
                  placeholder: "Make a comment...",
                  onFocus: this.onFocus,
                  value: this.state.value,
                  onChange: this.handleChange,
                  maxLength: "254",
                  onKeyUp: this.detectKey,
                  ref: this.setTextInputRef
                }),
                _react2.default.createElement(
                  "div",
                  { className: "buttons" },
                  _react2.default.createElement(
                    "div",
                    { className: "repost-btn", onClick: this.insert_comment },
                    _react2.default.createElement("i", { className: "fas fa-reply" })
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "comments" },
                this.state.show_more_comments && _react2.default.createElement(
                  "div",
                  { className: "show-individual-comments" },
                  this.showComment()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement("div", { className: "update-container" });
      }
    }
  }]);
  return IndividualPost;
}(_react.Component);

exports.default = IndividualPost;


var app = document.getElementById("app");

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualReply = __webpack_require__(140);

var _IndividualReply2 = _interopRequireDefault(_IndividualReply);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualComment = function (_Component) {
  (0, _inherits3.default)(IndividualComment, _Component);

  function IndividualComment() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IndividualComment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualComment.__proto__ || Object.getPrototypeOf(IndividualComment)).call(this));

    _this.pullReplies = function () {
      var comment_id = _this.props.comment.id;
      var self = _this;

      var getComments = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myCommentReplies;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/replies/" + comment_id);

                case 3:
                  myCommentReplies = _context.sent;

                  self.setState({
                    myReplies: myCommentReplies.data.this_comments_replies
                  });

                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.click_like_btn = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(comment_id) {
        var commentLike, _this$props, comment, user, addCommentLike;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _axios2.default.post('/api/likes', {
                  comment_id: comment_id
                });

              case 3:
                commentLike = _context2.sent;
                _this$props = _this.props, comment = _this$props.comment, user = _this$props.user;

                if (!(comment.user_id != user.userInfo.id)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return _axios2.default.post('/api/notifications/addCommentLike', {
                  other_user_id: comment.user_id,
                  post_id: comment.post_id,
                  comment_id: comment_id
                });

              case 8:
                addCommentLike = _context2.sent;

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);

                console.log(_context2.t0);

              case 14:

                _this.setState({
                  total: _this.state.total + 1
                });

                _this.setState({
                  show_like: true,
                  like: !_this.state.like
                });

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 11]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.click_unlike_btn = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(comment_id) {
        var comment, unlike, deleteCommentLike;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                comment = _this.props.comment;
                _context3.prev = 1;
                _context3.next = 4;
                return _axios2.default.get("/api/likes/delete/comment/" + comment_id);

              case 4:
                unlike = _context3.sent;
                _context3.next = 7;
                return _axios2.default.get("/api/notifications/deleteCommentLike/" + comment_id);

              case 7:
                deleteCommentLike = _context3.sent;
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);

                console.log(_context3.t0);

              case 13:

                if (_this.state.total == 1) {
                  _this.setState({
                    show_like: false
                  });
                }

                _this.setState({
                  total: _this.state.total - 1
                });

                _this.setState({
                  like: !_this.state.like
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[1, 10]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.handleChange = function (e) {
      _this.setState({ value: e.target.value });
    };

    _this.handleChange2 = function (e) {
      _this.setState({ value2: e.target.value });
    };

    _this.toggleReply = function () {

      _this.setState({
        show_add_reply: !_this.state.show_add_reply
      });

      if (!_this.state.show_add_reply) {
        setTimeout(function () {
          //Start the timer
          this.focusTextInput();
        }.bind(_this), 100);
      }
    };

    _this.showReplies = function () {
      if (_this.state.myReplies != undefined) {
        return _this.state.myReplies.map(function (item, index) {
          return _react2.default.createElement(_IndividualReply2.default, { reply: item, key: index, comment_user_id: _this.props.comment.user_id, post_id: _this.props.comment.post_id, user: _this.props.user });
        });
      }
    };

    _this.detectKey = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_reply();
      }
    };

    _this.detectKey2 = function (e) {

      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Escape') {
        _this.setState({
          show_edit_comment: false,
          dropdown: false,
          value2: ""
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_comment();
      }
    };

    _this.insert_comment = function () {
      if (_this.state.value2 == "") {
        return;
      }
      if (_this.state.value2.trim() == "") {
        _this.setState({
          value2: ""
        });
        return;
      }
      var self = _this;
      var comment_id = _this.props.comment.id;

      var saveComment = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var mysaveComment;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.post("/api/comments/update/" + comment_id, {
                    content: self.state.value2
                  });

                case 3:
                  mysaveComment = _context4.sent;


                  self.setState({
                    show_edit_comment: false,
                    dropdown: false,
                    content: self.state.value2,
                    value2: ""
                  });
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4["catch"](0);

                  console.log(_context4.t0);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 7]]);
        }));

        return function saveComment() {
          return _ref4.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.insert_reply = function (e) {
      if (_this.state.value == "") {
        return;
      }
      if (_this.state.value.trim() == "") {
        _this.setState({
          value: ""
        });
        return;
      }
      var self = _this;
      var postReply;

      var saveReply = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var _self$props, comment, user, addReply;

          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.post('/api/replies', {
                    content: self.state.value.trim(),
                    comment_id: self.props.comment.id
                  });

                case 3:
                  postReply = _context5.sent;
                  _self$props = self.props, comment = _self$props.comment, user = _self$props.user;

                  if (!(comment.user_id != user.userInfo.id)) {
                    _context5.next = 9;
                    break;
                  }

                  _context5.next = 8;
                  return _axios2.default.post('/api/notifications/addReply', {
                    other_user_id: comment.user_id,
                    post_id: comment.post_id,
                    reply_id: postReply.data.id
                  });

                case 8:
                  addReply = _context5.sent;

                case 9:
                  self.setState({
                    myReplies: []
                  });

                  self.pullReplies();

                  self.setState({
                    value: "",
                    show_more_replies: !self.show_more_replies,
                    show_add_reply: false,
                    reply_total: self.state.reply_total + 1,
                    show_reply: true
                  });
                  _context5.next = 17;
                  break;

                case 14:
                  _context5.prev = 14;
                  _context5.t0 = _context5["catch"](0);

                  console.log(_context5.t0);

                case 17:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 14]]);
        }));

        return function saveReply() {
          return _ref5.apply(this, arguments);
        };
      }();
      saveReply();
    };

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.clickedEdit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var comment_id, myComment_content;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              comment_id = _this.props.comment.id;
              _context6.prev = 1;
              _context6.next = 4;
              return _axios2.default.get("/api/comments/show_comment/" + comment_id);

            case 4:
              myComment_content = _context6.sent;


              _this.setState({
                show_edit_comment: true,
                dropdown: false,
                value2: myComment_content.data.this_comment[0].content
              });
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);

              console.log(_context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this2, [[1, 8]]);
    }));
    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var comment_id, myComment_delete;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              comment_id = _this.props.comment.id;


              try {
                myComment_delete = _axios2.default.get("/api/comments/delete/" + comment_id);

                _this.setState({
                  comment_deleted: true
                });
              } catch (error) {
                console.log(error);
              }
              _this.setState({
                dropdown: false
              });

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this2);
    }));

    _this.state = {
      show_like: false,
      show_reply: false,
      show_add_reply: false,
      like: false,
      show_profile_img: false,
      total: 0,
      reply_total: 0,
      reply_name_box: "",
      value: "",
      show_more_replies: true,
      dropdown: false,
      comment_deleted: false,
      show_comment_options: false,
      show_edit_comment: false,
      content: "",
      comment_time: ""
    };
    _this.textInput = null;

    _this.setTextInputRef = function (element) {
      _this.textInput = element;
    };

    _this.focusTextInput = function () {
      // Focus the text input using the raw DOM API
      if (_this.textInput) _this.textInput.focus();
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualComment, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.comment.profile_img != null) {
        this.setState({ show_profile_img: true });
      }

      this.setState({
        content: this.props.comment.content
      });

      var comment_timestamp = (0, _moment2.default)(this.props.comment.updated_at, "YYYY-MM-DD HH:mm:ssZ");
      this.setState({ comment_time: comment_timestamp.local().fromNow() });

      var self = this;
      var comment = this.props;

      var getCommentLike = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
          var i, myCommentLike;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _axios2.default.get("/api/likes/comment/" + comment.comment.id);

                case 3:
                  myCommentLike = _context8.sent;


                  if (myCommentLike.data.do_I_like_this_comment[0].myOpinion != 0) {
                    self.setState({
                      like: true
                    });
                  }
                  if (myCommentLike.data.no_of_likes[0].no_of_likes != 0) {
                    self.setState({
                      show_like: true,
                      total: myCommentLike.data.no_of_likes[0].no_of_likes
                    });
                  }
                  _context8.next = 11;
                  break;

                case 8:
                  _context8.prev = 8;
                  _context8.t0 = _context8["catch"](0);

                  console.log(_context8.t0);

                case 11:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 8]]);
        }));

        return function getCommentLike() {
          return _ref8.apply(this, arguments);
        };
      }();

      var getCommentReplies = function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
          var i, myCommentReplies;
          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return _axios2.default.get("/api/replies/" + comment.comment.id);

                case 3:
                  myCommentReplies = _context9.sent;

                  self.setState({
                    myReplies: myCommentReplies.data.this_comments_replies
                  });

                  if (myCommentReplies.data.no_of_replies[0].no_of_replies != 0) {
                    self.setState({
                      show_reply: true,
                      reply_total: myCommentReplies.data.no_of_replies[0].no_of_replies
                    });
                  }
                  _context9.next = 11;
                  break;

                case 8:
                  _context9.prev = 8;
                  _context9.t0 = _context9["catch"](0);

                  console.log(_context9.t0);

                case 11:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this, [[0, 8]]);
        }));

        return function getCommentReplies() {
          return _ref9.apply(this, arguments);
        };
      }();

      var getmyCommentCount = function () {
        var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
          var i, myCommentCount;
          return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return _axios2.default.get("/api/comments/my_count/" + comment.comment.id);

                case 3:
                  myCommentCount = _context10.sent;


                  if (myCommentCount.data.no_of_my_comments[0].no_of_my_comments != 0) {
                    self.setState({
                      show_comment_options: true
                    });
                  }
                  _context10.next = 10;
                  break;

                case 7:
                  _context10.prev = 7;
                  _context10.t0 = _context10["catch"](0);

                  console.log(_context10.t0);

                case 10:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[0, 7]]);
        }));

        return function getmyCommentCount() {
          return _ref10.apply(this, arguments);
        };
      }();
      getCommentLike();
      getCommentReplies();
      getmyCommentCount();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var comment = this.props.comment;
      //console.log(comment);

      if (this.state.comment_deleted != true) {
        return _react2.default.createElement(
          "div",
          { className: "individual-comment-container" },
          _react2.default.createElement(
            "div",
            { className: "author-info" },
            this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + comment.user_id, className: "user-img", style: {
                backgroundImage: "url('" + comment.profile_img + "')" } }),
            !this.state.show_profile_img && _react2.default.createElement("a", { href: "/profile/" + comment.user_id, className: "user-img", style: {
                backgroundImage: "url('https://image.flaticon.com/icons/svg/149/149071.svg')"
              } }),
            _react2.default.createElement(
              "div",
              { className: "comment-info" },
              _react2.default.createElement(
                "a",
                { href: "/profile/" + comment.user_id },
                comment.first_name + " " + comment.last_name
              )
            ),
            this.state.show_comment_options && _react2.default.createElement(
              "div",
              { className: "comment-options" },
              _react2.default.createElement("i", { className: "fas fa-ellipsis-h", onClick: this.clickedDropdown })
            ),
            _react2.default.createElement(
              "div",
              { className: "dropdown " + (this.state.dropdown ? 'active' : '') },
              _react2.default.createElement(
                "nav",
                null,
                _react2.default.createElement(
                  "div",
                  { className: "edit", onClick: this.clickedEdit },
                  "Edit \xA0"
                ),
                _react2.default.createElement(
                  "div",
                  { className: "delete", onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to delete this comment?')) _this3.delete_exp();
                    } },
                  "Delete"
                ),
                "\xA0"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "comment-content" },
            _react2.default.createElement(
              "p",
              null,
              this.state.content
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "comment-panel" },
            this.state.like && _react2.default.createElement(
              "div",
              { className: "comment-panel-liked", onClick: function onClick() {
                  return _this3.click_unlike_btn(comment.id);
                } },
              "Like"
            ),
            !this.state.like && _react2.default.createElement(
              "div",
              { className: "comment-panel-like", onClick: function onClick() {
                  return _this3.click_like_btn(comment.id);
                } },
              "Like"
            ),
            _react2.default.createElement(
              "div",
              { className: "comment-panel-reply", onClick: this.toggleReply },
              "Reply"
            ),
            (this.state.show_like || this.state.show_reply) && _react2.default.createElement(
              "div",
              { className: "divider" },
              "|"
            ),
            this.state.show_like && _react2.default.createElement(
              "div",
              { className: "no-likes" },
              this.state.total,
              " ",
              this.state.total > 1 ? "Likes" : "Like",
              " "
            ),
            this.state.show_reply && this.state.show_like && _react2.default.createElement(
              "div",
              { className: "colon" },
              ":"
            ),
            this.state.show_reply && _react2.default.createElement(
              "div",
              { className: "no-reply" },
              " ",
              this.state.reply_total,
              " ",
              this.state.reply_total > 1 ? "Replies" : "Reply"
            ),
            _react2.default.createElement(
              "div",
              { className: "comment-time" },
              _react2.default.createElement("i", { className: "fas fa-circle" }),
              " ",
              this.state.comment_time
            )
          ),
          this.state.show_more_replies && this.showReplies(),
          this.state.show_add_reply && _react2.default.createElement(
            "div",
            { className: "add-reply" },
            _react2.default.createElement("input", { type: "text", id: "reply_name_box", className: "reply-name-box", placeholder: "Add a reply...", onKeyUp: this.detectKey, ref: this.setTextInputRef, onChange: this.handleChange, value: this.state.value })
          ),
          this.state.show_edit_comment && _react2.default.createElement(
            "div",
            { className: "add-reply" },
            _react2.default.createElement("input", { type: "text", id: "reply_name_box", className: "reply-name-box", onKeyUp: this.detectKey2, ref: this.setTextInputRef, onChange: this.handleChange2, value: this.state.value2 })
          )
        );
      } else {
        return _react2.default.createElement("div", { className: "individual-comment-container" });
      }
    }
  }]);
  return IndividualComment;
}(_react.Component);

exports.default = IndividualComment;


var app = document.getElementById("app");

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(14);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(18);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _IndividualComment = __webpack_require__(83);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduledGamePost = function (_Component) {
  (0, _inherits3.default)(ScheduledGamePost, _Component);

  function ScheduledGamePost() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduledGamePost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamePost.__proto__ || Object.getPrototypeOf(ScheduledGamePost)).call(this));

    _this.detectKey = function (e) {
      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_comment();
      }
    };

    _this.handleChange = function (e) {
      _this.setState({ value: e.target.value });
    };

    _this.onChange = function () {
      var tmpState = _this.state.show_more_comments;

      if (!_this.state.show_more_comments) {
        _this.pullComments();
      }
      // this.setState({
      //   pull_once: false
      // })
      _this.setState({
        show_more_comments: !_this.state.show_more_comments
      });
      if (!tmpState) {
        _this.focusTextInput();
      }
    };

    _this.onFocus = function () {
      if (_this.state.pull_once) {
        _this.pullComments();
      }
      _this.setState({
        pull_once: false,
        show_more_comments: true
      });
    };

    _this.pullComments = function () {
      var self = _this;
      var schedule_game = _this.props.schedule_game;


      var getComments = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myComments;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get("/api/comments/scheduled_games/" + schedule_game.id);

                case 3:
                  myComments = _context.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: "",
                    comment_total: myComments.data.allComments.length
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.showComment = function () {
      if (_this.state.myComments != undefined) {
        return _this.state.myComments.map(function (item, index) {
          return _react2.default.createElement(_IndividualComment2.default, { comment: item, key: index, user: _this.props.user });
        });
      }
    };

    _this.insert_comment = function () {

      if (_this.state.value == "") {
        return;
      }
      if (_this.state.value.trim() == "") {
        _this.setState({
          value: ""
        });
        return;
      }

      _this.onFocus();
      var schedule_game = _this.props.schedule_game;


      var self = _this;

      var saveComment = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var postComment;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.post('/api/comments', {
                    content: self.state.value.trim(),
                    schedule_games_id: schedule_game.id
                  });

                case 3:
                  postComment = _context2.sent;

                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });

                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 9]]);
        }));

        return function saveComment() {
          return _ref2.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.delete_sch = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
        var mysch;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _axios2.default.get("/api/ScheduleGame/delete/" + id);

              case 3:
                mysch = _context3.sent;

                location.reload();
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                console.log(_context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[0, 7]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.enrollinGame = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var getNumberofAttendees, savemySpot;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _axios2.default.get("/api/attendees/attending/" + _this.props.schedule_game.id);

            case 3:
              getNumberofAttendees = _context4.sent;

              if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < _this.props.schedule_game.limit) {
                savemySpot = _axios2.default.post('/api/attendees/savemySpot', {
                  schedule_games_id: _this.props.schedule_game.id
                });

                _this.setState({ show_invite: false,
                  show_attending: true,
                  show_full: false
                });
              } else {
                window.alert("Sorry mate, the game got filled up! You're NOT in!");
                _this.setState({ show_invite: false,
                  show_attending: false,
                  show_full: true
                });
              }
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);

              console.log(_context4.t0);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[0, 7]]);
    }));

    _this.disenrollinGame = function () {
      try {
        var getNumberofAttendees = _axios2.default.get("/api/attendees/removeattending/" + _this.props.schedule_game.id);
        _this.setState({ show_invite: true,
          show_attending: false,
          show_full: false
        });
      } catch (error) {
        console.log(error);
      }
    };

    _this.redirect_link = function () {
      window.location.href = "/playerList/" + _this.props.schedule_game.id;
    };

    _this.state = {
      show_more_comments: false,
      pull_once: true,
      value: "",
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: false,
      show_full: false,
      show_attending: false,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: []
    };

    _this.textInput = null;

    _this.setTextInputRef = function (element) {
      _this.textInput = element;
    };

    _this.focusTextInput = function () {
      // Focus the text input using the raw DOM API
      if (_this.textInput) _this.textInput.focus();
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduledGamePost, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      var schedule_game = this.props.schedule_game;


      var getCommentsCount = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var myCommentsCount;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.get("/api/comments/scheduled_gamesCount/" + schedule_game.id);

                case 3:
                  myCommentsCount = _context5.sent;

                  if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
                    self.setState({
                      zero_comments: true,
                      comment_total: myCommentsCount.data.no_of_comments[0].no_of_comments
                    });
                  }
                  _context5.next = 10;
                  break;

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5["catch"](0);

                  console.log(_context5.t0);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 7]]);
        }));

        return function getCommentsCount() {
          return _ref5.apply(this, arguments);
        };
      }();

      var checkWhosPost = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var _checkWhosPost;

          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get("/api/myScheduledGamesCount/" + schedule_game.id);

                case 3:
                  _checkWhosPost = _context6.sent;

                  if (_checkWhosPost.data.myScheduledGamesCount[0].no_of_my_posts != 0) {
                    self.setState({
                      myPost: true
                    });
                  }
                  _context6.next = 10;
                  break;

                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6["catch"](0);

                  console.log(_context6.t0);

                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 7]]);
        }));

        return function checkWhosPost() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getNumberofAttendees = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var _getNumberofAttendees, getwhoisAttending, i, getifimAttending, _getifimAttending;

          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;

                  if (!(schedule_game.limit != 42)) {
                    _context7.next = 38;
                    break;
                  }

                  self.state.show_attendees = true;
                  _context7.next = 5;
                  return _axios2.default.get("/api/attendees/attending/" + schedule_game.id);

                case 5:
                  _getNumberofAttendees = _context7.sent;

                  if (!(_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0)) {
                    _context7.next = 32;
                    break;
                  }

                  self.setState({
                    attendees_count: _getNumberofAttendees.data.allAttendees[0].no_of_allAttendees
                  });

                  _context7.next = 10;
                  return _axios2.default.get("/api/attendees/role_call/" + schedule_game.id);

                case 10:
                  getwhoisAttending = _context7.sent;
                  i = 0;

                case 12:
                  if (!(i < getwhoisAttending.data.role_call.length)) {
                    _context7.next = 32;
                    break;
                  }

                  _context7.t0 = i;
                  _context7.next = _context7.t0 === 0 ? 16 : _context7.t0 === 1 ? 18 : _context7.t0 === 2 ? 20 : _context7.t0 === 3 ? 22 : _context7.t0 === 4 ? 24 : _context7.t0 === 5 ? 26 : 28;
                  break;

                case 16:
                  //self.setState({show_one_profile: true})
                  self.state.show_one_profile = true;
                  return _context7.abrupt("break", 28);

                case 18:
                  self.state.show_two_profile = true;
                  return _context7.abrupt("break", 28);

                case 20:
                  self.state.show_three_profile = true;
                  return _context7.abrupt("break", 28);

                case 22:
                  self.state.show_four_profile = true;
                  return _context7.abrupt("break", 28);

                case 24:
                  self.state.show_five_profile = true;
                  return _context7.abrupt("break", 28);

                case 26:
                  self.state.show_more_profile = true;
                  return _context7.abrupt("break", 28);

                case 28:
                  self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i]);

                case 29:
                  i++;
                  _context7.next = 12;
                  break;

                case 32:
                  _context7.next = 34;
                  return _axios2.default.get("/api/attendees/myattendance/" + schedule_game.id);

                case 34:
                  getifimAttending = _context7.sent;

                  if (getifimAttending.data.myattendance[0].no_of_myAttendance == 0) {
                    if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < schedule_game.limit) {
                      self.setState({
                        show_invite: true,
                        show_attending: false,
                        show_full: false
                      });
                    } else {
                      self.setState({
                        show_attending: false,
                        show_invite: false,
                        show_full: true
                      });
                    }
                  } else {
                    self.setState({
                      show_invite: false,
                      show_attending: true,
                      show_full: false
                    });
                  }
                  _context7.next = 48;
                  break;

                case 38:
                  _context7.prev = 38;
                  _context7.next = 41;
                  return _axios2.default.get("/api/attendees/myattendance/" + schedule_game.id);

                case 41:
                  _getifimAttending = _context7.sent;

                  if (_getifimAttending.data.myattendance[0].no_of_myAttendance != 0) {
                    self.setState({
                      show_attending: true,
                      show_invite: false,
                      show_full: false
                    });
                  } else {
                    self.setState({
                      show_attending: false,
                      show_invite: true,
                      show_full: false
                    });
                  }

                  _context7.next = 48;
                  break;

                case 45:
                  _context7.prev = 45;
                  _context7.t1 = _context7["catch"](38);

                  console.log(_context7.t1);

                case 48:
                  _context7.next = 53;
                  break;

                case 50:
                  _context7.prev = 50;
                  _context7.t2 = _context7["catch"](0);

                  console.log(_context7.t2);

                case 53:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 50], [38, 45]]);
        }));

        return function getNumberofAttendees() {
          return _ref7.apply(this, arguments);
        };
      }();

      getCommentsCount();
      checkWhosPost();
      getNumberofAttendees();
    }

    // update_post = (e) => {
    //   if (this.state.value2 == ""){
    //     return
    //   }
    //   if (this.state.value2.trim() == ""){
    //     this.setState({
    //        value: "",
    //     })
    //     return
    //   }
    //   const self = this
    //   const { schedule_game } = this.props
    //
    //   const editPost = async function(){
    //     try{
    //       const myEditPost = await axios.post(`/api/post/update/${schedule_game.id}`,{
    //         content: self.state.value
    //       })
    //       self.setState({
    //         content: self.state.value2,
    //         edit_post: false,
    //         value2: ""
    //       })
    //     } catch(error){
    //      console.log(error)
    //     }
    //   }
    //   editPost()
    // }

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var schedule_game = this.props.schedule_game;

      var region = false;
      var experience = false;
      var platform = false;
      var description = false;
      var other = false;
      var visibility = "Public";

      if (schedule_game.region != "" && schedule_game.region != null) {
        region = true;
      }
      if (schedule_game.experience != "" && schedule_game.experience != null) {
        experience = true;
      }
      if (schedule_game.platform != "" && schedule_game.platform != null) {
        platform = true;
      }
      if (schedule_game.description != "" && schedule_game.description != null) {
        description = true;
      }
      if (schedule_game.other != "" && schedule_game.other != null) {
        other = true;
      }

      switch (schedule_game.visibility) {
        case 1:
          visibility = "Public";
          break;
        case 2:
          visibility = "Friends";
          break;
        case 3:
          visibility = "Group";
          break;
        case 4:
          visibility = "Hidden";
          break;
      }

      var myStartDateTime = (0, _moment2.default)(schedule_game.start_date_time, "YYYY-MM-DD HH:mm:ssZ").local();
      var myEndDateTime = (0, _moment2.default)(schedule_game.end_date_time, "YYYY-MM-DD HH:mm:ssZ").local();

      return _react2.default.createElement(
        "div",
        { className: "gamesPosts" },
        _react2.default.createElement(
          "div",
          { className: "padding-container" },
          _react2.default.createElement(
            "div",
            { className: "grey-container" },
            _react2.default.createElement(
              "div",
              { className: "update-info" },
              _react2.default.createElement(
                "div",
                { className: "game-name-display" },
                _react2.default.createElement(
                  "h3",
                  null,
                  " ",
                  schedule_game.game_name,
                  " "
                ),
                _react2.default.createElement(
                  "div",
                  { className: "comments-stats" },
                  this.state.zero_comments && _react2.default.createElement(
                    "div",
                    { className: "comments-statz", onClick: this.onChange },
                    " ",
                    this.state.comment_total > 1 ? this.state.comment_total + " comments" : this.state.comment_total + " comment",
                    " "
                  ),
                  !this.state.zero_comments && _react2.default.createElement(
                    "div",
                    { className: "comments-statz", onClick: this.focusTextInput },
                    " No comments"
                  )
                ),
                !this.state.myPost && _react2.default.createElement(
                  "h6",
                  null,
                  " Posted by ",
                  schedule_game.alias
                ),
                this.state.myPost && _react2.default.createElement(
                  "div",
                  { className: "delete-icon", onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to delete this Schedule?')) _this3.delete_sch(schedule_game.id);
                    } },
                  _react2.default.createElement("i", { className: "fas fa-trash-alt" })
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                region && _react2.default.createElement(
                  "div",
                  null,
                  " Region/s: ",
                  schedule_game.region,
                  " "
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                "Start Time: ",
                myStartDateTime.format('Do MMM YY, h:mm a')
              ),
              _react2.default.createElement(
                "p",
                null,
                "End Time: ",
                myEndDateTime.format('Do MMM YY, h:mm a')
              ),
              _react2.default.createElement(
                "p",
                null,
                experience && _react2.default.createElement(
                  "div",
                  null,
                  " Experience: ",
                  schedule_game.experience,
                  " "
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                platform && _react2.default.createElement(
                  "div",
                  null,
                  " Platform: ",
                  schedule_game.platform,
                  " "
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                description && _react2.default.createElement(
                  "div",
                  null,
                  " Description: ",
                  schedule_game.description,
                  " "
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                other && _react2.default.createElement(
                  "div",
                  null,
                  " Other: ",
                  schedule_game.other,
                  " "
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "div",
                  null,
                  " Visibility: ",
                  visibility,
                  " "
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "invitation-panel" },
              this.state.show_invite && _react2.default.createElement(
                "div",
                { className: "invitation-link" },
                _react2.default.createElement(
                  "div",
                  { className: "hack-text", onClick: function onClick() {
                      return _this3.enrollinGame();
                    } },
                  _react2.default.createElement("i", { className: "fas fa-dungeon" }),
                  "\xA0Count me in!"
                )
              ),
              this.state.show_full && _react2.default.createElement(
                "div",
                { className: "invitation-link" },
                _react2.default.createElement(
                  "div",
                  { className: "hack-text2" },
                  _react2.default.createElement("i", { className: "fas fa-door-closed" }),
                  "\xA0Sorry it's Full :("
                )
              ),
              this.state.show_attending && _react2.default.createElement(
                "div",
                { className: "invitation-link" },
                _react2.default.createElement(
                  "div",
                  { className: "hack-text3", onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                    } },
                  _react2.default.createElement("i", { className: "fas fa-door-closed" }),
                  "\xA0Bail out"
                )
              ),
              this.state.show_one_profile && _react2.default.createElement(
                "div",
                { className: "attendees-one" },
                _react2.default.createElement("a", { href: "/profile/" + this.state.attendees_profiles[0].user_id, className: "user-img", style: {
                    backgroundImage: "url('" + this.state.attendees_profiles[0].profile_img + "')"
                  } })
              ),
              this.state.show_two_profile && _react2.default.createElement(
                "div",
                { className: "attendees-two" },
                _react2.default.createElement("a", { href: "/profile/" + this.state.attendees_profiles[1].user_id, className: "user-img", style: {
                    backgroundImage: "url('" + this.state.attendees_profiles[1].profile_img + "')"
                  } })
              ),
              this.state.show_three_profile && _react2.default.createElement(
                "div",
                { className: "attendees-three" },
                _react2.default.createElement("a", { href: "/profile/" + this.state.attendees_profiles[2].user_id, className: "user-img", style: {
                    backgroundImage: "url('" + this.state.attendees_profiles[2].profile_img + "')"
                  } })
              ),
              this.state.show_four_profile && _react2.default.createElement(
                "div",
                { className: "attendees-four" },
                _react2.default.createElement("a", { href: "/profile/" + this.state.attendees_profiles[3].user_id, className: "user-img", style: {
                    backgroundImage: "url('" + this.state.attendees_profiles[3].profile_img + "')"
                  } })
              ),
              this.state.show_five_profile && _react2.default.createElement(
                "div",
                { className: "attendees-five" },
                _react2.default.createElement("a", { href: "/profile/" + this.state.attendees_profiles[4].user_id, className: "user-img", style: {
                    backgroundImage: "url('" + this.state.attendees_profiles[4].profile_img + "')"
                  } })
              ),
              this.state.show_more_profile && _react2.default.createElement(
                "div",
                { className: "attendees-more" },
                _react2.default.createElement(
                  "div",
                  { className: "user-img", onClick: this.redirect_link, style: {
                      backgroundImage: "url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png')"
                    } },
                  " "
                )
              ),
              this.state.show_attendees && _react2.default.createElement(
                "div",
                { className: "attendees-count" },
                this.state.attendees_count,
                " out of ",
                schedule_game.limit
              ),
              !this.state.show_attendees && _react2.default.createElement(
                "div",
                { className: "attendees-count" },
                "Unlimited"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "compose-comment" },
              _react2.default.createElement("textarea", {
                name: "name",
                rows: 8,
                cols: 80,
                placeholder: "Write a comment...",
                value: this.state.value,
                onChange: this.handleChange,
                maxLength: "254",
                onKeyUp: this.detectKey,
                ref: this.setTextInputRef,
                onFocus: this.onFocus
              }),
              _react2.default.createElement(
                "div",
                { className: "buttons" },
                _react2.default.createElement(
                  "div",
                  { className: "repost-btn", onClick: this.insert_comment },
                  _react2.default.createElement("i", { className: "fas fa-reply" }),
                  " "
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "comments" },
              this.state.show_more_comments && _react2.default.createElement(
                "div",
                { className: "show-individual-comments" },
                this.showComment()
              )
            )
          )
        )
      );
    }
  }]);
  return ScheduledGamePost;
}(_react.Component);

exports.default = ScheduledGamePost;

/***/ })

},[417]);