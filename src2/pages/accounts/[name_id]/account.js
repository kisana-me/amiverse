import axios from '@/lib/axios'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Items from '@/components/items'
import { useMainContext } from '@/contexts/main_context'

export default function Account() {
  const {loading, loggedIn, setFlashKind, setFlashMessage} = useMainContext()
  const { query = {} } = useRouter()
  const [account, setAccount] = useState({})
  const [nameId, setNameId] = useState('')

  let ignore = false
  useEffect(() => {
    async function fetchAccount() {
      await axios.post('/@' + query.name_id)
        .then(res => {
          setAccount(res.data)
          setFlashMessage('データ取得完了')
        })
        .catch(err => {
          setFlashMessage('アカウント取得エラー')
        })
    }
    if(query.name_id){
      fetchAccount()
    }
    //
    return () => {ignore = true}
  },[loading])

  return (
    <>
      <div className="account-container" id="account-container">
        <div className="top-container">
          <div className="banner-container" id="banner-container">
            <img
              className="account-banner"
              src={account.banner_url}
              alt='banner'
            />
          </div>
        </div>
        <div className={`name-container`} id="name-container">
          <div id="name-before"></div>
          <div className="icon-container">
            <img
              className="account-icon"
              src={account.icon_url}
              alt='icon'
            />
          </div>
          <div className="meta-container">
            <h1>{account.name}</h1>
            <div>@{account.name_id}</div>
            {/* フォローボタンor編集ボタン */}
          </div>
        </div>
        <div className="profile-container">
          <div><span>紹介:</span>{account.summary}</div>
          <div><span>場所:</span>{account.location}</div>
          <div><span>誕生日:</span>{account.birthday}</div>
          <div><span>フォロワー:</span>{account.followers_counter}</div>
          <div><span>フォロー:</span>{account.following_counter}</div>
          <div><span>投稿数:</span>{account.items_counter}</div>
          <div><span>参加日:</span>{account.created_at}</div>
        </div>
        <div className="account-tab-container">
          <div>投稿</div>
          <div>返信</div>
          <div>メディア</div>
          <div>リアクション</div>
        </div>
        <div className="content-container">
          <p>開始</p>
          <Items items={account.items}/>
          <p>終了</p>
        </div>
      </div>
      <style jsx>{`
        .account-container {
          max-width: 800px;
          margin: auto;
        }
        
        // バナー
        
        .top-container {
          width: 100%;
          aspect-ratio: 1/1;
          position: sticky;
          top: 0px;
          overflow: hidden;
        }
        .banner-container {
          width: 100%;
          aspect-ratio: 1/1;
          position: absolute;
          top: 0px;
          overflow: hidden;
        }
        .account-banner {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: linear-gradient(90deg,#747eee,#d453cc 50%,#fe5597);
        }
        
        // 名前
        
        .name-container {
          height: 104px;
          display: flex;
          background: var(--name-color);
          backdrop-filter: blur(3px);
          //border-radius: 10px 10px 0 0;
          border-bottom: 0.5px solid var(--border-color);
          //box-shadow: 0 -20px 25px 10px #dc24a138;
          position: sticky;
          top: -1px;
          z-index: 3;
          transition-duration: 0.5s;
          align-items: center;
        }
        #name-before {
          position: absolute;
          left: 0;
          bottom: 164px;
          width: 100%;
        }
        .icon-container {
          
        }
        .icon-container img {
          transition-duration: 0.5s;
        }
        .account-icon {
          width: 100px;
          aspect-ratio: 1/1;
          object-fit: cover;
          object-position: top;
          border: 2px #36f18a solid;
          border-radius: 54px;
          display: block;
          background: linear-gradient(90deg,#747eee,#d453cc 50%,#fe5597);
        }
        .meta-container {
          
        }
        .meta-container h1 {
          margin: 0;
        }
        // 接着
        .fixed {
          background:  var(--fixed-name-color);
          border-radius: 0;
          height: 54px;
        }
        .fixed .account-icon {
          width: 50px;
        }
        .fixed .meta-container {
          display: flex;
          align-items: center;
        }
        
        // プロフ
        
        .profile-container {
          padding: 10px;
          background: var(--profile-color);
          border-bottom: 0.5px solid var(--border-color);
          z-index: 1;
          position: relative;
        }
        .profile-container p {
          margin: 0px;
        }
        
        // タブ
        
        .account-tab-container {
          display: flex;
          border-radius: 0;
          background: var(--account-tab-color);
          border-bottom: 0.5px solid var(--border-color);
          //overflow-x: scroll;
          //box-shadow: 0 9px 12px 1px #dc24a138;
          z-index: 2;
          position: sticky;
          top: 53px;
          
        }
        .account-tab-container div {
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
        
        // コンテンツ
        
        .content-container {
          background: var(--content-color);
          z-index: 1;
          position: relative;
          padding: 10px;
        }
        
        // 大きさ処理
        /* 画像を左に、右に名前とプロフといったデザインのほうがいい */
        @media (min-width: 682px) {
          .top-container {
            aspect-ratio: 1/.5;
          }
          .banner-container{
            aspect-ratio: 1/.5;
          }
          .account-banner {
            aspect-ratio: 1/.5;
            object-position: 50% 50%;
          }
        }
        @media (min-aspect-ratio: 4/5) {
          .top-container {
            aspect-ratio: 1/.5;
          }
          .banner-container{
            aspect-ratio: 1/.5;
          }
          .account-banner {
            aspect-ratio: 1/.5;
            object-position: 50% 50%;
          }
        }
        
        // フォーム
        
        .text-field-group {
          position: relative;
          padding: 15px 0 0;
          margin-top: 10px;
          width: 50%;
        }
        .text-field-field {
          width: 100%;
          border: 0;
          border-bottom: 2px solid gray;
          outline: 0;
          font-size: 1.3rem;
          color: white;
          padding: 7px 0;
          background: transparent;
          transition: border-color 0.2s;
          &::placeholder {
            color: transparent;
          }
          &:placeholder-shown ~ .text-field-label {
            cursor: text;
            top: 20px;
          }
        }
        .text-field-label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          color: gray;
        }
        .text-field-field:focus {
          ~ .text-field-label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            color: #6f17a9;
          }
          padding-bottom: 6px;  
          font-weight: 700;
          border-width: 3px;
          border-image: linear-gradient(to right, #3b1183, #6f17a9);
          border-image-slice: 1;
        }
        .text-field-field{
          &:required,&:invalid { box-shadow:none; }
        }
        
        // signup
        
        .signup-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .signup-form {
          form {
            border: 1px solid;
            width: 400px;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}