import React, { useState, useEffect } from "react";
import "./FolderList.css";
import FolderAdd from "../../assets/icons/FolderAdd";
import ShareIcon from "../../assets/icons/Share";
import PenIcon from "../../assets/icons/Pen";
import DeleteIcon from "../../assets/icons/Delete";
import { BASE_API_URL } from "../../utils/apiConfig";

function ActionItem({ icon: IconComponent, label }) {
  return (
    <div className="action-item">
      <IconComponent />
      <span>{label}</span>
    </div>
  );
}

function FolderList({ onFolderSelect }) {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("전체");
  const userId = 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}/folders`);
        if (response.status === 200) {
          const data = await response.json();
          setFolders(data.data);
        }
      } catch (error) {}
    }

    fetchData();
  }, []);

  const handleFolderClick = (folderId, folderName) => {
    if (folderId) {
      setSelectedFolder(folderName);
      onFolderSelect(folderId);
    } else {
      setSelectedFolder("전체");
      onFolderSelect(null, true);
    }
  };

  return (
    <div className="folders">
      <div className="folder-list">
        <div className="folder-item" onClick={() => handleFolderClick(null)}>
          전체
        </div>
        {folders.map((folder) => (
          <div
            className="folder-item"
            key={folder.id}
            onClick={() => handleFolderClick(folder.id, folder.name)}
          >
            {folder.name}
          </div>
        ))}
      </div>
      <div className="folder-add">
        폴더 추가
        <FolderAdd />
      </div>
      <span className="folder-select">{selectedFolder}</span>
      {selectedFolder !== "전체" && (
        <div className="folder-actions">
          <ActionItem icon={ShareIcon} label="공유" />
          <ActionItem icon={PenIcon} label="이름 변경" />
          <ActionItem icon={DeleteIcon} label="삭제" />
        </div>
      )}
    </div>
  );
}

export default FolderList;