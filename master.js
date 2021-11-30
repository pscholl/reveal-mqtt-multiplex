(function() {

  // Don't emit events from inside of notes windows
  if ( window.location.search.match( /receiver/gi ) ) { return; }

  var multiplex = Reveal.getConfig().multiplex;
  var socket = new Paho.Client( multiplex.url, 'multiplex-' + parseInt(Math.random() * 100000));

  socket.connect({
    userName: multiplex.user,
    password: multiplex.passwd,
    onFailure: console.log,
    onSuccess: function() {
      function post() {

        var messageData = {
          state: Reveal.getState(),
          secret: 123,
        };

        socket.send( multiplex.id, JSON.stringify(messageData) );

      };

      // post once the page is loaded, so the client follows also on "open URL".
      window.addEventListener( 'load', post );

      // Monitor events that trigger a change in state
      Reveal.on( 'slidechanged', post );
      Reveal.on( 'fragmentshown', post );
      Reveal.on( 'fragmenthidden', post );
      Reveal.on( 'overviewhidden', post );
      Reveal.on( 'overviewshown', post );
      Reveal.on( 'paused', post );
      Reveal.on( 'resumed', post );
  }});
}());
