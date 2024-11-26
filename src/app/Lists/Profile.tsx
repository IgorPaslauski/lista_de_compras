import { useEffect, useState } from "react";
import { InputCustomizado } from "../InputCustomizado";
import { toast } from "@/hooks/use-toast";
import { Get } from "../utils/fetchUtils";

export interface UserInfo {
  email: string;
  name: string;
  userId: string;
  itemsAdded: number;
  entryDate: string;
}

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const userNameSigla = localStorage.getItem("userNameSigla");

  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    name: "",
    userId: "",
    itemsAdded: 0,
    entryDate: "",
  });
  useEffect(() => {
    Get({
      url: `users/${userId}`,
      funcSuccess: (data) => {
        setUserInfo(data);
      },
      funcError: () => {
        toast({
          title: "Failed to load user information.",
          description: `${new Date().toLocaleString()}`,
          variant: "destructive",
        });
      },
      funcFinally: () => {},
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-info-image">
          <p>{userNameSigla}</p>
        </div>
        <div className="w-3/6">
          <InputCustomizado
            type="text"
            placeholder="Email"
            ariaLabel=""
            onChange={() => {}}
            value={userInfo.name}
            disabled={true}
          />
        </div>
        <div className="w-full">
          <InputCustomizado
            type="text"
            placeholder="Email"
            ariaLabel=""
            onChange={() => {}}
            value={userInfo.email}
            disabled={true}
          />
        </div>
        <div className="profile-info-details">
          <div className="profile-info-details-date">
            <div>Member since:</div>
            <div>{userInfo.entryDate}</div>
          </div>
          <div className="profile-info-details-quantity">
            <div>Items created: {userInfo.itemsAdded}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
