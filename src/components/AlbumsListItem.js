import { useState } from "react";
import { GoTrashcan } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";
import { useEditAlbumMutation, useRemoveAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const [editAlbum, editResults] = useEditAlbumMutation();
  // const [editMode, setEditMode] = useState(false);
  const [albumData, setAlbumData] = useState({
    editMode: false,
    newAlbumName: album.title,
  });
  console.log(album);
  const handlerSaveClick = async () => {
    try {
      await editAlbum({
        id: album.id,
        title: albumData.newAlbumName,
        album,
      }).unwrap();
      setAlbumData((prevState) => ({ ...prevState, editMode: false }));
    } catch (error) {
      alert(error);
    }
  };

  const handlerInputChange = (e) => {
    setAlbumData((prevState) => ({
      ...prevState,
      newAlbumName: e.target.value,
    }));
  };

  const handleCancelClick = () => {
    setAlbumData((prevState) => ({
      ...prevState,
      editMode: false,
      newAlbumName: album.title,
    }));
  };

  const handlerEditClick = () => {
    setAlbumData((prevState) => ({
      ...prevState,
      editMode: true,
      newAlbumName: "",
    }));
  };

  const handlerRemoveClick = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        onClick={handlerRemoveClick}
        loading={results.isLoading}
      >
        <GoTrashcan />
      </Button>
      {albumData.editMode ? (
        <>
          <input
            type="text"
            value={albumData.newAlbumName}
            onChange={handlerInputChange}
          />
          <Button onClick={handlerSaveClick}>Save</Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </>
      ) : (
        <>
          <Button
            className="mr-2"
            loading={editResults.isLoading}
            onClick={handlerEditClick}
          >
            <AiOutlineEdit />
          </Button>
          {album.title}
        </>
      )}
    </>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
