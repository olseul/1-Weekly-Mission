import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./CardStyles.css";
import API from "../../utils/api";

interface CardListProps {
  isFolderPage: boolean;
  folderId?: number;
  updateHasLinks?: (hasLinks: boolean) => void;
}

const CardList = ({
  isFolderPage,
  folderId,
  updateHasLinks,
}: CardListProps) => {
  const [links, setLinks] = useState([]);
  const userId = 1;

  useEffect(() => {
    let url;
    if (isFolderPage) {
      url = folderId
        ? `${API.USER.LINKS(userId)}?folderId=${folderId}`
        : API.USER.LINKS(userId);
    } else {
      url = API.SAMPLE.FOLDER;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const linkData = isFolderPage ? data.data : data.folder.links;
        setLinks(linkData || []);
        if (updateHasLinks) {
          updateHasLinks(linkData && linkData.length > 0);
        }
      });
  }, [isFolderPage, folderId, updateHasLinks]);

  return (
    <div className="card-list">
      {links.length ? (
        links.map((link) => (
          <Card key={link.id} link={link} isFolderPage={isFolderPage} />
        ))
      ) : (
        <div className="no-link">저장된 링크가 없습니다.</div>
      )}
    </div>
  );
};

export default CardList;