import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEntry from './pages/CreateEntry';
import EntryDetail from './pages/EntryDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>📔 My Diary</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/create">New Entry</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEntry />} />
            <Route path="/entry/:id" element={<EntryDetail />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Design and Developed by <span>Mohit Jamaiwar</span></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
