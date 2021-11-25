import React, {useEffect} from 'react';
import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';

const AIChat = () => {
    const { messages, appendMsg,prependMsgs, setTyping } = useMessages([]);

    useEffect(()=>{
        appendMsg({
            type: 'text',
            content: { text: 'Welcome to GTA-baller' },
        })
    }, [])
    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
            });

            setTyping(true);

            setTimeout(() => {
                appendMsg({
                    type: 'text',
                    content: { text: 'Bala bala' },
                });
            }, 1000);
        }
    }

    function renderMessageContent(msg) {
        const { content } = msg;
        return <Bubble content={content.text} />;
    }

    return (
        <Chat
            navbar={{ title: 'AI Buddy' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
        />
    );
};

export default AIChat