/* eslint-disable no-unused-expressions */
/**
 * @param t
 * @param e
 */
function h (t, e) {
  if (e == null || e.length <= 0) {
    return console.log('Please enter a password with which to encrypt the message.'),
    null;
  }
  for (var n = '', i = 0; i < e.length; i++) { n += e.charCodeAt(i).toString(); }
  const r = Math.floor(n.length / 5);
  const o = parseInt(n.charAt(r) + n.charAt(2 * r) + n.charAt(3 * r) + n.charAt(4 * r) + n.charAt(5 * r));
  const l = Math.ceil(e.length / 2);
  const c = Math.pow(2, 31) - 1;
  if (o < 2) {
    return console.log('Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.'),
    null;
  }
  let d = Math.round(1e9 * Math.random()) % 1e8;
  for (n += d; n.length > 10;) { n = (parseInt(n.substring(0, 10)) + parseInt(n.substring(10, n.length))).toString(); }
  n = (o * n + l) % c;
  let h = '';
  let f = '';
  for (i = 0; i < t.length; i++) {
    f += (h = parseInt(t.charCodeAt(i) ^ Math.floor(n / c * 255))) < 16 ? '0' + h.toString(16) : h.toString(16),
    n = (o * n + l) % c;
  }
  for (d = d.toString(16); d.length < 8;) { d = '0' + d; }
  return f += d;
}

const f = 'Hm_Iuvt_cdb524f42f0cer9b268e4v7y734w5esq24';
const Cookie = '_ga=GA1.2.1644107756.1675241918; _gid=GA1.2.640910139.1691565305; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1690968157,1691565305; _gat=1; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1691571736; _ga_ETPBRPM9ML=GS1.2.1691570049.5.1.1691571770.22.0.0; Hm_Iuvt_cdb524f42f0cer9b268e4v7y734w5esq24=kk8Rxe3PhcFRkRiB7cZF5jfkTNdTSBTn';
const v = function (t = f) {
  //  使用 cookie
  const e = Cookie;
  let n = e.indexOf(t + '=');
  if (n !== -1) {
    n = n + t.length + 1;
    let r = e.indexOf(';', n);
    return r === -1 && (r = e.length),
    unescape(e.substring(n, r));
  }
  return null;
}

let l = '';
l = Object(v)(f);

module.exports = {
  h,
  v,
  f,
  Cookie,
};
