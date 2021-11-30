(function() {
  var multiplex = Reveal.getConfig().multiplex;
  var socket = new Paho.Client( multiplex.url, 'multiplex-' + parseInt(Math.random() * 100000));

  socket.onConnectionLost = console.log;
  socket.onMessageArrived = function(msg) {
    msg = JSON.parse(msg.payloadString);
    Reveal.setState(msg.state);
  };

  socket.connect({
    userName: multiplex.user,
    password: multiplex.passwd,
    onFailure: console.log,
    onSuccess: function() {
      socket.subscribe(multiplex.id);
  }});
}());
