import { Link } from 'react-router-dom';
import { PortfolioView } from './components/PortfolioView';
import './App.css';

function Index() {
  return (
    <div className="container">
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Link to="/welcome" style={{ color: '#646cff', textDecoration: 'none' }}>Welcome</Link>
          <Link to="/api/viewer" style={{ color: '#646cff', textDecoration: 'none' }}>API Viewer</Link>
          <Link to="/readme" style={{ color: '#646cff', textDecoration: 'none' }}>README</Link>
        </div>
      </div>
      <PortfolioView />
    </div>
  );
}

export default Index;

