document.addEventListener('DOMContentLoaded', function() {
  View.setOptions({
    changeTitle: false
  });
  View.initActive('converter');

  var nav = document.querySelector('#nav');
  nav.innerHTML = View.getHtmlMenu('control-item', 'controls');
  View.setMenu(nav);
});
