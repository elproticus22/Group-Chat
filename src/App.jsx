import React, { useEffect, useRef } from 'react';
import './App.css';
import Chatbot from './components/chatbot';
import Button from './components/button';
import Pattern from './components/Backgroun';
import Button2 from './components/button2';
import AudioPlayerButton from './components/audio';
import Button3 from './components/Datos';

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

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

function App() {
  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        {/* WebGL Shader Background */}
        <ShaderBackground />
        
        {/* Content overlay */}
        <div className="relative z-10 h-full w-full flex items-center justify-center flex-col lg:flex-row">
          <div className="h-full lg:w-[65%] w-[40%] flex items-center justify-center flex-col">
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white drop-shadow-2xl'>Bienvenido A La Pagina Oficial de אוננות בפעולה.</h1>
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white drop-shadow-2xl'></h1>
          </div>
          <div className="h-full lg:w-[35%] w-[60%] flex items-center justify-center flex-col gap-3">
            {/*Aqui van las cosas*/}
            <Button text='Ver Constitucion'/>
            <Chatbot text='Habla con miguel'/>
            <Button2 text='Actual presidente'/>
            <AudioPlayerButton text='Lista de canciones'/>
            <Button3 text='Datos de la pagina'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;