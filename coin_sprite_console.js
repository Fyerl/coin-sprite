/**
 * **** CoinSprite(控制台版) ****
 * 
 * minAmount        限额最低
 * maxAmount        限额最高
 * price            期望成交价
 * refreshInterval  刷新间隔(毫秒)
 */
(function () {
  const params = {
    minAmount: 1000,
    maxAmount: 5000,
    price: 120000,
    refreshInterval: 5000
  };

  const trading = {
    type: null,
    currency: null,
  };

  insertJq(function () {
    recognizeTradingType();
    startTradingWatcher();
  });

  function insertJq(cb) {
    if (!window.jQuery) {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
      head.appendChild(script);
      script.onload = function () {
        cb && cb();
      };
    } else {
      cb && cb();
    }
  };

  function recognizeTradingType() {
    const t = window.location.pathname.split('/');
    tradingType = {
      type: t[1] === 'buy' ? 'SELL' : 'BUY',
      currency: t[2],
    };
  };

  function startTradingWatcher() {
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
        type: tradingType.type,
        crypto_currency: tradingType.currency,
        _csrf: $("input[name=_csrf]").val(),
      },
      dataType: 'json',
      timeout: 12000,
      success: function (res) {
        const filterIndex = [];
        if (res && res.code === 0) {
          res.data.advertisements.forEach(function (item, index) {
            const r = params.maxAmount < item.min_amount
              || (tradingType.type === 'BUY' && item.price < params.price)
              || (tradingType.type === 'SELL' && item.price > params.price) ? false : true;
            r && filterIndex.push(index);
          });

          if (filterIndex.length > 0) { // TODO 逻辑待优化
            $('.current').click();
            alert('发现合适交易方');
            setTimeout(function() {
              filterIndex.forEach(function (item) {
                $("tr:eq(" + (item + 1) + ")").css("background", "#f854");
              });
            }, 0);
          } else {
            setTimeout(function () {
              startTradingWatcher();
            }, params.refreshInterval);
          }
        } else {
          alert('获取列表数据失败, 请检查网络或稍后重试');
        }
      },
      error: function () {
        alert('获取列表数据失败, 请检查网络或稍后重试');
      }
    });
  };
})();
