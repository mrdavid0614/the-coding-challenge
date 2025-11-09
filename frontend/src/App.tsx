import { Routes, Route } from 'react-router-dom';
import ApiViewer from './ApiViewer';
import ReadmeViewer from './ReadmeViewer';
import Welcome from './Welcome';
import Index from './Index';

function App() {
  return (
    <Routes>
      <Route path="/api/viewer" element={<ApiViewer />} />
      <Route path="/readme" element={<ReadmeViewer />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Index />} />
    </Routes>
  );
}

export default App;

