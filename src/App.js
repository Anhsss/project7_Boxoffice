import BoxMv from "./BoxOffice/BoxMv";
import BoxOffice from "./BoxOffice/BoxOffice";
import { Route, Routes} from "react-router-dom"
function App() {
  return (
   <>
    <Routes>
      {/* url 경로 */}
      <Route path="/" element={<BoxOffice />}></Route>
      <Route path="/mv" element={<BoxMv />}></Route>
    </Routes>
   </>
  );
}

export default App;
