import { BrowserRouter } from "react-router-dom";
import { getPlatform } from "./shared/utils/platform";
import { Platform } from "./shared/enums/platform";
import { Routes } from "./routes";
import { initAnalytics } from "./services/firebase";
import { useEffect } from "react";



const App = () => {
  const { platform, isProduction } = getPlatform();
  
  const basename = platform === Platform.ADMIN ? "/admin" : undefined;

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <Routes rule={platform} isProduction={isProduction} />
    </BrowserRouter>
  );
};

export default App;
