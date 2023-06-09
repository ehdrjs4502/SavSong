import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/follow-modal.css'
import "../css/del-btn.css";


interface FollowersProps {
    followerList: [];
}

type FollowList = { from_user: string; name: string };

function Followers(props: FollowersProps) {
    const [followerList, setFollowerList] = useState<FollowList[]>(props.followerList);
    
    return(
        <div>
            <div>
                <div className="header-title">
                    <h2>팔로워</h2>
                </div>
                <hr/>
                <div>
                    <table className="follow-table">
                        <thead></thead>
                        <tbody>
                        {followerList.map((item, idx) => {
                            return(
                                <tr key={idx}>
                                    <td className="user-id">
                                        <Link to={`/UserInfo/${item.from_user}`}>
                                            {item.from_user}
                                            <br/>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td><button className="del-btn">삭제</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default Followers;