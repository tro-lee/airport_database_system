'use client'
import { useRef, useState } from 'react'
import { useAlert } from '@/client/useAlert'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function () {
  return (
    <div className="flex flex-row flex-1 p-2">
      <CreateAccount></CreateAccount>
      <Line></Line>
      <QueryAccount></QueryAccount>
    </div>
  )
}

function Line() {
  return (
    <div className="border border-1 border-gray-500 h-[100vh]"></div>
  )
}

function CreateAccount() {
  const alert = useAlert()
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const onSubmit = async () => {
    fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        name: nameRef.current.value,
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        password: passwordRef.current.value,
      }),
    }).then((e) => {
      if (e.ok) { alert('创建成功') }
      else {
        console.log(e)
        alert('失败')
      }
    })
  }

  const field = 'w-1/2'
  return (
    <aside className="flex-1 flex flex-col items-center gap-y-[8px]">
      <div className={field}>
        <Label htmlFor="name">昵称</Label>
        <Input id="name" placeholder="输入昵称" ref={nameRef}></Input>
      </div>

      <div className={field}>
        <Label htmlFor="name">密码</Label>
        <Input id="name" placeholder="输入密码" ref={passwordRef}></Input>
      </div>

      <Button onClick={onSubmit}>完成创建</Button>
    </aside>
  )
}

function QueryAccount() {
  const [accounts, setAccount] = useState([] as { name: string }[])

  const onQuery = async (condition = '') => {
    fetch(`/api/account?condition=${condition}`).then((e) => {
      if (e.ok) {
        return e.json()
      }
      else {
        throw new Error('查询失败')
      }
    }).then((value) => {
      setAccount(value)
    })
  }

  return (
    <aside className="flex-1 flex flex-col items-center gap-y-[16px]">
      <AllButton onQuery={onQuery}></AllButton>
      <LikeButton onQuery={onQuery}></LikeButton>
      <XLine></XLine>
      {accounts.map((e, i) => <AccountItem key={i} name={e.name}></AccountItem>)}
    </aside>
  )
}

function XLine() {
  return (
    <div className="border border-1 border-gray-500 w-full"></div>
  )
}

function AllButton({ onQuery }: { onQuery: (query: string) => void }) {
  const onClick = () => {
    onQuery('')
  }
  return <Button onClick={onClick}>查询所有用户</Button>
}

function LikeButton({ onQuery }: { onQuery: (query: string) => void }) {
  const queryRef = useRef(null)
  const onClick = () => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    onQuery(queryRef.current.value)
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input ref={queryRef} placeholder="搜索用户" />
      <Button onClick={onClick}>查询</Button>
    </div>
  )
}

function AccountItem({ name }: { name: string }) {
  const itemStyle = 'flex flex-row items-center gap-x-[8px] w-1/2'
  return (
    <div className={itemStyle}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>头像</AvatarFallback>
      </Avatar>
      <div className={itemStyle}>{name}</div>
    </div>
  )
}
