import React from "react";

export function AvatarCircles({ numPeople, avatarUrls, className }) {
  return (
    <div className={`testi-avatars-small ${className || ""}`}>
      {avatarUrls.map((avatar, index) => (
        <a key={index} href={avatar.profileUrl} target="_blank" rel="noopener noreferrer">
          <img src={avatar.imageUrl} alt={`Avatar ${index}`} />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <span className="testi-avatar-count">+{numPeople}</span>
      )}
    </div>
  );
}
