// jQuery talks to the backend. (script.js owns `$`, so we use `jQuery` explicitly here.)
jQuery.noConflict();
window.WH = {
  sendContact: function (data) {
    return jQuery.ajax({ url: '/api/contact', method: 'POST', contentType: 'application/json', data: JSON.stringify(data), timeout: 10000 });
  },
  get: function (name) { return jQuery.getJSON('/api/' + name); }, // WH.get('leaderboard' | 'reviews' | 'faq' | 'rooms')
  post: function (path, data) { // WH.post('login', {phone}) | WH.post('rooms/123/join', {slot}) ...
    return jQuery.ajax({ url: '/api/' + path, method: 'POST', contentType: 'application/json', data: JSON.stringify(data || {}), timeout: 10000 });
  }
};
