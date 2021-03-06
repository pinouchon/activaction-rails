var app = {
  init: function () {
    var self = this;
    self.initSignIn();
    self.initChat();
    if (self.isAdmin()) {
      self.initAloha();
      self.initAdminBox();
    }
  },

  isAdmin: function () {
    return $('body').data('admin');
  },

  flash: function (type, message, prependTo) {
    $('.alert-container').remove();
    //$("html, body").animate({ scrollTop: 0 }, 'fast');
    if (type == 'notice') {
      type = 'success';
    }
    if (type == 'error') {
      type = 'danger';
    }
    var flashContent = '<div class="panel panel-default container alert-container">' +
      '<div class="panel-body">' +
      '<div class="alert alert-' + type + '">' + message + '</div></div></div>';
    if (prependTo) {
      prependTo.prepend(flashContent);
      prependTo.find('.alert').hide().fadeIn(500);
    } else {
      $('#flash').html(flashContent).hide().fadeIn(500);
    }
  },

  user_signed_in: function () {
    return $('body').data('signed-in');
  },

  initSignIn: function () {
    $(document).on('submit', '#login_form', function (e) {
    }).on('ajax:success', '#login_form', function (e, data, status, xhr) {
    }).on('ajax:error', '#login_form', function (e, data, status, xhr) {
    });
  },

  initAloha: function () {

    Aloha.ready(function () {
      Aloha.jQuery('.editable').aloha();
      Aloha.require(['aloha', 'aloha/jquery'], function (Aloha, jQuery) {
        $('.aloha-sidebar-handle').hide();
        // save all changes after leaving an editable
        Aloha.bind('aloha-editable-deactivated', function () {
          var content = Aloha.activeEditable.getContents();
          var contentId = Aloha.activeEditable.obj[0].id;

          // textarea handling -- html id is "xy" and will be "xy-aloha" for the aloha editable
          if (contentId.match(/-aloha$/gi)) {
            contentId = contentId.replace(/-aloha/gi, '');
          }

          console.log('test:', Aloha.activeEditable.obj.data('label'), Aloha.activeEditable.obj.data('page-id'));
          var url = '';
          var data = {};
          if (Aloha.activeEditable.obj.data('label')) {
            url = '/labels/0';
            data = {label: {content: content, label: Aloha.activeEditable.obj.data('label')}};
          }
          if (Aloha.activeEditable.obj.data('page-id')) {
            url = '/wiki_pages/' + Aloha.activeEditable.obj.data('page-id');
            data = {wiki_page: {content: content, url: window.location.pathname}};
          }
          $.ajax({
            type: "PUT",
            url: url,
            data: data,
            success: function () {
              app.flash('success', 'Modifications enregistrées');
            },
            failure: function () {
              app.flash('error', "Impossible d'enregistrer les modifications (1)");
            },
            error: function () {
              app.flash('error', "Impossible d'enregistrer les modifications (2)");
            }
          });
        });

      });
    });
  },

  initAdminBox: function () {
    $('#admin_preview').click(function () {
      $(this).addClass('active');
      $('#normal_preview').removeClass('active');
      app.initAloha();
      $('body').attr('data-admin', true);
//      $('body').addClass('admin');
//      $('#my_wmd, .wmd-button-bar, #edit_page .form-actions, .ace_editor').show();
//      $('.wmd-preview2').addClass('wmd-preview').removeClass('wmd-preview2');
//      $('#editor_preview').addClass('boxed');
    });
    $('#normal_preview').click(function () {
      $(this).addClass('active');
      $('#admin_preview').removeClass('active');
      Aloha.jQuery('.editable').mahalo();
      $('.editable').removeClass('aloha-editable');
      $('.editable').removeClass('aloha-editable-highlight');
      $('body').attr('data-admin', false);
//      $('a').removeClass('aloha-link-text');
//      $('body').removeClass('admin');
//      $('#my_wmd, .wmd-button-bar, #edit_page .form-actions, .ace_editor').hide();
//      $('.wmd-preview').removeClass('wmd-preview').addClass('wmd-preview2');
//      $('#editor_preview').removeClass('boxed');
    });
    $('#admin_expand').click(function () {
      $('.admin_box').css('max-height', '3000px');
      $('.admin_box').css('width', '500px');
      $(this).hide();
      $('#admin_collapse').show();
    });
    $('#admin_collapse').click(function () {
      $('.admin_box').css('max-height', '75px');
      $('.admin_box').css('width', '200px');
      $(this).hide();
      $('#admin_expand').show();
    });
  },

  initChat: function () {
//    window.client = new Faye.Client('/faye');
//    client.subscribe('/chat', function (payload) {
//      if (payload.message) {
//        console.log('new message', payload.message);
//        //$('#comments').find('.media-list').prepend(payload.message)
//      }
//    });

    $('.user-menu-item').click(function () {
      if (!app.user_signed_in()) {
        app.flash('error', 'You devez vous connecter pour chatter avec un autre membre.');
        return false;
      }
//      Template.userMenu.refeshCount(this);
//      Meteor.subscribe('messages', Meteor.user().chattingWith);
//      Meteor.setTimeout(function () {
//        Template.chatWindow.scrollDown();
//      }, 0);
      $('.chat-window').show();
      $('body').not('.login').click(function (e) {
        if (!$(e.target).closest('.chat-window').length && !$(e.target).closest('.user-menu-item').length) {
          $('.chat-window').hide();
        }
      });
      $('.chat-box').keypress(function (e) {
        if (e.which === 13) { // enter
          e.preventDefault();
//          Template.chatWindow.sendMessage();
          return false;
        }
        return true;
      });
      $('.chat-box').blur(function () {
        console.log('chat blurr1');
        return true;
      });
      $('.chat-box').focus(function () {
        console.log('chat blurr1');
//        Template.userMenu.refeshCount(User.collection.findOne({_id: Meteor.user().chattingWith}));
        return true;
      });
      $('.chat-button').click(function (e) {
        e.preventDefault();
//        Template.chatWindow.sendMessage();
        return false;
      });
      $('.close-window').click(function (e) {
        e.preventDefault();
        $('.chat-window').hide();
        return false;
      });
    });
  }
};
