(this.webpackJsonpfractalrender=this.webpackJsonpfractalrender||[]).push([[0],{122:function(t,n,e){t.exports=e(155)},154:function(t,n,e){},155:function(t,n,e){"use strict";e.r(n);var a=e(0),o=e.n(a),i=e(11),r=e.n(i),l=e(37),c=e(38),f=e(39),s=e(40);var u=function(t,n,e){var a=r(t,t.VERTEX_SHADER,n),o=r(t,t.FRAGMENT_SHADER,e),i=t.createProgram();return null!==i&&null!==a&&null!==o?(t.attachShader(i,a),t.attachShader(i,o),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)?(t.validateProgram(i),t.getProgramParameter(i,t.VALIDATE_STATUS)?i:(console.error("Error validating the program: "+t.getProgramInfoLog(i)),null)):(console.error("Error linking the program: "+t.getProgramInfoLog(i)),null)):null;function r(t,n,e){var a=t.createShader(n);return null!==a?(t.shaderSource(a,e),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)?a:(console.error("Error compiling the shader: "+t.getShaderInfoLog(a)),t.deleteShader(a),null)):null}};function m(t){return Math.abs(t.boundaries[0]-t.boundaries[1])}function g(t){return Math.abs(t.boundaries[2]-t.boundaries[3])}function d(t,n){return h(t,window.innerWidth/2,window.innerHeight/2,n)}function h(t,n,e,a){var o=a<0?.05:-.05,i=n/t.width,r=e/t.height;return{boundaries:[t.boundaries[0]+i*m(t)*o,t.boundaries[1]-(1-i)*m(t)*o,t.boundaries[2]+(1-r)*g(t)*o,t.boundaries[3]-r*g(t)*o]}}var p=function(t,n){var e=n.shaderProgram;t.vertexAttribPointer(0,3,t.FLOAT,!1,3*Float32Array.BYTES_PER_ELEMENT,0),t.enableVertexAttribArray(0),t.uniform1f(t.getUniformLocation(e,"iterations"),n.iterations),t.uniform1f(t.getUniformLocation(e,"samplingRate"),n.samplingRate),t.uniform1f(t.getUniformLocation(e,"width"),n.width),t.uniform1f(t.getUniformLocation(e,"height"),n.height),t.uniform4fv(t.getUniformLocation(e,"boundaries"),n.boundaries),t.drawArrays(t.TRIANGLE_FAN,0,4)};var v=function(t,n){t.useProgram(n);var e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),t.STATIC_DRAW)},y=function(t){Object(s.a)(e,t);var n=Object(f.a)(e);function e(){var t;Object(l.a)(this,e);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=n.call.apply(n,[this].concat(o))).gl=void 0,t}return Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this,n=this.props.store,e=document.getElementById("webgl");if(null!==e){e.width=n.getState().width,e.height=n.getState().height,this.gl=e.getContext("webgl"),this.gl||(this.gl=e.getContext("experimental-webgl")),this.gl||alert("Your browser does not support WebGL."),n.listen((function(){null!==n.getState().shaderProgram&&(t.gl.useProgram(n.getState().shaderProgram),p(t.gl,n.getState()))})),this.setShaderProgram(0),window.addEventListener("resize",(function(){e.width=window.innerWidth,e.height=window.innerHeight,n.updateState(function(t){var n=window.innerWidth-t.width,e=window.innerHeight-t.height;return{width:window.innerWidth,height:window.innerHeight,boundaries:[t.boundaries[0]-n/2*m(t)/t.width,t.boundaries[1]+n/2*m(t)/t.width,t.boundaries[2]-e/2*g(t)/t.height,t.boundaries[3]+e/2*g(t)/t.height]}}(n.getState())),t.gl.viewport(0,0,e.width,e.height)})),e.onwheel=function(t){n.updateState(function(t,n,e){if(n.preventDefault(),n.clientX>e.offsetLeft&&n.clientX<e.offsetLeft+t.width&&n.clientY>e.offsetTop&&n.clientY<e.offsetTop+t.height)return h(t,n.clientX-e.offsetLeft,n.clientY-e.offsetTop,n.deltaY)}(n.getState(),t,e))};var a=function(){var t={mode:1,previousPosition:[0,0]};return{startDrag:function(n){t.mode=0,t.previousPosition=[n.clientX,n.clientY]},endDrag:function(n){t.mode=1,t.previousPosition=[n.clientX,n.clientY]},move:function(n,e){if(0===t.mode){var a=[e.clientX,e.clientY],o=(t.previousPosition[0]-a[0])*m(n)/n.width,i=(t.previousPosition[1]-a[1])*g(n)/n.height;return t.previousPosition=a,{boundaries:[n.boundaries[0]+o,n.boundaries[1]+o,n.boundaries[2]-i,n.boundaries[3]-i]}}},isDragging:function(){return 0===t.mode}}}();e.onmousedown=function(t){a.startDrag(t)},e.onmouseup=function(t){a.endDrag(t)},e.onmousemove=function(t){a.isDragging()&&n.updateState(a.move(n.getState(),t))}}this.animateIteration()}},{key:"setShaderProgram",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.props.store,e=u(this.gl,n.getState().shaders[t].vertexShader,n.getState().shaders[t].fragmentShader);null!==e&&(v(this.gl,e),n.updateState({shaderProgram:e}))}},{key:"animateZoom",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=this.props.store;e<50&&(a.updateState(d(a.getState(),n)),requestAnimationFrame((function(){return t.animateZoom(n,e+1)})))}},{key:"animateIteration",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,e=this.props.store,a=e.getState(),o=a.iterations;o<n&&(e.updateState({iterations:o+1}),requestAnimationFrame((function(){return t.animateIteration(n)})))}},{key:"render",value:function(){return o.a.createElement("canvas",{id:"webgl"})}}]),e}(o.a.Component),x=e(70),b=e(14),w=function(t){Object(s.a)(e,t);var n=Object(f.a)(e);function e(){var t;Object(l.a)(this,e);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=n.call.apply(n,[this].concat(o))).state={isOpen:!1},t}return Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;document.body.onkeyup=function(n){32===n.keyCode&&t.setState({isOpen:!t.state.isOpen})}}},{key:"render",value:function(){var t=this,n=this.state.isOpen,e=this.props,a=e.store,i=e.iterations,r=e.samplingRate,l=e.shaders,c=e.renderer;return o.a.createElement(b.Drawer,{size:220,isOpen:n,onClose:function(){return t.setState({isOpen:!1})},hasBackdrop:!1,className:"bp3-dark"},o.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",padding:20}},o.a.createElement(b.Label,null,o.a.createElement("strong",null,"Iterations:"),o.a.createElement(b.NumericInput,{className:"bp3-dark",fill:!0,min:1,max:1e4,value:i,onValueChange:function(t){a.updateState({iterations:t})}})),o.a.createElement(b.Label,null,o.a.createElement("strong",null,"Sampling Rate:"),o.a.createElement(b.NumericInput,{className:"bp3-dark",fill:!0,min:1,max:8,value:r,onValueChange:function(t){a.updateState({samplingRate:t})}})),o.a.createElement("strong",null,"Shader:"),o.a.createElement("div",{className:"bp3-select bp3-fill",style:{marginTop:5,marginBottom:15}},o.a.createElement("select",{onChange:function(t){c.current.setShaderProgram(t.currentTarget.value)}},l.map((function(t,n){return o.a.createElement("option",{value:n,key:t.name},t.name)})))),o.a.createElement("strong",null,"Animations:"),o.a.createElement("div",{style:{marginTop:5,width:"100%"}},o.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){var t=i;a.updateState({iterations:0}),c.current.animateIteration(t)}},"Animate Iteration"),o.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){c.current.animateZoom(-1)}},"Animate Zoom In"),o.a.createElement(b.Button,{style:{marginBottom:15},icon:"function",fill:!0,onClick:function(){c.current.animateZoom(1)}},"Animate Zoom Out")),o.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",padding:5,marginBottom:15}},o.a.createElement(b.Button,{icon:"zoom-in",large:!0,onClick:function(){a.updateState(d(a.getState(),-1))}}),o.a.createElement(b.Button,{icon:"zoom-out",large:!0,onClick:function(){a.updateState(d(a.getState(),1))}}))))}}]),e}(o.a.Component),S=function(t){var n=t.store,e=Object(a.useState)(n.getState()),i=Object(x.a)(e,2),r=i[0],l=i[1];return Object(a.useEffect)((function(){n.listen((function(){l(n.getState())}))})),o.a.createElement(w,Object.assign({},t,{store:n,iterations:r.iterations,samplingRate:r.samplingRate,shaders:r.shaders}))};e(154),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var E=e(69),A=e(48),z="\nprecision mediump float;\nattribute vec2 vPosition;\nvoid main(void)\n{\n\tgl_Position = vec4(vPosition, 0.0, 1.0);\n}\n";var R=function(t){var n=window.innerWidth,e=400/600*n;e>window.innerHeight&&(n=1.5*window.innerHeight,e=window.innerHeight);var a=[window.innerWidth-n,window.innerHeight-e],o=Object(A.a)({iterations:0,samplingRate:1,boundaries:[-2-a[0]/2*(3/n),1+a[0]/2*(3/n),-1-a[1]/2*(2/e),1+a[1]/2*(2/e)],width:window.innerWidth,height:window.innerHeight,shaders:[{name:"Color",vertexShader:z,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform float samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\n// https://github.com/hughsk/glsl-hsv2rgb/blob/master/index.glsl\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > 2.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > 4.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn smoothMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / (samplingRate + 1.0);\n\tfloat m = 0.0;\n\tfor (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {\n\t\tif (float(i) > samplingRate + 1.0) {\n\t\t\tbreak;\n\t\t}\n\t\tm = m + sampling(x + float(i) * change, y + float(i) * change);\n\t}\n\treturn m / samplingRate;\n\n}\n\nvec3 colorRender(float m) {\n\tfloat hue = m / iterations;\n\tfloat saturation = 1.0;\n\tfloat value = m < iterations ? 1.0 : 0.0;\n\treturn hsv2rgb(vec3(hue, saturation, value));\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(colorRender(m), 1.0);\n}\n"},{name:"Grey",vertexShader:z,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform float samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > 2.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > 4.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn smoothMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / (samplingRate + 1.0);\n\tfloat m = 0.0;\n\tfor (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {\n\t\tif (float(i) > samplingRate + 1.0) {\n\t\t\tbreak;\n\t\t}\n\t\tm = m + sampling(x + float(i) * change, y + float(i) * change);\n\t}\n\treturn m / samplingRate;\n\n}\n\nvec3 greyRender(float m) {\n\tfloat color = 1.0 - float(m) / float(iterations);\n\treturn vec3(color, color, color);\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(greyRender(m), 1.0);\n}\n"},{name:"Black & White",vertexShader:z,fragmentShader:"\nprecision mediump float;\nconst int MAX_ITER = 65535;\nconst int MAX_SAMPLING_RATE = 4096;\nuniform float iterations;\nuniform float samplingRate;\nuniform float width;\nuniform float height;\nuniform vec4 boundaries;\n\nvec2 complexMultiplication(vec2 z1, vec2 z2)\n{\n\treturn vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);\n}\n\nfloat mandelbrot(vec2 c)\n{\n\tvec2 z = vec2(0, 0);\n\tfloat n = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (length(z) > 2.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\t\tz = complexMultiplication(z, z) + c;\n\t\tn++;\n\t}\n\treturn float(n);\n}\n\nfloat optimizedMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x2 + y2 > 4.0) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\treturn float(n);\n}\n\nfloat smoothMandelbrot(vec2 c)\n{\n\tfloat n = 0.0;\n\tfloat x2 = 0.0;\n\tfloat y2 = 0.0;\n\tfloat x = 0.0;\n\tfloat y = 0.0;\n\tfor (int i = 0; i < MAX_ITER; i++) {\n\t\tif (x * x + y * y > pow(2.0, 8.0)) {\n\t\t\tbreak;\n\t\t}\n\t\tif (n > iterations) {\n\t\t\tbreak;\n\t\t}\n\n\t\ty = 2.0 * x * y + c.y;\n\t\tx = x2 - y2 + c.x;\n\t\tx2 = x * x;\n\t\ty2 = y * y;\n\n\t\tn++;\n\t}\n\n\tif (n < iterations) {\n\t\treturn float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);\n\t}\n\n\treturn float(n);\n}\n\nfloat sampling (float x, float y) {\n\tvec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));\n\treturn smoothMandelbrot(c);\n}\n\nfloat superSampling(float x, float y) {\n\tfloat change = 1.0 / (samplingRate + 1.0);\n\tfloat m = 0.0;\n\tfor (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {\n\t\tif (float(i) > samplingRate + 1.0) {\n\t\t\tbreak;\n\t\t}\n\t\tm = m + sampling(x + float(i) * change, y + float(i) * change);\n\t}\n\treturn m / samplingRate;\n\n}\n\nvec3 bw(float m) {\n\tint color = 1 - int(m / iterations);\n\treturn vec3(color, color, color);\n}\n\nvoid main(void)\n{\n\tfloat x = gl_FragCoord.x - 0.5;\n\tfloat y = gl_FragCoord.y - 0.5;\n\n\tfloat m = superSampling(x, y);\n\n\tgl_FragColor = vec4(bw(m), 1.0);\n}\n"}],shaderProgram:null},t),i=[];function r(){var t,n=Object(E.a)(i);try{for(n.s();!(t=n.n()).done;){(0,t.value)(o)}}catch(e){n.e(e)}finally{n.f()}}return{getState:function(){return o},updateState:function(t){t&&(o=Object(A.a)({},o,{},t),r())},listen:function(t){i.push(t)},fire:r}}({}),k=function(){var t=Object(a.useRef)(null);return o.a.createElement(o.a.Fragment,null,o.a.createElement(y,{store:R,ref:t}),o.a.createElement(S,{store:R,renderer:t}))};r.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[122,1,2]]]);
//# sourceMappingURL=main.1d15ec86.chunk.js.map