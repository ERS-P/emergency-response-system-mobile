/* eslint-disable no-unused-expressions */
import React, { createContext, useState, useMemo } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [tipsdata, setTipsData] = useState({});
  const [newsFeed, setNewsFeed] = useState({});
  const [mapData, setMapData] = useState({});

  const [modalVisible, setmodalVisible] = useState(false);

  const openModal = (items) => {
    setTipsData(items);
    setmodalVisible(true);
  };
  
  const Modal=()=>{
   setmodalVisible(true);
  }

  const openNewsModal = (items) => {
    setNewsFeed(items);
    setmodalVisible(true);
  };

  const openMapModal = (items) => {
    setMapData(items);
    setmodalVisible(true);
  };

  const value = useMemo(
    () => ({
      mapData,
      setMapData,
      tipsdata,
      setTipsData,
      newsFeed,
      setNewsFeed,
      modalVisible,
      setmodalVisible,
      openMapModal,
      openModal,
      Modal,
      openNewsModal,
    }),
    [
      tipsdata,
      openModal,
      newsFeed,
      openNewsModal,
      mapData,
      openMapModal,
      modalVisible,
      Modal,
    ]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
