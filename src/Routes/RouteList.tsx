import { Route } from 'react-router-dom';
import Home from '../pages/Home';

// define routes here
// define routes here
export const RouteList = (
  <>
    <Route path="/home" element={<Home />} />
    <Route path="/analysis" element={<Home />} />
  </>
);

export default RouteList;
