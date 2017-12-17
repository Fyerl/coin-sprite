# CoinSprite
[CoinCola](https://www.coincola.com/) 交易提醒脚本，适用于 [CoinCola](https://www.coincola.com/) 站点的 BTC / ETH / BCH 买卖，在对应买卖列表页的控制台中粘贴已配置好以下参数的脚本即可

# 参数与示例
希望以120000rmb的价格购买BTC，额度在1000rmb~5000rmb之间，每隔5秒查询一次是否有合适交易方
```
(function () {
  const params = {
    minAmount: 1000,       // 最低限额
    maxAmount: 5000,       // 最高限额
    price: 12000,          // 期望成交价
    refreshInterval: 5000  // 刷新间隔(毫秒)
  };
...
```