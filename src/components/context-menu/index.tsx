interface ContextMenuProps {
  style: React.CSSProperties;
  handleCloseContextMenu: () => void;
  handleAction: (action: 'Copy' | 'Delete' | 'Rename') => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  style,
  handleCloseContextMenu,
  handleAction,
}) => {
  return (
    <div
      className='menu-wrapper'
      style={style}
      onMouseLeave={handleCloseContextMenu}
    >
      <ul>
        <li className='list-item' onClick={() => handleAction('Copy')}>
          Copy
        </li>
        <li className='list-item' onClick={() => handleAction('Delete')}>
          Delete
        </li>
        <li className='list-item' onClick={() => handleAction('Rename')}>
          Rename
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
