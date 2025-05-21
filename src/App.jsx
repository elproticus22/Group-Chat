import './App.css';
import Chatbot from './components/chatbot';
import Button from './components/button';
import Pattern from './components/Backgroun';

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-[lightblue] relative overflow-hidden">
        
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] z-0 animated-pattern pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle, #3498db 10%, transparent 20%),
              radial-gradient(circle, transparent 10%, #3498db 20%)
            `,
            backgroundSize: '30px 30px',
          }}
        ></div>

        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <div className="h-full lg:w-[65%] w-[40%] flex items-center justify-center flex-col">
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white no-underline'>Bienvenido A La Pagina Oficial de:</h1>
            <h1 className='text-[15px] lg:text-[38px] tracking-[2px] uppercase text-center font-bold text-white no-underline'></h1>
          </div>
          <div className=" h-full lg:w-[35%] w-[60%] flex items-center justify-center flex-col gap-3">
            {/*Aqui van las cosas*/}
            <Button text='Ver Constitucion'/>
            <Chatbot text='Habla con miguel'/>
          </div>
        </div>

        <style>{`
          @keyframes movePattern {
            0% { transform: translate(0, 0); }
            100% { transform: translate(20%, 20%); }
          }

          .animated-pattern {
            animation: movePattern 8s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
