# EventEmitter
### 引入并初始化
<pre><code>   
    var event = new EventEmitter();
    event.on( 'login', function ( data ) {
        console.log( data )
    } );
    event.once( 'logout', function ( data ) {
        console.log( data )
    } ).emit( 'login', {
        uid: 123,
        login: true
    } ).emit( 'login', {
        uid: 234,
        login: true
    } ).emit( 'logout', {
        uid: 123,
        login: false
    } ).emit( 'logout', {
        uid: 123,
        login: false
    } ).clear();
    console.log( event )
    </code></pre>
