webpackJsonp([0],{

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(41);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _PostFileModal = __webpack_require__(165);

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

                return _context.abrupt('return');

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
                _context.t0 = _context['catch'](5);

                console.log(_context.t0);

              case 17:
              case 'end':
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
              if (!(_this.state.post_content.trim() == '')) {
                _context2.next = 3;
                break;
              }

              _this.setState({
                post_content: ''
              });
              return _context2.abrupt('return');

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
                post_content: ''
              });
              _this.forceUpdate();
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2['catch'](3);

              console.log(_context2.t0);

            case 17:
            case 'end':
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
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
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
                  return _axios2.default.get('/api/mypost/' + self.state.myDate);

                case 3:
                  myPosts = _context3.sent;
                  i = 0;

                case 5:
                  if (!(i < myPosts.data.myPosts.length)) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 8;
                  return _axios2.default.get('/api/likes/' + myPosts.data.myPosts[i].id);

                case 8:
                  myLikes = _context3.sent;

                  myPosts.data.myPosts[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts[i].admirer_first_name = '';
                    myPosts.data.myPosts[i].admirer_last_name = '';
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
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 22:
                case 'end':
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
          value2: ''
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
      profile_img: '',
      post_content: '',
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
    key: 'callbackPostFileModalClose',
    value: function callbackPostFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: 'openPhotoPost',
    value: function openPhotoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'photo'
      });
    }
  }, {
    key: 'openVideoPost',
    value: function openVideoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'video'
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'section',
        { className: 'compose-area' },
        _react2.default.createElement(
          'div',
          { className: 'compose-section' },
          _react2.default.createElement('textarea', {
            rows: 8,
            cols: 80,
            defaultValue: '',
            onChange: this.handleChange_txtArea,
            value: this.state.post_content,
            onKeyUp: this.detectKey,
            maxLength: '254',
            placeholder: 'What\'s up...'
          }),
          _react2.default.createElement('div', { className: 'user-img' }),
          _react2.default.createElement(_reactRouterDom.Link, {
            to: '/profile/' + this.state.user_id,
            className: 'user-img',
            style: {
              backgroundImage: 'url(\'' + this.state.profile_img + '\')'
            } }),
          _react2.default.createElement(_PostFileModal2.default, {
            bOpen: this.state.bFileModalOpen,
            fileType: this.state.fileType,
            callbackClose: this.callbackPostFileModalClose,
            callbackConfirm: this.callbackPostFileModalConfirm }),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(
              'div',
              {
                className: ' button photo-btn',
                onClick: function onClick() {
                  return _this3.openPhotoPost();
                } },
              _react2.default.createElement('i', { className: 'far fa-images' })
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'button video-btn',
                onClick: function onClick() {
                  return _this3.openVideoPost();
                } },
              _react2.default.createElement('i', { className: 'far fa-play-circle' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button send-btn', onClick: this.submitForm },
              _react2.default.createElement('i', { className: 'far fa-paper-plane' })
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { id: 'posts' },
          this.state.show_post && this.showLatestPosts()
        )
      );
    }
  }]);
  return ComposeSection;
}(_react.Component);

exports.default = ComposeSection;


var app = document.getElementById('app');

/***/ }),

/***/ 146:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

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
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 1:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-blue', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 2:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-red', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 3:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-yellow', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            default:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
          }
        });
      }
    };

    _this.edit_lnk = function (id) {
      _this.state.tmp_id = id;
      _this.setState({ redirect_esportsExp: true });
    };

    _this.state = {
      myPage: false,
      redirect_esportsExp: false,
      redirect_advancedSearch: false,
      tmp_id: ''
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualEsportsExperience, [{
    key: 'componentWillMount',
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
    key: 'find_tag',
    value: function find_tag(tag) {
      this.state.tmp_id = tag;
      this.setState({ redirect_advancedSearch: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_esportsExp) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id + '/edit/esportsExp/' + this.state.tmp_id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      if (this.state.redirect_advancedSearch) {
        var tmp = '/advancedSearch/' + this.state.tmp_id + '/Esports Experience';
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

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


      var arrTags = '';
      var show_team_name = false;
      var show_achievements = false;
      var show_tags = false;
      var duration_converted = 'Less than 3 months';
      var show_fix = false;

      if (achievements != null && achievements != '') {
        show_achievements = true;
      }

      if (team_name != null && team_name != '') {
        show_team_name = true;
      }

      if (skills != null && skills != '') {
        arrTags = skills.split(',');
        show_tags = true;
      }
      if (show_tags == false && show_team_name == true && show_achievements == false) {
        show_fix = true;
      }

      switch (duration) {
        case 1:
          duration_converted = 'Less than 3 months';
          break;
        case 2:
          duration_converted = 'Less than 6 months';
          break;
        case 3:
          duration_converted = 'Less than 1 year';
          break;
        case 4:
          duration_converted = 'Less than 2 years';
          break;
        case 5:
          duration_converted = 'Less than 3 years';
          break;
        case 42:
          duration_converted = '3+ years';
          break;
        default:
          duration_converted = 'Less than 3 months';
      }

      if (rowLen === row + 1) {
        show_lines = false; //Show lines for all entries expect for the very last one
      }
      return _react2.default.createElement(
        'div',
        { className: 'game-info' },
        _react2.default.createElement(
          'div',
          { className: 'game-name' },
          '' + game_name
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-infos' },
          this.state.myPage && _react2.default.createElement('i', { className: 'fas fa-pen', onClick: function onClick() {
              return _this2.edit_lnk(id);
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'role-title' },
          _react2.default.createElement('i', { className: 'fas fa-angle-double-down' }),
          '\xA0 ',
          '' + role_title
        ),
        show_team_name && _react2.default.createElement(
          'div',
          { className: 'team-name' },
          _react2.default.createElement('i', { className: 'fas fa-users' }),
          '\xA0 ',
          '' + team_name
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-stuff' },
          _react2.default.createElement('i', { className: 'fas fa-gamepad' }),
          '\xA0 ',
          '' + duration_converted
        ),
        show_achievements && _react2.default.createElement(
          'div',
          { className: 'game-comments' },
          _react2.default.createElement('i', { className: 'fas fa-trophy' }),
          '\xA0',
          '' + achievements
        ),
        show_fix && _react2.default.createElement('div', { className: 'game-comments' }),
        show_tags && _react2.default.createElement(
          'div',
          { className: 'tags' },
          this.showAllTags(arrTags)
        ),
        show_lines && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        show_lines && _react2.default.createElement(
          'div',
          { className: 'line-break2' },
          _react2.default.createElement('hr', null)
        )
      );
    }
  }]);
  return IndividualEsportsExperience;
}(_react.Component);

exports.default = IndividualEsportsExperience;

/***/ }),

/***/ 147:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

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
    key: 'render',
    value: function render() {
      var _props = this.props,
          friend = _props.friend,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (friend.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        'div',
        { className: 'invitation-info' },
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + friend.friend_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + friend.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + friend.friend_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png\')'
          } }),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          '' + friend.first_name,
          ' ',
          '' + friend.last_name
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualFriend;
}(_react.Component);

exports.default = IndividualFriend;

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

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
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 1:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 2:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 3:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
            break;
          case 4:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
            break;
          case 5:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' })
            );
            break;
          default:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
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
                commendTitle = '';
                _context.next = 5;
                return _axios2.default.get('/api/commendations/' + id);

              case 5:
                getCommend = _context.sent;

                if (getCommend.data.getAllCommend[0].no_of_commends < 49) {
                  commendTitle = 'Apprentice';
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 99) {
                  commendTitle = 'Elite';
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 149) {
                  commendTitle = 'Expert';
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 199) {
                  commendTitle = 'Hero';
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 249) {
                  commendTitle = 'Master';
                } else if (getCommend.data.getAllCommend[0].no_of_commends < 999) {
                  commendTitle = 'Grand Master';
                } else if (getCommend.data.getAllCommend[0].no_of_commends > 1000) {
                  commendTitle = 'Pro';
                }

                addCommend = _axios2.default.post('/api/commendations', {
                  game_experiences_id: id
                });
                _context.next = 10;
                return _axios2.default.get('/api/GameExperiences/exp/' + id);

              case 10:
                getCommendTitle = _context.sent;
                oldTitle = '';

                oldTitle = getCommendTitle.data.myGameExperience[0].commendation;

                if (oldTitle != commendTitle) {
                  addCommendTitle = _axios2.default.post('/api/GameExperiences/commend/' + id, {
                    commendation: commendTitle
                  });
                }
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](1);

                console.log(_context.t0);

              case 19:
              case 'end':
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
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 1:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-blue', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 2:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-red', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            case 3:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-yellow', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
            default:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green', onClick: function onClick() {
                      return _this.find_tag(tag);
                    } },
                  tag
                ),
                '\xA0'
              );
              break;
          }
        });
      }
    };

    _this.edit_lnk = function (id) {
      _this.state.tmp_id = id;
      _this.setState({ redirect_GamingExp: true });
    };

    _this.state = {
      myPage: false,
      showCommends: true,
      redirect_GamingExp: false,
      redirect_advancedSearch: false,
      tmp_id: ''
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualGamingExperience, [{
    key: 'componentWillMount',
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
                  return _axios2.default.get('/api/commendations/user/' + item.id);

                case 3:
                  _getCommend = _context2.sent;

                  if (_getCommend.data.getCommend[0].no_of_commends != 0) {
                    self.setState({ showCommends: false });
                  }
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
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
    key: 'find_tag',
    value: function find_tag(tag) {
      this.state.tmp_id = tag;
      this.setState({ redirect_advancedSearch: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_GamingExp) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id + '/edit/gamingexp/' + this.state.tmp_id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      if (this.state.redirect_advancedSearch) {
        var tmp = '/advancedSearch/' + this.state.tmp_id + '/Gaming Experience';
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

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

      var arrTags = '',
          show_tags = false,
          show_link = false,
          show_comments = false,
          show_ratings = false,
          played_converted = 'Less than 1 year',
          check_if_its_odd = 0,
          show_extra_div = false;

      if (tags != null && tags != '') {
        arrTags = tags.split(',');
        show_tags = true;
        check_if_its_odd = check_if_its_odd + 1;
      }

      if (link != null && link != '') {
        show_link = true;
        check_if_its_odd = check_if_its_odd + 1;
      }

      if (comments != null && comments != '') {
        show_comments = true;
        check_if_its_odd = check_if_its_odd + 1;
      }

      if (ratings != 0 && ratings != '') {
        show_ratings = true;
        check_if_its_odd = check_if_its_odd + 1;
      }

      if (experience == null) {
        experience = '';
      }
      if (check_if_its_odd == 0) {
        show_extra_div = true;
      }

      switch (played) {
        case 1:
          played_converted = 'Less than 1 year';
          break;
        case 2:
          played_converted = 'Less than 2 years';
          break;
        case 3:
          played_converted = 'Less than 3 years';
          break;
        case 4:
          played_converted = 'Less than 4 years';
          break;
        case 5:
          played_converted = 'Less than 5 years';
          break;
        case 42:
          played_converted = 'More than 5 years';
          break;
        default:
          played_converted = 'Less than 1 year';
      }

      if (rowLen === row + 1) {
        show_lines = false; //Show lines for all entries expect for the very last one
      }

      return _react2.default.createElement(
        'div',
        { className: 'game-info' },
        _react2.default.createElement(
          'div',
          { className: 'game-name' },
          '' + game_name
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-infos' },
          this.state.myPage && _react2.default.createElement('i', { className: 'fas fa-pen', onClick: function onClick() {
              return _this3.edit_lnk(id);
            } })
        ),
        show_ratings && _react2.default.createElement(
          'div',
          { className: 'game-rating' },
          this.showRating(ratings)
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-stuff' },
          _react2.default.createElement('i', { className: 'fas fa-gamepad' }),
          '\xA0',
          '' + experience,
          ', ',
          '' + played_converted
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-status' },
          _react2.default.createElement('i', { className: 'fab fa-d-and-d' }),
          '\xA0',
          '' + status
        ),
        _react2.default.createElement(
          'div',
          { className: 'game-commendation' },
          _react2.default.createElement('i', { className: 'fas fa-dragon' }),
          '\xA0',
          '' + commendation,
          '\xA0',
          this.state.showCommends && _react2.default.createElement(
            'div',
            { className: 'commendation' },
            _react2.default.createElement(
              'button',
              {
                className: 'commend',
                type: 'button',
                onClick: function onClick() {
                  if (window.confirm('Commend allows you to reward positive behaviour and/or recongise great skill')) _this3.commend_me(id);
                } },
              'Commend!'
            )
          )
        ),
        show_comments && _react2.default.createElement(
          'div',
          { className: 'game-comments' },
          _react2.default.createElement('i', { className: 'fas fa-trophy' }),
          '\xA0',
          '' + comments
        ),
        show_link && _react2.default.createElement(
          'div',
          { className: 'game-misc' },
          _react2.default.createElement('i', { className: 'fas fa-broadcast-tower' }),
          '\xA0Link:',
          '' + link
        ),
        show_extra_div && _react2.default.createElement(
          'div',
          null,
          ' '
        ),
        show_tags && _react2.default.createElement(
          'div',
          { className: 'tags' },
          this.showAllTags(arrTags)
        ),
        show_lines && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        show_lines && _react2.default.createElement(
          'div',
          { className: 'line-break2' },
          _react2.default.createElement('hr', null)
        )
      );
    }
  }]);
  return IndividualGamingExperience;
}(_react.Component);

exports.default = IndividualGamingExperience;

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualNotification = function (_Component) {
  (0, _inherits3.default)(IndividualNotification, _Component);

  function IndividualNotification() {
    (0, _classCallCheck3.default)(this, IndividualNotification);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualNotification.__proto__ || Object.getPrototypeOf(IndividualNotification)).call(this));

    _this.clickedAccept = function () {
      var notification = _this.props.notification;

      try {
        var deleteNoti = _axios2.default.get('/api/notifications/delete/' + notification.id);
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
        var deleteNoti = _axios2.default.get('/api/notifications/delete/' + notification.id);
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
      notification_str: '',
      unread: false,
      post: false,
      schedule_game: false,
      group_post: false,
      archive_schedule_game: false,
      redirect_: false,
      redirect_link: '',
      redirect_tmp: ''
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualNotification, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var notification = this.props.notification;

      var activity_type;
      var tmpStr = '';

      var getMoreNoti = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var getLikePost, getLikeComment, getLikeReply, getComment, getReply, getunread, myScheduledGame2, myStartDateTime2, getunread2, getschedulegameInfo, myScheduledGame, myStartDateTime;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.t0 = notification.activity_type;
                  _context.next = _context.t0 === 2 ? 4 : _context.t0 === 3 ? 20 : _context.t0 === 4 ? 36 : _context.t0 === 5 ? 52 : _context.t0 === 6 ? 68 : _context.t0 === 11 ? 84 : _context.t0 === 16 ? 95 : 118;
                  break;

                case 4:
                  _context.next = 6;
                  return _axios2.default.get('/api/notifications/getAllNotiLike_post/' + notification.post_id);

                case 6:
                  getLikePost = _context.sent;

                  if (getLikePost.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t1 = getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis;
                  _context.next = _context.t1 === 1 ? 11 : _context.t1 === 2 ? 13 : _context.t1 === 3 ? 15 : 17;
                  break;

                case 11:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + ' ' + getLikePost.data.getAllNotiLike_post[0].last_name + ' liked your post';
                  return _context.abrupt('break', 18);

                case 13:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + ' ' + getLikePost.data.getAllNotiLike_post[0].last_name + ' and ' + getLikePost.data.getAllNotiLike_post[1].first_name + ' ' + getLikePost.data.getAllNotiLike_post[1].last_name + ' liked your post';
                  return _context.abrupt('break', 18);

                case 15:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + ' ' + getLikePost.data.getAllNotiLike_post[0].last_name + ',  ' + getLikePost.data.getAllNotiLike_post[1].first_name + ' ' + getLikePost.data.getAllNotiLike_post[1].last_name + ' and ' + getLikePost.data.getAllNotiLike_post[2].first_name + ' ' + getLikePost.data.getAllNotiLike_post[2].last_name + ' liked your post';
                  return _context.abrupt('break', 18);

                case 17:
                  self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + ' ' + getLikePost.data.getAllNotiLike_post[0].last_name + ' and ' + getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis + ' other people liked your post';

                case 18:
                  self.props.notification.profile_img = getLikePost.data.getAllNotiLike_post[0].profile_img;
                  return _context.abrupt('break', 118);

                case 20:
                  _context.next = 22;
                  return _axios2.default.get('/api/notifications/getAllNotiLike_comment/' + notification.post_id);

                case 22:
                  getLikeComment = _context.sent;

                  if (getLikeComment.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t2 = getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis;
                  _context.next = _context.t2 === 1 ? 27 : _context.t2 === 2 ? 29 : _context.t2 === 3 ? 31 : 33;
                  break;

                case 27:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[0].last_name + ' liked your comment';
                  return _context.abrupt('break', 34);

                case 29:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[0].last_name + ' and ' + getLikeComment.data.getAllNotiLike_comment[1].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[1].last_name + ' liked your comment';
                  return _context.abrupt('break', 34);

                case 31:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[0].last_name + ',  ' + getLikeComment.data.getAllNotiLike_comment[1].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[1].last_name + ' and ' + getLikeComment.data.getAllNotiLike_comment[2].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[2].last_name + ' liked your comment';
                  return _context.abrupt('break', 34);

                case 33:
                  self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + ' ' + getLikeComment.data.getAllNotiLike_comment[0].last_name + ' and ' + getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis + ' other people liked your comment';

                case 34:
                  self.props.notification.profile_img = getLikeComment.data.getAllNotiLike_comment[0].profile_img;
                  return _context.abrupt('break', 118);

                case 36:
                  _context.next = 38;
                  return _axios2.default.get('/api/notifications/getAllNotiLike_reply/' + notification.post_id);

                case 38:
                  getLikeReply = _context.sent;

                  if (getLikeReply.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t3 = getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis;
                  _context.next = _context.t3 === 1 ? 43 : _context.t3 === 2 ? 45 : _context.t3 === 3 ? 47 : 49;
                  break;

                case 43:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[0].last_name + ' liked your reply';
                  return _context.abrupt('break', 50);

                case 45:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[0].last_name + ' and ' + getLikeReply.data.getAllNotiLike_reply[1].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[1].last_name + ' liked your reply';
                  return _context.abrupt('break', 50);

                case 47:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[0].last_name + ',  ' + getLikeReply.data.getAllNotiLike_reply[1].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[1].last_name + ' and ' + getLikeReply.data.getAllNotiLike_reply[2].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[2].last_name + ' liked your reply';
                  return _context.abrupt('break', 50);

                case 49:
                  self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + ' ' + getLikeReply.data.getAllNotiLike_reply[0].last_name + ' and ' + getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis + ' other people liked your reply';

                case 50:
                  self.props.notification.profile_img = getLikeReply.data.getAllNotiLike_reply[0].profile_img;
                  return _context.abrupt('break', 118);

                case 52:
                  _context.next = 54;
                  return _axios2.default.get('/api/notifications/getAllNotiComment/' + notification.post_id);

                case 54:
                  getComment = _context.sent;

                  if (getComment.data.getAllNotiCommentCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t4 = getComment.data.getAllNotiCommentCount[0].no_of_my_notis;
                  _context.next = _context.t4 === 1 ? 59 : _context.t4 === 2 ? 61 : _context.t4 === 3 ? 63 : 65;
                  break;

                case 59:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + ' ' + getComment.data.getAllNotiComment[0].last_name + ' commented on your post';
                  return _context.abrupt('break', 66);

                case 61:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + ' ' + getComment.data.getAllNotiComment[0].last_name + ' and ' + getComment.data.getAllNotiComment[1].first_name + ' ' + getComment.data.getAllNotiComment[1].last_name + ' commented on your post';
                  return _context.abrupt('break', 66);

                case 63:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + ' ' + getComment.data.getAllNotiComment[0].last_name + ',  ' + getComment.data.getAllNotiComment[1].first_name + ' ' + getComment.data.getAllNotiComment[1].last_name + ' and ' + getComment.data.getAllNotiComment[2].first_name + ' ' + getComment.data.getAllNotiComment[2].last_name + ' commented on your post';
                  return _context.abrupt('break', 66);

                case 65:
                  self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + ' ' + getComment.data.getAllNotiComment[0].last_name + ' and ' + getComment.data.getAllNotiCommentCount[0].no_of_my_notis + ' other people commented on your post';

                case 66:
                  self.props.notification.profile_img = getComment.data.getAllNotiComment[0].profile_img;
                  return _context.abrupt('break', 118);

                case 68:
                  _context.next = 70;
                  return _axios2.default.get('/api/notifications/getAllNotiReply/' + notification.post_id);

                case 70:
                  getReply = _context.sent;

                  if (getReply.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.t5 = getReply.data.getAllNotiReplyCount[0].no_of_my_notis;
                  _context.next = _context.t5 === 1 ? 75 : _context.t5 === 2 ? 77 : _context.t5 === 3 ? 79 : 81;
                  break;

                case 75:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + ' ' + getReply.data.getAllNotiReply[0].last_name + ' replied to your comment';
                  return _context.abrupt('break', 82);

                case 77:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + ' ' + getReply.data.getAllNotiReply[0].last_name + ' and ' + getReply.data.getAllNotiReply[1].first_name + ' ' + getReply.data.getAllNotiReply[1].last_name + ' replied to your comment';
                  return _context.abrupt('break', 82);

                case 79:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + ' ' + getReply.data.getAllNotiReply[0].last_name + ',  ' + getReply.data.getAllNotiReply[1].first_name + ' ' + getReply.data.getAllNotiReply[1].last_name + ' and ' + getReply.data.getAllNotiReply[2].first_name + ' ' + getReply.data.getAllNotiReply[2].last_name + ' replied to your comment';
                  return _context.abrupt('break', 82);

                case 81:
                  self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + ' ' + getReply.data.getAllNotiReply[0].last_name + ' and ' + getReply.data.getAllNotiReplyCount[0].no_of_my_notis + ' other people replied to your comment';

                case 82:
                  self.props.notification.profile_img = getReply.data.getAllNotiReply[0].profile_img;
                  return _context.abrupt('break', 118);

                case 84:
                  _context.next = 86;
                  return _axios2.default.get('/api/notifications/getunread_schedule_game/' + notification.schedule_games_id + '/' + notification.activity_type);

                case 86:
                  getunread = _context.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.next = 90;
                  return _axios2.default.get('/api/ScheduleGame/' + notification.schedule_games_id);

                case 90:
                  myScheduledGame2 = _context.sent;
                  myStartDateTime2 = (0, _moment2.default)(myScheduledGame2.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();


                  self.state.notification_str = 'Woot! A new player joined, you need to accept their invite: ' + myScheduledGame2.data.getOne[0].game_name + '. Start date is ' + myStartDateTime2.format('Do MMM YY - h:mm a');
                  notification.schedule_games_GUID = myScheduledGame2.data.getOne[0].schedule_games_GUID;

                  return _context.abrupt('break', 118);

                case 95:
                  _context.next = 97;
                  return _axios2.default.get('/api/notifications/getunread_schedule_game/' + notification.schedule_games_id + '/' + notification.activity_type);

                case 97:
                  getunread2 = _context.sent;

                  if (getunread2.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context.next = 101;
                  return _axios2.default.get('/api/notifications/getAllNotiScheduleGamesAttendees/' + notification.schedule_games_id);

                case 101:
                  getschedulegameInfo = _context.sent;
                  _context.next = 104;
                  return _axios2.default.get('/api/ScheduleGame/' + notification.schedule_games_id);

                case 104:
                  myScheduledGame = _context.sent;
                  myStartDateTime = (0, _moment2.default)(myScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
                  _context.t6 = getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis;
                  _context.next = _context.t6 === 1 ? 109 : _context.t6 === 2 ? 111 : _context.t6 === 3 ? 113 : 115;
                  break;

                case 109:
                  self.state.notification_str = 'Sigh! ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + ' has left ' + myScheduledGame.data.getOne[0].game_name + '. This game is planned to start ' + myStartDateTime.format('Do MMM YY - h:mm a');
                  return _context.abrupt('break', 116);

                case 111:
                  self.state.notification_str = 'Sigh! ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + ' and ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].last_name + ' has left ' + myScheduledGame.data.getOne[0].game_name + '. This game is planned to start ' + myStartDateTime.format('Do MMM YY - h:mm a');
                  return _context.abrupt('break', 116);

                case 113:
                  self.state.notification_str = 'Sigh! ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + ',  ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].last_name + ' and ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[2].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[2].last_name + ' has left ' + myScheduledGame.data.getOne[0].game_name + '. This game is planned to start ' + myStartDateTime.format('Do MMM YY - h:mm a');
                  return _context.abrupt('break', 116);

                case 115:
                  self.state.notification_str = 'Sigh! ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + ' ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + ' and ' + getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis + ' has left ' + myScheduledGame.data.getOne[0].game_name + '. This game is planned to start ' + myStartDateTime.format('Do MMM YY - h:mm a');

                case 116:
                  self.props.notification.profile_img = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].profile_img;
                  return _context.abrupt('break', 118);

                case 118:
                  _context.next = 123;
                  break;

                case 120:
                  _context.prev = 120;
                  _context.t7 = _context['catch'](0);

                  console.log(_context.t7);

                case 123:
                  self.forceUpdate();

                case 124:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 120]]);
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
                  return _axios2.default.get('/api/notifications/getunread/' + notification.post_id + '/' + notification.activity_type);

                case 4:
                  getunread = _context2.sent;


                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }
                  _context2.next = 11;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2['catch'](1);

                  console.log(_context2.t0);

                case 11:
                  _context2.t1 = notification.activity_type;
                  _context2.next = _context2.t1 === 2 ? 14 : _context2.t1 === 3 ? 16 : _context2.t1 === 4 ? 18 : _context2.t1 === 5 ? 20 : _context2.t1 === 6 ? 22 : 24;
                  break;

                case 14:
                  activity_type = 'liked your post';
                  return _context2.abrupt('break', 24);

                case 16:
                  activity_type = 'liked your comment';
                  return _context2.abrupt('break', 24);

                case 18:
                  activity_type = 'liked your reply';
                  return _context2.abrupt('break', 24);

                case 20:
                  activity_type = 'commented on your post';
                  return _context2.abrupt('break', 24);

                case 22:
                  activity_type = 'replied to your comment';
                  return _context2.abrupt('break', 24);

                case 24:

                  self.setState({
                    notification_str: notification.first_name + ' ' + notification.last_name + ' ' + activity_type
                  });
                  _context2.next = 28;
                  break;

                case 27:
                  getMoreNoti();

                case 28:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[1, 8]]);
        }));

        return function getinitialData() {
          return _ref2.apply(this, arguments);
        };
      }();

      var getschedulegameData = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var getunread, myScheduledGame, myStartDateTime, myEndDateTime;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/notifications/getunread_schedule_game/' + notification.schedule_games_id + '/' + notification.activity_type);

                case 3:
                  getunread = _context3.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }

                  _context3.next = 7;
                  return _axios2.default.get('/api/ScheduleGame/' + notification.schedule_games_id);

                case 7:
                  myScheduledGame = _context3.sent;
                  myStartDateTime = (0, _moment2.default)(myScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
                  myEndDateTime = (0, _moment2.default)(myScheduledGame.data.getOne[0].end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();


                  self.setState({
                    notification_str: notification.first_name + ' ' + notification.last_name + ' created a game - ' + myScheduledGame.data.getOne[0].game_name + ' (' + myStartDateTime.format('Do MMM YY - h:mm a') + ' - ' + myEndDateTime.format('Do MMM YY - h:mm a') + ' )'
                  });
                  _context3.next = 16;
                  break;

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 13]]);
        }));

        return function getschedulegameData() {
          return _ref3.apply(this, arguments);
        };
      }();

      var getGroupData = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var getunread, getGroupInfo;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get('/api/notifications/getunread_group/' + notification.group_id + '/' + notification.activity_type);

                case 3:
                  getunread = _context4.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }

                  if (!(notification.activity_type == 12)) {
                    _context4.next = 9;
                    break;
                  }

                  self.setState({
                    notification_str: notification.name + ' - ' + notification.first_name + ' ' + notification.last_name + ' wants to join this group. What ya reckon?'
                  });
                  _context4.next = 14;
                  break;

                case 9:
                  if (!(notification.activity_type == 17)) {
                    _context4.next = 14;
                    break;
                  }

                  _context4.next = 12;
                  return _axios2.default.get('/api/groups/' + notification.group_id);

                case 12:
                  getGroupInfo = _context4.sent;

                  self.setState({
                    notification_str: 'Epic! You have been accepted to group: ' + getGroupInfo.data.group[0].name
                  });

                case 14:
                  _context4.next = 19;
                  break;

                case 16:
                  _context4.prev = 16;
                  _context4.t0 = _context4['catch'](0);

                  console.log(_context4.t0);

                case 19:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 16]]);
        }));

        return function getGroupData() {
          return _ref4.apply(this, arguments);
        };
      }();

      var getGameApprovalData = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
          var getunread, myScheduledGame;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios2.default.get('/api/notifications/getunread_schedule_game/' + notification.schedule_games_id + '/' + notification.activity_type);

                case 3:
                  getunread = _context5.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }

                  _context5.next = 7;
                  return _axios2.default.get('/api/ScheduleGame/' + notification.schedule_games_id);

                case 7:
                  myScheduledGame = _context5.sent;


                  self.setState({
                    notification_str: "Gratz! You're approved for " + myScheduledGame.data.getOne[0].game_name + ' created by ' + notification.alias + ' --- Accept Msg: ' + myScheduledGame.data.getOne[0].accept_msg
                  });
                  _context5.next = 14;
                  break;

                case 11:
                  _context5.prev = 11;
                  _context5.t0 = _context5['catch'](0);

                  console.log(_context5.t0);

                case 14:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 11]]);
        }));

        return function getGameApprovalData() {
          return _ref5.apply(this, arguments);
        };
      }();

      var getArchive_scheduled_game_Data = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var getunread, myArchiveScheduledGame, myStartDateTime;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get('/api/notifications/getunread_archive_schedule_game/' + notification.archive_schedule_game_id + '/' + notification.activity_type);

                case 3:
                  getunread = _context6.sent;

                  if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
                    self.state.unread = true;
                  }

                  _context6.next = 7;
                  return _axios2.default.get('/api/ArchiveScheduleGame/' + notification.archive_schedule_game_id);

                case 7:
                  myArchiveScheduledGame = _context6.sent;
                  myStartDateTime = (0, _moment2.default)(myArchiveScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();


                  self.setState({
                    notification_str: "Crikey mate! One of your approved game's: " + myArchiveScheduledGame.data.getOne[0].game_name + ", was deleted! :'( This game was created by " + notification.alias + '. It was meant to start: ' + myStartDateTime.format('Do MMM YY - h:mm a') + '. Their reason for cancelling was: ' + myArchiveScheduledGame.data.getOne[0].reason_for_cancel
                  });
                  _context6.next = 15;
                  break;

                case 12:
                  _context6.prev = 12;
                  _context6.t0 = _context6['catch'](0);

                  console.log(_context6.t0);

                case 15:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 12]]);
        }));

        return function getArchive_scheduled_game_Data() {
          return _ref6.apply(this, arguments);
        };
      }();

      if (notification.activity_type == 10) {
        getschedulegameData();
      } else if (notification.activity_type == 11 || notification.activity_type == 16) {
        getMoreNoti();
      } else if (notification.activity_type == 12 || notification.activity_type == 17) {
        getGroupData();
      } else if (notification.activity_type == 14) {
        getGameApprovalData();
      } else if (notification.activity_type == 15) {
        getArchive_scheduled_game_Data();
      } else {
        getinitialData();
      }
    }
  }, {
    key: 'updateRead_Status',
    value: function updateRead_Status() {
      try {
        var updateRead_Status = _axios2.default.post('/api/notifications/updateRead_Status/' + this.props.notification.post_id + '/' + this.props.notification.activity_type);
      } catch (error) {
        console.log(error);
      }
      this.state.redirect_link = 'updateRead_Status';
      this.setState({ redirect_: true });
    }
  }, {
    key: 'updateRead_Status_schedule_game',
    value: function updateRead_Status_schedule_game(str_href) {
      try {
        var updateRead_Status_schedule_game = _axios2.default.post('/api/notifications/updateRead_Status_schedule_game/' + this.props.notification.schedule_games_id + '/' + this.props.notification.activity_type);
      } catch (error) {
        console.log(error);
      }
      this.state.redirect_link = 'updateRead_Status_schedule_game';
      this.state.redirect_tmp = str_href;

      this.setState({ redirect_: true });
    }
  }, {
    key: 'updateRead_Status_groups',
    value: function updateRead_Status_groups() {
      try {
        var updateRead_Status_groups = _axios2.default.post('/api/notifications/updateRead_Status_groups/' + this.props.notification.group_id + '/' + this.props.notification.activity_type + '/' + this.props.notification.id);
      } catch (error) {
        console.log(error);
      }
      this.state.redirect_link = 'updateRead_Status_groups';
      this.setState({ redirect_: true });
    }
  }, {
    key: 'updateRead_Status_archive_schedule_game',
    value: function updateRead_Status_archive_schedule_game() {
      try {
        var updateRead_Status_archive_schedule_game = _axios2.default.post('/api/notifications/updateRead_Status_archive_schedule_game/' + this.props.notification.archive_schedule_game_id + '/' + this.props.notification.activity_type);
      } catch (error) {
        console.log(error);
      }
      this.state.redirect_link = 'updateRead_Status_archive_schedule_game';
      this.setState({ redirect_: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_) {
        var tmp;
        switch (this.state.redirect_link) {
          case 'updateRead_Status':
            tmp = '/post/' + this.props.notification.post_id;
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
          case 'updateRead_Status_schedule_game':
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: this.state.redirect_tmp });
            break;
          case 'updateRead_Status_groups':
            tmp = '/groups/' + this.props.notification.group_id;
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
          case 'updateRead_Status_archive_schedule_game':
            tmp = '/archived_scheduledGames/' + this.props.notification.archive_schedule_game_id;
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
        }
      }

      var _props = this.props,
          notification = _props.notification,
          lastRow = _props.lastRow;

      var str_href;

      var show_profile_img = false;
      if (notification.profile_img != null) {
        show_profile_img = true;
      }

      if (notification.activity_type == 10 || notification.activity_type == 14 || notification.post_id == null && notification.activity_type != 15 && notification.group_id == null) {
        this.state.post = false;
        this.state.archive_schedule_game = false;
        this.state.group_post = false;
        this.state.schedule_game = true;
        if (notification.activity_type == 11) {
          str_href = '/scheduledGamesApprovals/' + notification.schedule_games_GUID;
        } else {
          str_href = '/scheduledGames/' + notification.schedule_games_id;
        }
      } else if (notification.activity_type == 12 || notification.activity_type == 17) {
        this.state.post = false;
        this.state.archive_schedule_game = false;
        this.state.schedule_game = false;
        this.state.group_post = true;
        str_href = '/groups/' + notification.group_id;
      } else if (notification.activity_type == 15) {
        this.state.post = false;
        this.state.group_post = false;
        this.state.schedule_game = false;
        this.state.archive_schedule_game = true;
        str_href = '/archived_scheduledGames/' + this.props.notification.archive_schedule_game_id;
      } else {
        this.state.post = true;
        this.state.group_post = false;
        this.state.schedule_game = false;
        this.state.archive_schedule_game = false;
        str_href = '/post/' + notification.post_id;
      }

      return _react2.default.createElement(
        'div',
        { className: 'notification-info' },
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + notification.id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + notification.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + notification.id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg\')'
          } }),
        this.state.post && !this.state.unread && _react2.default.createElement(
          'div',
          { className: 'user-info-read' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: str_href },
            this.state.notification_str
          )
        ),
        this.state.post && this.state.unread && _react2.default.createElement(
          'div',
          {
            className: 'user-info-unread',
            onClick: function onClick() {
              return _this2.updateRead_Status();
            } },
          this.state.notification_str
        ),
        this.state.schedule_game && !this.state.unread && _react2.default.createElement(
          'div',
          { className: 'user-info-read' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: str_href },
            this.state.notification_str
          )
        ),
        this.state.schedule_game && this.state.unread && _react2.default.createElement(
          'div',
          {
            className: 'user-info-unread',
            onClick: function onClick() {
              return _this2.updateRead_Status_schedule_game(str_href);
            } },
          this.state.notification_str
        ),
        this.state.group_post && !this.state.unread && _react2.default.createElement(
          'div',
          { className: 'user-info-read' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: str_href },
            this.state.notification_str
          )
        ),
        this.state.group_post && this.state.unread && _react2.default.createElement(
          'div',
          {
            className: 'user-info-unread',
            onClick: function onClick() {
              return _this2.updateRead_Status_groups();
            } },
          this.state.notification_str
        ),
        this.state.archive_schedule_game && !this.state.unread && _react2.default.createElement(
          'div',
          { className: 'user-info-read' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: str_href },
            this.state.notification_str
          )
        ),
        this.state.archive_schedule_game && this.state.unread && _react2.default.createElement(
          'div',
          {
            className: 'user-info-unread',
            onClick: function onClick() {
              return _this2.updateRead_Status_archive_schedule_game();
            } },
          this.state.notification_str
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualNotification;
}(_react.Component);

exports.default = IndividualNotification;

/***/ }),

/***/ 150:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

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
    key: 'render',
    value: function render() {
      var _props = this.props,
          attendee = _props.attendee,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (attendee.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        'div',
        { className: 'invitation-info' },
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + attendee.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + attendee.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + attendee.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png\')'
          } }),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          '' + attendee.first_name,
          ' ',
          '' + attendee.last_name
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualPlayer;
}(_react.Component);

exports.default = IndividualPlayer;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

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

    _this.click_reply_like_btn = function (reply_id) {
      try {
        var replyLike = _axios2.default.post('/api/likes', {
          reply_id: reply_id
        });

        var _this$props = _this.props,
            comment_user_id = _this$props.comment_user_id,
            post_id = _this$props.post_id,
            reply = _this$props.reply,
            user = _this$props.user,
            schedule_game_id = _this$props.schedule_game_id;

        if (reply.user_id != user.userInfo.id) {
          if (schedule_game_id != null) {
            var addReplyLike = _axios2.default.post('/api/notifications/addReplyLike', {
              other_user_id: reply.user_id,
              schedule_games_id: schedule_game_id,
              reply_id: reply_id
            });
          } else {
            var _addReplyLike = _axios2.default.post('/api/notifications/addReplyLike', {
              other_user_id: reply.user_id,
              post_id: post_id,
              reply_id: reply_id
            });
          }
        }
      } catch (error) {
        console.log(error);
      }

      _this.setState({
        reply_like_total: _this.state.reply_like_total + 1
      });

      _this.setState({
        show_reply_like: true,
        reply_like: !_this.state.reply_like
      });
    };

    _this.click_reply_unlike_btn = function (reply_id) {
      var post_id = _this.props.post_id;

      try {
        var reply_unlike = _axios2.default.get('/api/likes/delete/reply/' + reply_id);
        var deleteReplyLike = _axios2.default.get('/api/notifications/deleteReplyLike/' + reply_id);
      } catch (error) {
        console.log(error);
      }

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
    };

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.delete_exp = function () {
      var reply_id = _this.props.reply.id;

      try {
        var myReply_delete = _axios2.default.get('/api/replies/delete/' + reply_id);
        _this.setState({
          reply_deleted: true
        });
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        dropdown: false
      });
    };

    _this.clickedEdit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var reply_id, myReply_content;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              reply_id = _this.props.reply.id;
              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get('/api/replies/show_reply/' + reply_id);

            case 4:
              myReply_content = _context.sent;


              _this.setState({
                show_edit_reply: true,
                dropdown: false,
                value: myReply_content.data.this_reply[0].content
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8]]);
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
          value: ''
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_reply();
      }
    };

    _this.insert_reply = function () {
      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
        });
        return;
      }
      var self = _this;
      var reply_id = _this.props.reply.id;

      var saveReply = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var mysaveReply;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.post('/api/replies/update/' + reply_id, {
                    content: self.state.value
                  });

                case 3:
                  mysaveReply = _context2.sent;


                  self.setState({
                    show_edit_reply: false,
                    dropdown: false,
                    content: self.state.value,
                    value: ''
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function saveReply() {
          return _ref2.apply(this, arguments);
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
      value: '',
      content: '',
      reply_time: ''
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.reply.profile_img != null) {
        this.setState({ show_profile_img: true });
      }

      this.setState({
        content: this.props.reply.content
      });

      var reply_timestamp = (0, _moment2.default)(this.props.reply.updated_at, 'YYYY-MM-DD HH:mm:ssZ');
      this.setState({ reply_time: reply_timestamp.local().fromNow() });

      var self = this;
      var reply = this.props;

      var getCommentReplies = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var i, myReplyLikes;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/likes/reply/' + reply.reply.id);

                case 3:
                  myReplyLikes = _context3.sent;


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
                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 8]]);
        }));

        return function getCommentReplies() {
          return _ref3.apply(this, arguments);
        };
      }();

      var getmyRepliesCount = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var i, myRepliesCount;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get('/api/replies/my_count/' + reply.reply.id);

                case 3:
                  myRepliesCount = _context4.sent;


                  if (myRepliesCount.data.no_of_my_replies[0].no_of_my_replies != 0) {
                    self.setState({
                      show_reply_options: true
                    });
                  }
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](0);

                  console.log(_context4.t0);

                case 10:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 7]]);
        }));

        return function getmyRepliesCount() {
          return _ref4.apply(this, arguments);
        };
      }();
      getCommentReplies();
      getmyRepliesCount();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var reply = this.props.reply;
      //console.log(reply);

      if (this.state.reply_deleted != true) {
        return _react2.default.createElement(
          'div',
          { className: 'comment-replies' },
          this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
            to: '/profile/' + reply.user_id,
            className: 'user-img-reply',
            style: {
              backgroundImage: 'url(\'' + reply.profile_img + '\')'
            } }),
          !this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
            to: '/profile/' + reply.user_id,
            className: 'user-img-reply',
            style: {
              backgroundImage: 'url(\'https://image.flaticon.com/icons/svg/149/149071.svg\')'
            } }),
          _react2.default.createElement(
            'div',
            { className: 'reply-author-info' },
            reply.first_name,
            ' ',
            reply.last_name,
            this.state.show_reply_options && _react2.default.createElement(
              'div',
              { className: 'reply-options' },
              _react2.default.createElement('i', {
                className: 'fas fa-ellipsis-h',
                onClick: this.clickedDropdown })
            )
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'reply-dropdown ' + (this.state.dropdown ? 'active' : '') },
            _react2.default.createElement(
              'nav',
              null,
              _react2.default.createElement(
                'div',
                { className: 'edit', onClick: this.clickedEdit },
                'Edit \xA0'
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'delete',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to delete this reply?')) _this3.delete_exp();
                  } },
                'Delete'
              ),
              '\xA0'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'reply-comment-content' },
            this.state.content
          ),
          _react2.default.createElement(
            'div',
            { className: 'replies-panel' },
            _react2.default.createElement(
              'div',
              { className: 'comment-panel' },
              this.state.reply_like && _react2.default.createElement(
                'div',
                {
                  className: 'comment-panel-liked',
                  onClick: function onClick() {
                    return _this3.click_reply_unlike_btn(reply.id);
                  } },
                'Like'
              ),
              !this.state.reply_like && _react2.default.createElement(
                'div',
                {
                  className: 'comment-panel-like',
                  onClick: function onClick() {
                    return _this3.click_reply_like_btn(reply.id);
                  } },
                'Like'
              ),
              (this.state.show_reply_like || this.state.show_reply) && _react2.default.createElement(
                'div',
                { className: 'divider' },
                '|'
              ),
              this.state.show_reply_like && _react2.default.createElement(
                'div',
                { className: 'no-likes' },
                this.state.reply_like_total,
                ' ',
                this.state.reply_like_total > 1 ? 'Likes' : 'Like',
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'comment-time' },
                _react2.default.createElement('i', { className: 'fas fa-circle' }),
                ' ',
                this.state.reply_time
              )
            )
          ),
          this.state.show_edit_reply && _react2.default.createElement(
            'div',
            { className: 'add-reply' },
            _react2.default.createElement('input', {
              type: 'text',
              id: 'reply_name_box',
              className: 'reply-name-box',
              onKeyUp: this.detectKey,
              ref: this.setTextInputRef,
              onChange: this.handleChange,
              value: this.state.value
            })
          )
        );
      } else {
        return _react2.default.createElement('div', { className: 'comment-replies' });
      }
    }
  }]);
  return IndividualReply;
}(_react.Component);

exports.default = IndividualReply;


var app = document.getElementById('app');

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactInfiniteScrollComponent = __webpack_require__(130);

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _IndividualPost = __webpack_require__(41);

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
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
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
                  return _axios2.default.get('/api/getmypost/' + myCounter);

                case 3:
                  myPosts = _context.sent;

                  if (!(myPosts.data.myPosts.data.length == 0)) {
                    _context.next = 7;
                    break;
                  }

                  self.setState({
                    moreplease: false
                  });
                  return _context.abrupt('return');

                case 7:
                  i = 0;

                case 8:
                  if (!(i < myPosts.data.myPosts.data.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 11;
                  return _axios2.default.get('/api/likes/' + myPosts.data.myPosts.data[i].id);

                case 11:
                  myLikes = _context.sent;

                  myPosts.data.myPosts.data[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts.data[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts.data[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts.data[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts.data[i].admirer_first_name = '';
                    myPosts.data.myPosts.data[i].admirer_last_name = '';
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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 25:
                case 'end':
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchMoreData();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myPosts != undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
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
        return _react2.default.createElement('section', { id: 'posts' });
      }
    }
  }]);
  return MyPosts;
}(_react.Component);

exports.default = MyPosts;

var app = document.getElementById('app');

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactInfiniteScrollComponent = __webpack_require__(130);

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _IndividualPost = __webpack_require__(41);

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
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
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
                  return _axios2.default.get('/api/post/' + myCounter);

                case 3:
                  myPosts = _context.sent;

                  if (!(myPosts.data.myPosts.data.length == 0)) {
                    _context.next = 7;
                    break;
                  }

                  self.setState({
                    moreplease: false
                  });
                  return _context.abrupt('return');

                case 7:
                  i = 0;

                case 8:
                  if (!(i < myPosts.data.myPosts.data.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 11;
                  return _axios2.default.get('/api/likes/' + myPosts.data.myPosts.data[i].id);

                case 11:
                  myLikes = _context.sent;

                  myPosts.data.myPosts.data[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts.data[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts.data[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts.data[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts.data[i].admirer_first_name = '';
                    myPosts.data.myPosts.data[i].admirer_last_name = '';
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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 25:
                case 'end':
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchMoreData();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myPosts != undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
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
        return _react2.default.createElement('section', { id: 'posts' });
      }
    }
  }]);
  return Posts;
}(_react.Component);

exports.default = Posts;

var app = document.getElementById('app');

/***/ }),

/***/ 164:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(8);

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

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(8);

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
    key: 'clickDelete',
    value: function clickDelete() {
      if (typeof this.props.callbackDelete != 'undefined') {
        this.props.callbackDelete(this.props.srcKey);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.fileType == 'video') {
        return _react2.default.createElement(
          'div',
          { className: 'file-preview-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'file-preview-overlay' },
            _react2.default.createElement(
              'span',
              {
                className: 'file-preview-delete',
                onClick: function onClick() {
                  return _this2.clickDelete();
                } },
              _react2.default.createElement('i', { className: 'fas fa-times' })
            )
          ),
          _react2.default.createElement(
            'video',
            { controls: true },
            _react2.default.createElement('source', { src: this.props.src })
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'file-preview-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'file-preview-overlay' },
            _react2.default.createElement(
              'span',
              {
                className: 'file-preview-delete',
                onClick: function onClick() {
                  return _this2.clickDelete();
                } },
              _react2.default.createElement('i', { className: 'fas fa-times' })
            )
          ),
          _react2.default.createElement('img', { src: this.props.src })
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
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'callbackDeletePreview',
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
    key: 'closeModal',
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
    key: 'clickSave',
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
    key: 'doUploadS3',
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
    key: 'onChangeFile',
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
    key: 'render',
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

      var filepath = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png';
      var instance = this;
      return _react2.default.createElement(
        'div',
        { className: 'modal-container ' + class_modal_status },
        _react2.default.createElement(
          'div',
          { className: 'modal-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            this.props.fileType == 'photo' ? 'Upload Photos' : 'Upload Videos'
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-close-btn', onClick: function onClick() {
                return _this4.closeModal();
              } },
            _react2.default.createElement('i', { className: 'fas fa-times' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement('textarea', {
              name: 'post_content',
              rows: 8,
              cols: 80,
              defaultValue: '',
              onChange: this.handleChange,
              value: this.state.post_content,
              maxLength: '254',
              placeholder: 'What\'s up...'
            }),
            _react2.default.createElement('input', {
              id: 'myInput',
              type: 'file',
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
              'div',
              { className: 'open-btn', onClick: function onClick() {
                  return _this4.ref_upload.click();
                } },
              _react2.default.createElement('i', { className: 'fas fa-upload' }),
              ' Upload File'
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.state.uploading ? 'uploading-container' : 'uploading-container uploading--hide' },
              _react2.default.createElement('div', { className: 'uploading' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-text' },
              'Previews'
            ),
            _react2.default.createElement(
              'div',
              { className: 'uploaded-files-content' },
              _react2.default.createElement(
                'div',
                { className: 'uploaded-file-preview' },
                this.state.preview_files.map(function (data, index) {
                  return _react2.default.createElement(FilePreview, {
                    key: data.key,
                    src: data.src,
                    srcKey: data.key,
                    fileType: instance.props.fileType,
                    callbackDelete: instance.callbackDeletePreview });
                })
              )
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.state.uploading ? 'save-btn btn--disable' : 'save-btn',
                onClick: function onClick() {
                  return _this4.clickSave();
                } },
              _react2.default.createElement('i', { className: 'fas fa-save' }),
              ' Save'
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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game_name_values = undefined;

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var Game_name_values = exports.Game_name_values = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(inputValue) {
    var getGameName, results, newArr, i, newOption;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(inputValue == '' || inputValue == undefined)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', []);

          case 2:
            _context.prev = 2;

            inputValue = inputValue.trimStart();
            _context.next = 6;
            return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

          case 6:
            getGameName = _context.sent;
            results = getGameName.data.gameSearchResults[0].filter(function (i) {
              return i.game_name.toLowerCase().includes(inputValue.toLowerCase());
            });
            newArr = [];

            if (!(results.length != 0)) {
              _context.next = 13;
              break;
            }

            for (i = 0; i < results.length; i++) {
              if (results[i].game_img != '' && results[i].game_img != null) {
                newOption = createOption(results[i].game_name, results[i].id);
                newOption.label = _react2.default.createElement('img', { src: results[i].game_img });
              } else {
                newOption = createOption(results[i].game_name, results[i].id);
              }
              newArr.push(newOption);
            }
            _context.next = 14;
            break;

          case 13:
            return _context.abrupt('return', []);

          case 14:
            return _context.abrupt('return', newArr);

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 17]]);
  }));

  return function Game_name_values(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.Disable_keys = Disable_keys;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label,
    game_names_id: game_names_id
  };
};

function Disable_keys(e) {
  if (e.keyCode === 222 || e.keyCode === 191 || e.keyCode === 190 || e.keyCode === 220 || e.keyCode === 53 || e.keyCode === 51 || e.keyCode === 191) {
    e.preventDefault();
    e.stopPropagation();
  }
}

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(55);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var email_options = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];

var played_options = [{ value: 1, label: 'Less than 3 months' }, { value: 2, label: 'Less than 6 months' }, { value: 3, label: 'Less than 1 year' }, { value: 4, label: 'Less than 2 years' }, { value: 5, label: 'Less than 3 years' }, { value: 42, label: '3+ years' }];

var status_options = [{
  value: 'Actively looking for a team',
  label: 'Actively looking for a team'
}, { value: 'Maybe looking for a team', label: 'Maybe looking for a team' }, { value: 'Do not disturb please!', label: 'Do not disturb please!' }];

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

    _this.handleCloseModal = function () {
      _this.setState({ redirect_profile: true });
    };

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
      var myardour, myPlayed, myTags, _OGstatus, uShallNotPass, ardourNgame_name_same_same, i, j, post, newGame_name, newGameID, _post, tmpnewGameID, _post2, post_bio, _post_bio, post_role;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myardour = '';
              myPlayed = 1;
              myTags = '';
              _OGstatus = true;
              uShallNotPass = false;
              ardourNgame_name_same_same = false;

              if (!(_this.state.status_box.label == '' || _this.state.status_box.label == null)) {
                _context.next = 9;
                break;
              }

              alert('Sorry mate! Status can not be blank');
              return _context.abrupt('return');

            case 9:
              if (!(_this.state.email_box.label == '' || _this.state.email_box.label == null)) {
                _context.next = 12;
                break;
              }

              alert('Sorry mate! Email can not be blank');
              return _context.abrupt('return');

            case 12:

              if (_this.state.played_box.value != '' && _this.state.played_box.value != undefined) {
                myPlayed = _this.state.played_box.value;
              }

              if (_this.state.team_name_box.trim() != '') {
                uShallNotPass = true;
              } else if (_this.state.achievements_box.trim() != '') {
                uShallNotPass = true;
              } else if (myTags != '') {
                uShallNotPass = true;
              } else if (_this.state.role_title_box != '') {
                uShallNotPass = true;
              } else if (_this.state.value_game_name.length != 0) {
                uShallNotPass = true;
              }

              if (_this.state.value_game_name == null) {
                _this.state.value_game_name = [];
              }

              if (!((_this.state.role_title_box == '' || _this.state.role_title_box == null) && uShallNotPass)) {
                _context.next = 20;
                break;
              }

              alert('Sorry mate! Role title can not be blank');
              return _context.abrupt('return');

            case 20:
              if (!(_this.state.value_game_name.length == 0 && uShallNotPass)) {
                _context.next = 23;
                break;
              }

              alert('Sorry mate! Game name can not be blank');
              return _context.abrupt('return');

            case 23:

              if (_this.state.value_ardour !== null && _this.state.value_ardour.length !== 0) {
                for (i = 0; i < _this.state.value_ardour.length; i++) {
                  myardour += _this.state.value_ardour[i].label + '; ';
                }
                myardour = myardour.trim().replace(/; /g, ',').trim();
                myardour = myardour.replace(/;/g, '');
                myardour = myardour.replace(/,/g, ', ');
              }

              //If you created a new game and you have selected it then and only then will we save this to the DB

              if (!(_this.state.newValueCreated_ardour != '')) {
                _context.next = 47;
                break;
              }

              i = 0;

            case 26:
              if (!(i < _this.state.newValueCreated_ardour.length)) {
                _context.next = 47;
                break;
              }

              j = 0;

            case 28:
              if (!(j < _this.state.value_ardour.length)) {
                _context.next = 44;
                break;
              }

              if (!(_this.state.value_ardour[j].label == _this.state.newValueCreated_ardour[i])) {
                _context.next = 41;
                break;
              }

              _context.prev = 30;
              _context.next = 33;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.newValueCreated_ardour[i]
              });

            case 33:
              post = _context.sent;

              if (_this.state.newValueCreated_ardour[i] == _this.state.value_game_name.label) {
                ardourNgame_name_same_same = true;
                newGame_name = post.data.game_name;
                newGameID = post.data.id;
              }
              _context.next = 40;
              break;

            case 37:
              _context.prev = 37;
              _context.t0 = _context['catch'](30);

              console.log(_context.t0);

            case 40:
              return _context.abrupt('break', 44);

            case 41:
              j++;
              _context.next = 28;
              break;

            case 44:
              i++;
              _context.next = 26;
              break;

            case 47:

              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGame_name = '';
              newGameID = '';

              if (!(_this.state.newValueCreated_game_name != '' && ardourNgame_name_same_same == false)) {
                _context.next = 68;
                break;
              }

              i = 0;

            case 51:
              if (!(i < _this.state.newValueCreated_game_name.length)) {
                _context.next = 68;
                break;
              }

              if (!(_this.state.value_game_name.label == _this.state.newValueCreated_game_name[i])) {
                _context.next = 65;
                break;
              }

              _context.prev = 53;
              _context.next = 56;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value_game_name.label
              });

            case 56:
              _post = _context.sent;

              newGame_name = _post.data.game_name;
              newGameID = _post.data.id;
              _context.next = 64;
              break;

            case 61:
              _context.prev = 61;
              _context.t1 = _context['catch'](53);

              console.log(_context.t1);

            case 64:
              return _context.abrupt('break', 68);

            case 65:
              i++;
              _context.next = 51;
              break;

            case 68:
              if (!(_this.state.newValueCreated_tags != '')) {
                _context.next = 93;
                break;
              }

              tmpnewGameID = '';

              if (_this.state.value_game_name.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value_game_name.game_names_id;
              }
              i = 0;

            case 72:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context.next = 93;
                break;
              }

              j = 0;

            case 74:
              if (!(j < _this.state.value_tags.length)) {
                _context.next = 90;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context.next = 87;
                break;
              }

              _context.prev = 76;

              if (!(tmpnewGameID != '')) {
                _context.next = 81;
                break;
              }

              _context.next = 80;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 80:
              _post2 = _context.sent;

            case 81:
              _context.next = 86;
              break;

            case 83:
              _context.prev = 83;
              _context.t2 = _context['catch'](76);

              console.log(_context.t2);

            case 86:
              return _context.abrupt('break', 90);

            case 87:
              j++;
              _context.next = 74;
              break;

            case 90:
              i++;
              _context.next = 72;
              break;

            case 93:

              if (_this.state.value_tags !== null && _this.state.value_tags.length !== 0) {
                for (i = 0; i < _this.state.value_tags.length; i++) {
                  myTags += _this.state.value_tags[i].label + '; ';
                }
                myTags = myTags.trim().replace(/; /g, ',').trim();
                myTags = myTags.replace(/;/g, '');
                myTags = myTags.replace(/,/g, ', ');
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

              if (_this.state.just_one_time) {
                _context.next = 101;
                break;
              }

              return _context.abrupt('return');

            case 101:
              _this.state.just_one_time = false;

              if (!(_this.state.createEsportsPost == true)) {
                _context.next = 114;
                break;
              }

              _context.prev = 103;
              _context.next = 106;
              return _axios2.default.post('/api/esports_bio/create', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 106:
              post_bio = _context.sent;
              _context.next = 112;
              break;

            case 109:
              _context.prev = 109;
              _context.t3 = _context['catch'](103);

              console.log(_context.t3);

            case 112:
              _context.next = 124;
              break;

            case 114:
              if (!(_OGstatus == false)) {
                _context.next = 124;
                break;
              }

              _context.prev = 115;
              _context.next = 118;
              return _axios2.default.post('/api/esports_bio/update/', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 118:
              _post_bio = _context.sent;
              _context.next = 124;
              break;

            case 121:
              _context.prev = 121;
              _context.t4 = _context['catch'](115);

              console.log(_context.t4);

            case 124:
              if (!uShallNotPass) {
                _context.next = 134;
                break;
              }

              _context.prev = 125;
              _context.next = 128;
              return _axios2.default.post('/api/esports_experiences/create', {
                role_title: _this.state.role_title_box,
                game_name: newGame_name == '' ? _this.state.value_game_name.label : newGame_name,
                team_name: _this.state.team_name_box,
                duration: myPlayed,
                achievements: _this.state.achievements_box,
                skills: myTags
              });

            case 128:
              post_role = _context.sent;
              _context.next = 134;
              break;

            case 131:
              _context.prev = 131;
              _context.t5 = _context['catch'](125);

              console.log(_context.t5);

            case 134:
              _this.handleCloseModal();

            case 135:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[30, 37], [53, 61], [76, 83], [103, 109], [115, 121], [125, 131]]);
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
        _this.setState({
          newValueCreated_ardour: [].concat((0, _toConsumableArray3.default)(newValueCreated_ardour), [newOption.label])
        });
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
        _this.setState({ value_tags: '' });
        _this.setState({
          newValueCreated_game_name: [].concat((0, _toConsumableArray3.default)(newValueCreated_game_name), [newOption.label])
        });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: '' });
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
        _this.setState({
          newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label])
        });
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

                  self.setState({ options_tags: '' });
                  self.setState({ value_tags: '' });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get('/api/Tags/' + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt('return');

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt('return');

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = '';
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 20:
                case 'end':
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
      status_box: [{ label: '', value: '' }],
      email_box: [{ label: '', value: '' }],
      played_box: '',
      career_highlights_box: '',
      team_name_box: '',
      role_title_box: '',
      achievements_box: '',
      isLoading_tags: false,
      isLoading_ardour: false,
      isLoading_game_name: false,
      options_tags: '',
      options_ardour: '',
      options_game_name: '',
      value_tags: [],
      value_game_name: [],
      value_ardour: [],
      newValueCreated_ardour: [],
      newValueCreated_game_name: [],
      newValueCreated_tags: [],
      name_trigger: false,
      createEsportsPost: true,
      intial_trigger: true,
      just_one_time: true,
      redirect_profile: false
    };
    return _this;
  }

  (0, _createClass3.default)(AddEsportsExp, [{
    key: 'componentWillMount',
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
                    arrTags = '';
                    games_of_ardour = _getEsports_bio.data.myProfile[0].games_of_ardour;
                    tmp = [];


                    if (games_of_ardour != null && games_of_ardour != '') {
                      arrTags = games_of_ardour.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.setState({ value_ardour: tmp });
                    }
                  } else {
                    self.setState({
                      myEsports_bio: ''
                    });
                  }
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
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
    key: 'getOptions',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(inputValue == '' || inputValue == undefined)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', []);

              case 2:
                _context4.prev = 2;

                inputValue = inputValue.trimStart();
                _context4.next = 6;
                return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

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
                return _context4.abrupt('return', []);

              case 14:
                return _context4.abrupt('return', newArr);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4['catch'](2);

                console.log(_context4.t0);

              case 20:
              case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_profile) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

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
          'div',
          { className: 'content-area addEsportsExp-page' },
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
              className: 'addEsportsModal',
              overlayClassName: 'Overlay' },
            'Esports Career:',
            _react2.default.createElement('i', { className: 'fas fa-times', onClick: this.handleCloseModal }),
            _react2.default.createElement(
              'div',
              { className: 'status' },
              _react2.default.createElement(
                'p',
                null,
                'Status ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Status,
                options: status_options,
                placeholder: 'Set your job status',
                className: 'status_box',
                defaultValue: [{ label: status, value: status }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'email' },
              _react2.default.createElement(
                'p',
                null,
                'Email Visible? ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_email,
                options: email_options,
                placeholder: 'Show/Don\'t show email?',
                className: 'email_box',
                defaultValue: [{ label: email_visibility, value: email_visibility }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'games_ardour_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                'Games of ardour'
              ),
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                loadOptions: this.getOptions,
                onChange: this.handleChange_ardour,
                onCreateOption: this.handleCreate_ardour,
                isClearable: true,
                value: _value_ardour,
                className: 'games_ardour_box',
                placeholder: 'Games your passionate about',
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                }
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'career-highlights' },
              _react2.default.createElement(
                'p',
                null,
                'Career Highlights'
              ),
              _react2.default.createElement('textarea', {
                id: 'career_highlights_box',
                className: 'career_highlights_box',
                rows: 8,
                cols: 80,
                defaultValue: career_highlights,
                maxLength: '254',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'line-break' },
              _react2.default.createElement('hr', null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'line-break' },
              _react2.default.createElement('hr', null)
            ),
            'Add Role Info:',
            _react2.default.createElement('div', null),
            _react2.default.createElement(
              'div',
              { className: 'role-title' },
              _react2.default.createElement(
                'p',
                null,
                'Role Title ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'role_title_box',
                className: 'role_title_box',
                maxLength: '120',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'gName_txtBox2' },
              _react2.default.createElement(
                'p',
                null,
                'Game Name ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
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
                className: 'game_name_box2',
                placeholder: 'Enter Game name',
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                }
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'team-name' },
              _react2.default.createElement(
                'p',
                null,
                'Team name'
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'team_name_box',
                className: 'team_name_box',
                maxLength: '120',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'played' },
              _react2.default.createElement(
                'p',
                null,
                'Time in Role: ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Played,
                options: played_options,
                placeholder: 'Select time in role',
                className: 'played_box',
                defaultValue: [{ label: 'Less than 3 months', value: 1 }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'achievements' },
              _react2.default.createElement(
                'p',
                null,
                'Achievements in this role'
              ),
              _react2.default.createElement('textarea', {
                id: 'achievements_box',
                className: 'achievements_box',
                rows: 8,
                cols: 80,
                defaultValue: '',
                maxLength: '254',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'tag_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  { style: { color: 'green' } },
                  'S'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'dodgerblue' } },
                  'k'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  'i'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'gold' } },
                  'l'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'green' } },
                  'l'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'dodgerblue' } },
                  's'
                ),
                ' (Keywords that identify ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'green' } },
                  'y'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'dodgerblue' } },
                  'o'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  'u'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'gold' } },
                  'r'
                ),
                ' expertise with this role. Max 250 chars)'
              ),
              _react2.default.createElement(_Creatable2.default, {
                onChange: this.handleChange3,
                options: _options_tags2,
                onCreateOption: this.handleCreate3,
                isClearable: true,
                isDisabled: isLoading_tags,
                isLoading: isLoading_tags,
                value: _value_tags,
                className: 'tag_name_box',
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                }
              })
            ),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement(
              'div',
              { className: 'save-btn' },
              _react2.default.createElement(
                'button',
                { className: 'save', onClick: this.submitForm },
                'Save'
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area addEsportsExp-page' },
          'Loading'
        );
      }
    }
  }]);
  return AddEsportsExp;
}(_react.Component);

exports.default = AddEsportsExp;

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(55);

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

    _this.handleCloseModal = function () {
      _this.setState({ redirect_profile: true });
    };

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
      var myExperience, myPlayed, myRatings, myTags, newGameID, i, post, j, tmpnewGameID, _post, _post2;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myExperience = '';
              myPlayed = '';
              myRatings = '';
              myTags = '';

              if (!(_this.state.value == '' || _this.state.value == null)) {
                _context.next = 7;
                break;
              }

              alert('Sorry mate! Game name can not be blank');
              return _context.abrupt('return');

            case 7:
              if (!(_this.state.status_box == '' || _this.state.status_box == null)) {
                _context.next = 10;
                break;
              }

              alert('Sorry mate! Status name can not be blank');
              return _context.abrupt('return');

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

              newGameID = '';

              if (!(_this.state.newValueCreated != '')) {
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
              _context.t0 = _context['catch'](18);

              console.log(_context.t0);

            case 28:
              return _context.abrupt('break', 32);

            case 29:
              i++;
              _context.next = 16;
              break;

            case 32:
              if (!(_this.state.newValueCreated_tags != '')) {
                _context.next = 57;
                break;
              }

              tmpnewGameID = '';

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

              if (!(tmpnewGameID != '')) {
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
              _context.t1 = _context['catch'](40);

              console.log(_context.t1);

            case 50:
              return _context.abrupt('break', 54);

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
                  myTags += self.state.value_tags[i].label + '; ';
                }
                myTags = myTags.trim().replace(/; /g, ',').trim();
                myTags = myTags.replace(/;/g, '');
                myTags = myTags.replace(/,/g, ', ');
              }

              _this.state.comments_box == undefined ? undefined : _this.state.comments_box = _this.state.comments_box.trim();
              _this.state.link_box == undefined ? undefined : _this.state.link_box = _this.state.link_box.trim();

              if (_this.state.just_one_time) {
                _context.next = 62;
                break;
              }

              return _context.abrupt('return');

            case 62:
              _this.state.just_one_time = false;

              _context.prev = 63;
              _context.next = 66;
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

            case 66:
              _post2 = _context.sent;

              _this.handleCloseModal();
              _context.next = 73;
              break;

            case 70:
              _context.prev = 70;
              _context.t2 = _context['catch'](63);

              console.log(_context.t2);

            case 73:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[18, 25], [40, 47], [63, 70]]);
    }));

    _this.handleCreate = function (inputValue) {
      setTimeout(function () {
        var _this$state = _this.state,
            value = _this$state.value,
            newValueCreated = _this$state.newValueCreated;

        var newOption = createOption(inputValue, null);
        _this.setState({ value: newOption });
        _this.setState({ value_tags: '' });
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
        _this.setState({
          newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label])
        });
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

                  self.setState({ options_tags: '' });
                  self.setState({ value_tags: '' });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get('/api/Tags/' + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt('return');

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt('return');

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = '';
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 20:
                case 'end':
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
      game_name_box: '',
      status_box: '',
      experience_box: '',
      played_box: '',
      ratings_box: '',
      comments_box: '',
      link_box: '',
      isLoading_tags: false,
      options_tags: '',
      value_tags: [],
      newValueCreated_tags: [],
      isLoading: false,
      options: '',
      value: [],
      newValueCreated: [],
      comments_chkbox: false,
      link_chkbox: false,
      just_one_time: true,
      redirect_profile: false
    };
    return _this;
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

  (0, _createClass3.default)(AddGamingExp, [{
    key: 'getOptions',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(inputValue == '' || inputValue == undefined)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', []);

              case 2:
                _context3.prev = 2;

                inputValue = inputValue.trimStart();
                _context3.next = 6;
                return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

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
                return _context3.abrupt('return', []);

              case 14:
                return _context3.abrupt('return', newArr);

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](2);

                console.log(_context3.t0);

              case 20:
              case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_profile) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      var _state = this.state,
          isLoading = _state.isLoading,
          options = _state.options,
          value = _state.value,
          isLoading_tags = _state.isLoading_tags,
          options_tags = _state.options_tags,
          value_tags = _state.value_tags;

      return _react2.default.createElement(
        'div',
        { className: 'content-area addGamingExp-page' },
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
            className: 'addGamingModal',
            overlayClassName: 'Overlay' },
          'Add Gaming Interest:',
          _react2.default.createElement('i', { className: 'fas fa-times', onClick: this.handleCloseModal }),
          _react2.default.createElement(
            'div',
            { className: 'gName_txtBox' },
            _react2.default.createElement(
              'p',
              null,
              'Game Name ',
              _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                '*'
              )
            ),
            _react2.default.createElement(_AsyncCreatable2.default, {
              cacheOptions: true,
              defaultOptions: true,
              loadOptions: this.getOptions,
              isClearable: true,
              onChange: this.handleChange2,
              value: value,
              className: 'game_name_box',
              onCreateOption: this.handleCreate,
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
              },
              placeholder: 'Enter in a Game name'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'status' },
            _react2.default.createElement(
              'p',
              null,
              'Status ',
              _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                '*'
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Status,
              options: status_options,
              placeholder: 'Set your status',
              className: 'status_box'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'experience' },
            _react2.default.createElement(
              'p',
              null,
              'Experience:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              placeholder: 'Select experience level',
              className: 'experience_box'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'played' },
            _react2.default.createElement(
              'p',
              null,
              'Time Played:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Played,
              options: played_options,
              placeholder: 'Select time played',
              className: 'played_box',
              defaultValue: [{ label: 'Less than 1 year', value: 1 }]
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'ratings' },
            _react2.default.createElement(
              'p',
              null,
              'Ratings:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Ratings,
              options: rating_options,
              placeholder: 'Select game ratings',
              className: 'ratings_box'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'options_checkbox' },
            _react2.default.createElement(
              'p',
              null,
              'Show Link box and/or Comments box'
            ),
            _react2.default.createElement('input', {
              id: 'link_ChkBox',
              type: 'checkbox',
              defaultChecked: this.state.link_chkbox,
              onChange: this.toggleChange_link
            }),
            ' ',
            'Link',
            _react2.default.createElement('input', {
              id: 'comments_ChkBox',
              type: 'checkbox',
              defaultChecked: this.state.comments_chkbox,
              onChange: this.toggleChange_comments
            }),
            ' ',
            'Comments'
          ),
          _react2.default.createElement(
            'div',
            { className: 'tag_txtBox' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: 'green' } },
                'T'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'dodgerblue' } },
                'a'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                'g'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'gold' } },
                's'
              ),
              ' (Keywords that identify',
              ' ',
              _react2.default.createElement(
                'span',
                { style: { color: 'green' } },
                'y'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'dodgerblue' } },
                'o'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                'u'
              ),
              _react2.default.createElement(
                'span',
                { style: { color: 'gold' } },
                'r'
              ),
              ' unique experience with this game. Max 250 chars)'
            ),
            _react2.default.createElement(_Creatable2.default, {
              onChange: this.handleChange3,
              options: options_tags,
              onCreateOption: this.handleCreate2,
              isClearable: true,
              isDisabled: isLoading_tags,
              isLoading: isLoading_tags,
              value: value_tags,
              className: 'tag_name_box',
              isMulti: true,
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
              }
            })
          ),
          this.state.link_chkbox == false ? _react2.default.createElement('div', { className: 'link_txtBox' }) : _react2.default.createElement(
            'div',
            { className: 'link_txtBox' },
            _react2.default.createElement(
              'p',
              null,
              'Link'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'link_box',
              className: 'link_box',
              maxLength: '50',
              onChange: this.handleChange
            })
          ),
          this.state.comments_chkbox == false ? _react2.default.createElement('div', { className: 'comments' }) : _react2.default.createElement(
            'div',
            { className: 'comments' },
            _react2.default.createElement(
              'p',
              null,
              'Comments'
            ),
            _react2.default.createElement('textarea', {
              id: 'comments_box',
              className: 'comments_box',
              rows: 8,
              cols: 80,
              defaultValue: '',
              maxLength: '254',
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'save-btn' },
            _react2.default.createElement(
              'button',
              { className: 'save', onClick: this.submitForm },
              'Save'
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

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _AddScheduleGames_Header = __webpack_require__(444);

var _AddScheduleGames_Header2 = _interopRequireDefault(_AddScheduleGames_Header);

var _AddScheduleGames_Dota = __webpack_require__(443);

var _AddScheduleGames_Dota2 = _interopRequireDefault(_AddScheduleGames_Dota);

var _AddScheduleGames_Clash_Royale = __webpack_require__(442);

var _AddScheduleGames_Clash_Royale2 = _interopRequireDefault(_AddScheduleGames_Clash_Royale);

var _Utility_Function = __webpack_require__(166);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOption = function createOption(label, game_names_id) {
  return {
    label: label,
    value: label,
    game_names_id: game_names_id
  };
};

function isValidNewOption(inputValue, selectValue, selectOptions) {
  return !(!inputValue || selectValue.some(function (option) {
    return compareOption(inputValue, option);
  }) || selectOptions.some(function (option) {
    return compareOption(inputValue, option);
  }));
}

var compareOption = function compareOption(inputValue, option) {
  var candidate = typeof inputValue === 'string' ? inputValue.toLowerCase() : inputValue;
  if (typeof option.value === 'string') {
    if (option.value.toLowerCase() === candidate) {
      return true;
    }
  }
  if (typeof option.label === 'string') {
    if (option.label.toLowerCase() === candidate) {
      return true;
    }
  }
  return option.value === candidate || option.label === candidate;
};

var AddScheduleGames = function (_Component) {
  (0, _inherits3.default)(AddScheduleGames, _Component);

  function AddScheduleGames() {
    (0, _classCallCheck3.default)(this, AddScheduleGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddScheduleGames.__proto__ || Object.getPrototypeOf(AddScheduleGames)).call(this));

    _this.handleCreate_game_name = function (inputValue) {
      setTimeout(function () {
        var newOption = createOption(inputValue, null);
        _this.setState({ game_name_box: newOption });
      }, 300);
    };

    _this.handleChange_game_name = function (entered_name) {
      _this.setState({
        game_name_box: entered_name,
        default: false,
        games: false
      }, function () {
        if (entered_name) {
          switch (entered_name.value) {
            case 'Dota 2':
              _this.setState({ games: true });
              break;
            case 'Clash Royale':
              _this.setState({ games: true });
              break;
            default:
              _this.setState({ default: true });
          }
        } else {
          _this.setState({ default: true });
        }
      });
    };

    _this.showHeaders = function () {
      return _react2.default.createElement(_AddScheduleGames_Header2.default, { game_name_box: _this.state.game_name_box, props: _this.props });
    };

    _this.showGames = function () {
      switch (_this.state.game_name_box.value) {
        case 'Dota 2':
          return _react2.default.createElement(_AddScheduleGames_Dota2.default, { game_name_box: _this.state.game_name_box, props: _this.props });
          break;
        case 'Clash Royale':
          return _react2.default.createElement(_AddScheduleGames_Clash_Royale2.default, { game_name_box: _this.state.game_name_box, props: _this.props });
          break;
      }
    };

    _this.onKeyDown = function (e) {
      (0, _Utility_Function.Disable_keys)(e);
    };

    _this.state = {
      game_name_box: '',
      default: true,
      games: false
    };
    return _this;
  }

  (0, _createClass3.default)(AddScheduleGames, [{
    key: 'getOptions',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(inputValue) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _Utility_Function.Game_name_values)(inputValue));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOptions(_x) {
        return _ref.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-area addscheduleGames-page' },
        _react2.default.createElement(
          'div',
          { id: 'header-2' },
          _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-18.png' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'div',
            { className: 'game-name' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'label',
                null,
                'Game Name: ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              )
            ),
            _react2.default.createElement(_AsyncCreatable2.default, {
              cacheOptions: true,
              defaultOptions: true,
              isValidNewOption: isValidNewOption,
              loadOptions: this.getOptions,
              onChange: this.handleChange_game_name,
              onCreateOption: this.handleCreate_game_name,
              isClearable: true,
              value: this.state.game_name_box,
              onBlur: this.onBlur_game_name,
              onFocus: this.onFocus_game_name,
              className: 'game_name_box',
              placeholder: 'Enter Game name',
              onInputChange: function onInputChange(inputValue) {
                return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
              },
              onKeyDown: this.onKeyDown
            })
          )
        ),
        this.state.default && this.showHeaders(),
        this.state.games && this.showGames()
      );
    }
  }]);
  return AddScheduleGames;
}(_react.Component);

exports.default = AddScheduleGames;

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _Async = __webpack_require__(364);

var _Async2 = _interopRequireDefault(_Async);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AdvancedSearchPost = __webpack_require__(445);

var _AdvancedSearchPost2 = _interopRequireDefault(_AdvancedSearchPost);

var _reactCountryRegionSelector = __webpack_require__(557);

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
        value_tags: ''
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
          if (_this.state.selected_table.value != 'Gaming Experience') {
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
        _this.setState({
          newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label])
        });
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

                  self.setState({ options_tags: '' });
                  self.setState({ value_tags: '' });

                  if (!(value != null)) {
                    _context.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context.next = 10;
                    break;
                  }

                  _context.next = 7;
                  return _axios2.default.get('/api/Tags/' + value.game_names_id);

                case 7:
                  allTags = _context.sent;
                  _context.next = 11;
                  break;

                case 10:
                  return _context.abrupt('return');

                case 11:
                  _context.next = 14;
                  break;

                case 13:
                  return _context.abrupt('return');

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = '';
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context.next = 20;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 20:
                case 'end':
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
      selected_table: '',
      selected_experience: null,
      selected_platform: null,
      role_title_box: '',
      team_name_box: '',
      other_box: '',
      when: null,
      tmp_time: '',
      value: '',
      status_box: '',
      played_box: '',
      ratings_box: '',
      commendation_box: '',
      options_tags: '',
      value_tags: [],
      newValueCreated_tags: [],
      country_: '',
      time_role_box: ''
    };
    return _this;
  }

  (0, _createClass3.default)(AdvancedSearch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var myGame_name_box = '1981`^';
      var myStatus = '1981`^';
      var myExperience = '1981`^';
      var myPlayed = '1981`^';
      var myRatings = '1981`^';
      var myCommendation = '1981`^';
      var myTags = '1981`^';
      var myCountry = '1981`^';

      var match = this.props.routeProps.match;


      this.state.selected_table = {
        label: 'Gaming Experience',
        value: 'Gaming Experience'
      };

      if (match.params.id != undefined && match.params.id != '') {
        this.handleCreate2(match.params.id);
        if (match.params.table == 'Esports Experience') {
          this.state.selected_table = {
            label: 'Esports Experience',
            value: 'Esports Experience'
          };
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
                  return _axios2.default.get('/api/GameExperiences/filtered/' + myGame_name_box + '/' + myStatus + '/' + myExperience + '/' + myPlayed + '/' + myRatings + '/' + myCommendation + '/' + myTags + '/' + myCountry);

                case 3:
                  allGameExperiences = _context2.sent;

                  self.setState({
                    allGameExperiences: allGameExperiences.data.latestGameExperiences[0]
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
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
    key: 'selectCountry',
    value: function selectCountry(val) {
      var _this2 = this;

      this.setState({
        country_: val
      }, function () {
        _this2.pullData();
      });
    }
  }, {
    key: 'pullData',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var myTable, myGame_name_box, myStatus, myExperience, myPlayed, myRatings, myTags, myCommendation, myCountry, myRole_title, myTeam_name, myTime_role, i, allGameExperiences, alleSportsExperiences;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                myTable = '';
                myGame_name_box = '1981`^';
                myStatus = '1981`^';
                myExperience = '1981`^';
                myPlayed = '1981`^';
                myRatings = '1981`^';
                myTags = '1981`^';
                myCommendation = '1981`^';
                myCountry = '1981`^';
                myRole_title = '1981`^';
                myTeam_name = '1981`^';
                myTime_role = '1981`^';


                if (this.state.selected_table != '' && this.state.selected_table != undefined && this.state.selected_table.length != 0) {
                  myTable = this.state.selected_table.label;
                }

                if (this.state.selected_experience != null && this.state.selected_experience != undefined && this.state.selected_experience.length != 0) {
                  myExperience = this.state.selected_experience.label;
                }

                if (this.state.value != null && this.state.value != '' && this.state.value.length != 0) {
                  myGame_name_box = this.state.value.label.trim();
                }

                if (this.state.status_box != '' && this.state.status_box != null && this.state.status_box.length != 0) {
                  myStatus = this.state.status_box.label;
                }

                if (this.state.played_box != '' && this.state.played_box != null && this.state.played_box.length != 0) {
                  myPlayed = this.state.played_box.value;
                }

                if (this.state.ratings_box != '' && this.state.ratings_box != null && this.state.ratings_box.length != 0) {
                  myRatings = this.state.ratings_box.value;
                }

                if (this.state.commendation_box != '' && this.state.commendation_box != null && this.state.commendation_box.length != 0) {
                  myCommendation = this.state.commendation_box.value;
                }

                if (this.state.country_ != '' && this.state.country_ != null && this.state.country_.length != 0) {
                  myCountry = this.state.country_;
                }

                if (this.state.value_tags !== null && this.state.value_tags.length !== 0) {
                  for (i = 0; i < this.state.value_tags.length; i++) {
                    myTags += this.state.value_tags[i].label + '; ';
                  }
                  myTags = myTags.trim().replace(/; /g, ',').trim();
                  myTags = myTags.replace(/;/g, '');
                  myTags = myTags.replace(/,/g, ', ');
                }

                if (this.state.role_title_box != '' && this.state.role_title_box != undefined) {
                  myRole_title = this.state.role_title_box;
                }

                if (this.state.team_name_box != '' && this.state.team_name_box != undefined) {
                  myTeam_name = this.state.team_name_box;
                }

                if (this.state.time_role_box != '' && this.state.time_role_box != null && this.state.time_role_box.length != 0) {
                  myTime_role = this.state.time_role_box.value;
                }

                if (!(myTable == 'Gaming Experience')) {
                  _context3.next = 37;
                  break;
                }

                _context3.prev = 25;
                _context3.next = 28;
                return _axios2.default.get('/api/GameExperiences/filtered/' + myGame_name_box + '/' + myStatus + '/' + myExperience + '/' + myPlayed + '/' + myRatings + '/' + myCommendation + '/' + myTags + '/' + myCountry);

              case 28:
                allGameExperiences = _context3.sent;


                this.setState({
                  allGameExperiences: allGameExperiences.data.latestGameExperiences[0]
                });
                _context3.next = 35;
                break;

              case 32:
                _context3.prev = 32;
                _context3.t0 = _context3['catch'](25);

                console.log(_context3.t0);

              case 35:
                _context3.next = 42;
                break;

              case 37:
                if (!(myTable == 'Esports Experience')) {
                  _context3.next = 42;
                  break;
                }

                _context3.next = 40;
                return _axios2.default.get('/api/esports_experiences/filtered/' + myGame_name_box + '/' + myRole_title + '/' + myTeam_name + '/' + myTime_role + '/' + myTags + '/' + myCountry);

              case 40:
                alleSportsExperiences = _context3.sent;


                this.setState({
                  allGameExperiences: alleSportsExperiences.data.latestGameExperiences[0]
                });

              case 42:
              case 'end':
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
    key: 'getOptions',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(inputValue == '' || inputValue == undefined)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', []);

              case 2:
                _context4.prev = 2;

                inputValue = inputValue.trimStart();
                _context4.next = 6;
                return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

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
                return _context4.abrupt('return', []);

              case 14:
                return _context4.abrupt('return', newArr);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4['catch'](2);

                console.log(_context4.t0);

              case 20:
              case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.allGameExperiences !== undefined) {
        var show_gaming_exp = true;

        if (this.state.selected_table.label == 'Esports Experience') {
          show_gaming_exp = false;
        }
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
          _react2.default.createElement(
            'div',
            { className: 'content-area advancedSearch-page' },
            _react2.default.createElement(
              'div',
              { id: 'header-2' },
              _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-12.png' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'filterMenu' },
              _react2.default.createElement(
                'div',
                { className: 'row-one' },
                _react2.default.createElement(
                  'div',
                  { className: 'table-name' },
                  _react2.default.createElement(_reactSelect2.default, {
                    onChange: this.handleChange_table,
                    options: table_options,
                    placeholder: 'Select which table',
                    name: 'table-box',
                    defaultValue: this.state.selected_table
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'game-name' },
                  _react2.default.createElement(_Async2.default, {
                    cacheOptions: true,
                    defaultOptions: true,
                    loadOptions: this.getOptions,
                    isClearable: true,
                    onChange: this.handleChange_GameName,
                    value: this.state.value,
                    className: 'game-name-box',
                    placeholder: 'Game name',
                    onInputChange: function onInputChange(inputValue) {
                      return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                    }
                  })
                )
              ),
              show_gaming_exp && _react2.default.createElement(
                'div',
                { className: 'gaming-experience' },
                _react2.default.createElement(
                  'div',
                  { className: 'row-two' },
                  _react2.default.createElement(
                    'div',
                    { className: 'status' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Status,
                      options: status_options,
                      placeholder: 'Select status',
                      name: 'status-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'experience' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Experience,
                      options: experience_options,
                      placeholder: 'Select experience level',
                      name: 'experience-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'played' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Played,
                      options: played_options,
                      placeholder: 'Select time played',
                      className: 'played-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'ratings' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Ratings,
                      options: rating_options,
                      placeholder: 'Select game ratings',
                      className: 'ratings-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'commendation' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Commendation,
                      options: commendation_options,
                      placeholder: 'Select commendation',
                      className: 'commendation-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'tag_txtBox' },
                    _react2.default.createElement(_Creatable2.default, {
                      onChange: this.handleChange3,
                      options: this.state.options_tags,
                      onCreateOption: this.handleCreate2,
                      isClearable: true,
                      value: this.state.value_tags,
                      className: 'tag-name-box',
                      placeholder: 'Tags',
                      isMulti: true,
                      defaultValue: this.state.value_tags,
                      onInputChange: function onInputChange(inputValue) {
                        return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                      }
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'location' },
                    _react2.default.createElement(_reactCountryRegionSelector.CountryDropdown, {
                      value: this.state.country_,
                      onChange: function onChange(val) {
                        return _this3.selectCountry(val);
                      },
                      valueType: 'full',
                      style: {
                        fontSize: 15.2,
                        width: '88%'
                      }
                    })
                  )
                )
              ),
              !show_gaming_exp && _react2.default.createElement(
                'div',
                { className: 'esports-experience' },
                _react2.default.createElement(
                  'div',
                  { className: 'row-two' },
                  _react2.default.createElement(
                    'div',
                    { className: 'role-title' },
                    _react2.default.createElement('input', {
                      type: 'text',
                      className: 'role-title-box',
                      onChange: this.handleChange_role_title,
                      value: this.state.role_title_box,
                      placeholder: 'Role Title'
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'team-name' },
                    _react2.default.createElement('input', {
                      type: 'text',
                      className: 'team-name-box',
                      onChange: this.handleChange_team_name,
                      value: this.state.team_name_box,
                      placeholder: 'Team Name'
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'e-played' },
                    _react2.default.createElement(_reactSelect2.default, {
                      onChange: this.handleChange_Time_role,
                      options: e_played_options,
                      placeholder: 'Time in Role',
                      className: 'e-played-box',
                      isClearable: true
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'skill-txtBox' },
                    _react2.default.createElement(_Creatable2.default, {
                      onChange: this.handleChange3,
                      options: this.state.options_tags,
                      onCreateOption: this.handleCreate2,
                      isClearable: true,
                      value: this.state.value_tags,
                      className: 'skill-name-box',
                      placeholder: 'Skills',
                      isMulti: true,
                      onInputChange: function onInputChange(inputValue) {
                        return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                      }
                    })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'location' },
                    _react2.default.createElement(_reactCountryRegionSelector.CountryDropdown, {
                      value: this.state.country_,
                      onChange: function onChange(val) {
                        return _this3.selectCountry(val);
                      },
                      valueType: 'full',
                      style: {
                        fontSize: 15.2,
                        width: '88%'
                      }
                    })
                  )
                )
              )
            ),
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          'Loading'
        );
      }
    }
  }]);
  return AdvancedSearch;
}(_react.Component);

exports.default = AdvancedSearch;

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _ArchivedScheduledGamePost = __webpack_require__(446);

var _ArchivedScheduledGamePost2 = _interopRequireDefault(_ArchivedScheduledGamePost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArchivedScheduledGames = function (_Component) {
  (0, _inherits3.default)(ArchivedScheduledGames, _Component);

  function ArchivedScheduledGames() {
    (0, _classCallCheck3.default)(this, ArchivedScheduledGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArchivedScheduledGames.__proto__ || Object.getPrototypeOf(ArchivedScheduledGames)).call(this));

    _this.showLatestPosts = function () {
      if (_this.state.myScheduledGames != undefined) {
        return _this.state.myScheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ArchivedScheduledGamePost2.default, {
            schedule_game: item,
            key: index,
            user: _this.props.initialData
          });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(ArchivedScheduledGames, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var match = this.props.routeProps.match;


      var getExactData = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var myArchiveScheduledGame;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/ArchiveScheduleGame/filtered_by_one/' + match.params.id);

                case 3:
                  myArchiveScheduledGame = _context.sent;

                  self.setState({
                    myScheduledGames: myArchiveScheduledGame.data.latestScheduledGames
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getExactData() {
          return _ref.apply(this, arguments);
        };
      }();

      if (match.params.id != undefined && match.params.id != '') {
        getExactData();
      } else {
        self.setState({
          myScheduledGames: []
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myScheduledGames !== undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
          _react2.default.createElement(
            'div',
            { className: 'content-area scheduleGames-page' },
            _react2.default.createElement(
              'div',
              { id: 'header-2' },
              _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-19.png' })
            ),
            _react2.default.createElement('div', { className: 'da-gap' }),
            this.showLatestPosts()
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          'Loading'
        );
      }
    }
  }]);
  return ArchivedScheduledGames;
}(_react.Component);

exports.default = ArchivedScheduledGames;

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactModal = __webpack_require__(55);

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactPlacesAutocomplete = __webpack_require__(638);

var _reactPlacesAutocomplete2 = _interopRequireDefault(_reactPlacesAutocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactModal2.default.setAppElement('#app');

var searchOptions = {
  types: ['(regions)']
};

var relationship_status_options = [{ value: 'Waiting for Player 2', label: 'Waiting for Player 2' }, {
  value: 'Game in progress',
  label: 'Game in progress'
}];

var Dossier = function (_Component) {
  (0, _inherits3.default)(Dossier, _Component);

  function Dossier() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Dossier);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dossier.__proto__ || Object.getPrototypeOf(Dossier)).call(this));

    _this.handleCloseModal = function () {
      _this.setState({ redirect_: true });
    };

    _this.testModal = function (e) {
      _this.setState({ shouldCloseOnOverlayClick_: true });
    };

    _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_address = function (address) {
      _this.setState({ address: address });
    };

    _this.handleSelect = function (final_add) {
      _this.setState({ final_add: final_add });
      _this.setState({ address: final_add });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.handleChange_Relationship_Status = function (relationship_status_box) {
      _this.setState({ relationship_status_box: relationship_status_box });
      _this.setState({ shouldCloseOnOverlayClick_: false });
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var relationship_status, arrTags, i, post;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.state.country_ = '';
              _this.state.region_ = '';

              relationship_status = null;

              if (!(_this.state.first_name_box == '' || _this.state.first_name_box == undefined)) {
                _context.next = 6;
                break;
              }

              alert("Sorry mate! First & Last name can't be blank");
              return _context.abrupt('return');

            case 6:
              if (!(_this.state.last_name_box == '' || _this.state.last_name_box == undefined)) {
                _context.next = 9;
                break;
              }

              alert("Sorry mate! First & Last name can't be blank");
              return _context.abrupt('return');

            case 9:
              if (_this.state.address.length) {
                _context.next = 14;
                break;
              }

              alert("Sorry mate! Location can't be blank");
              return _context.abrupt('return');

            case 14:
              if (!(_this.state.address != _this.state.final_add)) {
                _context.next = 17;
                break;
              }

              alert('Sorry mate! You have to pick a location from the list');
              return _context.abrupt('return');

            case 17:

              if (_this.state.relationship_status_box != null && _this.state.relationship_status_box != undefined && _this.state.relationship_status_box.length != 0) {
                relationship_status = _this.state.relationship_status_box.value;
              }

              arrTags = _this.state.address.split(',');

              if (arrTags.length == 1) {
                _this.state.country_ = arrTags[0];
              } else {
                for (i = 0; i < arrTags.length; i++) {
                  if (i == arrTags.length - 1) {
                    _this.state.country_ = arrTags[i].trim();
                  } else {
                    _this.state.region_ += arrTags[i] + ',';
                  }
                }
              }

              if (_this.state.just_one_time) {
                _context.next = 22;
                break;
              }

              return _context.abrupt('return');

            case 22:
              _this.state.just_one_time = false;

              _context.prev = 23;
              _context.next = 26;
              return _axios2.default.post('/api/user', {
                first_name_box: _this.state.first_name_box,
                last_name_box: _this.state.last_name_box,
                slogan: _this.state.slogan_box,
                bio: _this.state.bio_box,
                country: _this.state.country_,
                region: _this.state.region_,
                contact_info: _this.state.contact_info_box,
                relationship_status: relationship_status
              });

            case 26:
              post = _context.sent;

              _this.handleCloseModal();
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](23);

              console.log(_context.t0);

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[23, 30]]);
    }));

    _this.state = {
      shouldCloseOnOverlayClick_: true,
      intial_trigger: true,
      first_name_box: '',
      last_name_box: '',
      country_: '',
      region_: '',
      slogan_box: '',
      bio_box: '',
      contact_info_box: '',
      address: '',
      final_add: '',
      just_one_time: true,
      redirect_: false,
      relationship_status_box: ''
    };
    return _this;
  }

  (0, _createClass3.default)(Dossier, [{
    key: 'componentWillMount',
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
                  return _axios2.default.get('/api/user/' + match.params.id);

                case 3:
                  userProfile = _context2.sent;

                  self.setState({
                    userProfile: userProfile.data.user[0]
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

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
            contact_info = _state$userProfile.contact_info,
            relationship_status = _state$userProfile.relationship_status;

        if (this.state.intial_trigger) {
          this.setState({ first_name_box: first_name });
          this.setState({ last_name_box: last_name });
          this.setState({ address: region + country });
          this.setState({ final_add: region + country });
          this.setState({ slogan_box: slogan });
          this.setState({ bio_box: bio });
          this.setState({ relationship_status_box: relationship_status });
          this.setState({ intial_trigger: false });
        }
        var stupid_hack = false;
        if (relationship_status == null) {
          stupid_hack = true;
        }
        return _react2.default.createElement(
          'div',
          { className: 'content-area dossier-page' },
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
              className: 'Modal',
              overlayClassName: 'Overlay',
              style: {
                content: {
                  backgroundColor: '#151b26'
                }
              } },
            'Edit intro:',
            _react2.default.createElement('i', { className: 'fas fa-times', onClick: this.handleCloseModal }),
            _react2.default.createElement(
              'div',
              { className: 'fName_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                'First Name ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'first_name_box',
                className: 'first_name_box',
                maxLength: '50',
                defaultValue: '' + first_name,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'lName_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                'Last Name ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'last_name_box',
                className: 'last_name_box',
                maxLength: '50',
                defaultValue: '' + last_name,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'location' },
              _react2.default.createElement(
                'p',
                null,
                'Location ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(
                _reactPlacesAutocomplete2.default,
                {
                  value: this.state.address,
                  onChange: this.handleChange_address,
                  onSelect: this.handleSelect,
                  searchOptions: searchOptions },
                function (_ref3) {
                  var getInputProps = _ref3.getInputProps,
                      suggestions = _ref3.suggestions,
                      getSuggestionItemProps = _ref3.getSuggestionItemProps,
                      loading = _ref3.loading;
                  return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    })),
                    suggestions.length > 0 && _react2.default.createElement(
                      'div',
                      { className: 'autocomplete-dropdown-container' },
                      loading && _react2.default.createElement(
                        'div',
                        null,
                        'Loading...'
                      ),
                      suggestions.map(function (suggestion) {
                        var className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                        // inline style for demonstration purpose
                        var style = suggestion.active ? { backgroundColor: '#fff', cursor: 'pointer' } : { backgroundColor: '#151b26', cursor: 'pointer' };
                        return _react2.default.createElement(
                          'div',
                          getSuggestionItemProps(suggestion, {
                            className: className,
                            style: style
                          }),
                          _react2.default.createElement(
                            'span',
                            null,
                            suggestion.description
                          )
                        );
                      })
                    )
                  );
                }
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'realtionship-status' },
              _react2.default.createElement(
                'p',
                null,
                'Relationship Status (Only visible to friends)'
              ),
              stupid_hack && _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Relationship_Status,
                options: relationship_status_options,
                placeholder: 'Set your relationship status',
                className: 'relationship_status_box',
                isClearable: true
              }),
              !stupid_hack && _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Relationship_Status,
                options: relationship_status_options,
                placeholder: 'Set your relationship status',
                className: 'relationship_status_box',
                defaultValue: [{ label: relationship_status, value: relationship_status }],
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'contact-info' },
              _react2.default.createElement(
                'p',
                null,
                'Contact Info (Only visible to friends)'
              ),
              _react2.default.createElement('textarea', {
                id: 'contact_info_box',
                className: 'contact_info_box',
                rows: 8,
                cols: 80,
                maxLength: '254',
                defaultValue: '' + contact_info,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'slogan' },
              _react2.default.createElement(
                'p',
                null,
                'Slogan'
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'slogan_box',
                className: 'slogan_box',
                maxLength: '120',
                defaultValue: '' + slogan,
                onBlur: this.onBlur_slogan_box,
                onFocus: this.onFocus_slogan_box,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'bio' },
              _react2.default.createElement(
                'p',
                null,
                'Brief Bio'
              ),
              _react2.default.createElement('textarea', {
                id: 'bio_box',
                className: 'bio_box',
                rows: 8,
                cols: 80,
                maxLength: '254',
                defaultValue: '' + bio,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              ' '
            ),
            _react2.default.createElement(
              'div',
              { className: 'save-btn' },
              _react2.default.createElement(
                'button',
                { className: 'save', onClick: this.submitForm },
                'Save'
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area dossier-page' },
          'Loading'
        );
      }
    }
  }]);
  return Dossier;
}(_react.Component);

exports.default = Dossier;

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(55);

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
    value: value,
    label: label
  };
};

var EditEsportsExp = function (_Component) {
  (0, _inherits3.default)(EditEsportsExp, _Component);

  function EditEsportsExp() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, EditEsportsExp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditEsportsExp.__proto__ || Object.getPrototypeOf(EditEsportsExp)).call(this));

    _this.handleCloseModal = function () {
      _this.setState({ redirect_: true });
    };

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

    _this.delete_exp = function () {
      var match = _this.props.routeProps.match;


      try {
        var myesportsexp = _axios2.default.get('/api/esports_experiences/delete/' + match.params.esportsExp_id);
      } catch (error) {
        console.log(error);
      }
      _this.handleCloseModal();
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var myardour, myPlayed, myTags, _OGstatus, _OGstatus_exp, uShallNotPass, ardourNgame_name_same_same, newOption, name_trigger, i, j, post, newGame_name, newGameID, _post, tmpnewGameID, _post2, post_bio, _post_bio, match, update_exp;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myardour = '';
              myPlayed = '';
              myTags = '';
              _OGstatus = true;
              _OGstatus_exp = true;
              uShallNotPass = false;
              ardourNgame_name_same_same = false;


              if (_this.state.value_game_name == null || _this.state.value_game_name == '') {
                newOption = createOption('');

                _this.state.value_game_name = newOption;
                _this.state.value_game_name.game_names_id = null;
              }

              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.status_box.label == '' || _this.state.status_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_status_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (_this.state.email_box.label == '' || _this.state.email_box.label == null) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_email_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_email_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 14;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt('return');

            case 14:

              if (_this.state.played_box.label != '' && _this.state.played_box.label != undefined) {
                myPlayed = _this.state.played_box.value;
              }

              if (_this.state.team_name_box.trim() != '') {
                uShallNotPass = true;
              } else if (myPlayed != '') {
                uShallNotPass = true;
              } else if (_this.state.achievements_box.trim() != '') {
                uShallNotPass = true;
              } else if (myTags != '') {
                uShallNotPass = true;
              } else if (_this.state.role_title_box != '') {
                uShallNotPass = true;
              } else if (_this.state.value_game_name.length != 0) {
                uShallNotPass = true;
              }

              if ((_this.state.role_title_box == '' || _this.state.role_title_box == null) && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else if (_this.state.value_game_name.label == '' && uShallNotPass) {
                _this.setState({ show_info_box: true });
                _this.setState({ show_role_title_info_box: true });
                name_trigger = true;
              } else {
                _this.setState({ show_status_info_box: false });
              }

              if (!name_trigger) {
                _context.next = 20;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt('return');

            case 20:

              if (_this.state.value_ardour !== null && _this.state.value_ardour.length !== 0) {
                for (i = 0; i < _this.state.value_ardour.length; i++) {
                  myardour += _this.state.value_ardour[i].label + '; ';
                }
                myardour = myardour.trim().replace(/; /g, ',').trim();
                myardour = myardour.replace(/;/g, '');
                myardour = myardour.replace(/,/g, ', ');
              }

              //If you created a new game and you have selected it then and only then will we save this to the DB

              if (!(_this.state.newValueCreated_ardour != '')) {
                _context.next = 44;
                break;
              }

              i = 0;

            case 23:
              if (!(i < _this.state.newValueCreated_ardour.length)) {
                _context.next = 44;
                break;
              }

              j = 0;

            case 25:
              if (!(j < _this.state.value_ardour.length)) {
                _context.next = 41;
                break;
              }

              if (!(_this.state.value_ardour[j].label == _this.state.newValueCreated_ardour[i])) {
                _context.next = 38;
                break;
              }

              _context.prev = 27;
              _context.next = 30;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.newValueCreated_ardour[i]
              });

            case 30:
              post = _context.sent;


              if (_this.state.newValueCreated_ardour[i] == _this.state.value_game_name.label) {
                ardourNgame_name_same_same = true;
                newGame_name = post.data.game_name;
                newGameID = post.data.id;
              }
              _context.next = 37;
              break;

            case 34:
              _context.prev = 34;
              _context.t0 = _context['catch'](27);

              consoleg(_context.t0);

            case 37:
              return _context.abrupt('break', 41);

            case 38:
              j++;
              _context.next = 25;
              break;

            case 41:
              i++;
              _context.next = 23;
              break;

            case 44:

              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGame_name = '';
              newGameID = '';

              if (!(_this.state.newValueCreated_game_name != '' && ardourNgame_name_same_same == false)) {
                _context.next = 65;
                break;
              }

              i = 0;

            case 48:
              if (!(i < _this.state.newValueCreated_game_name.length)) {
                _context.next = 65;
                break;
              }

              if (!(_this.state.value_game_name.label == _this.state.newValueCreated_game_name[i])) {
                _context.next = 62;
                break;
              }

              _context.prev = 50;
              _context.next = 53;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value_game_name.label
              });

            case 53:
              _post = _context.sent;

              newGame_name = _post.data.game_name;
              newGameID = _post.data;
              _context.next = 61;
              break;

            case 58:
              _context.prev = 58;
              _context.t1 = _context['catch'](50);

              console.log(_context.t1);

            case 61:
              return _context.abrupt('break', 65);

            case 62:
              i++;
              _context.next = 48;
              break;

            case 65:
              if (!(_this.state.newValueCreated_tags != '')) {
                _context.next = 90;
                break;
              }

              tmpnewGameID = '';

              if (_this.state.value_game_name.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value_game_name.game_names_id;
              }
              i = 0;

            case 69:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context.next = 90;
                break;
              }

              j = 0;

            case 71:
              if (!(j < _this.state.value_tags.length)) {
                _context.next = 87;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context.next = 84;
                break;
              }

              _context.prev = 73;

              if (!(tmpnewGameID != '')) {
                _context.next = 78;
                break;
              }

              _context.next = 77;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 77:
              _post2 = _context.sent;

            case 78:
              _context.next = 83;
              break;

            case 80:
              _context.prev = 80;
              _context.t2 = _context['catch'](73);

              console.log(_context.t2);

            case 83:
              return _context.abrupt('break', 87);

            case 84:
              j++;
              _context.next = 71;
              break;

            case 87:
              i++;
              _context.next = 69;
              break;

            case 90:

              if (_this.state.value_tags !== null && _this.state.value_tags.length !== 0) {
                for (i = 0; i < _this.state.value_tags.length; i++) {
                  myTags += _this.state.value_tags[i].label + '; ';
                }
                myTags = myTags.trim().replace(/; /g, ',').trim();
                myTags = myTags.replace(/;/g, '');
                myTags = myTags.replace(/,/g, ', ');
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

              if (_this.state.just_one_time) {
                _context.next = 99;
                break;
              }

              return _context.abrupt('return');

            case 99:
              _this.state.just_one_time = false;

              if (!(_this.state.createEsportsPost == true)) {
                _context.next = 112;
                break;
              }

              _context.prev = 101;
              _context.next = 104;
              return _axios2.default.post('/api/esports_bio/create', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 104:
              post_bio = _context.sent;
              _context.next = 110;
              break;

            case 107:
              _context.prev = 107;
              _context.t3 = _context['catch'](101);

              console.log(_context.t3);

            case 110:
              _context.next = 122;
              break;

            case 112:
              if (!(_OGstatus == false)) {
                _context.next = 122;
                break;
              }

              _context.prev = 113;
              _context.next = 116;
              return _axios2.default.post('/api/esports_bio/update/', {
                status: _this.state.status_box.label,
                email_visibility: _this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
                games_of_ardour: myardour,
                career_highlights: _this.state.career_highlights_box
              });

            case 116:
              _post_bio = _context.sent;
              _context.next = 122;
              break;

            case 119:
              _context.prev = 119;
              _context.t4 = _context['catch'](113);

              console.log(_context.t4);

            case 122:
              if (!uShallNotPass) {
                _context.next = 134;
                break;
              }

              if (!(_OGstatus_exp == false)) {
                _context.next = 134;
                break;
              }

              _context.prev = 124;
              match = _this.props.routeProps.match;
              _context.next = 128;
              return _axios2.default.post('/api/esports_experiences/update/' + match.params.esportsExp_id, {
                role_title: _this.state.role_title_box,
                game_name: newGame_name == '' ? _this.state.value_game_name.label : newGame_name,
                team_name: _this.state.team_name_box,
                duration: myPlayed,
                achievements: _this.state.achievements_box,
                skills: myTags
              });

            case 128:
              update_exp = _context.sent;
              _context.next = 134;
              break;

            case 131:
              _context.prev = 131;
              _context.t5 = _context['catch'](124);

              console.log(_context.t5);

            case 134:
              _this.handleCloseModal();

            case 135:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[27, 34], [50, 58], [73, 80], [101, 107], [113, 119], [124, 131]]);
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
        _this.setState({ value_tags: '' });
        _this.setState({ newValueCreated_game_name: [].concat((0, _toConsumableArray3.default)(newValueCreated_game_name), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: '' });
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
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var allTags, i, newOption, _options_tags;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;

                  self.setState({ options_tags: '' });
                  self.setState({ value_tags: '' });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get('/api/Tags/' + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt('return');

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt('return');

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = '';
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 20:
                case 'end':
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
      status_box: [{ label: '', value: '' }],
      email_box: [{ label: '', value: '' }],
      played_box: '',
      career_highlights_box: '',
      team_name_box: '',
      role_title_box: '',
      achievements_box: '',
      isLoading_tags: false,
      isLoading_ardour: false,
      isLoading_game_name: false,
      options_tags: '',
      options_ardour: '',
      options_game_name: '',
      value_tags: [],
      value_game_name: [],
      value_ardour: [],
      newValueCreated_ardour: [],
      newValueCreated_game_name: [],
      newValueCreated_tags: [],
      name_trigger: false,
      createEsportsPost: true,
      intial_trigger: true,
      just_one_time: true,
      redirect_: false
    };
    return _this;
  }

  (0, _createClass3.default)(EditEsportsExp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;


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
                    arrTags = '';
                    games_of_ardour = _getEsports_bio.data.myProfile[0].games_of_ardour;
                    tmp = [];


                    if (games_of_ardour != null && games_of_ardour != '') {
                      arrTags = games_of_ardour.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.setState({ value_ardour: tmp });
                    }
                  } else {
                    self.setState({
                      myEsports_bio: ''
                    });
                  }
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getEsports_bio() {
          return _ref3.apply(this, arguments);
        };
      }();

      var getEsports_exp = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var _getEsports_exp, gameName, game_newOption, allTags, x, anotherOption, _options_tags2, newOption, arrTags, skills, tmp, i, _newOption;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _axios2.default.get('/api/esports_experiences/show/' + match.params.esportsExp_id);

                case 3:
                  _getEsports_exp = _context4.sent;
                  _context4.next = 6;
                  return _axios2.default.get('/api/GameName/' + _getEsports_exp.data.myesportsExperience[0].game_name);

                case 6:
                  gameName = _context4.sent;
                  game_newOption = createOption(_getEsports_exp.data.myesportsExperience[0].game_name, gameName.data.getOne[0].id);
                  _context4.next = 10;
                  return _axios2.default.get('/api/Tags/' + gameName.data.getOne[0].id);

                case 10:
                  allTags = _context4.sent;

                  for (x = 0; x < allTags.data.allTags.length; x++) {
                    anotherOption = createOption(allTags.data.allTags[x].tag);
                    _options_tags2 = self.state.options_tags;

                    if (x == 0) {
                      _options_tags2 = '';
                    }
                    self.state.options_tags = [].concat((0, _toConsumableArray3.default)(_options_tags2), [anotherOption]);
                  }

                  self.state.myEsports_exp = _getEsports_exp.data.myesportsExperience[0];

                  _context4.t0 = _getEsports_exp.data.myesportsExperience[0].duration;
                  _context4.next = _context4.t0 === 1 ? 16 : _context4.t0 === 2 ? 20 : _context4.t0 === 3 ? 24 : _context4.t0 === 4 ? 28 : _context4.t0 === 5 ? 32 : _context4.t0 === 42 ? 36 : 40;
                  break;

                case 16:
                  newOption = createOptionDifValue(1, 'Less than 3 months');
                  self.state.myEsports_exp.duration_label = 'Less than 3 months';
                  self.state.myEsports_exp.duration_value = 1;
                  return _context4.abrupt('break', 43);

                case 20:
                  newOption = createOptionDifValue(2, 'Less than 6 months');
                  self.state.myEsports_exp.duration_label = 'Less than 6 months';
                  self.state.myEsports_exp.duration_value = 2;
                  return _context4.abrupt('break', 43);

                case 24:
                  newOption = createOptionDifValue(3, 'Less than 1 year');
                  self.state.myEsports_exp.duration_label = 'Less than 1 year';
                  self.state.myEsports_exp.duration_value = 3;
                  return _context4.abrupt('break', 43);

                case 28:
                  newOption = createOptionDifValue(4, 'Less than 2 years');
                  self.state.myEsports_exp.duration_label = 'Less than 2 years';
                  self.state.myEsports_exp.duration_value = 4;
                  return _context4.abrupt('break', 43);

                case 32:
                  newOption = createOptionDifValue(5, 'Less than 3 years');
                  self.state.myEsports_exp.duration_label = 'Less than 4 years';
                  self.state.myEsports_exp.duration_value = 5;
                  return _context4.abrupt('break', 43);

                case 36:
                  newOption = createOptionDifValue(42, '3+ years');
                  self.state.myEsports_exp.duration_label = '3+ years';
                  self.state.myEsports_exp.duration_value = 42;
                  return _context4.abrupt('break', 43);

                case 40:
                  newOption = createOptionDifValue(1, 'Less than 3 months');
                  self.state.myEsports_exp.duration_label = 'Less than 3 months';
                  self.state.myEsports_exp.duration_value = 1;

                case 43:

                  self.state.played_box = newOption;
                  self.state.played_box_OG = newOption;

                  if (self.state.myEsports_exp !== undefined) {
                    arrTags = '';
                    skills = self.state.myEsports_exp.skills;
                    tmp = [];


                    if (skills != null && skills != '') {
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
                  _context4.next = 52;
                  break;

                case 49:
                  _context4.prev = 49;
                  _context4.t1 = _context4['catch'](0);

                  console.log(_context4.t1);

                case 52:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 49]]);
        }));

        return function getEsports_exp() {
          return _ref4.apply(this, arguments);
        };
      }();

      getEsports_exp();
      getEsports_bio();
    }
  }, {
    key: 'getOptions',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(inputValue == '' || inputValue == undefined)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', []);

              case 2:
                _context5.prev = 2;

                inputValue = inputValue.trimStart();
                _context5.next = 6;
                return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

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
                return _context5.abrupt('return', []);

              case 14:
                return _context5.abrupt('return', newArr);

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](2);

                console.log(_context5.t0);

              case 20:
              case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

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
            this.state.games_of_ardour_OG = games_of_ardour;this.state.role_title_box = role_title, this.state.value_game_name.label = game_name, this.state.team_name_box = team_name, this.state.achievements_box = achievements;this.state.role_title_box_OG = role_title, this.state.value_game_name_OG = game_name, this.state.team_name_box_OG = team_name, this.state.achievements_box_OG = achievements;
          }

          return _react2.default.createElement(
            'div',
            { className: 'content-area addEsportsExp-page' },
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
                className: 'addEsportsModal',
                overlayClassName: 'Overlay' },
              'Esports Experience:',
              _react2.default.createElement('i', { className: 'fas fa-times', onClick: this.handleCloseModal }),
              _react2.default.createElement(
                'div',
                { className: 'status' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Status ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    '*'
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Status,
                  options: status_options,
                  placeholder: 'Set your job status',
                  className: 'status_box',
                  defaultValue: [{ label: status, value: status }]
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'email' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Email Visible? ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    '*'
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_email,
                  options: email_options,
                  placeholder: 'Show/Don\'t show email?',
                  className: 'email_box',
                  defaultValue: [{ label: email_visibility, value: email_visibility }]
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'games_ardour_txtBox' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Games of ardour'
                ),
                _react2.default.createElement(_AsyncCreatable2.default, {
                  cacheOptions: true,
                  defaultOptions: true,
                  loadOptions: this.getOptions,
                  onChange: this.handleChange_ardour,
                  onCreateOption: this.handleCreate_ardour,
                  isClearable: true,
                  value: _value_ardour,
                  className: 'games_ardour_box',
                  placeholder: 'Games your passionate about',
                  isMulti: true,
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'career-highlights' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Career Highlights'
                ),
                _react2.default.createElement('textarea', {
                  id: 'career_highlights_box',
                  className: 'career_highlights_box',
                  rows: 8,
                  cols: 80,
                  defaultValue: career_highlights,
                  maxLength: '254',
                  onChange: this.handleChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'line-break' },
                _react2.default.createElement('hr', null)
              ),
              _react2.default.createElement(
                'div',
                { className: 'line-break' },
                _react2.default.createElement('hr', null)
              ),
              'Add Role Info:',
              _react2.default.createElement('div', null),
              _react2.default.createElement(
                'div',
                { className: 'role-title' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Role Title ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    '*'
                  )
                ),
                _react2.default.createElement('input', {
                  type: 'text',
                  id: 'role_title_box',
                  className: 'role_title_box',
                  maxLength: '120',
                  onChange: this.handleChange,
                  defaultValue: '' + role_title
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'gName_txtBox2' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Game Name ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    '*'
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
                  className: 'game_name_box2',
                  placeholder: 'Your Game',
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'team-name' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Team name'
                ),
                _react2.default.createElement('input', {
                  type: 'text',
                  id: 'team_name_box',
                  className: 'team_name_box',
                  maxLength: '120',
                  onChange: this.handleChange,
                  defaultValue: '' + team_name
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'played' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Time in Role: ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    '*'
                  )
                ),
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_Played,
                  options: played_options,
                  placeholder: 'Select time in role',
                  className: 'played_box',
                  defaultValue: [{ label: duration_label, value: duration_value }]
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'achievements' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Achievements in this role'
                ),
                _react2.default.createElement('textarea', {
                  id: 'achievements_box',
                  className: 'achievements_box',
                  rows: 8,
                  cols: 80,
                  defaultValue: '' + achievements,
                  maxLength: '254',
                  onChange: this.handleChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'tag_txtBox' },
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'green' } },
                    'S'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'dodgerblue' } },
                    'k'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    'i'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'gold' } },
                    'l'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'green' } },
                    'l'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'dodgerblue' } },
                    's'
                  ),
                  ' (Keywords that identify ',
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'green' } },
                    'y'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'dodgerblue' } },
                    'o'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'red' } },
                    'u'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: { color: 'gold' } },
                    'r'
                  ),
                  ' expertise with this role. Max 250 chars)'
                ),
                _react2.default.createElement(_Creatable2.default, {
                  onChange: this.handleChange3,
                  options: _options_tags3,
                  onCreateOption: this.handleCreate3,
                  isClearable: true,
                  isDisabled: isLoading_tags,
                  isLoading: isLoading_tags,
                  value: _value_tags,
                  className: 'tag_name_box',
                  isMulti: true,
                  onInputChange: function onInputChange(inputValue) {
                    return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                  }
                })
              ),
              _react2.default.createElement('div', null),
              !this.state.show_info_box && _react2.default.createElement('div', null),
              this.state.show_info_box && _react2.default.createElement(
                'div',
                { className: 'info_box' },
                this.state.show_email_info_box && _react2.default.createElement(
                  'div',
                  { className: 'email_error' },
                  'Error: Email field can\'t be empty'
                ),
                this.state.show_status_info_box && _react2.default.createElement(
                  'div',
                  { className: 'status_name_error' },
                  'Error: Status can\'t be empty'
                ),
                this.state.show_role_title_info_box && _react2.default.createElement(
                  'div',
                  { className: 'role_name_error' },
                  'Error: Role or Game Name can\'t be empty'
                )
              ),
              _react2.default.createElement('div', null),
              _react2.default.createElement(
                'div',
                { className: 'save-btn' },
                _react2.default.createElement(
                  'button',
                  {
                    className: 'delete',
                    onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to delete this Esports Experience?')) _this3.delete_exp();
                    } },
                  'Delete'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'save', onClick: this.submitForm },
                  'Save'
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'content-area addEsportsExp-page' },
            'Loading'
          );
        }
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area addEsportsExp-page' },
          'Loading'
        );
      }
    }
  }]);
  return EditEsportsExp;
}(_react.Component);

exports.default = EditEsportsExp;

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _reactModal = __webpack_require__(55);

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

    _this.handleCloseModal = function () {
      _this.setState({ redirect_: true });
    };

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

    _this.delete_exp = function () {
      var match = _this.props.routeProps.match;


      try {
        var myGame = _axios2.default.get('/api/GameExperiences/delete/' + match.params.game_id);
      } catch (error) {
        console.log(error);
      }
      _this.handleCloseModal();
    };

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var myExperience, myPlayed, myRatings, myTags, myGame_name, myStatus, name_trigger, newGameID, i, post, j, tmpnewGameID, _post, match, _post2;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myExperience = '';
              myPlayed = '';
              myRatings = '';
              myTags = '';
              myGame_name = '';
              myStatus = '';
              name_trigger = _this.state.name_trigger.name_trigger;


              if (_this.state.value == '' || _this.state.value == null) {
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

              if (_this.state.status_box == '' && _this.state.status_box == null) {
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
                _context.next = 12;
                break;
              }

              _this.setState({ name_trigger: false });
              return _context.abrupt('return');

            case 12:

              if (_this.state.experience_box != null && _this.state.experience_box != undefined && _this.state.experience_box.length != 0) {
                if (_this.state.experience_box.value != null) {
                  myExperience = _this.state.experience_box.value;
                } else {
                  myExperience = _this.state.experience_box;
                }
              }

              if (_this.state.played_box != null && _this.state.played_box != undefined && _this.state.played_box.length != 0) {
                myPlayed = _this.state.played_box.value;
              }
              if (_this.state.ratings_box != null && _this.state.ratings_box != undefined && _this.state.ratings_box.length != 0) {
                if (_this.state.ratings_box.value != null) {
                  myRatings = _this.state.ratings_box.value;
                } else {
                  myRatings = _this.state.ratings_box;
                }
              }
              //If you created a new game and you have selected it then and only then will we save this to the DB

              newGameID = '';

              if (!(_this.state.newValueCreated != '')) {
                _context.next = 34;
                break;
              }

              i = 0;

            case 18:
              if (!(i < _this.state.newValueCreated.length)) {
                _context.next = 34;
                break;
              }

              if (!(_this.state.value.label == _this.state.newValueCreated[i])) {
                _context.next = 31;
                break;
              }

              _context.prev = 20;
              _context.next = 23;
              return _axios2.default.post('/api/GameNames', {
                game_name: _this.state.value.label
              });

            case 23:
              post = _context.sent;

              newGameID = post.data.id;
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context['catch'](20);

              console.log(_context.t0);

            case 30:
              return _context.abrupt('break', 34);

            case 31:
              i++;
              _context.next = 18;
              break;

            case 34:
              if (!(_this.state.newValueCreated_tags != '')) {
                _context.next = 59;
                break;
              }

              tmpnewGameID = '';

              if (_this.state.value.game_names_id == null) {
                tmpnewGameID = newGameID;
              } else {
                tmpnewGameID = _this.state.value.game_names_id;
              }
              i = 0;

            case 38:
              if (!(i < _this.state.newValueCreated_tags.length)) {
                _context.next = 59;
                break;
              }

              j = 0;

            case 40:
              if (!(j < _this.state.value_tags.length)) {
                _context.next = 56;
                break;
              }

              if (!(_this.state.value_tags[j].label == _this.state.newValueCreated_tags[i])) {
                _context.next = 53;
                break;
              }

              _context.prev = 42;

              if (!(tmpnewGameID != '')) {
                _context.next = 47;
                break;
              }

              _context.next = 46;
              return _axios2.default.post('/api/Tags', {
                game_names_id: tmpnewGameID,
                tag: _this.state.newValueCreated_tags[i]
              });

            case 46:
              _post = _context.sent;

            case 47:
              _context.next = 52;
              break;

            case 49:
              _context.prev = 49;
              _context.t1 = _context['catch'](42);

              console.log(_context.t1);

            case 52:
              return _context.abrupt('break', 56);

            case 53:
              j++;
              _context.next = 40;
              break;

            case 56:
              i++;
              _context.next = 38;
              break;

            case 59:

              if (self.state.value_tags !== null && self.state.value_tags.length !== 0) {
                for (i = 0; i < self.state.value_tags.length; i++) {
                  myTags += self.state.value_tags[i].label + '; ';
                }
                myTags = myTags.trim().replace(/; /g, ',').trim();
                myTags = myTags.replace(/;/g, '');
                myTags = myTags.replace(/,/g, ', ');
              }

              _this.state.comments_box == undefined ? undefined : _this.state.comments_box = _this.state.comments_box.trim();
              _this.state.link_box == undefined ? undefined : _this.state.link_box = _this.state.link_box.trim();

              if (_this.state.just_one_time) {
                _context.next = 64;
                break;
              }

              return _context.abrupt('return');

            case 64:
              _this.state.just_one_time = false;

              _context.prev = 65;
              match = _this.props.routeProps.match;
              _context.next = 69;
              return _axios2.default.post('/api/GameExperiences/' + match.params.id + '/' + match.params.game_id, {
                game_name: myGame_name,
                experience: myExperience,
                comments: _this.state.comments_box,
                status: myStatus,
                played: myPlayed,
                link: _this.state.link_box,
                ratings: myRatings,
                tags: myTags
              });

            case 69:
              _post2 = _context.sent;

              _this.handleCloseModal();
              _context.next = 76;
              break;

            case 73:
              _context.prev = 73;
              _context.t2 = _context['catch'](65);

              console.log(_context.t2);

            case 76:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[20, 27], [42, 49], [65, 73]]);
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
        _this.setState({ value_tags: '' });
        _this.setState({ newValueCreated: [].concat((0, _toConsumableArray3.default)(newValueCreated), [newOption.label]) });
        _this.setState({ newValueCreated_tags: [] });
        _this.setState({ options_tags: '' });
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
        _this.setState({
          newValueCreated_tags: [].concat((0, _toConsumableArray3.default)(newValueCreated_tags), [newOption.label])
        });
      }, 1000);
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

                  self.setState({ options_tags: '' });
                  self.setState({ value_tags: '' });

                  if (!(value != null)) {
                    _context2.next = 13;
                    break;
                  }

                  if (!(value.game_names_id != null && value.game_names_id != undefined)) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get('/api/Tags/' + value.game_names_id);

                case 7:
                  allTags = _context2.sent;
                  _context2.next = 11;
                  break;

                case 10:
                  return _context2.abrupt('return');

                case 11:
                  _context2.next = 14;
                  break;

                case 13:
                  return _context2.abrupt('return');

                case 14:
                  for (i = 0; i < allTags.data.allTags.length; i++) {
                    newOption = createOption(allTags.data.allTags[i].tag);
                    _options_tags = self.state.options_tags;

                    if (i == 0) {
                      _options_tags = '';
                    }
                    self.setState({
                      options_tags: [].concat((0, _toConsumableArray3.default)(_options_tags), [newOption])
                    });
                  }
                  _context2.next = 20;
                  break;

                case 17:
                  _context2.prev = 17;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 20:
                case 'end':
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
      game_name_box: '',
      status_box: '',
      experience_box: '',
      played_box: '',
      ratings_box: '',
      comments_box: '',
      link_box: '',
      isLoading_tags: false,
      options_tags: '',
      value_tags: [],
      newValueCreated_tags: [],
      isLoading: false,
      options: '',
      value: [],
      newValueCreated: [],
      comments_chkbox: false,
      link_chkbox: false,
      name_trigger: false,
      intial_trigger: true,
      edit_game_name: '',
      just_one_time: true,
      redirect_: false
    };
    return _this;
  }

  (0, _createClass3.default)(EditGamingExp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var match = this.props.routeProps.match;

      var self = this;

      var getGamingExp = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var myGame, gameName, game_newOption, allTags, x, anotherOption, _options_tags2, arrTags, tags, tmp, i, newOption;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/GameExperiences/' + match.params.id + '/' + match.params.game_id);

                case 3:
                  myGame = _context3.sent;


                  self.state.edit_game_name = myGame.data.myGameExperience[0].game_name;

                  _context3.next = 7;
                  return _axios2.default.get('/api/GameName/' + self.state.edit_game_name);

                case 7:
                  gameName = _context3.sent;
                  game_newOption = createOption(myGame.data.myGameExperience[0].game_name, gameName.data.getOne[0].id);
                  _context3.next = 11;
                  return _axios2.default.get('/api/Tags/' + gameName.data.getOne[0].id);

                case 11:
                  allTags = _context3.sent;

                  for (x = 0; x < allTags.data.allTags.length; x++) {
                    anotherOption = createOption(allTags.data.allTags[x].tag);
                    _options_tags2 = self.state.options_tags;

                    if (x == 0) {
                      _options_tags2 = '';
                    }
                    self.state.options_tags = [].concat((0, _toConsumableArray3.default)(_options_tags2), [anotherOption]);
                  }

                  self.state.myGame = myGame.data.myGameExperience[0];

                  _context3.t0 = myGame.data.myGameExperience[0].played;
                  _context3.next = _context3.t0 === 1 ? 17 : _context3.t0 === 2 ? 20 : _context3.t0 === 3 ? 23 : _context3.t0 === 4 ? 26 : _context3.t0 === 5 ? 29 : _context3.t0 === 42 ? 32 : 35;
                  break;

                case 17:
                  self.state.myGame.played_label = 'Less than 1 year';
                  self.state.myGame.played_value = 1;
                  return _context3.abrupt('break', 37);

                case 20:
                  self.state.myGame.played_label = 'Less than 2 years';
                  self.state.myGame.played_value = 2;
                  return _context3.abrupt('break', 37);

                case 23:
                  self.state.myGame.played_label = 'Less than 3 years';
                  self.state.myGame.played_value = 3;
                  return _context3.abrupt('break', 37);

                case 26:
                  self.state.myGame.played_label = 'Less than 4 years';
                  self.state.myGame.played_value = 4;
                  return _context3.abrupt('break', 37);

                case 29:
                  self.state.myGame.played_label = 'Less than 5 years';
                  self.state.myGame.played_value = 5;
                  return _context3.abrupt('break', 37);

                case 32:
                  self.state.myGame.played_label = '5+ years';
                  self.state.myGame.played_value = 42;
                  return _context3.abrupt('break', 37);

                case 35:
                  self.state.myGame.played_label = 'Less than 1 year';
                  self.state.myGame.played_value = 1;

                case 37:

                  if (self.state.myGame !== undefined) {
                    arrTags = '';
                    tags = self.state.myGame.tags;
                    tmp = [];


                    if (tags != null && tags != '') {
                      arrTags = tags.split(',');

                      for (i = 0; i < arrTags.length; i++) {
                        newOption = createOption(arrTags[i]);

                        tmp.push(newOption);
                      }
                      self.state.value_tags = tmp;
                    }
                  }
                  self.setState({ value: game_newOption });
                  _context3.next = 44;
                  break;

                case 41:
                  _context3.prev = 41;
                  _context3.t1 = _context3['catch'](0);

                  console.log(_context3.t1);

                case 44:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 41]]);
        }));

        return function getGamingExp() {
          return _ref3.apply(this, arguments);
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
    key: 'getOptions',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(inputValue) {
        var getGameName, results, newArr, i, newOption;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(inputValue == '' || inputValue == undefined)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', []);

              case 2:
                _context4.prev = 2;

                inputValue = inputValue.trimStart();
                _context4.next = 6;
                return _axios2.default.get('/api/GameNames/' + inputValue + '/gameSearchResults');

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
                return _context4.abrupt('return', []);

              case 14:
                return _context4.abrupt('return', newArr);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4['catch'](2);

                console.log(_context4.t0);

              case 20:
              case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
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

          if (comments != '' && comments != null) {
            this.setState({ comments_chkbox: true });
            comments_chkbox_state = true;
          }
          if (link != '' && link != null) {
            this.setState({ link_chkbox: true });
            link_chkbox_state = true;
          }
        }
        return _react2.default.createElement(
          'div',
          { className: 'content-area addGamingExp-page' },
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
              className: 'addGamingModal',
              overlayClassName: 'Overlay' },
            'Edit Gaming Experience:',
            _react2.default.createElement('i', { className: 'fas fa-times', onClick: this.handleCloseModal }),
            _react2.default.createElement(
              'div',
              { className: 'gName_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                'Game Name ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                loadOptions: this.getOptions,
                isClearable: true,
                onChange: this.handleChange2,
                className: 'game_name_box',
                onCreateOption: this.handleCreate,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                },
                defaultValue: [{ label: game_name, value: game_name }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'status' },
              _react2.default.createElement(
                'p',
                null,
                'Status ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                )
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Status,
                options: status_options,
                placeholder: 'Set your status',
                className: 'status_box',
                defaultValue: [{ label: status, value: status }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'experience' },
              _react2.default.createElement(
                'p',
                null,
                'Experience:'
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Experience,
                options: experience_options,
                placeholder: 'Select experience level',
                className: 'experience_box',
                defaultValue: [{ label: experience, value: experience }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'played' },
              _react2.default.createElement(
                'p',
                null,
                'Time Played:'
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Played,
                options: played_options,
                placeholder: 'Select time played',
                className: 'played_box',
                defaultValue: [{ label: played_label, value: played_value }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'ratings' },
              _react2.default.createElement(
                'p',
                null,
                'Ratings:'
              ),
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Ratings,
                options: rating_options,
                placeholder: 'Select game ratings',
                className: 'ratings_box',
                defaultValue: [{ label: ratings, value: ratings }]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'options_checkbox' },
              _react2.default.createElement(
                'p',
                null,
                'Show Link box and/or Comments box'
              ),
              _react2.default.createElement('input', { id: 'link_ChkBox', type: 'checkbox', defaultChecked: link_chkbox_state, onChange: this.toggleChange_link }),
              ' Link',
              _react2.default.createElement('input', {
                id: 'comments_ChkBox',
                type: 'checkbox',
                defaultChecked: comments_chkbox_state,
                onChange: this.toggleChange_comments
              }),
              ' ',
              'Comments'
            ),
            _react2.default.createElement(
              'div',
              { className: 'tag_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  { style: { color: 'green' } },
                  'T'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'dodgerblue' } },
                  'a'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  'g'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'gold' } },
                  's'
                ),
                ' (Keywords that identify ',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'green' } },
                  'y'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'dodgerblue' } },
                  'o'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  'u'
                ),
                _react2.default.createElement(
                  'span',
                  { style: { color: 'gold' } },
                  'r'
                ),
                ' unique experience with this game. Max 250 chars)'
              ),
              _react2.default.createElement(_Creatable2.default, {
                onChange: this.handleChange3,
                options: _options_tags3,
                onCreateOption: this.handleCreate2,
                isClearable: true,
                isDisabled: isLoading_tags,
                isLoading: isLoading_tags,
                className: 'tag_name_box',
                isMulti: true,
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                },
                value: _value_tags
              })
            ),
            this.state.link_chkbox == false ? _react2.default.createElement('div', { className: 'link_txtBox' }) : _react2.default.createElement(
              'div',
              { className: 'link_txtBox' },
              _react2.default.createElement(
                'p',
                null,
                'Link'
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'link_box',
                className: 'link_box',
                maxLength: '50',
                defaultValue: '' + link,
                onChange: this.handleChange
              })
            ),
            this.state.comments_chkbox == false ? _react2.default.createElement('div', { className: 'comments' }) : _react2.default.createElement(
              'div',
              { className: 'comments' },
              _react2.default.createElement(
                'p',
                null,
                'Comments'
              ),
              _react2.default.createElement('textarea', {
                id: 'comments_box',
                className: 'comments_box',
                rows: 8,
                cols: 80,
                defaultValue: '' + comments,
                maxLength: '254',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement('div', null),
            !this.state.show_info_box && _react2.default.createElement('div', null),
            this.state.show_info_box && _react2.default.createElement(
              'div',
              { className: 'info_box' },
              this.state.show_game_name_info_box && _react2.default.createElement(
                'div',
                { className: 'game_name_error' },
                'Error: Game Name can\'t be empty'
              ),
              this.state.show_status_info_box && _react2.default.createElement(
                'div',
                { className: 'status_name_error' },
                'Error: Status can\'t be empty'
              )
            ),
            _react2.default.createElement('div', null),
            _react2.default.createElement(
              'div',
              { className: 'save-btn' },
              _react2.default.createElement(
                'button',
                {
                  className: 'delete',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to delete this Gaming Experience?')) _this3.delete_exp();
                  } },
                'Delete'
              ),
              '\xA0',
              _react2.default.createElement(
                'button',
                { className: 'save', onClick: this.submitForm },
                'Save'
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area addGamingExp-page' },
          'Loading'
        );
      }
    }
  }]);
  return EditGamingExp;
}(_react.Component);

exports.default = EditGamingExp;

/***/ }),

/***/ 396:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MyComposeSection = __webpack_require__(86);

var _MyComposeSection2 = _interopRequireDefault(_MyComposeSection);

var _IndividualGroup = __webpack_require__(450);

var _IndividualGroup2 = _interopRequireDefault(_IndividualGroup);

var _GroupHeader = __webpack_require__(447);

var _GroupHeader2 = _interopRequireDefault(_GroupHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupHome = function (_Component) {
  (0, _inherits3.default)(GroupHome, _Component);

  function GroupHome() {
    (0, _classCallCheck3.default)(this, GroupHome);
    return (0, _possibleConstructorReturn3.default)(this, (GroupHome.__proto__ || Object.getPrototypeOf(GroupHome)).call(this));
  }

  (0, _createClass3.default)(GroupHome, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-area group-home' },
        _react2.default.createElement(_GroupHeader2.default, {
          groups_id: this.props.routeProps.match,
          initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData
        }),
        _react2.default.createElement(_MyComposeSection2.default, {
          groups_id: this.props.routeProps.match,
          initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData
        }),
        _react2.default.createElement(_IndividualGroup2.default, {
          groups_id: this.props.routeProps.match,
          initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData
        })
      );
    }
  }]);
  return GroupHome;
}(_react.Component);

exports.default = GroupHome;

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualGroups = __webpack_require__(451);

var _IndividualGroups2 = _interopRequireDefault(_IndividualGroups);

var _GroupOpenModal = __webpack_require__(448);

var _GroupOpenModal2 = _interopRequireDefault(_GroupOpenModal);

var _reactAutosuggest = __webpack_require__(325);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _match = __webpack_require__(157);

var _match2 = _interopRequireDefault(_match);

var _parse = __webpack_require__(158);

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
  return '' + suggestion.name;
}

function renderSuggestion(suggestion, _ref) {
  var query = _ref.query;

  var suggestionText = '' + suggestion.name;
  var matches = (0, _match2.default)(suggestionText, query);
  var parts = (0, _parse2.default)(suggestionText, matches);

  return _react2.default.createElement(
    'span',
    { className: 'suggestion-content' },
    _react2.default.createElement('span', {
      className: 'suggestion-user-img',
      style: {
        backgroundImage: 'url(\'' + suggestion.group_img + '\')'
      } }),
    _react2.default.createElement(
      'span',
      { className: 'name' },
      parts.map(function (part, index) {
        var className = part.highlight ? 'highlight' : null;

        return _react2.default.createElement(
          'span',
          { className: className, key: index },
          part.text
        );
      })
    )
  );
}

var GroupMain = function (_Component) {
  (0, _inherits3.default)(GroupMain, _Component);

  function GroupMain() {
    (0, _classCallCheck3.default)(this, GroupMain);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupMain.__proto__ || Object.getPrototypeOf(GroupMain)).call(this));

    _this.onChange = function (event, _ref2) {
      var newValue = _ref2.newValue;

      if (newValue == '') {
        if (_this.timeout) clearTimeout(_this.timeout);
        playersDB = [];
        _this.setState({
          suggestions: [],
          value: ''
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
          var groupSearchResults;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/groups/' + value + '/groupSearchResults');

                case 3:
                  groupSearchResults = _context.sent;

                  playersDB = groupSearchResults.data.groupSearchResults;
                  self.setState({
                    suggestions: getSuggestions(value)
                  });
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 11:
                case 'end':
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

      _this.state.redirect_link = suggestion.id;
      _this.setState({ redirect_: true });
    };

    _this.showmyGroups = function () {
      if (_this.state.myGroups != undefined) {
        return _this.state.myGroups.map(function (item, index) {
          return _react2.default.createElement(_IndividualGroups2.default, { groups: item, key: index, user: _this.props.initialData });
        });
      }
    };

    _this.showGroupsimin = function () {
      if (_this.state.groups_im_in != undefined) {
        return _this.state.groups_im_in.map(function (item, index) {
          return _react2.default.createElement(_IndividualGroups2.default, { groups: item, key: index, user: _this.props.initialData });
        });
      }
    };

    self = _this;
    _this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: '',
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false,
      value: '',
      suggestions: [],
      redirect_: false,
      redirect_link: ''
    };

    _this.callbackFileModalClose = _this.callbackFileModalClose.bind(_this);
    _this.addGroup = _this.addGroup.bind(_this);
    _this.callbackFileModalConfirm = _this.callbackFileModalConfirm.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(GroupMain, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var getmyGroups = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getmyGroups;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/groups/view');

                case 3:
                  _getmyGroups = _context2.sent;

                  self.setState({
                    myGroups: _getmyGroups.data.myGroups
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getmyGroups() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getGroups_im_in = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _getGroups_im_in;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/usergroup/view');

                case 3:
                  _getGroups_im_in = _context3.sent;

                  self.setState({
                    groups_im_in: _getGroups_im_in.data.groups_im_in
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getGroups_im_in() {
          return _ref7.apply(this, arguments);
        };
      }();

      getGroups_im_in();
      getmyGroups();
    }
  }, {
    key: 'callbackFileModalClose',
    value: function callbackFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: 'addGroup',
    value: function addGroup() {
      this.setState({
        bFileModalOpen: true
      });
    }
  }, {
    key: 'callbackFileModalConfirm',
    value: function callbackFileModalConfirm(src) {
      this.setState({
        bFileModalOpen: false
      });
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    //Timeout ensures we query the DB when the user pauses typing, not querying every stroke


    // Autosuggest will call this function every time you need to clear suggestions.

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_) {
        var tmp = '/groups/' + this.state.redirect_link;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      // Autosuggest will pass through all these props to the input.

      var inputProps = {
        placeholder: 'Search for Groups',
        value: value,
        onChange: this.onChange
      };
      return _react2.default.createElement(
        'section',
        { id: 'group-page' },
        _react2.default.createElement(_GroupOpenModal2.default, {
          bOpen: this.state.bFileModalOpen,
          callbackClose: this.callbackFileModalClose,
          callbackConfirm: this.callbackFileModalConfirm }),
        _react2.default.createElement(
          'div',
          { className: 'content-area group-page' },
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'groups-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'Groups'
              ),
              _react2.default.createElement(
                'div',
                { className: 'add-group' },
                _react2.default.createElement('i', { className: 'fas fa-plus-circle', onClick: function onClick() {
                    return _this2.addGroup();
                  } })
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'group-search-box' },
                _react2.default.createElement(_reactAutosuggest2.default, {
                  suggestions: suggestions,
                  onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                  onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                  getSuggestionValue: getSuggestionValue,
                  renderSuggestion: renderSuggestion,
                  onSuggestionSelected: this.onSuggestionSelected,
                  inputProps: inputProps
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'mygroups-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'myGroups'
              ),
              _react2.default.createElement(
                'div',
                { className: 'icon', onClick: this.clickedDropdown },
                _react2.default.createElement('i', { className: 'fas fa-chevron-down' })
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'my-groups' },
                _react2.default.createElement('div', { className: 'indent' }),
                this.showmyGroups()
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'groups-im-in-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'Groups I\'m in'
              ),
              _react2.default.createElement(
                'div',
                { className: 'icon', onClick: this.clickedDropdown },
                _react2.default.createElement('i', { className: 'fas fa-chevron-down' })
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'groups-im-in' },
                _react2.default.createElement('div', { className: 'indent' }),
                this.showGroupsimin()
              )
            )
          )
        )
      );
    }
  }]);
  return GroupMain;
}(_react.Component);

exports.default = GroupMain;

/***/ }),

/***/ 398:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ComposeSection = __webpack_require__(145);

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

var _Posts = __webpack_require__(153);

var _Posts2 = _interopRequireDefault(_Posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this.state = {
      name: 'Raaz'
    };
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-area' },
        _react2.default.createElement(_ComposeSection2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
        _react2.default.createElement(_Posts2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData })
      );
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualInvitation = __webpack_require__(85);

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
            'div',
            { className: 'invitation-info' },
            'No pending invitations'
          );
        }
        return _this.state.myFriendRequests.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualInvitation2.default, {
            invitation: item,
            key: index,
            lastRow: lastRow
          });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Invitation, [{
    key: 'componentWillMount',
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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'invitation-page' },
        _react2.default.createElement(
          'div',
          { className: 'content-area invitation-page' },
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'invitation-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'myInvitations'
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'invitation-container' },
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

/***/ 400:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

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

    _this.redirect_groups = function () {
      _this.props.history.push('/groups');
    };

    _this.redirect_feed = function () {
      _this.props.history.push('/');
    };

    _this.redirect_games = function () {
      _this.props.history.push('/myScheduledGames');
    };

    _this.redirect_friends = function () {
      _this.props.history.push('/myFriends');
    };

    _this.redirect_myPosts = function () {
      _this.props.history.push('/myPosts');
    };

    _this.state = {
      dropdown: false,
      show_top_btn: false
    };
    return _this;
  }

  (0, _createClass3.default)(LeftMenu, [{
    key: 'componentDidMount',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.onscroll = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var left_icon = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Logo.png';
      if (this.props.initialData.userInfo == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading'
        );
      } else {
        var _props$initialData$us = this.props.initialData.userInfo,
            first_name = _props$initialData$us.first_name,
            last_name = _props$initialData$us.last_name,
            id = _props$initialData$us.id;

        return _react2.default.createElement(
          'section',
          { id: 'left-menu' },
          _react2.default.createElement(
            'div',
            { className: 'account-dropdown' },
            _react2.default.createElement(
              'div',
              { className: 'logo', onClick: this.redirect },
              _react2.default.createElement('div', {
                className: 'logo-img',
                style: {
                  backgroundImage: 'url(\'' + left_icon + '\')'
                } })
            ),
            _react2.default.createElement(
              'div',
              { className: 'name', onClick: this.clickedDropdown },
              first_name + ' ' + last_name
            ),
            _react2.default.createElement(
              'div',
              { className: 'icon', onClick: this.clickedDropdown },
              _react2.default.createElement('i', { className: 'fas fa-chevron-down' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'dropdown ' + (this.state.dropdown ? 'active' : '') },
              _react2.default.createElement(
                'nav',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/mySettings' },
                  'mySettings'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '/logout' },
                  'Logout'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'groups' },
            _react2.default.createElement(
              'div',
              { className: 'menu' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/addScheduleGames' },
                _react2.default.createElement('div', {
                  className: 'add-ScheduleGames',
                  style: { backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_01.png\')' } })
              ),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/scheduledGames' },
                _react2.default.createElement('div', {
                  className: 'view-ScheduleGames',
                  style: { backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_02.png\')' } })
              ),
              _react2.default.createElement(
                'div',
                { className: 'add-ScheduleGames-caption' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/addScheduleGames', style: { textDecoration: 'none', color: 'white' } },
                  'Add Game'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'view-ScheduleGames-caption' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/scheduledGames', style: { textDecoration: 'none', color: 'white' } },
                  'View Game'
                )
              ),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/advancedSearch' },
                _react2.default.createElement('div', {
                  className: 'advancedSearch',
                  style: { backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_03.png\')' } })
              ),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/profile/' + this.props.initialData.userInfo.id },
                _react2.default.createElement('div', {
                  className: 'profile',
                  style: { backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-11.png\')' } })
              ),
              _react2.default.createElement(
                'div',
                { className: 'advancedSearch-caption' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/advancedSearch', style: { textDecoration: 'none', color: 'white' } },
                  'Search'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'groups-caption' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/profile/' + this.props.initialData.userInfo.id, style: { textDecoration: 'none', color: 'white' } },
                  'Profile'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'myMenu' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Menu'
            ),
            _react2.default.createElement(
              'div',
              { id: 'item-list' },
              _react2.default.createElement(
                'div',
                { className: 'icon-list' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'text-list', onClick: this.redirect_feed },
                'Feed'
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'item-list' },
              _react2.default.createElement(
                'div',
                { className: 'icon-list' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-10.png' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'text-list', onClick: this.redirect_groups },
                'Groups'
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'item-list' },
              _react2.default.createElement(
                'div',
                { className: 'icon-list' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_07.png' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'text-list', onClick: this.redirect_games },
                'Games'
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'item-list' },
              _react2.default.createElement(
                'div',
                { className: 'icon-list' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_08.png' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'text-list', onClick: this.redirect_friends },
                'Friends'
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'item-list' },
              _react2.default.createElement(
                'div',
                { className: 'icon-list' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'text-list', onClick: this.redirect_myPosts },
                'myPosts'
              )
            )
          ),
          this.state.show_top_btn && _react2.default.createElement(
            'div',
            { className: 'top-btn' },
            _react2.default.createElement(
              'button',
              { className: 'top', type: 'button', onClick: this.moveTop },
              'Top'
            )
          )
        );
      }
    }
  }]);
  return LeftMenu;
}(_react.Component);

var app = document.getElementById('app');
exports.default = (0, _reactRouterDom.withRouter)(LeftMenu);

/***/ }),

/***/ 401:
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

var _react = __webpack_require__(1);

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

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualMember = __webpack_require__(452);

var _IndividualMember2 = _interopRequireDefault(_IndividualMember);

var _reactToggleButton = __webpack_require__(373);

var _reactToggleButton2 = _interopRequireDefault(_reactToggleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Member_lists = function (_Component) {
  (0, _inherits3.default)(Member_lists, _Component);

  function Member_lists() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Member_lists);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Member_lists.__proto__ || Object.getPrototypeOf(Member_lists)).call(this));

    _this.showMembers = function () {
      if (_this.state.allGroupies != undefined) {
        var rowLen = _this.state.allGroupies.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            'div',
            { className: 'invitation-info' },
            'No members :('
          );
        }
        return _this.state.allGroupies.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualMember2.default, {
            member: item,
            key: index,
            lastRow: lastRow,
            user_permission: _this.state.current_user_permission
          });
        });
      }
    };

    _this.update_all_accept_setting = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var update_exp;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios2.default.post('/api/groups/update/all_accept/', {
                group_id: _this.props.routeProps.match.params.id,
                all_accept: !_this.state.value_all_accept_setting
              });

            case 3:
              update_exp = _context.sent;
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 9:

              _this.setState({
                value_all_accept_setting: !_this.state.value_all_accept_setting
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 6]]);
    }));

    _this.state = {
      current_user_permission: -1,
      value_all_accept_setting: false,
      show_settings: false
    };
    return _this;
  }

  (0, _createClass3.default)(Member_lists, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var getMembers = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getMembers, getOwner, current_member;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/usergroup/member_lists/' + self.props.routeProps.match.params.id);

                case 3:
                  _getMembers = _context2.sent;
                  _context2.next = 6;
                  return _axios2.default.get('/api/groups/show_owner/' + self.props.routeProps.match.params.id);

                case 6:
                  getOwner = _context2.sent;

                  if (!(_getMembers.data.all_group_members.length == 0)) {
                    _context2.next = 10;
                    break;
                  }

                  self.setState({
                    allGroupies: getOwner.data.show_owner
                  });
                  return _context2.abrupt('return');

                case 10:
                  _getMembers.data.all_group_members.push(getOwner.data.show_owner[0]);

                  //0=Owner, 1=Admin, 2=Moderator, 3=User, 42=Pending, -1=Not a member

                  if (!(self.props.initialData.userInfo.id == _getMembers.data.all_group_members[0].user_id)) {
                    _context2.next = 15;
                    break;
                  }

                  self.state.current_user_permission = 0;
                  _context2.next = 24;
                  break;

                case 15:
                  _context2.next = 17;
                  return _axios2.default.get('/api/usergroup/current_member/' + _getMembers.data.all_group_members[0].group_id);

                case 17:
                  current_member = _context2.sent;

                  if (!(current_member.data.current_member.length > 0)) {
                    _context2.next = 22;
                    break;
                  }

                  self.state.current_user_permission = current_member.data.current_member[0].permission_level;
                  _context2.next = 24;
                  break;

                case 22:
                  self.setState({
                    allGroupies: _getMembers.data.all_group_members
                  });
                  return _context2.abrupt('return');

                case 24:
                  if (self.state.current_user_permission == 0 || self.state.current_user_permission == 1 || self.state.current_user_permission == 2) {
                    self.setState({
                      show_settings: true
                    });
                  }

                  self.setState({
                    allGroupies: _getMembers.data.all_group_members
                  });
                  _context2.next = 31;
                  break;

                case 28:
                  _context2.prev = 28;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 31:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 28]]);
        }));

        return function getMembers() {
          return _ref2.apply(this, arguments);
        };
      }();

      var getGroupInfo = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _getGroupInfo;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/groups/' + self.props.routeProps.match.params.id);

                case 3:
                  _getGroupInfo = _context3.sent;

                  self.setState({
                    value_all_accept_setting: _getGroupInfo.data.group[0].all_accept
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function getGroupInfo() {
          return _ref3.apply(this, arguments);
        };
      }();

      if (this.props.initialData != 'loading') {
        getMembers();
      }

      getGroupInfo();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.allGroupies !== undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'invitation-page' },
          _react2.default.createElement(
            'div',
            { className: 'content-area invitation-page' },
            _react2.default.createElement(
              'div',
              { id: 'header' },
              _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-16.png' })
            ),
            this.state.show_settings && _react2.default.createElement(
              'div',
              { className: 'group-settings' },
              'All members can accept this groups\' invitations \xA0\xA0\xA0',
              _react2.default.createElement(_reactToggleButton2.default, {
                value: this.state.value_all_accept_setting || false,
                onToggle: function onToggle(value_all_accept_setting) {
                  _this3.update_all_accept_setting();
                }
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'padding-container' },
              _react2.default.createElement(
                'div',
                { className: 'invitation-grey-container' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Members - (',
                  this.state.allGroupies.length == 1 ? this.state.allGroupies.length + ' member' : this.state.allGroupies.length + ' members',
                  ')'
                ),
                _react2.default.createElement('div', { className: 'padding-container' }),
                _react2.default.createElement(
                  'div',
                  { className: 'invitation-container' },
                  this.showMembers()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area invitation-page' },
          'Loading'
        );
      }
    }
  }]);
  return Member_lists;
}(_react.Component);

exports.default = Member_lists;

/***/ }),

/***/ 403:
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

var _react = __webpack_require__(1);

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
          _react2.default.createElement("img", { src: "https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Chat.png" })
        )
      );
    }
  }]);
  return Messenger;
}(_react.Component);

exports.default = Messenger;


var app = document.getElementById("app");

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualInvitation = __webpack_require__(85);

var _IndividualInvitation2 = _interopRequireDefault(_IndividualInvitation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyApprovals = function (_Component) {
  (0, _inherits3.default)(MyApprovals, _Component);

  function MyApprovals() {
    (0, _classCallCheck3.default)(this, MyApprovals);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyApprovals.__proto__ || Object.getPrototypeOf(MyApprovals)).call(this));

    _this.showInvitations = function () {
      if (_this.state.myGroup_approvals != undefined) {
        var rowLen = _this.state.myGroup_approvals.length;
        var lastRow = false;
        if (rowLen == 0) {
          return _react2.default.createElement(
            'div',
            { className: 'invitation-info' },
            'No pending approvals'
          );
        }
        return _this.state.myGroup_approvals.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualInvitation2.default, {
            invitation: item,
            key: index,
            lastRow: lastRow,
            type: 'group_approvals'
          });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(MyApprovals, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var get_group_approvals = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _get_group_approvals;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/usergroup/get_all_my_group_approvals/' + self.props.routeProps.match.params.id);

                case 3:
                  _get_group_approvals = _context.sent;

                  self.setState({
                    myGroup_approvals: _get_group_approvals.data.admin_group_permissions
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function get_group_approvals() {
          return _ref.apply(this, arguments);
        };
      }();
      get_group_approvals();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'invitation-page' },
        _react2.default.createElement(
          'div',
          { className: 'content-area invitation-page' },
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'invitation-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'myApprovals'
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'invitation-container' },
                this.showInvitations()
              )
            )
          )
        )
      );
    }
  }]);
  return MyApprovals;
}(_react.Component);

exports.default = MyApprovals;

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualFriend = __webpack_require__(147);

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
            'div',
            { className: 'invitation-info' },
            'No friends :('
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
    key: 'componentWillMount',
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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
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
    key: 'render',
    value: function render() {
      if (this.state.allMyFriends !== undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'invitation-page' },
          _react2.default.createElement(
            'div',
            { className: 'content-area invitation-page' },
            _react2.default.createElement(
              'div',
              { id: 'header' },
              _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-16.png' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'padding-container' },
              _react2.default.createElement(
                'div',
                { className: 'invitation-grey-container' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'myFriends - (',
                  this.state.allMyFriends.length == 1 ? this.state.allMyFriends.length + ' friend' : this.state.allMyFriends.length + ' friends',
                  ')'
                ),
                _react2.default.createElement('div', { className: 'padding-container' }),
                _react2.default.createElement(
                  'div',
                  { className: 'invitation-container' },
                  this.showFriends()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area invitation-page' },
          'Loading'
        );
      }
    }
  }]);
  return MyFriends;
}(_react.Component);

exports.default = MyFriends;

/***/ }),

/***/ 406:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MyComposeSection = __webpack_require__(86);

var _MyComposeSection2 = _interopRequireDefault(_MyComposeSection);

var _MyPosts = __webpack_require__(152);

var _MyPosts2 = _interopRequireDefault(_MyPosts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyHome = function (_Component) {
  (0, _inherits3.default)(MyHome, _Component);

  function MyHome() {
    (0, _classCallCheck3.default)(this, MyHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyHome.__proto__ || Object.getPrototypeOf(MyHome)).call(this));

    _this.state = {
      name: 'Raaz'
    };
    return _this;
  }

  (0, _createClass3.default)(MyHome, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-area' },
        _react2.default.createElement(_MyComposeSection2.default, {
          initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData
        }),
        _react2.default.createElement(_MyPosts2.default, {
          initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData
        })
      );
    }
  }]);
  return MyHome;
}(_react.Component);

exports.default = MyHome;

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _ScheduledGamePost = __webpack_require__(59);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyScheduledGames = function (_Component) {
  (0, _inherits3.default)(MyScheduledGames, _Component);

  function MyScheduledGames() {
    (0, _classCallCheck3.default)(this, MyScheduledGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyScheduledGames.__proto__ || Object.getPrototypeOf(MyScheduledGames)).call(this));

    _this.fetchMoreData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter + 1
      }, function () {
        _this.pullData();
        if (_this.state.db_row_counter > 1) {
          _this.setState({ show_prev: true });
        }
      });
    };

    _this.fetchPrevData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter - 1
      }, function () {
        _this.pullData();
        if (_this.state.db_row_counter < 2) {
          _this.setState({ show_prev: false });
        }
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.myScheduledGames != undefined) {
        return _this.state.myScheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ScheduledGamePost2.default, {
            schedule_game: item,
            key: index,
            user: _this.props.initialData
          });
        });
      }
    };

    _this.toggleChange = function () {
      _this.setState({
        isChecked: !_this.state.isChecked,
        db_row_counter: 1
      }, function () {
        _this.pullData();
      });
    };

    _this.state = {
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      isChecked: true
    };
    return _this;
  }

  (0, _createClass3.default)(MyScheduledGames, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchMoreData();
    }
  }, {
    key: 'pullData',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var myScheduledGames;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                //BUG: Without this, it keeps old posts. not sure why, so doing a hard reset, as a added bonus, it scrolls up to the top. for some reason window.scollTo isn't working
                this.setState({
                  myScheduledGames: []
                });
                _context.next = 4;
                return _axios2.default.get('/api/myScheduledGames/' + this.state.db_row_counter + '/' + this.state.isChecked);

              case 4:
                myScheduledGames = _context.sent;

                if (myScheduledGames.data.myScheduledGames.data.length > 10) {
                  this.setState({
                    show_more: true
                  });
                  myScheduledGames.data.myScheduledGames.data.pop();
                } else {
                  this.setState({
                    show_more: false
                  });
                }
                this.setState({
                  myScheduledGames: myScheduledGames.data.myScheduledGames.data
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function pullData() {
        return _ref.apply(this, arguments);
      }

      return pullData;
    }()
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myScheduledGames !== undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
          _react2.default.createElement(
            'div',
            { className: 'content-area scheduleGames-page' },
            _react2.default.createElement(
              'div',
              { id: 'header-2' },
              _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-19.png' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'full-game' },
              _react2.default.createElement('input', {
                type: 'checkbox',
                defaultChecked: this.state.isChecked,
                onChange: this.toggleChange
              }),
              '\xA0Exclude Expired Games?'
            ),
            _react2.default.createElement('div', { className: 'da-gap' }),
            this.showLatestPosts(),
            this.state.show_prev && _react2.default.createElement(
              'div',
              { className: 'prev_pls', onClick: this.fetchPrevData },
              '<',
              '- Previous'
            ),
            this.state.show_more && _react2.default.createElement(
              'div',
              { className: 'more_pls', onClick: this.fetchMoreData },
              'Next ->'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          'Loading'
        );
      }
    }
  }]);
  return MyScheduledGames;
}(_react.Component);

exports.default = MyScheduledGames;

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactToggleButton = __webpack_require__(373);

var _reactToggleButton2 = _interopRequireDefault(_reactToggleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MySettings = function (_Component) {
  (0, _inherits3.default)(MySettings, _Component);

  function MySettings() {
    (0, _classCallCheck3.default)(this, MySettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MySettings.__proto__ || Object.getPrototypeOf(MySettings)).call(this));

    _this.confirm_delete_exp = function () {
      if (window.confirm('Are you REALLY sure you wish to delete your Account? Once gone, its gone, we wont be able to recover this!!!')) _this.delete_exp();
    };

    _this.delete_exp = function () {
      try {
        var byebyebye = _axios2.default.get('/api/user/delete');
      } catch (error) {
        console.log(error);
      }
      _this.setState({ redirect_: true });
    };

    _this.update_email = function () {
      _this.setState({
        value_email: !_this.state.value_email
      });

      try {
        var post = _axios2.default.post('/api/settings', {
          email_notification: _this.state.value_email ? 0 : 1
        });
      } catch (error) {
        console.log(error);
      }
    };

    _this.state = {
      value_email: false,
      value_password: false,
      value_delete: false,
      redirect_: false
    };
    return _this;
  }

  (0, _createClass3.default)(MySettings, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var getSettings = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getSettings;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/settings');

                case 3:
                  _getSettings = _context.sent;

                  self.setState({
                    value_email: _getSettings.data.mySettings[0].email_notification
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getSettings() {
          return _ref.apply(this, arguments);
        };
      }();

      getSettings();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_) {
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: '/logout' });
      }
      return _react2.default.createElement(
        'section',
        { id: 'mySettings-page' },
        _react2.default.createElement(
          'div',
          { className: 'content-area mySettings-page' },
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'invitation-grey-container' },
              _react2.default.createElement(
                'h3',
                null,
                'mySettings'
              ),
              _react2.default.createElement('div', { className: 'padding-container' }),
              _react2.default.createElement(
                'div',
                { className: 'mySettings-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'email-notification' },
                  'Email notifications:',
                  _react2.default.createElement(
                    'div',
                    { className: 'email-toggle' },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_email || false,
                      onToggle: function onToggle(value_email) {
                        _this2.update_email();
                      }
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'delete-account' },
                  'Delete Account:',
                  _react2.default.createElement(
                    'div',
                    { className: 'delete-toggle' },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_delete || false,
                      onToggle: function onToggle(value_delete) {
                        {
                          if (window.confirm('Are you sure you wish to delete your Account???')) _this2.confirm_delete_exp();
                        }
                      }
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'change-password' },
                  'Change Password:',
                  _react2.default.createElement(
                    'div',
                    { className: 'change-toggle' },
                    _react2.default.createElement(_reactToggleButton2.default, {
                      value: this.state.value_password || false,
                      onToggle: function onToggle(value_password) {
                        window.location.href = '/changepwd';
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

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(49);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualNotification = __webpack_require__(149);

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
            'div',
            { className: 'notifications-info' },
            'No notifications'
          );
        }
        return _this.state.myNoti.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualNotification2.default, {
            notification: item,
            key: index,
            lastRow: lastRow
          });
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
    key: 'componentWillMount',
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
                  singleArr = [].concat((0, _toConsumableArray3.default)(getnoti.data.allMylike_posts), (0, _toConsumableArray3.default)(getnoti.data.allMylike_comments), (0, _toConsumableArray3.default)(getnoti.data.allMylike_replies), (0, _toConsumableArray3.default)(getnoti.data.allMycomments), (0, _toConsumableArray3.default)(getnoti.data.allMyreplies), (0, _toConsumableArray3.default)(getnoti.data.allMyschedulegames), (0, _toConsumableArray3.default)(getnoti.data.myschedulegames_attendees), (0, _toConsumableArray3.default)(getnoti.data.mygroups), (0, _toConsumableArray3.default)(getnoti.data.myschedulegames_approvals), (0, _toConsumableArray3.default)(getnoti.data.allMyarchived_schedulegames), (0, _toConsumableArray3.default)(getnoti.data.dropped_out_attendees), (0, _toConsumableArray3.default)(getnoti.data.group_member_approved));

                  self.setState({
                    myNoti: singleArr.length == 0 ? '' : self.mergeSort(singleArr)
                  });
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 11:
                case 'end':
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.myNoti != undefined) {
        var show_buttons = false;

        if (this.state.myNoti.length > 0) {
          show_buttons = true;
        }

        return _react2.default.createElement(
          'section',
          { id: 'notifications-page' },
          _react2.default.createElement(
            'div',
            { className: 'content-area notifications-page' },
            _react2.default.createElement(
              'div',
              { className: 'padding-container' },
              _react2.default.createElement(
                'div',
                { className: 'notifications-grey-container' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'myNotifications'
                ),
                show_buttons && _react2.default.createElement(
                  'div',
                  { className: 'noti-buttons' },
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'allread',
                      onClick: function onClick() {
                        if (window.confirm('Are you sure you wish to Mark ALL as Read?')) _this2.mark_all();
                      } },
                    'Mark all as read'
                  ),
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'deleteall',
                      onClick: function onClick() {
                        if (window.confirm('Are you sure you wish to Delete ALL notifications?')) _this2.delete_all();
                      } },
                    'Delete All'
                  )
                ),
                _react2.default.createElement('div', { className: 'padding-container' }),
                _react2.default.createElement(
                  'div',
                  { className: 'notifications-container' },
                  this.showNotifications()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area notifications-page' },
          'Loading'
        );
      }
    }
  }]);
  return Notifications;
}(_react.Component);

exports.default = Notifications;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualComment = __webpack_require__(48);

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
                _context.t0 = _context['catch'](0);

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
              case 'end':
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
                return _axios2.default.get('/api/likes/delete/' + post_id);

              case 3:
                unlike = _context2.sent;
                deletePostLike = _axios2.default.get('/api/notifications/deletePostLike/' + post_id);
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

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
              case 'end':
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
                  return _axios2.default.get('/api/comments/' + post_id);

                case 3:
                  myComments = _context3.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: '',
                    comment_total: myComments.data.allComments.length
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
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
      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
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

                  if (post.user_id != user.userInfo.id) {
                    addPostLike = _axios2.default.post('/api/notifications/addComment', {
                      other_user_id: post.user_id,
                      post_id: self.props.post.id,
                      comment_id: postComment.data.id
                    });
                  }
                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });
                  _context4.next = 14;
                  break;

                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4['catch'](0);

                  console.log(_context4.t0);

                case 14:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 11]]);
        }));

        return function saveComment() {
          return _ref4.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.update_post = function (e) {
      if (_this.state.value2 == '') {
        return;
      }
      if (_this.state.value2.trim() == '') {
        _this.setState({
          value: ''
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
                  return _axios2.default.post('/api/post/update/' + post_id, {
                    content: self.state.value2
                  });

                case 3:
                  myEditPost = _context5.sent;

                  self.setState({
                    content: self.state.value2,
                    edit_post: false,
                    value2: ''
                  });
                  _context5.next = 10;
                  break;

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5['catch'](0);

                  console.log(_context5.t0);

                case 10:
                case 'end':
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
          value2: ''
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
          return _react2.default.createElement(_IndividualComment2.default, {
            comment: item,
            key: index,
            user: _this.props.user
          });
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
            case 'end':
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
                myPost_delete = _axios2.default.get('/api/post/delete/' + post_id);

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
            case 'end':
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
      admirer_first_name: '',
      admirer_last_name: '',
      pull_once: true,
      value: '',
      value2: '',
      zero_comments: false,
      dropdown: false,
      show_post_options: false,
      post_deleted: false,
      edit_post: false,
      content: '',
      post_time: ''
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ like: this.props.post.do_I_like_it });
      this.setState({ total: this.props.post.total });
      this.setState({ admirer_first_name: this.props.post.admirer_first_name });
      this.setState({ admirer_last_name: this.props.post.admirer_last_name });

      var post_timestamp = (0, _moment2.default)(this.props.post.updated_at, 'YYYY-MM-DD HH:mm:ssZ');
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
                  return _axios2.default.get('/api/post/my_count/' + post_id);

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
                  _context8.t0 = _context8['catch'](0);

                  console.log(_context8.t0);

                case 10:
                case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.post_deleted != true) {
        var post = this.props.post; //destructing of object

        var media_urls = [];
        if (post.type == 'photo' || post.type == 'video') {
          media_urls = JSON.parse(post.media_url);
        }

        return _react2.default.createElement(
          'div',
          { className: 'update-container' },
          _react2.default.createElement(
            'div',
            { className: 'padding-container' },
            _react2.default.createElement(
              'div',
              { className: 'grey-container' },
              _react2.default.createElement(
                'div',
                { className: 'author-info' },
                this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + post.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + post.profile_img + '\')'
                  } }),
                !this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + post.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png\')'
                  } }),
                _react2.default.createElement(
                  'div',
                  { className: 'info' },
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    {
                      to: '/profile/' + post.user_id },
                    post.first_name + ' ' + post.last_name
                  ),
                  ' ',
                  'shared a',
                  ' ',
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/' + post.user_id },
                    post.type == 'text' ? 'story' : 'image'
                  )
                ),
                this.state.show_post_options && _react2.default.createElement(
                  'div',
                  { className: 'post-options' },
                  _react2.default.createElement('i', {
                    className: 'fas fa-ellipsis-h',
                    onClick: this.clickedDropdown })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'post-dropdown ' + (this.state.dropdown ? 'active' : '') },
                  _react2.default.createElement(
                    'nav',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'edit', onClick: this.clickedEdit },
                      'Edit \xA0'
                    ),
                    _react2.default.createElement(
                      'div',
                      {
                        className: 'delete',
                        onClick: function onClick() {
                          if (window.confirm('Are you sure you wish to delete this post?')) _this3.delete_exp();
                        } },
                      'Delete'
                    ),
                    '\xA0'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'media' },
                !this.state.edit_post && _react2.default.createElement(
                  'div',
                  { className: 'update-info' },
                  _react2.default.createElement(
                    'p',
                    null,
                    this.state.content
                  )
                ),
                this.state.edit_post && _react2.default.createElement(
                  'div',
                  { className: 'update-info' },
                  _react2.default.createElement(
                    'div',
                    { className: 'compose-comment' },
                    _react2.default.createElement('textarea', {
                      name: 'name2',
                      rows: 8,
                      cols: 80,
                      value: this.state.value2,
                      onChange: this.handleChange2,
                      maxLength: '254',
                      onKeyUp: this.detectKey2,
                      ref: this.setTextInputRef2
                    })
                  )
                ),
                media_urls.map(function (data, index) {
                  if (post.type == 'photo') {
                    return _react2.default.createElement('img', {
                      className: 'post-photo',
                      src: data.src,
                      key: data.key });
                  } else if (post.type == 'video') {
                    return _react2.default.createElement(
                      'video',
                      { className: 'post-video', key: data.key, controls: true },
                      _react2.default.createElement('source', { src: data.src, key: data.key })
                    );
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'update-stats' },
                _react2.default.createElement(
                  'div',
                  { className: 'icon-section' },
                  _react2.default.createElement(
                    'div',
                    { className: 'like-circle' },
                    _react2.default.createElement('i', { className: 'fas fa-thumbs-up' })
                  )
                ),
                this.state.show_like && _react2.default.createElement(
                  'div',
                  { className: 'other-users' },
                  this.state.total > 1 ? post.admirer_first_name + ' ' + post.admirer_last_name + ' and ' + this.state.total + ' others liked this update' : this.state.admirer_first_name + ' ' + this.state.admirer_last_name + ' liked this update'
                ),
                !this.state.show_like && _react2.default.createElement(
                  'div',
                  { className: 'other-users' },
                  'Be the first to like this!'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'post-time' },
                  this.state.post_time
                ),
                this.state.like && _react2.default.createElement(
                  'div',
                  {
                    className: 'like-btn',
                    onClick: function onClick() {
                      return _this3.click_unlike_btn(post.id);
                    } },
                  _react2.default.createElement('i', { className: 'fas fa-thumbs-up' }),
                  '\xA0Like'
                ),
                !this.state.like && _react2.default.createElement(
                  'div',
                  {
                    className: 'like-btn',
                    onClick: function onClick() {
                      return _this3.click_like_btn(post.id);
                    } },
                  _react2.default.createElement('i', { className: 'far fa-thumbs-up' }),
                  '\xA0Like'
                ),
                this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-stats', onClick: this.onChange },
                  ' ',
                  this.state.comment_total > 1 ? this.state.comment_total + ' comments' : this.state.comment_total + ' comment',
                  ' '
                ),
                !this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-stats', onClick: this.focusTextInput },
                  ' ',
                  'No comments'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'compose-comment' },
                _react2.default.createElement('textarea', {
                  name: 'name',
                  rows: 8,
                  cols: 80,
                  placeholder: 'Make a comment...',
                  onFocus: this.onFocus,
                  value: this.state.value,
                  onChange: this.handleChange,
                  maxLength: '254',
                  onKeyUp: this.detectKey,
                  ref: this.setTextInputRef
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'buttons' },
                  _react2.default.createElement(
                    'div',
                    { className: 'repost-btn', onClick: this.insert_comment },
                    _react2.default.createElement('i', { className: 'fas fa-reply' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'comments' },
                this.state.show_more_comments && _react2.default.createElement(
                  'div',
                  { className: 'show-individual-comments' },
                  this.showComment()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement('div', { className: 'update-container' });
      }
    }
  }]);
  return IndividualPost;
}(_react.Component);

exports.default = IndividualPost;


var app = document.getElementById('app');

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPlayer = __webpack_require__(150);

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
            'div',
            { className: 'invitation-info' },
            'No attendees :('
          );
        }
        return _this.state.allMyFriends.map(function (item, index) {
          if (rowLen === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualPlayer2.default, { attendee: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(PlayerList, [{
    key: 'componentWillMount',
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
                  return _axios2.default.get('/api/attendees/role_call_ALL/' + match.params.id);

                case 3:
                  _getAttendees = _context.sent;

                  self.setState({
                    allMyFriends: _getAttendees.data.role_call_ALL
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getAttendees() {
          return _ref.apply(this, arguments);
        };
      }();

      var getArchive_Attendees = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getAttendees2;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/archive_attendees/role_call_ALL/' + match.params.archive_id);

                case 3:
                  _getAttendees2 = _context2.sent;

                  self.setState({
                    allMyFriends: _getAttendees2.data.role_call_ALL
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getArchive_Attendees() {
          return _ref2.apply(this, arguments);
        };
      }();

      if (match.params.archive_id != undefined || match.params.archive_id != null) {
        getArchive_Attendees();
      } else {
        getAttendees();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.allMyFriends !== undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'invitation-page' },
          _react2.default.createElement(
            'div',
            { className: 'content-area invitation-page' },
            _react2.default.createElement(
              'div',
              { className: 'padding-container' },
              _react2.default.createElement(
                'div',
                { className: 'invitation-grey-container' },
                _react2.default.createElement(
                  'h3',
                  null,
                  this.state.allMyFriends.length == 1 ? ' ' + this.state.allMyFriends.length + ' attendee' : this.state.allMyFriends.length + ' attendees'
                ),
                _react2.default.createElement('div', { className: 'padding-container' }),
                _react2.default.createElement(
                  'div',
                  { className: 'invitation-container' },
                  this.showFriends()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area invitation-page' },
          'Loading'
        );
      }
    }
  }]);
  return PlayerList;
}(_react.Component);

exports.default = PlayerList;

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualGamingExperience = __webpack_require__(148);

var _IndividualGamingExperience2 = _interopRequireDefault(_IndividualGamingExperience);

var _IndividualEsportsExperience = __webpack_require__(146);

var _IndividualEsportsExperience2 = _interopRequireDefault(_IndividualEsportsExperience);

var _FileOpenModal = __webpack_require__(164);

var _FileOpenModal2 = _interopRequireDefault(_FileOpenModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Need to work for it

var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Profile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

    _this.addFriend = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var match, self, deleteNoti, createFriend, userProfile, addFriend;
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

              return _context.abrupt('return');

            case 4:
              if (!(_this.state.friendStatus === 3)) {
                _context.next = 8;
                break;
              }

              try {
                deleteNoti = _axios2.default.get('/api/notifications/delete/' + _this.state.noti_id);
                createFriend = _axios2.default.post('/api/friends/create', {
                  friend_id: match.params.id
                });
              } catch (error) {
                console.log(error);
              }
              self.setState({
                friendTxt: 'Remove Friend',
                friendStatus: 1
              });
              return _context.abrupt('return');

            case 8:
              if (!_this.state.friendStatus) {
                _context.next = 22;
                break;
              }

              if (!window.confirm('Are you sure you wish to unfriend?')) {
                _context.next = 20;
                break;
              }

              _context.prev = 10;
              _context.next = 13;
              return _axios2.default.get('/api/user/' + match.params.id + '/unfriend');

            case 13:
              userProfile = _context.sent;

              self.setState({
                friendTxt: 'Add Friend',
                friendStatus: 0
              });
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](10);

              console.log(_context.t0);

            case 20:
              _context.next = 32;
              break;

            case 22:
              _context.prev = 22;
              _context.next = 25;
              return _axios2.default.post('/api/notifications/addFriend', {
                other_user_id: match.params.id
              });

            case 25:
              addFriend = _context.sent;

              self.setState({
                friendTxt: 'Request Pending',
                friendStatus: 2
              });
              _context.next = 32;
              break;

            case 29:
              _context.prev = 29;
              _context.t1 = _context['catch'](22);

              console.log(_context.t1);

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[10, 17], [22, 29]]);
    }));

    _this.showAllGamingExperiences = function () {
      if (_this.state.gameData !== undefined) {
        var rowLen = _this.state.gameData.allGameExperiences.length;
        return _this.state.gameData.allGameExperiences.map(function (item, index) {
          return _react2.default.createElement(_IndividualGamingExperience2.default, {
            item: item,
            key: index,
            row: index,
            rowLen: rowLen,
            routeProps: _this.props.routeProps,
            initialData: _this.props.initialData
          });
        });
      }
    };

    _this.showAllesportsExperiences = function () {
      if (_this.state.esportsExpData !== undefined) {
        var rowLen = _this.state.esportsExpData.esportsExperience.length;
        return _this.state.esportsExpData.esportsExperience.map(function (item, index) {
          return _react2.default.createElement(_IndividualEsportsExperience2.default, {
            item: item,
            key: index,
            row: index,
            rowLen: rowLen,
            routeProps: _this.props.routeProps,
            initialData: _this.props.initialData
          });
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

    _this.editDossier = function () {
      _this.state.redirect_link = 'editDossier';
      _this.setState({ redirect_: true });
    };

    _this.addGamingExp = function () {
      _this.state.redirect_link = 'addGamingExp';
      _this.setState({ redirect_: true });
    };

    _this.addEsportsExp = function () {
      _this.state.redirect_link = 'addEsportsExp';
      _this.setState({ redirect_: true });
    };

    _this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: '',
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false,
      noti_id: 0,
      redirect_: false,
      redirect_link: ''
    };

    _this.callbackFileModalClose = _this.callbackFileModalClose.bind(_this);
    _this.callbackFileModalConfirm = _this.callbackFileModalConfirm.bind(_this);

    _this.clickUpdateProfile = _this.clickUpdateProfile.bind(_this);
    _this.clickUpdateProfileBack = _this.clickUpdateProfileBack.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Profile, [{
    key: 'callbackFileModalClose',
    value: function callbackFileModalClose() {
      this.setState({
        bFileModalOpen: false,
        profile_attr: ''
      });
    }
  }, {
    key: 'callbackFileModalConfirm',
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
    key: 'clickUpdateProfileBack',
    value: function clickUpdateProfileBack() {
      this.setState({
        bFileModalOpen: true,
        profile_attr: 'profile_bg'
      });
    }
  }, {
    key: 'clickUpdateProfile',
    value: function clickUpdateProfile() {
      this.setState({
        bFileModalOpen: true,
        profile_attr: 'profile_img'
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;
      var initialData = this.props.initialData;


      if (initialData != 'loading') {
        if (initialData.userInfo.id == match.params.id) {
          this.setState({ myPage: true });
        }
      }
      var getUser = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var userProfile, checkFriend, checkFriendPending;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/user/' + match.params.id);

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
                    friendTxt: 'Remove Friend',
                    friendStatus: 1
                  });
                  _context2.next = 20;
                  break;

                case 9:
                  _context2.next = 11;
                  return _axios2.default.get('/api/notifications/friend/' + match.params.id);

                case 11:
                  checkFriend = _context2.sent;

                  if (!checkFriend.data.checkedFriend) {
                    _context2.next = 16;
                    break;
                  }

                  self.setState({
                    friendTxt: 'Request Pending',
                    friendStatus: 2
                  });
                  _context2.next = 20;
                  break;

                case 16:
                  _context2.next = 18;
                  return _axios2.default.get('/api/notifications/myFriendRequest/' + match.params.id);

                case 18:
                  checkFriendPending = _context2.sent;

                  if (checkFriendPending.data.myFriendRequest) {
                    self.setState({
                      friendTxt: 'Accept Request',
                      friendStatus: 3,
                      noti_id: checkFriendPending.data.noti_id[0].id
                    });
                  } else {
                    self.setState({
                      friendTxt: 'Add Friend',
                      friendStatus: 0
                    });
                  }

                case 20:
                  _context2.next = 25;
                  break;

                case 22:
                  _context2.prev = 22;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 25:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 22]]);
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
                  return _axios2.default.get('/api/GameExperiences/' + match.params.id);

                case 3:
                  gameExperience = _context3.sent;

                  self.setState({
                    gameData: gameExperience.data
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
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
                  return _axios2.default.get('/api/esports_experiences/' + match.params.id);

                case 3:
                  esportsExperience = _context4.sent;

                  self.setState({
                    esportsExpData: esportsExperience.data
                  });
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](0);

                  console.log(_context4.t0);

                case 10:
                case 'end':
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
                  return _axios2.default.get('/api/esports_bio/show_bio/' + match.params.id);

                case 3:
                  esportsBio = _context5.sent;

                  self.setState({
                    esportsBioData: esportsBio.data
                  });
                  if (esportsBio.data.myProfile.length != 0) {
                    if (esportsBio.data.myProfile[0].games_of_ardour != '') {
                      self.setState({
                        show_bio: true
                      });
                    } else if (esportsBio.data.myProfile[0].career_highlights != '' && esportsBio.data.myProfile[0].career_highlights != null) {
                      self.setState({
                        show_bio: true
                      });
                    }
                  }
                  _context5.next = 11;
                  break;

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5['catch'](0);

                  console.log(_context5.t0);

                case 11:
                case 'end':
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_) {
        var match = this.props.routeProps.match;

        var tmp;
        switch (this.state.redirect_link) {
          case 'editDossier':
            tmp = '/profile/' + match.params.id + '/edit/dossier';
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
          case 'addGamingExp':
            tmp = '/profile/' + match.params.id + '/add/gamingexp';
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
          case 'addEsportsExp':
            tmp = '/profile/' + match.params.id + '/add/esportsExp';
            return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
            break;
        }
      }
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
              contact_info = _state$userProfile.contact_info,
              relationship_status = _state$userProfile.relationship_status;

          var games_of_ardour,
              show_ardour = false;
          var career_highlights,
              show_highlights = false;
          var show_contact_info = false;
          var show_location = false;

          if (this.state.friendStatus == 1 || this.state.myPage) {
            show_contact_info = true;
          }

          if (country != null && country.trim() != '') {
            show_location = true;
          }

          if (this.state.show_bio) {
            if (this.state.esportsBioData.myProfile[0].games_of_ardour != '' && this.state.esportsBioData.myProfile[0].games_of_ardour != undefined) {
              games_of_ardour = this.state.esportsBioData.myProfile[0].games_of_ardour;
              show_ardour = true;
            }

            if (this.state.esportsBioData.myProfile[0].career_highlights != '' && this.state.esportsBioData.myProfile[0].career_highlights != undefined) {
              career_highlights = this.state.esportsBioData.myProfile[0].career_highlights;
              show_highlights = true;
            }
          }

          return _react2.default.createElement(
            'section',
            { id: 'profile-page' },
            _react2.default.createElement(_FileOpenModal2.default, {
              bOpen: this.state.bFileModalOpen,
              callbackClose: this.callbackFileModalClose,
              callbackConfirm: this.callbackFileModalConfirm }),
            _react2.default.createElement(
              'div',
              { className: 'content-area profile-page' },
              _react2.default.createElement(
                'div',
                { className: 'header-grey-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'top-container' },
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'userbackground-img',
                      style: {
                        backgroundImage: 'url(\'' + profile_bg + '\')'
                      } },
                    this.state.myPage && _react2.default.createElement(
                      'div',
                      { className: 'header-background-uploader', onClick: function onClick() {
                          return _this3.clickUpdateProfileBack();
                        } },
                      'Update'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'user-img-upload-container' },
                    _react2.default.createElement('div', {
                      className: 'user-img',
                      style: {
                        backgroundImage: 'url(\'' + profile_img + '\')'
                      } }),
                    _react2.default.createElement('img', { className: 'user-profile-img', src: profile_img }),
                    this.state.myPage && _react2.default.createElement(
                      'div',
                      { className: 'user-img-upload', onClick: function onClick() {
                          return _this3.clickUpdateProfile();
                        } },
                      'Update',
                      ' '
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'bottom-container' },
                  _react2.default.createElement(
                    'div',
                    { className: 'follow_btn' },
                    !this.state.myPage && _react2.default.createElement(
                      'div',
                      { className: 'follow-btn', onClick: this.addFriend },
                      ' ',
                      this.state.friendTxt,
                      ' '
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'personal-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'info' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    first_name + ' ' + last_name
                  ),
                  show_location && _react2.default.createElement(
                    'div',
                    { className: 'location' },
                    _react2.default.createElement('i', { className: 'fas fa-circle' }),
                    '\xA0',
                    '' + region,
                    '\xA0',
                    '' + country
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'alias' },
                    '(',
                    '' + this.state.userProfile.alias,
                    ')'
                  ),
                  this.state.myPage && _react2.default.createElement(
                    'div',
                    { className: 'edit_btn' },
                    _react2.default.createElement('i', { className: 'fas fa-pencil-alt', onClick: this.editDossier })
                  ),
                  _react2.default.createElement(
                    'h4',
                    null,
                    '' + slogan
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'table' },
                  _react2.default.createElement(
                    'div',
                    { className: 'myBio' },
                    '' + bio
                  ),
                  show_contact_info && _react2.default.createElement(
                    'div',
                    { className: 'contact-info' },
                    '' + contact_info
                  ),
                  show_contact_info && _react2.default.createElement(
                    'div',
                    { className: 'relationship_status' },
                    '' + relationship_status
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { id: 'header' },
                _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-13.png' })
              ),
              this.state.show_bio && _react2.default.createElement(
                'div',
                { className: 'padding-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'esports-bio-grey-container' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    ' Esports Profile'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'esports-bio-container' },
                    show_ardour && _react2.default.createElement(
                      'div',
                      { className: 'esports-bio-ardour' },
                      _react2.default.createElement('i', { className: 'fas fa-user-shield' }),
                      '\xA0',
                      '' + games_of_ardour
                    ),
                    show_highlights && _react2.default.createElement(
                      'div',
                      { className: 'esports-bio-highlights' },
                      _react2.default.createElement('i', { className: 'fas fa-crown' }),
                      '\xA0 ',
                      '' + career_highlights
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'padding-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'esports-experience-grey-container' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    ' Esports Career'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'add-esports-experience' },
                    this.state.myPage && _react2.default.createElement('i', { className: 'fas fa-plus-circle', onClick: this.addEsportsExp })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'icon', onClick: this.clickedDropdownesports },
                    _react2.default.createElement('i', { className: 'fas fa-chevron-down' })
                  ),
                  _react2.default.createElement('div', { className: 'padding-container' }),
                  this.state.collapseesports && _react2.default.createElement(
                    'div',
                    { className: 'esports-container' },
                    this.showAllesportsExperiences()
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'padding-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'game-experience-grey-container' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    ' Gaming Interests'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'add-gaming-experience' },
                    this.state.myPage && _react2.default.createElement('i', { className: 'fas fa-plus-circle', onClick: this.addGamingExp })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'icon', onClick: this.clickedDropdown },
                    _react2.default.createElement('i', { className: 'fas fa-chevron-down' })
                  ),
                  _react2.default.createElement('div', { className: 'padding-container' }),
                  this.state.collapse && _react2.default.createElement(
                    'div',
                    { className: 'experience-container' },
                    this.showAllGamingExperiences()
                  )
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'content-area profile-page' },
            'Loading'
          );
        }
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area profile-page' },
          'Loading'
        );
      }
    }
  }]);
  return Profile;
}(_react.Component);

exports.default = Profile;

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AsyncCreatable = __webpack_require__(56);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _ScheduleGames_Header = __webpack_require__(455);

var _ScheduleGames_Header2 = _interopRequireDefault(_ScheduleGames_Header);

var _ScheduleGames_Dota = __webpack_require__(454);

var _ScheduleGames_Dota2 = _interopRequireDefault(_ScheduleGames_Dota);

var _ScheduleGames_Clash_Royale = __webpack_require__(453);

var _ScheduleGames_Clash_Royale2 = _interopRequireDefault(_ScheduleGames_Clash_Royale);

var _Utility_Function = __webpack_require__(166);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidNewOption(inputValue, selectValue, selectOptions) {
  return !(!inputValue || selectValue.some(function (option) {
    return compareOption(inputValue, option);
  }) || selectOptions.some(function (option) {
    return compareOption(inputValue, option);
  }));
}

var compareOption = function compareOption(inputValue, option) {
  var candidate = typeof inputValue === 'string' ? inputValue.toLowerCase() : inputValue;
  if (typeof option.value === 'string') {
    if (option.value.toLowerCase() === candidate) {
      return true;
    }
  }
  if (typeof option.label === 'string') {
    if (option.label.toLowerCase() === candidate) {
      return true;
    }
  }
  return option.value === candidate || option.label === candidate;
};

var ScheduleGames = function (_Component) {
  (0, _inherits3.default)(ScheduleGames, _Component);

  function ScheduleGames() {
    (0, _classCallCheck3.default)(this, ScheduleGames);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduleGames.__proto__ || Object.getPrototypeOf(ScheduleGames)).call(this));

    _this.handleChange_game_name = function (entered_name) {
      _this.setState({
        game_name_box: entered_name,
        default: false,
        games: false
      }, function () {
        if (entered_name) {
          switch (entered_name.value) {
            case 'Dota 2':
              _this.setState({ games: true });
              break;
            case 'Clash Royale':
              _this.setState({ games: true });
              break;
            default:
              _this.setState({ default: true });
          }
        } else {
          _this.setState({ default: true });
        }
      });
    };

    _this.showHeaders = function () {
      if (_this.state.just_one_time) {
        _this.state.just_one_time = false;
        return _react2.default.createElement(_ScheduleGames_Header2.default, {
          game_name_box: _this.state.game_name_box,
          show_single: true,
          props: _this.props
        });
      } else {
        return _react2.default.createElement(_ScheduleGames_Header2.default, {
          game_name_box: _this.state.game_name_box,
          show_single: false,
          props: _this.props
        });
      }
    };

    _this.showGames = function () {
      switch (_this.state.game_name_box.value) {
        case 'Dota 2':
          return _react2.default.createElement(_ScheduleGames_Dota2.default, {
            game_name_box: _this.state.game_name_box,
            props: _this.props
          });
          break;
        case 'Clash Royale':
          return _react2.default.createElement(_ScheduleGames_Clash_Royale2.default, {
            game_name_box: _this.state.game_name_box,
            props: _this.props
          });
          break;
      }
    };

    _this.onKeyDown = function (e) {
      (0, _Utility_Function.Disable_keys)(e);
    };

    _this.state = {
      game_name_box: null,
      default: true,
      games: false,
      just_one_time: true
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduleGames, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'getOptions',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(inputValue) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _Utility_Function.Game_name_values)(inputValue));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOptions(_x) {
        return _ref.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'posts' },
        _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          _react2.default.createElement(
            'div',
            { id: 'header-2' },
            _react2.default.createElement('img', { src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-17.png' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'game-menu' },
            _react2.default.createElement(
              'div',
              { className: 'game-name' },
              _react2.default.createElement(_AsyncCreatable2.default, {
                cacheOptions: true,
                defaultOptions: true,
                isValidNewOption: isValidNewOption,
                loadOptions: this.getOptions,
                onChange: this.handleChange_game_name,
                isClearable: true,
                value: this.state.game_name_box,
                className: 'game-name-box',
                placeholder: 'Enter Game name',
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
                },
                onKeyDown: this.onKeyDown
              })
            )
          ),
          this.state.default && this.showHeaders(),
          this.state.games && this.showGames()
        )
      );
    }
  }]);
  return ScheduleGames;
}(_react.Component);

exports.default = ScheduleGames;

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualApproval = __webpack_require__(449);

var _IndividualApproval2 = _interopRequireDefault(_IndividualApproval);

var _reactRouterDom = __webpack_require__(16);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduledGamesApprovals = function (_Component) {
  (0, _inherits3.default)(ScheduledGamesApprovals, _Component);

  function ScheduledGamesApprovals() {
    (0, _classCallCheck3.default)(this, ScheduledGamesApprovals);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamesApprovals.__proto__ || Object.getPrototypeOf(ScheduledGamesApprovals)).call(this));

    _this.showApprovals = function () {
      if (_this.state.myInvites != undefined) {
        var lastRow = false;
        if (_this.state.myInvites.length == 0 || _this.state.myInvites[0].attendees == undefined || _this.state.myInvites[0].attendees.length == 0) {
          return _react2.default.createElement(
            'div',
            { className: 'scheduledGamesApprovals-info' },
            'No pending approvals'
          );
          return;
        }
        return _this.state.myInvites.map(function (item, index) {
          if (_this.state.myInvites.length === index + 1) {
            lastRow = true;
          }
          return _react2.default.createElement(_IndividualApproval2.default, { approvals: item, key: index, lastRow: lastRow });
        });
      }
    };

    _this.state = {
      start_date: '',
      show_game_header: false
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduledGamesApprovals, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var match = this.props.routeProps.match;


      var getScheduleGameInvites = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _getScheduleGameInvites, myStartDateTime;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/attendees/getScheduleGameInvites/' + match.params.id);

                case 3:
                  _getScheduleGameInvites = _context.sent;

                  self.setState({
                    myInvites: _getScheduleGameInvites.data.getScheduleGameInvites
                  });

                  if (_getScheduleGameInvites.data.getScheduleGameInvites.length > 0) {
                    myStartDateTime = (0, _moment2.default)(_getScheduleGameInvites.data.getScheduleGameInvites[0].schedule_games.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();

                    self.setState({
                      start_date: myStartDateTime.format('Do MMM YY - h:mm a'),
                      show_game_header: true
                    });
                  }
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function getScheduleGameInvites() {
          return _ref.apply(this, arguments);
        };
      }();
      getScheduleGameInvites();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myInvites != undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'scheduledGamesApprovals-page' },
          _react2.default.createElement(
            'div',
            { className: 'content-area scheduledGamesApprovals-page' },
            _react2.default.createElement(
              'div',
              { className: 'padding-container' },
              _react2.default.createElement(
                'div',
                { className: 'scheduledGamesApprovals-grey-container' },
                this.state.show_game_header && _react2.default.createElement(
                  'h3',
                  null,
                  'myApprovals for',
                  ' ',
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    {
                      to: '/scheduledGames/' + this.state.myInvites[0].schedule_games.id },
                    ' ',
                    this.state.myInvites[0].schedule_games.game_name
                  ),
                  ' ',
                  'on this date: ',
                  this.state.start_date
                ),
                !this.state.show_game_header && _react2.default.createElement(
                  'h3',
                  null,
                  'myApprovals'
                ),
                _react2.default.createElement('div', { className: 'padding-container' }),
                _react2.default.createElement(
                  'div',
                  { className: 'scheduledGamesApprovals-container' },
                  this.showApprovals()
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement('section', { id: 'scheduledGamesApprovals-page' });
      }
    }
  }]);
  return ScheduledGamesApprovals;
}(_react.Component);

exports.default = ScheduledGamesApprovals;

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouterDom = __webpack_require__(16);

var _reactAutosuggest = __webpack_require__(325);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _match = __webpack_require__(157);

var _match2 = _interopRequireDefault(_match);

var _parse = __webpack_require__(158);

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
  return suggestion.first + ' ' + suggestion.last;
}

function renderSuggestion(suggestion, _ref) {
  var query = _ref.query;

  var suggestionText = suggestion.first + ' ' + suggestion.last;
  var matches = (0, _match2.default)(suggestionText, query);
  var parts = (0, _parse2.default)(suggestionText, matches);

  return _react2.default.createElement(
    'span',
    { className: 'suggestion-content' },
    _react2.default.createElement('span', {
      className: 'suggestion-user-img',
      style: {
        backgroundImage: 'url(\'' + suggestion.profile_img + '\')'
      } }),
    _react2.default.createElement(
      'span',
      { className: 'name' },
      parts.map(function (part, index) {
        var className = part.highlight ? 'highlight' : null;

        return _react2.default.createElement(
          'span',
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

    _this.onChange = function (event, _ref2) {
      var newValue = _ref2.newValue;

      if (newValue == '') {
        if (_this.timeout) clearTimeout(_this.timeout);
        playersDB = [];
        _this.setState({
          suggestions: [],
          value: ''
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
                  return _axios2.default.get('/api/user/' + value + '/playerSearchResults');

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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 11:
                case 'end':
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

      _this.props.history.push('/profile/' + suggestion.id);
    };

    _this.onKeyDown = function (e) {
      if (e.keyCode === 222 || e.keyCode === 191 || e.keyCode === 190 || e.keyCode === 220 || e.keyCode === 53 || e.keyCode === 51 || e.keyCode === 191) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    _this.timeout = 0;
    _this.state = {
      myFriendRequestNo: 0,
      value: '',
      suggestions: [],
      redirect_: false
    };
    return _this;
  }

  (0, _createClass3.default)(SearchHeader, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var getFriendnoti = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getFriendnoti, myRequests;

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

                  //var singleArr = [...myRequests.data.allMylike_posts, ...myRequests.data.allMylike_comments, ...myRequests.data.allMylike_replies, ...myRequests.data.allMycomments, ...myRequests.data.allMyreplies, ...myRequests.data.allMyschedulegames, ...myRequests.data.myschedulegames_attendees, ...myRequests.data.mygroups, ...myRequests.data.myschedulegames_approvals, ...myRequests.data.allMyarchived_schedulegames, ...myRequests.data.dropped_out_attendees, ...myRequests.data.group_member_approved]
                  self.setState({
                    myRequests: myRequests.data.number_of_notis
                  });
                  _context2.next = 14;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 11]]);
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
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      // Autosuggest will pass through all these props to the input.

      var inputProps = {
        placeholder: 'Search for players',
        value: value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown
      };
      return _react2.default.createElement(
        'div',
        { className: 'search-header' },
        _react2.default.createElement(
          'div',
          { className: 'search-box' },
          _react2.default.createElement(_reactAutosuggest2.default, {
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: getSuggestionValue,
            renderSuggestion: renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected,
            inputProps: inputProps,
            onKeyDown: this.onKeyDown
          }),
          _react2.default.createElement(
            'div',
            { className: 'icon-section' },
            _react2.default.createElement(
              'div',
              { className: 'noti' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/notifications' },
                _react2.default.createElement('i', { className: 'fas fa-bell' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'noti-number ' + (this.state.myRequests > 0 ? 'active' : '') },
                ' ',
                this.state.myRequests
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'comments' },
              _react2.default.createElement('i', { className: 'fas fa-comment' }),
              _react2.default.createElement(
                'div',
                { className: 'noti-number' },
                '3'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'user' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/invitation' },
                _react2.default.createElement('i', { className: 'fas fa-user' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'noti-number ' + (this.state.myFriendRequestNo > 0 ? 'active' : '') },
                ' ',
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

exports.default = (0, _reactRouterDom.withRouter)(SearchHeader);

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(41);

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
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
        });
      }
    };

    _this.state = {
      myPost: []
    };
    return _this;
  }

  (0, _createClass3.default)(SinglePost, [{
    key: 'componentWillMount',
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
                  return _axios2.default.get('/api/getpost/' + match.params.id);

                case 3:
                  myPost = _context.sent;
                  i = 0;

                case 5:
                  if (!(i < myPost.data.myPost.length)) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 8;
                  return _axios2.default.get('/api/likes/' + myPost.data.myPost[i].id);

                case 8:
                  myLikes = _context.sent;

                  myPost.data.myPost[i].total = myLikes.data.number_of_likes[0].total;
                  myPost.data.myPost[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPost.data.myPost[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPost.data.myPost[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPost.data.myPost[i].admirer_first_name = '';
                    myPost.data.myPost[i].admirer_last_name = '';
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
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 22:
                case 'end':
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
    key: 'render',
    value: function render() {
      if (this.state.myPost != undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
          _react2.default.createElement('div', { className: 'startofSinglePage' }),
          this.showLatestPost()
        );
      } else {
        return _react2.default.createElement('section', { id: 'posts' });
      }
    }
  }]);
  return SinglePost;
}(_react.Component);

exports.default = SinglePost;

var app = document.getElementById('app');

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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactModal = __webpack_require__(55);

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
      showModal: true,
      redirect_: false
    };
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(UploadPic, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      self.setState({
        userProfile: 1
      });
    }
  }, {
    key: 'handleCloseModal',
    value: function handleCloseModal() {
      this.state.redirect_ = true;
      this.setState({ showModal: false });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.redirect_) {
        var match = this.props.routeProps.match;

        var tmp = '/profile/' + match.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
      if (this.state.userProfile !== undefined) {
        var previewStyle = {
          display: 'inline',
          width: 100,
          height: 100
        };
        return _react2.default.createElement(
          'div',
          { className: 'content-area uploadPic-page' },
          _react2.default.createElement(_reactModal2.default, {
            isOpen: this.state.showModal,
            onRequestClose: this.handleCloseModal,
            shouldCloseOnOverlayClick: true,
            className: 'Modal',
            overlayClassName: 'Overlay' })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area uploadPic-page' },
          'Loading'
        );
      }
    }
  }]);
  return UploadPic;
}(_react.Component);

exports.default = UploadPic;

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactDatepicker = __webpack_require__(114);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(144);

var _AddScheduleGames_Submit_Data = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }, { value: 4, label: 'Hidden' }];

var limit_options = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }, { value: 25, label: '25' }, { value: 30, label: '30' }, { value: 40, label: '40' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 42, label: 'Unlimited' }];

var clash_royale_trophy = [{ value: '1000', label: '> 1000' }, { value: '2000', label: '> 2000' }, { value: '3000', label: '> 3000' }, { value: '4000', label: '> 4000' }, { value: '5000', label: '> 5000' }, { value: 'competitive', label: 'Competitive' }];

var AddScheduleGames_Clash_Royale = function (_Component) {
  (0, _inherits3.default)(AddScheduleGames_Clash_Royale, _Component);

  function AddScheduleGames_Clash_Royale() {
    (0, _classCallCheck3.default)(this, AddScheduleGames_Clash_Royale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddScheduleGames_Clash_Royale.__proto__ || Object.getPrototypeOf(AddScheduleGames_Clash_Royale)).call(this));

    _this.submitForm = function (e) {
      _this.state.game_name_box = _this.props.game_name_box;

      if (_this.props.game_name_box == '' || _this.props.game_name_box == null) {
        alert('Sorry mate! Game name can not be blank');
        return;
      }
      if (_this.state.startDate == null || _this.state.startDate == undefined) {
        alert('Sorry mate! Start date can not be empty');
        return;
      }

      if (_this.state.startDate.isSameOrAfter(_this.state.endDate)) {
        alert('Sorry mate! End date needs to be AFTER start date');
        return;
      }
      //Slow connections this function can get called multiple times
      if (!_this.state.just_one_time) {
        return;
      }
      _this.state.just_one_time = false;

      (0, _AddScheduleGames_Submit_Data.SubmitDataFunction)(_this.state);

      if (e === true) {
        if (_this.state.selected_visibility != null && _this.state.selected_visibility != undefined && (_this.state.selected_visibility.value == 2 || _this.state.selected_visibility.value == 4)) {
          _this.setState({ redirect_myScheduleGames: true });
        } else {
          _this.setState({ redirect_ScheduleGames: true });
        }
      } else {
        location.reload();
      }
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({ selected_experience: selected_experience });
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

    _this.handleChange_txtArea = function (e) {
      _this.setState({ txtAreaValue: e.target.value });
    };

    _this.handleChange_Clash_royale_trophy = function (clash_royale_trophy) {
      _this.setState({ clash_royale_trophy: clash_royale_trophy });
    };

    _this.state = {
      game_name_box: '',
      selected_experience: null,
      selected_expiry: null,
      selected_visibility: [{ label: 'Public', value: 1 }],
      selected_limit: [{ label: 'Unlimited', value: 42 }],
      startDate: (0, _moment2.default)(),
      endDate: null,
      description_box: '',
      other_box: '',
      tmp_expiry: '2 days',
      txtAreaValue: '',
      just_one_time: true,
      redirect_ScheduleGames: false,
      redirect_myScheduleGames: false,
      clash_royale_trophy: null
    };
    return _this;
  }

  (0, _createClass3.default)(AddScheduleGames_Clash_Royale, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_ScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { to: '/scheduledGames' });
      }
      if (this.state.redirect_myScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { to: '/myScheduledGames' });
      }
      return _react2.default.createElement(
        'div',
        { className: 'content-area addscheduleGames-page' },
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'div',
            { className: 'date-time' },
            _react2.default.createElement(
              'div',
              { className: 'date-time-label' },
              _react2.default.createElement(
                'label',
                null,
                'Start',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                ),
                ' and End date:'
              )
            ),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.startDate,
              onChange: this.handleChange_forStartdate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'start-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name
            }),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.endDate,
              onChange: this.handleChange_forEnddate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'end-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name,
              minDate: this.state.startDate,
              maxDate: (0, _moment2.default)(this.state.startDate).add(7, 'days')
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'clash_royale_trophy' },
            _react2.default.createElement(
              'div',
              { className: 'clash_royale_trophy_header' },
              _react2.default.createElement('img', {
                src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/clash_royale_logo.png',
                height: '23',
                width: '23'
              }),
              _react2.default.createElement(
                'label',
                null,
                'Trophies:'
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Clash_royale_trophy,
              options: clash_royale_trophy,
              className: 'clash-royale-trophy',
              isClearable: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'experience' },
            _react2.default.createElement(
              'label',
              null,
              'Experience:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              isMulti: true,
              placeholder: 'Select experience level/s',
              className: 'experience-box',
              onBlur: this.onBlur_experience_name,
              onFocus: this.onFocus_experience_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'label',
              null,
              'Description:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'description_box',
              className: 'description-box',
              maxLength: '254',
              placeholder: 'Any details for this game?',
              onBlur: this.onBlur_description_name,
              onFocus: this.onFocus_description_name,
              onChange: this.handleChange,
              value: this.state.post_description_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'other' },
            _react2.default.createElement(
              'label',
              null,
              'Other Info:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'other_box',
              className: 'other-box',
              maxLength: '254',
              placeholder: 'Additional comments?',
              onBlur: this.onBlur_other_name,
              onFocus: this.onFocus_other_name,
              onChange: this.handleChange,
              value: this.state.other_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'limit' },
            _react2.default.createElement(
              'label',
              null,
              'Max number of players:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Limit,
              options: limit_options,
              className: 'limit-box',
              defaultValue: [limit_options[8]],
              isClearable: false,
              onBlur: this.onBlur_limit_name,
              onFocus: this.onFocus_limit_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'visibility' },
            _react2.default.createElement(
              'label',
              null,
              'Visibility:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Visibility,
              options: visibility_options,
              className: 'visibility-box',
              defaultValue: [visibility_options[0]],
              isClearable: false,
              onBlur: this.onBlur_expiry_name,
              onFocus: this.onFocus_expiry_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'accept-msg' },
            _react2.default.createElement(
              'label',
              null,
              'Accept Message:'
            ),
            _react2.default.createElement('textarea', {
              className: 'txtarea-accept',
              rows: 8,
              cols: 80,
              placeholder: 'Msg that will be sent to players when they accept this game invite',
              value: this.state.txtAreaValue,
              onChange: this.handleChange_txtArea,
              maxLength: '254'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(
              'button',
              {
                className: 'save',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(true);
                } },
              '\xA0\xA0Create game\xA0\xA0'
            ),
            '\xA0',
            _react2.default.createElement(
              'button',
              {
                className: 'save-create',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(false);
                } },
              'Save & Create Another'
            )
          )
        )
      );
    }
  }]);
  return AddScheduleGames_Clash_Royale;
}(_react.Component);

exports.default = AddScheduleGames_Clash_Royale;

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactDatepicker = __webpack_require__(114);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(144);

var _AddScheduleGames_Submit_Data = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }, { value: 4, label: 'Hidden' }];

var limit_options = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }, { value: 25, label: '25' }, { value: 30, label: '30' }, { value: 40, label: '40' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 42, label: 'Unlimited' }];

var dota2_medal_ranks = [{ value: 'Herald', label: 'Herald' }, { value: 'Guardian', label: 'Guardian' }, { value: 'Crusader', label: 'Crusader' }, { value: 'Archon', label: 'Archon' }, { value: 'Legend', label: 'Legend' }, { value: 'Ancient', label: 'Ancient' }, { value: 'Divine', label: 'Divine' }, { value: 'Immortal', label: 'Immortal' }];

var dota2_server_regions = [{ value: 'EU West', label: 'EU West' }, { value: 'EU East', label: 'EU East' }, { value: 'EU North', label: 'EU North' }, { value: 'Poland', label: 'Poland' }, { value: 'Spain', label: 'Spain' }, { value: 'US Northwest', label: 'US Northwest' }, { value: 'US Northeast', label: 'US Northeast' }, { value: 'US Northcentral', label: 'US Northcentral' }, { value: 'US Southwest', label: 'US Southwest' }, { value: 'Australia', label: 'Australia' }, { value: 'Brazil', label: 'Brazil' }, { value: 'Chile', label: 'Chile' }, { value: 'Emirates', label: 'Emirates' }, { value: 'India', label: 'India' }, { value: 'India East', label: 'India East' }, { value: 'Peru', label: 'Peru' }, { value: 'Japan', label: 'Japan' }, { value: 'Hong Kong', label: 'Hong Kong' }, { value: 'Singapore', label: 'Singapore' }, { value: 'South Africa', label: 'South Africa' }, { value: 'China Shanghai', label: 'China Shanghai' }, { value: 'China Guangzhou', label: 'China Guangzhou' }, { value: 'China Tianjin', label: 'China Tianjin' }, { value: 'China TC Zhejiang', label: 'China TC Zhejiang' }, { value: 'China UC', label: 'China UC' }, { value: 'China UC 2', label: 'China UC 2' }, { value: 'China TC Wuhan', label: 'China TC Wuhan' }];

var dota2_roles = [{ value: 'Position 1', label: 'Position 1' }, { value: 'Position 2', label: 'Position 2' }, { value: 'Position 3', label: 'Position 3' }, { value: 'Position 4', label: 'Position 4' }, { value: 'Position 5', label: 'Position 5' }];

var AddScheduleGames_Dota2 = function (_Component) {
  (0, _inherits3.default)(AddScheduleGames_Dota2, _Component);

  function AddScheduleGames_Dota2() {
    (0, _classCallCheck3.default)(this, AddScheduleGames_Dota2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddScheduleGames_Dota2.__proto__ || Object.getPrototypeOf(AddScheduleGames_Dota2)).call(this));

    _this.submitForm = function (e) {
      _this.state.game_name_box = _this.props.game_name_box;

      if (_this.props.game_name_box == '' || _this.props.game_name_box == null) {
        alert('Sorry mate! Game name can not be blank');
        return;
      }
      if (_this.state.startDate == null || _this.state.startDate == undefined) {
        alert('Sorry mate! Start date can not be empty');
        return;
      }

      if (_this.state.startDate.isSameOrAfter(_this.state.endDate)) {
        alert('Sorry mate! End date needs to be AFTER start date');
        return;
      }
      //Slow connections this function can get called multiple times
      if (!_this.state.just_one_time) {
        return;
      }
      _this.state.just_one_time = false;

      (0, _AddScheduleGames_Submit_Data.SubmitDataFunction)(_this.state);

      if (e === true) {
        if (_this.state.selected_visibility != null && _this.state.selected_visibility != undefined && (_this.state.selected_visibility.value == 2 || _this.state.selected_visibility.value == 4)) {
          _this.setState({ redirect_myScheduleGames: true });
        } else {
          _this.setState({ redirect_ScheduleGames: true });
        }
      } else {
        location.reload();
      }
    };

    _this.handleChange_Experience = function (selected_experience) {
      _this.setState({ selected_experience: selected_experience });
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

    _this.handleChange_txtArea = function (e) {
      _this.setState({ txtAreaValue: e.target.value });
    };

    _this.handleChange_Dota2_medal_ranks = function (dota2_medal_ranks) {
      _this.setState({ dota2_medal_ranks: dota2_medal_ranks });
    };

    _this.handleChange_Dota2_server_regions = function (dota2_server_regions) {
      _this.setState({ dota2_server_regions: dota2_server_regions });
    };

    _this.handleChange_Dota2_roles = function (dota2_roles) {
      _this.setState({ dota2_roles: dota2_roles });
    };

    _this.state = {
      game_name_box: '',
      selected_experience: null,
      selected_expiry: null,
      selected_visibility: [{ label: 'Public', value: 1 }],
      selected_limit: [{ label: 'Unlimited', value: 42 }],
      startDate: (0, _moment2.default)(),
      endDate: null,
      description_box: '',
      other_box: '',
      tmp_expiry: '2 days',
      txtAreaValue: '',
      just_one_time: true,
      redirect_ScheduleGames: false,
      redirect_myScheduleGames: false,
      dota2_medal_ranks: null,
      dota2_server_regions: null,
      dota2_roles: null
    };
    return _this;
  }

  (0, _createClass3.default)(AddScheduleGames_Dota2, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_ScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { to: '/scheduledGames' });
      }
      if (this.state.redirect_myScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { to: '/myScheduledGames' });
      }
      return _react2.default.createElement(
        'div',
        { className: 'content-area addscheduleGames-page' },
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'div',
            { className: 'date-time' },
            _react2.default.createElement(
              'div',
              { className: 'date-time-label' },
              _react2.default.createElement(
                'label',
                null,
                'Start',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                ),
                ' and End date:'
              )
            ),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.startDate,
              onChange: this.handleChange_forStartdate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'start-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name
            }),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.endDate,
              onChange: this.handleChange_forEnddate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'end-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name,
              minDate: this.state.startDate,
              maxDate: (0, _moment2.default)(this.state.startDate).add(7, 'days')
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dota2_medal_ranks' },
            _react2.default.createElement(
              'div',
              { className: 'dota2_medal_ranks_header' },
              _react2.default.createElement('img', {
                src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png',
                height: '23',
                width: '23'
              }),
              _react2.default.createElement(
                'label',
                null,
                'Medal Ranks:'
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Dota2_medal_ranks,
              options: dota2_medal_ranks,
              className: 'dota2-medal-ranks',
              isClearable: true,
              isMulti: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dota2_server_regions' },
            _react2.default.createElement(
              'div',
              { className: 'dota2_server_regions_header' },
              _react2.default.createElement('img', {
                src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png',
                height: '23',
                width: '23'
              }),
              _react2.default.createElement(
                'label',
                null,
                'Server Regions:'
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Dota2_server_regions,
              options: dota2_server_regions,
              className: 'dota2-server-regions',
              isClearable: true,
              isMulti: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dota2_roles' },
            _react2.default.createElement(
              'div',
              { className: 'dota2_roles_header' },
              _react2.default.createElement('img', {
                src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png',
                height: '23',
                width: '23'
              }),
              _react2.default.createElement(
                'label',
                null,
                'Which roles do you need?'
              )
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Dota2_roles,
              options: dota2_roles,
              className: 'dota2-roles',
              isClearable: true,
              isMulti: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'experience' },
            _react2.default.createElement(
              'label',
              null,
              'Experience:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              isMulti: true,
              placeholder: 'Select experience level/s',
              className: 'experience-box',
              onBlur: this.onBlur_experience_name,
              onFocus: this.onFocus_experience_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'label',
              null,
              'Description:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'description_box',
              className: 'description-box',
              maxLength: '254',
              placeholder: 'Any details for this game?',
              onBlur: this.onBlur_description_name,
              onFocus: this.onFocus_description_name,
              onChange: this.handleChange,
              value: this.state.post_description_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'other' },
            _react2.default.createElement(
              'label',
              null,
              'Other Info:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'other_box',
              className: 'other-box',
              maxLength: '254',
              placeholder: 'Additional comments?',
              onBlur: this.onBlur_other_name,
              onFocus: this.onFocus_other_name,
              onChange: this.handleChange,
              value: this.state.other_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'limit' },
            _react2.default.createElement(
              'label',
              null,
              'Max number of players:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Limit,
              options: limit_options,
              className: 'limit-box',
              defaultValue: [limit_options[8]],
              isClearable: false,
              onBlur: this.onBlur_limit_name,
              onFocus: this.onFocus_limit_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'visibility' },
            _react2.default.createElement(
              'label',
              null,
              'Visibility:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Visibility,
              options: visibility_options,
              className: 'visibility-box',
              defaultValue: [visibility_options[0]],
              isClearable: false,
              onBlur: this.onBlur_expiry_name,
              onFocus: this.onFocus_expiry_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'accept-msg' },
            _react2.default.createElement(
              'label',
              null,
              'Accept Message:'
            ),
            _react2.default.createElement('textarea', {
              className: 'txtarea-accept',
              rows: 8,
              cols: 80,
              placeholder: 'Msg that will be sent to players when they accept this game invite',
              value: this.state.txtAreaValue,
              onChange: this.handleChange_txtArea,
              maxLength: '254'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(
              'button',
              {
                className: 'save',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(true);
                } },
              '\xA0\xA0Create game\xA0\xA0'
            ),
            '\xA0',
            _react2.default.createElement(
              'button',
              {
                className: 'save-create',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(false);
                } },
              'Save & Create Another'
            )
          )
        )
      );
    }
  }]);
  return AddScheduleGames_Dota2;
}(_react.Component);

exports.default = AddScheduleGames_Dota2;

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactDatepicker = __webpack_require__(114);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(144);

var _AddScheduleGames_Submit_Data = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region_options = [{ value: 'North America', label: 'North America' }, { value: 'Europe', label: 'Europe' }, { value: 'Asia', label: 'Asia' }, { value: 'Russia', label: 'Russia' }, { value: 'South America', label: 'South America' }, { value: 'Oceania', label: 'Oceania' }, { value: 'Middle East', label: 'Middle East' }, { value: 'Africa', label: 'Africa' }, { value: 'Central America', label: 'Central America' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var platform_options = [{ value: 'PC', label: 'PC' }, { value: 'XB', label: 'XB' }, { value: 'PS', label: 'PS' }, { value: 'Nintendo', label: 'Nintendo' }, { value: 'Mobile', label: 'Mobile' }, { value: 'Tabletop', label: 'Tabletop' }];

var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }, { value: 4, label: 'Hidden' }];
var limit_options = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }, { value: 25, label: '25' }, { value: 30, label: '30' }, { value: 40, label: '40' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 42, label: 'Unlimited' }];

var AddScheduleGames_Headers = function (_Component) {
  (0, _inherits3.default)(AddScheduleGames_Headers, _Component);

  function AddScheduleGames_Headers() {
    (0, _classCallCheck3.default)(this, AddScheduleGames_Headers);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddScheduleGames_Headers.__proto__ || Object.getPrototypeOf(AddScheduleGames_Headers)).call(this));

    _this.submitForm = function (e) {
      _this.state.game_name_box = _this.props.game_name_box;

      if (_this.props.game_name_box == '' || _this.props.game_name_box == null) {
        alert('Sorry mate! Game name can not be blank');
        return;
      }
      if (_this.state.startDate == null || _this.state.startDate == undefined) {
        alert('Sorry mate! Start date can not be empty');
        return;
      }

      if (_this.state.startDate.isSameOrAfter(_this.state.endDate)) {
        alert('Sorry mate! End date needs to be AFTER start date');
        return;
      }
      //Slow connections this function can get called multiple times
      if (!_this.state.just_one_time) {
        return;
      }
      _this.state.just_one_time = false;

      (0, _AddScheduleGames_Submit_Data.SubmitDataFunction)(_this.state);

      if (e === true) {
        if (_this.state.selected_visibility != null && _this.state.selected_visibility != undefined && (_this.state.selected_visibility.value == 2 || _this.state.selected_visibility.value == 4)) {
          _this.setState({ redirect_myScheduleGames: true });
        } else {
          _this.setState({ redirect_ScheduleGames: true });
        }
      } else {
        location.reload();
      }
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

    _this.handleChange_txtArea = function (e) {
      _this.setState({ txtAreaValue: e.target.value });
    };

    _this.state = {
      game_name_box: '',
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      selected_expiry: null,
      selected_visibility: [{ label: 'Public', value: 1 }],
      selected_limit: [{ label: 'Unlimited', value: 42 }],
      startDate: (0, _moment2.default)(),
      endDate: null,
      description_box: '',
      other_box: '',
      tmp_expiry: '2 days',
      txtAreaValue: '',
      just_one_time: true,
      redirect_ScheduleGames: false,
      redirect_myScheduleGames: false
    };
    return _this;
  }

  (0, _createClass3.default)(AddScheduleGames_Headers, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_ScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: '/scheduledGames' });
      }
      if (this.state.redirect_myScheduleGames === true) {
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: '/myScheduledGames' });
      }
      return _react2.default.createElement(
        'div',
        { className: 'content-area addscheduleGames-page' },
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'div',
            { className: 'date-time' },
            _react2.default.createElement(
              'div',
              { className: 'date-time-label' },
              _react2.default.createElement(
                'label',
                null,
                'Start',
                _react2.default.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '*'
                ),
                ' and End date:'
              )
            ),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.startDate,
              onChange: this.handleChange_forStartdate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'start-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name
            }),
            _react2.default.createElement(_reactDatepicker2.default, {
              selected: this.state.endDate,
              onChange: this.handleChange_forEnddate,
              showTimeSelect: true,
              timeFormat: 'HH:mm',
              timeIntervals: 15,
              dateFormat: 'lll',
              timeCaption: 'time',
              className: 'end-date-box',
              todayButton: 'Today',
              shouldCloseOnSelect: true,
              onBlur: this.onBlur_date_name,
              onFocus: this.onFocus_date_name,
              minDate: this.state.startDate,
              maxDate: (0, _moment2.default)(this.state.startDate).add(7, 'days')
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'region' },
            _react2.default.createElement(
              'label',
              null,
              'Region:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Region,
              options: region_options,
              isMulti: true,
              placeholder: 'Select your region/s',
              className: 'region-box',
              onBlur: this.onBlur_region_name,
              onFocus: this.onFocus_region_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'experience' },
            _react2.default.createElement(
              'label',
              null,
              'Experience:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Experience,
              options: experience_options,
              isMulti: true,
              placeholder: 'Select experience level/s',
              className: 'experience-box',
              onBlur: this.onBlur_experience_name,
              onFocus: this.onFocus_experience_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'platform' },
            _react2.default.createElement(
              'label',
              null,
              'Platform:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Platform,
              options: platform_options,
              isMulti: true,
              placeholder: 'Select which platform/s',
              className: 'platform-box',
              onBlur: this.onBlur_platform_name,
              onFocus: this.onFocus_platform_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'label',
              null,
              'Description:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'description_box',
              className: 'description-box',
              maxLength: '254',
              placeholder: 'Any details for this game?',
              onBlur: this.onBlur_description_name,
              onFocus: this.onFocus_description_name,
              onChange: this.handleChange,
              value: this.state.post_description_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'other' },
            _react2.default.createElement(
              'label',
              null,
              'Other Info:'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              id: 'other_box',
              className: 'other-box',
              maxLength: '254',
              placeholder: 'Additional comments?',
              onBlur: this.onBlur_other_name,
              onFocus: this.onFocus_other_name,
              onChange: this.handleChange,
              value: this.state.other_box
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'limit' },
            _react2.default.createElement(
              'label',
              null,
              'Max number of players:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Limit,
              options: limit_options,
              className: 'limit-box',
              defaultValue: [limit_options[8]],
              isClearable: false,
              onBlur: this.onBlur_limit_name,
              onFocus: this.onFocus_limit_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'visibility' },
            _react2.default.createElement(
              'label',
              null,
              'Visibility:'
            ),
            _react2.default.createElement(_reactSelect2.default, {
              onChange: this.handleChange_Visibility,
              options: visibility_options,
              className: 'visibility-box',
              defaultValue: [visibility_options[0]],
              isClearable: false,
              onBlur: this.onBlur_expiry_name,
              onFocus: this.onFocus_expiry_name
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'accept-msg' },
            _react2.default.createElement(
              'label',
              null,
              'Accept Message:'
            ),
            _react2.default.createElement('textarea', {
              className: 'txtarea-accept',
              rows: 8,
              cols: 80,
              placeholder: 'Msg that will be sent to players when they accept this game invite',
              value: this.state.txtAreaValue,
              onChange: this.handleChange_txtArea,
              maxLength: '254'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(
              'button',
              {
                className: 'save',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(true);
                } },
              '\xA0\xA0Create game\xA0\xA0'
            ),
            '\xA0',
            _react2.default.createElement(
              'button',
              {
                className: 'save-create',
                type: 'button',
                onClick: function onClick() {
                  return _this2.submitForm(false);
                } },
              'Save & Create Another'
            )
          )
        )
      );
    }
  }]);
  return AddScheduleGames_Headers;
}(_react.Component);

exports.default = AddScheduleGames_Headers;

/***/ }),

/***/ 445:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

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
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 1:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 2:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
          case 3:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
            break;
          case 4:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
            );
            break;
          case 5:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' }),
              _react2.default.createElement('i', { className: 'fas fa-star' })
            );
            break;
          default:
            return _react2.default.createElement(
              'div',
              { className: 'stars' },
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' }),
              _react2.default.createElement('i', { className: 'far fa-star' })
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
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green' },
                  tag
                ),
                '\xA0'
              );
              break;
            case 1:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-blue' },
                  tag
                ),
                '\xA0'
              );
              break;
            case 2:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-red' },
                  tag
                ),
                '\xA0'
              );
              break;
            case 3:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-yellow' },
                  tag
                ),
                '\xA0'
              );
              break;
            default:
              return _react2.default.createElement(
                'div',
                { className: 'tag', key: index },
                _react2.default.createElement(
                  'button',
                  { className: 'btn-green' },
                  tag
                ),
                '\xA0'
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
    key: 'render',
    value: function render() {
      var game_experience = this.props.game_experience;

      var show_profile_img = false;
      var arrTags = '';

      if (this.props.table) {
        var experience = false;
        var status = false;
        var ratings = false;
        var tags = false;
        var commendation = false;
        var played_converted = 'Less than 1 year';

        if (game_experience.played != '' && game_experience.played != null) {
          switch (game_experience.played) {
            case 1:
              played_converted = 'Less than 1 year';
              break;
            case 2:
              played_converted = 'Less than 2 years';
              break;
            case 3:
              played_converted = 'Less than 3 years';
              break;
            case 4:
              played_converted = 'Less than 4 years';
              break;
            case 5:
              played_converted = 'Less than 5 years';
              break;
            case 42:
              played_converted = 'More than 5 years';
              break;
            default:
              played_converted = 'Less than 1 year';
          }
        }
        if (game_experience.experience == '' || game_experience.experience == null) {
          game_experience.experience = '';
        }
        if (game_experience.status != '' && game_experience.status != null) {
          status = true;
        }
        if (game_experience.ratings != '' && game_experience.ratings != null) {
          ratings = true;
        }
        if (game_experience.commendation != '' && game_experience.commendation != null) {
          commendation = true;
        }
        if (game_experience.tags != '' && game_experience.tags != null) {
          tags = true;
          arrTags = game_experience.tags.split(',');
        }
      } else {
        var show_team_name = false;
        var show_tags = false;
        var duration_converted = 'Less than 3 months';

        if (game_experience.team_name != null && game_experience.team_name != '') {
          show_team_name = true;
        }

        if (game_experience.skills != null && game_experience.skills != '') {
          arrTags = game_experience.skills.split(',');
          show_tags = true;
        }

        switch (game_experience.duration) {
          case 1:
            duration_converted = 'Less than 3 months';
            break;
          case 2:
            duration_converted = 'Less than 6 months';
            break;
          case 3:
            duration_converted = 'Less than 1 year';
            break;
          case 4:
            duration_converted = 'Less than 2 years';
            break;
          case 5:
            duration_converted = 'Less than 3 years';
            break;
          case 42:
            duration_converted = '3+ years';
            break;
          default:
            duration_converted = 'Less than 3 months';
        }
      }

      if (game_experience.profile_img != null) {
        show_profile_img = true;
      }

      return _react2.default.createElement(
        'div',
        { className: 'gamesPosts' },
        _react2.default.createElement(
          'div',
          { className: 'padding-container' },
          _react2.default.createElement(
            'div',
            { className: 'grey-container' },
            this.props.table && _react2.default.createElement(
              'div',
              { className: 'update-info' },
              _react2.default.createElement(
                'div',
                { className: 'author-info' },
                show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + game_experience.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + game_experience.profile_img + '\')'
                  } }),
                !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + game_experience.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png\')'
                  } }),
                _react2.default.createElement(
                  'div',
                  { className: 'info' },
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/' + game_experience.user_id },
                    game_experience.alias
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'game-name' },
                ' ',
                game_experience.game_name,
                ' '
              ),
              ratings && _react2.default.createElement(
                'div',
                { className: 'game-rating' },
                ' ',
                this.showRating(game_experience.ratings),
                ' '
              ),
              status && _react2.default.createElement(
                'div',
                { className: 'game-status' },
                ' ',
                _react2.default.createElement('i', { className: 'fab fa-d-and-d' }),
                '\xA0',
                game_experience.status,
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'game-stuff' },
                ' ',
                _react2.default.createElement('i', { className: 'fas fa-gamepad' }),
                '\xA0',
                '' + played_converted,
                ', ',
                '' + game_experience.experience,
                ' '
              ),
              commendation && _react2.default.createElement(
                'div',
                { className: 'game-commendation' },
                ' ',
                _react2.default.createElement('i', { className: 'fas fa-dragon' }),
                '\xA0',
                '' + game_experience.commendation,
                '\xA0',
                ' '
              ),
              tags && _react2.default.createElement(
                'div',
                { className: 'tags' },
                ' ',
                this.showAllTags(arrTags),
                ' '
              )
            ),
            !this.props.table && _react2.default.createElement(
              'div',
              { className: 'update-info' },
              _react2.default.createElement(
                'div',
                { className: 'author-info' },
                show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + game_experience.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + game_experience.profile_img + '\')'
                  } }),
                !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + game_experience.user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png\')'
                  } }),
                _react2.default.createElement(
                  'div',
                  { className: 'info' },
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/' + game_experience.user_id },
                    game_experience.alias
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'game-name' },
                ' ',
                game_experience.game_name,
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'role-title' },
                ' ',
                _react2.default.createElement('i', { className: 'fas fa-angle-double-down' }),
                '\xA0 ',
                game_experience.role_title
              ),
              show_team_name && _react2.default.createElement(
                'div',
                { className: 'team-name' },
                _react2.default.createElement('i', { className: 'fas fa-users' }),
                '\xA0 ',
                game_experience.team_name
              ),
              _react2.default.createElement(
                'div',
                { className: 'game-stuff' },
                _react2.default.createElement('i', { className: 'fas fa-gamepad' }),
                '\xA0 ',
                '' + duration_converted
              ),
              show_tags && _react2.default.createElement(
                'div',
                { className: 'tags' },
                ' ',
                this.showAllTags(arrTags),
                ' '
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

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _IndividualComment = __webpack_require__(48);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOption = function createOption(label, value) {
  return {
    label: label,
    value: value
  };
};

var ArchivedScheduledGamePost = function (_Component) {
  (0, _inherits3.default)(ArchivedScheduledGamePost, _Component);

  function ArchivedScheduledGamePost() {
    (0, _classCallCheck3.default)(this, ArchivedScheduledGamePost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArchivedScheduledGamePost.__proto__ || Object.getPrototypeOf(ArchivedScheduledGamePost)).call(this));

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
                  return _axios2.default.get('/api/archive_comments/scheduled_games/' + schedule_game.archive_schedule_game_id);

                case 3:
                  myComments = _context.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: '',
                    comment_total: myComments.data.allComments.length
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
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
          return _react2.default.createElement(_IndividualComment2.default, {
            comment: item,
            key: index,
            user: _this.props.user
          });
        });
      }
    };

    _this.onChange = function () {
      var tmpState = _this.state.show_more_comments;

      if (!_this.state.show_more_comments) {
        _this.pullComments();
      }
      _this.setState({
        show_more_comments: !_this.state.show_more_comments
      });
    };

    _this.redirect_link = function () {
      _this.setState({ redirect_: true });
    };

    _this.state = {
      show_more_comments: false,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      show_attendees: false,
      attendees_count: 0,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
      show_dota_2_position: false,
      dota_2_position: 'Pos: ',
      show_dota_2_pos_one: false,
      show_dota_2_pos_two: false,
      show_dota_2_pos_three: false,
      show_dota_2_pos_four: false,
      show_dota_2_pos_five: false,
      dota_2_pos_one_count: 0,
      dota_2_pos_two_count: 0,
      dota_2_pos_three_count: 0,
      dota_2_pos_four_count: 0,
      dota_2_pos_five_count: 0,
      clash_royale_field: false,
      redirect_: false
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

  (0, _createClass3.default)(ArchivedScheduledGamePost, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var schedule_game = this.props.schedule_game;


      var getCommentsCount = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var myCommentsCount;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/archive_comments/scheduled_gamesCount/' + schedule_game.archive_schedule_game_id);

                case 3:
                  myCommentsCount = _context2.sent;

                  if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
                    self.setState({
                      zero_comments: true,
                      comment_total: myCommentsCount.data.no_of_comments[0].no_of_comments
                    });
                  }
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getCommentsCount() {
          return _ref2.apply(this, arguments);
        };
      }();

      var checkWhosPost = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _checkWhosPost;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.get('/api/ArchivemyScheduledGamesCount/' + schedule_game.id);

                case 3:
                  _checkWhosPost = _context3.sent;

                  if (_checkWhosPost.data.myScheduledGamesCount[0].no_of_my_posts != 0) {
                    self.setState({
                      myPost: true
                    });
                  }
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 7]]);
        }));

        return function checkWhosPost() {
          return _ref3.apply(this, arguments);
        };
      }();

      var getNumberofAttendees = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var _getNumberofAttendees, getwhoisAttending, i, _getwhoisAttending;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;

                  if (!(schedule_game.limit != 42)) {
                    _context4.next = 34;
                    break;
                  }

                  self.state.show_attendees = true;
                  _context4.next = 5;
                  return _axios2.default.get('/api/archive_attendees/attending/' + schedule_game.archive_schedule_game_id);

                case 5:
                  _getNumberofAttendees = _context4.sent;

                  if (!(_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0)) {
                    _context4.next = 32;
                    break;
                  }

                  self.state.attendees_count = _getNumberofAttendees.data.allAttendees[0].no_of_allAttendees;

                  _context4.next = 10;
                  return _axios2.default.get('/api/archive_attendees/role_call/' + schedule_game.archive_schedule_game_id);

                case 10:
                  getwhoisAttending = _context4.sent;
                  i = 0;

                case 12:
                  if (!(i < getwhoisAttending.data.role_call.length)) {
                    _context4.next = 32;
                    break;
                  }

                  self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i]);
                  _context4.t0 = i;
                  _context4.next = _context4.t0 === 0 ? 17 : _context4.t0 === 1 ? 19 : _context4.t0 === 2 ? 21 : _context4.t0 === 3 ? 23 : _context4.t0 === 4 ? 25 : _context4.t0 === 5 ? 27 : 29;
                  break;

                case 17:
                  self.setState({ show_one_profile: true });
                  return _context4.abrupt('break', 29);

                case 19:
                  self.setState({ show_two_profile: true });
                  return _context4.abrupt('break', 29);

                case 21:
                  self.setState({ show_three_profile: true });
                  return _context4.abrupt('break', 29);

                case 23:
                  self.setState({ show_four_profile: true });
                  return _context4.abrupt('break', 29);

                case 25:
                  self.setState({ show_five_profile: true });
                  return _context4.abrupt('break', 29);

                case 27:
                  self.setState({ show_more_profile: true });
                  return _context4.abrupt('break', 29);

                case 29:
                  i++;
                  _context4.next = 12;
                  break;

                case 32:
                  _context4.next = 64;
                  break;

                case 34:
                  _context4.prev = 34;
                  _context4.next = 37;
                  return _axios2.default.get('/api/archive_attendees/role_call/' + schedule_game.archive_schedule_game_id);

                case 37:
                  _getwhoisAttending = _context4.sent;
                  i = 0;

                case 39:
                  if (!(i < _getwhoisAttending.data.role_call.length)) {
                    _context4.next = 59;
                    break;
                  }

                  self.state.attendees_profiles.push(_getwhoisAttending.data.role_call[i]);
                  _context4.t1 = i;
                  _context4.next = _context4.t1 === 0 ? 44 : _context4.t1 === 1 ? 46 : _context4.t1 === 2 ? 48 : _context4.t1 === 3 ? 50 : _context4.t1 === 4 ? 52 : _context4.t1 === 5 ? 54 : 56;
                  break;

                case 44:
                  self.setState({ show_one_profile: true });
                  return _context4.abrupt('break', 56);

                case 46:
                  self.setState({ show_two_profile: true });
                  return _context4.abrupt('break', 56);

                case 48:
                  self.setState({ show_three_profile: true });
                  return _context4.abrupt('break', 56);

                case 50:
                  self.setState({ show_four_profile: true });
                  return _context4.abrupt('break', 56);

                case 52:
                  self.setState({ show_five_profile: true });
                  return _context4.abrupt('break', 56);

                case 54:
                  self.setState({ show_more_profile: true });
                  return _context4.abrupt('break', 56);

                case 56:
                  i++;
                  _context4.next = 39;
                  break;

                case 59:
                  _context4.next = 64;
                  break;

                case 61:
                  _context4.prev = 61;
                  _context4.t2 = _context4['catch'](34);

                  console.log(_context4.t2);

                case 64:
                  _context4.next = 69;
                  break;

                case 66:
                  _context4.prev = 66;
                  _context4.t3 = _context4['catch'](0);

                  console.log(_context4.t3);

                case 69:
                  self.forceUpdate();

                case 70:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 66], [34, 61]]);
        }));

        return function getNumberofAttendees() {
          return _ref4.apply(this, arguments);
        };
      }();

      getCommentsCount();
      checkWhosPost();
      getNumberofAttendees();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.redirect_) {
        var tmp = '/archive_playerList/' + this.props.schedule_game.archive_schedule_game_id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      var schedule_game = this.props.schedule_game;

      var region = false;
      var experience = false;
      var platform = false;
      var description = false;
      var other = false;
      var visibility = 'Public';
      var dota2_medal_ranks = false;
      var dota2_server_regions = false;
      var dota2_roles = false;

      if (schedule_game.region != '' && schedule_game.region != null) {
        region = true;
      }
      if (schedule_game.experience != '' && schedule_game.experience != null) {
        experience = true;
      }
      if (schedule_game.platform != '' && schedule_game.platform != null) {
        platform = true;
      }
      if (schedule_game.description != '' && schedule_game.description != null) {
        description = true;
      }
      if (schedule_game.other != '' && schedule_game.other != null) {
        other = true;
      }

      if (schedule_game.dota2_medal_ranks != '' && schedule_game.dota2_medal_ranks != null) {
        dota2_medal_ranks = true;
      }
      if (schedule_game.dota2_server_regions != '' && schedule_game.dota2_server_regions != null) {
        dota2_server_regions = true;
      }
      if (schedule_game.dota2_roles != '' && schedule_game.dota2_roles != null) {
        dota2_roles = true;
      }

      switch (schedule_game.visibility) {
        case 1:
          visibility = 'Public';
          break;
        case 2:
          visibility = 'Friends';
          break;
        case 3:
          visibility = 'Group';
          break;
        case 4:
          visibility = 'Hidden';
          break;
      }

      var myExpiry = (0, _moment2.default)(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ');
      var now = (0, _moment2.default)();

      if (now.isAfter(myExpiry)) {
        var duration = 'expired!';
      } else {
        var duration = _moment2.default.duration(myExpiry.diff(now)).humanize();
      }

      var myStartDateTime = (0, _moment2.default)(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
      var myEndDateTime = (0, _moment2.default)(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();

      return _react2.default.createElement(
        'div',
        { className: 'gamesPosts' },
        _react2.default.createElement(
          'div',
          { className: 'padding-container' },
          _react2.default.createElement(
            'div',
            { className: 'grey-container' },
            _react2.default.createElement(
              'div',
              { className: 'update-info' },
              _react2.default.createElement(
                'div',
                { className: 'game-name-display' },
                _react2.default.createElement(
                  'h3',
                  null,
                  ' ',
                  schedule_game.game_name,
                  ' '
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'comments-stats' },
                  this.state.zero_comments && _react2.default.createElement(
                    'div',
                    { className: 'comments-statz', onClick: this.onChange },
                    ' ',
                    this.state.comment_total > 1 ? this.state.comment_total + ' comments' : this.state.comment_total + ' comment',
                    ' '
                  ),
                  !this.state.zero_comments && _react2.default.createElement(
                    'div',
                    {
                      className: 'comments-statz',
                      onClick: this.focusTextInput },
                    ' ',
                    'No comments'
                  )
                ),
                !this.state.myPost && _react2.default.createElement(
                  'h6',
                  null,
                  ' ',
                  _react2.default.createElement(
                    _reactRouterDom.Link,
                    {
                      to: '/profile/' + schedule_game.user_id,
                      style: { textDecoration: 'none', color: 'white' } },
                    ' ',
                    'Posted by ',
                    schedule_game.alias
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'expiry-info' },
                'Expiry:\xA0',
                duration
              ),
              _react2.default.createElement(
                'div',
                { className: 'myFields' },
                region && _react2.default.createElement(
                  'div',
                  null,
                  ' Region/s: ',
                  schedule_game.region,
                  ' '
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  ' ',
                  'Start Time: ',
                  myStartDateTime.format('Do MMM YY, h:mm a'),
                  ' '
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  ' ',
                  'End Time: ',
                  myEndDateTime.format('Do MMM YY, h:mm a'),
                  ' '
                ),
                experience && _react2.default.createElement(
                  'div',
                  null,
                  ' Experience: ',
                  schedule_game.experience,
                  ' '
                ),
                platform && _react2.default.createElement(
                  'div',
                  null,
                  ' Platform: ',
                  schedule_game.platform,
                  ' '
                ),
                other && _react2.default.createElement(
                  'div',
                  null,
                  ' Other: ',
                  schedule_game.other,
                  ' '
                ),
                dota2_medal_ranks && _react2.default.createElement(
                  'div',
                  null,
                  'Medal Ranks: ',
                  schedule_game.dota2_medal_ranks,
                  ' '
                ),
                dota2_server_regions && _react2.default.createElement(
                  'div',
                  null,
                  'Server Regions: ',
                  schedule_game.dota2_server_regions,
                  ' '
                ),
                dota2_roles && _react2.default.createElement(
                  'div',
                  null,
                  'Roles: ',
                  schedule_game.dota2_roles,
                  ' '
                ),
                this.state.clash_royale_field && _react2.default.createElement(
                  'div',
                  null,
                  ' ',
                  'Royale Trophies: ',
                  schedule_game.clash_royale_trophies,
                  ' '
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  ' Visibility: ',
                  visibility,
                  ' '
                ),
                description && _react2.default.createElement(
                  'div',
                  null,
                  ' Description: ',
                  schedule_game.description,
                  ' '
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Reason for Cancelling: ',
                  schedule_game.reason_for_cancel,
                  ' '
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'invitation-panel' },
              this.state.show_dota_2_position && _react2.default.createElement(
                'div',
                { className: 'dota2-roles-answers' },
                this.state.dota_2_position,
                this.state.show_dota_2_pos_one && _react2.default.createElement(
                  'div',
                  { className: 'dota_2_position_one_text' },
                  ' ',
                  '1',
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'noti-number ' + (this.state.dota_2_pos_one_count > 0 ? 'active' : '') },
                    ' ',
                    this.state.dota_2_pos_one_count
                  ),
                  ' '
                ),
                this.state.show_dota_2_pos_one && this.state.show_dota_2_pos_two && _react2.default.createElement(
                  'div',
                  { className: 'dot-sep' },
                  ','
                ),
                this.state.show_dota_2_pos_two && _react2.default.createElement(
                  'div',
                  { className: 'dota_2_position_two_text' },
                  ' ',
                  '2',
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'noti-number ' + (this.state.dota_2_pos_two_count > 0 ? 'active' : '') },
                    ' ',
                    this.state.dota_2_pos_two_count
                  )
                ),
                (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two) && this.state.show_dota_2_pos_three && _react2.default.createElement(
                  'div',
                  { className: 'dot-sep' },
                  ','
                ),
                this.state.show_dota_2_pos_three && _react2.default.createElement(
                  'div',
                  { className: 'dota_2_position_three_text' },
                  ' ',
                  '3',
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'noti-number ' + (this.state.dota_2_pos_three_count > 0 ? 'active' : '') },
                    ' ',
                    this.state.dota_2_pos_three_count
                  ),
                  ' '
                ),
                (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three) && this.state.show_dota_2_pos_four && _react2.default.createElement(
                  'div',
                  { className: 'dot-sep' },
                  ','
                ),
                this.state.show_dota_2_pos_four && _react2.default.createElement(
                  'div',
                  { className: 'dota_2_position_four_text' },
                  ' ',
                  '4',
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'noti-number ' + (this.state.dota_2_pos_four_count > 0 ? 'active' : '') },
                    ' ',
                    this.state.dota_2_pos_four_count
                  ),
                  ' '
                ),
                (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three || this.state.show_dota_2_pos_four) && this.state.show_dota_2_pos_five && _react2.default.createElement(
                  'div',
                  { className: 'dot-sep' },
                  ','
                ),
                this.state.show_dota_2_pos_five && _react2.default.createElement(
                  'div',
                  { className: 'dota_2_position_five_text' },
                  ' ',
                  '5',
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'noti-number ' + (this.state.dota_2_pos_five_count > 0 ? 'active' : '') },
                    ' ',
                    this.state.dota_2_pos_five_count
                  )
                )
              ),
              this.state.show_one_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-one' },
                _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + this.state.attendees_profiles[0].user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + this.state.attendees_profiles[0].profile_img + '\')'
                  } })
              ),
              this.state.show_two_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-two' },
                _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + this.state.attendees_profiles[1].user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + this.state.attendees_profiles[1].profile_img + '\')'
                  } })
              ),
              this.state.show_three_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-three' },
                _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + this.state.attendees_profiles[2].user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + this.state.attendees_profiles[2].profile_img + '\')'
                  } })
              ),
              this.state.show_four_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-four' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    to: '/profile/' + this.state.attendees_profiles[3].user_id,
                    className: 'user-img',
                    style: {
                      backgroundImage: 'url(\'' + this.state.attendees_profiles[3].profile_img + '\')'
                    } },
                  '>'
                )
              ),
              this.state.show_five_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-five' },
                _react2.default.createElement(_reactRouterDom.Link, {
                  to: '/profile/' + this.state.attendees_profiles[4].user_id,
                  className: 'user-img',
                  style: {
                    backgroundImage: 'url(\'' + this.state.attendees_profiles[4].profile_img + '\')'
                  } })
              ),
              this.state.show_more_profile && _react2.default.createElement(
                'div',
                { className: 'attendees-more' },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'user-img',
                    onClick: this.redirect_link,
                    style: {
                      backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png\')'
                    } },
                  ' '
                )
              ),
              this.state.show_attendees && _react2.default.createElement(
                'div',
                { className: 'attendees-count' },
                this.state.attendees_count,
                ' out of ',
                schedule_game.limit
              ),
              !this.state.show_attendees && _react2.default.createElement(
                'div',
                { className: 'attendees-count' },
                'Unlimited'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'compose-comment' },
              _react2.default.createElement('textarea', {
                name: 'name',
                rows: 8,
                cols: 80,
                placeholder: 'No more comments, this game is cancelled.',
                value: this.state.value,
                disabled: true
              }),
              _react2.default.createElement(
                'div',
                { className: 'buttons' },
                _react2.default.createElement(
                  'div',
                  { className: 'repost-btn' },
                  _react2.default.createElement('i', { className: 'fas fa-reply' }),
                  ' '
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'comments' },
              this.state.show_more_comments && _react2.default.createElement(
                'div',
                { className: 'show-individual-comments' },
                this.showComment()
              )
            )
          )
        )
      );
    }
  }]);
  return ArchivedScheduledGamePost;
}(_react.Component);

exports.default = ArchivedScheduledGamePost;

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _FileOpenModal = __webpack_require__(164);

var _FileOpenModal2 = _interopRequireDefault(_FileOpenModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupHeader = function (_Component) {
  (0, _inherits3.default)(GroupHeader, _Component);

  function GroupHeader() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, GroupHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupHeader.__proto__ || Object.getPrototypeOf(GroupHeader)).call(this));

    _this.show_approvals_screen = function () {
      _this.setState({ redirect_: true });
    };

    _this.change_type = function () {
      switch (_this.state.group_info.type) {
        case 1:
          _this.state.group_info.type = 2;
          break;
        case 2:
          _this.state.group_info.type = 3;
          break;
        case 3:
          _this.state.group_info.type = 1;
          break;
      }
      try {
        var update_group_type = _axios2.default.get("/api/groups/update_type/" + _this.props.groups_id.params.id + "/" + _this.state.group_info.type);
      } catch (error) {
        console.log(error);
      }
      _this.forceUpdate();
    };

    _this.statusToggle = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var deleteRegistration, killInvite, sendInvite, owner_invitation, group_invitation, _group_invitation, _deleteRegistration, _killInvite;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.state.status == 2)) {
                _context.next = 3;
                break;
              }

              alert("Sorry, The captain goes down with the ship, you can't leave");
              return _context.abrupt("return");

            case 3:
              if (_this.state.statusTxt == "Joined") {
                if (window.confirm('Are you sure you wish to remove yourself from this group?')) {
                  try {
                    deleteRegistration = _axios2.default.get("/api/usergroup/delete/" + _this.props.groups_id.params.id);
                    killInvite = _axios2.default.get("/api/notifications/delete_group/" + _this.props.groups_id.params.id);
                  } catch (error) {
                    console.log(error);
                  }
                  _this.setState({
                    statusTxt: "Join",
                    show_approvals: false
                  });
                }
              } else if (_this.state.statusTxt == "Join") {
                try {
                  sendInvite = _axios2.default.post('/api/usergroup/create', {
                    group_id: _this.props.groups_id.params.id
                  });
                  owner_invitation = _axios2.default.post('/api/notifications/addGroup', {
                    other_user_id: _this.state.group_info.user_id,
                    group_id: _this.props.groups_id.params.id
                  });

                  if (_this.state.group_info.all_accept) {
                    group_invitation = _axios2.default.post('/api/notifications/add_all_to_Group', {
                      group_id: _this.props.groups_id.params.id
                    });
                  } else {
                    _group_invitation = _axios2.default.post('/api/notifications/add_vip_to_Group', {
                      group_id: _this.props.groups_id.params.id
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
                _this.setState({
                  statusTxt: "Pending Approval"
                });
              } else if (_this.state.statusTxt == "Pending Approval") {
                if (window.confirm('Are you sure you wish to remove yourself from this group?')) {
                  try {
                    _deleteRegistration = _axios2.default.get("/api/usergroup/delete/" + _this.props.groups_id.params.id);
                    _killInvite = _axios2.default.get("/api/notifications/delete_group/" + _this.props.groups_id.params.id);
                  } catch (error) {
                    console.log(error);
                  }
                  _this.setState({
                    statusTxt: "Join"
                  });
                }
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.state = {
      myPage: false,
      status: 0, //0: Not a member of this group, 1: Admin of group, 2: Owner, 3: User, 42:Pending approval
      bFileModalOpen: false,
      statusTxt: 'Join',
      show_approvals: false,
      redirect_: false
    };

    _this.callbackFileModalClose = _this.callbackFileModalClose.bind(_this);
    _this.callbackFileModalConfirm = _this.callbackFileModalConfirm.bind(_this);

    return _this;
  }

  (0, _createClass3.default)(GroupHeader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;

      var getGroupHeader = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _getGroupHeader, getGroupPermissions;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get("/api/groups/" + self.props.groups_id.params.id);

                case 3:
                  _getGroupHeader = _context2.sent;

                  if (!(_getGroupHeader.data.group[0].user_id != self.props.initialData.userInfo.id)) {
                    _context2.next = 11;
                    break;
                  }

                  _context2.next = 7;
                  return _axios2.default.get("/api/usergroup/mygroup_details/" + self.props.groups_id.params.id);

                case 7:
                  getGroupPermissions = _context2.sent;

                  if (getGroupPermissions.data.mygroup_details.length > 0) {
                    if (getGroupPermissions.data.mygroup_details[0].permission_level == "1" || getGroupPermissions.data.mygroup_details[0].permission_level == "2") {
                      self.state.myPage = true;
                      self.state.status = 1;
                      self.state.statusTxt = "Joined";
                      self.state.show_approvals = true;
                    } else if (getGroupPermissions.data.mygroup_details[0].permission_level == "42") {
                      self.state.statusTxt = "Pending Approval";
                      self.state.status = 42;
                    } else {
                      self.state.statusTxt = "Joined";
                      self.state.status = 3;
                    }
                  } else {
                    self.state.status = 0;
                    self.state.statusTxt = "Join";
                  }
                  _context2.next = 15;
                  break;

                case 11:
                  self.state.myPage = true;
                  self.state.status = 2;
                  self.state.statusTxt = "Joined";
                  self.state.show_approvals = true;

                case 15:

                  if (self.state.status == 3) {
                    if (_getGroupHeader.data.group[0].all_accept) {
                      self.state.show_approvals = true;
                    }
                  }

                  self.setState({
                    group_info: _getGroupHeader.data.group[0]
                  });

                  _context2.next = 22;
                  break;

                case 19:
                  _context2.prev = 19;
                  _context2.t0 = _context2["catch"](0);

                  console.log(_context2.t0);

                case 22:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 19]]);
        }));

        return function getGroupHeader() {
          return _ref2.apply(this, arguments);
        };
      }();

      if (this.props.initialData.userInfo != undefined) {
        getGroupHeader();
      }
    }
  }, {
    key: "uploadGroup_img",
    value: function uploadGroup_img() {
      this.setState({
        bFileModalOpen: true
      });
    }
  }, {
    key: "callbackFileModalClose",
    value: function callbackFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: "callbackFileModalConfirm",
    value: function callbackFileModalConfirm(src) {
      this.state.group_info.group_img = src;

      this.setState({
        bFileModalOpen: false
      });

      try {
        var update_img = _axios2.default.post('/api/groups/update_img', {
          group_id: this.props.groups_id.params.id,
          group_img: src
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.redirect_) {
        var tmp = "/myApprovals/" + this.props.groups_id.params.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      if (this.state.group_info !== undefined) {
        var str_group_type = "";
        switch (this.state.group_info.type) {
          case 1:
            str_group_type = "Public";
            break;
          case 2:
            str_group_type = "Closed";
            break;
          case 3:
            str_group_type = "Secret";
            break;
        }
        return _react2.default.createElement(
          "div",
          { className: "header-area" },
          _react2.default.createElement(_FileOpenModal2.default, {
            bOpen: this.state.bFileModalOpen,
            callbackClose: this.callbackFileModalClose,
            callbackConfirm: this.callbackFileModalConfirm
          }),
          _react2.default.createElement(
            "div",
            { className: "top-container" },
            _react2.default.createElement(
              "div",
              { className: "userbackground-img", style: {
                  backgroundImage: "url('" + this.state.group_info.group_img + "')"
                } },
              this.state.myPage && _react2.default.createElement(
                "div",
                { className: "header-background-uploader", onClick: function onClick() {
                    return _this3.uploadGroup_img();
                  } },
                "Update"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "group-controller-container" },
              _react2.default.createElement(
                "div",
                { className: "group-status" },
                _react2.default.createElement(
                  "button",
                  { className: "status", onClick: this.statusToggle },
                  this.state.statusTxt
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "member-list" },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: "/groups/" + this.props.groups_id.params.id + "/members" },
                  _react2.default.createElement(
                    "button",
                    { type: "button", className: "members" },
                    "Members"
                  )
                )
              ),
              this.state.show_approvals && _react2.default.createElement(
                "div",
                { className: "group-approvals" },
                _react2.default.createElement(
                  "button",
                  { className: "approvals", onClick: this.show_approvals_screen },
                  "Pending Approvals"
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "group-type" },
                this.state.myPage === true ? _react2.default.createElement(
                  "button",
                  { type: "button", onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to change this group type?')) _this3.change_type();
                    }, className: "type" },
                  str_group_type
                ) : str_group_type
              ),
              _react2.default.createElement(
                "div",
                { className: "group-name" },
                this.state.group_info.name
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: "header-area" },
          "Loading"
        );
      }
    }
  }]);
  return GroupHeader;
}(_react.Component);

exports.default = GroupHeader;

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactRouterDom = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilePreview = function (_Component) {
  (0, _inherits3.default)(FilePreview, _Component);

  function FilePreview(props) {
    (0, _classCallCheck3.default)(this, FilePreview);
    return (0, _possibleConstructorReturn3.default)(this, (FilePreview.__proto__ || Object.getPrototypeOf(FilePreview)).call(this, props));
  }

  (0, _createClass3.default)(FilePreview, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'file-preview-wrap', onClick: function onClick() {
            return _this2.props.callbackClick(_this2.props.src);
          } },
        _react2.default.createElement('img', { src: this.props.src })
      );
    }
  }]);
  return FilePreview;
}(_react.Component);

var privacy_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Closed' }, { value: 3, label: 'Secret' }];

var GroupOpenModal = function (_Component2) {
  (0, _inherits3.default)(GroupOpenModal, _Component2);

  function GroupOpenModal() {
    var _this4 = this;

    (0, _classCallCheck3.default)(this, GroupOpenModal);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (GroupOpenModal.__proto__ || Object.getPrototypeOf(GroupOpenModal)).call(this));

    _this3.onBlur_group_name = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var getgroup_name;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this3.state.group_name_box.trim() == '' || _this3.state.group_name_box == null)) {
                _context.next = 3;
                break;
              }

              _this3.setState({
                show_group_name_unique_error: false
              });
              return _context.abrupt('return');

            case 3:
              _context.next = 5;
              return _axios2.default.get('/api/groups/groupName/' + _this3.state.group_name_box.trim());

            case 5:
              getgroup_name = _context.sent;

              if (getgroup_name.data.getOne[0].no_of_names == 0) {
                _this3.state.is_unique = true;
                _this3.setState({
                  show_group_name_unique_error: false,
                  show_group_name_error: false
                });
              } else {
                _this3.setState({
                  show_group_name_unique_error: true,
                  is_unique: false,
                  show_group_name_error: false
                });
              }

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this4);
    }));

    _this3.handleChange_Privacy = function (privacy_box) {
      _this3.setState({ privacy_box: privacy_box });
    };

    _this3.toggleChange_all_accept = function () {
      _this3.setState({
        all_accept_chkbox: !_this3.state.all_accept_chkbox
      });
    };

    _this3.handleChange = function (e) {
      _this3.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
    };

    _this3.state = {
      file: null,
      file_preview: '',
      preview_files: ['https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556592223564-lg.jpg', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556630834362-lg.png'],
      uploading: false,
      file_src: '',
      file_key: '',
      group_name_box: '',
      privacy_box: '',
      all_accept_chkbox: true,
      show_group_name_error: false,
      show_group_name_unique_error: false,
      is_unique: false,
      redirect_groups: false,
      groups_id: ''
    };

    _this3.closeModal = _this3.closeModal.bind(_this3);
    _this3.doUploadS3 = _this3.doUploadS3.bind(_this3);
    _this3.clickSave = _this3.clickSave.bind(_this3);
    return _this3;
  }

  (0, _createClass3.default)(GroupOpenModal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'closeModal',
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
    key: 'clickSave',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var post, _post;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.state.uploading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                if (!(this.state.group_name_box.trim() == '' || this.state.group_name_box == null)) {
                  _context2.next = 5;
                  break;
                }

                this.setState({
                  show_group_name_error: true,
                  show_group_name_unique_error: false
                });
                return _context2.abrupt('return');

              case 5:
                if (!(this.state.is_unique == false)) {
                  _context2.next = 8;
                  break;
                }

                this.setState({
                  show_group_name_unique_error: true,
                  show_group_name_error: false
                });
                return _context2.abrupt('return');

              case 8:
                _context2.prev = 8;

                if (!(this.state.file_src == '' || this.state.file_src == null)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 12;
                return _axios2.default.post('/api/groups/create', {
                  name: this.state.group_name_box.trim(),
                  type: this.state.privacy_box.value,
                  all_accept: this.state.all_accept_chkbox
                });

              case 12:
                post = _context2.sent;

                this.state.group_id = post.data.id;
                _context2.next = 20;
                break;

              case 16:
                _context2.next = 18;
                return _axios2.default.post('/api/groups/create', {
                  name: this.state.group_name_box.trim(),
                  group_img: this.state.file_src,
                  type: this.state.privacy_box.value,
                  all_accept: this.state.all_accept_chkbox
                });

              case 18:
                _post = _context2.sent;

                this.state.group_id = _post.data.id;

              case 20:
                _context2.next = 25;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2['catch'](8);

                console.log(_context2.t0);

              case 25:

                this.setState({
                  group_name_box: '',
                  file_src: '',
                  privacy_box: [privacy_options[0]],
                  all_accept_chkbox: true,
                  file_preview: '',
                  file_key: '',
                  redirect_groups: true
                });

                //this.props.callbackConfirm(this.state.file_src)

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 22]]);
      }));

      function clickSave() {
        return _ref2.apply(this, arguments);
      }

      return clickSave;
    }()
  }, {
    key: 'doUploadS3',
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
    key: 'onChangeFile',
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
    key: 'render',
    value: function render() {
      var _this5 = this;

      if (this.state.redirect_groups === true) {
        var tmp = '/groups/' + this.state.group_id;
        return _react2.default.createElement(_reactRouterDom.Redirect, { push: true, to: tmp });
      }

      var class_modal_status = '';

      if (this.props.bOpen) {
        class_modal_status = 'modal--show';
      }

      var filepath = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png';
      var instance = this;
      return _react2.default.createElement(
        'div',
        { className: 'groups-modal-container ' + class_modal_status },
        _react2.default.createElement(
          'div',
          { className: 'modal-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            'Create Group'
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-close-btn', onClick: function onClick() {
                return _this5.closeModal();
              } },
            _react2.default.createElement('i', { className: 'fas fa-times' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement('input', {
              id: 'myInput',
              type: 'file',
              ref: function ref(_ref3) {
                return _this5.ref_upload = _ref3;
              },
              style: { display: 'none' },
              accept: 'image/*',
              onClick: function onClick() {
                return _this5.ref_upload.value = null;
              },
              onChange: this.onChangeFile.bind(this)
            }),
            _react2.default.createElement(
              'div',
              { className: 'group-name' },
              _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                '*'
              ),
              ' Enter your group name here (names must be unique)',
              this.state.show_group_name_error && _react2.default.createElement(
                'div',
                { className: 'group-name-error-msg' },
                'Error, group name can\'t be blank'
              ),
              this.state.show_group_name_unique_error && _react2.default.createElement(
                'div',
                { className: 'group-name-error-unique-msg' },
                'Error, group name MUST be unique'
              ),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'group_name_box',
                className: 'group-name-box',
                onChange: this.handleChange,
                onBlur: this.onBlur_group_name,
                value: this.state.group_name_box,
                maxLength: '254'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'privacy' },
              'Select privacy',
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Privacy,
                options: privacy_options,
                className: 'privacy_box',
                defaultValue: [privacy_options[0]]
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'all_accept' },
              _react2.default.createElement('input', { id: 'all_accept_ChkBox', type: 'checkbox', defaultChecked: 'true', onChange: this.toggleChange_all_accept }),
              ' All members can accept group invitations'
            ),
            _react2.default.createElement(
              'div',
              { className: 'open-btn', onClick: function onClick() {
                  return _this5.ref_upload.click();
                } },
              _react2.default.createElement('i', { className: 'fas fa-upload' }),
              ' Upload File'
            ),
            _react2.default.createElement(
              'div',
              { className: this.state.uploading ? 'uploading-container' : 'uploading-container uploading--hide' },
              _react2.default.createElement('div', { className: 'uploading' })
            ),
            _react2.default.createElement(
              'div',
              { className: this.state.file_preview == '' ? 'upload-image-preview' : 'upload-image-preview open' },
              _react2.default.createElement('img', { src: this.state.file_preview })
            ),
            _react2.default.createElement(
              'div',
              { className: this.state.uploading ? 'save-btn btn--disable' : 'save-btn', onClick: function onClick() {
                  return _this5.clickSave();
                } },
              'Create Group'
            )
          )
        )
      );
    }
  }]);
  return GroupOpenModal;
}(_react.Component);

exports.default = GroupOpenModal;

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualApproval = function (_Component) {
  (0, _inherits3.default)(IndividualApproval, _Component);

  function IndividualApproval() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IndividualApproval);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualApproval.__proto__ || Object.getPrototypeOf(IndividualApproval)).call(this));

    _this.clickedAccept = function () {
      var approvals = _this.props.approvals;

      if (_this.state.dota_2_position_selected == false && _this.state.not_dota_2 == false) {
        alert('Sorry mate! You need to select a Position first! Click on a number to select the position');
        return;
      }

      if (window.confirm("Happy with your choice? Once in, you can't reject!")) _this.accepted_invite();
    };

    _this.accepted_invite = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var approvals, accepted_invite, _accepted_invite, getNumberofAttendees, no_vacany, _no_vacany, strposition, str, post, post_game;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              approvals = _this.props.approvals;
              _context.prev = 1;

              if (_this.state.not_dota_2) {
                accepted_invite = _axios2.default.post('/api/attendees/update_invite/' + approvals.attendees.schedule_games_id + '/' + approvals.attendees.user_id);
              } else {
                _accepted_invite = _axios2.default.post('/api/attendees/update_invite/' + approvals.attendees.schedule_games_id + '/' + approvals.attendees.user_id, {
                  dota_2_position_one: _this.state.dota_2_position_one_ticked,
                  dota_2_position_two: _this.state.dota_2_position_two_ticked,
                  dota_2_position_three: _this.state.dota_2_position_three_ticked,
                  dota_2_position_four: _this.state.dota_2_position_four_ticked,
                  dota_2_position_five: _this.state.dota_2_position_five_ticked
                });
              }

              if (!(approvals.schedule_games.limit != 42)) {
                _context.next = 8;
                break;
              }

              _context.next = 6;
              return _axios2.default.get('/api/attendees/attending/' + approvals.attendees.schedule_games_id);

            case 6:
              getNumberofAttendees = _context.sent;

              if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees == approvals.schedule_games.limit) {
                no_vacany = _axios2.default.post('/api/ScheduleGame/update_vacany/', {
                  vacancy: false,
                  id: approvals.attendees.schedule_games_id
                });
              } else {
                _no_vacany = _axios2.default.post('/api/ScheduleGame/update_vacany/', {
                  vacancy: true,
                  id: approvals.attendees.schedule_games_id
                });
              }

            case 8:
              strposition = '';

              if (_this.state.dota_2_position_one_ticked) {
                strposition += '1';
              }
              if (_this.state.dota_2_position_two_ticked) {
                if (strposition != '') {
                  strposition += ', 2';
                } else {
                  strposition += '2';
                }
              }
              if (_this.state.dota_2_position_three_ticked) {
                if (strposition != '') {
                  strposition += ', 3';
                } else {
                  strposition += '3';
                }
              }
              if (_this.state.dota_2_position_four_ticked) {
                if (strposition != '') {
                  strposition += ', 4';
                } else {
                  strposition += '4';
                }
              }
              if (_this.state.dota_2_position_five_ticked) {
                if (strposition != '') {
                  strposition += ', 5';
                } else {
                  strposition += '5';
                }
              }

              if (_this.state.not_dota_2) {
                str = approvals.users.first_name + ' ' + approvals.users.last_name + ' was approved';
              } else {
                str = approvals.users.first_name + ' ' + approvals.users.last_name + ' was approved for position/s: ' + strposition;
              }

              post = _axios2.default.post('/api/comments/', {
                content: str,
                schedule_games_id: approvals.attendees.schedule_games_id
              });
              post_game = _axios2.default.post('/api/notifications/addGameApproved', {
                other_user_id: approvals.attendees.user_id,
                schedule_games_id: approvals.attendees.schedule_games_id
              });
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 22:

              _this.setState({
                actionClicked: false,
                actionClickedAccept: true
              });

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 19]]);
    }));

    _this.clickedDenied = function () {
      var approvals = _this.props.approvals;

      try {
        var deleteInvite = _axios2.default.get('/api/attendees/delete_myInvite/' + approvals.attendees.schedule_games_id + '/' + approvals.attendees.user_id);
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
      dota_2_show_position: false,
      dota_2_position_one: false,
      dota_2_position_two: false,
      dota_2_position_three: false,
      dota_2_position_four: false,
      dota_2_position_five: false,
      dota_2_position_one_ticked: false,
      dota_2_position_two_ticked: false,
      dota_2_position_three_ticked: false,
      dota_2_position_four_ticked: false,
      dota_2_position_five_ticked: false,
      dota_2_position_selected: false,
      not_dota_2: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualApproval, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var approvals = this.props.approvals;


      if (approvals.attendees.dota_2_position_one != '' && approvals.attendees.dota_2_position_one != null) {
        this.state.dota_2_position_one = true;
        this.state.dota_2_show_position = true;
      }
      if (approvals.attendees.dota_2_position_two != '' && approvals.attendees.dota_2_position_two != null) {
        this.state.dota_2_position_two = true;
        this.state.dota_2_show_position = true;
      }
      if (approvals.attendees.dota_2_position_three != '' && approvals.attendees.dota_2_position_three != null) {
        this.state.dota_2_position_three = true;
        this.state.dota_2_show_position = true;
      }
      if (approvals.attendees.dota_2_position_four != '' && approvals.attendees.dota_2_position_four != null) {
        this.state.dota_2_position_four = true;
        this.state.dota_2_show_position = true;
      }
      if (approvals.attendees.dota_2_position_five != '' && approvals.attendees.dota_2_position_five != null) {
        this.state.dota_2_position_five = true;
        this.state.dota_2_show_position = true;
      }
      if (!this.state.dota_2_show_position) {
        this.state.not_dota_2 = true;
      }
    }
  }, {
    key: 'clickUpdatePosition',
    value: function clickUpdatePosition(i) {
      switch (i) {
        case -1:
          this.setState({
            dota_2_position_one: true,
            dota_2_position_one_ticked: false,
            dota_2_position_selected: false
          });
          break;
        case 1:
          this.setState({
            dota_2_position_one: false,
            dota_2_position_one_ticked: true,
            dota_2_position_selected: true
          });
          break;
        case -2:
          this.setState({
            dota_2_position_two: true,
            dota_2_position_two_ticked: false,
            dota_2_position_selected: false
          });
          break;
        case 2:
          this.setState({
            dota_2_position_two: false,
            dota_2_position_two_ticked: true,
            dota_2_position_selected: true
          });
          break;
        case -3:
          this.setState({
            dota_2_position_three: true,
            dota_2_position_three_ticked: false,
            dota_2_position_selected: false
          });
          break;
        case 3:
          this.setState({
            dota_2_position_three: false,
            dota_2_position_three_ticked: true,
            dota_2_position_selected: true
          });
          break;
        case -4:
          this.setState({
            dota_2_position_four: true,
            dota_2_position_four_ticked: false,
            dota_2_position_selected: false
          });
          break;
        case 4:
          this.setState({
            dota_2_position_four: false,
            dota_2_position_four_ticked: true,
            dota_2_position_selected: true
          });
          break;
        case -5:
          this.setState({
            dota_2_position_five: true,
            dota_2_position_five_ticked: false,
            dota_2_position_selected: false
          });
          break;
        case 5:
          this.setState({
            dota_2_position_five: false,
            dota_2_position_five_ticked: true,
            dota_2_position_selected: true
          });
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          approvals = _props.approvals,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (approvals.users.profile_img != null) {
        show_profile_img = true;
      }

      return _react2.default.createElement(
        'div',
        { className: 'scheduledGamesApprovals-info' },
        ' ',
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + approvals.attendees.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + approvals.users.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + approvals.attendees.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg\')'
          } }),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          '' + approvals.users.first_name,
          ' ',
          '' + approvals.users.last_name
        ),
        this.state.dota_2_show_position && _react2.default.createElement(
          'div',
          { className: 'dota_2_position' },
          'Positions: '
        ),
        !this.state.dota_2_position_one && _react2.default.createElement('div', { className: 'dota_2_position_dummy' }),
        this.state.dota_2_position_one && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_one',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(1);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-one-key-first-3-512.png',
            height: '40',
            width: '40' })
        ),
        this.state.dota_2_position_one_ticked && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_one',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(-1);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-one-key-first-3-512-Ticked.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_two && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_two',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(2);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-two-key-3-512.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_two_ticked && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_two',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(-2);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-two-key-3-512-Ticked.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_three && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_three',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(3);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-three-keyboard-3-512.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_three_ticked && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_three',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(-3);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-three-keyboard-3-512-Ticked.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_four && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_four',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(4);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-four-keyboard-3-512.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_four_ticked && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_four',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(-4);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-four-keyboard-3-512-Ticked.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_five && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_five',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(5);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-five-keyboard-3-512.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        this.state.dota_2_position_five_ticked && _react2.default.createElement(
          'div',
          {
            className: 'dota_2_position_five',
            onClick: function onClick() {
              return _this3.clickUpdatePosition(-5);
            } },
          _react2.default.createElement('img', {
            src: 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-five-keyboard-3-512-Ticked.png',
            height: '40',
            width: '40' }),
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'invitiation-options' },
          this.state.actionClicked && _react2.default.createElement(
            'div',
            { className: 'invitation-accept', onClick: this.clickedAccept },
            'Accept \xA0\xA0'
          ),
          this.state.actionClicked && _react2.default.createElement(
            'div',
            { className: 'invitation-deny', onClick: this.clickedDenied },
            'Deny\xA0\xA0'
          ),
          this.state.actionClickedAccept && _react2.default.createElement(
            'div',
            { className: 'invitation-accepted' },
            'Accepted! \xA0\xA0'
          ),
          this.state.actionClickedDeny && _react2.default.createElement(
            'div',
            { className: 'invitation-denied' },
            'Denied! \xA0\xA0'
          )
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualApproval;
}(_react.Component);

exports.default = IndividualApproval;

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _reactInfiniteScrollComponent = __webpack_require__(130);

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _IndividualPost = __webpack_require__(41);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualGroup = function (_Component) {
  (0, _inherits3.default)(IndividualGroup, _Component);

  function IndividualGroup() {
    (0, _classCallCheck3.default)(this, IndividualGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualGroup.__proto__ || Object.getPrototypeOf(IndividualGroup)).call(this));

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
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
                  return _axios2.default.get('/api/get_group_posts/' + self.props.groups_id.params.id + '/' + myCounter);

                case 3:
                  myPosts = _context.sent;

                  if (!(myPosts.data.groupPosts.data.length == 0)) {
                    _context.next = 7;
                    break;
                  }

                  self.setState({
                    moreplease: false
                  });
                  return _context.abrupt('return');

                case 7:
                  i = 0;

                case 8:
                  if (!(i < myPosts.data.groupPosts.data.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 11;
                  return _axios2.default.get('/api/likes/' + myPosts.data.groupPosts.data[i].id);

                case 11:
                  myLikes = _context.sent;

                  myPosts.data.groupPosts.data[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.groupPosts.data[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.groupPosts.data[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.groupPosts.data[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.groupPosts.data[i].admirer_first_name = '';
                    myPosts.data.groupPosts.data[i].admirer_last_name = '';
                  }
                  if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
                    myPosts.data.groupPosts.data[i].do_I_like_it = true;
                  } else {
                    myPosts.data.groupPosts.data[i].do_I_like_it = false;
                  }

                case 16:
                  i++;
                  _context.next = 8;
                  break;

                case 19:

                  self.setState({
                    myPosts: self.state.myPosts.concat(myPosts.data.groupPosts.data)
                  });
                  _context.next = 25;
                  break;

                case 22:
                  _context.prev = 22;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 25:
                case 'end':
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

  (0, _createClass3.default)(IndividualGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.initialData.userInfo != undefined) {
        this.fetchMoreData();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.myPosts != undefined) {
        return _react2.default.createElement(
          'section',
          { id: 'posts' },
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
        return _react2.default.createElement('section', { id: 'posts' });
      }
    }
  }]);
  return IndividualGroup;
}(_react.Component);

exports.default = IndividualGroup;

var app = document.getElementById('app');

/***/ }),

/***/ 451:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualGroups = function (_Component) {
  (0, _inherits3.default)(IndividualGroups, _Component);

  function IndividualGroups() {
    (0, _classCallCheck3.default)(this, IndividualGroups);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualGroups.__proto__ || Object.getPrototypeOf(IndividualGroups)).call(this));

    _this.state = {
      redirect_groups: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualGroups, [{
    key: 'redirect',
    value: function redirect() {
      this.setState({ redirect_groups: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.redirect_groups) {
        var _groups = this.props.groups;

        var tmp = '/groups/' + _groups.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      var groups = this.props.groups;

      return _react2.default.createElement(
        'div',
        { className: 'groups-info' },
        _react2.default.createElement(
          'div',
          {
            className: 'group_img',
            onClick: function onClick() {
              return _this2.redirect();
            },
            style: {
              backgroundImage: 'url(' + groups.group_img + ')'
            } },
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'group-name' },
          groups.name
        )
      );
    }
  }]);
  return IndividualGroups;
}(_react.Component);

exports.default = IndividualGroups;

/***/ }),

/***/ 452:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualMember = function (_Component) {
  (0, _inherits3.default)(IndividualMember, _Component);

  function IndividualMember() {
    (0, _classCallCheck3.default)(this, IndividualMember);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualMember.__proto__ || Object.getPrototypeOf(IndividualMember)).call(this));

    _this.delete_member = function () {
      try {
        var delete_member = _axios2.default.get('/api/usergroup/delete_member/' + _this.props.member.group_id + '/' + _this.props.member.id);
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        show_controls: false,
        show_promoted: false,
        show_delete: true,
        show_demoted: false
      });
      //NEED to do notifications
    };

    _this.promote_member = function () {
      try {
        var delete_member = _axios2.default.get('/api/usergroup/promote_member/' + _this.props.member.group_id + '/' + _this.props.member.id);
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        show_controls: false,
        show_delete: false,
        show_promoted: true,
        show_demoted: false
      });
    };

    _this.demote_member = function () {
      try {
        var delete_member = _axios2.default.get('/api/usergroup/demote_member/' + _this.props.member.group_id + '/' + _this.props.member.id);
      } catch (error) {
        console.log(error);
      }
      _this.setState({
        show_controls: false,
        show_delete: false,
        show_promoted: false,
        show_demoted: true
      });
    };

    _this.state = {
      show_controls: true,
      show_delete: false,
      show_promoted: false,
      show_demoted: false,
      show_promoted_icon: true,
      show_demoted_icon: true,
      show_kick_icon: true
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualMember, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //0=Owner, 1=Admin, 2=Moderator, 3=User, 42=Pending, -1=Not a member
      if (this.props.member.permission_level == 0 || this.props.member.permission_level == 42) {
        this.setState({ show_controls: false });
      }

      if (this.props.member.permission_level == 1) {
        this.setState({ show_promoted_icon: false });
      }

      if (this.props.member.permission_level == 3) {
        this.setState({ show_demoted_icon: false });
      }

      if (this.props.user_permission == 3 || this.props.user_permission == -1 || this.props.user_permission == 42) {
        this.setState({ show_controls: false });
      }

      if (this.props.user_permission == 2) {
        if (this.props.member.permission_level == 2 || this.props.member.permission_level == 1) {
          this.setState({ show_controls: false });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          member = _props.member,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (member.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        'div',
        { className: 'invitation-info' },
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + member.usergroups_user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + member.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + member.usergroups_user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png\')'
          } }),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          '' + member.first_name,
          ' ',
          '' + member.last_name
        ),
        this.state.show_controls && _react2.default.createElement(
          'div',
          { className: 'member-controls' },
          this.state.show_promoted_icon && _react2.default.createElement(
            'div',
            {
              className: 'promote',
              onClick: function onClick() {
                if (window.confirm('Are you sure you wish to promote this member?')) _this2.promote_member();
              } },
            _react2.default.createElement('i', { className: 'fas fa-arrow-circle-up' })
          ),
          this.state.show_demoted_icon && _react2.default.createElement(
            'div',
            {
              className: 'depromote',
              onClick: function onClick() {
                if (window.confirm('Are you sure you wish to demote this member?')) _this2.demote_member();
              } },
            _react2.default.createElement('i', { className: 'fas fa-arrow-alt-circle-down' })
          ),
          this.state.show_kick_icon && _react2.default.createElement(
            'div',
            {
              className: 'kick',
              onClick: function onClick() {
                if (window.confirm('Are you sure you wish to remove this member from the group?')) _this2.delete_member();
              } },
            _react2.default.createElement('i', { className: 'fas fa-user-times' })
          )
        ),
        this.state.show_delete && _react2.default.createElement(
          'div',
          { className: 'member-controls' },
          'Removed'
        ),
        this.state.show_promoted && _react2.default.createElement(
          'div',
          { className: 'member-controls' },
          'Promoted'
        ),
        this.state.show_demoted && _react2.default.createElement(
          'div',
          { className: 'member-controls' },
          'Demoted'
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualMember;
}(_react.Component);

exports.default = IndividualMember;

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScheduledGamePost = __webpack_require__(59);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

var _ScheduleGames_Pull_Data = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var date_options = [{ value: 'Now-ish', label: 'Now-ish' }, { value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }];
var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }];

var clash_royale_trophy = [{ value: '1000', label: '> 1000' }, { value: '2000', label: '> 2000' }, { value: '3000', label: '> 3000' }, { value: '4000', label: '> 4000' }, { value: '5000', label: '> 5000' }, { value: 'competitive', label: 'Competitive' }];

var ScheduleGames_Clash_Royale = function (_Component) {
  (0, _inherits3.default)(ScheduleGames_Clash_Royale, _Component);

  function ScheduleGames_Clash_Royale() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduleGames_Clash_Royale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduleGames_Clash_Royale.__proto__ || Object.getPrototypeOf(ScheduleGames_Clash_Royale)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.call_PullDataFunc = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var tmp_allscheduledGames;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _ScheduleGames_Pull_Data.PullDataFunction)(_this.state);

            case 2:
              tmp_allscheduledGames = _context.sent;

              _this.setState({
                allscheduledGames: []
              });

              if (tmp_allscheduledGames.data.latestScheduledGames.length > 10) {
                _this.setState({
                  show_more: true
                });
                tmp_allscheduledGames.data.latestScheduledGames.pop();
              } else {
                _this.setState({
                  show_more: false
                });
              }
              _this.setState({
                allscheduledGames: tmp_allscheduledGames.data.latestScheduledGames
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.fetchMoreData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter + 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter > 9) {
          _this.setState({ show_prev: true });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.fetchPrevData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter - 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter < 9) {
          _this.setState({ show_prev: false });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.handleChange_experience = function (selected_experience) {
      _this.setState({
        selected_experience: selected_experience
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_time = function (when) {
      _this.setState({
        when: when
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_description = function (e) {
      _this.setState({
        description_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_other = function (e) {
      _this.setState({
        other_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_visibility = function (visibility_box) {
      _this.setState({
        visibility_box: visibility_box
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_Clash_royale_trophies = function (clash_royale_trophies) {
      _this.setState({
        clash_royale_trophies: clash_royale_trophies
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allscheduledGames != undefined) {
        return _this.state.allscheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ScheduledGamePost2.default, {
            schedule_game: item,
            key: index,
            user: _this.props.props.initialData
          });
        });
      }
    };

    _this.state = {
      game_name_box: '',
      selected_experience: null,
      description_box: '',
      other_box: '',
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      clash_royale_trophies: null
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduleGames_Clash_Royale, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state.game_name_box = this.props.game_name_box;
      this.call_PullDataFunc();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'posts' },
        _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          _react2.default.createElement(
            'div',
            { className: 'filterMenu' },
            _react2.default.createElement(
              'div',
              { className: 'clash_royale_trophies' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Clash_royale_trophies,
                options: clash_royale_trophy,
                className: 'clash-royale-trophies',
                isClearable: true,
                placeholder: 'Trophies'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'experience' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_experience,
                options: experience_options,
                placeholder: 'Select experience level',
                name: 'experience-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'date-time' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_time,
                options: date_options,
                placeholder: 'Start Date?',
                name: 'date-time-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'description' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'description-box',
                onChange: this.handleChange_description,
                value: this.state.description_box,
                placeholder: 'Description'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'other' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'other-box',
                onChange: this.handleChange_other,
                value: this.state.other_box,
                placeholder: 'Any Other stuff'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'visibility' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_visibility,
                options: visibility_options,
                placeholder: 'Select visibility',
                name: 'visibility-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button' },
              _react2.default.createElement(
                'div',
                { className: 'plus-button', onClick: this.moveaway },
                _react2.default.createElement('i', { className: 'fas fa-plus' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'full-game' },
                _react2.default.createElement('input', {
                  type: 'checkbox',
                  defaultChecked: this.state.isChecked,
                  onChange: this.toggleChange
                }),
                '\xA0Exclude Full Games?'
              )
            )
          ),
          _react2.default.createElement('div', { className: 'gap' }),
          this.showLatestPosts(),
          this.state.show_prev && _react2.default.createElement(
            'div',
            { className: 'prev_pls', onClick: this.fetchPrevData },
            '<',
            '- Previous'
          ),
          this.state.show_more && _react2.default.createElement(
            'div',
            { className: 'more_pls', onClick: this.fetchMoreData },
            'Next ->'
          )
        )
      );
    }
  }]);
  return ScheduleGames_Clash_Royale;
}(_react.Component);

exports.default = ScheduleGames_Clash_Royale;

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScheduledGamePost = __webpack_require__(59);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

var _ScheduleGames_Pull_Data = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dota2_server_regions = [{ value: 'EU West', label: 'EU West' }, { value: 'EU East', label: 'EU East' }, { value: 'EU North', label: 'EU North' }, { value: 'Poland', label: 'Poland' }, { value: 'Spain', label: 'Spain' }, { value: 'US Northwest', label: 'US Northwest' }, { value: 'US Northeast', label: 'US Northeast' }, { value: 'US Northcentral', label: 'US Northcentral' }, { value: 'US Southwest', label: 'US Southwest' }, { value: 'Australia', label: 'Australia' }, { value: 'Brazil', label: 'Brazil' }, { value: 'Chile', label: 'Chile' }, { value: 'Emirates', label: 'Emirates' }, { value: 'India', label: 'India' }, { value: 'India East', label: 'India East' }, { value: 'Peru', label: 'Peru' }, { value: 'Japan', label: 'Japan' }, { value: 'Hong Kong', label: 'Hong Kong' }, { value: 'Singapore', label: 'Singapore' }, { value: 'South Africa', label: 'South Africa' }, { value: 'China Shanghai', label: 'China Shanghai' }, { value: 'China Guangzhou', label: 'China Guangzhou' }, { value: 'China Tianjin', label: 'China Tianjin' }, { value: 'China TC Zhejiang', label: 'China TC Zhejiang' }, { value: 'China UC', label: 'China UC' }, { value: 'China UC 2', label: 'China UC 2' }, { value: 'China TC Wuhan', label: 'China TC Wuhan' }];

var dota2_roles = [{ value: 'Position 1', label: 'Position 1' }, { value: 'Position 2', label: 'Position 2' }, { value: 'Position 3', label: 'Position 3' }, { value: 'Position 4', label: 'Position 4' }, { value: 'Position 5', label: 'Position 5' }];

var dota2_medal_ranks = [{ value: 'Herald', label: 'Herald' }, { value: 'Guardian', label: 'Guardian' }, { value: 'Crusader', label: 'Crusader' }, { value: 'Archon', label: 'Archon' }, { value: 'Legend', label: 'Legend' }, { value: 'Divine', label: 'Divine' }];

var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];

var date_options = [{ value: 'Now-ish', label: 'Now-ish' }, { value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }];

var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }];

var ScheduleGames_Dota2 = function (_Component) {
  (0, _inherits3.default)(ScheduleGames_Dota2, _Component);

  function ScheduleGames_Dota2() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduleGames_Dota2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduleGames_Dota2.__proto__ || Object.getPrototypeOf(ScheduleGames_Dota2)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.call_PullDataFunc = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var tmp_allscheduledGames;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _ScheduleGames_Pull_Data.PullDataFunction)(_this.state);

            case 2:
              tmp_allscheduledGames = _context.sent;

              _this.setState({
                allscheduledGames: []
              });

              if (tmp_allscheduledGames.data.latestScheduledGames.length > 10) {
                _this.setState({
                  show_more: true
                });
                tmp_allscheduledGames.data.latestScheduledGames.pop();
              } else {
                _this.setState({
                  show_more: false
                });
              }
              _this.setState({
                allscheduledGames: tmp_allscheduledGames.data.latestScheduledGames
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.fetchMoreData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter + 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter > 9) {
          _this.setState({ show_prev: true });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.fetchPrevData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter - 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter < 9) {
          _this.setState({ show_prev: false });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.handleChange_experience = function (selected_experience) {
      _this.setState({
        selected_experience: selected_experience
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_time = function (when) {
      _this.setState({
        when: when
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_description = function (e) {
      _this.setState({
        description_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_other = function (e) {
      _this.setState({
        other_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_visibility = function (visibility_box) {
      _this.setState({
        visibility_box: visibility_box
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_Dota2_medal_ranks = function (dota2_medal_ranks) {
      _this.setState({
        dota2_medal_ranks: dota2_medal_ranks
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_Dota2_server_regions = function (dota2_server_regions) {
      _this.setState({
        dota2_server_regions: dota2_server_regions
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_Dota2_roles = function (dota2_roles) {
      _this.setState({
        dota2_roles: dota2_roles
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.toggleChange = function () {
      _this.setState({
        isChecked: !_this.state.isChecked,
        db_row_counter: 0
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allscheduledGames != undefined) {
        return _this.state.allscheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ScheduledGamePost2.default, {
            schedule_game: item,
            key: index,
            user: _this.props.props.initialData
          });
        });
      }
    };

    _this.state = {
      game_name_box: '',
      selected_experience: null,
      description_box: '',
      other_box: '',
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      dota2_medal_ranks: null,
      dota2_server_regions: null,
      dota2_roles: null
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduleGames_Dota2, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state.game_name_box = this.props.game_name_box;
      this.call_PullDataFunc();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'posts' },
        _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          _react2.default.createElement(
            'div',
            { className: 'filterMenu' },
            _react2.default.createElement(
              'div',
              { className: 'dota2_medal_ranks' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Dota2_medal_ranks,
                options: dota2_medal_ranks,
                className: 'dota2-medal-ranks',
                isClearable: true,
                placeholder: 'Rank'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'dota2_server_regions' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Dota2_server_regions,
                options: dota2_server_regions,
                className: 'dota2-server-regions',
                isClearable: true,
                placeholder: 'Region'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'dota2_roles' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_Dota2_roles,
                options: dota2_roles,
                className: 'dota2-roles',
                isClearable: true,
                placeholder: 'Role'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'experience' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_experience,
                options: experience_options,
                placeholder: 'Select experience level',
                name: 'experience-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'date-time' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_time,
                options: date_options,
                placeholder: 'Start Date?',
                name: 'date-time-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'description' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'description-box',
                onChange: this.handleChange_description,
                value: this.state.description_box,
                placeholder: 'Description'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'other' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'other-box',
                onChange: this.handleChange_other,
                value: this.state.other_box,
                placeholder: 'Any Other stuff'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'visibility' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_visibility,
                options: visibility_options,
                placeholder: 'Select visibility',
                name: 'visibility-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button' },
              _react2.default.createElement(
                'div',
                { className: 'plus-button', onClick: this.moveaway },
                _react2.default.createElement('i', { className: 'fas fa-plus' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'full-game' },
                _react2.default.createElement('input', {
                  type: 'checkbox',
                  defaultChecked: this.state.isChecked,
                  onChange: this.toggleChange
                }),
                '\xA0Exclude Full Games?'
              )
            )
          ),
          _react2.default.createElement('div', { className: 'gap' }),
          this.showLatestPosts(),
          this.state.show_prev && _react2.default.createElement(
            'div',
            { className: 'prev_pls', onClick: this.fetchPrevData },
            '<',
            '- Previous'
          ),
          this.state.show_more && _react2.default.createElement(
            'div',
            { className: 'more_pls', onClick: this.fetchMoreData },
            'Next ->'
          )
        )
      );
    }
  }]);
  return ScheduleGames_Dota2;
}(_react.Component);

exports.default = ScheduleGames_Dota2;

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _ScheduledGamePost = __webpack_require__(59);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

var _ScheduleGames_Pull_Data = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region_options = [{ value: 'North America', label: 'North America' }, { value: 'Europe', label: 'Europe' }, { value: 'Asia', label: 'Asia' }, { value: 'Russia', label: 'Russia' }, { value: 'South America', label: 'South America' }, { value: 'Oceania', label: 'Oceania' }, { value: 'Middle East', label: 'Middle East' }, { value: 'Africa', label: 'Africa' }, { value: 'Central America', label: 'Central America' }];
var experience_options = [{ value: 'Casual', label: 'Casual' }, { value: 'Semi Pro', label: 'Semi Pro' }, { value: 'Professional', label: 'Professional' }];
var platform_options = [{ value: 'PC', label: 'PC' }, { value: 'XB', label: 'XB' }, { value: 'PS', label: 'PS' }, { value: 'Nintendo', label: 'Nintendo' }, { value: 'Mobile', label: 'Mobile' }, { value: 'Tabletop', label: 'Tabletop' }];
var date_options = [{ value: 'Now-ish', label: 'Now-ish' }, { value: '8 hours', label: '8 hours' }, { value: '2 days', label: '2 days' }, { value: '7 days', label: '7 days' }, { value: '14 days', label: '14 days' }];
var visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }];

var ScheduleGames_Header = function (_Component) {
  (0, _inherits3.default)(ScheduleGames_Header, _Component);

  function ScheduleGames_Header() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduleGames_Header);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduleGames_Header.__proto__ || Object.getPrototypeOf(ScheduleGames_Header)).call(this));

    _this.moveaway = function () {
      window.location.href = '/addscheduleGames';
    };

    _this.call_PullDataFunc = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var tmp_allscheduledGames;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.state.game_name_box = _this.props.game_name_box;
              _context.next = 3;
              return (0, _ScheduleGames_Pull_Data.PullDataFunction)(_this.state);

            case 3:
              tmp_allscheduledGames = _context.sent;

              _this.setState({
                allscheduledGames: []
              });

              if (tmp_allscheduledGames.data.latestScheduledGames.length > 10) {
                _this.setState({
                  show_more: true
                });
                tmp_allscheduledGames.data.latestScheduledGames.pop();
              } else {
                _this.setState({
                  show_more: false
                });
              }
              _this.setState({
                allscheduledGames: tmp_allscheduledGames.data.latestScheduledGames
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.fetchMoreData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter + 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter > 9) {
          _this.setState({ show_prev: true });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.fetchPrevData = function () {
      _this.setState({
        db_row_counter: _this.state.db_row_counter - 10
      }, function () {
        _this.call_PullDataFunc();
        if (_this.state.db_row_counter < 9) {
          _this.setState({ show_prev: false });
        }
      });
      window.scrollTo(0, 0);
    };

    _this.handleChange_region = function (selected_region) {
      _this.setState({
        selected_region: selected_region
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_experience = function (selected_experience) {
      _this.setState({
        selected_experience: selected_experience
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_platform = function (selected_platform) {
      _this.setState({
        selected_platform: selected_platform
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_time = function (when) {
      _this.setState({
        when: when
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_description = function (e) {
      _this.setState({
        description_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_other = function (e) {
      _this.setState({
        other_box: e.target.value
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.handleChange_visibility = function (visibility_box) {
      _this.setState({
        visibility_box: visibility_box
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.toggleChange = function () {
      _this.setState({
        isChecked: !_this.state.isChecked,
        db_row_counter: 0
      }, function () {
        _this.call_PullDataFunc();
      });
    };

    _this.showLatestPosts = function () {
      if (_this.state.allscheduledGames != undefined) {
        return _this.state.allscheduledGames.map(function (item, index) {
          return _react2.default.createElement(_ScheduledGamePost2.default, {
            schedule_game: item,
            key: index,
            user: _this.props.props.initialData,
            props: _this.props.props.routeProps,
            show_single: _this.props.show_single
          });
        });
      }
    };

    _this.state = {
      game_name_box: '',
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      description_box: '',
      other_box: '',
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 0,
      show_prev: false,
      show_more: false
    };
    return _this;
  }

  (0, _createClass3.default)(ScheduleGames_Header, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var match = this.props.props.routeProps.match;


      var getExactData = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var onescheduledGames;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/ScheduleGame/filtered_by_one/' + match.params.id);

                case 3:
                  onescheduledGames = _context2.sent;

                  self.setState({
                    allscheduledGames: onescheduledGames.data.latestScheduledGames
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getExactData() {
          return _ref2.apply(this, arguments);
        };
      }();

      if (match.params.id != undefined && match.params.id != '' && this.props.show_single == true) {
        getExactData();
      } else {
        this.call_PullDataFunc();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'posts' },
        _react2.default.createElement(
          'div',
          { className: 'content-area scheduleGames-page' },
          _react2.default.createElement(
            'div',
            { className: 'filterMenu' },
            _react2.default.createElement(
              'div',
              { className: 'region' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_region,
                options: region_options,
                placeholder: 'Select your region',
                name: 'region-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'experience' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_experience,
                options: experience_options,
                placeholder: 'Select experience level',
                name: 'experience-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'platform' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_platform,
                options: platform_options,
                placeholder: 'Select which platform',
                name: 'platform-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'date-time' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_time,
                options: date_options,
                placeholder: 'Start Date?',
                name: 'date-time-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'description' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'description-box',
                onChange: this.handleChange_description,
                value: this.state.description_box,
                placeholder: 'Description'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'other' },
              _react2.default.createElement('input', {
                type: 'text',
                className: 'other-box',
                onChange: this.handleChange_other,
                value: this.state.other_box,
                placeholder: 'Any Other stuff'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'visibility' },
              _react2.default.createElement(_reactSelect2.default, {
                onChange: this.handleChange_visibility,
                options: visibility_options,
                placeholder: 'Select visibility',
                name: 'visibility-box',
                isClearable: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button' },
              _react2.default.createElement(
                'div',
                { className: 'plus-button', onClick: this.moveaway },
                _react2.default.createElement('i', { className: 'fas fa-plus' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'full-game' },
                _react2.default.createElement('input', {
                  type: 'checkbox',
                  defaultChecked: this.state.isChecked,
                  onChange: this.toggleChange
                }),
                '\xA0Exclude Full Games?'
              )
            )
          ),
          _react2.default.createElement('div', { className: 'gap' }),
          this.showLatestPosts(),
          this.state.show_prev && _react2.default.createElement(
            'div',
            { className: 'prev_pls', onClick: this.fetchPrevData },
            '<',
            '- Previous'
          ),
          this.state.show_more && _react2.default.createElement(
            'div',
            { className: 'more_pls', onClick: this.fetchMoreData },
            'Next ->'
          )
        )
      );
    }
  }]);
  return ScheduleGames_Header;
}(_react.Component);

exports.default = ScheduleGames_Header;

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _IndividualComment = __webpack_require__(48);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _DeleteScheduleGameModal = __webpack_require__(93);

var _DeleteScheduleGameModal2 = _interopRequireDefault(_DeleteScheduleGameModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduledGamePost_Clash_Royale = function (_Component) {
  (0, _inherits3.default)(ScheduledGamePost_Clash_Royale, _Component);

  function ScheduledGamePost_Clash_Royale() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduledGamePost_Clash_Royale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamePost_Clash_Royale.__proto__ || Object.getPrototypeOf(ScheduledGamePost_Clash_Royale)).call(this));

    _this.callbackPostFileModalConfirm = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var mysch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  bDeleteModalOpen: false
                });

                try {
                  mysch = _axios2.default.get('/api/ScheduleGame/delete/' + _this.state.modal_id + '/' + data.value);

                  location.reload();
                } catch (error) {
                  console.log(error);
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

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
      var schedule_game = _this.props.props.schedule_game;


      var getComments = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var myComments;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_games/' + schedule_game.id);

                case 3:
                  myComments = _context2.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: '',
                    comment_total: myComments.data.allComments.length
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref2.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.showComment = function () {
      if (_this.state.myComments != undefined) {
        return _this.state.myComments.map(function (item, index) {
          return _react2.default.createElement(_IndividualComment2.default, {
            comment: item,
            key: index,
            user: _this.props.props.user
          });
        });
      }
    };

    _this.insert_comment = function () {
      var schedule_game = _this.props.props.schedule_game;

      var self = _this;

      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
        });
        return;
      }

      _this.onFocus();

      var saveComment = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var postComment, addPostLike;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.post('/api/comments', {
                    content: self.state.value.trim(),
                    schedule_games_id: schedule_game.id
                  });

                case 3:
                  postComment = _context3.sent;

                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });
                  if (schedule_game.user_id != self.props.props.user.userInfo.id) {
                    addPostLike = _axios2.default.post('/api/notifications/addComment', {
                      other_user_id: schedule_game.user_id,
                      schedule_games_id: schedule_game.id,
                      comment_id: postComment.data.id
                    });
                  }
                  _context3.next = 13;
                  break;

                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 10]]);
        }));

        return function saveComment() {
          return _ref3.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.delete_sch = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        var tmp, all_attendees, mysch;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                tmp = null;
                _context4.prev = 1;
                _context4.next = 4;
                return _axios2.default.get('/api/attendees/attending/' + id);

              case 4:
                all_attendees = _context4.sent;

                if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0) {
                  _this.setState({
                    bDeleteModalOpen: true,
                    modal_id: id
                  });
                } else {
                  if (window.confirm('Are you sure you wish to trash this game boss?')) {
                    mysch = _axios2.default.get('/api/ScheduleGame/delete/' + id + '/' + tmp);

                    location.reload();
                  }
                }
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](1);

                console.log(_context4.t0);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[1, 8]]);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.enrollinGame = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var getNumberofAttendees, savemySpot;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _axios2.default.get('/api/attendees/attending/' + _this.props.props.schedule_game.id);

            case 3:
              getNumberofAttendees = _context5.sent;

              if (_this.props.props.schedule_game.limit == 42 || getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < _this.props.props.schedule_game.limit) {
                savemySpot = _axios2.default.post('/api/attendees/savemySpot', {
                  schedule_games_id: _this.props.props.schedule_game.id,
                  notify: true
                });

                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: false,
                  show_pending: true
                });
              } else {
                window.alert('Sorry mate, the spot got filled up! You are NOT in :(');
                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: true,
                  show_pending: false
                });
              }
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);

              console.log(_context5.t0);

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2, [[0, 7]]);
    }));

    _this.disenrollinGame = function () {
      try {
        var getNumberofAttendees = _axios2.default.get('/api/attendees/removeattending/' + _this.props.props.schedule_game.id);
        _this.setState({
          show_invite: true,
          show_attending: false,
          show_full: false,
          show_pending: false
        });

        var no_vacany = _axios2.default.post('/api/ScheduleGame/update_vacany/', {
          vacancy: true,
          id: _this.props.props.schedule_game.id
        });
      } catch (error) {
        console.log(error);
      }
    };

    _this.redirect_link = function () {
      _this.setState({ redirect_PlayerList: true });
    };

    _this.approvals = function () {
      _this.setState({ redirect_Approvals: true });
    };

    _this.state = {
      show_more_comments: false,
      pull_once: true,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      approval_btn: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: true,
      show_full: false,
      show_attending: false,
      show_pending: false,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
      bDeleteModalOpen: false,
      modal_id: 0,
      visibility_hidden_lnk: false,
      show_region: false,
      show_experience: false,
      show_platform: false,
      show_description: false,
      show_other: false,
      visibility: 'Public',
      duration: '',
      start_date: (0, _moment2.default)(),
      end_date: (0, _moment2.default)(),
      redirect_Approvals: false,
      redirect_PlayerList: false,
      clash_royale_field: false
    };

    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);

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

  (0, _createClass3.default)(ScheduledGamePost_Clash_Royale, [{
    key: 'callbackPostFileModalClose',
    value: function callbackPostFileModalClose() {
      this.setState({
        bDeleteModalOpen: false
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var schedule_game = this.props.props.schedule_game;


      var getCommentsCount = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var myCommentsCount;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_gamesCount/' + schedule_game.id);

                case 3:
                  myCommentsCount = _context6.sent;

                  if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
                    self.state.zero_comments = true;
                    self.state.comment_total = myCommentsCount.data.no_of_comments[0].no_of_comments;
                  }
                  _context6.next = 10;
                  break;

                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6['catch'](0);

                  console.log(_context6.t0);

                case 10:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 7]]);
        }));

        return function getCommentsCount() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getNumberofAttendees = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var getwhoisAttending, i, get_if_im_Attending, _getNumberofAttendees;

          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _axios2.default.get('/api/attendees/role_call/' + schedule_game.id);

                case 3:
                  getwhoisAttending = _context7.sent;
                  i = 0;

                case 5:
                  if (!(i < getwhoisAttending.data.role_call.length)) {
                    _context7.next = 25;
                    break;
                  }

                  self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i]);
                  _context7.t0 = i;
                  _context7.next = _context7.t0 === 0 ? 10 : _context7.t0 === 1 ? 12 : _context7.t0 === 2 ? 14 : _context7.t0 === 3 ? 16 : _context7.t0 === 4 ? 18 : _context7.t0 === 5 ? 20 : 22;
                  break;

                case 10:
                  self.state.show_one_profile = true;
                  return _context7.abrupt('break', 22);

                case 12:
                  self.state.show_two_profile = true;
                  return _context7.abrupt('break', 22);

                case 14:
                  self.state.show_three_profile = true;
                  return _context7.abrupt('break', 22);

                case 16:
                  self.state.show_four_profile = true;
                  return _context7.abrupt('break', 22);

                case 18:
                  self.state.show_five_profile = true;
                  return _context7.abrupt('break', 22);

                case 20:
                  self.state.show_more_profile = true;
                  return _context7.abrupt('break', 22);

                case 22:
                  i++;
                  _context7.next = 5;
                  break;

                case 25:
                  _context7.next = 27;
                  return _axios2.default.get('/api/attendees/myattendance/' + schedule_game.id);

                case 27:
                  get_if_im_Attending = _context7.sent;

                  if (get_if_im_Attending.data.myattendance.length == 0) {
                    //You're not approved or pending
                    self.state.show_attending = false;
                    self.state.show_invite = true;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 1) {
                    // You're approved
                    self.state.show_attending = true;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 3) {
                    //You're pending
                    self.state.show_attending = false;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = true;
                  }

                  if (!(schedule_game.limit != 42)) {
                    _context7.next = 35;
                    break;
                  }

                  //If its not an unlimited game
                  self.state.show_attendees = true; //Display the count ie 1 of 5
                  _context7.next = 33;
                  return _axios2.default.get('/api/attendees/attending/' + schedule_game.id);

                case 33:
                  _getNumberofAttendees = _context7.sent;
                  //Get the total
                  if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0) {
                    self.state.attendees_count = _getNumberofAttendees.data.allAttendees[0].no_of_allAttendees;
                    if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees >= schedule_game.limit) {
                      self.state.show_attending = false;
                      self.state.show_invite = false;
                      self.state.show_full = true;
                      self.state.show_pending = false;
                    }
                  }

                case 35:
                  _context7.next = 40;
                  break;

                case 37:
                  _context7.prev = 37;
                  _context7.t1 = _context7['catch'](0);

                  console.log(_context7.t1);

                case 40:
                  self.forceUpdate();

                case 41:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 37]]);
        }));

        return function getNumberofAttendees() {
          return _ref7.apply(this, arguments);
        };
      }();

      if (schedule_game.visibility == 4) {
        this.state.visibility_hidden_lnk = true;
      }

      if (this.props.props != undefined) {
        if (this.props.props.props != undefined) {
          if (this.props.props.props.match.params.id != undefined && this.props.props.props.match.params.id != '' && this.props.props.show_single == true) {
            this.onChange();
          }
        }
      }

      if (this.props != undefined) {
        if (this.props.props.user != undefined) {
          if (this.props.props.user.userInfo != undefined) {
            if (this.props.props.user.userInfo.id == schedule_game.user_id) {
              this.state.myPost = true;
              this.state.approval_btn = true;
            }
          }
        }
      }

      if (schedule_game.region != '' && schedule_game.region != null) {
        this.state.show_region = true;
      }
      if (schedule_game.experience != '' && schedule_game.experience != null) {
        this.state.show_experience = true;
      }
      if (schedule_game.platform != '' && schedule_game.platform != null) {
        this.state.show_platform = true;
      }
      if (schedule_game.description != '' && schedule_game.description != null) {
        this.state.show_description = true;
      }
      if (schedule_game.other != '' && schedule_game.other != null) {
        this.state.show_other = true;
      }

      switch (schedule_game.visibility) {
        case 1:
          this.state.visibility = 'Public';
          break;
        case 2:
          this.state.visibility = 'Friends';
          break;
        case 3:
          this.state.visibility = 'Group';
          break;
        case 4:
          this.state.visibility = 'Hidden';
          break;
      }

      var myExpiry = (0, _moment2.default)(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ');
      var now = (0, _moment2.default)();

      if (now.isAfter(myExpiry)) {
        this.state.duration = 'expired!';
      } else {
        this.state.duration = _moment2.default.duration(myExpiry.diff(now)).humanize();
      }

      this.state.start_date = (0, _moment2.default)(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
      this.state.end_date = (0, _moment2.default)(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();

      this.state.clash_royale_field = true;

      getCommentsCount();
      getNumberofAttendees();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var schedule_game = this.props.props.schedule_game;


      if (this.state.redirect_PlayerList === true) {
        var tmp = '/playerList/' + this.props.props.schedule_game.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
      if (this.state.redirect_Approvals === true) {
        var tmp = '/scheduledGamesApprovals/' + this.props.props.schedule_game.schedule_games_GUID;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      return _react2.default.createElement(
        'div',
        { className: 'padding-container' },
        _react2.default.createElement(
          'div',
          { className: 'grey-container' },
          _react2.default.createElement(
            'div',
            { className: 'update-info' },
            _react2.default.createElement(
              'div',
              { className: 'game-name-display' },
              _react2.default.createElement(
                'h3',
                null,
                ' ',
                schedule_game.game_name,
                ' '
              ),
              this.state.approval_btn && _react2.default.createElement(
                'div',
                {
                  className: 'approval-seal',
                  onClick: this.approvals,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/seal-2512363_small.png\')'
                  } },
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'comments-stats' },
                this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.onChange },
                  ' ',
                  this.state.comment_total > 1 ? this.state.comment_total + ' comments' : this.state.comment_total + ' comment',
                  ' '
                ),
                !this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.focusTextInput },
                  ' ',
                  'No comments'
                )
              ),
              !this.state.myPost && _react2.default.createElement(
                'h6',
                null,
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    to: '/profile/' + schedule_game.user_id,
                    style: { textDecoration: 'none', color: 'white' } },
                  ' ',
                  'Posted by ',
                  schedule_game.alias
                )
              ),
              this.state.myPost && _react2.default.createElement(
                'div',
                {
                  className: 'delete-icon',
                  onClick: function onClick() {
                    _this3.delete_sch(schedule_game.id);
                  } },
                _react2.default.createElement('i', { className: 'fas fa-trash-alt' })
              )
            ),
            _react2.default.createElement(_DeleteScheduleGameModal2.default, {
              bOpen: this.state.bDeleteModalOpen,
              callbackClose: this.callbackPostFileModalClose,
              callbackConfirm: this.callbackPostFileModalConfirm }),
            _react2.default.createElement(
              'div',
              { className: 'expiry-info' },
              'Expiry:\xA0',
              this.state.duration
            ),
            _react2.default.createElement(
              'div',
              { className: 'myFields' },
              this.state.region && _react2.default.createElement(
                'div',
                null,
                ' Region/s: ',
                schedule_game.region,
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'Start Time: ',
                this.state.start_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'End Time: ',
                this.state.end_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              this.state.experience && _react2.default.createElement(
                'div',
                null,
                ' Experience: ',
                schedule_game.experience,
                ' '
              ),
              this.state.platform && _react2.default.createElement(
                'div',
                null,
                ' Platform: ',
                schedule_game.platform,
                ' '
              ),
              this.state.other && _react2.default.createElement(
                'div',
                null,
                ' Other: ',
                schedule_game.other,
                ' '
              ),
              this.state.clash_royale_field && _react2.default.createElement(
                'div',
                null,
                ' ',
                'Royale Trophies: ',
                schedule_game.clash_royale_trophies,
                ' '
              ),
              !this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' Visibility: ',
                this.state.visibility,
                ' '
              ),
              this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' ',
                'Visibility:',
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/scheduledGames/' + schedule_game.id },
                  ' ',
                  this.state.visibility
                ),
                ' ',
                '(Send this link to players inorder to join this game)',
                ' '
              ),
              this.state.description && _react2.default.createElement(
                'div',
                null,
                ' Description: ',
                schedule_game.description,
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'invitation-panel' },
            this.state.show_invite && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text', onClick: function onClick() {
                    return _this3.enrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-dungeon' }),
                '\xA0Join Queue'
              )
            ),
            this.state.show_full && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text2' },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                '\xA0Sorry it\'s',
                ' ',
                _react2.default.createElement(
                  'span',
                  { style: { color: '#f44336' } },
                  '\xA0 full :( '
                )
              )
            ),
            this.state.show_attending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#4CAF50' } },
                  '\xA0Leave game'
                )
              )
            ),
            this.state.show_pending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#2196F3' } },
                  '\xA0Waiting on host...'
                )
              )
            ),
            this.state.show_one_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-one' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[0].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[0].profile_img + '\')'
                } })
            ),
            this.state.show_two_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-two' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[1].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[1].profile_img + '\')'
                } })
            ),
            this.state.show_three_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-three' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[2].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[2].profile_img + '\')'
                } })
            ),
            this.state.show_four_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-four' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[3].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[3].profile_img + '\')'
                } })
            ),
            this.state.show_five_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-five' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[4].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[4].profile_img + '\')'
                } })
            ),
            this.state.show_more_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-more' },
              _react2.default.createElement(
                'div',
                {
                  className: 'user-img',
                  onClick: this.redirect_link,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png\')'
                  } },
                ' '
              )
            ),
            this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              this.state.attendees_count,
              ' out of ',
              schedule_game.limit
            ),
            !this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              'Unlimited'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'compose-comment' },
            _react2.default.createElement('textarea', {
              name: 'name',
              rows: 8,
              cols: 80,
              placeholder: 'Write a comment...',
              value: this.state.value,
              onChange: this.handleChange,
              maxLength: '254',
              onKeyUp: this.detectKey,
              ref: this.setTextInputRef,
              onFocus: this.onFocus
            }),
            _react2.default.createElement(
              'div',
              { className: 'buttons' },
              _react2.default.createElement(
                'div',
                { className: 'repost-btn', onClick: this.insert_comment },
                _react2.default.createElement('i', { className: 'fas fa-reply' }),
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'comments' },
            this.state.show_more_comments && _react2.default.createElement(
              'div',
              { className: 'show-individual-comments' },
              this.showComment()
            )
          )
        )
      );
    }
  }]);
  return ScheduledGamePost_Clash_Royale;
}(_react.Component);

exports.default = ScheduledGamePost_Clash_Royale;

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _IndividualComment = __webpack_require__(48);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _DeleteScheduleGameModal = __webpack_require__(93);

var _DeleteScheduleGameModal2 = _interopRequireDefault(_DeleteScheduleGameModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduledGamePost_Default = function (_Component) {
  (0, _inherits3.default)(ScheduledGamePost_Default, _Component);

  function ScheduledGamePost_Default() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduledGamePost_Default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamePost_Default.__proto__ || Object.getPrototypeOf(ScheduledGamePost_Default)).call(this));

    _this.callbackPostFileModalConfirm = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var mysch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  bDeleteModalOpen: false
                });

                try {
                  mysch = _axios2.default.get('/api/ScheduleGame/delete/' + _this.state.modal_id + '/' + data.value);

                  location.reload();
                } catch (error) {
                  console.log(error);
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

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
      var schedule_game = _this.props.props.schedule_game;


      var getComments = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var myComments;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_games/' + schedule_game.id);

                case 3:
                  myComments = _context2.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: '',
                    comment_total: myComments.data.allComments.length
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref2.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.showComment = function () {
      if (_this.state.myComments != undefined) {
        return _this.state.myComments.map(function (item, index) {
          return _react2.default.createElement(_IndividualComment2.default, {
            comment: item,
            key: index,
            user: _this.props.props.user
          });
        });
      }
    };

    _this.insert_comment = function () {
      var schedule_game = _this.props.props.schedule_game;

      var self = _this;

      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
        });
        return;
      }

      _this.onFocus();

      var saveComment = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var postComment, addPostLike;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.post('/api/comments', {
                    content: self.state.value.trim(),
                    schedule_games_id: schedule_game.id
                  });

                case 3:
                  postComment = _context3.sent;

                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });
                  if (schedule_game.user_id != self.props.props.user.userInfo.id) {
                    addPostLike = _axios2.default.post('/api/notifications/addComment', {
                      other_user_id: schedule_game.user_id,
                      schedule_games_id: schedule_game.id,
                      comment_id: postComment.data.id
                    });
                  }
                  _context3.next = 13;
                  break;

                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 10]]);
        }));

        return function saveComment() {
          return _ref3.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.delete_sch = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        var tmp, all_attendees, mysch;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                tmp = null;
                _context4.prev = 1;
                _context4.next = 4;
                return _axios2.default.get('/api/attendees/attending/' + id);

              case 4:
                all_attendees = _context4.sent;

                if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0) {
                  _this.setState({
                    bDeleteModalOpen: true,
                    modal_id: id
                  });
                } else {
                  if (window.confirm('Are you sure you wish to trash this game boss?')) {
                    mysch = _axios2.default.get('/api/ScheduleGame/delete/' + id + '/' + tmp);

                    location.reload();
                  }
                }
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](1);

                console.log(_context4.t0);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[1, 8]]);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.enrollinGame = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var getNumberofAttendees, savemySpot;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _axios2.default.get('/api/attendees/attending/' + _this.props.props.schedule_game.id);

            case 3:
              getNumberofAttendees = _context5.sent;

              if (_this.props.props.schedule_game.limit == 42 || getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < _this.props.props.schedule_game.limit) {
                savemySpot = _axios2.default.post('/api/attendees/savemySpot', {
                  schedule_games_id: _this.props.props.schedule_game.id,
                  notify: true
                });

                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: false,
                  show_pending: true
                });
              } else {
                window.alert('Sorry mate, the spot got filled up! You are NOT in :(');
                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: true,
                  show_pending: false
                });
              }
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);

              console.log(_context5.t0);

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2, [[0, 7]]);
    }));

    _this.disenrollinGame = function () {
      try {
        var getNumberofAttendees = _axios2.default.get('/api/attendees/removeattending/' + _this.props.props.schedule_game.id);
        _this.setState({
          show_invite: true,
          show_attending: false,
          show_full: false,
          show_pending: false
        });

        var no_vacany = _axios2.default.post('/api/ScheduleGame/update_vacany/', {
          vacancy: true,
          id: _this.props.props.schedule_game.id
        });
      } catch (error) {
        console.log(error);
      }
    };

    _this.redirect_link = function () {
      _this.setState({ redirect_PlayerList: true });
    };

    _this.approvals = function () {
      _this.setState({ redirect_Approvals: true });
    };

    _this.state = {
      show_more_comments: false,
      pull_once: true,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      approval_btn: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: true,
      show_full: false,
      show_attending: false,
      show_pending: false,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
      bDeleteModalOpen: false,
      modal_id: 0,
      visibility_hidden_lnk: false,
      show_region: false,
      show_experience: false,
      show_platform: false,
      show_description: false,
      show_other: false,
      visibility: 'Public',
      duration: '',
      start_date: (0, _moment2.default)(),
      end_date: (0, _moment2.default)(),
      redirect_Approvals: false,
      redirect_PlayerList: false
    };

    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);

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

  (0, _createClass3.default)(ScheduledGamePost_Default, [{
    key: 'callbackPostFileModalClose',
    value: function callbackPostFileModalClose() {
      this.setState({
        bDeleteModalOpen: false
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var schedule_game = this.props.props.schedule_game;


      var getCommentsCount = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var myCommentsCount;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_gamesCount/' + schedule_game.id);

                case 3:
                  myCommentsCount = _context6.sent;

                  if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
                    self.state.zero_comments = true;
                    self.state.comment_total = myCommentsCount.data.no_of_comments[0].no_of_comments;
                  }
                  _context6.next = 10;
                  break;

                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6['catch'](0);

                  console.log(_context6.t0);

                case 10:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 7]]);
        }));

        return function getCommentsCount() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getNumberofAttendees = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var getwhoisAttending, i, get_if_im_Attending, _getNumberofAttendees;

          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _axios2.default.get('/api/attendees/role_call/' + schedule_game.id);

                case 3:
                  getwhoisAttending = _context7.sent;
                  i = 0;

                case 5:
                  if (!(i < getwhoisAttending.data.role_call.length)) {
                    _context7.next = 25;
                    break;
                  }

                  self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i]);
                  _context7.t0 = i;
                  _context7.next = _context7.t0 === 0 ? 10 : _context7.t0 === 1 ? 12 : _context7.t0 === 2 ? 14 : _context7.t0 === 3 ? 16 : _context7.t0 === 4 ? 18 : _context7.t0 === 5 ? 20 : 22;
                  break;

                case 10:
                  self.state.show_one_profile = true;
                  return _context7.abrupt('break', 22);

                case 12:
                  self.state.show_two_profile = true;
                  return _context7.abrupt('break', 22);

                case 14:
                  self.state.show_three_profile = true;
                  return _context7.abrupt('break', 22);

                case 16:
                  self.state.show_four_profile = true;
                  return _context7.abrupt('break', 22);

                case 18:
                  self.state.show_five_profile = true;
                  return _context7.abrupt('break', 22);

                case 20:
                  self.state.show_more_profile = true;
                  return _context7.abrupt('break', 22);

                case 22:
                  i++;
                  _context7.next = 5;
                  break;

                case 25:
                  _context7.next = 27;
                  return _axios2.default.get('/api/attendees/myattendance/' + schedule_game.id);

                case 27:
                  get_if_im_Attending = _context7.sent;

                  if (get_if_im_Attending.data.myattendance.length == 0) {
                    //You're not approved or pending
                    self.state.show_attending = false;
                    self.state.show_invite = true;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 1) {
                    // You're approved
                    self.state.show_attending = true;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 3) {
                    //You're pending
                    self.state.show_attending = false;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = true;
                  }

                  if (!(schedule_game.limit != 42)) {
                    _context7.next = 35;
                    break;
                  }

                  //If its not an unlimited game
                  self.state.show_attendees = true; //Display the count ie 1 of 5
                  _context7.next = 33;
                  return _axios2.default.get('/api/attendees/attending/' + schedule_game.id);

                case 33:
                  _getNumberofAttendees = _context7.sent;
                  //Get the total
                  if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0) {
                    self.state.attendees_count = _getNumberofAttendees.data.allAttendees[0].no_of_allAttendees;
                    if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees >= schedule_game.limit) {
                      self.state.show_attending = false;
                      self.state.show_invite = false;
                      self.state.show_full = true;
                      self.state.show_pending = false;
                    }
                  }

                case 35:
                  _context7.next = 40;
                  break;

                case 37:
                  _context7.prev = 37;
                  _context7.t1 = _context7['catch'](0);

                  console.log(_context7.t1);

                case 40:
                  self.forceUpdate();

                case 41:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 37]]);
        }));

        return function getNumberofAttendees() {
          return _ref7.apply(this, arguments);
        };
      }();

      if (schedule_game.visibility == 4) {
        this.state.visibility_hidden_lnk = true;
      }

      if (this.props.props != undefined) {
        if (this.props.props.props != undefined) {
          if (this.props.props.props.match.params.id != undefined && this.props.props.props.match.params.id != '' && this.props.props.show_single == true) {
            this.onChange();
          }
        }
      }

      if (this.props != undefined) {
        if (this.props.props.user != undefined) {
          if (this.props.props.user.userInfo != undefined) {
            if (this.props.props.user.userInfo.id == schedule_game.user_id) {
              this.state.myPost = true;
              this.state.approval_btn = true;
            }
          }
        }
      }

      if (schedule_game.region != '' && schedule_game.region != null) {
        this.state.show_region = true;
      }
      if (schedule_game.experience != '' && schedule_game.experience != null) {
        this.state.show_experience = true;
      }
      if (schedule_game.platform != '' && schedule_game.platform != null) {
        this.state.show_platform = true;
      }
      if (schedule_game.description != '' && schedule_game.description != null) {
        this.state.show_description = true;
      }
      if (schedule_game.other != '' && schedule_game.other != null) {
        this.state.show_other = true;
      }

      switch (schedule_game.visibility) {
        case 1:
          this.state.visibility = 'Public';
          break;
        case 2:
          this.state.visibility = 'Friends';
          break;
        case 3:
          this.state.visibility = 'Group';
          break;
        case 4:
          this.state.visibility = 'Hidden';
          break;
      }

      var myExpiry = (0, _moment2.default)(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ');
      var now = (0, _moment2.default)();

      if (now.isAfter(myExpiry)) {
        this.state.duration = 'expired!';
      } else {
        this.state.duration = _moment2.default.duration(myExpiry.diff(now)).humanize();
      }

      this.state.start_date = (0, _moment2.default)(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
      this.state.end_date = (0, _moment2.default)(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();

      getCommentsCount();
      getNumberofAttendees();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var schedule_game = this.props.props.schedule_game;


      if (this.state.redirect_PlayerList === true) {
        var tmp = '/playerList/' + this.props.props.schedule_game.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
      if (this.state.redirect_Approvals === true) {
        var tmp = '/scheduledGamesApprovals/' + this.props.props.schedule_game.schedule_games_GUID;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      return _react2.default.createElement(
        'div',
        { className: 'padding-container' },
        _react2.default.createElement(
          'div',
          { className: 'grey-container' },
          _react2.default.createElement(
            'div',
            { className: 'update-info' },
            _react2.default.createElement(
              'div',
              { className: 'game-name-display' },
              _react2.default.createElement(
                'h3',
                null,
                ' ',
                schedule_game.game_name,
                ' '
              ),
              this.state.approval_btn && _react2.default.createElement(
                'div',
                {
                  className: 'approval-seal',
                  onClick: this.approvals,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/seal-2512363_small.png\')'
                  } },
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'comments-stats' },
                this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.onChange },
                  ' ',
                  this.state.comment_total > 1 ? this.state.comment_total + ' comments' : this.state.comment_total + ' comment',
                  ' '
                ),
                !this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.focusTextInput },
                  ' ',
                  'No comments'
                )
              ),
              !this.state.myPost && _react2.default.createElement(
                'h6',
                null,
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    to: '/profile/' + schedule_game.user_id,
                    style: { textDecoration: 'none', color: 'white' } },
                  ' ',
                  'Posted by ',
                  schedule_game.alias
                )
              ),
              this.state.myPost && _react2.default.createElement(
                'div',
                {
                  className: 'delete-icon',
                  onClick: function onClick() {
                    _this3.delete_sch(schedule_game.id);
                  } },
                _react2.default.createElement('i', { className: 'fas fa-trash-alt' })
              )
            ),
            _react2.default.createElement(_DeleteScheduleGameModal2.default, {
              bOpen: this.state.bDeleteModalOpen,
              callbackClose: this.callbackPostFileModalClose,
              callbackConfirm: this.callbackPostFileModalConfirm }),
            _react2.default.createElement(
              'div',
              { className: 'expiry-info' },
              'Expiry:\xA0',
              this.state.duration
            ),
            _react2.default.createElement(
              'div',
              { className: 'myFields' },
              this.state.region && _react2.default.createElement(
                'div',
                null,
                ' Region/s: ',
                schedule_game.region,
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'Start Time: ',
                this.state.start_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'End Time: ',
                this.state.end_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              this.state.experience && _react2.default.createElement(
                'div',
                null,
                ' Experience: ',
                schedule_game.experience,
                ' '
              ),
              this.state.platform && _react2.default.createElement(
                'div',
                null,
                ' Platform: ',
                schedule_game.platform,
                ' '
              ),
              this.state.other && _react2.default.createElement(
                'div',
                null,
                ' Other: ',
                schedule_game.other,
                ' '
              ),
              !this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' Visibility: ',
                this.state.visibility,
                ' '
              ),
              this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' ',
                'Visibility:',
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/scheduledGames/' + schedule_game.id },
                  ' ',
                  this.state.visibility
                ),
                ' ',
                '(Send this link to players inorder to join this game)',
                ' '
              ),
              this.state.description && _react2.default.createElement(
                'div',
                null,
                ' Description: ',
                schedule_game.description,
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'invitation-panel' },
            this.state.show_invite && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text', onClick: function onClick() {
                    return _this3.enrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-dungeon' }),
                '\xA0Join Queue'
              )
            ),
            this.state.show_full && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text2' },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                '\xA0Sorry it\'s',
                ' ',
                _react2.default.createElement(
                  'span',
                  { style: { color: '#f44336' } },
                  '\xA0 full :( '
                )
              )
            ),
            this.state.show_attending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#4CAF50' } },
                  '\xA0Leave game'
                )
              )
            ),
            this.state.show_pending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#2196F3' } },
                  '\xA0Waiting on host...'
                )
              )
            ),
            this.state.show_one_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-one' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[0].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[0].profile_img + '\')'
                } })
            ),
            this.state.show_two_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-two' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[1].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[1].profile_img + '\')'
                } })
            ),
            this.state.show_three_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-three' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[2].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[2].profile_img + '\')'
                } })
            ),
            this.state.show_four_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-four' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[3].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[3].profile_img + '\')'
                } })
            ),
            this.state.show_five_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-five' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[4].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[4].profile_img + '\')'
                } })
            ),
            this.state.show_more_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-more' },
              _react2.default.createElement(
                'div',
                {
                  className: 'user-img',
                  onClick: this.redirect_link,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png\')'
                  } },
                ' '
              )
            ),
            this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              this.state.attendees_count,
              ' out of ',
              schedule_game.limit
            ),
            !this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              'Unlimited'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'compose-comment' },
            _react2.default.createElement('textarea', {
              name: 'name',
              rows: 8,
              cols: 80,
              placeholder: 'Write a comment...',
              value: this.state.value,
              onChange: this.handleChange,
              maxLength: '254',
              onKeyUp: this.detectKey,
              ref: this.setTextInputRef,
              onFocus: this.onFocus
            }),
            _react2.default.createElement(
              'div',
              { className: 'buttons' },
              _react2.default.createElement(
                'div',
                { className: 'repost-btn', onClick: this.insert_comment },
                _react2.default.createElement('i', { className: 'fas fa-reply' }),
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'comments' },
            this.state.show_more_comments && _react2.default.createElement(
              'div',
              { className: 'show-individual-comments' },
              this.showComment()
            )
          )
        )
      );
    }
  }]);
  return ScheduledGamePost_Default;
}(_react.Component);

exports.default = ScheduledGamePost_Default;

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactRouter = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _IndividualComment = __webpack_require__(48);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _DeleteScheduleGameModal = __webpack_require__(93);

var _DeleteScheduleGameModal2 = _interopRequireDefault(_DeleteScheduleGameModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOption = function createOption(label, value) {
  return {
    label: label,
    value: value
  };
};

var ScheduledGamePost_Dota2 = function (_Component) {
  (0, _inherits3.default)(ScheduledGamePost_Dota2, _Component);

  function ScheduledGamePost_Dota2() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ScheduledGamePost_Dota2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamePost_Dota2.__proto__ || Object.getPrototypeOf(ScheduledGamePost_Dota2)).call(this));

    _this.callbackPostFileModalConfirm = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var mysch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  bDeleteModalOpen: false
                });

                try {
                  mysch = _axios2.default.get('/api/ScheduleGame/delete/' + _this.state.modal_id + '/' + data.value);

                  location.reload();
                } catch (error) {
                  console.log(error);
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

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

    _this.handleChange_dota2_roles = function (dota2_roles_box) {
      _this.setState({ dota2_roles_box: dota2_roles_box });
    };

    _this.onChange = function () {
      var tmpState = _this.state.show_more_comments;

      if (!_this.state.show_more_comments) {
        _this.pullComments();
      }
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
      var schedule_game = _this.props.props.schedule_game;


      var getComments = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var myComments;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_games/' + schedule_game.id);

                case 3:
                  myComments = _context2.sent;

                  self.setState({
                    myComments: myComments.data.allComments,
                    value: '',
                    comment_total: myComments.data.allComments.length
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function getComments() {
          return _ref2.apply(this, arguments);
        };
      }();
      getComments();
    };

    _this.showComment = function () {
      if (_this.state.myComments != undefined) {
        return _this.state.myComments.map(function (item, index) {
          return _react2.default.createElement(_IndividualComment2.default, {
            comment: item,
            key: index,
            user: _this.props.props.user
          });
        });
      }
    };

    _this.insert_comment = function () {
      var schedule_game = _this.props.props.schedule_game;

      var self = _this;

      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
        });
        return;
      }

      _this.onFocus();

      var saveComment = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var postComment, addPostLike;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.post('/api/comments', {
                    content: self.state.value.trim(),
                    schedule_games_id: schedule_game.id
                  });

                case 3:
                  postComment = _context3.sent;

                  self.setState({
                    myComments: []
                  });
                  self.pullComments();
                  self.setState({
                    comment_total: self.state.comment_total + 1,
                    zero_comments: true
                  });
                  if (schedule_game.user_id != self.props.props.user.userInfo.id) {
                    addPostLike = _axios2.default.post('/api/notifications/addComment', {
                      other_user_id: schedule_game.user_id,
                      schedule_games_id: schedule_game.id,
                      comment_id: postComment.data.id
                    });
                  }
                  _context3.next = 13;
                  break;

                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 10]]);
        }));

        return function saveComment() {
          return _ref3.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.delete_sch = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        var tmp, all_attendees, mysch;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                tmp = null;
                _context4.prev = 1;
                _context4.next = 4;
                return _axios2.default.get('/api/attendees/attending/' + id);

              case 4:
                all_attendees = _context4.sent;

                if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0) {
                  _this.setState({
                    bDeleteModalOpen: true,
                    modal_id: id
                  });
                } else {
                  if (window.confirm('Are you sure you wish to trash this game boss?')) {
                    mysch = _axios2.default.get('/api/ScheduleGame/delete/' + id + '/' + tmp);

                    location.reload();
                  }
                }
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](1);

                console.log(_context4.t0);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[1, 8]]);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.enrollinGame = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var myDota2_roles, i, getNumberofAttendees, savemySpot;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              myDota2_roles = '';

              if (!_this.state.show_Dota_2_roles_selector) {
                _context5.next = 25;
                break;
              }

              if (!(_this.state.dota2_roles_box != '' && _this.state.dota2_roles_box != null)) {
                _context5.next = 23;
                break;
              }

              i = 0;

            case 4:
              if (!(i < _this.state.dota2_roles_box.length)) {
                _context5.next = 21;
                break;
              }

              _context5.t0 = _this.state.dota2_roles_box[i].value;
              _context5.next = _context5.t0 === 1 ? 8 : _context5.t0 === 2 ? 10 : _context5.t0 === 3 ? 12 : _context5.t0 === 4 ? 14 : _context5.t0 === 5 ? 16 : 18;
              break;

            case 8:
              _this.state.show_dota_2_pos_one = true;
              return _context5.abrupt('break', 18);

            case 10:
              _this.state.show_dota_2_pos_two = true;
              return _context5.abrupt('break', 18);

            case 12:
              _this.state.show_dota_2_pos_three = true;
              return _context5.abrupt('break', 18);

            case 14:
              _this.state.show_dota_2_pos_four = true;
              return _context5.abrupt('break', 18);

            case 16:
              _this.state.show_dota_2_pos_five = true;
              return _context5.abrupt('break', 18);

            case 18:
              i++;
              _context5.next = 4;
              break;

            case 21:
              _context5.next = 25;
              break;

            case 23:
              window.alert('Sorry mate, you need to select a role');
              return _context5.abrupt('return');

            case 25:
              _context5.prev = 25;
              _context5.next = 28;
              return _axios2.default.get('/api/attendees/attending/' + _this.props.props.schedule_game.id);

            case 28:
              getNumberofAttendees = _context5.sent;

              if (_this.props.props.schedule_game.limit == 42 || getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < _this.props.props.schedule_game.limit) {
                savemySpot = _axios2.default.post('/api/attendees/savemySpot', {
                  schedule_games_id: _this.props.props.schedule_game.id,
                  dota_2_position_one: _this.state.show_dota_2_pos_one,
                  dota_2_position_two: _this.state.show_dota_2_pos_two,
                  dota_2_position_three: _this.state.show_dota_2_pos_three,
                  dota_2_position_four: _this.state.show_dota_2_pos_four,
                  dota_2_position_five: _this.state.show_dota_2_pos_five,
                  notify: true
                });

                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: false,
                  show_pending: true
                });
              } else {
                window.alert('Sorry mate, the spot got filled up! You are NOT in :(');
                _this.setState({
                  show_invite: false,
                  show_attending: false,
                  show_full: true,
                  show_pending: false
                });
              }
              _context5.next = 35;
              break;

            case 32:
              _context5.prev = 32;
              _context5.t1 = _context5['catch'](25);

              console.log(_context5.t1);

            case 35:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2, [[25, 32]]);
    }));

    _this.disenrollinGame = function () {
      try {
        var getNumberofAttendees = _axios2.default.get('/api/attendees/removeattending/' + _this.props.props.schedule_game.id);
        _this.setState({
          show_invite: true,
          show_attending: false,
          show_full: false,
          show_pending: false
        });

        var no_vacany = _axios2.default.post('/api/ScheduleGame/update_vacany/', {
          vacancy: true,
          id: _this.props.props.schedule_game.id
        });
      } catch (error) {
        console.log(error);
      }
      _this.state.show_dota_2_pos_one = false;
      _this.state.show_dota_2_pos_two = false;
      _this.state.show_dota_2_pos_three = false;
      _this.state.show_dota_2_pos_four = false;
      _this.state.show_dota_2_pos_five = false;
    };

    _this.redirect_link = function () {
      _this.setState({ redirect_PlayerList: true });
    };

    _this.approvals = function () {
      _this.setState({ redirect_Approvals: true });
    };

    _this.state = {
      show_more_comments: false,
      pull_once: true,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      approval_btn: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: true,
      show_full: false,
      show_attending: false,
      show_pending: false,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
      bDeleteModalOpen: false,
      modal_id: 0,
      visibility_hidden_lnk: false,
      show_region: false,
      show_experience: false,
      show_platform: false,
      show_description: false,
      show_other: false,
      visibility: 'Public',
      duration: '',
      start_date: (0, _moment2.default)(),
      end_date: (0, _moment2.default)(),
      redirect_Approvals: false,
      redirect_PlayerList: false,
      show_Dota_2_roles_selector: false,
      dota_2_roles_selector: [],
      dota2_roles_box: null,
      show_dota_2_position: false,
      dota_2_position: 'Pos: ',
      show_dota_2_pos_one: false,
      show_dota_2_pos_two: false,
      show_dota_2_pos_three: false,
      show_dota_2_pos_four: false,
      show_dota_2_pos_five: false,
      dota_2_pos_one_count: 0,
      dota_2_pos_two_count: 0,
      dota_2_pos_three_count: 0,
      dota_2_pos_four_count: 0,
      dota_2_pos_five_count: 0,
      show_dota2_medal_ranks: false,
      show_dota2_server_regions: false,
      show_dota2_roles: false
    };

    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);

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

  (0, _createClass3.default)(ScheduledGamePost_Dota2, [{
    key: 'callbackPostFileModalClose',
    value: function callbackPostFileModalClose() {
      this.setState({
        bDeleteModalOpen: false
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var schedule_game = this.props.props.schedule_game;


      var getCommentsCount = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var myCommentsCount;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get('/api/comments/scheduled_gamesCount/' + schedule_game.id);

                case 3:
                  myCommentsCount = _context6.sent;

                  if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
                    self.state.zero_comments = true;
                    self.state.comment_total = myCommentsCount.data.no_of_comments[0].no_of_comments;
                  }
                  _context6.next = 10;
                  break;

                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6['catch'](0);

                  console.log(_context6.t0);

                case 10:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 7]]);
        }));

        return function getCommentsCount() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getNumberofAttendees = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var getwhoisAttending, i, get_if_im_Attending, getmyDota2Position, _getNumberofAttendees;

          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _axios2.default.get('/api/attendees/role_call/' + schedule_game.id);

                case 3:
                  getwhoisAttending = _context7.sent;
                  i = 0;

                case 5:
                  if (!(i < getwhoisAttending.data.role_call.length)) {
                    _context7.next = 25;
                    break;
                  }

                  self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i]);
                  _context7.t0 = i;
                  _context7.next = _context7.t0 === 0 ? 10 : _context7.t0 === 1 ? 12 : _context7.t0 === 2 ? 14 : _context7.t0 === 3 ? 16 : _context7.t0 === 4 ? 18 : _context7.t0 === 5 ? 20 : 22;
                  break;

                case 10:
                  self.state.show_one_profile = true;
                  return _context7.abrupt('break', 22);

                case 12:
                  self.state.show_two_profile = true;
                  return _context7.abrupt('break', 22);

                case 14:
                  self.state.show_three_profile = true;
                  return _context7.abrupt('break', 22);

                case 16:
                  self.state.show_four_profile = true;
                  return _context7.abrupt('break', 22);

                case 18:
                  self.state.show_five_profile = true;
                  return _context7.abrupt('break', 22);

                case 20:
                  self.state.show_more_profile = true;
                  return _context7.abrupt('break', 22);

                case 22:
                  i++;
                  _context7.next = 5;
                  break;

                case 25:
                  _context7.next = 27;
                  return _axios2.default.get('/api/attendees/myattendance/' + schedule_game.id);

                case 27:
                  get_if_im_Attending = _context7.sent;

                  if (get_if_im_Attending.data.myattendance.length == 0) {
                    //You're not approved or pending
                    self.state.show_attending = false;
                    self.state.show_invite = true;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 1) {
                    // You're approved
                    self.state.show_attending = true;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = false;
                  } else if (get_if_im_Attending.data.myattendance[0].type == 3) {
                    //You're pending
                    self.state.show_attending = false;
                    self.state.show_invite = false;
                    self.state.show_full = false;
                    self.state.show_pending = true;
                  }

                  _context7.next = 31;
                  return _axios2.default.get('/api/attendees/game_positions/' + schedule_game.id);

                case 31:
                  getmyDota2Position = _context7.sent;

                  if (getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones != 0) {
                    self.state.show_dota_2_pos_one = true;
                    self.state.show_dota_2_position = true;
                    self.state.dota_2_pos_one_count = getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones;
                  }
                  if (getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos != 0) {
                    self.state.show_dota_2_pos_two = true;
                    self.state.show_dota_2_position = true;
                    self.state.dota_2_pos_two_count = getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos;
                  }
                  if (getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes != 0) {
                    self.state.show_dota_2_pos_three = true;
                    self.state.show_dota_2_position = true;
                    self.state.dota_2_pos_three_count = getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes;
                  }
                  if (getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours != 0) {
                    self.state.show_dota_2_pos_four = true;
                    self.state.show_dota_2_position = true;
                    self.state.dota_2_pos_four_count = getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours;
                  }
                  if (getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives != 0) {
                    self.state.show_dota_2_pos_five = true;
                    self.state.show_dota_2_position = true;
                    self.state.dota_2_pos_five_count = getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives;
                  }

                  if (!(schedule_game.limit != 42)) {
                    _context7.next = 43;
                    break;
                  }

                  //If its not an unlimited game
                  self.state.show_attendees = true; //Display the count ie 1 of 5
                  _context7.next = 41;
                  return _axios2.default.get('/api/attendees/attending/' + schedule_game.id);

                case 41:
                  _getNumberofAttendees = _context7.sent;
                  //Get the total
                  if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0) {
                    self.state.attendees_count = _getNumberofAttendees.data.allAttendees[0].no_of_allAttendees;
                    if (_getNumberofAttendees.data.allAttendees[0].no_of_allAttendees >= schedule_game.limit) {
                      self.state.show_attending = false;
                      self.state.show_invite = false;
                      self.state.show_full = true;
                      self.state.show_pending = false;
                    }
                  }

                case 43:
                  _context7.next = 48;
                  break;

                case 45:
                  _context7.prev = 45;
                  _context7.t1 = _context7['catch'](0);

                  console.log(_context7.t1);

                case 48:
                  self.forceUpdate();

                case 49:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 45]]);
        }));

        return function getNumberofAttendees() {
          return _ref7.apply(this, arguments);
        };
      }();

      if (schedule_game.visibility == 4) {
        this.state.visibility_hidden_lnk = true;
      }

      if (this.props.props != undefined) {
        if (this.props.props.props != undefined) {
          if (this.props.props.props.match.params.id != undefined && this.props.props.props.match.params.id != '' && this.props.props.show_single == true) {
            this.onChange();
          }
        }
      }

      if (this.props != undefined) {
        if (this.props.props.user != undefined) {
          if (this.props.props.user.userInfo != undefined) {
            if (this.props.props.user.userInfo.id == schedule_game.user_id) {
              this.state.myPost = true;
              this.state.approval_btn = true;
            }
          }
        }
      }

      if (schedule_game.region != '' && schedule_game.region != null) {
        this.state.show_region = true;
      }
      if (schedule_game.experience != '' && schedule_game.experience != null) {
        this.state.show_experience = true;
      }
      if (schedule_game.platform != '' && schedule_game.platform != null) {
        this.state.show_platform = true;
      }
      if (schedule_game.description != '' && schedule_game.description != null) {
        this.state.show_description = true;
      }
      if (schedule_game.other != '' && schedule_game.other != null) {
        this.state.show_other = true;
      }

      switch (schedule_game.visibility) {
        case 1:
          this.state.visibility = 'Public';
          break;
        case 2:
          this.state.visibility = 'Friends';
          break;
        case 3:
          this.state.visibility = 'Group';
          break;
        case 4:
          this.state.visibility = 'Hidden';
          break;
      }

      var myExpiry = (0, _moment2.default)(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ');
      var now = (0, _moment2.default)();

      if (now.isAfter(myExpiry)) {
        this.state.duration = 'expired!';
      } else {
        this.state.duration = _moment2.default.duration(myExpiry.diff(now)).humanize();
      }

      this.state.start_date = (0, _moment2.default)(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();
      this.state.end_date = (0, _moment2.default)(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local();

      if (schedule_game.dota2_roles != null && schedule_game.dota2_roles != '') {
        this.state.show_Dota_2_roles_selector = true;
        var arrRoles = '';
        var tmp = [];

        arrRoles = schedule_game.dota2_roles.split(',');
        var tmp_str = '';
        for (var i = 0; i < arrRoles.length; i++) {
          var value = 1;
          switch (arrRoles[i].trim()) {
            case 'Position 1':
              value = 1;
              tmp_str = 'Pos 1';
              break;
            case 'Position 2':
              value = 2;
              tmp_str = 'Pos 2';
              break;
            case 'Position 3':
              value = 3;
              tmp_str = 'Pos 3';
              break;
            case 'Position 4':
              value = 4;
              tmp_str = 'Pos 4';
              break;
            case 'Position 5':
              value = 5;
              tmp_str = 'Pos 5';
              break;
          }
          var newOption = createOption(tmp_str, value);
          tmp.push(newOption);
        }
        this.setState({ dota_2_roles_selector: tmp });
      }

      if (schedule_game.dota2_medal_ranks != '' && schedule_game.dota2_medal_ranks != null) {
        this.state.show_dota2_medal_ranks = true;
      }
      if (schedule_game.dota2_server_regions != '' && schedule_game.dota2_server_regions != null) {
        this.state.show_dota2_server_regions = true;
      }
      if (schedule_game.dota2_roles != '' && schedule_game.dota2_roles != null) {
        this.state.show_dota2_roles = true;
      }

      getCommentsCount();
      getNumberofAttendees();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var schedule_game = this.props.props.schedule_game;


      if (this.state.redirect_PlayerList === true) {
        var tmp = '/playerList/' + this.props.props.schedule_game.id;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }
      if (this.state.redirect_Approvals === true) {
        var tmp = '/scheduledGamesApprovals/' + this.props.props.schedule_game.schedule_games_GUID;
        return _react2.default.createElement(_reactRouter.Redirect, { push: true, to: tmp });
      }

      return _react2.default.createElement(
        'div',
        { className: 'padding-container' },
        _react2.default.createElement(
          'div',
          { className: 'grey-container' },
          _react2.default.createElement(
            'div',
            { className: 'update-info' },
            _react2.default.createElement(
              'div',
              { className: 'game-name-display' },
              _react2.default.createElement(
                'h3',
                null,
                ' ',
                schedule_game.game_name,
                ' '
              ),
              this.state.approval_btn && _react2.default.createElement(
                'div',
                {
                  className: 'approval-seal',
                  onClick: this.approvals,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/seal-2512363_small.png\')'
                  } },
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'comments-stats' },
                this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.onChange },
                  ' ',
                  this.state.comment_total > 1 ? this.state.comment_total + ' comments' : this.state.comment_total + ' comment',
                  ' '
                ),
                !this.state.zero_comments && _react2.default.createElement(
                  'div',
                  { className: 'comments-statz', onClick: this.focusTextInput },
                  ' ',
                  'No comments'
                )
              ),
              !this.state.myPost && _react2.default.createElement(
                'h6',
                null,
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    to: '/profile/' + schedule_game.user_id,
                    style: { textDecoration: 'none', color: 'white' } },
                  ' ',
                  'Posted by ',
                  schedule_game.alias
                )
              ),
              this.state.myPost && _react2.default.createElement(
                'div',
                {
                  className: 'delete-icon',
                  onClick: function onClick() {
                    _this3.delete_sch(schedule_game.id);
                  } },
                _react2.default.createElement('i', { className: 'fas fa-trash-alt' })
              )
            ),
            _react2.default.createElement(_DeleteScheduleGameModal2.default, {
              bOpen: this.state.bDeleteModalOpen,
              callbackClose: this.callbackPostFileModalClose,
              callbackConfirm: this.callbackPostFileModalConfirm }),
            _react2.default.createElement(
              'div',
              { className: 'expiry-info' },
              'Expiry:\xA0',
              this.state.duration
            ),
            _react2.default.createElement(
              'div',
              { className: 'myFields' },
              this.state.region && _react2.default.createElement(
                'div',
                null,
                ' Region/s: ',
                schedule_game.region,
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'Start Time: ',
                this.state.start_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                'End Time: ',
                this.state.end_date.format('Do MMM YY, h:mm a'),
                ' '
              ),
              this.state.experience && _react2.default.createElement(
                'div',
                null,
                ' Experience: ',
                schedule_game.experience,
                ' '
              ),
              this.state.platform && _react2.default.createElement(
                'div',
                null,
                ' Platform: ',
                schedule_game.platform,
                ' '
              ),
              this.state.other && _react2.default.createElement(
                'div',
                null,
                ' Other: ',
                schedule_game.other,
                ' '
              ),
              this.state.show_dota2_medal_ranks && _react2.default.createElement(
                'div',
                null,
                'Medal Ranks: ',
                schedule_game.dota2_medal_ranks,
                ' '
              ),
              this.state.show_dota2_server_regions && _react2.default.createElement(
                'div',
                null,
                'Server Regions: ',
                schedule_game.dota2_server_regions,
                ' '
              ),
              this.state.show_dota2_roles && _react2.default.createElement(
                'div',
                null,
                'Roles: ',
                schedule_game.dota2_roles,
                ' '
              ),
              !this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' Visibility: ',
                this.state.visibility,
                ' '
              ),
              this.state.visibility_hidden_lnk && _react2.default.createElement(
                'div',
                null,
                ' ',
                'Visibility:',
                ' ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/scheduledGames/' + schedule_game.id },
                  ' ',
                  this.state.visibility
                ),
                ' ',
                '(Send this link to players inorder to join this game)',
                ' '
              ),
              this.state.description && _react2.default.createElement(
                'div',
                null,
                ' Description: ',
                schedule_game.description,
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'invitation-panel' },
            this.state.show_invite && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text', onClick: function onClick() {
                    return _this3.enrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-dungeon' }),
                '\xA0Join Queue'
              ),
              this.state.show_Dota_2_roles_selector && _react2.default.createElement(
                'div',
                { className: 'dota2-roles' },
                _react2.default.createElement(_reactSelect2.default, {
                  onChange: this.handleChange_dota2_roles,
                  options: this.state.dota_2_roles_selector,
                  className: 'dota2-roles-box',
                  placeholder: 'Select Role/s',
                  isClearable: true,
                  isMulti: true
                })
              )
            ),
            this.state.show_full && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                { className: 'hack-text2' },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                '\xA0Sorry it\'s',
                ' ',
                _react2.default.createElement(
                  'span',
                  { style: { color: '#f44336' } },
                  '\xA0 full :( '
                )
              )
            ),
            this.state.show_attending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#4CAF50' } },
                  '\xA0Leave game'
                )
              )
            ),
            this.state.show_pending && _react2.default.createElement(
              'div',
              { className: 'invitation-link' },
              _react2.default.createElement(
                'div',
                {
                  className: 'hack-text3',
                  onClick: function onClick() {
                    if (window.confirm('Are you sure you wish to remove yourself from this Game?')) _this3.disenrollinGame();
                  } },
                _react2.default.createElement('i', { className: 'fas fa-door-closed' }),
                _react2.default.createElement(
                  'span',
                  { style: { color: '#2196F3' } },
                  '\xA0Waiting on host...'
                )
              )
            ),
            this.state.show_dota_2_position && _react2.default.createElement(
              'div',
              { className: 'dota2-roles-answers' },
              this.state.dota_2_position,
              this.state.show_dota_2_pos_one && _react2.default.createElement(
                'div',
                { className: 'dota_2_position_one_text' },
                ' ',
                '1',
                _react2.default.createElement(
                  'div',
                  {
                    className: 'noti-number ' + (this.state.dota_2_pos_one_count > 0 ? 'active' : '') },
                  ' ',
                  this.state.dota_2_pos_one_count
                ),
                ' '
              ),
              this.state.show_dota_2_pos_one && this.state.show_dota_2_pos_two && _react2.default.createElement(
                'div',
                { className: 'dot-sep' },
                ','
              ),
              this.state.show_dota_2_pos_two && _react2.default.createElement(
                'div',
                { className: 'dota_2_position_two_text' },
                ' ',
                '2',
                _react2.default.createElement(
                  'div',
                  {
                    className: 'noti-number ' + (this.state.dota_2_pos_two_count > 0 ? 'active' : '') },
                  ' ',
                  this.state.dota_2_pos_two_count
                )
              ),
              (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two) && this.state.show_dota_2_pos_three && _react2.default.createElement(
                'div',
                { className: 'dot-sep' },
                ','
              ),
              this.state.show_dota_2_pos_three && _react2.default.createElement(
                'div',
                { className: 'dota_2_position_three_text' },
                ' ',
                '3',
                _react2.default.createElement(
                  'div',
                  {
                    className: 'noti-number ' + (this.state.dota_2_pos_three_count > 0 ? 'active' : '') },
                  ' ',
                  this.state.dota_2_pos_three_count
                ),
                ' '
              ),
              (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three) && this.state.show_dota_2_pos_four && _react2.default.createElement(
                'div',
                { className: 'dot-sep' },
                ','
              ),
              this.state.show_dota_2_pos_four && _react2.default.createElement(
                'div',
                { className: 'dota_2_position_four_text' },
                ' ',
                '4',
                _react2.default.createElement(
                  'div',
                  {
                    className: 'noti-number ' + (this.state.dota_2_pos_four_count > 0 ? 'active' : '') },
                  ' ',
                  this.state.dota_2_pos_four_count
                ),
                ' '
              ),
              (this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three || this.state.show_dota_2_pos_four) && this.state.show_dota_2_pos_five && _react2.default.createElement(
                'div',
                { className: 'dot-sep' },
                ','
              ),
              this.state.show_dota_2_pos_five && _react2.default.createElement(
                'div',
                { className: 'dota_2_position_five_text' },
                ' ',
                '5',
                _react2.default.createElement(
                  'div',
                  {
                    className: 'noti-number ' + (this.state.dota_2_pos_five_count > 0 ? 'active' : '') },
                  ' ',
                  this.state.dota_2_pos_five_count
                )
              )
            ),
            this.state.show_one_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-one' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[0].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[0].profile_img + '\')'
                } })
            ),
            this.state.show_two_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-two' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[1].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[1].profile_img + '\')'
                } })
            ),
            this.state.show_three_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-three' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[2].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[2].profile_img + '\')'
                } })
            ),
            this.state.show_four_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-four' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[3].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[3].profile_img + '\')'
                } })
            ),
            this.state.show_five_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-five' },
              _react2.default.createElement(_reactRouterDom.Link, {
                to: '/profile/' + this.state.attendees_profiles[4].user_id,
                className: 'user-img',
                style: {
                  backgroundImage: 'url(\'' + this.state.attendees_profiles[4].profile_img + '\')'
                } })
            ),
            this.state.show_more_profile && _react2.default.createElement(
              'div',
              { className: 'attendees-more' },
              _react2.default.createElement(
                'div',
                {
                  className: 'user-img',
                  onClick: this.redirect_link,
                  style: {
                    backgroundImage: 'url(\'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png\')'
                  } },
                ' '
              )
            ),
            this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              this.state.attendees_count,
              ' out of ',
              schedule_game.limit
            ),
            !this.state.show_attendees && _react2.default.createElement(
              'div',
              { className: 'attendees-count' },
              'Unlimited'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'compose-comment' },
            _react2.default.createElement('textarea', {
              name: 'name',
              rows: 8,
              cols: 80,
              placeholder: 'Write a comment...',
              value: this.state.value,
              onChange: this.handleChange,
              maxLength: '254',
              onKeyUp: this.detectKey,
              ref: this.setTextInputRef,
              onFocus: this.onFocus
            }),
            _react2.default.createElement(
              'div',
              { className: 'buttons' },
              _react2.default.createElement(
                'div',
                { className: 'repost-btn', onClick: this.insert_comment },
                _react2.default.createElement('i', { className: 'fas fa-reply' }),
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'comments' },
            this.state.show_more_comments && _react2.default.createElement(
              'div',
              { className: 'show-individual-comments' },
              this.showComment()
            )
          )
        )
      );
    }
  }]);
  return ScheduledGamePost_Dota2;
}(_react.Component);

exports.default = ScheduledGamePost_Dota2;

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(398);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(411);

var _Profile2 = _interopRequireDefault(_Profile);

var _ScheduleGames = __webpack_require__(412);

var _ScheduleGames2 = _interopRequireDefault(_ScheduleGames);

var _MyScheduledGames = __webpack_require__(407);

var _MyScheduledGames2 = _interopRequireDefault(_MyScheduledGames);

var _LeftMenu = __webpack_require__(400);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(403);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(414);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _ComposeSection = __webpack_require__(145);

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

var _Posts = __webpack_require__(153);

var _Posts2 = _interopRequireDefault(_Posts);

var _LoadingComp = __webpack_require__(401);

var _LoadingComp2 = _interopRequireDefault(_LoadingComp);

var _AddScheduleGames = __webpack_require__(390);

var _AddScheduleGames2 = _interopRequireDefault(_AddScheduleGames);

var _Dossier = __webpack_require__(393);

var _Dossier2 = _interopRequireDefault(_Dossier);

var _AddGamingExp = __webpack_require__(389);

var _AddGamingExp2 = _interopRequireDefault(_AddGamingExp);

var _EditGamingExp = __webpack_require__(395);

var _EditGamingExp2 = _interopRequireDefault(_EditGamingExp);

var _IndividualPost = __webpack_require__(41);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _IndividualComment = __webpack_require__(48);

var _IndividualComment2 = _interopRequireDefault(_IndividualComment);

var _IndividualReply = __webpack_require__(151);

var _IndividualReply2 = _interopRequireDefault(_IndividualReply);

var _MyPosts = __webpack_require__(152);

var _MyPosts2 = _interopRequireDefault(_MyPosts);

var _MyHome = __webpack_require__(406);

var _MyHome2 = _interopRequireDefault(_MyHome);

var _MyComposeSection = __webpack_require__(86);

var _MyComposeSection2 = _interopRequireDefault(_MyComposeSection);

var _Invitation = __webpack_require__(399);

var _Invitation2 = _interopRequireDefault(_Invitation);

var _IndividualInvitation = __webpack_require__(85);

var _IndividualInvitation2 = _interopRequireDefault(_IndividualInvitation);

var _MyFriends = __webpack_require__(405);

var _MyFriends2 = _interopRequireDefault(_MyFriends);

var _IndividualFriend = __webpack_require__(147);

var _IndividualFriend2 = _interopRequireDefault(_IndividualFriend);

var _ScheduledGamePost = __webpack_require__(59);

var _ScheduledGamePost2 = _interopRequireDefault(_ScheduledGamePost);

var _MySettings = __webpack_require__(408);

var _MySettings2 = _interopRequireDefault(_MySettings);

var _IndividualGamingExperience = __webpack_require__(148);

var _IndividualGamingExperience2 = _interopRequireDefault(_IndividualGamingExperience);

var _UploadPic = __webpack_require__(416);

var _UploadPic2 = _interopRequireDefault(_UploadPic);

var _Notifications = __webpack_require__(409);

var _Notifications2 = _interopRequireDefault(_Notifications);

var _IndividualNotification = __webpack_require__(149);

var _IndividualNotification2 = _interopRequireDefault(_IndividualNotification);

var _SinglePost = __webpack_require__(415);

var _SinglePost2 = _interopRequireDefault(_SinglePost);

var _IndividualEsportsExperience = __webpack_require__(146);

var _IndividualEsportsExperience2 = _interopRequireDefault(_IndividualEsportsExperience);

var _AddEsportsExp = __webpack_require__(388);

var _AddEsportsExp2 = _interopRequireDefault(_AddEsportsExp);

var _EditEsportsExp = __webpack_require__(394);

var _EditEsportsExp2 = _interopRequireDefault(_EditEsportsExp);

var _AdvancedSearch = __webpack_require__(391);

var _AdvancedSearch2 = _interopRequireDefault(_AdvancedSearch);

var _IndividualPlayer = __webpack_require__(150);

var _IndividualPlayer2 = _interopRequireDefault(_IndividualPlayer);

var _PlayerList = __webpack_require__(410);

var _PlayerList2 = _interopRequireDefault(_PlayerList);

var _GroupMain = __webpack_require__(397);

var _GroupMain2 = _interopRequireDefault(_GroupMain);

var _ScheduledGamesApprovals = __webpack_require__(413);

var _ScheduledGamesApprovals2 = _interopRequireDefault(_ScheduledGamesApprovals);

var _GroupHome = __webpack_require__(396);

var _GroupHome2 = _interopRequireDefault(_GroupHome);

var _MyApprovals = __webpack_require__(404);

var _MyApprovals2 = _interopRequireDefault(_MyApprovals);

var _Member_lists = __webpack_require__(402);

var _Member_lists2 = _interopRequireDefault(_Member_lists);

var _ArchivedScheduledGames = __webpack_require__(392);

var _ArchivedScheduledGames2 = _interopRequireDefault(_ArchivedScheduledGames);

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
          _react2.default.createElement(_LeftMenu2.default, { initialData: this.state.initialData == undefined ? 'loading' : this.state.initialData }),
          _react2.default.createElement(
            "section",
            { id: "content-container" },
            _react2.default.createElement(_SearchHeader2.default, null),
            _react2.default.createElement(
              _reactRouterDom.Switch,
              null,
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
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/scheduledGames/:id", component: function component(props) {
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
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/archive_playerList/:archive_id", component: function component(props) {
                  return _react2.default.createElement(_PlayerList2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/groups/", component: function component(props) {
                  return _react2.default.createElement(_GroupMain2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/groups/:id", component: function component(props) {
                  return _react2.default.createElement(_GroupHome2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/scheduledGamesApprovals/:id", component: function component(props) {
                  return _react2.default.createElement(_ScheduledGamesApprovals2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/myApprovals/:id", component: function component(props) {
                  return _react2.default.createElement(_MyApprovals2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/groups/:id/members", component: function component(props) {
                  return _react2.default.createElement(_Member_lists2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/archived_scheduledGames/:id", component: function component(props) {
                  return _react2.default.createElement(_ArchivedScheduledGames2.default, { routeProps: props,
                    initialData: _this2.state.initialData == undefined ? 'loading' : _this2.state.initialData });
                } })
            )
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

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualReply = __webpack_require__(151);

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
                  return _axios2.default.get('/api/replies/' + comment_id);

                case 3:
                  myCommentReplies = _context.sent;

                  self.setState({
                    myReplies: myCommentReplies.data.this_comments_replies
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 10:
                case 'end':
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

    _this.click_like_btn = function (comment_id) {
      try {
        var commentLike = _axios2.default.post('/api/likes', {
          comment_id: comment_id
        });

        var _this$props = _this.props,
            comment = _this$props.comment,
            user = _this$props.user;

        if (comment.user_id != user.userInfo.id) {
          if (_this.props.comment.schedule_games_id != null) {
            var addCommentLike = _axios2.default.post('/api/notifications/addCommentLike', {
              other_user_id: comment.user_id,
              schedule_games_id: _this.props.comment.schedule_games_id,
              comment_id: comment_id
            });
          } else {
            var _addCommentLike = _axios2.default.post('/api/notifications/addCommentLike', {
              other_user_id: comment.user_id,
              post_id: comment.post_id,
              comment_id: comment_id
            });
          }
        }
      } catch (error) {
        console.log(error);
      }

      _this.setState({
        total: _this.state.total + 1
      });

      _this.setState({
        show_like: true,
        like: !_this.state.like
      });
    };

    _this.click_unlike_btn = function (comment_id) {
      var comment = _this.props.comment;

      try {
        var unlike = _axios2.default.get('/api/likes/delete/comment/' + comment_id);
        var deleteCommentLike = _axios2.default.get('/api/notifications/deleteCommentLike/' + comment_id);
      } catch (error) {
        console.log(error);
      }

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
    };

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
          return _react2.default.createElement(_IndividualReply2.default, {
            reply: item,
            key: index,
            comment_user_id: _this.props.comment.user_id,
            post_id: _this.props.comment.post_id,
            user: _this.props.user,
            schedule_game_id: _this.props.comment.schedule_games_id
          });
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
          value2: ''
        });
      }

      if (e.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        _this.insert_comment();
      }
    };

    _this.insert_comment = function () {
      if (_this.state.value2 == '') {
        return;
      }
      if (_this.state.value2.trim() == '') {
        _this.setState({
          value2: ''
        });
        return;
      }
      var self = _this;
      var comment_id = _this.props.comment.id;

      var saveComment = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var mysaveComment;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _axios2.default.post('/api/comments/update/' + comment_id, {
                    content: self.state.value2
                  });

                case 3:
                  mysaveComment = _context2.sent;


                  self.setState({
                    show_edit_comment: false,
                    dropdown: false,
                    content: self.state.value2,
                    value2: ''
                  });
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 7]]);
        }));

        return function saveComment() {
          return _ref2.apply(this, arguments);
        };
      }();
      saveComment();
    };

    _this.insert_reply = function (e) {
      if (_this.state.value == '') {
        return;
      }
      if (_this.state.value.trim() == '') {
        _this.setState({
          value: ''
        });
        return;
      }
      var self = _this;
      var postReply;

      var saveReply = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          var _self$props, comment, user, addReply, _addReply;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _axios2.default.post('/api/replies', {
                    content: self.state.value.trim(),
                    comment_id: self.props.comment.id
                  });

                case 3:
                  postReply = _context3.sent;
                  _self$props = self.props, comment = _self$props.comment, user = _self$props.user;

                  if (comment.user_id != user.userInfo.id) {
                    if (self.props.comment.schedule_games_id != null) {
                      addReply = _axios2.default.post('/api/notifications/addReply', {
                        other_user_id: comment.user_id,
                        schedule_games_id: self.props.comment.schedule_games_id,
                        reply_id: postReply.data.id
                      });
                    } else {
                      _addReply = _axios2.default.post('/api/notifications/addReply', {
                        other_user_id: comment.user_id,
                        post_id: comment.post_id,
                        reply_id: postReply.data.id
                      });
                    }
                  }
                  self.setState({
                    myReplies: []
                  });

                  self.pullReplies();

                  self.setState({
                    value: '',
                    show_more_replies: !self.show_more_replies,
                    show_add_reply: false,
                    reply_total: self.state.reply_total + 1,
                    show_reply: true
                  });
                  _context3.next = 14;
                  break;

                case 11:
                  _context3.prev = 11;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[0, 11]]);
        }));

        return function saveReply() {
          return _ref3.apply(this, arguments);
        };
      }();
      saveReply();
    };

    _this.clickedDropdown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.clickedEdit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var comment_id, myComment_content;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              comment_id = _this.props.comment.id;
              _context4.prev = 1;
              _context4.next = 4;
              return _axios2.default.get('/api/comments/show_comment/' + comment_id);

            case 4:
              myComment_content = _context4.sent;


              _this.setState({
                show_edit_comment: true,
                dropdown: false,
                value2: myComment_content.data.this_comment[0].content
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4['catch'](1);

              console.log(_context4.t0);

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[1, 8]]);
    }));
    _this.delete_exp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var comment_id, myComment_delete;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              comment_id = _this.props.comment.id;


              try {
                myComment_delete = _axios2.default.get('/api/comments/delete/' + comment_id);

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
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2);
    }));

    _this.state = {
      show_like: false,
      show_reply: false,
      show_add_reply: false,
      like: false,
      show_profile_img: false,
      total: 0,
      reply_total: 0,
      reply_name_box: '',
      value: '',
      show_more_replies: true,
      dropdown: false,
      comment_deleted: false,
      show_comment_options: false,
      show_edit_comment: false,
      content: '',
      comment_time: ''
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.comment.profile_img != null) {
        this.setState({ show_profile_img: true });
      }

      this.setState({
        content: this.props.comment.content
      });

      var comment_timestamp = (0, _moment2.default)(this.props.comment.updated_at, 'YYYY-MM-DD HH:mm:ssZ');
      this.setState({ comment_time: comment_timestamp.local().fromNow() });

      var self = this;
      var comment = this.props;

      var getCommentLike = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
          var i, myCommentLike;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _axios2.default.get('/api/likes/comment/' + comment.comment.id);

                case 3:
                  myCommentLike = _context6.sent;


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
                  _context6.next = 11;
                  break;

                case 8:
                  _context6.prev = 8;
                  _context6.t0 = _context6['catch'](0);

                  console.log(_context6.t0);

                case 11:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 8]]);
        }));

        return function getCommentLike() {
          return _ref6.apply(this, arguments);
        };
      }();

      var getCommentReplies = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
          var i, myCommentReplies;
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _axios2.default.get('/api/replies/' + comment.comment.id);

                case 3:
                  myCommentReplies = _context7.sent;

                  self.setState({
                    myReplies: myCommentReplies.data.this_comments_replies
                  });

                  if (myCommentReplies.data.no_of_replies[0].no_of_replies != 0) {
                    self.setState({
                      show_reply: true,
                      reply_total: myCommentReplies.data.no_of_replies[0].no_of_replies
                    });
                  }
                  _context7.next = 11;
                  break;

                case 8:
                  _context7.prev = 8;
                  _context7.t0 = _context7['catch'](0);

                  console.log(_context7.t0);

                case 11:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 8]]);
        }));

        return function getCommentReplies() {
          return _ref7.apply(this, arguments);
        };
      }();

      var getmyCommentCount = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
          var i, myCommentCount;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _axios2.default.get('/api/comments/my_count/' + comment.comment.id);

                case 3:
                  myCommentCount = _context8.sent;


                  if (myCommentCount.data.no_of_my_comments[0].no_of_my_comments != 0) {
                    self.setState({
                      show_comment_options: true
                    });
                  }
                  _context8.next = 10;
                  break;

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8['catch'](0);

                  console.log(_context8.t0);

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 7]]);
        }));

        return function getmyCommentCount() {
          return _ref8.apply(this, arguments);
        };
      }();
      getCommentLike();
      getCommentReplies();
      getmyCommentCount();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var comment = this.props.comment;
      //console.log(comment);

      if (this.state.comment_deleted != true) {
        return _react2.default.createElement(
          'div',
          { className: 'individual-comment-container' },
          _react2.default.createElement(
            'div',
            { className: 'author-info' },
            this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
              to: '/profile/' + comment.user_id,
              className: 'user-img',
              style: {
                backgroundImage: 'url(\'' + comment.profile_img + '\')'
              } }),
            !this.state.show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
              to: '/profile/' + comment.user_id,
              className: 'user-img',
              style: {
                backgroundImage: 'url(\'https://image.flaticon.com/icons/svg/149/149071.svg\')'
              } }),
            _react2.default.createElement(
              'div',
              { className: 'comment-info' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                {
                  to: '/profile/' + comment.user_id },
                comment.first_name + ' ' + comment.last_name
              )
            ),
            this.state.show_comment_options && _react2.default.createElement(
              'div',
              { className: 'comment-options' },
              _react2.default.createElement('i', {
                className: 'fas fa-ellipsis-h',
                onClick: this.clickedDropdown })
            ),
            _react2.default.createElement(
              'div',
              { className: 'dropdown ' + (this.state.dropdown ? 'active' : '') },
              _react2.default.createElement(
                'nav',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'edit', onClick: this.clickedEdit },
                  'Edit \xA0'
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'delete',
                    onClick: function onClick() {
                      if (window.confirm('Are you sure you wish to delete this comment?')) _this3.delete_exp();
                    } },
                  'Delete'
                ),
                '\xA0'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'comment-content' },
            _react2.default.createElement(
              'p',
              null,
              this.state.content
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'comment-panel' },
            this.state.like && _react2.default.createElement(
              'div',
              {
                className: 'comment-panel-liked',
                onClick: function onClick() {
                  return _this3.click_unlike_btn(comment.id);
                } },
              'Like'
            ),
            !this.state.like && _react2.default.createElement(
              'div',
              {
                className: 'comment-panel-like',
                onClick: function onClick() {
                  return _this3.click_like_btn(comment.id);
                } },
              'Like'
            ),
            _react2.default.createElement(
              'div',
              { className: 'comment-panel-reply', onClick: this.toggleReply },
              'Reply'
            ),
            (this.state.show_like || this.state.show_reply) && _react2.default.createElement(
              'div',
              { className: 'divider' },
              '|'
            ),
            this.state.show_like && _react2.default.createElement(
              'div',
              { className: 'no-likes' },
              this.state.total,
              ' ',
              this.state.total > 1 ? 'Likes' : 'Like',
              ' '
            ),
            this.state.show_reply && this.state.show_like && _react2.default.createElement(
              'div',
              { className: 'colon' },
              ':'
            ),
            this.state.show_reply && _react2.default.createElement(
              'div',
              { className: 'no-reply' },
              ' ',
              this.state.reply_total,
              ' ',
              this.state.reply_total > 1 ? 'Replies' : 'Reply'
            ),
            _react2.default.createElement(
              'div',
              { className: 'comment-time' },
              _react2.default.createElement('i', { className: 'fas fa-circle' }),
              ' ',
              this.state.comment_time
            )
          ),
          this.state.show_more_replies && this.showReplies(),
          this.state.show_add_reply && _react2.default.createElement(
            'div',
            { className: 'add-reply' },
            _react2.default.createElement('input', {
              type: 'text',
              id: 'reply_name_box',
              className: 'reply-name-box',
              placeholder: 'Add a reply...',
              onKeyUp: this.detectKey,
              ref: this.setTextInputRef,
              onChange: this.handleChange,
              value: this.state.value
            })
          ),
          this.state.show_edit_comment && _react2.default.createElement(
            'div',
            { className: 'add-reply' },
            _react2.default.createElement('input', {
              type: 'text',
              id: 'reply_name_box',
              className: 'reply-name-box',
              onKeyUp: this.detectKey2,
              ref: this.setTextInputRef,
              onChange: this.handleChange2,
              value: this.state.value2
            })
          )
        );
      } else {
        return _react2.default.createElement('div', { className: 'individual-comment-container' });
      }
    }
  }]);
  return IndividualComment;
}(_react.Component);

exports.default = IndividualComment;


var app = document.getElementById('app');

/***/ }),

/***/ 59:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScheduledGamePost_Default = __webpack_require__(457);

var _ScheduledGamePost_Default2 = _interopRequireDefault(_ScheduledGamePost_Default);

var _ScheduledGamePost_Dota = __webpack_require__(458);

var _ScheduledGamePost_Dota2 = _interopRequireDefault(_ScheduledGamePost_Dota);

var _ScheduledGamePost_Clash_Royale = __webpack_require__(456);

var _ScheduledGamePost_Clash_Royale2 = _interopRequireDefault(_ScheduledGamePost_Clash_Royale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduledGamePost = function (_Component) {
  (0, _inherits3.default)(ScheduledGamePost, _Component);

  function ScheduledGamePost() {
    (0, _classCallCheck3.default)(this, ScheduledGamePost);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScheduledGamePost.__proto__ || Object.getPrototypeOf(ScheduledGamePost)).call(this));

    _this.showPost = function () {
      switch (_this.props.schedule_game.game_name) {
        case 'Dota 2':
          return _react2.default.createElement(_ScheduledGamePost_Dota2.default, { props: _this.props });
          break;
        case 'Clash Royale':
          return _react2.default.createElement(_ScheduledGamePost_Clash_Royale2.default, { props: _this.props });
          break;
        default:
          return _react2.default.createElement(_ScheduledGamePost_Default2.default, { props: _this.props });
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(ScheduledGamePost, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'gamesPosts' },
        this.showPost()
      );
    }
  }]);
  return ScheduledGamePost;
}(_react.Component);

exports.default = ScheduledGamePost;

/***/ }),

/***/ 85:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSelect = __webpack_require__(19);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndividualInvitation = function (_Component) {
  (0, _inherits3.default)(IndividualInvitation, _Component);

  function IndividualInvitation() {
    (0, _classCallCheck3.default)(this, IndividualInvitation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndividualInvitation.__proto__ || Object.getPrototypeOf(IndividualInvitation)).call(this));

    _this.clickedAccept = function () {
      if (_this.state.group_approvals) {
        try {
          var set_group_approval = _axios2.default.get('/api/usergroup/set_group_approval/' + _this.props.invitation.group_id + '/' + _this.props.invitation.id);
        } catch (error) {
          console.log(error);
        }
      } else {
        _this.clickedAccept_myInvitations();
      }

      _this.setState({
        actionClicked: false,
        actionClickedAccept: true
      });
    };

    _this.clickedDenied = function () {
      if (_this.state.group_approvals) {
        try {
          var remove_group_approval = _axios2.default.get('/api/usergroup/remove_group_approval/' + _this.props.invitation.group_id + '/' + _this.props.invitation.id);
        } catch (error) {
          console.log(error);
        }
      } else {
        _this.clickedDenied_myInvitations();
      }

      _this.setState({
        actionClicked: false,
        actionClickedDeny: true
      });
    };

    _this.clickedAccept_myInvitations = function () {
      var invitation = _this.props.invitation;


      try {
        var deleteNoti = _axios2.default.get('/api/notifications/delete/' + invitation.id);
      } catch (error) {
        console.log(error);
      }

      try {
        var createFriend = _axios2.default.post('/api/friends/create', {
          friend_id: invitation.user_id
        });
      } catch (error) {
        console.log(error);
      }
    };

    _this.clickedDenied_myInvitations = function () {
      var invitation = _this.props.invitation;

      try {
        var deleteNoti = _axios2.default.get('/api/notifications/delete/' + invitation.id);
      } catch (error) {
        console.log(error);
      }
    };

    _this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      group_approvals: false
    };
    return _this;
  }

  (0, _createClass3.default)(IndividualInvitation, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var type = this.props.type;


      if (type == 'group_approvals') {
        this.setState({
          group_approvals: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          invitation = _props.invitation,
          lastRow = _props.lastRow;

      var show_profile_img = false;
      if (invitation.profile_img != null) {
        show_profile_img = true;
      }
      return _react2.default.createElement(
        'div',
        { className: 'invitation-info' },
        show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + invitation.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'' + invitation.profile_img + '\')'
          } }),
        !show_profile_img && _react2.default.createElement(_reactRouterDom.Link, {
          to: '/profile/' + invitation.user_id,
          className: 'user-img',
          style: {
            backgroundImage: 'url(\'https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg\')'
          } }),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          '' + invitation.first_name,
          ' ',
          '' + invitation.last_name
        ),
        _react2.default.createElement(
          'div',
          { className: 'invitiation-options' },
          this.state.actionClicked && _react2.default.createElement(
            'div',
            { className: 'invitation-accept', onClick: this.clickedAccept },
            'Accept \xA0\xA0'
          ),
          this.state.actionClicked && _react2.default.createElement(
            'div',
            { className: 'invitation-deny', onClick: this.clickedDenied },
            'Deny\xA0\xA0'
          ),
          this.state.actionClickedAccept && _react2.default.createElement(
            'div',
            { className: 'invitation-accepted' },
            'Accepted! \xA0\xA0'
          ),
          this.state.actionClickedDeny && _react2.default.createElement(
            'div',
            { className: 'invitation-denied' },
            'Denied! \xA0\xA0'
          )
        ),
        !lastRow && _react2.default.createElement(
          'div',
          { className: 'line-break' },
          _react2.default.createElement('hr', null)
        ),
        lastRow && _react2.default.createElement('div', { className: 'last-row' })
      );
    }
  }]);
  return IndividualInvitation;
}(_react.Component);

exports.default = IndividualInvitation;

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(16);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _IndividualPost = __webpack_require__(41);

var _IndividualPost2 = _interopRequireDefault(_IndividualPost);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _PostFileModal = __webpack_require__(165);

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
        var url, post, _post;

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

                //console.log('data:', data);

                if (!(data.media_url.length == 0 && data.content == '')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                _context.prev = 5;

                if (!_this.state.groups_post) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return _axios2.default.post(url, {
                  media_url: JSON.stringify(data.media_url),
                  content: data.content,
                  groups_id: _this.props.groups_id.params.id
                });

              case 9:
                post = _context.sent;
                _context.next = 15;
                break;

              case 12:
                _context.next = 14;
                return _axios2.default.post(url, {
                  media_url: JSON.stringify(data.media_url),
                  content: data.content
                });

              case 14:
                _post = _context.sent;

              case 15:

                _this.setState({
                  myPosts: undefined
                });
                _context.next = 18;
                return _this.get_posts();

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context['catch'](5);

                console.log(_context.t0);

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[5, 20]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.submitForm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var post, _post2;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.post_content.trim() == '')) {
                _context2.next = 3;
                break;
              }

              _this.setState({
                post_content: ''
              });
              return _context2.abrupt('return');

            case 3:
              _context2.prev = 3;

              if (!_this.state.groups_post) {
                _context2.next = 10;
                break;
              }

              _context2.next = 7;
              return _axios2.default.post('/api/post', {
                content: _this.state.post_content.trim(),
                user_id: _this.props.initialData.userInfo.id,
                type: 'text',
                groups_id: _this.props.groups_id.params.id
              });

            case 7:
              post = _context2.sent;
              _context2.next = 13;
              break;

            case 10:
              _context2.next = 12;
              return _axios2.default.post('/api/post', {
                content: _this.state.post_content.trim(),
                user_id: _this.props.initialData.userInfo.id,
                type: 'text'
              });

            case 12:
              _post2 = _context2.sent;

            case 13:

              _this.setState({
                myPosts: undefined
              });
              _context2.next = 16;
              return _this.get_posts();

            case 16:
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](3);

              console.log(_context2.t0);

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 18]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
      _this.setState((0, _defineProperty3.default)({}, name, value));
    };

    _this.showLatestPosts = function () {
      if (_this.state.myPosts != undefined) {
        return _this.state.myPosts.map(function (item, index) {
          return _react2.default.createElement(_IndividualPost2.default, {
            post: item,
            key: index,
            user: _this.props.initialData
          });
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
                  return _axios2.default.get('/api/mypost/' + self.state.myDate);

                case 3:
                  myPosts = _context3.sent;
                  i = 0;

                case 5:
                  if (!(i < myPosts.data.myPosts.length)) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 8;
                  return _axios2.default.get('/api/likes/' + myPosts.data.myPosts[i].id);

                case 8:
                  myLikes = _context3.sent;

                  myPosts.data.myPosts[i].total = myLikes.data.number_of_likes[0].total;
                  myPosts.data.myPosts[i].no_of_comments = myLikes.data.no_of_comments[0].no_of_comments;
                  if (myLikes.data.number_of_likes[0].total != 0) {
                    myPosts.data.myPosts[i].admirer_first_name = myLikes.data.admirer_UserInfo.first_name;
                    myPosts.data.myPosts[i].admirer_last_name = myLikes.data.admirer_UserInfo.last_name;
                  } else {
                    myPosts.data.myPosts[i].admirer_first_name = '';
                    myPosts.data.myPosts[i].admirer_last_name = '';
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
                    post_content: ''
                  });
                  //self.forceUpdate()
                  _context3.next = 22;
                  break;

                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3['catch'](0);

                  console.log(_context3.t0);

                case 22:
                case 'end':
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
          value2: ''
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
      profile_img: '',
      post_content: '',
      bFileModalOpen: false,
      fileType: 'photo',
      groups_post: false,
      no_show: false
    };

    _this.openPhotoPost = _this.openPhotoPost.bind(_this);

    _this.openVideoPost = _this.openVideoPost.bind(_this);
    _this.callbackPostFileModalClose = _this.callbackPostFileModalClose.bind(_this);
    _this.callbackPostFileModalConfirm = _this.callbackPostFileModalConfirm.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MyComposeSection, [{
    key: 'callbackPostFileModalClose',
    value: function callbackPostFileModalClose() {
      this.setState({
        bFileModalOpen: false
      });
    }
  }, {
    key: 'openPhotoPost',
    value: function openPhotoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'photo'
      });
    }
  }, {
    key: 'openVideoPost',
    value: function openVideoPost() {
      this.setState({
        bFileModalOpen: true,
        fileType: 'video'
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;

      var now = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss');
      this.setState({
        myDate: now
      });

      var getGroupDetails = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
          var mygroup_details;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _axios2.default.get('/api/usergroup/mygroup_details/' + self.props.groups_id.params.id);

                case 2:
                  mygroup_details = _context4.sent;

                  if (mygroup_details.data.mygroup_details.length == 0 || mygroup_details.data.mygroup_details[0].permission_level == 42) {
                    self.setState({
                      no_show: true
                    });
                  }

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function getGroupDetails() {
          return _ref4.apply(this, arguments);
        };
      }();

      try {
        if (this.props.groups_id.params.id != undefined) {
          this.state.groups_post = true;
          getGroupDetails();
        }
      } catch (e) {
        this.state.groups_post = false;
      }

      //const now = moment.utc()
      //var now = moment().utc().format('YYYY-MM-DDTHH:mm:ss')

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
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'section',
        { className: 'compose-area' },
        !this.state.no_show && _react2.default.createElement(
          'div',
          { className: 'compose-section' },
          _react2.default.createElement('textarea', {
            name: 'post_content',
            rows: 8,
            cols: 80,
            defaultValue: '',
            onChange: this.handleChange,
            value: this.state.post_content,
            onKeyUp: this.detectKey,
            maxLength: '254',
            placeholder: 'What\'s up...'
          }),
          _react2.default.createElement('div', { className: 'user-img' }),
          _react2.default.createElement(_reactRouterDom.Link, {
            to: '/profile/' + this.state.user_id,
            className: 'user-img',
            style: {
              backgroundImage: 'url(\'' + this.state.profile_img + '\')'
            } }),
          _react2.default.createElement(_PostFileModal2.default, {
            bOpen: this.state.bFileModalOpen,
            fileType: this.state.fileType,
            callbackClose: this.callbackPostFileModalClose,
            callbackConfirm: this.callbackPostFileModalConfirm }),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(
              'div',
              {
                className: 'button photo-btn',
                onClick: function onClick() {
                  return _this3.openPhotoPost();
                } },
              _react2.default.createElement('i', { className: 'far fa-images' })
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'button video-btn',
                onClick: function onClick() {
                  return _this3.openVideoPost();
                } },
              _react2.default.createElement('i', { className: 'far fa-play-circle' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button send-btn', onClick: this.submitForm },
              _react2.default.createElement('i', { className: 'far fa-paper-plane' })
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { id: 'posts' },
          this.state.show_post && this.showLatestPosts()
        )
      );
    }
  }]);
  return MyComposeSection;
}(_react.Component);

exports.default = MyComposeSection;


var app = document.getElementById('app');

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitDataFunction = undefined;

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var SubmitDataFunction = exports.SubmitDataFunction = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(myG) {
    var myRegion, myExperience, myPlatform, myVisibility, myLimit, myDota2_medal_ranks, myDota2_server_regions, myDota2_roles, myClash_royale_trophies, now, end_date, i, uuidv1, tmp, post;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myRegion = '';
            myExperience = '';
            myPlatform = '';
            myVisibility = 1;
            myLimit = 42;
            myDota2_medal_ranks = '';
            myDota2_server_regions = '';
            myDota2_roles = '';
            myClash_royale_trophies = '';
            now = (0, _moment2.default)();
            end_date = myG.endDate;


            if (myG.selected_region != undefined && myG.selected_region !== null && myG.selected_region.length !== 0) {
              for (i = 0; i < myG.selected_region.length; i++) {
                myRegion += myG.selected_region[i].value + '; ';
              }
              myRegion = myRegion.trim().replace(/; /g, ',').trim();
              myRegion = myRegion.replace(/;/g, '');
              myRegion = myRegion.replace(/,/g, ', ');
            }

            if (myG.selected_experience !== undefined && myG.selected_experience !== null && myG.selected_experience.length !== 0) {
              for (i = 0; i < myG.selected_experience.length; i++) {
                myExperience += myG.selected_experience[i].value + '; ';
              }
              myExperience = myExperience.trim().replace(/; /g, ',').trim();
              myExperience = myExperience.replace(/;/g, '');
              myExperience = myExperience.replace(/,/g, ', ');
            }

            if (myG.selected_platform !== undefined && myG.selected_platform !== null && myG.selected_platform.length !== 0) {
              for (i = 0; i < myG.selected_platform.length; i++) {
                myPlatform += myG.selected_platform[i].value + '; ';
              }
              myPlatform = myPlatform.trim().replace(/; /g, ',').trim();
              myPlatform = myPlatform.replace(/;/g, '');
              myPlatform = myPlatform.replace(/,/g, ', ');
            }

            if (myG.endDate != null || myG.endDate != undefined) {
              now = (0, _moment2.default)(myG.endDate);
              now.add(8, 'hour');
            } else {
              now = (0, _moment2.default)(myG.startDate);
              end_date = (0, _moment2.default)(now);
              end_date.add(18, 'hour');
              now.add(18, 'hour');
            }

            if (myG.selected_visibility != null || myG.selected_visibility != undefined) {
              myVisibility = myG.selected_visibility.value;
            }

            if (myG.selected_limit != null || myG.selected_limit != undefined) {
              myLimit = myG.selected_limit.value;
            }

            if (myG.clash_royale_trophy != null || myG.clash_royale_trophy != undefined) {
              myClash_royale_trophies = myG.clash_royale_trophy.value;
            }

            if (myG.dota2_medal_ranks !== undefined && myG.dota2_medal_ranks !== null && myG.dota2_medal_ranks.length !== 0) {
              for (i = 0; i < myG.dota2_medal_ranks.length; i++) {
                myDota2_medal_ranks += myG.dota2_medal_ranks[i].value + '; ';
              }
              myDota2_medal_ranks = myDota2_medal_ranks.trim().replace(/; /g, ',').trim();
              myDota2_medal_ranks = myDota2_medal_ranks.replace(/;/g, '');
              myDota2_medal_ranks = myDota2_medal_ranks.replace(/,/g, ', ');
            }

            if (myG.dota2_server_regions !== undefined && myG.dota2_server_regions !== null && myG.dota2_server_regions.length !== 0) {
              for (i = 0; i < myG.dota2_server_regions.length; i++) {
                myDota2_server_regions += myG.dota2_server_regions[i].value + '; ';
              }
              myDota2_server_regions = myDota2_server_regions.trim().replace(/; /g, ',').trim();
              myDota2_server_regions = myDota2_server_regions.replace(/;/g, '');
              myDota2_server_regions = myDota2_server_regions.replace(/,/g, ', ');
            }

            if (myG.dota2_roles !== undefined && myG.dota2_roles !== null && myG.dota2_roles.length !== 0) {
              for (i = 0; i < myG.dota2_roles.length; i++) {
                myDota2_roles += myG.dota2_roles[i].value + '; ';
              }
              myDota2_roles = myDota2_roles.trim().replace(/; /g, ',').trim();
              myDota2_roles = myDota2_roles.replace(/;/g, '');
              myDota2_roles = myDota2_roles.replace(/,/g, ', ');
            }

            uuidv1 = __webpack_require__(387);
            tmp = uuidv1();


            try {
              post = _axios2.default.post('/api/ScheduleGame', {
                game_name_box: myG.game_name_box.value,
                selected_region: myRegion,
                selected_experience: myExperience,
                start_date_time: myG.startDate,
                end_date_time: end_date,
                selected_platform: myPlatform,
                description_box: myG.description_box,
                other_box: myG.other_box,
                selected_expiry: now,
                visibility: myVisibility,
                limit: myLimit,
                accept_msg: myG.txtAreaValue.trim(),
                dota2_medal_ranks: myDota2_medal_ranks,
                dota2_server_regions: myDota2_server_regions,
                dota2_roles: myDota2_roles,
                schedule_games_GUID: tmp,
                clash_royale_trophies: myClash_royale_trophies
              });
            } catch (error) {
              console.log(error);
            }

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function SubmitDataFunction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _uuid = __webpack_require__(715);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 93:
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _Creatable = __webpack_require__(45);

var _Creatable2 = _interopRequireDefault(_Creatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reasons = [{ value: 1, label: 'Real life issues, sorry all' }, { value: 2, label: 'Technical issues, sorry all' }, { value: 3, label: 'Totally forgot about this, my bad' }, { value: 4, label: 'Not enuf players' }, { value: 5, label: 'Decided not to play anymore, sorry all' }];

var createOption = function createOption(label) {
  return {
    label: label,
    value: label
  };
};

function isValidNewOption(inputValue, selectValue, selectOptions) {
  return !(!inputValue || selectValue.some(function (option) {
    return compareOption(inputValue, option);
  }) || selectOptions.some(function (option) {
    return compareOption(inputValue, option);
  }));
}

var compareOption = function compareOption(inputValue, option) {
  var candidate = typeof inputValue === "string" ? inputValue.toLowerCase() : inputValue;
  if (typeof option.value === "string") {
    if (option.value.toLowerCase() === candidate) {
      return true;
    }
  }
  if (typeof option.label === "string") {
    if (option.label.toLowerCase() === candidate) {
      return true;
    }
  }
  return option.value === candidate || option.label === candidate;
};

var DeleteScheduleGameModal = function (_Component) {
  (0, _inherits3.default)(DeleteScheduleGameModal, _Component);

  function DeleteScheduleGameModal() {
    (0, _classCallCheck3.default)(this, DeleteScheduleGameModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeleteScheduleGameModal.__proto__ || Object.getPrototypeOf(DeleteScheduleGameModal)).call(this));

    _this.handleChange = function (value) {
      _this.setState({ value: value });
    };

    _this.handleCreate_game_name = function (inputValue) {
      setTimeout(function () {
        var newOption = createOption(inputValue, null);
        _this.setState({ value: newOption });
      }, 300);
    };

    _this.state = {
      value: "",
      isLoading: false
    };
    return _this;
  }

  (0, _createClass3.default)(DeleteScheduleGameModal, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.state.value = "";
      this.props.callbackClose();
    }
  }, {
    key: "clickSave",
    value: function clickSave() {
      if (this.state.value == null || this.state.value.length == 0) {
        alert("Sorry mate! Reason can not be blank");
        return;
      }

      this.props.callbackConfirm({
        value: this.state.value.label
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var class_modal_status = '';

      if (this.props.bOpen) {
        class_modal_status = 'modal--show';
      }
      return _react2.default.createElement(
        "div",
        { className: "modal-container " + class_modal_status },
        _react2.default.createElement(
          "div",
          { className: "modal-wrap" },
          _react2.default.createElement(
            "div",
            { className: "modal-close-btn", onClick: function onClick() {
                return _this2.closeModal();
              } },
            _react2.default.createElement("i", { className: "fas fa-times" })
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-header" },
            _react2.default.createElement(
              "label",
              null,
              " Looks like we have some approved players in this game, it going to suck for these players. Let's provide a reason why we're cancelling this game "
            ),
            _react2.default.createElement(
              "div",
              { className: "reason_txtBox" },
              _react2.default.createElement(_Creatable2.default, {
                onChange: this.handleChange,
                onCreateOption: this.handleCreate,
                cacheOptions: true,
                defaultOptions: true,
                isValidNewOption: isValidNewOption,
                options: reasons,
                value: this.state.value,
                isClearable: true,
                className: "reason_name_box",
                placeholder: "Select a reason for cancelling",
                onInputChange: function onInputChange(inputValue) {
                  return inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250);
                }
              })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-content" },
            _react2.default.createElement(
              "div",
              { className: "save-btn", onClick: function onClick() {
                  return _this2.clickSave();
                } },
              _react2.default.createElement("i", { className: "fas fa-save" }),
              " Save"
            )
          )
        )
      );
    }
  }]);
  return DeleteScheduleGameModal;
}(_react.Component);

exports.default = DeleteScheduleGameModal;

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullDataFunction = undefined;

var _regenerator = __webpack_require__(10);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var PullDataFunction = exports.PullDataFunction = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(myG) {
    var myGame_name_box, myVisibility, myRegion, myExperience, myPlatform, myDescription_box, myOther_box, myLimit, check_full_games, startDate, tmp_endDate, endDate, dota2_medal_ranks, dota2_server_regions, dota2_roles, clash_royale_trophies, allscheduledGames;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myGame_name_box = null, myVisibility = 1, myRegion = null, myExperience = null, myPlatform = null, myDescription_box = null, myOther_box = null, myLimit = 0, check_full_games = true, startDate = (0, _moment2.default)().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss'), tmp_endDate = (0, _moment2.default)().utc(), endDate = (0, _moment2.default)().utc(), dota2_medal_ranks = null, dota2_server_regions = null, dota2_roles = null, clash_royale_trophies = null;


            if (myG.visibility_box != undefined && myG.visibility_box != null && myG.visibility_box != '') {
              myVisibility = myG.visibility_box.value;
            }

            if (myG.selected_region != undefined && myG.selected_region != null && myG.selected_region != '') {
              myRegion = myG.selected_region.value;
            }

            if (myG.selected_experience != undefined && myG.selected_experience != null && myG.selected_experience != '') {
              myExperience = myG.selected_experience.value;
            }

            if (myG.selected_platform != undefined && myG.selected_platform != null && myG.selected_platform != '') {
              myPlatform = myG.selected_platform.value;
            }

            if (myG.dota2_medal_ranks != undefined && myG.dota2_medal_ranks != null && myG.dota2_medal_ranks != '') {
              dota2_medal_ranks = myG.dota2_medal_ranks.value;
            }

            if (myG.dota2_server_regions != undefined && myG.dota2_server_regions != null && myG.dota2_server_regions != '') {
              dota2_server_regions = myG.dota2_server_regions.value;
            }

            if (myG.dota2_roles != undefined && myG.dota2_roles != null && myG.dota2_roles != '') {
              dota2_roles = myG.dota2_roles.value;
            }

            if (myG.clash_royale_trophies != undefined && myG.clash_royale_trophies != null && myG.clash_royale_trophies != '') {
              clash_royale_trophies = myG.clash_royale_trophies.value;
            }

            if (!(myG.when != undefined && myG.when != null)) {
              _context.next = 24;
              break;
            }

            _context.t0 = myG.when.value;
            _context.next = _context.t0 === 'Now-ish' ? 13 : _context.t0 === '8 hours' ? 15 : _context.t0 === '2 days' ? 17 : _context.t0 === '7 days' ? 19 : _context.t0 === '14 days' ? 21 : 23;
            break;

          case 13:
            endDate = tmp_endDate.add(4, 'hour').format('YYYY-MM-DDTHH:mm:ss');
            return _context.abrupt('break', 24);

          case 15:
            endDate = tmp_endDate.add(8, 'hour').format('YYYY-MM-DDTHH:mm:ss');
            return _context.abrupt('break', 24);

          case 17:
            endDate = tmp_endDate.add(2, 'day').format('YYYY-MM-DDTHH:mm:ss');
            return _context.abrupt('break', 24);

          case 19:
            endDate = tmp_endDate.add(7, 'day').format('YYYY-MM-DDTHH:mm:ss');
            return _context.abrupt('break', 24);

          case 21:
            endDate = tmp_endDate.add(14, 'day').format('YYYY-MM-DDTHH:mm:ss');
            return _context.abrupt('break', 24);

          case 23:
            endDate = tmp_endDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss');

          case 24:

            if (myG.game_name_box != null && myG.game_name_box != '') {
              myGame_name_box = myG.game_name_box.value;
            }

            if (myG.description_box != '' && myG.description_box != undefined) {
              myDescription_box = myG.description_box;
            }

            myLimit = myG.db_row_counter;

            _context.prev = 27;
            _context.next = 30;
            return _axios2.default.post('/api/ScheduleGame/scheduleSearchResults', {
              game_name: myGame_name_box,
              region: myRegion,
              experience: myExperience,
              start_date_time: startDate,
              end_date_time: endDate,
              platform: myPlatform,
              description: myDescription_box,
              other: myOther_box,
              visibility: myVisibility,
              limit_clause: myLimit,
              vacancy: check_full_games,
              dota2_medal_ranks: dota2_medal_ranks,
              dota2_server_regions: dota2_server_regions,
              dota2_roles: dota2_roles,
              clash_royale_trophies: clash_royale_trophies
            });

          case 30:
            allscheduledGames = _context.sent;
            return _context.abrupt('return', allscheduledGames);

          case 34:
            _context.prev = 34;
            _context.t1 = _context['catch'](27);

            console.log(_context.t1);

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[27, 34]]);
  }));

  return function PullDataFunction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })

},[459]);