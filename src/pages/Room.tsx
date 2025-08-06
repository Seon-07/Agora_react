import { useState } from 'react'

interface Message {
    sender: string
    text: string
}

const Room = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'notice', text: '채팅방에 오신 걸 환영합니다.' },
        { sender: 'user1', text: '안녕하세요.' },
        { sender: 'me', text: '안녕하세요. 반갑습니다.' }
    ])
    const [input, setInput] = useState('')
    const users = ['나', 'user1', 'user2']

    const handleSend = () => {
        if (input.trim() === '') return
        setMessages(messages.concat({ sender: 'me', text: input }))
        setInput('')
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/5 bg-blue-50 border-r p-4">
                <h2 className="text-lg font-bold mb-4">참여자</h2>
                <ul className="space-y-2">
                    {users.map(function (user, idx) {
                        return (
                            <li key={idx} className="text-sm text-gray-800">
                                {user}
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Chat Area */}
            <div className="w-4/5 flex flex-col">
                {/* Notice */}
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm border-b">
                    공지: 공손하고 예의 있게 대화해 주세요.
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 bg-white space-y-2 overflow-y-auto">
                    {messages.map(function (msg, idx) {
                        const baseClass = 'max-w-md px-3 py-2 rounded text-sm '
                        if (msg.sender === 'me') {
                            return (
                                <div
                                    key={idx}
                                    className={baseClass + 'ml-auto bg-blue-100 text-right'}
                                >
                                    {msg.text}
                                </div>
                            )
                        } else if (msg.sender === 'notice') {
                            return (
                                <div
                                    key={idx}
                                    className={baseClass + 'mx-auto text-center text-gray-500'}
                                >
                                    {msg.text}
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={idx}
                                    className={baseClass + 'mr-auto bg-gray-200'}
                                >
                                    {msg.text}
                                </div>
                            )
                        }
                    })}
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            className="flex-1 border rounded px-3 py-2 text-sm"
                            placeholder="메시지를 입력하세요"
                            value={input}
                            onChange={function (e) {
                                setInput(e.target.value)
                            }}
                            onKeyDown={function (e) {
                                if (e.key === 'Enter') handleSend()
                            }}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                            onClick={handleSend}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room