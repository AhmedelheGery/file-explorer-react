import { useState } from 'react';
import ContextMenu from '../../components/context-menu';

export interface ExplorerProps {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerProps[];
}

interface FolderProps {
  explorer: ExplorerProps;
}

const FileExplorer: React.FC<FolderProps> = ({ explorer }) => {
  const [expand, setExpand] = useState(false);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedItem, setSelectedItem] = useState<ExplorerProps | null>(null);

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: ExplorerProps
  ) => {
    e.preventDefault();
    setSelectedItem(item);
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action} on file/folder: ${selectedItem?.name}`);
    handleCloseContextMenu();
  };

  return (
    <div>
      {explorer.isFolder ? (
        <div className='file-explorer-container'>
          {/* ROOT  */}
          <div
            className='folder'
            onClick={() => setExpand(!expand)}
            onContextMenu={(e) => handleRightClick(e, explorer)}
          >
            <span>📂{explorer.name}</span>
          </div>
          {/* CHILDREN OF ROOT */}
          <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
            {explorer.items.map((item: ExplorerProps) => {
              return <FileExplorer explorer={item} key={item.id} />;
            })}
          </div>
        </div>
      ) : (
        <div
          className='file'
          onContextMenu={(e) => handleRightClick(e, explorer)}
        >
          {/* FILES */}
          <span>🗄 {explorer.name}</span>
        </div>
      )}
      {showContextMenu && selectedItem === explorer && (
        <ContextMenu
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
          handleAction={handleAction}
          handleCloseContextMenu={handleCloseContextMenu}
        />
      )}
    </div>
  );
};

export default FileExplorer;
