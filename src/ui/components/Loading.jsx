import Ondas from '../../images/ondas3.svg';


export const Loading = () => {

  
    const backgroundLogin = {
      backgroundImage: 'url(' + Ondas + ')',
      backgroundRepeat: 'no-repeat', 
      backgroundSize: '100% 100%'
  }

    return (
        <div id = "loading_modal_su" style={{display: "block"}}>
            <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gradient-to-r from-red-900 from-1% via-colorPrimario via-95% to-colorPrimario to-90%">
              <div style={backgroundLogin}>
                <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col" >
                    <div className="loader-dots block relative w-20 h-5 mt-2">
                      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#6f3544]"></div>
                      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#a22d36]"></div>
                      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#d43c57]"></div>
                      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#dca8b9]"></div>
                    </div>
                    <div className="text-gray-500 text-xs font-medium mt-2 text-center">
                      Cargando ...
                    </div>
                </div>
              </div>
            </div>
          </div>
      );
}
