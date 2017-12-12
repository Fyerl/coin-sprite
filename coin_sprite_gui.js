/**
 * ****** CoinSprite(控制台图形界面版) 开发中 ******
 * Author: Fyerl
 * Weibo:  Fyerl_
 * Blog:   fyerl.me
 */

(function () {
  var data = {
    _dialogDisplay: false,
    priceRange: {
      l: null,
      h: null,
    },
    priceLine: null,
  };
  var id = {
    mainBtn: 'csMainBtn',
    wrapper: 'csMainWrapper',
    dialog: 'csDialog',
  };

  (function creat() {
    insertJq(function () {
      initMainBtn();
      initDialog();
      registerEvents();
    });
  })();

  function cs(id) {
    return $('#' + id);
  };

  function registerEvents() {
    cs(id.mainBtn).click(function () {
      data.dialogDisplay = true;
    });
    cs(id.wrapper).click(function () {
      data.dialogDisplay = false;
    });
  };

  function insertJq(cb) {
    if (!window.jQuery) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
      head.appendChild(script);
      script.onload = function () {
        cb && cb();
      };
    } else {
      cb && cb();
    }
  };

  function initMainBtn() {
    var mainBtn = $("<div id=" + id.mainBtn + ">CoinSprite</div>");
    mainBtn.css({
      display: "none",
      position: "fixed",
      bottom: "130px",
      right: "20px",
      height: "44px",
      width: "150px",
      borderRadius: "44px",
      background: "#f85444",
      textAlign: "center",
      lineHeight: "44px",
      fontSize: "18px",
      color: "#fff",
      boxShadow: "2px 4px 6px rgba(0,0,0,.2)",
      zIndex: "9997",
      cursor: "pointer"
    });
    $("body").append(mainBtn);
    mainBtn.fadeIn();
  };

  function startCoinHunter() {
  };

  /*
  function fetchListData() {
    $.ajax({
      type: 'POST',
      url: 'https://www.coincola.com/api/v1/contentslist/search',
      data: {
        country_code: 'CN',
        currency: null,
        payment_provider: null,
        limit: 20,
        offset: 0,
        sort_order: 'GENERAL',
        type: 'BUY',
        crypto_currency: 'BTC',
        _csrf: 'MKDQsWGv-Qrmt-2SMwu3tXKcqEnnHcD35UJA',
      },
      dataType: 'json',
      timeout: 60000,
      success: function(res) {
        console.log(1);
      },
    });
  };
  */

  function initDialog() {
    var wrapper = $("<div id=" + id.wrapper + "></div>");
    wrapper.css({
      display: "none",
      position: "fixed",
      left: "0",
      top: "0",
      bottom: "0",
      right: "0",
      background: "rgba(0,0,0,.1)",
      zIndex: "9998",
      cursor: "pointer"
    });
    $("body").append(wrapper);

    var dialog = $("<div id=" + id.dialog + "></div>");
    dialog.css({
      display: "none",
      position: "fixed",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "500px",
      width: "400px",
      background: "#fff",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "6px 6px 8px rgba(0,0,0,.1)",
      zIndex: "9999"
    });

    var dialogTitle = $("<p>CoinSprite</p>")
    dialogTitle.css({
      margin: "0",
      padding: "0",
      display: "inline-block",
      fontSize: "20px",
      color: "#483c3c",
      fontWeight: "bold",
      borderBottom: "3px solid #483c3c",
    });

    dialog.append(dialogTitle);
    $("body").append(dialog);
    initDialogSwitch();
  };

  function initDialogSwitch() {
    Object.defineProperty(data, "dialogDisplay", {
      get: function () {
        return this._dialogDisplay;
      },
      set: function (n) {
        this._dialogDisplay = n;
        if (n) {
          cs(id.wrapper).fadeIn(200);
          cs(id.dialog).fadeIn(200);
        } else {
          cs(id.wrapper).fadeOut(200);
          cs(id.dialog).fadeOut(200);
        }
      },
    });
  };
})();