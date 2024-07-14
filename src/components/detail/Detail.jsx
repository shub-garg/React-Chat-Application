import React, { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [isAvailable, setIsAvailable] = useState(user?.isavail);
  const [chatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [sharedPhotos, setSharedPhotos] = useState([]);
  const [privacyHelpOpen, setPrivacyHelpOpen] = useState(false);


  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.id);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setIsAvailable(doc.data().isavail);
    });

    return () => unsubscribe();
  }, [user]);


  useEffect(() => {
    if (!chatId) return;

    const chatDocRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(chatDocRef, (doc) => {
      const messages = doc.data().messages || [];
      const photos = messages.filter(message => message.img);
      if (Array.isArray(photos)) {
        setSharedPhotos(photos.slice(-3)); // Get last 3 photos
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        isavail: false,
      });
      
      auth.signOut();
      resetChat();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveUser = async () => {
    if (!user) return;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const updatedChats = userChatsData.chats.filter(
          (chat) => chat.receiverId !== user.id
        );

        await updateDoc(userChatsRef, {
          chats: updatedChats,
        });

        resetChat(); // Reset the chat after removing the user
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.click();
  };
  


  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleString();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p className={isAvailable ? "available" : "away"}>{isAvailable ? "● Available" : "● Away"}</p>
      </div>
      <div className="info">
        <div className="option" onClick={() => setChatSettingsOpen(!chatSettingsOpen)}>
          <div className="title">
            <span>Chat Settings</span>
            <img src={chatSettingsOpen ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
          </div>
          {chatSettingsOpen && (
            <div className="dropdown">
              <button className="remove" onClick={handleRemoveUser}>Remove User</button>
            </div>
          )}
        </div>
        <div className="option" onClick={() => setPrivacyHelpOpen(!privacyHelpOpen)}>
  <div className="title">
    <span>Privacy & help</span>
    <img src={privacyHelpOpen ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
  </div>
  {privacyHelpOpen && (
    <div className="dropdown">
      <a href="https://drive.google.com/file/d/18P-Y1QhdlCW1MmxcBGOvFPYmwv9qvHG2/view?usp=sharing" target="_blank" rel="noopener noreferrer" >Read about our privacy & help</a>
    </div>
  )}
</div>

        <div className="option" onClick={() => setPhotosOpen(!photosOpen)}>
  <div className="title">
    <span>Shared photos</span>
    <img src={photosOpen ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
  </div>
  {photosOpen && sharedPhotos.map((photo, index) => (
  <div className="photos" key={index} onClick={(e) => e.stopPropagation()}>
    <div className="photoItem">
      <div className="photoDetail">
        <img src={photo.img} alt="" />
        <span>{formatDate(photo.createdAt)}</span>
      </div>
      <img src="./download.png" alt="" className="icon" onClick={() => handleDownload(photo.img, `photo_${index + 1}.png`)} />
    </div>
  </div>
))}

</div>


        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
