import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Chatbot from './components/chatbot';
import Button from './components/button';
import Pattern from './components/Backgroun';
import Button2 from './components/button2';
import AudioPlayerButton from './components/audio';
import Button3 from './components/Datos';
import Button4 from './components/scream';

const ShaderBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      #define SPIN_ROTATION -2.0
      #define SPIN_SPEED 7.0
      #define OFFSET vec2(0.0)
      #define COLOUR_1 vec4(0.871, 0.267, 0.231, 1.0)
      #define COLOUR_2 vec4(0.0, 0.42, 0.706, 1.0)
      #define COLOUR_3 vec4(0.086, 0.137, 0.145, 1.0)
      #define CONTRAST 3.5
      #define LIGTHING 0.4
      #define SPIN_AMOUNT 0.25
      #define PIXEL_FILTER 745.0
      #define SPIN_EASE 1.0
      #define PI 3.14159265359
      #define IS_ROTATE false

      vec4 effect(vec2 screenSize, vec2 screen_coords) {
          float pixel_size = length(screenSize.xy) / PIXEL_FILTER;
          vec2 uv = (floor(screen_coords.xy*(1./pixel_size))*pixel_size - 0.5*screenSize.xy)/length(screenSize.xy) - OFFSET;
          float uv_len = length(uv);
          
          float speed = (SPIN_ROTATION*SPIN_EASE*0.2);
          if(IS_ROTATE){
            speed = iTime * speed;
          }
          speed += 302.2;
          float new_pixel_angle = atan(uv.y, uv.x) + speed - SPIN_EASE*20.*(1.*SPIN_AMOUNT*uv_len + (1. - 1.*SPIN_AMOUNT));
          vec2 mid = (screenSize.xy/length(screenSize.xy))/2.;
          uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);
          
          uv *= 30.;
          speed = iTime*(SPIN_SPEED);
          vec2 uv2 = vec2(uv.x+uv.y);
          
          for(int i=0; i < 5; i++) {
              uv2 += sin(max(uv.x, uv.y)) + uv;
              uv  += 0.5*vec2(cos(5.1123314 + 0.353*uv2.y + speed*0.131121),sin(uv2.x - 0.113*speed));
              uv  -= 1.0*cos(uv.x + uv.y) - 1.0*sin(uv.x*0.711 - uv.y);
          }
          
          float contrast_mod = (0.25*CONTRAST + 0.5*SPIN_AMOUNT + 1.2);
          float paint_res = min(2., max(0.,length(uv)*(0.035)*contrast_mod));
          float c1p = max(0.,1. - contrast_mod*abs(1.-paint_res));
          float c2p = max(0.,1. - contrast_mod*abs(paint_res));
          float c3p = 1. - min(1., c1p + c2p);
          float light = (LIGTHING - 0.2)*max(c1p*5. - 4., 0.) + LIGTHING*max(c2p*5. - 4., 0.);
          return (0.3/CONTRAST)*COLOUR_1 + (1. - 0.3/CONTRAST)*(COLOUR_1*c1p + COLOUR_2*c2p + vec4(c3p*COLOUR_3.rgb, c3p*COLOUR_1.a)) + light;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        gl_FragColor = effect(iResolution.xy, uv * iResolution.xy);
      }
    `;
    //The shader code aint mine, its from a super talented person on shadertoy, heres the link to the original thing: https://www.shadertoy.com/view/XXtBRr
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolution = gl.getUniformLocation(program, "iResolution");
    const iTime = gl.getUniformLocation(program, "iTime");

    function render(time) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolution, canvas.width, canvas.height);
      gl.uniform1f(iTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(render);
    }

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  // To do: Fix performan issues, this thing takes way too much resources for itself... 
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

// New Vaporwave Shader Background, also aint mine, its from another person at shadertoy: https://www.shadertoy.com/view/Wt33Wf
const VaporwaveShaderBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const vertexShaderSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`;

    const fragmentShaderSource = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;

    float sun(vec2 uv, float battery) {
      float val = smoothstep(0.3, 0.29, length(uv));
      float bloom = smoothstep(0.7, 0.0, length(uv));
      float cut = 3.0 * sin((uv.y + iTime * 0.2 * (battery + 0.02)) * 100.0) 
                + clamp(uv.y * 14.0 + 1.0, -6.0, 6.0);
      cut = clamp(cut, 0.0, 1.0);
      return clamp(val * cut, 0.0, 1.0) + bloom * 0.6;
    }

    float grid(vec2 uv, float battery) {
      vec2 size = vec2(uv.y, uv.y * uv.y * 0.2) * 0.01;
      uv += vec2(0.0, iTime * 4.0 * (battery + 0.05));
      uv = abs(fract(uv) - 0.5);
      vec2 lines = smoothstep(size, vec2(0.0), uv);
      lines += smoothstep(size * 5.0, vec2(0.0), uv) * 0.4 * battery;
      return clamp(lines.x + lines.y, 0.0, 3.0);
    }

    float dot2(in vec2 v ) { return dot(v,v); }

    float sdTrapezoid( in vec2 p, in float r1, float r2, float he ) {
      vec2 k1 = vec2(r2,he);
      vec2 k2 = vec2(r2-r1,2.0*he);
      p.x = abs(p.x);
      vec2 ca = vec2(p.x-min(p.x,(p.y<0.0)?r1:r2), abs(p.y)-he);
      vec2 cb = p - k1 + k2*clamp( dot(k1-p,k2)/dot2(k2), 0.0, 1.0 );
      float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
      return s*sqrt( min(dot2(ca),dot2(cb)) );
    }

    float sdLine( in vec2 p, in vec2 a, in vec2 b ) {
      vec2 pa = p-a, ba = b-a;
      float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
      return length( pa - ba*h );
    }

    float sdBox( in vec2 p, in vec2 b ) {
      vec2 d = abs(p)-b;
      return length(max(d,vec2(0))) + min(max(d.x,d.y),0.0);
    }

    float opSmoothUnion(float d1, float d2, float k){
      float h = clamp(0.5 + 0.5 * (d2 - d1) /k,0.0,1.0);
      return mix(d2, d1 , h) - k * h * ( 1.0 - h);
    }

    float sdCloud(in vec2 p, in vec2 a1, in vec2 b1, in vec2 a2, in vec2 b2, float w) {
      float lineVal1 = sdLine(p, a1, b1);
      float lineVal2 = sdLine(p, a2, b2);
      vec2 ww = vec2(w*1.5, 0.0);
      vec2 left = max(a1 + ww, a2 + ww);
      vec2 right = min(b1 - ww, b2 - ww);
      vec2 boxCenter = (left + right) * 0.5;
      float boxH = abs(a2.y - a1.y) * 0.5;
      float boxVal = sdBox(p - boxCenter, vec2(0.04, boxH)) + w;
      float uniVal1 = opSmoothUnion(lineVal1, boxVal, 0.05);
      float uniVal2 = opSmoothUnion(lineVal2, boxVal, 0.05);
      return min(uniVal1, uniVal2);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      vec2 uv = (2.0 * fragCoord.xy - iResolution.xy)/iResolution.y;
      float battery = 1.0;

      float fog = smoothstep(0.1, -0.02, abs(uv.y + 0.2));
      vec3 col = vec3(0.0, 0.1, 0.2);
      if (uv.y < -0.2) {
        uv.y = 3.0 / (abs(uv.y + 0.2) + 0.05);
        uv.x *= uv.y * 1.0;
        float gridVal = grid(uv, battery);
        col = mix(col, vec3(1.0, 0.5, 1.0), gridVal);
      } else {
        float fujiD = min(uv.y * 4.5 - 0.5, 1.0);
        uv.y -= battery * 1.1 - 0.51;
        vec2 sunUV = uv;
        sunUV += vec2(0.75, 0.2);
        col = vec3(1.0, 0.2, 1.0);
        float sunVal = sun(sunUV, battery);
        col = mix(col, vec3(1.0, 0.4, 0.1), sunUV.y * 2.0 + 0.2);
        col = mix(vec3(0.0, 0.0, 0.0), col, sunVal);

        float fujiVal = sdTrapezoid( uv + vec2(-0.75+sunUV.y * 0.0, 0.5), 1.75 + pow(uv.y * uv.y, 2.1), 0.2, 0.5);
        float waveVal = uv.y + sin(uv.x * 20.0 + iTime * 2.0) * 0.05 + 0.2;
        float wave_width = smoothstep(0.0,0.01,(waveVal));
        col = mix( col, mix(vec3(0.0, 0.0, 0.25), vec3(1.0, 0.0, 0.5), fujiD), step(fujiVal, 0.0));
        col = mix( col, vec3(1.0, 0.5, 1.0), wave_width * step(fujiVal, 0.0));
        col = mix( col, vec3(1.0, 0.5, 1.0), 1.0-smoothstep(0.0,0.01,abs(fujiVal)));
        col += mix( col, mix(vec3(1.0, 0.12, 0.8), vec3(0.0, 0.0, 0.2), clamp(uv.y * 3.5 + 3.0, 0.0, 1.0)), step(0.0, fujiVal) );

        vec2 cloudUV = uv;
        cloudUV.x = mod(cloudUV.x + iTime * 0.1, 4.0) - 2.0;
        float cloudTime = iTime * 0.5;
        float cloudY = -0.5;
        float cloudVal1 = sdCloud(cloudUV, vec2(0.1 + sin(cloudTime + 140.5)*0.1,cloudY), 
                                  vec2(1.05 + cos(cloudTime * 0.9 - 36.56) * 0.1, cloudY), 
                                  vec2(0.2 + cos(cloudTime * 0.867 + 387.165) * 0.1,0.25+cloudY), 
                                  vec2(0.5 + cos(cloudTime * 0.9675 - 15.162) * 0.09, 0.25+cloudY), 0.075);
        cloudY = -0.6;
        float cloudVal2 = sdCloud(cloudUV, vec2(-0.9 + cos(cloudTime * 1.02 + 541.75) * 0.1,cloudY), 
                                  vec2(-0.5 + sin(cloudTime * 0.9 - 316.56) * 0.1, cloudY), 
                                  vec2(-1.5 + cos(cloudTime * 0.867 + 37.165) * 0.1,0.25+cloudY), 
                                  vec2(-0.6 + sin(cloudTime * 0.9675 + 665.162) * 0.09, 0.25+cloudY), 0.075);
        float cloudVal = min(cloudVal1, cloudVal2);
        col = mix(col, vec3(0.0, 0.0, 0.2), 1.0 - smoothstep(0.075 - 0.0001, 0.075, cloudVal));
        col += vec3(1.0, 1.0, 1.0)*(1.0 - smoothstep(0.0,0.01,abs(cloudVal - 0.075)));
      }

      col += fog * fog * fog;
      col = mix(vec3(col.r, col.r, col.r) * 0.5, col, battery * 0.7);
      fragColor = vec4(col, 1.0);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResolutionLoc = gl.getUniformLocation(program, 'iResolution');

    function render(time) {
      time *= 0.001;
      gl.uniform1f(iTimeLoc, time);
      gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(render);
    }
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

function App() {
  const [useVaporwaveBackground, setUseVaporwaveBackground] = useState(false);

  // Random background selection on component mount
  useEffect(() => {
    // Generate random number between 1-20
    const randomNum = Math.floor(Math.random() * 10) + 1;
    
    // 1 in 10 chance (10%) for vaporwave background
    if (randomNum === 1) {
      setUseVaporwaveBackground(true);
      console.log('vaporwave backgrond(1/20 chance)');
    } else {
      setUseVaporwaveBackground(false);
      console.log('');
    }
  }, []);

  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        {/* Conditional Background Rendering */}
        {useVaporwaveBackground ? <VaporwaveShaderBackground /> : <ShaderBackground />}
        
        {/* Content overlay */}
        <div className="relative z-10 h-full w-full flex items-center justify-center flex-col lg:flex-row">
          <div className="h-full lg:w-[65%] w-[40%] flex items-center justify-center flex-col">
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white drop-shadow-2xl'>Bienvenido A La Pagina Oficial</h1>
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white drop-shadow-2xl'></h1>
          </div>
          <div className="h-full lg:w-[35%] w-[60%] flex items-center justify-center flex-col gap-3">
            {/*Here are the things
              Todo: Give a fixed size to these so they are simetrical
            */}
            <Button text='Ver Constitucion'/>
            <Chatbot text='Habla con miguel'/>
            <Button2 text='Actual presidente'/>
            <AudioPlayerButton text='Lista de canciones'/>
            <Button3 text='Datos de la pagina'/>
            <Button4 text='Seccion de miembros'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;