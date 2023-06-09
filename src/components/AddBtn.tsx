import axios from 'axios';
import React from 'react';
import '../css/add-btn.css'

interface AddBtnProps{
    size ?:'small' | 'large';
    name :string;
    artist :string;
}

function AddBtn(props: AddBtnProps) {
    const id: string = JSON.parse(sessionStorage.getItem("userInfo")!).id // 현재 세션에 있는 id (로그인한 id)

    function onClickAddBtn(name: string, artist: string) { // 추가 버튼을 눌렀을 때
        axios.post("http://localhost:3001/song/checkSong", { // 중복 체크
            id : JSON.parse(sessionStorage.getItem("userInfo")!).id, // 현재 세션에 있는 id (로그인한 id)
            name : name, // 노래명
            artist : artist, // 가수명
        }).then((res) => {
            if(res.data[0]['count(*)'] === 0) { // 추가한 곡이 아닐 때
                addSong(name, artist);
            } else {
                alert("이미 추가한 곡입니다.");
            };
        });
    }

    function addSong(name: string, artist: string) {
        axios.post("http://localhost:3001/song/addSong", { // addSong 서버 api 호출
            id : id, 
            name : name, // 노래명
            artist : artist, // 가수명
        }).then((res) => { // 서버에서 res 가져옴
            console.log("addSong => ", res);
            if(res.data.affectedRows === 1) { // 잘 됐으면
                alert(name + " 추가했습니다.");
            } else { // 잘 안 됐으면 ㅠㅠ
                    alert("오류!!") 
                };
            });
    };

    return (
        <button className={props.size == 'small' ? 'small-btn' : 'btn'} onClick={() => onClickAddBtn(props.name, props.artist)}>♥</button>
    )
}

export default AddBtn;