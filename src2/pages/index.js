import React, { useEffect, useState, useContext, useRef } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import {appContext} from '@/pages/_app'
import {MaterialSymbols10k, MaterialSymbolsHomeRounded, JisakuMenuBar} from '@/lib/svg'
import HeaderText from '@/components/header_text'
import Items from '@/components/items'

export default function Home() {
  const loading = useContext(appContext).loading
  const loggedIn = useContext(appContext).loggedIn
  const modalTrigger = useContext(appContext).modalTrigger
  const account = useContext(appContext).account
  const setFlashKind = useContext(appContext).setFlashKind
  const setFlashMessage = useContext(appContext).setFlashMessage
  const [loadItems, setloadItems] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!loading) {
      const fetchItems = async () => {
        await axios.post('/tl/current', {'page': page})
          .then(res => {
            setItems(res.data)
            setloadItems(false)
          })
          .catch(err => {
            setFlashKind('danger')
            if (err.response) {
              setFlashMessage('タイムライン取得エラー:未ログイン')
            } else {
              setFlashMessage('タイムライン取得エラー:不明')
            }
            setloadItems(false)
          })
      }
      fetchItems()
      async function created(){
        const ActionCable = await import('actioncable')
        const cable = ActionCable.createConsumer(process.env.NEXT_PUBLIC_WSNAME)
        cable.subscriptions.create( "ItemsChannel",{
          connected() {
            console.log('connected')
          },
          disconnected() {
            console.log('disconnected')
          },
          received(data) {
            let li = document.createElement("li")
            li.textContent = data.item.content
            document.getElementById('items').appendChild(li)
            return console.log(data['item']['content'])
          }
        })
      }
    }
  },[loading])

  return (
    <>
      <HeaderText
        headerText={'Home'}
      >
        {(() => {
          if (loggedIn) {
            return (
              <div>
                こんにちは、{account.name}さん。
              </div>
            )
          } else {
            return (
              <div>
                Amiverse.netへようこそ！
                <Link href="/login">ログイン</Link>
                <Link href="/signup">サインアップ</Link>
              </div>
            )
          }
        })()}
        <div>
          <MaterialSymbols10k width="2em" height="2em" />
          <MaterialSymbolsHomeRounded width="2em" height="2em" />
          <JisakuMenuBar width="2em" height="2em" />
        </div>
        <div>
          <Items items={items} loadItems={loadItems} />
        </div>
      </HeaderText>
    </>
  )
}
