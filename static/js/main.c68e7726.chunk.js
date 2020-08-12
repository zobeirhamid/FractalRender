(this.webpackJsonpfractalrender=this.webpackJsonpfractalrender||[]).push([[0],{122:function(t,n,e){t.exports=e(155)},154:function(t,n,e){},155:function(t,n,e){"use strict";e.r(n);var a=e(0),i=e.n(a),o=e(11),r=e.n(o),l=e(37),u=e(38),s=e(39),c=e(40);var f=function(t,n,e){var a=r(t,t.VERTEX_SHADER,n),i=r(t,t.FRAGMENT_SHADER,e),o=t.createProgram();return null!==o&&null!==a&&null!==i?(t.attachShader(o,a),t.attachShader(o,i),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.validateProgram(o),t.getProgramParameter(o,t.VALIDATE_STATUS)?o:(console.error("Error validating the program: "+t.getProgramInfoLog(o)),null)):(console.error("Error linking the program: "+t.getProgramInfoLog(o)),null)):null;function r(t,n,e){var a=t.createShader(n);return null!==a?(t.shaderSource(a,e),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)?a:(console.error("Error compiling the shader: "+t.getShaderInfoLog(a)),t.deleteShader(a),null)):null}};function d(t){return Math.abs(t.boundaries[0]-t.boundaries[1])}function m(t){return Math.abs(t.boundaries[2]-t.boundaries[3])}function g(t,n){return h(t,window.innerWidth/2,window.innerHeight/2,n)}function h(t,n,e,a){var i=a<0?.05:-.05,o=n/t.width,r=e/t.height;return{boundaries:[t.boundaries[0]+o*d(t)*i,t.boundaries[1]-(1-o)*d(t)*i,t.boundaries[2]+(1-r)*m(t)*i,t.boundaries[3]-r*m(t)*i]}}var p=function(t,n){var e=n.shaderProgram;t.vertexAttribPointer(0,3,t.FLOAT,!1,3*Float32Array.BYTES_PER_ELEMENT,0),t.enableVertexAttribArray(0),t.uniform1f(t.getUniformLocation(e,"iterations"),n.iterations),t.uniform1f(t.getUniformLocation(e,"radius"),n.radius),t.uniform1i(t.getUniformLocation(e,"samplingRate"),n.samplingRate),t.uniform1f(t.getUniformLocation(e,"width"),n.width),t.uniform1f(t.getUniformLocation(e,"height"),n.height),t.uniform4fv(t.getUniformLocation(e,"boundaries"),n.boundaries),t.drawArrays(t.TRIANGLE_FAN,0,4)};var v=function(t,n){t.useProgram(n);var e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),t.STATIC_DRAW)},y=function(t){Object(c.a)(e,t);var n=Object(s.a)(e);function e(){var t;Object(l.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(t=n.call.apply(n,[this].concat(i))).gl=void 0,t}return Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this,n=this.props.store,e=document.getElementById("webgl");if(null!==e){e.width=n.getState().width,e.height=n.getState().height,this.gl=e.getContext("webgl"),this.gl||(this.gl=e.getContext("experimental-webgl")),this.gl||alert("Your browser does not support WebGL."),n.listen((function(){null!==n.getState().shaderProgram&&(t.gl.useProgram(n.getState().shaderProgram),p(t.gl,n.getState()))})),this.setShaderProgram(0),window.addEventListener("resize",(function(){e.width=window.innerWidth,e.height=window.innerHeight,n.updateState(function(t){var n=window.innerWidth-t.width,e=window.innerHeight-t.height;return{width:window.innerWidth,height:window.innerHeight,boundaries:[t.boundaries[0]-n/2*d(t)/t.width,t.boundaries[1]+n/2*d(t)/t.width,t.boundaries[2]-e/2*m(t)/t.height,t.boundaries[3]+e/2*m(t)/t.height]}}(n.getState())),t.gl.viewport(0,0,e.width,e.height)})),e.onwheel=function(t){n.updateState(function(t,n,e){if(n.preventDefault(),n.clientX>e.offsetLeft&&n.clientX<e.offsetLeft+t.width&&n.clientY>e.offsetTop&&n.clientY<e.offsetTop+t.height)return h(t,n.clientX-e.offsetLeft,n.clientY-e.offsetTop,n.deltaY)}(n.getState(),t,e))};var a=function(){var t={mode:1,previousPosition:[0,0]};return{startDrag:function(n){t.mode=0,t.previousPosition=[n.clientX,n.clientY]},endDrag:function(n){t.mode=1,t.previousPosition=[n.clientX,n.clientY]},move:function(n,e){if(0===t.mode){var a=[e.clientX,e.clientY],i=(t.previousPosition[0]-a[0])*d(n)/n.width,o=(t.previousPosition[1]-a[1])*m(n)/n.height;return t.previousPosition=a,{boundaries:[n.boundaries[0]+i,n.boundaries[1]+i,n.boundaries[2]-o,n.boundaries[3]-o]}}},isDragging:function(){return 0===t.mode}}}();e.onmousedown=function(t){a.startDrag(t)},e.onmouseup=function(t){a.endDrag(t)},e.onmousemove=function(t){a.isDragging()&&n.updateState(a.move(n.getState(),t))}}this.animateIteration()}},{key:"setShaderProgram",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.props.store,e=f(this.gl,n.getState().shaders[t].vertexShader,n.getState().shaders[t].fragmentShader);null!==e&&(v(this.gl,e),n.updateState({shaderProgram:e,activeShader:t}))}},{key:"animateZoom",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=this.props.store;e<50&&(a.updateState(g(a.getState(),n)),requestAnimationFrame((function(){return t.animateZoom(n,e+1)})))}},{key:"animateIteration",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,e=this.props.store,a=e.getState(),i=a.iterations;i<n&&(e.updateState({iterations:i+1}),requestAnimationFrame((function(){return t.animateIteration(n)})))}},{key:"animateRadius",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,e=this.props.store,a=e.getState(),i=a.radius;i<n&&(e.updateState({radius:i+.01}),requestAnimationFrame((function(){return t.animateRadius(n)})))}},{key:"render",value:function(){return i.a.createElement("canvas",{id:"webgl"})}}]),e}(i.a.Component),x=e(70),b=e(13),w=function(t){Object(c.a)(e,t);var n=Object(s.a)(e);function e(){var t;Object(l.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(t=n.call.apply(n,[this].concat(i))).state={isOpen:!1},t}return Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this;document.body.onkeyup=function(n){32===n.keyCode&&t.setState({isOpen:!t.state.isOpen})}}},{key:"render",value:function(){var t=this,n=this.state.isOpen,e=this.props,a=e.store,o=e.iterations,r=e.samplingRate,l=e.shaders,u=e.renderer,s=e.activeShader,c=e.radius;return i.a.createElement(b.Drawer,{size:220,isOpen:n,onClose:function(){return t.setState({isOpen:!1})},hasBackdrop:!1,className:"bp3-dark"},i.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",padding:20}},i.a.createElement(b.Label,null,i.a.createElement("strong",null,"Iterations:"),i.a.createElement(b.NumericInput,{className:"bp3-dark",fill:!0,min:1,max:1e4,value:o,onValueChange:function(t){a.updateState({iterations:t})}})),i.a.createElement(b.Label,null,i.a.createElement("strong",null,"Radius:"),i.a.createElement(b.NumericInput,{disabled:2!=s,className:"bp3-dark",fill:!0,min:0,max:5,stepSize:.1,value:c,onValueChange:function(t){a.updateState({radius:t})}})),i.a.createElement(b.Label,null,i.a.createElement("strong",null,"Sampling Rate:"),i.a.createElement(b.NumericInput,{className:"bp3-dark",fill:!0,min:1,max:64,value:r,onValueChange:function(t){a.updateState({samplingRate:t})}})),i.a.createElement("strong",null,"Shader:"),i.a.createElement("div",{className:"bp3-select bp3-fill",style:{marginTop:5,marginBottom:15}},i.a.createElement("select",{onChange:function(t){u.current.setShaderProgram(t.currentTarget.value)},value:s},l.map((function(t,n){return i.a.createElement("option",{value:n,key:t.name},t.name)})))),i.a.createElement("strong",null,"Animations:"),i.a.createElement("div",{style:{marginTop:5,width:"100%"}},i.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){var t=o;a.updateState({iterations:0}),u.current.animateIteration(t)}},"Animate Iteration"),i.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,disabled:2!=s,onClick:function(){a.updateState({radius:0}),u.current.animateRadius()}},"Animate Radius"),i.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){u.current.animateZoom(-1)}},"Animate Zoom In"),i.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){u.current.animateZoom(1)}},"Animate Zoom Out")),i.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",padding:5,marginBottom:15}},i.a.createElement(b.Button,{icon:"zoom-in",large:!0,onClick:function(){a.updateState(g(a.getState(),-1))}}),i.a.createElement(b.Button,{icon:"zoom-out",large:!0,onClick:function(){a.updateState(g(a.getState(),1))}}))))}}]),e}(i.a.Component),S=function(t){var n=t.store,e=Object(a.useState)(n.getState()),o=Object(x.a)(e,2),r=o[0],l=o[1];return Object(a.useEffect)((function(){n.listen((function(){l(n.getState())}))})),i.a.createElement(w,Object.assign({},t,{store:n,iterations:r.iterations,samplingRate:r.samplingRate,shaders:r.shaders,activeShader:r.activeShader,radius:r.radius}))};e(154),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var E=e(69),z=e(48),A="\nprecision mediump float;\nattribute vec2 vPosition;\nvoid main(void)\n{\n\tgl_Position = vec4(vPosition, 0.0, 1.0);\n}\n";var R=function(t){var n=window.innerWidth,e=400/600*n;e>window.innerHeight&&(n=1.5*window.innerHeight,e=window.innerHeight);var a=[window.innerWidth-n,window.innerHeight-e],i=Object(z.a)({iterations:0,samplingRate:1,radius:2,boundaries:[-2-a[0]/2*(3/n),1+a[0]/2*(3/n),-1-a[1]/2*(2/e),1+a[1]/2*(2/e)],width:window.innerWidth,height:window.innerHeight,shaders:[{name:"Color",vertexShader:A,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform int samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\nuniform float radius;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\n// https://github.com/hughsk/glsl-hsv2rgb/blob/master/index.glsl\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > radius) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfloat bound = radius * radius;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > bound) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn smoothMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / (float(samplingRate) + 1.0);\n\tfloat m = 0.0;\n\tfor (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {\n\t\tif (i > (samplingRate + 1)) {\n\t\t\tbreak;\n\t\t}\n\t\tm = m + sampling(x + float(i) * change, y + float(i) * change);\n\t}\n\treturn m / float(samplingRate);\n}\n\nvec3 colorRender(float m) {\n\tfloat hue = m / iterations;\n\tfloat saturation = 1.0;\n\tfloat value = m < iterations ? 1.0 : 0.0;\n\treturn hsv2rgb(vec3(hue, saturation, value));\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(colorRender(m), 1.0);\n}\n"},{name:"Grey",vertexShader:A,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform int samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\nuniform float radius;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > radius) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfloat bound = radius * radius;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > bound) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn smoothMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / 4.0;\n\tfloat m = iterations;\n\n\tfor (int i = 0; i < 64; i++){\n\t\tif (i > 3) {\n\t\t\tbreak;\n\t\t}\n\n\t\tfor (int j = 0; j < 64; j++){\n\t\t\tif (j > 3) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tfloat sample = sampling(x + float(i) * change, y + float(j) * change);\n\n\t\t\tif (sample < m){\n\t\t\t\tm = sample;\n\t\t\t}\n\n\t\t}\n\t}\n\treturn m;\n\n}\n\nvec3 greyRender(float m) {\n\tfloat color = 1.0 - float(m) / float(iterations);\n\treturn vec3(color, color, color);\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(greyRender(m), 1.0);\n}\n"},{name:"Black & White",vertexShader:A,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform int samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\nuniform float radius;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > radius) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfloat bound = radius * radius;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > bound) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn optimizedMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / (float(samplingRate) + 1.0);\n\tfloat m = 0.0;\n\tfor (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {\n\t\tif (i > (samplingRate + 1)) {\n\t\t\tbreak;\n\t\t}\n\t\tm = m + sampling(x + float(i) * change, y + float(i) * change);\n\t}\n\treturn m / float(samplingRate);\n}\n\nvec3 bw(float m) {\n\tint color = 1 - int(m / iterations);\n\treturn vec3(color, color, color);\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(bw(m), 1.0);\n}\n"}],shaderProgram:null,activeShader:0},t),o=[];function r(){var t,n=Object(E.a)(o);try{for(n.s();!(t=n.n()).done;){(0,t.value)(i)}}catch(e){n.e(e)}finally{n.f()}}return{getState:function(){return i},updateState:function(t){t&&(i=Object(z.a)({},i,{},t),r())},listen:function(t){o.push(t)},fire:r}}({}),k=function(){var t=Object(a.useRef)(null);return i.a.createElement(i.a.Fragment,null,i.a.createElement(y,{store:R,ref:t}),i.a.createElement(S,{store:R,renderer:t}))};r.a.render(i.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[122,1,2]]]);
//# sourceMappingURL=main.c68e7726.chunk.js.map