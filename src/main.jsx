import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '50px', background: '#900', color: 'white', zIndex: 99999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto'}}>
          <h1 style={{fontSize: '32px'}}>Application Crashed</h1>
          <h2 style={{fontSize: '24px'}}>{this.state.error?.message}</h2>
          <pre style={{marginTop: '20px', whiteSpace: 'pre-wrap', fontSize: '14px'}}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
