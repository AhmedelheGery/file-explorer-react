import explorer from './utils/fileData';
import FileExplorer from './pages/file-explorer';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <FileExplorer explorer={explorer} />
    </div>
  );
};

export default App;
